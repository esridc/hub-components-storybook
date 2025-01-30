import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { d as determineOwner, s as serializeItem, i as isBBox, j as bboxToString } from './get-f0caeb52.js';
import { r as request } from './request-fa80ae40.js';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateItem } from "@esri/arcgis-rest-portal";
 * //
 * updateItem({
 *   item: {
 *     id: "3ef",
 *     description: "A three hour tour"
 *   },
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update an Item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that updates an item.
 */
function updateItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = requestOptions.folderId
            ? getPortalUrl(requestOptions) + "/content/users/" + owner + "/" + requestOptions.folderId + "/items/" + requestOptions.item.id + "/update"
            : getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.item.id + "/update";
        // serialize the item into something Portal will accept
        requestOptions.params = __assign(__assign({}, requestOptions.params), serializeItem(requestOptions.item));
        // convert extent, if present, into a string from bbox
        // processParams was previously doing this sort of work,
        // however now we need to let array of arrays through
        // Thus for extents we need to move this logic here
        if (requestOptions.params.extent && isBBox(requestOptions.params.extent)) {
            requestOptions.params.extent = bboxToString(requestOptions.params.extent);
        }
        /* istanbul ignore if */
        if (requestOptions.params.file &&
            requestOptions.params.file.constructor &&
            requestOptions.params.file.constructor.name === 'ReadStream') {
            // dataSize is not an official parameter for the ArcGIS REST API but is needed 
            // to encode the ReadStream with an appropriate length. This is to overcome 
            // the form-data library bug:
            // https://github.com/form-data/form-data/issues/508
            requestOptions.params.dataSize = requestOptions.dataSize;
        }
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { updateItemResource } from "@esri/arcgis-rest-portal";
 * //
 * updateItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that updates an item resource.
 */
function updateItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/updateResources";
        // mix in user supplied params
        requestOptions.params = __assign({ file: requestOptions.resource, fileName: requestOptions.name, resourcesPrefix: requestOptions.prefix, text: requestOptions.content }, requestOptions.params);
        // only override the access specified previously if 'private' is passed explicitly
        if (typeof requestOptions.private !== "undefined") {
            requestOptions.params.access = requestOptions.private
                ? "private"
                : "inherit";
        }
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { moveItem } from "@esri/arcgis-rest-portal";
 * //
 * moveItem({
 *   itemId: "3ef",
 *   folderId: "7c5",
 *   authentication: userSession
 * })
 * ```
 * Move an item to a folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/move-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that resolves with owner and folder details once the move has been completed
 */
function moveItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.itemId + "/move";
        var folderId = requestOptions.folderId;
        if (!folderId) {
            folderId = "/";
        }
        requestOptions.params = __assign({ folder: folderId }, requestOptions.params);
        return request(url, requestOptions);
    });
}

export { updateItem as a, moveItem as m, updateItemResource as u };
