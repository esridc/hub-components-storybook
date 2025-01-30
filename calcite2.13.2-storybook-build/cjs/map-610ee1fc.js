'use strict';

const EXTENT_SYMBOL = {
  color: [93, 173, 221, 0.1],
  outline: {
    color: [255, 255, 255, 1],
    width: 1,
    type: 'simple-line',
    style: 'solid'
  },
  type: 'simple-fill',
  style: 'solid'
};
const EXTENT_HOVER_SYMBOL = {
  color: [93, 173, 221, 0.25],
  outline: {
    color: [155, 155, 155, 1],
    width: 4,
    type: 'simple-line',
    style: 'solid'
  },
  type: 'simple-fill',
  style: 'solid'
};
const getExtentSymbol = (useHover) => {
  return useHover ? EXTENT_HOVER_SYMBOL : EXTENT_SYMBOL;
};
/**
 * Given an IHubLocation, this function returns the count of points/vertices.
 * This currently works with 2D data, but if we ever get into z/m, we may
 * need to tweak this
 */
const getPointCount = (location) => {
  const geometries = location === null || location === void 0 ? void 0 : location.geometries;
  return geometries === null || geometries === void 0 ? void 0 : geometries.reduce((acc, g) => {
    if (g.type === 'point') {
      acc += 1;
    }
    else if (g.type === 'polyline') {
      acc = acc + g.paths[0].length;
    }
    else if (g.type === 'polygon') {
      // Polygons close so the last ring is not counted
      acc = acc + g.rings[0].length - 1;
    }
    return acc;
  }, 0);
};
const getGeometryTypeDrawTool = (type) => type === 'extent'
  ? 'rectangle'
  : type;

exports.getExtentSymbol = getExtentSymbol;
exports.getGeometryTypeDrawTool = getGeometryTypeDrawTool;
exports.getPointCount = getPointCount;
