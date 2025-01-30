import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';
import { a as appendCustomParams } from './append-custom-params-4bd856e5.js';

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getGroup } from "@esri/arcgis-rest-portal";
 * //
 * getGroup("fxb988") // id
 *   .then(response)
 * ```
 * Fetch a group using its id. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/group.htm) for more information.
 *
 * @param id - Group Id
 * @param requestOptions  - Options for the request
 * @returns  A Promise that will resolve with the data from the response.
 */
function getGroup(id, requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + id;
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * ```js
 * import { searchGroupUsers } from "@esri/arcgis-rest-portal";
 * //
 * searchGroupUsers('abc123')
 *   .then(response)
 * ```
 * Search the users in a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/group-users-list.htm) for more information.
 *
 * @param id - The group id
 * @param searchOptions - Options for the request, including paging parameters.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchGroupUsers(id, searchOptions) {
    var url = getPortalUrl(searchOptions) + "/community/groups/" + id + "/userlist";
    var options = appendCustomParams(searchOptions || {}, ["name", "num", "start", "sortField", "sortOrder", "joined", "memberType"], {
        httpMethod: "GET"
    });
    return request(url, options);
}

export { getGroup as g, searchGroupUsers as s };
