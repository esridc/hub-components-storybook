import { h } from "@stencil/core";
import { bind } from "../../../../../../utils/context";
import { getLabel } from "../../../../utils";
/** Deprecated - please use the location picker field instead */
export class BoundaryPicker {
  constructor() {
    this.params = undefined;
    this.sources = undefined;
    bind(this, 'handleArcgisHubInputBoundaryPickerChange');
  }
  componentWillLoad() {
    // we want to generate the sources once on load, otherwise when the sources
    // update the arcgis-boundary-picker-ui resets the selected geometry to
    // the initial selection
    this.sources = this.getSources();
  }
  /**
   * generate the boundary picker sources from the uiSchema options.
   * This function handles source label translations if a labelKey is
   * provided
   */
  getSources() {
    var _a, _b;
    const defaultSources = [{ value: 'none', selected: true }];
    const uiSchemaSources = ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.sources) || [];
    return uiSchemaSources
      ? uiSchemaSources.map(source => {
        const label = getLabel(source, this.params.t);
        delete source.labelKey;
        return Object.assign(source, Object.assign({}, (label && { label })));
      })
      : defaultSources;
  }
  handleArcgisHubInputBoundaryPickerChange(evt) {
    var _a;
    if (evt.detail.graphic) {
      const { xmin, ymin, xmax, ymax, spatialReference } = (_a = evt.detail.graphic) === null || _a === void 0 ? void 0 : _a.geometry;
      this.arcgisConfigurationEditorFieldInputChange.emit({
        xmin, ymin, xmax, ymax,
        spatialReference: { wkid: spatialReference.wkid }
      });
    }
    else {
      // This is needed because unless we overwrite all the
      // values, the config editor won't pick up changes.
      // IE just passing undefined will output from the config-editor
      // the original values.
      this.arcgisConfigurationEditorFieldInputChange.emit({
        xmin: null, ymin: null, xmax: null, ymax: null,
        spatialReference: { wkid: null }
      });
    }
  }
  render() {
    var _a, _b;
    return (h("arcgis-boundary-picker-ui", { extent: this.params.value, onArcgisBoundaryPickerUpdate: this.handleArcgisHubInputBoundaryPickerChange, resetDrawingToolsOnDisconnect: !!((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.resetDrawingToolsOnDisconnect), sources: this.sources }));
  }
  static get is() { return "hub-field-input-boundary-picker"; }
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
  static get states() {
    return {
      "sources": {}
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
          "original": "IExtent",
          "resolved": "IExtent",
          "references": {
            "IExtent": {
              "location": "import",
              "path": "@esri/arcgis-rest-feature-layer"
            }
          }
        }
      }];
  }
}
