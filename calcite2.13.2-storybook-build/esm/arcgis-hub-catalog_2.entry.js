import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { a as cloneObject, c as createId, f as findBy, h as flattenArray } from './util-3e6872d9.js';
import { C as Catalog } from './Catalog-290f043e.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './get-prop-ec5be510.js';
import './ArcGISContextManager-c977211a.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './fail-safe-cd1a5a2a.js';
import './request-fa80ae40.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './get-user-f035bd36.js';
import './tslib.es6-7023f322.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './logger-f8667200.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';
import './UserSession-2c05f7b6.js';
import './get-portal-5e0a1617.js';
import './is-guid-982831aa.js';
import './hubSearch-41612481.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
import './compose-d5b83ab7.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './fetch-org-8e578c0d.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './fetchHubEntity-28d04ab4.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './settings-2d4e159a.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';

const arcgisHubCatalogCss = ":host{display:block}calcite-radio-group{margin-bottom:1rem}";

const ArcgisHubCatalog = class {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCatalogActiveCatalogChange = createEvent(this, "arcgisHubCatalogActiveCatalogChange", 7);
    this.arcgisHubCatalogActiveCollectionChange = createEvent(this, "arcgisHubCatalogActiveCollectionChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.accordionOpen = true;
    /**
     * List Catalogs instances created from the passed in Catalog Definition Json objects or IDs
     */
    this._catalogs = [];
    /**
     * Flag to indicate if we just set the active collection through a key. If so, we
     * need to wait until the render occurs to prevent changing values during rerender.
     */
    this._activeCollectionProgrammaticallySet = false;
    this.term = undefined;
    this.showAddContent = false;
    this.catalogs = undefined;
    this.targetEntity = undefined;
    this.activeCollectionKey = undefined;
    this.cardActionLinks = [];
    this.path = "";
    this.callback = undefined;
    this._context = getGlobalContext();
    this.layout = "list";
    this.layoutOptions = ['grid', 'list', 'table'];
    this.facets = undefined;
    this.gallerySelection = undefined;
    this.selectionMode = undefined;
    this.showThumbnail = false;
    this.showSelection = false;
    this.showBadges = false;
    this.showSearch = false;
    this.showLayoutSwitcher = false;
    this.newTab = false;
    this.linkTarget = undefined;
    this.showFacetForSingleCatalog = undefined;
    this.sortOptions = undefined;
    this.sortField = null;
    this.sortOrder = 'asc';
    this.sourceLabel = undefined;
    this.addContentProps = {};
    this.activeCollection = undefined;
    this.activeCatalog = undefined;
    bind(this, 'handleCalciteTabChange', 'handleCalciteRadioButtonGroupChange');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async initialize() {
    var _a, _b, _c;
    /**
     * 1. Filter out any collections that are hidden with the displayConfig: {  hidden: true }.
     *
     * If we have a targetEntity prop, we only keep collections that are not hidden AND are that target entity.
     * If we don't have a targetEntity prop, we only keep collections that are not hidden.
     */
    let catalogs = cloneObject(this.catalogs);
    // only do this step if we're working with IHubCatalog objects
    if (typeof this.catalogs[0] !== 'string') {
      // loop through all catalogs' collections
      catalogs = catalogs.reduce((acc, catalog) => {
        var _a;
        // filter out collections that are hidden
        catalog.collections = (_a = catalog.collections) === null || _a === void 0 ? void 0 : _a.filter((collection) => {
          var _a;
          const correctTargetEntity = this.targetEntity ? collection.targetEntity === this.targetEntity : true;
          const isVisible = !!((_a = collection.displayConfig) === null || _a === void 0 ? void 0 : _a.hidden) === false;
          return correctTargetEntity && isVisible;
        });
        return [...acc, catalog];
      }, []);
    }
    /**
     * 2. Construct a list of Catalog instances based on the type
     * of catalogs passed in.
     *
     * note: as any[] is needed to avoid a typescript compiler error
     * see https://github.com/microsoft/TypeScript/issues/36390#issuecomment-641718624
     */
    const prms = catalogs.reduce((acc, c) => {
      if (typeof c === 'string') {
        acc.push(Catalog.init(c, this._context));
      }
      else {
        acc.push(Catalog.fromJson(c, this._context));
      }
      return acc;
    }, []);
    this._catalogs = await Promise.all(prms);
    /**
     * 3. Ensure that each target entity defined on a catalog's scope
     * has a collection defined. If not, create an "empty" collection
     * for that target entity.
     *
     * If we have a targetEntity prop, we only focus on that target entity. Else, we do this for all target entity scopes.
     */
    this._catalogs.forEach(catalog => {
      const targetEntities = this.targetEntity ? [this.targetEntity] : catalog.availableScopes;
      targetEntities.forEach(targetEntity => {
        var _a;
        if (!((_a = catalog.collections) === null || _a === void 0 ? void 0 : _a.some(collection => collection.targetEntity === targetEntity))) {
          const emptyCollection = {
            label: this.intl.t(`targetEntity.${targetEntity}`),
            key: createId("collection"),
            targetEntity,
            scope: {
              targetEntity,
              filters: [
                { predicates: [] }
              ]
            },
          };
          catalog.addCollection(emptyCollection);
        }
      });
    });
    /** 4. set the active catalog */
    this.activeCatalog = this.activeCatalog
      ? this._catalogs.find(catalog => catalog.title === this.activeCatalog.title)
      : this._catalogs[0];
    this.arcgisHubCatalogActiveCatalogChange.emit(this.activeCatalog.title);
    /**
     * 5. Get the merged collection from the active catalog and
     * the first collection in the active catalog
     */
    let collection = this.activeCatalog.getCollection((_b = (_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.collections[0]) === null || _b === void 0 ? void 0 : _b.key);
    // if we have an active collection key passed in, try to set it
    if (this.activeCollectionKey) {
      const collectionByKey = this.setActiveCollectionByKey(this.activeCollectionKey);
      // we may get nothing back, because that collection might be hidden right now
      // so default to what we had before in that case
      collection = collectionByKey || collection;
    }
    this.activeCollection = collection;
    ((_c = this.activeCollection) === null || _c === void 0 ? void 0 : _c.key) && this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
  }
  async refresh() {
    this._galleryEl.refresh();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // Because there is no error message when a required prop is used outside of stencil,
    // we need to manually add it here
    if (!this.catalogs) {
      console.error('<arcgis-hub-catalog> component requires one or more catalogs be provided');
    }
    else {
      await this.initialize();
    }
    // Initialize the display configuration
    this.updateCatalogDisplayConfig();
  }
  componentDidRender() {
    // If we have an active collection key that was set programmatically
    // we need to wait until the render occurs to prevent changing values during rerender
    if (this._activeCollectionProgrammaticallySet) {
      this._activeCollectionProgrammaticallySet = false;
      this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
    }
  }
  /**
   * display configuration settings for the entire catalog, separated by target entity
   */
  get _displayConfig() {
    var _a;
    let displayConfig = (_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.displayConfig;
    if (displayConfig && displayConfig[this.targetEntity]) {
      displayConfig = displayConfig[this.targetEntity];
    }
    return displayConfig;
  }
  handleLayoutButtonSelect(event) {
    var _a;
    this.layout = event.detail;
    const showThumbnail = this._displayConfig.showThumbnail;
    const thumbnailActions = {
      grid: event.detail === 'grid',
      show: true,
      hide: false
    };
    this.showThumbnail = (_a = thumbnailActions[showThumbnail]) !== null && _a !== void 0 ? _a : this.showThumbnail;
  }
  /**
   * Updates the display configuration for the catalog,
   * this is triggered when the active catalog changes
   */
  updateCatalogDisplayConfig() {
    var _a, _b;
    const { layout, cardTitleTag, corners, shadow, showLinkButton, showThumbnail, linkButtonStyle, linkButtonText } = (_a = this._displayConfig) !== null && _a !== void 0 ? _a : {};
    Object.assign(this, { layout, cardTitleTag, corners, shadow, showLinkButton, showThumbnail, linkButtonStyle, linkButtonText });
    // if showThumbnail is set to 'grid',
    // only show it if the layout is grid
    const thumbnailActions = {
      grid: this.layout === 'grid',
      show: true,
      hide: false
    };
    this.showThumbnail = (_b = thumbnailActions[showThumbnail]) !== null && _b !== void 0 ? _b : this.showThumbnail;
  }
  /**
   * Sets the active collection by the key of the collection, if it exists in the catalog
   * @param collectionKey
   */
  setActiveCollectionByKey(collectionKey) {
    if (collectionKey && this.activeCatalog) {
      try {
        const collection = this.activeCatalog.getCollection(collectionKey);
        collection && (this.activeCollection = collection);
        collection && (this._activeCollectionProgrammaticallySet = true);
        return collection;
      }
      catch (e) {
        console.info('Collection with key', collectionKey, 'does not yet exist in the active catalog');
      }
    }
  }
  /**
   * Handle catalog radio button change
   * Assign merged collection to activeCollection
   * If there is no collection passed in, assign null and let Hub Gallery construct it there
   */
  handleCalciteRadioButtonGroupChange(evt) {
    // Adding this additional check here to prevent errors if there are other radio button facets
    // rendered in the gallery component
    const selectedCatalog = findBy(this._catalogs, "title", evt.target.selectedItem.value);
    if (selectedCatalog) {
      // 1. set the active catalog
      this.activeCatalog = selectedCatalog;
      this.arcgisHubCatalogActiveCatalogChange.emit(this.activeCatalog.title);
      // 2. set the active collection to the first collection in the active catalog
      this.activeCollection = this.activeCatalog.collections.find(collection => collection.key === this.activeCollection.key)
        ? this.activeCatalog.getCollection(this.activeCollection.key)
        : this.activeCatalog.getCollection(this.activeCatalog.collections[0].key);
      this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
      // 3. emit telemetry for the source facets that's
      // consistent with the other gallery facets
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
        .category.interaction
        .action.search
        .label.filter), { details: `source: ${selectedCatalog.title}` }));
    }
  }
  /**
   * Handle collection change
   */
  handleCalciteTabChange(evt) {
    this.activeCollection = this.activeCatalog.getCollection(evt.target.tab);
    this.arcgisHubCatalogActiveCollectionChange.emit(this.activeCollection.key);
    // Emit telemetry for the collection change
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.search
      .label.click), { details: 'catalog tabs' }));
  }
  /**
   * The catalog facet we want to render on top of all the other facets in hub gallery
   */
  renderCatalogFacet() {
    return h("calcite-accordion", { appearance: "transparent", scale: "l" }, h("calcite-accordion-item", { expanded: this.accordionOpen, heading: this.sourceLabel || this.intl.t('source') }, h("calcite-radio-button-group", { layout: 'vertical', name: 'catalog-group', onCalciteRadioButtonGroupChange: this.handleCalciteRadioButtonGroupChange }, this._catalogs.map((catalog, idx) => {
      return h("calcite-label", { key: catalog.title, layout: "inline" }, h("calcite-radio-button", { checked: idx === 0, id: catalog.title, name: catalog.title, value: catalog.title }), h("span", { class: "catalog" }, catalog.title));
    }))));
  }
  ;
  renderCollections(collections) {
    return h("calcite-tab-nav", { slot: "title-group" }, collections.map((collection) => {
      return h("calcite-tab-title", { key: collection.key, onCalciteTabsActivate: this.handleCalciteTabChange, selected: this.activeCollection.key === collection.key, tab: collection.key }, collection.label);
    }));
  }
  render() {
    var _a;
    const showCollections = ((_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.collections.length) > 1;
    const showCatalogFacets = this.showFacetForSingleCatalog || this._catalogs.length > 1;
    const collection = this.activeCollection.toJson();
    const include = collection.include && collection.include.join('|');
    return (h(Host, { "data-element": "catalog" }, h("arcgis-hub-gallery", { addContentProps: this.addContentProps, additionalFacet: showCatalogFacets && this.renderCatalogFacet(), callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, corners: this.corners, facets: this.facets, gallerySelection: this.gallerySelection, include: include, layout: this.layout, layoutOptions: this.layoutOptions, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, newTab: this.newTab, path: this.path, query: collection.scope, ref: (el) => { this._galleryEl = el; }, selectionMode: this.selectionMode, shadow: this.shadow, showAddContent: this.showAddContent, showBackToTopBtn: true, showBadges: this.showBadges, showChips: true, showFacets: this.facets && this.facets.length > 0, showLayoutSwitcher: this.showLayoutSwitcher, showLinkButton: this.showLinkButton, showMoreResultsBtn: true, showResultsCount: true, showSearch: this.showSearch, showSelection: this.showSelection, showSort: true, showThumbnail: this.showThumbnail, sortField: this.sortField, sortOptions: this.sortOptions, sortOrder: this.sortOrder, term: this.term || "" }, h("calcite-tabs", { layout: "center", scale: "l", slot: "collection-select" }, showCollections && this.renderCollections(this.activeCatalog.collections)))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "catalogs": ["initialize"],
    "targetEntity": ["initialize"],
    "activeCatalog": ["updateCatalogDisplayConfig"],
    "activeCollectionKey": ["setActiveCollectionByKey"]
  }; }
};
ArcgisHubCatalog.style = arcgisHubCatalogCss;

const arcgisHubGalleryPickerCss = ":host{display:block;--calcite-color-border-1:#CACACA;--calcite-color-border-2:#D4D4D4;--calcite-color-border-3:#D3D3D3}[slot=\"back\"]{display:flex;align-items:baseline;border-radius:0.25rem;padding:0.5rem;background-color:var(--calcite-color-foreground-current);--calcite-label-margin-bottom:0;--calcite-color-text-1:var(--calcite-color-text-1)}.warning{background-color:var(--calcite-color-status-danger-hover)}calcite-modal{--calcite-modal-height:80vh}[slot=\"content\"]{--calcite-card-border-color:var(--calcite-color-border-3)}";

const ArcgisHubGalleryPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubGalleryPickerSelectionUpdate = createEvent(this, "arcgisHubGalleryPickerSelectionUpdate", 7);
    this.arcgisHubGalleryPickerClose = createEvent(this, "arcgisHubGalleryPickerClose", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this._gallerySelection = {};
    this.modalTitle = undefined;
    this.open = false;
    this.limit = 100;
    this.catalogs = undefined;
    this.facets = undefined;
    this.gallerySelection = undefined;
    this.showSelection = true;
    this.showBadges = undefined;
    this.showSearch = undefined;
    this.showThumbnail = undefined;
    this.showFacetForSingleCatalog = undefined;
    this.sortOptions = undefined;
    this.sortField = null;
    this.sourceLabel = undefined;
    this.primaryButtonLabel = undefined;
    this.callback = undefined;
    this.selectionMode = 'multiple';
    this.linkTarget = undefined;
    this.modalOptions = {};
    this.count = 0;
    bind(this, 'handleGalleryPickerOpen', 'handleGalleryPickerClose', 'handleGalleryPickerAdd');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // Get the count if there are any existing selections in the consuming app
    if (this.gallerySelection) {
      this._gallerySelection = this.gallerySelection;
      this.count = flattenArray(Object.values(this._gallerySelection)).length;
    }
  }
  handleHubGallerySelect(event) {
    event.preventDefault();
    this._gallerySelection = Object.assign(this._gallerySelection, event.detail);
    this.count = flattenArray(Object.values(this._gallerySelection)).length;
  }
  /** parse the target entity from the first catalog collection. We need this
   * for telemetry logging purposes */
  get targetEntity() {
    var _a, _b, _c, _d;
    return ((_d = (_c = (_b = (_a = this.catalogs) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.collections) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.targetEntity) || 'item';
  }
  handleGalleryPickerClose(event) {
    event.preventDefault();
    this.open = false;
    this.arcgisHubGalleryPickerClose.emit();
    const telemetryDetails = { item: "addContent", group: "addGroups", user: "addUsers", communityUser: "addUsers", channel: "addChannels" }[this.targetEntity] || 'addContent';
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.modal.details[telemetryDetails]);
  }
  handleGalleryPickerOpen(event) {
    event.preventDefault();
    this.open = true;
    const telemetryDetails = { item: "addContent", group: "addGroups", user: "addUsers", communityUser: "addUsers", channel: "addChannels" }[this.targetEntity] || 'addContent';
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.modal.details[telemetryDetails]);
  }
  handleGalleryPickerAdd(event) {
    event.preventDefault();
    this.open = false;
    this.arcgisHubGalleryPickerSelectionUpdate.emit(this._gallerySelection);
    this.arcgisHubGalleryPickerClose.emit();
    const telemetryLabel = { item: "content", group: "groups", user: "users", communityUser: "users", channel: "channel" }[this.targetEntity] || 'content';
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.add.label[telemetryLabel]), { count: this.count }));
  }
  render() {
    // Only renders when the picker is open so the gallery does not fire the search request despite not
    // being rendered in the UI
    return this.open ? (h(Host, { "data-element": "gallery-picker" }, h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.handleGalleryPickerClose, onCalciteModalOpen: this.handleGalleryPickerOpen, open: this.open, "width-scale": this.modalOptions.widthScale }, h("div", { slot: "header" }, this.modalTitle), h("div", { slot: "content" }, h("arcgis-hub-catalog", { callback: this.callback, catalogs: this.catalogs, facets: this.facets, gallerySelection: this._gallerySelection, linkTarget: this.linkTarget, newTab: true, selectionMode: this.selectionMode, showBadges: this.showBadges, showFacetForSingleCatalog: this.showFacetForSingleCatalog, showSearch: this.showSearch, showSelection: this.showSelection, showThumbnail: this.showThumbnail, sortField: this.sortField, sortOptions: this.sortOptions, sourceLabel: this.sourceLabel })), h("div", { class: this.count > this.limit ? 'warning' : '', slot: 'back' }, h("calcite-label", null, this.intl.t('selected', { count: this.count, limit: this.limit }))), h("calcite-button", { appearance: "outline", onClick: this.handleGalleryPickerClose, slot: "secondary", width: "full" }, this.intl.t('cancel')), h("calcite-button", { disabled: this.count <= 0 || this.count > this.limit, onClick: this.handleGalleryPickerAdd, slot: "primary", width: "full" }, this.primaryButtonLabel || this.intl.t('add'))))) : undefined;
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubGalleryPicker.style = arcgisHubGalleryPickerCss;

export { ArcgisHubCatalog as arcgis_hub_catalog, ArcgisHubGalleryPicker as arcgis_hub_gallery_picker };
