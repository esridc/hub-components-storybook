'use strict';

const util = require('./util-38e73510.js');
const events = require('./events-7873340d.js');
const poll = require('./poll-7962a495.js');
const search = require('./search-b00c4c79.js');

/**
 * Shares an event with one or more groups
 * @param groupIds An array of group IDs to share the event with
 * @param entity An IHubEvent object
 * @param context An IArcGISContext object
 * @returns a promise that resolves IHubItemEntity
 */
async function shareEventWithGroups(groupIds, entity, context) {
    const fn = search.searchGroups.bind(undefined, Object.assign({ q: `id:(${groupIds.join(" OR ")})`, num: groupIds.length }, context.requestOptions));
    const validate = (resp) => resp.results.length === groupIds.length;
    if (groupIds.length) {
        try {
            // We poll for the expected group results as newly created groups aren't immediately available in the
            // AGO group search index. Polling here eliminates the need for us to potentially implement this polling
            // in multiple places in our app where we create new groups from. In the majority of cases, this will only fire
            // a single request.
            const { results: groups } = await poll.poll(fn, validate);
            const { readGroupIds, editGroupIds } = groups.reduce((acc, group) => {
                const key = group.capabilities.includes("updateitemcontrol")
                    ? "editGroupIds"
                    : "readGroupIds";
                return Object.assign(Object.assign({}, acc), { [key]: [...acc[key], group.id] });
            }, { readGroupIds: [], editGroupIds: [] });
            const { readGroups: updatedReadGroupIds, editGroups: updatedEditGroupIds, } = await events.updateEvent(Object.assign({ eventId: entity.id, data: {
                    readGroups: [...entity.readGroupIds, ...readGroupIds].filter(util.unique),
                    editGroups: [...entity.editGroupIds, ...editGroupIds].filter(util.unique),
                } }, context.hubRequestOptions));
            return Object.assign(Object.assign({}, entity), { readGroupIds: updatedReadGroupIds, editGroupIds: updatedEditGroupIds });
        }
        catch (e) {
            throw new Error(`Entity: ${entity.id} could not be shared with groups: ${groupIds.join(", ")}`);
        }
    }
    else {
        return entity;
    }
}

/**
 * Unshares an event with one or more groups
 * @param groupIds An array of group IDs to unshare the group from
 * @param entity An IHubEvent object
 * @param context An IArcGISContext object
 * @returns An updated IHubEvent object
 */
async function unshareEventWithGroups(groupIds, entity, context) {
    if (groupIds.length) {
        try {
            const { readGroups: updatedReadGroupIds, editGroups: updatedEditGroupIds, } = await events.updateEvent(Object.assign({ eventId: entity.id, data: {
                    readGroups: entity.readGroupIds.filter((groupId) => !groupIds.includes(groupId)),
                    editGroups: entity.editGroupIds.filter((groupId) => !groupIds.includes(groupId)),
                } }, context.hubRequestOptions));
            return Object.assign(Object.assign({}, entity), { readGroupIds: updatedReadGroupIds, editGroupIds: updatedEditGroupIds });
        }
        catch (e) {
            throw new Error(`Entity: ${entity.id} could not be unshared with groups: ${groupIds.join(", ")}`);
        }
    }
    else {
        return entity;
    }
}

exports.shareEventWithGroups = shareEventWithGroups;
exports.unshareEventWithGroups = unshareEventWithGroups;
