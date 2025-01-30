'use strict';

const domainExists = require('./domain-exists-0c69176a.js');
const search = require('./search-2db68ef4.js');
const compose = require('./compose-9b4311c9.js');
const util = require('./util-38e73510.js');
const generateRandomString = require('./generate-random-string-8807d629.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const extent = require('./extent-715f7c8d.js');
const get = require('./get-0368c931.js');
const update = require('./update-b8977041.js');
const create = require('./create-6279e23e.js');
const slugs = require('./slugs-9d179f70.js');
const slugify = require('./slugify-826af07b.js');
const HubError = require('./HubError-44e07249.js');
const objectToJsonBlob = require('./object-to-json-blob-5c0a267d.js');
const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');
const failSafe = require('./fail-safe-33c35b7f.js');
const isGuid = require('./is-guid-b5c2b74c.js');
const deleteProp = require('./delete-prop-7826ae49.js');
const setProp = require('./set-prop-3de2437f.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addItemResource } from "@esri/arcgis-rest-portal";
 * //
 * // Add a file resource
 * addItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 * //
 * // Add a text resource
 * addItemResource({
 *   id: '4fg',
 *   content: "Text content",
 *   name: 'bigkahuna.txt',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
function addItemResource(requestOptions) {
    return get.determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl.getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/addResources";
        requestOptions.params = tslib_es6.__assign({ file: requestOptions.resource, fileName: requestOptions.name, resourcesPrefix: requestOptions.prefix, text: requestOptions.content, access: requestOptions.private ? "private" : "inherit" }, requestOptions.params);
        return request.request(url, requestOptions);
    });
}

/**
 * Remove empty properties from an object graph
 * @param {Object} obj Object to remove empty/null properties from
 */
function removeEmptyProps(obj) {
    // http://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === "object") {
            removeEmptyProps(obj[key]);
        }
        else if (obj[key] == null) {
            delete obj[key];
        }
    });
    return obj;
}

/**
 * Create a slug, namespaced to an org and accounting for the 256 character limit
 * of individual typekeywords. Typically used to lookup items by a human readable name in urls
 *
 * @param title
 * @param orgKey
 * @returns
 */
function constructSlug(title, orgKey) {
    // allow some padding at the end for incrementing so we don't wind up w/ weird, inconsistent slugs
    // when the increment goes from single to multiple digits,
    // avoid producing the following when deduping:
    // slug|qa-pre-a-hub|some-really-really-...-really-long
    // slug|qa-pre-a-hub|some-really-really-...-really-lo-1
    // slug|qa-pre-a-hub|some-really-really-...-really-l-11
    // slug|qa-pre-a-hub|some-really-really-...-really-100
    const paddingEnd = 4;
    return slugs.truncateSlug(slugify.slugify(title), orgKey, paddingEnd);
}
/**
 * Adds/Updates the slug typekeyword
 * Returns a new array of keywords
 *
 * @param typeKeywords A collection of typekeywords
 * @param slug The slug to add/update
 * @returns An updated collection of typekeywords
 */
function setSlugKeyword(typeKeywords, slug) {
    // remove slug entry from array
    const updatedTypekeywords = typeKeywords.filter((entry) => !entry.startsWith(`${slugs.TYPEKEYWORD_SLUG_PREFIX}|`));
    // now add it
    updatedTypekeywords.push([slugs.TYPEKEYWORD_SLUG_PREFIX, slug].join("|"));
    return updatedTypekeywords;
}
/**
 * Get an item by searching for items with a typeKeyword like `slug|{slug-value}`
 *
 * For example, if you pass a slug `"snow-map"` into this function, it will
 * search for items with `slug|snow-map` in it's typeKeywords array.
 * It also transforms uriSlugs into typeKeyword slugs by replacing `::` with `|`
 * Thus, passing a slug of `"myorg::snow-map"` would search for items with
 * `myorg|snow-map` in it's typeKeywords array.
 *
 * @param slug
 * @param requestOptions
 * @returns
 */
function getItemBySlug(slug, requestOptions) {
    const slugKeyword = slugs.uriSlugToKeywordSlug(slug);
    return findItemsBySlug({ slug: slugKeyword }, requestOptions).then((results) => {
        if (results.length) {
            // search results only include a subset of properties of the item, so
            // issue a subsequent call to getItem to get the full item details
            return get.getItem(results[0].id, requestOptions);
        }
        else {
            return null;
        }
    });
}
/**
 * Find items by slug typeKeywords.
 *
 * Optional exclude parameter accepts the id of an item we expect to
 * have this particular slug. This is used during update calls
 * where we don't know if the slug specifically has been updated, but we
 * don't want a false-postive from the item we are updating
 *
 * @param slug
 * @param requestOptions
 * @returns
 */
async function findItemsBySlug(slugInfo, requestOptions) {
    if (!slugInfo.slug) {
        return [];
    }
    const filter = slugInfo.slug.startsWith(`${slugs.TYPEKEYWORD_SLUG_PREFIX}|`)
        ? slugInfo.slug
        : [slugs.TYPEKEYWORD_SLUG_PREFIX, slugInfo.slug].join("|");
    const opts = {
        filter: `typekeywords:"${filter}"`,
    };
    if (requestOptions.authentication) {
        opts.authentication = requestOptions.authentication;
    }
    else if (requestOptions.portal) {
        opts.portal = requestOptions.portal;
    }
    // We need to check for other items w/ a slug during
    // the update calls. For those scenarios we are interested
    // in any _other_ items which may have a specific slug
    // but not one specific item
    if (slugInfo.exclude) {
        opts.q = `NOT id:${slugInfo.exclude}`;
    }
    try {
        const response = await search.searchItems(opts);
        return response.results;
    }
    catch (e) {
        throw e;
    }
}
/**
 * Given a slug, search for items using that slug, incrementing the slug name until
 * a unique value is found
 *
 * For example, if a slug of `"snow-map"` into this function and some item exists
 * with that slug, it would return `"snow-map-1"`.
 *
 * @param slug
 * @param requestOptions
 * @param step
 * @returns
 */
