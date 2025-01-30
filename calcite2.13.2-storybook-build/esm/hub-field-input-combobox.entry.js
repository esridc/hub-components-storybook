import { h, r as registerInstance, c as createEvent, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getLabel } from './getLabel-a2b67324.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as isComboboxItemSelected } from './isComboboxItemSelected-f8731af3.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';
import './_commonjsHelpers-11ca3be1.js';

const CalciteComboboxItems = ({ items, values, selectionMode, translationFunc, onCalciteComboboxItemChange, }) => {
  // used for both the aria-label and the visibile heading
  const label = (child) => {
    return getLabel(child, translationFunc) || child.value;
  };
  return items.map((child) => {
    var _a;
    return (h("calcite-combobox-item", { heading: label(child), icon: child.icon, key: child.value, label: label(child), onCalciteComboboxItemChange: onCalciteComboboxItemChange, selected: isComboboxItemSelected(child, values, selectionMode), 
      // textLabel is deprecated, but also required by calcite in v2.12.1
      textLabel: label(child), value: child.value }, !!((_a = child.children) === null || _a === void 0 ? void 0 : _a.length)
      && h(CalciteComboboxItems, { items: child.children, onCalciteComboboxItemChange: onCalciteComboboxItemChange, selectionMode: selectionMode, translationFunc: translationFunc, values: values })));
  });
};

const Combobox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    /**
     * Fires each time an item is selected or deselected in the combobox.
     * This event will propogate up to then call calciteComboboxChange event.
     * @param evt
     */
    this.handleCalciteComboboxItemChange = (evt) => {
      const { value, selected } = evt.target;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action[selected ? "select" : "deselect"]), { label: this.params.telemetryLabel, details: value }));
    };
    this.params = undefined;
    bind(this, 'handleCalciteComboboxChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Easy flag for whether or not the combobox is in single select mode
   */
  get _isSingleSelect() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.selectionMode) === 'single';
  }
  /**
   * The selection mode of the combobox
   */
  get _selectionMode() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.selectionMode) || 'single';
  }
  /**
  * The items to render in the combobox
  */
  get _items() {
    var _a, _b, _c, _d;
    let items = ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.items) || ((_c = this._schemaEnum) === null || _c === void 0 ? void 0 : _c.map((e) => ({ label: e, value: e })));
    if ((_d = this._schemaEnum) === null || _d === void 0 ? void 0 : _d.length) {
      items = items.filter((item) => this._schemaEnum.includes(item.value));
    }
    return items;
  }
  /**
   * Get the enum  from the schema, which can dictate which items are actually rendered
   */
  get _schemaEnum() {
    var _a;
    const schemaEnum = this._isSingleSelect
      ? this.params.schema.enum
      : (_a = this.params.schema.items) === null || _a === void 0 ? void 0 : _a.enum;
    return schemaEnum || [];
  }
  /**
   * Fires each time a selection is changed in the combobox
   * @param evt
   */
  handleCalciteComboboxChange(evt) {
    const { value } = evt.target;
    let items = value;
    /**
     * Even when the combobox is in "multiple"/"ancestor" selection mode, it
     * will emit a string when there's a single item selected, and it will emit
     * an empty string when nothing is selected. For JSON schema validation
     * purposes, we need to keep the format consistent, so we convert the
     * selection (or lack thereof) to an array
     */
    if (!this._isSingleSelect && typeof value === 'string') {
      items = value.length ? [value] : [];
    }
    this.arcgisConfigurationEditorFieldInputChange.emit(items);
  }
  /**
   * Render the combobox items. If an enum is provided in the schema,
   * only render items in the uiSchema that match those items in the enum.
   * If no item is provided in the uiSchema, render the items
   * in the enum in the schema.
   */
  renderComboboxItems() {
    return (h(CalciteComboboxItems, { items: this._items, onCalciteComboboxItemChange: this.handleCalciteComboboxItemChange, selectionMode: this._selectionMode, translationFunc: this.params.t, values: this.params.value }));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { allowCustomValues, placeholder, placeholderIcon, } = ((_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) || {};
    const allowCustomValuesBasedOnEnum = this._schemaEnum.length ? false : allowCustomValues;
    return (h(Host, { "data-element": "combobox-field" }, h("calcite-combobox", { allowCustomValues: allowCustomValuesBasedOnEnum, clearDisabled: (_c = (_b = this.params.uiSchema) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.clearDisabled, disabled: this.params.disabled || ((_e = (_d = this.params.uiSchema) === null || _d === void 0 ? void 0 : _d.options) === null || _e === void 0 ? void 0 : _e.disabled), label: getLabel(this.params.uiSchema, this.params.t) || this.intl.t('label'), onCalciteComboboxChange: this.handleCalciteComboboxChange, overlayPositioning: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.overlayPositioning, placeholder: placeholder, placeholderIcon: placeholderIcon, readOnly: (_j = (_h = this.params.uiSchema) === null || _h === void 0 ? void 0 : _h.options) === null || _j === void 0 ? void 0 : _j.readOnly, scale: this.params.scale, selectionMode: this._selectionMode }, this.renderComboboxItems())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { Combobox as hub_field_input_combobox };
