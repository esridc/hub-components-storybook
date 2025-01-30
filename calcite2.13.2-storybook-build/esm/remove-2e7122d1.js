import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';

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
    var url = getPortalUrl(requestOptions) + "/community/createGroup";
    requestOptions.params = __assign(__assign({}, requestOptions.params), requestOptions.group);
    return request(url, requestOptions);
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
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/protect";
    return request(url, requestOptions);
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
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/unprotect";
    return request(url, requestOptions);
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
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/delete";
    var options = __assign({}, requestOptions);
    return request(url, options);
}

export { createGroup as c, protectGroup as p, removeGroup as r, unprotectGroup as u };
