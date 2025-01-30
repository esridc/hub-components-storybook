'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const util = require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');

const blockCss = "calcite-block.sc-hub-section-block{--calcite-block-padding:.75rem}.section-block--l.sc-hub-section-block{--calcite-font-size--1:18px}calcite-block.sc-hub-section-block-s>*,calcite-block .sc-hub-section-block-s>*{--calcite-font-size--1:14px}calcite-block.sc-hub-section-block-s>.section__content>.helper-text{margin-top:-1.5rem;margin-bottom:1.5rem}calcite-block.sc-hub-section-block-s>.helper-text--left>.helper-text,calcite-block.sc-hub-section-block-s>.helper-text--right>.helper-text{margin-top:0px}";

const Block = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = util.createId('block');
  }
  get scale() {
    var _a;
    return ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || "l";
  }
  get isCollapsible() {
    var _a;
    return util.isNil((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.collapsible)
      ? true
      : this.params.uiSchema.options.collapsible;
  }
  get isOpen() {
    var _a;
    return (_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.open;
  }
  render() {
    const { label, disabled } = this.params;
    return (index.h(index.Host, null, index.h("calcite-block", { class: {
        [this.params.variant]: Boolean(this.params.variant),
        [`section-block--${this.scale}`]: true
      }, collapsible: this.isCollapsible, "data-label": label, disabled: disabled, heading: label, key: this._key, open: this.isOpen }, index.h("slot", null))));
  }
};
Block.style = blockCss;

exports.hub_section_block = Block;
