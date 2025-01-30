'use strict';

// stolen from https://devtopia.esri.com/WebGIS/arcgis-js-api/blob/c7778e917036ce0b0cc9125098afb30720e460ac/esri/geometry/Extent.ts
// so we don't have to import the entire Extent module and its dependencies
/**
 * Expands the extent by the given factor. For example, a value of 1.5 will
 * expand the extent to be 50 percent larger than the original extent.
 * This method modifies the extent geometry in-place. You should [clone](#clone)
 * the extent object before calling this method where appropriate.
 *
 * @param {number} factor - The multiplier value.
 *
 * @return {module:esri/geometry/Extent} Returns the expanded extent.
 */
const expandExtent = (extent, factor) => {
  //summary: Expands the Extent object by argument factor. If 0 > factor < 1,
  //         the Extent shrinks. If factor > 1, the Extent expands.
  // factor: Number: Factor to expand the Extent by
  const deltaf = (1 - factor) * 0.5;
  const width = Math.abs(extent.xmax - extent.xmin);
  const height = Math.abs(extent.ymax - extent.ymin);
  const deltaw = width * deltaf;
  const deltah = height * deltaf;
  extent.xmin += deltaw;
  extent.ymin += deltah;
  extent.xmax -= deltaw;
  extent.ymax -= deltah;
  const hasZ = extent.zmin != null && extent.zmax != null;
  if (hasZ) {
    const deltad = (extent.zmax - extent.zmin) * deltaf;
    extent.zmin += deltad;
    extent.zmax -= deltad;
  }
  // IExtent doesn't have mmin and mmax
  // if (extent.hasM) {
  //   const deltam = (extent.mmax! - extent.mmin!) * deltaf;
  //   extent.mmin! += deltam;
  //   extent.mmax! -= deltam;
  // }
  return extent;
};
/**
 * Expand the extent by a given factor. For example,
 * a value of 1.5 will expand the extent to be 50 percent larger than the original extent.
 * @param {object} extent - Esri Extent or Esri JSON extent object.  Example:
 * { "xmin": -118.258, "ymin": 34.048, "xmax": -118.248, "ymax": 34.052, "spatialReference": { "wkid": 4326 } }
 * @param {number} factor Number - The multiplier value.
 * @returns {object} Esri Extent expanded by given factor
 */
function expandExtentByFactor(extent, factor = 1.5) {
  if (!extent) {
    return;
  }
  return extent.expand
    ? extent.expand(factor)
    : expandExtent(extent, factor);
}
// NOTE: this is currently covered by the sortGeometriesByArea specs
/**
 * get the area of an extent (JSON)
 * @param  {Object} extent  extent JSON
 * @return {Boolean}
 */
function getExtentArea(extent) {
  if (!extent) {
    return 0;
  }
  const width = extent.xmax - extent.xmin;
  const height = extent.ymax - extent.ymin;
  return width * height;
}

exports.expandExtentByFactor = expandExtentByFactor;
exports.getExtentArea = getExtentArea;
