import { getExtentArea } from "../../../utils";
import { defaultLayerThemeOptions } from "../../arcgis-hub-discussions-map-integrator/symbols";
;
/**
 * Default map configuration settings
 */
export const DEFAULT_MAP_SETTINGS = {
  extent: 'default'
};
/**
 * Default color (HUB PURPLE) used for representing search location
 * TODO: allow for symbols to be customized
 */
const COLOR = defaultLayerThemeOptions.polygon.color;
/**
 * simple-fill-symbol properties used for representing search location
 * polygon graphics on the map
 */
export const SIMPLE_FILL_SYMBOL = {
  type: "simple-fill",
  color: [...COLOR, 0.005],
  style: "solid",
  outline: {
    color: COLOR,
    width: 1
  }
};
/**
 * simple-marker-symbol properties used for representing search location
 * point graphics on the map
 */
export const SIMPLE_MARKER_SYMBOL = {
  type: "simple-marker",
  style: "circle",
  color: [...COLOR, 0.50],
  size: "8px",
  outline: {
    color: COLOR,
    width: 1
  }
};
/**
 * simple-line-symbol properties used for representing search location
 * line graphics on the map
 */
export const SIMPLE_LINE_SYMBOL = {
  type: "simple-line",
  color: COLOR,
  width: "2px",
  style: "solid"
};
export const getSymbol = (geometry) => {
  const geomType = geometry.type;
  let symbolProperties;
  switch (geomType) {
    case 'point':
      symbolProperties = SIMPLE_MARKER_SYMBOL;
      break;
    case 'polyline':
      symbolProperties = SIMPLE_LINE_SYMBOL;
      break;
    default:
      symbolProperties = SIMPLE_FILL_SYMBOL;
  }
  return symbolProperties;
};
/**
 * Highlight options for highlighting features on the map on
 * hover
 */
export const HOVER_HIGHLIGHT_OPTION = {
  color: "#00ffff",
  haloOpacity: 0.8,
  fillOpacity: 0
};
/**
 * Highlight options for highlighting features on the map on
 * select
 */
export const SELECT_HIGHLIGHT_OPTION = {
  color: "#00ffff",
  haloOpacity: 0.8,
  fillOpacity: 0.15
};
/**
 * Returns the appropriate highlight options based on the highlight type
 * @param highlightType - IHighlightType => 'hover' | 'select'
 * @returns __esri.HighlightOptions
 */
export const getHighlightOptions = (highlightType) => {
  return highlightType === 'hover' ? HOVER_HIGHLIGHT_OPTION : SELECT_HIGHLIGHT_OPTION;
};
/**
 * World extent, useful for setting a default extent or view
 * constraints
 */
export const WORLD_EXTENT = {
  type: 'extent',
  xmin: -20037508.3427892,
  ymin: -20037508.3427892,
  xmax: 20037508.3427892,
  ymax: 20037508.3427892,
  spatialReference: { wkid: 102100 }
};
/**
 * Applies global extent restraints on the view, so users cannot
 * zoom or pan outside of the world extent
 */
export const constrainViewToWorldBounds = (view) => {
  view.constraints.minZoom = 2;
  // I'd rather not use unknown, but working with autocast types is a pain
  view.constraints.geometry = WORLD_EXTENT;
};
// by default use the area of the polygon's extent
const _getPolygonArea = (polygon) => {
  return getExtentArea(polygon.extent);
};
/**
 * Sort function for sorting geometries by area in order of largest to smallest
 * @param geometryA __esri.Geometry
 * @param geometryB __esri.Geometry
 * @returns
 */
export const sortGeometriesByArea = (geometryA, geometryB, getPolygonArea = _getPolygonArea) => {
  // If both geometries are points or polylines, they are considered equal for sorting purposes
  if ((geometryA.type === 'point' || geometryA.type === 'polyline') && (geometryB.type === 'point' || geometryB.type === 'polyline')) {
    return 0;
  }
  // If geometryA is a point or polyline, it should come last
  if (geometryA.type === 'point' || geometryA.type === 'polyline') {
    return 1;
  }
  // If geometryB is a point or polyline, it should come last
  if (geometryB.type === 'point' || geometryB.type === 'polyline') {
    return -1;
  }
  // If neither geometry is a point or polyline, sort by area
  try {
    const areaA = Math.abs(getPolygonArea(geometryA));
    const areaB = Math.abs(getPolygonArea(geometryB));
    if (areaA < areaB) {
      return 1;
    }
    if (areaA > areaB) {
      return -1;
    }
    if (areaA === areaB) {
      return 0;
    }
  }
  catch (_a) {
    // problem with the area calculation, just return 0
    return 0;
  }
};
/**
 * Cleans up any active map state by closing popups
 * @param view: __esri.MapView A reference to an Esri map view object
 */
export const clearActiveMapState = (view) => {
  view.closePopup();
  // TODO: Clear any active graphic states on the map
};
