import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { u as updateEvent } from './events-c59246f8.js';
import { s as setItemAccess } from './access-7968589d.js';
import { u as updateGroup } from './update-26e2fbc1.js';

/**
 * Sets an entity's access to the given access
 * @param entity A HubEntity object
 * @param access The access to set the entity to
 * @param context An IArcGISContext object
 * @returns a promise
 */
async function setEntityAccess(entity, access, context) {
    const type = getTypeFromEntity(entity);
    switch (type) {
        case "event":
            await updateEvent(Object.assign({ eventId: entity.id, data: {
                    access: access.toUpperCase(),
                } }, context.hubRequestOptions));
            break;
        case "group":
            await updateGroup({
                group: {
                    id: entity.id,
                    access,
                },
                authentication: context.session,
            });
            break;
        default:
            await setItemAccess({
                id: entity.id,
                access,
                owner: entity.owner,
                authentication: context.session,
            });
            break;
    }
}

function getS123EditUrl(id, context) {
    return `${context.survey123Url}/surveys/${id}?portalUrl=${encodeURIComponent(context.portalUrl)}`;
}

export { getS123EditUrl as g, setEntityAccess as s };
