import { CardConverterFn } from './types';
/**
 * Convert a HubEntity into an IHubCardViewModel. This
 * function delegates to the appropriate conversion function
 * based on the HubEntity type.
 *
 * In order to streamline development, these functions have not
 * been hoisted to hub.js.
 *
 * @param entity
 * @param context
 * @param opts
 * @returns
 */
export declare const entityToCardModel: CardConverterFn;
