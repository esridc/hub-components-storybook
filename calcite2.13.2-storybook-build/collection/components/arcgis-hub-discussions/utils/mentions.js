import { parseMentionedUsers } from "@esri/hub-discussions";
import { getGlobalContext } from '../../../utils/state';
const MENTION_ATTRIBUTE = "data-mention";
const MENTION_ELEMENTS_PATTERN = new RegExp(`<[a-z-]+( [a-z-]+(=('|")[\\w- ]+('|"))?)*( ${MENTION_ATTRIBUTE}=('|")[\\w@\\.-]+('|"))( [a-z-]+(=('|")[\\w- ]+('|"))?)*>@[\\w@\\.-]+<\/[a-z-]+>`, 'g');
const getMentionedUser = (match, mentionedUsers) => {
  const username = parseMentionedUsers(match)[0];
  return mentionedUsers
    ? mentionedUsers.find(mentionedUser => mentionedUser.userId === username)
    : null;
};
export function mentionPopoverTransform(text, post, postCreator, postMentionedUsers, channel) {
  const context = getGlobalContext();
  const transform = (input = '') => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const matches = input.match(MENTION_ELEMENTS_PATTERN);
    if (!matches) {
      return input;
    }
    else {
      const [match] = matches;
      const startIdx = input.indexOf(match);
      const endIdx = startIdx + match.length;
      const before = startIdx > 0 ? input.substring(0, startIdx) : '';
      const toReplace = input.substring(startIdx, startIdx + match.length);
      const mentionedUser = getMentionedUser(toReplace, postMentionedUsers);
      const replaced = toReplace.replace(match, `<arcgis-hub-discussions-mention-popover
          access="${(_b = (_a = mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.user) === null || _a === void 0 ? void 0 : _a.access) !== null && _b !== void 0 ? _b : ''}"
          channel-access="${channel.access}"
          channel-id="${channel.id}"
          creator-username="${(postCreator === null || postCreator === void 0 ? void 0 : postCreator.username) || post.creator}"
          full-name="${(_d = (_c = mentionedUser.user) === null || _c === void 0 ? void 0 : _c.fullName) !== null && _d !== void 0 ? _d : ''}"
          organization="${(_f = (_e = mentionedUser.org) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ''}"
          region="${((_g = mentionedUser.user) === null || _g === void 0 ? void 0 : _g.region) || ''}"
          thumbnail="${((_h = mentionedUser.user) === null || _h === void 0 ? void 0 : _h.thumbnail) || ''}"
          token="${(_j = context.hubRequestOptions.authentication) === null || _j === void 0 ? void 0 : _j.token}"
          user-id="${(_l = (_k = mentionedUser.user) === null || _k === void 0 ? void 0 : _k.id) !== null && _l !== void 0 ? _l : ''}"
          username="${mentionedUser.userId}"
        >${match}</arcgis-hub-discussions-mention-popover>`);
      return before + replaced + transform(input.substring(endIdx));
    }
  };
  return transform(text);
}
