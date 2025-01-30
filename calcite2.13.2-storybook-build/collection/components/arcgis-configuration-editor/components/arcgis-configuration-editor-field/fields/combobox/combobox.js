import { h, Host } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import intlManager from '../../../../../../utils/intl-manager';
import { getLabel } from '../../../../utils';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { CalciteComboboxItems } from '../../../../../functional/calcite-combobox-items';
/**
 * The Combobox component renders a list of items in a calcite combobox
 * as calcite combobox items. Users have the option to allow entries of custom values
 * with the allowCustomValues option. They may also specify the selection mode of the combobox
 * with the selectionMode option(single, multiple or ancestors).
 * The Combobox works for both pre-defined/static and dynamic options.
 * For pre-defined/static option, an enum is provided in the schema,
 * all items in uiSchema.options.items will be rendered in the combobox.
 * For dynamic option, an enum is not provided in the schema,
 * items in uiSchema.options.items that are not defined in schema.items will be ignored.
 * NOTE, if an enum is provided in the schema, allowCustomValues will also be ignored.
 */
export class Combobox {
  constructor() {
    /**
     * Fires each time an item is selected or deselected in the combobox.
     * This event will propogate up to then call calciteComboboxChange event.
     * @param evt
     */
    this.handleCalciteComboboxItemChange = (evt) => {
      const { value, selected } = evt.target;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action[selected ? "select" : "deselect"]), { label: this.params.telemetryLabel, details: value }));
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
  static get is() { return "hub-field-input-combobox"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IRenderParams",
          "resolved": "IRenderParams",
          "references": {
            "IRenderParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorFieldInputChange",
        "name": "arcgisConfigurationEditorFieldInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        }
      }, {
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
      }];
  }
  static get elementRef() { return "element"; }
}
