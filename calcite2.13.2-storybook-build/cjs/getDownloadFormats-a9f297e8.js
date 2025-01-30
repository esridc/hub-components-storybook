'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');
const getDownloadFlow = require('./getDownloadFlow-94a34207.js');
const getDownloadConfiguration = require('./getDownloadConfiguration-1ed2582d.js');
const utils = require('./utils-5a74b66e.js');
const canUseHubDownloadSystem = require('./canUseHubDownloadSystem-5b330e55.js');

/**
 * Determines if the Hub Download API can be used for the given entity.
 * @param entity entity to check if Hub Download API can be used
 * @param context ArcGIS context
 * @returns whether the Hub Download API can be used
 */
function canUseHubDownloadApi(entity, context) {
    var _a;
    const isDownloadApiAvailable = ((_a = context.serviceStatus) === null || _a === void 0 ? void 0 : _a["hub-downloads"]) === "online";
    return (isDownloadApiAvailable &&
        (canUseHubDownloadSystem.canUseHubDownloadSystem(entity) || canUseHubDownloadSystem.canUseCreateReplica(entity)));
}

/**
 * Returns all the formats that are available for download via the Hub Download API for a given entity.
 * Formats will vary from entity to entity depending on actual operation that the Hub Download API will
 * perform under the hood (e.g., hitting /createReplica or paging through the service's features).
 *
 * @param entity Service entity to return download formats for
 * @returns available download formats for the entity
 */
function getHubDownloadApiFormats(entity) {
    let result = [];
    if (canUseHubDownloadSystem.canUseCreateReplica(entity)) {
        result = getDownloadConfiguration.getCreateReplicaFormats(entity);
    }
    else if (canUseHubDownloadSystem.canUseHubDownloadSystem(entity)) {
        const isExtractEnabled = !!getProp.getProp(entity, "extendedProps.serverExtractCapability");
        result = isExtractEnabled ? getDownloadConfiguration.getFgdbJobFormats() : getDownloadConfiguration.getPagingJobFormats();
    }
    return result;
}

/**
 * Gets available download formats / additional resources for the given entity in the order they have been configured.
 * If a format has been configured to be hidden, it will not be included in the results.
 *
 * @param options options to refine / filter the results of the getDownloadFormats operation
 * @returns The available download formats and additional resources
 */
function getDownloadFormats(options) {
    const { entity, context } = options;
    // get the base formats for the item
    let baseFormats = [];
    // TODO: use typescript to enforce a branch for each flow type
    if (canUseHubDownloadApi(entity, context)) {
        baseFormats = getHubDownloadApiFormats(entity);
    }
    else if (getDownloadFlow.canUseExportImageFlow(entity)) {
        baseFormats = getDownloadConfiguration.getExportImageFormats(entity);
    }
    // add additional resource links as static formats
    const additionalResources = getProp.getProp(entity, "extendedProps.additionalResources") || [];
    const additionalFormats = additionalResources.map(toStaticFormat);
    // Respect the order and visibility of the formats as configured for the entity
    const downloadConfiguration = getDownloadConfiguration.getDownloadConfiguration(entity);
    return downloadConfiguration.formats.reduce((acc, format) => {
        if (!format.hidden) {
            let includedFormat;
            if (utils.isAdditionalResourceConfiguration(format)) {
                const additionalResourceIndex = utils.getAdditionalResourceIndex(format);
                includedFormat = additionalFormats[additionalResourceIndex];
            }
            else {
                baseFormats.forEach((baseFormat) => {
                    if (baseFormat.format === format.key) {
                        includedFormat = baseFormat;
                    }
                });
            }
            acc.push(includedFormat);
        }
        return acc;
    }, []);
}
function toStaticFormat(resource) {
    return {
        type: "static",
        label: resource.name ||
            (resource.isDataSource && `{{dataSource:translate}}`) || // if the additional resource is the datasource
            `{{noTitle:translate}}`,
        url: resource.url,
    };
}

exports.canUseHubDownloadApi = canUseHubDownloadApi;
exports.getDownloadFormats = getDownloadFormats;
exports.getHubDownloadApiFormats = getHubDownloadApiFormats;
