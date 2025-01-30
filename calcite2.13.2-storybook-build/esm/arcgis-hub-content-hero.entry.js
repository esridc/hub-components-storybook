import { r as registerInstance, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { R as ResizeObserverManager } from './resize-observer-dc6e269e.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const SLOTS = {
  header: "header",
  main: "main",
  footerStart: "footer-start",
  footerEnd: "footer-end"
};

const arcgisHubContentHeroCss = ".sc-arcgis-hub-content-hero-h{display:flex}.vertical.sc-arcgis-hub-content-hero-h{display:block}.hero-media.sc-arcgis-hub-content-hero{display:flex;align-items:center}arcgis-hub-map.sc-arcgis-hub-content-hero{height:300px;aspect-ratio:200 / 133;width:100%}.hero-thumbnail.sc-arcgis-hub-content-hero{height:300px;width:auto;object-fit:contain;object-position:left}.vertical.sc-arcgis-hub-content-hero-h .hero-thumbnail.sc-arcgis-hub-content-hero{height:auto;width:100%}@media only screen and (min-width: 768px){.hero-media.sc-arcgis-hub-content-hero{margin-right:1.5rem}}.hero-content.sc-arcgis-hub-content-hero{display:grid;flex-grow:1;padding-top:0.75rem;padding-bottom:1rem;grid-template-columns:1fr auto;grid-template-rows:auto 1fr auto;grid-template-areas:\"header header\"\n    \"main main\"\n    \"footer-start footer-end\"}.no-media.sc-arcgis-hub-content-hero-h .hero-content.sc-arcgis-hub-content-hero{padding-left:0px;padding-right:0px}.vertical.sc-arcgis-hub-content-hero-h .hero-content.sc-arcgis-hub-content-hero{padding-left:0px;padding-right:0px}@media only screen and (max-width: 768px){.vertical.sc-arcgis-hub-content-hero-h .hero-content.sc-arcgis-hub-content-hero{padding-left:1rem;padding-right:1rem}}.hero-header.sc-arcgis-hub-content-hero{grid-area:header}.hero-header.sc-arcgis-hub-content-hero h1.sc-arcgis-hub-content-hero{font-size:var(--calcite-font-size-4);line-height:2.5rem;font-weight:var(--calcite-font-weight-medium)}.vertical.sc-arcgis-hub-content-hero-h .hero-header.sc-arcgis-hub-content-hero{padding-top:1.5rem}.hero-main.sc-arcgis-hub-content-hero{grid-area:main;padding-bottom:1.5rem}.hero-footer-start.sc-arcgis-hub-content-hero{grid-area:footer-start}.hero-footer-start.sc-arcgis-hub-content-hero-s>calcite-button,.hero-footer-start .sc-arcgis-hub-content-hero-s>calcite-button{margin-right:0.5rem}.hero-footer-end.sc-arcgis-hub-content-hero{grid-area:footer-end;display:flex;justify-content:flex-end}.hero-footer-end.sc-arcgis-hub-content-hero-s>calcite-button,.hero-footer-end .sc-arcgis-hub-content-hero-s>calcite-button{margin-left:0.5rem}";

const ArcgisHubContentHero = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heroTitle = undefined;
    this.thumbnailUrl = undefined;
    this.basemap = undefined;
    this.extent = undefined;
    this.graphics = undefined;
    this.showMap = true;
    this.mapSettings = undefined;
    this.orientationClass = '';
    bind(this, 'handleResize');
  }
  /**
   * if a thumbnailUrl is provided, we append a w=800
   * query parameter to render the highest quality
   * thumbnail possible
   */
  get _thumbnailUrl() {
    let url = '';
    if (this.thumbnailUrl) {
      const updatedUrl = new URL(this.thumbnailUrl);
      updatedUrl.searchParams.set('w', '800');
      url = updatedUrl.toString();
    }
    return url;
  }
  get mediaClass() {
    let val = "no-media";
    if (this._thumbnailUrl) {
      val = "thumbnail-media";
    }
    else if (this.extent) {
      val = "map-media";
    }
    return val;
  }
  /**
   * concatenated classes to apply to the host element
   */
  get hostClass() {
    return (this.mediaClass + ' ' + this.orientationClass).trim();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  connectedCallback() {
    ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  /**
   * handle screen reflow - for mobile, we should switch the orientation
   * of the hero so that the thumbnail/extent is above the hero content
   */
  async handleResize() {
    this.orientationClass = this.element.clientWidth < 768 ? 'vertical' : '';
  }
  renderMedia() {
    let media = null;
    if (this._thumbnailUrl) {
      media = this.renderThumbnail(this._thumbnailUrl);
    }
    else if (this.extent && this.showMap) {
      media = this.renderMap();
    }
    return h("div", { class: "hero-media" }, media);
  }
  renderThumbnail(thumbnailUrl) {
    // TODO: use the arcgis-hub-image component once styling is resolved
    return (h("img", { alt: this.intl.t("thumbnail"), class: "hero-thumbnail", slot: "thumbnail", src: thumbnailUrl }));
  }
  renderMap() {
    return (h("arcgis-hub-map", { basemap: this.basemap, expand: 1.5, extent: this.extent, graphics: this.graphics, settings: this.mapSettings }));
  }
  renderHeader() {
    return h("div", { class: "hero-header" }, this.heroTitle && h("h1", null, this.heroTitle), h("slot", { name: SLOTS.header }));
  }
  ;
  renderMain() {
    return h("div", { class: "hero-main" }, h("slot", { name: SLOTS.main }));
  }
  renderFooter() {
    return (h(Fragment, null, h("div", { class: "hero-footer-start" }, h("slot", { name: SLOTS.footerStart })), h("div", { class: "hero-footer-end" }, h("slot", { name: SLOTS.footerEnd }))));
  }
  render() {
    return (h(Host, { class: this.hostClass, "data-element": "content-hero" }, this.renderMedia(), h("div", { class: "hero-content" }, this.renderHeader(), this.renderMain(), this.renderFooter())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubContentHero.style = arcgisHubContentHeroCss;

export { ArcgisHubContentHero as arcgis_hub_content_hero };