function getUniqueSlug(slugInfo, requestOptions, step = 0) {
    const combinedSlug = step ? [slugInfo.slug, step].join("-") : slugInfo.slug;
    return findItemsBySlug({ slug: combinedSlug, exclude: slugInfo.existingId }, requestOptions)
        .then((results) => !results.length
        ? combinedSlug
        : getUniqueSlug(slugInfo, requestOptions, step + 1))
        .catch((e) => {
        throw Error(`Error in getUniqueSlug ${e}`);
    });
}

/**
 * Given a string, return it as a blob
 * NOTE: USE objectToJsonBlob if you're saving a JSON resource!!!
 * NOTE: This is not currently supported in Node
 * @param {string} the string
 */
function stringToBlob(s, type = "application/octet-stream") {
    /* istanbul ignore next */
    if (typeof Blob !== "undefined") {
        const bytes = [];
        for (let i = 0; i < s.length; i++) {
            bytes[i] = s.charCodeAt(i);
        }
        const encoded = new Uint8Array(bytes);
        return new Blob([encoded], { type });
    }
    else {
        throw new Error(`stringToBlob is not currently supported on Node`);
    }
}

/**
 * Given an item, and owner, Search for if the resource exists
 * and if does, update it, otherwise add it. Returns a url for the item.
 *
 * @export
 * @param {string} id
 * @param {string} owner
 * @param {*} resource
 * @param {string} name
 * @param {IUserRequestOptions} ro
 * @param {string} [prefix=""]
 * @return {*}  {Promise<string>}
 */
async function upsertResource(id, owner, resource, name, ro, prefix = "") {
    try {
        const extension = name.split(".").pop();
        // Search against the item resources to see if the resource exists
        const doesResExist = await doesResourceExist(id, name, ro);
        // if the resource exists, update it, otherwise add it
        const resourceFunc = doesResExist ? update.updateItemResource : addItemResource;
        // JSON and text resources have....odd things happen
        // to them when they are added as resources and NOT
        // converted to blobs. Thus we convert them to blobs
        let resourceToUpload = resource;
        if (extension === "json") {
            resourceToUpload = objectToJsonBlob.objectToJsonBlob(resource);
        }
        if (extension === "txt") {
            resourceToUpload = stringToBlob(resource);
        }
        // Add item resource
        const response = await resourceFunc(Object.assign({ id,
            owner, resource: resourceToUpload, name,
            prefix }, ro));
        // if err throw
        if (!response.success) {
            throw new HubError.HubError("Add Item Resource", `Error adding resource ${name} to item ${id}.`);
        }
        // return url
        const portalRestUrl = getPortalApiUrl.getPortalApiUrl(ro.portal);
        const _prefix = prefix ? `${prefix}/` : "";
        return `${portalRestUrl}/content/items/${id}/resources/${_prefix}${name}`;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new HubError.HubError("Add Item Resource", err.message, err);
        }
        else {
            throw new HubError.HubError("Add Item Resource", `Error adding resource ${name} to item ${id}.`);
        }
    }
}

/**
 * Given an item ID, and a resource name, check if the resource exists
 *
 * @param id Item ID
 * @param name Resource name
 * @param ro Request options
 * @returns boolean
 */
async function doesResourceExist(id, name, ro) {
    return get.getItemResources(id, ro).then((resp) => {
        // if the resource exists, return true
        const foundResource = resp.resources.find((e) => {
            return e.resource === name;
        });
        return !!foundResource;
    });
}

/**
 * Gets the full item/data model for an item id
 * @param {string} id
 * @param {Object} requestOptions
 */
function getModel(id, requestOptions) {
    return Promise.all([
        get.getItem(id, requestOptions),
        get.getItemData(id, requestOptions),
    ]).then((result) => {
        // shape this into a model
        return {
            item: result[0],
            data: result[1],
        };
    });
}
/**
 * Get a model by it's slug
 *
 * This uses the [Filter](https://developers.arcgis.com/rest/users-groups-and-items/search-reference.htm) option of the
 * to search for an item that has a typekeyword of `slug|{slug-value}`
 *
 * This is useful for applications that want to use human-readable urls instead
 * of using item ids.
 *
 * @param slug
 * @param requestOptions
 * @returns
 */
function getModelBySlug(slug, requestOptions) {
    return getItemBySlug(slug, requestOptions)
        .then((item) => {
        const prms = [Promise.resolve(item)];
        if (item) {
            prms.push(get.getItemData(item.id, requestOptions));
        }
        else {
            prms.push(Promise.resolve(null));
        }
        return Promise.all(prms);
    })
        .then((result) => {
        if (result[0]) {
            return {
                item: result[0],
                data: result[1],
            };
        }
        else {
            return null;
        }
    });
}
/**
 * Create an item to back and IModel.
 *
 * @param {IModel}
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IModel>}
 */
