'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const galleryUtils = require('./gallery-utils-53eb9949.js');
const logger = require('./logger-5db3d659.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const searchCatalogs = require('./searchCatalogs-54a84e01.js');
const util = require('./util-38e73510.js');
const Catalog = require('./Catalog-acebae88.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./extent-715f7c8d.js');
require('./get-prop-4bd8fc1a.js');
require('./request-67da3c71.js');
require('./titleize-c8daa6a2.js');
require('./map-by-a7a75788.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./fail-safe-33c35b7f.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./encoding-211adb23.js');
require('./index-058372c1.js');
require('./UserSession-f8bc10c8.js');
require('./get-portal-6ca924c2.js');
require('./is-guid-b5c2b74c.js');
require('./hubSearch-79d30702.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
require('./compose-9b4311c9.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./fetch-org-d214b65b.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
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
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./fetchHubEntity-88467d55.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./settings-0b8cd93b.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');

const arcgisHubBrowseAllCss = ":host{display:block}section{margin-top:1rem}header{display:flex;flex-direction:row;justify-content:space-between}.explore>calcite-button{padding:0 0.5rem 0 0}:host([layout=\"list\"]) .card-container,:host([layout=\"grid\"]) .card-container,:host([layout=\"map\"]) .card-container,:host([layout=\"grid-filled\"]) .card-container{display:grid;gap:1.5rem}:host([layout=\"grid\"]) .card-container,:host([layout=\"map\"]) .card-container{grid-template-columns:repeat(auto-fill, minmax(max(240px, (100% - (4 - 1) * 24px) / 4), 1fr))}:host([layout=\"grid-filled\"]) .card-container{grid-template-columns:repeat(12, 1fr)}:host([layout=\"grid-filled\"]) .card-container>*{grid-column:span calc(12 / var(--columns))}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+1):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-2>*:nth-of-type(2n+1):last-of-type{grid-column:span 12 / span 12}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+2):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+1):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+2):last-of-type{grid-column:span 6 / span 6}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):nth-last-of-type(3),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+2):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+3):last-of-type{grid-column:span 4 / span 4}";

const ArcgisHubBrowseAll = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubBrowseMoreSelected = index.createEvent(this, "hubBrowseMoreSelected", 7);
    this.entity = undefined;
    this.layout = 'grid';
    this.showSearch = true;
    this.linkTarget = 'siteRelative';
    this.path = "";
    this.term = '';
    this.mode = 'combined';
    this.loading = false;
    this.gridColumns = 4;
    this.combinedResults = [];
    context.bind(this, 'handleClickMore');
  }
  onSearchChange(event) {
    logger.Logger.log('search change', event.detail);
    this.term = event.detail;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    if (this.mode === 'combined') {
      this.loading = true;
      await this.combinedSearch();
      this.loading = false;
    }
  }
  get catalogs() {
    return getWithDefault.getWithDefault(this.entity, "catalogs", []);
  }
  handleClickMore(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const catalogTitle = evt.target.dataset.catalog;
    logger.Logger.log('switch to catalog', catalogTitle);
    this.hubBrowseMoreSelected.emit(catalogTitle);
  }
  async combinedSearch() {
    this.loading = true;
    const response = await searchCatalogs.searchCatalogs(this.catalogs, this.term, {}, this._context);
    // combine all the results into a big list
    // HOIST TO UTIL
    const results = response.reduce((acc, entry) => {
      if (entry.collectionResults) {
        Object.keys(entry.collectionResults).forEach(key => {
          acc = [...acc, ...entry.collectionResults[key].results];
        });
      }
      if (entry.scopeResults) {
        Object.keys(entry.scopeResults).forEach(key => {
          acc = [...acc, ...entry.scopeResults[key].results];
        });
      }
      return acc;
    }, []);
    // TODO: Integrate more sort options & directions
    let uniqueResults = util.uniqueBy(results, 'id').sort((a, b) => {
      return b.updatedDate.getTime() - a.updatedDate.getTime();
    });
    // Inject the path on the results.links.siteRelative
    uniqueResults = galleryUtils.addPathToResults(this.path, uniqueResults);
    this.loading = false;
    this.combinedResults = uniqueResults;
  }
  get resultContainerClass() {
    return [`card-container`, `cols-${this.gridColumns}`].join(' ');
  }
  renderHeader() {
    return (index.h(index.Fragment, null, index.h("header", null, index.h("h2", null, this.intl.t('header'))), this.showSearch && index.h("arcgis-hub-search-input", { placeholder: "Search", scale: "m", text: "Search" }), index.h("hr", null)));
  }
  renderCatalog(catalog) {
    // create catalog instance
    const instance = Catalog.Catalog.fromJson(catalog);
    // iterate the collections, and render each
    const collections = instance.collectionNames.map(name => instance.getCollection(name));
    return collections.map(collection => this.renderCollection(catalog.title, collection));
  }
  renderCollection(catalogTitle, collection) {
    const query = collection.scope;
    return this.renderGallery(`${catalogTitle}: ${collection.label}`, query);
  }
  renderGallery(title, query) {
    return (index.h(index.Fragment, null, index.h("section", null, index.h("header", null, index.h("h2", null, title), index.h("calcite-button", { appearance: "transparent", onClick: this.handleClickMore, scale: "m" }, this.intl.t('viewMore'))), index.h("main", null, index.h("arcgis-hub-gallery", { layout: "grid", limit: 4, linkTarget: 'siteRelative', path: this.path, query: query, showFacets: false, showMoreResultsBtn: false, showSearch: false, term: this.term })))));
  }
  renderCombined() {
    return this.loading ? (index.h(index.Fragment, null, "loading...")) : (index.h(index.Fragment, null, index.h("div", { class: this.resultContainerClass, "data-test": "browse-all-result-container" }, this.combinedResults.map((result, idx) => (index.h("arcgis-hub-entity-card", { key: idx, layout: 'card', linkTarget: this.linkTarget, searchResult: result })))), index.h("div", { class: "explore" }, index.h("h3", null, this.intl.t('explore')), this.catalogs.map((cat, idx) => (index.h("calcite-button", { appearance: "outline", "data-catalog": cat.title, key: idx, onClick: this.handleClickMore, scale: "l" }, cat.emojii, " ", cat.title))))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "browse-all" }, this.renderHeader(), this.mode === 'gallery-list' && this.catalogs.map(cat => this.renderCatalog(cat)), this.mode === 'combined' && this.renderCombined()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "term": ["combinedSearch"]
  }; }
};
ArcgisHubBrowseAll.style = arcgisHubBrowseAllCss;

exports.arcgis_hub_browse_all = ArcgisHubBrowseAll;
