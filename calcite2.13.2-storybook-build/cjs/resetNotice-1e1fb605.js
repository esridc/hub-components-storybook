'use strict';

const getWithDefault = require('./get-with-default-d1b1754d.js');
const setProp = require('./set-prop-3de2437f.js');
const ArcGISContextManager = require('./ArcGISContextManager-c5cc74e9.js');
const index = require('./index-058372c1.js');
const util = require('./util-38e73510.js');

const LOCAL_STORAGE_KEY = 'ESRI_HUB_NOTICES';
/**
 * Retrieve Hub notices from local storage
 * @param win
 * @returns
 */
function getHubNoticesFromLocalStorage(/* istanbul ignore next */ win = window) {
  const encoded = win.localStorage.getItem(LOCAL_STORAGE_KEY);
  const decoded = encoded && index.abab.atob(encoded);
  return decoded ? JSON.parse(decoded) : { dismissed: [] };
}
/**
 * Store Hub notices in local storage
 * @param hubNotices
 * @param win
 */
function setHubNoticesInLocalStorage(hubNotices, /* istanbul ignore next */ win = window) {
  const serialized = JSON.stringify(hubNotices);
  const encoded = serialized && index.abab.btoa(serialized);
  win.localStorage.setItem(LOCAL_STORAGE_KEY, encoded);
}

/**
 * Dismiss a notice so that it will not show again.
 * If user is not authenticated, store `hubNotices` in localStorage.
 * If they are autehnticated, ALSO store `hubNotices` in userHubSettings.
 * @param noticeId
 * @param context
 * @returns
 */
async function dismissNotice(noticeId, context) {
  // Update localStorage first so it's always in sync
  const notices = getHubNoticesFromLocalStorage();
  if (!notices.dismissed.includes(noticeId)) {
    setHubNoticesInLocalStorage({ dismissed: [...notices.dismissed, noticeId] });
  }
  // If user is authenticated and has userHubSettings
  if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && (context === null || context === void 0 ? void 0 : context.userHubSettings)) {
    const notices = getWithDefault.getWithDefault(context, 'userHubSettings.notices.dismissed', []);
    // only add if it's not already there
    // this can happen when testing and calling dismissNotice multiple times for the same noticeId
    if (!notices.includes(noticeId)) {
      notices.push(noticeId);
      setProp.setProp('notices.dismissed', notices, context.userHubSettings);
      await ArcGISContextManager.updateUserHubSettings(context.userHubSettings, context);
    }
  }
  return Promise.resolve();
}

/**
 * Should a given notice be shown?
 * This will check both localStorage and userHubSettings to see if the notice has been dismissed.
 * If it's been dismissed in localStorage, but not in userHubSettings, it will also update userHubSettings.
 *
 * @param noticeId
 * @param context
 * @returns
 */
function shouldShowNotice(noticeId, context) {
  let show = true;
  // get local storage first
  const lsNotices = getHubNoticesFromLocalStorage();
  // set a default for user notices
  let usNotices = { dismissed: [] };
  // if user is authenticated, get userHubSettings.notices
  if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && (context === null || context === void 0 ? void 0 : context.userHubSettings)) {
    usNotices = getWithDefault.getWithDefault(context, 'userHubSettings.notices', usNotices);
  }
  const dismissed = [...lsNotices.dismissed, ...usNotices.dismissed];
  // if noticeId is in dismissed, don't show
  if (dismissed.includes(noticeId)) {
    show = false;
  }
  return show;
}

/**
 * Reset a notice so that it will show again. This is mainly used for testing.
 * @param noticeId
 * @param context
 */
async function resetNotice(noticeId, context) {
  const notices = getHubNoticesFromLocalStorage();
  const removed = notices.dismissed.filter(id => id !== noticeId);
  setHubNoticesInLocalStorage({ dismissed: [...removed] });
  if (context.isAuthenticated && context.userHubSettings) {
    const notices = getWithDefault.getWithDefault(context, 'userHubSettings.notices.dismissed', []);
    const removed = notices.filter(id => id !== noticeId);
    const updated = util.cloneObject(context.userHubSettings);
    setProp.setProp('notices.dismissed', removed, updated);
    await ArcGISContextManager.updateUserHubSettings(updated, context);
  }
  return Promise.resolve();
}

exports.dismissNotice = dismissNotice;
exports.resetNotice = resetNotice;
exports.shouldShowNotice = shouldShowNotice;
