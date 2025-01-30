import { Fragment, Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class ArcgisShareableCard {
  constructor() {
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.referenceElement = undefined;
    this.shareableOnHover = false;
    this.showShareUi = true;
    this.modalIsOpen = false;
    bind(this, 'onCalciteModalClose', 'onOpenModalButtonClick');
  }
  get isShareable() {
    // in order to link to the card, it needs to have a dom element id
    const { shareable, referenceElement } = this;
    return shareable && !!(referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.id);
  }
  get shouldRender() {
    const { isShareable, shareableByValue, shareableByReference } = this;
    return isShareable || shareableByValue || shareableByReference;
  }
  get _messageOverrides() {
    return {
      close: this.intl.t("modalClose")
    };
  }
  /**
   * Event Handling
   */
  onCalciteModalClose() {
    this.modalIsOpen = false;
    const telemetry = Object.assign({}, dictionary.category.interaction.action.close.label.modal.details.share);
    this.hubTelemetry.emit(telemetry);
  }
  onOpenModalButtonClick() {
    this.modalIsOpen = true;
    const telemetry = Object.assign({}, dictionary.category.interaction.action.open.label.popover.details.share);
    this.hubTelemetry.emit(telemetry);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentDidLoad() {
    if (!this.referenceElement) {
      const slot = this.element.shadowRoot.querySelector('slot');
      this.referenceElement = slot.assignedElements()[0];
    }
  }
  renderSharingUi() {
    if (this.shouldRender) {
      return h(Fragment, null, h("label", { id: "sharing" }, this.intl.t("shareableTooltip"), h("calcite-fab", { appearance: "outline-fill", icon: "share", kind: "neutral", label: this.intl.t("shareableTooltip"), onClick: this.onOpenModalButtonClick })), h("arcgis-wormhole", null, h("calcite-modal", { messageOverrides: this._messageOverrides, onCalciteModalClose: this.onCalciteModalClose, open: this.modalIsOpen, scale: "s" }, h("div", { slot: "header" }, this.intl.t('modalHeading')), h("div", { slot: "content" }, this.modalIsOpen && h("arcgis-share", { hash: this.referenceElement && this.referenceElement.id, referenceElement: this.referenceElement, shareable: this.shareable, shareableByReference: this.shareableByReference, shareableByValue: this.shareableByValue })))));
    }
  }
  render() {
    /*
      Note: the idea here is that this can be used:
        - as sorta the outerHtml of shareable stencil components
        - OR in ember to wrap ember components and enable sharing via URL

      Note: we only render the sharingUi if there are results to display
    */
    return (h(Host, { "data-element": "shareable-card", tabindex: (this.shouldRender && this.shareableOnHover) ? "0" : undefined }, h("slot", null), this.showShareUi && this.renderSharingUi()));
  }
  static get is() { return "arcgis-shareable-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-shareable-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-shareable-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "shareable": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisShareableCard"
            }],
          "text": "Indicates whether the card is shareable via link"
        },
        "attribute": "shareable",
        "reflect": false,
        "defaultValue": "false"
      },
      "shareableByValue": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisShareableCard"
            }],
          "text": "Indicates whether the card is shareable via embed"
        },
        "attribute": "shareable-by-value",
        "reflect": false,
        "defaultValue": "false"
      },
      "shareableByReference": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisShareableCard"
            }],
          "text": "Indicates whether the card is shareable via embed by reference"
        },
        "attribute": "shareable-by-reference",
        "reflect": false,
        "defaultValue": "false"
      },
      "referenceElement": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement",
          "resolved": "HTMLElement",
          "references": {
            "HTMLElement": {
              "location": "global"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{HTMLElement}"
            }, {
              "name": "memberof",
              "text": "ArcgisShareableCard"
            }],
          "text": "The element to be shared"
        }
      },
      "shareableOnHover": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisShareableCard"
            }],
          "text": "Whether to hide the sharing ui until the element has :focus or :hover state"
        },
        "attribute": "shareable-on-hover",
        "reflect": true,
        "defaultValue": "false"
      },
      "showShareUi": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisShareableCard"
            }],
          "text": "can be used by consumers to disable rendering of the sharing ui completely"
        },
        "attribute": "show-share-ui",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "modalIsOpen": {}
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
