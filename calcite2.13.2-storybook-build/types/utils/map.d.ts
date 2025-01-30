import { IHubLocation } from "@esri/hub-common";
import { Tool } from '../components/arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types';
export declare const getExtentSymbol: (useHover?: boolean) => __esri.SimpleFillSymbolProperties;
/**
 * Given an IHubLocation, this function returns the count of points/vertices.
 * This currently works with 2D data, but if we ever get into z/m, we may
 * need to tweak this
 */
export declare const getPointCount: (location: IHubLocation) => number;
export declare const getGeometryTypeDrawTool: (type?: string) => Tool;
