'use strict';

const updateUserMembership = require('./update-user-membership-4af88c1c.js');
const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');
const failSafe = require('./fail-safe-33c35b7f.js');

/**
 * Invites users to join a group. Operation success
 * will be indicated by a flag on the return
 * object. If there are any errors, they will be
 * placed in an errors array on the return object
 *
 * ```js
 * const authentication: IAuthenticationManager; // Typically passed into to the function
 * //
 * const options: IInviteGroupUsersOptions = {
 *  id: 'group_id',
 *  users: ['ed', 'edd', 'eddy'],
 *  role: 'group-member',
 *  expiration: 20160,
 *  authentication
 * }
 * //
 * const result = await inviteGroupUsers(options);
 * //
 * const if_success_result_looks_like = {
 *  success: true
 * }
 * //
 * const if_failure_result_looks_like = {
 *  success: false,
 *  errors: [ArcGISRequestError]
 * }
 * ```
 * @param {IInviteGroupUsersOptions} options
 *
 * @returns {Promise<IAddGroupUsersResult>}
 */
function inviteGroupUsers(options) {
    var id = options.id;
    var url = getPortalUrl.getPortalUrl(options) + "/community/groups/" + id + "/invite";
    var batches = _generateBatchRequests(options);
    var promises = batches.map(function (batch) { return _sendSafeRequest(url, batch); });
    return Promise.all(promises).then(_combineResults);
}
/**
 * @private
 */
function _generateBatchRequests(options) {
    var userBatches = updateUserMembership.chunk(options.users, 25);
    return userBatches.map(function (users) { return _generateRequestOptions(users, options); });
}
/**
 * @private
 */
function _generateRequestOptions(users, baseOptions) {
    var requestOptions = Object.assign({}, baseOptions);
    requestOptions.params = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions.params), { users: users, role: requestOptions.role, expiration: requestOptions.expiration });
    return requestOptions;
}
/**
 * @private
 */
function _sendSafeRequest(url, requestOptions) {
    return request.request(url, requestOptions)
        .catch(function (error) { return ({ errors: [error] }); });
}
/**
 * @private
 */
function _combineResults(responses) {
    var success = responses.every(function (res) { return res.success; });
    var errors = responses.reduce(function (collection, res) { return collection.concat(res.errors || []); }, []);
    var combined = { success: success };
    if (errors.length > 0) {
        combined.errors = errors;
    }
    return combined;
}

/**
 *
 * Attempts to auto-add users to a group
 *
 * @param {string} id ID of the group the users will be added to
 * @param {IUser[]} users
 * @param {IAuthenticationManager} authentication
 *
 * @returns {IAddGroupUsersResult|null} Result of the transaction (null if no users are passed in)
 */
function autoAddUsers(id, users, authentication) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            id,
            users: users.map((u) => u.username),
            authentication,
        };
        response = updateUserMembership.addGroupUsers(args);
    }
    return response;
}

/**
 *
 * Attempts to invite users to a group
 *
 * @param {string} id ID of the group the users will be invited to
 * @param {object[]} users
 * @param {object} authentication
 * @param {number} expiration How long the invite will be active (in minutes)
 * @param {string} role What role should they be added as. Defaults to group member
 *
 * @returns {object|null} Result of the transaction (null if no users are passed in)
 */
function inviteUsers(id, users, authentication, expiration = 20160, // default to 2 week expiration TODO: is this actually 2 weeks?
role = "group_member" // default to group member, but allow for team_admin as well
) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            id,
            users: users.map((u) => u.username),
            authentication,
            role,
            expiration,
        };
        response = inviteGroupUsers(args);
    }
    return response;
}

/**
 * Add or invite N users to a single group.
 * If autoAdd is true (if the user doing the adding has the 'portal:admin:assignToGroups' priv)
 * then we attempt to auto add EVERY user to the group.
 * If that call fails, then we attempt to invite them.
 *
 * @export
 * @param {string} groupId ID of the group the users will be added to
 * @param {string[]} usernames usernames of the users to add
 * @param {IUserRequestOptions} auth Auth
 * @param {boolean} autoAdd should we auto add users?
 * @return {*}  {Promise<IAddGroupMembersResult>}
 */
async function addGroupMembers(groupId, usernames, auth, autoAdd) {
    const added = [];
    const invited = [];
    const notAdded = [];
    const notInvited = [];
    const responses = [];
    // iterate through users as we want a distinct add/invite call per user.
    // This is primarily because batch inviting of users will only return a single consolidated
    // 'success' response, which provides no granularity on which users were actually successfully invited.
    // Similarly errors are consolidated into a single array, which again provides no granularity on which users
    // experienced the error.
    for (const username of usernames) {
        let inviteUser = true;
        const response = {
            username,
            add: null,
            invite: null,
        };
        // expand user into an 'IUser' object for add/invite functions to then extract...
        const user = { username };
        // Create failSafe functions for add/invite
        const failSafeAdd = failSafe.failSafe(autoAddUsers);
        const failSafeInvite = failSafe.failSafe(inviteUsers);
        // If we can add the user automatically, then attempt to do so
        if (autoAdd) {
            // fail safe add
            const addResponse = await failSafeAdd(groupId, [user], auth.authentication);
            // add response to response obj
            response.add = addResponse;
            // if they were added, then don't invite and add to added array
            if (!addResponse.notAdded || addResponse.notAdded.length === 0) {
                inviteUser = false;
                added.push(username);
            }
            else {
                notAdded.push(username);
            }
        }
        if (inviteUser) {
            // fail safe invite
            const inviteResponse = await failSafeInvite(groupId, [user], auth.authentication);
            // add response to response obj
            response.invite = inviteResponse;
            // if they were invited, then add to invited array
            if (inviteResponse.success) {
                invited.push(username);
            }
            else {
                notInvited.push(username);
            }
        }
        // push response to responses array
        responses.push(response);
    }
    return {
        added,
        invited,
        notAdded,
        notInvited,
        responses,
    };
}

exports.addGroupMembers = addGroupMembers;
exports.autoAddUsers = autoAddUsers;
exports.inviteUsers = inviteUsers;
