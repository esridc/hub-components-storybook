import { h } from '@stencil/core';
import { getUserThumbnailUrl } from '@esri/hub-common';
export const HubNavigationUser = ({ context, label, scale, user, slot }) => {
  // if we got a user, use that, if not get it from context
  if (!context) {
    return;
  }
  const { currentUser, session } = context;
  user = user || currentUser;
  return h("calcite-navigation-user", { fullName: user === null || user === void 0 ? void 0 : user.fullName, label: label, scale: scale, slot: slot, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(session === null || session === void 0 ? void 0 : session.portal, user, session === null || session === void 0 ? void 0 : session.token), userId: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username });
};
