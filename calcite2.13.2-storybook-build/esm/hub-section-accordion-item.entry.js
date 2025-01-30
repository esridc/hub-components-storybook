import { r as registerInstance, h, H as Host } from './index-57f71b44.js';
import { c as createId } from './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const accordionItemCss = "calcite-accordion-item.sc-hub-section-accordion-item-s>.section__content{margin-top:1.5rem}calcite-accordion-item.sc-hub-section-accordion-item-s>.section__content>.helper-text{margin-top:-1.5rem;margin-bottom:1.5rem}calcite-accordion-item[disabled].sc-hub-section-accordion-item{opacity:var(--calcite-opacity-disabled);pointer-events:none}";

const AccordionItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
AccordionItem.style = accordionItemCss;

export { AccordionItem as hub_section_accordion_item };
