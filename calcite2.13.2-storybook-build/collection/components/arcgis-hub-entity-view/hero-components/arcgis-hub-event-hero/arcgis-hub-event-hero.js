import { Host, h } from '@stencil/core';
export class ArcgisHubEventHero {
  constructor() {
    this.entity = undefined;
  }
  render() {
    return (h(Host, { "data-element": "event-hero" }, h("arcgis-hub-entity-hero", { entity: this.entity }, h("div", { slot: "footer-start" }, h("arcgis-hub-event-actions", { entity: this.entity })))));
  }
  static get is() { return "arcgis-hub-event-hero"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-event-hero.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-event-hero.css"]
    };
  }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEvent",
          "resolved": "IHubEvent",
          "references": {
            "IHubEvent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "ArcGIS Hub event entity"
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
