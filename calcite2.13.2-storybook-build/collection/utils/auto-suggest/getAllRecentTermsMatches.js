import { base64ToUnicode } from "@esri/hub-common";
import { HUB_STORAGE_KEYS } from "../HUB_STORAGE_KEYS";
/**
 * Returns all recent terms matches from local storage.
 */
export function getAllRecentTermsMatches() {
  try {
    let storageEntry = { recent: [] };
    const encoded = localStorage.getItem(HUB_STORAGE_KEYS.AUTO_SUGGEST);
    if (encoded) {
      const decoded = base64ToUnicode(encoded);
      storageEntry = JSON.parse(decoded);
    }
    return storageEntry.recent;
  }
  catch (_a) {
    throw new Error('Error getting recent matches from local storage');
  }
}
