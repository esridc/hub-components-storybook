'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');
const canUseHubDownloadSystem = require('./canUseHubDownloadSystem-5b330e55.js');
const types = require('./types-097b54b1.js');

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
    return (type === types.ItemType["Image Service"] &&
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
    if (canUseHubDownloadSystem.canUseCreateReplica(entity)) {
        downloadFlow = "createReplica";
    }
    else if (canUseHubDownloadSystem.canUseHubDownloadSystem(entity) && !isEnterprise) {
        const isExtractEnabled = !!getProp.getProp(entity, "extendedProps.serverExtractCapability");
        downloadFlow = isExtractEnabled ? "fgdb" : "paging";
    }
    else if (canUseExportImageFlow(entity)) {
        downloadFlow = "exportImage";
    }
    return downloadFlow;
}

exports.canUseExportImageFlow = canUseExportImageFlow;
exports.getDownloadFlow = getDownloadFlow;
