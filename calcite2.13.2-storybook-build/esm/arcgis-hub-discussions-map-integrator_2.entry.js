import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { r as arcgisToGeoJSON, q as geojsonToArcGIS } from './compose-d5b83ab7.js';
import { S as SYMBOL_STATE, g as getMaxDeviation, s as symbols, d as defaultLayerThemeOptions } from './index-5d989261.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { C as CallWhenFactory } from './call-when-744df66d.js';
import { b as postsToFeatureCollection, s as searchPosts, c as postToFeatures, p as parseDiscussionURI, e as convertGeometryTypeToTelemetryString } from './discussions-a173baa3.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { f as PostRelation, P as PostSort, d as SortOrder, i as isDiscussable } from './utils-6bf1b713.js';
import { d as dist } from './index-dd3f99ac.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import { watch } from '@arcgis/core/core/reactiveUtils.js';
import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils.js';
import Extent from '@arcgis/core/geometry/Extent.js';
import Graphic from '@arcgis/core/Graphic.js';
import { isAbortError } from '@arcgis/core/core/promiseUtils.js';
import { l as loadArcGisCss, g as getFirstHitGraphic } from './arcgis-1e3a04cd.js';
import { a as fetchEntityDetails, f as fetchEnvironmentDetails } from './fetch-entity-details-b1fdb71f.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { generalize } from '@arcgis/core/geometry/geometryEngine.js';
import { m as minPromiseDelayFactory } from './min-promise-delay-d6a589f6.js';
import { C as CORNERS } from './interfaces-0d0bef14.js';
import { f as fetchDiscussionSettings } from './fetch-discussion-settings-9829ac8d.js';
import { f as fetchChannelDetails } from './fetch-channel-details-82aa13f7.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { S as SanitizeDecoratorFactory } from './sanitize-1830cdda.js';
import { h as getUserThumbnailUrl } from './HubInitiatives-4f4e24ce.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './cache-4bea61e0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './index-55cb25f7.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-with-default-b819d95d.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './append-custom-params-4bd856e5.js';
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
import './get-850c466d.js';
import './update-26e2fbc1.js';
import './index-213c70d0.js';
import './domain-exists-4fd7dc09.js';
import './teams-38e72623.js';
import './settings-2d4e159a.js';
import './channels-3a706fa2.js';
import './channels-2574fd6e.js';
import './generate-random-string-1436d9e6.js';
import './slugs-7ec67036.js';
import './themes-e08327b4.js';
import './search-c7a57aa9.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';

// A world geometry object for filtering to any extent
const geometry = {
  type: 'Polygon',
  coordinates: [
    [
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90],
      [180, -90],
    ],
  ],
};
/**
 * A wait function for thottling
 * @param ms Time in MilliSeconds
 */
const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
/**
 * Dynamically calculates a throttle wait time in MilliSeconds to reduce load
 * on Discussions API
 * @param totalResults The total number of results to fetch
 * @param batchSize The number of results per request
 * @param totalWaitTime The total cumulative wait time for all requests to be fired
 * @param numRequestsThreshold The max number of requests to allow at dynamice throttle.  If number
 * of requests exceed this threshold, all requests will be thottled to fixed 500ms.
 * @returns Dynamic thottle time in MilliSeconds
 */
const getThrottleMS = (totalResults, batchSize, totalWaitTime, numRequestsThreshold, thresholdExceededWaitTime) => {
  const numRequests = Math.ceil(totalResults / batchSize);
  if (numRequests > numRequestsThreshold) {
    console.warn(`Discussions requests exceeds desired threshold, throttling to ${thresholdExceededWaitTime}ms per batch.`);
    return thresholdExceededWaitTime;
  }
  return totalWaitTime / numRequests;
};
/**
 *
 * @param discussion Discussion URI
 * @param hubRequestOptions IHubRequestOptions (serialized)
 * @param token Token
 * @param batchSize Total number of results per paginated post request (Default: 10)
 * @param throttle Optional throttling of requests (Default: true)
 * @returns
 */
const getPostsWithLocation = async (searchParams, hubRequestOptions, batchSize = 10, throttle = true) => {
  const _searchPosts = async (params) => {
    var _a;
    const start = (_a = params.start) !== null && _a !== void 0 ? _a : 1;
    const options = Object.assign({ data: Object.assign({ num: batchSize, relations: [PostRelation.REPLIES], sortBy: PostSort.UPDATED_AT, sortOrder: SortOrder.DESC, start }, params) }, hubRequestOptions);
    const result = searchPosts(options);
    if (start === 1) {
      // first request must be synchronous to get total
      const { total } = await result;
      let nextStart = start + batchSize;
      const results = [result];
      const throttleMS = throttle ? getThrottleMS(total, batchSize, 2500, 10, 250) : 0;
      while (nextStart <= total) {
        await wait(throttleMS);
        results.push(...(await _searchPosts(Object.assign(Object.assign({ geometry }, params), { start: nextStart }))));
        nextStart = nextStart + batchSize;
      }
      return results;
    }
    return [result];
  };
  try {
    const pagedResponses = await Promise.all([
      // posts with related features
      ...(await _searchPosts(Object.assign(Object.assign({}, searchParams), { discussion: `${searchParams.discussion}%?id=%` }))),
      // posts with geometry
      ...(await _searchPosts(Object.assign(Object.assign({}, searchParams), { geometry, discussion: `${searchParams.discussion}%` }))),
    ]);
    const uniquePostIds = [];
    const posts = pagedResponses
      .map(({ items }) => items)
      .flat()
      .filter(post => {
      if (!uniquePostIds.includes(post.id)) {
        uniquePostIds.push(post.id);
        return true;
      }
      return false;
    });
    return postsToFeatureCollection(posts);
  }
  catch (error) {
    const { message } = error;
    console.error('Could not fetch on-map discussions:', message);
  }
};

