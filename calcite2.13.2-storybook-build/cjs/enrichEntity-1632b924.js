'use strict';

const util = require('./util-38e73510.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const mapBy = require('./map-by-a7a75788.js');
const setProp = require('./set-prop-3de2437f.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const get = require('./get-52661c13.js');

/**
 * Add a policy to an array of entity policies
 * Returns a new array
 * @param permissions
 * @param policy
 * @returns
 */
function addPermissionPolicy(permissions = [], policy) {
    const clone = removePermissionPolicy(permissions, policy.permission, policy.collaborationId);
    clone.push(policy);
    return clone;
}
/**
 * Remove a policy from an array of entity policies
 * Returns a new array
 * @param permissions
 * @param permission
 * @param id
 * @returns
 */
function removePermissionPolicy(permissions = [], permission, id) {
    const clone = util.cloneObject(permissions);
    return clone.filter((p) => p.permission !== permission || p.collaborationId !== id);
}

/**
 * Function to enrich an entity with information that
 * requires an additional XHR
 *
 * @param entity Hub entity
 * @param include Array of enrichment strings
 * @param requestOptions Hub request options
 */
const enrichEntity = async (entity, include, requestOptions) => {
    const specs = include.map(HubInitiatives.parseInclude);
    const enrichments = mapBy.mapBy("enrichment", specs).filter(util.unique);
    // delegate to fetch enrichments if any have been defined
    let enrichmentResults = {};
    if (enrichments.length) {
        enrichmentResults = await fetchEntityEnrichments(entity, enrichments, requestOptions);
    }
    // add the enrichments back to the entity based on the enrichment spec
    specs.forEach((spec) => {
        setProp.setProp(spec.prop, getProp.getProp(enrichmentResults, spec.path), entity);
    });
    return entity;
};
/**
 * This function delegates out to other helper functions
 * to fetch the entity enrichments.
 */
const fetchEntityEnrichments = async (entity, enrichments, requestOptions) => {
    // Note: we chose to keep this simple for now and not create
    // an operation pipeline - if this becomes more widely used
    // or we run into issues debugging, we can implement
    const operations = enrichments.reduce((ops, enrichment) => {
        const operation = {
            followersGroup: fetchFollowersGroupEnrichment,
        }[enrichment];
        operation && ops.push({ enrichment, operation });
        return ops;
    }, []);
    const enrichmentFns = operations.map(({ operation }) => operation(entity, requestOptions));
    const enrichmentResults = await Promise.all(enrichmentFns);
    return enrichmentResults.reduce((acc, result, idx) => {
        acc[operations[idx].enrichment] = result;
        return acc;
    }, {});
};
/**
 * fetch the entity's followers group
 */
const fetchFollowersGroupEnrichment = async (entity, requestOptions) => {
    let group = {};
    try {
        const followersGroupId = getProp.getProp(entity, "followersGroupId");
        if (followersGroupId) {
            group = await get.getGroup(followersGroupId, requestOptions);
        }
    }
    catch (error) {
        return {};
    }
    return group;
};

exports.addPermissionPolicy = addPermissionPolicy;
exports.enrichEntity = enrichEntity;
exports.removePermissionPolicy = removePermissionPolicy;
