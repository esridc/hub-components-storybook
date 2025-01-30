import { h } from '@stencil/core';
import { bind } from '../../../utils/context';
export class ArcgisHubMapWidgetCheckbox {
  constructor() {
    this.scale = 'm';
    this.text = undefined;
    this.checked = false;
    bind(this, 'handleCheckboxChange');
  }
  get parentContainer() {
    const { el } = this;
    return el && el.closest('arcgis-hub-map-widget-container');
  }
  handleCheckboxChange(evt) {
    this.checked = evt.target.checked;
    this.arcgisHubCheckboxWidgetClicked.emit(this.checked);
  }
  render() {
    return this.parentContainer && (h("calcite-label", { class: "checkbox-label", layout: "inline", scale: this.scale }, h("calcite-checkbox", { checked: this.checked, onCalciteCheckboxChange: this.handleCheckboxChange, scale: this.scale }), this.text));
  }
  static get is() { return "arcgis-hub-map-widget-checkbox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-checkbox.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-checkbox.css"]
    };
  }
  static get properties() {
    return {
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
      "checked": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCheckboxWidgetClicked",
        "name": "arcgisHubCheckboxWidgetClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
