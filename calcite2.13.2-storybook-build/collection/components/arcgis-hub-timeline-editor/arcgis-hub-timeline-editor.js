import { Fragment, h, Host } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { createId, TIMELINE_STAGE_STATUSES } from '@esri/hub-common';
import { TIMELINE_SCHEMA, TIMELINE_UI_SCHEMA, STAGE_SCHEMA, STAGE_UI_SCHEMA } from './schema';
import { getIconForStatus } from '../../utils/get-icon-for-status';
import { cloneObject } from '@esri/hub-common';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { interpolateTranslations } from '../../utils/localization/interpolate-translations';
/**
 * the arcgis-hub-timeline-editor is an editor for configuring
 * IHubTimelines. It is a standalone editor that can be consumed
 * in the layout editor, but is also a "composite" field that
 * can be leveraged directly in another configuration editor.
 */
export class ArcgisHubTimelineEditor {
  constructor() {
    /**
     * The timeline editor is comprised of 2 configuration editors:
     * 1. one for configuring the timeline's title/description
     * 2. one for configuring the timeline's stages
     *
     * The following are the respective schemas/uiSchemas for these editors
     */
    this._timelineSchema = cloneObject(TIMELINE_SCHEMA);
    this._timelineUiSchema = cloneObject(TIMELINE_UI_SCHEMA);
    this._stageSchema = cloneObject(STAGE_SCHEMA);
    this.handleRemoveStage = (event) => {
      var _a;
      const stageKey = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-key');
      const stages = [...this._timeline.stages];
      let stageIndex;
      stages.forEach((s, index) => {
        if (s.key === stageKey) {
          stageIndex = index;
        }
      });
      !isNaN(stageIndex) && stages.splice(stageIndex, 1);
      // trigger a re-render
      this._currentStageIdx = -1;
      this.updateStages(stages);
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.remove.label.step.details.timeline), { count: stages.length }));
    };
    // configuration editor handler for an individual stage
    this.handleStageEditorChangeEvent = (event) => {
      var _a;
      event.stopPropagation();
      const stageKey = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-key');
      const stages = [...this._timeline.stages];
      stages.forEach((s, index) => {
        if (s.key === stageKey) {
          stages[index] = Object.assign(Object.assign({}, s), event.detail.values);
        }
      });
      this.updateStages(stages, event.detail.valid);
    };
    // Close all stage editors other than the one that's currently open
    this.onStageEditorOpen = (event) => {
      var _a;
      const stageKey = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-key');
      const stages = [...this._timeline.stages];
      stages.forEach((stage, idx) => {
        if (stage.key === stageKey) {
          this._currentStageIdx = idx;
        }
        ;
      });
    };
    this.handleCalciteSwitchChange = (event) => {
      this._timeline.canCollapse = event.target.checked;
      this.arcgisHubTimelineEditorChange.emit({
        values: this._timeline,
        valid: true
      });
      const telemetryAction = event.target.checked ? 'enable' : 'disable';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action[telemetryAction].label.collapse.details.timeline), { count: this.stages.length }));
    };
    this.values = undefined;
    this.showTitleAndDescription = true;
    this.stages = [];
    this._currentStageIdx = -1;
    bind(this, 'handleAddStage', 'handleEditorChangeEvent', 'handleStageOrderChangeEvent', 'translationFunc');
  }
  async componentWillLoad() {
    var _a;
    // This is where we would implement schema migrations if changes are made
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._timeline = this.values;
    this.stages = ((_a = this.values) === null || _a === void 0 ? void 0 : _a.stages) || [];
    this._stageUiSchema = cloneObject(interpolateTranslations(this.intl, STAGE_UI_SCHEMA));
  }
  get isCollapseToggleDisabled() {
    var _a;
    return ((_a = this._timeline.stages) === null || _a === void 0 ? void 0 : _a.length) < 6;
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  updateStages(stages, isValid = true) {
    this.stages = stages;
    this._timeline.stages = stages;
    // Collapse the timeline when the toggle is on OR when a timeline is first created and
    // the timeline needs to have more than 6 steps in both scenarios
    // check 'this._timeline.canCollapse === undefined && this.stages.length >= 6' so we will automatically
    // turn on the toggle when it has never been set and there are at least 6 stages created
    if ((this._timeline.canCollapse || (this._timeline.canCollapse === undefined && this.stages.length >= 6))) {
      this._timeline.canCollapse = this.stages.length >= 6;
    }
    this.arcgisHubTimelineEditorChange.emit({
      values: this._timeline,
      valid: isValid
    });
  }
  handleAddStage() {
    const stageKey = createId('stage');
    const newStage = {
      key: stageKey,
      title: '',
      timeframe: '',
      stageDescription: '',
      status: TIMELINE_STAGE_STATUSES.notStarted
    };
    // Assign an empty array to stages in case there is no default values or stages
    const stages = [...this._timeline.stages || []];
    const length = stages.push(newStage);
    this._currentStageIdx = length - 1;
    /**
     * trigger a re-render and set the focus to the new stage editor
     * so that when the user hits tab, it will move focus to the first
     * form input. Note: we need to add a set timelut to ensure the
     * editor el has finished rendering in the DOM
     */
    this.updateStages(stages);
    setTimeout(() => {
      this.setStageFocus(stageKey);
    }, 300);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.add.label.step.details.timeline), { count: length }));
  }
  // set keyboard focus to a particular stage editor
  setStageFocus(stageKey) {
    const stageEditorEl = this.element.querySelector(`calcite-block[data-key=${stageKey}] arcgis-configuration-editor`);
    stageEditorEl.setFocus();
  }
  // configuration editor handler for the entire timeline
  handleEditorChangeEvent(event) {
    event.stopPropagation();
    this._timeline = Object.assign(Object.assign({}, this._timeline), event.detail.values);
    this.arcgisHubTimelineEditorChange.emit({
      values: this._timeline,
      valid: event.detail.valid
    });
  }
  handleStageOrderChangeEvent(event) {
    var _a, _b;
    event.stopPropagation();
    const _currentStageKey = (_a = this._timeline.stages[this._currentStageIdx]) === null || _a === void 0 ? void 0 : _a.key;
    const sortableListItems = ((_b = event.target) === null || _b === void 0 ? void 0 : _b.children) || [];
    const sortedStageKeys = Array.from(sortableListItems).map(item => item.getAttribute("data-key"));
    const stages = [...this._timeline.stages];
    stages.sort(function (a, b) {
      return sortedStageKeys.indexOf(a.key) - sortedStageKeys.indexOf(b.key);
    });
    this._currentStageIdx = stages.findIndex((stage) => stage.key === _currentStageKey);
    this.updateStages(stages);
  }
  renderStages() {
    return (
    // TODO: switch calcite-list w/ dragEnabled or use `list` control in config editor
    h("calcite-sortable-list", { onCalciteListOrderChange: this.handleStageOrderChangeEvent }, this.stages.map((stage, idx) => this.renderStage(stage, idx))));
  }
  renderStage(stage, idx) {
    const stageValues = {
      title: stage.title,
      timeframe: stage.timeframe,
      stageDescription: stage.stageDescription,
      link: stage.link,
      status: stage.status
    };
    // TODO: switch calcite-list-item w/ dragEnabled or use `list` control in config editor
    return (h(Fragment, null, h("calcite-block", { collapsible: true, "data-key": stage.key, description: stage.timeframe, "drag-handle": true, heading: stage.title, key: stage.key, onCalciteBlockToggle: this.onStageEditorOpen, open: idx === this._currentStageIdx }, stage.status && h("calcite-icon", { icon: getIconForStatus(stage.status), scale: "s", slot: "icon-start" }), h("calcite-card", { class: "stage-editor", dir: this.intl.direction }, h("arcgis-configuration-editor", { "data-key": stage.key, onArcgisConfigurationEditorChange: this.handleStageEditorChangeEvent, schema: this._stageSchema, t: this.translationFunc, uiSchema: this._stageUiSchema, values: stageValues }), h("calcite-button", { appearance: "transparent", "data-key": stage.key, kind: "danger", onClick: this.handleRemoveStage, round: true, scale: "m", width: "auto" }, this.intl.t("delete"))))));
  }
  render() {
    var _a, _b;
    const values = {
      title: (_a = this._timeline) === null || _a === void 0 ? void 0 : _a.title,
      description: (_b = this._timeline) === null || _b === void 0 ? void 0 : _b.description
    };
    return (h(Host, { "data-element": "timeline-editor" }, this.showTitleAndDescription && (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._timelineSchema, t: this.translationFunc, uiSchema: this._timelineUiSchema, values: values })), h("div", { class: 'steps-heading' }, this.intl.t('steps')), this.renderStages(), h("calcite-button", { appearance: "outline-fill", class: "add-step-btn", color: "blue", onClick: this.handleAddStage, round: true, type: "button", width: "auto" }, this.intl.t("addNewStep")), h("calcite-label", null, h("div", { class: "collapse-toggle-heading" }, this.intl.t('enableCollapse'), h("div", null, h("calcite-icon", { icon: 'information-f', id: 'collapse-tooltip', scale: 's' }), h("calcite-tooltip", { label: this.intl.t('collapseToggle'), placement: 'right', "reference-element": 'collapse-tooltip' }, h("span", null, this.intl.t('collapseToggleTooltip'))))), h("calcite-switch", { checked: this._timeline.canCollapse, disabled: this.isCollapseToggleDisabled, onCalciteSwitchChange: this.handleCalciteSwitchChange }))));
  }
  static get is() { return "arcgis-hub-timeline-editor"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-timeline-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-timeline-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubTimeline",
          "resolved": "IHubTimeline",
          "references": {
            "IHubTimeline": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Timeline details, e.g. title, description"
        }
      },
      "showTitleAndDescription": {
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
          "text": "Indicates whether to expose the title and description fields.\n\nOn the project workspace, for example, we don't expose these\nfields; however, for the timeline card in the layout editor,\nwe do."
        },
        "attribute": "show-title-and-description",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "stages": {},
      "_currentStageIdx": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubTimelineEditorChange",
        "name": "arcgisHubTimelineEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that's fired whenever changes are made to the editor"
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event to emit telemetry to the consuming application"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
