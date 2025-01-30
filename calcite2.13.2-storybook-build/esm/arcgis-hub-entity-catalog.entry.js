import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CatalogSchema } from './CatalogSchema-e8481cdb.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { d as showNotice, g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { z as addDefaultItemSearchPredicates, A as expandPortalQuery, s as serializeQueryForPortal, n as getKilobyteSizeOfQuery } from './HubInitiatives-4f4e24ce.js';
import { W as WELL_KNOWN_FACET_TYPES } from './facets-1177471f.js';
import { b as bind } from './context-7d8f7366.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import './index-213c70d0.js';
import './enums-783e40b4.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './get-prop-ec5be510.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './edit-237c0a70.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

/**
 * The Schema for the catalog definition builder field
 */
const catalogBuilderSchema = {
  type: "object",
  properties: {
    catalog: CatalogSchema
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
  const scope = cloneObject(collectionScope);
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
    const queryWithDefaults = addDefaultItemSearchPredicates(scope);
    // expand the query
    const expandedQuery = expandPortalQuery(queryWithDefaults);
    // serialize the query into a string
    const serializedQuery = serializeQueryForPortal(expandedQuery).q;
    // save the size
    size = getKilobyteSizeOfQuery(serializedQuery);
  }
  // hub-backed entities (events)
  else if (HUB_API_ENTITY_TYPES.includes(targetEntity) && scope) {
    // for now, we just stringify the JSON -- the limits for our api are so so much larger
    size = getKilobyteSizeOfQuery(JSON.stringify(scope));
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
  const currentQuerySizes = cloneObject(querySizes);
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
  const currentQuerySizes = cloneObject(querySizes);
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
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
      const scopes = cloneObject(this._catalog.scopes) || {};
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
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
      const type = getTypeFromEntity(this.entity);
      const updatedEntity = cloneObject(this.entity);
      // set the entity's catalogs with the updated configuration.
      // NOTE: if the catalog is "empty", we reset the catalog
      updatedEntity.catalog = this._isCatalogEmpty
        ? undefined
        : this._catalog;
      try {
        await updateHubEntity(type, updatedEntity, this._context);
        showNotice({ title: this._intl.t("shared.publish.success.title"), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this._intl.t("shared.publish.success.title") } });
        // notify the parent workspace that the entity has been
        // published - this clears the dirty state
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: updatedEntity,
          isDirty: false,
        });
      }
      catch (error) {
        showNotice({ title: this._intl.t("shared.publish.error.title"), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this._intl.t("shared.publish.error.title") } });
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
    bind(this, 'handleArcgisHubGalleryExecutedQuerySize', 'handleArcgisHubCollectionsBuilderEditedCollectionKeyChange');
  }
  async componentWillLoad() {
    // Load the component's intl
    this._intl = await intlManager.loadIntlForComponent(this.element);
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
    return getGlobalContext();
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
    return [...WELL_KNOWN_FACET_TYPES];
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
      return (h("div", { class: "catalog-container" }, h("calcite-button", { class: "configure-catalog-button", onClick: this.toggleActivePanel, ref: this.setConfigureButtonRef, round: true }, this._intl.t("configureCatalog")), h("arcgis-hub-catalog", { activeCollectionKey: this._editedCollectionKey, catalogs: this._catalogs, facets: this._facets, layoutOptions: this._layoutOptions, linkTarget: "siteRelative", onArcgisHubCatalogActiveCollectionChange: this.setRenderedCollectionKey, showAddContent: true, showLayoutSwitcher: true, showSearch: true, targetEntity: this._targetEntity })));
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
        kind && querySizeNotices.push(h("arcgis-hub-notice", { notice: {
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
      return (h("arcgis-hub-help-state", { icon: "file-magnifying-glass", message: this._intl.t('emptyState.message'), slot: "help-state" }, h("calcite-button", { "data-key": CatalogPanels.Details, onClick: this.toggleActivePanel, round: true, slot: "actions" }, this._intl.t('emptyState.action'))));
    }
  }
  /** render the panel to configure the details of a catalog */
  renderDetailsPanel() {
    return (h("calcite-flow", { ref: this.setCalciteFlowRef }, h("calcite-flow-item", null, h("calcite-panel", { closable: true, "data-key": CatalogPanels.Details, heading: this._intl.t("detailsPanel.heading"), messageOverrides: {
        close: this._intl.t("detailsPanel.close")
      }, onCalcitePanelClose: this.collapseAllPanels, ref: this.setPanelRef }, this.renderQuerySizeNotices(), this.footerSlotEl && h("arcgis-configuration-form", { footerSlotRef: this.footerSlotEl, isDisabled: this._querySizeLimitReached, messageOverrides: { save: this._intl.t('shared.publish.label') }, onArcgisConfigurationFormChanged: this.handleCatalogChange, onArcgisConfigurationFormSaved: this.handleCatalogSave, schema: cloneObject(catalogBuilderSchema), t: this.translationFunc, uiSchema: cloneObject(this._catalogBuilderUiSchema), values: { catalog: this._catalog } })), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  /** render the shell panel */
  renderConfigurationShellPanel() {
    return (h("calcite-shell-panel", { collapsed: !this._isConfigurationPanelOpen, position: "end", slot: "shell-panel-end" }, this._isConfigurationPanelOpen && this.renderDetailsPanel()));
  }
  render() {
    return (h(Host, { "data-element": "entity-catalog" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this._intl.t(`${this.pane}`)), this.renderEmptyState(), this.renderCatalogs(), this.renderConfigurationShellPanel())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "pane": ["init"],
    "entity": ["init"]
  }; }
};
__decorate([
  MemoizeDecoratorFactory('_catalog')
], ArcgisHubEntityCatalog.prototype, "_catalogs", null);
__decorate([
  MemoizeDecoratorFactory('_catalog')
], ArcgisHubEntityCatalog.prototype, "_facets", null);
__decorate([
  MemoizeDecoratorFactory('_catalog')
], ArcgisHubEntityCatalog.prototype, "_layoutOptions", null);
ArcgisHubEntityCatalog.style = arcgisHubEntityCatalogCss;

export { ArcgisHubEntityCatalog as arcgis_hub_entity_catalog };
