import { d as discussionsApiRequest } from './discussions-api-request-199cae2d.js';

/**
 * create channel
 *
 * @export
 * @param {ICreateChannelParams} options
 * @return {*}  {Promise<IChannel>}
 */
function createChannel(options) {
    options.httpMethod = "POST";
    return discussionsApiRequest(`/channels`, options);
}
/**
 * fetch channel
 *
 * @export
 * @param {IFetchChannelParams} options
 * @return {*}  {Promise<IChannel>}
 */
function fetchChannel(options) {
    options.httpMethod = "GET";
    return discussionsApiRequest(`/channels/${options.channelId}`, options);
}
/**
 * update channel
 * NOTE: only updates channel settings properties and access (softDelete, allowedReactions, etc). A Channel's
 * groups cannot be updated.
 *
 * @export
 * @param {IUpdateChannelParams} options
 * @return {*}  {Promise<IChannel>}
 */
function updateChannel(options) {
    options.httpMethod = "PATCH";
    return discussionsApiRequest(`/channels/${options.channelId}`, options);
}
/**
 * get channel opt out status
 *
 * @export
 * @param {IFetchChannelNotificationOptOutParams} options
 * @return {*}
 */
function fetchChannelNotifcationOptOut(options) {
    options.httpMethod = "GET";
    return discussionsApiRequest(`/channels/${options.channelId}/notifications/opt-out`, options);
}
/**
 * opt out of channel notifs
 *
 * @export
 * @param {ICreateChannelNotificationOptOutParams} options
 * @return {*}
 */
function createChannelNotificationOptOut(options) {
    options.httpMethod = "POST";
    return discussionsApiRequest(`/channels/${options.channelId}/notifications/opt-out`, options);
}
/**
 * opt in to channel notifs
 *
 * @export
 * @param {IRemoveChannelNotificationOptOutParams} options
 * @return {*}
 */
function removeChannelNotificationOptOut(options) {
    options.httpMethod = "DELETE";
    return discussionsApiRequest(`/channels/${options.channelId}/notifications/opt-out`, options);
}
/**
 * remove all posts in a channel
 *
 * @export
 * @param {IRemoveChannelActivityParams} options
 * @return {*}
 */
function removeChannelActivity(options) {
    options.httpMethod = "DELETE";
    return discussionsApiRequest(`/channels/${options.channelId}/activity`, options);
}

export { fetchChannelNotifcationOptOut as a, removeChannelNotificationOptOut as b, createChannelNotificationOptOut as c, createChannel as d, fetchChannel as f, removeChannelActivity as r, updateChannel as u };
