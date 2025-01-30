import { Host, h } from '@stencil/core';
/**
 * The arcgis-ref-tooltip is a thin wrapper around the
 * calcite-tooltip that programatically sets the referenceElement
 * of the tooltip to a div around the slotted content.
 *
 * The reason this is useful is because the calcite docs
 * recommend setting the referenceElement to an actual
 * HTMLElement (rather than an element ID) to prevent
 * needing to query the DOM. This component handles
 * setting this ref so that the consuming component
 * doesn't need to. This is especially useful when
 * mapping over an array of elements that each render
 * a tooltip.
 */
export class ArcgisRefTooltip {
  constructor() {
    this.overlayPositioning = 'fixed';
    this.placement = 'auto';
    this.text = undefined;
    this.tooltipRef = undefined;
  }
  render() {
    return (h(Host, null, h("div", { ref: (el) => this.tooltipRef = el }, h("slot", null)), this.text && this.tooltipRef && h("calcite-tooltip", { overlayPositioning: this.overlayPositioning, placement: this.placement, referenceElement: this.tooltipRef }, this.text)));
  }
  static get is() { return "arcgis-ref-tooltip"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "overlayPositioning": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "OverlayPositioning",
          "resolved": "\"absolute\" | \"fixed\"",
          "references": {
            "OverlayPositioning": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/utils/floating-ui"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Determines the type of positioning to use for\nthe overlaid content."
        },
        "attribute": "overlay-positioning",
        "reflect": false,
        "defaultValue": "'fixed'"
      },
      "placement": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LogicalPlacement",
          "resolved": "\"auto\" | \"right\" | \"left\" | \"top\" | \"bottom\" | \"top-start\" | \"top-end\" | \"right-start\" | \"right-end\" | \"bottom-start\" | \"bottom-end\" | \"left-start\" | \"left-end\" | \"auto-start\" | \"auto-end\" | \"leading-start\" | \"leading\" | \"leading-end\" | \"trailing-end\" | \"trailing\" | \"trailing-start\"",
          "references": {
            "LogicalPlacement": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/utils/floating-ui"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Determines where the component will be positioned\nrelative to the referenceElement."
        },
        "attribute": "placement",
        "reflect": false,
        "defaultValue": "'auto'"
      },
      "text": {
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
          "text": "text to render in the tooltip"
        },
        "attribute": "text",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "tooltipRef": {}
    };
  }
}
