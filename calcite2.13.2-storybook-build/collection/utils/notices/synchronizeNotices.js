import { cloneObject, getWithDefault, setProp, updateUserHubSettings } from '@esri/hub-common';
import { getHubNoticesFromLocalStorage } from './internal/utils';
/**
 * It's possible that a user dismissed a notice while unauthenticated
 * call this function after a user logs in to ensure that
 * those notices do not show up when they visit other sites
 * @param context
 * @returns
 */
export async function synchronizeNotices(context) {
  var _a;
  // get local storage first
  const lsNotices = getHubNoticesFromLocalStorage();
  // set a default for user notices
  let usNotices = { dismissed: [] };
  // if user is authenticated, get userHubSettings.notices
  if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && (context === null || context === void 0 ? void 0 : context.userHubSettings)) {
    usNotices = getWithDefault(context, 'userHubSettings.notices', usNotices);
  }
  // which ones are in local storage, but not saved w/ user?
  const toSync = (_a = lsNotices.dismissed) === null || _a === void 0 ? void 0 : _a.filter(noticeId => !usNotices.dismissed.includes(noticeId));
  if (toSync.length > 0) {
    // update userHubSettings
    const updated = cloneObject(context.userHubSettings);
    setProp('notices.dismissed', [...usNotices.dismissed, ...toSync], updated);
    await updateUserHubSettings(updated, context);
  }
  return Promise.resolve();
}
