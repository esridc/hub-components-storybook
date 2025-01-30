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

const tileSelectCss = "calcite-tile-group{width:100%}";

const TileSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    this.styles = undefined;
    this.selectedValues = undefined;
    context.bind(this, 'handleCalciteTileSelect');
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: Array.isArray(items) ? items.join(',') : items }));
  }
  renderOptions({ uiSchema, value: selectedValue, model, t }) {
    return (this.schemaEnum.map((value, index$1) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index$1]) || value
        : getLabelForEnum.getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const icon = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.icons) && ((_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.icons[index$1]);
      const description = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.descriptions)
        ? (_f = uiSchema.options) === null || _f === void 0 ? void 0 : _f.descriptions[index$1]
        : getLabelForEnum.getLabelForEnum(uiSchema, value, t, { path: 'description', fallback: "" });
      // handle rules
      const rules$1 = ((_g = uiSchema.options) === null || _g === void 0 ? void 0 : _g.rules) || [];
      const ruleEffects = rules.evaluateUiSchemaRules(rules$1[index$1], model);
      const isDisabled = Boolean((_j = (_h = uiSchema.options) === null || _h === void 0 ? void 0 : _h.disabled) === null || _j === void 0 ? void 0 : _j[index$1]) || ruleEffects.includes(types.UiSchemaRuleEffects.DISABLE);
      if (!ruleEffects.includes(types.UiSchemaRuleEffects.HIDE)) {
        return index.h("calcite-tile", { "data-option-index": index$1, description: description, disabled: isDisabled, heading: label, icon: icon, "input-alignment": "end", "input-enabled": true, key: value, onCalciteTileSelect: this.handleCalciteTileSelect, scale: (_k = this.params) === null || _k === void 0 ? void 0 : _k.scale, selected: this.isCheckbox ? selectedValue.includes(value) : value === selectedValue });
      }
    }));
  }
  render() {
    var _a, _b, _c, _d;
    const layout = ((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.layout) || "vertical";
    const selectionMode = this.isCheckbox ? 'multiple' : 'single-persist';
    return (index.h("calcite-tile-group", { disabled: this.params.disabled, label: this.params.label, layout: layout, scale: (_d = this.params) === null || _d === void 0 ? void 0 : _d.scale, selectionMode: selectionMode, style: this.styles }, this.renderOptions(this.params)));
  }
};
TileSelect.style = tileSelectCss;

exports.hub_field_input_tile_select = TileSelect;
