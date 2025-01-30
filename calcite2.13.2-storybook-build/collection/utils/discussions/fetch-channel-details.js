import { fetchChannel, searchChannels } from '@esri/hub-discussions';
import { ChannelRelation, RemoteServerError } from '@esri/hub-common';
import { fetchTeamFromCache } from '../teams';
import { cache } from '../cache';
const fetchChannelFromCache = cache((channelId, hubRequestOptions) => fetchChannel(Object.assign({ channelId, data: { relations: [ChannelRelation.CHANNEL_ACL] } }, hubRequestOptions)), {
  scope: 'channels',
  getKey(channelId) { return channelId; },
  ttl: 3 * 1000,
});
export async function fetchChannelDetails(options, hubRequestOptions) {
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
    } = await searchChannels(Object.assign({ data: {
        groups: channelGroupIds,
        access: [channelAccess],
        num: 1,
        relations: [ChannelRelation.CHANNEL_ACL]
      } }, hubRequestOptions)));
    if (channel) {
      channelId = channel.id;
      channelError = null;
    }
    else {
      channel = null;
      channelId = null;
      channelError = new RemoteServerError('channel not found', '', 404);
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
          group = await fetchTeamFromCache(groupId, hubRequestOptions);
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
