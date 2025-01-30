'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const ArcgisRefTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.overlayPositioning = 'fixed';
    this.placement = 'auto';
    this.text = undefined;
    this.tooltipRef = undefined;
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { ref: (el) => this.tooltipRef = el }, index.h("slot", null)), this.text && this.tooltipRef && index.h("calcite-tooltip", { overlayPositioning: this.overlayPositioning, placement: this.placement, referenceElement: this.tooltipRef }, this.text)));
  }
};

exports.arcgis_ref_tooltip = ArcgisRefTooltip;
