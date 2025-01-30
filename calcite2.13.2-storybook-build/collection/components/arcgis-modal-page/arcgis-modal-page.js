import { Host, h } from '@stencil/core';
export class ArcgisModalPage {
  constructor() {
    this.visible = undefined;
  }
  render() {
    return (h(Host, { "data-element": "modal-page" }, h("slot", { name: "thumbnail" }), h("slot", { name: "page-title" }), h("slot", { name: "page-content" })));
  }
  static get is() { return "arcgis-modal-page"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-modal-page.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-modal-page.css"]
    };
  }
  static get properties() {
    return {
      "visible": {
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
        "attribute": "visible",
        "reflect": true
      }
    };
  }
}
