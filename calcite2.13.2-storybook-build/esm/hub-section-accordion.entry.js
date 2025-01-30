import { r as registerInstance, h, H as Host } from './index-57f71b44.js';
import { c as createId } from './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const accordionCss = ".sc-hub-section-accordion-h{display:block}.sc-hub-section-accordion-h:not(.configuration-editor__last-child){margin-bottom:0.75rem}calcite-accordion[scale=\"l\"].sc-hub-section-accordion{--calcite-font-size-0:18px}calcite-accordion.sc-hub-section-accordion-s>*,calcite-accordion .sc-hub-section-accordion-s>*{--calcite-font-size-0:14px}";

const Accordion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
Accordion.style = accordionCss;

export { Accordion as hub_section_accordion };
