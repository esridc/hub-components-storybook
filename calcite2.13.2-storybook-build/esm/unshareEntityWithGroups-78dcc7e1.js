import { s as shareEventWithGroups, u as unshareEventWithGroups } from './unshareEventWithGroups-2bac7a58.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { s as shareItemToGroups } from './share-item-to-groups-547b9cd0.js';
import { u as unshareItemFromGroups } from './unshare-item-from-groups-b09dcce3.js';

/**
 * Shares an entity to one or more groups
 * @param entity An IHubItemEntity object
 * @param groupIds An array of group IDs to share the entity to
 * @param context An IArcGISContext object
 * @returns a promise that resolves the updated entity
 */
async function shareEntityWithGroups(entity, groupIds, context) {
    const type = getTypeFromEntity(entity);
    let results;
    switch (type) {
        case "event":
            results = await shareEventWithGroups(groupIds, entity, context);
            break;
        default:
            results = entity;
            await shareItemToGroups(entity.id, groupIds, context.requestOptions, entity.owner);
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
    const type = getTypeFromEntity(entity);
    let results;
    switch (type) {
        case "event":
            results = await unshareEventWithGroups(groupIds, entity, context);
            break;
        default:
            results = entity;
            await unshareItemFromGroups(entity.id, groupIds, context.requestOptions, entity.owner);
            break;
    }
    return results;
}

export { shareEntityWithGroups as s, unshareEntityWithGroups as u };
