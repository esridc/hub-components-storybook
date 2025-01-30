import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const ArcgisRefTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.overlayPositioning = 'fixed';
    this.placement = 'auto';
    this.text = undefined;
    this.tooltipRef = undefined;
  }
  render() {
    return (h(Host, null, h("div", { ref: (el) => this.tooltipRef = el }, h("slot", null)), this.text && this.tooltipRef && h("calcite-tooltip", { overlayPositioning: this.overlayPositioning, placement: this.placement, referenceElement: this.tooltipRef }, this.text)));
  }
};

export { ArcgisRefTooltip as arcgis_ref_tooltip };
