import { Host, h } from '@stencil/core';
import { createId } from '@esri/hub-common';
export class Accordion {
  constructor() {
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = createId('accordion');
  }
  render() {
    const { appearance, iconPosition, iconType, scale, selectionMode } = this.params.uiSchema.options || {};
    return (h(Host, { key: this._key }, h("calcite-accordion", { appearance: appearance, class: {
        [this.params.variant]: Boolean(this.params.variant)
      }, iconPosition: iconPosition, iconType: iconType, scale: scale || this.params.scale, selectionMode: selectionMode }, h("slot", null))));
  }
  static get is() { return "hub-section-accordion"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["accordion.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["accordion.css"]
    };
  }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ISectionParams",
          "resolved": "ISectionParams",
          "references": {
            "ISectionParams": {
              "location": "import",
              "path": "../../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
}
;
