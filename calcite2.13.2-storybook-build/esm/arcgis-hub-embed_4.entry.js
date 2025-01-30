import { r as registerInstance, h, H as Host, c as createEvent, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { watch } from '@arcgis/core/core/reactiveUtils.js';
import HomeViewModel from '@arcgis/core/widgets/Home/HomeViewModel.js';
import { l as loadArcGisCss } from './arcgis-1e3a04cd.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import { g as getProp } from './get-prop-ec5be510.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import '@arcgis/core/config.js';

/**
   * The definitive list of origins we allow to request auth from within an iframe.
   * We also add the current org's origin to this list.
   *
   * See https://esri.github.io/arcgis-rest-js/guides/embedded-apps/ for more info.
   */
const defaultAllowedEmbeddedAuthOrigins = [
  'https://survey123.arcgis.com',
  'https://survey123dev.arcgis.com',
  'https://survey123qa.arcgis.com',
  'https://insights.arcgis.com',
  'https://insightsdev.arcgis.com',
  'https://insightsqa.arcgis.com',
  'https://urban.arcgis.com',
  'https://urbandev.arcgis.com',
  'https://urbanqa.arcgis.com',
  'https://solutions.arcgis.com',
  'https://services.arcgis.com',
  'https://storymaps.arcgis.com',
  'https://storymaps2dev.arcgis.com',
  'https://storymaps2qa.arcgis.com',
  'https://storymapsqa.arcgis.com',
  'https://storymapsdev.arcgis.com',
  'https://hub.arcgis.com',
  'https://hubqa.arcgis.com',
  'https://hubdev.arcgis.com',
  'https://opendata.arcgis.com',
  'https://opendataqa.arcgis.com',
  'https://opendatadev.arcgis.com',
  'https://experience.arcgis.com',
  'https://experienceqa.arcgis.com',
  'https://experiencedev.arcgis.com',
  'https://livingatlas.arcgis.com',
  'https://bao.arcgis.com',
  'https://communityanalyst.arcgis.com',
  'https://qaext.arcgis.com',
  'https://devext.arcgis.com',
  'https://www.arcgis.com'
];
/**
 * Add the embedded auth params to the url if the user is authenticated
 * and the url is in the list of allowed origins.
 * @param iframeUrl
 * @param portalUrl
 * @param currentOrigin
 * @param userSession
 * @returns
 */
function maybeAddEmbeddedAuth(iframeUrl, portalUrl, currentOrigin, userSession) {
  let ret = iframeUrl;
  if (!!userSession) {
    // Feb 2021
    // Many apps we iframe expect to be loaded from the current user's org url
    // i.e. myorg.maps.arcgis.com/apps/webappviewer vs notmyorg.maps.arcgis.com/apps/webappviewer
    // It's not clear why this is a requirement, but at least as of 4/2021, it was required
    // to allow users from other orgs to auth into a site and have iframed /apps load
    // This is not an issue for apps hosted on their own top level domains
    // i.e. storymaps.arcgis.com, and this is accounted for in `convertToUserOrgUrl`.
    // Oct 2023
    // In the original implementation we were using session.portal vs portalUrl
    // but we believe this correct in more scenarios
    iframeUrl = convertToUserOrgUrl(iframeUrl, origin(portalUrl));
    ret = iframeUrl;
    const allowedEmbeddedAuthOrigins = [origin(portalUrl), ...defaultAllowedEmbeddedAuthOrigins]
      .map(url => url.toLowerCase());
    const iframeOrigin = origin(iframeUrl);
    if (allowedEmbeddedAuthOrigins.includes(iframeOrigin.toLowerCase())) {
      ret = addEmbeddedAuthParams(ret, currentOrigin, userSession.portal);
      userSession.disablePostMessageAuth(); // always clear to avoid registering multiple listeners
      userSession.enablePostMessageAuth(allowedEmbeddedAuthOrigins);
    }
  }
  return ret;
}
/**
* Adds ArcGIS embedded authentication params to a URL for use in an iframe.
* See https://esri.github.io/arcgis-rest-js/guides/embedded-apps/ for more info.
*
* @param {string} url - the URL to add it to
* @param {string} origin - window.location.origin
* @param {string} portal - the portal URL
*/
function addEmbeddedAuthParams(url, origin, portal) {
  const urlWithAuthParams = new URL(url);
  urlWithAuthParams.searchParams.set('arcgis-auth-origin', origin);
  urlWithAuthParams.searchParams.set('arcgis-auth-portal', portal);
  return urlWithAuthParams.toString();
}
/**
 * Convert an app url to use the current user's org url
 * @param {string} url Url to replace the host with the user's org's base Url
 * @param {string} orgBaseUrl Users org's base url
 */
// NOTE: this is currently only exported for testing
function convertToUserOrgUrl(url, orgBaseUrl) {
  let result = url;
  // only convert if both are *.arcgis.com
  if (isAgoHosted(url) && isAgoHosted(orgBaseUrl)) {
    // can we convert it?
    if (canConvertToOrgUrl(url)) {
      // do the conversion
      const base = url.split('arcgis.com')[0];
      result = url.replace(`${base}arcgis.com`, orgBaseUrl);
    }
  }
  return result;
}
/**
 * Extract the origin from a url, using the URL constructor
 * @param url
 * @returns
 */
function origin(url) {
  return new URL(url).origin;
}
/**
 * Can a host be swapped to the current user's org url?
 * Many apps we iframe expect to be loaded from the current user's org url
 * i.e. myorg.maps.arcgis.com/apps/webappviewer vs notmyorg.maps.arcgis.com/apps/webappviewer
 * It's not clear why this is a requirement, but at least as of 4/2021, it was required
 * to allow users from other orgs to auth into a site and have iframed /apps load
 * This is not an issue for apps hosted on their own top level domains
 * i.e. storymaps.arcgis.com.
 * @param {string} url Url to check if it can be upgraded
 */
function canConvertToOrgUrl(url) {
  let result = true;
  const hostname = getHostname(url);
  // List of hostnames that we know are not org-short's
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
    'communityanalyst.'
  ].forEach(s => {
    if (hostname.includes(s)) {
      result = false;
    }
  });
  // if we passed that, then the url is an org-short
  // but there are other things which can't be swapped
  // so we have to add those checks here
  if (result) {
    ['embedGallery.html'].forEach(s => {
      if (url.includes(s)) {
        result = false;
      }
    });
  }
  return result;
}
/**
 * Extract the hostname from a url
 * @param {string} url Url to process
 */
