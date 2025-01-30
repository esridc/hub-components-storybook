import { cloneObject } from "@esri/hub-common";
import { h, Host } from "@stencil/core";
import intlManager from "../../../../../../../utils/intl-manager";
import { getCollectionsAppearanceBuilderUiSchema } from "./schemas";
import { COLLECTIONS_APPEARANCE_BUILDER_SCHEMA } from "./schemas";
import { CONFIGURATION_VARIANTS } from "../../../../../resources";
/**
 * The arcgis-hub-collections-appearance-builder is a composite field for
 * configuring the appearance of an IHubCollection. See readme for additional details.
 */
export class ArcgisHubCollectionsAppearanceBuilder {
  constructor() {
    /**
     * Handles a change from the collections appearance builder
     * Updates internal state and emits the change event
     */
    this.handleCollectionsAppearanceBuilderChange = (evt) => {
      evt.stopPropagation();
      // update the internal state
      const { values } = evt.detail;
      this._displayConfig = values;
      this.arcgisHubCollectionsAppearanceBuilderChange.emit(this._displayConfig);
    };
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.calciteFlowRefCallback = undefined;
    this.displayConfig = undefined;
    this._displayConfig = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns the correct schema for the editor depending on which editor is selected
   */
  get _schema() {
    return cloneObject(COLLECTIONS_APPEARANCE_BUILDER_SCHEMA);
  }
  ;
  /**
   * Returns the correct uiSchema for the editor depending on which editor is selected
   */
  get _uiSchema() {
    return getCollectionsAppearanceBuilderUiSchema({ intl: this._intl });
  }
  /**
   * Renders an instance of the configuration editor
   * @returns
   */
  renderEditor() {
    return h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCollectionsAppearanceBuilderChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: Object.assign({}, this._displayConfig), variant: CONFIGURATION_VARIANTS.workspace });
  }
  render() {
    return (h(Host, { "data-element": "collections-appearance-builder" }, this.renderEditor()));
  }
  static get is() { return "arcgis-hub-collections-appearance-builder"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-collections-appearance-builder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-collections-appearance-builder.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "calciteFlowRefCallback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "() => HTMLCalciteFlowElement",
          "resolved": "() => HTMLCalciteFlowElement",
          "references": {
            "HTMLCalciteFlowElement": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "optional reference to a calcite flow element to insert the flow for a specific collection"
        }
      },
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
          "text": "hub collections definition"
        }
      }
    };
  }
  static get states() {
    return {
      "_displayConfig": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCollectionsAppearanceBuilderChange",
        "name": "arcgisHubCollectionsAppearanceBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
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
