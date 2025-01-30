import { h, Host } from '@stencil/core';
import { getLabelForEnum } from '../../utils/getLabelForEnum';
/**
 * The `hub-field-input-checkbox-group` renders a collection of checkboxes. When any checkbox `checked` state changes, an `arcgisConfigurationEditorFieldInputChange` event is emitted with an array containing the values of all checkboxes that are currently checked.
 */
export class CheckboxGroup {
  constructor() {
    /**
     * Emits `arcgisConfigurationEditorFieldInputChange` with the updated array of ticked checkbox values when
     * any checkbox ticked state changes
     * @param evt
     */
    this.handleCalciteCheckboxChange = (evt) => {
      let value = this.params.value;
      const target = evt.target;
      value = target.checked
        ? [...value, target.value]
        : value.filter(val => val !== target.value);
      this.arcgisConfigurationEditorFieldInputChange.emit(value);
    };
    this.params = undefined;
  }
  /**
   * Renders an Array of calcite-checkboxes wrapped, each wrapped in a calcite-label
   */
  renderCheckboxes() {
    return this.params.schema.items.enum.map((val, idx) => {
      var _a, _b, _c, _d;
      const label = ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? (_b = this.params.uiSchema.options.labels[idx]) !== null && _b !== void 0 ? _b : val
        : getLabelForEnum(this.params.uiSchema, val, this.params.t, { path: 'label', fallback: val });
      return (h("calcite-label", { key: val, layout: "inline", scale: this.params.scale }, h("calcite-checkbox", { checked: this.params.value.includes(val), disabled: this.params.disabled || ((_d = (_c = this.params.uiSchema.options) === null || _c === void 0 ? void 0 : _c.disabled) === null || _d === void 0 ? void 0 : _d[idx]), onCalciteCheckboxChange: this.handleCalciteCheckboxChange, scale: this.params.scale, value: val }), label));
    });
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, null, h("div", null, this.renderCheckboxes())));
  }
  static get is() { return "hub-field-input-checkbox-group"; }
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
          "text": "The render parameters for the component"
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
          "text": "Emitted when checkboxes' checked state changes"
        },
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        }
      }];
  }
}
