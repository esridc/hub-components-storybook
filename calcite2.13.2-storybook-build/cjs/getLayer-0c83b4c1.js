'use strict';

const request = require('./request-67da3c71.js');
const cleanUrl = require('./clean-url-1dfecac0.js');

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getLayer } from '@esri/arcgis-rest-feature-layer';
 * //
 * getLayer({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0"
 * })
 *   .then(response) // { name: "311", id: 0, ... }
 * ```
 * Layer (Feature Service) request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm) for more information.
 *
 * @param options - Options for the request.
 * @returns A Promise that will resolve with the addFeatures response.
 */
function getLayer(options) {
    return request.request(cleanUrl.cleanUrl(options.url), options);
}

exports.getLayer = getLayer;
