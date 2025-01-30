import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { d as determineOwner } from './get-f0caeb52.js';
import { r as request } from './request-fa80ae40.js';

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
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/delete";
        return request(url, requestOptions);
    });
}
/**
 * Remove a resource associated with an item
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes an item resource.
 */
function removeItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/removeResources";
        // mix in user supplied params
        requestOptions.params = __assign(__assign({}, requestOptions.params), { resource: requestOptions.resource });
        // only override the deleteAll param specified previously if it is passed explicitly
        if (typeof requestOptions.deleteAll !== "undefined") {
            requestOptions.params.deleteAll = requestOptions.deleteAll;
        }
        return request(url, requestOptions);
    });
}

export { removeItemResource as a, removeItem as r };
