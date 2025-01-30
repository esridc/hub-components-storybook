import { Host, h, Fragment } from '@stencil/core';
import { SLOTS } from './resources';
import { ResizeObserverManager } from '../../utils/resize-observer';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
export class ArcgisHubContentHero {
  constructor() {
    this.heroTitle = undefined;
    this.thumbnailUrl = undefined;
    this.basemap = undefined;
    this.extent = undefined;
    this.graphics = undefined;
    this.showMap = true;
    this.mapSettings = undefined;
    this.orientationClass = '';
    bind(this, 'handleResize');
  }
  /**
   * if a thumbnailUrl is provided, we append a w=800
   * query parameter to render the highest quality
   * thumbnail possible
   */
  get _thumbnailUrl() {
    let url = '';
    if (this.thumbnailUrl) {
      const updatedUrl = new URL(this.thumbnailUrl);
      updatedUrl.searchParams.set('w', '800');
      url = updatedUrl.toString();
    }
    return url;
  }
  get mediaClass() {
    let val = "no-media";
    if (this._thumbnailUrl) {
      val = "thumbnail-media";
    }
    else if (this.extent) {
      val = "map-media";
    }
    return val;
  }
  /**
   * concatenated classes to apply to the host element
   */
  get hostClass() {
    return (this.mediaClass + ' ' + this.orientationClass).trim();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  connectedCallback() {
    ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  /**
   * handle screen reflow - for mobile, we should switch the orientation
   * of the hero so that the thumbnail/extent is above the hero content
   */
  async handleResize() {
    this.orientationClass = this.element.clientWidth < 768 ? 'vertical' : '';
  }
  renderMedia() {
    let media = null;
    if (this._thumbnailUrl) {
      media = this.renderThumbnail(this._thumbnailUrl);
    }
    else if (this.extent && this.showMap) {
      media = this.renderMap();
    }
    return h("div", { class: "hero-media" }, media);
  }
  renderThumbnail(thumbnailUrl) {
    // TODO: use the arcgis-hub-image component once styling is resolved
    return (h("img", { alt: this.intl.t("thumbnail"), class: "hero-thumbnail", slot: "thumbnail", src: thumbnailUrl }));
  }
  renderMap() {
    return (h("arcgis-hub-map", { basemap: this.basemap, expand: 1.5, extent: this.extent, graphics: this.graphics, settings: this.mapSettings }));
  }
  renderHeader() {
    return h("div", { class: "hero-header" }, this.heroTitle && h("h1", null, this.heroTitle), h("slot", { name: SLOTS.header }));
  }
  ;
  renderMain() {
    return h("div", { class: "hero-main" }, h("slot", { name: SLOTS.main }));
  }
  renderFooter() {
    return (h(Fragment, null, h("div", { class: "hero-footer-start" }, h("slot", { name: SLOTS.footerStart })), h("div", { class: "hero-footer-end" }, h("slot", { name: SLOTS.footerEnd }))));
  }
  render() {
    return (h(Host, { class: this.hostClass, "data-element": "content-hero" }, this.renderMedia(), h("div", { class: "hero-content" }, this.renderHeader(), this.renderMain(), this.renderFooter())));
  }
  static get is() { return "arcgis-hub-content-hero"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-content-hero.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-content-hero.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "heroTitle": {
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
          "text": "hero header title"
        },
        "attribute": "hero-title",
        "reflect": false
      },
      "thumbnailUrl": {
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
          "text": "url of thumbnail to render in hero media"
        },
        "attribute": "thumbnail-url",
        "reflect": false
      },
      "basemap": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "IBasemapOptions",
          "resolved": "\"dark-gray-vector\" | \"gray-vector\" | \"hybrid\" | \"oceans\" | \"osm\" | \"satellite\" | \"streets-navigation-vector\" | \"streets-night-vector\" | \"streets-relief-vector\" | \"streets-vector\" | \"terrain\" | \"topo-vector\"",
          "references": {
            "IBasemapOptions": {
              "location": "import",
              "path": "../arcgis-hub-map/arcgis-hub-map"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "well known basemap ID"
        },
        "attribute": "basemap",
        "reflect": false
      },
      "extent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IExtent",
          "resolved": "IExtent",
          "references": {
            "IExtent": {
              "location": "import",
              "path": "@esri/arcgis-rest-feature-layer"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "geometry Object for setting map extent"
        }
      },
      "graphics": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "any[]",
          "resolved": "any[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "array of graphics that will be added to the view's graphics layer"
        }
      },
      "showMap": {
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
          "text": "Should we show, or hide the map in the hero?"
        },
        "attribute": "show-map",
        "reflect": false,
        "defaultValue": "true"
      },
      "mapSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubMapSettings",
          "resolved": "IHubMapSettings",
          "references": {
            "IHubMapSettings": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "IHubMapSettings object that defines the map's initial state.  Currently this is used to set\nthe underlying web map or web scene by itemId.  In the future this will hold additional settings\nthat are passed into the map component.\nExample: { baseViewItemId: '1234567890' }"
        }
      }
    };
  }
  static get states() {
    return {
      "orientationClass": {}
    };
  }
  static get methods() {
    return {
      "handleResize": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "handle screen reflow - for mobile, we should switch the orientation\nof the hero so that the thumbnail/extent is above the hero content",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
