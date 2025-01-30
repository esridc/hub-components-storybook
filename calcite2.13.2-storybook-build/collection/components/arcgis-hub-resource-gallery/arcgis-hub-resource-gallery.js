import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import { CORNERS, DROP_SHADOWS } from '../interfaces';
/**
 * Display a gallery of links to help docs, blog posts and other Hub related resources.
 * Resources are automatically limited to the standard Hub Resource group for
 * the user's environment (DEV/QA/PROD).
 * To further subset the resources to display, provide an array of tags.
 */
export class ArcgisHubResourceGallery {
  constructor() {
    /**
     * Callback to modify the model for the resource gallery
     * where we want to clear any action links and additional infos
     * so it's a very minimal rendering
     * @param model
     * @param _layout
     * @param _context
     * @param _result
     * @returns
     */
    this.resourceCallback = (model, _layout, _context, _result) => {
      model.additionalInfo = [];
      model.actionLinks = [];
      return model;
    };
    this.headingText = undefined;
    this.headingLevel = 3;
    this.tags = [];
    this.limit = 4;
    this._context = getGlobalContext();
    this.hasResults = false;
  }
  get resourceQuery() {
    const resourceGroupIds = this._context.resourceGroupIDs || [];
    // create the predicate for the query
    const predicate = {
      group: resourceGroupIds,
      type: ["Document Link"],
    };
    // if we have tags, add them to the query
    if (this.tags.length) {
      predicate.tags = this.tags;
    }
    // construct the whole query
    const query = {
      targetEntity: "item",
      filters: [
        {
          predicates: [
            predicate
          ],
        }
      ]
    };
    // console.log(query);
    // return it
    return query;
  }
  renderHeader() {
    const HeadingTag = `h${this.headingLevel}`;
    return (this.hasResults ? h(HeadingTag, null, this.headingText) : null);
  }
  onResourceGalleryResultsChanged(event) {
    this.hasResults = event.detail.length > 0;
  }
  render() {
    return (h(Host, { "data-element": "resource-gallery" }, this.renderHeader(), h("arcgis-hub-gallery", { baseUrl: this._context.hubHomeUrl, callback: this.resourceCallback, corners: CORNERS.round, galleryType: "item", layout: "compact", limit: this.limit, "link-target": "siteRelative", newTab: true, query: this.resourceQuery, shadow: DROP_SHADOWS.low, showEmptyState: false, showSearch: false, showThumbnail: false, sortField: "modified", sortOrder: "desc" }, h("div", { slot: "loading-screen" }))));
  }
  static get is() { return "arcgis-hub-resource-gallery"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-resource-gallery.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-resource-gallery.css"]
    };
  }
  static get properties() {
    return {
      "headingText": {
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
          "text": "Header text for the gallery"
        },
        "attribute": "heading-text",
        "reflect": false
      },
      "headingLevel": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "HeadingLevel",
          "resolved": "1 | 2 | 3 | 4 | 5 | 6",
          "references": {
            "HeadingLevel": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "HTML tag to use for the header"
        },
        "attribute": "heading-level",
        "reflect": false,
        "defaultValue": "3"
      },
      "tags": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tags to filter the resources by e.g. `[\"userworkspace\", \"hub doc\"]`"
        },
        "defaultValue": "[]"
      },
      "limit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum number of resources to display"
        },
        "attribute": "limit",
        "reflect": false,
        "defaultValue": "4"
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "hasResults": {}
    };
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryResultsChange",
        "method": "onResourceGalleryResultsChanged",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
