import { Host, h } from '@stencil/core';
import { States } from '../utils/states';
import { getGlobalContext } from '../../../utils/state';
import intlManager from '../../../utils/intl-manager';
import { MigratePageMachine } from '../utils/migrate-page-machine';
import { fetchHubGroup, fetchPage, HubPage, updateSite } from '@esri/hub-common';
import { shareEntitiesToGroups } from '../../../utils/add-content/utils';
export class ArcgisHubPageMigrationWorkflow {
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
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    /**
    * Handler for the close/done button
    */
    this.handleCloseButton = () => {
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    this.pageId = undefined;
    this.site = undefined;
    this.state = undefined;
    this.shouldShowModal = false;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initMachine();
  }
  async initMachine() {
    const page = await fetchPage(this.pageId, this._context.hubRequestOptions);
    const options = {
      t: (key, opts) => this.intl.t(key, opts),
      page,
      site: this.site,
    };
    this.machine = new MigratePageMachine(this._context, options);
    this.state = this.machine.start();
  }
  async sharePageWithGroups(groupIds, page) {
    const groupPromises = groupIds.map(groupId => fetchHubGroup(groupId, this._context.hubRequestOptions));
    const groups = await Promise.all(groupPromises);
    return shareEntitiesToGroups(groups, [page.toJson()], this._context);
  }
  async migratePage(state) {
    try {
      const page = await HubPage.fetch(this.pageId, this._context);
      // add the page to the selected groups
      const shareResult = await this.sharePageWithGroups(state.selectedGroupIds, page);
      const sharedWithSomeGroups = shareResult.results.some(result => result.status === 'success');
      if (sharedWithSomeGroups) {
        // save the page (update the title and slug)
        page.update(state.configurationValues.values);
        await page.save();
        // remove the page from the site's hash and update the site
        this.site.pages = this.site.pages.filter(p => p.id !== this.pageId);
        await updateSite(this.site, this._context.hubRequestOptions);
      }
      const action = { tag: 'Success', results: shareResult };
      this.state = this.machine.reduce(action, state);
    }
    catch (error) {
      this.state = this.machine.reduce({ tag: 'Failure', error }, state);
    }
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
      this.arcgisHubPageMigrationWorkflowComplete.emit(this.pageId);
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
  // NOTE: i have no idea why but the initialized event must be captured
  handleConfigEditorChange(event) {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'ConfigurationEditorChanged', configurationValues: event.detail }, state);
  }
  /**
  * Renders the content for the active step based on the component and component args provided on the state
  */
  renderCurrentStep(stepIndex) {
    const { state } = this;
    if (state && state.stepIndex === stepIndex) {
      const results = [];
      if (state.helpStateProps) {
        results.push(h("arcgis-hub-help-state", Object.assign({ class: "create-help-state" }, state.helpStateProps)));
      }
      if (state.component) {
        const props = Object.assign(Object.assign({}, state.componentArgs), { t: (key) => this.intl.t(key) });
        results.push(h(this.state.component, Object.assign({}, props)));
      }
      return results;
    }
  }
  renderSelectionCount(state) {
    const { selection } = state.controls;
    if (selection.visible) {
      const selectionKey = selection.limit ? 'selection.limited' : 'selection.unlimited';
      return h("div", { class: "sc-arcgis-hub-page-migration-selection-count" }, h("calcite-label", null, this.intl.t(selectionKey, selection)));
    }
  }
  renderControls(state) {
    return h("div", { class: "sc-arcgis-hub-page-migration-footer" }, h("div", { class: "sc-arcgis-hub-page-migration-footer-start" }, state.controls.back.visible &&
      h("calcite-button", { apperance: "outline", disabled: state.controls.back.disabled, kind: "neutral", onClick: this.handleBackButton, round: true, scale: "l" }, this.intl.t(state.controls.back.labelKey)), this.renderSelectionCount(state)), h("div", { class: "sc-arcgis-hub-page-migration-footer-end" }, state.controls.cancel.visible &&
      h("calcite-button", { appearance: "outline", disabled: state.controls.cancel.disabled, onClick: this.handleCancelButton, round: true, scale: "l" }, this.intl.t(state.controls.cancel.labelKey)), state.controls.next.visible &&
      h("calcite-button", { disabled: state.controls.next.disabled, onClick: this.handleNextButton, round: true, scale: "l" }, this.intl.t(state.controls.next.labelKey)), state.controls.close.visible &&
      h("calcite-button", { disabled: state.controls.close.disabled, onClick: this.handleCloseButton, round: true, scale: "l" }, this.intl.t(state.controls.close.labelKey))));
  }
  render() {
    const { state } = this;
    if (state) {
      return (h(Host, { "data-element": "hub-page-migration-workflow" }, h("calcite-stepper", { icon: true, numbered: true, onCalciteStepperChange: this.handleStepperItemChange }, state.steps.map((step, idx) => {
        return (h("calcite-stepper-item", { complete: step.complete, disabled: step.disabled, error: step.error, heading: this.intl.t(step.labelKey), key: step.labelKey, selected: state.stepIndex === idx }, h("div", { class: "sc-arcgis-hub-page-migration-scroll-container" }, this.renderCurrentStep(idx))));
      })), this.renderControls(state)));
    }
  }
  static get is() { return "arcgis-hub-page-migration-workflow"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-page-migration-workflow.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-page-migration-workflow.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "pageId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The page id of the page to be migrated"
        },
        "attribute": "page-id",
        "reflect": false
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
      "state": {},
      "shouldShowModal": {}
    };
  }
  static get events() {
    return [{
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
      }, {
        "method": "arcgisHubPageMigrationWorkflowComplete",
        "name": "arcgisHubPageMigrationWorkflowComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "arcgisHubPageMigrationWorkflowClose",
        "name": "arcgisHubPageMigrationWorkflowClose",
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
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
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
        "name": "arcgisConfigurationEditorInitialized",
        "method": "handleConfigEditorChange",
        "target": undefined,
        "capture": true,
        "passive": false
      }, {
        "name": "arcgisConfigurationEditorChange",
        "method": "handleConfigEditorChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
