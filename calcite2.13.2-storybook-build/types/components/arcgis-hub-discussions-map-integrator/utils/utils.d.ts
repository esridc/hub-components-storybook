/// <reference types="arcgis-js-api" />
import { Geometry } from 'geojson';
/**
 * Properties that can be configured for point
 */
export declare type PointSymbolProperties = {
  activeColor: number[];
  color: number[];
  hoverColor: number[];
};
/**
 * Properties that can be configured for polyline
 */
export declare type PolylineSymbolProperties = {
  activeColor: number[];
  color: number[];
  hoverColor: number[];
  width: number;
};
/**
 * Properties that can be configured for polygon
 */
export declare type PolygonSymbolProperties = {
  activeColor: number[];
  color: number[];
  hoverColor: number[];
  width: number;
};
/**
 * Properties that can be configured for callout
 */
export declare type CalloutSymbolProperties = {
  backgroundColor: number[];
  textColor: number[];
  hoverColor: number[];
  activeColor: number[];
  width: number;
  isOffset: boolean;
  is3D?: boolean;
};
/**
 * Configuration for setting custom theme properties on graphic symbols
 */
export interface ISymbolOptions {
  extent?: PolygonSymbolProperties;
  point?: PointSymbolProperties;
  polyline?: PolylineSymbolProperties;
  polygon?: PolygonSymbolProperties;
  callout?: CalloutSymbolProperties;
}
/**
 * Optional map states for symbol
 */
export declare enum SYMBOL_STATE {
  ACTIVE = "active",
  HOVER = "hover",
  DEFAULT = "default"
}
/**
 * Point text symbol properties
 */
export interface ITextSymbolProperties extends __esri.TextSymbolProperties {
  type: 'text';
}
/**
 * CIM Symbol Properties
 */
export interface ICIMSymbolProperties extends __esri.CIMSymbolProperties {
  type: 'cim';
}
/**
 * Stores both arcgis and geojson geometries in single object
 */
export interface IGeometries {
  arcgis: __esri.Geometry;
  geojson: Geometry;
}
/**
 * Get the maximum deviation for a given view
 * @param {Object} view - Esri view
 * @param {number} maxDeviation - Maximum allowed deviation from original geometry
 * @returns {number} Number - Maximum deviation
**/
export declare function getMaxDeviation(view: __esri.View, maxDeviation?: number): number;
