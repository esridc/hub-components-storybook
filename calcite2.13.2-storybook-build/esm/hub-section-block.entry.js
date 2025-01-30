import { r as registerInstance, h, H as Host } from './index-57f71b44.js';
import { c as createId, i as isNil } from './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const blockCss = "calcite-block.sc-hub-section-block{--calcite-block-padding:.75rem}.section-block--l.sc-hub-section-block{--calcite-font-size--1:18px}calcite-block.sc-hub-section-block-s>*,calcite-block .sc-hub-section-block-s>*{--calcite-font-size--1:14px}calcite-block.sc-hub-section-block-s>.section__content>.helper-text{margin-top:-1.5rem;margin-bottom:1.5rem}calcite-block.sc-hub-section-block-s>.helper-text--left>.helper-text,calcite-block.sc-hub-section-block-s>.helper-text--right>.helper-text{margin-top:0px}";

const Block = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
Block.style = blockCss;

export { Block as hub_section_block };
