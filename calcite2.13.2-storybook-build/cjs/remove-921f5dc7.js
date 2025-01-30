'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const get = require('./get-0368c931.js');
const request = require('./request-67da3c71.js');

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { removeItem } from "@esri/arcgis-rest-portal";
 * //
 * removeItem({
 *   id: "3ef",
 *   authentication
 * })
 * ```
 * Delete an item from the portal. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/delete-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes an item.
 */
function removeItem(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/delete";
        return request.request(url, requestOptions);
    });
}
/**
 * Remove a resource associated with an item
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes an item resource.
 */
function removeItemResource(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/removeResources";
        // mix in user supplied params
        requestOptions.params = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions.params), { resource: requestOptions.resource });
        // only override the deleteAll param specified previously if it is passed explicitly
        if (typeof requestOptions.deleteAll !== "undefined") {
            requestOptions.params.deleteAll = requestOptions.deleteAll;
        }
        return request.request(url, requestOptions);
    });
}

exports.removeItem = removeItem;
exports.removeItemResource = removeItemResource;
