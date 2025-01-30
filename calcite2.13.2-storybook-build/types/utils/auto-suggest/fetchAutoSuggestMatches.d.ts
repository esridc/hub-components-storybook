import { IFetchMatchesOptions, IHubAutoSuggestResponse } from "./types";
/**
 * Fetches auto suggest matches based on the provided options.
 * @param opts - The options for fetching auto suggest matches.
 * @returns A promise that resolves to an object containing the auto suggest matches.
 * @throws {HubError} If the term is not provided.
 */
export declare function fetchAutoSuggestMatches(opts: IFetchMatchesOptions): Promise<IHubAutoSuggestResponse>;
