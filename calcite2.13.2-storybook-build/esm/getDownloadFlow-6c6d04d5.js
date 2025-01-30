import { g as getProp } from './get-prop-ec5be510.js';
import { a as canUseCreateReplica, c as canUseHubDownloadSystem } from './canUseHubDownloadSystem-a22afbb9.js';
import { I as ItemType } from './types-2eaa1a18.js';

/**
 * @private
 * Determines if the export image flow can be used for the given entity.
 * @param entity entity to check if export image flow can be used
 * @returns whether the export image flow can be used
 */
function canUseExportImageFlow(entity) {
    const { type, typeKeywords = [] } = entity;
    // Tiled Imagery services cannot be downloaded. This typeKeyword check
    // is one way to distinguish between tiled and non-tiled imagery services.
    // TODO: Consider checking item.url instead so reference items are also excluded.
    return (type === ItemType["Image Service"] &&
        !typeKeywords.includes("Tiled Imagery"));
}

/**
 * @private
 * Determines the download flow that will be used for the current entity.
 * If the entity cannot be downloaded, returns null.
 *
 * @param entity the entity to get the download flow for
 * @param isEnterprise whether the the download will be executed in an enterprise environment
 * @returns the download flow that will be used for the current entity
 */
function getDownloadFlow(entity, isEnterprise) {
    let downloadFlow = null;
    if (canUseCreateReplica(entity)) {
        downloadFlow = "createReplica";
    }
    else if (canUseHubDownloadSystem(entity) && !isEnterprise) {
        const isExtractEnabled = !!getProp(entity, "extendedProps.serverExtractCapability");
        downloadFlow = isExtractEnabled ? "fgdb" : "paging";
    }
    else if (canUseExportImageFlow(entity)) {
        downloadFlow = "exportImage";
    }
    return downloadFlow;
}

export { canUseExportImageFlow as c, getDownloadFlow as g };
