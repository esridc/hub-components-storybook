/**
 * Returns an empty auto-suggest response object.
 * @returns {IHubAutoSuggestResponse} An empty auto-suggest response object.
 */
export function getEmptyAutoSuggestResponse() {
  return {
    recent: [],
    search: [],
    location: [],
  };
}
;
