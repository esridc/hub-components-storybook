'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-7c083111.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
const index = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const index$2 = require('./index-f4a4c954.js');
const types = require('./types-03e19572.js');
const resources = require('./resources-16262e22.js');
const CatalogSchema = require('./CatalogSchema-d9a0c750.js');
const intlManager = require('./intl-manager-f0103583.js');
const memoize = require('./memoize-1f967971.js');
const resources$1 = require('./resources-42021303.js');
const util = require('./util-38e73510.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./enums-0160df9d.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');

const CATALOG_BUILDER_SCHEMA = CatalogSchema.CatalogSchema;
const buildCatalogBuilderUiSchema = (opts) => {
  const { targetEntity, callbacks, intl } = opts;
  let collectionPredicateProperties;
  // for collection predicates, we filter out predicate
  // properties that are options when configuring the
  // target entity's scope
  switch (targetEntity) {
    case "item":
      collectionPredicateProperties = types.ITEM_PREDICATE_PROPERTIES.filter((prop) => prop !== "group");
      break;
    case "event":
      collectionPredicateProperties = types.EVENT_PREDICATE_PROPERTIES.filter((prop) => prop !== "group");
      break;
  }
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        label: intl.t("source.heading"),
        options: {
          helperText: {
            label: intl.t("source.description"),
          }
        },
        elements: [
          {
            scope: `/properties/scopes/properties/${targetEntity}`,
            type: "Control",
            options: {
              control: "arcgis-hub-query-builder",
              targetEntity,
              availablePredicateProperties: ["group"],
              callbacks,
            }
          },
        ]
      },
      {
        type: "Section",
        label: intl.t("collections.section.heading"),
        options: {
          helperText: {
            label: intl.t("collections.description"),
          }
        },
        elements: [
          {
            scope: "/properties/collections",
            type: "Control",
            options: {
              control: "hub-field-input-list",
              // enables the flow mode when editing an collection
              editMode: resources.ListEditModeTypes.FLOW,
              // the current target entity we're working with
              targetEntity,
              // the title of the flow
              flowTitle: intl.t("collections.heading"),
              // when we don't have a label on a collection yet
              defaultEditLabel: intl.t("collections.editLabel"),
              // allows us to insert a flow item into the calcite-flow at top level
              calciteFlowRefCallback: callbacks === null || callbacks === void 0 ? void 0 : callbacks.calciteFlowRefCallback,
              // enables the edit experience for a single collection
              allowEdit: true,
              // enables the add button to add new collections
              allowAdd: true,
              // telemetry that fires when a new collection is added
              addItemTelemetry: index.dist.dictionary.category.interaction.action.select.label.newCollection,
              // enables the draggable icon
              allowReorder: true,
              // enables the visibility icon
              allowHide: true,
              // allows the hidden state to be stored separately of where the edit values are stored
              hiddenEditProp: "displayConfig",
              // lets us use a custom label for the add button
              addItemLabel: intl.t("collections.addLabel"),
              // allows us to wrap our values in a _config property, which allows us to use a composite field as the edit uiSchema
              scopeWrapperProp: "_config",
              // the info needed for the schema and uiSchema in the edit experience
              editSchema: {
                type: "object",
                properties: {
                  _config: { type: "object" },
                }
              },
              editUiSchema: {
                type: "Layout",
                elements: [
                  {
                    scope: "/properties/_config",
                    type: "Control",
                    options: {
                      control: "arcgis-hub-collections-builder",
                      targetEntity,
                      availablePredicateProperties: collectionPredicateProperties,
                      callbacks,
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      {
        type: "Section",
        label: intl.t("appearance.heading"),
        options: {
          section: "block",
          open: true
        },
        elements: [
          {
            scope: "/properties/displayConfig",
            type: "Control",
            options: {
              control: "arcgis-hub-catalog-appearance-builder",
              helperText: { label: intl.t("appearance.helperText") },
              callbacks,
              targetEntity,
            }
          }
        ]
      }
    ]
  };
};

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
const ArcgisHubCatalogBuilder = class {
  constructor(hostRef) {
    index$1.registerInstance(this, hostRef);
    this.arcgisHubCatalogBuilderChange = index$1.createEvent(this, "arcgisHubCatalogBuilderChange", 7);
    this.hubTelemetry = index$1.createEvent(this, "hubTelemetry", 7);
    this._schema = util.cloneObject(CATALOG_BUILDER_SCHEMA);
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
      const _catalog = index$2.mergeDeep(util.cloneObject(this._catalog), util.cloneObject(values));
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
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // 2. Prepare internal state of catalog and collections
    this._catalog = this.transformCatalogForEditor(this.catalog);
    this._collections = ((_a = this.catalog) === null || _a === void 0 ? void 0 : _a.collections) || [];
  }
  /** dynamically generated catalog builder uiSchema */
  get _uiSchema() {
    var _a;
    return interpolateTranslations.interpolateTranslations(this._intl, buildCatalogBuilderUiSchema({
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
    const transformedCatalog = util.cloneObject(catalog);
    const collections = transformedCatalog.collections ? [...transformedCatalog.collections] : [];
    transformedCatalog.collections = collections.reduce((acc, collection) => {
      if (collection.targetEntity === this.targetEntity) {
        const transformedCollection = util.cloneObject(collection);
        acc.push(transformedCollection);
      }
      return acc;
    }, []);
    return transformedCatalog;
  }
  /**
   * function to transform the editor values into a valid
   * IHubCatalog before emitting
   */
  transformCatalogToEmit(catalog) {
    const transformedCatalog = util.cloneObject(catalog);
    // 1. add the catalog schema version if it doesn't exist
    if (!transformedCatalog.schemaVersion) {
      transformedCatalog.schemaVersion = 1;
    }
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
    return (index$1.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCatalogEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._catalog, variant: resources$1.CONFIGURATION_VARIANTS.workspace }));
  }
  render() {
    return (index$1.h(index$1.Host, { "data-element": "catalog-builder-field" }, this.renderEditor()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index$1.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('targetEntity')
], ArcgisHubCatalogBuilder.prototype, "_uiSchema", null);

exports.arcgis_hub_catalog_builder = ArcgisHubCatalogBuilder;
