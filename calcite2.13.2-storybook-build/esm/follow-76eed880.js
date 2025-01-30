import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { joinGroup } from '@esri/arcgis-rest-portal';
 * //
 * joinGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Make a request as the authenticated user to join a Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/join-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request and the groupId.
 */
function joinGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/join";
    return request(url, requestOptions);
}
/**
 * ```js
 * import { leaveGroup } from '@esri/arcgis-rest-portal';
 * //
 * leaveGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Make a request as the authenticated user to leave a Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/leave-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request and the groupId.
 */
function leaveGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/leave";
    return request(url, requestOptions);
}

/**
 * Get the entity's followers group id
 * @param entityId entity id
 * @param entityType entity type
 * @param context context used to support fetchHubEntity so it has access
 * to different types of request options based on the entity type
 * @returns {string} entity's followers group id
 */
async function getEntityFollowersGroupId(entityId, entityType, context) {
    // entity's type is IWithFollowers as we only want to accept hub entities
    // backed by item entities which extend IWithFollowers
    let entity;
    try {
        entity = (await fetchHubEntity(entityType, entityId, context));
        return entity.followersGroupId;
    }
    catch (e) {
        throw new Error(`Error fetching entity followers group ID: ${e}`);
    }
}
/**
 * Whether the user is currently following the entity
 * @param entityOrId hub entity or entity id, type is IWithFollowers
 * as we only want to accept hub entities backed by item entities which
 * extend IWithFollowers
 * @param user
 * @param entityType
 * @param context
 * @returns {boolean}
 */
async function isUserFollowing(entityOrId, user, entityType, context) {
    // get the entity's followers group id
    let groupId;
    if (typeof entityOrId === "string") {
        groupId = await getEntityFollowersGroupId(entityOrId, entityType, context);
    }
    else {
        groupId = entityOrId.followersGroupId;
    }
    // looks through the users group list and find the same group
    const group = user.groups.find((g) => g.id === groupId);
    return !!group;
}
/**
 * Follow an entity
 * @param entityId entity id
 * @param user user who attempts to follow the entity
 * @param entityType optional if entityOrId is a string
 * @param context optional if entityOrId is a string
 * @returns promise that resolves { success: true, username: user.username }
 * or rejects with an error
 */
async function followEntity(entityId, user, entityType, context) {
    const isFollowing = await isUserFollowing(entityId, user, entityType, context);
    // don't update if user is already following
    if (isFollowing) {
        return Promise.reject("User is already following this entity.");
    }
    const groupId = await getEntityFollowersGroupId(entityId, entityType, context);
    try {
        await joinGroup({
            id: groupId,
            authentication: context.hubRequestOptions.authentication,
        });
        // successfully joined the group
        return { success: true, username: user.username };
    }
    catch (error) {
        throw new Error(`Error joining group: ${error}`);
    }
}
/**
 * Unfollow an entity
 * @param entityId entity id
 * @param user user who attempts to unfollow the entity
 * @param entityType optional if entityOrId is a string
 * @param context optional if entityOrId is a string
 * @returns promise that resolves { success: true, username: user.username } or
 * rejects with an error
 */
async function unfollowEntity(entityId, user, entityType, context) {
    const isFollowing = await isUserFollowing(entityId, user, entityType, context);
    // don't update if user is not following
    if (!isFollowing) {
        return Promise.reject("User is not following this entity.");
    }
    const groupId = await getEntityFollowersGroupId(entityId, entityType, context);
    try {
        await leaveGroup({
            id: groupId,
            authentication: context.hubRequestOptions.authentication,
        });
        // successfully left the group
        return { success: true, username: user.username };
    }
    catch (error) {
        throw new Error(`Error leaving group: ${error}`);
    }
}

export { followEntity as f, getEntityFollowersGroupId as g, isUserFollowing as i, unfollowEntity as u };
