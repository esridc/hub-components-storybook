import { d as constructSlug, e as createModel, h as getModel, u as updateModel } from './themes-e08327b4.js';
import { E as ensureUniqueEntitySlug } from './HubInitiatives-4f4e24ce.js';
import { c as createSetting, u as updateSetting, r as removeSetting } from './settings-2d4e159a.js';
import { P as PropertyMapper } from './PropertyMapper-4eb0ac8f.js';
import { b as getPropertyMap, a as getDefaultEntitySettings, c as computeProps } from './get-form-json-1d4e3591.js';
import { D as DEFAULT_DISCUSSION, e as DEFAULT_DISCUSSION_MODEL } from './edit-237c0a70.js';
import { s as setDiscussableKeyword } from './utils-6bf1b713.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { r as arcgisToGeoJSON } from './compose-d5b83ab7.js';
import { r as removeItem } from './remove-7361a90a.js';
import './domain-exists-4fd7dc09.js';
import './get-prop-ec5be510.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './generate-random-string-1436d9e6.js';
import './extent-34a4ba2a.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './_enrichments-8641475c.js';
import './helpers-8c7e5e31.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './get-item-home-url-b414b731.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './get-structured-license-33306790.js';

/**
 * @private
 * Create a new Hub Discussion item
 *
 * Minimal properties are name and orgUrlKey
 *
 * @param partialDiscussion a partial discussion
 * @param requestOptions user request options
 * @returns promise that resolves a IHubDiscussion
 */
async function createDiscussion(partialDiscussion, requestOptions) {
    // merge incoming with the default
    // this expansion solves the typing somehow
    const discussion = Object.assign(Object.assign({}, DEFAULT_DISCUSSION), partialDiscussion);
    // Create a slug from the title if one is not passed in
    if (!discussion.slug) {
        discussion.slug = constructSlug(discussion.name, discussion.orgUrlKey);
    }
    // Ensure slug is unique
    await ensureUniqueEntitySlug(discussion, requestOptions);
    discussion.typeKeywords = setDiscussableKeyword(discussion.typeKeywords, discussion.isDiscussable);
    // Map discussion object onto a default discussion Model
    const mapper = new PropertyMapper(getPropertyMap());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(discussion, cloneObject(DEFAULT_DISCUSSION_MODEL));
    // create the item
    model = await createModel(model, requestOptions);
    const defaultSettings = getDefaultEntitySettings("discussion");
    // create the entity settings
    model.entitySettings = await createSetting(Object.assign({ data: {
            id: model.item.id,
            type: defaultSettings.type,
            settings: Object.assign(Object.assign({}, defaultSettings.settings), { discussions: Object.assign(Object.assign({}, defaultSettings.settings.discussions), discussion.discussionSettings) }),
        } }, requestOptions));
    // map the model back into a IHubDiscussion
    let newDiscussion = mapper.storeToEntity(model, {});
    newDiscussion = computeProps(model, newDiscussion, requestOptions);
    // and return it
    return newDiscussion;
}
/**
 * @private
 * Update a Hub Discussion
 * @param discussion the discussion to update
 * @param requestOptions user request options
 * @returns promise that resolves a IHubDiscussion
 */
async function updateDiscussion(discussion, requestOptions) {
    var _a;
    // verify that the slug is unique, excluding the current discussion
    await ensureUniqueEntitySlug(discussion, requestOptions);
    discussion.typeKeywords = setDiscussableKeyword(discussion.typeKeywords, discussion.isDiscussable);
    // get the backing item & data
    const model = await getModel(discussion.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(discussion, model);
    // update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // now map back into a discussion and return that
    let updatedDiscussion = mapper.storeToEntity(updatedModel, discussion);
    updatedDiscussion = computeProps(model, updatedDiscussion, requestOptions);
    // persist location geometries to discussion settings as Polygon[]
    let allowedLocations;
    try {
        allowedLocations =
            ((_a = updatedDiscussion.location.geometries) === null || _a === void 0 ? void 0 : _a.map((geometry) => arcgisToGeoJSON(geometry))) || null;
    }
    catch (e) {
        allowedLocations = null;
        /* tslint:disable no-console */
        console.warn("Esri JSON conversion failed", e);
    }
    // create or update entity settings
    const defaultSettings = getDefaultEntitySettings("discussion");
    const settings = Object.assign(Object.assign({}, defaultSettings.settings), { discussions: Object.assign(Object.assign(Object.assign({}, defaultSettings.settings.discussions), updatedDiscussion.discussionSettings), { allowedLocations }) });
    const newOrUpdatedSettings = updatedDiscussion.entitySettingsId
        ? await updateSetting(Object.assign({ id: updatedDiscussion.entitySettingsId, data: { settings } }, requestOptions))
        : await createSetting(Object.assign({ data: {
                id: updatedDiscussion.id,
                type: defaultSettings.type,
                settings,
            } }, requestOptions));
    updatedDiscussion.entitySettingsId = newOrUpdatedSettings.id;
    updatedDiscussion.discussionSettings =
        newOrUpdatedSettings.settings.discussions;
    // the casting is needed because modelToObject returns a `Partial<T>`
    // where as this function returns a `T`
    return updatedDiscussion;
}
/**
 * @private
 * Remove a Hub Discussion
 * @param id the discussion item id
 * @param requestOptions request options
 * @returns a promise
 */
async function deleteDiscussion(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    try {
        await removeSetting(Object.assign({ id }, requestOptions));
    }
    catch (e) {
        // suppress error
    }
    await removeItem(ro);
    return;
}

export { createDiscussion, deleteDiscussion, updateDiscussion };
