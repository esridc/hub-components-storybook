import { d as discussionsApiRequest } from './discussions-api-request-199cae2d.js';

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
    return discussionsApiRequest(`/channels`, options);
}

export { searchChannels as s };