async function createModel(model, requestOptions) {
    // const clone = cloneObject(model) as IModel;
    const item = util.cloneObject(model.item);
    item.data = util.cloneObject(model.data);
    // Update extent from bbox to string
    // TODO: remove below logic once rest.js is fixed.
    if (item.extent && typeof item.extent !== "string") {
        // THIS IS A HACK TO WORK AROUND REST.JS BUG
        // and normally should never be done.
        item.extent = extent.bboxToString(item.extent);
    }
    // Create the item
    const createResponse = await create.createItem(Object.assign({ item }, requestOptions));
    // Re-fetch the model and return that so it has all the latest prop values
    return getModel(createResponse.id, requestOptions);
}
/**
 * Update an IModel. Generic function that will be used across all
 * type-specific update functions
 *
 * @export
 * @param {IModel} "model" object (i.e. `{item:{...}, data:{...}}`)
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IModel>}
 */
function updateModel(model, requestOptions) {
    // const clone = cloneObject(model);
    const item = util.cloneObject(model.item);
    item.data = util.cloneObject(model.data);
    // Update extent from bbox to string
    // TODO: remove below logic once rest.js is fixed.
    if (item.extent && typeof item.extent !== "string") {
        // THIS IS A HACK TO WORK AROUND REST.JS BUG
        // and normally should never be done.
        item.extent = extent.bboxToString(item.extent);
    }
    // If we have a field we are trying to clear (by making it an empty string like description / snippet)
    // We need to send clearEmptyFields: true to the updateItem call
    if (shouldClearEmptyFields(item)) {
        requestOptions.params = Object.assign(Object.assign({}, requestOptions.params), { clearEmptyFields: true });
    }
    const opts = Object.assign({ item }, requestOptions);
    return update.updateItem(opts).then(() => {
        // To ensure we have the exact modified timestamp, we need to
        // get the item again
        // Also, we can't just call getModel because we need to be able
        // to properly handle other types like PDFs that don't have JSON data
        return item.data
            ? getModel(item.id, requestOptions)
            : get.getItem(item.id, requestOptions).then((i) => ({ item: i }));
        // // update the modified prop
        // // this won't be exact, but it will be very close
        // clone.item.modified = new Date().getTime();
        // return clone;
    });
}
/**
 * Takes an IModel and an array of resources and upserts them to the
 * backing item. Then searches for the resources that were upserted
 * and attaches them to the model, which is returned.
 *
 * @export
 * @param {IModel} model
 * @param {Array<{
 *     resource: Record<string, any>;
 *     filename: string;
 *   }>} resources
 * @param {IUserRequestOptions} requestOptions
 * @return {*}  {Promise<IModel>}
 */
async function upsertModelResources(model, resources, requestOptions) {
    // Set up promises array
    const upsertPromises = [];
    // loop through resources and create them
    resources.forEach((value) => {
        upsertPromises.push(upsertResource(model.item.id, model.item.owner, value.resource, value.filename, requestOptions));
    });
    // Promise.all to wait for all resources to be created
    return Promise.all(upsertPromises).then(() => {
        // Create a new object with the resources
        const updatedResources = resources.reduce((acc, resource) => {
            // Get the property name from the resource name
            const prop = resource.filename.split(".").shift();
            acc[prop] = resource.resource;
            return acc;
        }, {});
        return Object.assign({ resources: updatedResources }, model);
    });
}
/**
 * Given an Item, fetch the data json and return an IModel
 * @param item
 * @param requestOptions
 * @returns
 */
async function fetchModelFromItem(item, requestOptions) {
    const data = await get.getItemData(item.id, requestOptions);
    return {
        item,
        data,
    };
}
/**
 * Given an item, and a list of resource name/prop pairs,
 * fetch the resources and return as an object for the IModel
 *
 * @export
 * @param {IItem} item
 * @param {{
 *     [key: string]: string
 *   }} resourceNamePairs
 * @param {IRequestOptions} requestOptions
 * @return {*}  {Promise<Record<string, any>>}
 */
async function fetchModelResources(item, resourceNamePairs, requestOptions) {
    // Iterate through the resource name/prop pairs and fetch the resources
    return Object.entries(resourceNamePairs).reduce(async (acc, [key, value]) => {
        // failsafe to prevent errors returns falsy if error
        const failSafeGetResource = failSafe.failSafe(get.getItemResource, null);
        // get the resource
        const resp = await failSafeGetResource(item.id, Object.assign({ fileName: value, 
            // Must be "arrayBuffer" | "blob" | "formData" | "json" | "text";
            readAs: value.split(".").pop() }, requestOptions));
        // if the failsafe succeeds
        if (resp) {
            // Update the acc with the prop and resource
            acc[key] = resp;
        }
        return acc;
    }, {});
}
/**
 * Given an Item, determine if there are any fields to be cleared
 *
 * @param {IItem} item
 * @return {*} boolean
 */
function shouldClearEmptyFields(item) {
    return ["description", "snippet", "tags", "categories", "licenseInfo"].some((field) => { var _a; return item[field] === "" || ((_a = item[field]) === null || _a === void 0 ? void 0 : _a.length) === 0; });
}

/**
 * Parse a response object, and throw if it contains an error.
 * Just a wrapper to hide some platform idiosyncracies
 * @param {Response} response Response object to parse
 * @private
 */
async function _checkStatusAndParseJson(response) {
    if (response.status >= 200 && response.status < 300) {
        // don't try to parse the body if it's empty
        // if (response.body) { // the fetch polyfill for IE... does not expose a body property... :(
        return response.json();
        // }
    }
    else {
        // we're gonna throw, but we need to construct the error
        return response.json().then((json) => {
            if (json.error) {
                const error = new Error(`${json.error.title} :: ${json.error.detail} :: ${response.status}`);
                throw error;
            }
            else {
                throw new Error(`Got ${response.status} ${response.statusText}`);
            }
        });
    }
}

