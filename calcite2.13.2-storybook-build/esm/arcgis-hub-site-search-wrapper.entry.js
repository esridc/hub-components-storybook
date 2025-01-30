import { r as registerInstance, h, F as Fragment, H as Host } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './themes-e08327b4.js';
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

const arcgisHubSiteSearchWrapperCss = ".sc-arcgis-hub-site-search-wrapper-h{display:block}";

const ArcgisHubSiteSearchWrapper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
    this.identifier = "";
    this.type = undefined;
    this.view = "browseAll";
    this.mode = "separate";
    this.term = "";
    this.loading = true;
  }
  get _context() { return getGlobalContext(); }
  // Listen to the event that tells us to switch to the workspace view
  async onIdentifierChange() {
    await this.loadEntity();
  }
  async loadEntity() {
    this.loading = true;
    if (this.type && this.identifier && this._context) {
      this.entity = await fetchHubEntity(this.type, this.identifier, this._context);
      this.loading = false;
    }
  }
  componentWillLoad() {
    if (this.entity) {
      this.loading = false;
    }
    else {
      if (!this.entity && (this._context && this.identifier && this.type)) {
        this.loadEntity();
      }
    }
  }
  get catalogs() {
    return getWithDefault(this.entity, 'catalogs', []);
  }
  get showBrowseAll() {
    return this.catalogs.length > 1;
  }
  onSearchChange(event) {
    this.term = event.detail;
  }
  renderLoading() {
    return (h("div", null, "Loading..."));
  }
  renderContent() {
    const showSearch = this.mode === "separate";
    return (h(Fragment, null, this.mode === "unified" && h("arcgis-hub-search-input", { placeholder: 'Search...' }), h("calcite-tabs", null, h("calcite-tab-nav", { slot: "title-group" }, h("calcite-tab-title", { name: "browseAll", selected: this.view === 'browseAll' }, "Browse All"), this.catalogs.map((catalog, idx) => {
      return (h("calcite-tab-title", { key: idx, name: catalog.title, selected: this.view === catalog.title }, catalog.emojii, " ", catalog.title));
    })), h("calcite-tab", { name: "browseAll" }, h("arcgis-hub-browse-all", { entity: this.entity, mode: "combined", showSearch: showSearch, term: this.term })), this.catalogs.map((catalog, idx) => {
      return (h("calcite-tab", { key: idx, name: catalog.title }, h("arcgis-hub-catalog", { catalogs: [catalog], facets: facets, layout: "grid", showSearch: showSearch, term: this.term })));
    }))));
  }
  render() {
    return (h(Host, { "data-element": "entity-view-wrapper" }, this.loading ? this.renderLoading() : this.renderContent()));
  }
  static get watchers() { return {
    "type": ["onIdentifierChange"],
    "identifier": ["onIdentifierChange"]
  }; }
};
const facets = [
  {
    label: "Access",
    key: "access",
    display: "multi-select",
    operation: "OR",
    options: [
      {
        label: "Public",
        key: "public",
        selected: false,
        predicates: [{
            access: "public",
          }],
      },
      {
        label: "Shared",
        key: "shared",
        selected: false,
        predicates: [{
            access: "shared",
          },]
      },
      {
        label: "Org",
        key: "org",
        selected: false,
        predicates: [{
            access: "org",
          }],
      },
      {
        label: "Mine",
        key: "mine",
        selected: false,
        predicates: [{
            owner: "dbouwman_dc",
          }],
      }
    ],
  },
  {
    label: "Types",
    key: "types",
    display: "multi-select",
    pageSize: 4,
    operation: "OR",
    options: [
      {
        label: "Projects",
        key: "projects",
        selected: false,
        predicates: [
          {
            type: "Hub Project"
          }
        ]
      },
      {
        label: "Web Maps",
        key: "webmaps",
        selected: false,
        predicates: [{
            type: "Web Map"
          }]
      },
      {
        label: "Sites",
        key: "sites",
        selected: false,
        predicates: [{
            type: "Hub Site Application"
          }]
      },
      {
        label: "Services",
        key: "services",
        selected: false,
        predicates: [{
            type: ["Feature Service", "Map Service"]
          }]
      },
      {
        label: "Apps",
        key: "apps",
        selected: false,
        predicates: [{
            type: {
              any: [
                "Code Sample",
                "Web Mapping Application",
                "Mobile Application",
                "Application",
                "Desktop Application Template",
                "Desktop Application",
                "Operation View",
                "Dashboard",
                "Operations Dashboard Extension",
                "Workforce Project",
                "Insights Workbook",
                "Insights Page",
                "Insights Model",
                "Hub Page",
                "Hub Initiative",
                "Hub Site Application",
                "StoryMap",
                "Web Experience",
                "Web Experience Template",
                "Form",
              ],
              not: [
                "Code Attachment",
                "Featured Items",
                "Symbol Set",
                "Color Set",
                "Windows Viewer Add In",
                "Windows Viewer Configuration",
                "Map Area",
                "Indoors Map Configuration",
              ],
            },
            typekeywords: {
              not: ["MapAreaPackage", "SMX"],
            },
          }]
      },
      {
        label: "Story Maps",
        key: "storymaps",
        selected: false,
        predicates: [
          {
            type: "StoryMap",
          },
          {
            type: "Web Mapping Application",
            typekeywords: "Story Map",
          }
        ]
      },
      {
        label: "Dashboards",
        key: "dashboards",
        selected: false,
        predicates: [{
            type: "Dashboard",
            typekeywords: {
              any: ["Dashboard"],
              not: ["ArcGIS Operation View", "Add In", "Extension"],
            },
          }]
      },
      {
        label: "Document",
        key: "documents",
        selected: false,
        predicates: [{
            typekeywords: {
              any: ["Document"],
              not: ["MapAreaPackage", "SMX"],
            },
            type: {
              any: [
                "Image",
                "Layout",
                "Desktop Style",
                "Project Template",
                "Report Template",
                "Pro Report",
                "Statistical Data Collection",
                "360 VR Experience",
                "netCDF",
                "PDF",
                "CSV",
                "Administrative Report",
                "Raster function template",
              ],
              not: [
                "Image Service",
                "Explorer Document",
                "Explorer Map",
                "Globe Document",
                "Scene Document",
                "Code Attachment",
                "Featured Items",
                "Symbol Set",
                "ColorSet",
                "Windows Viewer Add In",
                "Windows Viewer Configuration",
                "Map Area",
                "Indoors Map Configuration",
              ],
            },
          }]
      },
    ]
  }
];
ArcgisHubSiteSearchWrapper.style = arcgisHubSiteSearchWrapperCss;

export { ArcgisHubSiteSearchWrapper as arcgis_hub_site_search_wrapper };
