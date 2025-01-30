'use strict';

const tslib_es6$1 = require('./tslib.es6-b6cfa7d7.js');
const extent = require('./extent-715f7c8d.js');
const create = require('./create-6279e23e.js');
const batch = require('./batch-180e8ec7.js');
const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const get = require('./get-0368c931.js');
const appendCustomParams = require('./append-custom-params-0f5d0fe2.js');
const request = require('./request-67da3c71.js');
const access = require('./access-049994c9.js');
const isUpdateGroup = require('./is-update-group-36bf5d24.js');
const failSafe = require('./fail-safe-33c35b7f.js');
const shareItemWithGroup = require('./share-item-with-group-6c27286f.js');

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addItemPart } from "@esri/arcgis-rest-portal";
 * //
 * addItemPart({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   file: data,
 *   partNum: 1,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add Item Part allows the caller to upload a file part when doing an add or update item operation in multipart mode. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-item-part.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add the item part status.
 */
function addItemPart(requestOptions) {
    var partNum = requestOptions.partNum;
    if (!Number.isInteger(partNum) || partNum < 1 || partNum > 10000) {
        return Promise.reject(new Error('The part number must be an integer between 1 to 10000, inclusive.'));
    }
    return get.determineOwner(requestOptions).then(function (owner) {
        // AGO adds the "partNum" parameter in the query string, not in the body
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/addPart?partNum=" + partNum;
        var options = appendCustomParams.appendCustomParams(requestOptions, ["file"], { params: tslib_es6.__assign({}, requestOptions.params) });
        return request.request(url, options);
    });
}
/**
 * ```js
 * import { commitItemUpload } from "@esri/arcgis-rest-portal";
 * //
 * commitItemUpload({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Commit is called once all parts are uploaded during a multipart Add Item or Update Item operation. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/commit.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get the commit result.
 */
function commitItemUpload(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/commit";
        var options = appendCustomParams.appendCustomParams(requestOptions, [], {
            params: tslib_es6.__assign(tslib_es6.__assign({}, requestOptions.params), get.serializeItem(requestOptions.item))
        });
        return request.request(url, options);
    });
}
/**
 * ```js
 * import { cancelItemUpload } from "@esri/arcgis-rest-portal";
 * //
 * cancelItemUpload({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Cancels a multipart upload on an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/cancel.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get the commit result.
 */
function cancelItemUpload(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/cancel";
        return request.request(url, requestOptions);
    });
}

/**
 * Takes a file, file owner, and file AGO item id along with a size limit
 * Then chunks the file up based on that file limit.
 * The chunks are added to addItemPart calls and added to a queue array.
 *
 * @export
 * @param {*} file File to be uploaded
 * @param {string} owner file owner
 * @param {string} id file ID from AGO
 * @param {number} sizeLimit How large should the chunks be?
 * @param {IUserRequestOptions} requestOptions
 * @return {*}  {IBatch}
 */
function _prepareUploadRequests(file, owner, id, sizeLimit, requestOptions) {
    const queue = [];
    // part number starts from 1
    let partIndex = 1;
    let sizeIndex = 0;
    // Slice the file data and create an upload request for each part
    while (sizeIndex < file.size) {
        queue.push(Object.assign({ file: file.slice(sizeIndex, sizeIndex + sizeLimit, file.type), owner,
            id, partNum: partIndex }, requestOptions));
        partIndex += 1;
        sizeIndex += sizeLimit;
    }
    return queue.reverse();
}

/**
 * Creates an item in online from a local file/item.
 * Upload is multithreaded as the item is chunked up.
 *
 * @export
 * @param {IItemAdd} item Item to be uploaded into online.
 * @param {IUserRequestOptions} requestOptions
 * @return {*}  {Promise<string>} Newly created item id
 */
async function createItemFromFile(item, requestOptions) {
    // Grab a reference to the file.
    const file = item.file;
    // make a shadow copy of the item parameter and remove the file object
    // so that it won't trigger the direct upload at the createContent
    // request
    item = Object.assign({}, item);
    delete item.file;
    // Create the item in online so we have an id
    const createResult = await create.createItem(Object.assign({ item, filename: file.name, async: true, multipart: true, overwrite: true }, requestOptions));
    // get the items id
    const itemId = createResult.id;
    try {
        // AGOL recommends at least 5mb for each file part
        // to upload so we use 6mb to slice the file.
        // see https://developers.arcgis.com/rest/users-groups-and-items/add-item-part.htm
        const sizeLimit = 6 * 1000 * 1000;
        // Create queue of upload requests.
        const uploadQueue = _prepareUploadRequests(file, item.owner, itemId, sizeLimit, requestOptions);
        // execute up to 5 concurrent requests
        await batch.batch(uploadQueue, 
        // We are doing this to catch individual response failures
        // and throwing them to stop further xhr's
        async (opts) => {
            const resp = await addItemPart(opts);
            // If the response did not return with success then throw an error
            if (!resp.success) {
                throw new Error("addItemPart failed");
            }
        }, 5);
        // update item extent to string
        if (item.extent && extent.isBBox(item.extent)) {
            item.extent = extent.bboxToString(item.extent);
        }
        // Commit is called once all parts are uploaded during a multipart add item or update item operation.
        await commitItemUpload(Object.assign({ id: itemId, item, owner: item.owner }, requestOptions));
    }
    catch (e) {
        // If an error is thrown then cancel item upload
        await cancelItemUpload(Object.assign({ id: itemId, owner: item.owner }, requestOptions));
        throw e;
    }
    return createResult;
}

