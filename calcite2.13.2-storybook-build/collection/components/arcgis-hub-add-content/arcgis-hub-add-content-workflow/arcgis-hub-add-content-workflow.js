import { Host, h } from '@stencil/core';
import { initMachine } from '../utils/machine';
import { States } from '../utils/states';
import { getGlobalContext } from '../../../utils/state';
import intlManager from '../../../utils/intl-manager';
import { fetchHubGroup, fetchHubContent, fetchEvent, EntityEditor, cloneObject, poll, hubSearch, getTypeFromEntity, } from '@esri/hub-common';
import { shareEntitiesToGroups } from '../../../utils/add-content/utils';
import { getEntityTypeFromHubEntityType } from '../../../utils';
import { dictionary } from '@esri/telemetry-dictionary-hub';
/**
 * Add content workflow component
 * Renders a stepper that guides the user through the process of adding content to a Hub
 * Currently only supports adding existing content
 * In the near future will support creating new content and uploading content
 * This component is primarily intended to be used by th arcgis-hub-add-content component but could be used standalone
 */
export class ArcgisHubAddContentWorkflow {
  constructor() {
    /**
    * Handler for clicking a step item in the stepper header
    */
    this.handleStepperItemChange = (evt) => {
      const { state } = this;
      // this is insane but i don't think there is a good way to get the index of the selected item from the stepper
      const stepIndex = Array.from(evt.target.children).reduce((acc, item, idx) => {
        if (item.selected) {
          return idx;
        }
        return acc;
      }, -1);
      const action = { tag: 'StepChanged', stepIndex };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the back button
    */
    this.handleBackButton = () => {
      const { state } = this;
      const action = { tag: 'PreviousStep' };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the next button
    */
    this.handleNextButton = () => {
      const { state } = this;
      const action = { tag: 'NextStep' };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the cancel button
    */
    this.handleCancelButton = () => {
      this.arcgisHubAddContentWorkflowClose.emit();
    };
    /**
     * Handler for the browse button
     */
    this.handleBrowseTemplatesButton = () => {
      this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.modal.details.templates);
      this.arcgisHubAddContentWorkflowClose.emit();
    };
    /**
    * Handler for the close/done button
    */
    this.handleCloseButton = () => {
      this.arcgisHubAddContentWorkflowClose.emit();
    };
    this.workflowConfig = undefined;
    this.allowGroupSelection = false;
    this.entity = undefined;
    this.site = undefined;
    this.machine = undefined;
    this.state = undefined;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initMachine();
  }
  async initMachine() {
    const options = {
      allowGroupSelection: this.allowGroupSelection,
      t: (key, opts) => this.intl.t(key, opts),
      entity: this.entity,
      site: this.site,
    };
    this.machine = await initMachine(this.workflowConfig, this._context, options);
    this.state = this.machine.start();
  }
  stateChanged(state) {
    if (state.telemetry) {
      // if the new state has telemetry, emit it
      this.hubTelemetry.emit(state.telemetry);
    }
    if (States.isWorking(state) && state.action) {
      // if the new state is the Working state and it has an action, execute it
      this[state.action](state);
    }
    if (States.isConfirmation(state)) {
      // if the new state is the Confirmation state, emit the complete event
      this.arcgisHubAddContentWorkflowComplete.emit();
    }
  }
  /**
  * Fetches the content we will share to the selected groups
  */
  fetchContent(state) {
    switch (this.workflowConfig.targetEntity) {
      case 'event':
        const eventPromises = state.selectedContentIds.map(id => fetchEvent(id, this._context.hubRequestOptions));
        return Promise.all(eventPromises);
      default:
        const contentPromises = state.selectedContentIds.map(id => fetchHubContent(id, this._context.requestOptions));
        return Promise.all(contentPromises);
    }
  }
  async shareEntitiesWithGroups(groupIds, content) {
    const groupPromises = groupIds.map(groupId => fetchHubGroup(groupId, this._context.hubRequestOptions));
    const groups = await Promise.all(groupPromises);
    const results = await shareEntitiesToGroups(groups, content, this._context);
    return results;
  }
  /**
  * Adds the selected content to the selected groups
  */
  async addExistingContent(state) {
    try {
      const content = await this.fetchContent(state);
      const results = await this.shareEntitiesWithGroups(state.selectedGroupIds, content);
      const action = { tag: 'Success', results };
      this.state = this.machine.reduce(action, state);
    }
    catch (error) {
      this.state = this.machine.reduce({ tag: 'Failure', error }, state);
    }
  }
  async pollForContent(entity) {
    var _a;
    const query = {
      targetEntity: getEntityTypeFromHubEntityType(getTypeFromEntity(entity)),
      filters: [
        {
          predicates: [
            {
              id: entity.id
            }
          ]
        }
      ],
    };
    const searchOpts = {
      num: 1,
      requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions
    };
    return poll(() => hubSearch(query, searchOpts), (content) => !!content.total);
  }
  async addNewContent(state) {
    try {
      // create the entity
      const editor = EntityEditor.fromEntity(state.configurationValues.values, this._context);
      const entity = await editor.save(cloneObject(state.configurationValues.values));
      // poll for the content - the search index is not immediately updated
      // we don't want to proceed to the success state until we know the gallery will show the entity
      await this.pollForContent(entity);
      if (entity.type === 'Group') {
        const results = {
          overallStatus: 'success',
          groups: [],
          entities: [entity],
          results: [],
          receipts: []
        };
        const action = { tag: 'Success', results };
        this.state = this.machine.reduce(action, state);
      }
      else {
        const results = await this.shareEntitiesWithGroups(state.selectedGroupIds, [entity]);
        const action = { tag: 'Success', results };
        this.state = this.machine.reduce(action, state);
      }
    }
    catch (error) {
      this.state = this.machine.reduce({ tag: 'Failure', error }, state);
    }
  }
  /**
  * Handler for gallery state change events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGalleryStateChange(event) {
    if (!event.detail.isInitialization) {
      const { state } = this;
      const action = { tag: 'GalleryStateChanged', galleryState: event.detail };
      this.state = this.machine.reduce(action, state);
    }
  }
  /**
  * Handler for gallery selection events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGallerySelect(event) {
    const { state } = this;
    const action = { tag: 'GallerySelectionChanged', selected: event.detail };
    this.state = this.machine.reduce(action, state);
  }
  /**
  * Handler for clicks of the arcgis-hub-help-state action
  * This is currently only used for the retry action
  */
  handleHelpStateActionClick() {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'Retry' }, state);
  }
  handleEntityEditorChange(event) {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'EntityEditorChanged', configurationValues: event.detail }, state);
  }
  /**
  * Renders the content for the active step based on the component and component args provided on the state
  */
  renderCurrentStep(stepIndex) {
    var _a;
    const { state } = this;
    if (state && state.stepIndex === stepIndex) {
      const results = [];
      if (state.helpStateProps) {
        results.push(h("arcgis-hub-help-state", Object.assign({ class: "create-help-state" }, state.helpStateProps)));
      }
      if (state.component) {
        const props = Object.assign(Object.assign({}, state.componentArgs), { t: (key) => this.intl.t(key) });
        const editorType = (_a = state.componentArgs) === null || _a === void 0 ? void 0 : _a.editorType;
        results.push(h(this.state.component, Object.assign({}, props)));
        // TODO: remove the alpha gating of this button before the GA release
        if (editorType === "hub:site:create" && this._context.isAlphaOrg) {
          results.push(h("calcite-button", { class: "browse-templates-button", href: "/edit/new/browse", label: this.intl.t('controls.browseTemplates'), onClick: this.handleBrowseTemplatesButton, rel: "noopener noreferrer", target: "_blank" }, this.intl.t('controls.browseTemplates')));
        }
      }
      return results;
    }
  }
  renderSelectionCount(state) {
    const { selection } = state.controls;
    if (selection.visible) {
      const selectionKey = selection.limit ? 'selection.limited' : 'selection.unlimited';
      return h("div", { class: "sc-arcgis-hub-add-content-workflow-selection-count" }, h("calcite-label", null, this.intl.t(selectionKey, selection)));
    }
  }
  renderControls(state) {
    return h("div", { class: "sc-arcgis-hub-add-content-workflow-footer" }, h("div", { class: "sc-arcgis-hub-add-content-workflow-footer-start" }, state.controls.back.visible &&
      h("calcite-button", { apperance: "outline", disabled: state.controls.back.disabled, kind: "neutral", onClick: this.handleBackButton, round: true, scale: "l" }, this.intl.t(state.controls.back.labelKey)), this.renderSelectionCount(state)), h("div", { class: "sc-arcgis-hub-add-content-workflow-footer-end" }, state.controls.cancel.visible &&
      h("calcite-button", { appearance: "outline", disabled: state.controls.cancel.disabled, onClick: this.handleCancelButton, round: true, scale: "l" }, this.intl.t(state.controls.cancel.labelKey)), state.controls.next.visible &&
      h("calcite-button", { disabled: state.controls.next.disabled, onClick: this.handleNextButton, round: true, scale: "l" }, this.intl.t(state.controls.next.labelKey)), state.controls.close.visible &&
      h("calcite-button", { disabled: state.controls.close.disabled, onClick: this.handleCloseButton, round: true, scale: "l" }, this.intl.t(state.controls.close.labelKey))));
  }
  render() {
    const { state } = this;
    if (state) {
      return (h(Host, { "data-element": "add-content-workflow" }, h("calcite-stepper", { icon: true, numbered: true, onCalciteStepperChange: this.handleStepperItemChange }, state.steps.map((step, idx) => {
        return (h("calcite-stepper-item", { complete: step.complete, disabled: step.disabled, error: step.error, heading: this.intl.t(step.labelKey), key: step.labelKey, selected: state.stepIndex === idx }, h("div", { class: "sc-arcgis-hub-add-content-workflow-scroll-container" }, this.renderCurrentStep(idx))));
      })), this.renderControls(state)));
    }
  }
  static get is() { return "arcgis-hub-add-content-workflow"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-add-content-workflow.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-add-content-workflow.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "workflowConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AddContentWorkflowConfig",
          "resolved": "IAddContentCreateWorkflowConfig | IAddContentExistingWorkflowConfig | IAddContentUploadWorkflowConfig",
          "references": {
            "AddContentWorkflowConfig": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configuration for the workflow"
        }
      },
      "allowGroupSelection": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Allow overriding the workflow config (typically used when no config is provided)"
        },
        "attribute": "allow-group-selection",
        "reflect": false,
        "defaultValue": "false"
      },
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A reference to the entity this component is being rendered within the context of. E.g. an IHubProject when in a project's Workspace or View"
        }
      },
      "site": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSite",
          "resolved": "IHubSite",
          "references": {
            "IHubSite": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A reference to the current site entity."
        }
      }
    };
  }
  static get states() {
    return {
      "machine": {},
      "state": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubAddContentWorkflowClose",
        "name": "arcgisHubAddContentWorkflowClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubAddContentWorkflowComplete",
        "name": "arcgisHubAddContentWorkflowComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "workflowConfig",
        "methodName": "initMachine"
      }, {
        "propName": "state",
        "methodName": "stateChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryStateChange",
        "method": "handleGalleryStateChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubGallerySelect",
        "method": "handleGallerySelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubHelpStateActionClick",
        "method": "handleHelpStateActionClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubEntityEditorChange",
        "method": "handleEntityEditorChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
