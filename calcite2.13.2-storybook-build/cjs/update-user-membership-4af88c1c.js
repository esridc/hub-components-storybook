'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');

/* Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function chunk(array, size) {
    if (array.length === 0) {
        return [];
    }
    var chunks = [];
    for (var i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addGroupUsers } from "@esri/arcgis-rest-portal";
 * //
 * addGroupUsers({
 *   id: groupId,
 *   users: ["username1", "username2"],
 *   admins: ["username3"],
 *   authentication
 * })
 * .then(response);
 * ```
 * Add users to a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-users-to-group.htm) for more information.
 *
 * @param requestOptions  - Options for the request
 * @returns A Promise
 */
function addGroupUsers(requestOptions) {
    var id = requestOptions.id;
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + id + "/addUsers";
    var baseOptions = Object.assign({}, requestOptions, {
        admins: undefined,
        users: undefined
    });
    var batchRequestOptions = tslib_es6.__spreadArrays(_prepareRequests("users", requestOptions.users, baseOptions), _prepareRequests("admins", requestOptions.admins, baseOptions));
    var promises = batchRequestOptions.map(function (options) {
        return _sendSafeRequest(url, options);
    });
    return Promise.all(promises).then(_consolidateRequestResults);
}
function _prepareRequests(type, usernames, baseOptions) {
    if (!usernames || usernames.length < 1) {
        return [];
    }
    // the ArcGIS REST API only allows to add no more than 25 users per request,
    // see https://developers.arcgis.com/rest/users-groups-and-items/add-users-to-group.htm
    var userChunks = chunk(usernames, 25);
    return userChunks.map(function (users) {
        return _generateRequestOptions(type, users, baseOptions);
    });
}
function _generateRequestOptions(type, usernames, baseOptions) {
    var _a, _b;
    return Object.assign({}, baseOptions, (_a = {},
        _a[type] = usernames,
        _a.params = tslib_es6.__assign(tslib_es6.__assign({}, baseOptions.params), (_b = {}, _b[type] = usernames, _b)),
        _a));
}
// this request is safe since the request error will be handled
function _sendSafeRequest(url, requestOptions) {
    return request.request(url, requestOptions).catch(function (error) {
        return {
            errors: [error]
        };
    });
}
function _consolidateRequestResults(results) {
    var notAdded = results
        .filter(function (result) { return result.notAdded; })
        .reduce(function (collection, result) { return collection.concat(result.notAdded); }, []);
    var errors = results
        .filter(function (result) { return result.errors; })
        .reduce(function (collection, result) { return collection.concat(result.errors); }, []);
    var consolidated = { notAdded: notAdded };
    if (errors.length > 0) {
        consolidated.errors = errors;
    }
    return consolidated;
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { removeGroupUsers } from "@esri/arcgis-rest-portal";
 * //
 * removeGroupUsers({
 *   id: groupId,
 *   users: ["username1", "username2"],
 *   authentication
 * })
 * .then(response);
 * ```
 * Add users to a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/remove-users-from-group.htm) for more information.
 *
 * @param requestOptions  - Options for the request
 * @returns A Promise
 */
function removeGroupUsers(requestOptions) {
    var id = requestOptions.id, usersToRemove = requestOptions.users;
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + id + "/removeUsers";
    var safeSend = function (users) {
        var options = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions), { users: users, params: { users: users } });
        return request.request(url, options)
            .catch(function (error) { return ({ errors: [error] }); });
    };
    // the ArcGIS REST API only allows to add no more than 25 users per request,
    // see https://developers.arcgis.com/rest/users-groups-and-items/remove-users-from-group.htm
    var promises = chunk(usersToRemove, 25).map(function (usersChunk) { return safeSend(usersChunk); });
    return Promise.all(promises)
        .then(function (results) {
        var filtered = function (propName) { return results
            .filter(function (result) { return result[propName]; })
            .reduce(function (collection, result) { return collection.concat(result[propName]); }, []); };
        var errors = filtered('errors');
        var consolidated = { notRemoved: filtered('notRemoved') };
        return errors.length ? tslib_es6.__assign(tslib_es6.__assign({}, consolidated), { errors: errors }) : consolidated;
    });
}

/**
 * ```js
 * import { updateUserMemberships } from "@esri/arcgis-rest-portal";
 * //
 * updateUserMemberships({
 *   id: groupId,
 *   admins: ["username3"],
 *   authentication
 * })
 * .then(response);
 * ```
 * Change the user membership levels of existing users in a group
 *
 * @param requestOptions  - Options for the request
 * @returns A Promise
 */
function updateUserMemberships(requestOptions) {
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/updateUsers";
    var opts = {
        authentication: requestOptions.authentication,
        params: {}
    };
    // add the correct params depending on the type of membership we are changing to
    if (requestOptions.newMemberType === "admin") {
        opts.params.admins = requestOptions.users;
    }
    else {
        opts.params.users = requestOptions.users;
    }
    // make the request
    return request.request(url, opts);
}

exports.addGroupUsers = addGroupUsers;
exports.chunk = chunk;
exports.removeGroupUsers = removeGroupUsers;
exports.updateUserMemberships = updateUserMemberships;
