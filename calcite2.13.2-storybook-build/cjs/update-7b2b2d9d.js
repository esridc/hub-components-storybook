'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateGroup } from '@esri/arcgis-rest-portal';
 * //
 * updateGroup({
 *   group: { id: "fgr344", title: "new" }
 * })
 *   .then(response)
 * ```
 * Update the properties of a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-group.htm) for more information.
 *
 * @param requestOptions - Options for the request, including the group
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function updateGroup(requestOptions) {
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.group.id + "/update";
    requestOptions.params = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions.params), requestOptions.group);
    return request.request(url, requestOptions);
}

exports.updateGroup = updateGroup;
