/**
 * Determine if the link is being opened from within the site
 * or is a new tab / window opened from the same site.
 * This will return false if it's a fresh load (e.g. a bookmark or manual URL entry).
 * OR if it's a link from another site (e.g. Google search result).
 * @param {*} transitionFrom - object indicating that this is an internal transition vs a fresh load
 * @param {*} win - window object
 * @returns
 */
export const isLinkingFromSite = (transitionFrom, win = window) => {
  // If transitionFrom is defined, this is an internal transition, so we trust it.
  // Otherwise, we check if the referrer is the current location's hostname meaning this
  // was opened in a new tab or window from the same site, which we trust.
  return transitionFrom ? true : !!(win.document.referrer && win.document.referrer.match(win.location.hostname));
};
