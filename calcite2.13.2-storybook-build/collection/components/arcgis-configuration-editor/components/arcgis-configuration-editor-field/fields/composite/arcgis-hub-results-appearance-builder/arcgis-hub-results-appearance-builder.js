import { h, Host } from "@stencil/core";
import intlManager from "../../../../../../../utils/intl-manager";
import { GalleryDisplayConfigSchema } from "@esri/hub-common";
import { getResultsAppearanceBuilderUiSchema } from "./schemas";
export class ArcgisHubResultsAppearanceBuilder {
  constructor() {
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * Event handler for when the results appearance configuration editor changes
     */
    this.handleResultsAppearanceBuilderChange = (event) => {
      this.arcgisHubResultsAppearanceBuilderChange.emit(event.detail);
    };
    this.displayConfig = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns the schema for the results appearance builder
   */
  get _schema() {
    return GalleryDisplayConfigSchema;
  }
  ;
  /**
   * Returns the uiSchema for the results appearance builder
   */
  get _uiSchema() {
    return getResultsAppearanceBuilderUiSchema();
  }
  render() {
    return (h(Host, { "data-element": "results-appearance-builder" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleResultsAppearanceBuilderChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.displayConfig })));
  }
  static get is() { return "arcgis-hub-results-appearance-builder"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "displayConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGalleryDisplayConfig",
          "resolved": "IGalleryDisplayConfig",
          "references": {
            "IGalleryDisplayConfig": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The display configuration for the gallery"
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubResultsAppearanceBuilderChange",
        "name": "arcgisHubResultsAppearanceBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the results appearance configuration editor changes"
        },
        "complexType": {
          "original": "IGalleryDisplayConfig",
          "resolved": "IGalleryDisplayConfig",
          "references": {
            "IGalleryDisplayConfig": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
