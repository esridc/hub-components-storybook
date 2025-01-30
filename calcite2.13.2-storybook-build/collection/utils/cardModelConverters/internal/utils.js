import { getProp, getWithDefault, } from '@esri/hub-common';
/**
 * Given a target and hub search result, this util
 * returns a gallery card's title url
 * @param entityOrResult HubEntity or IHubSearchResult
 * @param context IArcGISContext
 * @param target  "self" | "siteRelative" | "workspaceRelative" | "none" | "event"
 * @param baseUrl optional base url to prepend to relative links
 * @returns
 */
export function getCardModelTitleUrl(result, _context, target, baseUrl) {
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
export const getShortenedCategories = (categories) => {
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
export function getSource(input) {
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
export function getStandardAdditionalInfo(entityOrSearchResult, locale) {
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
  const categories = getWithDefault(entityOrSearchResult, 'categories', []);
  if (categories.length) {
    additionalInfo.push({
      i18nKey: 'categories',
      value: getShortenedCategories(categories).join(', '),
    });
  }
  if (entityOrSearchResult.hasOwnProperty('layerCount')) {
    additionalInfo.push({
      i18nKey: 'layers',
      value: getProp(entityOrSearchResult, 'layerCount'),
    });
  }
  if (entityOrSearchResult.hasOwnProperty('pageCount')) {
    additionalInfo.push({
      i18nKey: 'pages',
      value: getProp(entityOrSearchResult, 'pageCount'),
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