/**
 * Lookup a domain in Portal
 * @param {string} hostname to locate the site for
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _lookupPortal(hostname, requestOptions) {
    // for portal we search for a site w/ `hubsubdomain|<domain>` type keyword
    let subdomain = hostname;
    // if this subdomain has a hash in it, knock that off
    if (hostname.indexOf("#/") > -1) {
        subdomain = hostname.split("#/")[1];
    }
    const queryTerm = `hubsubdomain|${subdomain}`;
    const opts = Object.assign({
        q: `typekeywords: ${queryTerm}`,
    }, requestOptions);
    return search.searchItems(opts)
        .then((res) => {
        // since the search api stems the terms, we need to verify
        // by looking at the results
        return res.results.filter((r) => {
            return compose.includes(r.typeKeywords, queryTerm);
        })[0];
    })
        .then((site) => {
        if (!site)
            throw new Error("site not found");
        return {
            hostname: site.url,
            siteId: site.id,
        };
    });
}

/**
 * Create an entry in the domain system
 * @param {IHubDomain} domainEntry Domain hash to be stored
 * @param {IHubRequestOptions} hubRequestOptions
 */
function addDomain(domainEntry, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`addDomain is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = domainExists._getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}`;
    // handle case of siteTitle being numeric
    const title = domainEntry.siteTitle;
    if (typeof title === "number") {
        domainEntry.siteTitle = title.toString();
    }
    // update client key to empty string if we have one, as it won't pass schema validation
    if (domainEntry.clientKey) {
        domainEntry.clientKey = "";
    }
    return fetch(url, {
        method: "POST",
        headers,
        mode: "cors",
        body: JSON.stringify(domainEntry),
    }).then(_checkStatusAndParseJson);
}

/**
 * Check if an item exists with the specified domain keyword
 * @param {String} hostname to check for
 * @param {IHubRequestOptions} hubRequestOptions
 */
function domainExistsPortal(hostname, hubRequestOptions) {
    return _lookupPortal(hostname, hubRequestOptions)
        .then((_) => {
        return true;
    })
        .catch((_) => {
        return false;
    });
}

/**
 * Ensure a unique domain name by checking for and incrementing
 * a subdomain
 * @param {String} subdomain Subdomain to ensure is unique
 * @param {String} baseHostname base hostname
 * @param hubRequestOptions
 * @param {Number} step Step number
 */
function getUniqueDomainName(subdomain, baseHostname, hubRequestOptions, step = 0) {
    let combinedName = subdomain;
    if (step) {
        combinedName = subdomain + "-" + step;
    }
    const hostname = `${combinedName}-${baseHostname}`;
    return domainExists.domainExists(hostname, hubRequestOptions).then((exists) => {
        // if result === true, then we need to step the name...
        if (exists) {
            const nextStep = step + 1;
            return getUniqueDomainName(subdomain, baseHostname, hubRequestOptions, nextStep);
        }
        else {
            return combinedName;
        }
    });
}

/**
 * Ensure a unique domain name by checking for and incrementing
 * a subdomain
 * @param {String} subdomain Subdomain to ensure is unique
 * @param {IHubRequestOptions} hubRequestOptions
 * @param {*} step Step number
 */
function getUniqueDomainNamePortal(subdomain, hubRequestOptions, step = 0) {
    let combinedName = subdomain;
    if (step) {
        combinedName = subdomain + "-" + step;
    }
    // now we search for existing items w/ this...
    return domainExistsPortal(combinedName, hubRequestOptions).then((exists) => {
        if (exists) {
            const nextStep = step + 1;
            return getUniqueDomainNamePortal(subdomain, hubRequestOptions, nextStep);
        }
        else {
            return combinedName;
        }
    });
}

/**
 * Fetch a the information about a domain.
 * Different implementation for Portal vs AGO
 * @param {string} hostname of domain record to locate
 * @param {IHubRequestOptions} hubRequestOptions
 */
