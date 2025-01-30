'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const interfaces = require('./interfaces-fc0046ff.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubPageMigrationResultsCss = ":host{display:block}arcgis-hub-gallery{text-align:start}[slot=\"message\"]{display:flex;flex-direction:column;gap:2rem;width:60%}";

const ArcgisHubPageMigrationResults = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.renderGallery = (query) => {
      const galleryProps = {
        corners: interfaces.CORNERS.round,
        disableTelemetry: true,
        limit: 100,
        linkTarget: 'siteRelative',
        newTab: true,
        query,
        shadow: interfaces.DROP_SHADOWS.low,
        showAdditionalInfo: false,
        showBadges: false,
        showOwner: false
      };
      return index.h("arcgis-hub-gallery", Object.assign({}, galleryProps));
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  _renderResults(which) {
    const groups = this.results.results.filter(result => result.status === which);
    if (groups.length) {
      return (index.h(index.Fragment, null, index.h("h3", null, this.intl.t(`${which}.accordionHeading`)), this.renderGroups(groups.map(result => result.groupId))));
    }
  }
  render() {
    const heading = this.intl.t(this.helpStateConfig.heading);
    const helpStateConfig = Object.assign(Object.assign({}, this.helpStateConfig), { heading });
    return (index.h(index.Host, { "data-element": "page-migration-results" }, index.h("arcgis-hub-help-state", Object.assign({}, helpStateConfig), index.h("div", { slot: "message" }, this._renderResults('success'), this._renderResults('fail')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubPageMigrationResults.style = arcgisHubPageMigrationResultsCss;

exports.arcgis_hub_page_migration_results = ArcgisHubPageMigrationResults;
