'use strict';

const getWithDefault = require('./get-with-default-d1b1754d.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const util = require('./util-38e73510.js');
const getFamily = require('./get-family-cafa88bb.js');
const getEntityThumbnailUrl = require('./getEntityThumbnailUrl-4312f5ce.js');
const discussions = require('./discussions-09889d00.js');

/**
 * Given a target and hub search result, this util
 * returns a gallery card's title url
 * @param entityOrResult HubEntity or IHubSearchResult
 * @param context IArcGISContext
 * @param target  "self" | "siteRelative" | "workspaceRelative" | "none" | "event"
 * @param baseUrl optional base url to prepend to relative links
 * @returns
 */
function getCardModelTitleUrl(result, _context, target, baseUrl) {
  var _a;
  let titleUrl;
  if (target === 'event') {
    titleUrl = '#';
  }
  else if (target === 'none') {
    titleUrl = undefined;
  }
  else {
    switch (result.type) {
      default:
        const links = result.links || {};
        titleUrl = links[target];
        if (target !== 'self' && baseUrl) {
          titleUrl = `${baseUrl}${titleUrl || ''}`;
        }
        break;
      case 'Hub Site Application':
        titleUrl = (_a = result.links) === null || _a === void 0 ? void 0 : _a.self;
        break;
    }
  }
  return titleUrl;
}
// COPIED FROM HUB.JS
// It's currently not exported from that library
// and this changeset is large enough to not warrant
// the addition of a new export over there.
const getShortenedCategories = (categories) => {
  return categories.reduce((acc, category) => {
    const segments = category.split('/');
    const shortenedCategory = segments[segments.length - 1];
    shortenedCategory && acc.push(shortenedCategory);
    return acc;
  }, []);
};
/**
 * Derives the source value for view model based on the raw search result
 *
 * @param input search result to derive `source` from
 * @returns source value
 */
function getSource(input) {
  if (!input) {
    return;
  }
  // return orgName if it exists, otherwise return source, if neither exist, return owner
  let source = input.orgName;
  source !== null && source !== void 0 ? source : (source = input.source);
  source !== null && source !== void 0 ? source : (source = input.owner);
  return source;
}
/**
 * Compute the additional info array for Items
 * @param entityOrSearchResult search result
 * @param locale
 * @returns
 */
function getStandardAdditionalInfo(entityOrSearchResult, locale) {
  var _a;
  const additionalInfo = [];
  if (!entityOrSearchResult) {
    return additionalInfo;
  }
  if (entityOrSearchResult.type) {
    additionalInfo.push({
      i18nKey: 'type',
      value: entityOrSearchResult.type,
    });
  }
  if (entityOrSearchResult.updatedDate) {
    additionalInfo.push({
      i18nKey: 'dateUpdated',
      value: entityOrSearchResult.updatedDate.toLocaleDateString(locale),
    });
  }
  if ((_a = entityOrSearchResult.tags) === null || _a === void 0 ? void 0 : _a.length) {
    additionalInfo.push({
      i18nKey: 'tags',
      value: entityOrSearchResult.tags.join(', '),
    });
  }
  const categories = getWithDefault.getWithDefault(entityOrSearchResult, 'categories', []);
  if (categories.length) {
    additionalInfo.push({
      i18nKey: 'categories',
      value: getShortenedCategories(categories).join(', '),
    });
  }
  if (entityOrSearchResult.hasOwnProperty('layerCount')) {
    additionalInfo.push({
      i18nKey: 'layers',
      value: getProp.getProp(entityOrSearchResult, 'layerCount'),
    });
  }
  if (entityOrSearchResult.hasOwnProperty('pageCount')) {
    additionalInfo.push({
      i18nKey: 'pages',
      value: getProp.getProp(entityOrSearchResult, 'pageCount'),
    });
  }
  if (entityOrSearchResult.createdDate) {
    additionalInfo.push({
      i18nKey: 'dateCreated',
      value: entityOrSearchResult.createdDate.toLocaleDateString(locale),
    });
  }
  return additionalInfo;
}

/**
 * Default Converter for any HubEntity into a IHubCardViewModel
 * Unless an entity has more specific conversion logic, this function
 * will be used to convert it to a card model.
 * @param entity
 * @param _context
 * @param opts
 * @returns
 */
const defaultEntityToCardModel = (entity, _layout, context, _intl, opts) => {
  const { actionLinks = [], baseUrl = '', locale = 'en-US', target = 'self' } = opts || {};
  let viewModel = {
    access: entity.access,
    actionLinks,
    additionalInfo: [],
    badges: [],
    family: getFamily.getFamily(entity.type),
    source: entity.owner,
    id: entity.id,
    summary: entity.summary,
    title: entity.name,
    type: entity.type,
  };
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(entity, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', getEntityThumbnailUrl.getEntityThumbnailUrl(entity), viewModel);
  viewModel.additionalInfo = [
    ...viewModel.additionalInfo,
    ...getStandardAdditionalInfo(entity, locale),
  ];
  return viewModel;
};
/**
 * Default function to convert an IHubSearchResult into
 * an IHubCardViewModel
 *
 * @param result hub search result
 * @param opts view model options
 */
const defaultResultToCardModel = (result, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', locale = 'en-US', target = 'self' } = opts || {};
  let viewModel = {
    access: result.access,
    actionLinks,
    additionalInfo: [],
    badges: [],
    family: result.family,
    id: result.id,
    index: result.index,
    summary: result.summary,
    title: result.name,
    type: result.type,
  };
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(result, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', (_a = result.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  viewModel = util.maybeAdd('source', getSource(result), viewModel);
  viewModel.additionalInfo = [
    ...viewModel.additionalInfo,
    ...getStandardAdditionalInfo(result, locale),
  ];
  return viewModel;
};

/**
 * Convert a Group IHubGroup into an IHubCardViewModel
 * @param group
 * @param _context
 * @param opts
 * @returns
 */
const groupToCardModel = (group, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: group.access,
    actionLinks,
    additionalInfo: getGroupAdditionalInfo(group),
    badges: getGroupBadges(group),
    family: 'group',
    id: group.id,
    summary: group.summary,
    title: group.name,
    type: group.type,
    source: group.owner,
  };
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(group, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', (_a = group.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  return viewModel;
};
/**
 * Convert a Group IHubSearchResult into an IHubCardViewModel
 * @param searchResult
 * @param _context
 * @param opts
 * @returns
 */
const groupResultToCardModel = (searchResult, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    additionalInfo: getGroupAdditionalInfo(searchResult),
    badges: getGroupBadges(searchResult),
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    title: searchResult.name,
    type: searchResult.type,
  };
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  viewModel = util.maybeAdd('source', getSource(searchResult), viewModel);
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
  if (getProp.getProp(group, 'isOpenData')) {
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
      value: getProp.getProp(group, 'membershipSummary.total'),
    });
  }
  if (group.hasOwnProperty('contentCount')) {
    additionalInfo.push({
      i18nKey: 'content',
      value: getProp.getProp(group, 'contentCount'),
    });
  }
  return additionalInfo;
};

