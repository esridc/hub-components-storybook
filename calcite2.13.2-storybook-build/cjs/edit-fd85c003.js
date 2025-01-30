'use strict';

const themes = require('./themes-d539965a.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const settings = require('./settings-0b8cd93b.js');
const PropertyMapper = require('./PropertyMapper-785e5c9f.js');
const getFormJson = require('./get-form-json-e6831b20.js');
const edit = require('./edit-3df37e35.js');
const utils = require('./utils-7f390376.js');
const util = require('./util-38e73510.js');
const compose = require('./compose-9b4311c9.js');
const remove = require('./remove-921f5dc7.js');
require('./domain-exists-0c69176a.js');
require('./get-prop-4bd8fc1a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./generate-random-string-8807d629.js');
require('./extent-715f7c8d.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./_enrichments-a40a3850.js');
require('./helpers-64227739.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./get-item-home-url-b1e3ff74.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./get-structured-license-4e9f994b.js');

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
    const discussion = Object.assign(Object.assign({}, edit.DEFAULT_DISCUSSION), partialDiscussion);
    // Create a slug from the title if one is not passed in
    if (!discussion.slug) {
        discussion.slug = themes.constructSlug(discussion.name, discussion.orgUrlKey);
    }
    // Ensure slug is unique
    await HubInitiatives.ensureUniqueEntitySlug(discussion, requestOptions);
    discussion.typeKeywords = utils.setDiscussableKeyword(discussion.typeKeywords, discussion.isDiscussable);
    // Map discussion object onto a default discussion Model
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(discussion, util.cloneObject(edit.DEFAULT_DISCUSSION_MODEL));
    // create the item
    model = await themes.createModel(model, requestOptions);
    const defaultSettings = getFormJson.getDefaultEntitySettings("discussion");
    // create the entity settings
    model.entitySettings = await settings.createSetting(Object.assign({ data: {
            id: model.item.id,
            type: defaultSettings.type,
            settings: Object.assign(Object.assign({}, defaultSettings.settings), { discussions: Object.assign(Object.assign({}, defaultSettings.settings.discussions), discussion.discussionSettings) }),
        } }, requestOptions));
    // map the model back into a IHubDiscussion
    let newDiscussion = mapper.storeToEntity(model, {});
    newDiscussion = getFormJson.computeProps(model, newDiscussion, requestOptions);
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
    await HubInitiatives.ensureUniqueEntitySlug(discussion, requestOptions);
    discussion.typeKeywords = utils.setDiscussableKeyword(discussion.typeKeywords, discussion.isDiscussable);
    // get the backing item & data
    const model = await themes.getModel(discussion.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(discussion, model);
    // update the backing item
    const updatedModel = await themes.updateModel(modelToUpdate, requestOptions);
    // now map back into a discussion and return that
    let updatedDiscussion = mapper.storeToEntity(updatedModel, discussion);
    updatedDiscussion = getFormJson.computeProps(model, updatedDiscussion, requestOptions);
    // persist location geometries to discussion settings as Polygon[]
    let allowedLocations;
    try {
        allowedLocations =
            ((_a = updatedDiscussion.location.geometries) === null || _a === void 0 ? void 0 : _a.map((geometry) => compose.arcgisToGeoJSON(geometry))) || null;
    }
    catch (e) {
        allowedLocations = null;
        /* tslint:disable no-console */
        console.warn("Esri JSON conversion failed", e);
    }
    // create or update entity settings
    const defaultSettings = getFormJson.getDefaultEntitySettings("discussion");
    const settings$1 = Object.assign(Object.assign({}, defaultSettings.settings), { discussions: Object.assign(Object.assign(Object.assign({}, defaultSettings.settings.discussions), updatedDiscussion.discussionSettings), { allowedLocations }) });
    const newOrUpdatedSettings = updatedDiscussion.entitySettingsId
        ? await settings.updateSetting(Object.assign({ id: updatedDiscussion.entitySettingsId, data: { settings: settings$1 } }, requestOptions))
        : await settings.createSetting(Object.assign({ data: {
                id: updatedDiscussion.id,
                type: defaultSettings.type,
                settings: settings$1,
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
        await settings.removeSetting(Object.assign({ id }, requestOptions));
    }
    catch (e) {
        // suppress error
    }
    await remove.removeItem(ro);
    return;
}

exports.createDiscussion = createDiscussion;
exports.deleteDiscussion = deleteDiscussion;
exports.updateDiscussion = updateDiscussion;
