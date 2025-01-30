/**
 * Returns Esri geometry types from ArcGIS Rest API geometry types
 * https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
 * @param {string} Portal geometry type string ('esriGeometryPoint', etc)
 * @returns {string} Esri geometry type string ('point', etc)

 */
export function esriGeometryType(type) {
  const portalTypes = {
    'esriGeometryPoint': 'Point',
    'esriGeometryPolyline': 'Polyline',
    'esriGeometryPolygon': 'Polygon',
    'esriGeometryEnvelope': 'Extent',
  };
  return portalTypes[type];
}
