'use strict';

const getEventGroups = require('./getEventGroups-6c371c3e.js');
const sharedWith = require('./sharedWith-ca14e4af.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');

/**
 * Fetches an array of groups the entity is shared with
 * @param entity An IHubItemEntity
 * @param context An IArcGISContext
 * @returns a promise that resolves an array of groups the entity is shared with
 */
async function getEntityGroups(entity, context) {
    const type = getTypeFromEntity.getTypeFromEntity(entity);
    let groups;
    switch (type) {
        case "event":
            groups = await getEventGroups.getEventGroups(entity.id, context);
            break;
        default:
            groups = await sharedWith.sharedWith(entity.id, context.requestOptions);
            break;
    }
    return groups;
}

exports.getEntityGroups = getEntityGroups;
