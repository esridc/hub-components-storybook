import { h, Host } from "@stencil/core";
import { bind } from "../../../../../../utils/context";
export class LocationPicker {
  constructor() {
    this.params = undefined;
    bind(this, 'handleArcgisHubInputLocationPickerChange');
  }
  get options() {
    var _a, _b;
    const defaultOptions = [{ label: '', location: { type: 'none' } }];
    const uiSchemaOptions = ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.options) || defaultOptions;
    // We assume the parent (what is constructing these options for the location picker)
    // has handled the translation of label/descriptions.
    return uiSchemaOptions;
  }
  handleArcgisHubInputLocationPickerChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.detail);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return (h(Host, { "data-element": "location-picker-field" }, h("arcgis-hub-location-picker", { extent: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.extent, locationNameRequired: (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options.locationNameRequired, mapTools: (_e = (_d = this.params.uiSchema) === null || _d === void 0 ? void 0 : _d.options) === null || _e === void 0 ? void 0 : _e.mapTools, noticeTitleElementAriaLevel: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.noticeTitleElementAriaLevel, onArcgisHubLocationPickerUpdate: this.handleArcgisHubInputLocationPickerChange, options: this.options, resetDrawingToolsOnDisconnect: (_j = (_h = this.params.uiSchema) === null || _h === void 0 ? void 0 : _h.options) === null || _j === void 0 ? void 0 : _j.resetDrawingToolsOnDisconnect })));
  }
  static get is() { return "hub-field-input-location-picker"; }
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
          "original": "IHubLocation",
          "resolved": "IHubLocation",
          "references": {
            "IHubLocation": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
}
