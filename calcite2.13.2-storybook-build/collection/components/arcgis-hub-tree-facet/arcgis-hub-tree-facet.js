import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { createTree, getChildren, getSelectionDifference, renderSubtree } from '../../utils/option-tree-utils';
export class ArcgisHubTreeFacet {
  constructor() {
    this.topLevelPageSize = 5;
    this.facet = undefined;
    this.showLimitedOptions = true;
    bind(this, 'toggleMoreOrLessButton', 'handleTreeSelect');
  }
  handleTreeSelect(event) {
    event.stopPropagation();
    // `event.target.selectedItems` gives us the set of ALL selected elements in the tree, meaning
    // we have to do some juggling to figure out which elements were selected (or
    // unselected) as part of this interaction
    const newSelectedKeys = event.target.selectedItems.map(e => e.dataset.key);
    // Exclude "unrecognized" keys from the calculus as they can only be unselected via a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    const oldSelectedKeys = this.facet.options.filter(o => o.selected && !o._unrecognized).map(o => o.key);
    const difference = getSelectionDifference(oldSelectedKeys, newSelectedKeys);
    // Product created the concept of a "Top-level Index" for telemetry purposes. Each
    // top-level option of the facet is assigned an index, and each descendant of that
    // option gets the same index. These indices are assigned at runtime and are appended
    // onto the option model.
    //
    // We assume that all changed options have the same top-level index, so we just
    // grab the value of the first one we can find. We're confident in this approach
    // since the only way to change multiple options at once is by clicking the checkbox
    // for a parent option, which selects the parent AND all its descendants
    const changedOption = this.facet.options.find(o => difference.keys.includes(o.key));
    const topLevelIndex = changedOption._telemetryIndex;
    this.arcgisHubTreeFacetChange.emit({
      key: this.facet.key,
      optionKeys: difference.keys,
      selected: difference.operation === 'added',
      topLevelIndex,
    });
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get optionsAsTree() {
    // Prevent "unrecognized" options from rendering, as they are only displayed as a filter chip.
    // See the documentation for IFacetOption._unrecognized for more info.
    const visibleOptions = this.facet.options.filter(opt => !opt._unrecognized);
    return createTree(visibleOptions);
  }
  get numTopLevelOptions() {
    return getChildren(this.optionsAsTree).length;
  }
  get optionsLeftToDisplay() {
    return this.numTopLevelOptions - this.topLevelPageSize;
  }
  get moreOrLessButtonIconEnd() {
    return this.showLimitedOptions ? "chevron-down" : "chevron-up";
  }
  get moreOrLessButtonLabel() {
    return this.showLimitedOptions
      ? this.intl.t('showMore', { num: this.optionsLeftToDisplay })
      : this.intl.t('showLess');
  }
  toggleMoreOrLessButton() {
    // Emit event to notify consumers
    this.arcgisHubFacetMoreLessClicked.emit({
      facet: this.facet,
      isMore: this.showLimitedOptions
    });
    this.showLimitedOptions = !this.showLimitedOptions;
  }
  renderTopLevelOptions() {
    const allTopLevelOptions = getChildren(this.optionsAsTree).map((child, i) => renderSubtree(child, i));
    return this.showLimitedOptions
      ? allTopLevelOptions.slice(0, this.topLevelPageSize)
      : allTopLevelOptions;
  }
  renderMoreLessButton() {
    if (this.numTopLevelOptions > this.topLevelPageSize) {
      return h("div", { class: "more-or-less-container" }, h("calcite-button", { appearance: "transparent", color: "blue", "icon-end": this.moreOrLessButtonIconEnd, label: this.intl.t('moreOrLessButtonLabel', {
          moreOrLess: this.moreOrLessButtonLabel,
          label: this.facet.label
        }), onClick: this.toggleMoreOrLessButton }, this.moreOrLessButtonLabel));
    }
  }
  render() {
    return (h(Host, { "data-element": "tree-facet" }, h("div", null, h("calcite-tree", { onCalciteTreeSelect: this.handleTreeSelect, "selection-mode": "ancestors" }, this.renderTopLevelOptions()), this.renderMoreLessButton())));
  }
  static get is() { return "arcgis-hub-tree-facet"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-tree-facet.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-tree-facet.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "facet": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ITreeFacet",
          "resolved": "ITreeFacet",
          "references": {
            "ITreeFacet": {
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
        }
      }
    };
  }
  static get states() {
    return {
      "showLimitedOptions": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubTreeFacetChange",
        "name": "arcgisHubTreeFacetChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "TreeFacetChangePayload",
          "resolved": "TreeFacetChangePayload",
          "references": {
            "TreeFacetChangePayload": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }, {
        "method": "arcgisHubFacetMoreLessClicked",
        "name": "arcgisHubFacetMoreLessClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{facet: ITreeFacet, isMore: boolean }",
          "resolved": "{ facet: ITreeFacet; isMore: boolean; }",
          "references": {
            "ITreeFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
