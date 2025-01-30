// TODO: add test for functions in this file
export function hasAuthCookie() {
  let result = false;
  if (isPlatformDomain()) {
    if (document.cookie.indexOf('esri_aopc') > -1) {
      result = true;
    }
  }
  return result;
}
function isPlatformDomain() {
  let result = false;
  if (window) {
    const hostname = window.location.hostname || '';
    if (hostname.indexOf('arcgis.com') > -1) {
      result = true;
    }
  }
  return result;
}
/**
 * get the correct AGO URL, based on current user session, etc
 * @param {string} url - original app URL
 * @param {object} options - session and portal info
 *
 * Purpose: Imagine we have two users, one from OrgA and one from OrgB; assume they're authed
 * when OrgB user visits OrgA.maps.arcgis.com/someapp?item=00c, the back-end reads the cookie
 * and says the user is not from OrgA, and so they can't load the app.
 * But, if they load the same item 00c, in the same app, but with OrgB.maps.arcgis.com/someapp?item=00c,
 * the back-end approves the cookie -- that's why we use convertToUserOrgUrl here.
 */
export function getAgoAppUrl(url, options = {}) {
  const { isAuthenticated, hasCookie, orgBaseUrl, orgHasSSO } = options;
  let result = url;
  if (isAgoHosted(result)) {
    result = ensureHttps(result);
    if (isAuthenticated && (hasCookie || orgHasSSO)) {
      result = convertToUserOrgUrl(result, orgBaseUrl);
    }
  }
  return result;
}
/**
 * Remove the bridge path from the passed url
 */
export function removeBridge(src) {
  return src.replace(/\/tools\/bridge/, '');
}
/**
 * Check if the source URL is hosted on AGO
 * @param {string} src - source URL
 * @returns {boolean} - true if hosted on AGO, false otherwise
 */
function isAgoHosted(src) {
  return getHostname(src).endsWith('arcgis.com');
}
/**
 * Extract the hostname from a url
 * @param {string} src Url to process
 */
function getHostname(src) {
  const parts = src.split('/');
  let host = parts[2];
  // handle protocol-less urls
  if (src.indexOf('http') !== 0) {
    host = parts[0];
  }
  return host;
}
/**
 * Ensure a url has https protocol
 * @param {string} src Url to ensure has https protocol
 */
function ensureHttps(src) {
  let result = src;
  // only do this if it's a hosted url...
  if (isAgoHosted(src)) {
    // check for some protocol...
    if (src.indexOf('http') !== 0) {
      // protocol-less url
      result = `https://${src}`;
    }
    else if (src.indexOf(`https:`) !== 0) {
      // if it does not start w/ https, swap it out
      result = src.replace('http:', 'https:');
    }
  }
  return result;
}
/**
 * Convert an app url to use the current user's org url
 * @param {string} src Url to replace the host with the user's org's base Url
 * @param {string} orgBaseUrl Users org's base url
 */
function convertToUserOrgUrl(src, orgBaseUrl) {
  let result = src;
  // TODO: what if no orgBaseUrl passed?
  if (isAgoHosted(src) && isAgoHosted(orgBaseUrl)) {
    if (canConvertToOrgUrl(src)) {
      const base = src.split('arcgis.com')[0];
      result = src.replace(`${base}arcgis.com`, orgBaseUrl);
    }
  }
  return result;
}
/**
 * Wether a host can be swapped to an org url
 * @param {string} src Url to check if it can be upgraded
 */
function canConvertToOrgUrl(src) {
  let result = true;
  const hostname = getHostname(src);
  // hostname checks...
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
    'communityanalyst.',
    'hub-sandbox-compass.' // allow hub ai assistant to be embedded
  ].forEach(s => {
    if (hostname.indexOf(s) !== -1) {
      result = false;
    }
  });
  // if we passed that, then check in the url...
  if (result) {
    // check for stuff in the url...
    ['embedGallery.html'].forEach(s => {
      if (src.indexOf(s) !== -1) {
        result = false;
      }
    });
  }
  return result;
}