function getHostname(url) {
  const parts = url.split('/');
  let host = parts[2];
  // handle protocol-less urls
  if (url.indexOf('http') !== 0) {
    host = parts[0];
  }
  return host;
}
/**
 * Is the url hosted on ArcGIS Online
 * @param url
 * @returns
 */
function isAgoHosted(url) {
  return getHostname(url).endsWith('arcgis.com');
}

const arcgisHubEmbedCss = ":host{display:flex}iframe{border:none;width:100%;overflow:hidden}.scrollable{overflow:scroll}";

const ArcgisHubEmbed = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.src = undefined;
    this.iframeTitle = undefined;
    this.height = 150;
    this.isScrollable = false;
    this.autoplay = false;
    this.camera = false;
    this.clipboardRead = false;
    this.clipboardWrite = false;
    this.displayCapture = false;
    this.fullscreen = false;
    this.geolocation = false;
    this.microphone = false;
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * Builds a custom allow string for the iframe
   */
  get _allow() {
    const allowList = [];
    /**
     * In the future, there could be more than one origin for some or all directives,
     * specified by the user.
     * In this case, we could pass the origins down to this component for each directive
     * as a list, and then apply them here
     *  */
    try {
      const srcOrigin = new URL(this.src).origin;
      this.autoplay && allowList.push(`autoplay ${srcOrigin};`);
      this.camera && allowList.push(`camera ${srcOrigin};`);
      this.clipboardRead && allowList.push(`clipboard-read ${srcOrigin};`);
      this.clipboardWrite && allowList.push(`clipboard-write ${srcOrigin};`);
      this.displayCapture && allowList.push(`display-capture ${srcOrigin};`);
      this.fullscreen && allowList.push(`fullscreen ${srcOrigin};`);
      this.geolocation && allowList.push(`geolocation ${srcOrigin};`);
      this.microphone && allowList.push(`microphone ${srcOrigin};`);
    }
    catch (error) {
      console.warn(error);
    }
    return allowList.join(' ');
  }
  get _iframeSrc() {
    let iframeSrc = this.src;
    // if no src is given or if there is an error loading the src, mark src as undefined
    if (!this.src) {
      iframeSrc = undefined;
    }
    // try to make a url out of src; if not, then invalid for sure
    try {
      new URL(this.src).origin;
    }
    catch (error) {
      iframeSrc = undefined;
    }
    return iframeSrc;
  }
  get embeddedAuthSrc() {
    var _a, _b;
    return maybeAddEmbeddedAuth(this._iframeSrc, (_a = this._context) === null || _a === void 0 ? void 0 : _a.portalUrl, window.location.origin, (_b = this._context) === null || _b === void 0 ? void 0 : _b.session);
  }
  // if no src is given, do not render iframe
  renderIframe() {
    return this.src && h("iframe", { allow: this._allow, class: {
        'scrollable': this.isScrollable,
      }, "data-src": this.embeddedAuthSrc, height: this.height, src: this.embeddedAuthSrc, title: this.iframeTitle });
  }
  render() {
    return (h(Host, { "data-element": "embed" }, this.renderIframe()));
  }
};
ArcgisHubEmbed.style = arcgisHubEmbedCss;

const ArcgisHubMapWidgetHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.handles = [];
    this.view = undefined;
    this.scale = 'm';
    this.disabled = undefined;
    bind(this, 'zoomToInitialExtent', 'updateState');
  }
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.loadIntlForComponent(el);
    const [intl] = await Promise.all([
      intlManager.loadIntlForComponent(el),
      this.connectViewModel()
    ]);
    this.intl = intl;
    this.connectWatch();
    loadArcGisCss();
  }
  connectedCallback() {
    this.connectWatch();
  }
  disconnectedCallback() {
    this.removeWatch();
  }
  handleViewChange(view, prevView) {
    if (view && view !== prevView) {
      this.removeWatch();
      this.connectViewModel().then(() => {
        this.connectWatch();
      });
    }
  }
  connectWatch() {
    const { view, handles, homeViewModel } = this;
    if (view && homeViewModel) {
      handles.push(watch(() => homeViewModel.state, this.updateState));
    }
  }
  removeWatch() {
    const { handles } = this;
    handles.forEach((handle) => {
      handle.remove();
    });
    this.handles = [];
  }
  async connectViewModel() {
    const { view } = this;
    if (view) {
      await view.when();
      this.homeViewModel = new HomeViewModel({
        view: view
      });
      const { state } = this.homeViewModel;
      this.updateState(state);
    }
  }
  updateState(value) {
    this.disabled = value === "disabled" || value === "going-home";
  }
  zoomToInitialExtent() {
    const { homeViewModel } = this;
    if (homeViewModel) {
      homeViewModel.go();
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.zoom.label.to), { details: "Home" }));
    }
  }
  /**
   * Sets the viewpoint of the home widget, which controls the extent that
   * the view should zoom to when the home button is clicked
   * @param viewpoint
   */
  async setViewpoint(viewpoint) {
    const { homeViewModel } = this;
    if (homeViewModel) {
      homeViewModel.viewpoint = viewpoint;
    }
  }
  render() {
    const { scale, disabled } = this;
    return (h(Host, { "data-element": "map-widget-home" }, h("arcgis-hub-map-widget-generic", { disabled: disabled, icon: 'home', onClick: this.zoomToInitialExtent, scale: scale, text: this.intl.t('home') })));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "view": ["handleViewChange"]
  }; }
};

