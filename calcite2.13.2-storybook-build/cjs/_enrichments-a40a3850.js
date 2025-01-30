'use strict';

const util = require('./util-38e73510.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const compose = require('./compose-9b4311c9.js');
const get = require('./get-0368c931.js');
const helpers = require('./helpers-64227739.js');
const OperationError = require('./OperationError-902f34ae.js');
const getUser = require('./get-user-5eecc1c4.js');
const fetchOrg = require('./fetch-org-d214b65b.js');
const getService = require('./getService-b27eda44.js');
const request = require('./request-67da3c71.js');

/**
 * Returns a function that orchestrates a pipeline of smaller functions.
 * See [Composing Workflows](../../../guides/composing-workflows) for more information.
 *
 * All the functions must adhere to the `PipelineFn<T>` signature:
 *
 * `(value: IPipeable<T>) => Promise<IPipeable<T>>`
 *
 * Given an array of OperationPipeFns, run them in sequence and return the resultant promise
 *
 * i.e. `createOperationPipeline([fn1, fn2, f3])` will return in a function that chains
 * the functions like this: `fn1(input).then(fn2).then(fn3).then(result)`
 *
 * @param fns functions to be run in sequence
 * @returns Promise<Pipable<T>>
 */
const createOperationPipeline = (fns) => (input) => {
    return fns.reduce((chain, func) => {
        return chain.then(func).catch((err) => {
            // if it's an OperationError we can just reject with it...
            if (err.name === "OperationError") {
                return Promise.reject(err);
            }
            else {
                // otherwise, create an OperationError and reject with that
                const msg = `IPipeableFn did not reject with an OperationError \n Operation Stack: \n ${input.stack.toString()}`;
                const opErr = new OperationError.OperationError("pipeline execution error", msg);
                opErr.operationStack = input.stack.serialize();
                return Promise.reject(opErr);
            }
        });
    }, Promise.resolve(input));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

exports.__assign = function() {
    exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * ```js
 * import { getAllLayersAndTables } from '@esri/arcgis-rest-feature-layer';
 * getAllLayersAndTables({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0"
 * })
 *   .then(response) // { layers: [...], tables: [...] }
 * ```
 * Fetches all the layers and tables associated with a given layer service.
 * Wrapper for https://developers.arcgis.com/rest/services-reference/all-layers-and-tables.htm
 *
 * @param options - Request options, including the url for the layer service
 * @returns A Promise that will resolve with the layers and tables for the given service
 */
// TODO: should we expand this to support other valid params of the endpoint?
function getAllLayersAndTables(options) {
    var url = options.url, requestOptions = __rest(options, ["url"]);
    var layersUrl = helpers.parseServiceUrl(url) + "/layers";
    return request.request(layersUrl, requestOptions);
}

/**
 * Checks if a server's services directory is disabled. Consider hoisting this to RESTJS
 * @param idOrItem A feature service ID or item
 * @param requestOptions Request options
 * @returns Promise that resolves boolean
 */
const isServicesDirectoryDisabled = async (idOrItem, requestOptions) => {
    let disabled;
    try {
        const item = typeof idOrItem === "string"
            ? await get.getItem(idOrItem, requestOptions)
            : idOrItem;
        if (item.url) {
            let url = helpers.parseServiceUrl(item.url);
            if (item.access !== "public" && requestOptions.authentication) {
                const token = await requestOptions.authentication.getToken(item.url, requestOptions);
                if (token) {
                    url = `${url}?token=${token}`;
                }
            }
            const { status } = await fetch(url);
            disabled = status !== 200;
        }
        else {
            disabled = true;
        }
    }
    catch (e) {
        disabled = true;
    }
    return disabled;
};

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Allows an application to track a series of operations, storing information
 * about the arguments passes in and the results returned
 *
 * ```js
 * import { OperationStack } from '@esri/solution-common';
 *
 * const stack = new OperationStack();
 *
 * // start an operation by type
 * const id = stack.start('getItem');
 * //.. work happens...
 * stack.finish(id);
 *
 * // start an operation with an Operation object
 * stack.start({
 *   id: 'createItem_1',
 *   type: 'createItem',
 *   inputs: {
 *    item: {...truncated...},
 *    portal: 'https://www.arcgis.com',
 *    username: 'jsmith'
 *   },
 * });
 * // make the call
 * stack.finish('createItem_1', {newItemId: '00cf213'});
 *
 * // later you can get that information back out of the stack
 * const prevOp = stack.getOperation('createItem_1);
 *
 * // and if you need to roll back you can use the
 * // .cleanup and .output properties to help orchestrate
 *
 * ```
 *
 *
 * Can be used to implement "atomic" operations in an environment that does not
 * have this as a core feature
 */
class OperationStack {
    /**
     * Creates an instance of OperationStack.
     * @memberof OperationStack
     */
    constructor() {
        this.operations = [];
    }
    /**
     * Start an Operation
     *
     * ```js
     * const stack = new OperationStack();
     * stack.startOperation({
     *  id: 'get-bc3',
     *  type: 'getItem',
     *  cleanup: 'n/a',
     *  inputs: {
     *    id: 'bc3',
     *    owner: 'vader'
     *  }
     * });
     * // do work
     * stack.finish('get-bc3');
     * ```
     *
     *
     * @param {IOperation} operation
     * @memberof OperationStack
     */
    startOperation(operation) {
        const op = util.cloneObject(operation);
        op.startedAt = new Date().getTime();
        op.state = "working";
        this.operations.push(op);
    }
    /**
     * Start an operation without requiring a full operation
     *
     * ```js
     * const opId = stack.start('getItems');
     * //...work happens
     * stack.finish(opId);
     * ```
     *
     * @param {string} type Type of the operation. i.e. getItem
     * @param {Record<string, unknown>} [params] optionally pass in id, inputs, cleanup
     * @returns {string} Identifier of the new stack entry
     * @memberof OperationStack
     */
    start(type, params) {
        const op = {
            type,
            id: getWithDefault.getWithDefault(params, "id", util.createId(`${type}_`)),
            inputs: getWithDefault.getWithDefault(params, "inputs", {}),
            cleanup: getWithDefault.getWithDefault(params, "cleanup", "n/a"),
            startedAt: new Date().getTime(),
            state: "working"
        };
        this.operations.push(op);
        return op.id;
    }
    /**
     * Returns a reference to an Operation
     *
     * @param {string} id Unique Identifier
     * @returns {Operation}
     * @memberof OperationStack
     */
    getOperation(id) {
        return this.operations.find(o => o.id === id);
    }
    /**
     * Returns reference to the operations array
     *
     * @returns {Operation[]}
     * @memberof OperationStack
     */
    getOperations() {
        return this.operations;
    }
    /**
     * Inform the stack that an operation has finished.
     *
     * This will append in a duration property, and mark
     * the state as 'completed'.
     *
     * @param {string} id Unique identifier of the Operation
     * @param {Record<string, unknown>} [options] outputs
     * @memberof OperationStack
     */
    finish(id, options) {
        const op = this.getOperation(id);
        if (op) {
            op.duration = new Date().getTime() - op.startedAt;
            op.state = "completed";
            if (options) {
                op.output = util.cloneObject(options);
            }
        }
        else {
            throw new Error(`No operation with id ${id} present in stack`);
        }
    }
    /**
     * Merge a serialized operation stack into
     * a stack instance
     *
     * ```js
     *    import { OperationStack } from '@esri/solution-common';
     *    function someFunction() {
     *      const stack = new OperationStack();
     *      stack.start('getItem', {id: 'get-bc3'});
     *      // do some work...
     *      stack.finish('get-bc3');
     *
     *      const itm = {title: 'Fake Item', type: 'Web Map'};
     *      // create an entry for the function we are about to call...
     *      stack.start('createItem', {id: 'createItem_01', inputs: {item: itm}});
     *      // call a function that does work, and has it's own stack
     *      // and returns a serialized version as part of it's results
     *      return createItem(itm)
     *      .then((result) => {
     *        // tell the stack the last operation finished...
     *        stack.finish('createItem_01');
     *        // merge in the stack from the function we called
     *        stack.merge(result.stack);
     *        // > stack.getCompleted().length === 3
     *      });
     *    }
     *
     *    function createItem (itm) {
     *      const otherStack = new OperationStack();
     *      const id = otherStack.start('createItem');
     *      // make calls to create item etc
     *      otherStack.finish(id, {itemId: newItem.id});
     *      otherStack.start('protectItem', {id: 'protect-00c'});
     *      // make call to protect item...
     *      otherStack.finish('protect-00c');
     *      // all done... return a result with a stack
     *      return Promise.resolve({
     *        success:true,
     *        stack: otherStack.serialize()
     *      });
     *    }
     * ```
     *
     *  Typically used to create a comprehensive list of operations
     *  when a function returns a `SerializedOperationStack` as part of
     *  it's response
     *
     *
     * @param {ISerializedOperationStack} stack
     * @memberof OperationStack
     */
    merge(stack) {
        this.operations = [...this.operations, ...stack.operations];
    }
    /**
     * Get a list of the completed operations
     *
     * @returns {IOperation[]}
     * @memberof OperationStack
     */
    getCompleted() {
        return util.cloneObject(this.operations.filter(e => e.state === "completed"));
    }
    /**
     *  Return an array of working operations
     *
     * @returns {IOperation[]}
     * @memberof OperationStack
     */
    getWorking() {
        return util.cloneObject(this.operations.filter(e => e.state === "working"));
    }
    /**
     * Serialize the completed operations into a set of
     * human readable messages, sorted by the startedAt timestamp
     *
     *
     * @returns {string}
     * @memberof IOperationStack
     */
    toString() {
        // sort the operations by StartedAt
        const allOps = this.operations.sort((a, b) => {
            if (a.startedAt < b.startedAt) {
                return -1;
            }
            if (b.startedAt < a.startedAt) {
                return 1;
            }
            return 0;
        });
        return allOps.map(getOperationMessage).join("\n");
    }
    /**
     * Serialize the stack into simple objects
     *
     * @returns {ISerializedOperationStack}
     * @memberof OperationStack
     */
    serialize() {
        return {
            operations: util.cloneObject(this.getOperations())
        };
    }
}
function getOperationMessage(op) {
    let msg = `${op.startedAt} : Operation ${op.id} started with inputs ${JSON.stringify(op.inputs)} but was not completed`;
    if (op.state === "completed") {
        msg = `${op.startedAt} : Operation ${op.id} took ${op.duration} ms with inputs ${JSON.stringify(op.inputs)} and output ${op.output ? JSON.stringify(op.output) : "n/a"}`;
    }
    return msg;
}

/**
 * Lazy load XML parsing library and parse metadata XML into JSON
 * @param metadataXml
 * @returns
 */
async function parseMetadataXml(metadataXml) {
    // lazy load xml parsing library
    const { parse } = await Promise.resolve().then(function () { return require('./parser-840d5a2d.js'); }).then(function (n) { return n.parser; });
    // return XML parsed as JSON
    const opts = {
        // options for fastXmlParser to read tag attrs
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        textNodeName: "#value",
    };
    return parse(metadataXml, opts);
}
/**
 * Fetch an [item's metadata](https://doc.arcgis.com/en/arcgis-online/manage-data/metadata.htm) from a portal
 * and parse and return it as JSON
 * @param id item id
 * @param requestOptions
 */
async function fetchContentMetadata(id, requestOptions) {
    try {
        const metadataXml = await get.getItemMetadata(id, requestOptions);
        return await parseMetadataXml(metadataXml);
    }
    catch (_) {
        // many items don't have metadata and the request will 404
        // in these cases we don't want to treat it as an error
        // content.metadata === null signals to consumers that
        // we attempted to fetch the metadata, but it doesn't exist
        // TODO: we should probably still throw the error if it's not a 404
        return null;
    }
}
const enrichGroupIds = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichGroupIds");
    return get.getItemGroups(data.item.id, requestOptions)
        .then((response) => {
        const { admin, member, other } = response;
        const groupIds = [...admin, ...member, ...other].map((group) => group.id);
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), { groupIds }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
const enrichMetadata = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichMetadata");
    return fetchContentMetadata(data.item.id, requestOptions).then((metadata) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), { metadata }),
            stack,
            requestOptions,
        };
    });
    // TODO: currently fetchContentMetadata will never throw, but
    // if we update it to throw for non-404 errors, need to uncomment this:
    // .catch((error) => handleEnrichmentError(error, input, opId));
};
const enrichOwnerUser = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichOwner");
    // w/o the : any here, I get a compile error about
    // .authentication being incompatible w/ UserSession
    const options = Object.assign({ username: data.item.owner }, requestOptions);
    return getUser.getUser(options)
        .then((ownerUser) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), { ownerUser }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
