import { g as getProp } from './get-prop-ec5be510.js';
import { c as canUseExportImageFlow } from './getDownloadFlow-6c6d04d5.js';
import { g as getCreateReplicaFormats, a as getFgdbJobFormats, b as getPagingJobFormats, c as getExportImageFormats, d as getDownloadConfiguration } from './getDownloadConfiguration-6cb6d32f.js';
import { i as isAdditionalResourceConfiguration, g as getAdditionalResourceIndex } from './utils-cde3af49.js';
import { c as canUseHubDownloadSystem, a as canUseCreateReplica } from './canUseHubDownloadSystem-a22afbb9.js';

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
        (canUseHubDownloadSystem(entity) || canUseCreateReplica(entity)));
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
    if (canUseCreateReplica(entity)) {
        result = getCreateReplicaFormats(entity);
    }
    else if (canUseHubDownloadSystem(entity)) {
        const isExtractEnabled = !!getProp(entity, "extendedProps.serverExtractCapability");
        result = isExtractEnabled ? getFgdbJobFormats() : getPagingJobFormats();
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
    else if (canUseExportImageFlow(entity)) {
        baseFormats = getExportImageFormats(entity);
    }
    // add additional resource links as static formats
    const additionalResources = getProp(entity, "extendedProps.additionalResources") || [];
    const additionalFormats = additionalResources.map(toStaticFormat);
    // Respect the order and visibility of the formats as configured for the entity
    const downloadConfiguration = getDownloadConfiguration(entity);
    return downloadConfiguration.formats.reduce((acc, format) => {
        if (!format.hidden) {
            let includedFormat;
            if (isAdditionalResourceConfiguration(format)) {
                const additionalResourceIndex = getAdditionalResourceIndex(format);
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

export { getHubDownloadApiFormats as a, canUseHubDownloadApi as c, getDownloadFormats as g };
