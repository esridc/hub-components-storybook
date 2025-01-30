import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
/**
 * Time (hours and minutes) Picker
 * Expects `params.valye: string` of a time string (e.g. "12:00" or "22:14:00")
 */
export class TimePicker {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteInputTimePickerChange');
  }
  handleCalciteInputTimePickerChange(evt) {
    const el = evt.target;
    // Since we are not passing seconds, we add them here
    // if there is only 1 `:` in the time string, we add `:00` to the end
    let time = el.value;
    if (time.split(':').length === 2) {
      time = `${time}:00`;
    }
    this.arcgisConfigurationEditorFieldInputChange.emit(time);
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (h("calcite-input-time-picker", { disabled: this.params.disabled, onCalciteInputTimePickerChange: this.handleCalciteInputTimePickerChange, overlayPositioning: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.overlayPositioning, placement: ((_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.placement) || 'auto', scale: this.params.scale, step: ((_f = (_e = this.params.uiSchema) === null || _e === void 0 ? void 0 : _e.options) === null || _f === void 0 ? void 0 : _f.step) || 60, value: this.params.value }));
  }
  static get is() { return "hub-field-input-time"; }
  static get encapsulation() { return "shadow"; }
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
          "text": "Payload will be a time string (e.g. \"2:00:00\" or \"22:14:00\")"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
