import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { g as getGroup } from './get-850c466d.js';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function getSharingUrl(requestOptions) {
    var username = requestOptions.authentication.username;
    var owner = requestOptions.owner || username;
    return getPortalUrl(requestOptions) + "/content/users/" + encodeURIComponent(owner) + "/items/" + requestOptions.id + "/share";
}
function isItemOwner(requestOptions) {
    var username = requestOptions.authentication.username;
    var owner = requestOptions.owner || username;
    return owner === username;
}
/**
 * Check it the user is a full org_admin
 * @param requestOptions
 * @returns Promise resolving in a boolean indicating if the user is an ArcGIS Organization administrator
 */
function isOrgAdmin(requestOptions) {
    var session = requestOptions.authentication;
    return session.getUser(requestOptions).then(function (user) {
        return user && user.role === "org_admin" && !user.roleId;
    });
}
/**
 * Get the User Membership for a particular group. Use this if all you have is the groupId.
 * If you have the group object, check the `userMembership.memberType` property instead of calling this method.
 *
 * @param requestOptions
 * @returns A Promise that resolves with "owner" | "admin" | "member" | "nonmember"
 */
function getUserMembership(requestOptions) {
    // fetch the group...
    return getGroup(requestOptions.groupId, requestOptions)
        .then(function (group) {
        return group.userMembership.memberType;
    })
        .catch(function () {
        return "none";
    });
}

export { getSharingUrl as a, isOrgAdmin as b, getUserMembership as g, isItemOwner as i };
