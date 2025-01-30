'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');
const appendCustomParams = require('./append-custom-params-0f5d0fe2.js');

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
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + id;
    // default to a GET request
    var options = tslib_es6.__assign({ httpMethod: "GET" }, requestOptions);
    return request.request(url, options);
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
    var url = getPortalUrl.getPortalUrl(searchOptions) + "/community/groups/" + id + "/userlist";
    var options = appendCustomParams.appendCustomParams(searchOptions || {}, ["name", "num", "start", "sortField", "sortOrder", "joined", "memberType"], {
        httpMethod: "GET"
    });
    return request.request(url, options);
}

exports.getGroup = getGroup;
exports.searchGroupUsers = searchGroupUsers;
