import { IHubSearchOptions, IQuery } from "@esri/hub-common";
import { IHubAutoSuggestSearchMatch } from "./types";
/**
 * TODO: move to hub.js
 * Searches the `hubSearch()` subsystem for matches against a term.
 *
 * @param term term to match against
 * @param searchQuery scope query for limiting search results, does not include the term
 * @param options search options
 * @returns an array of corresponding match objects
 */
export declare function hubSuggestSearchResults(term: string, searchQuery: IQuery, options: IHubSearchOptions): Promise<IHubAutoSuggestSearchMatch[]>;
