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
 * max number of associated initiatives to render on the project view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Initiatives" tab with full gallery of associated initiatives)
 */
const FEATURED_ASSOCIATED_INITIATIVES_MAX = 5;
/**
 * Callback fn to pass into the associated initiatives gallery
 * to modify the card view models
 *
 * @param model - card view model
 * @param _layout - card layout
 * @param _context - contextual portal & auth information
 * @param _result - raw search result
 * @returns {IHubCardViewModel}
 */
const associatedInitiativesGalleryCallback = (model, _layout, _context, _result) => {
  // 1. set the summary to undefined so that it doesn't render
  // beneath the title
  model.summary = undefined;
  return model;
};

const arcgisHubProjectAboutCss = ".project-about__initiatives.sc-arcgis-hub-project-about calcite-button.sc-arcgis-hub-project-about{margin-top:1.5rem}h2.sc-arcgis-hub-project-about{margin:0 0 0.75rem 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}";

const ArcgisHubProjectAbout = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubEntityAboutTabChange = index.createEvent(this, "arcgisHubEntityAboutTabChange", 7);
    this.entity = undefined;
    this.path = "";
    this._associatedInitiativesCount = 0;
    context.bind(this, 'handleTabChange');
  }
  async init() {
    // NOTE: if the current user does not have access to the related initiative, this will fail
    try {
      // 1. build the query to fetch the project's associated initiatives
      this._associatedInitiativesQuery = this.project && await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(this.project, "initiative", this._context);
      // 2. fetch the project's associated initiatives to get the total count -
      // we use this to conditionally render the "Associated Initiatives" section
      // and overflow pattern when there are > 5 associated initiatives
      if (this._associatedInitiativesQuery) {
        const { total } = await hubSearch.hubSearch(this._associatedInitiativesQuery, { requestOptions: this._context.hubRequestOptions });
        this._associatedInitiativesCount = total;
      }
    }
    catch (error) {
      // swallow it
    }
  }
  /** global context: contextual portal & auth information */
  get _context() { return state.getGlobalContext(); }
  get project() {
    return this.entity;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  handleTabChange(evt) {
    this.arcgisHubEntityAboutTabChange.emit(evt);
  }
  /**
   * Renders associated initiatives of the project
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all initiatives
   */
  renderAssociatedInitiatives() {
    return (index.h("div", { class: "project-about__initiatives" }, index.h("h2", null, this.intl.t('associatedInitiatives')), index.h("arcgis-hub-gallery", { callback: associatedInitiativesGalleryCallback, limit: FEATURED_ASSOCIATED_INITIATIVES_MAX, linkTarget: "siteRelative", path: this.path, query: this._associatedInitiativesQuery, showAdditionalInfo: false, showOwner: false, showThumbnail: false, showType: false }), index.h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": types.ViewTabs.Initiatives, onClick: this.handleTabChange, round: true }, this.intl.t("exploreAssociations"))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "project-about" }, index.h("arcgis-hub-entity-about", { entity: this.entity, path: this.path }, index.h("div", { slot: "sidebar" }, this._associatedInitiativesCount > 0 && this.renderAssociatedInitiatives()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubProjectAbout.style = arcgisHubProjectAboutCss;

exports.arcgis_hub_project_about = ArcgisHubProjectAbout;
