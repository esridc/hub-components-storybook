import { u as unshareItemWithGroup } from './unshare-item-with-group-b4a3a08f.js';

/**
 * Unshare an item from a set of groups
 * @param {String} itemId Item Id to unshare from groups
 * @param {Array} groups Array of group id's from which the item will be unshared
 * @param {IRequestOptions} requestOptions
 * @param {String} owner optional Owner username to determine which endpoint to hit
 */
function unshareItemFromGroups(itemId, groups, requestOptions, owner) {
    return Promise.all(groups.map(async (groupId) => {
        const opt = Object.assign({}, { id: itemId, groupId }, requestOptions);
        if (owner) {
            opt.owner = owner;
        }
        // Because we are using Promise.all, we need to
        // mark the callback fn as async and wrap each
        // individual call in another try/catch block to
        // make sure it catches before all promises finish
        try {
            const results = await unshareItemWithGroup(opt);
            return results;
        }
        catch (err) {
            throw new Error(`Error unsharing item: ${itemId} with group: ${groupId}`);
        }
    }));
}

export { unshareItemFromGroups as u };
