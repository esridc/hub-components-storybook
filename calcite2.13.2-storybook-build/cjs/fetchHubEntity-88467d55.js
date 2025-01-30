'use strict';

const themes = require('./themes-d539965a.js');
const PropertyMapper = require('./PropertyMapper-785e5c9f.js');
const getFormJson = require('./get-form-json-e6831b20.js');
const isGuid = require('./is-guid-b5c2b74c.js');
const settings = require('./settings-0b8cd93b.js');
const get = require('./get-0368c931.js');
const fetchContent = require('./fetchContent-963f3885.js');
const _enrichments = require('./_enrichments-a40a3850.js');
const isService = require('./is-service-9b8238d2.js');
const compose = require('./compose-9b4311c9.js');
const setProp = require('./set-prop-3de2437f.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getFamily = require('./get-family-cafa88bb.js');
const fetch = require('./fetch-1292fb6b.js');

/**
 * @private
 *
 * Fetches the schedule enrichment for a content item. The enrichment will only be fetched if the item
 * is eligible for download scheduling and the user has permission to view the schedule. In cases
 * where the schedule cannot be fetched, the function will return undefined.
 *
 * @param item
 * @param requestOptions
 * @returns the schedule enrichment or undefined
 */
async function fetchItemScheduleEnrichment(item, requestOptions) {
    let result;
    if (getFormJson.isDownloadSchedulingAvailable(requestOptions, item.access)) {
        try {
            // fetch schedule and add it to enrichments if it exists in schedule API
            const { schedule } = await getFormJson.getSchedule(item.id, requestOptions);
            result = schedule || { mode: "automatic" };
        }
        catch (error) {
            /* tslint:disable no-console */
            console.warn("Failed to fetch schedule for item", item.id, error);
        }
    }
    return result;
}

/**
 * @private
 *
 * Fetches the enrichments for a content item to be converted into an IHubEditableContent object.
 * If no enrichment keys are provided, the default enrichments will be fetched. Default enrichments
 * vary by item type.
 *
 * @param item item to fetch enrichments for
 * @param requestOptions
 * @param enrichments optional override for the enrichments to fetch
 * @returns a hash of enrichments
 */
async function fetchEditableContentEnrichments(item, requestOptions, enrichments) {
    const result = {};
    if (!enrichments) {
        enrichments = getDefaultEnrichmentKeys(item);
    }
    // NOTE: Enrichments for IHubEditableContent can be fetched one of two ways:
    //
    // 1: Via `fetchItemEnrichments()`. This was the old way that we used to fetch enrichments
    //    in the `fetchContent()` era. Since the code still works and has great error handling,
    //    there's no reason to re-invent the wheel.
    // 2. Via ad-hoc fetch functions. We typically use this for new enrichments that are not
    //   supported by `fetchItemEnrichments()` (e.g. schedule)
    //
    // Eventually we'll want to move all new enrichments to the `fetchItemEnrichments()` subsystem,
    // but before we do we'll need to evaluate any impacts that would have on existing code, since
    // `fetchContent()` is still widely used in the codebase.
    const adHocEnrichments = ["schedule"];
    const fetchItemEnrichmentKeys = enrichments.filter((e) => !adHocEnrichments.includes(e));
    if (fetchItemEnrichmentKeys.length) {
        // TODO: Abstract this into a helper function that can be used by enrichContentSearchResult()
        const itemOrServerEnrichments = await _enrichments.fetchItemEnrichments(item, fetchItemEnrichmentKeys, requestOptions);
        fetchItemEnrichmentKeys.forEach((key) => {
            result[key] = itemOrServerEnrichments[key];
        });
    }
    // Fetch the schedule separately if it's requested
    // TODO: should we add scheduling to the fetchItemEnrichments() subsystem?
    if (enrichments.includes("schedule")) {
        result.schedule = await fetchItemScheduleEnrichment(item, requestOptions);
    }
    return result;
}
function getDefaultEnrichmentKeys(item) {
    const enrichments = ["metadata", "schedule"];
    if (isService.isService(item.url)) {
        enrichments.push("server");
    }
    return enrichments;
}

/**
 * fetch a content entity by identifier
 * @param identifier
 * @param requestOptions
 * @returns content entity
 */
const fetchHubContent = async (identifier, requestOptions, enrichments) => {
    // NOTE: b/c we have to support slugs, we use fetchContent() to get the item
    // by telling it to not fetch any enrichments. We then can fetch enrichments
    // as needed after we have the item
    const options = Object.assign(Object.assign({}, requestOptions), { enrichments: [] });
    const { item } = await fetchContent.fetchContent(identifier, options);
    const editableContentEnrichments = await fetchEditableContentEnrichments(item, requestOptions, enrichments);
    // we must normalize the underlying item type to account
    // for older items (e.g. sites that are type "Web Mapping
    // Application") before we map the model to a Hub Entity
    const type = compose.normalizeItemType(item);
    setProp.setProp("type", type, item);
    return getFormJson.modelToHubEditableContent({ item }, requestOptions, editableContentEnrichments);
};

/**
 * @private
 * Get a Discussion by id or slug
 * @param identifier item id or slug
 * @param requestOptions request options
 * @returns a promise that resolves a IHubDiscussion
 */
async function fetchDiscussion(identifier, requestOptions) {
    let getPrms;
    if (isGuid.isGuid(identifier)) {
        // get item by id
        getPrms = get.getItem(identifier, requestOptions);
    }
    else {
        getPrms = themes.getItemBySlug(identifier, requestOptions);
    }
    return getPrms.then((item) => {
        if (!item)
            return null;
        return convertItemToDiscussion(item, requestOptions);
    });
}
/**
 * @private
 * Convert a Hub Discussion Item into a Hub Discussion, fetching any additional
 * information that may be required
 * @param item the discussion item
 * @param auth request options
 * @returns a promise that resolves a IHubDiscussion
 */
async function convertItemToDiscussion(item, requestOptions) {
    const model = await themes.fetchModelFromItem(item, requestOptions);
    let entitySettings;
    try {
        entitySettings = await settings.fetchSetting(Object.assign({ id: item.id }, requestOptions));
    }
    catch (e) {
        const defaultSettings = getFormJson.getDefaultEntitySettings("discussion");
        entitySettings = Object.assign({ id: null }, defaultSettings);
    }
    model.entitySettings = entitySettings;
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap());
    const discussion = mapper.storeToEntity(model, {});
    return getFormJson.computeProps(model, discussion, requestOptions);
}

