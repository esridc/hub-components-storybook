import { IArcGISContext } from '@esri/hub-common';
import { IHubDeprecatedNotice, IHubNotice } from './types';
/**
 * Represents pre-configured notices that are displayed to the user.
 * Notices can be modals (calcite-modal), alerts (calcite-alert), or inline notices (calcite-notice).
 *
 * To ADD an entry:
 *
 * - Define a unique key for the new notice
 *   - Format: <:release-date>-<:message-subject>-<:persona>-<:incrementing-number>
 *   - Persona and incrementing number are optional, but can be used to differentiate when multiple notices are released on the same day
 *   - Examples:
 *      - 20240131-new-search
 *      - 20240131-new-search-2
 *      - 20240131-new-search-admin-3
 *      - 20240131-new-search-owner-3
 * - Add a new entry to the NOTICES object
 *   - Use your new key as the object key
 *   - Be sure the id matches the object key
 * - Use the new key to create a new translations hash in `arcgis-hub-notice/locales/arcgis-hub-notice.i18n.en.json`
 *
 * To DEPRECATE an entry:
 *
 * - DO NOT delete the entry from the NOTICES object, we need to keep track of past ids
 * - Delete the corresponding translations hash in `arcgis-hub-notice/locales/arcgis-hub-notice.i18n.en.json`
 * - Convert it to an IHubDeprecatedNotice (ie remove all the props except id and deleted)
 */
export declare function getPreconfiguredNotice(id: string, context?: IArcGISContext): IHubNotice | IHubDeprecatedNotice;
export declare function getPreconfiguredNotices(context?: IArcGISContext): {
  [key: string]: IHubNotice | IHubDeprecatedNotice;
};
