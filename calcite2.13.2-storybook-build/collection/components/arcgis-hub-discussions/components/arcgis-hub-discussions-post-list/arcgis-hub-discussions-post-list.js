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
import { Host, h, Fragment } from '@stencil/core';
import { bind } from '../../../../utils/context';
import intlManager from '../../../../utils/intl-manager';
import { PostRelation, PostSort, PostStatus, SortOrder, searchPosts } from '@esri/hub-discussions';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import MinPromiseDelay from '../../../../decorators/min-promise-delay';
import { fetchEnvironmentDetails } from '../../../../utils/discussions/fetch-environment-details';
import { fetchEntityDetails } from '../../../../utils/discussions/fetch-entity-details';
import { connectContext, getGlobalContext } from '../../../../utils/state';
var PostListView;
(function (PostListView) {
  PostListView["List"] = "list";
  PostListView["Loading"] = "isLoading";
})(PostListView || (PostListView = {}));
/**
 * @slot list-before - A slot for adding custom content immediately before the list
 * @slot empty - A slot for adding custom empty state UI
 * @slot error - A slot for adding custom error state UI
 */
export class ArcgisHubDiscussionsPostList {
  /**
   * Constructor function, pre-binds context to necessary methods
   */
  constructor() {
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.postList), { response: success ? telemetryConstants.response.SUCCESS : telemetryConstants.response.FAILURE }));
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.select.label.discussionBoardView.details[view]);
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.search.label.searchPosts.details.mapView);
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
  static get is() { return "arcgis-hub-discussions-post-list"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "discussion": {
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
          "text": "A URI string representing the subject entity of the discussion, e.g. `hub://content/1fc` or `hub://group/2fc`.\nWhen `entity`, `entityId`, and `entityType` are not provided, they will be fetched by parsing the URI."
        },
        "attribute": "discussion",
        "reflect": true
      },
      "entityId": {
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
          "text": "An optional UUID string of an IHubContent or IGroup representing the subject entity of the discussion.\nIf `entityId` and `entityType` are provided but `entity` is not, the entity will be fetched."
        },
        "attribute": "entity-id",
        "reflect": true
      },
      "entityType": {
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
          "text": "An optional string representing the type (`content` or `group`) of subject entity of the discussion.\nIf `entityType` and `entityId` are provided but `entity` is not, the entity will be fetched."
        },
        "attribute": "entity-type",
        "reflect": true
      },
      "entity": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IHubContent | IGroup",
          "resolved": "IGroup | IHubContent",
          "references": {
            "IHubContent": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to the IHubContent or IGroup representing the subject entity of the discussion.\nIf `entity` is not provided, it will be fetched using the given `entityId` & `entityType` or the given\n`discussion`."
        }
      },
      "displayFieldValid": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional boolean indicating if the display field key configured by the layer is valid when entity is IHubContent"
        },
        "attribute": "display-field-valid",
        "reflect": false
      },
      "displayFieldValue": {
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
          "text": "An optional display field value as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-value",
        "reflect": false
      },
      "displayFieldKey": {
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
          "text": "An optional display field key as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-key",
        "reflect": false
      },
      "hasMap": {
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
          "text": "If a map is present on the page"
        },
        "attribute": "has-map",
        "reflect": false
      },
      "isHub": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If this component is embedded in a Hub site"
        },
        "attribute": "is-hub",
        "reflect": false
      },
      "unsavedFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Feature[]",
          "resolved": "Feature<Geometry, { [name: string]: any; }>[]",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A Feature selected from a map"
        }
      },
      "unsavedRelatedFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPostRelatedFeatureDetails[]",
          "resolved": "IPostRelatedFeatureDetails[]",
          "references": {
            "IPostRelatedFeatureDetails": {
              "location": "import",
              "path": "../../utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A related Feature from a map"
        }
      },
      "unsavedExistingFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Feature[]",
          "resolved": "Feature<Geometry, { [name: string]: any; }>[]",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Feature geometry edits for existing post locations"
        },
        "defaultValue": "[]"
      },
      "nextStart": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The next `start` value when fetching subsequent pages of results"
        },
        "attribute": "next-start",
        "reflect": true,
        "defaultValue": "-1"
      },
      "start": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The `start` value when fetching the original page of results"
        },
        "attribute": "start",
        "reflect": true,
        "defaultValue": "1"
      },
      "total": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The `total` number of results"
        },
        "attribute": "total",
        "reflect": true,
        "defaultValue": "0"
      },
      "items": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPost[]",
          "resolved": "IPost[]",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An Array of IPost results"
        }
      },
      "sortBy": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "PostSort",
          "resolved": "PostSort.BODY | PostSort.CHANNEL_ID | PostSort.CREATED_AT | PostSort.CREATOR | PostSort.DISCUSSION | PostSort.EDITOR | PostSort.ID | PostSort.PARENT_ID | PostSort.STATUS | PostSort.TITLE | PostSort.UPDATED_AT",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The field to sort the results by"
        },
        "attribute": "sort-by",
        "reflect": true,
        "defaultValue": "PostSort.UPDATED_AT"
      },
      "sortOrder": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "SortOrder",
          "resolved": "SortOrder.ASC | SortOrder.DESC",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The sort order of the results, either \"ASC\" or \"DESC\""
        },
        "attribute": "sort-order",
        "reflect": true,
        "defaultValue": "SortOrder.DESC"
      },
      "titleText": {
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
          "text": "Used to filter post results to those with a `title` value"
        },
        "attribute": "title-text",
        "reflect": true
      },
      "bodyText": {
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
          "text": "Used to filter post result to those with a `bodyText` value"
        },
        "attribute": "body-text",
        "reflect": true
      },
      "geometry": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Geometry",
          "resolved": "GeometryCollection<Geometry> | LineString | MultiLineString | MultiPoint | MultiPolygon | Point | Polygon",
          "references": {
            "Geometry": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with a `geometry` value"
        }
      },
      "featureGeometry": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Geometry",
          "resolved": "GeometryCollection<Geometry> | LineString | MultiLineString | MultiPoint | MultiPolygon | Point | Polygon",
          "references": {
            "Geometry": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with a `featureGeometry` value"
        }
      },
      "parentIds": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with specific `parentId` values"
        }
      },
      "creator": {
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
          "text": "Used to filter post results to those with a `creator` value"
        },
        "attribute": "creator",
        "reflect": true
      },
      "editor": {
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
          "text": "Used to filter post results to those with a `editor` value"
        },
        "attribute": "editor",
        "reflect": true
      },
      "status": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "PostStatus[]",
          "resolved": "PostStatus[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with specific `status` values"
        },
        "defaultValue": "[\n    PostStatus.APPROVED,\n    PostStatus.HIDDEN,\n    PostStatus.PENDING,\n    PostStatus.REJECTED,\n    PostStatus.BLOCKED\n  ]"
      },
      "groupIds": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with Channel configs containing the given `groupIds`"
        }
      },
      "channelIds": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with specific `channelId` values"
        }
      },
      "createdBefore": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "Date | string | number",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those created before a specific date"
        },
        "attribute": "created-before",
        "reflect": true
      },
      "createdAfter": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "Date | string | number",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those created after a specific date"
        },
        "attribute": "created-after",
        "reflect": true
      },
      "updatedBefore": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "Date | string | number",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those updated before a specific date"
        },
        "attribute": "updated-before",
        "reflect": true
      },
      "updatedAfter": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "Date | string | number",
          "resolved": "Date | number | string",
          "references": {
            "Date": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those updated after a specific date"
        },
        "attribute": "updated-after",
        "reflect": true
      },
      "access": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "SharingAccess[]",
          "resolved": "SharingAccess[]",
          "references": {
            "SharingAccess": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to filter post results to those with Channel configs containing the given `access`"
        }
      },
      "num": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to limit the number of results per page"
        },
        "attribute": "num",
        "reflect": true,
        "defaultValue": "10"
      },
      "isMobile": {
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
          "text": "If the body width is < 768px"
        },
        "attribute": "is-mobile",
        "reflect": false
      },
      "locationId": {
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
          "text": "Used to filter post results to those with a discussion URI containing the given `locationId`"
        },
        "attribute": "location-id",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "DiscussionsBoardLayout",
          "resolved": "\"grid\" | \"list\" | \"map\"",
          "references": {
            "DiscussionsBoardLayout": {
              "location": "import",
              "path": "../../utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The layout of the list, either `map`, `grid` or `list`"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'list'"
      },
      "showLayoutActions": {
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
          "text": "Renders the layout actions when true"
        },
        "attribute": "show-layout-actions",
        "reflect": false
      },
      "showSearchActions": {
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
          "text": "Renders the search input when true"
        },
        "attribute": "show-search-actions",
        "reflect": false
      },
      "showCounts": {
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
          "text": "Renders the results counts when true"
        },
        "attribute": "show-counts",
        "reflect": false
      },
      "showSortActions": {
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
          "text": "Renders the sort actions when true"
        },
        "attribute": "show-sort-actions",
        "reflect": false
      },
      "renderPost": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(post: IPost, index: number, posts: IPost[], loading?: boolean) => HTMLArcgisHubDiscussionsPostElement",
          "resolved": "(post: IPost, index: number, posts: IPost[], loading?: boolean) => HTMLArcgisHubDiscussionsPostElement",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            },
            "HTMLArcgisHubDiscussionsPostElement": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Render method to render custom post component configurations"
        }
      },
      "showLocations": {
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
          "text": "Controls whether the Add Location button and arcgis-hub-discussions-post-geography component render on posts"
        },
        "attribute": "show-locations",
        "reflect": false
      },
      "disableSelectExistingLocation": {
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
          "text": "Disable 'Select' location draw action"
        },
        "attribute": "disable-select-existing-location",
        "reflect": false
      },
      "locationDescriptionText": {
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
          "text": "An alternative location description string"
        },
        "attribute": "location-description-text",
        "reflect": false
      },
      "showChannelAvatar": {
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
          "text": "Whether to render channel avatar in the post header"
        },
        "attribute": "show-channel-avatar",
        "reflect": false
      },
      "showChannelName": {
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
          "text": "Whether to render channel name in the post header"
        },
        "attribute": "show-channel-name",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "pending": {},
      "error": {},
      "loadedPostIds": {},
      "ready": {},
      "mostRecentPagePostIds": {},
      "_loading": {},
      "intl": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsPostListUpdated",
        "name": "arcgisHubDiscussionsPostListUpdated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the search results have been updated"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPostListReady",
        "name": "arcgisHubDiscussionsPostListReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when all the posts dependencies have been loaded"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPostListLayoutChanged",
        "name": "arcgisHubDiscussionsPostListLayoutChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when layout is changed"
        },
        "complexType": {
          "original": "DiscussionsBoardLayout",
          "resolved": "\"grid\" | \"list\" | \"map\"",
          "references": {
            "DiscussionsBoardLayout": {
              "location": "import",
              "path": "../../utils/discussions"
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
          "text": "Emits hub telemetry events"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "getPostRefByPostId": {
        "complexType": {
          "signature": "(postId: string) => Promise<HTMLArcgisHubDiscussionsPostElement>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "postId A UUID string representing the id of a post"
                }],
              "text": "A UUID string representing the id of a post"
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "HTMLArcgisHubDiscussionsPostElement": {
              "location": "global"
            }
          },
          "return": "Promise<HTMLArcgisHubDiscussionsPostElement>"
        },
        "docs": {
          "text": "Method to obtain an ArcgisHubDiscussionsPostElement reference for a given postId string",
          "tags": [{
              "name": "param",
              "text": "postId A UUID string representing the id of a post"
            }, {
              "name": "returns",
              "text": "ArcgisHubDiscussionsPostElement"
            }]
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_context",
        "methodName": "handleContextChanged"
      }, {
        "propName": "ready",
        "methodName": "handleReadyChanged"
      }, {
        "propName": "loadedPostIds",
        "methodName": "handleLoadedPostIdsChanged"
      }, {
        "propName": "sortBy",
        "methodName": "handleSortByChanged"
      }, {
        "propName": "sortOrder",
        "methodName": "handleSortOrderChanged"
      }, {
        "propName": "bodyText",
        "methodName": "handleBodyChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubDiscussionsPostReady",
        "method": "handlePostReady",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisLayoutListLayoutSelected",
        "method": "handleLayoutSelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostDelete",
        "method": "handlePostDeleted",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostCreate",
        "method": "handlePostCreated",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostEdit",
        "method": "handlePostEdited",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisLoadMoreChange",
        "method": "handleLoadMoreChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsPostList.prototype, "fetchDependencies", null);
