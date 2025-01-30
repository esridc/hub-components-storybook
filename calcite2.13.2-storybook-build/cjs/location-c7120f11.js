'use strict';

require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
const extent = require('./extent-d08ca59a.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const index = require('./index-77afc8bd.js');

/**
 * Default map configuration settings
 */
const DEFAULT_MAP_SETTINGS = {
  extent: 'default'
};
/**
 * Default color (HUB PURPLE) used for representing search location
 * TODO: allow for symbols to be customized
 */
const COLOR = index.defaultLayerThemeOptions.polygon.color;
/**
 * simple-fill-symbol properties used for representing search location
 * polygon graphics on the map
 */
const SIMPLE_FILL_SYMBOL = {
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
const SIMPLE_MARKER_SYMBOL = {
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
const SIMPLE_LINE_SYMBOL = {
  type: "simple-line",
  color: COLOR,
  width: "2px",
  style: "solid"
};
const getSymbol = (geometry) => {
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
const HOVER_HIGHLIGHT_OPTION = {
  color: "#00ffff",
  haloOpacity: 0.8,
  fillOpacity: 0
};
/**
 * Highlight options for highlighting features on the map on
 * select
 */
const SELECT_HIGHLIGHT_OPTION = {
  color: "#00ffff",
  haloOpacity: 0.8,
  fillOpacity: 0.15
};
/**
 * Returns the appropriate highlight options based on the highlight type
 * @param highlightType - IHighlightType => 'hover' | 'select'
 * @returns __esri.HighlightOptions
 */
const getHighlightOptions = (highlightType) => {
  return highlightType === 'hover' ? HOVER_HIGHLIGHT_OPTION : SELECT_HIGHLIGHT_OPTION;
};
/**
 * World extent, useful for setting a default extent or view
 * constraints
 */
const WORLD_EXTENT = {
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
const constrainViewToWorldBounds = (view) => {
  view.constraints.minZoom = 2;
  // I'd rather not use unknown, but working with autocast types is a pain
  view.constraints.geometry = WORLD_EXTENT;
};
// by default use the area of the polygon's extent
const _getPolygonArea = (polygon) => {
  return extent.getExtentArea(polygon.extent);
};
/**
 * Sort function for sorting geometries by area in order of largest to smallest
 * @param geometryA __esri.Geometry
 * @param geometryB __esri.Geometry
 * @returns
 */
const sortGeometriesByArea = (geometryA, geometryB, getPolygonArea = _getPolygonArea) => {
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
const clearActiveMapState = (view) => {
  view.closePopup();
  // TODO: Clear any active graphic states on the map
};

exports.DEFAULT_MAP_SETTINGS = DEFAULT_MAP_SETTINGS;
exports.clearActiveMapState = clearActiveMapState;
exports.constrainViewToWorldBounds = constrainViewToWorldBounds;
exports.getHighlightOptions = getHighlightOptions;
exports.getSymbol = getSymbol;
exports.sortGeometriesByArea = sortGeometriesByArea;
