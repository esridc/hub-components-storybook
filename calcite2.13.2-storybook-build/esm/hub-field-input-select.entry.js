import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getLabelForEnum } from './getLabelForEnum-06916714.js';
import { e as evaluateUiSchemaRules } from './rules-a1672e9e.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import './getPropertyFrom-49d414ff.js';
import './resources-3247991b.js';
import './is-nil-03b9a6b5.js';
import './ajv-73f98cc1.js';
import './_commonjsHelpers-11ca3be1.js';
import './state-31a09db0.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
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

const Select = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, 'handleCalciteSelectChange');
  }
  handleCalciteSelectChange(evt) {
    const element = evt.target;
    const index = element.selectedOption.getAttribute('data-option-index');
    this.arcgisConfigurationEditorFieldInputChange.emit(this.params.schema.enum[index]);
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index) => {
      var _a, _b, _c;
      /**
       * for enum labels, you can either provide (in the uiSchema)
       * an array of pre-translated strings OR configure an i18nScope
       * which will be used to translate the enum labels at runtime.
       * In both cases, if a label is not provided, we fall back to
       * displaying the enum value
       */
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index]) || value
        : getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      // handle rules
      const rules = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], this.params.model);
      const isDisabled = ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
      return !ruleEffects.includes(UiSchemaRuleEffects.HIDE) && (h("calcite-option", { "data-option-index": index, disabled: isDisabled, key: value, selected: value === selectedValue, value: value }, label));
    }));
  }
  render() {
    var _a, _b;
    return (h("calcite-select", { disabled: this.params.disabled || ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.disabled), label: this.params.schema.title, onCalciteSelectChange: this.handleCalciteSelectChange, scale: this.params.scale }, this.renderOptions(this.params)));
  }
};

export { Select as hub_field_input_select };
