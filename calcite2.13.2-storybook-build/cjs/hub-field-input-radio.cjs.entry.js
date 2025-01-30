'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const getLabelForEnum = require('./getLabelForEnum-380cfcf6.js');
const index$1 = require('./index-6f16fe65.js');
const rules = require('./rules-6d03c0cb.js');
const types = require('./types-60347c5c.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./getPropertyFrom-29c68996.js');
require('./resources-42021303.js');
require('./is-nil-e28a2884.js');
require('./ajv-1ae2417a.js');
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

const radioCss = ".config-editor-radio__block{border-block-end-width:0px;width:calc(100% - 1.25rem)}fieldset{margin:0;padding:0;border:none;max-height:var(--maxHeight);overflow:hidden}calcite-block{width:100%}calcite-radio-button-group{margin-left:0.125rem}";

const Radio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    this.styles = undefined;
    context.bind(this, 'handleCalciteRadioButtonGroupChange');
  }
  handleCalciteRadioButtonGroupChange(evt) {
    const el = evt.target;
    const index = el.getAttribute('data-option-index');
    this.arcgisConfigurationEditorFieldInputChange.emit(this.params.schema.enum[index]);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: el.value }));
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index$1) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      /**
       * for enum labels and descriptions, you can either provide
       * (in the uiSchema) an array of pre-translated strings OR
       * configure an i18nScope which will be used to translate
       * the enum labels/descriptions at runtime.
       * In both cases, if a label is not provided, we fall back to
       * displaying the enum value
       */
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index$1]) || value
        : getLabelForEnum.getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const description = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.descriptions)
        ? (_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.descriptions[index$1]
        : getLabelForEnum.getLabelForEnum(uiSchema, value, t, { path: 'description', fallback: "" });
      const icon = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.icons) && ((_f = uiSchema.options) === null || _f === void 0 ? void 0 : _f.icons[index$1]);
      const tooltip = (_h = (_g = uiSchema.options) === null || _g === void 0 ? void 0 : _g.tooltips) === null || _h === void 0 ? void 0 : _h[index$1];
      // handle rules
      const rules$1 = ((_j = uiSchema.options) === null || _j === void 0 ? void 0 : _j.rules) || [];
      const ruleEffects = rules.evaluateUiSchemaRules(rules$1[index$1], this.params.model);
      const isDisabled = Boolean((_l = (_k = uiSchema.options) === null || _k === void 0 ? void 0 : _k.disabled) === null || _l === void 0 ? void 0 : _l[index$1]) || ruleEffects.includes(types.UiSchemaRuleEffects.DISABLE);
      return !ruleEffects.includes(types.UiSchemaRuleEffects.HIDE) && (index.h("calcite-label", { key: value, layout: "inline", scale: this.params.scale }, index.h("calcite-radio-button", { checked: value === selectedValue, "data-option-index": index$1, disabled: this.params.disabled || isDisabled, id: `radio-${value}`, onCalciteRadioButtonChange: this.handleCalciteRadioButtonGroupChange, scale: this.params.scale, value: value }), tooltip && (index.h("calcite-tooltip", { placement: tooltip.placement, referenceElement: `radio-${value}` }, tooltip.text)), (description || icon) ? (index.h("calcite-block", { class: "config-editor-radio__block", description: description, heading: label }, icon && index.h("calcite-icon", { icon: icon, scale: "s", slot: "icon-start" })))
        : label));
    }));
  }
  render() {
    return (index.h(index.Host, { style: this.styles }, index.h("fieldset", null, index.h("legend", { "aria-label": this.params.label }), index.h("calcite-radio-button-group", { disabled: this.params.disabled, layout: "vertical", name: this.params.schema.title, scale: this.params.scale }, this.renderOptions(this.params)))));
  }
  get element() { return index.getElement(this); }
};
Radio.style = radioCss;

exports.hub_field_input_radio = Radio;
