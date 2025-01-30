import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { d as determineOwner, s as serializeItem, i as isBBox, j as bboxToString } from './get-f0caeb52.js';
import { a as appendCustomParams } from './append-custom-params-4bd856e5.js';
import { r as request } from './request-fa80ae40.js';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { createFolder } from "@esri/arcgis-rest-portal";
 * //
 * createFolder({
 *   title: 'Map Collection',
 *   authentication: userSession
 * })
 *   .then(response)
 * ```
 * Create a folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/create-folder.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that resolves with folder details once the folder has been created
 */
function createFolder(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var baseUrl = getPortalUrl(requestOptions) + "/content/users/" + owner;
        var url = baseUrl + "/createFolder";
        requestOptions.params = __assign({ title: requestOptions.title }, requestOptions.params);
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { createItemInFolder } from "@esri/arcgis-rest-portal";
 * //
 * createItemInFolder({
 *   item: {
 *     title: "The Amazing Voyage",
 *     type: "Web Map"
 *   },
 *   folderId: 'fe8',
 *   authentication
 * })
 * ```
 * Create an item in a folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-item.htm) for more information.
 *
 * @param requestOptions = Options for the request
 */
function createItemInFolder(requestOptions) {
    if (requestOptions.multipart && !requestOptions.filename) {
        return Promise.reject(new Error("The filename is required for a multipart request."));
    }
    return determineOwner(requestOptions).then(function (owner) {
        var baseUrl = getPortalUrl(requestOptions) + "/content/users/" + owner;
        var url = baseUrl + "/addItem";
        if (requestOptions.folderId) {
            url = baseUrl + "/" + requestOptions.folderId + "/addItem";
        }
        requestOptions.params = __assign(__assign({}, requestOptions.params), serializeItem(requestOptions.item));
        // convert extent, if present, into a string from bbox
        // processParams was previously doing this sort of work,
        // however now we need to let array of arrays through
        // Thus for extents we need to move this logic here
        if (requestOptions.params.extent && isBBox(requestOptions.params.extent)) {
            requestOptions.params.extent = bboxToString(requestOptions.params.extent);
        }
        // serialize the item into something Portal will accept
        var options = appendCustomParams(requestOptions, [
            "owner",
            "folderId",
            "file",
            "dataUrl",
            "text",
            "async",
            "multipart",
            "filename",
            "overwrite"
        ], {
            params: __assign({}, requestOptions.params)
        });
        return request(url, options);
    });
}
/**
 * ```js
 * import { createItem } from "@esri/arcgis-rest-portal";
 * //
 * createItem({
 *   item: {
 *     title: "The Amazing Voyage",
 *     type: "Web Map"
 *   },
 *   authentication
 * })
 * ```
 * Create an Item in the user's root folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that creates an item.
 */
function createItem(requestOptions) {
    // delegate to createItemInFolder placing in the root of the filestore
    var options = __assign({ folderId: null }, requestOptions);
    return createItemInFolder(options);
}

export { createFolder as a, createItem as c };
