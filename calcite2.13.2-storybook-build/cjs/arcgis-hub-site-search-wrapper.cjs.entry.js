'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');

const arcgisHubSiteSearchWrapperCss = ".sc-arcgis-hub-site-search-wrapper-h{display:block}";

const ArcgisHubSiteSearchWrapper = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
    this.identifier = "";
    this.type = undefined;
    this.view = "browseAll";
    this.mode = "separate";
    this.term = "";
    this.loading = true;
  }
  get _context() { return state.getGlobalContext(); }
  // Listen to the event that tells us to switch to the workspace view
  async onIdentifierChange() {
    await this.loadEntity();
  }
  async loadEntity() {
    this.loading = true;
    if (this.type && this.identifier && this._context) {
      this.entity = await fetchHubEntity.fetchHubEntity(this.type, this.identifier, this._context);
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
    return getWithDefault.getWithDefault(this.entity, 'catalogs', []);
  }
  get showBrowseAll() {
    return this.catalogs.length > 1;
  }
  onSearchChange(event) {
    this.term = event.detail;
  }
  renderLoading() {
    return (index.h("div", null, "Loading..."));
  }
  renderContent() {
    const showSearch = this.mode === "separate";
    return (index.h(index.Fragment, null, this.mode === "unified" && index.h("arcgis-hub-search-input", { placeholder: 'Search...' }), index.h("calcite-tabs", null, index.h("calcite-tab-nav", { slot: "title-group" }, index.h("calcite-tab-title", { name: "browseAll", selected: this.view === 'browseAll' }, "Browse All"), this.catalogs.map((catalog, idx) => {
      return (index.h("calcite-tab-title", { key: idx, name: catalog.title, selected: this.view === catalog.title }, catalog.emojii, " ", catalog.title));
    })), index.h("calcite-tab", { name: "browseAll" }, index.h("arcgis-hub-browse-all", { entity: this.entity, mode: "combined", showSearch: showSearch, term: this.term })), this.catalogs.map((catalog, idx) => {
      return (index.h("calcite-tab", { key: idx, name: catalog.title }, index.h("arcgis-hub-catalog", { catalogs: [catalog], facets: facets, layout: "grid", showSearch: showSearch, term: this.term })));
    }))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-view-wrapper" }, this.loading ? this.renderLoading() : this.renderContent()));
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

exports.arcgis_hub_site_search_wrapper = ArcgisHubSiteSearchWrapper;
