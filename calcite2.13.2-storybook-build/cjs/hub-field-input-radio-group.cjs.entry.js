'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const getLabelForEnum = require('./getLabelForEnum-380cfcf6.js');
const rules = require('./rules-6d03c0cb.js');
const index$1 = require('./index-6f16fe65.js');
const types = require('./types-60347c5c.js');
require('./getPropertyFrom-29c68996.js');
require('./resources-42021303.js');
require('./is-nil-e28a2884.js');
require('./ajv-1ae2417a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./state-6637df8c.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./logger-5db3d659.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');

const RadioGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    context.bind(this, 'handleCalciteSegmentedControlChange');
  }
  handleCalciteSegmentedControlChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: evt.target.value }));
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index$1) => {
      var _a, _b, _c, _d, _e;
      /**
       * for enum labels, you can either provide (in the uiSchema)
       * an array of pre-translated strings OR configure an i18nScope
       * which will be used to translate the enum labels at runtime.
       * In both cases, if a label is not provided, we fall back to
       * displaying the enum value
       */
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index$1]) || value
        : getLabelForEnum.getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const icon = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.icons) && ((_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.icons[index$1]);
      // handle rules
      const rules$1 = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.rules) || [];
      const ruleEffects = rules.evaluateUiSchemaRules(rules$1[index$1], this.params.model);
      return !ruleEffects.includes(types.UiSchemaRuleEffects.HIDE) && (index.h("calcite-segmented-control-item", { checked: value === selectedValue, "data-option-index": index$1, iconStart: icon, key: value, value: value }, label));
    }));
  }
  render() {
    var _a;
    return (index.h("calcite-segmented-control", { disabled: this.params.disabled, layout: "horizontal", name: this.params.schema.title, onCalciteSegmentedControlChange: this.handleCalciteSegmentedControlChange, scale: this.params.scale, width: (_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.width }, this.renderOptions(this.params)));
  }
};

exports.hub_field_input_radio_group = RadioGroup;
