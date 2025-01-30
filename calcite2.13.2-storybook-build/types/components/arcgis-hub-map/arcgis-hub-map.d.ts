/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../stencil-public-runtime';
import { IArcGISContext, IHubMapSettings } from '@esri/hub-common';
export declare type IBasemapOptions = 'satellite' | 'hybrid' | 'oceans' | 'osm' | 'terrain' | 'dark-gray-vector' | 'gray-vector' | 'streets-vector' | 'streets-night-vector' | 'streets-navigation-vector' | 'topo-vector' | 'streets-relief-vector';
declare type IExtentJson = {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  spatialReference?: {
    wkid: number;
  };
};
export declare class ArcgisHubMap {
  _container: HTMLDivElement;
  map: __esri.Map | __esri.WebMap | __esri.WebScene;
  view: __esri.MapView | __esri.SceneView;
  /**
   * Map center: lng,lat
   */
  center: string;
  /**
   * Level of Detail (LOD)
   */
  zoom: number;
  /**
   * Geometry Object for setting map extent
   * https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
   */
  extent: IExtentJson;
  /**
   * Expand extent by given factor
   * https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html#expand
   */
  expand: number;
  /**
   * Well known basemap ID
   */
  basemap: IBasemapOptions;
  /**
   * Array of graphics that will be added to the view's graphics layer
   * The graphics can be an array of any of the following:
   * - JSON objects in the API response format (i.e. web map spec)
   * - the properties you pass to new Graphic() (__esri.GraphicProperties)
   * - instances of the Graphic class (__esri.Graphic)
   * The latter will be cloned before being added to the map. See:
   * https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#graphics
   */
  graphics: any[];
  /**
   * Whether to disable pinch-zoom and panning on the view
   */
  disablePinchZoomAndPanning: boolean;
  /**
   * Whether to disable zooming via double-click on the view
   */
  disableDoubleClickZoom: boolean;
  /**
   * Whether to disable mouse wheel scroll zooming on the view
   */
  disableMouseWheelZoom: boolean;
  /**
   * Entity specific map configuration settings
   */
  settings: IHubMapSettings;
  dragHandle: __esri.Handle;
  doubleClickHandle: __esri.Handle;
  mouseWheelHandle: __esri.Handle;
  arcgisHubMapViewReady: EventEmitter<{
    view: __esri.MapView;
  }>;
  /**
  * Event that fires for recording telemetry
  */
  hubTelemetry: EventEmitter<any>;
  handleBasemapChanged(basemap: IBasemapOptions): void;
  handleCenterChanged(center: string): void;
  handleGraphicsChanged(graphics: __esri.Graphic[]): void;
  handleExtentChanged(): void;
  handleDisablePinchZoomAndPanningChange(): void;
  handleDisableDoubleClickZoomChange(): void;
  handleDisableMouseWheelZoomChange(): void;
  /**
   * If the settings change, re-setup the map
   */
  handleSettingsChange(newSettings: IHubMapSettings, oldSettings: IHubMapSettings): Promise<void>;
  isMapLoaded(): boolean;
  centerToCoords(center: string): number[];
  private createGraphic;
  buildGraphics(): __esri.Graphic[];
  setExtent(): void;
  private _setContainer;
  constructor();
  componentDidLoad(): Promise<void>;
  /**
   * Setup the map and view
   */
  setup(): Promise<void>;
  /**
   * Adds handlers for actions in the map view that should emit telemetry
   */
  addTelemetryWatchers(): void;
  stopEvtPropagation(event: any): void;
  /**
   * Get the global context
   * @returns {IArcGISContext}
   */
  get _context(): IArcGISContext;
  render(): any;
}
export {};
