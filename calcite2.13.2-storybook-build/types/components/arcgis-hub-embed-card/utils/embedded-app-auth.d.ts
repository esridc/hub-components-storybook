export declare function hasAuthCookie(): boolean;
/**
 * get the correct AGO URL, based on current user session, etc
 * @param {string} url - original app URL
 * @param {object} options - session and portal info
 *
 * Purpose: Imagine we have two users, one from OrgA and one from OrgB; assume they're authed
 * when OrgB user visits OrgA.maps.arcgis.com/someapp?item=00c, the back-end reads the cookie
 * and says the user is not from OrgA, and so they can't load the app.
 * But, if they load the same item 00c, in the same app, but with OrgB.maps.arcgis.com/someapp?item=00c,
 * the back-end approves the cookie -- that's why we use convertToUserOrgUrl here.
 */
export declare function getAgoAppUrl(url: string, options?: any): string;
/**
 * Remove the bridge path from the passed url
 */
export declare function removeBridge(src: string): string;
