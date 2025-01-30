import { v as getBasePropertyMap, w as computeItemProps, x as computeItemLinks, y as processEntityFeatures } from './HubInitiatives-4f4e24ce.js';
import { b as getItemThumbnailUrl, c as getHubRelativeUrl, h as getContentEditUrl, j as getAdditionalResources, k as getSchedulerApiUrl } from './compose-d5b83ab7.js';
import { E as EntitySettingType } from './utils-6bf1b713.js';
import { P as PropertyMapper } from './PropertyMapper-4eb0ac8f.js';
import { g as getItemHomeUrl } from './get-item-home-url-b414b731.js';
import { g as getRelativeWorkspaceUrl } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { h as hasServiceCapability, S as ServiceCapabilities } from './hostedServiceUtils-f22b023b.js';
import { i as isService } from './is-service-ad021db8.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { _ as _isObject } from './_deep-map-values-53f8dbd1.js';
import { b as InitiativeTemplateDefaultFeatures } from './InitiativeTemplateBusinessRules-e78cc3ef.js';
import { h as getItemInfo } from './get-f0caeb52.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';

/**
 * Compares two values deeply for equality.
 * Works for primatives, arrays and objects.
 * Not verified for other types.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns True if the values are deeply equal, false otherwise.
 */
function deepEqual(a, b) {
    // Simple comparison for primitives
    if (a === b) {
        return true;
    }
    // object checks
    if (a && b && _isObject(a) && _isObject(b)) {
        // if either are not arrays, return false
        if (Array.isArray(a) !== Array.isArray(b)) {
            return false;
        }
        const keys = Object.keys(a);
        // if key lengths are different, return false
        if (keys.length !== Object.keys(b).length) {
            return false;
        }
        // recurse on each key
        return keys.every((key) => deepEqual(a[key], b[key]));
    }
    return false;
}

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IModel to an IHubDiscussion
 * @returns an IPropertyMap array
 * @private
 */
function getPropertyMap$3() {
    const map = getBasePropertyMap();
    // Type specific mappings
    map.push({
        entityKey: "prompt",
        storeKey: "data.prompt",
    });
    map.push({
        entityKey: "location",
        storeKey: "item.properties.location",
    });
    return map;
}

/**
 * Given a model and a Discussion, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param discussion
 * @param requestOptions
 * @returns an IHubDiscussion
 */
function computeProps$3(model, discussion, requestOptions) {
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on discussion
    discussion = computeItemProps(model.item, discussion);
    // thumbnail url
    discussion.thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    // cast b/c this takes a partial but returns a full object
    return discussion;
}

const DISCUSSION_SETTINGS = {
    discussions: {
        allowedChannelIds: null,
        allowedLocations: null,
    },
};
const DEFAULT_ENTITY_SETTINGS_BY_ENTITY_TYPE = {
    discussion: {
        type: EntitySettingType.CONTENT,
        settings: Object.assign({}, DISCUSSION_SETTINGS),
    },
    site: null,
    project: null,
    initiative: null,
    initiativeTemplate: null,
    page: null,
    content: null,
    org: null,
    group: null,
    template: null,
    survey: null,
    event: null,
    user: null,
};
function getDefaultEntitySettings(entityType) {
    if (!DEFAULT_ENTITY_SETTINGS_BY_ENTITY_TYPE[entityType]) {
        throw new Error(`no default entity settings defined for ${entityType}`);
    }
    return {
        type: DEFAULT_ENTITY_SETTINGS_BY_ENTITY_TYPE[entityType].type,
        settings: Object.assign({}, DEFAULT_ENTITY_SETTINGS_BY_ENTITY_TYPE[entityType].settings),
    };
}

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IModel to an IHubProject
 * @returns
 * @private
 */
function getPropertyMap$2() {
    const map = getBasePropertyMap();
    /**
     * content-specific mappings. Note: we do not need to explicitly map
     * properties from the content item's data.view into the entity's view
     * because that mapping is already defined in the base property map
     */
    // NOTE: we may want to move these into getBaseProprtyMap(), see:
    // https://github.com/Esri/hub.js/pull/993#discussion_r1134005511
    map.push({ entityKey: "permissions", storeKey: "data.permissions" });
    map.push({
        entityKey: "location",
        storeKey: "item.properties.location",
    });
    map.push({
        entityKey: "licenseInfo",
        storeKey: "item.licenseInfo",
    });
    map.push({
        entityKey: "size",
        storeKey: "item.size",
    });
    // features is intentionally left out
    // TODO: look into composeContent() for what we can add here
    return map;
}

