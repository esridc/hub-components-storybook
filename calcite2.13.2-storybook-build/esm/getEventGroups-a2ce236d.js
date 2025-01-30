import { g as getEvent } from './events-c59246f8.js';
import { s as searchGroups } from './search-211dee83.js';

/**
 * Fetches the groups an event is shared with
 * @param eventId The ID of the event to fetch the groups for
 * @param context An IArcGISContext object
 * @returns
 */
async function getEventGroups(eventId, context) {
    const { editGroups: editGroupIds, readGroups: readGroupIds } = await getEvent(Object.assign({ eventId }, context.hubRequestOptions));
    const search = (ids) => ids.length
        ? searchGroups(Object.assign({ q: `id:(${ids.join(" OR ")})`, num: ids.length }, context.requestOptions))
        : Promise.resolve({ results: [] });
    const [{ results: readGroups }, { results: editGroups }] = await Promise.all([readGroupIds, editGroupIds].map(search));
    return [...readGroups, ...editGroups];
}

export { getEventGroups as g };
