import { h } from './index-57f71b44.js';
import { h as getUserThumbnailUrl } from './HubInitiatives-4f4e24ce.js';

const HubUserAvatar = ({ context, key, label, scale, user }) => {
  // if we got a user, use that, if not get it from context
  const { currentUser, session } = context;
  user = user || currentUser;
  return h("calcite-avatar", { fullName: user === null || user === void 0 ? void 0 : user.fullName, key: key, label: label, scale: scale, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(session === null || session === void 0 ? void 0 : session.portal, user, session === null || session === void 0 ? void 0 : session.token), userId: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username });
};

export { HubUserAvatar as H };
