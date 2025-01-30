import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { SortDirection } from '../../utils/cardModelConverters/types';
export class ArcgisHubSearchSort {
  constructor() {
    this.sortOptions = [];
    this.activeSortOption = undefined;
    this.sortOrderIcon = undefined;
    bind(this, 'setDropdownEl', 'handleOrderChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentWillRender() {
    this.sortOrderIcon = this.activeSortOption.order === 'asc' ? "sort-ascending-arrow" : "sort-descending-arrow";
  }
  /**
   * Listen to the sort field dropdown change and fire the sort change fn with new activeSortOption
   */
  handleFieldChangeEvent() {
    const selectedItems = this.dropdownEl.selectedItems;
    if (selectedItems.length) {
      // Component is set to single-select mode, so there should only ever be one
      const selectedValue = selectedItems[0].dataset.value || null;
      this.activeSortOption = this.sortOptions.find(e => e.attribute === selectedValue);
      // Because we can only send one argument to hubSearchSortChange event,
      // we have to alternate the sort order in activeSortOption while keeping
      // the default orders there. So when sort field is changed,
      // we will reset the sort order to the default order here
      this.activeSortOption.order = SortDirection[this.activeSortOption.defaultOrder];
      this.hubSearchSortChange.emit(this.activeSortOption);
    }
  }
  setDropdownEl(el) {
    this.dropdownEl = el;
  }
  /**
   * Whenever sort order button is clicked, change the sort order and its icon, then
   * Fire the sort change fn with new activeSortOption
   */
  handleOrderChange() {
    this.activeSortOption.order = this.activeSortOption.order === "asc" ? "desc" : "asc";
    this.sortOrderIcon = this.activeSortOption.order === 'asc' ? "sort-ascending-arrow" : "sort-descending-arrow";
    this.hubSearchSortChange.emit(this.activeSortOption);
  }
  render() {
    var _a, _b;
    return (h(Host, null, h("calcite-dropdown", { ref: this.setDropdownEl }, h("calcite-button", { appearance: "transparent", "aria-label": this.intl.t('change-sort-order'), color: "blue", "data-test": "sort-attribute", "icon-end": "caret-down", slot: "trigger" }, h("span", { title: this.intl.t((_a = this.activeSortOption.attribute) !== null && _a !== void 0 ? _a : 'relevance') }, this.intl.t((_b = this.activeSortOption.attribute) !== null && _b !== void 0 ? _b : 'relevance'))), h("calcite-dropdown-group", { "selection-mode": "single" }, this.sortOptions.map(option => {
      var _a, _b, _c;
      return h("calcite-dropdown-item", { "aria-label": this.intl.t('sort-by') + this.intl.t((_a = option.attribute) !== null && _a !== void 0 ? _a : 'relevance'), "data-value": option.attribute, key: option.attribute, selected: this.activeSortOption.attribute === option.attribute, title: this.intl.t((_b = option.attribute) !== null && _b !== void 0 ? _b : 'relevance') }, this.intl.t((_c = option.attribute) !== null && _c !== void 0 ? _c : 'relevance'));
    }))), this.activeSortOption.order &&
      h("calcite-button", { appearance: "transparent", "aria-label": this.intl.t('sort-by') + this.intl.t(this.activeSortOption.order), class: "sort-order", color: "blue", "data-test": "sort-direction", "icon-end": this.sortOrderIcon, onClick: this.handleOrderChange, role: "button", title: this.intl.t(this.activeSortOption.order) })));
  }
  static get is() { return "arcgis-hub-search-sort"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-search-sort.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-search-sort.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "sortOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ISortOption[]",
          "resolved": "ISortOption[]",
          "references": {
            "ISortOption": {
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
      "activeSortOption": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ActiveSortOption",
          "resolved": "ISortOption & { order: \"desc\" | \"asc\"; }",
          "references": {
            "ActiveSortOption": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "sortOrderIcon": {}
    };
  }
  static get events() {
    return [{
        "method": "hubSearchSortChange",
        "name": "hubSearchSortChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ActiveSortOption",
          "resolved": "ISortOption & { order: \"desc\" | \"asc\"; }",
          "references": {
            "ActiveSortOption": {
              "location": "local"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "calciteDropdownSelect",
        "method": "handleFieldChangeEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
