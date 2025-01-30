'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const context = require('./context-0167a31e.js');
const Catalog = require('./Catalog-acebae88.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./fail-safe-33c35b7f.js');
require('./request-67da3c71.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./logger-5db3d659.js');
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
require('./extent-715f7c8d.js');
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

const arcgisHubBrowseCollectionsCss = ":host{display:block}section{margin-top:1rem}header{display:flex;flex-direction:row;justify-content:space-between}";

const ArcgisHubBrowseCollections = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubBrowseCollectionSelected = index.createEvent(this, "hubBrowseCollectionSelected", 7);
    this.entity = undefined;
    this.capability = undefined;
    this.searchValue = undefined;
    context.bind(this, 'handleClickMore');
  }
  onSearchChange(event) {
    console.log('search change', event.detail);
    this.searchValue = event.detail;
  }
  get catalog() {
    return this.entity[this.capability].catalog;
  }
  get _context() { return state.getGlobalContext(); }
  handleClickMore(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const collection = evt.target.dataset.collection;
    console.log('click more', collection);
    this.hubBrowseCollectionSelected.emit(collection);
  }
  get queries() {
    const catalog = Catalog.Catalog.fromJson(this.catalog, this._context);
    // get all the collection names
    const collectionKeys = catalog.collections.map(c => c.key);
    const collections = collectionKeys.map(key => {
      return catalog.getCollectionJson(key);
    });
    const r = collections.map(collection => {
      return Object.assign(Object.assign({}, collection.scope), { key: collection.key, label: collection.label || collection.key });
    }).sort(getSortPredicate('label'));
    return r;
  }
  renderHeader() {
    return (index.h(index.Fragment, null, index.h("arcgis-hub-search-input", { placeholder: "Search", scale: "m", text: "Search" }), index.h("hr", null)));
  }
  renderGallery(qry) {
    return (index.h(index.Fragment, null, index.h("section", null, index.h("header", null, index.h("h2", null, qry.label), index.h("calcite-button", { appearance: "transparent", color: "blue", "data-collection": qry.key, onClick: this.handleClickMore, scale: "m", type: "button" }, "View More...")), index.h("main", null, index.h("arcgis-hub-gallery", { layout: "grid", limit: 4, query: qry, showFacets: false, showMoreResultsBtn: false, showSearch: false, term: this.searchValue })))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "browse-collections" }, index.h("h2", null, "Site Catalog: ", this.entity.name), this.renderHeader(), this.queries.map(qry => this.renderGallery(qry))));
  }
};
function getSortPredicate(sortField) {
  return function alphaSort(a, b) {
    const nameA = a[sortField].toUpperCase(); // ignore upper and lowercase
    const nameB = b[sortField].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  };
}
ArcgisHubBrowseCollections.style = arcgisHubBrowseCollectionsCss;

exports.arcgis_hub_browse_collections = ArcgisHubBrowseCollections;
