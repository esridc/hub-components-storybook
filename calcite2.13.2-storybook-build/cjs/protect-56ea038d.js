'use strict';

const getPortalUrl = require('./get-portal-url-44f2448f.js');
const get = require('./get-0368c931.js');
const request = require('./request-67da3c71.js');

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Protect an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/protect.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to protect an item.
 */
function protectItem(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/protect";
        return request.request(url, requestOptions);
    });
}
/**
 * Unprotect an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/unprotect.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to unprotect an item.
 */
function unprotectItem(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/unprotect";
        return request.request(url, requestOptions);
    });
}

exports.protectItem = protectItem;
exports.unprotectItem = unprotectItem;