/**
 * Convert a User IHubSearchResult into an IHubCardViewModel
 *
 * @param searchResult hub search result
 * @param opts view model options
 */
const userResultToCardModel = (searchResult, _layout, context, _intl, opts) => {
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
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
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

const channelResultToCardModel = (result, _layout, context, _intl, opts) => {
  var _a, _b;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  const additionalInfo = [
    {
      i18nKey: "access",
      value: result.access,
    },
    {
      i18nKey: "created",
      value: result.createdAt,
    }
  ];
  const groups = (_a = result.includes) === null || _a === void 0 ? void 0 : _a.groups;
  if (groups === null || groups === void 0 ? void 0 : groups.length) {
    additionalInfo.push({
      i18nKey: 'groups',
      value: groups.map(group => (group === null || group === void 0 ? void 0 : group.title) || 'groupNotFound').join(", ")
    });
  }
  let viewModel = Object.assign({ access: result.access, actionLinks: actionLinks, badges: [], id: result.id, family: "channel", source: result.owner, title: discussions.getChannelName(result, [], 'unnamed'), type: result.type, additionalInfo }, (!isNaN(result.index) && { index: result.index }));
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(result, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', (_b = result.links) === null || _b === void 0 ? void 0 : _b.thumbnail, viewModel);
  return viewModel;
};

const eventAttendeeResultToCardModel = (searchResult, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    additionalInfo: [],
    badges: [],
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    source: searchResult.name ? `@${searchResult.owner}` : undefined,
    title: searchResult.name || `@${searchResult.owner}`,
    type: searchResult.type,
  };
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  viewModel = util.maybeAdd('thumbnailUrl', (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  return viewModel;
};

/**
 * Convert an Event IHubSearchResult into an IHubCardViewModel
 *
 * @param searchResult hub search result
 * @param opts view model options
 */
const eventResultToCardModel = (searchResult, _layout, context, intl, opts) => {
  var _a, _b;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  const rawEvent = searchResult.rawResult;
  const startDateTime = new Date(rawEvent.startDateTime);
  const endDateTime = new Date(rawEvent.endDateTime);
  let dateAndTimeValue;
  if (rawEvent.allDay) {
    const isSingleDay = startDateTime.getFullYear() === endDateTime.getFullYear() &&
      startDateTime.getMonth() === endDateTime.getMonth() &&
      startDateTime.getDate() === endDateTime.getDate();
    const from = intl.formatDate(startDateTime, { dateStyle: 'short' });
    if (isSingleDay) {
      dateAndTimeValue = intl.t('allDay', { date: from });
    }
    else {
      const to = intl.formatDate(endDateTime, { dateStyle: 'short' });
      dateAndTimeValue = intl.t('allDayRange', { from, to });
    }
  }
  else {
    dateAndTimeValue = intl.formatDateTimeRange(startDateTime, endDateTime, {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }
  let attendanceTypeKey;
  if (rawEvent.attendanceType.length === 1) {
    attendanceTypeKey = rawEvent.attendanceType.includes('IN_PERSON')
      ? 'inPerson'
      : 'online';
  }
  else {
    attendanceTypeKey = 'hybrid';
  }
  const additionalInfo = [
    {
      i18nKey: 'dateAndTime',
      value: dateAndTimeValue,
    },
    {
      i18nKey: 'attendanceType',
      value: intl.t(attendanceTypeKey),
    },
  ];
  if (((_a = searchResult.location) === null || _a === void 0 ? void 0 : _a.type) !== 'none' && ((_b = searchResult.location) === null || _b === void 0 ? void 0 : _b.name)) {
    additionalInfo.push({
      i18nKey: 'location',
      value: searchResult.location.name,
    });
  }
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    badges: [],
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    source: searchResult.owner,
    title: searchResult.name,
    type: searchResult.type,
    additionalInfo,
  };
  viewModel = util.maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  return viewModel;
};

/**
 * Convert an IHubSearchResult into an IHubCardViewModel. This
 * function delegates to the appropriate conversion function
 * based on the IHubSearchResult type.
 *
 * In order to streamline development, these functions have not
 * been hoisted to hub.js.
 *
 * @param result hub search result
 * @param opts view model options
 */
const resultToCardModel = (result, layout, context, intl, opts) => {
  let fn;
  switch (result.type) {
    case 'channel':
      fn = channelResultToCardModel;
      break;
    case 'Group':
      fn = groupResultToCardModel;
      break;
    case 'User':
      fn = userResultToCardModel;
      break;
    case 'Event Attendee':
      fn = eventAttendeeResultToCardModel;
      break;
    case 'Event':
      fn = eventResultToCardModel;
      break;
    default:
      fn = defaultResultToCardModel;
      break;
  }
  return fn(result, layout, context, intl, opts);
};

exports.defaultEntityToCardModel = defaultEntityToCardModel;
exports.groupToCardModel = groupToCardModel;
exports.resultToCardModel = resultToCardModel;
