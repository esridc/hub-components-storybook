/**
 * A function to fetch a cached user record. If no hits
 * in the cache, it will request the user via XHR
 * @param username A username
 * @returns a promise that resolves a user
 */
export declare const fetchMemberFromCache: (...args: any[]) => Promise<import("@esri/arcgis-rest-portal").IUser>;
