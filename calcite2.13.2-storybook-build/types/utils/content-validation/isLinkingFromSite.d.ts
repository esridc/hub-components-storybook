/**
 * Determine if the link is being opened from within the site
 * or is a new tab / window opened from the same site.
 * This will return false if it's a fresh load (e.g. a bookmark or manual URL entry).
 * OR if it's a link from another site (e.g. Google search result).
 * @param {*} transitionFrom - object indicating that this is an internal transition vs a fresh load
 * @param {*} win - window object
 * @returns
 */
export declare const isLinkingFromSite: (transitionFrom: any, win?: Window & typeof globalThis) => boolean;
