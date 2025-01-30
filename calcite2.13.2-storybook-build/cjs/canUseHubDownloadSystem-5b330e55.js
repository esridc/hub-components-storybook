'use strict';

const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
const index = require('./index-ef80ab27.js');

/**
 * Determines whether Hub can perform the /createReplica operation on a given service entity.
 * @param entity entity to check
 * @returns whether the /createReplica operation can be used
 */
function canUseCreateReplica(entity) {
    // NOTE: We currently do not allow Hub to perform the /createReplica operation on enterprise / self-hosted
    // feature services due to known limitations with the enterprise implementation of /createReplica.
    // This is a temporary restriction until the enterprise implementation is improved.
    // TODO: change to use `extendedProps.serverExtractCapability`
    return hostedServiceUtils.isAGOFeatureServiceUrl(entity.url) && !!entity.serverExtractCapability;
}

function canUseHubDownloadSystem(entity) {
    const isMapOrFeatureService = index.isMapOrFeatureServerUrl(entity.url);
    const isPublic = entity.access === "public";
    // TODO: use `extendedProps.serverQueryCapability` instead
    const isQueryEnabled = entity.serverQueryCapability;
    return isMapOrFeatureService && isPublic && isQueryEnabled;
}

exports.canUseCreateReplica = canUseCreateReplica;
exports.canUseHubDownloadSystem = canUseHubDownloadSystem;
