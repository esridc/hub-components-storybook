'use strict';

const get = require('./get-0368c931.js');

/**
 * @private
 * Return the list of groups the current user can see, that the item is shared to
 * @param itemId
 * @param requestOptions
 * @returns
 */
async function sharedWith(itemId, requestOptions) {
    const response = await get.getItemGroups(itemId, requestOptions);
    // simplify the response to a single array
    return [...response.admin, ...response.member, ...response.other];
}

exports.sharedWith = sharedWith;
