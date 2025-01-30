import { g as getProp } from './get-prop-ec5be510.js';
import { g as getDownloadFlow } from './getDownloadFlow-6c6d04d5.js';
import { S as ServiceDownloadFormat } from './types-303cd4d6.js';

/**
 * Formats supported by the /exportImage endpoint of Image Services.
 * Listed in the default order of appearance in the UI.
 */
const EXPORT_IMAGE_FORMATS = [
    // Temporary exclusion until we hammer out the details of how to support it.
    // Unlike jpg or png, tiff downloads require exact geospatial parameters to be set.
    // ServiceDownloadFormat.TIFF,
    ServiceDownloadFormat.JPG,
    ServiceDownloadFormat.PNG,
    ServiceDownloadFormat.PNG8,
    ServiceDownloadFormat.PNG24,
    ServiceDownloadFormat.PNG32,
];
/**
 * Formats supported by the paging operation endpoint of the Hub Download API.
 * Listed in the default order of appearance in the UI.
 */
const HUB_PAGING_JOB_FORMATS = [
    ServiceDownloadFormat.CSV,
    ServiceDownloadFormat.SHAPEFILE,
    ServiceDownloadFormat.GEOJSON,
    ServiceDownloadFormat.KML,
];
/**
 * Formats supported by the fgdb operation endpoint of the Hub Download API.
 * Listed in the default order of appearance in the UI.
 */
const HUB_FGDB_JOB_FORMATS = [
    ServiceDownloadFormat.CSV,
    ServiceDownloadFormat.SHAPEFILE,
    ServiceDownloadFormat.GEOJSON,
    ServiceDownloadFormat.KML,
    ServiceDownloadFormat.FILE_GDB,
];
/**
 * Known formats supported by the /createReplica endpoint of the Hub Download API.
 * Listed in the default order of appearance in the UI.
 * NOTE: this is may be incomplete and should be updated as needed.
 */
const CREATE_REPLICA_FORMATS = [
    ServiceDownloadFormat.CSV,
    ServiceDownloadFormat.SHAPEFILE,
    ServiceDownloadFormat.GEOJSON,
    ServiceDownloadFormat.KML,
    ServiceDownloadFormat.FILE_GDB,
    ServiceDownloadFormat.FEATURE_COLLECTION,
    ServiceDownloadFormat.EXCEL,
    ServiceDownloadFormat.GEO_PACKAGE,
    ServiceDownloadFormat.SQLITE,
    ServiceDownloadFormat.JSON,
];

/**
 * @private
 * Returns all the download formats that are defined by the service's /createReplica endpoint.
 *
 * @param entity Hosted Feature Service entity to return download formats for
 * @returns available download formats for the entity
 */
function getCreateReplicaFormats(entity) {
    // TODO: Change to use `extendedProps.serverExtractFormats`
    const allFormats = entity.serverExtractFormats || [];
    // List recognized formats in the order they are defined in CREATE_REPLICA_FORMATS
    const recognizedFormats = CREATE_REPLICA_FORMATS.filter((format) => allFormats.includes(format));
    // List any unrecognized formats (we'll append these to the end of the final array)
    const unrecognizedFormats = allFormats.filter((format) => !CREATE_REPLICA_FORMATS.includes(format));
    return [...recognizedFormats, ...unrecognizedFormats].map((format) => ({
        type: "dynamic",
        format: format,
    }));
}

/**
 * @private
 * Returns all the download formats that are exposed by an Image Service via the /exportImage operation.
 */
function getExportImageFormats(entity) {
    const serverVersion = getProp(entity, "extendedProps.server.currentVersion") || 0;
    // NOTE: We have to imperatively exclude formats based on the server version
    // because there is no other way to determine which formats are supported.
    // See the EXPORT_IMAGE_FORMATS constant for notes on individual formats.
    const supportedFormats = (serverVersion < 10.2
        ? EXPORT_IMAGE_FORMATS.filter((f) => f !== ServiceDownloadFormat.PNG32)
        : EXPORT_IMAGE_FORMATS);
    return supportedFormats.map((format) => ({
        type: "dynamic",
        format,
    }));
}

/**
 * @private
 * Returns all the download formats that are available for the Hub Download API's paging job operation.
 * @returns available download formats for the paging job operation
 */
function getPagingJobFormats() {
    return HUB_PAGING_JOB_FORMATS.map((format) => ({ type: "dynamic", format }));
}

/**
 * @private
 * Returns all the download formats that are available for the Hub Download API's fgdb job operation.
 * @returns available download formats for the fgdb job operation
 */
function getFgdbJobFormats() {
    return HUB_FGDB_JOB_FORMATS.map((format) => ({ type: "dynamic", format }));
}

/**
 * @private
 * Get the download formats for a given download flow and entity.
 *
 * @param downloadFlow DownloadFlowType
 * @param entity IHubEditableContent
 * @returns IDynamicDownloadFormat[]
 */
function getDownloadFormatsByFlow(downloadFlow, entity) {
    let downloadFormats = [];
    const actionsByFlow = {
        createReplica: () => {
            downloadFormats = getCreateReplicaFormats(entity);
        },
        paging: () => {
            downloadFormats = getPagingJobFormats();
        },
        fgdb: () => {
            downloadFormats = getFgdbJobFormats();
        },
        exportImage: () => {
            downloadFormats = getExportImageFormats(entity);
        },
    };
    actionsByFlow[downloadFlow] && actionsByFlow[downloadFlow]();
    return downloadFormats;
}

/**
 * Returns the download configuration for an entity at this moment in time.
 *
 * If no configuration exists, a default configuration is returned based on the entity's current download flow.
 * If a configuration exists but is no longer valid, the default configuration will also be returned.
 *
 * @param entity entity to get download configuration for
 * @returns the current download configuration for the entity
 */
function getDownloadConfiguration(entity) {
    // TODO: account for enterprise environments
    const downloadFlow = getDownloadFlow(entity);
    const serverFormats = getDownloadFormatsByFlow(downloadFlow, entity);
    const additionalResources = getProp(entity, "extendedProps.additionalResources") || [];
    const existingConfiguration = getProp(entity, "extendedProps.downloads");
    // Base combined default formats
    const combinedDefaultFormats = serverFormats.map((f) => {
        return {
            key: f.format,
            hidden: false,
        };
    });
    additionalResources.forEach((f, idx) => {
        combinedDefaultFormats.push({
            key: `additionalResource::${idx}`,
            hidden: false,
        });
    });
    const shouldUseExistingConfiguration = existingConfiguration && existingConfiguration.flowType === downloadFlow;
    // Existing configuration matches the current flow
    if (shouldUseExistingConfiguration) {
        const missingDefaultFormats = combinedDefaultFormats.filter((f) => {
            return !existingConfiguration.formats.find((df) => df.key === f.key);
        });
        const validConfiguredFormats = existingConfiguration.formats.filter((f) => {
            return combinedDefaultFormats.find((df) => df.key === f.key);
        });
        return {
            flowType: downloadFlow,
            formats: [...validConfiguredFormats, ...missingDefaultFormats],
        };
    }
    // Existing configuration does not match the current flow
    return {
        flowType: downloadFlow,
        formats: combinedDefaultFormats,
    };
}

export { getFgdbJobFormats as a, getPagingJobFormats as b, getExportImageFormats as c, getDownloadConfiguration as d, getCreateReplicaFormats as g };
