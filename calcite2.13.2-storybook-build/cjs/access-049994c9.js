'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const helpers = require('./helpers-05252545.js');
const request = require('./request-67da3c71.js');

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
    var url = helpers.getSharingUrl(requestOptions);
    if (helpers.isItemOwner(requestOptions)) {
        // if the user owns the item, proceed
        return updateItemAccess(url, requestOptions);
    }
    else {
        // otherwise we need to check to see if they are an organization admin
        return helpers.isOrgAdmin(requestOptions).then(function (admin) {
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
    requestOptions.params = tslib_es6.__assign({ org: false, everyone: false }, requestOptions.params);
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
    return request.request(url, requestOptions);
}

exports.setItemAccess = setItemAccess;
