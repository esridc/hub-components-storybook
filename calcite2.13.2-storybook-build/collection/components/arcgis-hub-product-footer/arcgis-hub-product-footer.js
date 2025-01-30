import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getGlobalContext } from '../../utils/state';
/**
 * The arcgis-hub-product-footer is a simple footer component to be
 * used across our application. It is a thin wrapper around the
 * calcite-menu component that applies appropriate/consistent
 * styling and telemetry
 *
 * Note: this is a first-pass of the new product footer that will
 * be incorporated on workspaces. We will likely iterate on its
 * content and design, and should aim to eventually adopt this
 * footer on main application routes (not just workspaces) as well
 */
export class ArcgisHubProductFooter {
  constructor() {
    this.productName = 'ArcGIS Hub Basic';
    this.emitTelemetry = (evt) => {
      const el = evt.currentTarget;
      const telemetry = {
        help: Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.webHelp), { details: el.href }),
        changelog: dictionary.category.navigation.action.external.label.changelog,
        blog: dictionary.category.navigation.action.external.label.arcGisBlog
      }[el.getAttribute('data-key')];
      this.hubTelemetry.emit(telemetry);
    };
    this.isMobile = false;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // Check the license and set the product name
    switch (this._context.hubLicense) {
      case 'hub-premium':
        this.productName = 'ArcGIS Hub Premium';
        break;
      case 'enterprise-sites':
        this.productName = 'Enterprise Sites';
        break;
      default:
        this.productName = 'ArcGIS Hub Basic';
    }
  }
  render() {
    return (h(Host, { "data-element": "product-footer", "data-ismobile": this.isMobile }, h("calcite-menu", { scale: "s" }, h("div", { class: "product-footer__branding" }, this.productName), h("calcite-menu-item", { "data-key": "help", href: "https://doc.arcgis.com/en/hub/get-started", onClick: this.emitTelemetry, text: this.intl.t("helpCenter") }), h("calcite-menu-item", { "data-key": "changelog", href: "https://hub.arcgis.com/pages/changelog", onClick: this.emitTelemetry, text: this.intl.t("changelog") }), h("calcite-menu-item", { "data-key": "blog", href: "https://www.esri.com/arcgis-blog/?s=#&products=arcgis-hub", onClick: this.emitTelemetry, text: this.intl.t("blog") }))));
  }
  static get is() { return "arcgis-hub-product-footer"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-product-footer.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-product-footer.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
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
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
