import { getWithDefault, setProp, updateUserHubSettings } from '@esri/hub-common';
import { getHubNoticesFromLocalStorage, setHubNoticesInLocalStorage } from './internal/utils';
/**
 * Dismiss a notice so that it will not show again.
 * If user is not authenticated, store `hubNotices` in localStorage.
 * If they are autehnticated, ALSO store `hubNotices` in userHubSettings.
 * @param noticeId
 * @param context
 * @returns
 */
export async function dismissNotice(noticeId, context) {
  // Update localStorage first so it's always in sync
  const notices = getHubNoticesFromLocalStorage();
  if (!notices.dismissed.includes(noticeId)) {
    setHubNoticesInLocalStorage({ dismissed: [...notices.dismissed, noticeId] });
  }
  // If user is authenticated and has userHubSettings
  if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && (context === null || context === void 0 ? void 0 : context.userHubSettings)) {
    const notices = getWithDefault(context, 'userHubSettings.notices.dismissed', []);
    // only add if it's not already there
    // this can happen when testing and calling dismissNotice multiple times for the same noticeId
    if (!notices.includes(noticeId)) {
      notices.push(noticeId);
      setProp('notices.dismissed', notices, context.userHubSettings);
      await updateUserHubSettings(context.userHubSettings, context);
    }
  }
  return Promise.resolve();
}
