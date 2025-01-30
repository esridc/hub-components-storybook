'use strict';

const unshareEventWithGroups = require('./unshareEventWithGroups-609ca09c.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const shareItemToGroups = require('./share-item-to-groups-6bc2a4bc.js');
const unshareItemFromGroups = require('./unshare-item-from-groups-3f34f54a.js');

/**
 * Shares an entity to one or more groups
 * @param entity An IHubItemEntity object
 * @param groupIds An array of group IDs to share the entity to
 * @param context An IArcGISContext object
 * @returns a promise that resolves the updated entity
 */
async function shareEntityWithGroups(entity, groupIds, context) {
    const type = getTypeFromEntity.getTypeFromEntity(entity);
    let results;
    switch (type) {
        case "event":
            results = await unshareEventWithGroups.shareEventWithGroups(groupIds, entity, context);
            break;
        default:
            results = entity;
            await shareItemToGroups.shareItemToGroups(entity.id, groupIds, context.requestOptions, entity.owner);
            break;
    }
    return results;
}

/**
 * Unshares an entity from one or more groups
 * @param entity An IHubItemEntity object
 * @param groupIds An array of group IDs to unshare the entity from
 * @param context An IArcGISContext object
 * @returns a promise that resolves the updated entity
 */
async function unshareEntityWithGroups(entity, groupIds, context) {
    const type = getTypeFromEntity.getTypeFromEntity(entity);
    let results;
    switch (type) {
        case "event":
            results = await unshareEventWithGroups.unshareEventWithGroups(groupIds, entity, context);
            break;
        default:
            results = entity;
            await unshareItemFromGroups.unshareItemFromGroups(entity.id, groupIds, context.requestOptions, entity.owner);
            break;
    }
    return results;
}

exports.shareEntityWithGroups = shareEntityWithGroups;
exports.unshareEntityWithGroups = unshareEntityWithGroups;
