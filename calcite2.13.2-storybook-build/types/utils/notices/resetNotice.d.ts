import { IArcGISContext } from '@esri/hub-common';
/**
 * Reset a notice so that it will show again. This is mainly used for testing.
 * @param noticeId
 * @param context
 */
export declare function resetNotice(noticeId: string, context: IArcGISContext): Promise<void>;
