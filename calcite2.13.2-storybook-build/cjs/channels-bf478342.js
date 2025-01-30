'use strict';

const discussionsApiRequest = require('./discussions-api-request-e9e6e346.js');

/**
 * Search for Channels in the Discussions API.  Channels define the capabilities,
 * permissions, and configuration for Discussion posts.
 *
 * @export
 * @param {ISearchChannelsParams} options
 * @return {*}  {Promise<IPagedResponse<IChannel>>}
 */
function searchChannels(options) {
    options.httpMethod = "GET";
    return discussionsApiRequest.discussionsApiRequest(`/channels`, options);
}

exports.searchChannels = searchChannels;
