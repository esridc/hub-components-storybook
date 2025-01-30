import { i as isAGOFeatureServiceUrl } from './hostedServiceUtils-f22b023b.js';
import { i as isMapOrFeatureServerUrl } from './index-edff2d62.js';

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
    return isAGOFeatureServiceUrl(entity.url) && !!entity.serverExtractCapability;
}

function canUseHubDownloadSystem(entity) {
    const isMapOrFeatureService = isMapOrFeatureServerUrl(entity.url);
    const isPublic = entity.access === "public";
    // TODO: use `extendedProps.serverQueryCapability` instead
    const isQueryEnabled = entity.serverQueryCapability;
    return isMapOrFeatureService && isPublic && isQueryEnabled;
}

export { canUseCreateReplica as a, canUseHubDownloadSystem as c };
