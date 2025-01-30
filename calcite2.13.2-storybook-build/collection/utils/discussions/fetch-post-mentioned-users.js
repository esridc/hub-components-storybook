import { parseMentionedUsers } from '@esri/hub-discussions';
import { fetchMemberFromCache } from '../users';
import { fetchPortalFromCache } from '../portal';
export async function fetchPostMentionedUsers(options, hubRequestOptions) {
  const { post } = options;
  let { postMentionedUsers } = options;
  if (post) {
    const userIds = parseMentionedUsers(post.body);
    postMentionedUsers = (postMentionedUsers !== null && postMentionedUsers !== void 0 ? postMentionedUsers : []).filter(postMentionedUser => userIds.includes(postMentionedUser.userId));
    const newUserIds = userIds.filter(userId => !postMentionedUsers.find(postMentionedUser => userId === postMentionedUser.userId));
    const newMentionedUsers = await Promise.all(newUserIds.map(async (userId) => {
      let user;
      let userError;
      let org;
      let orgError;
      try {
        user = await fetchMemberFromCache(userId, hubRequestOptions);
        userError = null;
      }
      catch (e) {
        userError = e;
        user = null;
      }
      try {
        org = (user === null || user === void 0 ? void 0 : user.orgId) ? await fetchPortalFromCache(user.orgId, hubRequestOptions) : null;
        orgError = null;
      }
      catch (e) {
        orgError = e;
        org = null;
      }
      return {
        userId,
        user,
        userError,
        org,
        orgError,
      };
    }));
    postMentionedUsers = [...postMentionedUsers, ...newMentionedUsers];
  }
  else {
    postMentionedUsers = null;
  }
  return { postMentionedUsers };
}
