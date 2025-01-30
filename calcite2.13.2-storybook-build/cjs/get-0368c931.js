'use strict';

const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');
const appendCustomParams = require('./append-custom-params-0f5d0fe2.js');

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Serialize an item and its data into a json format accepted by the Portal API for create and update operations
 *
 * @param item Item to be serialized
 * @returns a formatted json object to be sent to Portal
 */
function serializeItem(item) {
    // create a clone so we're not messing with the original
    var clone = JSON.parse(JSON.stringify(item));
    // binary data needs POSTed as a `file`
    // JSON object literals should be passed as `text`.
    if (clone.data) {
        (typeof Blob !== "undefined" && item.data instanceof Blob) ||
            // Node.js doesn't implement Blob
            item.data.constructor.name === "ReadStream"
            ? (clone.file = item.data)
            : (clone.text = item.data);
        delete clone.data;
    }
    return clone;
}
/**
 * `requestOptions.owner` is given priority, `requestOptions.item.owner` will be checked next. If neither are present, `authentication.getUserName()` will be used instead.
 */
function determineOwner(requestOptions) {
    if (requestOptions.owner) {
        return Promise.resolve(requestOptions.owner);
    }
    else if (requestOptions.item && requestOptions.item.owner) {
        return Promise.resolve(requestOptions.item.owner);
    }
    else if (requestOptions.authentication &&
        requestOptions.authentication.getUsername) {
        return requestOptions.authentication.getUsername();
    }
    else {
        return Promise.reject(new Error("Could not determine the owner of this item. Pass the `owner`, `item.owner`, or `authentication` option."));
    }
}
/**
 * checks if the extent is a valid BBox (2 element array of coordinate pair arrays)
 * @param extent
 * @returns
 */
function isBBox(extent) {
    return (Array.isArray(extent) &&
        Array.isArray(extent[0]) &&
        Array.isArray(extent[1]));
}
/**
 * Given a Bbox, convert it to a string. Some api endpoints expect a string
 *
 * @param {BBox} extent
 * @return {*}  {string}
 */
function bboxToString(extent) {
    return extent.join(",");
}

// eslint-disable-next-line no-control-regex
var CONTROL_CHAR_MATCHER = /[\x00-\x1F\x7F-\x9F\xA0]/g;
/**
 * Returns a new string with all control characters removed.
 *
 * Doesn't remove characters from input string.
 *
 * @param str - the string to scrub
 */
function scrubControlChars(str) {
    return str.replace(CONTROL_CHAR_MATCHER, "");
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```
 * import { getItem } from "@esri/arcgis-rest-portal";
 * //
 * getItem("ae7")
 *   .then(response);
 * // or
 * getItem("ae7", { authentication })
 *   .then(response)
 * ```
 * Get an item by id. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item.htm) for more information.
 *
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the data from the response.
 */
function getItem(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions);
    // default to a GET request
    var options = tslib_es6.__assign({ httpMethod: "GET" }, requestOptions);
    return request.request(url, options);
}
/**
 * Get the fully qualified base URL to the REST end point for an item.
 * @param id Item Id
 * @param portalUrlOrRequestOptions a portal URL or request options
 * @returns URL to the item's REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{id}`
 */
var getItemBaseUrl = function (id, portalUrlOrRequestOptions) {
    var portalUrl = typeof portalUrlOrRequestOptions === "string"
        ? portalUrlOrRequestOptions
        : getPortalUrl.getPortalUrl(portalUrlOrRequestOptions);
    return portalUrl + "/content/items/" + id;
};
/**
 * ```
 * import { getItemData } from "@esri/arcgis-rest-portal";
 * //
 * getItemData("ae7")
 *   .then(response)
 * // or
 * getItemData("ae7", { authentication })
 *   .then(response)
 * ```
 * Get the /data for an item. If no data exists, returns `undefined`. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item-data.htm) for more information.
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the json data for the item.
 */
function getItemData(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions) + "/data";
    // default to a GET request
    var options = tslib_es6.__assign({ httpMethod: "GET", params: {} }, requestOptions);
    if (options.file) {
        options.params.f = null;
    }
    return request.request(url, options).catch(function (err) {
        /* if the item doesn't include data, the response will be empty
           and the internal call to response.json() will fail */
        var emptyResponseErr = RegExp(/The string did not match the expected pattern|(Unexpected end of (JSON input|data at line 1 column 1))/i);
        /* istanbul ignore else */
        if (emptyResponseErr.test(err.message)) {
            return;
        }
        else
            throw err;
    });
}
/**
 * ```
 * import { getRelatedItems } from "@esri/arcgis-rest-portal";
 * //
 * getRelatedItems({
 *   id: "ae7",
 *   relationshipType: "Service2Layer" // or several ["Service2Layer", "Map2Area"]
 * })
 *   .then(response)
 * ```
 * Get the related items. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/related-items.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get some item resources.
 */
function getRelatedItems(requestOptions) {
    var url = getItemBaseUrl(requestOptions.id, requestOptions) + "/relatedItems";
    var options = tslib_es6.__assign({ httpMethod: "GET", params: {
            direction: requestOptions.direction
        } }, requestOptions);
    if (typeof requestOptions.relationshipType === "string") {
        options.params.relationshipType = requestOptions.relationshipType;
    }
    else {
        options.params.relationshipTypes = requestOptions.relationshipType;
    }
    delete options.direction;
    delete options.relationshipType;
    return request.request(url, options);
}
/**
 * Get the resources associated with an item
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get some item resources.
 */
