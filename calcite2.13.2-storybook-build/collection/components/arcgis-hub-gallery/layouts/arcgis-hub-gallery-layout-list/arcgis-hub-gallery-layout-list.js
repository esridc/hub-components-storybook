import { getCardModelUrlFromResult } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { CORNERS, IMAGE_TYPES } from '../../../interfaces';
import { bind } from '../../../../utils/context';
import { ResizeObserverManager } from '../../../../utils/resize-observer';
import intlManager from '../../../../utils/intl-manager';
/**
 * arcgis-hub-gallery-layout-list
 * A component for rendering an array of IHubSearchResults in a list, grid, or grid-filled layout
 * Can be used standalone or via the gallery with layout="list|grid|grid-filled"
 */
export class ArcgisHubGalleryLayoutList {
  constructor() {
    this.getCardLayout = (layout, idx, count) => {
      // if it is 'grid' or 'grid-filled', we set it to 'card'; if it is 'list', we set it to 'row'
      let result = layout === 'list' ? 'row' : 'card';
      if (layout === 'grid-filled') {
        // if the last row contains fewer than the number of columns, return 'row' for the ones in the last row
        const numInLastRow = count % this.gridColumns;
        const isInLastRow = idx >= (count - numInLastRow);
        if (numInLastRow < 2 && isInLastRow) {
          // if there are fewer than 2 in the last row and this one is in the last row
          result = 'row';
        }
      }
      return result;
    };
    this.layout = 'list';
    this.searchResults = [];
    this.loading = false;
    this.selectedMapFeatureIds = [];
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.showThumbnail = true;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.newTab = false;
    this.selectionMode = 'none';
    this.cardTitleTag = undefined;
    this.corners = CORNERS.square;
    this.showAdditionalInfo = true;
    this.showEmptyState = true;
    this.shadow = undefined;
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.cardActionLinks = [];
    this.handleMouseEventEntityCard = undefined;
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    this.primaryActionsToRender = 1;
    this.gridColumns = 4;
    bind(this, 'handleResize', 'setPreviousResultsEnd');
  }
  get selectable() {
    return this.selectionMode !== 'none';
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  connectedCallback() {
    if (this.layout === 'grid-filled') {
      // we could implement grid-filled with css container queries now that they are a thing
      // one wrinkle is that depending on the size and the number of items, we need to send a different layout param to the last one or two cards
      ResizeObserverManager.addHandler(this.element, this.handleResize);
    }
  }
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  componentDidUpdate() {
    var _a;
    (_a = this.previousResultsEnd) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
  }
  async handleResize() {
    const width = this.element.clientWidth;
    let gridColumns = 1;
    if (width > 1090) {
      gridColumns = 4;
    }
    else if (width > 810) {
      gridColumns = 3;
    }
    else if (width > 530) {
      gridColumns = 2;
    }
    // set the css custom prop
    this.element.style.setProperty('--columns', `${gridColumns}`);
    // set state so it can be used to calculate whether an individual card should get card or row layout
    this.gridColumns = gridColumns;
  }
  setPreviousResultsEnd(el) {
    this.previousResultsEnd = el;
  }
  renderResult(result, idx = 0) {
    const { searchResults, selectedMapFeatureIds } = this;
    /** Mark all pre-selected cards as selected in current list */
    const selected = this.selectedIds.includes(result.id);
    /** Record index for telemetry purposes */
    result.index = idx;
    /**
     * if showLinkButton is true we want to show a link button
     * at the bottom of the card that links to the same place
     * as the title link. To do this, we leverage actionLinks.
     * This is primarily to support the gallery layout card
     * use-case
     */
    const actionLinks = [...this.cardActionLinks];
    this.showLinkButton && actionLinks.unshift({
      ariaLabel: `${this.linkButtonText} ${result.name}`,
      label: this.linkButtonText,
      showLabel: true,
      href: getCardModelUrlFromResult(result, this.linkTarget, this.baseUrl),
      buttonStyle: this.linkButtonStyle
    });
    return (h("arcgis-hub-entity-card", { actionLinks: actionLinks, baseUrl: this.baseUrl, callback: this.callback,
      // note: this class is specifically needed for
      // e2e test purposes. Please do not remove
      class: "arcgis-hub-entity-card", corners: this.corners, "data-map-selected": selectedMapFeatureIds.includes(result.id), "data-test": result.name, imageType: this.imageType, key: result.id, layout: this.getCardLayout(this.layout, idx, searchResults.length), lazy: this.lazy, linkTarget: this.linkTarget, newTab: this.newTab, onMouseDown: this.handleMouseEventEntityCard, onMouseLeave: this.handleMouseEventEntityCard, onMouseOver: this.handleMouseEventEntityCard, primaryActionsToRender: this.primaryActionsToRender, searchResult: result, selectable: this.selectable, selected: selected, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType, titleTag: this.cardTitleTag }));
  }
  ;
  _renderLoading() {
    let headingRows = 1;
    this.showType || this.showOwner && headingRows++;
    this.layout !== 'list' && headingRows++;
    const skeletons = [...Array(this.limit).keys()].map((idx) => {
      return h("arcgis-skeleton-loader", { active: true, headingRows: headingRows, key: idx, rows: 3, showHeading: true, showThumbnail: this.layout !== "list" }, this.showLinkButton && h("div", { class: "loading-link-button" }));
    });
    return h("div", { class: "card-container" }, skeletons);
  }
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState() {
    const messageKey = this.hasError ? "helpState.error.message" : "helpState.noResults.message";
    const message = this.intl.t(messageKey);
    const actionSlot = this.hasError ? "search-error-action" : "no-results-action";
    return (h(Fragment, null, h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, h("div", { "aria-live": "polite", role: "status", slot: "message" }, h("h3", null, message)), h("span", { slot: "actions" }, h("div", { class: "no-results-action-container" }, h("slot", { name: actionSlot }))))));
  }
  _renderResults() {
    const { searchResults } = this;
    let result;
    if (!!searchResults.length) {
      const results = searchResults.reduce((acc, result, idx) => {
        acc.push(this.layout === 'list'
          // A11y requirements dictate that results in a list layout must be wrapped in a list item element
          ? h("li", null, this.renderResult(result, idx))
          : this.renderResult(result, idx));
        // inject a focusable element at the end of the previous list of results
        // after render, we focus that element if it is present
        // which will be the case after a user clicks the more results button in the parent component
        if (idx === this.lastSearchResultsCount - 1) {
          acc.push(h("div", { class: "previous-results-end", ref: this.setPreviousResultsEnd, tabIndex: -1 }));
        }
        return acc;
      }, []);
      // a11y requirements dictate that the list layout must be wrapped in a list element
      const ContainerTag = this.layout === 'list' ? 'ul' : 'div';
      result = h(Fragment, null, h(ContainerTag, { class: {
          'card-container': true,
          [`cols-${this.gridColumns}`]: this.layout === "grid-filled"
        }, "data-test": "result-container" }, results));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-list" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get is() { return "arcgis-hub-gallery-layout-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "LayoutOptions",
          "resolved": "\"calendar\" | \"compact\" | \"grid\" | \"grid-filled\" | \"list\" | \"map\" | \"table\"",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The gallery layout: list, grid, grid-filled, or map - default is list\nmost of them know what their layout is but arcgis-hub-gallery-layout-list\nhandles both list and grid and needs to know which one"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'list'"
      },
      "searchResults": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSearchResult[]",
          "resolved": "IHubSearchResult[]",
          "references": {
            "IHubSearchResult": {
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
        "defaultValue": "[]"
      },
      "loading": {
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
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "selectedMapFeatureIds": {
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
          "text": ""
        },
        "defaultValue": "[]"
      },
      "selectedIds": {
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
          "text": ""
        },
        "defaultValue": "[]"
      },
      "baseUrl": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "base-url",
        "reflect": false
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
          "text": "Pre-defined options of where the card should redirect"
        },
        "attribute": "link-target",
        "reflect": false,
        "defaultValue": "'self'"
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
          "text": ""
        },
        "attribute": "limit",
        "reflect": false,
        "defaultValue": "10"
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
          "text": ""
        },
        "attribute": "show-thumbnail",
        "reflect": false,
        "defaultValue": "true"
      },
      "imageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IMAGE_TYPES",
          "resolved": "IMAGE_TYPES.icon | IMAGE_TYPES.thumbnail",
          "references": {
            "IMAGE_TYPES": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The type of image that individual cards will display.\nEither thumbnail or icon, defaults to thumbnail."
        },
        "attribute": "image-type",
        "reflect": false,
        "defaultValue": "IMAGE_TYPES.thumbnail"
      },
      "lazy": {
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
          "text": "Indicates if the thumbnail on individual cards should lazy load"
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Whether the target url for individual cards should open up in a new tab"
        },
        "attribute": "new-tab",
        "reflect": false,
        "defaultValue": "false"
      },
      "selectionMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SelectionMode",
          "resolved": "\"multiple\" | \"none\" | \"single\"",
          "references": {
            "SelectionMode": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether individual cards are selectable via a checkbox"
        },
        "attribute": "selection-mode",
        "reflect": false,
        "defaultValue": "'none'"
      },
      "cardTitleTag": {
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
          "text": "Defines what tag (i.e <h3>, <h4>) should wrap the titles on each card. Used for accessibility compliance."
        },
        "attribute": "card-title-tag",
        "reflect": false
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
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines how the corners of each card are styled."
        },
        "attribute": "corners",
        "reflect": false,
        "defaultValue": "CORNERS.square"
      },
      "showAdditionalInfo": {
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
          "text": "Whether individual cards should display additional info (metadata) about their view models"
        },
        "attribute": "show-additional-info",
        "reflect": false,
        "defaultValue": "true"
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
          "text": "Whether the gallery should show special empty state when the current search has returned no results"
        },
        "attribute": "show-empty-state",
        "reflect": false,
        "defaultValue": "true"
      },
      "shadow": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DROP_SHADOWS",
          "resolved": "DROP_SHADOWS.heavy | DROP_SHADOWS.low | DROP_SHADOWS.medium | DROP_SHADOWS.none",
          "references": {
            "DROP_SHADOWS": {
              "location": "import",
              "path": "../../../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines how heavy of a drop shadow should be applied to the individual cards"
        },
        "attribute": "shadow",
        "reflect": false
      },
      "showLinkButton": {
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
          "text": "Whether the individual cards should add a link button (as opposed to relying on\nthe link in the card's title). Must be used in conjunction with `linkButtonText`."
        },
        "attribute": "show-link-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "linkButtonText": {
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
          "text": "The text to display on each card's link button. Must be used in conjunction with `showlinkButton`."
        },
        "attribute": "link-button-text",
        "reflect": false
      },
      "linkButtonStyle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Appearance",
          "resolved": "\"outline\" | \"outline-fill\" | \"solid\" | \"transparent\"",
          "references": {
            "Appearance": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`."
        },
        "attribute": "link-button-style",
        "reflect": false
      },
      "showBadges": {
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
          "text": "Show/hide available badges on each card. Badges are defined in the view model of each card."
        },
        "attribute": "show-badges",
        "reflect": false,
        "defaultValue": "true"
      },
      "showType": {
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
          "text": "Show/hide the view model's family name and icon on each card"
        },
        "attribute": "show-type",
        "reflect": false,
        "defaultValue": "true"
      },
      "showOwner": {
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
          "text": "Show/hide the view model's source information on each card"
        },
        "attribute": "show-owner",
        "reflect": false,
        "defaultValue": "true"
      },
      "cardActionLinks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICardActionLink[]",
          "resolved": "ICardActionLink[]",
          "references": {
            "ICardActionLink": {
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
        "defaultValue": "[]"
      },
      "handleMouseEventEntityCard": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(event: MouseEvent) => void",
          "resolved": "(event: MouseEvent) => void",
          "references": {
            "MouseEvent": {
              "location": "global"
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
      "lastSearchResultsCount": {
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
          "text": "The number of search results from the last search\nused by some layouts for a11y purposes"
        },
        "attribute": "last-search-results-count",
        "reflect": false
      },
      "hasError": {
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
        "attribute": "has-error",
        "reflect": false,
        "defaultValue": "false"
      },
      "callback": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CardViewModelCallback",
          "resolved": "(model: IHubCardViewModel, layout: CardLayout, context: IArcGISContext, result: HubEntity | IHubSearchResult) => IHubCardViewModel",
          "references": {
            "CardViewModelCallback": {
              "location": "import",
              "path": "../../../../utils/cardModelConverters/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Passing a callback function into the gallery allows the developer to apply custom\nbusiness logic to the processing of the Card View model. This is useful in scenarios\nwhere we want to show non-standard metadata, badges, actions and to apply logic to\nthe selectability of the card."
        }
      },
      "primaryActionsToRender": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 2| 3",
          "resolved": "1 | 2 | 3",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "primary-actions-to-render",
        "reflect": false,
        "defaultValue": "1"
      }
    };
  }
  static get states() {
    return {
      "gridColumns": {}
    };
  }
  static get elementRef() { return "element"; }
}
