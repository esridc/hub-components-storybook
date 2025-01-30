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
import { cloneObject } from '@esri/hub-common';
import { interpolateTranslations } from '../../../../../../../utils';
import { buildCatalogBuilderUiSchema, CATALOG_BUILDER_SCHEMA } from './schemas';
import intlManager from '../../../../../../../utils/intl-manager';
import Memoize from '../../../../../../../decorators/memoize';
import { mergeDeep } from '../../../../../../../utils/object';
import { CONFIGURATION_VARIANTS } from '../../../../../resources';
/**
 * The arcgis-hub-catalog-builder is a composite field for
 * configuring an IHubCatalog. See readme for additional
 * details.
 */
export class ArcgisHubCatalogBuilder {
  constructor() {
    this._schema = cloneObject(CATALOG_BUILDER_SCHEMA);
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * determines whether a specific target entity has been
     * configured in the catalog by checking its scopes and
     * collections
     */
    this.isTargetEntityConfigured = (targetEntity) => {
      var _a, _b;
      const hasScope = Object.keys(((_a = this._catalog) === null || _a === void 0 ? void 0 : _a.scopes) || {}).includes(targetEntity)
        && ((_b = this._catalog.scopes[targetEntity].filters) === null || _b === void 0 ? void 0 : _b.length) > 0;
      const hasCollections = this._collections.some((collection) => collection.targetEntity === targetEntity);
      return hasScope || hasCollections;
    };
    /**
     * since collections are configured on a per-targetEntity basis
     * in the UI, we must merge them back together before persisting
     * them on the catalog which stores collections for all target
     * entities in a single array
     */
    this.mergeCollections = (newlyConfiguredCollections) => {
      var _a;
      // 1. grab the collections for the currentTargetEntity
      // from the internal state
      const currentTargetEntityCollections = this._collections.filter((c) => c.targetEntity === this.targetEntity);
      // 2. if the updated array of collections no longer includes a
      // collection that was previously configured for a target entity,
      // we can assume it was deleted and we'll need to remove it from
      // the internal state
      const collectionsToRemove = currentTargetEntityCollections.filter((c) => !newlyConfiguredCollections.find((cc) => cc.key === c.key));
      // 2.5 if we have a callback to notify when collections are removed,
      // we call it here
      if ((_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onCollectionsRemovedCallback) {
        this.callbacks.onCollectionsRemovedCallback(collectionsToRemove.map((c) => c.key));
      }
      // we start with the internal state of collections minus
      // any collections that were removed and any collections that are the same target entity, as we want to respect the new order
      const allOtherCollections = this._collections.filter((c) => c.targetEntity !== this.targetEntity && !collectionsToRemove.find((cc) => cc.key === c.key));
      // 3. add the updated collections into the internal state in the same order given
      return [...allOtherCollections, ...newlyConfiguredCollections];
    };
    this.handleCatalogEditorChange = (evt) => {
      evt.stopPropagation();
      const { values } = evt.detail;
      // 1. merge new values into the existing catalog
      const _catalog = mergeDeep(cloneObject(this._catalog), cloneObject(values));
      // 2. merge target entity collections
      this._collections = this.mergeCollections(_catalog.collections);
      // 2.5 update the internal catalog, so that the collections are only for the current target entity
      this._catalog = _catalog;
      // 3 emit the change with all collections, regardless of target entity
      this.arcgisHubCatalogBuilderChange.emit(this.transformCatalogToEmit(Object.assign(Object.assign({}, _catalog), { collections: this._collections })));
    };
    /**
     * focuses the calcite-flow item when it is first opened
     * @param item
     */
    this.setCalciteFlowItemFocus = (item) => {
      if (item && item.setFocus) {
        item.setFocus();
      }
    };
    this.catalog = undefined;
    this.targetEntity = "item";
    this.callbacks = undefined;
    this._catalog = undefined;
  }
  async componentWillLoad() {
    var _a;
    // 1. load intl
    this._intl = await intlManager.loadIntlForComponent(this.element);
    // 2. Prepare internal state of catalog and collections
    this._catalog = this.transformCatalogForEditor(this.catalog);
    this._collections = ((_a = this.catalog) === null || _a === void 0 ? void 0 : _a.collections) || [];
  }
  /** dynamically generated catalog builder uiSchema */
  get _uiSchema() {
    var _a;
    return interpolateTranslations(this._intl, buildCatalogBuilderUiSchema({
      targetEntity: this.targetEntity,
      callbacks: Object.assign(Object.assign({}, this.callbacks), { onQueryBuilderChangeCallback: (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onCatalogScopeChangeCallback }),
      intl: this._intl,
    }));
  }
  /**
   * function to transform the incoming IHubCatalog into a format
   * that is consistent with the underlying catalog editor
   */
  transformCatalogForEditor(catalog) {
    const transformedCatalog = cloneObject(catalog);
    const collections = transformedCatalog.collections ? [...transformedCatalog.collections] : [];
    transformedCatalog.collections = collections.reduce((acc, collection) => {
      if (collection.targetEntity === this.targetEntity) {
        const transformedCollection = cloneObject(collection);
        acc.push(transformedCollection);
      }
      ;
      return acc;
    }, []);
    return transformedCatalog;
  }
  /**
   * function to transform the editor values into a valid
   * IHubCatalog before emitting
   */
  transformCatalogToEmit(catalog) {
    const transformedCatalog = cloneObject(catalog);
    // 1. add the catalog schema version if it doesn't exist
    if (!transformedCatalog.schemaVersion) {
      transformedCatalog.schemaVersion = 1;
    }
    ;
    // 2. if a target entity's scope is effectively
    // "empty", we remove it from the catalog definition
    Object.entries(transformedCatalog.scopes || {}).forEach(([targetEntity, scope]) => {
      var _a;
      if (!((_a = scope.filters) === null || _a === void 0 ? void 0 : _a.length)) {
        delete transformedCatalog.scopes[targetEntity];
      }
    });
    return transformedCatalog;
  }
  renderEditor() {
    return (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCatalogEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._catalog, variant: CONFIGURATION_VARIANTS.workspace }));
  }
  render() {
    return (h(Host, { "data-element": "catalog-builder-field" }, this.renderEditor()));
  }
  static get is() { return "arcgis-hub-catalog-builder"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "catalog": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCatalog",
          "resolved": "IHubCatalog",
          "references": {
            "IHubCatalog": {
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
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "target entities to surface in the config UI"
        },
        "attribute": "target-entity",
        "reflect": false,
        "defaultValue": "\"item\""
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
          "text": "optional callbacks to call when specific catalog builder actions have been taken"
        }
      }
    };
  }
  static get states() {
    return {
      "_catalog": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCatalogBuilderChange",
        "name": "arcgisHubCatalogBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the catalog is updated"
        },
        "complexType": {
          "original": "IHubCatalog",
          "resolved": "IHubCatalog",
          "references": {
            "IHubCatalog": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event to emit Hub telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('targetEntity')
], ArcgisHubCatalogBuilder.prototype, "_uiSchema", null);
