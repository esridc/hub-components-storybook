'use strict';

const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const events = require('./events-7873340d.js');
const access = require('./access-049994c9.js');
const update = require('./update-7b2b2d9d.js');

/**
 * Sets an entity's access to the given access
 * @param entity A HubEntity object
 * @param access The access to set the entity to
 * @param context An IArcGISContext object
 * @returns a promise
 */
async function setEntityAccess(entity, access$1, context) {
    const type = getTypeFromEntity.getTypeFromEntity(entity);
    switch (type) {
        case "event":
            await events.updateEvent(Object.assign({ eventId: entity.id, data: {
                    access: access$1.toUpperCase(),
                } }, context.hubRequestOptions));
            break;
        case "group":
            await update.updateGroup({
                group: {
                    id: entity.id,
                    access: access$1,
                },
                authentication: context.session,
            });
            break;
        default:
            await access.setItemAccess({
                id: entity.id,
                access: access$1,
                owner: entity.owner,
                authentication: context.session,
            });
            break;
    }
}

function getS123EditUrl(id, context) {
    return `${context.survey123Url}/surveys/${id}?portalUrl=${encodeURIComponent(context.portalUrl)}`;
}

exports.getS123EditUrl = getS123EditUrl;
exports.setEntityAccess = setEntityAccess;
