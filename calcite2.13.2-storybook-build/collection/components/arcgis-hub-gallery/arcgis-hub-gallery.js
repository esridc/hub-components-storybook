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
import { Fragment, h, Host } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { CORNERS, IMAGE_TYPES } from "../interfaces";
import { createFacetsFromAggregations } from '../../utils/facet-utils';
import Memoize from '../../decorators/memoize';
import { applyGalleryState, convertToQueryString, processCommonDynamicOptions, getDateRangeFacets, getMapFacets, hasMapFacets, getOptionsBasedFacets, isValidDateRange, navigate, resetFacet, serializeGalleryState, willStateChange, filterFacetsBasedOnLayout, addPathToResults } from '../../utils/gallery-utils';
import { dictionary, constants } from '@esri/telemetry-dictionary-hub';
import Debounce from "../../decorators/debounce";
import { cloneObject, hubSearch, removeEmptyProps, titleize, without, flattenArray, bboxToString, getCardModelUrlFromResult, unicodeToBase64, bBoxToExtent } from '@esri/hub-common';
import { SortDirection } from '../../utils/cardModelConverters/types';
import { DEFAULT_MAP_SETTINGS, } from './utils/location';
import { matchesTelemetry } from '../../utils/telemetry';
import { connectContext, getGlobalContext } from '../../utils/state';
import Extent from "@arcgis/core/geometry/Extent";
import { filterFacetsbyTargetEntity, hydrateFacets } from './utils/facets';
const DEFAULT_GALLERY_SELECTION = {
  channel: [],
  item: [],
  group: [],
  user: [],
  portalUser: [],
  communityUser: [],
  groupMember: [],
  event: [],
  eventAttendee: []
};
/**
 * arcgis-hub-gallery
 *
 * @slot loading-screen - A slot for overriding the default skeleton-loader loading state. Useful for
 * showing a custom loading experience (example: <calcite-loader />)
 *
 * TODO: Document other <slots />
 */
