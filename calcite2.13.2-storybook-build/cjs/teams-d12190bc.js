'use strict';

const cache = require('./cache-4d33af79.js');
const get = require('./get-52661c13.js');

/**
 * Get a team by id
 * @param {string} id group id
 * @param {IRequestOptions} hubRequestOptions
 * @returns {Promise<IGroup>}
 */
function getTeamById(id, hubRequestOptions) {
    return get.getGroup(id, hubRequestOptions);
}

/**
 * A function to fetch a cached group record. If no hits
 * in the cache, it will request the group via XHR
 * @param id A group id
 * @param hubRequestOptions An IHubRequestOptions object
 * @returns a promise that resolves a group
 */
const fetchTeamFromCache = cache.cache(getTeamById, {
  scope: 'teams',
  ttl: 1000,
});

exports.fetchTeamFromCache = fetchTeamFromCache;
