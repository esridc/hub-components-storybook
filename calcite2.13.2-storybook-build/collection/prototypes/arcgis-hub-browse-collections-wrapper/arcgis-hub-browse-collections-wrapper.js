import { Catalog, fetchHubEntity, lookupDomain } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
export class ArcgisHubBrowseCollectionsWrapper {
  constructor() {
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
  static get is() { return "arcgis-hub-browse-collections-wrapper"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-browse-collections-wrapper.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-browse-collections-wrapper.css"]
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
      "domain": {
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
        "attribute": "domain",
        "reflect": false,
        "defaultValue": "\"\""
      },
      "view": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"browse\" | \"collection\"",
          "resolved": "\"browse\" | \"collection\"",
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
        "defaultValue": "\"browse\""
      },
      "collection": {
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
        "attribute": "collection",
        "reflect": false
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
      }, {
        "propName": "domain",
        "methodName": "onDomainChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "hubBrowseCollectionSelected",
        "method": "onCollectionSelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