const arcgisHubMapWidgetLayerListCss = ":host{display:block}calcite-panel{height:inherit}calcite-panel div{background-color:var(--calcite-ui-foreground-1)}.esri-layer-list__service,.esri-layer-list__service>.esri-widget__heading{color:var(--calcite-ui-text-1)}.hub-widget-layer-list{min-width:none !important;max-width:none !important;padding:0px}calcite-panel[closed]{display:none}@media only screen and (min-width: 640px){.hub-widget-layer-list.top{position:absolute}.hub-widget-layer-list.top{width:25rem}.hub-widget-layer-list.top{padding:0px}.hub-widget-layer-list.top{max-height:calc(var(--panel-height) - 2rem)}.hub-widget-layer-list.bottom{position:absolute}.hub-widget-layer-list.bottom{width:25rem}.hub-widget-layer-list.bottom{padding:0px}.hub-widget-layer-list.bottom{bottom:calc(var(--bottom-offset) - 2rem);max-height:calc(var(--panel-height) - 1rem)}.hub-widget-layer-list.right{right:100%}.hub-widget-layer-list.right{margin-right:1rem}.hub-widget-layer-list.left{left:100%}.hub-widget-layer-list.left{margin-left:1rem}.hub-widget-layer-list.bottom.left{margin-left:0.5rem}.hub-widget-layer-list.bottom.right{margin-right:0.5rem}}@media only screen and (max-width: 640px){.hub-widget-layer-list.top{position:absolute}.hub-widget-layer-list.top{z-index:50}.hub-widget-layer-list.top{padding:0px}.hub-widget-layer-list.top{top:calc(var(--panel-height) - var(--panel-height-mobile) + var(--top-offset) - 1rem);width:calc(var(--view-width) + 1px);display:var(--mobile-display);height:var(--panel-height-mobile)}.hub-widget-layer-list.bottom{position:absolute}.hub-widget-layer-list.bottom{z-index:50}.hub-widget-layer-list.bottom{padding:0px}.hub-widget-layer-list.bottom{bottom:calc(var(--panel-height-mobile) - var(--panel-height) - var(--bottom-offset) - 1rem);width:calc(var(--view-width) + 1px);display:var(--mobile-display);height:var(--panel-height-mobile)}.hub-widget-layer-list.right{right:-1rem}.hub-widget-layer-list.left{left:-1rem}}";

