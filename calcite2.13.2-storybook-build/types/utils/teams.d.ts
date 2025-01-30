/**
 * A function to fetch a cached group record. If no hits
 * in the cache, it will request the group via XHR
 * @param id A group id
 * @param hubRequestOptions An IHubRequestOptions object
 * @returns a promise that resolves a group
 */
export declare const fetchTeamFromCache: (...args: any[]) => Promise<import("@esri/arcgis-rest-portal").IGroup>;
