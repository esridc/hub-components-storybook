import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { d as determineOwner } from './get-f0caeb52.js';
import { r as request } from './request-fa80ae40.js';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Protect an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/protect.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to protect an item.
 */
function protectItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/protect";
        return request(url, requestOptions);
    });
}
/**
 * Unprotect an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/unprotect.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to unprotect an item.
 */
function unprotectItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/unprotect";
        return request(url, requestOptions);
    });
}

export { protectItem as p, unprotectItem as u };