const ArcgisHubMapWidgetLayerList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWidgetPanelToggled = createEvent(this, "arcgisHubWidgetPanelToggled", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.scale = 'm';
    this.view = undefined;
    this.showZoomAction = true;
    this.showRemoveAction = true;
    this.showLegend = true;
    this.active = undefined;
    this.bottomOffset = 0;
    this.topOffset = 0;
    this.closed = true;
    this.viewHeight = undefined;
    this.viewHeightWithOffset = undefined;
    this.viewWidth = undefined;
    bind(this, 'toggleClosed', 'setPanelHeight', 'handleSetPanelRef', 'handleSetWidgetRef');
  }
  async componentWillLoad() {
    const { el } = this;
    const parentContainer = el && el.closest('arcgis-hub-map-widget-container');
    this.viewPosition = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.viewPosition;
    this.intl = await intlManager.loadIntlForComponent(el);
  }
  async componentDidLoad() {
    const { view } = this;
    if (view) {
      this.addWidget();
    }
    loadArcGisCss();
  }
  addWidgetToView(view, prevView) {
    if (view && view !== prevView) {
      this.addWidget();
    }
  }
  updateViewHeightWhenOpen() {
    const { closed } = this;
    this.active = !closed;
    if (this.active) {
      this.setPanelHeight();
    }
  }
  emitEventOnActiveChange(active) {
    const details = active
      ? dist.dictionary.category.interaction.action.open.label.panel.details.layerList
      : dist.dictionary.category.interaction.action.close.label.panel.details.layerList;
    this.hubTelemetry.emit(details);
  }
  handleCalcitePanelDismissedChange(event) {
    event.stopPropagation();
    const panelClosed = event.target.closed;
    this.arcgisHubWidgetPanelToggled.emit(panelClosed);
  }
  handlePanelToggled(event) {
    const { target, detail: panelClosed } = event;
    const { el } = this;
    // panel is dismissible by clicking 'x' in header
    if (target === el) {
      this.closed = panelClosed;
    }
    else if (!panelClosed) {
      // only 1 widget open at a time
      this.closed = true;
    }
  }
  handleSetPanelRef(panelEl) {
    if (panelEl) {
      // empty previous panel content, otherwise it will append
      // to the existing content
      panelEl.innerHTML = '';
      this.panelEl = panelEl;
    }
  }
  handleSetWidgetRef(layerListEl) {
    if (layerListEl) {
      this.layerListEl = layerListEl;
    }
  }
  toggleClosed() {
    this.closed = !this.closed;
  }
  setPanelHeight() {
    const { layerListEl, view: { size, container } } = this;
    if (!container) {
      return;
    }
    const [viewWidth, viewHeight] = size;
    this.viewHeight = viewHeight;
    this.viewWidth = viewWidth;
    const { top: viewTop, bottom: viewBottom } = container.getBoundingClientRect();
    const { top: widgetTop, bottom: widgetBottom } = layerListEl.getBoundingClientRect();
    this.topOffset = widgetTop - viewTop;
    if (this.viewPosition.includes('top')) {
      this.viewHeightWithOffset = viewHeight - this.topOffset;
    }
    else {
      this.bottomOffset = viewBottom - widgetBottom;
      this.viewHeightWithOffset = viewHeight - this.bottomOffset;
    }
  }
  async addWidget() {
    const { layerList, view, panelEl: container, actions } = this;
    if (view && container && !layerList) {
      await view.when();
      this.layerList = new LayerList({
        view: view,
        // TODO: when we bump to 4.29, we can add dragEnabled: true
        // to allow for reordering of layers as defined in the original
        // AC: https://devtopia.esri.com/dc/hub/issues/10915
        container,
        listItemCreatedFunction: async (event) => {
          const item = event.item;
          await item.layer.when();
          item.actionsSections = [actions];
          if (item.layer.type !== "group" && this.showLegend) {
            item.panel = {
              content: "legend",
              open: false // by defualt the legend is collapsed, although we may want to add this as a prop later
            };
          }
        }
      });
      this.layerList.on("trigger-action", (event) => {
        const { action: { id }, item: { layer } } = event;
        if (id === "full-extent") {
          // get the extent of the portal item if it exists, otherwise use the layer extent
          const itemExtent = getProp(layer, "portalItem.extent");
          const layerExtent = getProp(layer, "fullExtent");
          this.view.goTo(itemExtent || layerExtent);
        }
        else if (id === "remove") {
          this.view.map.remove(layer);
        }
      });
      watch(() => view.size, this.setPanelHeight);
    }
  }
  /**
   * Actions to be displayed in the layer list
   * @returns {__esri.ActionButton[]}
   */
  get actions() {
    const actions = [];
    if (this.showZoomAction) {
      actions.push({
        title: this.intl.t('actionZoomTo'),
        className: "esri-icon-zoom-out-fixed",
        id: "full-extent"
      });
    }
    if (this.showRemoveAction) {
      actions.push({
        title: this.intl.t('actionRemove'),
        className: "esri-icon-close",
        id: "remove"
      });
    }
    return actions;
  }
  get positionClass() {
    const { viewPosition } = this;
    if (!viewPosition) {
      return;
    }
    return `hub-widget-layer-list ${viewPosition.split('-').join(' ')}`;
  }
  get styles() {
    const { viewHeight, viewWidth, viewHeightWithOffset, bottomOffset, topOffset, active } = this;
    let mobileMaxHeight = 640;
    if (mobileMaxHeight > viewHeight) {
      mobileMaxHeight = viewHeight;
    }
    return {
      '--panel-height': `${viewHeightWithOffset}px`,
      '--panel-height-mobile': `${mobileMaxHeight}px`,
      '--view-width': `${viewWidth}px`,
      '--bottom-offset': `${bottomOffset}px`,
      '--top-offset': `${topOffset}px`,
      '--mobile-display': active ? 'flex' : 'none'
    };
  }
  get _messageOverrides() {
    return {
      close: this.intl.t('textClose')
    };
  }
  render() {
    const { styles, positionClass, closed, active, scale } = this;
    const heading = this.intl.t(`heading`);
    const textOpen = this.intl.t(`textOpen`);
    const textClose = this.intl.t(`textClose`);
    return (h(Host, { "data-element": "map-widget-layer-list", style: styles }, h("calcite-panel", { class: positionClass, closable: true, closed: closed, heading: heading, messageOverrides: this._messageOverrides, ref: this.handleSetPanelRef }), h("arcgis-hub-map-widget-generic", { active: active, icon: 'layers', onClick: this.toggleClosed, ref: this.handleSetWidgetRef, scale: scale, text: active ? textClose : textOpen })));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "view": ["addWidgetToView"],
    "closed": ["updateViewHeightWhenOpen"],
    "active": ["emitEventOnActiveChange"]
  }; }
};
ArcgisHubMapWidgetLayerList.style = arcgisHubMapWidgetLayerListCss;

