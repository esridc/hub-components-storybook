import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
export class Multiselect {
  constructor() {
    this.params = undefined;
    bind(this, 'handleHubMultiselectChange');
  }
  handleHubMultiselectChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.detail.values);
  }
  render() {
    const values = this.params.value || [];
    return (h("hub-multiselect", { disabled: this.params.disabled, label: this.params.schema.title, onHubMultiselectChange: this.handleHubMultiselectChange, scale: this.params.scale, values: values }));
  }
  static get is() { return "hub-field-input-multiselect"; }
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
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        }
      }];
  }
}
