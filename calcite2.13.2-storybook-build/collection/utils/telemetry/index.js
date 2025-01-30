import { Telemetry, getTrackersToInitialize } from '@esri/telemetry';
import { Amazon } from '@esri/telemetry-amazon';
import { getElementPath, getResponse, transformDimensions } from './_internal';
const PRIVACY_SETTINGS_STORAGE_KEY = 'ESRI_HUB_PRIVACY_SETTINGS';
/**
 * Compares two telemetry info objects to see if they match
 * @param a ITelemetryInfo - telemetry info A
 * @param b ITelemetryInfo  - telemetry info B
 * @returns boolean - true if they match, false if they don't
 */
export const matchesTelemetry = (a, b) => {
  return a.action === b.action && a.category === b.category && a.label === b.label;
};
// should this be hoisted to Hub.js?
/**
 * generate a new GUID
 * @returns GUID
 */
function generateGUID() {
  // Created by github copilot
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/*
  NOTE: this will return:
    - false if we have no org info - the user is not logged in so we don't know anything about their org
    - false if we have org info and eueiEnabled is true
    - true if we have org info and eueiEnabled is false
*/
export const isEueiDisabled = (orgInfo) => {
  const eueiEnabled = orgInfo === null || orgInfo === void 0 ? void 0 : orgInfo.eueiEnabled;
  return eueiEnabled === false;
};
/**
 * Get privacy settings from local storage or use defaults
 * @param eueiDisabled
 * @returns Hub privacy settings
 */
const getPrivacySettings = (eueiDisabled) => {
  // create a default for the privacy settings
  let privacySettings = {
    accepted: false,
    performance: false,
    targeting: false,
    functional: false,
    id: generateGUID(),
    // DO NOT ADD STATE
    // It will cause issues with other unit tests
    // and we can not be sure that appSettings.site is defined
    // state: this.telemetryHash,
    // instead, we will set it in updateUserPrivacySettings
    timestamp: Date.now(),
  };
  const rawPrivacySettings = window.localStorage.getItem(PRIVACY_SETTINGS_STORAGE_KEY);
  if (rawPrivacySettings) {
    try {
      privacySettings = JSON.parse(rawPrivacySettings);
      if (eueiDisabled) {
        privacySettings.functional = false;
        privacySettings.performance = false;
        privacySettings.targeting = false;
        window.localStorage.setItem(PRIVACY_SETTINGS_STORAGE_KEY, JSON.stringify(privacySettings));
      }
    }
    catch (e) {
      // if this fails, what's stored in localStoage is somehow mangled,
      // so we replace it with the default
      window.localStorage.setItem(PRIVACY_SETTINGS_STORAGE_KEY, JSON.stringify(privacySettings));
    }
  }
  else {
    // store the default into localStorage
    window.localStorage.setItem(PRIVACY_SETTINGS_STORAGE_KEY, JSON.stringify(privacySettings));
  }
  return privacySettings;
};
/**
 * Check if hub analytics is enabled for a site
 * @param site IHubSite
 * @returns boolean
*/
export const isHubAnalyticsEnabled = (site) => {
  const { legacyCapabilities = [] } = site;
  return !legacyCapabilities.includes('disableActivityTracking');
};
// TODO: this should be used by telemetry._getTelemetryPrivacy(reset)
export const initTelemetry = async (site, options) => {
  var _a;
  const { amazon, debug = false, disabled = false, orgInfo } = options;
  // read site's telemetry settings
  const { allowPrivacyConfig, blocking } = ((_a = site.telemetry) === null || _a === void 0 ? void 0 : _a.consentNotice) || {};
  // build a list of configured trackers
  const configuredTrackers = [];
  const hubAnalyticsEnabled = isHubAnalyticsEnabled(site);
  if (amazon && hubAnalyticsEnabled) {
    configuredTrackers.push('amazon');
  }
  // TODO: other trackers?
  // if (googleAnalytics && !!this.googleAnalyticsConfig && !this.googleAnalyticsConfig.disabled && this.googleAnalyticsConfig.measurementId) {
  //   configuredTrackers.push('googleAnalytics');
  // }
  // if (adobe && !!this.adobeConfig && !this.adobeConfig.disabled && this.adobeConfig.reportSuite && this.adobeConfig.trackingServer) {
  //   configuredTrackers.push('adobe-analytics');
  // }
  // if (!!this.siteimproveConfig && !this.siteimproveConfig.disabled && this.siteimproveConfig.code) {
  //   configuredTrackers.push('siteimprove');
  // }
  // set up site config to pass to getTrackersToInitialize
  const requireConsent = allowPrivacyConfig && blocking;
  const siteConfig = {
    requireConsent,
    configuredTrackers
  };
  const privacySettings = getPrivacySettings(isEueiDisabled(orgInfo));
  const trackersToInitialize = getTrackersToInitialize(privacySettings, siteConfig, orgInfo);
  //  map over getTrackersToInitialize and for each and instantiate the plugin
  // NOTE: should lazy-load each plugin
  const plugins = trackersToInitialize.map(tracker => {
    switch (tracker) {
      case 'amazon':
        return new Amazon(Object.assign(Object.assign({}, amazon), { disabled: !hubAnalyticsEnabled }));
      // TODO: other trackers?
      // case 'googleAnalytics':
      //   return new GoogleAnalytics({ ...googleAnalytics, measurementIds: [this.googleAnalyticsConfig.measurementId] });
      // case 'adobe-analytics':
      //   return new AdobeAnalytics({ ...adobe, ...this.adobeConfig });
      // case 'siteimprove':
      //   return new Siteimprove({ code: this.siteimproveConfig.code });
    }
  });
  // return a new initialized telemetry instance
  const telemetry = new Telemetry({
    plugins,
    disabled,
    requireConsent,
    userPrivacySettings: privacySettings,
    debug
  });
  await telemetry.init();
  return telemetry;
};
// TODO: hoist this to Hub.js or it's own util and use it in opendata-ui
/**
 * 1. STAFF - user’s orgId matches the site orgId
 * 2. COMMUNITY - user’s orgId matches the site’s community orgId
 * 3. COMPANION - user’s orgId is a companion orgId of the site’s orgId, but not a community user
 * 4. OTHER - user is authenticated, but doesn’t match the above
 * 5. ANONYMOUS - user is unauthenticated
 */
// function getUserType (currentUser?: any, orgInfo?: IPortal, communityOrgId?: string) {
const getUserType = (context, domain) => {
  var _a;
  const { currentUser, communityOrgId, portal } = context;
  // const { orgKey: siteOrgKey, orgId: siteOrgId } = getWithDefault(appSettings.site, 'domainInfo', {});
  const { orgKey: siteOrgKey, orgId: siteOrgId } = domain || {};
  // const siteOrgId = portal?.id
  // const siteOrgKey = portal.urlKey
  // const communityOrgId = get(appSettings, 'hubCommunity.orgId');
  // const companionOrganizations = getWithDefault(appSettings, 'portalInfo.subscriptionInfo.companionOrganizations', []);
  const companionOrganizations = ((_a = portal === null || portal === void 0 ? void 0 : portal.subscriptionInfo) === null || _a === void 0 ? void 0 : _a.companionOrganizations) || [];
  let userType = 'other';
  if (!currentUser) {
    userType = 'anonymous';
  }
  else if (currentUser.orgId === siteOrgId) {
    userType = 'staff';
  }
  else if (currentUser.orgId === communityOrgId) {
    userType = 'community';
  }
  else if (companionOrganizations.some((org) => org.organizationUrl.split('.').shift() === siteOrgKey)) {
    userType = 'companion';
  }
  return userType;
};
/**
 * function to append common dimensions onto a telemetry
 * event object
 * @param {Object} event telemetry event configuration
 * @param {EventTarget[]} options.composedPath composed path of the logged event
 * @param {Boolean} options.isSuccess indicates whether or not the logged event was a success or failure
 */
export const addCommonDimensions = (event, options = {}) => {
  const { composedPath, context, domain, isSuccess, routeDimensions, site } = options;
  // NOTE: this currently only updates the groupType dimension
  const transformedDimensions = transformDimensions(event, site);
  const transformedRouteDimensions = transformDimensions(routeDimensions, site);
  event = Object.assign(Object.assign({}, transformedDimensions), transformedRouteDimensions);
  const response = getResponse(isSuccess);
  const element = composedPath && getElementPath(composedPath);
  event.userType = domain ? getUserType(context, domain) : '';
  event.organizationId = domain === null || domain === void 0 ? void 0 : domain.orgId;
  event.siteId = site === null || site === void 0 ? void 0 : site.id;
  event = Object.assign(Object.assign(Object.assign({}, event), (element && { element })), (response && { response }));
  return event;
};
