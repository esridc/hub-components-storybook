import { h, Host } from '@stencil/core';
export class ArcgisHubMapTip {
  constructor() {
    this.text = undefined;
    this.kind = undefined;
    this.icon = undefined;
  }
  render() {
    const { text, kind, icon } = this;
    return (h(Host, { "data-element": "map-tip" }, h("span", { class: kind }, icon && h("calcite-icon", { icon: icon, scale: "s" }), text)));
  }
  static get is() { return "arcgis-hub-map-tip"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-tip.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-tip.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Tip text"
        },
        "attribute": "text",
        "reflect": false
      },
      "kind": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Kind",
          "resolved": "\"brand\" | \"danger\" | \"info\" | \"inverse\" | \"neutral\" | \"success\" | \"warning\"",
          "references": {
            "Kind": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "(optional) Specifies the kind of the component (will apply to bg-color)"
        },
        "attribute": "kind",
        "reflect": false
      },
      "icon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "(optional) Leading icon"
        },
        "attribute": "icon",
        "reflect": false
      }
    };
  }
}
