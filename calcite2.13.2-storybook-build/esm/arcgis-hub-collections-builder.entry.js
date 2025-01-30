import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { a as CollectionSchema, b as CollectionAppearanceSchema } from './CatalogSchema-e8481cdb.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { a as cloneObject, c as createId } from './util-3e6872d9.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './enums-783e40b4.js';
import './generate-random-string-1436d9e6.js';
import './get-prop-ec5be510.js';

const COLLECTION_BUILDER_SCHEMA = CollectionSchema;
const buildCollectionBuilderUiSchema = (opts) => {
  const { targetEntity, availablePredicateProperties } = opts;
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        elements: [
          {
            scope: "/properties/label",
            type: "Control",
            label: "{{name.label:translate}}",
            options: {
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: `{{name.requiredError:translate}}`,
                }
              ]
            }
          },
        ],
      },
      {
        scope: "/properties/scope",
        type: "Control",
        options: {
          control: "arcgis-hub-query-builder",
          targetEntity,
          availablePredicateProperties,
          queryContext: "collection"
        }
      }
    ]
  };
};
/**
 * Schema for building the appearance of a collection
 */
const COLLECTION_APPEARANCE_BUILDER_SCHEMA = CollectionAppearanceSchema;
/**
 * UiSchema for building the appearance of a collection
 */
const COLLECTION_APPEARANCE_BUILDER_UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      type: "Control",
      scope: "/properties/displayConfig",
      options: {
        control: "arcgis-hub-collections-appearance-builder"
      }
    }
  ]
};