/**
 * Create AGO item from a URL
 *
 * @export
 * @param {IItemAdd} item Item to be uploaded into online.
 * @param {IUserRequestOptions} requestOptions
 * @return {*}  {Promise<string>} Newly created item ID
 */
async function createItemFromUrl(item, requestOptions) {
    // Fire off createItem call
    const createResult = await create.createItem(Object.assign({ item, owner: item.owner, file: item.file, dataUrl: item.dataUrl, text: item.text, multipart: item.multipart, async: item.async }, requestOptions));
    // return the newly created item id
    return createResult;
}

function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
/**
 * Helper function which takes an itemId and checks the status
 * of the item every 2 seconds until it is either complete or failed.
 *
 * @export
 * @param {string} itemId AGO item id
 * @param {IUserRequestOptions} requestOptions
 */
async function _waitForItemReady(itemId, requestOptions, milliseconds) {
    let statusResult;
    do {
        await delay(milliseconds || /* istanbul ignore next: slows down tests */ 2000);
        statusResult = await get.getItemStatus(Object.assign({ id: itemId }, requestOptions));
        if (statusResult.status === "failed") {
            throw new Error(statusResult.statusMessage);
        }
    } while (statusResult.status !== "completed");
}

/**
 * Creates an item in online from either url or file.
 * Once created we wait for the item to be ready (or throw an error if creation failed)
 * If access is not private then we make a call to update that.
 *
 * @export
 * @param {ICreateItemFromUrlOrFileOptions} createItemFromUrlOrFileOptions Input params (item, groups?, requestoptions)
 * @return {*}  {
 *     title: string,
 *     createdItem: ICreateItemResponse,
 *     itemAccessResponse: ISharingResponse,
 *     itemSharingResponse: ISharingResponse[]
 *   } Responses from createdItem, changing item access, and item Sharing to group
 */
async function createItemFromUrlOrFile(createItemFromUrlOrFileOptions) {
    const { item, groups } = createItemFromUrlOrFileOptions, userRequestOptions = tslib_es6$1.__rest(createItemFromUrlOrFileOptions, ["item", "groups"]);
    // Is there a file or data url?
    const shouldWaitForItemReady = item.dataUrl || item.file;
    let createdItem;
    let itemAccessResponse;
    let itemSharingResponse;
    // If there is a file then we create the item and chunk the file
    // while multithread uploading it
    if (item.file) {
        createdItem = await createItemFromFile(item, userRequestOptions);
        // Otherwise it's being created from a url.
    }
    else {
        createdItem = await createItemFromUrl(item, userRequestOptions);
    }
    // If there is a file or data url we want to check to see if / when the item is ready.
    if (shouldWaitForItemReady) {
        await _waitForItemReady(createdItem.id, userRequestOptions);
    }
    // If the item access is NOT private (which is the sharing access level by default)
    // We subsequently update the items access level.
    if (item.access !== "private") {
        itemAccessResponse = await access.setItemAccess(Object.assign({ id: createdItem.id, owner: item.owner, access: item.access }, userRequestOptions));
    }
    // If group ids were passedd in then make share calls to each.
    if (groups === null || groups === void 0 ? void 0 : groups.length) {
        const failSafeShare = failSafe.failSafe(shareItemWithGroup.shareItemWithGroup);
        itemSharingResponse = await Promise.all(groups.map((group) => failSafeShare(Object.assign({ id: createdItem.id, owner: item.owner, groupId: group.id, confirmItemControl: isUpdateGroup.isUpdateGroup(group) }, userRequestOptions))));
    }
    return {
        title: item.title,
        createdItem,
        itemAccessResponse,
        itemSharingResponse,
    };
}

exports.createItemFromFile = createItemFromFile;
exports.createItemFromUrl = createItemFromUrl;
exports.createItemFromUrlOrFile = createItemFromUrlOrFile;