// Note, this MUST be run after `enrichOwnerUser` to access the correct orgId during processing.
// `item.orgId` is only SOMETIMES returned by Portal, so we need the ownerUser's orgId as a backup.
//
// If an orgId isn't present on either the item or the ownerUser, this operation will be skipped.
const enrichOrg = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichOrg");
    const orgId = compose.getItemOrgId(data.item, data.ownerUser);
    // Only fetch the org if an explicit orgId is present
    const orgPromise = orgId
        ? fetchOrg.fetchOrg(orgId, requestOptions)
        : Promise.resolve(undefined);
    return orgPromise
        .then((org) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), { org }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
const enrichData = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichData");
    return get.getItemData(data.item.id, requestOptions)
        .then((itemData) => {
        stack.finish(opId);
        return { data: Object.assign(Object.assign({}, data), { data: itemData }), stack, requestOptions };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
/**
 * Enriches an item by fetching the item directly as this returns additional
 * information not included in a search result.
 * @param input - The input object containing the item and enrichments.
 * @returns A promise that resolves to the updated input object.
 */
const enrichItem = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichData");
    return get.getItem(data.item.id, requestOptions)
        .then((itemJson) => {
        stack.finish(opId);
        return { data: Object.assign(Object.assign({}, data), { item: itemJson }), stack, requestOptions };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
const enrichServer = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichServer");
    const url = helpers.parseServiceUrl(data.item.url);
    const options = Object.assign(Object.assign({}, requestOptions), { url });
    return Promise.all([
        getService.getService(options),
        isServicesDirectoryDisabled(data.item, requestOptions),
    ])
        .then(([server, servicesDirectoryDisabled]) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), { server: Object.assign(Object.assign({}, server), { servicesDirectoryDisabled }) }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
const enrichLayers = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichLayers");
    const url = data.item.url;
    const options = Object.assign(Object.assign({}, requestOptions), { url });
    return (getAllLayersAndTables(options)
        // merge layers and tables into a single array
        // and filter out any group layers
        .then((response) => {
        const merged = [...response.layers, ...response.tables];
        return merged.filter((layer) => layer.type !== "Group Layer");
    })
        .then((layers) => {
        stack.finish(opId);
        return { data: Object.assign(Object.assign({}, data), { layers }), stack, requestOptions };
    })
        .catch((error) => handleEnrichmentError(error, input, opId)));
};
// add the error to the content.errors,
// log current stack operation as finished with an error
// and return output that can be piped into the next operation
const handleEnrichmentError = (error, input, opId) => {
    const { data, stack, requestOptions } = input;
    stack.finish(opId, { error });
    return {
        data: Object.assign(Object.assign({}, data), { errors: getEnrichmentErrors(error, data.errors) }),
        stack,
        requestOptions,
    };
};
const enrichmentOperations = {
    groupIds: enrichGroupIds,
    metadata: enrichMetadata,
    ownerUser: enrichOwnerUser,
    org: enrichOrg,
    data: enrichData,
    server: enrichServer,
    layers: enrichLayers,
    item: enrichItem,
};
/**
 * convert an error to an enrichment error info format
 * and optionally append it to an existing array of those
 * @param error
 * @param errors an array of existing enrichment error info
 * @returns a new array of enrichment error info
 * @private
 */
const getEnrichmentErrors = (error, errors = []) => {
    const message = typeof error === "string"
        ? /* istanbul ignore next our tests only throw Error objects */
            error
        : error.message;
    return [
        ...errors,
        {
            // NOTE: for now we just return the message and type "Other"
            // but we could later introspect for HTTP or AGO errors
            // and/or return the status code if available
            type: "Other",
            message,
        },
    ];
};
/**
 * Fetch enrichments for an item
 * @param item
 * @param enrichments the list of enrichments to fetch
 * @param requestOptions
 * @returns an object with the item and enrichments
 * @private
 */
const fetchItemEnrichments = (item, enrichments, requestOptions) => {
    // create a pipeline of enrichment operations
    const operations = enrichments.reduce((ops, enrichment) => {
        const operation = enrichmentOperations[enrichment];
        // only include the enrichments that we know how to fetch
        operation && ops.push(operation);
        return ops;
    }, []);
    const pipeline = createOperationPipeline(operations);
    // execute pipeline and return the item and enrichments
    return pipeline({
        data: { item },
        stack: new OperationStack(),
        requestOptions,
    }).then((output) => {
        // TODO: send telemetry so we have info on what enrichments are requested and possible errors
        return output.data;
    });
};

exports.OperationStack = OperationStack;
exports.createOperationPipeline = createOperationPipeline;
exports.fetchItemEnrichments = fetchItemEnrichments;
exports.getEnrichmentErrors = getEnrichmentErrors;
exports.isServicesDirectoryDisabled = isServicesDirectoryDisabled;
