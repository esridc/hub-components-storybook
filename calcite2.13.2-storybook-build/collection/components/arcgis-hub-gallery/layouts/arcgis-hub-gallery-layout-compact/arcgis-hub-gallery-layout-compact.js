import { Fragment, Host, h } from '@stencil/core';
import { bind } from '../../../../utils/context';
import { IMAGE_TYPES } from '../../../interfaces';
import intlManager from '../../../../utils/intl-manager';
import { getGlobalContext } from '../../../../utils/state';
import { getViewModel } from '../../utils/get-view-model';
import { getFallbackUrl, getThumbnailUrl } from '../../utils/thumbnail';
/**
 * arcgis-hub-gallery-layout-compact
 * A component for rendering an array of IHubSearchResults in a compact layout
 * Can be used standalone or via the gallery with layout="compact"
 *
 * NOTE: This component is not yet fully implemented
 */
// TODO: Mind the TODOs below when implementing this component
export class ArcgisHubGalleryLayoutCompact {
  constructor() {
    this.searchResults = [];
    this.loading = false;
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.newTab = false;
    this.cardTitleTag = undefined;
    this.showEmptyState = true;
    this.showThumbnail = true;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.selectionMode = 'none';
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.cardActionLinks = [];
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    bind(this, 'handleSelect', 'setPreviousResultsEnd');
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  get context() {
    return getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentDidUpdate() {
    var _a;
    (_a = this.previousResultsEnd) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
  }
  handleSelect(event) {
    const id = event.target.dataset.id;
    this.arcgisHubCardSelect.emit({ id });
  }
  setPreviousResultsEnd(el) {
    this.previousResultsEnd = el;
  }
  renderThumbnail(model) {
    // TODO: we should have an entitythumbnail component - possibly a function component
    let image;
    // Only render the thumbnail when not in loading state
    // so the <calcite-card> loader will not appear in thumbnail slot in row layout
    if (this.showThumbnail) {
      if (model.type === "User" || model.type === "channel") {
        // image = this.renderAvatar(model);
      }
      else {
        // content/item or group
        // const className = this.getThumbnailClassName(model);
        // eslint-disable-next-line unicorn/prefer-ternary
        if (this.imageType === IMAGE_TYPES.thumbnail) {
          image = h("arcgis-hub-image", { alt: "",
            // class={className}
            fallback: getFallbackUrl(model), lazy: this.lazy, slot: "content-start", src: getThumbnailUrl(model, 40, this.context) });
        }
        else {
          // image = <div class="icon-container">
          //   <calcite-icon icon={this.contentTypeIcon} scale="l" />
          // </div>
        }
      }
    }
    return image;
  }
  getViewModel(model) {
    const opts = {
      actionLinks: this.cardActionLinks,
      baseUrl: this.baseUrl,
      locale: this.intl.locale,
      target: this.linkTarget
    };
    return getViewModel(model, 'row', opts, this.callback, this.context, this.intl);
  }
  renderResult(result) {
    // TODO: this is nowhere near a complete implementation
    // i think using calcite-list is the way to go , mostly because it supports selection
    const model = this.getViewModel(result);
    const cardActionLinks = model.actionLinks ? model.actionLinks : this.cardActionLinks;
    /** Mark all pre-selected cards as selected in current list */
    const selected = this.selectedIds.includes(result.id);
    return h("calcite-list-item", { "data-id": model.id, key: model.id, onCalciteListItemSelect: this.handleSelect, selected: selected }, this.renderThumbnail(model), h("div", { slot: "content" }, this.renderTitle(model), h("arcgis-multiline-ellipsis", { lines: 2 }, model.summary)), this.renderAdditionalInfo(model.additionalInfo), cardActionLinks.map((actionLink, idx) => {
      return this.renderActionLink(actionLink, this.newTab, `${model.id}-${idx}`);
    }));
  }
  ;
  renderTitle(model) {
    const href = model.titleUrl;
    const TitleTag = this.cardTitleTag || 'h3';
    if (href) {
      return h(TitleTag, null, h("calcite-link", { href: href, iconEnd: this.newTab ? "launch-2" : "", target: this.newTab ? "_blank" : "_self" }, model.title));
    }
    else {
      h(TitleTag, null, model.title);
    }
  }
  // Not used yet, but setting up for future use
  renderAdditionalInfo(infos) {
    if (infos.length) {
      return (h("dl", { slot: "content-bottom" }, infos.map((config, idx) => (h("span", { key: idx }, h("dt", { key: `dt${idx}` }, config.i18nKey ? this.intl.t(config.i18nKey) : config.label), h("dd", { key: `dd${idx}` }, config.value))))));
    }
  }
  renderActionLink(actionLink, newTab, key) {
    return actionLink.href ? this.renderButtonActionLink(actionLink, newTab, key) : this.renderActionActionLink(actionLink, key);
  }
  renderButtonActionLink(actionLink, newTab, key) {
    return h(Fragment, null, h("calcite-button", { appearance: actionLink.buttonStyle, href: actionLink.href, "icon-start": actionLink.icon, id: `al-${key}`, key: key, label: actionLink.ariaLabel, rel: "no-follow", scale: "m", slot: "actions-end", target: newTab ? "_blank" : "_self", text: actionLink.label }), this.renderToolltip(actionLink, key));
  }
  renderToolltip(actionLink, key) {
    if (actionLink.tooltip) {
      return h("calcite-tooltip", { key: key, label: actionLink.ariaLabel, "overlay-positioning": "fixed", placement: "bottom", "reference-element": `al-${key}`, slot: "actions-end" }, h("span", null, actionLink.tooltip));
    }
  }
  renderActionActionLink(actionLink, key) {
    return h("calcite-action", { icon: actionLink.icon, key: key, label: actionLink.ariaLabel, scale: "m", slot: "actions-end", text: actionLink.label, textEnabled: actionLink.showLabel });
  }
  _renderLoading() {
    return h("div", { class: "card-container" }, h("arcgis-skeleton-loader", { active: true, rows: this.limit }));
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
        acc.push(this.renderResult(result));
        // inject a focusable element at the end of the previous list of results
        // after render, we focus that element if it is present
        // which will be the case after a user clicks the more results button in the parent component
        if (idx === this.lastSearchResultsCount - 1) {
          acc.push(h("div", { class: "previous-results-end", ref: this.setPreviousResultsEnd, tabIndex: -1 }));
        }
        return acc;
      }, []);
      result = h(Fragment, null, h("div", { class: "card-container", "data-test": "result-container" }, h("calcite-list", { selectionMode: this.selectionMode }, results)));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-compact" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get is() { return "arcgis-hub-gallery-layout-compact"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-compact.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-compact.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCardSelect",
        "name": "arcgisHubCardSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IHubCardViewModel",
          "resolved": "IHubCardViewModel",
          "references": {
            "IHubCardViewModel": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
