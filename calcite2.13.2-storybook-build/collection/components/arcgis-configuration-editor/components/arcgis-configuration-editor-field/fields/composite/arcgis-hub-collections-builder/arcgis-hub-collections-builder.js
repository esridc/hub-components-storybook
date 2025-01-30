var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import { cloneObject, createId } from '@esri/hub-common';
import { interpolateTranslations } from '../../../../../../../utils';
import { buildCollectionBuilderUiSchema, COLLECTION_APPEARANCE_BUILDER_SCHEMA, COLLECTION_APPEARANCE_BUILDER_UI_SCHEMA, COLLECTION_BUILDER_SCHEMA } from './schemas';
import Memoize from '../../../../../../../decorators/memoize';
import intlManager from '../../../../../../../utils/intl-manager';
import { mergeDeep } from '../../../../../../../utils/object';
/**
 * The arcgis-hub-collections-builder is a composite field for
 * configuring an array of IHubCollections
 */
export class ArcgisHubCollectionsBuilder {
  constructor() {
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
  static get is() { return "arcgis-hub-collections-builder"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-collections-builder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-collections-builder.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCollection",
          "resolved": "IHubCollection",
          "references": {
            "IHubCollection": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "hub collection definition"
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
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "type of entity the collection scope's query is\ntargeting. This is used internally to determine\nwhich API we query."
        },
        "attribute": "target-entity",
        "reflect": false
      },
      "availablePredicateProperties": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "PredicateProperty[]",
          "resolved": "PredicateProperty[]",
          "references": {
            "PredicateProperty": {
              "location": "import",
              "path": "../arcgis-hub-predicates-builder/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "predicate properties to present as filter options"
        }
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
          "text": "Possible callbacks for the collections builder to use on specific events"
        }
      }
    };
  }
  static get states() {
    return {
      "_collection": {},
      "_deleteConfirmationDialogVisible": {},
      "_isAppearanceSettingsEditorOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCollectionsBuilderChange",
        "name": "arcgisHubCollectionsBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the collection is updated"
        },
        "complexType": {
          "original": "IHubCollection",
          "resolved": "IHubCollection",
          "references": {
            "IHubCollection": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubCollectionsBuilderEditedCollectionKeyChange",
        "name": "arcgisHubCollectionsBuilderEditedCollectionKeyChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when we start to edit a new collection"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize("targetEntity", "availablePredicateProperties")
], ArcgisHubCollectionsBuilder.prototype, "_collectionUiSchema", null);