function getItemResources(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions) + "/resources";
    // Mix in num:1000 with any user supplied params
    // Key thing - we don't want to mutate the passed in requestOptions
    // as that may be used in other (subsequent) calls in the course
    // of a long promise chains
    var options = tslib_es6.__assign({}, requestOptions);
    options.params = tslib_es6.__assign({ num: 1000 }, options.params);
    return request.request(url, options);
}
/**
 * ```js
 * import { getItemResource } from "@esri/arcgis-rest-portal";
 *
 * // Parses contents as blob by default
 * getItemResource("3ef", { fileName: "resource.jpg", ...})
 *  .then(resourceContents => {});
 *
 * // Can override parse method
 * getItemResource("3ef", { fileName: "resource.json", readAs: 'json', ...})
 *  .then(resourceContents => {});
 *
 * // Get the response object instead
 * getItemResource("3ef",{ rawResponse: true, fileName: "resource.json" })
 *  .then(response => {})
 * ```
 * Fetches an item resource and optionally parses it to the correct format.
 *
 * Note: provides JSON parse error protection by sanitizing out any unescaped control
 * characters before parsing that would otherwise cause an error to be thrown
 *
 * @param {string} itemId
 * @param {IGetItemResourceOptions} requestOptions
 */
function getItemResource(itemId, requestOptions) {
    var readAs = requestOptions.readAs || 'blob';
    return getItemFile(itemId, "/resources/" + requestOptions.fileName, readAs, requestOptions);
}
/**
 * ```js
 * import { getItemGroups } from "@esri/arcgis-rest-portal";
 * //
 * getItemGroups("30e5fe3149c34df1ba922e6f5bbf808f")
 *   .then(response)
 * ```
 * Lists the groups of which the item is a part, only showing the groups that the calling user can access. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/groups.htm) for more information.
 *
 * @param id - The Id of the item to query group association for.
 * @param requestOptions - Options for the request
 * @returns A Promise to get some item groups.
 */
function getItemGroups(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions) + "/groups";
    return request.request(url, requestOptions);
}
/**
 * ```js
 * import { getItemStatus } from "@esri/arcgis-rest-portal";
 * //
 * getItemStatus({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Inquire about status when publishing an item, adding an item in async mode, or adding with a multipart upload. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/status.htm) for more information.
 *
 * @param id - The Id of the item to get status for.
 * @param requestOptions - Options for the request
 * @returns A Promise to get the item status.
 */
function getItemStatus(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/status";
        var options = appendCustomParams.appendCustomParams(requestOptions, ["jobId", "jobType"], { params: tslib_es6.__assign({}, requestOptions.params) });
        return request.request(url, options);
    });
}
/**
 * ```
 * import { getItemInfo } from "@esri/arcgis-rest-portal";
 * // get the "Info Card" for the item
 * getItemInfo("ae7")
 *   .then(itemInfoXml) // XML document as a string
 * // or get the contents of a specific file
 * getItemInfo("ae7", { fileName: "form.json", readAs: "json", authentication })
 *   .then(formJson) // JSON document as JSON
 * ```
 * Get an info file for an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item-info-file.htm) for more information.
 * @param id - Item Id
 * @param requestOptions - Options for the request, including the file name which defaults to `iteminfo.xml`.
 * If the file is not a text file (XML, HTML, etc) you will need to specify the `readAs` parameter
 * @returns A Promise that will resolve with the contents of the info file for the item.
 */
function getItemInfo(id, requestOptions) {
    var _a = requestOptions || {}, _b = _a.fileName, fileName = _b === void 0 ? "iteminfo.xml" : _b, _c = _a.readAs, readAs = _c === void 0 ? "text" : _c;
    var options = tslib_es6.__assign({ httpMethod: "GET" }, requestOptions);
    return getItemFile(id, "/info/" + fileName, readAs, options);
}
/**
 * ```
 * import { getItemMetadata } from "@esri/arcgis-rest-portal";
 * // get the metadata for the item
 * getItemMetadata("ae7")
 *   .then(itemMetadataXml) // XML document as a string
 * // or with additional request options
 * getItemMetadata("ae7", { authentication })
 *   .then(itemMetadataXml) // XML document as a string
 * ```
 * Get the standard formal metadata XML file for an item (`/info/metadata/metadata.xml`)
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the contents of the metadata file for the item as a string.
 */
function getItemMetadata(id, requestOptions) {
    var options = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions), { fileName: "metadata/metadata.xml" });
    return getItemInfo(id, options);
}
// overrides request()'s default behavior for reading the response
// which is based on `params.f` and defaults to JSON
// Also adds JSON parse error protection by sanitizing out any unescaped control characters before parsing
function getItemFile(id, 
// NOTE: fileName should include any folder/subfolders
fileName, readMethod, requestOptions) {
    var url = "" + getItemBaseUrl(id, requestOptions) + fileName;
    // preserve escape hatch to let the consumer read the response
    // and ensure the f param is not appended to the query string
    var options = tslib_es6.__assign({ params: {} }, requestOptions);
    var justReturnResponse = options.rawResponse;
    options.rawResponse = true;
    options.params.f = null;
    return request.request(url, options).then(function (response) {
        if (justReturnResponse) {
            return response;
        }
        return readMethod !== 'json'
            ? response[readMethod]()
            : response.text().then(function (text) { return JSON.parse(scrubControlChars(text)); });
    });
}

exports.bboxToString = bboxToString;
exports.determineOwner = determineOwner;
exports.getItem = getItem;
exports.getItemData = getItemData;
exports.getItemGroups = getItemGroups;
exports.getItemInfo = getItemInfo;
exports.getItemMetadata = getItemMetadata;
exports.getItemResource = getItemResource;
exports.getItemResources = getItemResources;
exports.getItemStatus = getItemStatus;
exports.getRelatedItems = getRelatedItems;
exports.isBBox = isBBox;
exports.serializeItem = serializeItem;
