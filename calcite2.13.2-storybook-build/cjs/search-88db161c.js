'use strict';

const compose = require('./compose-9b4311c9.js');

/**
 * Get the calcite icon name that should displayed for a given search result
 *
 * @param type type of search result
 * @returns the calcite icon name for the search result type
 */
function getSearchResultTypeIcon(type) {
  // Temporary fix added as part of https://confluencewikidev.esri.com/x/KYJuDg
  // Remove once re-classification efforts are complete
  if (type === 'Feature Service') {
    return 'data';
  }
  return type ? compose.getContentTypeIcon(type) : "file";
}

exports.getSearchResultTypeIcon = getSearchResultTypeIcon;
