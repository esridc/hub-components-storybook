'use strict';

const index = require('./index-6f16fe65.js');
const types = require('./types-2810dd27.js');
const canUseHubDownloadSystem = require('./canUseHubDownloadSystem-5b330e55.js');

/**
 * Downloads a file from a static URL.
 * @param url URL to download file from
 */
function downloadFileFromUrl(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = ''; // Indicates that the filename should be derived from the URL
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/**
 * Downloads a blob to the browser.
 *
 * @param blob blob to download
 * @param filename name and extension of the file to download (e.g. "my-file.csv")
 */
function downloadFileFromBlob(blob, filename) {
  try {
    // Create a URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);
    // Create a link element and simulate a click to download the image
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  }
  catch (error) {
    console.error('Error downloading blob:', error);
  }
}
/**
 * Generates a unique identifier hash for a download job based on the provided options
 *
 * @param options Options to generate the job ID from
 * @returns a unique jobId
 */
async function calculateDownloadJobId(options) {
  if (!window.crypto.subtle) {
    // This should only happen if a web page is being served over HTTP instead of HTTPS
    throw new Error('Job ID generation not supported for insecure contexts');
  }
  const { itemId, format, layers, geometry, where, updateCache } = options;
  const stringifiedOptions = JSON.stringify({
    itemId,
    format,
    layers,
    geometry: geometry === null || geometry === void 0 ? void 0 : geometry.toJSON(),
    where,
    updateCache
  });
  const buffer = new TextEncoder().encode(stringifiedOptions);
  const hash = await window.crypto.subtle.digest('SHA-1', buffer);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
/**
 * Translates a download format to a human-readable name for telemetry reporting.
 * @param format format of the download
 * @returns common name for the format in a telemetry report
 */
function getTelemetryFormatName(format) {
  const keyToName = {
    // Image Service Formats
    [types.ServiceDownloadFormat.BIP]: "BIP",
    [types.ServiceDownloadFormat.BMP]: "BMP",
    [types.ServiceDownloadFormat.BSQ]: "BSQ",
    [types.ServiceDownloadFormat.GIF]: "GIF",
    [types.ServiceDownloadFormat.JPG]: "JPG",
    [types.ServiceDownloadFormat.JPG_PNG]: "JPGPNG",
    [types.ServiceDownloadFormat.LERC]: "LERC",
    [types.ServiceDownloadFormat.PNG]: "PNG",
    [types.ServiceDownloadFormat.PNG8]: "PNG8",
    [types.ServiceDownloadFormat.PNG24]: "PNG24",
    [types.ServiceDownloadFormat.PNG32]: "PNG32",
    [types.ServiceDownloadFormat.TIFF]: "TIFF",
    // Map & Feature Service Formats
    [types.ServiceDownloadFormat.CSV]: "CSV",
    [types.ServiceDownloadFormat.EXCEL]: "Excel",
    [types.ServiceDownloadFormat.FEATURE_COLLECTION]: "Feature Collection",
    [types.ServiceDownloadFormat.FILE_GDB]: "File Geodatabase",
    [types.ServiceDownloadFormat.GEOJSON]: "GeoJSON",
    [types.ServiceDownloadFormat.GEO_PACKAGE]: "GeoPackage",
    [types.ServiceDownloadFormat.JSON]: "JSON",
    [types.ServiceDownloadFormat.KML]: "KML",
    [types.ServiceDownloadFormat.SHAPEFILE]: "Shapefile",
    [types.ServiceDownloadFormat.SQLITE]: "SQLite Geodatabase",
  };
  return keyToName[format] || format;
}
/**
 * Returns the telemetry details for a successful download operation.
 * @param entity entity that was downloaded
 * @param fromCache whether the download was served from the cache
 * @returns the correct telemetry details string
 */
function getDownloadSuccessTelemetryDetails(entity, fromCache) {
  let result;
  if (canUseHubDownloadSystem.canUseCreateReplica(entity)) {
    result = index.dist.constants.details.EXPORT;
  }
  else if (canUseHubDownloadSystem.canUseHubDownloadSystem(entity)) {
    result = fromCache
      ? index.dist.constants.details.CACHE
      : index.dist.constants.details.GENERATE;
  }
  return result;
}

exports.calculateDownloadJobId = calculateDownloadJobId;
exports.downloadFileFromBlob = downloadFileFromBlob;
exports.downloadFileFromUrl = downloadFileFromUrl;
exports.getDownloadSuccessTelemetryDetails = getDownloadSuccessTelemetryDetails;
exports.getTelemetryFormatName = getTelemetryFormatName;
