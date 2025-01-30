import { IHubAutoSuggestRecentMatch } from "./types";
/**
 * Saves a recent match to local storage (if it doesn't already exist).
 * NOTE: Label checking is case insensitive.
 * @param match match to save
 */
export declare function saveRecentMatch(match: IHubAutoSuggestRecentMatch): void;
