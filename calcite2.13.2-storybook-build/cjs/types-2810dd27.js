'use strict';

/**
 * This hash map was defined to support the previous implementation of the export item flow.
 * We are currently working on a new implementation that will replace this hash map, but we
 * need to keep this around for now to support the existing implementation.
 */
const PORTAL_EXPORT_TYPES = {
    csv: {
        name: "CSV",
        itemTypes: ["CSV", "CSV Collection"],
        supportsProjection: true,
    },
    kml: {
        name: "KML",
        itemTypes: ["KML", "KML Collection"],
        supportsProjection: false,
    },
    shapefile: {
        name: "Shapefile",
        itemTypes: ["Shapefile"],
        supportsProjection: true,
    },
    fileGeodatabase: {
        name: "File Geodatabase",
        itemTypes: ["File Geodatabase"],
        supportsProjection: true,
    },
    geojson: {
        name: "GeoJson",
        itemTypes: ["GeoJson"],
        supportsProjection: false,
    },
    excel: {
        name: "Excel",
        itemTypes: ["Microsoft Excel"],
        supportsProjection: true,
    },
    featureCollection: {
        name: "Feature Collection",
        itemTypes: ["Feature Collection"],
        supportsProjection: true,
    },
};
/**
 * Comprehensive enum of all the download formats that are supported by service-backed items across the ArcGIS platform.
 */
exports.ServiceDownloadFormat = void 0;
(function (ServiceDownloadFormat) {
    // Image Service Formats
    ServiceDownloadFormat["BMP"] = "bmp";
    ServiceDownloadFormat["GIF"] = "gif";
    ServiceDownloadFormat["JPG"] = "jpg";
    ServiceDownloadFormat["JPG_PNG"] = "jpgpng";
    ServiceDownloadFormat["PNG"] = "png";
    ServiceDownloadFormat["PNG8"] = "png8";
    ServiceDownloadFormat["PNG24"] = "png24";
    ServiceDownloadFormat["TIFF"] = "tiff";
    ServiceDownloadFormat["PNG32"] = "png32";
    ServiceDownloadFormat["BIP"] = "bip";
    ServiceDownloadFormat["BSQ"] = "bsq";
    ServiceDownloadFormat["LERC"] = "lerc";
    // Map & Feature Service Formats
    ServiceDownloadFormat["CSV"] = "csv";
    ServiceDownloadFormat["EXCEL"] = "excel";
    ServiceDownloadFormat["FEATURE_COLLECTION"] = "featureCollection";
    ServiceDownloadFormat["FILE_GDB"] = "filegdb";
    ServiceDownloadFormat["GEOJSON"] = "geojson";
    ServiceDownloadFormat["GEO_PACKAGE"] = "geoPackage";
    ServiceDownloadFormat["JSON"] = "json";
    ServiceDownloadFormat["KML"] = "kml";
    ServiceDownloadFormat["SHAPEFILE"] = "shapefile";
    ServiceDownloadFormat["SQLITE"] = "sqlite";
})(exports.ServiceDownloadFormat || (exports.ServiceDownloadFormat = {}));
/**
 * Human-readable status of a download operation. Operation specific statuses
 * should be converted to one of these statuses before being reported to the user.
 */
exports.DownloadOperationStatus = void 0;
(function (DownloadOperationStatus) {
    DownloadOperationStatus["PENDING"] = "pending";
    DownloadOperationStatus["PROCESSING"] = "processing";
    DownloadOperationStatus["CONVERTING"] = "converting";
    DownloadOperationStatus["COMPLETED"] = "completed";
    DownloadOperationStatus["FAILED"] = "failed";
})(exports.DownloadOperationStatus || (exports.DownloadOperationStatus = {}));
/**
 * Error class for reporting well-known download errors that occur during the download process.
 */
class ArcgisHubDownloadError extends Error {
    constructor(options) {
        super(options.rawMessage);
        this.name = "ArcgisHubDownloadError";
        this.message = options.rawMessage;
        this.messageId = options.messageId;
        this.operation = options.operation;
    }
}

exports.ArcgisHubDownloadError = ArcgisHubDownloadError;
exports.PORTAL_EXPORT_TYPES = PORTAL_EXPORT_TYPES;
