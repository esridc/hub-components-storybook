/// <reference types="arcgis-js-api" />
import { IExtent } from '@esri/arcgis-rest-feature-layer';
/**
 * Expand the extent by a given factor. For example,
 * a value of 1.5 will expand the extent to be 50 percent larger than the original extent.
 * @param {object} extent - Esri Extent or Esri JSON extent object.  Example:
 * { "xmin": -118.258, "ymin": 34.048, "xmax": -118.248, "ymax": 34.052, "spatialReference": { "wkid": 4326 } }
 * @param {number} factor Number - The multiplier value.
 * @returns {object} Esri Extent expanded by given factor
 */
export declare function expandExtentByFactor(extent: __esri.Extent | IExtent, factor?: number): IExtent | __esri.Extent;
/**
 * get the area of an extent (JSON)
 * @param  {Object} extent  extent JSON
 * @return {Boolean}
 */
export declare function getExtentArea(extent: IExtent | __esri.Extent): number;
