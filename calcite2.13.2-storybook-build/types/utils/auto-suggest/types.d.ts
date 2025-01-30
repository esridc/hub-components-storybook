import { IArcGISContext, IHubLocation, IHubSearchResult, IQuery } from "@esri/hub-common";
export declare enum AutoSuggestMatchSource {
  /**
   * Match came from the recent matches list in local storage
   */
  RECENT = "recent",
  /**
   * Match came from a search api (e.g., portal or hub)
   */
  SEARCH = "search",
  /**
   * Match came from a location api (e.g., geocoder, places api, etc.)
   */
  LOCATION = "location"
}
/**
 * TODO: move to hub.js
 * Match for an auto-suggest query.
 */
export interface IHubAutoSuggestMatch {
  /**
   * The source type of the match.
   */
  source: AutoSuggestMatchSource;
  /**
   * The simple label of the match.
   * NOTE: Rich text strings _should not_ be stored here.
   */
  label: string;
  /**
   * The icon associated with the match.
   */
  icon?: string;
  /**
   * Description metadata to be displayed for the match.
   */
  description?: string;
}
/**
 * TODO: move to hub.js
 * Match for an auto-suggest query that came from the recent matches list.
 */
export interface IHubAutoSuggestRecentMatch extends IHubAutoSuggestMatch {
  /**
   * The source type of the match.
   */
  source: AutoSuggestMatchSource.RECENT;
}
/**
 * TODO: move to hub.js
 * Match for an auto-suggest query that came from a search api.
 */
export interface IHubAutoSuggestSearchMatch extends IHubAutoSuggestMatch {
  /**
   * The source type of the match.
   */
  source: AutoSuggestMatchSource.SEARCH;
  /**
   * The matching result object.
   */
  result: IHubSearchResult;
}
/**
 * TODO: move to hub.js
 * Match for an auto-suggest query that came from a location api.
 * TODO: Flesh out this interface as needed.
 */
export interface IHubAutoSuggestLocationMatch extends IHubAutoSuggestMatch {
  source: AutoSuggestMatchSource.LOCATION;
  location: IHubLocation;
}
/**
 * TODO: move to hub.js
 * Response for an auto-suggest query.
 */
export interface IHubAutoSuggestResponse {
  [AutoSuggestMatchSource.RECENT]: IHubAutoSuggestRecentMatch[];
  [AutoSuggestMatchSource.SEARCH]: IHubAutoSuggestSearchMatch[];
  [AutoSuggestMatchSource.LOCATION]: IHubAutoSuggestLocationMatch[];
}
/**
 * Event payload for decorating a keyboard event
 * with the corresponding auto-suggest match.
 */
export interface IEventWithMatchPayload {
  event: KeyboardEvent;
  match: IHubAutoSuggestMatch;
}
/**
 * Options for the fetching auto-suggest matches flow.
 */
export interface IFetchMatchesOptions {
  /**
   * The term to search for.
   */
  term: string;
  /**
   * Whether to search recent terms in local storage for matches.
   */
  matchRecent?: boolean;
  /**
   * Whether to query a search api for matches.
   */
  matchSearch?: boolean;
  /**
   * Whether to query a location api for matches.
   */
  matchLocation?: boolean;
  /**
   * The type of search API to query for search matches.
   * Only respected if `matchSearch` is true.
   */
  searchApi?: 'portal' | 'hub';
  /**
   * The base query to scope search result matches to.
   * Only respected if `matchSearch` is true.
   */
  query?: IQuery;
  /**
   * Context and authentication information for search matches
   */
  context?: IArcGISContext;
}
/**
 * Local storage model for arcis-hub-auto-suggest
 */
export interface IAutoSuggestLSEntry {
  [AutoSuggestMatchSource.RECENT]: IHubAutoSuggestRecentMatch[];
}
