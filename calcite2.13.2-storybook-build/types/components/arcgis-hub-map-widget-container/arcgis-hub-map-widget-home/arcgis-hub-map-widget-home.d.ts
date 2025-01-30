/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetHome {
  el: HTMLArcgisHubMapWidgetHomeElement;
  view: __esri.View;
  scale: Scale;
  disabled: boolean;
  hubTelemetry: EventEmitter;
  handles: __esri.Handle[];
  intl: ComponentIntl;
  homeViewModel: __esri.HomeViewModel;
  constructor();
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleViewChange(view: __esri.View, prevView: __esri.View): void;
  connectWatch(): void;
  removeWatch(): void;
  connectViewModel(): Promise<void>;
  updateState(value: "disabled" | "ready" | "going-home"): void;
  zoomToInitialExtent(): void;
  /**
   * Sets the viewpoint of the home widget, which controls the extent that
   * the view should zoom to when the home button is clicked
   * @param viewpoint
   */
  setViewpoint(viewpoint: __esri.Viewpoint): Promise<void>;
  render(): any;
}
