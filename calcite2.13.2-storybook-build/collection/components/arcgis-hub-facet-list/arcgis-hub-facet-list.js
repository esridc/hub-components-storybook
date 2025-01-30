import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { constants, dictionary } from '@esri/telemetry-dictionary-hub';
import { getDateRangeFacets, getListFacets, getMapFacets, getTreeFacets, isMapFacet, isOptionsBasedFacet, isValidDateRange } from '../../utils/gallery-utils';
import { dismissFacetChip, formatDismissedKeys, getActiveChips } from '../../utils/chip-utils';
import { getTreeOptionLabel } from '../../utils/option-tree-utils';
export class ArcgisHubFacetList {
  constructor() {
    this.showChips = false;
    this.facets = [];
    this.disableTelemetry = false;
    this.resultsCount = undefined;
    bind(this, 'resetFacets', 'onChipClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data) {
    if (!this.disableTelemetry) {
      this.hubTelemetry.emit(data);
    }
  }
  // TODO: Add other listeners for different types of Facets (map, dates etc)
  /**
   * Handles changes in the child facets
   * The events flow up from the child components, and this function applies
   * the changes to the facets, and updates the _chips array. Resulting changes
   * then flow back down to the Facets.
   * @param evt
   */
  onListFacetChange(evt) {
    evt.preventDefault();
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.filter), { details: evt.detail.checked
        ? `${evt.detail.key}: ${evt.detail.optionKey}`
        : `${evt.detail.key}: Removed ${evt.detail.optionKey}`, element: evt.detail.key, position: evt.detail.optionIndex }));
    // update the facets
    // find and clone the facet that we're updating...
    const facet = getListFacets(this.facets).find(f => f.key === evt.detail.key);
    // update the state of the option
    facet.options = facet.options.map((fo) => {
      if (fo.key === evt.detail.optionKey) {
        fo.selected = evt.detail.checked;
      }
      else {
        // For single-select, we must set all the other options to
        // selected: false
        if (facet.display === "single-select") {
          fo.selected = false;
        }
      }
      return fo;
    });
    this.arcgisHubFacetListChange.emit(facet);
  }
  onTreeFacetChange(evt) {
    const facet = getTreeFacets(this.facets).find(f => f.key === evt.detail.key);
    // Send Telemetry
    const { optionKeys } = evt.detail;
    const formattedOptionKeys = optionKeys.map(getTreeOptionLabel).join(', ');
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.filter), { details: evt.detail.selected
        ? `${evt.detail.key}: ${formattedOptionKeys}`
        : `${evt.detail.key}: Removed ${formattedOptionKeys}`, element: evt.detail.key, position: evt.detail.topLevelIndex }));
    // Update the state of the options
    facet.options = facet.options.map((fo) => {
      if (optionKeys.includes(fo.key)) {
        fo.selected = evt.detail.selected;
      }
      return fo;
    });
    this.arcgisHubFacetListChange.emit(facet);
  }
  onDateRangeFacetChange(event) {
    const { detail: { key, value } } = event;
    const facet = getDateRangeFacets(this.facets).find((f) => f.key === key);
    // send telemetry
    if (isValidDateRange(value)) {
      this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
        .category.interaction
        .action.search
        .label.filter), { details: constants.details.DATE_UPDATED, element: facet.key }));
    }
    // update state of the option
    facet.value = value;
    this.arcgisHubFacetListChange.emit(facet);
  }
  onMapFacetChange(event) {
    const { detail: { key, value } } = event;
    const facet = getMapFacets(this.facets).find((f) => f.key === key);
    // update state of the option
    facet.value = value;
    this.arcgisHubFacetListChange.emit(facet);
  }
  /**
   * Handles the removal of a chip.
   * It resets the selected state of the corresponding facet option, and updates the
   * chips array.
   *
   * NOTE: after upgrading to calcite-components@1.0.4, the event payload stopped providing
   * ANY reference to the chip element that was dismissed. As a workaround, we attach this
   * function as a callback with pre-bound arguments.
   * @param chip
   */
  onChipClose(chip) {
    const index = this.facets.findIndex(f => f.key === chip.key);
    const { updatedFacet, dismissedKeys } = dismissFacetChip(this.facets[index], chip);
    this.maybeSendTelemetry(Object.assign(Object.assign({}, dictionary
      .category.interaction
      .action.search
      .label.filter), { details: `${updatedFacet.key}: Removed ${formatDismissedKeys(updatedFacet, dismissedKeys)}`, element: constants.element.CHIPS }));
    this.facets[index] = updatedFacet;
    this.arcgisHubFacetListChange.emit(updatedFacet);
  }
  /**
   * Reset the facets to the original state
   */
  resetFacets() {
    // Problem: We can't send updates state on this b/c we are not resetting
    // the facets in this component - we do that from the Gallery
    // but the Gallery does not know how to update the state on it's own
    this.arcgisHubFacetListReset.emit();
  }
  /**
   * Get the chips to display, based on the facet state
   */
  get chips() {
    return getActiveChips(this.facets);
  }
  /**
   * Render the Facets
   * @returns
   */
  renderFacets() {
    return this.facets.map(facet => {
      // Don't render the facet accordion if it's options based facet with 1 or no options
      const shouldRenderFacet = !isOptionsBasedFacet(facet) || facet.options.length > 1;
      return shouldRenderFacet
        ? h("calcite-accordion-item", { expanded: facet.state !== "closed", heading: facet.label, "is-map": isMapFacet(facet), key: facet.key }, this.renderFacetComponent(facet), this.renderFacetTooltip(facet))
        : null;
    });
  }
  renderFacetComponent(facet) {
    switch (facet.display) {
      case 'single-select':
      case 'multi-select':
        return h("arcgis-hub-facet-options", { "data-test": facet.key, facet: facet });
      case 'date-range':
        return h("arcgis-hub-date-range-facet", { "data-test": facet.key, facet: facet });
      case 'tree':
        return h("arcgis-hub-tree-facet", { "data-test": facet.key, facet: facet });
      case 'map':
        return h("arcgis-hub-map-facet", { "data-test": facet.key, facet: facet, resultsCount: this.resultsCount });
    }
  }
  renderFacetTooltip(facet) {
    const popoverToggleId = `popover-toggle-${facet.key}`;
    return facet.tooltip &&
      h("div", { slot: "actions-end" }, h("calcite-action", { appearance: "transparent", icon: "information-f", id: popoverToggleId, label: "info tooltip", scale: "s" }), h("calcite-tooltip", { label: `${facet.key} info`, overlayPositioning: "fixed", placement: "bottom-end", referenceElement: popoverToggleId }, h("span", { class: "facet-popover-content" }, facet.tooltip)));
  }
  /**
   * Render the Chips
   * @returns
   */
  renderChips() {
    return this.chips.map((chip) => {
      const label = !chip.label ? `${chip.optionLabel}` : `${chip.label}: ${chip.optionLabel}`;
      const handler = this.onChipClose.bind(this, chip);
      return h("calcite-chip", { closable: true, "data-test": label, key: chip.optionKey, messageOverrides: {
          dismissLabel: this.intl.t('dismissLabel', { label })
        }, onCalciteChipClose: handler, scale: "m", value: label }, label);
    });
  }
  /**
   * Main render
   * @returns
   */
  render() {
    // render nothing if there are no facets
    if (this.facets.length) {
      return (h(Host, null, h("div", { class: "header-container", id: "filters-header" }, h("slot", { name: "header" }), h("calcite-button", { appearance: "transparent", "aria-labelledby": "filters-header", class: "reset-facets-button", color: "blue", onClick: this.resetFacets }, this.intl.t('reset'))), this.showChips ? this.renderChips() : "", h("calcite-accordion", { appearance: "transparent", scale: 'l' }, h("div", { class: "additional-facet-container" }, h("slot", { name: "additional-facet" })), this.renderFacets())));
    }
  }
  static get is() { return "arcgis-hub-facet-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-facet-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-facet-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "showChips": {
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
          "text": "Show/hide the filter chips"
        },
        "attribute": "show-chips",
        "reflect": false,
        "defaultValue": "false"
      },
      "facets": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IFacet[]",
          "resolved": "IFacet[]",
          "references": {
            "IFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Facets to render"
        },
        "defaultValue": "[]"
      },
      "disableTelemetry": {
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
          "text": "Whether or not to emit telemetry"
        },
        "attribute": "disable-telemetry",
        "reflect": false,
        "defaultValue": "false"
      },
      "resultsCount": {
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
          "text": "Number of results the current search query returned"
        },
        "attribute": "results-count",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFacetListChange",
        "name": "arcgisHubFacetListChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that's fired when facets have changed"
        },
        "complexType": {
          "original": "IFacet",
          "resolved": "IDateRangeFacet | IListFacet | IMapFacet | ITreeFacet",
          "references": {
            "IFacet": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }, {
        "method": "arcgisHubFacetListReset",
        "name": "arcgisHubFacetListReset",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that requests the facets to be reset"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits telemetry events"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubFacetOptionsChange",
        "method": "onListFacetChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubTreeFacetChange",
        "method": "onTreeFacetChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDateRangeFacetChange",
        "method": "onDateRangeFacetChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisMapFacetChange",
        "method": "onMapFacetChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
