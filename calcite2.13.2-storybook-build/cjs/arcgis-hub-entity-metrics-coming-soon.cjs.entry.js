'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubEntityMetricsComingSoonCss = ".hub-entity-metrics-coming-soon__block-header{display:inline-flex;align-items:center;gap:0.75rem}.hub-entity-metrics-coming-soon__block-header>h2{margin:0px}p{margin-top:0px;margin-bottom:2rem}.hub-entity-metrics-coming-soon__main{display:flex;flex-direction:row}arcgis-hub-workspace-pane{--arcgis-hub-workspace-pane-main-flex-basis:40%}.hub-entity-metrics-coming-soon__side img{width:100%}";

const ArcgisHubEntityMetricsComingSoon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isMobile = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (index.h(index.Host, { "data-element": "workspace-entity-metrics-coming-soon" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, index.h("h1", { slot: "title" }, this.intl.t('header')), index.h("div", { class: "hub-entity-metrics-coming-soon__main" }, index.h("div", { class: "hub-entity-metrics-coming-soon__info" }, index.h("div", null, index.h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, index.h("calcite-icon", { icon: "pencil-square" }), index.h("h2", null, this.intl.t('firstBlockHeader'))), index.h("p", null, this.intl.t('firstBlockMessage'))), index.h("div", null, index.h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, index.h("calcite-icon", { icon: "register" }), index.h("h2", null, this.intl.t('secondBlockHeader'))), index.h("p", null, this.intl.t('secondBlockMessage'))), index.h("div", null, index.h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, index.h("calcite-icon", { icon: "graph-time-series" }), index.h("h2", null, this.intl.t('thirdBlockHeader'))), index.h("p", null, this.intl.t('thirdBlockMessage'))), index.h("arcgis-hub-workspace-link", { pane: "details" }, index.h("calcite-button", { appearance: "outline-fill", round: true }, this.intl.t('button')))), index.h("div", { class: "hub-entity-metrics-coming-soon__side", slot: "side-panel" }, index.h("img", { alt: this.intl.t('header'), class: "hub-entity-metrics-coming-soon__image", src: index.getAssetPath('./assets/metrics-placeholder-graphic.png') }))))));
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityMetricsComingSoon.style = arcgisHubEntityMetricsComingSoonCss;

exports.arcgis_hub_entity_metrics_coming_soon = ArcgisHubEntityMetricsComingSoon;
