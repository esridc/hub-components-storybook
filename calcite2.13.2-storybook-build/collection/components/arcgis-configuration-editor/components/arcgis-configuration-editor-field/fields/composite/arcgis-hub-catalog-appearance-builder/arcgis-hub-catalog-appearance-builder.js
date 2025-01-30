import { h, Host } from "@stencil/core";
import intlManager from '../../../../../../../utils/intl-manager';
import { cloneObject } from "@esri/hub-common";
import { CONFIGURATION_VARIANTS } from "../../../../../resources";
import { getDisplayConfigUiSchema, DisplayConfigSchema } from "./schemas";
import { mergeDeep } from "../../../../../../../utils/object";
import { CatalogAppearanceEditors } from "./resources";
/**
 * The arcgis-hub-catalog-appearance-builder is a composite field for
 * configuring the appearance of an IHubCatalog. See readme for additional details.
 */
export class ArcgisHubCatalogAppearanceBuilder {
  constructor() {
    /**
    * wrapper around the built-in intl.t function that
    * encapsulates the translation strings from this
    * component to pass into the configuration editor
    */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * Handles a change from the appearance editor
     * @param evt
     */
    this.handleAppearanceEditorChange = (evt) => {
      evt.stopPropagation();
      let { values } = evt.detail;
      const { displayConfig } = values;
      // if we have a display config to work with
      if (displayConfig) {
        // 1. Wrap values in target entity
        values = { [this.targetEntity]: displayConfig };
        // 2. merge new values into the existing catalog
        this._catalogDisplayConfig = mergeDeep(cloneObject(this._catalogDisplayConfig), cloneObject(values));
        // 3. emit the change
        this.arcgisHubCatalogAppearanceBuilderChange.emit(this._catalogDisplayConfig);
      }
    };
    /**
     * opens the editor depending on if we should open the "results" editor or the "collections" editor.
     * @param evt
     */
    this.handleOnEditorOpen = () => {
      this._isAppearanceEditorOpen = true;
    };
    /**
     * Closes the appearance editor.
     */
    this.handleOnEditorClose = (event) => {
      event.stopPropagation();
      this._isAppearanceEditorOpen = false;
    };
    this.catalogDisplayConfig = undefined;
    this.targetEntity = undefined;
    this.callbacks = undefined;
    this._catalogDisplayConfig = {};
    this._isAppearanceEditorOpen = false;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this._catalogDisplayConfig = cloneObject(this.catalogDisplayConfig);
  }
  /**
   * Reference to upper level calcite flow to hook into
   */
  get _calciteFlowRef() {
    var _a;
    let calciteFlow;
    if ((_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.calciteFlowRefCallback) {
      calciteFlow = this.callbacks.calciteFlowRefCallback();
    }
    return calciteFlow;
  }
  /**
   * Returns the correct schema for the editor depending on which editor is selected
   */
  get _schema() {
    return DisplayConfigSchema;
  }
  /**
   * Returns the correct uiSchema for the editor depending on which editor is selected
   */
  get _uiSchema() {
    return getDisplayConfigUiSchema();
  }
  /**
   * Returns the correct values for the editor, separated by target entity
   */
  get _values() {
    let values = this._catalogDisplayConfig;
    // grab the appearance settings just for this target entity
    if (values && this.targetEntity) {
      values = values[this.targetEntity];
    }
    return { displayConfig: values };
  }
  /**
 * renders the editor for the appearance builder, either the results editor
 * or the collections editor depending on which is selected
 * @returns
 */
  renderEditor() {
    return (h("arcgis-wormhole", { includeWormholeElement: false, target: this._calciteFlowRef }, h("calcite-flow-item", { description: this._intl.t(`results.heading`), heading: this._intl.t("catalogAppearance.heading"), onCalciteFlowItemBack: this.handleOnEditorClose }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleAppearanceEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._values, variant: CONFIGURATION_VARIANTS.workspace }))));
  }
  /**
   * renders the results and collections sections for the appearance panel
   * @returns
   */
  renderAppearancePanelSections() {
    return (h("div", null, h("calcite-block", { heading: this._intl.t("results.heading") }, h("calcite-action", { "data-editor": CatalogAppearanceEditors.Results, icon: "chevron-right", onClick: this.handleOnEditorOpen, slot: "control", text: this._intl.t("results.configureAction") }))));
  }
  render() {
    return (h(Host, { "data-element": "catalog-appearance-builder" }, this.renderAppearancePanelSections(), this._isAppearanceEditorOpen && this.renderEditor()));
  }
  static get is() { return "arcgis-hub-catalog-appearance-builder"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-catalog-appearance-builder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-catalog-appearance-builder.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "catalogDisplayConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ displayConfig: IGalleryDisplayConfig }",
          "resolved": "{ displayConfig: IGalleryDisplayConfig; }",
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
          "text": "hub catalog definition"
        }
      },
      "targetEntity": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityType",
          "resolved": "\"channel\" | \"communityUser\" | \"discussionPost\" | \"event\" | \"eventAttendee\" | \"group\" | \"groupMember\" | \"item\" | \"portalUser\" | \"user\"",
          "references": {
            "EntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "current target entity we are working with"
        },
        "attribute": "target-entity",
        "reflect": false
      },
      "callbacks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICatalogBuilderCallbacks",
          "resolved": "ICatalogBuilderCallbacks",
          "references": {
            "ICatalogBuilderCallbacks": {
              "location": "import",
              "path": "../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "optional callbacks from the catalog builder"
        }
      }
    };
  }
  static get states() {
    return {
      "_catalogDisplayConfig": {},
      "_isAppearanceEditorOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCatalogAppearanceBuilderChange",
        "name": "arcgisHubCatalogAppearanceBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
