import { IArcGISContext } from '@esri/hub-common';
/**
 * Should a given notice be shown?
 * This will check both localStorage and userHubSettings to see if the notice has been dismissed.
 * If it's been dismissed in localStorage, but not in userHubSettings, it will also update userHubSettings.
 *
 * @param noticeId
 * @param context
 * @returns
 */
export declare function shouldShowNotice(noticeId: string, context: IArcGISContext): boolean;
