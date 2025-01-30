import { HubEntity, IArcGISContext, IHubSearchResult, IInfoConfig } from '@esri/hub-common';
import { CardModelTarget } from '../types';
/**
 * Given a target and hub search result, this util
 * returns a gallery card's title url
 * @param entityOrResult HubEntity or IHubSearchResult
 * @param context IArcGISContext
 * @param target  "self" | "siteRelative" | "workspaceRelative" | "none" | "event"
 * @param baseUrl optional base url to prepend to relative links
 * @returns
 */
export declare function getCardModelTitleUrl(result: HubEntity | IHubSearchResult, _context: IArcGISContext, target: CardModelTarget, baseUrl?: string): string;
export declare const getShortenedCategories: (categories: string[]) => string[];
/**
 * Derives the source value for view model based on the raw search result
 *
 * @param input search result to derive `source` from
 * @returns source value
 */
export declare function getSource(input: IHubSearchResult): string | undefined;
/**
 * Compute the additional info array for Items
 * @param entityOrSearchResult search result
 * @param locale
 * @returns
 */
export declare function getStandardAdditionalInfo(entityOrSearchResult: HubEntity | IHubSearchResult, locale: string): IInfoConfig[];
