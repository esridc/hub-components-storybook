import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
export class DatePicker {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteInputDatePickerChange');
  }
  handleCalciteInputDatePickerChange(evt) {
    const el = evt.target;
    this.arcgisConfigurationEditorFieldInputChange.emit(el.value);
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (h("calcite-input-date-picker", { disabled: this.params.disabled, layout: ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.layout) || 'horizontal', min: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.min, onCalciteInputDatePickerChange: this.handleCalciteInputDatePickerChange, overlayPositioning: (_f = (_e = this.params.uiSchema) === null || _e === void 0 ? void 0 : _e.options) === null || _f === void 0 ? void 0 : _f.overlayPositioning, scale: this.params.scale, value: this.params.value }));
  }
  static get is() { return "hub-field-input-date"; }
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
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