const arcgisHubDiscussionsMapIntegratorCss = ".sc-arcgis-hub-discussions-map-integrator-h{display:block}@media only screen and (min-width: 640px){arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{position:absolute}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{z-index:10}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{width:25rem}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{padding:0px}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{top:calc(var(--top-offset) + 4.5rem);left:calc(var(--left-offset) - 5rem - 25rem);max-height:calc(var(--panel-height) - 6rem)}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{position:absolute}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{z-index:10}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{width:25rem}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{top:calc(var(--top-offset));left:calc(var(--left-offset))}}@media only screen and (max-width: 640px){arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{position:absolute}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{z-index:10}arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{width:calc(var(--panel-width) + 0.05rem);top:calc(var(--top-offset) + var(--panel-height) * .5);max-height:calc(var(--panel-height) * .5);height:calc(var(--panel-height) * .5);left:0.95rem}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{position:absolute}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{left:0px}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{margin:auto}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{width:100%}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions.sc-arcgis-hub-discussions-map-integrator{top:calc(var(--top-offset) + var(--panel-height) * .45)}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{position:absolute}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{z-index:10}arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{width:calc(var(--panel-width) - 0.95rem);top:calc(var(--panel-height) + 3.2rem);left:0.5rem}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{position:absolute}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{top:1rem}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{left:0px}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{margin:auto}[is-mobile].sc-arcgis-hub-discussions-map-integrator-h arcgis-hub-discussions-map-preview.sc-arcgis-hub-discussions-map-integrator{width:100%}}";

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubDiscussionsMapIntegrator = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubMapPopoverOpen = createEvent(this, "arcgisHubMapPopoverOpen", 7);
    this.arcgisHubMapPopoverClear = createEvent(this, "arcgisHubMapPopoverClear", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    /**
     * True when esri modules are loaded and layers are added to the view
     */
    this.initialized = false;
    /**
     * Cache of Discussion post features
     */
    this.cachedFeatures = [];
    /**
     * Unsaved original geometry used when editing original geometry on a post
     */
    this.unsavedExistingGeometry = [];
    /**
     * Cache of feature layer geometries used to avoid duplicate queries
     * to feature service
     */
    this.cachedRelatedFeatureGeometry = {};
    /**
     * Unique ID's for discussion layers
     */
    this.layerIds = [];
    /**
     * Staged attribute to signal graphic should persist on map
     */
    this.persistAttribute = '__persist__';
    this.view = undefined;
    this.discussionsRef = undefined;
    this.drawRef = undefined;
    this.searchRef = undefined;
    this.theme = {};
    this.discussion = undefined;
    this.entity = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.isHub = undefined;
    this.isMobile = undefined;
    this.activeFeature = undefined;
    this.activeMapDiscussion = undefined;
    this.channelIds = undefined;
    this.showChannelAvatar = undefined;
    this.showChannelName = undefined;
    this._context = getGlobalContext();
    this.viewHeight = undefined;
    this.viewWidth = undefined;
    this.preview = true;
    this.previewHeight = undefined;
    this.leftOffset = undefined;
    this.topOffset = undefined;
    this.mapActionNoticeActive = undefined;
    this.activePost = undefined;
    this.activeGraphicDetails = undefined;
    bind(this, 'makeGraphic', 'makeCalloutGraphic', 'setCalloutSymbolOnPointerMove', 'calculateOffsets', 'handlePointerMove', 'handleMapClickDiscussions', 'handleViewSizeChange', 'handleMapDrawSelect', 'handleEditActiveGraphic', 'handleDeleteActiveGraphic', 'handlePostPendingGraphic', 'addRelatedFeature', 'removeRelatedFeature', 'cancelAddRelatedFeature', 'getRelatedFeature', 'renderAddLocation', 'renderRemoveLocation', 'renderPostLocationEditOptions', 'renderPostLocationPrimaryOptions');
  }
  /**
   * Component will load lifecycle method, handles initial JSAPI initialization
   */
  async componentWillLoad() {
    this.initialize();
    this.intl = await intlManager.loadIntlForComponent(this.element);
    loadArcGisCss();
  }
  connectedCallback() {
    connectContext(this);
  }
  /**
   * Disconnected callback lifecycle method, handles teardown of
   * layers on map to return to original state.  Also removes any
   * outstanding map handlers for garbage collection.
   */
  disconnectedCallback() {
    this.teardown();
    this.disconnectContext();
  }
  /**
   * Determines if target of an event originated from the connected discussions component or floating
   * discussions map panel
   * @param event An event
   * @returns True if target is a reference to connected discussions component or floating discussions map panel
   */
  eventTargetIsDiscussionsRef(event) {
    return (event.target === this.discussionsRef) || (event.target === this.onMapDiscussionsRef) || (event.target === this.onMapDiscussionsPreviewRef);
  }
  /**
   * Reusable method for emitting telemetry events
   */
  emitHubTelemetry(telemetry) {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId: this.sketchPostId, channelId: this.currentDiscussionsRef.channelId }));
  }
  /**
   * Initialization - loads JSAPI modules and adds necessary layers
   */
  async initialize() {
    const { view, _context } = this;
    this.saveInitialDrawOptions();
    if (view && _context) {
      await view.when();
      this.addGeometryGraphicsLayer();
      this.addStagedGeometryGraphicsLayer();
      this.addCalloutGraphicsLayer();
      this.addHighlightGraphicsLayer();
      await this.fetchSubject();
      this.fetchPosts();
      this.handleViewSizeChange();
      if (this.cachedFeatures.length) {
        try {
          await this.refreshFeatures(this.cachedFeatures);
        }
        catch (e) {
          console.warn('Cannot add discussions features to the map', e.message);
        }
      }
      this.setDiscussionsRefHasMap(true);
      this.mapViewSizeChangeHandler = watch(() => [view.height, view.width], this.handleViewSizeChange);
      this.mapViewCenterChangeHandler = watch(() => view.center, this.calculateOffsets);
      this.initialized = true;
    }
  }
  /**
   * Handles initial JSAPI initialization in instances where MapView is not available
   * during componentWillLoad lifecycle method.  If a different MapView is
   * provided, it will teardown the old MapView and initialize the new one
   * @param view JSAPI MapView
   * @param prevView Old JSAPI MapView
   */
  attachView(view, prevView) {
    const { initialized } = this;
    if (view && view !== prevView) {
      if (initialized) {
        this.teardown();
      }
      // initialize with new view
      this.initialize();
    }
    else if (!view && initialized) {
      // view detached - so gracefully teardown
      this.teardown();
    }
  }
  /**
   * Setup and teardown of map when discussions is connected / disconnected
   * @param discussionsRef HTML Element reference to discussions component
   */
  attachdiscussionsRef(discussionsRef) {
    const { initialized } = this;
    if (discussionsRef && !initialized) {
      this.initialize();
    }
  }
  /**
   * Preserve drawRef props when it's connected
   */
  handleDrawRefUpdate() {
    this.saveInitialDrawOptions();
  }
  /**
   * Calculates position offsets for discussions element
   */
  calculateOffsets() {
    const { view, preview, graphicGeometry, isOffset, previewHeight, activeMapDiscussion } = this;
    if (view && activeMapDiscussion && graphicGeometry) {
      const { container } = view;
      const { top, left, right } = container.getBoundingClientRect();
      const graphicScreenPos = view.toScreen(graphicGeometry);
      const graphicLeft = isOffset ? graphicScreenPos.x + 5 : graphicScreenPos.x;
      const graphicTop = isOffset ? graphicScreenPos.y - 34 : graphicScreenPos.y;
      this.leftOffset = preview ? graphicLeft + left : right;
      this.topOffset = preview ? graphicTop + top - previewHeight : top;
    }
  }
  /**
   * Gets height of preview element
   * @param evt CustomEvent
   */
  handlePreviewDidLoad(evt) {
    const { detail: height } = evt;
    this.previewHeight = 0;
    this.previewHeight = height;
  }
  /**
   * Expands the discussions component
   */
  handlePreviewExpanded() {
    this.preview = false;
  }
  handleSearchWidgetPanelToggled(event) {
    const { target, detail: dismissed } = event;
    const { searchRef } = this;
    if (target === searchRef && !dismissed) {
      this.activeMapDiscussion = undefined;
      this.preview = false;
      this.clearHoverActiveGraphics(true);
    }
  }
  /**
   * Handles request to ease to current discussions graphics
   */
  handleGeometryGoTo(event) {
    const { detail: post } = event;
    const graphics = [...this.geometryGraphicsLayer.graphics.toArray(), ...this.calloutGraphicsLayer.graphics.toArray()];
    let activeGraphics = [];
    if (post) {
      const postParentId = post.id;
      const postId = post.parentId ? post.parentId : post.id;
      activeGraphics = graphics.filter(({ attributes: { id, parentId } }) => id === postId || (postParentId && parentId === postParentId));
    }
    else {
      const { activeMapDiscussion: { locationId } } = this;
      activeGraphics = graphics.filter(({ attributes: { relatedFeatureId } }) => relatedFeatureId === locationId);
    }
    if (activeGraphics.length) {
      this.goTo(activeGraphics);
    }
  }
  /**
   * Notifies map integrator of discussion API feature create / edit changes
   */
  handleGeometryFeature(event) {
    const { detail: { post, create } } = event;
    this.unsavedExistingGeometry = [];
    this.cachedFeatures = this.cachedFeatures.filter(({ properties: { id } }) => {
      return id !== post.id;
    });
    const newFeatures = postToFeatures(post);
    if (newFeatures) {
      this.cachedFeatures = [...this.cachedFeatures, ...postToFeatures(post)];
      if (create) {
        this.cachedFeatures.map((feature) => {
          const { properties: { id } } = feature;
          const { parentId } = post;
          if (id === parentId) {
            if (!('replyCount' in feature.properties)) {
              feature.properties.replyCount = 0;
            }
            feature.properties.replyCount += 1;
          }
          return feature;
        });
      }
      this.refreshFeatures(this.cachedFeatures);
      this.clearHoverActiveGraphics(true);
    }
  }
  /**
   * Removes featues from the map when deleted via discussions actions
   */
  handleGeometryFeatureDeleted(event) {
    const { detail: { id: deletedPostId, parentId: deletedPostParentId } } = event;
    this.cachedFeatures = this.cachedFeatures.filter(({ properties: { id } }) => {
      return id !== deletedPostId;
    }).map((feature) => {
      const { properties: { id } } = feature;
      if (id === deletedPostParentId) {
        feature.properties.replyCount -= 1;
      }
      return feature;
    });
    this.refreshFeatures(this.cachedFeatures);
    this.clearHoverActiveGraphics(true);
  }
  /**
   * Handles event that requests that a feature be selected on the map
   */
  handleGeometryFeatureSelect(event) {
    this.selectFeature(event.detail);
  }
  selectFeature(feature) {
    const { properties: { id, relatedFeatureId, index, unsaved } } = feature;
    // Highlight underlying feature geometry
    this.clearHoverActiveGraphics();
    const featureGraphic = this.getMatchingGraphic(feature);
    if (featureGraphic) {
      this.addHighlightGraphic(false, featureGraphic, SYMBOL_STATE.ACTIVE, false);
    }
    // Highlight callout geometry
    if (unsaved) {
      let target = this.unsavedGeometryGraphicsLayer.graphics.getItemAt(index);
      if (relatedFeatureId) {
        target = this.makeGraphic(feature);
      }
      this.goTo(target);
    }
    else {
      const calloutGraphic = this.calloutGraphicsLayer.graphics.find((graphic) => {
        const { attributes: { relatedFeatureId: _relatedFeatureId, id: postId, __index__: postIndex } } = graphic;
        return relatedFeatureId
          ? relatedFeatureId == _relatedFeatureId
          : postId == id && (postIndex === null || index == postIndex);
      });
      if (calloutGraphic) {
        this.addHighlightGraphic(true, calloutGraphic, SYMBOL_STATE.ACTIVE, false);
        const target = relatedFeatureId
          ? this.cachedRelatedFeatureGeometry[relatedFeatureId].arcgis
          : this.getGraphicById(id, index);
        this.goTo(target);
      }
    }
  }
  /**
   * Handles event that requests that a feature be highlighted on the map
   * @param event
   */
  handleGeometryFeatureHighlight(event) {
    const { detail: { properties: { id, relatedFeatureId, index, unsaved } } } = event;
    // Highlight underlying feature geometry
    this.clearHoverActiveGraphics();
    const featureGraphic = this.getMatchingGraphic(event.detail);
    if (featureGraphic) {
      this.addHighlightGraphic(false, featureGraphic, SYMBOL_STATE.HOVER, false);
    }
    // Highlight callout geometry
    if (!unsaved) {
      const calloutGraphic = this.calloutGraphicsLayer.graphics.find((graphic) => {
        const { attributes: { relatedFeatureId: _relatedFeatureId, id: postId, __index__: postIndex } } = graphic;
        return relatedFeatureId
          ? relatedFeatureId == _relatedFeatureId
          : postId == id && (postIndex === null || index == postIndex);
      });
      if (calloutGraphic) {
        this.addHighlightGraphic(true, calloutGraphic, SYMBOL_STATE.HOVER, false);
      }
    }
  }
  /**
   * During a post editing session, removes unsaved features or related features
   */
  handleFeatureRemove(event) {
    const { detail: { properties: { id, relatedFeatureId, index, unsaved } } } = event;
    this.removeGraphic(id, relatedFeatureId, index, unsaved);
  }
  /**
   * Remove graphic from the map and discussions props
   */
  removeGraphic(id, relatedFeatureId, index, unsaved) {
    const { currentDiscussionsRef: { unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures } } = this;
    if (unsaved) {
      if (relatedFeatureId) {
        this.currentDiscussionsRef.unsavedRelatedFeatures = [
          ...unsavedRelatedFeatures.slice(0, index),
          ...unsavedRelatedFeatures.slice(index + 1, unsavedRelatedFeatures.length)
        ];
      }
      else {
        this.currentDiscussionsRef.unsavedFeatures = [
          ...unsavedFeatures.slice(0, index),
          ...unsavedFeatures.slice(index + 1, unsavedFeatures.length)
        ];
        const graphic = this.unsavedGeometryGraphicsLayer.graphics.getItemAt(index);
        this.unsavedGeometryGraphicsLayer.graphics.remove(graphic);
      }
    }
    else {
      const findMatch = (graphic) => {
        const { attributes: { relatedFeatureId: _relatedFeatureId, id: postId, __index__: postIndex } } = graphic;
        return relatedFeatureId
          ? relatedFeatureId == _relatedFeatureId
          : postId == id && (postIndex === null || +index == +postIndex);
      };
      const calloutGraphic = this.calloutGraphicsLayer.graphics.find(findMatch);
      if (calloutGraphic) {
        calloutGraphic.visible = false;
      }
      const geometryGraphic = this.geometryGraphicsLayer.graphics.find(findMatch);
      if (geometryGraphic) {
        geometryGraphic.visible = false;
      }
      const feature = this.postToGeoJSON(null, {
        id,
        index: +index
      });
      this.currentDiscussionsRef.unsavedExistingFeatures = [
        ...unsavedExistingFeatures.filter(({ properties: { id: postId, index: postIndex } }) => {
          const match = id === postId && +index === +postIndex;
          return !match;
        }),
        feature
      ];
    }
    this.clearHoverActiveGraphics(true);
  }
  /**
   * Sets up internals for
   * when the user elects to draw a new geometry drawing on the map from discussions
   * @param event IPostDrawCreateDetails
   */
  handleGeometryDrawCreate(event) {
    const { detail: { post, postType } } = event;
    this.sketchPostType = postType;
    this.sketchPostId = post === null || post === void 0 ? void 0 : post.id;
    this.drawRef.buffer = false;
    this.drawRef.disablePrimaryOptions = true;
    this.drawRef.disableEditOptions = true;
    this.drawRef.drawTip = undefined;
    this.drawRef.enableMapTips = true;
  }
  /**
   * When geometry type is selected, sets map and draw tools to active draw state
   */
  handleGeometryDrawTypeSelect(event) {
    this.mapActionNoticeActive = true;
    this.drawRef.setActiveTool(event.detail);
  }
  /**
   * Resets active state when a draw session is completed
   */
  handleGeometryDrawDone() {
    this.mapActionNoticeActive = false;
    this.drawRef.setActiveTool(undefined);
    this.deletePendingGraphics();
  }
  /**
   * Clears active tool when a draw session is canceled
   */
  handleGeometryDrawCancel() {
    this.drawRef.setActiveTool(undefined);
  }
  /**
   * Remove pending graphics when draw tool is changed
   */
  handleActiveToolChange(event) {
    const { detail: tool } = event;
    if (tool) {
      this.deletePendingGraphics();
      this.arcgisHubMapPopoverClear.emit();
    }
  }
  /**
   * Handles event that requests that a feature's drawn geometry
   * be edited
   * @param event
   */
  handleGeometryDrawEdit(event) {
    const { detail: { properties: { id, index, unsaved } } } = event;
    this.preview = false;
    this.editGraphic(id, index, unsaved);
  }
  /**
   * Edit a graphic by passing in graphic geometry to draw tools
   */
  editGraphic(id, index, unsaved) {
    const { drawRef } = this;
    const { geometry } = unsaved
      ? this.unsavedGeometryGraphicsLayer.graphics.getItemAt(index)
      : this.getGraphicById(id, index);
    this.hideLayers();
    this.goTo(geometry);
    this.sketchPostId = id;
    this.sketchIndex = index;
    this.sketchIsUnsaved = unsaved;
    this.drawRef.geometry = undefined;
    setTimeout(() => {
      drawRef.geometry = geometry;
      drawRef.disablePrimaryOptions = true;
      drawRef.disableEditOptions = false;
      drawRef.buffer = false;
      drawRef.enableMapTips = true;
    }, 0);
  }
  /**
   * Define active post when post / reply editor is rendered
   */
  handlePostEditorReady(event) {
    this.activePost = event.detail;
  }
  /**
   * Handles event to stop a current edit session
   */
  handleGeometryDrawEditCancel() {
    this.currentDiscussionsRef.unsavedFeatures = [
      ...this.currentDiscussionsRef.unsavedFeatures
    ];
    this.drawRef.forceReset();
    this.showLayers();
  }
  /**
   * When SketchViewModel emits change details, update map graphics and
   * discussion props with updates
   */
  handleDrawGraphicsChange(event) {
    var _a;
    const { detail: { graphics, save, canceled, unsaved } } = event;
    const { sketchPostId, sketchIndex, sketchIsUnsaved } = this;
    const graphic = graphics.getItemAt(0);
    graphic.geometry = generalize(graphic.geometry.clone(), getMaxDeviation(this.view), false);
    if (save && this.drawRef.disablePrimaryOptions) {
      // Editing existing unsaved or saved graphics
      this.drawRef.disableEditOptions = true;
      const geographicGeom = webMercatorToGeographic(graphic.geometry);
      const geometry = arcgisToGeoJSON(geographicGeom);
      if (sketchIsUnsaved) {
        // Unsaved / New graphics on post
        const updateStagedFeatures = this.currentDiscussionsRef.unsavedFeatures.map((feature, index) => {
          if (index === sketchIndex) {
            feature.geometry = geometry;
          }
          return feature;
        });
        this.currentDiscussionsRef.unsavedFeatures = updateStagedFeatures;
        const unsavedGeometryGraphicsLayerGraphic = this.unsavedGeometryGraphicsLayer.graphics.getItemAt(sketchIndex);
        unsavedGeometryGraphicsLayerGraphic.geometry = graphic.geometry;
        if ((_a = unsavedGeometryGraphicsLayerGraphic.attributes) === null || _a === void 0 ? void 0 : _a.pending) {
          setTimeout(() => {
            // Render primary options after pending geometry has been edited
            this.activeGraphicDetails = {
              id: sketchPostId,
              index: sketchIndex,
              unsaved: true,
              geometry: graphic.geometry
            };
            this.arcgisHubMapPopoverOpen.emit({
              geometry: graphic.geometry,
              view: this.view,
              render: this.renderPostLocationPrimaryOptions,
              source: 'action'
            });
          }, 150);
        }
      }
      else {
        // Saving edits to existing graphic on post
        const feature = this.postToGeoJSON(geometry, {
          index: sketchIndex,
          id: sketchPostId
        });
        this.currentDiscussionsRef.unsavedExistingFeatures = [
          ...this.currentDiscussionsRef.unsavedExistingFeatures.filter(({ properties: { index } }) => index !== sketchIndex),
          feature
        ];
        const originalGraphic = this.getGraphicById(sketchPostId, sketchIndex);
        const unsavedExistingGeometryExists = this.unsavedExistingGeometry.filter(({ id, index }) => {
          return id === sketchPostId && index === sketchIndex;
        });
        if (!unsavedExistingGeometryExists.length) {
          this.unsavedExistingGeometry.push({
            id: sketchPostId,
            index: sketchIndex,
            geometry: originalGraphic.geometry.clone()
          });
        }
        originalGraphic.geometry = graphic.geometry;
      }
      this.drawRef.forceReset();
      this.showLayers();
      const type = convertGeometryTypeToTelemetryString(geometry);
      this.emitHubTelemetry(dist.dictionary.category.content.action.update.label.location.details[type]);
    }
    else if (canceled) {
      // Cancelling edits
      this.currentDiscussionsRef.unsavedFeatures = [
        ...this.currentDiscussionsRef.unsavedFeatures
      ];
      this.drawRef.forceReset();
      this.showLayers();
    }
    else if (unsaved) {
      this.drawRef.forceReset();
      graphic.symbol = symbols[graphic.geometry.type](SYMBOL_STATE.DEFAULT, this.themeWithDefaults[graphic.geometry.type]);
      graphic.attributes = { pending: true };
      this.addGraphicsToGraphicsLayer(this.unsavedGeometryGraphicsLayer, [graphic]);
      const features = [];
      graphics.forEach((graphic) => {
        const geographicGeom = webMercatorToGeographic(graphic.geometry);
        const geometry = arcgisToGeoJSON(geographicGeom);
        features.push({
          type: 'Feature',
          geometry,
          properties: {
            id: this.sketchPostId,
            pending: true // Initial draw presends pending graphic, requires confirmation to add to post
          }
        });
        const type = convertGeometryTypeToTelemetryString(geometry);
        this.emitHubTelemetry(dist.dictionary.category.content.action.create.label.location.details[type]);
      });
      this.currentDiscussionsRef.unsavedFeatures = [
        ...this.currentDiscussionsRef.unsavedFeatures,
        ...features
      ];
      setTimeout(() => {
        // Render primary options after for new drawn graphics, pending confirmation to add to post
        this.activeGraphicDetails = {
          id: sketchPostId,
          index: this.unsavedGeometryGraphicsLayer.graphics.length - 1,
          unsaved: true,
          geometry: graphic.geometry
        };
        this.arcgisHubMapPopoverOpen.emit({
          geometry: graphic.geometry,
          view: this.view,
          render: this.renderPostLocationPrimaryOptions,
          source: 'action'
        });
      }, 250);
    }
  }
  /**
   * Handles event to force drawing tools to reset
   * @param event
   */
  handleGeometryDrawReset() {
    this.currentDiscussionsRef.unsavedFeatures = [
      ...this.currentDiscussionsRef.unsavedFeatures
    ];
    this.restoreInitialDrawOptions();
    this.showLayers();
  }
  /**
   * Remove and reset map graphics and any active draw session state
   */
  handleGeometryClearAll() {
    this.resetStagedFeatures();
    this.restoreInitialDrawOptions();
    this.showLayers();
    this.unsavedGeometryGraphicsLayer.graphics.removeAll();
    const makeVisible = (graphic) => { graphic.visible = true; };
    this.geometryGraphicsLayer.graphics.forEach(makeVisible);
    this.calloutGraphicsLayer.graphics.forEach(makeVisible);
    this.mapActionNoticeActive = false;
    this.activePost = undefined;
  }
  /**
   * Look for graphics that intersect draw 'select' tool event and
   * render options to add / remove related features to discussions
   */
  async handleMapDrawSelect(event) {
    const { detail } = event;
    const { targetLayer } = this;
    const { results } = await this.view.hitTest(detail, { include: targetLayer });
    const result = getFirstHitGraphic(results);
    if ((result === null || result === void 0 ? void 0 : result.graphic) && this.drawRef.disableEditOptions) {
      const { graphic } = result;
      const objectIdField = graphic.layer.objectIdField;
      const objectId = graphic.attributes[objectIdField];
      // cache graphic geometry
      this.cacheRelatedFeatureGeometry([objectId]);
      if (!graphic.attributes.hasOwnProperty(targetLayer.displayField)) {
        // It is not guaranteed that the targetLayer was configured with necessary outFields
        // prior to being added to the view.  If not, perform additional query to the service
        // to obtain additional fields.
        const { features: [feature] } = await targetLayer.queryFeatures({ objectIds: [objectId], outFields: ['*'], returnGeometry: false });
        if (feature) {
          graphic.attributes = feature.attributes;
        }
      }
      // check if objectID exists in current unsaved features
      const unsavedRelatedFeatureIds = this.currentDiscussionsRef.unsavedRelatedFeatures.map((feature) => feature.objectId);
      let renderFn = this.renderAddLocation;
      if (unsavedRelatedFeatureIds.includes(objectId)) {
        renderFn = this.renderRemoveLocation;
      }
      this.selectedGraphic = graphic;
      this.drawRef.enableMapTips = false;
      this.arcgisHubMapPopoverOpen.emit({
        geometry: graphic.geometry,
        view: this.view,
        render: renderFn,
        source: 'action'
      });
      this.highlightGraphic(graphic);
    }
    else {
      this.selectedGraphic = null;
      this.drawRef.enableMapTips = true;
      this.highlightGraphic();
    }
  }
  /**
   * Reset's active discussion state when panel is closed or dismissed
   */
  handleDiscussionsClose(event) {
    if (event.target === this.onMapDiscussionsRef || event.target === this.onMapDiscussionsPreviewRef) {
      // clear current active discussion
      this.activeMapDiscussion = undefined;
      this.preview = false;
      this.clearHoverActiveGraphics(true);
    }
  }
  /**
   * Add related feature to post
   */
  addRelatedFeature() {
    const objectIdField = this.selectedGraphic.layer.objectIdField;
    const objectId = this.selectedGraphic.attributes[objectIdField];
    this.selectedGraphic.geometry = webMercatorToGeographic(this.selectedGraphic.geometry);
    const relatedFeature = {
      postId: this.sketchPostId,
      objectId,
      // any needed for https://github.com/terraformer-js/terraformer/issues/98
      feature: arcgisToGeoJSON(this.selectedGraphic.toJSON())
    };
    this.currentDiscussionsRef.unsavedRelatedFeatures = [
      ...this.currentDiscussionsRef.unsavedRelatedFeatures,
      relatedFeature
    ];
    this.highlightGraphic();
    this.arcgisHubMapPopoverClear.emit();
    this.drawRef.enableMapTips = true;
    this.emitHubTelemetry(dist.dictionary.category.interaction.action.select.label.content);
  }
  /**
   * Remove related feature from post
   */
  removeRelatedFeature() {
    const { currentDiscussionsRef: { unsavedRelatedFeatures } } = this;
    const objectIdField = this.selectedGraphic.layer.objectIdField;
    const objectId = this.selectedGraphic.attributes[objectIdField];
    const index = this.currentDiscussionsRef.unsavedRelatedFeatures.findIndex((feature) => feature.objectId == objectId);
    this.currentDiscussionsRef.unsavedRelatedFeatures = [
      ...unsavedRelatedFeatures.slice(0, index),
      ...unsavedRelatedFeatures.slice(index + 1, unsavedRelatedFeatures.length)
    ];
    this.cancelAddRelatedFeature();
    this.emitHubTelemetry(dist.dictionary.category.interaction.action.deselect.label.content);
  }
  /**
   * Reset's related feature selections tate
   */
  cancelAddRelatedFeature() {
    this.arcgisHubMapPopoverClear.emit();
    this.selectedGraphic = null;
    this.drawRef.enableMapTips = true;
    this.clearHighlights();
  }
  /**
   * Used to inform connected discussions component if map is available
   * @param hasMap Boolean - if map is available
   */
  setDiscussionsRefHasMap(hasMap) {
    if (this.discussionsRef) {
      this.discussionsRef.hasMap = hasMap;
    }
  }
  /**
   * Teardown of component to return map to original state
   * and remove map handlers
   */
  teardown() {
    this.clearHighlights();
    this.removeViewHandlers();
    this.removeLayers();
    this.resetSelect();
    this.setDiscussionsRefHasMap(false);
  }
  /**
   * Pre-fetches subject details for faster initial discussions
   * on-map panel load time
   */
  async fetchSubject() {
    const { discussion, entity, entityId, entityType, _context } = this;
    const entityDetails = await fetchEntityDetails({ discussion, entity, entityId, entityType }, _context.hubRequestOptions);
    Object.assign(this, entityDetails);
  }
  /**
   * Fetches all posts with location to load onto map for
   * current discussion
  */
  fetchPosts() {
    getPostsWithLocation(this.searchParams, this._context.hubRequestOptions).then((featureCollection) => {
      if (featureCollection === null || featureCollection === void 0 ? void 0 : featureCollection.features) {
        this.cachedFeatures = featureCollection.features;
        if (this.initialized) {
          this.refreshFeatures(featureCollection.features);
        }
      }
    });
  }
  /**
   * Add graphics layer that will hold post graphics
   */
  addGeometryGraphicsLayer() {
    this.geometryGraphicsLayer = new GraphicsLayer({
      graphics: [],
      elevationInfo: {
        mode: 'on-the-ground'
      }
    });
    this.view.map.add(this.geometryGraphicsLayer);
    this.layerIds.push(this.geometryGraphicsLayer.id);
  }
  /**
   * Adds graphics layer that will temporarily hold graphics for post that is being edited
   */
  addStagedGeometryGraphicsLayer() {
    this.unsavedGeometryGraphicsLayer = new GraphicsLayer({
      graphics: [],
      elevationInfo: {
        mode: 'on-the-ground'
      }
    });
    this.view.map.add(this.unsavedGeometryGraphicsLayer);
    this.layerIds.push(this.geometryGraphicsLayer.id);
  }
  // Add Callout Graphic Layer that will hold callout graphics
  addCalloutGraphicsLayer() {
    this.calloutGraphicsLayer = new GraphicsLayer({
      graphics: [],
      effect: 'drop-shadow(0px, 2px, 8px, rgba(0, 0, 0, .20))',
      elevationInfo: {
        mode: 'relative-to-ground'
      }
    });
    this.view.map.add(this.calloutGraphicsLayer);
    this.layerIds.push(this.calloutGraphicsLayer.id);
    // Set hover graphic symbol state
    this.mapPointerMoveHandler = this.view.on('pointer-move', this.handlePointerMove);
    this.mapClickDiscussionsHandler = this.view.on('click', this.handleMapClickDiscussions);
  }
  // Add Highlight Graphics Layer that will hold active graphic highlights
  addHighlightGraphicsLayer() {
    this.highlightGraphicsLayer = new GraphicsLayer({
      graphics: [],
      elevationInfo: {
        mode: 'relative-to-ground'
      }
    });
    this.view.map.add(this.highlightGraphicsLayer);
    this.layerIds.push(this.highlightGraphicsLayer.id);
  }
  /**
   * Add graphic to highlight layer and clear non-persisted graphics
   * @param isCallout True of graphic is the callout
   * @param graphic An Esri JSAPI Graphic
   * @param state SYMBOL_STATE
   * @param persist If graphic should stay active until overwritten
   */
  addHighlightGraphic(isCallout, graphic, state, persist) {
    var _a, _b, _c;
    const { themeWithDefaults, highlightGraphicsLayer, persistAttribute, is3D } = this;
    const graphicCopy = graphic.clone();
    if (isCallout) {
      graphicCopy.symbol = symbols.callout(state, Object.assign(Object.assign({}, themeWithDefaults.callout), { isOffset: (_a = graphic === null || graphic === void 0 ? void 0 : graphic.attributes) === null || _a === void 0 ? void 0 : _a.isOffset, is3D }), (_b = graphicCopy.attributes) === null || _b === void 0 ? void 0 : _b.totalCount);
    }
    else if ((_c = graphic === null || graphic === void 0 ? void 0 : graphic.geometry) === null || _c === void 0 ? void 0 : _c.type) {
      const type = graphic.geometry.type;
      graphicCopy.symbol = symbols[graphic.geometry.type](state, Object.assign({}, themeWithDefaults[type]));
      this.clearHoverActiveGraphics(persist);
    }
    graphicCopy.attributes = Object.assign(Object.assign({}, graphicCopy.attributes), { [persistAttribute]: persist });
    highlightGraphicsLayer.add(graphicCopy);
  }
  /**
   * Add styled hover graphic for post callouts when the mouse intersects an existing callout
   * @param event Esri JSAPI ViewPointerMoveEvent
   */
  setCalloutSymbolOnPointerMove(event) {
    this.view.hitTest(event, { include: this.calloutGraphicsLayer }).then((r) => {
      this.clearHoverActiveGraphics(false);
      if (r.results.length) {
        const result = getFirstHitGraphic(r.results);
        const { graphic } = result;
        this.addHighlightGraphic(true, graphic, SYMBOL_STATE.HOVER, false);
      }
    });
  }
  /**
   * Adds location popover on map for discussion geometry actions
   * @param event Esri JSAPI ViewPointerMoveEvent
   */
  setLocationEditPopover(event) {
    this.view.hitTest(event, { include: [this.geometryGraphicsLayer, this.unsavedGeometryGraphicsLayer] }).then((r) => {
      if (r.results.length) {
        const { results: [result] } = r;
        const isUnsavedGraphic = result.layer === this.unsavedGeometryGraphicsLayer;
        const isSavedGraphic = result.layer === this.geometryGraphicsLayer;
        let id, index, unsaved;
        if (isUnsavedGraphic) {
          const graphicPostIndex = this.unsavedGeometryGraphicsLayer.graphics.findIndex((graphic) => {
            return graphic === result.graphic;
          });
          id = undefined;
          index = graphicPostIndex;
          unsaved = true;
        }
        if (isSavedGraphic && this.activePost) {
          const { id: activePostId } = this.activePost;
          const { graphic: { attributes: { id: graphicPostId, __index__ } } } = result;
          const graphicPostIndex = __index__ || null;
          if (activePostId === graphicPostId) {
            id = activePostId;
            index = graphicPostIndex;
            unsaved = false;
          }
        }
        if (index !== undefined) {
          const { geometry, attributes } = result.graphic;
          this.activeGraphicDetails = { id, index: index, unsaved, geometry };
          const renderFn = (attributes === null || attributes === void 0 ? void 0 : attributes.pending)
            ? this.renderPostLocationPrimaryOptions
            : this.renderPostLocationEditOptions;
          this.arcgisHubMapPopoverOpen.emit({
            geometry: geometry,
            view: this.view,
            render: renderFn,
            source: 'action'
          });
        }
      }
    });
  }
  // Publishes pending graphics to post and removes any existing pending
  publishPendingGraphics() {
    // remove pending from graphics layer
    this.unsavedGeometryGraphicsLayer.graphics.forEach(graphic => {
      if (graphic.attributes.pending) {
        delete (graphic.attributes.pending);
      }
    });
    // remove pending from discussions prop
    this.currentDiscussionsRef.unsavedFeatures = this.currentDiscussionsRef.unsavedFeatures.map((feature) => {
      if (feature.properties.pending) {
        delete (feature.properties.pending);
      }
      return feature;
    });
  }
  // Removes any pending graphics and pending post items
  deletePendingGraphics() {
    const pendingGraphic = this.unsavedGeometryGraphicsLayer.graphics.find((graphic) => {
      var _a;
      return (_a = graphic.attributes) === null || _a === void 0 ? void 0 : _a.pending;
    });
    this.unsavedGeometryGraphicsLayer.remove(pendingGraphic);
    if (this.currentDiscussionsRef) {
      this.currentDiscussionsRef.unsavedFeatures = this.currentDiscussionsRef.unsavedFeatures.filter((feature) => {
        return feature.properties.pending
          ? !feature.properties.pending
          : true;
      });
    }
  }
  /**
   * Remove layers from the map
   */
  removeLayers() {
    [this.geometryGraphicsLayer, this.unsavedGeometryGraphicsLayer, this.calloutGraphicsLayer, this.highlightGraphicsLayer]
      .forEach(layer => this.removeLayer(layer));
  }
  /**
   * Hide layers on the map by setting opacity to .10
   */
  hideLayers() {
    [this.geometryGraphicsLayer, this.unsavedGeometryGraphicsLayer, this.calloutGraphicsLayer, this.highlightGraphicsLayer]
      .forEach(layer => layer.opacity = 0.10);
  }
  /**
   * Show layers on the map by setting opacity to 1
   */
  showLayers() {
    [this.geometryGraphicsLayer, this.unsavedGeometryGraphicsLayer, this.calloutGraphicsLayer, this.highlightGraphicsLayer]
      .forEach(layer => layer.opacity = 1);
  }
  /**
   * Remove a layer from the map
   * @param layer Esri JSAPI GraphicsLayer
   */
  removeLayer(layer) {
    if (layer) {
      layer.destroy();
    }
  }
  /**
   * Empties any graphics from existing graphics layers
   */
  emptyFeatures() {
    [this.geometryGraphicsLayer, this.unsavedGeometryGraphicsLayer, this.calloutGraphicsLayer].forEach(layer => layer.removeAll());
  }
  /**
   * Adds graphics to a specified graphics layer
   * @param layer Esri JSAPI GraphicsLayer
   * @param graphics Array of Esri JSAPI Graphics
   */
  addGraphicsToGraphicsLayer(layer, graphics) {
    layer.addMany(graphics);
  }
  /**
   * Takes array of GeoJSON features and adds them to the map, replacing all previous features
   * @param features An array of GeoJSON Features
   */
  async refreshFeatures(features) {
    this.emptyFeatures();
    this.resetSelect();
    features.forEach((feature) => { var _a; return feature.properties.totalCount = (_a = feature.properties.replyCount) !== null && _a !== void 0 ? _a : 0; });
    // create graphics for underlying geometry and callout CIM symbol
    const hasGeometry = ({ geometry }) => Boolean(geometry);
    const postGraphics = features.map(this.makeGraphic).filter(hasGeometry);
    const geometryCallout = features.map(this.makeCalloutGraphic).filter(hasGeometry);
    // Build cache of post related feature geometries by feature ID
    const hasFeatures = ({ properties }) => Boolean(parseDiscussionURI(properties.discussion).features);
    const postsWithRelatedFeatures = features.filter(hasFeatures);
    const relatedFeatureIds = Array.from(new Set(postsWithRelatedFeatures
      .map(({ properties: { discussion } }) => parseDiscussionURI(discussion).features.map(id => id))
      .flat()));
    await this.cacheRelatedFeatureGeometry(relatedFeatureIds);
    // Build related feature array and update callout counts
    const relatedFeatures = [];
    const postIds = [];
    for (const post of postsWithRelatedFeatures) {
      if (postIds.includes(post.properties.id)) {
        // a single post can be divided for n + 1 geometries, but only increment once
        continue;
      }
      else {
        postIds.push(post.properties.id);
      }
      const { properties: postProperties } = post;
      const { features } = parseDiscussionURI(postProperties.discussion);
      postProperties.totalCount = 0;
      features.forEach((postFeatureId) => {
        var _a;
        const matchesFeatureId = ({ properties: { relatedFeatureId } }) => {
          return relatedFeatureId == postFeatureId;
        };
        const existingFeature = relatedFeatures.find(matchesFeatureId);
        if (existingFeature) {
          // the related feature has already been found, so increment count
          const { properties: featureProperties } = existingFeature;
          const postTotalCount = ((_a = postProperties.totalCount) !== null && _a !== void 0 ? _a : 0) + 1;
          featureProperties.totalCount += postTotalCount;
        }
        else {
          try {
            // get post related feature from cache
            const feature = this.getRelatedFeature(postFeatureId);
            // add reference to related feature ID
            feature.properties = Object.assign(Object.assign({}, post.properties), { relatedFeatureId: postFeatureId });
            relatedFeatures.push(feature);
          }
          catch (error) {
            // related features referenced by a post may have been removed from service
            console.warn(`Failed to access post related feature:`, error.message);
          }
        }
      });
    }
    const relatedFeaturesCallout = relatedFeatures.map(this.makeCalloutGraphic);
    const calloutGraphics = [...geometryCallout, ...relatedFeaturesCallout];
    // Add graphics to map
    this.addGraphicsToGraphicsLayer(this.geometryGraphicsLayer, postGraphics);
    this.addGraphicsToGraphicsLayer(this.calloutGraphicsLayer, calloutGraphics);
    if (this.activeFeature) {
      // Select and reset the initial active feature, used to
      // highlight a feature on first render
      this.selectFeature(this.activeFeature);
      this.activeFeature = undefined;
    }
  }
  /**
   * Creates an extent from a point, used for determining zoom level
   * @param geometry Esri JSAPI Point Geometry
   * @param tolerance Number in Degrees to expand point extent
   * @returns
   */
  pointToExtent(geometry, tolerance = 0.0025) {
    const { x, y, spatialReference } = geometry;
    const extent = new Extent({
      xmin: x - tolerance,
      ymin: y - tolerance,
      xmax: x + tolerance,
      ymax: y + tolerance,
      spatialReference
    });
    return extent;
  }
  /**
   * Eases map to given location
   * @param target Target location / viewpoint to navigate to
   */
  goTo(goToTarget) {
    if (!this.view) {
      return;
    }
    let target = goToTarget;
    if (target.geometry && target.geometry.type === 'point') {
      target = this.pointToExtent(target.geometry);
    }
    if (target.extent) {
      target = target.extent.clone().expand(2);
    }
    this.view.goTo({
      target
    }, {
      duration: 1000,
      easing: 'ease'
    }).catch((error) => {
      if (!isAbortError(error)) {
        console.error(`Failed to zoom map to target feature or extent:`, error.message);
      }
    });
  }
  /**
   * Constructs a valid GeoJSON object given a geometry type and properties object
   * @param geometry GeoJSON geometry type string
   * @param properties GeoJSON properties object
   * @returns GeoJSON Feature
   */
  postToGeoJSON(geometry, properties) {
    return {
      type: 'Feature',
      geometry,
      properties
    };
  }
  /**
   * Construct an Esri Graphic from a GeoJSON Feature
   * @param feature GeoJSON Feature
   * @returns Esri JSAPI Graphic
   */
  makeGraphic(feature) {
    var _a;
    const arcgisJson = geojsonToArcGIS(feature);
    const graphic = Graphic.fromJSON(arcgisJson);
    if ((_a = graphic === null || graphic === void 0 ? void 0 : graphic.geometry) === null || _a === void 0 ? void 0 : _a.type) {
      graphic.symbol = symbols[graphic.geometry.type](SYMBOL_STATE.DEFAULT, this.themeWithDefaults[graphic.geometry.type]);
    }
    return graphic;
  }
  /**
   * Construct an Esri Graphic that is a callout icon for the underlying GeoJSON Feature
   * @param feature GeoJSON Feature
   * @returns Esri JSAPI Graphic
   */
  makeCalloutGraphic(feature) {
    var _a;
    const { is3D } = this;
    const { callout } = symbols;
    const { geometry, properties } = feature;
    // IMPROVEMENT: we should think about where callout should be placed, currently just grabs first coord
    const [x, y] = geometry.coordinates.flat(Infinity);
    const isOffset = !properties.relatedFeatureId && feature.geometry.type === 'Point';
    const arcgisJson = geojsonToArcGIS({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [x, y]
      },
      properties: Object.assign(Object.assign({}, properties), { replyCount: properties.replyCount || 0, isOffset })
    });
    const graphic = Graphic.fromJSON(arcgisJson);
    graphic.symbol = callout(SYMBOL_STATE.DEFAULT, Object.assign(Object.assign({}, this.themeWithDefaults.callout), { isOffset,
      is3D }), (_a = feature.properties) === null || _a === void 0 ? void 0 : _a.totalCount);
    return graphic;
  }
  /**
   * Queries feature service for related feature geometry and constructs GeoJSON feature
   * @param feature GeoJSON Feature
   * @returns Promise that resolves with a GeoJSON Feature
   */
  getRelatedFeature(objectId) {
    const geometry = this.cachedRelatedFeatureGeometry[objectId].geojson;
    return {
      type: 'Feature',
      geometry,
      properties: {}
    };
  }
  /**
   * Caches realted feature geometry in single optimized query
   * @param objectIds Array of feature service object ids
   */
  async cacheRelatedFeatureGeometry(objectIds) {
    // determine which features are currently not cached and cache them
    const { cachedRelatedFeatureGeometry, targetLayer } = this;
    if (!targetLayer) {
      // TODO: We should, as an improvement, not require the underlying discussions
      // service layer to already exist on the map.  Rather, we should check if the service
      // exists on the map, and if not add it (featching service from item ID)
      console.warn('Discussions service layer not defined; ingnoring related features');
      return;
    }
    const cachedIds = Object.keys(cachedRelatedFeatureGeometry);
    const nonCachedIds = objectIds.filter((id) => !cachedIds.includes(`${id}`));
    if (nonCachedIds.length) {
      const query = { where: "1=1", objectIds: nonCachedIds.map(id => +id), returnGeometry: true, outSpatialReference: { wkid: 4326 }, outFields: [this.targetLayer.objectIdField, this.targetLayer.displayField] };
      const { features } = await this.targetLayer.queryFeatures(query);
      features.forEach(({ geometry, attributes }) => {
        const geometryGeoJSON = arcgisToGeoJSON(geometry);
        this.cachedRelatedFeatureGeometry[attributes[this.targetLayer.objectIdField]] = {
          arcgis: geometry,
          geojson: geometryGeoJSON
        };
      });
    }
  }
  /**
   * Given feature with identifying attributes, finds matching
   * map graphic
   * @param feature Feature object
   * @returns Esri Graphic
   */
  getMatchingGraphic(feature) {
    const { properties: { id, relatedFeatureId, index, unsaved } } = feature;
    let matchingGraphic;
    if (relatedFeatureId && this.cachedRelatedFeatureGeometry[relatedFeatureId]) {
      // Graphic derrived from service, so grab underliying geometry
      matchingGraphic = new Graphic({
        geometry: this.cachedRelatedFeatureGeometry[relatedFeatureId].arcgis
      });
    }
    else {
      // Graphic derrived from existing map graphics, find match
      matchingGraphic = unsaved
        ? this.unsavedGeometryGraphicsLayer.graphics.getItemAt(index)
        : this.getGraphicById(id, index);
    }
    return matchingGraphic;
  }
  /**
   * Query graphics layer for existing graphic matching post ID
   * @param id Unique identifier of feature (post id)
   * @returns
   */
  getGraphicById(id, index) {
    const graphic = this.geometryGraphicsLayer.graphics.find(({ attributes: { id: postId, __index__: postIndex } }) => {
      const matchIndex = index !== null ? index == postIndex : true;
      return postId === id && matchIndex;
    });
    return graphic;
  }
  /**
   * Highlight a feature on the map
   * @param graphic Esri JSAPI Graphic to highlight
   * @returns
   */
  highlightGraphic(graphic) {
    this.clearHighlights();
    if (!graphic) {
      return;
    }
    this.clearHighlights();
    this.view.whenLayerView(graphic.layer).then((layerView) => {
      this.highlightHandle = layerView.highlight(graphic);
    });
  }
  /**
   * Clear any existing highlighted graphics
   */
  clearHighlights() {
    if (this.highlightHandle) {
      this.highlightHandle.remove();
      this.highlightHandle = null;
    }
  }
  /**
   * Clear any existing active or hover graphics
   */
  clearHoverActiveGraphics(all) {
    const { persistAttribute, highlightGraphicsLayer } = this;
    if (all) {
      highlightGraphicsLayer.removeAll();
    }
    else {
      const tempGraphics = highlightGraphicsLayer.graphics.filter(({ attributes }) => {
        return !attributes[persistAttribute];
      });
      highlightGraphicsLayer.removeMany(tempGraphics.toArray());
    }
  }
  /**
   * Remove MapView handlers for garbage collection
   */
  removeViewHandlers() {
    [this.mapPointerMoveHandler, this.mapClickDiscussionsHandler, this.mapViewSizeChangeHandler, this.mapViewCenterChangeHandler].forEach((handler) => {
      if (handler) {
        handler.remove();
        handler = null;
      }
    });
  }
  /**
   * Remove map click handler used for selecting related features
   */
  resetSelect() {
    this.clearHighlights();
  }
  /**
   * Remember initial drawing component properties so that they can be restored
   */
  saveInitialDrawOptions() {
    const { drawRef: { buffer, disableEditOptions, disablePrimaryOptions, enableMapTips } } = this;
    this.initialDrawOptions = {
      buffer,
      disableEditOptions,
      disablePrimaryOptions,
      enableMapTips
    };
  }
  /**
   * Restore drawing component properties back to their initial state
   */
  restoreInitialDrawOptions() {
    const { initialDrawOptions: { buffer, disableEditOptions, disablePrimaryOptions, enableMapTips } } = this;
    this.drawRef.buffer = buffer;
    this.drawRef.disableEditOptions = disableEditOptions;
    this.drawRef.disablePrimaryOptions = disablePrimaryOptions;
    this.drawRef.enableMapTips = enableMapTips;
    this.drawRef.setActiveTool(undefined);
    this.drawRef.forceReset();
  }
  /**
   * Reset any staged post / reply edits
   */
  resetStagedFeatures() {
    this.currentDiscussionsRef.unsavedFeatures = [];
    this.currentDiscussionsRef.unsavedRelatedFeatures = [];
    this.currentDiscussionsRef.unsavedExistingFeatures = [];
    this.unsavedExistingGeometry.forEach(({ id, index, geometry }) => {
      // revert edits on existing geometry
      const graphic = this.getGraphicById(id, index);
      graphic.geometry = geometry;
    });
    this.unsavedExistingGeometry = [];
  }
  /**
   * When map is clicked on discussions geometries, set active discussion for on map discussions panel
   * @param event Esri JSAPI ViewClickEvent
   */
  handleMapClickDiscussions(event) {
    this.view.hitTest(event, { include: [this.calloutGraphicsLayer] }).then((r) => {
      if (r.results.length) {
        this.searchRef.active = false;
        this.preview = false;
        this.clearHoverActiveGraphics(true);
        const result = getFirstHitGraphic(r.results);
        const { graphic } = result;
        this.graphicGeometry = graphic.geometry;
        this.isOffset = graphic.attributes.isOffset;
        const { attributes: { parentId, channelId, id, relatedFeatureId } } = graphic;
        if (relatedFeatureId) {
          const locationId = relatedFeatureId;
          this.activeMapDiscussion = { channelId, locationId };
        }
        else {
          this.activeMapDiscussion = {
            channelId,
            postId: parentId ? id : undefined,
            parentId: parentId ? parentId : id,
          };
        }
        // Set active graphic
        this.addHighlightGraphic(true, graphic, SYMBOL_STATE.ACTIVE, true);
        // Next Tick
        setTimeout(() => {
          this.preview = true;
        }, 0);
      }
    });
  }
  /**
   * Set's view height and width state when view size changes
   */
  handleViewSizeChange() {
    const { view: { height, width } } = this;
    this.viewHeight = height;
    this.viewWidth = width;
  }
  /**
   * Calls methods that listen for 'pointer-move' event on View
   * @param event Esri JSAPI ViewPointerMoveEvent
   */
  handlePointerMove(event) {
    this.setCalloutSymbolOnPointerMove(event);
    this.setLocationEditPopover(event);
  }
  /**
   * Edit the active graphic
   */
  handleEditActiveGraphic() {
    const { id, index, unsaved } = this.activeGraphicDetails;
    this.editGraphic(id, index, unsaved);
  }
  /**
   * Delete the active graphic
   */
  handleDeleteActiveGraphic() {
    const { id, index, unsaved } = this.activeGraphicDetails;
    this.removeGraphic(id, null, index, unsaved);
    this.arcgisHubMapPopoverClear.emit();
  }
  /**
   * Puslish pending graphic, and show tooltip on drawing component
   * after first unsaved graphic is created
   */
  handlePostPendingGraphic() {
    // Strip pending attribute from graphicsLayer and discussions
    this.publishPendingGraphics();
    this.arcgisHubMapPopoverClear.emit();
    if (this.currentDiscussionsRef.unsavedFeatures.length === 1) {
      // Show help tip on draw tools after first feature creation
      this.drawRef.drawTip = this.intl.t('draw.tip');
    }
  }
  /**
   * Computes a ISearchPosts object used to search for posts
   */
  get searchParams() {
    const { channelIds, discussion, } = this;
    const params = {
      channels: channelIds,
      discussion
    };
    return Object.entries(params).reduce((acc, [key, val]) => (Boolean(val) ? Object.assign(Object.assign({}, acc), { [key]: val }) : acc), {});
  }
  /**
   * The active dicsussions component reference
   */
  get currentDiscussionsRef() {
    return this.activeMapDiscussion ? this.onMapDiscussionsRef : this.discussionsRef;
  }
  /**
   * Returns default theme mixed with any custom theme options
   */
  get themeWithDefaults() {
    const { theme } = this;
    const _themeWithDefaults = {};
    ['point', 'polyline', 'polygon', 'callout'].forEach((type) => {
      _themeWithDefaults[type] = Object.assign(Object.assign({}, defaultLayerThemeOptions[type]), theme[type]);
    });
    return _themeWithDefaults;
  }
  /**
   * Returns true if current view is a SceneView
   */
  get is3D() {
    const { view } = this;
    return view.hasOwnProperty('camera');
  }
  /**
   * The primary feature layer for current discussion
   */
  get targetLayer() {
    return this.view.map.allLayers.filter((layer) => {
      return (layer.type === 'feature' && (!this.layerIds.includes(layer.id)));
    }).getItemAt(0);
  }
  /**
   * Style object
   */
  get styles() {
    const { view, viewWidth, viewHeight, leftOffset, topOffset, previewHeight, preview } = this;
    let styles = {};
    if (view) {
      const { container } = view;
      if (!container) {
        return;
      }
      const { top, left, right, bottom } = container.getBoundingClientRect();
      styles = {
        '--left-offset': `${leftOffset}px`,
        '--top-offset': `${topOffset}px`,
        '--panel-left': `${left}px`,
        '--panel-height': `${preview ? (viewHeight - previewHeight) : (bottom - top)}px`,
        '--panel-width': `${right - left}px`,
        '--view-width': `${viewWidth}px`,
        '--view-height': `${viewHeight}px`
      };
    }
    return styles;
  }
  /**
   * Render related feature map options
   */
  renderAddLocation() {
    const { intl, sketchPostType } = this;
    return (h(Fragment, null, h("calcite-action-group", null, h("calcite-action", { icon: "check", onClick: this.addRelatedFeature, text: intl.t(`prompt.add.${sketchPostType}`), textEnabled: true })), h("calcite-action-group", null, h("calcite-action", { icon: "undo", onClick: this.cancelAddRelatedFeature, text: intl.t('prompt.remove.existing'), textEnabled: true }))));
  }
  /**
   * Render option to remove related features if they are already included on a post
   */
  renderRemoveLocation() {
    return (h("calcite-action-pad", { "expand-disabled": true, expanded: true, layout: "horizontal" }, h("calcite-action", { icon: "trash", onClick: this.removeRelatedFeature, text: this.intl.t('location.remove'), textEnabled: true })));
  }
  /**
   * Render the primary options for pending map graphics, requiring
   * confirmation before 'officially' adding to a post or reply
   */
  renderPostLocationPrimaryOptions() {
    const { activeGraphicDetails: { geometry: { type: geomType } }, intl, sketchPostType } = this;
    return (h(Fragment, null, h("calcite-action-group", null, h("calcite-action", { icon: "check", onClick: this.handlePostPendingGraphic, text: intl.t(`prompt.add.${sketchPostType}`), "text-enabled": true })), h("calcite-action-group", null, h("calcite-action", { icon: geomType === 'point' ? 'move' : 'pencil', onClick: this.handleEditActiveGraphic, text: intl.t(`prompt.edit.${geomType}`), "text-enabled": true }), h("calcite-action", { icon: "trash", onClick: this.handleDeleteActiveGraphic, text: intl.t(`prompt.remove.${geomType}`), "text-enabled": true }))));
  }
  /**
   * Render options to edit or delete an active map graphic
   */
  renderPostLocationEditOptions() {
    const { intl } = this;
    return (h("calcite-action-pad", { "expand-disabled": true, layout: "horizontal" }, h("calcite-action", { icon: "pencil", onClick: this.handleEditActiveGraphic, text: intl.t('prompt.location.edit') }), h("calcite-action", { icon: "trash", onClick: this.handleDeleteActiveGraphic, text: intl.t('prompt.location.delete') })));
  }
  /**
   * Render on map discussions component
   */
  renderMapDiscussion() {
    const { activeMapDiscussion, discussion, isHub, entityId, entity, entityType, showChannelAvatar, showChannelName } = this;
    return this.preview
      ? (h("arcgis-hub-discussions-map-preview", { channelId: activeMapDiscussion.channelId, discussion: discussion, locationId: activeMapDiscussion.locationId, parentId: activeMapDiscussion.postId ? activeMapDiscussion.parentId : undefined, postId: activeMapDiscussion.postId || activeMapDiscussion.parentId, ref: (element) => { this.onMapDiscussionsPreviewRef = element; }, showChannelAvatar: showChannelAvatar }))
      : (h("arcgis-hub-discussions", { channelId: activeMapDiscussion.channelId, disableNavigation: !activeMapDiscussion.locationId, discussion: discussion, dismissible: true, enableGoTo: true, entity: entity, entityId: entityId, entityType: entityType, hasMap: true, isHub: isHub, locationId: activeMapDiscussion.locationId, parentId: activeMapDiscussion.parentId, postId: activeMapDiscussion.postId, ref: (element) => { this.onMapDiscussionsRef = element; }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName }));
  }
  render() {
    const { activeMapDiscussion, styles, view, mapActionNoticeActive } = this;
    return (h(Host, { "data-element": "discussions-map-integrator", style: styles }, activeMapDiscussion && this.renderMapDiscussion(), view && mapActionNoticeActive &&
      h("arcgis-hub-discussions-map-action-notice", { view: view })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["initialize"],
    "view": ["attachView"],
    "discussionsRef": ["attachdiscussionsRef"],
    "drawRef": ["handleDrawRefUpdate"],
    "preview": ["calculateOffsets"],
    "previewHeight": ["calculateOffsets"]
  }; }
};
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryGoTo", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryFeature", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryFeatureDeleted", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryFeatureSelect", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryFeatureHighlight", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleFeatureRemove", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryDrawCreate", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryDrawTypeSelect", null);
__decorate$1([
  CallWhenFactory({ when(event) {
      return event.target === this.drawRef;
    } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleActiveToolChange", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryDrawEdit", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handlePostEditorReady", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryDrawEditCancel", null);
__decorate$1([
  CallWhenFactory({ when(event) {
      return event.target === this.drawRef;
    } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleDrawGraphicsChange", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryDrawReset", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleGeometryClearAll", null);
__decorate$1([
  CallWhenFactory({ when(event) { return this.eventTargetIsDiscussionsRef(event); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleDiscussionsClose", null);
__decorate$1([
  DebounceDecoratorFactory({ timeout: 50 })
], ArcgisHubDiscussionsMapIntegrator.prototype, "setLocationEditPopover", null);
__decorate$1([
  CallWhenFactory({ when(features) { return features; } }),
  DebounceDecoratorFactory({ timeout: 50 })
], ArcgisHubDiscussionsMapIntegrator.prototype, "refreshFeatures", null);
__decorate$1([
  CallWhenFactory({ when() { return this.geometryGraphicsLayer; } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "getGraphicById", null);
__decorate$1([
  CallWhenFactory({ when() { return this.highlightGraphicsLayer; } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "clearHoverActiveGraphics", null);
__decorate$1([
  CallWhenFactory({ when() { return this.drawRef; } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "saveInitialDrawOptions", null);
__decorate$1([
  CallWhenFactory({ when() { return this.drawRef && this.initialDrawOptions; } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "restoreInitialDrawOptions", null);
__decorate$1([
  CallWhenFactory({ when() { return this.currentDiscussionsRef; } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "resetStagedFeatures", null);
__decorate$1([
  CallWhenFactory({ when() { return !this.mapActionNoticeActive; } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleMapClickDiscussions", null);
__decorate$1([
  DebounceDecoratorFactory({ timeout: 50 })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handleViewSizeChange", null);
__decorate$1([
  DebounceDecoratorFactory({ timeout: 15 })
], ArcgisHubDiscussionsMapIntegrator.prototype, "handlePointerMove", null);
__decorate$1([
  CallWhenFactory({ when() { return Boolean(this.drawRef && !this.drawRef.geometry); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "renderPostLocationPrimaryOptions", null);
__decorate$1([
  CallWhenFactory({ when() { return Boolean(this.drawRef && !this.drawRef.geometry); } })
], ArcgisHubDiscussionsMapIntegrator.prototype, "renderPostLocationEditOptions", null);
ArcgisHubDiscussionsMapIntegrator.style = arcgisHubDiscussionsMapIntegratorCss;

const arcgisHubDiscussionsViewCss = ":host{display:block}.entity-view{display:grid;column-gap:4rem;grid-template-columns:2fr 1fr;grid-template-areas:\"header header\"\n    \"main sideBar\"}.entity-view-mobile{display:block}h2{margin-top:0.5rem;margin-bottom:0.5rem;font-size:var(--calcite-font-size-2);line-height:1.5rem;color:var(--calcite-color-text-1)}div{font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1)}.entity-view-header{grid-area:header;margin-bottom:1rem}.entity-view-body{margin-top:1rem}.entity-view-body>div:not(:last-child){margin-bottom:1rem}.entity-view-main{grid-area:main}.entity-view-side-bar{grid-area:sideBar}arcgis-hub-image{width:100%}header.entity-view-header__title{margin-bottom:1rem;font-size:var(--calcite-font-size-4);line-height:2.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.entity-view-header__hero{display:grid;align-items:center;column-gap:1.5rem;grid-template-columns:1fr 2fr;grid-template-rows:1fr}.entity-view-header__status{font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);text-transform:uppercase}.entity-view-header__avatar{margin-bottom:1rem;display:grid;column-gap:1rem;grid-template-columns:44px auto;grid-template-rows:1fr}.entity-view-header__avatar-name{font-weight:var(--calcite-font-weight-bold)}calcite-chip{margin-right:0.5rem;margin-top:0.5rem;border-radius:0px}calcite-link{color:var(--calcite-color-text-1)}.entity-view-metric{margin-top:0.5rem;display:grid;align-items:center;column-gap:0.5rem;grid-template-columns:1.50rem auto}.entity-view-metric .heading{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2)}.skeleton>arcgis-skeleton-loader{margin-bottom:1.5rem}calcite-block{border-block-end-width:0px;--calcite-color-text-3:var(--calcite-color-text-2);--calcite-font-size--1:var(--calcite-font-size--0);--calcite-font-size--2:var(--calcite-font-size--0);--calcite-font-weight-medium:var(--calcite-font-weight-bold);margin-bottom:-1rem;margin-left:-0.75rem;background-color:transparent}@media only screen and (max-width: 768px){:host{display:block}.entity-view{display:block}.entity-view-header__thumbnail{display:none}.entity-view-body{margin:0px}.entity-view-side-bar{margin-top:2.5rem}.entity-view-header__hero{display:block}}.entity-view-mobile,.entity-view-mobile .entity-view-header__hero{display:block}.entity-view-mobile .entity-view-header__thumbnail{display:none}";

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
const ArcgisHubDiscussionsView = class {
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsViewButtonClicked = createEvent(this, "arcgisHubDiscussionsViewButtonClicked", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this._context = getGlobalContext();
    this.entity = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.isHub = undefined;
    this.isMobile = undefined;
    this.channel = undefined;
    this.channelId = undefined;
    this.allowedChannelIds = undefined;
    this.showViewButton = undefined;
    this.intl = undefined;
    this.pending = true;
    this.postCount = undefined;
    bind(this, 'handleViewButtonClicked');
  }
  /**
   * Component will load lifecycle event, loads translations and dependencies
   */
  async componentWillLoad() {
    await this.loadTranslations();
    this.loadDependencies();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads dependencies and manages pending state
   */
  loadDependencies() {
    if (this._context) {
      this.pending = true;
      return this.fetchDependencies().then(dependencies => {
        Object.assign(this, dependencies, { pending: false });
      });
    }
  }
  /**
   * Fetches dependencies, enforcing a minimum delay so skeleton state can be observed
   */
  fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Handles changes to `context`, loads dependencies
   * @param context
   * @param prevContext
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.loadDependencies();
    }
  }
  /**
   * Fetches and resolves all dependencies
   */
  async _fetchDependencies() {
    var _a;
    const { entity, entityId, entityType, _context, isHub, channel } = this;
    let { channelId, allowedChannelIds } = this;
    const [environmentDetails, entityDetails] = await Promise.all([
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
      fetchEntityDetails({ entity, entityId, entityType, discussionType: 'board' }, _context.hubRequestOptions),
    ]);
    if (!channel && !channelId) {
      ({ allowedChannelIds } = allowedChannelIds === undefined ? await fetchDiscussionSettings(entityDetails.entity.id, _context.hubRequestOptions) : { allowedChannelIds });
      channelId = allowedChannelIds === null || allowedChannelIds === void 0 ? void 0 : allowedChannelIds[0];
    }
    let channelDetails;
    let postCount = 0;
    if (channel || channelId) {
      [channelDetails, { total: postCount }] = await Promise.all([
        fetchChannelDetails({ channelId, channel }, _context.hubRequestOptions),
        searchPosts(Object.assign({ data: {
            channels: [(_a = channel === null || channel === void 0 ? void 0 : channel.id) !== null && _a !== void 0 ? _a : channelId],
            discussion: entityDetails.discussion,
            num: 1,
            parents: [],
          } }, _context.hubRequestOptions)),
      ]);
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, environmentDetails), entityDetails), channelDetails), { postCount });
  }
  /**
   * Handles when 'View Discussion' button is clicked and emits
   * arcgisHubDiscussionsViewButtonClicked
   */
  handleViewButtonClicked() {
    this.arcgisHubDiscussionsViewButtonClicked.emit();
    this.hubTelemetry.emit(dist.dictionary.category.navigation.action.view.label.content.details.discussion);
  }
  /**
   * Checks if discussion item is currently discussable
   */
  get isOpenForSubmissions() {
    return Boolean(this.channel && this.entity) && isDiscussable(this.entity);
  }
  /**
   * Date range for last 30 days in ISO 8601 date time string format
   */
  get dateRange() {
    const today = new Date();
    const thirtyDaysAgoFromToday = new Date(new Date().setDate(today.getDate() - 30));
    return [thirtyDaysAgoFromToday.toISOString(), today.toISOString()];
  }
  /**
   * Sanitizes the entity description
   */
  get sanitizedEntityDescription() {
    var _a;
    return (_a = this.entity) === null || _a === void 0 ? void 0 : _a.description;
  }
  renderHeader() {
    var _a, _b, _c, _d, _e, _f, _g;
    const { entity, isOpenForSubmissions, _context, intl, handleViewButtonClicked, showViewButton } = this;
    return (h("div", { class: "entity-view-header" }, h("div", { class: "entity-view-header__hero" }, h("div", { class: "entity-view-header__thumbnail" }, h("arcgis-hub-image", { alt: intl.t('image'), corners: CORNERS.round, fallback: "https://static.arcgis.com/images/discussion.png", src: entity === null || entity === void 0 ? void 0 : entity.thumbnailUrl })), h("div", { class: "entity-view-header__details" }, h("div", { class: "entity-view-header__status" }, intl.t(isOpenForSubmissions ? 'statusOpen' : 'statusClosed')), h("header", { class: "entity-view-header__title" }, entity === null || entity === void 0 ? void 0 : entity.title), h("div", { class: "entity-view-header__avatar" }, h("calcite-avatar", { fullName: (_a = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _a === void 0 ? void 0 : _a.fullName, scale: "l", thumbnail: ((_b = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _b === void 0 ? void 0 : _b.thumbnail) &&
        getUserThumbnailUrl(_context.hubRequestOptions.portal, entity.ownerUser, (_c = _context.hubRequestOptions.authentication) === null || _c === void 0 ? void 0 : _c.token), userId: (_d = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _d === void 0 ? void 0 : _d.id, username: (_e = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _e === void 0 ? void 0 : _e.username }), h("div", { class: "entity-view-header__avatar-details" }, h("div", { class: "entity-view-header__avatar-name" }, (_f = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _f === void 0 ? void 0 : _f.fullName), h("div", { class: "entity-view-header__avatar-org" }, (_g = entity === null || entity === void 0 ? void 0 : entity.org) === null || _g === void 0 ? void 0 : _g.name))), showViewButton && (h("div", { class: "entity-view-header__view-action" }, h("calcite-button", { onClick: handleViewButtonClicked, round: true }, intl.t('view'))))))));
  }
  renderMain() {
    var _a, _b;
    const { entity, intl, sanitizedEntityDescription } = this;
    return (h("div", { class: "entity-view-body entity-view-main" }, Boolean((_a = entity === null || entity === void 0 ? void 0 : entity.snippet) === null || _a === void 0 ? void 0 : _a.length) && (h("div", { class: "entity-view-main__summary" }, h("h2", null, intl.t('summary')), h("div", null, entity.snippet))), Boolean((_b = entity === null || entity === void 0 ? void 0 : entity.description) === null || _b === void 0 ? void 0 : _b.length) && (h("div", { class: "entity-view-main__description" }, h("h2", null, intl.t('description')), h("div", { innerHTML: sanitizedEntityDescription })))));
  }
  renderMetadata() {
    const { entity, intl, isOpenForSubmissions } = this;
    return (h("div", { class: "entity-view-side-bar__metadata" }, h("h2", null, intl.t('details')), h("arcgis-hub-entity-metadata", { entity: entity, exclude: ['owner'] }, h("calcite-block", { description: intl.t('discussionBoard'), heading: intl.t('discussion') }, h("calcite-icon", { icon: "speech-bubble", slot: "icon-start" })), h("calcite-block", { description: intl.t(isOpenForSubmissions ? 'statusOpen' : 'statusClosed'), heading: intl.t(isOpenForSubmissions ? 'titleOpen' : 'titleClosed') }, h("calcite-icon", { icon: "mega-phone", slot: "icon-start" })))));
  }
  renderMetrics() {
    const { postCount, dateRange, intl } = this;
    return (h("div", { class: "entity-view-side-bar__metrics" }, h("h2", null, intl.t('metrics')), h("div", { class: "entity-view-metric" }, h("calcite-icon", { icon: "graph-bar" }), h("div", null, h("div", { class: "heading" }, intl.t('metric.pageViews')), h("arcgis-telemetry-report", { contentId: `portal:${this.entityId}`, endDate: dateRange[1], reportTitle: intl.t('metric.pageViews'), startDate: dateRange[0], telemetryEvent: 'page-views', type: "value" }))), h("div", { class: "entity-view-metric" }, h("calcite-icon", { icon: "speech-bubbles" }), h("div", null, h("div", { class: "heading" }, intl.t('metric.postCount')), h("div", null, intl.formatNumber(postCount))))));
  }
  renderTags() {
    var _a;
    const { entity, intl } = this;
    return (h("div", { class: "entity-view-side-bar__tags" }, h("h2", null, intl.t('tags')), (_a = entity === null || entity === void 0 ? void 0 : entity.tags) === null || _a === void 0 ? void 0 :
      _a.map(tag => {
        const _tag = encodeURIComponent(tag.toLowerCase());
        return (h("calcite-chip", { key: tag, value: tag }, h("calcite-link", { href: `/search?tags=${_tag}`, target: "_self" }, tag)));
      })));
  }
  renderCategories() {
    var _a;
    const { entity, intl } = this;
    return (h("div", { class: "entity-view-side-bar__categories" }, h("h2", null, intl.t('categories')), (_a = entity === null || entity === void 0 ? void 0 : entity.categories) === null || _a === void 0 ? void 0 :
      _a.map(category => {
        const _category = encodeURIComponent(category.toLowerCase());
        return (h("calcite-chip", { key: category, value: category }, h("calcite-link", { href: `/search?categories=${_category}`, target: "_self" }, category)));
      })));
  }
  renderSidebar() {
    return (h("div", { class: "entity-view-body entity-view-side-bar" }, this.renderMetadata(), this.renderMetrics(), this.renderTags(), this.renderCategories()));
  }
  renderSkeleton() {
    return (h(Fragment, null, h("div", { class: "entity-view-header" }, h("div", { class: "entity-view-header__hero" }, h("arcgis-skeleton-loader", { active: true, rows: 0, showHeading: false, showThumbnail: !this.isMobile }), h("arcgis-skeleton-loader", { active: true, rows: 4, showHeading: false }))), h("div", { class: "entity-view-body skeleton" }, h("arcgis-skeleton-loader", { active: true, rows: 2, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 4, showHeading: true })), h("div", { class: "entity-view-body entity-view-side-bar skeleton" }, h("arcgis-skeleton-loader", { active: true, rows: 10, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 4, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 1, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 1, showHeading: true }))));
  }
  renderView() {
    return (h(Fragment, null, this.renderHeader(), this.renderMain(), this.renderSidebar()));
  }
  render() {
    return (h(Host, { "data-element": "discussions-view" }, h("div", { class: `entity-view${this.isMobile ? '-mobile' : ''}` }, this.pending ? this.renderSkeleton() : this.renderView())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"]
  }; }
};
__decorate([
  minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsView.prototype, "fetchDependencies", null);
__decorate([
  MemoizeDecoratorFactory('entity.description'),
  SanitizeDecoratorFactory()
], ArcgisHubDiscussionsView.prototype, "sanitizedEntityDescription", null);
__decorate([
  CallWhenFactory({
    when() {
      var _a, _b;
      return (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.filter(t => t.length).length;
    },
  })
], ArcgisHubDiscussionsView.prototype, "renderTags", null);
__decorate([
  CallWhenFactory({
    when() {
      var _a, _b;
      return (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b.filter(t => t.length).length;
    },
  })
], ArcgisHubDiscussionsView.prototype, "renderCategories", null);
ArcgisHubDiscussionsView.style = arcgisHubDiscussionsViewCss;

export { ArcgisHubDiscussionsMapIntegrator as arcgis_hub_discussions_map_integrator, ArcgisHubDiscussionsView as arcgis_hub_discussions_view };
