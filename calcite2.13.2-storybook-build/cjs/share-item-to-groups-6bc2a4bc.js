'use strict';

const poll = require('./poll-7962a495.js');
const shareItemWithGroup = require('./share-item-with-group-6c27286f.js');
const search = require('./search-b00c4c79.js');

/**
 * Share an item to a set of groups
 * @param {String} itemId Item Id to share to the groups
 * @param {Array} groupIds Array of group id's to which the item will be shared
 * @param {IRequestOptions} requestOptions
 * @param {String} owner optional Owner username to determine which endpoint to hit
 */
async function shareItemToGroups(itemId, groupIds, requestOptions, owner) {
    const fn = search.searchGroups.bind(undefined, Object.assign({ q: `id:(${groupIds.join(" OR ")})`, num: groupIds.length }, requestOptions));
    const validate = (resp) => resp.results.length === groupIds.length;
    let groups;
    try {
        // We poll for the expected group results as newly created groups aren't immediately available in the
        // AGO group search index. Polling here eliminates the need for us to potentially implement this polling
        // in multiple places in our app where we create new groups from. In the majority of cases, this will only fire
        // a single request.
        ({ results: groups } = groupIds.length
            ? await poll.poll(fn, validate)
            : { results: [] });
    }
    catch (e) {
        throw new Error(`Error sharing item: ${itemId} with groups: ${groupIds.join(", ")}`);
    }
    return Promise.all(groups.map(async (group) => {
        const opt = Object.assign(Object.assign({}, requestOptions), { id: itemId, groupId: group.id, owner, confirmItemControl: group.capabilities.includes("updateitemcontrol") });
        try {
            const res = await shareItemWithGroup.shareItemWithGroup(opt);
            return res;
        }
        catch (e) {
            throw new Error(`Error sharing item: ${itemId} with group: ${group.id}`);
        }
    }));
}

exports.shareItemToGroups = shareItemToGroups;
