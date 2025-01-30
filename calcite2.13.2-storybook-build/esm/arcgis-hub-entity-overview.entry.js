import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubEntityOverviewCss = ":host{display:block;height:100%}";

const ArcgisHubEntityOverview = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  renderMetadata() {
    return (h("div", null, h("h3", null, this.intl.t("metadata.details")), h("arcgis-hub-entity-metadata", { entity: this.entity, exclude: ['access'] })));
  }
  render() {
    return (h(Host, { "data-element": "entity-overview" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t('overview')), h("div", null, "A PLACEHOLDER FOR THE MAIN CONTENT"), h("div", { slot: "side-panel" }, this.renderMetadata()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityOverview.style = arcgisHubEntityOverviewCss;

export { ArcgisHubEntityOverview as arcgis_hub_entity_overview };
