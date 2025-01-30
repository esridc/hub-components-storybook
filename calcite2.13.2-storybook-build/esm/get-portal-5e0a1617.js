import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';

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
    var url = getPortalUrl(requestOptions) + "/portals/" + idOrSelf;
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request(url, options);
}

export { getPortal as a, getSelf as g };
