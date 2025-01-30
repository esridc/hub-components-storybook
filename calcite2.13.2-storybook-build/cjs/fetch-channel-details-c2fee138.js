'use strict';

const teams = require('./teams-d12190bc.js');
const cache = require('./cache-4d33af79.js');
const channels = require('./channels-b4910298.js');
const utils = require('./utils-7f390376.js');
const channels$1 = require('./channels-bf478342.js');
const request = require('./request-79b61e92.js');

const fetchChannelFromCache = cache.cache((channelId, hubRequestOptions) => channels.fetchChannel(Object.assign({ channelId, data: { relations: [utils.ChannelRelation.CHANNEL_ACL] } }, hubRequestOptions)), {
  scope: 'channels',
  getKey(channelId) { return channelId; },
  ttl: 3 * 1000,
});
async function fetchChannelDetails(options, hubRequestOptions) {
  const { post, parent, channelGroupIds, channelAccess } = options;
  let { channelId, channel, channelGroups } = options;
  let channelError = null;
  const _fetchChannel = async (cId) => {
    let channel;
    let channelId;
    let channelError;
    try {
      channel = await fetchChannelFromCache(cId, hubRequestOptions);
      channelError = null;
      channelId = channel.id;
    }
    catch (e) {
      channel = null;
      channelError = e;
      channelId = cId;
    }
    return {
      channel,
      channelError,
      channelId,
    };
  };
  if (channel) {
    channelError = null;
    channelId = channel.id;
  }
  else if (post || parent) {
    const postOrParent = post || parent;
    if (postOrParent.channelId && postOrParent.channelId !== (channel === null || channel === void 0 ? void 0 : channel.id)) {
      ({ channelId, channelError, channel } = await _fetchChannel(postOrParent.channelId));
    }
    else {
      channelId = channel.id;
      channelError = null;
    }
  }
  else if (channelId) {
    ({ channel, channelId, channelError } = await _fetchChannel(channelId));
  }
  else if (channelGroupIds && channelAccess) {
    ({
      items: [channel],
    } = await channels$1.searchChannels(Object.assign({ data: {
        groups: channelGroupIds,
        access: [channelAccess],
        num: 1,
        relations: [utils.ChannelRelation.CHANNEL_ACL]
      } }, hubRequestOptions)));
    if (channel) {
      channelId = channel.id;
      channelError = null;
    }
    else {
      channel = null;
      channelId = null;
      channelError = new request.RemoteServerError('channel not found', '', 404);
    }
  }
  else {
    channel = null;
    channelId = null;
    channelError = null;
  }
  if (channel) {
    channelGroups = channelGroups !== null && channelGroups !== void 0 ? channelGroups : [];
    const shouldFetchGroups = channel.groups.length !== channelGroups.length || !channelGroups.every(group => channel.groups.includes(group === null || group === void 0 ? void 0 : group.id));
    if (shouldFetchGroups) {
      channelGroups = await Promise.all(channel.groups.map(async (groupId) => {
        let group;
        try {
          group = await teams.fetchTeamFromCache(groupId, hubRequestOptions);
        }
        catch (e) {
          group = null;
        }
        return group;
      }));
    }
  }
  else {
    channelGroups = null;
  }
  return {
    channelId,
    channel,
    channelError,
    channelGroups,
  };
}

exports.fetchChannelDetails = fetchChannelDetails;
