import { r as registerInstance, h, F as Fragment, H as Host } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { l as lookupDomain } from './themes-e08327b4.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { C as Catalog } from './Catalog-290f043e.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './ArcGISContextManager-c977211a.js';
import './checkPermission-6c5be250.js';
import './logger-f8667200.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';

const arcgisHubBrowseCollectionsWrapperCss = ":host{display:block}";

const ArcgisHubBrowseCollectionsWrapper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
    this.identifier = "";
    this.domain = "";
    this.view = "browse";
    this.collection = undefined;
    this.type = undefined;
    this.loading = true;
  }
  get _context() { return getGlobalContext(); }
  async onIdentifierChange() {
    await this.loadEntity();
  }
  async onDomainChange() {
    this.loadDomain();
  }
  onCollectionSelected(event) {
    this.collection = event.detail;
    this.view = "collection";
  }
  async loadDomain() {
    const domainRecord = await lookupDomain(this.domain, this._context.hubRequestOptions);
    if (domainRecord) {
      this.type = "site";
      this.identifier = domainRecord.siteId;
      await this.loadEntity();
    }
  }
  async loadEntity() {
    this.loading = true;
    if (this.type && this.identifier && this._context) {
      this.entity = await fetchHubEntity(this.type, this.identifier, this._context);
      // transform the catalog into the content capability
      if (this.entity && this.entity.catalog) {
        this.entity.content = {
          enabled: true,
          catalog: this.entity.catalog
        };
      }
      else {
        console.info(`No catalog found for ${this.identifier}`);
      }
      this.loading = false;
    }
  }
  componentWillLoad() {
    if (this.entity) {
      this.loading = false;
    }
    else {
      if (this.domain && this._context) {
        this.onDomainChange();
      }
      if (!this.entity && (this._context && this.identifier && this.type)) {
        this.loadEntity();
      }
    }
  }
  get query() {
    const json = this.entity.content.catalog;
    const catalog = Catalog.fromJson(json, this._context);
    const collection = catalog.getCollectionJson(this.collection);
    return collection.scope;
  }
  renderLoading() {
    return (h("div", null, "Loading..."));
  }
  renderGallery() {
    // Get the collection query and pass into a gallery
    // need to get the standard facets as well
    return (h(Fragment, null, h("h2", null, "Search ", this.collection, " collection"), h("arcgis-hub-gallery", { layout: 'grid', limit: 12, query: this.query, showBackToTopBtn: true, showLayoutSwitcher: true, showMoreResultsBtn: true, showResultsCount: true, showSearch: true, showSort: true })));
  }
  renderBrowse() {
    return (h(Fragment, null, h("arcgis-hub-browse-collections", { capability: "content", entity: this.entity })));
  }
  renderContent() {
    return (h(Fragment, null, this.view === "collection"
      ? this.renderGallery()
      : this.renderBrowse()));
  }
  render() {
    return (h(Host, { "data-element": "browse-collections-wrapper" }, this.loading ? this.renderLoading() : this.renderContent()));
  }
  static get watchers() { return {
    "type": ["onIdentifierChange"],
    "identifier": ["onIdentifierChange"],
    "domain": ["onDomainChange"]
  }; }
};
ArcgisHubBrowseCollectionsWrapper.style = arcgisHubBrowseCollectionsWrapperCss;

export { ArcgisHubBrowseCollectionsWrapper as arcgis_hub_browse_collections_wrapper };
