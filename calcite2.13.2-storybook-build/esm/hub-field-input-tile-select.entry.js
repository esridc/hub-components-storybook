import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
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

const tileSelectCss = "calcite-tile-group{width:100%}";

const TileSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    this.styles = undefined;
    this.selectedValues = undefined;
    bind(this, 'handleCalciteTileSelect');
  }
  get isCheckbox() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.type) === 'checkbox';
  }
  get schemaEnum() {
    var _a;
    let schemaEnum;
    if (this.isCheckbox) {
      schemaEnum = (_a = this.params.schema.items) === null || _a === void 0 ? void 0 : _a.enum;
    }
    else if (this.params.schema.enum) {
      schemaEnum = this.params.schema.enum;
    }
    else if (!this.params.schema.enum && this.params.schema.type === 'boolean') {
      schemaEnum = [false, true];
    }
    return schemaEnum || [];
  }
  componentWillLoad() {
    if (this.isCheckbox) {
      // initialize selected values state
      this.selectedValues = this.schemaEnum.map(value => { var _a, _b; return { value, selected: ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.includes(value)) || false }; });
    }
  }
  handleCalciteTileSelect(evt) {
    const el = evt.target;
    const index = el.getAttribute('data-option-index');
    const value = this.schemaEnum[index];
    let items; // if radio mode, a string; if checkbox mode, an array
    /**
     * We want to emit a string/boolean when we are in radio mode, but an array of
     * strings/booleans when we are in checkbox mode. For JSON schema validation
     * purposes, we need to keep the format consistent, so, if we are in checkbox mode, we
     * always convert selection to an array.
     */
    if (this.isCheckbox) {
      const selected = !el.hasAttribute('selected'); // catches before checkbox communicates to tile-select, so opposite
      // add to our state
      if (selected) {
        this.selectedValues[index].selected = true;
      }
      // remove from our state
      else {
        this.selectedValues[index].selected = false;
      }
      items = this.selectedValues.reduce((acc, el) => {
        el.selected && acc.push(el.value);
        return acc;
      }, []);
    }
    else {
      items = value;
    }
    this.arcgisConfigurationEditorFieldInputChange.emit(items);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: Array.isArray(items) ? items.join(',') : items }));
  }
  renderOptions({ uiSchema, value: selectedValue, model, t }) {
    return (this.schemaEnum.map((value, index) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index]) || value
        : getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const icon = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.icons) && ((_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.icons[index]);
      const description = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.descriptions)
        ? (_f = uiSchema.options) === null || _f === void 0 ? void 0 : _f.descriptions[index]
        : getLabelForEnum(uiSchema, value, t, { path: 'description', fallback: "" });
      // handle rules
      const rules = ((_g = uiSchema.options) === null || _g === void 0 ? void 0 : _g.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], model);
      const isDisabled = Boolean((_j = (_h = uiSchema.options) === null || _h === void 0 ? void 0 : _h.disabled) === null || _j === void 0 ? void 0 : _j[index]) || ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
      if (!ruleEffects.includes(UiSchemaRuleEffects.HIDE)) {
        return h("calcite-tile", { "data-option-index": index, description: description, disabled: isDisabled, heading: label, icon: icon, "input-alignment": "end", "input-enabled": true, key: value, onCalciteTileSelect: this.handleCalciteTileSelect, scale: (_k = this.params) === null || _k === void 0 ? void 0 : _k.scale, selected: this.isCheckbox ? selectedValue.includes(value) : value === selectedValue });
      }
    }));
  }
  render() {
    var _a, _b, _c, _d;
    const layout = ((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.layout) || "vertical";
    const selectionMode = this.isCheckbox ? 'multiple' : 'single-persist';
    return (h("calcite-tile-group", { disabled: this.params.disabled, label: this.params.label, layout: layout, scale: (_d = this.params) === null || _d === void 0 ? void 0 : _d.scale, selectionMode: selectionMode, style: this.styles }, this.renderOptions(this.params)));
  }
};
TileSelect.style = tileSelectCss;

export { TileSelect as hub_field_input_tile_select };