async function fetchInitiativeTemplate(identifier, requestOptions) {
    let getPrms;
    if (isGuid.isGuid(identifier)) {
        // get item by id
        getPrms = get.getItem(identifier, requestOptions);
    }
    else {
        getPrms = themes.getItemBySlug(identifier, requestOptions);
    }
    return getPrms.then((item) => {
        if (!item)
            return null;
        return convertItemToInitiativeTemplate(item, requestOptions);
    });
}
/**
 * @private
 * Convert a Hub Initiative Template Item into a Hub Initiative Template, feching any additional
 * information that may be required
 * @param item
 * @param requestOptions
 * @returns
 */
async function convertItemToInitiativeTemplate(item, requestOptions) {
    const model = await themes.fetchModelFromItem(item, requestOptions);
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$1());
    const it = mapper.storeToEntity(model, {});
    return getFormJson.computeProps$1(model, it, requestOptions);
}
async function enrichInitiativeTemplateSearchResult(item, include, requestOptions) {
    const result = {
        access: item.access,
        id: item.id,
        type: item.type,
        name: item.title,
        owner: item.owner,
        typeKeywords: item.typeKeywords,
        tags: item.tags,
        categories: item.categories,
        summary: item.snippet || item.description,
        createdDate: new Date(item.created),
        createdDateSource: "item.created",
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        family: getFamily.getFamily(item.type),
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
            workspaceRelative: "not-implemented",
        },
        location: compose.deriveLocationFromItem(item),
        rawResult: item,
    };
    // TODO: reimplement enrichment fetching when we know what enrichments we're looking for
    // Handle links
    // TODO: links should be an enrichment
    result.links = getFormJson.computeLinks(item, requestOptions);
    return result;
}

/**
 * @private
 * Get a Survey entity by id or slug
 * @param identifier item id or slug
 * @param requestOptions request options
 * @returns a promise that resolves a IHubSurvey object
 */
async function fetchSurvey(identifier, requestOptions) {
    let getPrms;
    if (isGuid.isGuid(identifier)) {
        // get item by id
        getPrms = get.getItem(identifier, requestOptions);
    }
    else {
        getPrms = themes.getItemBySlug(identifier, requestOptions);
    }
    return getPrms.then((item) => {
        if (!item)
            return null;
        return convertItemToSurvey(item, requestOptions);
    });
}
/**
 * @private
 * Convert a Hub Survey Item into a Hub Survey entity, fetching any additional
 * information that may be required
 * @param item the Survey item
 * @param auth request options
 * @returns a promise that resolves a IHubSurvey object
 */
async function convertItemToSurvey(item, requestOptions) {
    const model = { item };
    model.formJSON = await getFormJson.getFormJson(item, requestOptions);
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$2());
    const survey = mapper.storeToEntity(model, {});
    return getFormJson.computeProps$2(model, survey, requestOptions);
}

/**
 * Fetch a Hub entity by identifier (id or slug)
 * @param type
 * @param identifier
 * @param context
 * @returns
 */
async function fetchHubEntity(type, identifier, context) {
    let result;
    switch (type) {
        case "project":
            result = await HubInitiatives.fetchProject(identifier, context.requestOptions);
            break;
        case "site":
            result = await HubInitiatives.fetchSite(identifier, context.hubRequestOptions);
            break;
        case "initiative":
            result = await HubInitiatives.fetchInitiative(identifier, context.requestOptions);
            break;
        case "discussion":
            result = await fetchDiscussion(identifier, context.hubRequestOptions);
            break;
        case "page":
            result = await HubInitiatives.fetchPage(identifier, context.hubRequestOptions);
            break;
        case "content":
            result = await fetchHubContent(identifier, context.requestOptions);
            break;
        case "template":
            result = await HubInitiatives.fetchTemplate(identifier, context.requestOptions);
            break;
        case "group":
            result = await hubSearch.fetchHubGroup(identifier, context.hubRequestOptions);
            break;
        case "survey":
            result = await fetchSurvey(identifier, context.hubRequestOptions);
            break;
        case "event":
            result = await fetch.fetchEvent(identifier, context.hubRequestOptions);
            break;
        case "initiativeTemplate":
            result = await fetchInitiativeTemplate(identifier, context.requestOptions);
            break;
        case "user":
            result = await hubSearch.fetchHubUser(identifier, context);
    }
    return result;
}

exports.convertItemToDiscussion = convertItemToDiscussion;
exports.convertItemToInitiativeTemplate = convertItemToInitiativeTemplate;
exports.convertItemToSurvey = convertItemToSurvey;
exports.enrichInitiativeTemplateSearchResult = enrichInitiativeTemplateSearchResult;
exports.fetchDiscussion = fetchDiscussion;
exports.fetchHubContent = fetchHubContent;
exports.fetchHubEntity = fetchHubEntity;
exports.fetchInitiativeTemplate = fetchInitiativeTemplate;
exports.fetchSurvey = fetchSurvey;