function computeProps$2(model, content, requestOptions, enrichments = {}) {
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on content
    content = computeItemProps(model.item, content);
    // thumbnail url
    const thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    content.thumbnailUrl = thumbnailUrl;
    // NOTE: other entities encapsulate this in a computeLinks function
    content.links = {
        self: getItemHomeUrl(content.id, requestOptions),
        siteRelative: getHubRelativeUrl(content.type, content.slug || content.id, content.typeKeywords),
        siteRelativeEntityType: getHubRelativeUrl(content.type),
        workspaceRelative: getRelativeWorkspaceUrl("content", content.id),
        thumbnail: thumbnailUrl,
        contentEditUrl: getContentEditUrl(model.item, requestOptions),
    };
    // cannot be null otherwise we'd get a validation
    // error that doesn't let us save the form
    content.licenseInfo = model.item.licenseInfo || "";
    // when we receive a schedule from the enrichments, we want to use it, otherwise default to automatic
    content.schedule = enrichments.schedule;
    // calculate extendedProps
    content.extendedProps = isService(content.url)
        ? getServiceExtendedProps(model.item, enrichments, requestOptions)
        : getContentExtendedProps(model.item, enrichments, requestOptions);
    // TODO: Remove once .serverQueryCapability, .serverExtractCapability, and .serverExtractFormats are removed
    if (enrichments.server) {
        content.serverQueryCapability = hasServiceCapability(ServiceCapabilities.QUERY, enrichments.server);
        content.serverExtractCapability = hasServiceCapability(ServiceCapabilities.EXTRACT, enrichments.server);
        const extractFormatsList = getProp(enrichments, "server.supportedExportFormats");
        content.serverExtractFormats =
            extractFormatsList && extractFormatsList.split(",");
    }
    // TODO: remove once .additionalResources is removed
    if (enrichments.metadata) {
        content.additionalResources = getAdditionalResources(model.item, enrichments.metadata, requestOptions);
    }
    return content;
}
/**
 * @private
 *
 * Compute the extended props for a service-backed item (i.e., feature, map, or image service)
 *
 * @param item
 * @param enrichments
 * @param requestOptions
 * @returns extended props for a service-backed item
 */
function getServiceExtendedProps(item, enrichments, requestOptions) {
    const baseProps = getBaseExtendedProps(item, enrichments, requestOptions);
    const result = Object.assign(Object.assign({}, baseProps), { kind: "service" });
    if (enrichments.server) {
        result.server = enrichments.server;
        result.serverQueryCapability = hasServiceCapability(ServiceCapabilities.QUERY, enrichments.server);
        result.serverExtractCapability = hasServiceCapability(ServiceCapabilities.EXTRACT, enrichments.server);
        const extractFormatsList = getProp(enrichments, "server.supportedExportFormats");
        result.serverExtractFormats =
            extractFormatsList && extractFormatsList.split(",");
    }
    return result;
}
/**
 * @private
 *
 * Compute the extended props for content items not backed by a service
 *
 * @param item
 * @param enrichments
 * @param requestOptions
 * @returns
 */
function getContentExtendedProps(item, enrichments, requestOptions) {
    const baseProps = getBaseExtendedProps(item, enrichments, requestOptions);
    return Object.assign(Object.assign({}, baseProps), { kind: "content" });
}
/**
 * @private
 *
 * Compute the extended props common to all content items.
 *
 * @param item
 * @param enrichments
 * @param requestOptions
 * @returns
 */
function getBaseExtendedProps(item, enrichments, requestOptions) {
    return {
        kind: null,
        metadata: enrichments.metadata,
        additionalResources: getAdditionalResources(item, enrichments.metadata, requestOptions),
        downloads: getProp(item, "properties.downloads"),
    };
}

/**
 * Converts an Imodel to a Hub editable content object
 *
 * @param model IModel to convert
 * @param requestOptions
 * @param enrichments  hash of enrichments to apply to the content
 */
function modelToHubEditableContent(model, requestOptions, enrichments) {
    const mapper = new PropertyMapper(getPropertyMap$2());
    const content = mapper.storeToEntity(model, {});
    return computeProps$2(model, content, requestOptions, enrichments);
}

