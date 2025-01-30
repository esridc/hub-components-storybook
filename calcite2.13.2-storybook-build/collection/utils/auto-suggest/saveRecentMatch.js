import { unicodeToBase64 } from "@esri/hub-common";
import { getAllRecentTermsMatches } from "./getAllRecentTermsMatches";
import { HUB_STORAGE_KEYS } from "../HUB_STORAGE_KEYS";
/**
 * Saves a recent match to local storage (if it doesn't already exist).
 * NOTE: Label checking is case insensitive.
 * @param match match to save
 */
export function saveRecentMatch(match) {
  try {
    const recentMatches = getAllRecentTermsMatches();
    const isNewMatch = !recentMatches.some((recent) => recent.label.toLowerCase() === match.label.toLowerCase());
    if (isNewMatch) {
      recentMatches.unshift(match);
      const updatedEntry = { recent: recentMatches };
      const encoded = unicodeToBase64(JSON.stringify(updatedEntry));
      localStorage.setItem(HUB_STORAGE_KEYS.AUTO_SUGGEST, encoded);
    }
  }
  catch (_a) {
    console.error('Error saving recent match to local storage');
  }
}
