import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
export class ColorPicker {
  constructor() {
    this.params = undefined;
    bind(this, 'handleArcgisHubInputColorChange');
  }
  handleArcgisHubInputColorChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
  }
  render() {
    var _a, _b;
    const schema = this.params.schema;
    return (h("arcgis-hub-input-color", { disabled: this.params.disabled, label: schema.title, onArcgisHubInputColorChange: this.handleArcgisHubInputColorChange, savedColors: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.savedColors, value: this.params.value }));
  }
  static get is() { return "hub-field-input-color"; }
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
