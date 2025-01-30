'use strict';

const compose = require('./compose-9b4311c9.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const util = require('./util-38e73510.js');
const failSafe = require('./fail-safe-33c35b7f.js');
const protect = require('./protect-56ea038d.js');
const remove = require('./remove-921f5dc7.js');
const update = require('./update-b8977041.js');
const themes = require('./themes-d539965a.js');
const interpolate = require('./interpolate-c1fe951a.js');
const _deepMapValues = require('./_deep-map-values-d489006b.js');
const get = require('./get-0368c931.js');
const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const domainExists = require('./domain-exists-0c69176a.js');
const isGuid = require('./is-guid-b5c2b74c.js');
const mergeObjects = require('./merge-objects-b31af1a3.js');
const remove$1 = require('./remove-df88a78e.js');
const getPortalUrl = require('./get-portal-url-68b1f527.js');

/**
 * Iterate over an object graph, and for all string properties, search for a string,
 * and replace it with another string
 */
function deepStringReplace(obj, stringOrRegex, replacement) {
    const replacedObject = _deepMapValues._deepMapValues(obj, function (value) {
        // Only string templates
        if (!_deepMapValues._isString(value)) {
            return value;
        }
        let re;
        if (_deepMapValues._isRegExp(stringOrRegex)) {
            re = stringOrRegex;
        }
        else {
            re = new RegExp(stringOrRegex, "g");
        }
        return value.replace(re, replacement);
    });
    return replacedObject;
}

/**
 * Given a model, return a serialized clone that can be sent to
 * the items api
 * @param {Object} model Item model {item:{}, data:{}}
 */
function serializeModel(model) {
    const serialized = util.cloneObject(model.item);
    serialized.text = JSON.stringify(model.data);
    return serialized;
}

/**
 * Given an array of strings, add a value and ensure it is unique by incrementing a suffix number
 * @param {Array} entries array of strings
 * @param {string} value string to uniqueify and add
 */
function ensureUniqueString(entries, value) {
    let foundUnique = false;
    let num = 0;
    let chk = value;
    while (!foundUnique) {
        if (compose.includes(entries, chk)) {
            num++;
            chk = `${value}-${num}`;
        }
        else {
            foundUnique = true;
        }
    }
    return chk;
}

/**
 * Gien a portal settings object, determine the hub product name
 * @param {Object} portal Portal settings object
 */
function getHubProduct(portal) {
    const isPremium = getProp.getProp(portal, "portalProperties.hub.enabled") || false;
    let product = isPremium ? "premium" : "basic";
    // TODO confirm w/ AGO that this is 100% bomber logic
    if (portal.isPortal && portal.portalMode === "singletenant") {
        product = "portal";
    }
    return product;
}

const getSubscriptionType = (portalSelf) => {
    return getWithDefault.getWithDefault(portalSelf, "subscriptionInfo.type", "Enterprise");
};

/**
 * Returns a new array with all the entries have the given value
 * at the given prop location removed.
 *
 * @param prop the property
 * @param val the value
 * @param arr the array
 */
function withoutByProp(prop, val, arr) {
    return arr.filter((e) => {
        return e[prop] !== val;
    });
}

/**
 * Given a string, strip out chars etc that would make it
 * and invalid javascript property name, then camelize it.
 * @param {string} value String to convert into a property
 */
function propifyString(value) {
    let result = value;
    // strip off any leading numbers...
    result = result.replace(/^[0-9]*/g, "");
    // remove any rando chars...
    result = result.replace(/[^\w\s]/g, "");
    // camelize the rest...
    result = util.camelize(result);
    return result;
}

/**
 * Unprotect and Remove an Item
 * Assumes caller has checked that the curernt user should be able to
 * unprotect and remove the item. Underlying calls are failsafe
 * so a failure to unprotect or temove the item will not reject.
 * @param {IUserItemOptions} userItemOptions id and authentication
 * @private
 */
function _unprotectAndRemoveItem(userItemOptions) {
    const failSafeUnprotect = failSafe.failSafe(protect.unprotectItem, { success: true });
    const failSafeRemove = failSafe.failSafe(remove.removeItem, { success: true });
    return failSafeUnprotect(userItemOptions).then(() => {
        return failSafeRemove(userItemOptions);
    });
}

/**
 * Update a model's item, wrapped in a failSafe so this will not blow up if
 * the user lacks rights somehow. This should be used in places where there is
 * a high-probability that the current user CAN update the item.
 * @param {Object} model Model object to be updated
 * @param {IRequestOptions} requestOptions
 */
function failSafeUpdate(model, requestOptions) {
    const failSafedUpdate = failSafe.failSafe(update.updateItem, {
        id: model.item.id,
        success: true,
    });
    const opts = Object.assign({ item: serializeModel(model) }, requestOptions);
    return failSafedUpdate(opts);
}

/**
 * To streamline passing of either a model id or the model itself, we use this function
 * to extract the model or fetch it, and return it. It uses `failSafe` and if the item
 * is not accessible for whatever reason, will return a model-ish object with `isMissing: true`
 * It is up to the caller to take approriate action
 * @param {String} modelType the type of model to extract from the options hash
 * @param {Object} options Something that extends IRequestOptions
 */
function getModelFromOptions(modelType, options) {
    const modelProp = `${modelType}Model`;
    const idProp = `${modelType}Id`;
    // if the options hash has the model, return it
    if (options[modelProp]) {
        return Promise.resolve(options[modelProp]);
    }
    else {
        if (options[idProp]) {
            const failSafeModel = failSafe.failSafe(themes.getModel, {
                item: { id: options[idProp] },
                isMissing: true,
            });
            return failSafeModel(options[idProp], options);
        }
        else {
            throw new Error(`getModelFromOptions requires either a .${modelProp} or .${idProp} property.`);
        }
    }
}

/**
 * Interpolate the item id back into any  {{appid}} instances
 * in the item. Allows for self-referencing in templates
 * @param {object} model Item Model
 */
function interpolateItemId(model) {
    const settings = { item: { id: model.item.id }, appid: model.item.id };
    const transforms = {
        toISO(_, v) {
            return v;
        }
    };
    return interpolate.interpolate(model, settings, transforms);
}

/**
 * Replaces instances of item ids on an item model
 * @param {Object} obj Object graph to traverse
 * @param {string} itemId id to replace with `{{appid}}`
 */
function replaceItemId(obj, itemId, replacement = "{{appid}}") {
    const clone = util.cloneObject(obj);
    const re = new RegExp(itemId, "g");
    return deepStringReplace(clone, re, replacement);
}

/**
 * Given a model, determine if it is protected, and unprotect it if it is.
 * Otherwise, just resolve with the same result.
 * @param {Object} model Model Object
 * @param {IRequestOptions} requestOptions
 */
function unprotectModel(model, requestOptions) {
    if (model.item.protected) {
        const opts = Object.assign({ id: model.item.id }, requestOptions);
        return protect.unprotectItem(opts);
    }
    else {
        // act as though we did it
        return Promise.resolve({ success: true });
    }
}

const itemPropsNotInTemplates = [
    "id",
    "isOrgItem",
    "proxyFilter",
    "ownerFolder",
    "protected",
    "owner",
    "created",
    "modified",
    "guid",
    "name",
    "access",
    "size",
    "listed",
    "numComments",
    "numRatings",
    "avgRating",
    "numViews",
    "scoreCompleteness",
    "groupDesignations",
    "listed",
    "screenshots",
    "banner",
    "appCategories",
    "industries",
    "languages",
    "largeThumbnail"
];
/**
 * Given an item, remove a standard set of properties not needed in a template
 * TODO: This should land in a templating helper lib in hub.js
 * @param {Object} item Item to be normalized
 */
function normalizeSolutionTemplateItem(item) {
    const template = util.cloneObject(item);
    itemPropsNotInTemplates.forEach(prop => {
        delete template[prop];
    });
    // set a bunch of things we do want
    template.extent = "{{organization.defaultExtentBBox}}";
    return template;
}

/**
 * Mapping between the AGO Env's and the Hub's asset CDNs
 */
const HUB_CDN_URLMAP = {
    devext: "https://hubdevcdn.arcgis.com",
    qaext: "https://hubqacdn.arcgis.com",
    www: "https://hubcdn.arcgis.com",
};

// TODO: should this take IHubRequestOptions as well as a portal?
// if so, address when we tackle https://github.com/Esri/hub.js/issues/321
/**
 * Given a Portal object, return the full Hub locale asset url
 * Used for fetching translations
 * @param {Object} portal Portal Self
 */
function getHubLocaleAssetUrl(portal) {
    if (portal.isPortal) {
        // Enterprise - use Site app as source for assets
        const baseUrl = getPortalUrl.getPortalUrl(portal);
        return `${baseUrl}/apps/sites`;
    }
    else {
        // AGO - Convert portalHostname into CDN url
        const index = portal.portalHostname.split(".")[0];
        const base = HUB_CDN_URLMAP[index] || HUB_CDN_URLMAP.www;
        return `${base}/opendata-ui/assets`;
    }
}

/**
 * Add a token to the resource request if the request is to the portal
 * @param {string} url Resource Url
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _addTokenToResourceUrl(url, requestOptions) {
    let result = url;
    if (url.indexOf("token") === -1) {
        // no token
        // Note: authentication.portal is a fully org url
        // i.e. https://dcdev.maps.arcgis.com/sharing/rest
        // this may need to be smarter to handle non-public solutions
        // shared across orgs
        if (url.indexOf(requestOptions.authentication.portal) > -1) {
            // is the portal
            result = `${url}?token=${requestOptions.authentication.token}`;
        }
    }
    return result;
}

/**
 * Given a url to an image, return it as a blob
 * @param {String} url Url to fetch the image from. Must have token if it's a non-publi item resource url
 * @param {Object} options additional optinos
 */
function fetchImageAsBlob(url, options = {}) {
    if (!options.credentials) {
        options.credentials = "same-origin";
    }
    // We use fetch intentionally as the url may or may not be for an item url, so we don't
    // want this to run thru the main request logic
    return fetch(url, options).then(response => {
        return response.blob();
    });
}

/**
 * Fetch image from a url, and upload as a resource
 * @param {Object} options {id, owner, fileName, url, authentication}
 */
function fetchAndUploadResource(options) {
    // first fetch it as a blob...
    return fetchImageAsBlob(options.url).then((file) => {
        // upload it to the item...
        return themes.addItemResource({
            id: options.id,
            owner: options.owner,
            name: options.fileName,
            resource: file,
            authentication: options.authentication
        });
    });
}

/**
 * Fetch image from a url, then upload to an item as it's thumbnail
 * @param {object} options
 */
function fetchAndUploadThumbnail(options) {
    // first fetch it as a blob...
    return fetchImageAsBlob(options.url)
        .then(file => {
        return update.updateItem({
            item: {
                id: options.id,
                owner: options.owner
            },
            params: {
                fileName: options.fileName,
                thumbnail: file
            },
            authentication: options.authentication
        }).catch(_ => {
            // resolve b/c this is not crtical
            return Promise.resolve();
        });
    })
        .catch(_ => {
        return Promise.resolve();
    });
}

/**
 * Given an item, return an array of assets that includes
 * all the resources, as well as the thumbnail
 * @param {object} item Item
 * @param {IHubRequestOptions} IHubRequestOptions
 */
function getItemAssets(item, hubRequestOptions) {
    const portalRestUrl = getPortalApiUrl.getPortalApiUrl(hubRequestOptions.portalSelf);
    const itemUrl = `${portalRestUrl}/content/items/${item.id}`;
    // if construct the asset for the thumbnail
    const thumbnailUrl = compose.getItemThumbnailUrl(item, hubRequestOptions);
    const assets = [];
    if (thumbnailUrl) {
        assets.push({
            name: item.thumbnail,
            url: thumbnailUrl,
            type: "thumbnail"
        });
    }
    // get all the other resources
    // TODO: see how this works w/ folders
    return get.getItemResources(item.id, hubRequestOptions).then(response => {
        const resourceAssets = response.resources.map((e) => {
            return {
                name: e.resource,
                type: "resource",
                url: `${itemUrl}/resources/${e.resource}`
            };
        });
        return assets.concat(resourceAssets);
    });
}

/**
 * Given an Item and an array of resources, upload them
 * @param {Object} itemModel Item add the resource to
 * @param {Array} resources Array of resources, with urls, to upload to the item
 * @param {Object} requestOptions {authentication}
 */
function uploadResourcesFromUrl(itemModel, resources, requestOptions) {
    if (Array.isArray(resources)) {
        const resourcePromises = resources.reduce((acc, resource) => {
            if (resource.url) {
                const opts = {
                    id: itemModel.item.id,
                    owner: itemModel.item.owner,
                    fileName: resource.name,
                    url: _addTokenToResourceUrl(resource.url, requestOptions),
                    authentication: requestOptions.authentication
                };
                if (resource.type === "thumbnail") {
                    acc.push(fetchAndUploadThumbnail(opts));
                }
                else {
                    // treat as a resource
                    acc.push(fetchAndUploadResource(opts));
                }
            }
            return acc;
        }, []);
        // Let them resolve...
        return Promise.all(resourcePromises);
    }
    else {
        return Promise.resolve([]);
    }
}

/**
 * Add a url property to the entries in the assets hash
 * @param {IModelTemplate} template
 * @param {IHubRequestOptions} hubRequestOptions
 */
function addSolutionResourceUrlToAssets(template, hubRequestOptions) {
    /* istanbul ignore next */
    let assets = template.assets || template.resources || [];
    if (template.bundleItemId) {
        const portalRestUrl = getPortalApiUrl.getPortalApiUrl(hubRequestOptions.portalSelf);
        // the resources are stored on the solution item, and that Id is attached
        // into the template as .bundleItemId
        const solutionItemUrl = `${portalRestUrl}/content/items/${template.bundleItemId}`;
        // the resources on the solution are prefixed with the item id of the item the
        // template was created from, which is stored as .itemId
        const prefix = template.itemId;
        // map over the resources and convert them into assets
        assets = assets.map((asset) => {
            // we fetch the resource from .url property
            // and we upload it using the .name property
            return {
                name: asset.name,
                type: asset.type || "resource",
                url: `${solutionItemUrl}/resources/${prefix}-${asset.name}`
            };
        });
    }
    return assets;
}

/**
 * Get a list
 * @param {string} siteId Item id of the Site
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getDomainsForSite(siteId, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve([]);
    }
    const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}?siteId=${siteId}`;
    const headers = domainExists._getAuthHeader(hubRequestOptions);
    return fetch(url, { method: "GET", headers, mode: "cors" })
        .then(themes._checkStatusAndParseJson)
        .catch((err) => {
        throw Error(`Error in getDomainsForSite ${err}`);
    });
}

/**
 * Determine if a domain entry belongs to a legacy site.
 * This is used to allow customers to "reclaim" domains that
 * were associated with legacy sites which can no longer be
 * edited.
 * @param {IHubDomain} domainEntry Domain Info record
 */
function isDomainForLegacySite(domainEntry) {
    return !isGuid.isGuid(domainEntry.siteId);
}

/**
 * Check to see if a domain is in use by any site other than the
 * one passed in. This is used in various validators while the
 * user is editing properties of the site.
 * @param {string} hostname to check
 * @param {string} siteId Site Id we are checking for
 * @param {IHubRequestOptions} hubRequestOptions
 */
function isDomainUsedElsewhere(hostname, siteId, hubRequestOptions) {
    return themes.lookupDomain(hostname, hubRequestOptions)
        .then((domainEntry) => {
        return domainEntry.siteId !== siteId;
    })
        .catch(() => {
        // domain entry not found, ergo not used on another site
        return false;
    });
}

/**
 * Validate a custom domain
 * @param {string} hostname to validate
 * @param {IHubRequestOptions} hubRequestOptions
 */
function isValidDomain(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`isValidDomain is not available in ArcGIS Enterprise.`);
    }
    const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/validate?hostname=${hostname}`;
    const headers = domainExists._getAuthHeader(hubRequestOptions);
    return fetch(url, { method: "GET", headers, mode: "cors" })
        .then((response) => {
        return response.json();
    })
        .catch((e) => {
        return {
            success: false,
            input: hostname,
            error: {
                code: 400,
                detail: e,
                message: "lookupFailed",
            },
        };
    });
}

/**
 * Update an entry in the domain system
 * @param {IHubDomain} domainEntry  Doman object to be updated
 * @param {IHubRequestOptions} hubRequestOptions
 */
function updateDomain(domainEntry, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`updateDomain is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = domainExists._getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${domainExists._getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${domainEntry.id}`;
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
        method: "PUT",
        headers,
        mode: "cors",
        body: JSON.stringify(domainEntry),
    }).then(themes._checkStatusAndParseJson);
}

/**
 * Builds a draft with a subset of the model properties
 * @param {*} model - item model
 * @param {*} includeList - list of property paths to include in draft object
 */
function buildDraft(model, includeList) {
    return mergeObjects.mergeObjects(model, {}, includeList);
}

/**
 * Unprotect and Remove a Group.
 * Assumed caller has checked that the current user should be able
 * to unprotect and remove the group. Underlying calls are failsafe
 * so a failure to unprotect or remove the group will not reject
 * @param {IUserGroupOptions} userGroupOptions id and authentication
 * @private
 */
function _unprotectAndRemoveGroup(userGroupOptions) {
    const failSafeUnprotect = failSafe.failSafe(remove$1.unprotectGroup, { success: true });
    const failSafeRemove = failSafe.failSafe(remove$1.removeGroup, { success: true });
    return failSafeUnprotect(userGroupOptions).then(() => {
        return failSafeRemove(userGroupOptions);
    });
}

/**
 * Locales supported by the hub
 */
const HUB_LOCALES = [
    "ar",
    "bs",
    "ca",
    "cs",
    "da",
    "de",
    "en",
    "es",
    "et",
    "el",
    "fi",
    "fr",
    "hr",
    "he",
    "hu",
    "it",
    "id",
    "ja",
    "ko",
    "lt",
    "lv",
    "nb",
    "nl",
    "pl",
    "pt",
    "pt-br",
    "pt-pt",
    "ro",
    "ru",
    "sl",
    "sr",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh",
    "zh-cn",
    "zh-tw",
    "zh-hk"
];

/**
 * Convert a requested locale into a locale we support.
 * i.e. en-ca => en
 * If the requested locale is not available, en will be returned
 * @param {string} requestedLocale Locale we want
 */
function convertToWellKnownLocale(requestedLocale = "en") {
    let wellKnownKey = "en";
    // ensure downcase
    requestedLocale = requestedLocale.toLowerCase();
    // see if it's in the hub translations as-is
    if (HUB_LOCALES.indexOf(requestedLocale) > -1) {
        wellKnownKey = requestedLocale;
    }
    else {
        // if we split the requested locale, see if we have the root in the list
        const parts = requestedLocale.split("-");
        if (parts.length > 1 && HUB_LOCALES.indexOf(parts[0]) > -1) {
            wellKnownKey = parts[0];
        }
    }
    return wellKnownKey;
}

/**
 * Fetch the Hub translation file for a given locale
 * These are all public urls and should never require auth/tokens etc
 * @param {String} locale Locale code - i.e. `es`
 * @param {Object} portal Portal Self
 */
function fetchHubTranslation(locale, portal, mode = "cors") {
    const assetBase = getHubLocaleAssetUrl(portal);
    const url = `${assetBase}/locales/${locale}.json`.toLocaleLowerCase();
    // to support web-tier auth, we must always send same-origin credentials
    const options = {
        method: "GET",
        credentials: "same-origin",
        mode
    };
    return fetch(url, options)
        .then(response => response.json())
        .catch(err => {
        throw Error(`Attempt to fetch locale ${locale} from ${url} failed: ${JSON.stringify(err)}`);
    });
}

/**
 * Return the culture from the Hub Request Options
 * In priority order: user.culture, portal.culture, en-us
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getCulture(hubRequestOptions) {
    return (getProp.getProp(hubRequestOptions, "portalSelf.user.culture") ||
        getProp.getProp(hubRequestOptions, "portalSelf.culture") ||
        "en-us");
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Gets the primary input Feature Service for the given
 * Form ID. This will be the Fieldworker view, if it exists,
 * otherwise the source Feature Service.
 * @param {string} formId The Form ID
 * @param requestOptions The request options
 * @returns {Promise<IModel>}
 */
const getInputFeatureServiceModel = (formId, requestOptions) => {
    return get.getRelatedItems(Object.assign({ id: formId, relationshipType: "Survey2Service", direction: "forward" }, requestOptions)).then(({ relatedItems: [featureService] }) => {
        let model;
        if (featureService) {
            model = { item: featureService };
        }
        return model;
    });
};

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Fetches a Survey's source Feature Service from a given
 * Fieldworker View ID
 * @param {string} fieldworkerId The Fieldworker View ID
 * @param {IRequestOptions} requestOptions The request options
 * @returns {Promise<IModel>}
 */
const getSourceFeatureServiceModelFromFieldworker = (fieldworkerId, requestOptions) => {
    return get.getRelatedItems(Object.assign({ id: fieldworkerId, relationshipType: "Service2Data", direction: "forward" }, requestOptions)).then(({ relatedItems: [featureService] }) => {
        let model;
        if (featureService) {
            model = { item: featureService };
        }
        return model;
    });
};

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Fetches a Survey's Stakeholder View for a given
 * Form ID
 * @param {string} formId A Form ID
 * @param {IRequestOptions} requestOptions The request options
 * @returns {Promise<IModel>}
 */
const getStakeholderModel = (formId, requestOptions) => {
    return get.getRelatedItems(Object.assign({ id: formId, relationshipType: "Survey2Data", direction: "forward" }, requestOptions)).then(({ relatedItems: [stakeholderView] }) => {
        let model;
        if (stakeholderView) {
            model = { item: stakeholderView };
        }
        return model;
    });
};

/**
 * Determines if the provided Feature Service item is a
 * Fieldworker View
 * @param {IItem} featureServiceItem
 * @returns {boolean}
 */
function isFieldworkerView(featureServiceItem) {
    const hasTypekeyword = (typeKeyword) => featureServiceItem.typeKeywords.indexOf(typeKeyword) > -1;
    // Survey123 only recently added the "FieldworkerView" typekeyword
    let isFieldworker = hasTypekeyword("FieldworkerView");
    // we should support previously created fieldworkers too
    if (!isFieldworker) {
        const hasExpectedTypeKeywords = [
            "Survey123",
            "Feature Service",
            "View Service",
        ].every(hasTypekeyword);
        isFieldworker =
            hasExpectedTypeKeywords && !hasTypekeyword("StakeholderView");
    }
    return isFieldworker;
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Builds a dictionary of Survey items for the given Form model
 * @param {string} formId The Form ID of the survey
 * @param {IRequestOptions} requestOptions The request options
 * @returns {Promise<IGetSurveyModelsResponse>}
 */
const getSurveyModels = (formItemOrId, requestOptions) => {
    let fieldworker;
    let stakeholder;
    const getForm = () => typeof formItemOrId === "string"
        ? get.getItem(formItemOrId, requestOptions)
        : Promise.resolve(formItemOrId);
    return getForm().then((form) => {
        const promises = [
            // the primary input will be the fieldworker (if it exists), otherwise
            // the source feature service.
            getInputFeatureServiceModel(form.id, requestOptions),
            getStakeholderModel(form.id, requestOptions),
        ];
        return Promise.all(promises)
            .then(([featureServiceOrFieldworkerModelResult, stakeholderResult]) => {
            stakeholder = stakeholderResult;
            if (featureServiceOrFieldworkerModelResult &&
                isFieldworkerView(featureServiceOrFieldworkerModelResult.item)) {
                fieldworker = featureServiceOrFieldworkerModelResult;
                // if the primary input is the fieldworker, fetch
                // the source feature service
                return getSourceFeatureServiceModelFromFieldworker(fieldworker.item.id, requestOptions);
            }
            else {
                return featureServiceOrFieldworkerModelResult;
            }
        })
            .then((featureService) => {
            return {
                form: { item: form },
                featureService,
                fieldworker,
                stakeholder,
            };
        });
    });
};

exports.HUB_CDN_URLMAP = HUB_CDN_URLMAP;
exports.HUB_LOCALES = HUB_LOCALES;
exports._addTokenToResourceUrl = _addTokenToResourceUrl;
exports._unprotectAndRemoveGroup = _unprotectAndRemoveGroup;
exports._unprotectAndRemoveItem = _unprotectAndRemoveItem;
exports.addSolutionResourceUrlToAssets = addSolutionResourceUrlToAssets;
exports.buildDraft = buildDraft;
exports.convertToWellKnownLocale = convertToWellKnownLocale;
exports.deepStringReplace = deepStringReplace;
exports.ensureUniqueString = ensureUniqueString;
exports.failSafeUpdate = failSafeUpdate;
exports.fetchAndUploadResource = fetchAndUploadResource;
exports.fetchAndUploadThumbnail = fetchAndUploadThumbnail;
exports.fetchHubTranslation = fetchHubTranslation;
exports.fetchImageAsBlob = fetchImageAsBlob;
exports.getCulture = getCulture;
exports.getDomainsForSite = getDomainsForSite;
exports.getHubLocaleAssetUrl = getHubLocaleAssetUrl;
exports.getHubProduct = getHubProduct;
exports.getInputFeatureServiceModel = getInputFeatureServiceModel;
exports.getItemAssets = getItemAssets;
exports.getModelFromOptions = getModelFromOptions;
exports.getSourceFeatureServiceModelFromFieldworker = getSourceFeatureServiceModelFromFieldworker;
exports.getStakeholderModel = getStakeholderModel;
exports.getSubscriptionType = getSubscriptionType;
exports.getSurveyModels = getSurveyModels;
exports.interpolateItemId = interpolateItemId;
exports.isDomainForLegacySite = isDomainForLegacySite;
exports.isDomainUsedElsewhere = isDomainUsedElsewhere;
exports.isFieldworkerView = isFieldworkerView;
exports.isValidDomain = isValidDomain;
exports.itemPropsNotInTemplates = itemPropsNotInTemplates;
exports.normalizeSolutionTemplateItem = normalizeSolutionTemplateItem;
exports.propifyString = propifyString;
exports.replaceItemId = replaceItemId;
exports.serializeModel = serializeModel;
exports.unprotectModel = unprotectModel;
exports.updateDomain = updateDomain;
exports.uploadResourcesFromUrl = uploadResourcesFromUrl;
exports.withoutByProp = withoutByProp;
