import { maybeAdd, getProp, } from '@esri/hub-common';
import { getCardModelTitleUrl, getSource } from './utils';
/**
 * Convert a Group IHubGroup into an IHubCardViewModel
 * @param group
 * @param _context
 * @param opts
 * @returns
 */
export const groupToCardModel = (group, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: group.access,
    actionLinks,
    additionalInfo: getGroupAdditionalInfo(group, _layout),
    badges: getGroupBadges(group, _layout),
    family: 'group',
    id: group.id,
    summary: group.summary,
    title: group.name,
    type: group.type,
    source: group.owner,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(group, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', (_a = group.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  return viewModel;
};
/**
 * Convert a Group IHubSearchResult into an IHubCardViewModel
 * @param searchResult
 * @param _context
 * @param opts
 * @returns
 */
export const groupResultToCardModel = (searchResult, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    additionalInfo: getGroupAdditionalInfo(searchResult, _layout),
    badges: getGroupBadges(searchResult, _layout),
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    title: searchResult.name,
    type: searchResult.type,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  viewModel = maybeAdd('source', getSource(searchResult), viewModel);
  return viewModel;
};
/**
 * Return an array of badges for a group / group search result
 * @param group
 * @param _layout
 * @returns
 */
const getGroupBadges = (group, _layout) => {
  const badges = [];
  if (group.isSharedUpdate) {
    badges.push({
      i18nKey: 'sharedEdit',
      color: 'grey',
      icon: 'pencil-square',
    });
  }
  if (getProp(group, 'isOpenData')) {
    badges.push({
      i18nKey: 'opendata',
      color: 'grey',
      icon: 'star-circle',
    });
  }
  return badges;
};
/**
 * Return an array of additional info for a group / group search result
 * @param group
 * @param _layout
 * @returns
 */
const getGroupAdditionalInfo = (group, _layout) => {
  const additionalInfo = [];
  if (group.hasOwnProperty('membershipSummary')) {
    additionalInfo.push({
      i18nKey: 'members',
      value: getProp(group, 'membershipSummary.total'),
    });
  }
  if (group.hasOwnProperty('contentCount')) {
    additionalInfo.push({
      i18nKey: 'content',
      value: getProp(group, 'contentCount'),
    });
  }
  return additionalInfo;
};
