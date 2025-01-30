import { SpecPage } from '@stencil/core/testing';
import { HTMLCalciteInputElement, HTMLCalciteInputMessageElement, HTMLCalcitePanelElement } from '@esri/calcite-components/dist';
export declare class ArcgisHubMapWidgetDrawBufferSpecPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get panel(): HTMLCalcitePanelElement;
  get distanceInput(): HTMLCalciteInputElement;
  get distanceInputMessage(): HTMLCalciteInputMessageElement;
}
