import { g as getEventGroups } from './getEventGroups-a2ce236d.js';
import { s as sharedWith } from './sharedWith-3ad296b7.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';

/**
 * Fetches an array of groups the entity is shared with
 * @param entity An IHubItemEntity
 * @param context An IArcGISContext
 * @returns a promise that resolves an array of groups the entity is shared with
 */
async function getEntityGroups(entity, context) {
    const type = getTypeFromEntity(entity);
    let groups;
    switch (type) {
        case "event":
            groups = await getEventGroups(entity.id, context);
            break;
        default:
            groups = await sharedWith(entity.id, context.requestOptions);
            break;
    }
    return groups;
}

export { getEntityGroups as g };
