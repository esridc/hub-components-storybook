import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getLabelForEnum } from './getLabelForEnum-06916714.js';
import { d as dist } from './index-dd3f99ac.js';
import { e as evaluateUiSchemaRules } from './rules-a1672e9e.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import './_commonjsHelpers-11ca3be1.js';
import './getPropertyFrom-49d414ff.js';
import './resources-3247991b.js';
import './is-nil-03b9a6b5.js';
import './ajv-73f98cc1.js';
import './state-31a09db0.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './logger-f8667200.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';

const radioCss = ".config-editor-radio__block{border-block-end-width:0px;width:calc(100% - 1.25rem)}fieldset{margin:0;padding:0;border:none;max-height:var(--maxHeight);overflow:hidden}calcite-block{width:100%}calcite-radio-button-group{margin-left:0.125rem}";

const Radio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    this.styles = undefined;
    bind(this, 'handleCalciteRadioButtonGroupChange');
  }
  handleCalciteRadioButtonGroupChange(evt) {
    const el = evt.target;
    const index = el.getAttribute('data-option-index');
    this.arcgisConfigurationEditorFieldInputChange.emit(this.params.schema.enum[index]);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: el.value }));
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index) => {
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
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index]) || value
        : getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const description = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.descriptions)
        ? (_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.descriptions[index]
        : getLabelForEnum(uiSchema, value, t, { path: 'description', fallback: "" });
      const icon = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.icons) && ((_f = uiSchema.options) === null || _f === void 0 ? void 0 : _f.icons[index]);
      const tooltip = (_h = (_g = uiSchema.options) === null || _g === void 0 ? void 0 : _g.tooltips) === null || _h === void 0 ? void 0 : _h[index];
      // handle rules
      const rules = ((_j = uiSchema.options) === null || _j === void 0 ? void 0 : _j.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], this.params.model);
      const isDisabled = Boolean((_l = (_k = uiSchema.options) === null || _k === void 0 ? void 0 : _k.disabled) === null || _l === void 0 ? void 0 : _l[index]) || ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
      return !ruleEffects.includes(UiSchemaRuleEffects.HIDE) && (h("calcite-label", { key: value, layout: "inline", scale: this.params.scale }, h("calcite-radio-button", { checked: value === selectedValue, "data-option-index": index, disabled: this.params.disabled || isDisabled, id: `radio-${value}`, onCalciteRadioButtonChange: this.handleCalciteRadioButtonGroupChange, scale: this.params.scale, value: value }), tooltip && (h("calcite-tooltip", { placement: tooltip.placement, referenceElement: `radio-${value}` }, tooltip.text)), (description || icon) ? (h("calcite-block", { class: "config-editor-radio__block", description: description, heading: label }, icon && h("calcite-icon", { icon: icon, scale: "s", slot: "icon-start" })))
        : label));
    }));
  }
  render() {
    return (h(Host, { style: this.styles }, h("fieldset", null, h("legend", { "aria-label": this.params.label }), h("calcite-radio-button-group", { disabled: this.params.disabled, layout: "vertical", name: this.params.schema.title, scale: this.params.scale }, this.renderOptions(this.params)))));
  }
  get element() { return getElement(this); }
};
Radio.style = radioCss;

export { Radio as hub_field_input_radio };
