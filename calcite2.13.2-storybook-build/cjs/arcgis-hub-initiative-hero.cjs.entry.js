'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const cacheBustUrl = require('./cacheBustUrl-e8fc7455.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const hubSearch = require('./hubSearch-79d30702.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
var EntityViewTabs;
(function (EntityViewTabs) {
  EntityViewTabs["OVERVIEW"] = "overview";
  EntityViewTabs["PROJECTS"] = "projects";
  EntityViewTabs["METRICS"] = "metrics";
  EntityViewTabs["CONTENT"] = "content";
})(EntityViewTabs || (EntityViewTabs = {}));

const arcgisHubInitiativeHeroCss = ".sc-arcgis-hub-initiative-hero-h{display:block;overflow:hidden;transition:height 0.5s ease-out}.initiative-hero__main.sc-arcgis-hub-initiative-hero img.sc-arcgis-hub-initiative-hero{width:100%;object-fit:cover}.initiative-hero__header.sc-arcgis-hub-initiative-hero{margin-top:0.75rem;font-size:var(--calcite-font-size-4);line-height:2.5rem;font-weight:var(--calcite-font-weight-medium)}@media (prefers-reduced-motion){.initiative-hero__main.sc-arcgis-hub-initiative-hero{transition:none}}@media only screen and (min-width: 758px){.initiative-hero__main.sc-arcgis-hub-initiative-hero arcgis-hub-gallery.sc-arcgis-hub-initiative-hero,.initiative-hero__main.sc-arcgis-hub-initiative-hero img.sc-arcgis-hub-initiative-hero{height:475px}.sc-arcgis-hub-initiative-hero-h{height:535px}}@media only screen and (max-width: 768px){.initiative-hero__main.sc-arcgis-hub-initiative-hero arcgis-hub-gallery.sc-arcgis-hub-initiative-hero{height:50vh}.featured-image.sc-arcgis-hub-initiative-hero img.sc-arcgis-hub-initiative-hero{height:32vh}}";

const ArcgisHubInitiativeHero = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  get _context() { return state.getGlobalContext(); }
  /** query for the initiative itself */
  get _initiativeQuery() {
    var _a;
    return {
      targetEntity: 'item',
      filters: [{
          predicates: [{
              id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id
            }]
        }]
    };
  }
  /** initiative view featured image url */
  get featuredImageUrl() {
    var _a, _b, _c;
    const queryParams = ((_a = this._context) === null || _a === void 0 ? void 0 : _a.isAuthenticated) ? `?token=${this._context.session.token}` : '';
    return cacheBustUrl.cacheBustUrl(`${(_c = (_b = this.entity) === null || _b === void 0 ? void 0 : _b.view) === null || _c === void 0 ? void 0 : _c.featuredImageUrl}${queryParams}`);
  }
  get mapSettings() {
    return getProp.getProp(this.entity, 'view.mapSettings');
  }
  async componentWillLoad() {
    const [intl] = await Promise.all([intlManager.intlManager.loadIntlForComponent(this.element), this.init()]);
    this.intl = intl;
  }
  ;
  async init() {
    // build the query to fetch the initiative's associated projects
    this._associatedProjectsQuery = this.entity && await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(this.entity, "project", this._context);
    // fetch the initiative's associated projects to get the total count -
    // we use this to conditionally render the "Associated Projects" section
    // and overflow pattern when there are > 4 associated projects
    if (this._associatedProjectsQuery) {
      const { results = [] } = await hubSearch.hubSearch(this._associatedProjectsQuery, { requestOptions: this._context.hubRequestOptions });
      // check to see if any of the associated projects have a location set
      const projectsWithLocation = results.filter(project => project.location && project.location.type !== 'none');
      this._associatedProjectsHaveLocation = !!projectsWithLocation.length;
    }
  }
  get mapGalleryQuery() {
    let query = this._initiativeQuery;
    // combined: we show the inititative and the projects
    // TODO: there's probably a better way to do this...but it's technically possible today to show both
    if (this._associatedProjectsHaveLocation) {
      query = this._associatedProjectsQuery;
    }
    return query;
  }
  /** Renders the map within the hero if the map should be rendered */
  renderMap() {
    return (index.h("arcgis-hub-gallery", { api: "hub", disableMapMouseWheelZoom: true, expand: 2, layout: "map", linkTarget: "siteRelative", mapSettings: this.mapSettings, query: this.mapGalleryQuery, showEmptyState: false, showFacets: false, showResults: false }, index.h("arcgis-skeleton-loader", { active: true, "show-thumbnail": true, slot: "loading-screen" })));
  }
  /** renders the initiative's featured image */
  renderFeaturedImage() {
    var _a, _b;
    return (index.h("img", { alt: ((_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.featuredImageAltText) || this.intl.t('featuredImageFallbackAltText'), src: this.featuredImageUrl }));
  }
  renderHero() {
    var _a, _b, _c, _d;
    if (((_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.hero) === 'map') {
      return (index.h("div", { class: "initiative-hero__main" }, this.renderMap()));
    }
    else {
      if ((_d = (_c = this.entity) === null || _c === void 0 ? void 0 : _c.view) === null || _d === void 0 ? void 0 : _d.featuredImageUrl) {
        return (index.h("div", { class: "initiative-hero__main" }, this.renderFeaturedImage()));
      }
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-hero" }, this.renderHero(), index.h("h1", { class: "initiative-hero__header" }, this.entity.name)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubInitiativeHero.style = arcgisHubInitiativeHeroCss;

exports.arcgis_hub_initiative_hero = ArcgisHubInitiativeHero;
