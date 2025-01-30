'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intersectionObserver = require('./intersection-observer-622579f7.js');
const context = require('./context-0167a31e.js');
const itemUrls = require('./item-urls-b819e820.js');
const state = require('./state-6637df8c.js');
const hubSanitizer = require('./hubSanitizer-d5497b99.js');
const index$1 = require('./index-6f16fe65.js');
const resizeObserver = require('./resize-observer-4169a5e0.js');
const debounce = require('./debounce-bd990e9f.js');
const memoize = require('./memoize-1f967971.js');
const shareable = require('./shareable-36054bd4.js');
const get = require('./get-0368c931.js');
const Embeds = require('./Embeds-c8a9bd0a.js');
const util = require('./util-38e73510.js');
const intlManager = require('./intl-manager-f0103583.js');
const interfaces = require('./interfaces-fc0046ff.js');
const types = require('./types-c1b201f8.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const cacheBustUrl = require('./cacheBustUrl-e8fc7455.js');
const Metrics = require('./Metrics-b8657153.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const getIconForStatus = require('./get-icon-for-status-2e76ef1c.js');
require('./logger-5db3d659.js');
require('./store-2a385ca0.js');
require('./index-77618030.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./generate-random-string-8807d629.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-family-cafa88bb.js');
require('./IHubTimeline-228e135a.js');

// TODO: add test for functions in this file
function hasAuthCookie() {
  let result = false;
  if (isPlatformDomain()) {
    if (document.cookie.indexOf('esri_aopc') > -1) {
      result = true;
    }
  }
  return result;
}
function isPlatformDomain() {
  let result = false;
  if (window) {
    const hostname = window.location.hostname || '';
    if (hostname.indexOf('arcgis.com') > -1) {
      result = true;
    }
  }
  return result;
}
/**
 * get the correct AGO URL, based on current user session, etc
 * @param {string} url - original app URL
 * @param {object} options - session and portal info
 *
 * Purpose: Imagine we have two users, one from OrgA and one from OrgB; assume they're authed
 * when OrgB user visits OrgA.maps.arcgis.com/someapp?item=00c, the back-end reads the cookie
 * and says the user is not from OrgA, and so they can't load the app.
 * But, if they load the same item 00c, in the same app, but with OrgB.maps.arcgis.com/someapp?item=00c,
 * the back-end approves the cookie -- that's why we use convertToUserOrgUrl here.
 */
function getAgoAppUrl(url, options = {}) {
  const { isAuthenticated, hasCookie, orgBaseUrl, orgHasSSO } = options;
  let result = url;
  if (isAgoHosted(result)) {
    result = ensureHttps(result);
    if (isAuthenticated && (hasCookie || orgHasSSO)) {
      result = convertToUserOrgUrl(result, orgBaseUrl);
    }
  }
  return result;
}
/**
 * Check if the source URL is hosted on AGO
 * @param {string} src - source URL
 * @returns {boolean} - true if hosted on AGO, false otherwise
 */
function isAgoHosted(src) {
  return getHostname(src).endsWith('arcgis.com');
}
/**
 * Extract the hostname from a url
 * @param {string} src Url to process
 */
function getHostname(src) {
  const parts = src.split('/');
  let host = parts[2];
  // handle protocol-less urls
  if (src.indexOf('http') !== 0) {
    host = parts[0];
  }
  return host;
}
/**
 * Ensure a url has https protocol
 * @param {string} src Url to ensure has https protocol
 */
function ensureHttps(src) {
  let result = src;
  // only do this if it's a hosted url...
  if (isAgoHosted(src)) {
    // check for some protocol...
    if (src.indexOf('http') !== 0) {
      // protocol-less url
      result = `https://${src}`;
    }
    else if (src.indexOf(`https:`) !== 0) {
      // if it does not start w/ https, swap it out
      result = src.replace('http:', 'https:');
    }
  }
  return result;
}
/**
 * Convert an app url to use the current user's org url
 * @param {string} src Url to replace the host with the user's org's base Url
 * @param {string} orgBaseUrl Users org's base url
 */
function convertToUserOrgUrl(src, orgBaseUrl) {
  let result = src;
  // TODO: what if no orgBaseUrl passed?
  if (isAgoHosted(src) && isAgoHosted(orgBaseUrl)) {
    if (canConvertToOrgUrl(src)) {
      const base = src.split('arcgis.com')[0];
      result = src.replace(`${base}arcgis.com`, orgBaseUrl);
    }
  }
  return result;
}
/**
 * Wether a host can be swapped to an org url
 * @param {string} src Url to check if it can be upgraded
 */
function canConvertToOrgUrl(src) {
  let result = true;
  const hostname = getHostname(src);
  // hostname checks...
  [
    'survey123.', 'survey123dev.', 'survey123qa.',
    'insights.', 'insightsdev.', 'insightsqa.',
    'urban.', 'urbandev.', 'urbanqa.', 'solutions.', 'services.',
    'storymaps.', 'storymaps2dev.', 'storymaps2qa.', 'storymapsqa.', 'storymapsdev.',
    'hub.arcgis.com', 'hubqa.arcgis.com', 'hubdev.arcgis.com',
    'opendata.arcgis.com', 'opendataqa.arcgis.com', 'opendatadev.arcgis.com',
    'experience.', 'experienceqa.', 'experiencedev.',
    'livingatlas.',
    'bao.',
    'communityanalyst.',
    'hub-sandbox-compass.' // allow hub ai assistant to be embedded
  ].forEach(s => {
    if (hostname.indexOf(s) !== -1) {
      result = false;
    }
  });
  // if we passed that, then check in the url...
  if (result) {
    // check for stuff in the url...
    ['embedGallery.html'].forEach(s => {
      if (src.indexOf(s) !== -1) {
        result = false;
      }
    });
  }
  return result;
}

const arcgisHubEmbedCardCss = ".sc-arcgis-hub-embed-card-h{display:block}";

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
const DEFAULT_HEIGHT = 500;
const ArcgisHubEmbedCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.embed = undefined;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.shareableOnHover = false;
    this._isInViewport = false;
    this._mapView = undefined;
    this._viewport = undefined;
    this._iframeSrc = undefined;
    context.bind(this, 'handleIntersection', 'handleResize');
  }
  async handleMapViewReady(e) {
    e.stopPropagation();
    const { detail: { view } } = e;
    await view.when();
    //clear the default zoom controls
    view.ui.components = [];
    // Attach the view
    this._mapView = view;
  }
  async handleViewportChange() {
    var _a;
    if (["app", "feedback"].includes((_a = this._embedConfigForViewport) === null || _a === void 0 ? void 0 : _a.kind)) {
      const embed = this._embedConfigForViewport;
      try {
        const item = await get.getItem(embed.id, this._context.requestOptions);
        this._iframeSrc = this.buildIframeSrc(item, this._context);
      }
      catch (e) {
        console.error(`Failed to fetch item ${embed.id}`, e);
      }
    }
  }
  connectedCallback() {
    this.observeIntersection();
    this.observeResize();
  }
  disconnectedCallback() {
    this.unobserveIntersection();
    this.unobserveResize();
  }
  /** contextual portal and auth information */
  get _context() {
    return state.getGlobalContext();
  }
  /**
   * different embeds can be configured for different viewport
   * breakpoints (e.g. mobile, tablet, desktop). Breakpoints
   * cascade up meaning that if a tablet/desktop embed is not
   * configured, the mobile embed will be used. This getter
   * returns the embed configuration to use based on the
   * current viewport
   */
  get _embedConfigForViewport() {
    // NOTE: without this guard (or the call to handleResize
    // in the constructor), we run through this early in the
    // component lifecycle and return the mobile viewport which
    // causes us to start spinning up the (potentially) wrong embed
    if (this._viewport) {
      let viewportHierarchy = [];
      if (this._viewport === "viewportDesktop") {
        viewportHierarchy = ["viewportDesktop", "viewportTablet", "viewportMobile"];
      }
      else if (this._viewport === "viewportTablet") {
        viewportHierarchy = ["viewportTablet", "viewportMobile"];
      }
      else {
        viewportHierarchy = ["viewportMobile"];
      }
      const deviceViewport = viewportHierarchy.find(viewport => this.embed[viewport]);
      return this.embed[deviceViewport] || this.embed.viewportAll;
    }
  }
  /**
   * add intersection observer to embed element - we do this
   * to lazy load the embed when it is within the viewport
   */
  observeIntersection() {
    intersectionObserver.IntersectionObserverManager.addHandler(this.element, this.handleIntersection);
  }
  /**
   * remove intersection observer from element - we do this
   * once the element is within the viewport or if the element
   * is removed from the DOM
   */
  unobserveIntersection() {
    intersectionObserver.IntersectionObserverManager.unobserve(this.element);
  }
  /**
   * add resize observer to embed element - we do this to
   * re-render the embed when the viewport changes
   */
  observeResize() {
    resizeObserver.ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  /**
   * remove resize observer from element - we do this when
   * the element is removed from the DOM
   */
  unobserveResize() {
    resizeObserver.ResizeObserverManager.unobserve(this.element);
  }
  handleIntersection() {
    var _a;
    this._isInViewport = true;
    this.unobserveIntersection();
    this.hubTelemetry.emit(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.card.details[(_a = this.embed.viewportAll) === null || _a === void 0 ? void 0 : _a.kind]));
  }
  /**
   * handle screen reflow - different embeds can be configured
   * for different viewport breakpoints (e.g. mobile, tablet,
   * desktop), so we keep track of the current viewport size
   * and render the appropriate embed
   */
  handleResize() {
    let viewport;
    const width = window === null || window === void 0 ? void 0 : window.innerWidth;
    if (width < 560) {
      viewport = 'viewportMobile';
    }
    else if (width >= 560 && width < 980) {
      viewport = 'viewportTablet';
    }
    else if (width >= 980) {
      viewport = 'viewportDesktop';
    }
    this._viewport = viewport;
  }
  /**
  * Builds the embeded item's src for the iframe
  * @param item item to build the src for
  * @param context
  */
  buildIframeSrc(item, context) {
    let src = itemUrls.buildItemViewerUrl(item, context);
    src = itemUrls.forceHttps(src);
    // sanitize src
    src = hubSanitizer.sanitizeUrl(src);
    // build enterprise src
    const { isPortal, portalUrl } = this._context;
    if (isPortal) {
      const opts = {
        hasCookie: hasAuthCookie(),
        isAuthenticated: this._context.isAuthenticated,
        orgBaseUrl: portalUrl,
        orgHasSSO: !!this._context.portal.platformSSO
      };
      src = getAgoAppUrl(src, opts);
    }
    return src || '';
  }
  /** Render embedded map */
  renderMapEmbed(config) {
    // Set up settings for the map
    const settings = {
      baseViewItemId: [config.id]
    };
    const height = `${config.height || DEFAULT_HEIGHT}px`;
    // return the map
    return (index.h("arcgis-hub-map", { settings: settings, style: { height: height } }, index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._mapView, "view-position": "top-right" }, index.h("arcgis-hub-map-widget-search", { scale: "s", view: this._mapView })), index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._mapView, "view-position": "top-right" }, index.h("arcgis-hub-map-widget-legend", { scale: "s", view: this._mapView }), index.h("arcgis-hub-map-widget-layer-list", { scale: "s", view: this._mapView })), index.h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._mapView, "view-position": "top-right" }, index.h("arcgis-hub-map-widget-zoom", { scale: "s", view: this._mapView }), index.h("arcgis-hub-map-widget-home", { scale: "s", view: this._mapView }))));
  }
  /** Render embedded app */
  renderAppEmbed(config) {
    return (index.h("arcgis-hub-embed", { geolocation: true, height: config.height || DEFAULT_HEIGHT, isScrollable: config.isScrollable, src: this._iframeSrc }));
  }
  /** Render embedded feedback */
  renderFeedbackEmbed(config) {
    var _a, _b;
    const embed = (_a = this.embed) === null || _a === void 0 ? void 0 : _a.viewportAll;
    const { showHeader = true, showDescription = true, showFooter = true } = embed;
    const hideString = [
      'navbar',
      !showHeader && 'header',
      !showDescription && 'description',
      !showFooter && 'footer'
    ].filter(u => u).join(',');
    const src = ((_b = this._iframeSrc) === null || _b === void 0 ? void 0 : _b.includes('?'))
      ? `${this._iframeSrc}&hide=${hideString}`
      : `${this._iframeSrc}?hide=${hideString}`;
    return (index.h("arcgis-hub-embed", { geolocation: true, height: config.height || DEFAULT_HEIGHT, isScrollable: true, src: src }));
  }
  /** Render an iframe embed */
  renderExternalEmbed(config) {
    return (index.h("arcgis-hub-embed", { height: config.height || DEFAULT_HEIGHT, src: config.url }));
  }
  /** Render embed based on the kind */
  renderEmbed(config) {
    if (this._isInViewport) {
      switch (config === null || config === void 0 ? void 0 : config.kind) {
        case Embeds.EmbedKind.map:
          return this.renderMapEmbed(config);
        case Embeds.EmbedKind.external:
          return this.renderExternalEmbed(config);
        case Embeds.EmbedKind.app:
          return this._iframeSrc && this.renderAppEmbed(config);
        case Embeds.EmbedKind.feedback:
          return this._iframeSrc && this.renderFeedbackEmbed(config);
      }
    }
  }
  render() {
    // we need the immediate child of arcgis-shareable-card to have
    // a DOM element id in order to support sharing via url
    const cardId = util.createId();
    return (index.h(index.Host, { "data-element": "embed-card", id: cardId }, this._embedConfigForViewport && (index.h(shareable.Shareable, { context: this, showShareUi: true }, this.renderEmbed(this._embedConfigForViewport)))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_viewport": ["handleViewportChange"]
  }; }
};
__decorate([
  memoize.MemoizeDecoratorFactory('_viewport')
], ArcgisHubEmbedCard.prototype, "_embedConfigForViewport", null);
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubEmbedCard.prototype, "handleResize", null);
ArcgisHubEmbedCard.style = arcgisHubEmbedCardCss;