const arcgisHubCollectionsBuilderCss = ".collections__add:not(:last-child){margin-bottom:1rem}:host{position:relative}.collections-builder-appearance-settings{position:absolute;bottom:0px}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubCollectionsBuilder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCollectionsBuilderChange = createEvent(this, "arcgisHubCollectionsBuilderChange", 7);
    this.arcgisHubCollectionsBuilderEditedCollectionKeyChange = createEvent(this, "arcgisHubCollectionsBuilderEditedCollectionKeyChange", 7);
    this._collectionSchema = cloneObject(COLLECTION_BUILDER_SCHEMA);
    this._appearanceSchema = cloneObject(COLLECTION_APPEARANCE_BUILDER_SCHEMA);
    this._appearanceUiSchema = cloneObject(COLLECTION_APPEARANCE_BUILDER_UI_SCHEMA);
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * Emits the key of the collection now being edited
     * @param key
     */
    this.setEditKey = (key) => {
      var _a;
      if ((_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onCollectionEditedKeyChange) {
        this.callbacks.onCollectionEditedKeyChange(key);
      }
    };
    this.handleCollectionEditorChange = (evt) => {
      evt.stopPropagation();
      const { values, valid } = evt.detail;
      // 1. merge new values into the existing collection
      mergeDeep(this._collection, cloneObject(values));
      // 2. update the collection's validity
      this._collection.isValid = valid;
      // 3. emit the change -- we only do this on valid, so that only valid changes are ever saved
      valid && this.arcgisHubCollectionsBuilderChange.emit(this.transformCollectionToEmit(this._collection));
    };
    /** handler for when a collection is deleted. */
    this.handleDeleteCollection = () => {
      this.setEditKey(null);
      // we emit undefined so that the list field knows the collection is removed
      this.arcgisHubCollectionsBuilderChange.emit(undefined);
      this.closeDeleteConfirmation();
    };
    /**
     * Closes the delete confirmation dialog
     */
    this.closeDeleteConfirmation = () => {
      this._deleteConfirmationDialogVisible = false;
    };
    /**
     * Launches the delete confirmation dialog
     * @param evt
     */
    this.handleLaunchDeleteConfirmation = () => {
      this._deleteConfirmationDialogVisible = true;
    };
    /**
     * Handler for when the appearance settings are opened
     */
    this.handleOpenAppearanceSettingsEditor = () => {
      this._isAppearanceSettingsEditorOpen = true;
    };
    /**
     * Handler for when the appearance settings editor is closed
     */
    this.handleCloseAppearanceSettingsEditor = (event) => {
      event.stopPropagation();
      this._isAppearanceSettingsEditorOpen = false;
    };
    this.values = undefined;
    this.targetEntity = undefined;
    this.availablePredicateProperties = undefined;
    this.callbacks = undefined;
    this._collection = undefined;
    this._deleteConfirmationDialogVisible = false;
    this._isAppearanceSettingsEditorOpen = false;
  }
  get _flowTarget() {
    var _a;
    let flowTarget;
    // if the callback exists, call it to get the flow target
    if ((_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.calciteFlowRefCallback) {
      flowTarget = this.callbacks.calciteFlowRefCallback();
    }
    return flowTarget;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this._collection = this.transformCollectionForEditor(this.values);
    this.setEditKey(this._collection.key);
  }
  /** dynamically generated collection builder uiSchema */
  get _collectionUiSchema() {
    return interpolateTranslations(this._intl, buildCollectionBuilderUiSchema({
      targetEntity: this.targetEntity,
      availablePredicateProperties: this.availablePredicateProperties
    }));
  }
  /**
   * function to transform the collections into a format that is
   * consistent with the underlying collections editor
   */
  transformCollectionForEditor(collection = {}) {
    var _a;
    const transformedCollection = cloneObject(collection);
    // 1. add the isValid flag to the collection - by default
    // it should be valid if it's been passed in
    transformedCollection.isValid = true;
    // 2. create a key if it doesn't have one yet
    if (!transformedCollection.key) {
      transformedCollection.key = createId('collection');
    }
    // 3. add a display config if it doesn't have one yet
    if (!transformedCollection.displayConfig) {
      transformedCollection.displayConfig = { hidden: false };
    }
    // 4. add targetEntity if it doesn't have it yet
    if (!transformedCollection.targetEntity) {
      transformedCollection.targetEntity = this.targetEntity;
    }
    // 5. add filters if it doesn't have it
    if (!((_a = transformedCollection.scope) === null || _a === void 0 ? void 0 : _a.filters)) {
      transformedCollection.scope = Object.assign(Object.assign({}, transformedCollection.scope), { targetEntity: this.targetEntity, filters: [{ predicates: [] }] });
    }
    return transformedCollection;
  }
  /**
   * function to transform the editor values into a
   * valid IHubCollection before emitting
   */
  transformCollectionToEmit(collection) {
    var _a, _b, _c;
    const transformedCollection = cloneObject(collection);
    // 1. set a default "empty" filter on the collection if none exist
    if (!((_b = (_a = transformedCollection.scope) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.length) || !((_c = transformedCollection.scope.filters[0].predicates) === null || _c === void 0 ? void 0 : _c.length)) {
      transformedCollection.scope = Object.assign(Object.assign({}, transformedCollection.scope), { targetEntity: this.targetEntity, filters: [{ predicates: [] }] });
    }
    // 2. remove internal-only properties
    delete transformedCollection.isValid;
    return transformedCollection;
  }
  /**
   * Renders the delete collection button in the edit experience
   * @returns
   */
  renderDeleteButton() {
    return (h("calcite-button", { appearance: "transparent", kind: "danger", onClick: this.handleLaunchDeleteConfirmation, width: "full" }, this._intl.t("actions.deleteCollection")));
  }
  renderCollectionEditor() {
    return (this._collection && (h("arcgis-configuration-editor", { class: "collections-builder-editor", "data-key": this._collection.key, onArcgisConfigurationEditorChange: this.handleCollectionEditorChange, schema: this._collectionSchema, t: this.translationFunc, uiSchema: this._collectionUiSchema, values: this._collection })));
  }
  /**
   * Renders the dialog to confirm deletion of a collection
   * @returns
   */
  renderDeleteConfirmationDialog() {
    var _a;
    console.log("render delete confirmation dialog", this._deleteConfirmationDialogVisible);
    return (h("arcgis-wormhole", null, h("calcite-dialog", { heading: this._intl.t("actions.delete", { label: ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.label) || this._intl.t("newCollection") }), kind: "danger", modal: true, open: true, placement: "center", scale: "m", widthScale: "m" }, h("div", { slot: "footer-start" }, h("calcite-button", { onClick: this.closeDeleteConfirmation }, this._intl.t("actions.cancelButton"))), h("div", { slot: "footer-end" }, h("calcite-button", { appearance: "outline", kind: "danger", onClick: this.handleDeleteCollection }, this._intl.t("actions.deleteButton"))), h("p", null, this._intl.t("actions.deleteConfirmation")))));
  }
  renderAppearanceSettingsBlock() {
    return (h("calcite-list", { class: "collections-builder-appearance-settings" }, h("calcite-list-item", { description: this._intl.t("appearance.description"), heading: this._intl.t("appearance.heading"), onClick: this.handleOpenAppearanceSettingsEditor }, h("calcite-icon", { icon: "list-check", slot: "content-start" }), h("calcite-action", { icon: "chevron-right", slot: "actions-end" }))));
  }
  /**
   * Renders the editor for the collection appearance settings
   * @returns
   */
  renderAppearanceSettingsEditor() {
    var _a, _b;
    return (h("arcgis-wormhole", { includeWormholeElement: false, target: this._flowTarget }, h("calcite-flow-item", { heading: this._intl.t("appearance.flowTitle", { label: ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.label) || this._intl.t("newCollection") }), onCalciteFlowItemBack: this.handleCloseAppearanceSettingsEditor }, h("arcgis-configuration-editor", { schema: this._appearanceSchema, uiSchema: this._appearanceUiSchema, values: (_b = this._collection) === null || _b === void 0 ? void 0 : _b.displayConfig }))));
  }
  render() {
    return (h(Host, { "data-element": "collections-builder" }, !!this._collection && this.renderCollectionEditor(), this.renderDeleteButton(), this.renderAppearanceSettingsBlock(), this._isAppearanceSettingsEditorOpen && this.renderAppearanceSettingsEditor(), this._deleteConfirmationDialogVisible && this.renderDeleteConfirmationDialog()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory("targetEntity", "availablePredicateProperties")
], ArcgisHubCollectionsBuilder.prototype, "_collectionUiSchema", null);
ArcgisHubCollectionsBuilder.style = arcgisHubCollectionsBuilderCss;

export { ArcgisHubCollectionsBuilder as arcgis_hub_collections_builder };
