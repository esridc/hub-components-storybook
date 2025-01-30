import { D as DownloadOperationStatus, S as ServiceDownloadFormat } from './types-303cd4d6.js';
import { H as HubError } from './HubError-e26c5610.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { r as request } from './request-fa80ae40.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';

/**
 * @private
 *
 * Fetches a download file url from an Image Service via the exportImage endpoint.
 *
 * @param options options for refining / filtering the resulting download file
 * @returns a blob containing the download file
 */
async function fetchExportImageDownloadFile(options) {
    validateOptions(options);
    const { entity, format, context, progressCallback } = options;
    progressCallback && progressCallback(DownloadOperationStatus.PENDING);
    const extent = getExportImageExtent(options);
    const { xmin, xmax, ymin, ymax } = extent;
    // TODO: do we need to handle latestWkid as well?
    const { wkid } = extent.spatialReference;
    const requestOptions = Object.assign({}, context.requestOptions);
    requestOptions.httpMethod = "GET";
    requestOptions.params = {
        bbox: `${xmin},${ymin},${xmax},${ymax}`,
        bboxSR: `${wkid}`,
        f: "image",
        format,
        mosaicRule: '{"ascending":true,"mosaicMethod":"esriMosaicNorthwest","mosaicOperation":"MT_FIRST"}',
    };
    // TODO: Figure out whether we want to leverage the server's maxImageWidth and maxImageHeight.
    // While it results in higher quality images, it also creates a lot of variability in the result
    // when we filter an image by extent.
    //
    // const { maxImageHeight, maxImageWidth } =
    //   getProp(entity, "extendedProps.server") || {};
    // if (maxImageWidth && maxImageHeight) {
    //   requestOptions.params.size = `${maxImageWidth},${maxImageHeight}`;
    // }
    const blob = await request(`${entity.url}/exportImage`, requestOptions);
    return {
        type: "blob",
        blob,
        filename: getBlobFilename(entity, format),
    };
}
function validateOptions(options) {
    const { geometry } = options;
    if (geometry && geometry.type !== "extent") {
        throw new HubError("fetchExportImageDownloadFileUrl", "Only extent geometric filters are supported for this type of download");
    }
}
function getExportImageExtent(options) {
    const { entity, geometry } = options;
    const serverExtent = getProp(entity, "extendedProps.server.extent");
    // TODO: Factor in entity.extent if it exists AND is a valid 4326 bbox
    let result = null;
    if (geometry) {
        result = geometry;
    }
    else if (serverExtent) {
        result = serverExtent;
    }
    if (!result) {
        throw new HubError("fetchExportImageDownloadFileUrl", "Extent required for this download operation");
    }
    return result;
}
function getBlobFilename(entity, format) {
    const name = entity.name || getProp(entity, "extendedProps.server.name");
    const extension = format.includes(ServiceDownloadFormat.PNG)
        ? // NOTE: the png family of formats (png8, png24, etc.) share the same extension
            ServiceDownloadFormat.PNG
        : format;
    return `${name}.${extension}`;
}

export { fetchExportImageDownloadFile };
