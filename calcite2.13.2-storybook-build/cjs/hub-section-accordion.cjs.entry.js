'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const util = require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');

const accordionCss = ".sc-hub-section-accordion-h{display:block}.sc-hub-section-accordion-h:not(.configuration-editor__last-child){margin-bottom:0.75rem}calcite-accordion[scale=\"l\"].sc-hub-section-accordion{--calcite-font-size-0:18px}calcite-accordion.sc-hub-section-accordion-s>*,calcite-accordion .sc-hub-section-accordion-s>*{--calcite-font-size-0:14px}";

const Accordion = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.params = undefined;
  }
  componentWillLoad() {
    this._key = util.createId('accordion');
  }
  render() {
    const { appearance, iconPosition, iconType, scale, selectionMode } = this.params.uiSchema.options || {};
    return (index.h(index.Host, { key: this._key }, index.h("calcite-accordion", { appearance: appearance, class: {
        [this.params.variant]: Boolean(this.params.variant)
      }, iconPosition: iconPosition, iconType: iconType, scale: scale || this.params.scale, selectionMode: selectionMode }, index.h("slot", null))));
  }
};
Accordion.style = accordionCss;

exports.hub_section_accordion = Accordion;
