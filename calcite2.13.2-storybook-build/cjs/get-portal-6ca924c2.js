'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Get the portal
 * @param requestOptions
 */
function getSelf(requestOptions) {
    // just delegate to getPortal w/o an id
    return getPortal(null, requestOptions);
}
/**
 * ```js
 * import { getPortal } from "@esri/arcgis-rest-request";
 * //
 * getPortal()
 * getPortal("fe8")
 * getPortal(null, { portal: "https://custom.maps.arcgis.com/sharing/rest/" })
 * ```
 * Fetch information about the specified portal by id. If no id is passed, portals/self will be called.
 * Note that if you intend to request a portal by id and it is different from the portal specified by options.authentication, you must also pass options.portal.
 * @param id
 * @param requestOptions
 */
function getPortal(id, requestOptions) {
    // construct the search url
    var idOrSelf = id ? id : "self";
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/portals/" + idOrSelf;
    // default to a GET request
    var options = tslib_es6.__assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request.request(url, options);
}

exports.getPortal = getPortal;
exports.getSelf = getSelf;
