import { Catalog } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import { bind } from '../../utils/context';
export class ArcgisHubBrowseCollections {
  constructor() {
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
  static get is() { return "arcgis-hub-browse-collections"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-browse-collections.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-browse-collections.css"]
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
      "capability": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubCapability",
          "resolved": "\"content\" | \"discussions\" | \"events\" | \"initiatives\" | \"pages\" | \"projects\"",
          "references": {
            "HubCapability": {
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
        "attribute": "capability",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "searchValue": {}
    };
  }
  static get events() {
    return [{
        "method": "hubBrowseCollectionSelected",
        "name": "hubBrowseCollectionSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Raise event when a collection is selected"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
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
