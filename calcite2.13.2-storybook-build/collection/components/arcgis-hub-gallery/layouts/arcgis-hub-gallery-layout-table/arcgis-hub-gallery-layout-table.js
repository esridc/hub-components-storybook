import { getProp } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { getGlobalContext } from '../../../../utils';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
import { getTableColumns } from '../../utils/get-table-columns';
import { getViewModel } from '../../utils/get-view-model';
import { interpolateTranslations } from '../../../../utils';
/**
 * arcgis-hub-gallery-layout-table
 * A component for rendering an array of IHubSearchResults in a table layout
 * Can be used standalone or via the gallery with layout="table"
 */
export class ArcgisHubGalleryLayoutTable {
  constructor() {
    this.searchResults = [];
    this.loading = false;
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.entityType = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.newTab = false;
    this.selectionMode = 'none';
    this.showAdditionalInfo = true;
    this.showType = true;
    this.showOwner = true;
    this.cardActionLinks = [];
    this.showEmptyState = true;
    this.showThumbnail = true;
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    this.columns = undefined;
    bind(this, 'handleSelect', '_renderRow', 'setNextResultsStart');
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get context() {
    return getGlobalContext();
  }
  get _showType() {
    return this.showType && !["group", "user"].includes(this.entityType);
  }
  handleSelect(event) {
    const id = event.target.dataset.id;
    this.arcgisHubCardSelect.emit({ id });
  }
  /*
    Start more results a11y features
    After the user clicks the more results button, we need to focus the first result in the new list
    for accessibility.
  */
  componentDidUpdate() {
    // after the component updates we focus the first result in the new list
    setTimeout(() => {
      var _a, _b;
      // focus the td inside the first calcite-table-cell
      // in the first calcite-table-row of the new results
      (_b = (_a = this.nextResultsStart) === null || _a === void 0 ? void 0 : _a.shadowRoot.querySelector('td')) === null || _b === void 0 ? void 0 : _b.focus({ preventScroll: true });
    }, 200);
  }
  setNextResultsStart(el) {
    // we keep a reference to the first calcite-table-cell
    // in the first calcite-table-row of the new results
    this.nextResultsStart = el;
  }
  /* End more results a11y feature */
  _renderLoading() {
    return h("div", { class: "card-container" }, h("arcgis-skeleton-loader", { active: true, rows: this.limit }));
  }
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState() {
    let message = this.intl.t("helpState.noResults.message");
    let actionSlot = "no-results-action";
    if (this.hasError) {
      message = this.intl.t("helpState.error.message");
      actionSlot = "search-error-action";
    }
    return (h(Fragment, null, h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, h("div", { "aria-live": "polite", role: "status", slot: "message" }, h("h3", null, message)), h("span", { slot: "actions" }, h("div", { class: "no-results-action-container" }, h("slot", { name: actionSlot }))))));
  }
  rowActionHandler(action, model) {
    this.arcgisHubCardAction.emit({ action, model });
  }
  getViewModel(model) {
    const opts = {
      actionLinks: this.cardActionLinks,
      baseUrl: this.baseUrl,
      locale: this.intl.locale,
      target: this.linkTarget
    };
    return getViewModel(model, 'table-row', opts, this.callback, this.context, this.intl);
  }
  _renderActionLinks(model) {
    const actionLinks = model.viewModel.actionLinks.map((link, id) => {
      let label = link.label;
      if (!label && link.i18nKey) {
        label = this.intl.t(link.i18nKey);
      }
      const handler = link.action && this.rowActionHandler.bind(this, link.action, model.viewModel);
      const button = (h("calcite-button", { appearance: link.buttonStyle, disabled: link.disabled, href: link.href, iconStart: link.icon, key: id, label: link.ariaLabel || label, onClick: handler ? handler : undefined, scale: "s", target: this.newTab ? "_blank" : "_self", width: "full" }, link.showLabel && label));
      return (link.tooltip
        ? h("arcgis-ref-tooltip", { key: label, overlayPositioning: "fixed", placement: "top", text: link.tooltip }, button)
        : button);
    });
    return h("div", { class: "actions-container" }, actionLinks);
  }
  _renderCellContent(column, value) {
    const styles = { width: column.cellWidth };
    const InnerTag = column.multilineCellEllipsis ? 'arcgis-multiline-ellipsis' : 'div';
    return h(InnerTag, Object.assign({}, column.multilineCellEllipsis, { style: styles }), value);
  }
  _renderCell(column, model, isNextResultsStart) {
    let formattedValue;
    if (column.key === "cardActions") {
      // cardactions are special
      // it would probably be possible to make that not be the case
      // similarly to how title is handled
      formattedValue = this._renderActionLinks(model);
    }
    else {
      const value = getProp(model, column.key);
      formattedValue = column.formatter ? column.formatter(value, model, column.key, this.intl) : value;
    }
    return h("calcite-table-cell", { alignment: column.contentCellAlignment, key: column.key, ref: isNextResultsStart ? this.setNextResultsStart : undefined }, this._renderCellContent(column, formattedValue));
  }
  _renderRow(searchResult, idx) {
    const viewModel = this.getViewModel(searchResult);
    // we use this model that encapsulates the search result and the view model
    // because we want the viewModel for some things but it is very limited
    // and also some of the stuff it contains is in additionalInfo
    // which is an array - and that makes it difficult to deterministically get the value we want (the array order could change)
    const model = { searchResult, viewModel };
    const isSelected = this.selectedIds.includes(searchResult.id);
    const isFirstOfNewResults = idx === this.lastSearchResultsCount;
    return h("calcite-table-row", { "data-id": searchResult.id, key: searchResult.id, onCalciteTableRowSelect: this.handleSelect, selected: isSelected }, this._columns.reduce((acc, column, idx) => {
      const result = this._renderCell(column, model, isFirstOfNewResults && idx === 0);
      acc.push(result);
      return acc;
    }, []));
  }
  ;
  _renderHead() {
    return h("calcite-table-row", { slot: "table-header" }, this._columns.reduce((acc, column) => {
      acc.push(h("calcite-table-header", { alignment: column.headerCellAlignment, description: column.description, heading: column.header }));
      return acc;
    }, []));
  }
  get _columns() {
    const { cardActionLinks, newTab, showThumbnail } = this;
    const opts = { newTab, showThumbnail, showRowActions: !!cardActionLinks.length };
    const columns = getTableColumns(this.entityType, opts, this.context, this.columns);
    const translatedColumns = interpolateTranslations(this.intl, { columns });
    return translatedColumns.columns;
  }
  _renderResults() {
    const { searchResults } = this;
    let result;
    if (!!searchResults.length) {
      result = h(Fragment, null, h("calcite-table", { bordered: true, caption: this.intl.t("caption"), class: "card-container", "data-test": "result-container",
        // selectionDisplay must be none because clearing the selection does not raise an event which prevents the gallery from managing the selection
        selectionDisplay: "none", selectionMode: this.selectionMode }, this._renderHead(), searchResults.map(this._renderRow)));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-table" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get is() { return "arcgis-hub-gallery-layout-table"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-table.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-gallery-layout-table.css"]
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
      "entityType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityType",
          "resolved": "\"channel\" | \"communityUser\" | \"discussionPost\" | \"event\" | \"eventAttendee\" | \"group\" | \"groupMember\" | \"item\" | \"portalUser\" | \"user\"",
          "references": {
            "EntityType": {
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
        "attribute": "entity-type",
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
      "columns": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(IGalleryTableColumn | GalleryTableColumnName)[]",
          "resolved": "(IGalleryTableColumn | GalleryTableColumnName)[]",
          "references": {
            "IGalleryTableColumn": {
              "location": "import",
              "path": "../../utils/get-table-columns"
            },
            "GalleryTableColumnName": {
              "location": "import",
              "path": "../../utils/get-table-columns"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The columns to render when the layout is 'table'\nIf not provided, the default columns for the entity type will be used\nsee ../layouts.md for more info"
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
      }, {
        "method": "arcgisHubCardAction",
        "name": "arcgisHubCardAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ action: string, model: IHubCardViewModel }",
          "resolved": "{ action: string; model: IHubCardViewModel; }",
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
