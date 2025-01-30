'use strict';

const types = require('./types-097b54b1.js');
const logger = require('./logger-5db3d659.js');
const isService = require('./is-service-9b8238d2.js');

const FEATURE_SERVICE_URL_REGEX = /(feature)server(\/|\/(\d+))?$/i;
/**
 * Feature service / Doc Links Should not have data urls. Let"s exclude them from that.
 *
 * @export
 * @param {string} itemType What type of item is it?
 * @return {*}  {boolean}
 */
function shouldHaveDataUrl(itemType) {
    // Specifically we want to avoid FS / DL from having a data url.
    return !["Feature Service", "Document Link"].includes(itemType);
}
/**
 * Get the file name out of a url. Will return either the
 * hostname, or the pathname if it exists
 *
 * @export
 * @param {string} url Url to get a file name out of
 * @return {*}  {string}
 */
function getFileName(url) {
    let filename;
    try {
        const parsed = new URL(url);
        // If the URL pathname exists, return its last segment,
        // otherwise return the hostname
        filename =
            parsed.pathname !== "/"
                ? parsed.pathname.split("/").pop()
                : parsed.hostname;
    }
    catch (e) {
        throw new Error(`Error getting file name from data url`);
    }
    return filename;
}
/**
 * Is this a valid url?
 *
 * @param {string} url Url to validate
 * @return {*}  {boolean}
 */
function isUrl(url) {
    // Use try / catch as a simple string "test" will cause new URL() to throw an error.
    try {
        const result = new URL(url);
        // Cast to bool.
        return !!result;
    }
    catch (e) {
        logger.Logger.error(`Error parsing URL`);
        return false;
    }
}
/**
 * Tests if url string is a feature service / layer.
 *
 * @param {string} url URL to test
 * @return {*}  {boolean}
 */
function isFeatureService(url) {
    return FEATURE_SERVICE_URL_REGEX.test(url);
}
/**
 * Is the service a feature service AND is it a layer specifically
 *
 * @param {string} url
 * @return {*}  {boolean}
 */
function isFeatureLayer(url) {
    const results = url.match(FEATURE_SERVICE_URL_REGEX);
    return results && !!results[3];
}
/**
 * Gets item title from url as a fall back
 *
 * @param {string} url item url
 * @return {*}  {string}
 */
function getFeatureServiceTitle(url) {
    return url.match(/\/services\/(.+)\/(feature|map|image)server/i)[1];
}
/**
 * Gets item info out of a feature layer item.
 *
 * @export
 * @param url Item URL
 * @param body Item body.
 * @return Item info (title, description, extent, url)
 */
function getFeatureLayerItem(url, body) {
    return {
        title: body.name,
        description: body.description,
        extent: body.extent,
        url,
    };
}
/**
 * Gets item info out of a feature service response (which is not a specific layer)
 *
 * @export
 * @param {*} url
 * @param {*} body
 * @return {*}
 */
function getFeatureServiceItem(url, body) {
    const description = body.serviceDescription || body.description;
    const title = getFeatureServiceTitle(url);
    const extent = body.fullExtent || body.initialExtent;
    return { title, description, extent, url };
}
/**
 * Ping a non FS url and return response status && headers
 *
 * @export
 * @param {string} url Non FS URL
 * @return {*}  {Promise<{ ok: boolean, headers: Headers }>}
 */
async function pingUrl(url) {
    const response = await fetch(url, { method: "HEAD" });
    return {
        ok: response.ok,
        headers: response.headers,
    };
}
/**
 * Ping a FS URL and handle matters such as "hidden" success failures.
 *
 * @export
 * @param {string} url
 * @return {*}  {Promise<{ ok: boolean, item?: any }>}
 */
