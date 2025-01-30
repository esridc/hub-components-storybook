import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';

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
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.group.id + "/update";
    requestOptions.params = __assign(__assign({}, requestOptions.params), requestOptions.group);
    return request(url, requestOptions);
}

export { updateGroup as u };
