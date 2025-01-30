import { Host, h } from '@stencil/core';
export class ArcgisHubWorkspaceMissingpane {
  constructor() {
    this.pane = undefined;
  }
  render() {
    return (h(Host, { "data-element": "workspace-missing-pane" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.pane), h("h3", { slot: "subtitle" }, "Requested pane \"", this.pane, "\" does not have an associated component."))));
  }
  static get is() { return "arcgis-hub-workspace-missing-pane"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-workspace-missing-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-workspace-missing-pane.css"]
    };
  }
  static get properties() {
    return {
      "pane": {
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
        "attribute": "pane",
        "reflect": false
      }
    };
  }
}
