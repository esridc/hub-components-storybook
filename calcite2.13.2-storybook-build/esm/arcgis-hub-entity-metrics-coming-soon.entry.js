import { r as registerInstance, h, d as getAssetPath, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubEntityMetricsComingSoonCss = ".hub-entity-metrics-coming-soon__block-header{display:inline-flex;align-items:center;gap:0.75rem}.hub-entity-metrics-coming-soon__block-header>h2{margin:0px}p{margin-top:0px;margin-bottom:2rem}.hub-entity-metrics-coming-soon__main{display:flex;flex-direction:row}arcgis-hub-workspace-pane{--arcgis-hub-workspace-pane-main-flex-basis:40%}.hub-entity-metrics-coming-soon__side img{width:100%}";

const ArcgisHubEntityMetricsComingSoon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isMobile = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (h(Host, { "data-element": "workspace-entity-metrics-coming-soon" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("h1", { slot: "title" }, this.intl.t('header')), h("div", { class: "hub-entity-metrics-coming-soon__main" }, h("div", { class: "hub-entity-metrics-coming-soon__info" }, h("div", null, h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, h("calcite-icon", { icon: "pencil-square" }), h("h2", null, this.intl.t('firstBlockHeader'))), h("p", null, this.intl.t('firstBlockMessage'))), h("div", null, h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, h("calcite-icon", { icon: "register" }), h("h2", null, this.intl.t('secondBlockHeader'))), h("p", null, this.intl.t('secondBlockMessage'))), h("div", null, h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, h("calcite-icon", { icon: "graph-time-series" }), h("h2", null, this.intl.t('thirdBlockHeader'))), h("p", null, this.intl.t('thirdBlockMessage'))), h("arcgis-hub-workspace-link", { pane: "details" }, h("calcite-button", { appearance: "outline-fill", round: true }, this.intl.t('button')))), h("div", { class: "hub-entity-metrics-coming-soon__side", slot: "side-panel" }, h("img", { alt: this.intl.t('header'), class: "hub-entity-metrics-coming-soon__image", src: getAssetPath('./assets/metrics-placeholder-graphic.png') }))))));
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityMetricsComingSoon.style = arcgisHubEntityMetricsComingSoonCss;

export { ArcgisHubEntityMetricsComingSoon as arcgis_hub_entity_metrics_coming_soon };
