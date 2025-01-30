'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubEntityOverviewCss = ":host{display:block;height:100%}";

const ArcgisHubEntityOverview = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  renderMetadata() {
    return (index.h("div", null, index.h("h3", null, this.intl.t("metadata.details")), index.h("arcgis-hub-entity-metadata", { entity: this.entity, exclude: ['access'] })));
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-overview" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this.intl.t('overview')), index.h("div", null, "A PLACEHOLDER FOR THE MAIN CONTENT"), index.h("div", { slot: "side-panel" }, this.renderMetadata()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityOverview.style = arcgisHubEntityOverviewCss;

exports.arcgis_hub_entity_overview = ArcgisHubEntityOverview;
