'use strict';

const compose = require('./compose-9b4311c9.js');
const ArcGISContextManager = require('./ArcGISContextManager-c5cc74e9.js');
const request$1 = require('./request-67da3c71.js');
const UserSession = require('./UserSession-f8bc10c8.js');
const extent = require('./extent-715f7c8d.js');
const themes = require('./themes-d539965a.js');
const request = require('./request-79b61e92.js');
const types$4 = require('./types-097b54b1.js');
const index$1 = require('./index-ef80ab27.js');
const util = require('./util-38e73510.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
const getCardModelUrl = require('./getCardModelUrl-df1328a2.js');
const EntityEditor = require('./EntityEditor-624b007b.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const get = require('./get-0368c931.js');
const searchCatalogs = require('./searchCatalogs-54a84e01.js');
const getAddContentConfig = require('./getAddContentConfig-95bb61c6.js');
const getPredicateValues = require('./getPredicateValues-091930af.js');
const deepCatalogContains = require('./deepCatalogContains-07573ead.js');
const parseContainmentPath = require('./parseContainmentPath-aaf496c0.js');
const Catalog = require('./Catalog-acebae88.js');
const _enrichments = require('./_enrichments-a40a3850.js');
const OperationError = require('./OperationError-902f34ae.js');
const HubError = require('./HubError-44e07249.js');
const index = require('./index-058372c1.js');
const requestAssociation = require('./requestAssociation-4b93d346.js');
const types = require('./types-435b0880.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const getAssociationStats = require('./getAssociationStats-7c4b8543.js');
const getRequestingEntitiesQuery = require('./getRequestingEntitiesQuery-f51a983a.js');
const getReferencedEntityIds = require('./getReferencedEntityIds-6e14c8eb.js');
const setEntityAssociationGroup = require('./setEntityAssociationGroup-5a19cf97.js');
const canEditItem = require('./can-edit-item-dbe0eb1b.js');
const getFamily = require('./get-family-cafa88bb.js');
const tslib_es6$1 = require('./tslib.es6-b6cfa7d7.js');
const slugs = require('./slugs-8f743e2c.js');
const isService = require('./is-service-9b8238d2.js');
const getService = require('./getService-b27eda44.js');
const wait = require('./wait-f2a4dd5d.js');
const edit = require('./edit-3df37e35.js');
const fetchContent = require('./fetchContent-963f3885.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const setProp = require('./set-prop-3de2437f.js');
const getFormJson = require('./get-form-json-e6831b20.js');
const fetchItemJobRecords = require('./fetchItemJobRecords-cef4e48d.js');
const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
const getRelativeWorkspaceUrl = require('./getRelativeWorkspaceUrl-6dfbafa1.js');
const IHubTimeline = require('./IHubTimeline-228e135a.js');
const Metrics = require('./Metrics-b8657153.js');
const Embeds = require('./Embeds-c8a9bd0a.js');
const types$1 = require('./types-60347c5c.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
const subschemas = require('./subschemas-61a41e85.js');
const CatalogSchema = require('./CatalogSchema-d9a0c750.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const processActionLinks = require('./processActionLinks-c32c67ce.js');
const getS123EditUrl = require('./get-s123-edit-url-a968dd82.js');
const unshareEntityWithGroups = require('./unshareEntityWithGroups-08f84f4d.js');
const getEntityGroups = require('./getEntityGroups-94291c98.js');
const getEntityThumbnailUrl = require('./getEntityThumbnailUrl-4312f5ce.js');
const deepContains = require('./deepContains-7989f3f1.js');
const buildExistingExportsPortalQuery = require('./build-existing-exports-portal-query-14cf7807.js');
const types$2 = require('./types-2810dd27.js');
const fetchDownloadFile = require('./fetchDownloadFile-a4e4466c.js');
const canUseHubDownloadSystem = require('./canUseHubDownloadSystem-5b330e55.js');
const getDownloadFormats = require('./getDownloadFormats-a9f297e8.js');
const getDownloadConfiguration = require('./getDownloadConfiguration-1ed2582d.js');
const getSurveyModels = require('./get-survey-models-91e3efef.js');
const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl$1 = require('./get-portal-url-44f2448f.js');
const updateUserMembership = require('./update-user-membership-4af88c1c.js');
const addGroupMembers = require('./addGroupMembers-9652622a.js');
const hubSearch = require('./hubSearch-79d30702.js');
const HubGroup = require('./HubGroup-77577f1f.js');
const getWellKnownGroup = require('./getWellKnownGroup-f4de91c5.js');
const edit$1 = require('./edit-fd85c003.js');
const utils = require('./utils-7f390376.js');
const channels = require('./channels-bf478342.js');
const settings = require('./settings-0b8cd93b.js');
const discussionsApiRequest = require('./discussions-api-request-e9e6e346.js');
const edit$2 = require('./edit-2b7ccc3f.js');
const fetch$1 = require('./fetch-1292fb6b.js');
const types$3 = require('./types-751ad3a9.js');
const getEventGroups = require('./getEventGroups-6c371c3e.js');
const deleteProp = require('./delete-prop-7826ae49.js');
const interpolate = require('./interpolate-c1fe951a.js');
const shareItemToGroups = require('./share-item-to-groups-6bc2a4bc.js');
const unshareItemFromGroups = require('./unshare-item-from-groups-3f34f54a.js');
const search = require('./search-2db68ef4.js');
const batch = require('./batch-180e8ec7.js');
const getStructuredLicense = require('./get-structured-license-4e9f994b.js');
const getEditorSlug = require('./getEditorSlug-eeb95a05.js');
const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const createItemFromUrlOrFile = require('./create-item-from-url-or-file-1a2bf39f.js');
const follow = require('./follow-c7e71158.js');
const _deepMapValues = require('./_deep-map-values-d489006b.js');
const deepSet = require('./deep-set-49b373be.js');
const mergeObjects = require('./merge-objects-b31af1a3.js');
const deepFilter = require('./deepFilter-69230ab7.js');
const deepFind = require('./deepFind-662aa4bf.js');
const fetchOrg = require('./fetch-org-d214b65b.js');
const HubPage = require('./HubPage-0395747a.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const enrichEntity = require('./enrichEntity-1632b924.js');
const objectToJsonBlob = require('./object-to-json-blob-5c0a267d.js');
const validateUrl = require('./validate-url-3bd483e6.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const domainExists = require('./domain-exists-0c69176a.js');
const HubSite = require('./HubSite-fab90409.js');
const previewFeed = require('./previewFeed-111ab312.js');
const getPortalUrl = require('./get-portal-url-68b1f527.js');
const getItemHomeUrl = require('./get-item-home-url-b1e3ff74.js');
const getPortalBaseFromOrgUrl = require('./getPortalBaseFromOrgUrl-393e8178.js');
const cacheBustUrl = require('./cacheBustUrl-e8fc7455.js');
const getCdnAssetUrl = require('./get-cdn-asset-url-2eb06652.js');
const encoding = require('./encoding-211adb23.js');
const failSafe = require('./fail-safe-33c35b7f.js');
const generateRandomString = require('./generate-random-string-8807d629.js');
const isGuid = require('./is-guid-b5c2b74c.js');
const mapBy = require('./map-by-a7a75788.js');
const slugify = require('./slugify-826af07b.js');
const logger = require('./logger-5db3d659.js');
const isUpdateGroup = require('./is-update-group-36bf5d24.js');
const dasherize = require('./dasherize-f02a08e0.js');
const titleize = require('./titleize-c8daa6a2.js');
const poll = require('./poll-7962a495.js');
const getDefaultEventDatesAndTimes = require('./getDefaultEventDatesAndTimes-99ac0275.js');
const isComboboxItemSelected = require('./isComboboxItemSelected-b7c5a130.js');
const updateVersionMetadata = require('./updateVersionMetadata-3ded56b8.js');
const getEntityMetrics = require('./getEntityMetrics-b6d0cdfa.js');
const resolveMetric = require('./resolveMetric-47df0783.js');
require('./helpers-64227739.js');
require('./clean-url-1dfecac0.js');
require('./get-user-5eecc1c4.js');
require('./get-portal-6ca924c2.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./append-custom-params-0f5d0fe2.js');
require('./slugs-9d179f70.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./getDownloadFlow-94a34207.js');
require('./utils-5a74b66e.js');
require('./remove-921f5dc7.js');
require('./get-52661c13.js');
require('./defaults-abee9bee.js');
require('./events-7873340d.js');
require('./unshareEventWithGroups-609ca09c.js');
require('./search-b00c4c79.js');
require('./TemplateBusinessRules-5564c964.js');
require('./PropertyMapper-785e5c9f.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./update-7b2b2d9d.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./helpers-05252545.js');
require('./share-item-with-group-6c27286f.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getLayer-0c83b4c1.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');
require('./access-049994c9.js');
require('./sharedWith-ca14e4af.js');
require('./protect-56ea038d.js');
require('./remove-df88a78e.js');
require('./registrations-a6dd52b7.js');
require('./getPropertyMap-030ec7b2.js');

/**
 * Send a notification to members of the requesting user's org.
 * Operation success will be indicated by a flag on the return
 * object. If there are any errors, they will be placed in an
 * errors array on the return object
 *
 * ```js
 * const authentication: IAuthenticationManager; // Typically passed into to the function
 * //
 * const options: IInviteGroupUsersOptions = {
 *  id: 'group_id',
 *  users: ['larry', 'curly', 'moe'],
 *  notificationChannelType: 'email',
 *  expiration: 20160,
 *  authentication
 * }
 * //
 * const result = await createOrgNotification(options);
 * //
 * const if_success_result_looks_like = {
 *  success: true
 * }
 * //
 * const if_failure_result_looks_like = {
 *  success: false,
 *  errors: [ArcGISRequestError]
 * }
 * ```
 * @param {ICreateOrgNotificationOptions} options
 *
 * @returns {ICreateOrgNotificationResult}
 */
function createOrgNotification(options) {
    var url = getPortalUrl$1.getPortalUrl(options) + "/portals/self/createNotification";
    var batches = _generateBatchRequests(options);
    var promises = batches.map(function (batch) { return _sendSafeRequest(url, batch); });
    return Promise.all(promises).then(_combineResults);
}
/**
 * @private
 */
function _generateBatchRequests(options) {
    var userBatches = updateUserMembership.chunk(options.users, options.batchSize || 25);
    return userBatches.map(function (users) { return _generateRequestOptions(users, options); });
}
/**
 * @private
 */
function _generateRequestOptions(users, baseOptions) {
    var requestOptions = Object.assign({}, baseOptions);
    requestOptions.params = tslib_es6.__assign(tslib_es6.__assign({}, requestOptions.params), { users: users, subject: baseOptions.subject, message: baseOptions.message, notificationChannelType: requestOptions.notificationChannelType });
    return requestOptions;
}
/**
 * @private
 */
function _sendSafeRequest(url, requestOptions) {
    return request$1.request(url, requestOptions)
        .catch(function (error) { return ({ errors: [error] }); });
}
/**
 * @private
 */
function _combineResults(responses) {
    var success = responses.every(function (res) { return res.success; });
    var errors = responses.reduce(function (collection, res) { return collection.concat(res.errors || []); }, []);
    var combined = { success: success };
    if (errors.length > 0) {
        combined.errors = errors;
    }
    return combined;
}

/**
 * Ensure that an object has a deep property path.
 * This will replace any existing object at the end of the path
 * @param {Object} target Object we want to ensure has some deep property
 * @param {string} path Dotted path to the property we want to ensure exists
 */
function ensureProp(target, path) {
    return deepSet.deepSet(target, path);
}

/**
 * Given an array of prop paths, return all the values that exist, in an array
 */
function getProps(obj, props) {
    return props.reduce((a, p) => {
        const v = getProp.getProp(obj, p);
        if (v) {
            a.push(v);
        }
        return a;
    }, []);
}

/**
 * Resolve all $use references in an object graph.
 * The $use syntax is relative to an entire object so
 * the developer must ensure they resolve the references
 * on the same graph they were defined on.
 * Put another way, you can't resolve references on a subset
 * of an object graph.
 * @param obj
 * @param ctx
 * @returns
 */
function resolveReferences(obj, ctx) {
    const keys = Object.keys(obj);
    ctx = ctx || util.cloneObject(obj);
    const newObject = keys.reduce(function (acc, currentKey) {
        // if the value is an array, map over it
        if (Array.isArray(obj[currentKey])) {
            acc[currentKey] = obj[currentKey].map((entry) => {
                return resolveReferences(entry, ctx);
            });
        }
        // if the value is an object, resolve it's references
        else if (obj[currentKey] &&
            _deepMapValues._isObject(obj[currentKey]) &&
            !_deepMapValues._isDate(obj[currentKey]) &&
            !_deepMapValues._isRegExp(obj[currentKey]) &&
            !_deepMapValues._isFunction(obj[currentKey])) {
            // if the value is an object it may be a reference
            if (obj[currentKey] && obj[currentKey].$use) {
                // use getProp to resolve the reference
                const useRef = getProp.getProp(ctx, obj[currentKey].$use);
                if (_deepMapValues._isObject(useRef)) {
                    // references could contain references, so resolve them
                    acc[currentKey] = resolveReferences(useRef, ctx);
                }
                else {
                    acc[currentKey] = useRef;
                }
            }
            else {
                acc[currentKey] = resolveReferences(obj[currentKey], ctx);
            }
        }
        else {
            // assign value
            acc[currentKey] = obj[currentKey];
        }
        return acc;
    }, {});
    return newObject;
}

/**
 * Recursively deletes properties from an object or array that have a
 * specific value.
 *
 * Hub commonly applies migrations to entities on load. During those
 * migrations, often we want to delete properties to clean things up.
 * However, during the save process, we typically fetch the entity
 * from it's backing store and spread the migrated entity over the top of
 * the fetched entity. This results in the deleted props being re-added.
 *
 * To avoid this, instead of deleting the props in the migration,
 * we can set them to a specific value (e.g. `remove-this-prop`) and then
 * use this function to remove them, after the merge.
 *
 * @param object - The object or array to delete properties from.
 * @param value - The value to match and delete.
 * @returns The modified object or array with properties deleted.
 */
function deepDeletePropByValue(object, value) {
    // If the object is the value we want to delete, return undefined
    if (getFormJson.deepEqual(object, value)) {
        return undefined;
    }
    // If the object is an array, iterate over the array and recurse
    // on the entries
    if (Array.isArray(object)) {
        return object.reduce((acc, entry) => {
            if (deepFilter.isFindable(entry)) {
                const recursedObject = deepDeletePropByValue(entry, value);
                if (recursedObject !== undefined) {
                    acc = [...acc, recursedObject];
                }
            }
            else {
                if (entry !== value) {
                    acc = [...acc, entry];
                } // else we are excluding this entry
            }
            return acc;
        }, []);
    }
    if (_deepMapValues._isObject(object)) {
        return Object.keys(object).reduce((acc, key) => {
            // if this is an object but not a date, regexp, or function, recurse
            if (deepFilter.isFindable(object[key]) && !getFormJson.deepEqual(object[key], value)) {
                const filteredEntry = deepDeletePropByValue(object[key], value);
                acc[key] = filteredEntry;
            }
            else {
                // ensure the value is not the value we want to delete
                if (!getFormJson.deepEqual(object[key], value)) {
                    acc = Object.assign(Object.assign({}, acc), { [key]: object[key] });
                } // else this key matches the value and we are excluding it
            }
            return acc;
        }, {});
    }
    else {
        // just return the object b/c it's not something we can compare
        // e.g. a function
        return object;
    }
}

const validServices = [
    "portal",
    "discussions",
    "events",
    "metrics",
    "notifications",
    "hub-search",
    "domains",
    "hub-downloads",
];
/**
 * Validate a Service
 * @param service
 * @returns
 */
function isHubService(maybeService) {
    return validServices.includes(maybeService);
}

/**
 * Given a string, append a `- 1` on the end if no number is present
 * otherwise, increment the number
 * @param {string} str String to increment
 */
function incrementString(str) {
    const matches = str.match(/-\s(\d+$)/);
    if (matches) {
        // get the number
        const current = parseInt(matches[1], 10);
        // replace `- current` with `- current + 1`
        const next = current + 1;
        str = str.replace(`- ${current}`, `- ${next}`);
    }
    else {
        str = str + " - 1";
    }
    return str;
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Runs the given task and returns a IRevertableTaskResult
 * @param {Function} task A task method to run
 * @param {Function} revert A method to revert the task
 * @returns {Promise<IRevertableTaskResult>}
 */
const runRevertableTask = (task, revert) => {
    return task()
        .then(results => {
        return {
            status: "fullfilled",
            results,
            revert
        };
    })
        .catch(error => {
        return { status: "rejected", error };
    });
};
/**
 * Processes an Array of Promise<IRevertableTaskResult>. When all IRevertableTaskResult
 * are IRevertableTaskSuccess, it resolves an Array of all result values. If any
 * IRevertableTaskResult are IRevertableTaskFailed, it reverts all IRevertableTaskSuccess
 * and rejects with the first IRevertableTaskFailed error
 * @param revertableTasks
 * @returns {Promise<any[]>}
 */
const processRevertableTasks = (revertableTasks) => {
    return Promise.all(revertableTasks).then(results => {
        const isFullfilled = (result) => result.status === "fullfilled";
        const successfulTasks = results.filter(isFullfilled);
        const failedTasks = results.filter((result) => !isFullfilled(result));
        if (failedTasks.length) {
            const reverts = successfulTasks.map(task => task.revert());
            // fire & forget
            /* tslint:disable no-empty */
            Promise.all(reverts).catch(() => { });
            /* tslint:enable no-empty */
            throw failedTasks[0].error;
        }
        const returnResults = successfulTasks.map((result) => result.results);
        return returnResults;
    });
};

/**
 * Create a cache key from an array of arguments
 * @param args
 * @returns
 */
const createCacheKeyFromArgs = (args) => args.reduce((cacheKey, arg) => (cacheKey += `_${typeof arg === "object" ? JSON.stringify(args) : `${arg}`}_`), "");
let memoizedFnCache = {};
/**
 * Wrap a function into a memoized version of itself. Multiple calls for the same function
 * will return the same memoized function - thus enabling a shared cache of results.
 * `const memoizedItemSearch = memoize(searchItems);`
 * @param fn
 * @returns
 */
const memoize = (fn) => {
    if (!memoizedFnCache[`_${fn.name}`]) {
        const cache = {};
        const memoizedFn = (...args) => {
            const cacheKey = createCacheKeyFromArgs(args);
            if (cache[cacheKey]) {
                return cache[cacheKey];
            }
            const asyncFn = fn.call(undefined, ...args);
            cache[cacheKey] = asyncFn;
            return asyncFn;
        };
        memoizedFnCache[`_${fn.name}`] = memoizedFn;
    }
    return memoizedFnCache[`_${fn.name}`];
};
/**
 * Clear the cache of a memoized function
 * If no function name is provided, the entire cache is cleared
 * This is useful for testing, but should not be used in production
 * @param fn
 */
const clearMemoizedCache = (fnName) => {
    if (!fnName) {
        memoizedFnCache = {};
        return;
    }
    else {
        delete memoizedFnCache[`_${fnName}`];
    }
};

/**
 * Apply a hash of properties to an array of items.
 * Extracted to simplify testing.
 * @param {array} items Array of items to apply the properties to
 * @param {object} props hash of properties to apply to the item
 */
function applyPropertiesToItems(items, props) {
    return items.map((item) => {
        if (!item.properties) {
            item.properties = {};
        }
        Object.assign(item.properties, props);
        return item;
    });
}

/**
 * Check if a site/page exists with a specific name
 */
function doesItemExistWithTitle(itemTitle, options, authMgr) {
    // if options have multiple properties, put them into one string separated with 'AND'
    const optionsQuery = Object.keys(options)
        .map(key => {
        return `${key}:"${options[key]}"`;
    })
        .join(" AND ");
    const opts = {
        q: `title:"${itemTitle}" AND ${optionsQuery}`,
        authentication: authMgr
    };
    return search.searchItems(opts)
        .then(searchResponse => searchResponse.results.length > 0)
        .catch(e => {
        throw Error(`Error in doesItemExistWithTitle ${e}`);
    });
}

/**
 * Given a title, construct a site/page title that is unique
 * if that title exists, this fn will add a number on the end, and increment until
 * an available title is found
 * @param {string} title site/page title to ensure if unique
 * @param {object} options an object that can be passed in to the q, eg. typekeywords, type
 * @param {object} authMgr auth info tells the function what url to use for the "root" of the API,
 * if missing, it will search against PROD
 * @param {number} step Number to increment. Defaults to 0
 */
function getUniqueItemTitle(title, options, authMgr, step = 0) {
    let combinedName = title;
    if (step) {
        combinedName = `${title} ${step}`;
    }
    return doesItemExistWithTitle(combinedName, options, authMgr)
        .then(result => {
        if (result) {
            step++;
            return getUniqueItemTitle(title, options, authMgr, step);
        }
        else {
            return combinedName;
        }
    })
        .catch(e => {
        throw Error(`Error in getUniqueItemTitle ${e}`);
    });
}

const MAX_NUM = 100;
/**
 * Fetches all the pages in a search request
 * @param {SearchFunction} searchFunc
 * @param {ISearchOptions} opts
 * @param {number} limit
 * @param {batchSize} number of concurrent requests at a time
 * @returns {Promise<SearchableType[]>}
 */
function fetchAllPages(searchFunc, opts, limit = -1, batchSize) {
    const pageSize = opts.num || MAX_NUM;
    const firstStart = opts.start || 1;
    // If a limit is provided, we don't have to use the first request to get the
    // total count before sending things off to batch(). So instead we fake the first
    // response just to set things up.
    const promise = limit === -1
        ? searchFunc(Object.assign(Object.assign({}, opts), { num: pageSize, start: firstStart }))
        : Promise.resolve({
            nextStart: firstStart,
            total: limit,
            results: [],
            num: pageSize
        });
    return promise
        .then(firstResponse => {
        // no more requests needed, return the first response
        if (firstResponse.nextStart === -1)
            return [firstResponse];
        // generate batch requests for the remaining pages to fetch
        const starts = [];
        for (let i = firstResponse.nextStart; i <= firstResponse.total; i += pageSize) {
            starts.push(i);
        }
        const batchSearchFunc = (start) => searchFunc(Object.assign(Object.assign({}, opts), { start, num: pageSize }));
        return batch.batch(starts, batchSearchFunc, batchSize).then(responses => [
            firstResponse,
            ...responses
        ]);
    })
        .then(responses => {
        // merge all the search results into a single array
        const results = responses.reduce((acc, response) => [
            ...acc,
            ...response.results
        ], []);
        // discard results beyond the limit if applicable
        const clipLimit = limit === -1 ? results.length : limit;
        return results.slice(0, clipLimit);
    });
}

/**
 * Add protocol or upgrade http to https
 * @param {string} url
 */
function upgradeProtocol(url) {
    if (url.indexOf("http") === -1) {
        return `https://${url}`;
    }
    else if (url.indexOf("http://") !== -1) {
        return url.replace(/^http:/i, "https:");
    }
    return url;
}

/**
 * Given a url without a protocol or with either http or https, return an array
 * that contains both the http and https version
 * @param {string} uri Url with either http or https, or no protocol
 * @private
 */
function _getHttpAndHttpsUris(uri) {
    if (!uri) {
        return [];
    }
    const domain = uri.replace(/^http(s?):\/\//, "");
    return [`http://${domain}`, `https://${domain}`];
}

/**
 * Wrapper over window.location
 * @private
 */
/* istanbul ignore next */
function _getLocation() {
    /* istanbul ignore next */
    if (window) {
        return window.location;
    }
}

/**
 * Return the Hub Url based on the portal self
 * @param portal
 */
function getHubUrlFromPortal(portal) {
    if (portal.isPortal) {
        throw new Error(`Hub Url is not available in ArcGIS Enterprise`);
    }
    else {
        return compose._getHubUrlFromPortalHostname(portal.portalHostname);
    }
}

/**
 * Return the Portal url based on the portal self
 * @param {Object} portal Portal Self
 */
function getHubApiUrlFromPortal(portal) {
    return `${getHubUrlFromPortal(portal)}/api/v3`;
}

/**
 * Convert urls in a string to hyperlinks
 * @param {content} string
 */
function convertUrlsToAnchorTags(content) {
    const urls = content.match(/((((ftp|https?):\/\/)|(w{3}\.))[-\w@:%_+.~#?,&//=]+)/g);
    if (urls) {
        urls.forEach(function (url) {
            content = content.replace(url, '<a target="_blank" href="' + url + '">' + url + "</a>");
        });
    }
    return content.replace("(", "<br/>(");
}

/**
 * Builds a Hub "campaign" URL used as a single entry-point into
 * Hub from external links, i.e. push notifications, emails, sms, etc,
 * from which we can capture campaign-related telemetry before redirecting
 * the user off to a provided destination.
 * @param options.portal A string IPortal IHubRequestOptions or IRequestOptions object
 * @param options.uri A URI that provides additional context for how to parse the provide meta
 * @param options.meta An object of metadata for the campaign URL
 * @param options.redirectURL A redirect URL
 * @returns string A campaign URL
 */
function getCampaignUrl(options) {
    const { portal } = options, data = tslib_es6$1.__rest(options, ["portal"]);
    const portalUrl = getPortalUrl.getPortalUrl(portal);
    const hubURL = compose._getHubUrlFromPortalHostname(portalUrl);
    const url = new URL(`${hubURL}/c`);
    const b64Data = index.abab.btoa(JSON.stringify(data));
    url.searchParams.set("d", b64Data);
    return url.toString();
}

const SAFE_REDIRECT_URL = new RegExp("^https?:\\/\\/([a-z0-9-]+\\.)*(arcgis|esri)\\.com");
const HTTP_PROTOCOL = new RegExp("^https?:$");
/**
 * Determines if a given URL is safe to redirect to.
 * All URLs to *.esri.com and *.arcgis.com are considered
 * safe. Non esri/arcgis domains must have a domain record.
 * @param options.url url A URL
 * @param ...options An IHubRequestOptions object
 * @returns a promise that resolves a boolean
 */
async function isSafeRedirectUrl(options) {
    const { url } = options, hubRequestOptions = tslib_es6$1.__rest(options, ["url"]);
    let isSafe;
    try {
        isSafe = SAFE_REDIRECT_URL.test(url);
        if (!isSafe) {
            const { protocol, hostname } = new URL(url);
            if (!HTTP_PROTOCOL.test(protocol)) {
                throw new Error("invalid protocol");
            }
            isSafe = await domainExists.domainExists(hostname, hubRequestOptions);
        }
    }
    catch (e) {
        isSafe = false;
    }
    return isSafe;
}

/**
 * @private
 * @internal
 * Register an Item as an application, enabling oAuth flows at custom
 * domains. Only item types with "Application" in the name are valid
 * with this API call.
 * @param {string} itemId Item Id of item to create an application for
 * @param {Array} redirectUris Array of valid redirect uris for the app
 * @param {string} appType Defaults to "browser"
 * @param {IRequestOptions} requestOptions
 */
function registerBrowserApp(itemId, redirectUris, requestOptions) {
    const url = `${getPortalApiUrl.getPortalApiUrl(requestOptions)}/oauth2/registerApp`;
    const options = {
        method: "POST",
        authentication: requestOptions.authentication,
        params: {
            itemId,
            appType: "browser",
            redirect_uris: JSON.stringify(redirectUris),
        },
    };
    return request$1.request(url, options);
}

// TODO: remove this at next breaking version
/**
 * ```js
 * import { getCategory } from "@esri/hub-common";
 * //
 * getCategory('Feature Layer')
 * > 'dataset'
 * ```
 * **DEPRECATED: Use getFamily() instead**
 * returns the Hub category for a given item type
 * @param itemType The ArcGIS [item type](https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm).
 * @returns the category of a given item type.
 */
/* istanbul ignore next deprecated */
function getCategory(itemType = "") {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: Use getFamily() instead. getCategory will be removed at the next breaking version");
    /* tslint:enable no-console */
    const collection = getFamily.getCollection(itemType);
    // for backwards compatibility
    return collection === "feedback" ? "app" : collection;
}
/**
 * ```js
 * import { getTypes } from "@esri/hub-common";
 * //
 * getTypes('site')
 * > [ 'hub site application' ]
 * ```
 * To do.
 * @param category The ArcGIS Hub category.
 * @returns all the item types for the given category.
 *
 */
function getTypes(category = "") {
    return compose.categories[category.toLowerCase()];
}
/**
 * ```js
 * import { getTypeCategories } from "@esri/hub-common";
 * //
 * getTypeCategories(item)
 * > [ 'Hub Site Application' ]
 * ```
 * **DEPRECATED: getTypeCategories will be removed at the next breaking version**
 * @param item Item object.
 * @returns typeCategory of the input item.
 *
 */
/* istanbul ignore next deprecated */
function getTypeCategories(item = {}) {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: getTypeCategories will be removed at the next breaking version");
    /* tslint:enable no-console */
    const type = compose.normalizeItemType(item);
    const category = getCategory(type);
    if (category) {
        // upper case first letter and return as element in array for backwards compatibility
        const chars = Array.from(category);
        chars[0] = chars[0].toUpperCase();
        return [chars.join("")];
    }
    else {
        return ["Other"];
    }
}
/**
 * ```js
 * import { getContentIdentifier } from "@esri/hub-common";
 * //
 * getContentIdentifier(content, site)
 * > 'f12hhjk32' // id
 * // OR
 * > 'content-slug' // human-readable slug
 * ```
 * Returns the preferred identifier for a piece of content (determined by content type):
 * - Content from the 'template' and 'feedback' families return the standard id field
 * - Pages that are linked to the site parameter will return the slug defined by the site. Otherwise, the page id will be returned
 * - All other content will return the highest available item in the following hierarchy:
 *   1. slug - includes org prefix if the site parameter is a portal or has an orgKey different from the slug prefix
 *   2. hubId
 *   3. id
 * @param content The IHubContent item
 * @param site The site to compare content against
 * @returns the preferred id for the given content.
 */
function getContentIdentifier(content, site) {
    // We don't currently support slugs for hub initiative templates, solutions or surveys
    if (compose.includes(["template", "feedback"], content.family)) {
        return content.id;
    }
    // If it is a hub page linked to a site, return the page slug at the
    // site data instead. Because this one is the original one that was used
    // to create the page url (not mutable once created) and the slug (below)
    // generated by the hub-indexer could simply change with page name.
    if (compose.isPageType(content.type, content.typeKeywords)) {
        // check if the page is linked to the current site
        const pages = getProp.getProp(site, "data.values.pages") || [];
        // if so, return the page slug otherwise the page id
        const page = pages.find((p) => p.id === content.id);
        return page ? page.slug : content.id;
    }
    // If a slug is present, always return it
    if (content.slug) {
        let slug;
        const orgKey = getProp.getProp(site, "domainInfo.orgKey");
        // Use namespaced slug when on the umbrella site
        if (getProp.getProp(site, "data.values.isUmbrella")) {
            slug = content.slug;
        }
        else {
            // Use shortened slug if the slug's namespace is the same as the orgKey
            slug = slugs.removeContextFromSlug(content.slug, orgKey);
        }
        return slug;
    }
    return content.hubId || content.id;
}
/**
 * Convert a Portal item to Hub content
 *
 * @param item Portal Item
 * @returns Hub content
 * @export
 */
function itemToContent(item) {
    return compose.composeContent(item);
}
/**
 * Convert a Hub API dataset resource to Hub Content
 *
 * @param {DatasetResource} Dataset resource
 * @returns {IHubContent} Hub content object
 * @export
 */
function datasetToContent(dataset) {
    // extract item from dataset, create content from the item
    const item = datasetToItem(dataset);
    // extract enrichments from attributes
    const { 
    // item enrichments
    errors, boundary, metadata, slug, groupIds, orgId, orgName, organization, orgExtent, 
    // map and feature server enrichments
    server, layers, layer, recordCount, statistics, 
    // additional attributes needed
    extent, searchDescription, } = dataset.attributes;
    // get the layerId from the layer
    const layerId = layer && layer.id;
    // re-assemble the org as an enrichment
    const org = orgId && {
        id: orgId,
        name: orgName || organization,
        extent: orgExtent,
    };
    // compose a content out of the above
    return compose.composeContent(item, {
        layerId,
        slug,
        errors,
        // setting this to null signals to enrichMetadata to skip this
        metadata: metadata || null,
        groupIds,
        org,
        server,
        layers,
        recordCount,
        boundary,
        extent,
        searchDescription,
        statistics,
    });
}
/**
 * Convert a Hub API dataset resource to a portal item
 *
 * @param {DatasetResource} Dataset resource
 * @returns {IItem} portal item
 * @export
 */
function datasetToItem(dataset) {
    if (!dataset) {
        return;
    }
    const { id, attributes } = dataset;
    if (!attributes) {
        return;
    }
    // parse item id
    const { itemId } = slugs.parseDatasetId(id);
    // read item properties from attributes
    // NOTE: we attempt to read all item properties
    // even though some may not be currently returned
    const { 
    // start w/ item properties from
    // https://developers.arcgis.com/rest/users-groups-and-items/item.htm
    owner, orgId, created, 
    // the Hub API returns item.modified in attributes.itemModified (below)
    modified, 
    // NOTE: we use attributes.name to store the title or the service/layer name
    // but in Portal name is only used for file types to store the file name (read only)
    name, title, type, typeKeywords, description, snippet, tags, thumbnail, 
    // the Hub API returns item.extent in attributes.itemExtent (below)
    // extent,
    categories, contentStatus, 
    // the Hub API doesn't currently return spatialReference
    spatialReference, 
    // the Hub API doesn't currently return accessInformation
    accessInformation, licenseInfo, culture, url, access, 
    // the Hub API doesn't currently return proxyFilter
    proxyFilter, properties, 
    // the Hub API doesn't currently return appCategories, industries,
    // languages, largeThumbnail, banner, screenshots, listed, ownerFolder
    appCategories, industries, languages, largeThumbnail, banner, screenshots, listed, ownerFolder, size, 
    // the Hub API doesn't currently return protected
    protected: isProtected, commentsEnabled, 
    // the Hub API doesn't currently return numComments, numRatings,
    // avgRating, numViews, itemControl, scoreCompleteness
    numComments, numRatings, avgRating, numViews, itemControl, scoreCompleteness, 
    // additional attributes we'll need
    // to derive the above values when missing
    itemExtent, itemModified, modifiedProvenance, serviceSpatialReference, } = attributes;
    // layer datasets will get their type from the layer
    // so we will need to derive the item type from the URL
    const serviceType = url && index$1.getServiceTypeFromUrl(url);
    // build and return an item from properties
    // NOTE: we currently do NOT provide default values
    // (i.e. null for scalar attributes, [] for arrays, etc)
    // for attributes that are not returned by the Hub API
    // this helps distinguish an item that comes from the API
    // but forces all consumers to do handle missing properties
    return {
        id: itemId,
        owner: owner,
        orgId,
        created: created,
        // for feature layers, modified will usually come from the layer so
        // we prefer itemModified, but fall back to modified if it came from the item
        modified: (itemModified ||
            (modifiedProvenance === "item.modified" && modified)),
        title: (title || name),
        type: serviceType || type,
        typeKeywords,
        description,
        tags,
        snippet,
        thumbnail,
        extent: itemExtent ||
            /* istanbul ignore next: API should always return itemExtent, but we default to [] just in case */ [],
        categories,
        contentStatus,
        spatialReference: spatialReference || serviceSpatialReference,
        accessInformation,
        licenseInfo,
        culture,
        url,
        access,
        size,
        protected: isProtected,
        proxyFilter,
        properties,
        appCategories,
        industries,
        languages,
        largeThumbnail,
        banner,
        screenshots,
        listed,
        ownerFolder,
        commentsEnabled,
        numComments,
        numRatings,
        avgRating,
        numViews,
        itemControl,
        scoreCompleteness,
    };
}
/**
 * returns a new content that has the specified type and
 * and updated related properties like, family, etc
 * @param content orignal content
 * @param type new type
 * @returns new content
 */
const setContentType = (content, type) => {
    // get family and normalized type based on new type
    const normalizedType = compose.normalizeItemType(Object.assign(Object.assign({}, content.item), { type }));
    const family = getFamily.getFamily(normalizedType);
    const contentTypeIcon = compose.getContentTypeIcon(normalizedType);
    const contentTypeLabel = getContentTypeLabel(normalizedType, content.isProxied);
    const updated = Object.assign(Object.assign({}, content), { type: normalizedType, family,
        contentTypeIcon,
        contentTypeLabel });
    // update the relative URL to the content
    // which is based on type and family
    return appendContentUrls(updated, {
        relative: getContentRelativeUrl(updated),
    });
};
/**
 * Compute the content type label
 * @param contentType
 * @param isProxied
 * @returns content type label
 */
const getContentTypeLabel = (contentType, isProxied) => {
    return isProxied ? "CSV" : util.camelize(contentType || "");
};
// URL helpers
const appendContentUrls = (content, newUrls) => {
    // merge new urls into existing ones and return a new content
    const urls = Object.assign(Object.assign({}, content.urls), newUrls);
    return Object.assign(Object.assign({}, content), { urls });
};
const getContentRelativeUrl = (content, siteIdentifier) => {
    return compose.getHubRelativeUrl(content.type, siteIdentifier || content.identifier, content.typeKeywords);
};
// Tests can be found in packages/common/test/content/content.test.ts
const availability = (status) => {
    return {
        kind: "service",
        service: {
            availability: status,
        },
    };
};
/**
 * Get the status of a content item
 * @param entity the content item
 * @returns the status of the content item
 */
async function getServiceStatus(entity, options) {
    // get the request options for the `getService` call, and set a default timeout if one is not provided
    const { timeout = 3000 } = options, requestOptions = tslib_es6$1.__rest(options, ["timeout"]);
    const { url } = entity;
    const hasUrl = !!url;
    if (!hasUrl) {
        return availability("available");
    }
    const hasQueryParams = url.includes("?");
    const isServiceBackedEntity = isService.isService(hasQueryParams ? url.split("?")[0] : url); // remove any query params
    if (isServiceBackedEntity) {
        // set up our two promises: one to get the service definition and one to sleep for 3 seconds
        const definitionPromise = getService.getService(Object.assign({ url }, requestOptions))
            .then(() => {
            // if the service is returned, then we consider it available
            return availability("available");
        })
            .catch((error) => {
            // see interface IHubServiceBackedContentStatus for possible
            // availability values and what each signifies
            if (error.response) {
                const statusCode = error.response.error.code;
                const requiresAuth = [401, 403, 499].includes(statusCode);
                return requiresAuth
                    ? availability("auth-required")
                    : availability("unavailable");
            }
            else {
                // sometimes, the 499 status code is returned as a "failed to fetch" error
                return availability("auth-required");
            }
        });
        // race the two promises
        const status = Promise.race([definitionPromise, await wait.wait(timeout)]).then((result) => {
            // if result is undefined, the service is slow
            // otherwise, the service is available OR unavailable, depending on how the promise resolves
            return result ? result : availability("slow");
        });
        return status;
    }
    else {
        // if we don't have a url or it is not a service backed entity, assume it is available
        return availability("available");
    }
}

/**
 * Convert the resources array on an individual template in a solution
 * into an assets array that can be used to upload the resources to
 * the newly created item.
 * @param {object} template Template from a Solution
 * @param {IHubRequestOptions} hubRequestOptions
 */
function convertSolutionTemplateResourcesToAssets(template, hubRequestOptions) {
    let assets = [];
    if (template.resources && template.bundleItemId) {
        const portalRestUrl = getPortalApiUrl.getPortalApiUrl(hubRequestOptions.portalSelf);
        // the resources are stored on the solution item, and that Id is attached
        // into the template as .bundleItemId
        const solutionItemUrl = `${portalRestUrl}/content/items/${template.bundleItemId}`;
        // the resources on the solution are prefixed with the item id of the item the
        // template was created from, which is stored as .itemId
        const prefix = template.itemId;
        // map over the resources and convert them into assets
        assets = template.resources.map(name => {
            // we fetch the resource from .url property
            // and we upload it using the .name property
            return {
                name,
                type: "resource",
                url: `${solutionItemUrl}/resources/${prefix}-${name}`
            };
        });
    }
    return assets;
}

/**
 * composes a Hub content entity from an item and optional enrichments
 * @param item item to compose content from
 * @param requestOptions request options (needed to determine certain urls)
 * @param enrichments enrichments to use during composition
 * @returns content entity
 */
const composeHubContent = (item, requestOptions, enrichments) => {
    // we must normalize the underlying item type to account
    // for older items (e.g. sites that are type "Web Mapping
    // Application") before we map the model to a Hub Entity
    const normalizedItem = util.cloneObject(item);
    const type = compose.normalizeItemType(item);
    setProp.setProp("type", type, normalizedItem);
    return getFormJson.modelToHubEditableContent({ item: normalizedItem }, requestOptions, enrichments);
};

/**
 * Convert a user hub search result into a card view model that
 * can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub user search result
 * @param opts view model options
 */
const userResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedUserCardModel(searchResult)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
/**
 * Given a hub search result, construct the
 * users card view model properties
 *
 * @param user user search result
 * @param locale internationalization locale
 */
const getSharedUserCardModel = (user) => {
    const badges = [];
    const memberType = user.memberType;
    /**
     * for group members, we want to configure
     * member type badges to render in the user
     * card
     */
    if (memberType) {
        if (user.isGroupOwner) {
            badges.push({
                icon: "user-key",
                color: "gray",
                i18nKey: "badges.members.owner",
                hideLabel: true,
                tooltip: { i18nKey: "badges.members.owner" },
            });
        }
        else if (memberType === "admin") {
            badges.push({
                icon: "user-up",
                color: "gray",
                i18nKey: "badges.members.admin",
                hideLabel: true,
                tooltip: { i18nKey: "badges.members.admin" },
            });
        }
        else {
            badges.push({
                icon: "user",
                color: "gray",
                i18nKey: "badges.members.member",
                hideLabel: true,
                tooltip: { i18nKey: "badges.members.member" },
            });
        }
    }
    return {
        access: user.access,
        badges,
        family: user.family,
        id: user.id,
        source: user.name ? `@${user.id}` : undefined,
        summary: user.summary,
        title: user.name || `@${user.id}`,
        type: user.type,
    };
};

/**
 * DEPRECATED: Use `getFeedTemplate()` instead
 * this can be deleted once we remove the feed editor from the content-library (Ember addon)
 * Returns feed configuration from a site model
 *
 * @param {IModel} site - site model
 * @param {FeedFormat} format - feed format
 * @param {string} version  - semantic version
 */
function getFeedConfiguration(site, format, version) {
    if (format === "dcat-us") {
        return getDcatUsConfig(site, version);
    }
    if (format === "dcat-ap") {
        return getDcatApConfig(site, version);
    }
    if (format === "rss") {
        return getRssConfig(site, version);
    }
    throw new Error("Unsupported feed format");
}
/**
 * DEPRECATED: This will be removed in the next breaking version. Use `setFeedTemplate()` instead;
 * Returns feed configuration from a site model
 *
 * @param {IModel} site - site model
 * @param {FeedFormat} format - feed format
 * @param {string} version  - semantic version
 * @param {Record<string, any>} feedConfig - feed configuration
 */
function setFeedConfiguration(site, format, version, feedConfig) {
    if (format === "dcat-us") {
        setDcatUsConfig(site, version, feedConfig);
        return;
    }
    if (format === "dcat-ap") {
        setDcatApConfig(site, version, feedConfig);
        return;
    }
    if (format === "rss") {
        setRssConfig(site, version, feedConfig);
        return;
    }
    throw new Error("Unsupported feed format");
}
function getDcatApConfig(site, version) {
    if (previewFeed.getMajorVersion(version) === "2") {
        return site.data.feeds.dcatAP2XX || site.data.feeds.dcatAP201;
    }
    throw new Error("Unsupported DCAT AP version");
}
function getDcatUsConfig(site, version) {
    if (previewFeed.getMajorVersion(version) === "1") {
        return site.data.feeds.dcatUS1X || site.data.feeds.dcatUS11;
    }
    throw new Error("Unsupported DCAT US version");
}
function getRssConfig(site, version) {
    if (previewFeed.getMajorVersion(version) === "2") {
        return site.data.feeds.rss2;
    }
    throw new Error("Unsupported RSS version");
}
function setDcatApConfig(site, version, config) {
    if (previewFeed.getMajorVersion(version) === "2") {
        site.data.feeds.dcatAP2XX = config;
        return;
    }
    throw new Error("Unsupported DCAT AP Version");
}
function setDcatUsConfig(site, version, config) {
    if (previewFeed.getMajorVersion(version) === "1") {
        site.data.feeds.dcatUS1X = config;
        return;
    }
    throw new Error("Unsupported DCAT US Version");
}
function setRssConfig(site, version, config) {
    if (previewFeed.getMajorVersion(version) === "2") {
        site.data.feeds.rss2 = config;
        return;
    }
    throw new Error("Unsupported RSS Version");
}

/**
 * Checks if user has access to edit an event in Hub
 * @param {IEventModel} model consolidated event model as consumed by Hub, contains the event feature, related initiative model, and attendees group
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditEvent(model, user) {
    let res = false;
    if (canEditItem.hasBasePriv(user)) {
        const coreTeamId = model.initiative
            ? getProp.getProp(model, "initiative.item.properties.collaborationGroupId")
            : getProp.getProp(model, "site.properties.collaborationGroupId");
        const { groups = [] } = user;
        res = !!coreTeamId && !!util.findBy(groups, "id", coreTeamId);
    }
    return res;
}

const REQUIRED_PRIVS = [
    "portal:user:createGroup",
    "portal:user:createItem",
    "portal:user:shareToGroup",
    "portal:user:viewOrgGroups",
    "portal:user:viewOrgItems"
];
/**
 * Checks if user has access to content library in Hub
 * In Hub Home context, user access requires additional privileges
 * In initiative context, check is delegated to canEditItem for the initiative site item
 * @param {IItem} item
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditSiteContent(item, user) {
    let res = false;
    const isDefaultHubHome = getProp.getProp(item, "properties.isDefaultHubHome");
    const hasPriv = canEditItem.hasBasePriv(user);
    if (!isDefaultHubHome && hasPriv) {
        res = canEditItem.canEditItem(item, user);
    }
    else if (hasPriv) {
        const userOrgId = user.orgId;
        const itemOrgId = item.orgId;
        const sameOrg = !!userOrgId && userOrgId === itemOrgId;
        if (sameOrg) {
            const privileges = user.privileges || [];
            res = REQUIRED_PRIVS.every(privilege => compose.includes(privileges, privilege));
        }
    }
    return res;
}

/**
 * Checks if user has access to edit site in Hub
 * Currently, Hub Home sites are not editable
 * In initiative context, check is delegated to canEditItem for the initiative site item
 * @param {IItem} model
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditSite(model, user) {
    let res = false;
    const isDefaultHubHome = getProp.getProp(model, "properties.isDefaultHubHome");
    if (!isDefaultHubHome && canEditItem.hasBasePriv(user)) {
        res = canEditItem.canEditItem(model, user);
    }
    return res;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * A thin wrapper around [`UserSession.completeOAuth2()`](https://esri.github.io/arcgis-rest-js/api/auth/UserSession/#completeOAuth2) that sets search tags and other relevant metadata for newly created community users.
 */
/* istanbul ignore next */
function completeOAuth2(options, win = window) {
    const match = win.location.href.match(/access_token=(.+)&expires_in=.+&username=([^&]+)/);
    const token = match[1];
    const user = decodeURIComponent(match[2]);
    const baseUrl = `https://www.arcgis.com/sharing/rest/community/users/${user}`;
    return request$1.request(baseUrl, {
        params: { token },
        httpMethod: "GET"
    }).then(response => {
        if (Date.now() - response.created < 5000) {
            return request$1.request(`${baseUrl}/update`, {
                params: {
                    token,
                    tags: ["hubRole:participant", `org:${response.orgId}`],
                    access: "public"
                }
            }).then(() => {
                return UserSession.UserSession.completeOAuth2(options);
            });
        }
        else {
            return UserSession.UserSession.completeOAuth2(options);
        }
    });
}

/**
 * @private
 */
function _consolidateResults(context) {
    const { autoAddResult, inviteResult, primaryEmailResult, secondaryEmailResult } = context;
    let combinedEmailResults;
    if (primaryEmailResult || secondaryEmailResult) {
        const validResults = [primaryEmailResult, secondaryEmailResult].filter(r => r);
        const combinedSuccess = validResults.every(r => r.success);
        const combinedErrors = validResults.reduce((collection, r) => collection.concat(getWithDefault.getWithDefault(r, "errors", [])), []);
        combinedEmailResults = {
            success: combinedSuccess
        };
        if (combinedErrors.length) {
            combinedEmailResults.errors = combinedErrors;
        }
    }
    const overallSuccess = [autoAddResult, inviteResult, combinedEmailResults]
        .filter(r => r)
        .every(r => r.success);
    return {
        success: overallSuccess,
        autoAdd: autoAddResult,
        invite: inviteResult,
        email: combinedEmailResults
    };
}

/**
 * @private
 *
 * Coerce autoAdd response into a more similar interface as
 * the other rest calls.
 *
 * If any users are not auto added, an error is added to the response
 * and unadded users are placed into the invitation list
 */
function _formatAutoAddResponse(rawResponse, context) {
    if (rawResponse) {
        const success = !getProp.getProp(rawResponse, "notAdded.length") && !rawResponse.errors;
        context.autoAddResult = { success };
        if (!success) {
            const errors = rawResponse.errors || [];
            if (getProp.getProp(rawResponse, "notAdded.length")) {
                errors.push(new request$1.ArcGISRequestError(`Users not auto-added: ${rawResponse.notAdded.join(", ")}`));
            }
            context.autoAddResult.errors = errors;
            // Move unadded users to invite list;
            const unaddedUsers = context.usersToAutoAdd.filter(user => compose.includes(rawResponse.notAdded, user.username));
            context.usersToInvite = context.usersToInvite.concat(unaddedUsers);
        }
    }
    return context;
}

/**
 * @private
 *
 * returns whether or not the users are in the same org
 */
function _canEmailUser(recipient, sender) {
    return recipient.orgId === sender.orgId;
}

/**
 * @private
 */
function _isOrgAdmin(user) {
    return user.role === "org_admin" && !user.roleId;
}

/**
 * Attempts to email members of the requesting user's organization.
 *
 * @param {IUser[]} users Users to email (must be in the same org as the requesting user)
 * @param {IEmail} email
 * @param {IAuthenticationManager} authentication
 * @param {boolean} isOrgAdmin // Whether the requesting user in an org admin
 *
 * @returns {object|null} A promise that resolves to the result of the transaction (null if no users are passed in)
 */
function emailOrgUsers(users, email, authentication, isOrgAdmin) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            authentication,
            message: email.body,
            subject: email.subject,
            notificationChannelType: "email",
            users: users.map((u) => u.username),
        };
        if (!isOrgAdmin) {
            args.batchSize = 1;
        }
        response = createOrgNotification(args);
    }
    return response;
}

/**
 * @private
 *
 * If a secondary authentication is passed in AND
 * an email object is passed in AND
 * the previous invitation call was successful:
 *
 * Send an email notification to the invited
 * users that are part of the secondary authentication's org
 */
function _processSecondaryEmail(context) {
    let response = Promise.resolve(context);
    // If secondaryRO provided, send email to the invited users in the secondaryRO's org (typically a community org)
    if (context.email &&
        context.secondaryRO &&
        getProp.getProp(context, "inviteResult.success")) {
        const secondaryUser = getWithDefault.getWithDefault(context, "secondaryRO.portalSelf.user", {});
        const secondaryOrgUsersToEmail = context.usersToInvite.filter((u) => _canEmailUser(u, secondaryUser));
        response = emailOrgUsers(secondaryOrgUsersToEmail, context.email, context.secondaryRO.authentication, _isOrgAdmin(secondaryUser)).then((result) => {
            context.secondaryEmailResult = result;
            return context;
        });
    }
    return response;
}

/**
 * @private
 */
function _processAutoAdd(context) {
    return addGroupMembers.autoAddUsers(getProp.getProp(context, "groupId"), getProp.getProp(context, "usersToAutoAdd"), getProp.getProp(context, "primaryRO.authentication")).then((rawResponse) => _formatAutoAddResponse(rawResponse, context));
}

/**
 * @private
 */
function _processInvite(context) {
    return addGroupMembers.inviteUsers(getProp.getProp(context, "groupId"), getProp.getProp(context, "usersToInvite"), getProp.getProp(context, "primaryRO.authentication")).then((result) => {
        context.inviteResult = result;
        return context;
    });
}

/**
 * @private
 *
 * Send email notification if an email object is present and
 * the previous invitation call was successful
 */
function _processPrimaryEmail(context) {
    let response = Promise.resolve(context);
    // Email users if invite succeeds
    if (context.email && getProp.getProp(context, "inviteResult.success")) {
        response = emailOrgUsers(context.usersToEmail, context.email, context.primaryRO.authentication, _isOrgAdmin(context.requestingUser)).then((result) => {
            context.primaryEmailResult = result;
            return context;
        });
    }
    return response;
}

/**
 * @private
 *
 * A user can be auto-added if they are part of the requesting user's e-org
 * or c-org and the requesting user has the assignToGroups privilege
 */
function _getAutoAddUsers(users, requestingUser) {
    let usersToAutoAdd = [];
    if (requestingUser.privileges.indexOf("portal:admin:assignToGroups") !== -1) {
        const orgIds = [requestingUser.orgId, requestingUser.cOrgId].filter(o => o);
        usersToAutoAdd = users.filter(u => orgIds.indexOf(u.orgId) !== -1);
    }
    return usersToAutoAdd;
}

/**
 * @private
 *
 * A user will be invited if they cannot be auto-added
 */
function _getInviteUsers(users, requestingUser) {
    const autoAddedUsers = _getAutoAddUsers(users, requestingUser);
    return users.filter(user => !autoAddedUsers.some(aau => aau.username === user.username));
}

/**
 * @private
 *
 * A user can be emailed if they are invited (not auto-added)
 * and the _canEmailUser condition is met
 */
function _getEmailUsers(users, requestingUser, includeSelf = false) {
    const invitedUsers = _getInviteUsers(users, requestingUser);
    const emailUsers = invitedUsers.filter(user => _canEmailUser(user, requestingUser));
    if (includeSelf) {
        emailUsers.push(requestingUser);
    }
    return emailUsers;
}

/**
 * Adds, invites or emails users about joining a group
 * based on the permissions of the requesting user. The
 * function returns a hash of results indicating which
 * operations were attempted and whether they were successful.
 *
 * In general, this algorithm will auto-add all the users
 * that it can, invite the others, and send emails to eligible
 * invited users (See below for more details)
 *
 * Here are a couple caveats to be aware of:
 * 1) If the requestingUser can auto-add to the group (A.K.A. has
 * portal:admin:assignToGroups) no email will be sent, period.
 * 2) Emails can only be sent to members of the same org as the
 * requesting user if they have been invited (not auto-added)
 * to the group. If emails must to be sent to invited members
 * of a second org (e.g a community org), an authenticated user
 * of the second org must be passed in (see secondaryRO)
 * 3) If no email is passed in, no email will be sent
 * 4) If auto-adding fails, the unadded users will be invited
 *
 * @param {string} groupId
 * @param {IUser[]} allUsers
 * @param {IHubRequestOptions} primaryRO Info and authentication for the requesting user
 * @param {IEmail} [email] Email to be sent (if qualifying users are passed in)
 * @param {IHubRequestOptions} [secondaryRO] Info and authentication for emailing members of a secondary organization (typically a community org)
 *
 * @returns {IConsolidatedResult} The operations attempted, whether they were successful and any errors
 */
function addUsersToGroup(groupId, allUsers, primaryRO, email, secondaryRO) {
    // Extract requesting user
    const requestingUser = util.cloneObject(getWithDefault.getWithDefault(primaryRO, "portalSelf.user", {}));
    requestingUser.cOrgId = getProp.getProp(primaryRO, "portalSelf.portalProperties.hub.settings.communityOrg.orgId");
    // Context for each process segment
    const context = {
        groupId,
        allUsers,
        primaryRO,
        email,
        secondaryRO,
        requestingUser,
        usersToAutoAdd: _getAutoAddUsers(allUsers, requestingUser),
        usersToInvite: _getInviteUsers(allUsers, requestingUser),
        usersToEmail: _getEmailUsers(allUsers, requestingUser, getProp.getProp(email, "copyMe")),
    };
    return _processAutoAdd(context)
        .then(_processInvite)
        .then(_processPrimaryEmail)
        .then(_processSecondaryEmail)
        .then(_consolidateResults);
}

function getS123ShareUrl(id, context) {
    return `${context.survey123Url}/share/${id}?portalUrl=${encodeURIComponent(context.portalUrl)}`;
}

/**
 * return a token created using options.authentication or set on options.token
 *
 * @export
 * @param {INewslettersRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest$1(options) {
    const { token, authentication } = options;
    if (authentication) {
        return authentication.getToken(authentication.portal);
    }
    return Promise.resolve(token);
}

async function customClient$1(orvalParams, customParams) {
    const { url, method, data } = orvalParams;
    const { mode, cache, credentials } = customParams;
    const { headers, params } = combineParams$1(orvalParams, customParams);
    const baseUrl = removeTrailingSlash$1(customParams.hubApiUrl);
    const requestUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
    const requestOptions = {
        headers,
        method,
        cache,
        credentials,
        mode,
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
    const res = await fetch(requestUrl, requestOptions);
    const { statusText, status } = res;
    if (res.ok) {
        return res.json();
    }
    const error = await res.json();
    throw new RemoteServerError$1(statusText, requestUrl, status, JSON.stringify(error.message));
}
function removeTrailingSlash$1(hubApiUrl = "https://hub.arcgis.com") {
    return hubApiUrl.replace(/\/$/, "");
}
function combineParams$1(orvalParams, options) {
    const headers = new Headers(Object.assign(Object.assign({}, orvalParams.headers), options.headers));
    if (options.token) {
        headers.set("Authorization", options.token);
    }
    const params = Object.assign(Object.assign({}, orvalParams.params), options.params);
    return { headers, params };
}
class RemoteServerError$1 extends Error {
    constructor(message, url, status, error) {
        super(message);
        this.status = status;
        this.url = url;
        this.error = error;
    }
}

/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * Hub Newsletters Service
 * OpenAPI spec version: 0.0.1
 */
var SubscriptionEntityType;
(function (SubscriptionEntityType) {
    SubscriptionEntityType["DISCUSSION"] = "DISCUSSION";
})(SubscriptionEntityType || (SubscriptionEntityType = {}));
exports.DeliveryMethod = void 0;
(function (DeliveryMethod) {
    DeliveryMethod["EMAIL"] = "EMAIL";
})(exports.DeliveryMethod || (exports.DeliveryMethod = {}));
exports.NewsletterCadence = void 0;
(function (Cadence) {
    Cadence["ON_EVENT"] = "ON_EVENT";
    Cadence["DAILY"] = "DAILY";
    Cadence["WEEKLY"] = "WEEKLY";
    Cadence["MONTHLY"] = "MONTHLY";
})(exports.NewsletterCadence || (exports.NewsletterCadence = {}));
exports.SystemNotificationSpecNames = void 0;
(function (SystemNotificationSpecNames) {
    SystemNotificationSpecNames["TELEMETRY_REPORT"] = "TELEMETRY_REPORT";
    SystemNotificationSpecNames["EVENT"] = "EVENT";
    SystemNotificationSpecNames["DISCUSSION_ON_ENTITY"] = "DISCUSSION_ON_ENTITY";
})(exports.SystemNotificationSpecNames || (exports.SystemNotificationSpecNames = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
var FilterOperation;
(function (FilterOperation) {
    FilterOperation["AND"] = "AND";
    FilterOperation["OR"] = "OR";
})(FilterOperation || (FilterOperation = {}));
var WellKnownCollection;
(function (WellKnownCollection) {
    WellKnownCollection["content"] = "content";
    WellKnownCollection["dataset"] = "dataset";
    WellKnownCollection["document"] = "document";
    WellKnownCollection["event"] = "event";
    WellKnownCollection["feedback"] = "feedback";
    WellKnownCollection["initiative"] = "initiative";
    WellKnownCollection["people"] = "people";
    WellKnownCollection["site"] = "site";
    WellKnownCollection["team"] = "team";
    WellKnownCollection["template"] = "template";
    WellKnownCollection["project"] = "project";
    WellKnownCollection["channel"] = "channel";
    WellKnownCollection["discussion"] = "discussion";
    WellKnownCollection["eventAttendee"] = "eventAttendee";
})(WellKnownCollection || (WellKnownCollection = {}));
var EntityType;
(function (EntityType) {
    EntityType["item"] = "item";
    EntityType["group"] = "group";
    EntityType["user"] = "user";
    EntityType["portalUser"] = "portalUser";
    EntityType["communityUser"] = "communityUser";
    EntityType["groupMember"] = "groupMember";
    EntityType["event"] = "event";
    EntityType["channel"] = "channel";
    EntityType["discussionPost"] = "discussionPost";
    EntityType["eventAttendee"] = "eventAttendee";
})(EntityType || (EntityType = {}));
exports.SubscriptionAction = void 0;
(function (SubscriptionAction) {
    SubscriptionAction["DISCUSSION_POST_PENDING"] = "DISCUSSION_POST_PENDING";
})(exports.SubscriptionAction || (exports.SubscriptionAction = {}));
const createSubscription$1 = (iCreateSubscription, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/subscriptions`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iCreateSubscription,
    }, options);
};
const getSubscriptions$1 = (params, options) => {
    return customClient$1({ url: `/api/newsletters/v1/subscriptions`, method: "GET", params }, options);
};
const subscribe$1 = (iSubscribe, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/subscriptions/subscribe`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iSubscribe,
    }, options);
};
const getSubscription$1 = (id, options) => {
    return customClient$1({ url: `/api/newsletters/v1/subscriptions/${id}`, method: "GET" }, options);
};
const updateSubscription$1 = (id, iUpdateSubscription, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/subscriptions/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: iUpdateSubscription,
    }, options);
};
const createUser$1 = (iCreateUser, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/users`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iCreateUser,
    }, options);
};
const getUser$1 = (userId, options) => {
    return customClient$1({ url: `/api/newsletters/v1/users/${userId}`, method: "GET" }, options);
};
const updateUser$1 = (userId, iUpdateUser, options) => {
    return customClient$1({
        url: `/api/newsletters/v1/users/${userId}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: iUpdateUser,
    }, options);
};
const deleteUser$1 = (userId, options) => {
    return customClient$1({ url: `/api/newsletters/v1/users/${userId}`, method: "DELETE" }, options);
};

/**
 * create a subscription for user (existing or not) to a newsletter
 *
 * @param {ISubscribeParams} options
 * @return {Promise<ISubscription>}
 */
async function subscribe(options) {
    options.token = await authenticateRequest$1(options);
    return subscribe$1(options.data, options);
}
/**
 * create a subscription for user (existing) to a newsletter
 *
 * @param {ICreateSubscriptionParams} options
 * @return {Promise<ISubscription>}
 */
async function createSubscription(options) {
    options.token = await authenticateRequest$1(options);
    return createSubscription$1(options.data, options);
}
/**
 * get subscriptions
 *
 * @param {IGetSubscriptionsParams} options
 * @return {Promise<ISubscription[]>}
 */
async function getSubscriptions(options) {
    options.token = await authenticateRequest$1(options);
    return getSubscriptions$1(options.data, options);
}
/**
 * get a subscription
 *
 * @param {IGetSubscriptionParams} options
 * @return {Promise<ISubscription>}
 */
async function getSubscription(options) {
    options.token = await authenticateRequest$1(options);
    return getSubscription$1(options.subscriptionId, options);
}
/**
 * update a subscription
 *
 * @param {IUpdateSubscriptionParams} options
 * @return {Promise<ISubscription>}
 */
async function updateSubscription(options) {
    options.token = await authenticateRequest$1(options);
    return updateSubscription$1(options.subscriptionId, options.data, options);
}

/**
 * create a user
 *
 * @param {ICreateUserParams} options
 * @return {Promise<IUser>}
 */
async function createUser(options) {
    options.token = await authenticateRequest$1(options);
    return createUser$1(options.data, options);
}
/**
 * get a user
 *
 * @param {IGetUserParams} options
 * @return {Promise<IUser>}
 */
async function getUser(options) {
    options.token = await authenticateRequest$1(options);
    return getUser$1(options.userId, options);
}
/**
 * update a user
 *
 * @param {IUpdateUserParams} options
 * @return {Promise<IUser>}
 */
async function updateUser(options) {
    options.token = await authenticateRequest$1(options);
    return updateUser$1(options.userId, options.data, options);
}
/**
 * delete a user
 *
 * @param {IDeleteUserParams} options
 * @return {Promise<IUser>}
 */
async function deleteUser(options) {
    options.token = await authenticateRequest$1(options);
    return deleteUser$1(options.userId, options);
}

/**
 * return a token created using options.authentication or set on options.token
 *
 * @export
 * @param {INewslettersSchedulerRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest(options) {
    const { token, authentication } = options;
    if (authentication) {
        return authentication.getToken(authentication.portal);
    }
    return Promise.resolve(token);
}

async function customClient(orvalParams, customParams) {
    const { url, method, data } = orvalParams;
    const { mode, cache, credentials } = customParams;
    const { headers, params } = combineParams(orvalParams, customParams);
    const baseUrl = removeTrailingSlash(customParams.hubApiUrl);
    const requestUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
    const requestOptions = {
        headers,
        method,
        cache,
        credentials,
        mode,
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
    const res = await fetch(requestUrl, requestOptions);
    const { statusText, status } = res;
    if (res.ok) {
        return res.json();
    }
    const error = await res.json();
    throw new RemoteServerError(statusText, requestUrl, status, JSON.stringify(error.message));
}
function removeTrailingSlash(hubApiUrl = "https://hub.arcgis.com") {
    return hubApiUrl.replace(/\/$/, "");
}
function combineParams(orvalParams, options) {
    const headers = new Headers(Object.assign(Object.assign({}, orvalParams.headers), options.headers));
    if (options.token) {
        headers.set("Authorization", options.token);
    }
    const params = Object.assign(Object.assign({}, orvalParams.params), options.params);
    return { headers, params };
}
class RemoteServerError extends Error {
    constructor(message, url, status, error) {
        super(message);
        this.status = status;
        this.url = url;
        this.error = error;
    }
}

/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * Hub Newsletters Scheduler
 * OpenAPI spec version: 0.0.1
 */
exports.SchedulerDeliveryMethod = void 0;
(function (DeliveryMethod) {
    DeliveryMethod["EMAIL"] = "EMAIL";
})(exports.SchedulerDeliveryMethod || (exports.SchedulerDeliveryMethod = {}));
exports.SchedulerSystemNotificationSpecNames = void 0;
(function (SystemNotificationSpecNames) {
    SystemNotificationSpecNames["TELEMETRY_REPORT"] = "TELEMETRY_REPORT";
    SystemNotificationSpecNames["EVENT"] = "EVENT";
    SystemNotificationSpecNames["DISCUSSION_ON_ENTITY"] = "DISCUSSION_ON_ENTITY";
})(exports.SchedulerSystemNotificationSpecNames || (exports.SchedulerSystemNotificationSpecNames = {}));
exports.SubscriptionEntityType = void 0;
(function (SubscriptionEntityType) {
    SubscriptionEntityType["DISCUSSION"] = "DISCUSSION";
})(exports.SubscriptionEntityType || (exports.SubscriptionEntityType = {}));
exports.SchedulerCadence = void 0;
(function (Cadence) {
    Cadence["ON_EVENT"] = "ON_EVENT";
    Cadence["DAILY"] = "DAILY";
    Cadence["WEEKLY"] = "WEEKLY";
    Cadence["MONTHLY"] = "MONTHLY";
})(exports.SchedulerCadence || (exports.SchedulerCadence = {}));
exports.SchedulerSubscriptionAction = void 0;
(function (SubscriptionAction) {
    SubscriptionAction["DISCUSSION_POST_PENDING"] = "DISCUSSION_POST_PENDING";
})(exports.SchedulerSubscriptionAction || (exports.SchedulerSubscriptionAction = {}));
const notify$1 = (iNotify, options) => {
    return customClient({
        url: `/api/newsletters-scheduler/v1/subscriptions/notify`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iNotify,
    }, options);
};

/**
 * Notify (schedule) subscriptions to recipients
 *
 * @param {INotifyParams} options
 * @return {Promise<ISubscription[]>}
 */
async function notify(options) {
    options.token = await authenticateRequest(options);
    return notify$1(options.data, options);
}

/**
 * Convert a template entity into a card view model that can
 * be consumed by the suite of hub gallery components
 *
 * @param template template entity
 * @param context auth & portal information
 * @param opts view model options
 */
const templateToCardModel = (template, context, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromEntity(template, context, target, baseUrl);
    return Object.assign(Object.assign(Object.assign({}, getSharedTemplateCardModel(template, locale)), { actionLinks,
        titleUrl }), (template.thumbnailUrl && { thumbnailUrl: template.thumbnailUrl }));
};
/**
 * Convert a template hub search result into a card view model
 * that can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub template search result
 * @param opts view model options
 */
const templateResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedTemplateCardModel(searchResult, locale)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
/**
 * Given a template entity OR hub serach result, construct the
 * template's shared card view model properties
 *
 * @param entityOrSearchResult template entity or hub search result
 * @param locale internationalization locale
 */
const getSharedTemplateCardModel = (entityOrSearchResult, locale) => {
    var _a, _b;
    const additionalInfo = [
        {
            i18nKey: "type",
            value: entityOrSearchResult.type,
        },
        {
            i18nKey: "dateUpdated",
            value: entityOrSearchResult.updatedDate.toLocaleDateString(locale),
        },
        ...(((_a = entityOrSearchResult.tags) === null || _a === void 0 ? void 0 : _a.length) ? [
            {
                i18nKey: "tags",
                value: entityOrSearchResult.tags.join(", "),
            },
        ]
            : []),
        ...(((_b = entityOrSearchResult.categories) === null || _b === void 0 ? void 0 : _b.length) ? [
            {
                i18nKey: "categories",
                value: compose.getShortenedCategories(entityOrSearchResult.categories).join(", "),
            },
        ]
            : []),
        {
            i18nKey: "dateCreated",
            value: entityOrSearchResult.createdDate.toLocaleDateString(locale),
        },
    ];
    return {
        access: entityOrSearchResult.access,
        badges: [],
        id: entityOrSearchResult.id,
        family: getFamily.getFamily(entityOrSearchResult.type),
        source: entityOrSearchResult.owner,
        summary: entityOrSearchResult.summary,
        title: entityOrSearchResult.name,
        type: entityOrSearchResult.type,
        additionalInfo,
    };
};

/**
 * Given an array of metrics, aggregate them using the specified aggregation
 * Consumer must be aware of the type of the metrics and pass an appropriate aggregation
 * @param metrics
 * @param aggregation
 * @returns
 */
function aggregateMetrics(metrics, field, aggregation) {
    // Get the values from the metrics, we use any so
    // we can keep the rest of the code simpler
    const values = metrics.map((m) => m.attributes[field]);
    let aggregate = null;
    switch (aggregation) {
        case "sum":
            aggregate = values.reduce((acc, v) => acc + v, 0);
            break;
        case "count":
            aggregate = values.length;
            break;
        case "avg":
            aggregate = values.reduce((acc, v) => acc + v, 0) / values.length;
            break;
        case "min":
            aggregate = values.reduce((acc, v) => Math.min(acc, v), Number.MAX_VALUE);
            break;
        case "max":
            aggregate = values.reduce((acc, v) => Math.max(acc, v), Number.MIN_VALUE);
            break;
        case "countByValue": // count for each value as a hash {value: string, count: number}
            aggregate = values.reduce((acc, v) => {
                if (acc[v]) {
                    acc[v] += 1;
                }
                else {
                    acc[v] = 1;
                }
                return acc;
            }, {});
            break;
    }
    return aggregate;
}

async function explainDatePredicate(predicate, result, requestOptions) {
    // get the value from the predicate
    throw new Error("Not implemented");
}
async function explainPropPredicate(predicate, result, requestOptions) {
    // get the value from the predicate
    throw new Error("Not implemented");
}
/**
 * @internal
 * Create explanation for an IMatchOptions predicate
 * @param predicate
 * @param result
 * @param requestOptions
 * @returns
 */
async function explainMatchOptionPredicate(predicate, result, requestOptions) {
    // get the key from the predicate
    const attribute = Object.keys(predicate)[0];
    const matchOptions = predicate[attribute];
    const explanation = {
        predicate: util.cloneObject(predicate),
        matched: true,
        reasons: [],
    };
    // Construct meta hash that will allow us to carry additional info about the match
    const meta = {};
    // TODO Implement when needed
    // if (attribute === "orgid") {
    //   // fetch org into and attach the id + name into the meta hash
    // }
    if (attribute === "group") {
        // fetch items groups and attach as `group` prop
        const response = await get.getItemGroups(result.id, requestOptions);
        // ----------------------------------------
        // TODO: We've got a bunch of useful group info in the response, but only use the ids for the explanation
        // However, to provide the user a useful explanation, we should include the group titles, and maybe even the group owners
        // ----------------------------------------
        // map out the id and titles into meta.groups
        meta.groups = [
            ...getWithDefault.getWithDefault(response, "admin", []),
            ...getWithDefault.getWithDefault(response, "member", []),
            ...getWithDefault.getWithDefault(response, "other", []),
        ].map((g) => ({ id: g.id, title: g.title }));
        // and the id's into the match options attribute `group`
        result.group = meta.groups.map((g) => g.id);
    }
    // get the value of the key, from the result
    const resultValue = getProp.getProp(result, attribute);
    if (resultValue) {
        // check the any, all, not, exact props if defined
        const fns = {
            any: checkAny,
            all: checkAll,
            not: checkNot,
        };
        // for each prop, if defined, call the appropriate check function
        Object.keys(fns).forEach((prop) => {
            const conditionToCheck = getProp.getProp(matchOptions, prop);
            if (conditionToCheck) {
                const fn = getProp.getProp(fns, prop);
                const r = fn(attribute, conditionToCheck, resultValue);
                r.meta = meta;
                explanation.reasons.push(r);
            }
        });
        // decide if all the predicates matched
        explanation.matched = explanation.reasons.every((r) => r.matched);
    }
    else {
        explanation.matched = false;
        explanation.reasons.push({
            attribute,
            matched: false,
            message: `Property ${attribute} not present on search result, cannot provide explanation`,
        });
    }
    return Promise.resolve(explanation);
}
/**
 * Returns information about the match between a result value and the .any property of an IMatchOptions predicate
 * @param attribute
 * @param option
 * @param resultValue
 * @returns
 */
function checkAny(attribute, option, resultValue) {
    const result = {
        attribute,
        values: arrayify(resultValue).join(","),
        condition: "IN",
        matched: false,
        requirement: arrayify(option).join(","),
        message: "No match",
    };
    const { options, matches } = getMatches(arrayify(option), arrayify(resultValue));
    result.matched = matches.length > 0;
    if (result.matched) {
        result.message = `Value(s) ${result.values} contained at least one of value from [${result.requirement}]`;
    }
    else {
        result.message = `Value(s) ${result.values} did not contain any of value from [${result.requirement}]`;
    }
    return result;
}
/**
 * * Returns information about the match between a result value and the .all property of an IMatchOptions predicate
 * @param attribute
 * @param option
 * @param resultValue
 * @returns
 */
function checkAll(attribute, option, resultValue) {
    const result = {
        attribute,
        values: arrayify(resultValue).join(","),
        condition: "ALL",
        requirement: arrayify(option).join(","),
        matched: false,
        message: "No match",
    };
    const { options, matches } = getMatches(arrayify(option), arrayify(resultValue));
    result.matched = matches.length === options.length;
    if (result.matched) {
        result.message = `Value(s) ${result.values} contained all values from [${result.requirement}]`;
    }
    else {
        result.message = `Value(s) ${result.values} did not contain all values from [${result.requirement}]`;
    }
    return result;
}
/**
 * * Returns information about the match between a result value and the .not property of an IMatchOptions predicate
 * @param attribute
 * @param option
 * @param resultValue
 * @returns
 */
function checkNot(attribute, option, resultValue) {
    const result = {
        attribute,
        values: arrayify(resultValue).join(","),
        condition: "NOT_IN",
        requirement: arrayify(option).join(","),
        matched: false,
        message: "No match",
    };
    const { options, values, matches } = getMatches(arrayify(option), arrayify(resultValue));
    result.matched = matches.length === 0;
    if (result.matched) {
        result.message = `Value(s) ${result.values} is not contained in [${result.requirement}]`;
    }
    else {
        result.message = `Value(s) ${result.values} is contained in [${result.requirement}]`;
    }
    return result;
}
/**
 * Ensure a value that could be `string | string[]` is a `string[]`
 * @param value
 * @returns
 */
function arrayify(value) {
    if (!Array.isArray(value)) {
        return [value];
    }
    return value;
}
/**
 * Return matching values from two arrays
 * @param options
 * @param resultValues
 * @returns
 */
function getMatches(options, resultValues) {
    const result = {
        options,
        values: resultValues,
        matches: [],
    };
    result.matches = options.reduce((acc, o) => {
        if (resultValues.includes(o)) {
            acc.push(o);
        }
        return acc;
    }, []);
    return result;
}

/**
 * Geneate an explanation if a specific result passes the predicate's criteria
 * This will delegate to more specific functions based on the predicate's key
 * @param predicate
 * @param result
 * @param requestOptions
 * @returns
 */
async function explainPredicate(predicate, result, requestOptions) {
    // const predicateResult: IPredicateExplanation = {
    //   predicate: cloneObject(predicate),
    //   included: false,
    //   reasons: [],
    // };
    // get the key from the predicate
    const key = Object.keys(predicate)[0];
    // default to match options...
    let fn = explainMatchOptionPredicate;
    // However, some keys are treated differently
    if (HubInitiatives.PREDICATE_NON_MATCH_OPTIONS_PROPS.includes(key)) {
        if (HubInitiatives.PREDICATE_DATE_PROPS.includes(key)) {
            // handle as date
            fn = explainDatePredicate;
        }
        else {
            // handle as prop we just copy forward
            fn = explainPropPredicate;
        }
    }
    // return the result
    return fn(predicate, result, requestOptions);
}

/**
 * Generate an explanation if a specific result passes the filter's criteria
 * @param filter
 * @param result
 * @param requestOptions
 * @returns
 */
async function explainFilter(filter, result, requestOptions) {
    // setup return value
    const explanation = {
        filter: util.cloneObject(filter),
        matched: false,
        reasons: [],
    };
    // for each predicate, explain the match and return the explanation
    for (const predicate of filter.predicates) {
        const r = await explainPredicate(predicate, result, requestOptions);
        explanation.reasons.push(r);
    }
    // depending on the operation, we combine the predicate results differently
    if (filter.operation === "OR") {
        // if any of the predicates match, then the filter matches
        explanation.matched = explanation.reasons.some((r) => r.matched);
    }
    else {
        // filter.operation defaults to AND
        explanation.matched = explanation.reasons.every((r) => r.matched);
    }
    // return
    return explanation;
}

/**
 * Explain why a specific result was included in a Query.
 *
 * NOTE: This only works for entityType: "item" queries and does not
 * cover all possible permutations.
 * @param queryResult
 * @param query
 * @param requestOptions
 * @returns
 */
async function explainQueryResult(queryResult, query, requestOptions) {
    // Throw if the query is not for items
    if (query.targetEntity !== "item") {
        throw new Error(`explainQueryResult: Only queries with targetEntity: "item" are supported`);
    }
    // Expand the query so we have a standardized structure to work with
    const expandedQuery = HubInitiatives.expandPortalQuery(query);
    // iterate the filters on the query and get explanations for each
    const filterExplanations = [];
    for (const filter of expandedQuery.filters) {
        const fe = await explainFilter(filter, queryResult, requestOptions);
        filterExplanations.push(fe);
    }
    // Collect up the reasons
    const included = filterExplanations.reduce((acc, explanation) => {
        if (!explanation.matched) {
            acc = false;
        }
        return acc;
    }, true);
    // Collect up all the reasons into a single array
    const summary = [];
    filterExplanations.forEach((fe) => {
        fe.reasons.forEach((predicateExplanation) => {
            predicateExplanation.reasons.forEach((reason) => {
                summary.push(reason);
            });
        });
    });
    // construct the result
    const result = {
        result: util.cloneObject(queryResult),
        query: util.cloneObject(query),
        matched: included,
        reasons: filterExplanations,
        summary,
    };
    return result;
}

/**
 * Given an entity, execute a search on all the catalogs, and their associated with the entity
 * If the entity has no catalogs, an empty array is returned
 * If passed an IQuery, only collections using the same targetEntity will be searched
 * If passed a string, a query will be executed on all collections in all catalogs
 * @param entity
 * @param query - string or IQuery
 * @param options - IPagingOptions & ISortOptions - only num is used
 * @param context
 * @returns
 */
async function searchEntityCatalogs(entity, query, options, context) {
    // collect all the catalogs from the entity, and search them
    const catalogs = getWithDefault.getWithDefault(entity, "catalogs", []);
    return searchCatalogs.searchCatalogs(catalogs, query, options, context);
}

Object.defineProperty(exports, 'PublisherSource', {
    enumerable: true,
    get: function () {
        return compose.PublisherSource;
    }
});
Object.defineProperty(exports, 'UpdateFrequency', {
    enumerable: true,
    get: function () {
        return compose.UpdateFrequency;
    }
});
exports.categories = compose.categories;
exports.composeContent = compose.composeContent;
exports.getContentTypeIcon = compose.getContentTypeIcon;
exports.getHubApiUrl = compose.getHubApiUrl;
exports.getItemApiUrl = compose.getItemApiUrl;
exports.getItemDataUrl = compose.getItemDataUrl;
exports.getItemHubId = compose.getItemHubId;
exports.getItemLayer = compose.getItemLayer;
exports.getItemLayerId = compose.getItemLayerId;
exports.getItemThumbnailUrl = compose.getItemThumbnailUrl;
exports.getLayerIdFromUrl = compose.getLayerIdFromUrl;
exports.getPortalUrls = compose.getPortalUrls;
exports.getProxyUrl = compose.getProxyUrl;
exports.includes = compose.includes;
exports.isDownloadable = compose.isDownloadable;
exports.isFeatureService = compose.isFeatureService;
exports.isLayerView = compose.isLayerView;
exports.isSiteType = compose.isSiteType;
exports.normalizeItemType = compose.normalizeItemType;
exports.parseItemCategories = compose.parseItemCategories;
exports.ALPHA_ORGS = ArcGISContextManager.ALPHA_ORGS;
exports.ArcGISContext = ArcGISContextManager.ArcGISContext;
exports.ArcGISContextManager = ArcGISContextManager.ArcGISContextManager;
exports.addHistoryEntry = ArcGISContextManager.addHistoryEntry;
exports.fetchMaxNumUserGroupsLimit = ArcGISContextManager.fetchMaxNumUserGroupsLimit;
exports.fetchOrgLimits = ArcGISContextManager.fetchOrgLimits;
exports.fetchUserHubSettings = ArcGISContextManager.fetchUserHubSettings;
exports.fetchUserSiteSettings = ArcGISContextManager.fetchUserSiteSettings;
exports.getHubApiFromPortalUrl = ArcGISContextManager.getHubApiFromPortalUrl;
exports.getObjectSize = ArcGISContextManager.getObjectSize;
exports.getOrgThumbnailUrl = ArcGISContextManager.getOrgThumbnailUrl;
exports.removeHistoryEntry = ArcGISContextManager.removeHistoryEntry;
exports.updateUserHubSettings = ArcGISContextManager.updateUserHubSettings;
exports.updateUserSiteSettings = ArcGISContextManager.updateUserSiteSettings;
exports.GLOBAL_EXTENT = extent.GLOBAL_EXTENT;
exports.GeoJSONPolygonToBBox = extent.GeoJSONPolygonToBBox;
exports.allCoordinatesPossiblyWGS84 = extent.allCoordinatesPossiblyWGS84;
exports.bBoxToExtent = extent.bBoxToExtent;
exports.bboxToString = extent.bboxToString;
exports.createExtent = extent.createExtent;
exports.extentToBBox = extent.extentToBBox;
exports.extentToPolygon = extent.extentToPolygon;
exports.getExtentCenter = extent.getExtentCenter;
exports.getOrgExtentAsBBox = extent.getOrgExtentAsBBox;
exports.isBBox = extent.isBBox;
exports.isValidExtent = extent.isValidExtent;
exports.orgExtent = extent.orgExtent;
exports.DEFAULT_THEME = themes.DEFAULT_THEME;
exports.SITE_SCHEMA_VERSION = themes.SITE_SCHEMA_VERSION;
exports._checkStatusAndParseJson = themes._checkStatusAndParseJson;
exports._ensureSafeDomainLength = themes._ensureSafeDomainLength;
exports._ensureTelemetry = themes._ensureTelemetry;
exports._lookupPortal = themes._lookupPortal;
exports._migrateEventListCardConfigs = themes._migrateEventListCardConfigs;
exports._migrateFeedConfig = themes._migrateFeedConfig;
exports._migrateLinkUnderlinesCapability = themes._migrateLinkUnderlinesCapability;
exports._migrateTelemetryConfig = themes._migrateTelemetryConfig;
exports.addDomain = themes.addDomain;
exports.addSiteDomains = themes.addSiteDomains;
exports.constructSlug = themes.constructSlug;
exports.createModel = themes.createModel;
exports.doesResourceExist = themes.doesResourceExist;
exports.domainExistsPortal = themes.domainExistsPortal;
exports.ensureUniqueDomainName = themes.ensureUniqueDomainName;
exports.fetchModelFromItem = themes.fetchModelFromItem;
exports.fetchModelResources = themes.fetchModelResources;
exports.findItemsBySlug = themes.findItemsBySlug;
exports.getItemBySlug = themes.getItemBySlug;
exports.getModel = themes.getModel;
exports.getModelBySlug = themes.getModelBySlug;
exports.getOrgDefaultTheme = themes.getOrgDefaultTheme;
exports.getSiteById = themes.getSiteById;
exports.getUniqueDomainName = themes.getUniqueDomainName;
exports.getUniqueDomainNamePortal = themes.getUniqueDomainNamePortal;
exports.getUniqueSlug = themes.getUniqueSlug;
exports.lookupDomain = themes.lookupDomain;
exports.migrateBadBasemap = themes.migrateBadBasemap;
exports.migrateWebMappingApplicationSites = themes.migrateWebMappingApplicationSites;
exports.removeDomain = themes.removeDomain;
exports.removeDomainsBySiteId = themes.removeDomainsBySiteId;
exports.removeEmptyProps = themes.removeEmptyProps;
exports.setSlugKeyword = themes.setSlugKeyword;
exports.stringToBlob = themes.stringToBlob;
exports.updateModel = themes.updateModel;
exports.upgradeSiteSchema = themes.upgradeSiteSchema;
exports.upsertModelResources = themes.upsertModelResources;
exports.upsertResource = themes.upsertResource;
exports.RemoteServerError = request.RemoteServerError;
exports.buildUrl = request.buildUrl;
exports.hubApiRequest = request.hubApiRequest;
Object.defineProperty(exports, 'FileExtension', {
    enumerable: true,
    get: function () {
        return types$4.FileExtension;
    }
});
Object.defineProperty(exports, 'HubEntityHero', {
    enumerable: true,
    get: function () {
        return types$4.HubEntityHero;
    }
});
Object.defineProperty(exports, 'HubEntityStatus', {
    enumerable: true,
    get: function () {
        return types$4.HubEntityStatus;
    }
});
exports.HubFamilies = types$4.HubFamilies;
Object.defineProperty(exports, 'ItemType', {
    enumerable: true,
    get: function () {
        return types$4.ItemType;
    }
});
exports.addCreateItemTypes = types$4.addCreateItemTypes;
exports.getServiceTypeFromUrl = index$1.getServiceTypeFromUrl;
exports.isMapOrFeatureServerUrl = index$1.isMapOrFeatureServerUrl;
exports.addDays = util.addDays;
exports.arrayToObject = util.arrayToObject;
exports.camelize = util.camelize;
exports.capitalize = util.capitalize;
exports.chunkArray = util.chunkArray;
exports.cloneObject = util.cloneObject;
exports.compose = util.compose;
exports.createId = util.createId;
exports.extend = util.extend;
exports.filterBy = util.filterBy;
exports.findBy = util.findBy;
exports.flattenArray = util.flattenArray;
exports.isNil = util.isNil;
exports.last = util.last;
exports.maybeAdd = util.maybeAdd;
exports.maybePush = util.maybePush;
exports.objectToArray = util.objectToArray;
exports.unique = util.unique;
exports.uniqueBy = util.uniqueBy;
exports.without = util.without;
exports.updateHubEntity = updateHubEntity.updateHubEntity;
exports.getCardModelUrlFromEntity = getCardModelUrl.getCardModelUrlFromEntity;
exports.getCardModelUrlFromResult = getCardModelUrl.getCardModelUrlFromResult;
exports.EntityEditor = EntityEditor.EntityEditor;
exports.HubContent = EntityEditor.HubContent;
exports.HubDiscussion = EntityEditor.HubDiscussion;
exports.HubEvent = EntityEditor.HubEvent;
exports.HubInitiative = EntityEditor.HubInitiative;
exports.HubInitiativeTemplate = EntityEditor.HubInitiativeTemplate;
exports.HubProject = EntityEditor.HubProject;
exports.HubSurvey = EntityEditor.HubSurvey;
exports.HubTemplate = EntityEditor.HubTemplate;
exports.initiativeResultToCardModel = EntityEditor.initiativeResultToCardModel;
exports.initiativeTemplateResultToCardModel = EntityEditor.initiativeTemplateResultToCardModel;
exports.initiativeTemplateToCardModel = EntityEditor.initiativeTemplateToCardModel;
exports.initiativeToCardModel = EntityEditor.initiativeToCardModel;
exports.projectResultToCardModel = EntityEditor.projectResultToCardModel;
exports.projectToCardModel = EntityEditor.projectToCardModel;
exports.removeResource = EntityEditor.removeResource;
exports.ENTERPRISE_SITE_ITEM_TYPE = HubInitiatives.ENTERPRISE_SITE_ITEM_TYPE;
exports.EntityResourceMap = HubInitiatives.EntityResourceMap;
exports.HUB_SITE_ITEM_TYPE = HubInitiatives.HUB_SITE_ITEM_TYPE;
exports.SEARCH_APIS = HubInitiatives.SEARCH_APIS;
exports.addDefaultItemSearchPredicates = HubInitiatives.addDefaultItemSearchPredicates;
exports.buildWhereClause = HubInitiatives.buildWhereClause;
exports.convertItemToInitiative = HubInitiatives.convertItemToInitiative;
exports.convertItemToPage = HubInitiatives.convertItemToPage;
exports.convertItemToProject = HubInitiatives.convertItemToProject;
exports.convertItemToSite = HubInitiatives.convertItemToSite;
exports.convertItemToTemplate = HubInitiatives.convertItemToTemplate;
exports.convertModelToPage = HubInitiatives.convertModelToPage;
exports.convertModelToSite = HubInitiatives.convertModelToSite;
exports.createInitiative = HubInitiatives.createInitiative;
exports.createPage = HubInitiatives.createPage;
exports.createSite = HubInitiatives.createSite;
exports.deleteInitiative = HubInitiatives.deleteInitiative;
exports.deletePage = HubInitiatives.deletePage;
exports.deleteSite = HubInitiatives.deleteSite;
exports.editorToInitiative = HubInitiatives.editorToInitiative;
exports.editorToMetric = HubInitiatives.editorToMetric;
exports.enrichContentSearchResult = HubInitiatives.enrichContentSearchResult;
exports.enrichInitiativeSearchResult = HubInitiatives.enrichInitiativeSearchResult;
exports.enrichPageSearchResult = HubInitiatives.enrichPageSearchResult;
exports.enrichProjectSearchResult = HubInitiatives.enrichProjectSearchResult;
exports.enrichSiteSearchResult = HubInitiatives.enrichSiteSearchResult;
exports.enrichTemplateSearchResult = HubInitiatives.enrichTemplateSearchResult;
exports.expandApi = HubInitiatives.expandApi;
exports.expandApis = HubInitiatives.expandApis;
exports.expandPortalQuery = HubInitiatives.expandPortalQuery;
exports.fetchInitiative = HubInitiatives.fetchInitiative;
exports.fetchItem = HubInitiatives.fetchItem;
exports.fetchPage = HubInitiatives.fetchPage;
exports.fetchProject = HubInitiatives.fetchProject;
exports.fetchSite = HubInitiatives.fetchSite;
exports.fetchSiteModel = HubInitiatives.fetchSiteModel;
exports.fetchTemplate = HubInitiatives.fetchTemplate;
exports.getGroupPredicate = HubInitiatives.getGroupPredicate;
exports.getGroupThumbnailUrl = HubInitiatives.getGroupThumbnailUrl;
exports.getItemIdentifier = HubInitiatives.getItemIdentifier;
exports.getKilobyteSizeOfQuery = HubInitiatives.getKilobyteSizeOfQuery;
exports.getNextFunction = HubInitiatives.getNextFunction;
exports.getPendingProjectsQuery = HubInitiatives.getPendingProjectsQuery;
exports.getResultSiteRelativeLink = HubInitiatives.getResultSiteRelativeLink;
exports.getScopeGroupPredicate = HubInitiatives.getScopeGroupPredicate;
exports.getUserThumbnailUrl = HubInitiatives.getUserThumbnailUrl;
exports.migrateToCollectionKey = HubInitiatives.migrateToCollectionKey;
exports.relativeDateToDateRange = HubInitiatives.relativeDateToDateRange;
exports.removeDomainByHostname = HubInitiatives.removeDomainByHostname;
exports.serializeQueryForPortal = HubInitiatives.serializeQueryForPortal;
exports.updateInitiative = HubInitiatives.updateInitiative;
exports.updatePage = HubInitiatives.updatePage;
exports.updateSite = HubInitiatives.updateSite;
exports.upgradeCatalogSchema = HubInitiatives.upgradeCatalogSchema;
exports.valueToMatchOptions = HubInitiatives.valueToMatchOptions;
exports.getWithDefault = getWithDefault.getWithDefault;
exports.getProp = getProp.getProp;
exports.searchCatalogs = searchCatalogs.searchCatalogs;
exports.getAddContentConfig = getAddContentConfig.getAddContentConfig;
exports.getCatalogGroups = getPredicateValues.getCatalogGroups;
exports.getPredicateValues = getPredicateValues.getPredicateValues;
exports.deepCatalogContains = deepCatalogContains.deepCatalogContains;
exports.isOpenDataGroup = deepCatalogContains.isOpenDataGroup;
exports.getHubEntityTypeFromPath = parseContainmentPath.getHubEntityTypeFromPath;
exports.getPathForHubEntityType = parseContainmentPath.getPathForHubEntityType;
exports.parseContainmentPath = parseContainmentPath.parseContainmentPath;
exports.pathMap = parseContainmentPath.pathMap;
exports.Catalog = Catalog.Catalog;
exports.Collection = Catalog.Collection;
exports.catalogContains = Catalog.catalogContains;
exports.getHubTypeFromItemType = Catalog.getHubTypeFromItemType;
exports.isCuid = Catalog.isCuid;
exports.OperationStack = _enrichments.OperationStack;
exports.createOperationPipeline = _enrichments.createOperationPipeline;
exports.isServicesDirectoryDisabled = _enrichments.isServicesDirectoryDisabled;
exports.OperationError = OperationError.OperationError;
exports.HubError = HubError.HubError;
exports.acceptAssociation = requestAssociation.requestAssociation;
exports.breakAssociation = requestAssociation.breakAssociation;
exports.getAvailableToRequestAssociationCatalogs = requestAssociation.getAvailableToRequestAssociationCatalogs;
exports.getAvailableToRequestEntitiesQuery = requestAssociation.getAvailableToRequestEntitiesQuery;
exports.getWellKnownAssociationsCatalog = requestAssociation.getWellKnownAssociationsCatalog;
exports.requestAssociation = requestAssociation.requestAssociation;
exports.ASSOCIATION_REFERENCE_LIMIT = types.ASSOCIATION_REFERENCE_LIMIT;
exports.getAssociatedEntitiesQuery = getAssociatedEntitiesQuery.getAssociatedEntitiesQuery;
exports.getTypesFromEntityType = getAssociatedEntitiesQuery.getTypesFromEntityType;
exports.getAssociationStats = getAssociationStats.getAssociationStats;
exports.getPendingEntitiesQuery = getRequestingEntitiesQuery.getPendingEntitiesQuery;
exports.getRequestingEntitiesQuery = getRequestingEntitiesQuery.getRequestingEntitiesQuery;
exports.getReferencedEntityIds = getReferencedEntityIds.getReferencedEntityIds;
exports.setEntityAssociationGroup = setEntityAssociationGroup.setEntityAssociationGroup;
exports.canEditItem = canEditItem.canEditItem;
exports.hasBasePriv = canEditItem.hasBasePriv;
exports.getFamily = getFamily.getFamily;
exports.getFamilyTypes = getFamily.getFamilyTypes;
exports.addContextToSlug = slugs.addContextToSlug;
exports.isSlug = slugs.isSlug;
exports.parseDatasetId = slugs.parseDatasetId;
exports.removeContextFromSlug = slugs.removeContextFromSlug;
exports.isService = isService.isService;
exports.wait = wait.wait;
exports.createContent = edit.createContent;
exports.createInitiativeTemplate = edit.createInitiativeTemplate;
exports.createProject = edit.createProject;
exports.createTemplate = edit.createTemplate;
exports.deleteContent = edit.deleteContent;
exports.deleteInitiativeTemplate = edit.deleteInitiativeTemplate;
exports.deleteProject = edit.deleteProject;
exports.deleteSurvey = edit.deleteSurvey;
exports.deleteTemplate = edit.deleteTemplate;
exports.editorToContent = edit.editorToContent;
exports.editorToProject = edit.editorToProject;
exports.editorToTemplate = edit.editorToTemplate;
exports.setDisplayMapKeyword = edit.setDisplayMapKeyword;
exports.updateContent = edit.updateContent;
exports.updateInitiativeTemplate = edit.updateInitiativeTemplate;
exports.updateProject = edit.updateProject;
exports.updateSurvey = edit.updateSurvey;
exports.updateTemplate = edit.updateTemplate;
exports.fetchContent = fetchContent.fetchContent;
exports.convertItemToDiscussion = fetchHubEntity.convertItemToDiscussion;
exports.convertItemToInitiativeTemplate = fetchHubEntity.convertItemToInitiativeTemplate;
exports.convertItemToSurvey = fetchHubEntity.convertItemToSurvey;
exports.enrichInitiativeTemplateSearchResult = fetchHubEntity.enrichInitiativeTemplateSearchResult;
exports.fetchDiscussion = fetchHubEntity.fetchDiscussion;
exports.fetchHubContent = fetchHubEntity.fetchHubContent;
exports.fetchHubEntity = fetchHubEntity.fetchHubEntity;
exports.fetchInitiativeTemplate = fetchHubEntity.fetchInitiativeTemplate;
exports.fetchSurvey = fetchHubEntity.fetchSurvey;
exports.setProp = setProp.setProp;
exports.MAP_SURVEY_TYPEKEYWORD = getFormJson.MAP_SURVEY_TYPEKEYWORD;
exports.decodeForm = getFormJson.decodeForm;
exports.deepEqual = getFormJson.deepEqual;
exports.getDefaultEntitySettings = getFormJson.getDefaultEntitySettings;
exports.getFormInfoJson = getFormJson.getFormInfoJson;
exports.getFormJson = getFormJson.getFormJson;
exports.getMapQuestion = getFormJson.getMapQuestion;
exports.hasMapQuestion = getFormJson.hasMapQuestion;
exports.isDraft = getFormJson.isDraft;
exports.isMapQuestion = getFormJson.isMapQuestion;
exports.isPageQuestion = getFormJson.isPageQuestion;
exports.isSurvey123Connect = getFormJson.isSurvey123Connect;
exports.modelToHubEditableContent = getFormJson.modelToHubEditableContent;
exports.shouldDisplayMap = getFormJson.shouldDisplayMap;
Object.defineProperty(exports, 'JobRecordStatus', {
    enumerable: true,
    get: function () {
        return fetchItemJobRecords.JobRecordStatus;
    }
});
Object.defineProperty(exports, 'JobRecordType', {
    enumerable: true,
    get: function () {
        return fetchItemJobRecords.JobRecordType;
    }
});
exports.fetchItemJobRecords = fetchItemJobRecords.fetchItemJobRecords;
Object.defineProperty(exports, 'ServiceCapabilities', {
    enumerable: true,
    get: function () {
        return hostedServiceUtils.ServiceCapabilities;
    }
});
exports.hasServiceCapability = hostedServiceUtils.hasServiceCapability;
exports.isAGOFeatureServiceUrl = hostedServiceUtils.isAGOFeatureServiceUrl;
exports.isHostedFeatureServiceMainEntity = hostedServiceUtils.isHostedFeatureServiceMainEntity;
exports.isHostedFeatureServiceMainItem = hostedServiceUtils.isHostedFeatureServiceMainItem;
exports.isSecureProxyServiceUrl = hostedServiceUtils.isSecureProxyServiceUrl;
exports.toggleServiceCapability = hostedServiceUtils.toggleServiceCapability;
exports.HUB_ENTITY_TYPES = getRelativeWorkspaceUrl.HUB_ENTITY_TYPES;
exports.getRelativeWorkspaceUrl = getRelativeWorkspaceUrl.getRelativeWorkspaceUrl;
exports.isValidEntityType = getRelativeWorkspaceUrl.isValidEntityType;
Object.defineProperty(exports, 'TIMELINE_STAGE_STATUSES', {
    enumerable: true,
    get: function () {
        return IHubTimeline.TIMELINE_STAGE_STATUSES;
    }
});
Object.defineProperty(exports, 'ExpressionRelationships', {
    enumerable: true,
    get: function () {
        return Metrics.ExpressionRelationships;
    }
});
exports.MAX_ENTITY_METRICS_ALLOWED = Metrics.MAX_ENTITY_METRICS_ALLOWED;
exports.MAX_FEATURED_METRICS_ALLOWED = Metrics.MAX_FEATURED_METRICS_ALLOWED;
Object.defineProperty(exports, 'MetricVisibility', {
    enumerable: true,
    get: function () {
        return Metrics.MetricVisibility;
    }
});
Object.defineProperty(exports, 'EmbedKind', {
    enumerable: true,
    get: function () {
        return Embeds.EmbedKind;
    }
});
Object.defineProperty(exports, 'UiSchemaElementTypes', {
    enumerable: true,
    get: function () {
        return types$1.UiSchemaElementTypes;
    }
});
Object.defineProperty(exports, 'UiSchemaMessageTypes', {
    enumerable: true,
    get: function () {
        return types$1.UiSchemaMessageTypes;
    }
});
Object.defineProperty(exports, 'UiSchemaRuleEffects', {
    enumerable: true,
    get: function () {
        return types$1.UiSchemaRuleEffects;
    }
});
Object.defineProperty(exports, 'UiSchemaSectionTypes', {
    enumerable: true,
    get: function () {
        return types$1.UiSchemaSectionTypes;
    }
});
exports.validCardEditorTypes = types$1.validCardEditorTypes;
exports.validEditorTypes = types$1.validEditorTypes;
exports.validEntityEditorTypes = types$1.validEntityEditorTypes;
exports.validEventGalleryCardEditorTypes = types$1.validEventGalleryCardEditorTypes;
exports.validFollowCardEditorTypes = types$1.validFollowCardEditorTypes;
exports.validStatCardEditorTypes = types$1.validStatCardEditorTypes;
exports.getEditorConfig = getEditorConfig.getEditorConfig;
exports.ENTITY_ACCESS_SCHEMA = subschemas.ENTITY_ACCESS_SCHEMA;
exports.ENTITY_CATEGORIES_SCHEMA = subschemas.ENTITY_CATEGORIES_SCHEMA;
exports.ENTITY_FEATURED_CONTENT_SCHEMA = subschemas.ENTITY_FEATURED_CONTENT_SCHEMA;
exports.ENTITY_IMAGE_SCHEMA = subschemas.ENTITY_IMAGE_SCHEMA;
exports.ENTITY_IS_DISCUSSABLE_SCHEMA = subschemas.ENTITY_IS_DISCUSSABLE_SCHEMA;
exports.ENTITY_LOCATION_SCHEMA = subschemas.ENTITY_LOCATION_SCHEMA;
exports.ENTITY_MAP_SCHEMA = subschemas.ENTITY_MAP_SCHEMA;
exports.ENTITY_NAME_SCHEMA = subschemas.ENTITY_NAME_SCHEMA;
exports.ENTITY_SUMMARY_SCHEMA = subschemas.ENTITY_SUMMARY_SCHEMA;
exports.ENTITY_TAGS_SCHEMA = subschemas.ENTITY_TAGS_SCHEMA;
exports.ENTITY_TIMELINE_SCHEMA = subschemas.ENTITY_TIMELINE_SCHEMA;
exports.PRIVACY_CONFIG_SCHEMA = subschemas.PRIVACY_CONFIG_SCHEMA;
exports.SITE_ENTITY_NAME_SCHEMA = subschemas.SITE_ENTITY_NAME_SCHEMA;
exports.SLUG_SCHEMA = subschemas.SLUG_SCHEMA;
exports.CatalogSchema = CatalogSchema.CatalogSchema;
exports.CollectionAppearanceSchema = CatalogSchema.CollectionAppearanceSchema;
exports.CollectionSchema = CatalogSchema.CollectionSchema;
exports.FilterSchema = CatalogSchema.FilterSchema;
exports.GalleryDisplayConfigSchema = CatalogSchema.GalleryDisplayConfigSchema;
exports.PredicateSchema = CatalogSchema.PredicateSchema;
exports.QuerySchema = CatalogSchema.QuerySchema;
exports.targetEntities = CatalogSchema.targetEntities;
exports.getTypeFromEntity = getTypeFromEntity.getTypeFromEntity;
exports.processActionLink = processActionLinks.processActionLink;
exports.processActionLinks = processActionLinks.processActionLinks;
exports.getS123EditUrl = getS123EditUrl.getS123EditUrl;
exports.setEntityAccess = getS123EditUrl.setEntityAccess;
exports.shareEntityWithGroups = unshareEntityWithGroups.shareEntityWithGroups;
exports.unshareEntityWithGroups = unshareEntityWithGroups.unshareEntityWithGroups;
exports.getEntityGroups = getEntityGroups.getEntityGroups;
exports.getEntityThumbnailUrl = getEntityThumbnailUrl.getEntityThumbnailUrl;
exports.asyncForEach = deepContains.asyncForEach;
exports.getEntityTypeFromHubEntityType = deepContains.getEntityTypeFromHubEntityType;
exports.WGS84_WKID = buildExistingExportsPortalQuery.WGS84_WKID;
exports.buildExistingExportsPortalQuery = buildExistingExportsPortalQuery.buildExistingExportsPortalQuery;
exports.getExportItemTypeKeyword = buildExistingExportsPortalQuery.getExportItemTypeKeyword;
exports.getExportLayerTypeKeyword = buildExistingExportsPortalQuery.getExportLayerTypeKeyword;
exports.getSpatialRefTypeKeyword = buildExistingExportsPortalQuery.getSpatialRefTypeKeyword;
exports.serializeSpatialReference = buildExistingExportsPortalQuery.serializeSpatialReference;
exports.ArcgisHubDownloadError = types$2.ArcgisHubDownloadError;
Object.defineProperty(exports, 'DownloadOperationStatus', {
    enumerable: true,
    get: function () {
        return types$2.DownloadOperationStatus;
    }
});
exports.PORTAL_EXPORT_TYPES = types$2.PORTAL_EXPORT_TYPES;
Object.defineProperty(exports, 'ServiceDownloadFormat', {
    enumerable: true,
    get: function () {
        return types$2.ServiceDownloadFormat;
    }
});
exports.fetchDownloadFile = fetchDownloadFile.fetchDownloadFile;
exports.canUseCreateReplica = canUseHubDownloadSystem.canUseCreateReplica;
exports.canUseHubDownloadSystem = canUseHubDownloadSystem.canUseHubDownloadSystem;
exports.canUseHubDownloadApi = getDownloadFormats.canUseHubDownloadApi;
exports.getDownloadFormats = getDownloadFormats.getDownloadFormats;
exports.getHubDownloadApiFormats = getDownloadFormats.getHubDownloadApiFormats;
exports.getDownloadConfiguration = getDownloadConfiguration.getDownloadConfiguration;
exports.HUB_CDN_URLMAP = getSurveyModels.HUB_CDN_URLMAP;
exports.HUB_LOCALES = getSurveyModels.HUB_LOCALES;
exports._addTokenToResourceUrl = getSurveyModels._addTokenToResourceUrl;
exports._unprotectAndRemoveGroup = getSurveyModels._unprotectAndRemoveGroup;
exports._unprotectAndRemoveItem = getSurveyModels._unprotectAndRemoveItem;
exports.addSolutionResourceUrlToAssets = getSurveyModels.addSolutionResourceUrlToAssets;
exports.buildDraft = getSurveyModels.buildDraft;
exports.convertToWellKnownLocale = getSurveyModels.convertToWellKnownLocale;
exports.deepStringReplace = getSurveyModels.deepStringReplace;
exports.ensureUniqueString = getSurveyModels.ensureUniqueString;
exports.failSafeUpdate = getSurveyModels.failSafeUpdate;
exports.fetchAndUploadResource = getSurveyModels.fetchAndUploadResource;
exports.fetchAndUploadThumbnail = getSurveyModels.fetchAndUploadThumbnail;
exports.fetchHubTranslation = getSurveyModels.fetchHubTranslation;
exports.fetchImageAsBlob = getSurveyModels.fetchImageAsBlob;
exports.getCulture = getSurveyModels.getCulture;
exports.getDomainsForSite = getSurveyModels.getDomainsForSite;
exports.getHubLocaleAssetUrl = getSurveyModels.getHubLocaleAssetUrl;
exports.getHubProduct = getSurveyModels.getHubProduct;
exports.getInputFeatureServiceModel = getSurveyModels.getInputFeatureServiceModel;
exports.getItemAssets = getSurveyModels.getItemAssets;
exports.getModelFromOptions = getSurveyModels.getModelFromOptions;
exports.getSourceFeatureServiceModelFromFieldworker = getSurveyModels.getSourceFeatureServiceModelFromFieldworker;
exports.getStakeholderModel = getSurveyModels.getStakeholderModel;
exports.getSubscriptionType = getSurveyModels.getSubscriptionType;
exports.getSurveyModels = getSurveyModels.getSurveyModels;
exports.interpolateItemId = getSurveyModels.interpolateItemId;
exports.isDomainForLegacySite = getSurveyModels.isDomainForLegacySite;
exports.isDomainUsedElsewhere = getSurveyModels.isDomainUsedElsewhere;
exports.isFieldworkerView = getSurveyModels.isFieldworkerView;
exports.isValidDomain = getSurveyModels.isValidDomain;
exports.itemPropsNotInTemplates = getSurveyModels.itemPropsNotInTemplates;
exports.normalizeSolutionTemplateItem = getSurveyModels.normalizeSolutionTemplateItem;
exports.propifyString = getSurveyModels.propifyString;
exports.replaceItemId = getSurveyModels.replaceItemId;
exports.serializeModel = getSurveyModels.serializeModel;
exports.unprotectModel = getSurveyModels.unprotectModel;
exports.updateDomain = getSurveyModels.updateDomain;
exports.uploadResourcesFromUrl = getSurveyModels.uploadResourcesFromUrl;
exports.withoutByProp = getSurveyModels.withoutByProp;
exports.addGroupMembers = addGroupMembers.addGroupMembers;
exports.autoAddUsers = addGroupMembers.autoAddUsers;
exports.inviteUsers = addGroupMembers.inviteUsers;
exports.convertUserToHubUser = hubSearch.convertUserToHubUser;
exports.createHubGroup = hubSearch.createHubGroup;
exports.deleteHubGroup = hubSearch.deleteHubGroup;
exports.enrichGroupSearchResult = hubSearch.enrichGroupSearchResult;
exports.enrichUserSearchResult = hubSearch.enrichUserSearchResult;
exports.fetchHubGroup = hubSearch.fetchHubGroup;
exports.fetchHubUser = hubSearch.fetchHubUser;
exports.getGroupHomeUrl = hubSearch.getGroupHomeUrl;
exports.getUserHomeUrl = hubSearch.getUserHomeUrl;
exports.hubSearch = hubSearch.hubSearch;
exports.pickProps = hubSearch.pickProps;
exports.updateHubGroup = hubSearch.updateHubGroup;
exports.HubGroup = HubGroup.HubGroup;
exports.getWellKnownGroup = getWellKnownGroup.getWellKnownGroup;
exports.createDiscussion = edit$1.createDiscussion;
exports.deleteDiscussion = edit$1.deleteDiscussion;
exports.updateDiscussion = edit$1.updateDiscussion;
Object.defineProperty(exports, 'AclCategory', {
    enumerable: true,
    get: function () {
        return utils.AclCategory;
    }
});
Object.defineProperty(exports, 'AclSubCategory', {
    enumerable: true,
    get: function () {
        return utils.AclSubCategory;
    }
});
exports.CANNOT_DISCUSS = utils.CANNOT_DISCUSS;
Object.defineProperty(exports, 'ChannelFilter', {
    enumerable: true,
    get: function () {
        return utils.ChannelFilter;
    }
});
Object.defineProperty(exports, 'ChannelRelation', {
    enumerable: true,
    get: function () {
        return utils.ChannelRelation;
    }
});
Object.defineProperty(exports, 'ChannelSort', {
    enumerable: true,
    get: function () {
        return utils.ChannelSort;
    }
});
Object.defineProperty(exports, 'CommonSort', {
    enumerable: true,
    get: function () {
        return utils.CommonSort;
    }
});
Object.defineProperty(exports, 'DiscussionSource', {
    enumerable: true,
    get: function () {
        return utils.DiscussionSource;
    }
});
Object.defineProperty(exports, 'DiscussionType', {
    enumerable: true,
    get: function () {
        return utils.DiscussionType;
    }
});
Object.defineProperty(exports, 'EntitySettingType', {
    enumerable: true,
    get: function () {
        return utils.EntitySettingType;
    }
});
Object.defineProperty(exports, 'PostReaction', {
    enumerable: true,
    get: function () {
        return utils.PostReaction;
    }
});
Object.defineProperty(exports, 'PostRelation', {
    enumerable: true,
    get: function () {
        return utils.PostRelation;
    }
});
Object.defineProperty(exports, 'PostSort', {
    enumerable: true,
    get: function () {
        return utils.PostSort;
    }
});
Object.defineProperty(exports, 'PostStatus', {
    enumerable: true,
    get: function () {
        return utils.PostStatus;
    }
});
Object.defineProperty(exports, 'PostType', {
    enumerable: true,
    get: function () {
        return utils.PostType;
    }
});
Object.defineProperty(exports, 'ReactionRelation', {
    enumerable: true,
    get: function () {
        return utils.ReactionRelation;
    }
});
Object.defineProperty(exports, 'Role', {
    enumerable: true,
    get: function () {
        return utils.Role;
    }
});
Object.defineProperty(exports, 'SearchPostsFormat', {
    enumerable: true,
    get: function () {
        return utils.SearchPostsFormat;
    }
});
Object.defineProperty(exports, 'SharingAccess', {
    enumerable: true,
    get: function () {
        return utils.SharingAccess;
    }
});
Object.defineProperty(exports, 'SortOrder', {
    enumerable: true,
    get: function () {
        return utils.SortOrder;
    }
});
exports.channelToSearchResult = utils.channelToSearchResult;
exports.getChannelAccess = utils.getChannelAccess;
exports.getChannelGroupIds = utils.getChannelGroupIds;
exports.getChannelOrgIds = utils.getChannelOrgIds;
exports.getChannelUsersQuery = utils.getChannelUsersQuery;
exports.getPostCSVFileName = utils.getPostCSVFileName;
exports.isDiscussable = utils.isDiscussable;
exports.isOrgChannel = utils.isOrgChannel;
exports.isPrivateChannel = utils.isPrivateChannel;
exports.isPublicChannel = utils.isPublicChannel;
exports.setDiscussableKeyword = utils.setDiscussableKeyword;
exports.searchChannels = channels.searchChannels;
exports.createSetting = settings.createSetting;
exports.fetchSetting = settings.fetchSetting;
exports.removeSetting = settings.removeSetting;
exports.updateSetting = settings.updateSetting;
exports.discussionsApiRequest = discussionsApiRequest.discussionsApiRequest;
exports.createHubEvent = edit$2.createHubEvent;
exports.createHubEventRegistration = edit$2.createHubEventRegistration;
exports.deleteHubEvent = edit$2.deleteHubEvent;
exports.deleteHubEventRegistration = edit$2.deleteHubEventRegistration;
exports.updateHubEvent = edit$2.updateHubEvent;
exports.convertClientEventToHubEvent = fetch$1.convertClientEventToHubEvent;
exports.fetchEvent = fetch$1.fetchEvent;
Object.defineProperty(exports, 'HubEventAttendanceType', {
    enumerable: true,
    get: function () {
        return types$3.HubEventAttendanceType;
    }
});
Object.defineProperty(exports, 'HubEventCapacityType', {
    enumerable: true,
    get: function () {
        return types$3.HubEventCapacityType;
    }
});
exports.getEventGroups = getEventGroups.getEventGroups;
exports.deleteProp = deleteProp.deleteProp;
exports.interpolate = interpolate.interpolate;
exports.shareItemToGroups = shareItemToGroups.shareItemToGroups;
exports.unshareItemFromGroups = unshareItemFromGroups.unshareItemFromGroups;
exports.batch = batch.batch;
exports.STANDARD_LICENSES = getStructuredLicense.STANDARD_LICENSES;
exports.getStructuredLicense = getStructuredLicense.getStructuredLicense;
exports.deleteItemThumbnail = getEditorSlug.deleteItemThumbnail;
exports.setItemThumbnail = getEditorSlug.setItemThumbnail;
exports.uploadImageResource = getEditorSlug.uploadImageResource;
exports.getEnvironmentFromPortalUrl = getPortalApiUrl.getEnvironmentFromPortalUrl;
exports.getPortalApiUrl = getPortalApiUrl.getPortalApiUrl;
exports.createItemFromFile = createItemFromUrlOrFile.createItemFromFile;
exports.createItemFromUrl = createItemFromUrlOrFile.createItemFromUrl;
exports.createItemFromUrlOrFile = createItemFromUrlOrFile.createItemFromUrlOrFile;
exports.followEntity = follow.followEntity;
exports.getEntityFollowersGroupId = follow.getEntityFollowersGroupId;
exports.isUserFollowing = follow.isUserFollowing;
exports.unfollowEntity = follow.unfollowEntity;
exports._deepMapValues = _deepMapValues._deepMapValues;
exports._isDate = _deepMapValues._isDate;
exports._isFunction = _deepMapValues._isFunction;
exports._isObject = _deepMapValues._isObject;
exports._isRegExp = _deepMapValues._isRegExp;
exports._isString = _deepMapValues._isString;
exports._mapValues = _deepMapValues._mapValues;
exports.deepSet = deepSet.deepSet;
exports.mergeObjects = mergeObjects.mergeObjects;
exports.deepFilter = deepFilter.deepFilter;
exports.deepFind = deepFind.deepFind;
exports.deepFindById = deepFind.deepFindById;
exports.fetchOrg = fetchOrg.fetchOrg;
exports.HubPage = HubPage.HubPage;
exports.HubPermissionsPolicies = checkPermission.HubPermissionsPolicies;
exports.checkPermission = checkPermission.checkPermission;
exports.getPermissionPolicy = checkPermission.getPermissionPolicy;
exports.isPermission = checkPermission.isPermission;
exports.addPermissionPolicy = enrichEntity.addPermissionPolicy;
exports.removePermissionPolicy = enrichEntity.removePermissionPolicy;
exports.objectToJsonBlob = objectToJsonBlob.objectToJsonBlob;
exports.validateUrl = validateUrl.validateUrl;
exports.dotifyString = wellKnownCatalog.dotifyString;
exports.getWellKnownCatalog = wellKnownCatalog.getWellKnownCatalog;
exports.getWellknownCollection = wellKnownCatalog.getWellknownCollection;
exports.getWellknownCollections = wellKnownCatalog.getWellknownCollections;
exports._getAuthHeader = domainExists._getAuthHeader;
exports._getDomainServiceUrl = domainExists._getDomainServiceUrl;
exports.domainExists = domainExists.domainExists;
exports.stripProtocol = domainExists.stripProtocol;
exports.HubSite = HubSite.HubSite;
exports.applyVersion = HubSite.applyVersion;
exports.checkForStaleVersion = HubSite.checkForStaleVersion;
exports.createVersion = HubSite.createVersion;
exports.updateVersion = HubSite.updateVersion;
exports.getFeedTemplate = previewFeed.getFeedTemplate;
exports.previewFeed = previewFeed.previewFeed;
exports.reharvestSiteCatalog = previewFeed.reharvestSiteCatalog;
exports.setFeedTemplate = previewFeed.setFeedTemplate;
exports.getPortalUrl = getPortalUrl.getPortalUrl;
exports.getItemHomeUrl = getItemHomeUrl.getItemHomeUrl;
exports.getPortalBaseFromOrgUrl = getPortalBaseFromOrgUrl.getPortalBaseFromOrgUrl;
exports.cacheBustUrl = cacheBustUrl.cacheBustUrl;
exports.getCdnAssetUrl = getCdnAssetUrl.getCdnAssetUrl;
exports.base64ToUnicode = encoding.base64ToUnicode;
exports.unicodeToBase64 = encoding.unicodeToBase64;
exports.failSafe = failSafe.failSafe;
exports.generateRandomString = generateRandomString.generateRandomString;
exports.isGuid = isGuid.isGuid;
exports.mapBy = mapBy.mapBy;
exports.slugify = slugify.slugify;
Object.defineProperty(exports, 'Level', {
    enumerable: true,
    get: function () {
        return logger.Level;
    }
});
exports.Logger = logger.Logger;
exports.isUpdateGroup = isUpdateGroup.isUpdateGroup;
exports.dasherize = dasherize.dasherize;
exports.titleize = titleize.titleize;
exports.poll = poll.poll;
exports.getDatePickerDate = getDefaultEventDatesAndTimes.getDatePickerDate;
exports.getTimePickerTime = getDefaultEventDatesAndTimes.getTimePickerTime;
exports.guessTimeZone = getDefaultEventDatesAndTimes.guessTimeZone;
exports.isComboboxItemSelected = isComboboxItemSelected.isComboboxItemSelected;
exports.deleteVersion = updateVersionMetadata.deleteVersion;
exports.getVersion = updateVersionMetadata.getVersion;
exports.searchVersions = updateVersionMetadata.searchVersions;
exports.updateVersionMetadata = updateVersionMetadata.updateVersionMetadata;
exports.getEntityMetrics = getEntityMetrics.getEntityMetrics;
exports.resolveMetric = resolveMetric.resolveMetric;
exports.REQUIRED_PRIVS = REQUIRED_PRIVS;
exports._canEmailUser = _canEmailUser;
exports._consolidateResults = _consolidateResults;
exports._formatAutoAddResponse = _formatAutoAddResponse;
exports._getAutoAddUsers = _getAutoAddUsers;
exports._getEmailUsers = _getEmailUsers;
exports._getHttpAndHttpsUris = _getHttpAndHttpsUris;
exports._getInviteUsers = _getInviteUsers;
exports._getLocation = _getLocation;
exports._isOrgAdmin = _isOrgAdmin;
exports._processAutoAdd = _processAutoAdd;
exports._processInvite = _processInvite;
exports._processPrimaryEmail = _processPrimaryEmail;
exports._processSecondaryEmail = _processSecondaryEmail;
exports.addUsersToGroup = addUsersToGroup;
exports.aggregateMetrics = aggregateMetrics;
exports.applyPropertiesToItems = applyPropertiesToItems;
exports.atob = index.abab.atob;
exports.btoa = index.abab.btoa;
exports.canEditEvent = canEditEvent;
exports.canEditSite = canEditSite;
exports.canEditSiteContent = canEditSiteContent;
exports.clearMemoizedCache = clearMemoizedCache;
exports.completeOAuth2 = completeOAuth2;
exports.composeHubContent = composeHubContent;
exports.convertSolutionTemplateResourcesToAssets = convertSolutionTemplateResourcesToAssets;
exports.convertUrlsToAnchorTags = convertUrlsToAnchorTags;
exports.createSubscription = createSubscription;
exports.createUser = createUser;
exports.datasetToContent = datasetToContent;
exports.datasetToItem = datasetToItem;
exports.deepDeletePropByValue = deepDeletePropByValue;
exports.deleteUser = deleteUser;
exports.doesItemExistWithTitle = doesItemExistWithTitle;
exports.emailOrgUsers = emailOrgUsers;
exports.ensureProp = ensureProp;
exports.explainQueryResult = explainQueryResult;
exports.fetchAllPages = fetchAllPages;
exports.getCampaignUrl = getCampaignUrl;
exports.getCategory = getCategory;
exports.getContentIdentifier = getContentIdentifier;
exports.getContentTypeLabel = getContentTypeLabel;
exports.getFeedConfiguration = getFeedConfiguration;
exports.getHubApiUrlFromPortal = getHubApiUrlFromPortal;
exports.getHubUrlFromPortal = getHubUrlFromPortal;
exports.getProps = getProps;
exports.getS123ShareUrl = getS123ShareUrl;
exports.getServiceStatus = getServiceStatus;
exports.getSubscription = getSubscription;
exports.getSubscriptions = getSubscriptions;
exports.getTypeCategories = getTypeCategories;
exports.getTypes = getTypes;
exports.getUniqueItemTitle = getUniqueItemTitle;
exports.getUser = getUser;
exports.incrementString = incrementString;
exports.isHubService = isHubService;
exports.isSafeRedirectUrl = isSafeRedirectUrl;
exports.itemToContent = itemToContent;
exports.memoize = memoize;
exports.notify = notify;
exports.processRevertableTasks = processRevertableTasks;
exports.registerBrowserApp = registerBrowserApp;
exports.resolveReferences = resolveReferences;
exports.runRevertableTask = runRevertableTask;
exports.searchEntityCatalogs = searchEntityCatalogs;
exports.setContentType = setContentType;
exports.setFeedConfiguration = setFeedConfiguration;
exports.subscribe = subscribe;
exports.templateResultToCardModel = templateResultToCardModel;
exports.templateToCardModel = templateToCardModel;
exports.updateSubscription = updateSubscription;
exports.updateUser = updateUser;
exports.upgradeProtocol = upgradeProtocol;
exports.userResultToCardModel = userResultToCardModel;
