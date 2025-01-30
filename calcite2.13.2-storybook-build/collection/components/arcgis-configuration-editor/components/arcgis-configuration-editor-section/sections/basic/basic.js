import { Host, h } from '@stencil/core';
export class Basic {
  constructor() {
    this.params = undefined;
  }
  get scale() {
    var _a;
    return ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || this.params.scale;
  }
  render() {
    var _a;
    const HeaderTag = ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.headerTag) || 'h2';
    return (h(Host, null, h("section", { class: {
        [this.params.variant]: Boolean(this.params.variant),
        [`section-basic--${this.scale}`]: true
      }, "data-label": this.params.label }, h("header", { class: "section-basic__header" }, h(HeaderTag, null, this.params.label)), h("slot", null))));
  }
  static get is() { return "hub-section-basic"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["basic.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["basic.css"]
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
