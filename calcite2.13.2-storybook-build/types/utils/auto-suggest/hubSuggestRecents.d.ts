import { IHubAutoSuggestRecentMatch } from "./types";
/**
 * Searches local storage for matches against a term.
 * Matches are case-insensitive and trimmed of extra whitespace.
 *
 * @param term term to match against
 * @param num max number of matches to return
 * @returns an array of corresponding match objects
 */
export declare function hubSuggestRecents(term: string, num?: number): IHubAutoSuggestRecentMatch[];
