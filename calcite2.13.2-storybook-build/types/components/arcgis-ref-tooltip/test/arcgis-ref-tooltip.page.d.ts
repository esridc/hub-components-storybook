import { SpecPage } from "@stencil/core/testing";
export declare class ArcgisRefTooltipPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get slottedContent(): HTMLCalciteChipElement;
  get referenceElement(): HTMLElement;
  get tooltip(): HTMLCalciteTooltipElement;
}