// Any code referencing these functions must first pass isDownloadSchedulingAvailable
/**
 * Get the schedule for an item. If no schedule is found, returns null.
 * @param itemId The item to get the schedule for
 * @param requestOptions The request options needed to get the HubApiUrl
 * @returns The schedule for the item OR null if no schedule is set
 */
const getSchedule = async (itemId, requestOptions) => {
    const fetchResponse = await fetch(getSchedulerApiUrl(itemId, requestOptions));
    const schedule = await fetchResponse.json();
    if (!fetchResponse.ok || schedule.statusCode === 404) {
        return {
            message: `Download schedule not found for item ${itemId}`,
            statusCode: 404,
            schedule: null,
        };
    }
    // if the schedule mode is set to manual, return it
    if (schedule.mode === "manual") {
        return {
            schedule: {
                mode: "manual",
            },
            message: `Download schedule found for item ${itemId}`,
            statusCode: 200,
        };
    }
    // if the schedule is set, return it with added mode
    delete schedule.itemId;
    switch (schedule.cadence) {
        case "daily":
        case "weekly":
        case "monthly":
        case "yearly":
            return {
                schedule: Object.assign(Object.assign({}, schedule), { mode: "scheduled" }),
                message: `Download schedule found for item ${itemId}`,
                statusCode: 200,
            };
    }
};
/**
 * Set the schedule for an item
 * @param itemId The item to set the schedule for
 * @param schedule The schedule to set
 * @param requestOptions The request options needed to get the HubApiUrl
 */
const setSchedule = async (itemId, schedule, requestOptions) => {
    const body = cloneObject(schedule);
    if (body.mode !== "manual") {
        // remove mode if not manual
        delete body.mode;
    }
    const url = getSchedulerApiUrl(itemId, requestOptions);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify(Object.assign(Object.assign({}, body), { itemId })),
    };
    const response = await fetch(url, options);
    return Object.assign(Object.assign({}, (await response.json())), { statusCode: response.status });
};
/**
 * Delete the schedule for an item
 * @param itemId The item to delete the schedule for
 * @param requestOptions The request options needed to get the HubApiUrl
 */
const deleteSchedule = async (itemId, requestOptions) => {
    const url = getSchedulerApiUrl(itemId, requestOptions);
    const options = {
        method: "DELETE",
        headers: {
            accept: "application/json",
        },
    };
    const response = await fetch(url, options);
    return Object.assign(Object.assign({}, (await response.json())), { statusCode: response.status });
};
/**
 * Checks if the content schedule should be updated and updates it if necessary
 * @param content The content to check and update the schedule for (should include any new schedule information)
 * @param requestOptions The request options needed to get the HubApiUrl
 */
const maybeUpdateSchedule = async (content, requestOptions) => {
    const scheduleResponse = await getSchedule(content.id, requestOptions);
    // if no schedule is set and incoming schedule is automatic, do nothing
    if (content.schedule.mode === "automatic" &&
        scheduleResponse.statusCode === 404) {
        return {
            message: "No schedule set, and incoming schedule is automatic.",
            statusCode: 404,
        };
    }
    if (!deepEqual(content.schedule, scheduleResponse.schedule)) {
        // if current and incoming schedules differ
        if (content.schedule.mode === "automatic") {
            // and incoming schedule is automatic
            return await deleteSchedule(content.id, requestOptions); // delete the schedule
        }
        else {
            // else
            return await setSchedule(content.id, content.schedule, requestOptions); // set the schedule
        }
    }
    return { message: "No action needed as schedules deepEqual each other." };
};
/**
 * To be used before calling any of the schedule functions in order to prevent fetch
 * requests to scheduler API from portal/enterprise
 *
 * Note: After a discussion w/ Dave, we decided this check is preferred to passing the context
 * into functions that would need checkPermission
 * @param requestOptions The request options needed to get the HubApiUrl
 * @returns Whether or not the scheduling feature is available
 */