async function pingFeatureService(url) {
    // make sure the response is in json format
    const parsed = new URL(url);
    parsed.searchParams.set("f", "json");
    // Since the feature service can return a 200 response with error (e.g. for
    // non-existing layer), we can only request the full metadata by a GET, not HEAD
    // request
    const response = await fetch(parsed.href);
    if (!response.ok) {
        return { ok: false };
    }
    const body = await response.json();
    // Exit if the request returns an error
    if (body.error) {
        return { ok: false };
    }
    const getItem = isFeatureLayer(url)
        ? getFeatureLayerItem
        : getFeatureServiceItem;
    const item = getItem(url, body);
    return {
        ok: true,
        item,
    };
}
function detectDataTypeFromHeader(headers) {
    let contentType = headers.get("Content-Type");
    let dataType;
    if (!contentType) {
        return;
    }
    // Only get the "media-type"
    contentType = contentType.split(";").shift();
    if (contentType === "text/csv") {
        dataType = types.ItemType.CSV;
    }
    else if (contentType === "application/vnd.ms-excel" ||
        contentType ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        dataType = types.ItemType["Microsoft Excel"];
    }
    else if (contentType === "application/pdf") {
        dataType = types.ItemType.PDF;
    }
    else if (contentType === "image/jpeg" ||
        contentType === "image/jpg" ||
        contentType === "image/png") {
        dataType = types.ItemType.Image;
    }
    else if (contentType === "application/geo+json") {
        dataType = types.ItemType.GeoJson;
    }
    return dataType;
}
function detectDataTypeFromExtension(url) {
    const contentType = url.toLowerCase().split(".").pop();
    let dataType;
    if (contentType === "csv") {
        dataType = types.ItemType.CSV;
    }
    else if (contentType === "xls" || contentType === "xlsx") {
        dataType = types.ItemType["Microsoft Excel"];
    }
    else if (contentType === "pdf") {
        dataType = types.ItemType.PDF;
    }
    else if (contentType === "jpeg" ||
        contentType === "jpg" ||
        contentType === "png") {
        dataType = types.ItemType.Image;
    }
    else if (contentType === "geojson") {
        dataType = types.ItemType.GeoJson;
    }
    return dataType;
}

/**
 * Takes in a URL and validates it based on valid url, type of item, etc
 *
 * @export
 * @param {string} url
 * @return {*}  {Promise<any>}
 */
async function validateUrl(url) {
    // If URL doesn't pass then exit out immediately.
    if (!isUrl(url)) {
        return {
            pass: false,
            error: "invalidFormat",
        };
    }
    // Check if it's a FS, Map service, or image service
    const isFeatureServiceUrl = isFeatureService(url);
    const isServiceUrl = isService.isService(url);
    if (isServiceUrl && !isFeatureServiceUrl) {
        return {
            pass: false,
            error: "invalidFormat",
        };
    }
    // Content type which can be determined bby the url file extnesion or the request response header
    let type;
    let item;
    let pingResult = {};
    try {
        pingResult = isFeatureServiceUrl
            ? await pingFeatureService(url)
            : await pingUrl(url);
        // return an error if the response is not okay
        if (!pingResult.ok) {
            return {
                pass: false,
                error: "invalidUrl",
            };
        }
    }
    catch (e) {
        // TODO: This is tricky. The fetch() API rejects when a network error
        // happens. This error can be a CORS error, or a 404 error, or a timeout
        // error. While an error like 404 does suggest a bad URL, the CORS occurs
        // because this is a front-end request and the file is likely accessible by
        // the server. Unfortunately, the error doesn't have any information about
        // underline failure type. For now, the network failure is ignored, so the
        // user can paste a URL from any domain and avoid the CORS issue.
        logger.Logger.error(`error requesting url`);
    }
    // Use the metadata from the ping response if exists, otherwise guess the file
    // name from the URL
    if (pingResult.item) {
        item = pingResult.item;
    }
    else {
        item = { title: getFileName(url), url };
    }
    if (pingResult.headers) {
        type = detectDataTypeFromHeader(pingResult.headers);
    }
    if (isFeatureServiceUrl) {
        type = types.ItemType["Feature Service"];
    }
    else if (!type) {
        // Guess the data type from the extension
        type = detectDataTypeFromExtension(url);
    }
    if (type) {
        item.type = type;
    }
    if (item.type && shouldHaveDataUrl(item.type)) {
        item.dataUrl = item.url;
    }
    return {
        pass: true,
        // The type may or may not be true
        type,
        // fetched / calculated item
        item,
    };
}

exports.validateUrl = validateUrl;
