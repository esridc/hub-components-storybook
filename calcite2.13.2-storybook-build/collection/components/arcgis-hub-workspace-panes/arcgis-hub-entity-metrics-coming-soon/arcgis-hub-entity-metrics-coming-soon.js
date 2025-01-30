import { getAssetPath, h, Host } from "@stencil/core";
import intlManager from "../../../utils/intl-manager";
export class ArcgisHubEntityMetricsComingSoon {
  constructor() {
    this.isMobile = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (h(Host, { "data-element": "workspace-entity-metrics-coming-soon" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("h1", { slot: "title" }, this.intl.t('header')), h("div", { class: "hub-entity-metrics-coming-soon__main" }, h("div", { class: "hub-entity-metrics-coming-soon__info" }, h("div", null, h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, h("calcite-icon", { icon: "pencil-square" }), h("h2", null, this.intl.t('firstBlockHeader'))), h("p", null, this.intl.t('firstBlockMessage'))), h("div", null, h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, h("calcite-icon", { icon: "register" }), h("h2", null, this.intl.t('secondBlockHeader'))), h("p", null, this.intl.t('secondBlockMessage'))), h("div", null, h("div", { class: "hub-entity-metrics-coming-soon__block-header" }, h("calcite-icon", { icon: "graph-time-series" }), h("h2", null, this.intl.t('thirdBlockHeader'))), h("p", null, this.intl.t('thirdBlockMessage'))), h("arcgis-hub-workspace-link", { pane: "details" }, h("calcite-button", { appearance: "outline-fill", round: true }, this.intl.t('button')))), h("div", { class: "hub-entity-metrics-coming-soon__side", slot: "side-panel" }, h("img", { alt: this.intl.t('header'), class: "hub-entity-metrics-coming-soon__image", src: getAssetPath('./assets/metrics-placeholder-graphic.png') }))))));
  }
  static get is() { return "arcgis-hub-entity-metrics-coming-soon"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-metrics-coming-soon.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-metrics-coming-soon.css"]
    };
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  static get properties() {
    return {
      "isMobile": {
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
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "element"; }
}
