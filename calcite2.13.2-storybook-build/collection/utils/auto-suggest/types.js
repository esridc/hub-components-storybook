// TODO: Move to hub.js
export var AutoSuggestMatchSource;
(function (AutoSuggestMatchSource) {
  /**
   * Match came from the recent matches list in local storage
   */
  AutoSuggestMatchSource["RECENT"] = "recent";
  /**
   * Match came from a search api (e.g., portal or hub)
   */
  AutoSuggestMatchSource["SEARCH"] = "search";
  /**
   * Match came from a location api (e.g., geocoder, places api, etc.)
   */
  AutoSuggestMatchSource["LOCATION"] = "location";
})(AutoSuggestMatchSource || (AutoSuggestMatchSource = {}));
