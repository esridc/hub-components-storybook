import { Quadrant } from '../types';
/**
 * Determine which view quadrant a point is located
 * @param point ScreenPoint
 * @param view MapView
 * @returns Quadrant
 */
export declare const getQuad: (point: __esri.ScreenPoint, view: __esri.MapView) => Quadrant;
/**
 * Given an extent and quad, return corner point closest to map center
 * @param extent Extent
 * @param quad Quadrant
 * @returns Point
 */
export declare const getExtentQuadCornerPoint: (extent: __esri.Extent, quad: Quadrant) => Partial<__esri.Point>;
/**
 * Calculates planar distance between two points
 * @param pointA Point
 * @param pointB Point
 * @returns Distance between points in relative units
 */
export declare const distance: (pointA: __esri.Point, pointB: __esri.Point) => number;
/**
 * Dermine the closest point on a polygon or polyline from a given point
 * @param point Point
 * @param geom Polygon || Polyline
 * @returns Point
 */
export declare const getClosestPoint: (point: __esri.Point, geom: __esri.Polygon | __esri.Polyline) => Partial<__esri.Point>;
