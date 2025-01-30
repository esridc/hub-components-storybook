import { HubError } from "@esri/hub-common";
import { getEmptyAutoSuggestResponse } from "./getEmptyAutoSuggestResponse";
import { hubSuggestRecents } from "./hubSuggestRecents";
import { hubSuggestSearchResults } from "./hubSuggestSearchResults";
/**
 * Fetches auto suggest matches based on the provided options.
 * @param opts - The options for fetching auto suggest matches.
 * @returns A promise that resolves to an object containing the auto suggest matches.
 * @throws {HubError} If the term is not provided.
 */
export async function fetchAutoSuggestMatches(opts) {
  var _a, _b;
  // TODO: Consider adding a maxMatches option
  const MAX_MATCHES = 5;
  if (!opts.term) {
    throw new HubError('fetchAutoSuggestMatches', 'term is required');
  }
  const result = getEmptyAutoSuggestResponse();
  if (opts.matchRecent) {
    result.recent = hubSuggestRecents(opts.term, MAX_MATCHES);
  }
  if (opts.matchSearch) {
    const searchOptions = {
      requestOptions: (_a = opts.context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions,
      num: MAX_MATCHES,
    };
    // TODO: we can remove this once the hubSearch subsystem has been updated
    // to use the platform-level OGC API instead of the site-level OGC API
    if (opts.searchApi === 'hub') {
      searchOptions.site = (_b = opts.context) === null || _b === void 0 ? void 0 : _b.hubUrl;
    }
    result.search = await hubSuggestSearchResults(opts.term, opts.query, searchOptions);
  }
  if (opts.matchLocation) {
    // TODO: Implement `hubSuggestLocations()` as needed. Make sure MAX_MATCHES is respected
    throw new HubError('fetchAutoSuggestMatches', 'Location matches are not yet implemented');
  }
  return result;
}
