import { Host, h } from '@stencil/core';
import intlManager from "../../utils/intl-manager";
export class ArcgisHubConfirmButton {
  constructor() {
    this.reset = () => {
      this.state = 'default';
    };
    this.onClick = (e) => {
      switch (this.state) {
        case 'default':
          e.stopPropagation();
          this.state = 'confirm';
          break;
        case 'confirm':
          setTimeout(this.reset, 1000);
          break;
      }
    };
    this.state = 'default';
    this.disabled = false;
    this.icon = undefined;
    this.kind = 'brand';
    this.defaultText = null;
    this.confirmText = null;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get appearance() {
    switch (this.state) {
      case 'default':
        return 'outline';
      case 'confirm':
        return 'solid';
    }
  }
  get text() {
    switch (this.state) {
      case 'default':
        return this.defaultText || this.intl.t('delete');
      case 'confirm':
        return this.confirmText || this.intl.t('confirmDelete');
    }
  }
  render() {
    return (h(Host, { "data-element": "confirm-button" }, h("calcite-button", { appearance: this.appearance, disabled: this.disabled, iconStart: this.icon, kind: this.kind, onClick: this.onClick }, this.text)));
  }
  static get is() { return "arcgis-hub-confirm-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-confirm-button.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-confirm-button.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "disabled": {
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
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "icon",
        "reflect": false
      },
      "kind": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"brand\" | \"danger\" | \"inverse\" | \"neutral\"",
          "resolved": "\"brand\" | \"danger\" | \"inverse\" | \"neutral\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "kind",
        "reflect": false,
        "defaultValue": "'brand'"
      },
      "defaultText": {
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
        "attribute": "default-text",
        "reflect": false,
        "defaultValue": "null"
      },
      "confirmText": {
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
        "attribute": "confirm-text",
        "reflect": false,
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "state": {}
    };
  }
  static get elementRef() { return "element"; }
}