const arcgisHubEntityAboutCss = ".sc-arcgis-hub-entity-about-h{margin-top:1rem;display:flex;gap:4rem}h2.sc-arcgis-hub-entity-about{margin:0 0 0.75rem 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}p.sc-arcgis-hub-entity-about{font-size:var(--calcite-font-size-0);line-height:1.25rem}.entity-about-main.sc-arcgis-hub-entity-about{flex:2;margin-right:2rem}.entity-about-side-bar.sc-arcgis-hub-entity-about{flex:1}.entity-about-main.sc-arcgis-hub-entity-about>div.sc-arcgis-hub-entity-about:not(:last-of-type),.entity-about-side-bar.sc-arcgis-hub-entity-about>div.sc-arcgis-hub-entity-about:not(:last-of-type){margin-bottom:2.5rem}arcgis-hub-embed-card.sc-arcgis-hub-entity-about{margin-bottom:1.5rem}arcgis-hub-metric-card.sc-arcgis-hub-entity-about{min-height:15rem;height:100%}.entity-about__featured-metrics-grid.sc-arcgis-hub-entity-about{grid-template-columns:repeat(2, minmax(20rem, 1fr));display:grid;gap:2rem}.entity-about__featured-metrics.sc-arcgis-hub-entity-about calcite-button.sc-arcgis-hub-entity-about{margin-top:1.5rem}.sc-arcgis-hub-entity-about-s>[slot='main'],.sc-arcgis-hub-entity-about-s>[slot=\"sidebar\"]{margin-top:2.5rem}@media only screen and (max-width: 768px){.sc-arcgis-hub-entity-about-h{flex-direction:column;gap:0}.entity-about__featured-metrics-grid.sc-arcgis-hub-entity-about{grid-template-columns:unset}}";

