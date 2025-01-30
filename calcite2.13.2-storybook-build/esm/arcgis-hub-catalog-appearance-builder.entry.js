import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';

/**
 * Schema for the results appearance editing experience
 */
const DisplayConfigSchema = {
  type: "object",
  properties: {
    displayConfig: {
      type: "object",
    }
  }
};
/**
 * UiSchema for the results appearance editing experience -- delegates to the results-appearance-builder
 */
const getDisplayConfigUiSchema = () => {
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        elements: [
          {
            type: "Control",
            scope: "/properties/displayConfig",
            options: {
              control: "arcgis-hub-results-appearance-builder",
            }
          }
        ]
      }
    ]
  };
};

/**
 * The different editors available for configuring the appearance of a catalog.
 *
 * Collections - The editor for configuring the appearance of the collections in a catalog (position, visibility, etc)
 * Results - The editor for configuring the appearance of the search results in a catalog (corners, dropShadow, etc)
 */
var CatalogAppearanceEditors;
(function (CatalogAppearanceEditors) {
  CatalogAppearanceEditors["Collections"] = "collections";
  CatalogAppearanceEditors["Results"] = "results";
})(CatalogAppearanceEditors || (CatalogAppearanceEditors = {}));

const arcgisHubCatalogAppearanceBuilderCss = "calcite-block.section-block--l.sc-hub-section-block{--calcite-font-size--1:0.875rem}";

const ArcgisHubCatalogAppearanceBuilder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCatalogAppearanceBuilderChange = createEvent(this, "arcgisHubCatalogAppearanceBuilderChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubCatalogAppearanceBuilder.style = arcgisHubCatalogAppearanceBuilderCss;

export { ArcgisHubCatalogAppearanceBuilder as arcgis_hub_catalog_appearance_builder };
