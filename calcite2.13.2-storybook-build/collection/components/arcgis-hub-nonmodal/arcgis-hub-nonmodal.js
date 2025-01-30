import { Host, h } from '@stencil/core';
/**
 * A non-modal dialog, positioned at the lower-right of the screen, with an api similar to calcite-modal.
 *
 * @export
 * @class ArcgisHubNonmodal
 */
export class ArcgisHubNonmodal {
  constructor() {
    this.open = false;
  }
  render() {
    return (h(Host, { class: { open: this.open }, "data-element": "nonmodal" }, h("div", { class: "container" }, h("div", { class: "nonmodal" }, h("div", { class: "header" }, h("header", { class: "title" }, h("slot", { name: "header" }))), h("div", { class: "content" }, h("slot", { name: "content" })), h("div", { class: "footer" }, h("span", { class: "back" }, h("slot", { name: "back" })), h("span", { class: "secondary" }, h("slot", { name: "secondary" })), h("span", { class: "primary" }, h("slot", { name: "primary" })))))));
  }
  static get is() { return "arcgis-hub-nonmodal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-nonmodal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-nonmodal.css"]
    };
  }
  static get properties() {
    return {
      "open": {
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
        "attribute": "open",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
}
