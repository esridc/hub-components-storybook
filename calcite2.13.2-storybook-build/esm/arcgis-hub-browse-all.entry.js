import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { a as addPathToResults } from './gallery-utils-2d637f50.js';
import { L as Logger } from './logger-f8667200.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import { s as searchCatalogs } from './searchCatalogs-3b4731ac.js';
import { j as uniqueBy } from './util-3e6872d9.js';
import { C as Catalog } from './Catalog-290f043e.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './extent-34a4ba2a.js';
import './get-prop-ec5be510.js';
import './request-fa80ae40.js';
import './titleize-fd193332.js';
import './map-by-a2234e13.js';
import './ArcGISContextManager-c977211a.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './fail-safe-cd1a5a2a.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-user-f035bd36.js';
import './tslib.es6-7023f322.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';
import './UserSession-2c05f7b6.js';
import './get-portal-5e0a1617.js';
import './is-guid-982831aa.js';
import './hubSearch-41612481.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
import './compose-d5b83ab7.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './fetch-org-8e578c0d.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
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
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './fetchHubEntity-28d04ab4.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './settings-2d4e159a.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';

const arcgisHubBrowseAllCss = ":host{display:block}section{margin-top:1rem}header{display:flex;flex-direction:row;justify-content:space-between}.explore>calcite-button{padding:0 0.5rem 0 0}:host([layout=\"list\"]) .card-container,:host([layout=\"grid\"]) .card-container,:host([layout=\"map\"]) .card-container,:host([layout=\"grid-filled\"]) .card-container{display:grid;gap:1.5rem}:host([layout=\"grid\"]) .card-container,:host([layout=\"map\"]) .card-container{grid-template-columns:repeat(auto-fill, minmax(max(240px, (100% - (4 - 1) * 24px) / 4), 1fr))}:host([layout=\"grid-filled\"]) .card-container{grid-template-columns:repeat(12, 1fr)}:host([layout=\"grid-filled\"]) .card-container>*{grid-column:span calc(12 / var(--columns))}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+1):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-2>*:nth-of-type(2n+1):last-of-type{grid-column:span 12 / span 12}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+2):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+1):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+2):last-of-type{grid-column:span 6 / span 6}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):nth-last-of-type(3),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+2):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+3):last-of-type{grid-column:span 4 / span 4}";

const ArcgisHubBrowseAll = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubBrowseMoreSelected = createEvent(this, "hubBrowseMoreSelected", 7);
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
    bind(this, 'handleClickMore');
  }
  onSearchChange(event) {
    Logger.log('search change', event.detail);
    this.term = event.detail;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (this.mode === 'combined') {
      this.loading = true;
      await this.combinedSearch();
      this.loading = false;
    }
  }
  get catalogs() {
    return getWithDefault(this.entity, "catalogs", []);
  }
  handleClickMore(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const catalogTitle = evt.target.dataset.catalog;
    Logger.log('switch to catalog', catalogTitle);
    this.hubBrowseMoreSelected.emit(catalogTitle);
  }
  async combinedSearch() {
    this.loading = true;
    const response = await searchCatalogs(this.catalogs, this.term, {}, this._context);
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
    let uniqueResults = uniqueBy(results, 'id').sort((a, b) => {
      return b.updatedDate.getTime() - a.updatedDate.getTime();
    });
    // Inject the path on the results.links.siteRelative
    uniqueResults = addPathToResults(this.path, uniqueResults);
    this.loading = false;
    this.combinedResults = uniqueResults;
  }
  get resultContainerClass() {
    return [`card-container`, `cols-${this.gridColumns}`].join(' ');
  }
  renderHeader() {
    return (h(Fragment, null, h("header", null, h("h2", null, this.intl.t('header'))), this.showSearch && h("arcgis-hub-search-input", { placeholder: "Search", scale: "m", text: "Search" }), h("hr", null)));
  }
  renderCatalog(catalog) {
    // create catalog instance
    const instance = Catalog.fromJson(catalog);
    // iterate the collections, and render each
    const collections = instance.collectionNames.map(name => instance.getCollection(name));
    return collections.map(collection => this.renderCollection(catalog.title, collection));
  }
  renderCollection(catalogTitle, collection) {
    const query = collection.scope;
    return this.renderGallery(`${catalogTitle}: ${collection.label}`, query);
  }
  renderGallery(title, query) {
    return (h(Fragment, null, h("section", null, h("header", null, h("h2", null, title), h("calcite-button", { appearance: "transparent", onClick: this.handleClickMore, scale: "m" }, this.intl.t('viewMore'))), h("main", null, h("arcgis-hub-gallery", { layout: "grid", limit: 4, linkTarget: 'siteRelative', path: this.path, query: query, showFacets: false, showMoreResultsBtn: false, showSearch: false, term: this.term })))));
  }
  renderCombined() {
    return this.loading ? (h(Fragment, null, "loading...")) : (h(Fragment, null, h("div", { class: this.resultContainerClass, "data-test": "browse-all-result-container" }, this.combinedResults.map((result, idx) => (h("arcgis-hub-entity-card", { key: idx, layout: 'card', linkTarget: this.linkTarget, searchResult: result })))), h("div", { class: "explore" }, h("h3", null, this.intl.t('explore')), this.catalogs.map((cat, idx) => (h("calcite-button", { appearance: "outline", "data-catalog": cat.title, key: idx, onClick: this.handleClickMore, scale: "l" }, cat.emojii, " ", cat.title))))));
  }
  render() {
    return (h(Host, { "data-element": "browse-all" }, this.renderHeader(), this.mode === 'gallery-list' && this.catalogs.map(cat => this.renderCatalog(cat)), this.mode === 'combined' && this.renderCombined()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "term": ["combinedSearch"]
  }; }
};
ArcgisHubBrowseAll.style = arcgisHubBrowseAllCss;

export { ArcgisHubBrowseAll as arcgis_hub_browse_all };
