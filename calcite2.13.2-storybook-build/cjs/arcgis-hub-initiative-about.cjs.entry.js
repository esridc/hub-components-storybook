'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const types = require('./types-c1b201f8.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const hubSearch = require('./hubSearch-79d30702.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
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
 * max number of associated projects to render on the initiative view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Projects" tab with full gallery of associated projects)
 */
const FEATURED_ASSOCIATED_PROJECTS_MAX = 4;

const arcgisHubInitiativeAboutCss = ".initiative-about__projects.sc-arcgis-hub-initiative-about calcite-button.sc-arcgis-hub-initiative-about{margin-top:1.5rem}h2.sc-arcgis-hub-initiative-about{margin:0 0 0.75rem 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}@media only screen and (max-width: 768px){arcgis-hub-entity-about.sc-arcgis-hub-initiative-about{gap:2rem}}";

const ArcgisHubInitiativeAbout = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubEntityAboutTabChange = index.createEvent(this, "arcgisHubEntityAboutTabChange", 7);
    this.handleTabChange = (evt) => {
      this.arcgisHubEntityAboutTabChange.emit(evt);
    };
    this.entity = undefined;
    this.path = "";
    this._associatedProjectsCount = 0;
    context.bind(this, 'handleTabChange');
  }
  async init() {
    // 1. build the query to fetch the initiative's associated projects
    this._associatedProjectsQuery = this.initiative && await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(this.initiative, "project", this._context);
    // 2. fetch the initiative's associated projects to get the total count -
    // we use this to conditionally render the "Associated Projects" section
    // and overflow pattern when there are > 4 associated projects
    if (this._associatedProjectsQuery) {
      const { total } = await hubSearch.hubSearch(this._associatedProjectsQuery, { requestOptions: this._context.hubRequestOptions });
      this._associatedProjectsCount = total;
    }
  }
  get initiative() {
    return this.entity;
  }
  /** global context: contextual portal & auth information */
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  /**
   * Renders associated projects of the initiative
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all projects
   */
  renderAssociatedProjects() {
    return (index.h("div", { class: "initiative-about__projects" }, index.h("h2", null, this.intl.t('project')), index.h("arcgis-hub-gallery", { layout: 'grid', limit: FEATURED_ASSOCIATED_PROJECTS_MAX, "link-target": "siteRelative", path: this.path, query: this._associatedProjectsQuery, showAdditionalInfo: false, sortField: "modified", sortOrder: 'desc' }), index.h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": types.ViewTabs.Projects, onClick: this.handleTabChange, round: true }, this.intl.t("exploreAllProjects"))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "initiative-about" }, index.h("arcgis-hub-entity-about", { entity: this.entity }, index.h("div", { slot: "main" }, this._associatedProjectsCount > 0 && this.renderAssociatedProjects()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubInitiativeAbout.style = arcgisHubInitiativeAboutCss;

exports.arcgis_hub_initiative_about = ArcgisHubInitiativeAbout;
