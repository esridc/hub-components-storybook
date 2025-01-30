import { r as registerInstance, c as createEvent, h, H as Host, a as getElement, F as Fragment } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { m as minPromiseDelayFactory } from './min-promise-delay-d6a589f6.js';
import { f as fetchEnvironmentDetails, a as fetchEntityDetails } from './fetch-entity-details-b1fdb71f.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { P as PostSort, d as SortOrder, h as PostStatus, f as PostRelation } from './utils-6bf1b713.js';
import { s as searchPosts } from './discussions-a173baa3.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './domain-exists-4fd7dc09.js';
import './get-prop-ec5be510.js';
import './teams-38e72623.js';
import './cache-4bea61e0.js';
import './get-850c466d.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './index-55cb25f7.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-with-default-b819d95d.js';
import './get-f0caeb52.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './request-3e386aeb.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './tslib.es6-0e03e357.js';
import './discussions-api-request-199cae2d.js';
import './update-6a7d5697.js';
import './update-26e2fbc1.js';

const arcgisHubDiscussionsOptionsCss = ":host{display:block}";

const ArcgisHubDiscussionsOptions = class {
  /**
   * Constructor function, pre-binds context
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsOptionsChange = createEvent(this, "arcgisHubDiscussionsOptionsChange", 7);
    this.disabled = false;
    this.variant = undefined;
    this.layout = 'horizontal';
    this.value = undefined;
    bind(this, 'handleTileChange');
  }
  /**
   * Component will load lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Handles changes to the calcite title selects
   * @param evt
   */
  handleTileChange(evt) {
    evt.stopPropagation();
    const target = evt.target;
    this.value = target.value;
    this.arcgisHubDiscussionsOptionsChange.emit(target.value);
  }
  /**
   * Discussability settings form config
   */
  get options() {
    return [
      {
        value: true,
        icon: 'speech-bubbles',
      },
      {
        value: false,
        icon: 'circle-disallowed',
      }
    ];
  }
  /**
   * Primary render method
   */
  render() {
    const { intl, options, variant, value, disabled, layout } = this;
    return (h(Host, { "data-element": "discussions-options" }, h("calcite-label", { scale: "l" }, intl.t(`${variant}.label`), h("calcite-tile-select-group", { layout: layout }, options.map(option => (h("calcite-tile-select", { checked: option.value === value, description: intl.t(`${variant}.${option.value}.description`), disabled: disabled, heading: intl.t(`${option.value}.heading`), icon: option.icon, "input-enabled": true, key: option.icon, name: "discussable", onCalciteTileSelectChange: this.handleTileChange, type: "radio", value: option.value, width: layout === 'vertical' ? 'full' : 'auto' })))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubDiscussionsOptions.style = arcgisHubDiscussionsOptionsCss;

const arcgisHubDiscussionsPostListCss = ".sc-arcgis-hub-discussions-post-list-h{display:block}arcgis-load-more-button.sc-arcgis-hub-discussions-post-list{margin-top:0.75rem;margin-right:1rem;margin-bottom:1.5rem;margin-left:1rem}calcite-input[type=\"search\"].sc-arcgis-hub-discussions-post-list{margin-bottom:1rem}calcite-dropdown.sc-arcgis-hub-discussions-post-list{position:relative}.post-results-info-and-controls.sc-arcgis-hub-discussions-post-list{display:flex;align-items:center;gap:0.25rem}.post-count.sc-arcgis-hub-discussions-post-list{flex-grow:1}arcgis-hub-discussions-thread.sc-arcgis-hub-discussions-post-list:first-of-type{padding-top:1rem}arcgis-hub-discussions-thread.sc-arcgis-hub-discussions-post-list:last-of-type{padding-bottom:1rem}arcgis-hub-discussions-post.loading.sc-arcgis-hub-discussions-post-list,arcgis-hub-discussions-post.loading.sc-arcgis-hub-discussions-post-list:not([parent-id]){margin:0px;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:1rem;padding-right:1rem}.location-list.sc-arcgis-hub-discussions-post-list-h arcgis-hub-discussions-post.loading.sc-arcgis-hub-discussions-post-list{padding-left:1rem;padding-right:1rem}.replies-only.sc-arcgis-hub-discussions-post-list arcgis-hub-discussions-post.loading.sc-arcgis-hub-discussions-post-list{padding-left:0px;padding-right:0px}arcgis-hub-discussions-post.sc-arcgis-hub-discussions-post-list:not([parent-id]){padding-top:0.75rem;padding-bottom:0.75rem}.sc-arcgis-hub-discussions-post-list-h:not(.has-error).sc-arcgis-hub-discussions-post-list-s>[slot=\"error\"]{display:none}[total=\"0\"].sc-arcgis-hub-discussions-post-list-h calcite-list.sc-arcgis-hub-discussions-post-list{display:none}.sc-arcgis-hub-discussions-post-list-h:not([total=\"0\"]).sc-arcgis-hub-discussions-post-list-s>[slot=\"empty\"]{display:none}";

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
var PostListView;
(function (PostListView) {
  PostListView["List"] = "list";
  PostListView["Loading"] = "isLoading";
})(PostListView || (PostListView = {}));
const ArcgisHubDiscussionsPostList = class {
  /**
   * Constructor function, pre-binds context to necessary methods
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostListUpdated = createEvent(this, "arcgisHubDiscussionsPostListUpdated", 7);
    this.arcgisHubDiscussionsPostListReady = createEvent(this, "arcgisHubDiscussionsPostListReady", 7);
    this.arcgisHubDiscussionsPostListLayoutChanged = createEvent(this, "arcgisHubDiscussionsPostListLayoutChanged", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    /**
     * Whether the list open impression was logged
     */
    this.impressionLogged = false;
    this.discussion = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entity = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.hasMap = undefined;
    this.isHub = undefined;
    this.unsavedFeatures = undefined;
    this.unsavedRelatedFeatures = undefined;
    this.unsavedExistingFeatures = [];
    this.nextStart = -1;
    this.start = 1;
    this.total = 0;
    this.items = undefined;
    this.sortBy = PostSort.UPDATED_AT;
    this.sortOrder = SortOrder.DESC;
    this.titleText = undefined;
    this.bodyText = undefined;
    this.geometry = undefined;
    this.featureGeometry = undefined;
    this.parentIds = undefined;
    this.creator = undefined;
    this.editor = undefined;
    this.status = [
      PostStatus.APPROVED,
      PostStatus.HIDDEN,
      PostStatus.PENDING,
      PostStatus.REJECTED,
      PostStatus.BLOCKED
    ];
    this.groupIds = undefined;
    this.channelIds = undefined;
    this.createdBefore = undefined;
    this.createdAfter = undefined;
    this.updatedBefore = undefined;
    this.updatedAfter = undefined;
    this.access = undefined;
    this.num = 10;
    this.isMobile = undefined;
    this.locationId = undefined;
    this.layout = 'list';
    this.showLayoutActions = undefined;
    this.showSearchActions = undefined;
    this.showCounts = undefined;
    this.showSortActions = undefined;
    this.renderPost = undefined;
    this.showLocations = undefined;
    this.disableSelectExistingLocation = undefined;
    this.locationDescriptionText = undefined;
    this.showChannelAvatar = undefined;
    this.showChannelName = undefined;
    this._context = getGlobalContext();
    this.pending = false;
    this.error = undefined;
    this.loadedPostIds = [];
    this.ready = false;
    this.mostRecentPagePostIds = [];
    this._loading = true;
    this.intl = undefined;
    bind(this, 'renderListAndActions', 'renderLoading', 'handleSortBySelect', 'handleSortOrderSelected', 'handleSearchInputChanged', '_renderPost');
  }
  /**
   * Component will load lifecycle hook
   */
  async componentWillLoad() {
    this.initialize();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations and dependencies
   */
  async initialize() {
    this.loadTranslations();
    if (this._context) {
      await this.loadDependencies();
      if (this.items) {
        this.mostRecentPagePostIds = this.items.map(({ id }) => id);
        this.emitPostListOpenEvent(true);
        this.loadedPostIds = [];
      }
      else {
        this.searchPosts(1);
      }
    }
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads dependencies
   */
  loadDependencies() {
    if (this._context) {
      this._loading = true;
      return this.fetchDependencies().then(dependencies => {
        Object.assign(this, dependencies);
        this._loading = false;
      });
    }
  }
  /**
   * Wraps the _fetchDependencies method with a minimum delay so
   * skeleton state can be observed
   */
  fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Fetches dependencies
   */
  async _fetchDependencies() {
    const { isHub, _context, discussion, entityId, entityType, entity, locationId, displayFieldKey, displayFieldValid, displayFieldValue } = this;
    const environmentDetails = await fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions);
    const entityDetails = await fetchEntityDetails({ discussion, entityId, entityType, entity, locationId, displayFieldKey, displayFieldValid, displayFieldValue }, _context.hubRequestOptions);
    return Object.assign(Object.assign({}, environmentDetails), entityDetails);
  }
  /**
   * Reloads dependencies when context changes
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      return this.loadDependencies().then(() => {
        if (!this.items) {
          this.searchPosts(1);
        }
        else {
          this.emitPostListOpenEvent(true);
        }
      });
    }
  }
  /**
   * Watches for changes to ready and emits arcgisHubDiscussionsPostListReady when ready is true
   */
  handleReadyChanged(ready) {
    if (ready) {
      this.arcgisHubDiscussionsPostListReady.emit();
    }
  }
  /**
   * Watches for changes to loadedPostIds and updates ready once all elements ready events have fired
   */
  handleLoadedPostIdsChanged(loadedPostIds) {
    if (!this.ready) {
      this.ready = Boolean(loadedPostIds) && Boolean(this.items) && this.items.every(({ id }) => loadedPostIds.includes(id));
    }
  }
  /**
   * Emits the post list open event
   */
  emitPostListOpenEvent(success) {
    if (!this.impressionLogged) {
      this.impressionLogged = true;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.open.label.postList), { response: success ? dist.constants.response.SUCCESS : dist.constants.response.FAILURE }));
    }
  }
  /**
   * Handles arcgisHubDiscussionsPostReady events, adds the post's id to loadedPostIds
   * so skeleton state can be determined on a page-by-page basis
   * @param evt arcgisHubDiscussionsPostReady event
   */
  handlePostReady(evt) {
    this.loadedPostIds = [...this.loadedPostIds, evt.target.postId];
  }
  /**
   * Handles arcgisLayoutListLayoutSelected events and reemits own event arcgisHubDiscussionsPostListLayoutChanged
   * @param evt arcgisLayoutListLayoutSelected event
   */
  handleLayoutSelected(evt) {
    evt.stopPropagation();
    this.arcgisHubDiscussionsPostListLayoutChanged.emit(evt.detail);
    const view = { grid: "gridView", list: "listView", map: "mapView" }[evt.detail];
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.select.label.discussionBoardView.details[view]);
  }
  /**
   * Computes an array of sort menu config objects used to render the sort dropdown items
   */
  get sortByMenuConfigs() {
    return [
      {
        label: 'sortRecent',
        value: PostSort.UPDATED_AT,
      },
      {
        label: 'sortCreator',
        value: PostSort.CREATOR,
      },
    ];
  }
  /**
   * The config from `sortByMenuConfigs` for the currently actived sort parameter
   */
  get activeSortConfig() {
    return this.sortByMenuConfigs.find(({ value }) => value === this.sortBy);
  }
  /**
   * True when the user's locale is rtl. Used to flip some margins that cause alignment issues
   * in rtl languages.
   */
  get isRtl() {
    var _a;
    return ((_a = this.intl) === null || _a === void 0 ? void 0 : _a.direction) === 'rtl' || false;
  }
  /**
   * Computes the view config
   */
  get views() {
    const { renderListAndActions, renderLoading } = this;
    return {
      [PostListView.List]: {
        render: renderListAndActions,
      },
      [PostListView.Loading]: {
        render: renderLoading,
      },
    };
  }
  /**
   * Computes true when intl, _context, or items are not truthy
   */
  get isLoading() {
    const { intl, _context, _loading } = this;
    return !intl || !_context || _loading;
  }
  /**
   * Computes the active view and returns it's markup
   */
  get view() {
    const { views, isLoading } = this;
    const view = isLoading ? PostListView.Loading : PostListView.List;
    return views[view];
  }
  /**
   * Handles arcgisHubDiscussionsPostDelete events, updates local state and emits
   * arcgisHubDiscussionsPostListUpdated if results changed
   * @param evt arcgisHubDiscussionsPostDelete event
   */
  handlePostDeleted(evt) {
    const index = this.items.findIndex(({ id }) => evt.detail.id === id);
    if (index > -1) {
      this.items = this.items.filter(({ id }) => evt.detail.id !== id);
      this.total -= 1;
      if (this.nextStart > -1) {
        this.nextStart -= 1;
      }
      this.arcgisHubDiscussionsPostListUpdated.emit();
    }
  }
  /**
   * Handles arcgisHubDiscussionsPostCreate events, reconciles if the post should be added
   * to this post list instance, updates state and emits arcgisHubDiscussionsPostListUpdated accordingly
   * @param evt arcgisHubDiscussionsPostCreate event
   */
  handlePostCreated(evt) {
    const discussionsMatch = evt.detail.discussion.includes(this.discussion);
    let parentsMatch = true;
    if (this.parentIds) {
      parentsMatch = this.parentIds.length ? this.parentIds.includes(evt.detail.parentId) : !evt.detail.parentId;
    }
    if (discussionsMatch && parentsMatch) {
      if (this.sortOrder === SortOrder.DESC) {
        if (!this.items.find(({ id }) => evt.detail.id === id)) {
          this.items = [evt.detail, ...this.items];
          this.total += 1;
          if (this.nextStart > -1) {
            this.nextStart += 1;
          }
          this.arcgisHubDiscussionsPostListUpdated.emit();
        }
      }
      else {
        this.total += 1;
        this.arcgisHubDiscussionsPostListUpdated.emit();
      }
    }
  }
  /**
   * Handles arcgisHubDiscussionsPostEdit events, updates local state and emits
   * arcgisHubDiscussionsPostListUpdated if results changed
   * @param evt arcgisHubDiscussionsPostEdit event
   */
  handlePostEdited(evt) {
    const index = this.items.findIndex(({ id }) => evt.detail.id === id);
    if (index > -1) {
      this.items = this.items.map(item => (item.id === evt.detail.id ? evt.detail : item));
      this.arcgisHubDiscussionsPostListUpdated.emit();
    }
  }
  /**
   * Handles arcgisLoadMoreChange events and initiatives fetching of the next page of search results
   * @param evt arcgisLoadMoreChange event
   */
  handleLoadMoreChange(evt) {
    evt.stopPropagation();
    this.searchPosts(this.nextStart);
  }
  /**
   * Method to obtain an ArcgisHubDiscussionsPostElement reference for a given postId string
   * @param postId A UUID string representing the id of a post
   * @returns ArcgisHubDiscussionsPostElement
   */
  async getPostRefByPostId(postId) {
    return Array.prototype.find.call(this.layoutListRef.childNodes, (post) => post.postId === postId) || null;
  }
  /**
   * Handles changes to sortBy property, performs a fresh search
   */
  handleSortByChanged() {
    this.searchPosts(1);
  }
  /**
   * Sets sortBy property to the data-value attribute value when a user clicks
   * a sortBy action
   */
  handleSortBySelect(evt) {
    const { selectedItems: [{ dataset: { value }, },], } = evt.target;
    this.sortBy = value;
  }
  /**
   * Computes a ISearchPosts object used to search for posts
   */
  get searchParams() {
    const { sortBy, sortOrder, access, status, channelIds, groupIds, titleText, bodyText, discussion, geometry, creator, editor, featureGeometry, parentIds, createdBefore, createdAfter, updatedBefore, updatedAfter, num, } = this;
    const toDate = val => (val === undefined ? val : new Date(val));
    const params = {
      title: titleText && `%${titleText}%`,
      body: bodyText && `%${bodyText}%`,
      discussion: discussion && !discussion.endsWith('%') ? `${discussion}%` : discussion,
      geometry,
      featureGeometry,
      parents: parentIds,
      status,
      creator,
      editor,
      sortBy,
      sortOrder,
      access,
      channels: channelIds,
      groups: groupIds,
      createdBefore: toDate(createdBefore),
      createdAfter: toDate(createdAfter),
      updatedBefore: toDate(updatedBefore),
      updatedAfter: toDate(updatedAfter),
      num,
      // TODO: postType is supported by the API but not defined on the Hub.js ISearchPosts interface...
    };
    return Object.entries(params).reduce((acc, [key, val]) => (Boolean(val) ? Object.assign(Object.assign({}, acc), { [key]: val }) : acc), {});
  }
  /**
   * Searches for a page of post results and updates state
   * @param start The `start` value for the search
   */
  searchPosts(start) {
    const { _context, searchParams, arcgisHubDiscussionsPostListUpdated, items: existingItems, loadedPostIds: existingLoadedPostIds } = this;
    Object.assign(this, {
      pending: true,
      error: null,
    });
    if (start === 1) {
      Object.assign(this, {
        items: [],
        total: 0,
        nextStart: -1,
      });
    }
    return searchPosts(Object.assign({ data: Object.assign({ start, relations: [PostRelation.REPLIES, PostRelation.REACTIONS] }, searchParams) }, _context.hubRequestOptions))
      .then(({ items: newItems, nextStart, total }) => {
      let items;
      let loadedPostIds;
      if (start === 1) {
        items = newItems;
        loadedPostIds = [];
      }
      else {
        loadedPostIds = existingLoadedPostIds;
        items = [...existingItems, ...newItems];
      }
      Object.assign(this, {
        items,
        nextStart,
        total,
        loadedPostIds,
        mostRecentPagePostIds: newItems.map(({ id }) => id),
      });
      this.emitPostListOpenEvent(true);
      arcgisHubDiscussionsPostListUpdated.emit();
    })
      .catch(e => {
      this.error = e;
      this.emitPostListOpenEvent(false);
    })
      .finally(() => {
      this.pending = false;
    });
  }
  /**
   * Renders the `1 - N of X` count text
   */
  renderCount() {
    if (this.showCounts) {
      const { items, total, intl } = this;
      const start = items.length ? 1 : 0;
      const end = items.length ? items.length : 0;
      return h("div", { class: "post-count" }, intl.t('searchCount', { start, end, total }));
    }
  }
  /**
   * Renders the sort by dropdown menu
   */
  renderSortByDropdown() {
    if (this.showSortActions) {
      const { intl, sortBy, sortByMenuConfigs, activeSortConfig, pending, handleSortBySelect, total } = this;
      return (h("calcite-dropdown", { disabled: pending || !total, onCalciteDropdownSelect: handleSortBySelect }, h("calcite-button", { appearance: "transparent", iconEnd: "caret-down", slot: "trigger" }, intl.t(activeSortConfig.label)), h("calcite-dropdown-group", null, sortByMenuConfigs.map(({ label, value }) => (h("calcite-dropdown-item", { "data-value": value, key: value, selected: value === sortBy }, intl.t(label)))))));
    }
  }
  /**
   * Toggles the `sortOrder` when the user clicks the sort direction action
   */
  handleSortOrderSelected() {
    this.sortOrder = this.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
  }
  /**
   * Handles users changing search input text
   */
  handleSearchInputChanged(evt) {
    this.bodyText = evt.target.value;
  }
  /**
   * Handles changes to `sortOrder`, initiates a new search
   */
  handleSortOrderChanged() {
    this.searchPosts(1);
  }
  /**
   * Handles changes to `bodyText`, initiates a new search
   */
  handleBodyChanged() {
    this.searchPosts(1);
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.search.label.searchPosts.details.mapView);
  }
  /**
   * Renders the sort direction action
   */
  renderSortDirectionAction() {
    if (this.showSortActions) {
      const { sortOrder, intl, handleSortOrderSelected, pending, total } = this;
      let icon;
      let text;
      if (sortOrder === SortOrder.DESC) {
        icon = 'sort-descending-arrow';
        text = 'orderDesc';
      }
      else {
        text = 'orderAsc';
        icon = 'sort-ascending-arrow';
      }
      return (h("calcite-action", { class: "sort-direction-action", disabled: pending || !total, icon: icon, iconFlipRtl: this.isRtl, onClick: handleSortOrderSelected, scale: "s", text: intl.t(text) }));
    }
  }
  /**
   * Renders the search control
   */
  renderSearch() {
    if (this.showSearchActions) {
      const { intl, pending, handleSearchInputChanged, isRtl, total, bodyText } = this;
      return (h("calcite-input", { disabled: pending || (!bodyText && !total), icon: true, iconFlipRtl: isRtl, onCalciteInputChange: handleSearchInputChanged, placeholder: intl.t('searchIdeas'), type: "search", value: bodyText }));
    }
  }
  /**
   * Renders the list of posts
   */
  renderList() {
    const { items, layout, parentIds, pending, isMobile } = this;
    return (h("arcgis-layout-list", { class: { 'replies-only': Boolean(parentIds === null || parentIds === void 0 ? void 0 : parentIds.length) }, disabled: pending, layout: layout, ref: layoutListRef => {
        this.layoutListRef = layoutListRef;
      }, showMapControl: !isMobile }, this.renderCountAndActions(), items.map(this._renderPost)));
  }
  /**
   * Calls and returns the result of `renderPost`, if provied, else renders a default implementation of a post component
   * as used by the private content discussions
   * @param post The post record
   * @param index The post record index
   * @param posts An Array of all post records
   */
  _renderPost(post, index, posts) {
    const { hasMap, isHub, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, entity, entityId, entityType, isMobile, locationDescriptionText, locationId, mostRecentPagePostIds, loadedPostIds, parentIds, showLocations, disableSelectExistingLocation } = this;
    const loading = mostRecentPagePostIds.includes(post.id)
      ? mostRecentPagePostIds.some(id => !loadedPostIds.includes(id))
      : !loadedPostIds.includes(post.id);
    return this.renderPost ? (this.renderPost(post, index, posts, loading)) : (h("arcgis-hub-discussions-post", { disableSelectExistingLocation: disableSelectExistingLocation, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, index: index, isHub: isHub, isMobile: isMobile, key: post.id, lastIndex: posts.length - 1, lead: Boolean(parentIds === null || parentIds === void 0 ? void 0 : parentIds.length), loading: loading, locationDescriptionText: locationDescriptionText, locationId: locationId, parentId: post.parentId, post: post, postId: post.id, preview: !post.parentId, role: "listitem", showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
  }
  /**
   * Renders the count, sort & layout actions
   */
  renderCountAndActions() {
    const { showLayoutActions, showCounts, showSortActions } = this;
    if (showLayoutActions || showCounts || showSortActions) {
      return (h("div", { class: "post-results-info-and-controls", slot: "actions" }, this.renderCount(), this.renderSortByDropdown(), this.renderSortDirectionAction()));
    }
  }
  /**
   * Renders the actions and list of posts
   */
  renderListAndActions() {
    const { nextStart, pending } = this;
    return (h(Fragment, null, h("slot", { name: "list-before" }), this.renderSearch(), this.renderList(), this.renderEmpty(), this.renderError(), h("arcgis-load-more-button", { appearance: "outline-fill", loading: pending, nextStart: nextStart })));
  }
  /**
   * Renders the skelton state
   * @returns
   */
  renderLoading() {
    // TODO: skeleton state?
    return null;
  }
  /**
   * Renders the slot[name="empty"]
   */
  renderEmpty() {
    return h("slot", { name: "empty" });
  }
  /**
   * Renders the slot[name="error"]
   */
  renderError() {
    return h("slot", { name: "error" });
  }
  /**
   * Primary render entrypoint
   */
  render() {
    const { view, error, items } = this;
    return (h(Host, { class: { 'has-error': Boolean(error), 'rtl': true }, "data-count": (items === null || items === void 0 ? void 0 : items.length) || 0, "data-element": "discussions-post-list" }, view.render()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"],
    "ready": ["handleReadyChanged"],
    "loadedPostIds": ["handleLoadedPostIdsChanged"],
    "sortBy": ["handleSortByChanged"],
    "sortOrder": ["handleSortOrderChanged"],
    "bodyText": ["handleBodyChanged"]
  }; }
};
__decorate([
  minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsPostList.prototype, "fetchDependencies", null);
ArcgisHubDiscussionsPostList.style = arcgisHubDiscussionsPostListCss;

export { ArcgisHubDiscussionsOptions as arcgis_hub_discussions_options, ArcgisHubDiscussionsPostList as arcgis_hub_discussions_post_list };
