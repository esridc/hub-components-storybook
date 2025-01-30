import { SpecPage } from "@stencil/core/testing";
import { HTMLCalciteActionElement, HTMLCalciteListElement, HTMLCalciteListItemElement } from '@esri/calcite-components/dist';
export declare class ArcgisHubDiscussionsPostGeographySpecPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get list(): HTMLCalciteListElement;
  get listItems(): NodeListOf<HTMLCalciteListItemElement>;
  get listItem(): HTMLCalciteListItemElement;
  get actions(): NodeListOf<HTMLCalciteActionElement>;
  get updateAction(): HTMLCalciteActionElement;
  get deleteAction(): HTMLCalciteActionElement;
}
