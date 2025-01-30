import { fetchHubEntity, getWithDefault } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
export class ArcgisHubSiteSearchWrapper {
  constructor() {
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
  static get is() { return "arcgis-hub-site-search-wrapper"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-site-search-wrapper.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-site-search-wrapper.css"]
    };
  }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "identifier": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "identifier",
        "reflect": false,
        "defaultValue": "\"\""
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubEntityType",
          "resolved": "\"content\" | \"discussion\" | \"event\" | \"group\" | \"initiative\" | \"initiativeTemplate\" | \"org\" | \"page\" | \"project\" | \"site\" | \"survey\" | \"template\" | \"user\"",
          "references": {
            "HubEntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": false
      },
      "view": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "view",
        "reflect": false,
        "defaultValue": "\"browseAll\""
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"unified\" | \"separate\"",
          "resolved": "\"separate\" | \"unified\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "\"separate\""
      },
      "term": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "term",
        "reflect": false,
        "defaultValue": "\"\""
      }
    };
  }
  static get states() {
    return {
      "loading": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "type",
        "methodName": "onIdentifierChange"
      }, {
        "propName": "identifier",
        "methodName": "onIdentifierChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "hubSearchInputChange",
        "method": "onSearchChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
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
