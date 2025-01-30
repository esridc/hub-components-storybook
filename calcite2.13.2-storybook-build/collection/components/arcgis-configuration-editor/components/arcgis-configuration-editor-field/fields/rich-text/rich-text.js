import { h } from "@stencil/core";
import { bind } from "../../../../../../utils/context";
// TODO: Add a prop for setting row and overflow properties to rich text
export class RichText {
  constructor() {
    this.params = undefined;
    bind(this, "handleArcgisHubInputRichTextChange");
  }
  handleArcgisHubInputRichTextChange(evt) {
    const val = evt.target.value;
    this.arcgisConfigurationEditorFieldInputChange.emit(val);
  }
  render() {
    var _a, _b, _c, _d;
    const schema = this.params.schema;
    return (h("arcgis-hub-rich-text", { disabled: this.params.disabled, label: schema.title, onArcgisHubRichTextChange: this.handleArcgisHubInputRichTextChange, rows: ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.rows) || 5, toolbar: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.toolbar, value: this.params.value }));
  }
  static get is() { return "hub-field-input-rich-text"; }
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
