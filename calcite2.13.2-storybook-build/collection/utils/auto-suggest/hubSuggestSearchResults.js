import { HubError, cloneObject, hubSearch } from "@esri/hub-common";
import { AutoSuggestMatchSource } from "./types";
import { getSearchResultTypeIcon } from "../search";
/**
 * TODO: move to hub.js
 * Searches the `hubSearch()` subsystem for matches against a term.
 *
 * @param term term to match against
 * @param searchQuery scope query for limiting search results, does not include the term
 * @param options search options
 * @returns an array of corresponding match objects
 */
export async function hubSuggestSearchResults(term, searchQuery, options) {
  let matches = [];
  const { searchField, resultField } = getSuggestFieldInfo(searchQuery.targetEntity);
  if (!term) {
    throw new HubError('hubAutoSuggestResult', 'term is required');
  }
  if (!searchField) {
    throw new HubError('hubAutoSuggestResult', `suggestField is not implemented for entity type ${searchQuery.targetEntity}`);
  }
  if (!searchQuery) {
    throw new HubError('hubAutoSuggestResult', 'searchQuery is required');
  }
  const queryWithSuggest = cloneObject(searchQuery);
  queryWithSuggest.filters.push({
    predicates: [{
        [searchField]: term
      }]
  });
  const { results } = await hubSearch(queryWithSuggest, options);
  matches = results.map((result) => {
    const fieldName = resultField || searchField;
    const label = result[fieldName];
    if (!label) {
      throw new Error(`suggestField "${fieldName}" is not present in search result ${result.id}`);
    }
    return {
      source: AutoSuggestMatchSource.SEARCH,
      label,
      icon: getSearchResultTypeIcon(result.type),
      description: result.type,
      result,
    };
  });
  return matches;
}
/**
 * Retrieves field information for suggestion requests based on the entity type.
 * TODO: Consider adding support for multiple fields
 *
 * @param entityType The type of the entity.
 * @returns The field information.
 */
function getSuggestFieldInfo(entityType) {
  let result = { searchField: null };
  switch (entityType) {
    case 'item':
      result = {
        searchField: 'title',
        resultField: 'name',
      };
      break;
    // TODO: Add fields for other entity types
  }
  return result;
}
