/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetZoom {
  el: HTMLArcgisHubMapWidgetZoomElement;
  view: __esri.View;
  scale: Scale;
  canZoomIn: boolean;
  canZoomOut: boolean;
  hubTelemetry: EventEmitter;
  handles: __esri.Handle[];
  intl: ComponentIntl;
  zoomViewModel: __esri.ZoomViewModel;
  constructor();
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleViewChange(view: __esri.View, prevView: __esri.View): void;
  connectWatch(): void;
  removeWatch(): void;
  connectViewModel(): Promise<void>;
  updateCanZoomIn(value: boolean): void;
  updateCanZoomOut(value: boolean): void;
  zoomIn(): void;
  zoomOut(): void;
  render(): any;
}
