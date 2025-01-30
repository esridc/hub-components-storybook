import { getTeamById } from '@esri/hub-teams';
import { cache } from './cache';
/**
 * A function to fetch a cached group record. If no hits
 * in the cache, it will request the group via XHR
 * @param id A group id
 * @param hubRequestOptions An IHubRequestOptions object
 * @returns a promise that resolves a group
 */
export const fetchTeamFromCache = cache(getTeamById, {
  scope: 'teams',
  ttl: 1000,
});
