import { IArcGISContext } from '@esri/hub-common';
/**
 * It's possible that a user dismissed a notice while unauthenticated
 * call this function after a user logs in to ensure that
 * those notices do not show up when they visit other sites
 * @param context
 * @returns
 */
export declare function synchronizeNotices(context: IArcGISContext): Promise<void>;
