import { _ as __assign } from './tslib.es6-7023f322.js';
import { a as getSharingUrl, i as isItemOwner, b as isOrgAdmin } from './helpers-6692d307.js';
import { r as request } from './request-fa80ae40.js';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { setItemAccess } from "@esri/arcgis-rest-portal";
 * //
 * setItemAccess({
 *   id: "abc123",
 *   access: "public", // 'org' || 'private'
 *   authentication: session
 * })
 * ```
 * Change who is able to access an item.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the data from the response.
 */
function setItemAccess(requestOptions) {
    var url = getSharingUrl(requestOptions);
    if (isItemOwner(requestOptions)) {
        // if the user owns the item, proceed
        return updateItemAccess(url, requestOptions);
    }
    else {
        // otherwise we need to check to see if they are an organization admin
        return isOrgAdmin(requestOptions).then(function (admin) {
            if (admin) {
                return updateItemAccess(url, requestOptions);
            }
            else {
                // if neither, updating the sharing isnt possible
                throw Error("This item can not be shared by " + requestOptions.authentication.username + ". They are neither the item owner nor an organization admin.");
            }
        });
    }
}
function updateItemAccess(url, requestOptions) {
    requestOptions.params = __assign({ org: false, everyone: false }, requestOptions.params);
    // if the user wants to make the item private, it needs to be unshared from any/all groups as well
    if (requestOptions.access === "private") {
        requestOptions.params.groups = " ";
    }
    if (requestOptions.access === "org") {
        requestOptions.params.org = true;
    }
    // if sharing with everyone, share with the entire organization as well.
    if (requestOptions.access === "public") {
        // this is how the ArcGIS Online Home app sets public access
        // setting org = true instead of account = true will cancel out all sharing
        requestOptions.params.account = true;
        requestOptions.params.everyone = true;
    }
    return request(url, requestOptions);
}

export { setItemAccess as s };
