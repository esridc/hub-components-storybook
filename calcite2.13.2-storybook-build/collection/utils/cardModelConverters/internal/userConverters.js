import { maybeAdd, } from '@esri/hub-common';
import { getCardModelTitleUrl } from './utils';
/**
 * Convert a User IHubSearchResult into an IHubCardViewModel
 *
 * @param searchResult hub search result
 * @param opts view model options
 */
export const userResultToCardModel = (searchResult, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    additionalInfo: [],
    badges: getUserBadges(searchResult),
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    source: searchResult.name ? `@${searchResult.id}` : undefined,
    title: searchResult.name || `@${searchResult.id}`,
    type: searchResult.type,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  return viewModel;
};
/**
 * Retrieves the badges for a user based on their member type.
 *
 * @param user - The user object.
 * @returns An array of badge configurations.
 */
const getUserBadges = (user) => {
  const badges = [];
  const memberType = user.memberType;
  /**
   * for group members, we want to configure
   * member type badges to render in the user
   * card
   */
  if (memberType) {
    if (user.isGroupOwner) {
      badges.push({
        icon: 'user-key',
        color: 'gray',
        i18nKey: 'badges.members.owner',
        hideLabel: true,
        tooltip: { i18nKey: 'badges.members.owner' },
      });
    }
    else if (memberType === 'admin') {
      badges.push({
        icon: 'user-up',
        color: 'gray',
        i18nKey: 'badges.members.admin',
        hideLabel: true,
        tooltip: { i18nKey: 'badges.members.admin' },
      });
    }
    else {
      badges.push({
        icon: 'user',
        color: 'gray',
        i18nKey: 'badges.members.member',
        hideLabel: true,
        tooltip: { i18nKey: 'badges.members.member' },
      });
    }
  }
  return badges;
};
