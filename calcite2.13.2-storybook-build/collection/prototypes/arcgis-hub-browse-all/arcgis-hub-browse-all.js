import { Catalog, getWithDefault, searchCatalogs, uniqueBy, Logger } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { addPathToResults } from '../../utils/gallery-utils';
export class ArcgisHubBrowseAll {
  constructor() {
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
  static get is() { return "arcgis-hub-browse-all"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-browse-all.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-browse-all.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
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
          "text": "The entity whose capabilities we are browsing"
        }
      },
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "LayoutOptions",
          "resolved": "\"calendar\" | \"compact\" | \"grid\" | \"grid-filled\" | \"list\" | \"map\" | \"table\"",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'grid'"
      },
      "showSearch": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "show-search",
        "reflect": false,
        "defaultValue": "true"
      },
      "linkTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardModelTarget",
          "resolved": "\"event\" | \"none\" | \"self\" | \"siteRelative\" | \"workspaceRelative\"",
          "references": {
            "CardModelTarget": {
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
        "attribute": "link-target",
        "reflect": false,
        "defaultValue": "'siteRelative'"
      },
      "path": {
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
          "text": "Content Hierarchy Path that will be appended onto the urls of individual cards\nas `?path=${path}`"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
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
          "text": "Term passed into the galleries"
        },
        "attribute": "term",
        "reflect": false,
        "defaultValue": "''"
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'gallery-list' | 'combined'",
          "resolved": "\"combined\" | \"gallery-list\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The mode of the browse all component\n- gallery-list: display a list of galleries\n- combined: query all catalogs & collections and show in a big list, sorted by date, with buttons to explore more from each catalog,"
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'combined'"
      }
    };
  }
  static get states() {
    return {
      "loading": {},
      "gridColumns": {},
      "combinedResults": {}
    };
  }
  static get events() {
    return [{
        "method": "hubBrowseMoreSelected",
        "name": "hubBrowseMoreSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "term",
        "methodName": "combinedSearch"
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
