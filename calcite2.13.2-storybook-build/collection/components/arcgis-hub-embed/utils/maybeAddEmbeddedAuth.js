/**
   * The definitive list of origins we allow to request auth from within an iframe.
   * We also add the current org's origin to this list.
   *
   * See https://esri.github.io/arcgis-rest-js/guides/embedded-apps/ for more info.
   */
const defaultAllowedEmbeddedAuthOrigins = [
  'https://survey123.arcgis.com',
  'https://survey123dev.arcgis.com',
  'https://survey123qa.arcgis.com',
  'https://insights.arcgis.com',
  'https://insightsdev.arcgis.com',
  'https://insightsqa.arcgis.com',
  'https://urban.arcgis.com',
  'https://urbandev.arcgis.com',
  'https://urbanqa.arcgis.com',
  'https://solutions.arcgis.com',
  'https://services.arcgis.com',
  'https://storymaps.arcgis.com',
  'https://storymaps2dev.arcgis.com',
  'https://storymaps2qa.arcgis.com',
  'https://storymapsqa.arcgis.com',
  'https://storymapsdev.arcgis.com',
  'https://hub.arcgis.com',
  'https://hubqa.arcgis.com',
  'https://hubdev.arcgis.com',
  'https://opendata.arcgis.com',
  'https://opendataqa.arcgis.com',
  'https://opendatadev.arcgis.com',
  'https://experience.arcgis.com',
  'https://experienceqa.arcgis.com',
  'https://experiencedev.arcgis.com',
  'https://livingatlas.arcgis.com',
  'https://bao.arcgis.com',
  'https://communityanalyst.arcgis.com',
  'https://qaext.arcgis.com',
  'https://devext.arcgis.com',
  'https://www.arcgis.com'
];
/**
 * Add the embedded auth params to the url if the user is authenticated
 * and the url is in the list of allowed origins.
 * @param iframeUrl
 * @param portalUrl
 * @param currentOrigin
 * @param userSession
 * @returns
 */
export function maybeAddEmbeddedAuth(iframeUrl, portalUrl, currentOrigin, userSession) {
  let ret = iframeUrl;
  if (!!userSession) {
    // Feb 2021
    // Many apps we iframe expect to be loaded from the current user's org url
    // i.e. myorg.maps.arcgis.com/apps/webappviewer vs notmyorg.maps.arcgis.com/apps/webappviewer
    // It's not clear why this is a requirement, but at least as of 4/2021, it was required
    // to allow users from other orgs to auth into a site and have iframed /apps load
    // This is not an issue for apps hosted on their own top level domains
    // i.e. storymaps.arcgis.com, and this is accounted for in `convertToUserOrgUrl`.
    // Oct 2023
    // In the original implementation we were using session.portal vs portalUrl
    // but we believe this correct in more scenarios
    iframeUrl = convertToUserOrgUrl(iframeUrl, origin(portalUrl));
    ret = iframeUrl;
    const allowedEmbeddedAuthOrigins = [origin(portalUrl), ...defaultAllowedEmbeddedAuthOrigins]
      .map(url => url.toLowerCase());
    const iframeOrigin = origin(iframeUrl);
    if (allowedEmbeddedAuthOrigins.includes(iframeOrigin.toLowerCase())) {
      ret = addEmbeddedAuthParams(ret, currentOrigin, userSession.portal);
      userSession.disablePostMessageAuth(); // always clear to avoid registering multiple listeners
      userSession.enablePostMessageAuth(allowedEmbeddedAuthOrigins);
    }
  }
  return ret;
}
/**
* Adds ArcGIS embedded authentication params to a URL for use in an iframe.
* See https://esri.github.io/arcgis-rest-js/guides/embedded-apps/ for more info.
*
* @param {string} url - the URL to add it to
* @param {string} origin - window.location.origin
* @param {string} portal - the portal URL
*/
function addEmbeddedAuthParams(url, origin, portal) {
  const urlWithAuthParams = new URL(url);
  urlWithAuthParams.searchParams.set('arcgis-auth-origin', origin);
  urlWithAuthParams.searchParams.set('arcgis-auth-portal', portal);
  return urlWithAuthParams.toString();
}
/**
 * Convert an app url to use the current user's org url
 * @param {string} url Url to replace the host with the user's org's base Url
 * @param {string} orgBaseUrl Users org's base url
 */
// NOTE: this is currently only exported for testing
function convertToUserOrgUrl(url, orgBaseUrl) {
  let result = url;
  // only convert if both are *.arcgis.com
  if (isAgoHosted(url) && isAgoHosted(orgBaseUrl)) {
    // can we convert it?
    if (canConvertToOrgUrl(url)) {
      // do the conversion
      const base = url.split('arcgis.com')[0];
      result = url.replace(`${base}arcgis.com`, orgBaseUrl);
    }
  }
  return result;
}
/**
 * Extract the origin from a url, using the URL constructor
 * @param url
 * @returns
 */
function origin(url) {
  return new URL(url).origin;
}
/**
 * Can a host be swapped to the current user's org url?
 * Many apps we iframe expect to be loaded from the current user's org url
 * i.e. myorg.maps.arcgis.com/apps/webappviewer vs notmyorg.maps.arcgis.com/apps/webappviewer
 * It's not clear why this is a requirement, but at least as of 4/2021, it was required
 * to allow users from other orgs to auth into a site and have iframed /apps load
 * This is not an issue for apps hosted on their own top level domains
 * i.e. storymaps.arcgis.com.
 * @param {string} url Url to check if it can be upgraded
 */
function canConvertToOrgUrl(url) {
  let result = true;
  const hostname = getHostname(url);
  // List of hostnames that we know are not org-short's
  [
    'survey123.', 'survey123dev.', 'survey123qa.',
    'insights.', 'insightsdev.', 'insightsqa.',
    'urban.', 'urbandev.', 'urbanqa.', 'solutions.', 'services.',
    'storymaps.', 'storymaps2dev.', 'storymaps2qa.', 'storymapsqa.', 'storymapsdev.',
    'hub.arcgis.com', 'hubqa.arcgis.com', 'hubdev.arcgis.com',
    'opendata.arcgis.com', 'opendataqa.arcgis.com', 'opendatadev.arcgis.com',
    'experience.', 'experienceqa.', 'experiencedev.',
    'livingatlas.',
    'bao.',
    'communityanalyst.'
  ].forEach(s => {
    if (hostname.includes(s)) {
      result = false;
    }
  });
  // if we passed that, then the url is an org-short
  // but there are other things which can't be swapped
  // so we have to add those checks here
  if (result) {
    ['embedGallery.html'].forEach(s => {
      if (url.includes(s)) {
        result = false;
      }
    });
  }
  return result;
}
/**
 * Extract the hostname from a url
 * @param {string} url Url to process
 */
function getHostname(url) {
  const parts = url.split('/');
  let host = parts[2];
  // handle protocol-less urls
  if (url.indexOf('http') !== 0) {
    host = parts[0];
  }
  return host;
}
/**
 * Is the url hosted on ArcGIS Online
 * @param url
 * @returns
 */
function isAgoHosted(url) {
  return getHostname(url).endsWith('arcgis.com');
}
