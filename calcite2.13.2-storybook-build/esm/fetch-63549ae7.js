import { E as EventPropertyMapper, g as getPropertyMap } from './getPropertyMap-10ee9d61.js';
import { g as getEvent } from './events-c59246f8.js';

/**
 * @private
 * Get an Event by id or slug
 * @param identifier event id or slug
 * @param requestOptions request options
 * @returns a promise that resolves an IHubEvent
 */
function fetchEvent(eventId, requestOptions) {
    const spl = eventId.split("-");
    const id = spl[spl.length - 1];
    return getEvent(Object.assign({ eventId: id, data: {
            include: "associations",
        } }, requestOptions))
        .then((event) => convertClientEventToHubEvent(event))
        .catch(() => {
        throw new Error("Failed to fetch event.");
    });
}
/**
 * @private
 * Convert a client event record into a Hub Event
 * @param clientEvent the client event record
 * @param requestOptions request options
 * @returns a promise that resolves a IHubEvent
 */
async function convertClientEventToHubEvent(clientEvent, requestOptions) {
    const mapper = new EventPropertyMapper(getPropertyMap());
    return mapper.storeToEntity(clientEvent, {});
}

export { convertClientEventToHubEvent as c, fetchEvent as f };
