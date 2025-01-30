import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { c as cacheBustUrl } from './cacheBustUrl-082c34f5.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { d as getAssociatedEntitiesQuery } from './getAssociatedEntitiesQuery-a2536649.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

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
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  get _context() { return getGlobalContext(); }
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
    return cacheBustUrl(`${(_c = (_b = this.entity) === null || _b === void 0 ? void 0 : _b.view) === null || _c === void 0 ? void 0 : _c.featuredImageUrl}${queryParams}`);
  }
  get mapSettings() {
    return getProp(this.entity, 'view.mapSettings');
  }
  async componentWillLoad() {
    const [intl] = await Promise.all([intlManager.loadIntlForComponent(this.element), this.init()]);
    this.intl = intl;
  }
  ;
  async init() {
    // build the query to fetch the initiative's associated projects
    this._associatedProjectsQuery = this.entity && await getAssociatedEntitiesQuery(this.entity, "project", this._context);
    // fetch the initiative's associated projects to get the total count -
    // we use this to conditionally render the "Associated Projects" section
    // and overflow pattern when there are > 4 associated projects
    if (this._associatedProjectsQuery) {
      const { results = [] } = await hubSearch(this._associatedProjectsQuery, { requestOptions: this._context.hubRequestOptions });
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
    return (h("arcgis-hub-gallery", { api: "hub", disableMapMouseWheelZoom: true, expand: 2, layout: "map", linkTarget: "siteRelative", mapSettings: this.mapSettings, query: this.mapGalleryQuery, showEmptyState: false, showFacets: false, showResults: false }, h("arcgis-skeleton-loader", { active: true, "show-thumbnail": true, slot: "loading-screen" })));
  }
  /** renders the initiative's featured image */
  renderFeaturedImage() {
    var _a, _b;
    return (h("img", { alt: ((_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.featuredImageAltText) || this.intl.t('featuredImageFallbackAltText'), src: this.featuredImageUrl }));
  }
  renderHero() {
    var _a, _b, _c, _d;
    if (((_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.hero) === 'map') {
      return (h("div", { class: "initiative-hero__main" }, this.renderMap()));
    }
    else {
      if ((_d = (_c = this.entity) === null || _c === void 0 ? void 0 : _c.view) === null || _d === void 0 ? void 0 : _d.featuredImageUrl) {
        return (h("div", { class: "initiative-hero__main" }, this.renderFeaturedImage()));
      }
    }
  }
  render() {
    return (h(Host, { "data-element": "entity-hero" }, this.renderHero(), h("h1", { class: "initiative-hero__header" }, this.entity.name)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubInitiativeHero.style = arcgisHubInitiativeHeroCss;

export { ArcgisHubInitiativeHero as arcgis_hub_initiative_hero };
