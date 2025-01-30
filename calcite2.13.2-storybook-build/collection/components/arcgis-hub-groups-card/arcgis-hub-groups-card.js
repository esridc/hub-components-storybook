import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { CORNERS } from '../interfaces';
export class ArcgisHubGroupsCard {
  constructor() {
    this.groups = [];
    this.newTab = false;
    this.showThumbnail = true;
    this.cardTitle = undefined;
    this.titleAlign = 'left';
    this.layout = 'grid';
    this.corners = CORNERS.square;
    this.showEmptyState = true;
    this.baseUrl = undefined;
    this.searchResponseHasResults = undefined;
  }
  async componentWillLoad() {
    // Hook up intl
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.generateCollection();
  }
  // Should this or another function in this component be watching for context? I ended up removing it completely which doesn't seem quite right to me...
  onGroupsChanged() {
    this.generateCollection();
  }
  onResultsChange(event) {
    const results = event.detail;
    // Determine if there are any search results.
    this.searchResponseHasResults = results.length > 0;
  }
  generateCollection() {
    if (this.groups.length) {
      // Create filters, basically is just the group ids.
      this.collection = {
        key: "group-card-cpllection",
        label: "Group Card Collection",
        targetEntity: "group",
        include: [],
        scope: {
          targetEntity: "group",
          filters: [
            {
              predicates: [
                {
                  id: {
                    any: this.groups
                  }
                }
              ]
            }
          ]
        }
      };
    }
  }
  renderCardTitle() {
    // If we want to show a card title
    if (this.cardTitle) {
      // Render it
      // if a card title was passed in use it, or default back to intl.
      return (h("div", { class: {
          ["title-wrapper"]: true,
          [`text-${this.titleAlign}`]: true,
          hide: (!this.showEmptyState && !this.searchResponseHasResults)
        } }, h("h5", null, this.cardTitle)));
    }
  }
  render() {
    // If we have any groups...
    return this.groups.length ? (h(Host, null, this.renderCardTitle(), h("arcgis-hub-gallery", { baseUrl: this.baseUrl, corners: this.corners, layout: this.layout, limit: this.groups.length + 1, linkTarget: "siteRelative", newTab: this.newTab, query: this.collection.scope, showBadges: false, showEmptyState: this.showEmptyState, showThumbnail: this.showThumbnail, sortByIds: this.groups }))) : (h("div", { class: "empty-state" }, h("calcite-icon", { icon: "group", scale: "l" })));
  }
  static get is() { return "arcgis-hub-groups-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-groups-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-groups-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "groups": {
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
          "text": "Id's of groups to render"
        },
        "defaultValue": "[]"
      },
      "newTab": {
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
          "text": "If true then open in new tab, if false then open in the same tab"
        },
        "attribute": "new-tab",
        "reflect": false,
        "defaultValue": "false"
      },
      "showThumbnail": {
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
          "text": "Show/hide thumbnails"
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "true"
      },
      "cardTitle": {
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
          "text": "Card cardTitle passed in"
        },
        "attribute": "card-title",
        "reflect": false
      },
      "titleAlign": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'left' | 'right' | 'center'",
          "resolved": "\"center\" | \"left\" | \"right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Title alignment in relation to the card."
        },
        "attribute": "title-align",
        "reflect": false,
        "defaultValue": "'left'"
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'list' | 'grid'",
          "resolved": "\"grid\" | \"list\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Groups displayed as a list or grid, defaults to grid."
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "'grid'"
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies whether corners should be round or square\nrefelected so we can target it with css"
        },
        "attribute": "corners",
        "reflect": true,
        "defaultValue": "CORNERS.square"
      },
      "showEmptyState": {
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
        "attribute": "show-empty-state",
        "reflect": false,
        "defaultValue": "true"
      },
      "baseUrl": {
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
          "text": "Base url from which to generate urls"
        },
        "attribute": "base-url",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "searchResponseHasResults": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "groups",
        "methodName": "onGroupsChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryResultsChange",
        "method": "onResultsChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
