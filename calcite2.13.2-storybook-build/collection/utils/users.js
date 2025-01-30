import { getUser } from '@esri/arcgis-rest-portal';
import { cache } from './cache';
/**
 * A function to fetch a cached user record. If no hits
 * in the cache, it will request the user via XHR
 * @param username A username
 * @returns a promise that resolves a user
 */
export const fetchMemberFromCache = cache((username, hubRequestOptions) => 
// note: it's considered bad practice to call from the REST API directly, but getMembers() is insufficient for our needs.
getUser(Object.assign({ username }, hubRequestOptions)), { scope: 'users' });
