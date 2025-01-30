'use strict';

const logger = require('./logger-5db3d659.js');
const getProp = require('./get-prop-4bd8fc1a.js');

/**
 * This file contains utility functions for building URLs
 * to the viewer for different types of items except for
 * maps and scenes
 */
// TODO: hoist this to hub.js
function forceHttps(url) {
  // try https if the app was loaded under https
  // always try for arcgis hosted services
  if (url && typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return replaceHttp(url);
  }
  else if (/\.arcgis\.com/.test(url)) {
    return replaceHttp(url);
  }
  else {
    return url;
  }
}
// TODO: hoist this to hub.js
function replaceHttp(url) {
  return url.replace(/^http:/i, 'https:');
}
// default to prod
const DEFAULT_OPTIONS = {
  portalUrl: 'https://www.arcgis.com',
  experienceBuilderUrl: 'https://experience.arcgis.com',
  insightsUrl: 'https://insights.arcgis.com',
  urbanModelUrl: 'https://urban.arcgis.com',
  portalBaseUrl: 'https://www.arcgis.com',
  surveyUrl: 'https://survey123.arcgis.com',
};
/**
 * Get the path for the apps viewer
 * @param path - The path of the viewer
 * @param id - The ID of the item
 * @param queryParam - The query parameter (optional)
 * @returns The apps viewer path
 */
function getAppsViewerPath(path, id, queryParam = '') {
  const hashOrParam = queryParam ? `?${queryParam}=` : '#/';
  return `/apps/${path}/index.html${hashOrParam}${id}`;
}
/**
 * Get the ops dashboard url
 * @param id - The ID of the dashboard
 * @param context
 */
function getOpsDashboardUrl(id, context) {
  // The same uri is used for enterprise 11.4+ and AGO
  const portalUrl = getProp.getProp(context, 'portalUrl') || DEFAULT_OPTIONS.portalUrl;
  return `${portalUrl}/apps/dashboards/${id}`;
}
/**
 * Get experience builder url
 * @param id
 * @param context
 */
function getExperienceBuilderUrl(id, context) {
  // NOTE: since we don't have direct access to ENV in hub-components, we need to
  // manually map them with the urls here. If the any of the urls changes in
  // packages/opendata-ui/config/targets/..., we need to update them here as well
  const urlByEnv = {
    'production': 'https://experience.arcgis.com',
    'qaext': 'https://experienceqa.arcgis.com',
    'devext': 'https://experiencedev.arcgis.com',
  };
  const experienceBuilderUrl = urlByEnv[context.environment];
  const portalUrl = getProp.getProp(context, 'portalUrl') || DEFAULT_OPTIONS.portalUrl;
  const isPortal = getProp.getProp(context, 'isPortal') || false;
  return isPortal
    ? `${portalUrl}/apps/experiencebuilder/experience/?id=${id}`
    : `${experienceBuilderUrl}/experience/${id}`;
}
/**
 * Get insights url
 * @param id
 * @param context
 */
function getInsightsUrl(id, context, embed) {
  const portalUrl = getProp.getProp(context, 'portalUrl') || DEFAULT_OPTIONS.portalUrl;
  const isPortal = getProp.getProp(context, 'isPortal') || false;
  // NOTE: since we don't have direct access to ENV in hub-components, we need to
  // manually map them with the urls here. If the any of the urls changes in
  // packages/opendata-ui/config/targets/..., we need to update them here as well
  const urlByEnv = {
    'production': 'https://insights.arcgis.com',
    'qaext': 'https://insightsqa.arcgis.com',
    'devext': 'https://insightsdev.arcgis.com',
  };
  const insightsUrl = urlByEnv[context.environment] || DEFAULT_OPTIONS.insightsUrl;
  const path = embed ? 'embed' : 'view';
  return isPortal
    ? `${portalUrl}/apps/insights/index.html#/${path}/${id}`
    : `${insightsUrl}/#/${path}/${id}`;
}
/**
 * Get urban mode url
 * @param id
 * @param context
 */
