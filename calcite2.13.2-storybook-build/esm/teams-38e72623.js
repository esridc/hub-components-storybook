import { c as cache } from './cache-4bea61e0.js';
import { g as getGroup } from './get-850c466d.js';

/**
 * Get a team by id
 * @param {string} id group id
 * @param {IRequestOptions} hubRequestOptions
 * @returns {Promise<IGroup>}
 */
function getTeamById(id, hubRequestOptions) {
    return getGroup(id, hubRequestOptions);
}

/**
 * A function to fetch a cached group record. If no hits
 * in the cache, it will request the group via XHR
 * @param id A group id
 * @param hubRequestOptions An IHubRequestOptions object
 * @returns a promise that resolves a group
 */
const fetchTeamFromCache = cache(getTeamById, {
  scope: 'teams',
  ttl: 1000,
});

export { fetchTeamFromCache as f };
