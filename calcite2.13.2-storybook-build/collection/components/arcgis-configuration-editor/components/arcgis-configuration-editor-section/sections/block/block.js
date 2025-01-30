import { Host, h } from '@stencil/core';
import { createId, isNil } from '@esri/hub-common';
export class Block {
  constructor() {
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = createId('block');
  }
  get scale() {
    var _a;
    return ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || "l";
  }
  get isCollapsible() {
    var _a;
    return isNil((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.collapsible)
      ? true
      : this.params.uiSchema.options.collapsible;
  }
  get isOpen() {
    var _a;
    return (_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.open;
  }
  render() {
    const { label, disabled } = this.params;
    return (h(Host, null, h("calcite-block", { class: {
        [this.params.variant]: Boolean(this.params.variant),
        [`section-block--${this.scale}`]: true
      }, collapsible: this.isCollapsible, "data-label": label, disabled: disabled, heading: label, key: this._key, open: this.isOpen }, h("slot", null))));
  }
  static get is() { return "hub-section-block"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["block.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["block.css"]
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
