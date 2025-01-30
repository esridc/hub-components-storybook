'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const util = require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');

const accordionItemCss = "calcite-accordion-item.sc-hub-section-accordion-item-s>.section__content{margin-top:1.5rem}calcite-accordion-item.sc-hub-section-accordion-item-s>.section__content>.helper-text{margin-top:-1.5rem;margin-bottom:1.5rem}calcite-accordion-item[disabled].sc-hub-section-accordion-item{opacity:var(--calcite-opacity-disabled);pointer-events:none}";

const AccordionItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = util.createId('accordionItem');
  }
  render() {
    const { expanded, iconEnd, iconStart, description } = this.params.uiSchema.options || {};
    return (index.h(index.Host, null, index.h("calcite-accordion-item", { class: {
        [this.params.variant]: Boolean(this.params.variant)
      }, "data-label": this.params.label, description: description, disabled: this.params.disabled, expanded: !this.params.disabled && expanded, heading: this.params.label, iconEnd: iconEnd, iconFlipRtl: "both", iconStart: iconStart, key: this._key }, index.h("slot", null))));
  }
};
AccordionItem.style = accordionItemCss;

exports.hub_section_accordion_item = AccordionItem;
