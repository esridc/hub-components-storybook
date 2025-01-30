import { h } from '@stencil/core';
import { bind } from '../../../../utils/context';
import intlManager from '../../../../utils/intl-manager';
export class ArcgisHubMediaGalleryModal {
  constructor() {
    this.itemId = undefined;
    this.layout = 'grid';
    this.isOpen = undefined;
    bind(this, 'onCalciteModalClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  onCalciteModalClose() {
    this.arcgisHubMediaGalleryModalClosed.emit();
  }
  renderModalContent() {
    return h("arcgis-hub-media-gallery", { "item-id": this.itemId, layout: this.layout, selectable: true });
  }
  render() {
    return (h("arcgis-wormhole", null, h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.onCalciteModalClose, open: this.isOpen, scale: "m", width: "l" }, h("div", { slot: "header" }, this.intl.t('header')), h("div", { slot: "content" }, this.isOpen && this.renderModalContent()), h("calcite-button", { appearance: "outline", onClick: this.onCalciteModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('cancel')))));
  }
  static get is() { return "arcgis-hub-media-gallery-modal"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-media-gallery-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-media-gallery-modal.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "itemId": {
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
        "attribute": "item-id",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'list' | 'grid'",
          "resolved": "\"grid\" | \"list\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'grid'"
      },
      "isOpen": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubMediaGalleryModal"
            }],
          "text": "indicates whether the modal is open"
        },
        "attribute": "is-open",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubMediaGalleryModalClosed",
        "name": "arcgisHubMediaGalleryModalClosed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