const isDownloadSchedulingAvailable = (requestOptions, access) => {
    var _a, _b;
    const token = (_a = requestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token;
    return (((_b = requestOptions.portal) === null || _b === void 0 ? void 0 : _b.includes("arcgis.com")) &&
        access === "public" &&
        !!token);
};

/**
 * Compute the links that get appended to a Hub Initiative Template
 * search result and entity
 *
 * @param item
 * @param requestOptions
 * @returns
 */
function computeLinks(item, requestOptions) {
    return computeItemLinks(item, requestOptions);
}

/**
 * Given a model and an initiative template, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param initiativeTemplate
 * @param requestOptions
 * @returns
 */
function computeProps$1(model, initiativeTemplate, requestOptions) {
    var _a;
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on initiativeTemplate
    initiativeTemplate = computeItemProps(model.item, initiativeTemplate);
    // thumbnail url
    initiativeTemplate.thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    /**
     * Features that can be disabled by the entity owner
     * We don't have explicit features for initiative templates yet,
     * but the groundwork is there
     */
    initiativeTemplate.features = processEntityFeatures(((_a = model.data.settings) === null || _a === void 0 ? void 0 : _a.features) || {}, InitiativeTemplateDefaultFeatures);
    initiativeTemplate.links = computeLinks(model.item, requestOptions);
    // cast b/c this takes a partial but returns a full initiative template
    return initiativeTemplate;
}

/**
 * @private
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from an IModel to an IHubInitiativeTemplate
 */
function getPropertyMap$1() {
    const map = getBasePropertyMap();
    // Type specific mappings
    map.push({ entityKey: "previewUrl", storeKey: "item.properties.previewUrl" });
    map.push({ entityKey: "siteSolutionId", storeKey: "data.siteSolutionId" });
    map.push({
        entityKey: "recommendedTemplates",
        storeKey: "data.recommendedTemplates",
    });
    return map;
}

/**
 * Determines if the given question is a map question
 * @param {Object} question A question object
 * @returns {boolean}
 */
const isMapQuestion = (question) => {
    const { type, maps = [], defaultMap } = question;
    const types = [
        "esriQuestionTypeGeoPoint",
        "esriQuestionTypePolyline",
        "esriQuestionTypePolygon",
    ];
    const isType = types.includes(type);
    return isType && (maps.length > 0 || Boolean(defaultMap));
};

/**
 * Determines if the given question is actually a page of questions
 * @param {Object} question A question object
 * @returns {boolean}
 */
const isPageQuestion = (question) => {
    return question.type === "esriQuestionTypePage";
};

/**
 * Gets the map question from an Array of questions
 * @param {Array} questions An array of questions
 * @returns {Object}
 */
const getMapQuestion = (questions) => {
    const [head, ...tail] = questions;
    return getMapQuestionRecur(head, tail);
};
const getMapQuestionRecur = (head, tail) => {
    let result;
    if (!head) {
        result = null;
    }
    else if (isMapQuestion(head)) {
        result = head;
    }
    else {
        if (isPageQuestion(head)) {
            result = getMapQuestion(head.questions);
        }
        if (!result && tail.length) {
            const [h, ...t] = tail;
            result = getMapQuestionRecur(h, t);
        }
    }
    return result;
};

/**
 * Determines if the given Array of questions contains
 * a map question
 * @param {Array} questions An array of questions
 * @returns {boolean}
 */
const hasMapQuestion = (questions) => {
    return Boolean(getMapQuestion(questions));
};

const MAP_SURVEY_TYPEKEYWORD = "hubMapSurvey";

/**
 * Determines the display mode of the given survey
 * @param {Object} formItem A Form item
 * @returns {boolean}
 */
const shouldDisplayMap = (item) => {
    return (item.type === "Form" && item.typeKeywords.includes(MAP_SURVEY_TYPEKEYWORD));
};

/**
 * Given a model and a Survey object, set various computed properties that can't be directly mapped
 * @private
 * @param model
 * @param survey
 * @param requestOptions
 * @returns an IHubSurvey object
 */
function computeProps(model, survey, requestOptions) {
    var _a;
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // compute base properties on survey object
    survey = computeItemProps(model.item, survey);
    // thumbnail url
    survey.thumbnailUrl = getItemThumbnailUrl(model.item, requestOptions, token);
    // map props
    survey.hasMapQuestion = hasMapQuestion(((_a = model.formJSON) === null || _a === void 0 ? void 0 : _a.questions) || []);
    survey.displayMap = shouldDisplayMap(model.item);
    // cast b/c this takes a partial but returns a full object
    return survey;
}

/**
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from a IModel to an IHubSurvey object
 * @returns an IPropertyMap array
 * @private
 */
function getPropertyMap() {
    const map = getBasePropertyMap();
    return map;
}

/**
 * This returns the /info/forminfo.json which simply has the form name and type.
 * We need the name so we can make the getFormInfo call
 * @param {string} id
 * @param {IRequestOptions} requestOptions
 * @returns {Promise}
 */
const getFormInfoJson = (id, requestOptions) => {
    return getItemInfo(id, Object.assign({ fileName: "forminfo.json", readAs: "json" }, requestOptions));
};

/**
 * Returns true if the given Form item is a Survey123 Connect
 * survey
 * @param {IItem} formItem The Form item
 * @returns {boolean}
 */
const isSurvey123Connect = (formItem) => {
    var _a;
    const results = false;
    if (formItem) {
        const typeKeywords = (_a = formItem.typeKeywords) !== null && _a !== void 0 ? _a : [];
        return typeKeywords.includes("Survey123 Connect");
    }
    return results;
};

/**
 * Decodes certain properties of the Survey Form json into html
 * @param {IS123FormJSON} form
 */
const decodeForm = (form) => {
    const target = cloneObject(form);
    const props = [
        "header.content",
        "subHeader.content",
        "footer.content",
        "settings.thankYouScreenContent",
    ];
    props.forEach((prop) => {
        if (getProp(target, prop)) {
            setProp(prop, decodeURIComponent(getProp(target, prop)), target);
        }
    });
    const toDecoded = (question) => {
        const decode = (q) => {
            if (q.description) {
                q.description = decodeURIComponent(q.description);
            }
            return q;
        };
        return !isPageQuestion(question)
            ? decode(question)
            : Object.assign(Object.assign({}, question), { questions: question.questions.map(decode) });
    };
    return Object.assign(Object.assign({}, target), { questions: (target.questions || []).map(toDecoded) });
};

/**
 * Determines if a given Form item is a draft
 * @param {IItem} formItem A Form item
 * @returns {boolean}
 */
function isDraft(formItem) {
    return formItem.typeKeywords.indexOf("Draft") > -1;
}

/**
 * Given a Survey Item, return the form json, if it exists.
 * @param {IItem} the survey item
 * @param {IGetItemInfoOptions} requestOptions
 * @returns {Promise}
 */
const getFormJson = async (item, requestOptions) => {
    if (isDraft(item)) {
        return null;
    }
    const { name } = await getFormInfoJson(item.id, requestOptions);
    let promise;
    if (isSurvey123Connect(item)) {
        // survey123 connect does not have a <name>.json file, instead
        // that configuration is split between <name>.webform & <name>.info
        promise = Promise.all([
            getItemInfo(item.id, Object.assign({ fileName: `${name}.webform`, readAs: "json" }, requestOptions)),
            getItemInfo(item.id, Object.assign({ fileName: `${name}.info`, readAs: "json" }, requestOptions)),
        ]).then(([webform, info]) => {
            // webform contains questions
            const { surveyFormJson = {} } = webform;
            // other settings come from info
            // const { webformInfo: { settings } } = info;
            const { 
            // webformInfo only exists if settings have been
            // managed/changed from the s123 web application.
            // Disabling survey submissions from the ArcGISSurvey123Connect
            // desktop application does not disable survey submissions from
            // the web UI. Therefore, just default to open when the survey settings
            // have not been changed from the s123 web application.
            webformInfo = {
                settings: {
                    openStatusInfo: {
                        status: "open",
                        schedule: {
                            end: null,
                            status: null,
                        },
                    },
                    multiSubmissionInfo: {
                        maxAllowed: 0,
                    },
                },
            }, } = info;
            const { settings } = webformInfo;
            // combine relevant parts
            return Object.assign(Object.assign({}, surveyFormJson), { settings });
        });
    }
    else {
        promise = getItemInfo(item.id, Object.assign({ fileName: `${name}.json`, readAs: "json" }, requestOptions));
    }
    return promise.then((form) => {
        // response may be null... so check...
        if (form) {
            // form's have some properties which may contain html, these will
            // be run thru encodeURIComponent, so we decode it here for use
            // in our template
            form = decodeForm(form);
        }
        return form;
    });
};

export { MAP_SURVEY_TYPEKEYWORD as M, getDefaultEntitySettings as a, getPropertyMap$3 as b, computeProps$3 as c, computeProps$1 as d, getPropertyMap$1 as e, computeLinks as f, getSchedule as g, computeProps as h, isDownloadSchedulingAvailable as i, getFormJson as j, getPropertyMap as k, getPropertyMap$2 as l, modelToHubEditableContent as m, deepEqual as n, maybeUpdateSchedule as o, decodeForm as p, getFormInfoJson as q, getMapQuestion as r, hasMapQuestion as s, isDraft as t, isMapQuestion as u, isPageQuestion as v, isSurvey123Connect as w, shouldDisplayMap as x };
