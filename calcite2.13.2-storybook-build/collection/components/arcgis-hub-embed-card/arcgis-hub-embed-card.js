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
import { EmbedKind, createId } from "@esri/hub-common";
import { Host, h } from "@stencil/core";
import { IntersectionObserverManager } from "../../utils/intersection-observer";
import { bind } from "../../utils/context";
import { getItem } from '@esri/arcgis-rest-portal';
import { buildItemViewerUrl, forceHttps } from './utils/item-urls';
import { getGlobalContext } from '../../utils/state';
import { sanitizeUrl } from '../../utils/hubSanitizer';
import { getAgoAppUrl, hasAuthCookie } from './utils/embedded-app-auth';
import { dictionary } from "@esri/telemetry-dictionary-hub";
import { ResizeObserverManager } from "../../utils/resize-observer";
import Debounce from '../../decorators/debounce';
import Memoize from '../../decorators/memoize';
import { Shareable } from "../functional/shareable";
const DEFAULT_HEIGHT = 500;
/**
 * This component renders an embed component based on the
 * kind of embed, e.g. app, map, etc.
 */
export class ArcgisHubEmbedCard {
  constructor() {
    this.embed = undefined;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.shareableOnHover = false;
    this._isInViewport = false;
    this._mapView = undefined;
    this._viewport = undefined;
    this._iframeSrc = undefined;
    bind(this, 'handleIntersection', 'handleResize');
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
        const item = await getItem(embed.id, this._context.requestOptions);
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
    return getGlobalContext();
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
    IntersectionObserverManager.addHandler(this.element, this.handleIntersection);
  }
  /**
   * remove intersection observer from element - we do this
   * once the element is within the viewport or if the element
   * is removed from the DOM
   */
  unobserveIntersection() {
    IntersectionObserverManager.unobserve(this.element);
  }
  /**
   * add resize observer to embed element - we do this to
   * re-render the embed when the viewport changes
   */
  observeResize() {
    ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  /**
   * remove resize observer from element - we do this when
   * the element is removed from the DOM
   */
  unobserveResize() {
    ResizeObserverManager.unobserve(this.element);
  }
  handleIntersection() {
    var _a;
    this._isInViewport = true;
    this.unobserveIntersection();
    this.hubTelemetry.emit(Object.assign({}, dictionary.category.interaction.action.viewed.label.card.details[(_a = this.embed.viewportAll) === null || _a === void 0 ? void 0 : _a.kind]));
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
    let src = buildItemViewerUrl(item, context);
    src = forceHttps(src);
    // sanitize src
    src = sanitizeUrl(src);
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
    return (h("arcgis-hub-map", { settings: settings, style: { height: height } }, h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._mapView, "view-position": "top-right" }, h("arcgis-hub-map-widget-search", { scale: "s", view: this._mapView })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._mapView, "view-position": "top-right" }, h("arcgis-hub-map-widget-legend", { scale: "s", view: this._mapView }), h("arcgis-hub-map-widget-layer-list", { scale: "s", view: this._mapView })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: "s", view: this._mapView, "view-position": "top-right" }, h("arcgis-hub-map-widget-zoom", { scale: "s", view: this._mapView }), h("arcgis-hub-map-widget-home", { scale: "s", view: this._mapView }))));
  }
  /** Render embedded app */
  renderAppEmbed(config) {
    return (h("arcgis-hub-embed", { geolocation: true, height: config.height || DEFAULT_HEIGHT, isScrollable: config.isScrollable, src: this._iframeSrc }));
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
    return (h("arcgis-hub-embed", { geolocation: true, height: config.height || DEFAULT_HEIGHT, isScrollable: true, src: src }));
  }
  /** Render an iframe embed */
  renderExternalEmbed(config) {
    return (h("arcgis-hub-embed", { height: config.height || DEFAULT_HEIGHT, src: config.url }));
  }
  /** Render embed based on the kind */
  renderEmbed(config) {
    if (this._isInViewport) {
      switch (config === null || config === void 0 ? void 0 : config.kind) {
        case EmbedKind.map:
          return this.renderMapEmbed(config);
        case EmbedKind.external:
          return this.renderExternalEmbed(config);
        case EmbedKind.app:
          return this._iframeSrc && this.renderAppEmbed(config);
        case EmbedKind.feedback:
          return this._iframeSrc && this.renderFeedbackEmbed(config);
      }
    }
  }
  render() {
    // we need the immediate child of arcgis-shareable-card to have
    // a DOM element id in order to support sharing via url
    const cardId = createId();
    return (h(Host, { "data-element": "embed-card", id: cardId }, this._embedConfigForViewport && (h(Shareable, { context: this, showShareUi: true }, this.renderEmbed(this._embedConfigForViewport)))));
  }
  static get is() { return "arcgis-hub-embed-card"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-embed-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-embed-card.css"]
    };
  }
  static get properties() {
    return {
      "embed": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEmbed",
          "resolved": "IHubEmbed",
          "references": {
            "IHubEmbed": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The full embed config"
        }
      },
      "shareable": {
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
          "text": "Whether the card should render a share button"
        },
        "attribute": "shareable",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByValue": {
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
          "text": "Whether the card should be shareable by copying a snippet of code with props set \"by value\""
        },
        "attribute": "shareable-by-value",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableByReference": {
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
          "text": "Whether the card should be shareable by copying a snippet of code with props set \"by reference\""
        },
        "attribute": "shareable-by-reference",
        "reflect": true,
        "defaultValue": "false"
      },
      "shareableOnHover": {
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
          "text": "Whether the share ui should be hidden by default and revealed on hover"
        },
        "attribute": "shareable-on-hover",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "_isInViewport": {},
      "_mapView": {},
      "_viewport": {},
      "_iframeSrc": {}
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
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_viewport",
        "methodName": "handleViewportChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubMapViewReady",
        "method": "handleMapViewReady",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize('_viewport')
], ArcgisHubEmbedCard.prototype, "_embedConfigForViewport", null);
__decorate([
  Debounce({ timeout: 250 })
], ArcgisHubEmbedCard.prototype, "handleResize", null);
