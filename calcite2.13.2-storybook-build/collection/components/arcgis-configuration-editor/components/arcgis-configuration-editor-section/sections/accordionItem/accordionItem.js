import { Host, h } from '@stencil/core';
import { createId } from '@esri/hub-common';
export class AccordionItem {
  constructor() {
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = createId('accordionItem');
  }
  render() {
    const { expanded, iconEnd, iconStart, description } = this.params.uiSchema.options || {};
    return (h(Host, null, h("calcite-accordion-item", { class: {
        [this.params.variant]: Boolean(this.params.variant)
      }, "data-label": this.params.label, description: description, disabled: this.params.disabled, expanded: !this.params.disabled && expanded, heading: this.params.label, iconEnd: iconEnd, iconFlipRtl: "both", iconStart: iconStart, key: this._key }, h("slot", null))));
  }
  static get is() { return "hub-section-accordion-item"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["accordionItem.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["accordionItem.css"]
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
