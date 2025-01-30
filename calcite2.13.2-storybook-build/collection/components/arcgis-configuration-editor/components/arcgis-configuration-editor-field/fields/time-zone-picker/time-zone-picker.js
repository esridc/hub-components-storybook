import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
/**
 * IANA Time Zone Picker
 * Expects to receive `params.value: string` of a IANA time zone (e.g. "America/New_York")
 */
export class TimeZonePicker {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteInputTimeZonePickerChange');
  }
  handleCalciteInputTimeZonePickerChange(evt) {
    const el = evt.target;
    this.arcgisConfigurationEditorFieldInputChange.emit(el.value);
  }
  render() {
    var _a, _b;
    return (h("calcite-input-time-zone", { disabled: this.params.disabled, mode: "name", onCalciteInputTimeZoneChange: this.handleCalciteInputTimeZonePickerChange, overlayPositioning: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.overlayPositioning, scale: this.params.scale, value: this.params.value }));
  }
  static get is() { return "hub-field-input-time-zone"; }
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
          "text": "Payload will be an IANA time zone string (e.g. \"America/New_York\")"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