function lookupDomain(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return _lookupPortal(hostname, hubRequestOptions);
    }
    else {
        const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${hostname}`;
        const headers = domainExists._getAuthHeader(hubRequestOptions);
        return fetch(url, { method: "GET", headers, mode: "cors" }).then(_checkStatusAndParseJson);
    }
}

/**
 * Remove a domain entry.
 * User must be a member of the org that owns the domain entry.
 * @param {int} domainId Id of the domain entry to remove
 * @param {IHubRequestOptions} hubRequestOptions`dom
 */
function removeDomain(domainId, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`removeDomain is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = domainExists._getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${domainId}`;
    return fetch(url, { method: "DELETE", headers, mode: "cors" }).then(_checkStatusAndParseJson);
}

/**
 * Remove all domain entries by site id.
 * User must be a member of the org that owns the domain entry.
 * @param {int} domainSiteId of the domain entries to remove
 * @param {IHubRequestOptions} hubRequestOptions`dom
 */
function removeDomainsBySiteId(domainSiteId, hubRequestOptions) {
    // TODO: Can remove this if no longer required
    if (hubRequestOptions.isPortal) {
        throw new Error(`removeDomainsBySiteId is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = domainExists._getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/?siteId=${domainSiteId}`;
    return fetch(url, { method: "DELETE", headers, mode: "cors" }).then(_checkStatusAndParseJson);
}

/**
 * Ensure that a subdomain is not greater than 63 characters in length
 * Subdomains are prep-ended on the org's url key, and the combined
 * length can not exceed 63 chars as per rules of domains.
 * If the requested subdomain + the url key is > 63 chars, we
 * strip off the last 6 chars and replace that w/ random characeters
 * This was an actual reported bug.
 * @param {String} subdomain Proposed subdomain
 * @param {String} urlKey Org url key
 * @private
 */
function _ensureSafeDomainLength(subdomain, urlKey) {
    let result = util.cloneObject(subdomain);
    let max = 63;
    if (urlKey)
        max = max - (urlKey.length + 1);
    if (result.length > max) {
        result = `${result.slice(0, max - 6)}-${generateRandomString.generateRandomString(5)}`;
    }
    return result;
}

/**
 * Given a subdomain, ensure that we have a unique hostname
 * incrementing if needed
 * @param {String} subdomain Subdomain to unique-ify
 * @param {IHubRequestOptions} hubRequestOptions
 */
function ensureUniqueDomainName(subdomain, hubRequestOptions) {
    let prms;
    if (hubRequestOptions.isPortal) {
        prms = getUniqueDomainNamePortal(subdomain, hubRequestOptions);
    }
    else {
        const baseDomain = `${hubRequestOptions.portalSelf.urlKey}.${domainExists.stripProtocol(compose.getHubApiUrl(hubRequestOptions))}`;
        prms = getUniqueDomainName(subdomain, baseDomain, hubRequestOptions);
    }
    return prms.then((uniqueDomain) => {
        return _ensureSafeDomainLength(uniqueDomain, hubRequestOptions.portalSelf.urlKey);
    });
}

/**
 * Given a Site Model, register the domains with the Domain Service.
 *
 * For Portal, this will return a sparse entry that contains just the portal clientKey
 *
 * This should only be used when creating a site. To update domains related
 * to a site, use the `addDomain` and `removeDomain` functions directly
 *
 * @param {Object} model site model
 * @param {IHubRequestOptions} hubRequestOptions
 */
function addSiteDomains(model, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        // For enterprise we don't register the domain, but we do return a sparse entry
        // that contains just the portal clientKey so that the caller can use it.
        return Promise.resolve([{ clientKey: "arcgisonline" }]);
    }
    else {
        const props = ["defaultHostname", "customHostname"];
        return Promise.all(props.reduce((acc, prop) => {
            const hostname = getProp.getProp(model, `data.values.${prop}`);
            if (hostname) {
                const domainOpts = {
                    hostname,
                    clientKey: model.data.values.clientId,
                    orgId: hubRequestOptions.portalSelf.id,
                    orgTitle: hubRequestOptions.portalSelf.name,
                    orgKey: hubRequestOptions.portalSelf.urlKey,
                    siteId: model.item.id,
                    siteTitle: model.item.title,
                    sslOnly: true,
                };
                acc.push(addDomain(domainOpts, hubRequestOptions));
            }
            return acc;
        }, []));
    }
}

const SITE_SCHEMA_VERSION = 1.8;

/**
 * Apply the first schema version to the item
 * @param {Object} model Site Model
 * @private
 */
function _applySiteSchema(model) {
    // if this has already been thru this step... skip it...
    if (getProp.getProp(model, "item.properties.schemaVersion") >= 1)
        return model;
    const clone = util.cloneObject(model);
    // proactively purge old properties
    ["groupId", "title"].forEach((prop) => {
        delete clone.data.values[prop];
    });
    // ensure item.properties
    if (!clone.item.properties) {
        clone.item.properties = {};
    }
    clone.item.properties.schemaVersion = 1;
    // Groups!
    if (clone.data.values.groups && Array.isArray(clone.data.values.groups)) {
        // we have some groups arrays in prod where the contents are a mix of strings and objects.
        // we need to ensure this is just an array of groupIds...
        const groupIds = clone.data.values.groups
            .map((entry) => {
            if (typeof entry === "object") {
                return entry.id;
            }
            else {
                return entry;
            }
        })
            .filter((entry) => !!entry);
        // now assign this back to the groups
        clone.data.values.groups = groupIds;
    }
    return clone;
}

/**
 * Enforce lowercase domains
 * @param {Object} model Site Model
 * @private
 */
function _enforceLowercaseDomains(model) {
    // exit if this has been applied...
    if (getProp.getProp(model, "item.properties.schemaVersion") >= 1.1)
        return model;
    const clone = util.cloneObject(model);
    // all the possible domain properties must be lower case
    [
        "subdomain",
        "defaultHostname",
        "internalUrl",
        "customHostname",
        "externalUrl",
    ].forEach((prop) => {
        if (clone.data.values[prop] &&
            typeof clone.data.values[prop] === "string") {
            clone.data.values[prop] = clone.data.values[prop].toLowerCase();
        }
    });
    // bump the schemaVersion
    clone.item.properties.schemaVersion = 1.1;
    return clone;
}

/**
 * Move the data.values.groups array into the
 * data.catalog object
 * @param {Object} model Site Model
 * @private
 */
function _ensureCatalog(model) {
    // early exit
    if (getProp.getProp(model, "item.properties.schemaVersion") >= 1.2)
        return model;
    const clone = util.cloneObject(model);
    const catalog = getProp.getProp(clone, "data.catalog") || {};
    if (getProp.getProp(clone, "data.values.groups")) {
        catalog.groups = util.cloneObject(clone.data.values.groups);
        delete clone.data.values.groups;
    }
    clone.data.catalog = catalog;
    // bump the schemaVersion
    clone.item.properties.schemaVersion = 1.2;
    return clone;
}

/**
 * Remove any non-guid entries from the data catalog groups array
 * @param {object} model Site Model
 * @private
 */
function _purgeNonGuidsFromCatalog(model) {
    if (getProp.getProp(model, "item.properties.schemaVersion") >= 1.3)
        return model;
    const clone = util.cloneObject(model);
    const groups = getProp.getProp(clone, "data.catalog.groups") || [];
    clone.data.catalog.groups = groups.filter(isGuid.isGuid);
    clone.item.properties.schemaVersion = 1.3;
    return clone;
}

/**
 * Add telemetry config object
 * @private
 * @param {object} model Site Model
 * @returns {object}
 */
function _ensureTelemetry(model) {
    if (getProp.getProp(model, "item.properties.schemaVersion") >= 1.4)
        return model;
    const clone = util.cloneObject(model);
    const gacode = getProp.getProp(clone, "data.values.gacode");
    clone.data.values.telemetry = {
        consentNotice: {
            isTheme: true,
            consentText: "",
            policyURL: "",
        },
        customAnalytics: {
            ga: {
                customerTracker: {
                    enabled: Boolean(gacode),
                    id: gacode,
                },
            },
        },
    };
    deleteProp.deleteProp(clone, "data.values.gacode");
    setProp.setProp("item.properties.schemaVersion", 1.4, clone);
    return clone;
}

/**
 * Migrates the site so it can store configurations for multiple feed formats
 * (dcat-us-1.1, dcat-ap-2.0.1, etc.). If the site has an existing custom
 * configuration for dcat-us 1.1, a copy of that configuration will be modified
 * to use values from the v3 api instead of values from the index.
 *
 * Structural Impacts:
 * - site.data.feeds will be added.
 * - site.data.feeds.dcatUS11 will be added if site.data.values.dcatConfig exists.
 *
 * @param {object} model Site Model
 * @private
 */
function _migrateFeedConfig(model) {
    if (getProp.getProp(model, "item.properties.schemaVersion") >= 1.5)
        return model;
    const clone = util.cloneObject(model);
    const oldDcatUS11Config = clone.data.values.dcatConfig;
    clone.data.feeds = {};
    if (oldDcatUS11Config) {
        clone.data.feeds.dcatUS11 = _migrateToV3Values(oldDcatUS11Config);
    }
    clone.item.properties.schemaVersion = 1.5;
    return clone;
}
const indexValueToV3Value = {
    // Defaults
    "{{default.name}}": "{{name}}",
    "{{default.description}}": "{{description}}",
    "{{item.tags}}": "{{tags}}",
    "{{item.created:toISO}}": "{{created:toISO}}",
    "{{item.modified:toISO}}": "{{modified:toISO}}",
    "{{default.source.source}}": "{{source}}",
    "{{item.owner}}": "{{owner}}",
    "{{org.portalProperties.links.contactUs.url}}": "{{orgContactEmail}}",
    // Custom Values
    "{{org.name}}": "{{orgName}}",
    "{{item.categories}}": "{{categories}}",
    "{{item.licenseInfo}}": "{{licenseInfo}}",
    "{{item.modified}}": "{{modified}}",
    "{{enrichments.categories}}": "{{categories}}",
    "{{default.id}}": "{{id}}",
    "{{item.licenseInfo || No License}}": "{{licenseInfo || No License}}",
    "{{org.portalProperties.links.contactUs.url || mailto:data@tempe.gov}}": "{{orgContactEmail || mailto:data@tempe.gov}}",
    "{{default.description || No Description}}": "{{description || No Description}}",
    "{{item.id}}": "{{id}}",
};
function _migrateToV3Values(originalConfig) {
    let migratedConfigString = JSON.stringify(originalConfig);
    const supportedIndexValues = Object.keys(indexValueToV3Value);
    supportedIndexValues.forEach((indexValue) => {
        // Replace all occurrences of indexValue with the corresponding v3Value
        const v3Value = indexValueToV3Value[indexValue];
        migratedConfigString = migratedConfigString.split(indexValue).join(v3Value);
    });
    return JSON.parse(migratedConfigString);
}

/**
 * Reconfigure event list card properties
 * @private
 * @param {object} model Site Model
 * @returns {object}
 */
function _migrateEventListCardConfigs(model) {
    var _a;
    // do nothing if migration already applied
    if (((_a = model.item.properties) === null || _a === void 0 ? void 0 : _a.schemaVersion) >= 1.6)
        return model;
    // apply migration
    const clone = util.cloneObject(model);
    clone.data.values.layout.sections.map((section) => (Object.assign(Object.assign({}, section), { rows: (section.rows || []).map((row) => (Object.assign(Object.assign({}, row), { cards: (row.cards || []).map((card) => {
                if (card.component.name === "event-list-card") {
                    card.component.settings.displayMode = card.component.settings
                        .calendarEnabled
                        ? "calendar"
                        : "list";
                    delete card.component.settings.calendarEnabled;
                }
                return card;
            }) }))) })));
    // increment schemaVersion
    setProp.setProp("item.properties.schemaVersion", 1.6, clone);
    return clone;
}

/**
 * Returns an array of ICapabilityToFeatureMap objects
 * that define the projection of legacy capabilities
 * to permission features.
 *
 * We use this map to manage foward and backard conversions
 * and migration of legacy capablities to features when a
 * site is fetched or updated
 *
 * NOTE: if you are porting a legacy capability over to
 * workspaces, add it to this map
 */
const capabilityToFeatureMap = [
    {
        /**
         * Currently if the hideFollow capability is present
         * on the site capabilities, the app interprets this
         * to mean following is disabled for the site, and
         * thus, in-page action "Follow" buttons are not
         * displayed. Permissions, however, are structured
         * in the positive, meaning that hub:site:feature:follow
         * should return true if following is enabled, and
         * false if it's disabled. We set "negate" to true
         * to handle this forward/backward discrepancy
         */
        capability: "hideFollow",
        feature: "hub:site:feature:follow",
        negate: true,
    },
    {
        capability: "disableDiscussions",
        feature: "hub:site:feature:discussions",
        negate: true,
    },
];

/**
 * Site capabilities are currently saved as an array on the
 * site.data.values.capabilities. We want to migragte these
 * legacy capabilities over to features in the new permissions
 * system and expose them on the entity
 *
 * This function is called within fetchSite to ensure all
 * sites have features that are kept up-to-date with the
 * legacy capabilities array
 */
const migrateLegacyCapabilitiesToFeatures = (model) => {
    const legacyCapabilityFeatureFlags = {};
    let updatedFeatures = {};
    // 1. convert legacy capabilities to a feature flag hash
    (getProp.getProp(model, "data.values.capabilities") || []).forEach((capability) => {
        legacyCapabilityFeatureFlags[capability] = true;
    });
    // 2. update/add features based on the legacy capabilities array
    const currentFeatures = getProp.getProp(model, "data.settings.features") || {};
    updatedFeatures = capabilityToFeatureMap.reduce((features, map) => {
        // TODO: remove istanbul exception once we include a
        // legacy capability that satisfies the second condition
        /* istanbul ignore next */
        const capabilityFlag = map.negate
            ? !legacyCapabilityFeatureFlags[map.capability]
            : legacyCapabilityFeatureFlags[map.capability];
        return Object.assign(Object.assign({}, features), { [map.feature]: capabilityFlag });
    }, currentFeatures);
    setProp.setProp("data.settings.features", updatedFeatures, model);
    return model;
};

/**
 * Reconfigure event list card properties
 * @private
 * @param {object} model Site Model
 * @returns {object}
 */
function _migrateTelemetryConfig(model) {
    // NOTE: this migration was initially 1.6 => 1.7 but i (jupe) did not get the ui in sync so we will just do it again and i will get it right this time
    const newSchemaVersion = 1.8;
    // do nothing if migration already applied
    if (getProp.getProp(model, "item.properties.schemaVersion") >= newSchemaVersion) {
        return model;
    }
    // apply migration
    const clone = util.cloneObject(model);
    clone.data.telemetry = {};
    // get allowPrivacyConfig from consentNotice capability
    const capabilities = getProp.getProp(model, "data.values.capabilities") || [];
    const allowPrivacyConfig = capabilities.includes("consentNotice");
    // migrate consentNotice
    clone.data.telemetry.consentNotice = {
        allowPrivacyConfig,
        disclaimer: [
            {
                text: getProp.getProp(model, "data.values.telemetry.consentNotice.consentText") ||
                    "",
                default: true,
            },
        ],
        policyURL: getProp.getProp(model, "data.values.telemetry.consentNotice.policyURL") || "",
    };
    // this doesn't actually have any effect - not sure we have a way to get rid of stuff
    // delete clone.data?.values?.telemetry;
    // if we have item.properties.telemetry.plugins, move it to data.telemetry
    const plugins = getProp.getProp(model, "item.properties.telemetry.plugins");
    if (plugins) {
        clone.data.telemetry.plugins = plugins;
        // this doesn't actually have any effect - not sure we have a way to get rid of stuff
        // delete clone.item?.properties?.telemetry;
    }
    // increment schemaVersion
    setProp.setProp("item.properties.schemaVersion", newSchemaVersion, clone);
    return clone;
}

/**
 * During a period in late 2023 and early 2024, the python api
 * was writing a bad confirmation for basemaps as part of the site
 * cloning process. This migration will fix that.
 * @param {Object} model Site Model
 * @private
 */
function migrateBadBasemap(model) {
    // Unlike other migrations, this is not based on a version
    // rather it checks for a bad confirmation and fixes it.
    // Early exit if the bad confirmation is not present
    if (getProp.getProp(model, "data.values.map.basemaps"))
        return model;
    // Check for the bad confirmation
    if (getProp.getProp(model, "data.values.map.baseMapLayers")) {
        // create a clone...
        const clone = util.cloneObject(model);
        // get the values we need
        const baseMapLayers = getProp.getProp(model, "data.values.map.baseMapLayers");
        const title = getProp.getProp(model, "data.values.map.title");
        // remove the bad props
        delete clone.data.values.map.baseMapLayers;
        delete clone.data.values.map.title;
        // assign the new structure
        clone.data.values.map.basemaps = {
            primary: {
                baseMapLayers,
                title,
            },
        };
        return clone;
    }
    else {
        // This should not happen, but if it does, just return the model
        return model;
    }
}

/**
 * During a period in late 2023 and early 2024, the python api
 * was writing a bad confirmation for basemaps as part of the site
 * cloning process. This migration will fix that.
 * @param {Object} model Site Model
 * @private
 */
function ensureBaseTelemetry(model) {
    // Unlike other migrations, this is not based on a version
    // rather it checks for a missing telemetry property.
    // Early exit if the telemetry is there
    if (getProp.getProp(model, "data.telemetry")) {
        return model;
    }
    const clone = util.cloneObject(model);
    clone.data.telemetry = {};
    return clone;
}

/**
 * Early Hub sites were persisted as items of type "Web Mapping
 * Application" with a typeKeyword of "hubSite". We want these
 * items to act like regular "Hub Site Application"s, so we add
 * this versionless migration to artificially update the type
 * of old site items.
 *
 * Note: this change won't be persisted on the item itself,
 * which is why this migration must always run.
 *
 * @param model Site Model
 * @private
 */
function migrateWebMappingApplicationSites(model) {
    const isWebMappingApplication = getProp.getProp(model, "item.type") === "Web Mapping Application";
    const hasHubSiteKeyword = getWithDefault.getWithDefault(model, "item.typeKeywords", []).includes("hubSite");
    if (isWebMappingApplication && hasHubSiteKeyword) {
        model.item.type = "Hub Site Application";
    }
    return model;
}

/**
 * Remove underlinedLinks capability from site model
 * @private
 * @param {object} model Site Model
 * @returns {object}
 */
function _migrateLinkUnderlinesCapability(model) {
    // apply migration
    const clone = util.cloneObject(model);
    const capabilities = getProp.getProp(model, "data.values.capabilities");
    if (capabilities) {
        // migrate capabilities - remove underlinedLinks
        clone.data.values.capabilities = capabilities.filter((capability) => capability !== "underlinedLinks");
    }
    return clone;
}

/**
 * Upgrades the schema upgrades
 * @param model IModel
 */
function upgradeSiteSchema(model) {
    // WARNING - If you are writing a site schema migration,
    // you probably need to apply it to site drafts as well!
    // Specifically, add the migration to upgrade-draft-schema.ts file
    // in the sites package.
    // See https://github.com/Esri/hub.js/issues/498 for more details.
    if (getProp.getProp(model, "item.properties.schemaVersion") !== SITE_SCHEMA_VERSION) {
        // apply upgrade functions in order...
        model = _applySiteSchema(model);
        model = _enforceLowercaseDomains(model);
        model = _ensureCatalog(model);
        model = _purgeNonGuidsFromCatalog(model);
        model = _ensureTelemetry(model);
        model = _migrateFeedConfig(model);
        model = _migrateEventListCardConfigs(model);
        model = migrateLegacyCapabilitiesToFeatures(model);
        model = _migrateTelemetryConfig(model);
    }
    // apply versionless migrations
    model = migrateBadBasemap(model);
    model = ensureBaseTelemetry(model);
    model = migrateWebMappingApplicationSites(model);
    model = _migrateLinkUnderlinesCapability(model);
    return model;
}

/**
 * Get a Site Model by it's Item Id, and apply schema upgrades
 * @param {String} id Site Item Id
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getSiteById(id, hubRequestOptions) {
    return getModel(id, hubRequestOptions).then(upgradeSiteSchema);
}

/**
 * Default Site Theme
 */
const DEFAULT_THEME = {
    header: {
        background: "#fff",
        text: "#4c4c4c",
    },
    body: {
        background: "#fff",
        text: "#4c4c4c",
        link: "#0079c1",
    },
    button: {
        background: "#0079c1",
        text: "#fff",
    },
    logo: {
        small: "",
    },
    fonts: {
        base: {
            url: "",
            family: "Avenir Next",
        },
        heading: {
            url: "",
            family: "Avenir Next",
        },
    },
};
/**
 * Return the default theme, extended with values from the Org's shared theme
 * @param {Object} portalSelf Org's Portal object
 */
function getOrgDefaultTheme(portalSelf) {
    let defaultTheme = util.cloneObject(DEFAULT_THEME);
    let sharedTheme = getProp.getProp(portalSelf, "portalProperties.sharedTheme");
    if (sharedTheme) {
        sharedTheme = removeEmptyProps(sharedTheme);
        defaultTheme = util.extend(defaultTheme, sharedTheme);
    }
    return defaultTheme;
}

exports.DEFAULT_THEME = DEFAULT_THEME;
exports.SITE_SCHEMA_VERSION = SITE_SCHEMA_VERSION;
exports._checkStatusAndParseJson = _checkStatusAndParseJson;
exports._ensureSafeDomainLength = _ensureSafeDomainLength;
exports._ensureTelemetry = _ensureTelemetry;
exports._lookupPortal = _lookupPortal;
exports._migrateEventListCardConfigs = _migrateEventListCardConfigs;
exports._migrateFeedConfig = _migrateFeedConfig;
exports._migrateLinkUnderlinesCapability = _migrateLinkUnderlinesCapability;
exports._migrateTelemetryConfig = _migrateTelemetryConfig;
exports.addDomain = addDomain;
exports.addItemResource = addItemResource;
exports.addSiteDomains = addSiteDomains;
exports.capabilityToFeatureMap = capabilityToFeatureMap;
exports.constructSlug = constructSlug;
exports.createModel = createModel;
exports.doesResourceExist = doesResourceExist;
exports.domainExistsPortal = domainExistsPortal;
exports.ensureUniqueDomainName = ensureUniqueDomainName;
exports.fetchModelFromItem = fetchModelFromItem;
exports.fetchModelResources = fetchModelResources;
exports.findItemsBySlug = findItemsBySlug;
exports.getItemBySlug = getItemBySlug;
exports.getModel = getModel;
exports.getModelBySlug = getModelBySlug;
exports.getOrgDefaultTheme = getOrgDefaultTheme;
exports.getSiteById = getSiteById;
exports.getUniqueDomainName = getUniqueDomainName;
exports.getUniqueDomainNamePortal = getUniqueDomainNamePortal;
exports.getUniqueSlug = getUniqueSlug;
exports.lookupDomain = lookupDomain;
exports.migrateBadBasemap = migrateBadBasemap;
exports.migrateWebMappingApplicationSites = migrateWebMappingApplicationSites;
exports.removeDomain = removeDomain;
exports.removeDomainsBySiteId = removeDomainsBySiteId;
exports.removeEmptyProps = removeEmptyProps;
exports.setSlugKeyword = setSlugKeyword;
exports.stringToBlob = stringToBlob;
exports.updateModel = updateModel;
exports.upgradeSiteSchema = upgradeSiteSchema;
exports.upsertModelResources = upsertModelResources;
exports.upsertResource = upsertResource;
