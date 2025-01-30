import { r as registerInstance, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CORNERS, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubPageMigrationResultsCss = ":host{display:block}arcgis-hub-gallery{text-align:start}[slot=\"message\"]{display:flex;flex-direction:column;gap:2rem;width:60%}";

const ArcgisHubPageMigrationResults = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.renderGallery = (query) => {
      const galleryProps = {
        corners: CORNERS.round,
        disableTelemetry: true,
        limit: 100,
        linkTarget: 'siteRelative',
        newTab: true,
        query,
        shadow: DROP_SHADOWS.low,
        showAdditionalInfo: false,
        showBadges: false,
        showOwner: false
      };
      return h("arcgis-hub-gallery", Object.assign({}, galleryProps));
    };
    this.renderGroups = (groupIds) => {
      const query = {
        filters: [
          {
            predicates: [
              {
                id: groupIds
              }
            ]
          }
        ],
        targetEntity: 'group'
      };
      return this.renderGallery(query);
    };
    this.results = undefined;
    this.icon = undefined;
    this.helpStateConfig = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  _renderResults(which) {
    const groups = this.results.results.filter(result => result.status === which);
    if (groups.length) {
      return (h(Fragment, null, h("h3", null, this.intl.t(`${which}.accordionHeading`)), this.renderGroups(groups.map(result => result.groupId))));
    }
  }
  render() {
    const heading = this.intl.t(this.helpStateConfig.heading);
    const helpStateConfig = Object.assign(Object.assign({}, this.helpStateConfig), { heading });
    return (h(Host, { "data-element": "page-migration-results" }, h("arcgis-hub-help-state", Object.assign({}, helpStateConfig), h("div", { slot: "message" }, this._renderResults('success'), this._renderResults('fail')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubPageMigrationResults.style = arcgisHubPageMigrationResultsCss;

export { ArcgisHubPageMigrationResults as arcgis_hub_page_migration_results };