export class ArcgisHubGallery {
  constructor() {
    /**
     * renders each bulk action
     * @param {IInternalComponentAction} action
     * @returns bulk action along with the tooltip associated with the action
     */
    this.renderBulkAction = (action) => {
      var _a;
      const actionArgs = {
        active: action.loading,
        icon: action.icon,
        key: action.key,
        loading: action.loading,
        text: action.text,
        textEnabled: true,
        disabled: action.disabled
      };
      // handles bulk action
      let bulkAction;
      const id = `bulk-action-${action.key}`;
      if (action.name && !action.children) {
        bulkAction = h("calcite-action", Object.assign({ id: id, onClick: action.handler }, actionArgs));
      }
      else if (action.children) {
        // if it's got children we will render it as a dropdown
        bulkAction =
          h("calcite-dropdown", { "width-scale": "m" }, h("calcite-action", Object.assign({}, actionArgs, { id: id, slot: "trigger" })), h("calcite-dropdown-group", { selectionMode: "none" }, action.children.map(child => {
            return (h("calcite-dropdown-item", { key: child.key, onCalciteDropdownItemSelect: child.handler }, h("div", null, h("div", null, child.text), h("div", null, child.helperText))));
          })));
      }
      // returns bulk action with tooltip association
      return (h(Fragment, null, bulkAction, ((_a = action.tooltip) === null || _a === void 0 ? void 0 : _a.text) &&
        h("calcite-tooltip", { label: action.tooltip.label || action.tooltip.text, placement: "top", "reference-element": id }, h("span", null, action.tooltip.text))));
    };
    this._context = getGlobalContext();
    this.term = undefined;
    this.baseUrl = undefined;
    this.path = "";
    this.linkTarget = 'self';
    this.api = 'portal';
    this.limit = 10;
    this.sortField = null;
    this.sortOrder = null;
    this.sortByIds = undefined;
    this.layout = 'list';
    this.layoutOptions = ['grid', 'list', 'table'];
    this.showThumbnail = true;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.showSort = false;
    this.showSearch = false;
    this.matchRecent = false;
    this.matchSearch = false;
    this.showChips = false;
    this.showFacets = false;
    this.newTab = false;
    this.selectionMode = 'none';
    this.bulkActions = { position: 'bottom', actions: [] };
    this.showMoreResultsBtn = false;
    this.showResultsCount = false;
    this.showBackToTopBtn = false;
    this.query = undefined;
    this.facets = [];
    this.galleryType = undefined;
    this.cardTitleTag = undefined;
    this.include = '';
    this.state = {};
    this.corners = CORNERS.square;
    this.showAdditionalInfo = true;
    this.showEmptyState = true;
    this.disableTelemetry = false;
    this.shadow = undefined;
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.mobileView = false;
    this.showAddContent = false;
    this.addContentProps = {};
    this.showFacetModal = false;
    this._shouldShowFacetModal = false;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.showLayoutSwitcher = false;
    this.mapSettings = undefined;
    this.galleryMapSettings = DEFAULT_MAP_SETTINGS;
    this.expand = undefined;
    this.showResults = true;
    this.disableMapMouseWheelZoom = false;
    this.additionalFacet = undefined;
    this.gallerySelection = undefined;
    this._gallerySelection = undefined;
    this.showSelection = false;
    this.cardActionLinks = [];
    this.callback = undefined;
    this.sortOptions = undefined;
    this.primaryActionsToRender = 1;
    this.tableColumns = undefined;
    this.isInitialized = false;
    this.isSearching = false;
    this.actions = [];
    this.searchResults = [];
    this.error = undefined;
    this._facets = undefined;
    bind(this, 'changeSortField', 'fetchMore', 'actionHandler', 'closeFacetModal', 'onFacetModalClose', 'onFacetModalOpen', 'onFacetChange', 'resetFacets', 'backToTop', 'setResultTopSpan', 'logGalleryActionsTelemetry', 'handleSearchChange', 'handleMatchSelected', 'handleHubTelemetry', 'openFacetModal');
  }
  // NOTE: Use this private getter instead of referencing `this.include` directly
  get _include() {
    return this.include ? this.include.split('|') : [];
  }
  /**
   * The currently active SortOption
   */
  get _activeSortOption() {
    var _a;
    const sortAttr = this.sortField;
    const option = (_a = this._sortOptions) === null || _a === void 0 ? void 0 : _a.find(option => option.attribute === sortAttr);
    return option && Object.assign(Object.assign({}, option), { order: this.sortOrder });
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._facets = this.buildFacets();
    this.initialize();
  }
  /**
   * Builds the facets for the gallery with the facets
   * passed in, hydrating them so if a facet is a string,
   * it is converted to an IFacet, and filtering them
   * based on the targetEntity
   */
  buildFacets() {
    const targetEntity = this.activeQuery.targetEntity;
    const hydratedfacets = hydrateFacets(this.facets, this._context, this.intl);
    const filteredByEntityType = filterFacetsbyTargetEntity(hydratedfacets, targetEntity);
    const filteredByLayout = filterFacetsBasedOnLayout(filteredByEntityType, this.layout);
    return filteredByLayout;
  }
  async initialize() {
    try {
      // Clear any previous errors on initialization
      this.error = null;
      // We only want to show the skeleton loader the first time the component loads, not on subsequent searches
      // NOTE: the initialized flag is set to true in `this.search()` once search results have been fetched.
      this.isInitialized = false;
      // Visual audits can use this attribute to determine when to take screenshots
      delete this.element.dataset.testReady;
      // -----------------------------------------------------------------
      // Actions via Slot disabled for now - may revisit
      // -----------------------------------------------------------------
      // Currently handled via slot, which allows customization of the UX
      // I think we'd be better served using tuples of well-known actions
      // NOTE: querySelector('slot') is almost always null, unless it's a
      // reload spawned from a rebuild
      // const slot = this.element.shadowRoot.querySelector('slot') as HTMLSlotElement;
      // this.actions = slot.assignedElements();
      // This works consistently vs getting slot from shadowRoot
      // this.actions =  Array.from(this.element.querySelectorAll("[action]"));
      // -----------------------------------------------------------------
      // If component was not passed an IQuery, construct it from the other passed in props
      if (!this.query) {
        this.query = {
          targetEntity: this.galleryType || 'item',
          filters: [
            {
              predicates: [
                {
                  term: this.term
                }
              ]
            }
          ]
        };
      }
      this.setSortOptions(this.sortOptions);
      // If a gallerySelection is not passed in, construct it
      if (!this.gallerySelection || !Object.entries(this.gallerySelection).length) {
        this.gallerySelection = cloneObject(DEFAULT_GALLERY_SELECTION);
      }
      if (this._facets) {
        // pre-fetch dynamic facet options
        await this.fetchDynamicFacetOptions();
      }
      // run initial state setup (and select dynamic facet values)
      if (Object.keys(this.state).length > 0) {
        this.applySerializedState(this.state);
      }
      // send the current state of the gallery so hosts can serialize to url
      this.arcgisHubGalleryStateChange.emit(Object.assign(Object.assign({}, this.serializedGalleryState), { isInitialization: true }));
      // Include the existing selection in the selection copy that we want to return back
      // to the consuming app
      // Assign a gallerySelection clone otherwise updating _gallerySelection will
      // also update gallerySelection
      this._gallerySelection = cloneObject(this.gallerySelection);
      // ...and on to search we go!!
      // since this method is debounced and not awaited, errors are caught and handled seperately
      // inside of internal `search` method.
      this.prepareAndExecuteSearch();
    }
    catch (ex) {
      // String to be used in console.warn
      const message = `We are sorry but component could not initialize.  Please try again.`;
      this.handleError(message, ex, 'initialization');
    }
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async handleContextChange() {
    if (this._facets) {
      await this.fetchDynamicFacetOptions();
    }
    this.prepareAndExecuteSearch();
  }
  async fetchFacetsAndSearch() {
    this._facets = this.buildFacets();
    if (this._facets) {
      await this.fetchDynamicFacetOptions();
      // Clear all the facets to an empty state and notify consumers
      // Note: We do not use resetFacets() since we also need to reset the query string.
      this.applySerializedState({});
      this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    }
    this.prepareAndExecuteSearch();
  }
  /**
   * Build the search options and filters then excute the search
   */
  prepareAndExecuteSearch() {
    this.search(this.activeQuery, this._searchOptions);
  }
  onStateChanged() {
    // Applying state can be costly, so we only do it if the new user input will actually cause a change
    if (willStateChange(this.serializedGalleryState, this.state)) {
      this.applySerializedState(this.state);
      this.prepareAndExecuteSearch();
    }
  }
  onGallerySelectionChanged(gallerySelection) {
    this._gallerySelection = Object.assign({}, gallerySelection);
  }
  /**
   * Re-fetches the search results up to the current "page"
   * For use in cases where the consumer knows the results have changed
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubGallery
   */
  async refresh() {
    // re-fetches search results up to the current "page"
    const currentPageNumber = Math.ceil(this.searchResults.length / this.limit);
    const num = currentPageNumber * this.limit;
    const opts = Object.assign(Object.assign({}, this._searchOptions), { num });
    this.search(this.activeQuery, opts);
  }
  async clearSelection() {
    this.gallerySelection = cloneObject(DEFAULT_GALLERY_SELECTION);
  }
  setResultTopSpan(el) {
    this.resultTopSpan = el;
  }
  /**
   * Apply serialize state to the Gallery
   * @param state
   */
  applySerializedState(state) {
    const updatedState = applyGalleryState(this.galleryState, state);
    // now apply the state into the gallery properties
    if (updatedState.term !== this.term) {
      this.term = updatedState.term;
    }
    if (updatedState.sort) {
      this.sortField = updatedState.sort.attribute;
      this.sortOrder = updatedState.sort.order;
    }
    if (updatedState.facets) {
      this._facets = updatedState.facets;
    }
    if (updatedState.layout) {
      this.layout = updatedState.layout;
    }
  }
  /**
   * Batches of fields that need aggregations fetched from the API
   * Note: Because the portal API can only handle 3 aggregation fields at a time,
   * each batch has a max size of 3
   */
  get _aggFieldBatches() {
    const fields = getOptionsBasedFacets(this._facets).reduce((acc, facet) => {
      if (facet.field) {
        acc.push(facet.field);
      }
      return acc;
    }, []);
    const batches = [];
    const batchSize = 3;
    for (let i = 0; i < fields.length; i += batchSize) {
      batches.push(fields.slice(i, i + batchSize));
    }
    return batches;
  }
  /**
  * The max number of aggregations to get from the API
  * For the portal API the max is 200, and regardless of how many
  * fields are requested, the same number is applied to all.
  */
  get _aggLimit() {
    // Find the largest aggLimit, or use 10 as the default
    return getOptionsBasedFacets(this._facets).reduce((acc, facet) => {
      if (facet.aggLimit && facet.aggLimit > acc) {
        acc = facet.aggLimit;
      }
      return acc;
    }, 10);
  }
  get hasSearchResults() {
    return this.lastSearchResponse && !!this.searchResults.length;
  }
  /**
   * return array of `IFilter`'s which represent the selected/active
   * facets options
   */
  get activeFacetFilters() {
    const filters = [];
    getOptionsBasedFacets(this._facets).forEach((facet) => {
      const selectedPredicates = facet.options.reduce((acc, opt) => {
        if (opt.selected) {
          acc = [...acc, ...opt.predicates];
        }
        return acc;
      }, []);
      // if there are any selectedPredicates, construct a filter for the facet
      if (selectedPredicates.length) {
        const filter = {
          operation: facet.operation,
          predicates: selectedPredicates
        };
        filters.push(filter);
      }
    });
    return filters;
  }
  get activeDateRangeFilters() {
    const filters = [];
    const dateRangeFacets = getDateRangeFacets(this._facets || []);
    dateRangeFacets.forEach((facet) => {
      if (facet.value && isValidDateRange(facet.value)) {
        const fieldRange = {
          from: Date.parse(facet.value.from),
          to: Date.parse(facet.value.to)
        };
        const filter = {
          operation: 'OR',
          predicates: [{
              [facet.field]: fieldRange
            }]
        };
        filters.push(filter);
      }
    });
    return filters;
  }
  get activeMapFilters() {
    const filters = [];
    const mapFacets = getMapFacets(this._facets || []);
    mapFacets.forEach((facet) => {
      if (facet.value) {
        const filter = {
          operation: 'OR',
          predicates: [{
              [facet.field]: bboxToString(facet.value)
            }]
        };
        filters.push(filter);
      }
    });
    return filters;
  }
  /**
   * True if error is present on @State() error
   */
  get hasError() {
    return !!this.error;
  }
  async fetchDynamicFacetOptions() {
    if (this._aggSearchOptionBatches.length) {
      try {
        const searchPromises = this._aggSearchOptionBatches.map((batchOptions) => hubSearch(this.query, batchOptions));
        const aggregationBatches = await Promise.all(searchPromises);
        const aggregationFacets = aggregationBatches.reduce((facets, { aggregations }) => {
          if (aggregations) {
            const batchFacets = createFacetsFromAggregations(aggregations);
            facets = facets.concat(batchFacets);
          }
          return facets;
        }, []);
        // now, set the options of each corresponding facet
        aggregationFacets.forEach((aggFacet) => {
          const existingFacet = getOptionsBasedFacets(this._facets).find(f => f.field === aggFacet.field);
          if (existingFacet) {
            const formattedOptions = processCommonDynamicOptions(aggFacet, this.intl);
            existingFacet.options = formattedOptions;
          }
        });
        // clone facets to trigger re-render
        this._facets = this._facets.map(f => cloneObject(f));
      }
      catch (ex) {
        throw new Error(`Error loading facet options: ${ex}`);
      }
    }
  }
  /**
   * 'Execute' the hubSearch fn and assign state variables based on the response
   * @param query IQuery
   * @param options IHubSearchOptions
   */
  async search(query, options) {
    try {
      this.isSearching = true;
      const response = await hubSearch(query, options);
      // inject path if set
      response.results = addPathToResults(this.path, response.results);
      this.lastSearchResponse = response;
      // We emit the IHubSearchResults because those objects have more info than the ViewModels
      this.arcgisHubGalleryResultsChange.emit(response.results);
      // emit the length of the executed query string if we have it
      response.executedQuerySize && this.arcgisHubGalleryExecutedQuerySize.emit(response.executedQuerySize);
      const { sortByIds } = this;
      let sortedResults = response.results;
      if (sortByIds && sortByIds.length) {
        sortedResults = response.results.slice().sort((a, b) => {
          // sort according to the ids array
          // but if it is not in the array, put it at the end
          const aIdx = sortByIds.includes(a.id) ? sortByIds.indexOf(a.id) : Infinity;
          const bIdx = sortByIds.includes(b.id) ? sortByIds.indexOf(b.id) : Infinity;
          return aIdx - bIdx;
        });
      }
      this.searchResults = sortedResults;
      // In case this is the initial search on startup, set the initialized flag to true
      // NOTE: the initialized flag is turned off in `componentWillLoad()`
      this.isInitialized = true;
      // Visual audits can use this attribute to determine when to take screenshots
      this.element.dataset.testReady = '';
    }
    catch (ex) {
      // String to be used in console.warn
      const message = `We are sorry but search ran into an error.  Please try again.`;
      this.handleError(message, ex, 'search');
    }
    this.isSearching = false;
  }
  /**
   * Fired when "Load More" button is clicked
   */
  async fetchMore() {
    const currentPageNumber = Math.ceil(this.searchResults.length / this.limit);
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.loadMore), { search: convertToQueryString(this.serializedGalleryState), element: constants.element.RESULTS_LIST, position: currentPageNumber, count: this.lastSearchResponse.total }));
    try {
      // cache the results count before fetching more results
      this.lastSearchResultsCount = this.searchResults.length;
      this.lastSearchResponse = await this.lastSearchResponse.next();
      // inject path if set
      this.lastSearchResponse.results = addPathToResults(this.path, this.lastSearchResponse.results);
      this.searchResults = [...this.searchResults, ...this.lastSearchResponse.results];
    }
    catch (e) {
      console.error(`Unable to fetch more results: ${e}`);
    }
  }
  backToTop() {
    var _a;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.backToTop), { element: constants.element.BACK_TO_TOP }));
    // Focus for accessibility requirements. Next tab should place the user into the results list.
    (_a = this.resultTopSpan) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
    // When used on Hub, the global navbar is "covering" some portion of the gallery, so when
    // scroll to top, we need to scroll to the top of the parent element to show the entire gallery.
    // In other cases, e.g. the catalog component, we only need to scroll to the top of
    // the gallery (element.parenetElement is null)
    this.element.parentElement
      ? this.element.parentElement.scrollIntoView({ behavior: 'smooth' })
      : this.element.scrollIntoView({ behavior: 'smooth' });
  }
  /**
   * Compute the `IQuery`  based on the current state of the component
   */
  get activeQuery() {
    // start with the base query, and add additional filters
    const qry = cloneObject(this.query);
    // if we have a query, add a filter for it
    if (this.term) {
      qry.filters.push({
        predicates: [
          {
            term: this.term
          }
        ]
      });
    }
    // append list filters
    if (this.activeFacetFilters.length) {
      qry.filters = [...qry.filters, ...this.activeFacetFilters];
    }
    // append date range filters
    if (this.activeDateRangeFilters.length) {
      qry.filters = [...qry.filters, ...this.activeDateRangeFilters];
    }
    if (this.activeMapFilters.length) {
      qry.filters = [...qry.filters, ...this.activeMapFilters];
    }
    // if we have no blocks, and this is a user search, we need to add in an empty term query
    // as the user search api actually supports this. We can't push this down to `hubSearch`
    // unless we also send the `FilterType`
    if (!qry.filters.length && this.query.targetEntity === "user") {
      qry.filters.push({
        predicates: [
          {
            term: ""
          }
        ]
      });
    }
    // If there are pre-selected cards and we choose to not show them, exclude their IDs from the query
    if (!this.showSelection && this.gallerySelection && flattenArray(Object.values(this.gallerySelection)).length) {
      // If there is an entry for the gallery selection for the type of the current query
      // add it to the exclude ID list
      for (const [type, ids] of Object.entries(this.gallerySelection)) {
        if (type === qry.targetEntity) {
          // We are doing the below because items need an id to exclude, but users need a username
          // to properly exclude the user from the search response.
          // This _may_ need expansion with other types depending on how the API evolves
          let targetToExclude = 'id';
          if (type === 'communityUser' || type === 'portalUser' || type === 'groupMember' || type === 'user') {
            targetToExclude = 'username';
          }
          qry.filters.push({
            predicates: [
              {
                [targetToExclude]: {
                  not: [...ids]
                }
              }
            ]
          });
        }
      }
    }
    return qry;
  }
  /**
   * Construct an `IHubSearchOptions` based on the current state of the component
   */
  get _searchOptions() {
    var _a, _b;
    const opts = {
      num: this.limit,
      // Don't use _activeSortOption, as we want sortField and sortOrder to be pass-throughs to the api
      sortField: this.sortField,
      sortOrder: SortDirection[this.sortOrder],
      include: this._include,
      requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions,
      // httpMethod is only respected by the Portal API
      // OGC API is GET only
      httpMethod: 'POST'
    };
    // TODO: we can remove this once the hubSearch subsystem has been updated
    // to use the platform-level OGC API instead of the site-level OGC API
    if (this.api === 'hub') {
      opts.site = (_b = this._context) === null || _b === void 0 ? void 0 : _b.hubUrl;
    }
    return opts;
  }
  /**
   * Construct batches of `IHubSearchOptions` for aggregations based on the current state of the component.
   * We have to batch the requests due to the Portal API's limit of 3 aggregation fields per request.
   */
  get _aggSearchOptionBatches() {
    var _a, _b;
    const baseBatchOptions = {
      num: 1,
      include: [],
      requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions,
      aggLimit: this._aggLimit,
      httpMethod: 'POST'
    };
    // TODO: we can remove this once the hubSearch subsystem has been updated
    // to use the platform-level OGC API instead of the site-level OGC API
    if (this.api === 'hub') {
      baseBatchOptions.site = (_b = this._context) === null || _b === void 0 ? void 0 : _b.hubUrl;
    }
    const searchOptionBatches = [];
    this._aggFieldBatches.forEach((fieldBatch) => {
      searchOptionBatches.push(Object.assign(Object.assign({}, baseBatchOptions), { aggFields: fieldBatch }));
    });
    return searchOptionBatches;
  }
  /**
   * Return a single structure that represents the current state of the gallery
   */
  get galleryState() {
    return {
      term: this.term,
      sort: this._activeSortOption,
      facets: this._facets,
      layout: this.layout
    };
  }
  /**
   * Return the serialized state of the gallery
   */
  get serializedGalleryState() {
    return removeEmptyProps(serializeGalleryState(this.galleryState));
  }
  get _hasSlottedGalleryActions() {
    return !!this.element.querySelector('[slot="gallery-actions"]');
  }
  handleLayoutSelect(event) {
    var _a;
    this.layout = event.detail;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.view), { element: constants.element.VIEW_BUTTON, details: `${titleize(this.layout)} View`, search: convertToQueryString(this.serializedGalleryState), count: ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total) || 0 }));
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
  }
  sendCardTitleClickTelemetry(event) {
    var _a;
    const { model } = event.detail;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.click), { type: model.type, search: convertToQueryString(this.serializedGalleryState), element: model.index === -1 ? constants.element.POPUP : constants.element.RESULTS_LIST, position: model.index, count: (_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total }));
  }
  sendMoreLessClickTelemetry(event) {
    const { facet, isMore } = event.detail;
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.filter), { details: isMore
        ? constants.details.MORE
        : constants.details.LESS, search: convertToQueryString(this.serializedGalleryState), element: facet.key, count: this.lastSearchResponse.total }));
  }
  /**
   * Add/remove a card ID from the `gallerySelection` list when it is selected/deselected
   * It emits the `arcgisHubGallerySelect` event that's being listened by the consumer component
   * @param event
   */
  cardSelect(event) {
    event.stopPropagation();
    const id = event.detail.id;
    const selection = this._gallerySelection[this.query.targetEntity];
    if (selection.includes(id)) {
      // user selected one that is currently selected, remove it from the selection
      this._gallerySelection[this.query.targetEntity] = without(selection, event.detail.id);
    }
    else if (this.selectionMode === 'single') {
      // user selected one that is not selected and we are in single select mode, selection becomes just this one
      this._gallerySelection[this.query.targetEntity] = [event.detail.id];
    }
    else {
      // user selected one that is not selected and we are in multiple select mode, add it to the selection
      this._gallerySelection[this.query.targetEntity] = [...selection, event.detail.id];
    }
    this._gallerySelection = cloneObject(this._gallerySelection);
    this.arcgisHubGallerySelect.emit(this._gallerySelection);
  }
  /**
   * Handle any gallery errors by setting error state to thrown error, clearing
   * any existing search results, setting isInitialized to true, clearing the map,
   * and logging the message as a warning to the console.
   * @param message string - the custom error to log to the console
   * @param err Error - the error object
   * @param source ErrorSource - the source of the error
   */
  handleError(message, err, source) {
    var _a;
    this.error = err;
    this.searchResults = []; // upon error, clear any existing results
    this.isInitialized = true; // need to set to true, else will be stuck in skeleton loading state
    console.warn(message, err);
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.query), { details: `Failure: ${source} : ${err.message}`, search: convertToQueryString(this.serializedGalleryState), count: ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total) || 0 }));
  }
  /**
   * Listen for changes on the search input
   * @param event
   */
  handleSearchChange(event) {
    event.stopPropagation();
    this.searchTerm(event.detail);
  }
  /**
   * Executes a new search based on the updated term
   * @param term term to search
   */
  searchTerm(term) {
    // We have this guard to prevent duplicate searches
    if (this.term !== term) {
      // changing the query will execute the search
      this.term = term;
      this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
      this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
        .category.interaction
        .action.search
        .label.query), { details: convertToQueryString(this.serializedGalleryState), search: this.term, element: constants.element.ON_PAGE }));
    }
  }
  /**
   * Handles when a match is selected from the auto-suggest component
   */
  handleMatchSelected(event) {
    const match = event.detail;
    switch (match.source) {
      case 'recent':
        const recentMatch = match;
        this.searchTerm(recentMatch.label);
        break;
      case 'search':
        this.handleSearchMatchSelected(match);
        break;
      case 'location':
        console.warn('Location matches are not yet supported');
        break;
    }
  }
  /**
   * Navigate to the corresponding url of a search match
   * @param match match to navigate to
   */
  handleSearchMatchSelected(match) {
    // TODO: Should we actually _emit_ an event when `linkTarget` is set to `event`?
    // We're not currently doing anything of the sort, even when actual card is clicked
    if (!['none', 'event'].includes(this.linkTarget)) {
      const url = getCardModelUrlFromResult(match.result, this.linkTarget, this.baseUrl);
      navigate(url);
    }
  }
  /**
  * Handle changes in the facets
  * @param event
  */
  onFacetChange(event) {
    event.stopPropagation();
    const updatedFacet = cloneObject(event.detail);
    // based on the payload, update the state of the facet
    const updatedFacets = this._facets.map((facet) => {
      return facet.key === updatedFacet.key ? Object.assign(Object.assign({}, facet), updatedFacet) : facet;
    });
    this._facets = updatedFacets;
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    this.prepareAndExecuteSearch();
  }
  /**
   * Reset the facets to the original state
   */
  resetFacets() {
    var _a;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.filter), { details: constants.details.RESET, search: convertToQueryString(this.serializedGalleryState), element: constants.element.RESET_FILTERS, count: (_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total }));
    this._facets = this._facets.map(resetFacet);
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    // update state based on the query
    this.prepareAndExecuteSearch();
  }
  /**
   * Handle the telemetry event on arcgis-hub-auto-suggest and stop it from propagating
   * if it's a search query
   * @param e CustomEvent<any> - A custom event that contains the telemetry data
   */
  handleHubTelemetry(e) {
    if (matchesTelemetry(e.detail, dictionary.category.interaction.action.search.label.query)) {
      e.stopPropagation();
    }
  }
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data) {
    if (!this.disableTelemetry) {
      this.hubTelemetry.emit(data);
    }
  }
  /**
   * Triggered every time sort field has changed
   * @param event
   */
  changeSortField(event) {
    this.sortField = event.detail.attribute;
    this.sortOrder = event.detail.order;
    this.arcgisHubGalleryStateChange.emit(this.serializedGalleryState);
    this.prepareAndExecuteSearch();
  }
  /**
   * Render the search input
   * @returns
   */
  renderSearch() {
    if (this.showSearch) {
      return h("arcgis-hub-auto-suggest", { class: "search-bar", clearButton: true, disableTelemetry: this.disableTelemetry, matchRecent: this.matchRecent, matchSearch: this.matchSearch, onArcgisHubAutoSuggestInputChange: this.handleSearchChange, onArcgisHubAutoSuggestMatchSelected: this.handleMatchSelected, onHubTelemetry: this.handleHubTelemetry, query: this.query, searchApi: this.api, showSearchIcon: true, term: this.term });
    }
  }
  renderMobileFacetsTrigger() {
    var _a;
    if (this.mobileView && ((_a = this._facets) === null || _a === void 0 ? void 0 : _a.length)) {
      return (h("calcite-button", { appearance: "transparent", iconStart: "filter", label: this.intl.t('filter'), onClick: this.openFacetModal, scale: "l" }));
    }
  }
  renderLayoutSwitcher() {
    if (this.showLayoutSwitcher && !this.mobileView) {
      const layoutOptions = this.layoutOptions.map((opt) => {
        const icon = opt === 'compact' ? 'list-bullet' : opt;
        return {
          tooltip: this.intl.t(`layoutOptions.${opt}`),
          layout: opt,
          icon
        };
      });
      return h("div", { class: "layout-switcher-container" }, layoutOptions.map((opt) => (h("arcgis-hub-layout-button", { class: "layout-option", icon: opt.icon, key: opt.layout, layout: opt.layout, selected: this.layout === opt.layout, tooltip: opt.tooltip }))));
    }
  }
  /**
   * Render the More Results button
   * @returns
   */
  renderMoreResultsBtn() {
    var _a;
    if (this.showMoreResultsBtn && ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.hasNext)) {
      return (h("calcite-button", { onClick: this.fetchMore }, this.intl.t('moreResults')));
    }
  }
  renderBackToTopBtn() {
    if (this.showBackToTopBtn && this.hasSearchResults) {
      return (h("calcite-button", { appearance: "outline", class: 'back-to-top-btn', onClick: this.backToTop }, this.intl.t('backToTop')));
    }
  }
  /**
    * Get the sort options for the sort field
    * defaultOrder is the default sort order and order is the current order
    * label is unused but is here because it is required in ISortOption
    * Note that 'relevance' has null attributes. That is because selecting 'relevance'
    * is meant to remove any explicit sort field on our end and rely instead on the backing
    * API's ranking algorithm. In other words, it's actually the _absence_ of a sort field.
  */
  setSortOptions(sortOptions) {
    // Note: Label is not used in the UI, but is required in ISortOption
    const sortOptionsMap = {
      relevance: { attribute: null, label: 'Relevance', defaultOrder: null, order: null },
      title: { attribute: 'title', label: 'Title', defaultOrder: 'asc', order: 'asc' },
      created: { attribute: 'created', label: 'Date Created', defaultOrder: 'desc', order: 'desc' },
      startDate: { attribute: 'startDate', label: 'Date', defaultOrder: 'desc', order: 'desc' },
      modified: { attribute: 'modified', label: 'Date Updated', defaultOrder: 'desc', order: 'desc' },
      username: { attribute: 'username', label: 'Username', defaultOrder: 'asc', order: 'asc' },
      firstName: { attribute: 'firstName', label: 'First name', defaultOrder: 'desc', order: 'desc' },
      lastName: { attribute: 'lastName', label: 'Last name', defaultOrder: 'desc', order: 'desc' },
      joined: { attribute: 'joined', label: 'Date Joined', defaultOrder: 'desc', order: 'desc' },
      // membertype is all lowercase because that's what the API takes
      memberType: { attribute: 'membertype', label: 'Role', defaultOrder: 'desc', order: 'desc' },
    };
    sortOptions = sortOptions || ['relevance', 'title', 'created', 'modified'];
    this._sortOptions = sortOptions.map(option => sortOptionsMap[option]);
  }
  /**
 * Only render sort when set to do so
 * @returns the -search-sort component
 */
  renderSort() {
    if (this.showSort && this.hasSearchResults) {
      return h("arcgis-hub-search-sort", { activeSortOption: this._activeSortOption, class: "search-sort", onHubSearchSortChange: this.changeSortField, sortOptions: this._sortOptions });
    }
  }
  handleFacetModalChange(newValue) {
    this._shouldShowFacetModal = newValue;
  }
  openFacetModal() {
    this._shouldShowFacetModal = true;
  }
  /**
   * Forces the calcite-modal component to fire the calciteModalClose
   * event when the "View Results" button is clicked.
   */
  closeFacetModal() {
    this._shouldShowFacetModal = false;
  }
  /**
   * arcgis-wormhole prevents targeting of the underlying `calciteModalClose` event,
   * so binding this callback and firing a new custom event guarantees that consumers can
   * be notified that the modal is closed.
   *
   * @param event
   */
  onFacetModalClose(event) {
    event.stopPropagation();
    this.closeFacetModal();
    this.arcgisHubContentGalleryFacetModalClose.emit();
  }
  onFacetModalOpen(event) {
    event.stopPropagation();
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.sheet.details.filters);
  }
  renderFacets() {
    if (this.showFacets) {
      return this.mobileView ? this.renderMobileFacets() : this.renderDesktopFacets(this._facets);
    }
  }
  renderDesktopFacets(facets) {
    var _a;
    return h("arcgis-hub-facet-list", { disableTelemetry: this.disableTelemetry, facets: facets, onArcgisHubFacetListChange: this.onFacetChange, onArcgisHubFacetListReset: this.resetFacets, resultsCount: ((_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total) || 0, showChips: this.showChips }, h("div", { slot: 'additional-facet' }, this.additionalFacet), this.mobileView ? '' : h("h2", { class: "facet-list-header", slot: "header" }, this.intl.t('filter')));
  }
  renderMobileFacets() {
    var _a;
    // Set accordions open by default on mobile
    const facets = this._facets.map((facet) => cloneObject(Object.assign(Object.assign({}, facet), { accordionClosed: false })));
    return h("arcgis-wormhole", null, h("calcite-modal", { onCalciteModalClose: this.onFacetModalClose, onCalciteModalOpen: this.onFacetModalOpen, open: this._shouldShowFacetModal }, h("span", { slot: "header" }, this.intl.t('filter')), h("div", { slot: "content" }, this.renderDesktopFacets(facets)), h("calcite-button", { onClick: this.closeFacetModal, slot: "primary", width: "full" }, this.intl.t('viewResults', { numResults: (_a = this.lastSearchResponse) === null || _a === void 0 ? void 0 : _a.total }))));
  }
  actionHandler(evt) {
    // intentionally not calling stopPropagation or preventDefault at this time per guidance from Caleb,
    // will be handled in a separate story that'll verify nothing regresses as a result
    this.arcgisHubGalleryAction.emit(evt.detail);
  }
  get resultsComponent() {
    let ResultsComponent = 'arcgis-hub-gallery-layout-list';
    switch (this.layout) {
      case 'calendar':
        ResultsComponent = 'arcgis-hub-gallery-layout-calendar';
        break;
      case 'map':
        ResultsComponent = 'arcgis-hub-gallery-layout-map';
        break;
      case 'compact':
        ResultsComponent = 'arcgis-hub-gallery-layout-compact';
        break;
      case 'table':
        ResultsComponent = 'arcgis-hub-gallery-layout-table';
        break;
      default:
        // grid, grid-filled, list
        ResultsComponent = 'arcgis-hub-gallery-layout-list';
    }
    return ResultsComponent;
  }
  renderResults() {
    const { hasError, layout, showResults } = this;
    // a little weird maybe but this is roughly how the logic works today
    let shouldRender = showResults;
    if (layout === 'map') {
      shouldRender = !hasError;
    }
    if (shouldRender) {
      const [mapFacet] = getMapFacets(this._facets || []);
      let extent;
      if (mapFacet) {
        const { value: bbox } = mapFacet;
        extent = bbox && new Extent(bBoxToExtent(bbox));
      }
      const { searchResults } = this;
      const ResultsComponent = this.resultsComponent;
      return h(Fragment, null, h("section", { "aria-label": this.intl.t('resultsSection') }, h(ResultsComponent, { baseUrl: this.baseUrl, callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, columns: this.tableColumns, corners: this.corners, disableMouseWheelZoom: this.disableMapMouseWheelZoom, disableTelemetry: this.disableTelemetry, entityType: this.query.targetEntity, expand: this.expand, galleryMapSettings: this.galleryMapSettings, hasError: hasError, imageType: this.imageType, initialExtent: extent, lastSearchResultsCount: this.lastSearchResultsCount, layout: this.layout, lazy: this.lazy, limit: this.limit, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, loading: false, mapSettings: this.mapSettings, newTab: this.newTab, primaryActionsToRender: this.primaryActionsToRender, searchResults: searchResults, selectedIds: this._gallerySelection[this.query.targetEntity], selectionMode: this.selectionMode, shadow: this.shadow, shouldFilterByExtent: !!this.activeMapFilters.length, shouldShowFilterByExtent: hasMapFacets(this._facets) && this.showResults, shouldShowResults: this.showResults, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showEmptyState: this.showEmptyState, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType }, h("slot", { name: "search-error-action", slot: "search-error-action" }), h("slot", { name: "no-results-action", slot: "no-results-action" }))), !!searchResults.length && this.renderResultsCount(), !!searchResults.length && this.renderListFooter());
    }
  }
  renderMain() {
    return h("div", { class: "gallery-list" }, this.renderListHeader(), this.renderBulkActions(), h("span", { class: "result-top", ref: this.setResultTopSpan, tabIndex: -1 }), this.renderResults());
  }
  renderListHeader() {
    const showResultsCount = this.renderResultsCount();
    const showListHeaderControls = this.renderSort() || this.renderLayoutSwitcher() || this.renderGalleryActionsPopover() || this.renderAddContent();
    if (showResultsCount || showListHeaderControls) {
      return (h("div", { class: "gallery-list-header" }, showResultsCount &&
        h("div", { "aria-live": "polite", class: "results-count-container", role: "status" }, this.renderResultsCount()), showListHeaderControls &&
        h("div", { class: "list-header-controls-container" }, this.renderAddContent(), this.renderSort(), this.renderMobileFacetsTrigger(), this.renderLayoutSwitcher(), this.renderGalleryActionsPopover())));
    }
  }
  async handleEntityCreated(_evt) {
    // wait a little so we know the share has happened...
    // this may no longer be necessary because we poll for the new item before raising the event from the add-content component
    await new Promise((resolve) => setTimeout(resolve, 500));
    await this.refresh();
  }
  renderAddContent() {
    if (this.showAddContent) {
      return h("arcgis-hub-add-content", Object.assign({ query: this.query }, this.addContentProps));
    }
  }
  get selectable() {
    return this.selectionMode !== 'none';
  }
  get selectionCount() {
    var _a;
    return (_a = this._gallerySelection[this.query.targetEntity]) === null || _a === void 0 ? void 0 : _a.length;
  }
  get hasSelection() {
    return !!this.selectionCount;
  }
  /**
   * Getter for the internal _bulkActions
   * Used so that we can augment each action with a key for rendering and a pre-bound action handler
   * @readonly
   * @type {IInternalComponentAction[]}
   * @memberof ArcgisHubGallery
   */
  get _bulkActions() {
    var _a;
    // for each action, we want to call its click handler
    // with the action object as the arg
    // so we pre-bind it to each action here
    const bindHandler = (action) => {
      action = Object.assign({}, action);
      if (action.name) {
        action.handler = this.handleBulkAction.bind(this, action);
      }
      // we need a key but we don't have a unique identifier
      const { name, args } = action;
      action.key = unicodeToBase64(JSON.stringify({ name, args }));
      return action;
    };
    const actions = ((_a = this.bulkActions) === null || _a === void 0 ? void 0 : _a.actions) || [];
    return actions.map((action) => {
      action = bindHandler(action);
      if (!!action.children) {
        action.children = action.children.map(bindHandler);
      }
      return action;
    });
  }
  /**
   * Handler for bulk actions
   * @param {IComponentAction} action
   * @memberof ArcgisHubGallery
   */
  async handleBulkAction(action) {
    const selection = this._gallerySelection[this.query.targetEntity];
    if (!!action && !!selection.length) {
      const { name, args } = action;
      this.arcgisHubGalleryBulkAction.emit({ action: { name, args }, selection });
    }
  }
  renderBulkActions() {
    if (this.hasSelection && this._bulkActions.length) {
      const classObj = {
        'bulk-actions': true,
        sticky: this.bulkActions.position === 'top'
      };
      return h("calcite-action-pad", { class: classObj, "expand-disabled": true, expanded: true, layout: "horizontal", scale: "s" }, h("div", { class: "selection-count" }, this.intl.t('selected', { count: this.selectionCount })), this._bulkActions.map(this.renderBulkAction));
    }
  }
  renderGalleryActionsPopover() {
    let result;
    if (this._hasSlottedGalleryActions) {
      result = h("div", { class: "actions-popover-container" }, h("calcite-popover", { "auto-close": true, label: this.intl.t('galleryActionsLabel'), overlayPositioning: "fixed", placement: "bottom-end", referenceElement: "gallery-actions-toggle" }, h("div", { class: "actions-popover-content" }, h("slot", { name: "gallery-actions" }))), h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", id: "gallery-actions-toggle", kind: "neutral", label: this.intl.t('popoverActionButtonLabel'), onClick: this.logGalleryActionsTelemetry, round: true, scale: "m" }));
    }
    return result;
  }
  logGalleryActionsTelemetry() {
    this.maybeSendTelemetry(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.action
      .details.overflow));
  }
  renderListFooter() {
    if (this.renderMoreResultsBtn() || this.renderBackToTopBtn()) {
      return (h("div", { class: 'gallery-list-footer' }, h("div", null, this.renderMoreResultsBtn()), h("div", null, this.renderBackToTopBtn())));
    }
  }
  renderResultsCount() {
    if (this.showResultsCount && this.hasSearchResults) {
      return h("p", { class: 'results-count' }, this.intl.t('resultsCount', { pageTotal: this.searchResults.length, searchTotal: this.lastSearchResponse.total }));
    }
  }
  renderGallery() {
    return this.renderGalleryDefault();
  }
  /**
   * Render the gallery with the default layout
   */
  renderGalleryDefault() {
    return h(Fragment, null, this.renderSearch(), h("slot", { name: "collection-select" }), h("div", { class: "gallery-main", "data-searching": this.isSearching ? 'true' : null }, this.renderFacets(), this.renderMain()), h("slot", { name: "click-actions" }));
  }
  renderLoadingScreen() {
    const ResultsComponent = this.resultsComponent;
    return h("slot", { name: "loading-screen" }, h(ResultsComponent, { layout: this.layout, loading: true, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showType: this.showType }));
  }
  /**
   * Main Render
   * @returns
   */
  render() {
    return (h(Host, null, this.isInitialized ? this.renderGallery() : this.renderLoadingScreen()));
  }
  static get is() { return "arcgis-hub-gallery"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery.css"]
    };
  }
  static get assetsDirs() { return ["assets", "locales"]; }
  static get properties() {
    return {
      "term": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "[Syntactic Sugar Property, used to create a base IQuery object if `this.query` is not passed in]\n\nThe search term that the gallery should scope its results to. If `this.query` is not passed in, this term\nbecomes a permanant scope for the gallery (i.e., changing the value in the search bar will\nnot change the base query's scope)."
        },
        "attribute": "term",
        "reflect": false
      },
      "baseUrl": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Base url that individual result cards use when deriving their model's target url.\nIf provided, cards will link to `baseUrl` + the url determined by the designated \"linkTarget\""
        },
        "attribute": "base-url",
        "reflect": false
      },
      "path": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Content Hierarchy Path that will be appended onto the urls of individual cards\nas `?path=${path}`"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
      },
      "linkTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardModelTarget",
          "resolved": "\"event\" | \"none\" | \"self\" | \"siteRelative\" | \"workspaceRelative\"",
          "references": {
            "CardModelTarget": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pre-defined options of where the card should redirect"
        },
        "attribute": "link-target",
        "reflect": false,
        "defaultValue": "'self'"
      },
      "api": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'portal' | 'hub'",
          "resolved": "\"hub\" | \"portal\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The search API that should be targeted."
        },
        "attribute": "api",
        "reflect": false,
        "defaultValue": "'portal'"
      },
      "limit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Default number of results to show"
        },
        "attribute": "limit",
        "reflect": false,
        "defaultValue": "10"
      },
      "sortField": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Default sort field. Null indicates that no sorting should be applied to the initial search requests."
        },
        "attribute": "sort-field",
        "reflect": false,
        "defaultValue": "null"
      },
      "sortOrder": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "\"asc\" | \"desc\"",
          "resolved": "\"asc\" | \"desc\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Default sort order. Null indicates that the backing api's default sort direction should be used in\nthe initial search requests."
        },
        "attribute": "sort-order",
        "reflect": false,
        "defaultValue": "null"
      },
      "sortByIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Only useful when the search results of a gallery are known ahead of time (e.g. a gallery is meant to\nrender the same 6 results every time).\n\nWhen specified, search results that match one of the supplied ids will appear at the top of the gallery\nin the same order of the array. If a supplied id doesn't have a corresponding search result, the id is\nremoved from the sort flow.\n\nFor example, if `sortByIds = ['1', '2', '3'], but no search result with id `2` is returned, then the gallery\nwould render the results in the following order:\n- Result with id `1`\n- Result with id `3`\n- Any other results that came back with the search"
        }
      },
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "LayoutOptions",
          "resolved": "\"calendar\" | \"compact\" | \"grid\" | \"grid-filled\" | \"list\" | \"map\" | \"table\"",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List layout: list, grid, grid-filled, or map - default is list"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'list'"
      },
      "layoutOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "LayoutOptions[]",
          "resolved": "LayoutOptions[]",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of layout options that the user can switch between\nThese options are rendered by the layout switcher in the header"
        },
        "defaultValue": "[ 'grid', 'list', 'table' ]"
      },
      "showThumbnail": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the thumbnail image on individual cards"
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "true"
      },
      "imageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IMAGE_TYPES",
          "resolved": "IMAGE_TYPES.icon | IMAGE_TYPES.thumbnail",
          "references": {
            "IMAGE_TYPES": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The type of image that individual cards will display.\nEither thumbnail or icon, defaults to thumbnail."
        },
        "attribute": "image-type",
        "reflect": false,
        "defaultValue": "IMAGE_TYPES.thumbnail"
      },
      "lazy": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates if the thumbnail on individual cards should lazy load"
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
      },
      "showSort": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the sort ui"
        },
        "attribute": "show-sort",
        "reflect": false,
        "defaultValue": "false"
      },
      "showSearch": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide search input"
        },
        "attribute": "show-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "matchRecent": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the search input should display term suggestions from recent searches.\nMust be used in conjunction with `showSearch`"
        },
        "attribute": "match-recent",
        "reflect": false,
        "defaultValue": "false"
      },
      "matchSearch": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the search input should display search results as the user types.\nMust be used in conjunction with `showSearch`"
        },
        "attribute": "match-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "showChips": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide facet chips. Must be used in conjuntion with `showFacets`"
        },
        "attribute": "show-chips",
        "reflect": false,
        "defaultValue": "false"
      },
      "showFacets": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide facets"
        },
        "attribute": "show-facets",
        "reflect": false,
        "defaultValue": "false"
      },
      "newTab": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the target url for individual cards should open up in a new tab"
        },
        "attribute": "new-tab",
        "reflect": false,
        "defaultValue": "false"
      },
      "selectionMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SelectionMode",
          "resolved": "\"multiple\" | \"none\" | \"single\"",
          "references": {
            "SelectionMode": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether individual cards are selectable via a checkbox"
        },
        "attribute": "selection-mode",
        "reflect": false,
        "defaultValue": "'none'"
      },
      "bulkActions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IBulkActions",
          "resolved": "IBulkActions",
          "references": {
            "IBulkActions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IBulkActions}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubGallery"
            }],
          "text": "Configuration for bulk actions\nwill cause the gallery to render bulk actions ui\nand raise events accordingly"
        },
        "defaultValue": "{ position: 'bottom', actions: [] }"
      },
      "showMoreResultsBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether to show \"More Results\" button on bottom of the gallery"
        },
        "attribute": "show-more-results-btn",
        "reflect": false,
        "defaultValue": "false"
      },
      "showResultsCount": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether to show results count on the top and bottom of the gallery"
        },
        "attribute": "show-results-count",
        "reflect": false,
        "defaultValue": "false"
      },
      "showBackToTopBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether to show the Back to Top button at the bottom of the gallery"
        },
        "attribute": "show-back-to-top-btn",
        "reflect": false,
        "defaultValue": "false"
      },
      "query": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IQuery",
          "resolved": "IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Query that defines the Gallery scope"
        }
      },
      "facets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<WellKnownFacetTypes | IFacet>",
          "resolved": "(\"access\" | \"categories\" | \"tags\" | \"location\" | \"type\" | \"source\" | \"modified\" | IFacet | \"license\" | \"group-role\" | \"group-type\" | \"group-access\" | \"event-from\" | \"event-access\" | \"event-date\")[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "WellKnownFacetTypes": {
              "location": "import",
              "path": "./utils/facets"
            },
            "IFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Facets to display in the gallery. Will not be shown unless the `showFacets` flag is enabled"
        },
        "defaultValue": "[]"
      },
      "galleryType": {
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
          "text": "[Syntactic Sugar Property, ONLY used to create a base IQuery if `this.query` is not passed in\nDO NOT use this prop for other purposes, use `this.query.targetEntity` instead]\nDefines the target entity of the gallery"
        },
        "attribute": "gallery-type",
        "reflect": false
      },
      "cardTitleTag": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines what tag (i.e <h3>, <h4>) should wrap the titles on each card. Used for accessibility compliance."
        },
        "attribute": "card-title-tag",
        "reflect": false
      },
      "include": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specify the include parameter sent in the request.\nsent as | delimited strings\ne.g. `\"server.layers.length as layerCount | group.memberCount as members\"`"
        },
        "attribute": "include",
        "reflect": false,
        "defaultValue": "''"
      },
      "state": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ISerializedGalleryState",
          "resolved": "{ term?: string; sort?: string; layout?: LayoutOptions; isInitialization?: boolean; } & { [key: string]: string; }",
          "references": {
            "ISerializedGalleryState": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Serialized Gallery State\nWhen passed into the component, it is applied to the\ngallery before it is passed to child components.\nThis is used to restore a previous state, i.e. when a\nuser returns to a bookmarked page"
        },
        "defaultValue": "{}"
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines how the corners of each card are styled."
        },
        "attribute": "corners",
        "reflect": false,
        "defaultValue": "CORNERS.square"
      },
      "showAdditionalInfo": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether individual cards should display additional info (metadata) about their view models"
        },
        "attribute": "show-additional-info",
        "reflect": false,
        "defaultValue": "true"
      },
      "showEmptyState": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the gallery should show special empty state when the current search has returned no results"
        },
        "attribute": "show-empty-state",
        "reflect": false,
        "defaultValue": "true"
      },
      "disableTelemetry": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether telemetry events in the gallery should be disabled"
        },
        "attribute": "disable-telemetry",
        "reflect": false,
        "defaultValue": "false"
      },
      "shadow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DROP_SHADOWS",
          "resolved": "DROP_SHADOWS.heavy | DROP_SHADOWS.low | DROP_SHADOWS.medium | DROP_SHADOWS.none",
          "references": {
            "DROP_SHADOWS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines how heavy of a drop shadow should be applied to the individual cards"
        },
        "attribute": "shadow",
        "reflect": false
      },
      "showLinkButton": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the individual cards should add a link button (as opposed to relying on\nthe link in the card's title). Must be used in conjunction with `linkButtonText`."
        },
        "attribute": "show-link-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "linkButtonText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The text to display on each card's link button. Must be used in conjunction with `showlinkButton`."
        },
        "attribute": "link-button-text",
        "reflect": false
      },
      "linkButtonStyle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Appearance",
          "resolved": "\"outline\" | \"outline-fill\" | \"solid\" | \"transparent\"",
          "references": {
            "Appearance": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`."
        },
        "attribute": "link-button-style",
        "reflect": false
      },
      "mobileView": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the gallery is being rendered on a mobile device. When set to true, facets will move\nfrom the side of the gallery into a toggleable modal (controlled via `showFacetModal`)"
        },
        "attribute": "mobile-view",
        "reflect": false,
        "defaultValue": "false"
      },
      "showAddContent": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the add content button"
        },
        "attribute": "show-add-content",
        "reflect": false,
        "defaultValue": "false"
      },
      "addContentProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pass in props that will be applied to the -add-content component"
        },
        "defaultValue": "{}"
      },
      "showFacetModal": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Controls the visibility of the facets modal. Must be used in conjunction with `mobileView`.\nUsed to show the facets modal from outside when the gallery is in mobile view.\nThis should not really be needed as we show a button on the gallery when there are facets and mobileView is true"
        },
        "attribute": "show-facet-modal",
        "reflect": false,
        "defaultValue": "false"
      },
      "showBadges": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide available badges on each card. Badges are defined in the view model of each card."
        },
        "attribute": "show-badges",
        "reflect": false,
        "defaultValue": "true"
      },
      "showType": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the view model's family name and icon on each card"
        },
        "attribute": "show-type",
        "reflect": false,
        "defaultValue": "true"
      },
      "showOwner": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the view model's source information on each card"
        },
        "attribute": "show-owner",
        "reflect": false,
        "defaultValue": "true"
      },
      "showLayoutSwitcher": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the layout switcher UI.\nIs not respected when mobile-view is true."
        },
        "attribute": "show-layout-switcher",
        "reflect": false,
        "defaultValue": "false"
      },
      "mapSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubMapSettings",
          "resolved": "IHubMapSettings",
          "references": {
            "IHubMapSettings": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "IHubMapSettings object that defines the map's initial state.  Currently this is used to set\nthe underlying web map or web scene by itemId.  In the future this will hold additional settings\nthat are passed into the map component.\nExample: { itemId: '1234567890' }"
        }
      },
      "galleryMapSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGalleryMapSettings",
          "resolved": "IGalleryMapSettings",
          "references": {
            "IGalleryMapSettings": {
              "location": "import",
              "path": "./utils/location"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IGalleryMapSettings}"
            }],
          "text": "Map configuration settings specific to the gallery experience\n- extent\n  - 'default' - Uses site extent, or org extent if not available.  If neither are available, uses extent of initial results.\n  - 'results' - Uses extent of initial results.  Changes to query do not update extent.\n  - 'continuous' - Uses extent of initial results.  Changes to query update extent.\nTODO - We will likely want to conflate this into the mapSettings prop, so this component\nwould only have one mapSettings prop to manage."
        },
        "defaultValue": "DEFAULT_MAP_SETTINGS"
      },
      "expand": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Expand extent by given factor\nhttps://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html#expand"
        },
        "attribute": "expand",
        "reflect": false
      },
      "showResults": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show/hide the list of results. This is primarily useful when the\nlayout is set to 'map' and the user wants to hide the list of results\nwhich are already displayed on the map."
        },
        "attribute": "show-results",
        "reflect": true,
        "defaultValue": "true"
      },
      "disableMapMouseWheelZoom": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether to disable mouse wheel scroll zooming on the map"
        },
        "attribute": "disable-map-mouse-wheel-zoom",
        "reflect": false,
        "defaultValue": "false"
      },
      "additionalFacet": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An additional facet that can be passed in and prepend the facet list."
        },
        "attribute": "additional-facet",
        "reflect": false
      },
      "gallerySelection": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IGallerySelection",
          "resolved": "{ item?: string[]; event?: string[]; group?: string[]; user?: string[]; portalUser?: string[]; communityUser?: string[]; groupMember?: string[]; channel?: string[]; discussionPost?: string[]; eventAttendee?: string[]; }",
          "references": {
            "IGallerySelection": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Existing selection as an IGallerySelection object\nThis is the selection that the consuming app passes in\nif selectable, cards in gallerySelection will display as selected\nif showSelection is set to false, those cards will be excluded from the search query,\nso they won't appear in the results list"
        }
      },
      "showSelection": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether to show the pre-selected cards"
        },
        "attribute": "show-selection",
        "reflect": false,
        "defaultValue": "false"
      },
      "cardActionLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICardActionLink[]",
          "resolved": "ICardActionLink[]",
          "references": {
            "ICardActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Allow action links to be passed in"
        },
        "defaultValue": "[]"
      },
      "callback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CardViewModelCallback",
          "resolved": "(model: IHubCardViewModel, layout: CardLayout, context: IArcGISContext, result: HubEntity | IHubSearchResult) => IHubCardViewModel",
          "references": {
            "CardViewModelCallback": {
              "location": "import",
              "path": "../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Passing a callback function into the gallery allows the developer to apply custom\nbusiness logic to the processing of the Card View model. This is useful in scenarios\nwhere we want to show non-standard metadata, badges, actions and to apply logic to\nthe selectability of the card."
        }
      },
      "sortOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SortOption[]",
          "resolved": "SortOption[]",
          "references": {
            "SortOption": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A list of sort options for the sort field"
        }
      },
      "primaryActionsToRender": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 2 | 3",
          "resolved": "1 | 2 | 3",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The number of actions to render as primary actions"
        },
        "attribute": "primary-actions-to-render",
        "reflect": false,
        "defaultValue": "1"
      },
      "tableColumns": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(IGalleryTableColumn | GalleryTableColumnName)[]",
          "resolved": "(IGalleryTableColumn | GalleryTableColumnName)[]",
          "references": {
            "IGalleryTableColumn": {
              "location": "import",
              "path": "./utils/get-table-columns"
            },
            "GalleryTableColumnName": {
              "location": "import",
              "path": "./utils/get-table-columns"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The columns to render when the layout is 'table'\nIf not provided, the default columns for the entity type will be used\nsee ../layouts.md for more info"
        }
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "_shouldShowFacetModal": {},
      "_gallerySelection": {},
      "isInitialized": {},
      "isSearching": {},
      "actions": {},
      "searchResults": {},
      "error": {},
      "_facets": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires for recording telemetry"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisHubGallerySelect",
        "name": "arcgisHubGallerySelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when results are selected/deselected.\nPayload is the selected IHubSearchResult objects"
        },
        "complexType": {
          "original": "IGallerySelection",
          "resolved": "{ item?: string[]; event?: string[]; group?: string[]; user?: string[]; portalUser?: string[]; communityUser?: string[]; groupMember?: string[]; channel?: string[]; discussionPost?: string[]; eventAttendee?: string[]; }",
          "references": {
            "IGallerySelection": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }, {
        "method": "arcgisHubGalleryQueryChange",
        "name": "arcgisHubGalleryQueryChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when the the Query changes"
        },
        "complexType": {
          "original": "IQuery",
          "resolved": "IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubGalleryStateChange",
        "name": "arcgisHubGalleryStateChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when the filter changes and carries a payload that is the\nstate of the component. Host components or applications can use this state\nto re-hydrate the Gallery"
        },
        "complexType": {
          "original": "ISerializedGalleryState",
          "resolved": "{ term?: string; sort?: string; layout?: LayoutOptions; isInitialization?: boolean; } & { [key: string]: string; }",
          "references": {
            "ISerializedGalleryState": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }, {
        "method": "arcgisHubGalleryResultsChange",
        "name": "arcgisHubGalleryResultsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that's fired when the search results change\nThis allows other components to be kept in sync with the search\n(i.e. a Map showing the result bounds)"
        },
        "complexType": {
          "original": "IHubSearchResult[]",
          "resolved": "IHubSearchResult[]",
          "references": {
            "IHubSearchResult": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubGalleryAction",
        "name": "arcgisHubGalleryAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ action: string, model: IHubCardViewModel }",
          "resolved": "{ action: string; model: IHubCardViewModel; }",
          "references": {
            "IHubCardViewModel": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubContentGalleryFacetModalClose",
        "name": "arcgisHubContentGalleryFacetModalClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when the facet modal is closed by a user"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubGalleryBulkAction",
        "name": "arcgisHubGalleryBulkAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when a user clicks a bulk action button"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisHubGalleryExecutedQuerySize",
        "name": "arcgisHubGalleryExecutedQuerySize",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when a query is executed and emits the length of the query string"
        },
        "complexType": {
          "original": "Kilobyte",
          "resolved": "number",
          "references": {
            "Kilobyte": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "refresh": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Re-fetches the search results up to the current \"page\"\nFor use in cases where the consumer knows the results have changed",
          "tags": [{
              "name": "return",
              "text": "{Promise<void>}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubGallery"
            }]
        }
      },
      "clearSelection": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_context",
        "methodName": "handleContextChange"
      }, {
        "propName": "query",
        "methodName": "fetchFacetsAndSearch"
      }, {
        "propName": "facets",
        "methodName": "fetchFacetsAndSearch"
      }, {
        "propName": "term",
        "methodName": "prepareAndExecuteSearch"
      }, {
        "propName": "limit",
        "methodName": "prepareAndExecuteSearch"
      }, {
        "propName": "state",
        "methodName": "onStateChanged"
      }, {
        "propName": "gallerySelection",
        "methodName": "onGallerySelectionChanged"
      }, {
        "propName": "showFacetModal",
        "methodName": "handleFacetModalChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubLayoutButtonSelect",
        "method": "handleLayoutSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubCardTitleLinkClick",
        "method": "sendCardTitleClickTelemetry",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubFacetMoreLessClicked",
        "method": "sendMoreLessClickTelemetry",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubCardSelect",
        "method": "cardSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubGalleryFacetChange",
        "method": "onFacetChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubCardAction",
        "method": "actionHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubAddContentWorkflowComplete",
        "method": "handleEntityCreated",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Debounce({ timeout: 100 })
], ArcgisHubGallery.prototype, "prepareAndExecuteSearch", null);
__decorate([
  Memoize('bulkActions')
], ArcgisHubGallery.prototype, "_bulkActions", null);
