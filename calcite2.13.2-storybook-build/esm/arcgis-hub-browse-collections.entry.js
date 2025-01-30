import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { b as bind } from './context-7d8f7366.js';
import { C as Catalog } from './Catalog-290f043e.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './ArcGISContextManager-c977211a.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './fail-safe-cd1a5a2a.js';
import './request-fa80ae40.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './get-user-f035bd36.js';
import './tslib.es6-7023f322.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './logger-f8667200.js';
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
import './extent-34a4ba2a.js';
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

const arcgisHubBrowseCollectionsCss = ":host{display:block}section{margin-top:1rem}header{display:flex;flex-direction:row;justify-content:space-between}";

const ArcgisHubBrowseCollections = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubBrowseCollectionSelected = createEvent(this, "hubBrowseCollectionSelected", 7);
    this.entity = undefined;
    this.capability = undefined;
    this.searchValue = undefined;
    bind(this, 'handleClickMore');
  }
  onSearchChange(event) {
    console.log('search change', event.detail);
    this.searchValue = event.detail;
  }
  get catalog() {
    return this.entity[this.capability].catalog;
  }
  get _context() { return getGlobalContext(); }
  handleClickMore(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const collection = evt.target.dataset.collection;
    console.log('click more', collection);
    this.hubBrowseCollectionSelected.emit(collection);
  }
  get queries() {
    const catalog = Catalog.fromJson(this.catalog, this._context);
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
    return (h(Fragment, null, h("arcgis-hub-search-input", { placeholder: "Search", scale: "m", text: "Search" }), h("hr", null)));
  }
  renderGallery(qry) {
    return (h(Fragment, null, h("section", null, h("header", null, h("h2", null, qry.label), h("calcite-button", { appearance: "transparent", color: "blue", "data-collection": qry.key, onClick: this.handleClickMore, scale: "m", type: "button" }, "View More...")), h("main", null, h("arcgis-hub-gallery", { layout: "grid", limit: 4, query: qry, showFacets: false, showMoreResultsBtn: false, showSearch: false, term: this.searchValue })))));
  }
  render() {
    return (h(Host, { "data-element": "browse-collections" }, h("h2", null, "Site Catalog: ", this.entity.name), this.renderHeader(), this.queries.map(qry => this.renderGallery(qry))));
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

export { ArcgisHubBrowseCollections as arcgis_hub_browse_collections };
