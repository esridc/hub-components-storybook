import { unicodeToBase64 } from "@esri/hub-common";
import { getAllRecentTermsMatches } from "./getAllRecentTermsMatches";
import { HUB_STORAGE_KEYS } from "../HUB_STORAGE_KEYS";
/**
 * Removes a recent match from local storage.
 *
 * @param match match to remove
 */
export function removeRecentMatch(match) {
  try {
    const recentMatches = getAllRecentTermsMatches();
    const updatedRecents = recentMatches.filter((recentMatch) => recentMatch.label !== match.label);
    const updatedEntry = { recent: updatedRecents };
    const encoded = unicodeToBase64(JSON.stringify(updatedEntry));
    localStorage.setItem(HUB_STORAGE_KEYS.AUTO_SUGGEST, encoded);
  }
  catch (_a) {
    console.error('Error removing recent match from local storage');
  }
}