const ArcgisHubEntityAbout = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubEntityAboutTabChange = index.createEvent(this, "arcgisHubEntityAboutTabChange", 7);
    /**
     * We must listen to the change in results from the gallery
     * to determine whether to render the "Featured content" section.
     * We can't simply check the length of the featuredContentIds array
     * because the current user may not have access to all of the items
     */
    this.handleFeaturedContentResultsChange = (evt) => {
      this.hasFeaturedContent = !!evt.detail.length;
    };
    this.handleTabChange = (evt) => {
      this.arcgisHubEntityAboutTabChange.emit(evt);
    };
    this.entity = undefined;
    this.path = "";
    this.hasFeaturedContent = false;
    context.bind(this, 'handleTabChange');
  }
  async componentWillLoad() {
    console.info(`Entity About: PATH: ${this.path}`);
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /** global context: contextual portal & auth information */
  get _context() { return state.getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  get view() {
    const { view = {} } = this.entity || {};
    return view;
  }
  get shouldRenderAbout() {
    var _a, _b, _c, _d;
    return !!((_a = this.entity) === null || _a === void 0 ? void 0 : _a.summary)
      || !!((_b = this.entity) === null || _b === void 0 ? void 0 : _b.description)
      || !!((_c = this.view.embeds) === null || _c === void 0 ? void 0 : _c.length)
      || !!((_d = this.view.featuredContentIds) === null || _d === void 0 ? void 0 : _d.length);
  }
  get shouldRenderStatus() {
    return !!getProp.getProp(this.entity, 'status')
      || !!this.view.timeline;
  }
  get featuredImageUrl() {
    var _a;
    const queryParams = ((_a = this._context) === null || _a === void 0 ? void 0 : _a.isAuthenticated) ? `?token=${this._context.session.token}` : '';
    return cacheBustUrl.cacheBustUrl(`${this.view.featuredImageUrl}${queryParams}`);
  }
  get metricDisplays() {
    var _a, _b;
    return ((_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.metricDisplays) === null || _b === void 0 ? void 0 : _b.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== Metrics.MetricVisibility.hidden)) || [];
  }
  get featuredMetricDisplays() {
    var _a;
    return ((_a = this.view.metricDisplays) === null || _a === void 0 ? void 0 : _a.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) === Metrics.MetricVisibility.featured)) || [];
  }
  renderAbout() {
    var _a, _b, _c;
    return (index.h("div", null, index.h("h2", null, this.intl.t("about")), ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.summary) && index.h("p", null, this.entity.summary), !!((_b = this.view.embeds) === null || _b === void 0 ? void 0 : _b.length) && index.h("arcgis-hub-embed-card", { embed: this.view.embeds[0], shareable: true, shareableOnHover: true }), ((_c = this.entity) === null || _c === void 0 ? void 0 : _c.description) && index.h("p", { innerHTML: hubSanitizer.sanitizeHtml(this.entity.description) }), this.view.featuredImageUrl && !this.view.hero && (index.h("arcgis-hub-image", { alt: this.view.featuredImageAltText || "", corners: interfaces.CORNERS.round, src: this.featuredImageUrl }))));
  }
  renderMetrics() {
    return (index.h("div", { class: "entity-about__featured-metrics" }, index.h("h2", null, this.intl.t("metrics")), index.h("div", { class: 'entity-about__featured-metrics-grid' }, this.featuredMetricDisplays.map((display) => {
      const metrics = getWithDefault.getWithDefault(this.entity, 'metrics', []);
      const metric = metrics.find((metric) => metric.id === display.metricId);
      return (index.h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, display), { scale: interfaces.SCALE.medium, border: true }), key: metric.id, metric: metric }));
    })), !!this.metricDisplays.length
      && this.metricDisplays.length !== this.featuredMetricDisplays.length
      && (index.h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": types.ViewTabs.Metrics, onClick: this.handleTabChange, round: true }, this.intl.t("exploreMetrics")))));
  }
  renderFeaturedContent() {
    const query = {
      targetEntity: 'item',
      filters: [{
          predicates: [{ id: this.view.featuredContentIds }]
        }]
    };
    return (index.h("div", null, this.hasFeaturedContent
      && index.h("h2", null, this.intl.t('featuredContent')), index.h("arcgis-hub-gallery", { layout: 'grid', limit: 4, linkTarget: "siteRelative", onArcgisHubGalleryResultsChange: this.handleFeaturedContentResultsChange, path: this.path, query: query, showEmptyState: false, sortByIds: this.view.featuredContentIds })));
  }
  renderStatus() {
    var _a;
    const status = getProp.getProp(this.entity, 'status');
    const timeline = this.view.timeline || {};
    return (index.h(index.Fragment, null, index.h("div", null, index.h("h2", null, this.intl.t(`status.label.${this.entityType}`, {}, this.intl.t('status.label.default'))), !!status && index.h("calcite-chip", { icon: status === 'complete' ? 'check' : '', scale: "l", value: status }, this.intl.t(`status.${status || 'notStarted'}`))), !!((_a = Object.keys(timeline)) === null || _a === void 0 ? void 0 : _a.length) && index.h("div", null, index.h("arcgis-hub-timeline", { canCollapse: timeline.canCollapse, description: timeline.description, stages: timeline.stages, timelineTitle: timeline.title }))));
  }
  renderMetadata() {
    return (index.h("div", { class: 'entity-view-side-bar__metadata' }, index.h("h2", null, this.intl.t('details')), index.h("arcgis-hub-entity-metadata", { entity: this.entity })));
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, { "data-element": "entity-about" }, index.h("div", { class: "entity-about-main" }, this.shouldRenderAbout && this.renderAbout(), !!((_a = this.featuredMetricDisplays) === null || _a === void 0 ? void 0 : _a.length) && this.renderMetrics(), !!((_b = this.view.featuredContentIds) === null || _b === void 0 ? void 0 : _b.length) && this.renderFeaturedContent(), index.h("slot", { name: "main" })), index.h("div", { class: 'entity-about-side-bar' }, this.shouldRenderStatus && this.renderStatus(), this.renderMetadata(), index.h("slot", { name: "sidebar" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityAbout.style = arcgisHubEntityAboutCss;

const arcgisHubTimelineCss = "*{margin:0px;padding:0px;color:var(--calcite-color-text-1);list-style:none}:host{display:block;overflow:hidden;border-radius:1rem;padding:0px}.hub-timeline__header{padding-bottom:3.5rem}h1,label{font-weight:var(--calcite-font-weight-normal)}h1{font-size:var(--calcite-font-size-3);line-height:2rem}label{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-light)}ol{background-color:var(--calcite-color-foreground-1);padding-left:1.25rem;padding-right:1.25rem}li{border-left:1px dashed #cccccc;position:relative;padding-left:1rem;padding-right:1rem;padding-bottom:1.5rem}li:last-child{border:0px;padding-bottom:0px}li calcite-icon{left:-13px;position:absolute;top:0.25rem;background-color:var(--calcite-color-foreground-1)}.stage{border:1px rgba(204, 204, 204, 0.2) solid;top:-12px;position:relative;margin-left:1.25rem;border-radius:0.75rem;padding:1rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.stage calcite-link{margin-top:0.5rem;display:block}.stage h3{font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium)}.stage span{margin-top:0.25rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-light);color:var(--calcite-color-text-3)}p{margin-top:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal)}.empty-state{height:20rem;width:100%;display:flex;align-items:center;justify-content:center}.empty-state calcite-icon{height:60%;width:60%}.collapse-expand-btn{margin-left:20px}";

const ArcgisHubTimeline = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.timelineTitle = undefined;
    this.description = undefined;
    this.stages = [];
    this.canCollapse = undefined;
    this.isCollapsed = undefined;
    context.bind(this, 'handleCollapseExpandBtnClick');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Whether we should collapse the timeline, meaning all conditions have been met
   */
  get shouldCollapse() {
    return this.canCollapse && this.stages.length >= 6;
  }
  renderStageLink(link) {
    let result;
    const { href, title } = link || {};
    if (href || title) {
      result = index.h("calcite-link", { href: href || '#' }, title || href);
    }
    return result;
  }
  handleCollapseExpandBtnClick() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.timeline);
    }
    else {
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.timeline);
    }
  }
  renderCollapseExpandIconAndBtn() {
    // Until the collapse/expand button is clicked for the first time, this.isCollapsed is undefined
    // we want to have its value align with this.shouldCollapse in this case
    if (this.isCollapsed === undefined) {
      this.isCollapsed = this.shouldCollapse;
    }
    if (this.shouldCollapse) {
      return index.h("li", null, index.h("calcite-icon", { icon: this.isCollapsed ? 'chevrons-down' : 'chevrons-up' }), index.h("calcite-link", { class: 'collapse-expand-btn', onClick: this.handleCollapseExpandBtnClick }, this.intl.t(this.isCollapsed ? 'expandTimeline' : 'collapseTimeline')));
    }
  }
  renderStages() {
    return (index.h("ol", null, this.renderFirstThreeStages(), this.renderCollapseExpandIconAndBtn(), this.renderRemainingStages()));
  }
  renderStage(stage) {
    return index.h("li", { key: stage.title }, index.h("calcite-icon", { icon: getIconForStatus.getIconForStatus(stage.status) }), index.h("div", { class: "stage" }, index.h("h3", null, stage.title), index.h("span", null, stage.timeframe), index.h("p", null, stage.stageDescription), this.renderStageLink(stage.link)));
  }
  // We render the first 3 stages regardless of the timeline is set to collapse or not
  renderFirstThreeStages() {
    return this.stages.slice(0, 3).map(stage => this.renderStage(stage));
  }
  renderLastStage() {
    return this.renderStage(this.stages[this.stages.length - 1]);
  }
  renderExpandedStages() {
    return this.stages.slice(3).map(stage => this.renderStage(stage));
  }
  /**
   * This is where we choose to render the collapsed timeline or expanded timeline
   * it is a bit tricky and can be confusing...
   * not only we have to consider whether expanded timeline should be shown
   * but we also have to consider if it should be shown, whether it's already been expanded
   * (after user clicks the 'expand timeline' button, marked by the isCollapsed flag)
   * so at the initial stage, when a timeline is first created, isCollapsed is set to align with
   * shouldCollapse, after that, it will be altered by the 'collapse/expand timeline' button
   */
  renderRemainingStages() {
    if (this.isCollapsed === undefined) {
      this.isCollapsed = this.shouldCollapse;
    }
    return this.shouldCollapse && this.isCollapsed
      ? this.renderLastStage()
      : this.renderExpandedStages();
  }
  render() {
    return (index.h(index.Host, null, (this.timelineTitle || this.description) && (index.h("div", { class: "hub-timeline__header" }, this.timelineTitle && index.h("h1", null, this.timelineTitle), this.description && index.h("label", null, this.description))), !!this.stages.length && this.renderStages()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubTimeline.style = arcgisHubTimelineCss;

exports.arcgis_hub_embed_card = ArcgisHubEmbedCard;
exports.arcgis_hub_entity_about = ArcgisHubEntityAbout;
exports.arcgis_hub_timeline = ArcgisHubTimeline;
