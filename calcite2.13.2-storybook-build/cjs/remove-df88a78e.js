'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { createGroup } from "@esri/arcgis-rest-portal";
 * //
 * createGroup({
 *   group: {
 *     title: "No Homers",
 *     access: "public"
 *   },
 *   authentication
 * })
 *   .then(response)
 * ```
 * Create a new Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/create-group.htm) for more information.
 *
 * Note: The group name must be unique within the user's organization.
 * @param requestOptions  - Options for the request, including a group object
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function createGroup(requestOptions) {
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/createGroup";
    requestOptions.params = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions.params), requestOptions.group);
    return request.request(url, requestOptions);
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { protectGroup } from '@esri/arcgis-rest-portal';
 * //
 * protectGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Protect a group to avoid accidental deletion. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/protect-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function protectGroup(requestOptions) {
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/protect";
    return request.request(url, requestOptions);
}
/**
 * ```js
 * import { unprotectGroup } from '@esri/arcgis-rest-portal';
 * //
 * unprotectGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Unprotect a Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/unprotect-group.htm) for more information.
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function unprotectGroup(requestOptions) {
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/unprotect";
    return request.request(url, requestOptions);
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { removeGroup } from '@esri/arcgis-rest-portal';
 * //
 * removeGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Delete a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/delete-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function removeGroup(requestOptions) {
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/delete";
    var options = tslib_es6.__assign({}, requestOptions);
    return request.request(url, options);
}

exports.createGroup = createGroup;
exports.protectGroup = protectGroup;
exports.removeGroup = removeGroup;
exports.unprotectGroup = unprotectGroup;
