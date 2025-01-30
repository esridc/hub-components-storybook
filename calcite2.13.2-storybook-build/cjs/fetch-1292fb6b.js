'use strict';

const getPropertyMap = require('./getPropertyMap-030ec7b2.js');
const events = require('./events-7873340d.js');

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
    return events.getEvent(Object.assign({ eventId: id, data: {
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
    const mapper = new getPropertyMap.EventPropertyMapper(getPropertyMap.getPropertyMap());
    return mapper.storeToEntity(clientEvent, {});
}

exports.convertClientEventToHubEvent = convertClientEventToHubEvent;
exports.fetchEvent = fetchEvent;
