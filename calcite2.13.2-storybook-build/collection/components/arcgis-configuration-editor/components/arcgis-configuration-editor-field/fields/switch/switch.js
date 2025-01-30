import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class Switch {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteSwitchChange');
  }
  handleCalciteSwitchChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.checked);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action[evt.target.checked ? "select" : "deselect"]), { label: this.params.telemetryLabel }));
  }
  render() {
    var _a;
    return (h("calcite-switch", { checked: this.params.value, disabled: this.params.disabled, label: this.params.schema.title, onCalciteSwitchChange: this.handleCalciteSwitchChange, scale: ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || this.params.scale }));
  }
  static get is() { return "hub-field-input-switch"; }
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
          "original": "boolean",
          "resolved": "boolean",
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
}
;
