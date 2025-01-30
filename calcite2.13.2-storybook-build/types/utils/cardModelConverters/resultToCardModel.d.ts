import { CardConverterFn } from './types';
/**
 * Convert an IHubSearchResult into an IHubCardViewModel. This
 * function delegates to the appropriate conversion function
 * based on the IHubSearchResult type.
 *
 * In order to streamline development, these functions have not
 * been hoisted to hub.js.
 *
 * @param result hub search result
 * @param opts view model options
 */
export declare const resultToCardModel: CardConverterFn;