const arcgisHubMapWidgetLegendCss = ":host{display:block}calcite-panel{height:inherit}calcite-panel div{background-color:var(--calcite-color-foreground-1)}.esri-legend__service,.esri-legend__service>.esri-widget__heading{color:var(--calcite-color-text-1)}.hub-widget-legend{min-width:none !important;max-width:none !important;padding:0px}calcite-panel[closed]{display:none}@media only screen and (min-width: 640px){.hub-widget-legend.top{position:absolute}.hub-widget-legend.top{width:25rem}.hub-widget-legend.top{padding:0px}.hub-widget-legend.top{max-height:calc(var(--panel-height) - 2rem)}.hub-widget-legend.bottom{position:absolute}.hub-widget-legend.bottom{width:25rem}.hub-widget-legend.bottom{padding:0px}.hub-widget-legend.bottom{bottom:calc(var(--bottom-offset) - 2rem);max-height:calc(var(--panel-height) - 1rem)}.hub-widget-legend.right{right:100%}.hub-widget-legend.right{margin-right:1rem}.hub-widget-legend.left{left:100%}.hub-widget-legend.left{margin-left:1rem}.hub-widget-legend.bottom.left{margin-left:0.5rem}.hub-widget-legend.bottom.right{margin-right:0.5rem}}@media only screen and (max-width: 640px){.hub-widget-legend.top{position:absolute}.hub-widget-legend.top{z-index:50}.hub-widget-legend.top{padding:0px}.hub-widget-legend.top{top:calc(var(--panel-height) - var(--panel-height-mobile) + var(--top-offset) - 1rem);width:calc(var(--view-width) + 1px);display:var(--mobile-display);height:var(--panel-height-mobile)}.hub-widget-legend.bottom{position:absolute}.hub-widget-legend.bottom{z-index:50}.hub-widget-legend.bottom{padding:0px}.hub-widget-legend.bottom{bottom:calc(var(--panel-height-mobile) - var(--panel-height) - var(--bottom-offset) - 1rem);width:calc(var(--view-width) + 1px);display:var(--mobile-display);height:var(--panel-height-mobile)}.hub-widget-legend.right{right:-1rem}.hub-widget-legend.left{left:-1rem}}";

