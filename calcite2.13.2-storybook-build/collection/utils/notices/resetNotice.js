import { cloneObject, getWithDefault, setProp, updateUserHubSettings } from '@esri/hub-common';
import { getHubNoticesFromLocalStorage, setHubNoticesInLocalStorage } from './internal/utils';
/**
 * Reset a notice so that it will show again. This is mainly used for testing.
 * @param noticeId
 * @param context
 */
export async function resetNotice(noticeId, context) {
  const notices = getHubNoticesFromLocalStorage();
  const removed = notices.dismissed.filter(id => id !== noticeId);
  setHubNoticesInLocalStorage({ dismissed: [...removed] });
  if (context.isAuthenticated && context.userHubSettings) {
    const notices = getWithDefault(context, 'userHubSettings.notices.dismissed', []);
    const removed = notices.filter(id => id !== noticeId);
    const updated = cloneObject(context.userHubSettings);
    setProp('notices.dismissed', removed, updated);
    await updateUserHubSettings(updated, context);
  }
  return Promise.resolve();
}
