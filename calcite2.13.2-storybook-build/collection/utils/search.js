import { getContentTypeIcon } from "@esri/hub-common";
/**
 * Get the calcite icon name that should displayed for a given search result
 *
 * @param type type of search result
 * @returns the calcite icon name for the search result type
 */
export function getSearchResultTypeIcon(type) {
  // Temporary fix added as part of https://confluencewikidev.esri.com/x/KYJuDg
  // Remove once re-classification efforts are complete
  if (type === 'Feature Service') {
    return 'data';
  }
  return type ? getContentTypeIcon(type) : "file";
}
