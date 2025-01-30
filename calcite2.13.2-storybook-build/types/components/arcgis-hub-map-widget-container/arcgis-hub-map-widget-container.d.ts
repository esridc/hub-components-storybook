/// <reference types="arcgis-js-api" />
import { Position, Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetContainer {
  el: HTMLArcgisHubMapWidgetContainerElement;
  expandDisabled: boolean;
  viewPosition: string;
  view: __esri.View;
  scale: Scale;
  expanded: boolean;
  get position(): Position;
  constructor();
  componentWillLoad(): void;
  disconnectedCallback(): void;
  addWidgetToView(view: __esri.View, prevView: __esri.View): void;
  toggleExpanded(): void;
  render(): any;
}
