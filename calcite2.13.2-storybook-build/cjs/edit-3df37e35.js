'use strict';

const tslib_es6 = require('./tslib.es6-b6cfa7d7.js');
const themes = require('./themes-d539965a.js');
const PropertyMapper = require('./PropertyMapper-785e5c9f.js');
const getFormJson = require('./get-form-json-e6831b20.js');
const util = require('./util-38e73510.js');
const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
const compose = require('./compose-9b4311c9.js');
const getDownloadFlow = require('./getDownloadFlow-94a34207.js');
const getDownloadConfiguration = require('./getDownloadConfiguration-1ed2582d.js');
const shouldShowDownloadsConfiguration = require('./shouldShowDownloadsConfiguration-62f7f280.js');
const get = require('./get-0368c931.js');
const utils = require('./utils-7f390376.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const setProp = require('./set-prop-3de2437f.js');
const getService = require('./getService-b27eda44.js');
const request = require('./request-67da3c71.js');
const cleanUrl = require('./clean-url-1dfecac0.js');
const helpers = require('./helpers-64227739.js');
const remove = require('./remove-921f5dc7.js');
const TemplateBusinessRules = require('./TemplateBusinessRules-5564c964.js');
const types = require('./types-097b54b1.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const InitiativeTemplateBusinessRules = require('./InitiativeTemplateBusinessRules-c5d5f695.js');

const HUB_DISCUSSION_ITEM_TYPE = "Discussion";
/**
 * Default values of a IHubDiscussion
 */
const DEFAULT_DISCUSSION = {
    name: "",
    tags: [],
    typeKeywords: ["Hub Discussion"],
    permissions: [],
    catalogs: [],
    schemaVersion: 1,
    isDiscussable: true,
};
/**
 * Default values for a new HubDiscussion Model
 */
const DEFAULT_DISCUSSION_MODEL = {
    item: {
        type: HUB_DISCUSSION_ITEM_TYPE,
        title: "",
        description: "",
        snippet: "",
        tags: [],
        typeKeywords: ["Hub Discussion"],
        properties: {
            slug: "",
            schemaVersion: 1,
        },
    },
    data: {
        catalogs: [],
        prompt: "",
    },
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateServiceDefinition } from '@esri/arcgis-rest-service-admin';
 * //
 * updateServiceDefinition(serviceurl, {
 *   authentication: userSession,
 *   updateDefinition: serviceDefinition
 * });
 * ```
 * Update a definition property in a hosted feature service. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/update-definition-feature-service-.htm) for more information.
 *
 * @param url - URL of feature service
 * @param requestOptions - Options for the request
 * @returns A Promise that resolves with success or error
 */
function updateServiceDefinition(url, requestOptions) {
    var adminUrl = cleanUrl.cleanUrl(url).replace("/rest/services", "/rest/admin/services") + "/updateDefinition";
    requestOptions.params = __assign({ updateDefinition: {} }, requestOptions.params);
    if (requestOptions.updateDefinition) {
        requestOptions.params.updateDefinition = requestOptions.updateDefinition;
    }
    return request.request(adminUrl, requestOptions);
}

// TODO: move this to defaults?
const DEFAULT_CONTENT_MODEL = {
    item: {
        title: "No Title Provided",
        description: "",
        snippet: "",
        tags: [],
        typeKeywords: [],
    },
    data: null,
};
/**
 * @private
 * Create a new Hub Content item
 *
 * Minimal properties are name and org
 *
 */
async function createContent(partialContent, requestOptions) {
    // let resources;
    // merge incoming with the default
    // this expansion solves the typing somehow
    const content = Object.assign({}, partialContent);
    content.typeKeywords = utils.setDiscussableKeyword(content.typeKeywords, content.isDiscussable);
    // Map project object onto a default project Model
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$3());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(content, util.cloneObject(DEFAULT_CONTENT_MODEL));
    // TODO: if we have resources disconnect them from the model for now.
    // if (model.resources) {
    //   resources = configureBaseResources(
    //     cloneObject(model.resources),
    //     EntityResourceMap
    //   );
    //   delete model.resources;
    // }
    // create the item
    model = await themes.createModel(model, requestOptions);
    // TODO: if we have resources, create them, then re-attach them to the model
    // if (resources) {
    //   model = await upsertModelResources(model, resources, requestOptions);
    // }
    // map the model back into a IHubEditableContent
    const newContent = mapper.storeToEntity(model, {});
    // TODO:
    // newContent = computeProps(model, newContent, requestOptions);
    // and return it
    return newContent;
}
/**
 * @private
 * Update a Hub Content
 * @param content
 * @param requestOptions
 */
async function updateContent(content, requestOptions) {
    // Get the backing item
    // NOTE: We can't just call `getModel` because we need to be able
    // to properly handle other types like PDFs that don't have JSON data
    const item = await get.getItem(content.id, requestOptions);
    const model = { item };
    content.typeKeywords = utils.setDiscussableKeyword(content.typeKeywords, content.isDiscussable);
    // create the PropertyMapper
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$3());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(content, model);
    // NOTE: Product has asked that we display a _disabled_ downloads configuration for
    // certain types of entities, but not allow users to change any settings. The following
    // checks are in place to make sure we don't accidentally save configurations in
    // situations where we shouldn't
    const downloadFlow = getDownloadFlow.getDownloadFlow(content);
    const updatedFormats = getProp.getProp(content, "extendedProps.downloads.formats");
    const isMainEntityExtractDisabled = hostedServiceUtils.isHostedFeatureServiceMainEntity(content) &&
        downloadFlow !== "createReplica";
    const wasDownloadsConfigurationDisplayed = shouldShowDownloadsConfiguration.shouldShowDownloadsConfiguration(content);
    if (wasDownloadsConfigurationDisplayed && // whether the downloads configuration was displayed
        downloadFlow && // whether the entity can be downloaded
        updatedFormats && // whether download format configuration is present
        !isMainEntityExtractDisabled) {
        const updatedDownloadsConfiguration = util.cloneObject(content.extendedProps.downloads);
        setProp.setProp("item.properties.downloads", updatedDownloadsConfiguration, modelToUpdate, true);
    }
    // TODO: if we have resources disconnect them from the model for now.
    // if (modelToUpdate.resources) {
    //   resources = configureBaseResources(
    //     cloneObject(modelToUpdate.resources),
    //     EntityResourceMap
    //   );
    //   delete modelToUpdate.resources;
    // }
    // update the backing item
    const updatedModel = await themes.updateModel(modelToUpdate, requestOptions);
    // update enrichment values
    const enrichments = {};
    // NOTE: Due to platform limitations, The only way we can guarantee that a user can update the
    // service definition without performing a no-op update is if the user has edit rights to the
    // "main" item of the hosted feature service. Just like AGO, we don't allow users to update the
    // service if the current item is just a reference to a pre-existing service.
    if (hostedServiceUtils.isHostedFeatureServiceMainEntity(content)) {
        const currentDefinition = await getService.getService(Object.assign(Object.assign({}, requestOptions), { url: content.url }));
        const currentServerExtractEnabled = hostedServiceUtils.hasServiceCapability(hostedServiceUtils.ServiceCapabilities.EXTRACT, currentDefinition);
        // To avoid over-updating the service, we only fire an update call if Extract has changed
        // TODO: Change the edit flow and entity schema to read from `extendedProps.serverExtractCapability`
        if (currentServerExtractEnabled !== content.serverExtractCapability) {
            const updatedDefinition = hostedServiceUtils.toggleServiceCapability(hostedServiceUtils.ServiceCapabilities.EXTRACT, currentDefinition);
            const updatedServiceCapabilities = {
                capabilities: updatedDefinition.capabilities,
            };
            await updateServiceDefinition(helpers.parseServiceUrl(content.url), {
                authentication: requestOptions.authentication,
                updateDefinition: updatedServiceCapabilities,
            });
            enrichments.server = updatedDefinition;
        }
        else {
            enrichments.server = currentDefinition;
        }
    }
    if (getFormJson.isDownloadSchedulingAvailable(requestOptions, content.access)) {
        // if schedule has "Force Update" checked and clicked save, initiate an update
        if (getFormJson.deepEqual(content._forceUpdate, [true])) {
            // [true]
            await compose.forceUpdateContent(item.id, requestOptions);
        }
        delete content._forceUpdate;
        await getFormJson.maybeUpdateSchedule(content, requestOptions);
    }
    return getFormJson.modelToHubEditableContent(updatedModel, requestOptions, enrichments);
}
/**
 * @private
 * Remove a Hub Content
 * @param id
 * @param requestOptions
 */
async function deleteContent(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await remove.removeItem(ro);
    return;
}
/**
 * Convert a IHubContentEditor back to an IHubContent
 * @param editor
 * @param portal
 * @returns
 */
function editorToContent(editor, portal) {
    var _a;
    // Clone the editor to prevent mutation
    const clonedEditor = util.cloneObject(editor);
    // Remove unneeded properties
    delete clonedEditor.downloadFormats;
    // Cast the editor to a content
    const content = util.cloneObject(clonedEditor);
    // Conditionally set the downloads configuration. We only want
    // to set the configuration if the entity is actually downloadable
    const downloadFlow = getDownloadFlow.getDownloadFlow(content);
    if (downloadFlow && editor.downloadFormats) {
        const downloadConfiguration = getDownloadConfiguration.getDownloadConfiguration(content);
        // Convert the download format display objects to the stored format
        const forStorage = editor.downloadFormats.map((format) => {
            const rest = tslib_es6.__rest(format, ["label"]);
            return rest;
        });
        downloadConfiguration.formats = forStorage;
        setProp.setProp("extendedProps.downloads", downloadConfiguration, content, true);
    }
    // copy the location extent up one level
    content.extent = (_a = editor.location) === null || _a === void 0 ? void 0 : _a.extent;
    return content;
}

const edit$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createContent: createContent,
    updateContent: updateContent,
    deleteContent: deleteContent,
    editorToContent: editorToContent
});

const HUB_PROJECT_ITEM_TYPE = "Hub Project";
/**
 * Default values of a IHubProject
 */
const DEFAULT_PROJECT = {
    catalog: { schemaVersion: 0 },
    name: "",
    permissions: [],
    schemaVersion: 1,
    status: types.HubEntityStatus.notStarted,
    tags: [],
    typeKeywords: [HUB_PROJECT_ITEM_TYPE],
    view: {
        contacts: [],
        featuredContentIds: [],
        showMap: true,
        metricDisplays: [],
    },
    features: TemplateBusinessRules.InitiativeDefaultFeatures,
};
/**
 * Default values for a new HubProject Model
 */
const DEFAULT_PROJECT_MODEL = {
    item: {
        type: HUB_PROJECT_ITEM_TYPE,
        title: "",
        description: "",
        snippet: "",
        tags: [],
        typeKeywords: [HUB_PROJECT_ITEM_TYPE],
        properties: {
            slug: "",
            schemaVersion: 1,
        },
    },
    data: {
        display: "about",
        permissions: [],
        catalog: {
            schemaVersion: 0,
        },
        status: types.HubEntityStatus.notStarted,
        view: {
            contacts: [],
            featuredContentIds: [],
            showMap: true,
            metricDisplays: [],
        },
    },
};

// Note - we separate these imports so we can cleanly spy on things in tests
/**
 * @private
 * Create a new Hub Project item
 *
 * Minimal properties are name and org
 *
 * @param project
 * @param requestOptions
 */
async function createProject(partialProject, requestOptions) {
    // merge incoming with the default
    // this expansion solves the typing somehow
    const project = Object.assign(Object.assign({}, DEFAULT_PROJECT), partialProject);
    // Create a slug from the title if one is not passed in
    if (!project.slug) {
        project.slug = themes.constructSlug(project.name, project.orgUrlKey);
    }
    // Ensure slug is  unique
    await HubInitiatives.ensureUniqueEntitySlug(project, requestOptions);
    // add status to keywords
    project.typeKeywords = HubInitiatives.setEntityStatusKeyword(project.typeKeywords, project.status);
    project.typeKeywords = utils.setDiscussableKeyword(project.typeKeywords, project.isDiscussable);
    // Map project object onto a default project Model
    const mapper = new PropertyMapper.PropertyMapper(HubInitiatives.getPropertyMap$1());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(project, util.cloneObject(DEFAULT_PROJECT_MODEL));
    // create the item
    model = await themes.createModel(model, requestOptions);
    // map the model back into a IHubProject
    let newProject = mapper.storeToEntity(model, {});
    newProject = HubInitiatives.computeProps(model, newProject, requestOptions);
    // and return it
    return newProject;
}
/**
 * Convert a IHubProjectEditor back to an IHubProject
 * @param editor
 * @param portal
 * @returns
 */
function editorToProject(editor, portal) {
    var _a;
    const _metric = editor._metric;
    // 1. remove the ephemeral props we graft onto the editor
    delete editor._groups;
    delete editor._thumbnail;
    (_a = editor.view) === null || _a === void 0 ? true : delete _a.featuredImage;
    delete editor._metric;
    delete editor._groups;
    // 2. clone into a HubProject and extract common properties
    let project = HubInitiatives.editorToEntity(editor, portal);
    // 4. handle configured metric:
    //   a. transform editor values into metric + displayConfig
    //   b. set metric and displayConfig on project
    if (_metric && Object.keys(_metric).length) {
        const metricId = _metric.metricId || util.createId(util.camelize(`${_metric.cardTitle}_`));
        const { metric, displayConfig } = HubInitiatives.editorToMetric(_metric, metricId, {
            metricName: _metric.cardTitle,
        });
        project = HubInitiatives.setMetricAndDisplay(project, metric, displayConfig);
    }
    return project;
}
/**
 * @private
 * Update a Hub Project
 * @param project
 * @param requestOptions
 */
async function updateProject(project, requestOptions) {
    // verify that the slug is unique, excluding the current project
    await HubInitiatives.ensureUniqueEntitySlug(project, requestOptions);
    // update the status keyword
    project.typeKeywords = HubInitiatives.setEntityStatusKeyword(project.typeKeywords, project.status);
    project.typeKeywords = utils.setDiscussableKeyword(project.typeKeywords, project.isDiscussable);
    // get the backing item & data
    const model = await themes.getModel(project.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper.PropertyMapper(HubInitiatives.getPropertyMap$1());
    // ----------------------------------------------------------------
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(project, model);
    // update the backing item
    const updatedModel = await themes.updateModel(modelToUpdate, requestOptions);
    // now map back into a project and return that
    let updatedProject = mapper.storeToEntity(updatedModel, project);
    updatedProject = HubInitiatives.computeProps(model, updatedProject, requestOptions);
    // the casting is needed because modelToObject returns a `Partial<T>`
    // where as this function returns a `T`
    return updatedProject;
}
/**
 * @private
 * Remove a Hub Project
 * @param id
 * @param requestOptions
 */
async function deleteProject(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await remove.removeItem(ro);
    return;
}

const edit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createProject: createProject,
    editorToProject: editorToProject,
    updateProject: updateProject,
    deleteProject: deleteProject
});

const HUB_INITIATIVE_TEMPLATE_ITEM_TYPE = "Hub Initiative Template";
/**
 * Default values of a IHubInitiativeTemplate
 */
const DEFAULT_INITIATIVE_TEMPLATE = {
    catalog: { schemaVersion: 0 },
    name: "No title provided",
    permissions: [],
    tags: [],
    typeKeywords: [HUB_INITIATIVE_TEMPLATE_ITEM_TYPE],
    schemaVersion: 1,
    features: InitiativeTemplateBusinessRules.InitiativeTemplateDefaultFeatures,
    values: {},
};
const DEFAULT_INITIATIVE_TEMPLATE_MODEL = {
    item: {
        type: HUB_INITIATIVE_TEMPLATE_ITEM_TYPE,
        title: "No Title Provided",
        description: "No Description Provided",
        snippet: "",
        tags: [],
        typeKeywords: [HUB_INITIATIVE_TEMPLATE_ITEM_TYPE],
        properties: {
            slug: "",
            schemaVersion: 1,
            previewUrl: "",
        },
    },
    data: {
        recommendedTemplates: [],
        siteSolutionId: "",
    },
};

// Note - we separate these imports so we can cleanly spy on things in tests
/**
 * @private
 * Create a new Hub Initiative Template item
 * @param partialInitiativeTemplate
 * @param requestOptions
 * @returns
 */
async function createInitiativeTemplate(partialInitiativeTemplate, requestOptions) {
    const initiativeTemplate = Object.assign(Object.assign({}, DEFAULT_INITIATIVE_TEMPLATE), partialInitiativeTemplate);
    // Create slug from the title if one is not passed in
    if (!initiativeTemplate.slug) {
        initiativeTemplate.slug = themes.constructSlug(initiativeTemplate.name, initiativeTemplate.orgUrlKey);
    }
    // Ensure slug is unique
    await HubInitiatives.ensureUniqueEntitySlug(initiativeTemplate, requestOptions);
    initiativeTemplate.typeKeywords = utils.setDiscussableKeyword(initiativeTemplate.typeKeywords, initiativeTemplate.isDiscussable);
    // Map initiative template object onto a default initiative template model
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$1());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(initiativeTemplate, util.cloneObject(DEFAULT_INITIATIVE_TEMPLATE_MODEL));
    // create the item
    model = await themes.createModel(model, requestOptions);
    // map the model back into a IHubInitiativeTemplate
    let newInitiativeTemplate = mapper.storeToEntity(model, {});
    newInitiativeTemplate = getFormJson.computeProps$1(model, newInitiativeTemplate, requestOptions);
    // and return it
    return newInitiativeTemplate;
}
/**
 * @private
 * Update a Hub Initiative Template
 * @param initiativeTemplate
 * @param requestOptions
 */
async function updateInitiativeTemplate(initiativeTemplate, requestOptions) {
    // verify that the slug is unique, excluding the current initiative template
    await HubInitiatives.ensureUniqueEntitySlug(initiativeTemplate, requestOptions);
    // set discussable keyword
    initiativeTemplate.typeKeywords = utils.setDiscussableKeyword(initiativeTemplate.typeKeywords, initiativeTemplate.isDiscussable);
    // get the backing item & data
    const model = await themes.getModel(initiativeTemplate.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$1());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(initiativeTemplate, model);
    // update the backing item
    const updatedModel = await themes.updateModel(modelToUpdate, requestOptions);
    // now map back into an initiative template and return that
    const updatedInitiativeTemplate = mapper.storeToEntity(updatedModel, initiativeTemplate);
    initiativeTemplate = getFormJson.computeProps$1(model, updatedInitiativeTemplate, requestOptions);
    // the casting is needed because modelToObject returns a `Partial<T>`
    // whereas this function returns a `T`
    return updatedInitiativeTemplate;
}
/**
 * @private
 * Remove a Hub Initiative Template
 * @param id
 * @param requestOptions
 */
async function deleteInitiativeTemplate(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await remove.removeItem(ro);
    return;
}

/**
 * @private
 * Creates a Hub Template's backing Solution item and returns
 * the created entity
 *
 * NOTE: We have no immediate plans to allow template creation
 * from the context of the Hub application, but scaffolding
 * this util for potential future implementation. For now,
 * we will throw an error
 * @param partialTemplate
 * @param requestOptions
 */
function createTemplate(partialTemplate, requestOptions) {
    throw new Error("Template creation is not currently supported from the context of Hub");
}
/**
 * @private
 * Updates a Hub Template's backing item and returns
 * the updated entity
 * @param template
 * @param requestOptions
 */
async function updateTemplate(template, requestOptions) {
    // 1. Verify the slug is unique, excluding the current template
    await HubInitiatives.ensureUniqueEntitySlug(template, requestOptions);
    // 2. Update relevant typeKeywords
    template.typeKeywords = utils.setDiscussableKeyword(template.typeKeywords, template.isDiscussable);
    // 3. Fetch the backing model (item + data)
    const model = await themes.getModel(template.id, requestOptions);
    // 4. Create a property mapper between the template
    // object and item model
    const mapper = new PropertyMapper.PropertyMapper(HubInitiatives.getPropertyMap$2());
    // 5. Create item model from updated template object, using
    // the existing model as a starting point
    const modelToUpdate = mapper.entityToStore(template, model);
    // 6. Update the backing item
    const updatedModel = await themes.updateModel(modelToUpdate, requestOptions);
    // 7. Map the item back into an IHubTemplate
    const updatedTemplate = mapper.storeToEntity(updatedModel, template);
    // 8. Compute + set various properties on the IHubTemplate
    // that cannot be directly mapped from the item
    template = HubInitiatives.computeProps$1(model, updatedTemplate, requestOptions);
    return updatedTemplate;
}
/**
 * Convert an IHubTemplateEditor back into a IHubTemplate
 * @param editor
 * @param portal
 */
function editorToTemplate(editor, portal) {
    // 1. cast editor to IHubTemplate
    const template = util.cloneObject(editor);
    // 2. ensure there's an org url key
    template.orgUrlKey = editor.orgUrlKey ? editor.orgUrlKey : portal.urlKey;
    return template;
}
/**
 * @private
 * Remove a Hub Template's backing item
 * @param id
 * @param requestOptions
 */
async function deleteTemplate(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await remove.removeItem(ro);
    return;
}

/**
 * Adds or removes MAP_SURVEY_TYPEKEYWORD type keyword and returns the updated list
 * @param {IGroup|IHubContent|IHubItemEntity} subject
 * @param {boolean} displayMap
 * @returns {string[]} updated list of type keywords
 */
function setDisplayMapKeyword(typeKeywords, displayMap) {
    const updatedTypeKeywords = (typeKeywords || []).filter((typeKeyword) => typeKeyword !== getFormJson.MAP_SURVEY_TYPEKEYWORD);
    if (displayMap) {
        updatedTypeKeywords.push(getFormJson.MAP_SURVEY_TYPEKEYWORD);
    }
    return updatedTypeKeywords;
}

/**
 * @private
 * Update a Hub Survey obejct
 * @param survey the survey to update
 * @param requestOptions user request options
 * @returns promise that resolves a IHubSurvey
 */
async function updateSurvey(survey, requestOptions) {
    survey.typeKeywords = utils.setDiscussableKeyword(survey.typeKeywords, survey.isDiscussable);
    survey.typeKeywords = setDisplayMapKeyword(survey.typeKeywords, survey.displayMap);
    // get the backing item
    const item = await get.getItem(survey.id, requestOptions);
    const model = { item };
    model.formJSON = await getFormJson.getFormJson(item, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper.PropertyMapper(getFormJson.getPropertyMap$2());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(survey, model);
    // update the backing item
    const updatedModel = await themes.updateModel(modelToUpdate, requestOptions);
    // now map back into a survey and return that
    let updatedSurvey = mapper.storeToEntity(updatedModel, survey);
    updatedSurvey = getFormJson.computeProps$2(model, updatedSurvey, requestOptions);
    // the casting is needed because modelToObject returns a `Partial<T>`
    // where as this function returns a `T`
    return updatedSurvey;
}
/**
 * @private
 * Remove a Hub Survey object
 * @param id
 * @param requestOptions
 */
async function deleteSurvey(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await remove.removeItem(ro);
    return;
}

exports.DEFAULT_DISCUSSION = DEFAULT_DISCUSSION;
exports.DEFAULT_DISCUSSION_MODEL = DEFAULT_DISCUSSION_MODEL;
exports.DEFAULT_INITIATIVE_TEMPLATE = DEFAULT_INITIATIVE_TEMPLATE;
exports.DEFAULT_PROJECT = DEFAULT_PROJECT;
exports.createContent = createContent;
exports.createInitiativeTemplate = createInitiativeTemplate;
exports.createProject = createProject;
exports.createTemplate = createTemplate;
exports.deleteContent = deleteContent;
exports.deleteInitiativeTemplate = deleteInitiativeTemplate;
exports.deleteProject = deleteProject;
exports.deleteSurvey = deleteSurvey;
exports.deleteTemplate = deleteTemplate;
exports.edit = edit$1;
exports.edit$1 = edit;
exports.editorToContent = editorToContent;
exports.editorToProject = editorToProject;
exports.editorToTemplate = editorToTemplate;
exports.setDisplayMapKeyword = setDisplayMapKeyword;
exports.updateContent = updateContent;
exports.updateInitiativeTemplate = updateInitiativeTemplate;
exports.updateProject = updateProject;
exports.updateSurvey = updateSurvey;
exports.updateTemplate = updateTemplate;
