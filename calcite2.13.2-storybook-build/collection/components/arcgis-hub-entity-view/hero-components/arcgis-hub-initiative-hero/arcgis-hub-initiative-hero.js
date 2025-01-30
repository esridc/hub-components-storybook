import { cacheBustUrl, getAssociatedEntitiesQuery, getProp, hubSearch } from '@esri/hub-common';
import { h, Host } from '@stencil/core';
import { getGlobalContext } from '../../../../utils/state';
import { combineInitiativeAndAssociatedProjectsQuery } from './resources';
import intlManager from '../../../../utils/intl-manager';
export class ArcgisHubInitiativeHero {
  constructor() {
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
    var _a;
    let query = this._initiativeQuery;
    // NOTE: this is a temporary variable that will be replaced by a toggle on initiative settings
    const showInitiativeLocationWithProjects = false;
    // combined: we show the inititative and the projects
    // TODO: there's probably a better way to do this...but it's technically possible today to show both
    if (showInitiativeLocationWithProjects && this._associatedProjectsQuery && this._associatedProjectsQuery.filters) {
      query = combineInitiativeAndAssociatedProjectsQuery((_a = this.entity) === null || _a === void 0 ? void 0 : _a.id, this._associatedProjectsQuery);
    }
    // we don't have projects to display, show initiative only
    else if (this._associatedProjectsHaveLocation) {
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
  static get is() { return "arcgis-hub-initiative-hero"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-initiative-hero.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-initiative-hero.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubInitiative",
          "resolved": "IHubInitiative",
          "references": {
            "IHubInitiative": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "ArcGIS Hub initiative entity"
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
