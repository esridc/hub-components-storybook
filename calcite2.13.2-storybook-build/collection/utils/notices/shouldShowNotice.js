import { getWithDefault } from '@esri/hub-common';
import { getHubNoticesFromLocalStorage } from './internal/utils';
/**
 * Should a given notice be shown?
 * This will check both localStorage and userHubSettings to see if the notice has been dismissed.
 * If it's been dismissed in localStorage, but not in userHubSettings, it will also update userHubSettings.
 *
 * @param noticeId
 * @param context
 * @returns
 */
export function shouldShowNotice(noticeId, context) {
  let show = true;
  // get local storage first
  const lsNotices = getHubNoticesFromLocalStorage();
  // set a default for user notices
  let usNotices = { dismissed: [] };
  // if user is authenticated, get userHubSettings.notices
  if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && (context === null || context === void 0 ? void 0 : context.userHubSettings)) {
    usNotices = getWithDefault(context, 'userHubSettings.notices', usNotices);
  }
  const dismissed = [...lsNotices.dismissed, ...usNotices.dismissed];
  // if noticeId is in dismissed, don't show
  if (dismissed.includes(noticeId)) {
    show = false;
  }
  return show;
}
