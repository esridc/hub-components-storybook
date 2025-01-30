'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const getIconForStatus = require('./get-icon-for-status-2e76ef1c.js');
const IHubTimeline = require('./IHubTimeline-228e135a.js');
const index$1 = require('./index-6f16fe65.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
const util = require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./interpolate-c1fe951a.js');
require('./get-prop-4bd8fc1a.js');

const TIMELINE_SCHEMA = {
  required: [],
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255
    },
    description: {
      type: 'string',
      maxLength: 500
    },
    canCollapse: {
      type: 'boolean'
    }
  }
};
const TIMELINE_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'title',
      scope: '/properties/title',
      type: 'Control'
    },
    {
      labelKey: 'description',
      scope: '/properties/description',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    }
  ]
};
const STAGE_SCHEMA = {
  required: ['title'],
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    timeframe: {
      type: 'string',
    },
    stageDescription: {
      type: 'string',
      maxLength: 500
    },
    link: {
      type: 'object',
      properties: {
        href: {
          type: 'string',
          if: { minLength: 1 },
          then: { format: "url" }
        },
        title: {
          type: 'string'
        }
      }
    },
    status: {
      type: 'string',
      default: 'notStarted'
    }
  }
};
const STAGE_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'title',
      scope: '/properties/title',
      type: 'Control',
      options: {
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: "titleRequiredError"
          }
        ]
      }
    },
    {
      labelKey: 'timeframe',
      scope: '/properties/timeframe',
      type: 'Control'
    },
    {
      labelKey: 'stageDescription',
      scope: '/properties/stageDescription',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    },
    {
      labelKey: 'linkHref',
      scope: '/properties/link/properties/href',
      type: 'Control',
      options: {
        helperText: {
          labelKey: 'linkHrefHelperText'
        },
        messages: [
          {
            type: "ERROR",
            keyword: "format",
            icon: true,
            labelKey: "linkHrefFormatError"
          },
          {
            type: "ERROR",
            keyword: "if",
            hidden: true
          }
        ]
      }
    },
    {
      labelKey: 'linkTitle',
      scope: '/properties/link/properties/title',
      type: 'Control'
    },
    {
      labelKey: 'status',
      scope: '/properties/status',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        selectionMode: 'single',
        placeholder: "{{setStatus:translate}}",
        items: Object.keys(IHubTimeline.TIMELINE_STAGE_STATUSES).map(status => {
          return {
            value: status,
            label: `{{${status}:translate}}`,
            icon: getIconForStatus.getIconForStatus(status)
          };
        })
      }
    }
  ]
};

const arcgisHubTimelineEditorCss = ".sc-arcgis-hub-timeline-editor-h{display:block}calcite-sortable-list.sc-arcgis-hub-timeline-editor{margin-bottom:1.5rem}.stage-editor.sc-arcgis-hub-timeline-editor{margin-left:1rem}calcite-combobox.sc-arcgis-hub-timeline-editor{margin-bottom:0.5rem}.collapse-toggle-heading.sc-arcgis-hub-timeline-editor{display:flex;gap:0.25rem}.steps-heading.sc-arcgis-hub-timeline-editor{padding-top:0.75rem;padding-bottom:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.add-step-btn.sc-arcgis-hub-timeline-editor{margin-bottom:1.5rem}";

const ArcgisHubTimelineEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubTimelineEditorChange = index.createEvent(this, "arcgisHubTimelineEditorChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * The timeline editor is comprised of 2 configuration editors:
     * 1. one for configuring the timeline's title/description
     * 2. one for configuring the timeline's stages
     *
     * The following are the respective schemas/uiSchemas for these editors
     */
    this._timelineSchema = util.cloneObject(TIMELINE_SCHEMA);
    this._timelineUiSchema = util.cloneObject(TIMELINE_UI_SCHEMA);
    this._stageSchema = util.cloneObject(STAGE_SCHEMA);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.remove.label.step.details.timeline), { count: stages.length }));
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
      });
    };
    this.handleCalciteSwitchChange = (event) => {
      this._timeline.canCollapse = event.target.checked;
      this.arcgisHubTimelineEditorChange.emit({
        values: this._timeline,
        valid: true
      });
      const telemetryAction = event.target.checked ? 'enable' : 'disable';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action[telemetryAction].label.collapse.details.timeline), { count: this.stages.length }));
    };
    this.values = undefined;
    this.showTitleAndDescription = true;
    this.stages = [];
    this._currentStageIdx = -1;
    context.bind(this, 'handleAddStage', 'handleEditorChangeEvent', 'handleStageOrderChangeEvent', 'translationFunc');
  }
  async componentWillLoad() {
    var _a;
    // This is where we would implement schema migrations if changes are made
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._timeline = this.values;
    this.stages = ((_a = this.values) === null || _a === void 0 ? void 0 : _a.stages) || [];
    this._stageUiSchema = util.cloneObject(interpolateTranslations.interpolateTranslations(this.intl, STAGE_UI_SCHEMA));
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
    const stageKey = util.createId('stage');
    const newStage = {
      key: stageKey,
      title: '',
      timeframe: '',
      stageDescription: '',
      status: IHubTimeline.TIMELINE_STAGE_STATUSES.notStarted
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.add.label.step.details.timeline), { count: length }));
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
    index.h("calcite-sortable-list", { onCalciteListOrderChange: this.handleStageOrderChangeEvent }, this.stages.map((stage, idx) => this.renderStage(stage, idx))));
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
    return (index.h(index.Fragment, null, index.h("calcite-block", { collapsible: true, "data-key": stage.key, description: stage.timeframe, "drag-handle": true, heading: stage.title, key: stage.key, onCalciteBlockToggle: this.onStageEditorOpen, open: idx === this._currentStageIdx }, stage.status && index.h("calcite-icon", { icon: getIconForStatus.getIconForStatus(stage.status), scale: "s", slot: "icon-start" }), index.h("calcite-card", { class: "stage-editor", dir: this.intl.direction }, index.h("arcgis-configuration-editor", { "data-key": stage.key, onArcgisConfigurationEditorChange: this.handleStageEditorChangeEvent, schema: this._stageSchema, t: this.translationFunc, uiSchema: this._stageUiSchema, values: stageValues }), index.h("calcite-button", { appearance: "transparent", "data-key": stage.key, kind: "danger", onClick: this.handleRemoveStage, round: true, scale: "m", width: "auto" }, this.intl.t("delete"))))));
  }
  render() {
    var _a, _b;
    const values = {
      title: (_a = this._timeline) === null || _a === void 0 ? void 0 : _a.title,
      description: (_b = this._timeline) === null || _b === void 0 ? void 0 : _b.description
    };
    return (index.h(index.Host, { "data-element": "timeline-editor" }, this.showTitleAndDescription && (index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._timelineSchema, t: this.translationFunc, uiSchema: this._timelineUiSchema, values: values })), index.h("div", { class: 'steps-heading' }, this.intl.t('steps')), this.renderStages(), index.h("calcite-button", { appearance: "outline-fill", class: "add-step-btn", color: "blue", onClick: this.handleAddStage, round: true, type: "button", width: "auto" }, this.intl.t("addNewStep")), index.h("calcite-label", null, index.h("div", { class: "collapse-toggle-heading" }, this.intl.t('enableCollapse'), index.h("div", null, index.h("calcite-icon", { icon: 'information-f', id: 'collapse-tooltip', scale: 's' }), index.h("calcite-tooltip", { label: this.intl.t('collapseToggle'), placement: 'right', "reference-element": 'collapse-tooltip' }, index.h("span", null, this.intl.t('collapseToggleTooltip'))))), index.h("calcite-switch", { checked: this._timeline.canCollapse, disabled: this.isCollapseToggleDisabled, onCalciteSwitchChange: this.handleCalciteSwitchChange }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubTimelineEditor.style = arcgisHubTimelineEditorCss;

exports.arcgis_hub_timeline_editor = ArcgisHubTimelineEditor;
