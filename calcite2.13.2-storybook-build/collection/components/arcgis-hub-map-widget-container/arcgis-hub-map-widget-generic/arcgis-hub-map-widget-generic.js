import { Host, h } from '@stencil/core';
import { bind } from '../../../utils/context';
export class ArcgisHubMapWidgetGeneric {
  constructor() {
    this.active = undefined;
    this.disabled = undefined;
    this.icon = undefined;
    this.text = undefined;
    this.scale = 'm';
    this.textEnabled = undefined;
    this.expanded = undefined;
    this.visible = undefined;
    bind(this, 'emitSelected', 'updateExpanded');
  }
  get parentContainer() {
    const { el } = this;
    return el && el.closest('arcgis-hub-map-widget-container');
  }
  connectedCallback() {
    const { parentContainer } = this;
    if (parentContainer) {
      this.updateExpanded();
      parentContainer.addEventListener('calciteActionPadToggle', this.updateExpanded);
    }
  }
  disconnectedCallback() {
    const { parentContainer } = this;
    if (parentContainer) {
      parentContainer.removeEventListener('calciteActionPadToggle', this.updateExpanded);
    }
  }
  emitSelected() {
    this.arcgisHubWidgetSelected.emit();
  }
  updateExpanded() {
    var _a;
    this.expanded = (_a = this.parentContainer) === null || _a === void 0 ? void 0 : _a.expanded;
  }
  render() {
    const { active, disabled, icon, scale, text, expanded, textEnabled } = this;
    return (h(Host, null, this.parentContainer && (h("calcite-action", { active: active, disabled: disabled, icon: icon, onClick: this.emitSelected, scale: scale, text: text, textEnabled: textEnabled || expanded }))));
  }
  static get is() { return "arcgis-hub-map-widget-generic"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-generic.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-generic.css"]
    };
  }
  static get properties() {
    return {
      "active": {
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
        "attribute": "active",
        "reflect": false
      },
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "icon",
        "reflect": false
      },
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
          "text": ""
        },
        "attribute": "text",
        "reflect": false
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "textEnabled": {
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
        "attribute": "text-enabled",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "expanded": {},
      "visible": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWidgetSelected",
        "name": "arcgisHubWidgetSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
