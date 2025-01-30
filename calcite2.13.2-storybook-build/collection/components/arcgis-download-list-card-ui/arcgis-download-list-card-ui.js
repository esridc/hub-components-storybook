import { Host, h } from '@stencil/core';
/**
 * DEPRECATED. Use `arcgis-hub-download-list` to generate all formats for a given entity.
 * This component will be removed once the new components are fully tested and ready for production.
 */
export class ArcgisDownloadListCardUi {
  constructor() {
    this.icon = undefined;
  }
  render() {
    return (h(Host, { "data-element": "download-list-card-ui" }, h("div", { class: "list-card-content" }, h("div", { class: "list-card-header" }, this.icon && h("calcite-icon", { icon: this.icon }), h("slot", { name: "header" })), h("slot", { name: "button" }), h("slot", { name: "errors" }))));
  }
  static get is() { return "arcgis-download-list-card-ui"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-download-list-card-ui.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-download-list-card-ui.css"]
    };
  }
  static get properties() {
    return {
      "icon": {
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
          "text": ""
        },
        "attribute": "icon",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "element"; }
}
