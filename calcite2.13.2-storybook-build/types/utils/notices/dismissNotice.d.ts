import { IArcGISContext } from '@esri/hub-common';
/**
 * Dismiss a notice so that it will not show again.
 * If user is not authenticated, store `hubNotices` in localStorage.
 * If they are autehnticated, ALSO store `hubNotices` in userHubSettings.
 * @param noticeId
 * @param context
 * @returns
 */
export declare function dismissNotice(noticeId: string, context: IArcGISContext): Promise<void>;
