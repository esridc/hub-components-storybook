import { SpecPage } from '@stencil/core/testing';
import { HTMLCalciteActionElement, HTMLCalcitePopoverElement } from '@esri/calcite-components/dist';
export declare class ArcgisHubMapWidgetDrawSpecPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get selectWidget(): HTMLArcgisHubMapWidgetGenericElement;
  get pointWidget(): HTMLArcgisHubMapWidgetGenericElement;
  get polylineWidget(): HTMLArcgisHubMapWidgetGenericElement;
  get polygonWidget(): HTMLArcgisHubMapWidgetGenericElement;
  get circleWidget(): HTMLArcgisHubMapWidgetGenericElement;
  get rectangleWidget(): HTMLArcgisHubMapWidgetGenericElement;
  get bufferPanel(): HTMLArcgisHubMapWidgetDrawBufferElement;
  get options(): HTMLCalciteActionElement;
  get popover(): HTMLCalcitePopoverElement;
}
