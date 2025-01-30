var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { PostRelation, PostSort, SortOrder, searchPosts, searchChannels, ChannelFilter, ChannelSort, isDiscussable } from '@esri/hub-discussions';
import { fetchTeamFromCache } from '../teams';
export async function searchChannelsWithRecentUserActivity(userId, hubRequestOptions) {
  const _a = await searchChannels(Object.assign({ data: {
      num: 4,
      filterBy: ChannelFilter.HAS_USER_POSTS,
      sortBy: ChannelSort.LAST_ACTIVITY,
      sortOrder: SortOrder.DESC,
    } }, hubRequestOptions)), { items: channels } = _a, results = __rest(_a, ["items"]);
  const items = await Promise.all(channels.map(async (channel) => {
    const channelGroupsPromises = Promise.all(channel.groups.map(async (groupId) => {
      let group;
      try {
        group = await fetchTeamFromCache(groupId, hubRequestOptions);
      }
      catch (e) {
        group = null;
      }
      return group;
    }));
    const searchPostsPromise = searchPosts(Object.assign({ data: {
        start: 1,
        num: 1,
        sortBy: PostSort.CREATED_AT,
        sortOrder: SortOrder.DESC,
        channels: [channel.id],
        creator: userId,
        relations: [PostRelation.REACTIONS],
      } }, hubRequestOptions));
    const [channelGroups, { items: [post], },] = await Promise.all([channelGroupsPromises, searchPostsPromise]);
    return {
      channel,
      channelError: null,
      channelGroups,
      channelId: channel.id,
      post,
    };
  }));
  const hasDiscussableGroups = channelDetails => {
    var _a;
    return ((_a = channelDetails.channelGroups) === null || _a === void 0 ? void 0 : _a.length)
      ? channelDetails.channelGroups.every(group => !group || isDiscussable(group))
      : true;
  };
  return Object.assign(Object.assign({}, results), { items: items.filter(hasDiscussableGroups) });
}
