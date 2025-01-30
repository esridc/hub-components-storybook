import { getAllRecentTermsMatches } from "./getAllRecentTermsMatches";
/**
 * Searches local storage for matches against a term.
 * Matches are case-insensitive and trimmed of extra whitespace.
 *
 * @param term term to match against
 * @param num max number of matches to return
 * @returns an array of corresponding match objects
 */
export function hubSuggestRecents(term, num = 10) {
  const recents = getAllRecentTermsMatches();
  return recents
    .filter(match => match.label.toLowerCase().includes(term.toLowerCase().trim()))
    .slice(0, num);
}
