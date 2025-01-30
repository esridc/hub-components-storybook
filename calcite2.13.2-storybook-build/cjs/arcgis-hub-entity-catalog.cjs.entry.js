'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const CatalogSchema = require('./CatalogSchema-d9a0c750.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const util = require('./util-38e73510.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const facets = require('./facets-a1219f8a.js');
const context = require('./context-0167a31e.js');
const memoize = require('./memoize-1f967971.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
require('./index-f4a4c954.js');
require('./enums-0160df9d.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./get-prop-4bd8fc1a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./edit-3df37e35.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

/**
 * The Schema for the catalog definition builder field
 */
const catalogBuilderSchema = {
  type: "object",
  properties: {
    catalog: CatalogSchema.CatalogSchema
  }
};
/**
 * Builds and returns the uischema for the catalog definition builder field
 * @param options
 * @returns
 */
const getCatalogBuilderUiSchema = (options) => {
  const { callbacks, targetEntity } = options;
  return {
    type: "Layout",
    elements: [
      {
        scope: "/properties/catalog",
        type: "Control",
        options: {
          control: "arcgis-hub-catalog-builder",
          helperText: {
            labelKey: "detailsPanel.catalogBuilder.helperText"
          },
          callbacks,
          targetEntity,
        }
      }
    ]
  };
};

/** The query size at which we display a warning in the UI, but allow the user to continue editing */
const QUERY_SIZE_WARNING_LIMIT = 8;
/** The absolute largest we allow a query size to be  */
const QUERY_SIZE_MAXIMUM_LIMIT = 9;
// TODO: update as we add more target entities that we support in the catalog builder
const PORTAL_API_ENTITY_TYPES = ["item"];
const HUB_API_ENTITY_TYPES = ["event"];
/**
 * Enum for the different panels in the catalog building experience
 *
 * Details - where the definition of the catalog is set
 * Appearance - where the displayConfigs of the catalog and collections are set
 */
var CatalogPanels;
(function (CatalogPanels) {
  CatalogPanels["Details"] = "details";
  CatalogPanels["Appearance"] = "appearance";
})(CatalogPanels || (CatalogPanels = {}));
/**
 * Returns the size of a collection scope in kilobytes, making sure to combine the collection scope's filters
 * with the catalog scope's filters
 * @param collectionScope
 * @param catalogScope
 * @returns
 */
const getCollectionScopeSize = (collectionScope, catalogScope) => {
  const scope = util.cloneObject(collectionScope);
  // combine filters if we have a catalog scope
  if (catalogScope && catalogScope.filters) {
    scope.filters = [...collectionScope.filters, ...catalogScope.filters];
  }
  return getScopeSize(scope);
};
/**
 * Returns the size of a scope in kilobytes
 * @param scope
 * @returns
 */
const getScopeSize = (scope = {}) => {
  const targetEntity = scope.targetEntity;
  let size = 0;
  // portal-backed entities (items)
  if (PORTAL_API_ENTITY_TYPES.includes(targetEntity) && scope && scope.filters) {
    // add the defaults
    const queryWithDefaults = HubInitiatives.addDefaultItemSearchPredicates(scope);
    // expand the query
    const expandedQuery = HubInitiatives.expandPortalQuery(queryWithDefaults);
    // serialize the query into a string
    const serializedQuery = HubInitiatives.serializeQueryForPortal(expandedQuery).q;
    // save the size
    size = HubInitiatives.getKilobyteSizeOfQuery(serializedQuery);
  }
  // hub-backed entities (events)
  else if (HUB_API_ENTITY_TYPES.includes(targetEntity) && scope) {
    // for now, we just stringify the JSON -- the limits for our api are so so much larger
    size = HubInitiatives.getKilobyteSizeOfQuery(JSON.stringify(scope));
  }
  return size;
};
/**
 * Initializes the record of query sizes for each query
 * For catalog scopes, we store query sizes as targetEntity: size in kb
 * For collections, we store query sizes as collectionKey: size in kb
 *
 * Note: collection query sizes are stored taking the catalog query size into account as the scopes are joined before querying
 * @param catalog
 * @returns
 */
const initializeQuerySizes = (catalog) => {
  const querySizes = {};
  // get the catalog's scopes
  const scopes = catalog === null || catalog === void 0 ? void 0 : catalog.scopes;
  // 1. for each target entity, if it has a scope, we set the key: query size in kilobytes
  if (scopes) {
    Object.values(scopes).forEach((scope) => {
      // get the scope's size in kilobytes and map it to the target entity
      querySizes[scope.targetEntity] = getScopeSize(scope);
    });
  }
  // 2. for each collection, if it has a scope, we set the key: query size in kilobytes
  const collections = (catalog === null || catalog === void 0 ? void 0 : catalog.collections) || [];
  if (collections.length) {
    // for each collection, calculate the size of the collection's scope
    collections.forEach((collection) => {
      // get the string's size in kilobytes and store by collection key
      const targetEntityScope = scopes ? scopes[collection.targetEntity] : {};
      querySizes[collection.key] = getCollectionScopeSize(collection.scope, targetEntityScope);
    });
  }
  return querySizes;
};
/**
 * Updates the query sizes record for a specific target entity
 * with the size of the target entity's scope and its collections' scopes
 * @param querySizes
 * @param collections
 * @param targetEntity
 * @param catalogScope
 * @returns
 */
const updateTargetEntityQuerySizes = (querySizes, collections, targetEntity, catalogScope) => {
  const currentQuerySizes = util.cloneObject(querySizes);
  // 1. update the catalog query size
  currentQuerySizes[targetEntity] = getScopeSize(catalogScope);
  // 2. update the collection query sizes
  collections === null || collections === void 0 ? void 0 : collections.forEach((collection) => {
    if (collection.targetEntity === targetEntity) {
      currentQuerySizes[collection.key] = getCollectionScopeSize(collection.scope, catalogScope);
    }
  });
  return currentQuerySizes;
};
/**
 * Removes the query sizes for a list of keys
 * @param querySizes
 * @param keys
 * @returns
 */
const removeQuerySizes = (querySizes, keys) => {
  const currentQuerySizes = util.cloneObject(querySizes);
  keys.forEach((key) => {
    delete currentQuerySizes[key];
  });
  return currentQuerySizes;
};

const arcgisHubEntityCatalogCss = "arcgis-configuration-form{--arcgis-configuration-form-footer-negative-margin:0.75rem;--arcgis-configuration-form-footer-bg-color:var(--calcite-color-background);margin-left:0.5rem;margin-right:0.5rem;margin-top:0.5rem}arcgis-hub-notice{margin:0.5rem}.catalog-container{display:flex;flex-direction:column}.configure-catalog-button{width:-moz-fit-content;width:fit-content}.collections-builder-editor{padding-left:0.5rem;padding-right:0.5rem}calcite-list{background-color:var(--calcite-color-foreground-1)}arcgis-configuration-editor,arcgis-configuration-editor-field{height:100%}.collections-builder-appearance-settings{position:absolute;bottom:0px}";

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
const ArcgisHubEntityCatalog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * A callback to get the ref to the calcite flow. This allows us
     * to pass the flow into the uiSchema for the collections editor,
     * which will allow us to open the collections editor in a third
     * level of flow.
     *
     * NOTE: we use a function to get the ref rather than passing the ref itself
     * because the configuration editor will wipe an html reference when loading (in cloning the object)
     */
    this.getCalciteFlowRef = () => {
      return this._calciteFlowRef;
    };
    /**
     * Called when collections are removed from the catalog.
     * This is used to remove the query sizes of the removed collections
     * @param collectionKeys
     */
    this.handleCollectionsRemoved = (collectionKeys) => {
      // remove those query sizes from our internal state
      this._currentQuerySizes = removeQuerySizes(this._currentQuerySizes, collectionKeys);
    };
    /**
     * Called when the catalog scope is changed in the catalog builder.
     * This is used to recalculate the query sizes of the target entity's scope
     * and all of its collections
     * @param query
     * @param targetEntity
     */
    this.handleCatalogScopeChange = (query, targetEntity) => {
      var _a;
      // create a new scopes object to calculate with to avoid interrupting the cycle of configuration editor updates
      const scopes = util.cloneObject(this._catalog.scopes) || {};
      scopes[targetEntity] = query;
      // recalculate query sizes for this target entity's scope and all of its collections only
      this._currentQuerySizes = updateTargetEntityQuerySizes(this._currentQuerySizes, (_a = this._catalog) === null || _a === void 0 ? void 0 : _a.collections, targetEntity, query);
    };
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * Closes all open panels and sets focus back onto the action button that opened the panel
     */
    this.collapseAllPanels = () => {
      // set focus back onto the action button that opened the panel
      if (this._isConfigurationPanelOpen && this._configureCatalogButtonRef && this._configureCatalogButtonRef.setFocus) {
        this._configureCatalogButtonRef.setFocus();
      }
      // remove the active panel and its ref
      this._isConfigurationPanelOpen = false;
    };
    /**
     * Toggles the active panel
     * @param evt
     */
    this.toggleActivePanel = () => {
      this._isConfigurationPanelOpen = !this._isConfigurationPanelOpen;
      // emit telemetry
      if (this._isConfigurationPanelOpen) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
          .category.interaction
          .action.open.label[`${this._targetEntity}s`]), { details: `Catalog configuration`, type: this.entity.type }));
      }
      // set focus onto the panel
      if (this._activePanelRef && this._activePanelRef.setFocus) {
        this._activePanelRef.setFocus();
      }
    };
    /**
     * Sets the ref to the currently shown calcite panel. Also sets focus on it
     * if it was just opened.
     * @param panel
     */
    this.setPanelRef = (panel) => {
      if (panel && panel.setFocus) {
        this._activePanelRef = panel;
        panel.setFocus();
      }
    };
    /**
     * Sets the ref of the configure catalog button so that we can set focus on it later.
     * @param action
    */
    this.setConfigureButtonRef = (button) => {
      if (button) {
        this._configureCatalogButtonRef = button;
      }
    };
    /**
     * Sets the ref of the calcite flow in the panel.
     * @param flow
     */
    this.setCalciteFlowRef = (flow) => {
      if (flow) {
        this._calciteFlowRef = flow;
      }
    };
    /**
     * Sets the key of the collection that is currently in view on the catalog
     * @param evt
     */
    this.setRenderedCollectionKey = (evt) => {
      this._renderedCollectionKey = evt.detail;
    };
    /**
     * Handles the change event emitted by the configuration form
     * @param evt
     */
    this.handleCatalogChange = (evt) => {
      const { values, isValid } = evt.detail;
      isValid && (this._catalog = values['catalog']);
      // notify the parent workspace that the entity has been
      // updated - this sets the dirty state so that if a user
      // attempts to navigate away, they will be notified that
      // they have un-published changes
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: values,
        isDirty: true,
      });
    };
    /** persist the updated catalog configuration on the entity */
    this.handleCatalogSave = async () => {
      const type = getTypeFromEntity.getTypeFromEntity(this.entity);
      const updatedEntity = util.cloneObject(this.entity);
      // set the entity's catalogs with the updated configuration.
      // NOTE: if the catalog is "empty", we reset the catalog
      updatedEntity.catalog = this._isCatalogEmpty
        ? undefined
        : this._catalog;
      try {
        await updateHubEntity.updateHubEntity(type, updatedEntity, this._context);
        state.showNotice({ title: this._intl.t("shared.publish.success.title"), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this._intl.t("shared.publish.success.title") } });
        // notify the parent workspace that the entity has been
        // published - this clears the dirty state
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: updatedEntity,
          isDirty: false,
        });
      }
      catch (error) {
        state.showNotice({ title: this._intl.t("shared.publish.error.title"), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this._intl.t("shared.publish.error.title") } });
      }
    };
    this.entity = undefined;
    this.pane = undefined;
    this._catalog = undefined;
    this._isConfigurationPanelOpen = false;
    this.footerSlotEl = undefined;
    this._isAppearancePanelOpen = false;
    this._editedCollectionKey = undefined;
    this._renderedCollectionKey = undefined;
    this._currentQuerySizes = {};
    this._querySizeLimitReached = false;
    context.bind(this, 'handleArcgisHubGalleryExecutedQuerySize', 'handleArcgisHubCollectionsBuilderEditedCollectionKeyChange');
  }
  async componentWillLoad() {
    // Load the component's intl
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // initialize states
    this.init();
  }
  init() {
    var _a;
    // 1. Initialize the catalog
    this._catalog = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.catalog;
    // 2. Initialize current query sizes of scopes
    this._currentQuerySizes = initializeQuerySizes(this._catalog);
    // 3. Set other default states
    this._editedCollectionKey = null;
    this._renderedCollectionKey = null;
    this._isAppearancePanelOpen = false;
    this._isConfigurationPanelOpen = false;
  }
  /** contextual portal and auth information */
  get _context() {
    return state.getGlobalContext();
  }
  /** whether the entity has a catalog configured */
  get _hasCatalog() {
    return !!this._catalog;
  }
  /** whether the configured catalog is technically "empty" */
  get _isCatalogEmpty() {
    var _a, _b, _c;
    const hasCollections = ((_b = (_a = this._catalog) === null || _a === void 0 ? void 0 : _a.collections) === null || _b === void 0 ? void 0 : _b.length) > 0;
    const hasScope = Object.values(((_c = this._catalog) === null || _c === void 0 ? void 0 : _c.scopes) || {}).some((scope) => {
      var _a;
      return ((_a = scope === null || scope === void 0 ? void 0 : scope.filters) === null || _a === void 0 ? void 0 : _a.length) > 0;
    });
    return !(hasCollections || hasScope);
  }
  /**
   * The UI schema for the catalog builder
   */
  get _catalogBuilderUiSchema() {
    return getCatalogBuilderUiSchema({
      targetEntity: this._targetEntity,
      callbacks: {
        onCatalogScopeChangeCallback: this.handleCatalogScopeChange,
        onCollectionsRemovedCallback: this.handleCollectionsRemoved,
        onCollectionEditedKeyChange: this.handleArcgisHubCollectionsBuilderEditedCollectionKeyChange,
        calciteFlowRefCallback: this.getCalciteFlowRef,
      }
    });
  }
  get _targetEntity() {
    let targetEntity;
    // get target entity based off of current pane
    switch (this.pane) {
      // events subpane
      case "catalog-events":
        targetEntity = "event";
        break;
      // content subpane
      case "catalog-content":
      default:
        targetEntity = "item";
        break;
    }
    return targetEntity;
  }
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _catalogs() {
    return [this._catalog];
  }
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _facets() {
    return [...facets.WELL_KNOWN_FACET_TYPES];
  }
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _layoutOptions() {
    return ['list', 'grid', 'table', 'map', 'compact'];
  }
  /**
   * Handles the event emitted by the arcgis-hub-gallery component
   * when a query is executed. This is used to determine the size
   * of the query string that was just executed
   * @param event
   */
  handleArcgisHubGalleryExecutedQuerySize(event) {
    // update query size for the collection we are currently rendering in the gallery
    // as the query size we received was the size of the query executed for the rendered collection
    this._currentQuerySizes = Object.assign(Object.assign({}, this._currentQuerySizes), { [this._renderedCollectionKey]: event.detail });
  }
  /**
   * Handles when the key of the collection being edited changes
   * @param key: string
   */
  async handleArcgisHubCollectionsBuilderEditedCollectionKeyChange(key) {
    this._editedCollectionKey = key;
  }
  /** render the entity's configured catalogs
   * we pass a holistic set of facets to the catalog
   * and the gallery will filter them based on the
   * target entity type
   */
  renderCatalogs() {
    if (this._hasCatalog && !this._isCatalogEmpty) {
      return (index.h("div", { class: "catalog-container" }, index.h("calcite-button", { class: "configure-catalog-button", onClick: this.toggleActivePanel, ref: this.setConfigureButtonRef, round: true }, this._intl.t("configureCatalog")), index.h("arcgis-hub-catalog", { activeCollectionKey: this._editedCollectionKey, catalogs: this._catalogs, facets: this._facets, layoutOptions: this._layoutOptions, linkTarget: "siteRelative", onArcgisHubCatalogActiveCollectionChange: this.setRenderedCollectionKey, showAddContent: true, showLayoutSwitcher: true, showSearch: true, targetEntity: this._targetEntity })));
    }
  }
  /**
 * Renders query size warnings and danger notices if
 * any of the query sizes are over the limits
 * @returns
 */
  renderQuerySizeNotices() {
    const querySizeNotices = [];
    let querySizeLimitReached = false;
    // check the query sizes to see if any are over the limit
    Object.entries(this._currentQuerySizes).forEach(([key, size]) => {
      // 1. check if we're dealing with a catalog source for our target entity or a collection source
      const isCatalog = key === this._targetEntity;
      const collection = isCatalog ? null : this._catalog.collections.find((collection) => collection.key === key && collection.targetEntity === this._targetEntity);
      if (isCatalog || collection) {
        const targetEntity = isCatalog ? key : collection.targetEntity;
        let message;
        // 2. check if we are violating the query size limits
        let kind;
        // 2.1 max limit reached -- we'll disable publishing
        if (size >= QUERY_SIZE_MAXIMUM_LIMIT) {
          kind = "danger";
          querySizeLimitReached = true;
        }
        // 2.2 just warnings -- we'll still allow publishing
        else if (size >= QUERY_SIZE_WARNING_LIMIT) {
          kind = "warning";
        }
        // 3. create message depending on source
        kind && (message = isCatalog ?
          this._intl.t(`detailsPanel.querySizeNotice.${kind}.catalogSourceMessage.${targetEntity}`) :
          this._intl.t(`detailsPanel.querySizeNotice.${kind}.collectionSourceMessage.${targetEntity}`, { collectionName: collection.label }));
        // 4. create a notice if we are violating any limits
        kind && querySizeNotices.push(index.h("arcgis-hub-notice", { notice: {
            id: `query-size-${kind}-${key}`,
            title: this._intl.t(`detailsPanel.querySizeNotice.${kind}.title`),
            message: message,
            configuration: {
              noticeType: "notice",
              icon: true,
              kind,
              closable: false,
              scale: "m"
            }
          } }));
      }
      else {
        console.info(`Could not find collection or catalog with correct target entity for query size key: ${key}`);
        delete this._currentQuerySizes[key];
      }
    });
    // update the state to determine if we should disable publishing
    this._querySizeLimitReached = querySizeLimitReached;
    return querySizeNotices;
  }
  /**
   * If a catalog is NOT configured on the entity,
   * we render an empty state prompting the user
   * to configure one
   */
  renderEmptyState() {
    if (!this._hasCatalog || this._isCatalogEmpty) {
      return (index.h("arcgis-hub-help-state", { icon: "file-magnifying-glass", message: this._intl.t('emptyState.message'), slot: "help-state" }, index.h("calcite-button", { "data-key": CatalogPanels.Details, onClick: this.toggleActivePanel, round: true, slot: "actions" }, this._intl.t('emptyState.action'))));
    }
  }
  /** render the panel to configure the details of a catalog */
  renderDetailsPanel() {
    return (index.h("calcite-flow", { ref: this.setCalciteFlowRef }, index.h("calcite-flow-item", null, index.h("calcite-panel", { closable: true, "data-key": CatalogPanels.Details, heading: this._intl.t("detailsPanel.heading"), messageOverrides: {
        close: this._intl.t("detailsPanel.close")
      }, onCalcitePanelClose: this.collapseAllPanels, ref: this.setPanelRef }, this.renderQuerySizeNotices(), this.footerSlotEl && index.h("arcgis-configuration-form", { footerSlotRef: this.footerSlotEl, isDisabled: this._querySizeLimitReached, messageOverrides: { save: this._intl.t('shared.publish.label') }, onArcgisConfigurationFormChanged: this.handleCatalogChange, onArcgisConfigurationFormSaved: this.handleCatalogSave, schema: util.cloneObject(catalogBuilderSchema), t: this.translationFunc, uiSchema: util.cloneObject(this._catalogBuilderUiSchema), values: { catalog: this._catalog } })), index.h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  /** render the shell panel */
  renderConfigurationShellPanel() {
    return (index.h("calcite-shell-panel", { collapsed: !this._isConfigurationPanelOpen, position: "end", slot: "shell-panel-end" }, this._isConfigurationPanelOpen && this.renderDetailsPanel()));
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-catalog" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this._intl.t(`${this.pane}`)), this.renderEmptyState(), this.renderCatalogs(), this.renderConfigurationShellPanel())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "pane": ["init"],
    "entity": ["init"]
  }; }
};
__decorate([
  memoize.MemoizeDecoratorFactory('_catalog')
], ArcgisHubEntityCatalog.prototype, "_catalogs", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_catalog')
], ArcgisHubEntityCatalog.prototype, "_facets", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_catalog')
], ArcgisHubEntityCatalog.prototype, "_layoutOptions", null);
ArcgisHubEntityCatalog.style = arcgisHubEntityCatalogCss;

exports.arcgis_hub_entity_catalog = ArcgisHubEntityCatalog;
