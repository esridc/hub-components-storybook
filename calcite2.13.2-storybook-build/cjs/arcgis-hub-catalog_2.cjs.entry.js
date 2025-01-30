'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const state = require('./state-6637df8c.js');
const util = require('./util-38e73510.js');
const Catalog = require('./Catalog-acebae88.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./get-prop-4bd8fc1a.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./fail-safe-33c35b7f.js');
require('./request-67da3c71.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./logger-5db3d659.js');
require('./encoding-211adb23.js');
require('./index-058372c1.js');
require('./UserSession-f8bc10c8.js');
require('./get-portal-6ca924c2.js');
require('./is-guid-b5c2b74c.js');
require('./hubSearch-79d30702.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
require('./compose-9b4311c9.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./fetch-org-d214b65b.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./fetchHubEntity-88467d55.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./settings-0b8cd93b.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');

const arcgisHubCatalogCss = ":host{display:block}calcite-radio-group{margin-bottom:1rem}";

const ArcgisHubCatalog = class {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubCatalogActiveCatalogChange = index.createEvent(this, "arcgisHubCatalogActiveCatalogChange", 7);
    this.arcgisHubCatalogActiveCollectionChange = index.createEvent(this, "arcgisHubCatalogActiveCollectionChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    this._context = state.getGlobalContext();
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
    context.bind(this, 'handleCalciteTabChange', 'handleCalciteRadioButtonGroupChange');
  }
  connectedCallback() {
    state.connectContext(this);
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
    let catalogs = util.cloneObject(this.catalogs);
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
        acc.push(Catalog.Catalog.init(c, this._context));
      }
      else {
        acc.push(Catalog.Catalog.fromJson(c, this._context));
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
            key: util.createId("collection"),
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    const selectedCatalog = util.findBy(this._catalogs, "title", evt.target.selectedItem.value);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.interaction
      .action.search
      .label.click), { details: 'catalog tabs' }));
  }
  /**
   * The catalog facet we want to render on top of all the other facets in hub gallery
   */
  renderCatalogFacet() {
    return index.h("calcite-accordion", { appearance: "transparent", scale: "l" }, index.h("calcite-accordion-item", { expanded: this.accordionOpen, heading: this.sourceLabel || this.intl.t('source') }, index.h("calcite-radio-button-group", { layout: 'vertical', name: 'catalog-group', onCalciteRadioButtonGroupChange: this.handleCalciteRadioButtonGroupChange }, this._catalogs.map((catalog, idx) => {
      return index.h("calcite-label", { key: catalog.title, layout: "inline" }, index.h("calcite-radio-button", { checked: idx === 0, id: catalog.title, name: catalog.title, value: catalog.title }), index.h("span", { class: "catalog" }, catalog.title));
    }))));
  }
  ;
  renderCollections(collections) {
    return index.h("calcite-tab-nav", { slot: "title-group" }, collections.map((collection) => {
      return index.h("calcite-tab-title", { key: collection.key, onCalciteTabsActivate: this.handleCalciteTabChange, selected: this.activeCollection.key === collection.key, tab: collection.key }, collection.label);
    }));
  }
  render() {
    var _a;
    const showCollections = ((_a = this.activeCatalog) === null || _a === void 0 ? void 0 : _a.collections.length) > 1;
    const showCatalogFacets = this.showFacetForSingleCatalog || this._catalogs.length > 1;
    const collection = this.activeCollection.toJson();
    const include = collection.include && collection.include.join('|');
    return (index.h(index.Host, { "data-element": "catalog" }, index.h("arcgis-hub-gallery", { addContentProps: this.addContentProps, additionalFacet: showCatalogFacets && this.renderCatalogFacet(), callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, corners: this.corners, facets: this.facets, gallerySelection: this.gallerySelection, include: include, layout: this.layout, layoutOptions: this.layoutOptions, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, newTab: this.newTab, path: this.path, query: collection.scope, ref: (el) => { this._galleryEl = el; }, selectionMode: this.selectionMode, shadow: this.shadow, showAddContent: this.showAddContent, showBackToTopBtn: true, showBadges: this.showBadges, showChips: true, showFacets: this.facets && this.facets.length > 0, showLayoutSwitcher: this.showLayoutSwitcher, showLinkButton: this.showLinkButton, showMoreResultsBtn: true, showResultsCount: true, showSearch: this.showSearch, showSelection: this.showSelection, showSort: true, showThumbnail: this.showThumbnail, sortField: this.sortField, sortOptions: this.sortOptions, sortOrder: this.sortOrder, term: this.term || "" }, index.h("calcite-tabs", { layout: "center", scale: "l", slot: "collection-select" }, showCollections && this.renderCollections(this.activeCatalog.collections)))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
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
    index.registerInstance(this, hostRef);
    this.arcgisHubGalleryPickerSelectionUpdate = index.createEvent(this, "arcgisHubGalleryPickerSelectionUpdate", 7);
    this.arcgisHubGalleryPickerClose = index.createEvent(this, "arcgisHubGalleryPickerClose", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    context.bind(this, 'handleGalleryPickerOpen', 'handleGalleryPickerClose', 'handleGalleryPickerAdd');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // Get the count if there are any existing selections in the consuming app
    if (this.gallerySelection) {
      this._gallerySelection = this.gallerySelection;
      this.count = util.flattenArray(Object.values(this._gallerySelection)).length;
    }
  }
  handleHubGallerySelect(event) {
    event.preventDefault();
    this._gallerySelection = Object.assign(this._gallerySelection, event.detail);
    this.count = util.flattenArray(Object.values(this._gallerySelection)).length;
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
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.modal.details[telemetryDetails]);
  }
  handleGalleryPickerOpen(event) {
    event.preventDefault();
    this.open = true;
    const telemetryDetails = { item: "addContent", group: "addGroups", user: "addUsers", communityUser: "addUsers", channel: "addChannels" }[this.targetEntity] || 'addContent';
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.modal.details[telemetryDetails]);
  }
  handleGalleryPickerAdd(event) {
    event.preventDefault();
    this.open = false;
    this.arcgisHubGalleryPickerSelectionUpdate.emit(this._gallerySelection);
    this.arcgisHubGalleryPickerClose.emit();
    const telemetryLabel = { item: "content", group: "groups", user: "users", communityUser: "users", channel: "channel" }[this.targetEntity] || 'content';
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.add.label[telemetryLabel]), { count: this.count }));
  }
  render() {
    // Only renders when the picker is open so the gallery does not fire the search request despite not
    // being rendered in the UI
    return this.open ? (index.h(index.Host, { "data-element": "gallery-picker" }, index.h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.handleGalleryPickerClose, onCalciteModalOpen: this.handleGalleryPickerOpen, open: this.open, "width-scale": this.modalOptions.widthScale }, index.h("div", { slot: "header" }, this.modalTitle), index.h("div", { slot: "content" }, index.h("arcgis-hub-catalog", { callback: this.callback, catalogs: this.catalogs, facets: this.facets, gallerySelection: this._gallerySelection, linkTarget: this.linkTarget, newTab: true, selectionMode: this.selectionMode, showBadges: this.showBadges, showFacetForSingleCatalog: this.showFacetForSingleCatalog, showSearch: this.showSearch, showSelection: this.showSelection, showThumbnail: this.showThumbnail, sortField: this.sortField, sortOptions: this.sortOptions, sourceLabel: this.sourceLabel })), index.h("div", { class: this.count > this.limit ? 'warning' : '', slot: 'back' }, index.h("calcite-label", null, this.intl.t('selected', { count: this.count, limit: this.limit }))), index.h("calcite-button", { appearance: "outline", onClick: this.handleGalleryPickerClose, slot: "secondary", width: "full" }, this.intl.t('cancel')), index.h("calcite-button", { disabled: this.count <= 0 || this.count > this.limit, onClick: this.handleGalleryPickerAdd, slot: "primary", width: "full" }, this.primaryButtonLabel || this.intl.t('add'))))) : undefined;
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubGalleryPicker.style = arcgisHubGalleryPickerCss;

exports.arcgis_hub_catalog = ArcgisHubCatalog;
exports.arcgis_hub_gallery_picker = ArcgisHubGalleryPicker;
