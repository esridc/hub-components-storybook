'use strict';

const events = require('./events-7873340d.js');
const search = require('./search-b00c4c79.js');

/**
 * Fetches the groups an event is shared with
 * @param eventId The ID of the event to fetch the groups for
 * @param context An IArcGISContext object
 * @returns
 */
async function getEventGroups(eventId, context) {
    const { editGroups: editGroupIds, readGroups: readGroupIds } = await events.getEvent(Object.assign({ eventId }, context.hubRequestOptions));
    const search$1 = (ids) => ids.length
        ? search.searchGroups(Object.assign({ q: `id:(${ids.join(" OR ")})`, num: ids.length }, context.requestOptions))
        : Promise.resolve({ results: [] });
    const [{ results: readGroups }, { results: editGroups }] = await Promise.all([readGroupIds, editGroupIds].map(search$1));
    return [...readGroups, ...editGroups];
}

exports.getEventGroups = getEventGroups;