function getUrbanModelUrl(id, context) {
  const urlByEnv = {
    'production': 'https://urban.arcgis.com',
    'qaext': 'https://urbanqa.arcgis.com',
    'devext': 'https://urbandev.arcgis.com',
  };
  const urbanModelUrl = urlByEnv[context.environment] || DEFAULT_OPTIONS.urbanModelUrl;
  return `${urbanModelUrl}?id=${id}&ui=embed`;
}
/**
 * Get survey url
 * @param id
 * @param context
 */
function getSurveyUrl(id, context) {
  const survey123Url = getProp.getProp(context, 'survey123Url') || DEFAULT_OPTIONS.surveyUrl;
  const portalUrl = getProp.getProp(context, 'portalUrl') || DEFAULT_OPTIONS.portalUrl;
  return `${survey123Url}/share/${id}?portalUrl=${portalUrl}&embed=jsapi&version=latest`;
}
/**
 * Build the URL to the viewer hosted on AGO or portal for this type of item
 * @param item
 * @param context
 */
function buildItemViewerUrl(item, context) {
  const { id, url } = item;
  const { portalUrl = DEFAULT_OPTIONS.portalUrl } = context;
  // we should only manually build the viewer URL when `item.url` is empty
  // or if `item.url` does not contain a valid item viewer path, such as for a survey
  if (shouldItemUrlBeUsed(item)) {
    return url;
  }
  switch (getNormalizedAppItemType(item)) {
    case 'Dashboard':
      return getOpsDashboardUrl(id, context);
    case 'Insights':
    case 'Insights Page':
      return getInsightsUrl(id, context);
    case 'Insights Workbook':
      return getInsightsUrl(id, context, true);
    case 'Web Mapping Application':
      return portalUrl + getAppsViewerPath('webappviewer', id, 'id');
    case 'Experience':
      return getExperienceBuilderUrl(id, context);
    case 'Urban Model':
      return getUrbanModelUrl(id, context);
    case 'Survey':
      return getSurveyUrl(id, context);
    default:
      return url;
  }
}
function getNormalizedAppItemType(item) {
  var _a;
  const typeKeywords = item.typeKeywords || [];
  let result = item.type || '';
  if (item.type === 'StoryMap' || (item.type === 'Web Mapping Application' && typeKeywords.includes('Story Map'))) {
    result = 'StoryMap';
  }
  else if (item.type === 'Insights Page') {
    result = 'Insights Page';
  }
  else if (item.type === 'Insights Workbook') {
    result = 'Insights Workbook';
  }
  else if ((_a = item.type) === null || _a === void 0 ? void 0 : _a.includes('Insights')) {
    result = 'Insights';
  }
  else if (item.type === 'Web Experience' || (item.type === 'Web Mapping Experience' && typeKeywords.includes('EXB Experience'))) {
    result = 'Experience';
  }
  else if (item.type === 'Form' && typeKeywords.includes('Survey123')) {
    result = 'Survey';
  }
  return result;
}
/**
 * Whether the url is valid
 *
 * @param {string} url Url to validate
 * @return {*}  {boolean}
 */
function isUrl(url) {
  // Use try / catch as a simple string "test" will cause new URL() to throw an error.
  try {
    const result = new URL(url);
    // Cast to bool.
    return !!result;
  }
  catch (e) {
    logger.Logger.error(`Error parsing URL`);
    return false;
  }
}
function isValidViewerUrl(url) {
  // Sometimes `item.url` will contain invalid URLs
  // For instance, some of the insights item types will have a URL
  // that contains `/WorkspaceServer`, which we need to ignore
  // or sometimes a dashboard item.url will be in edit mode
  const ignoredPaths = [
    '/WorkspaceServer',
    '/LegacyView',
    '?edit=true'
  ];
  const doesNotIncludeIgnoredPath = !ignoredPaths.some(path => (url || '').includes(path));
  return !!url && doesNotIncludeIgnoredPath && isUrl(url);
}
function shouldItemUrlBeUsed(item) {
  const type = getNormalizedAppItemType(item);
  return isValidViewerUrl(item.url) && type !== 'Web Map' && type !== 'Survey';
}

exports.buildItemViewerUrl = buildItemViewerUrl;
exports.forceHttps = forceHttps;
exports.isUrl = isUrl;