const ArcgisHubMapWidgetLegend = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWidgetPanelToggled = createEvent(this, "arcgisHubWidgetPanelToggled", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.scale = 'm';
    this.view = undefined;
    this.active = undefined;
    this.bottomOffset = 0;
    this.topOffset = 0;
    this.closed = true;
    this.viewHeight = undefined;
    this.viewHeightWithOffset = undefined;
    this.viewWidth = undefined;
    bind(this, 'toggleClosed', 'setPanelHeight', 'handleSetPanelRef', 'handleSetWidgetRef');
  }
  async componentWillLoad() {
    const { el } = this;
    const parentContainer = el && el.closest('arcgis-hub-map-widget-container');
    this.viewPosition = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.viewPosition;
    this.intl = await intlManager.loadIntlForComponent(el);
  }
  async componentDidLoad() {
    const { view } = this;
    if (view) {
      this.addWidget();
    }
    loadArcGisCss();
  }
  addWidgetToView(view, prevView) {
    if (view && view !== prevView) {
      this.addWidget();
    }
  }
  updateViewHeightWhenOpen() {
    const { closed } = this;
    this.active = !closed;
    if (this.active) {
      this.setPanelHeight();
    }
  }
  emitEventOnActiveChange(active) {
    const details = active
      ? dist.dictionary.category.interaction.action.open.label.panel.details.legend
      : dist.dictionary.category.interaction.action.close.label.panel.details.legend;
    this.hubTelemetry.emit(details);
  }
  handleCalcitePanelDismissedChange(event) {
    event.stopPropagation();
    const panelClosed = event.target.closed;
    this.arcgisHubWidgetPanelToggled.emit(panelClosed);
  }
  handlePanelToggled(event) {
    const { target, detail: panelClosed } = event;
    const { el } = this;
    // panel is dismissible by clicking 'x' in header
    if (target === el) {
      this.closed = panelClosed;
    }
    else if (!panelClosed) {
      // only 1 widget open at a time
      this.closed = true;
    }
  }
  handleSetPanelRef(panelEl) {
    if (panelEl) {
      this.panelEl = panelEl;
    }
  }
  handleSetWidgetRef(legendEl) {
    if (legendEl) {
      this.legendEl = legendEl;
    }
  }
  toggleClosed() {
    this.closed = !this.closed;
  }
  setPanelHeight() {
    const { legendEl, view: { size, container } } = this;
    if (!container) {
      return;
    }
    const [viewWidth, viewHeight] = size;
    this.viewHeight = viewHeight;
    this.viewWidth = viewWidth;
    const { top: viewTop, bottom: viewBottom } = container.getBoundingClientRect();
    const { top: widgetTop, bottom: widgetBottom } = legendEl.getBoundingClientRect();
    this.topOffset = widgetTop - viewTop;
    if (this.viewPosition.includes('top')) {
      this.viewHeightWithOffset = viewHeight - this.topOffset;
    }
    else {
      this.bottomOffset = viewBottom - widgetBottom;
      this.viewHeightWithOffset = viewHeight - this.bottomOffset;
    }
  }
  async addWidget() {
    const { legend, view, panelEl: container } = this;
    if (view && container && !legend) {
      await view.when();
      this.legend = new Legend({
        view: view,
        container
      });
      watch(() => view.size, this.setPanelHeight);
    }
  }
  get positionClass() {
    const { viewPosition } = this;
    if (!viewPosition) {
      return;
    }
    return `hub-widget-legend ${viewPosition.split('-').join(' ')}`;
  }
  get styles() {
    const { viewHeight, viewWidth, viewHeightWithOffset, bottomOffset, topOffset, active } = this;
    let mobileMaxHeight = 640;
    if (mobileMaxHeight > viewHeight) {
      mobileMaxHeight = viewHeight;
    }
    return {
      '--panel-height': `${viewHeightWithOffset}px`,
      '--panel-height-mobile': `${mobileMaxHeight}px`,
      '--view-width': `${viewWidth}px`,
      '--bottom-offset': `${bottomOffset}px`,
      '--top-offset': `${topOffset}px`,
      '--mobile-display': active ? 'flex' : 'none'
    };
  }
  get _messageOverrides() {
    return {
      close: this.intl.t('textClose')
    };
  }
  render() {
    const { styles, positionClass, closed, active, scale } = this;
    const heading = this.intl.t(`heading`);
    const textOpen = this.intl.t(`textOpen`);
    const textClose = this.intl.t(`textClose`);
    return (h(Host, { "data-element": "map-widget-legend", style: styles }, h("calcite-panel", { class: positionClass, closable: true, closed: closed, heading: heading, messageOverrides: this._messageOverrides, ref: this.handleSetPanelRef }), h("arcgis-hub-map-widget-generic", { active: active, icon: 'legend', onClick: this.toggleClosed, ref: this.handleSetWidgetRef, scale: scale, text: active ? textClose : textOpen })));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "view": ["addWidgetToView"],
    "closed": ["updateViewHeightWhenOpen"],
    "active": ["emitEventOnActiveChange"]
  }; }
};
ArcgisHubMapWidgetLegend.style = arcgisHubMapWidgetLegendCss;

export { ArcgisHubEmbed as arcgis_hub_embed, ArcgisHubMapWidgetHome as arcgis_hub_map_widget_home, ArcgisHubMapWidgetLayerList as arcgis_hub_map_widget_layer_list, ArcgisHubMapWidgetLegend as arcgis_hub_map_widget_legend };
