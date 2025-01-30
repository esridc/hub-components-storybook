import { _ as __rest } from './tslib.es6-9c17e83a.js';
import { u as updateModel, e as createModel, h as getModel, d as constructSlug } from './themes-e08327b4.js';
import { P as PropertyMapper } from './PropertyMapper-4eb0ac8f.js';
import { m as modelToHubEditableContent, l as getPropertyMap, i as isDownloadSchedulingAvailable, n as deepEqual, o as maybeUpdateSchedule, e as getPropertyMap$2, d as computeProps$1, M as MAP_SURVEY_TYPEKEYWORD, j as getFormJson, k as getPropertyMap$4, h as computeProps$3 } from './get-form-json-1d4e3591.js';
import { a as cloneObject, c as createId, d as camelize } from './util-3e6872d9.js';
import { a as isHostedFeatureServiceMainEntity, h as hasServiceCapability, S as ServiceCapabilities, t as toggleServiceCapability } from './hostedServiceUtils-f22b023b.js';
import { t as forceUpdateContent } from './compose-d5b83ab7.js';
import { g as getDownloadFlow } from './getDownloadFlow-6c6d04d5.js';
import { d as getDownloadConfiguration } from './getDownloadConfiguration-6cb6d32f.js';
import { s as shouldShowDownloadsConfiguration } from './shouldShowDownloadsConfiguration-385c6ff6.js';
import { a as getItem } from './get-f0caeb52.js';
import { s as setDiscussableKeyword } from './utils-6bf1b713.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { g as getService } from './getService-e61b8c6e.js';
import { r as request } from './request-fa80ae40.js';
import { c as cleanUrl } from './clean-url-dff2b6ee.js';
import { p as parseServiceUrl } from './helpers-8c7e5e31.js';
import { r as removeItem } from './remove-7361a90a.js';
import { g as InitiativeDefaultFeatures } from './TemplateBusinessRules-0e35d61b.js';
import { H as HubEntityStatus } from './types-2eaa1a18.js';
import { E as ensureUniqueEntitySlug, F as setEntityStatusKeyword, G as getPropertyMap$1, H as computeProps, I as editorToEntity, J as editorToMetric, K as setMetricAndDisplay, L as getPropertyMap$3, M as computeProps$2 } from './HubInitiatives-4f4e24ce.js';
import { b as InitiativeTemplateDefaultFeatures } from './InitiativeTemplateBusinessRules-e78cc3ef.js';

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
    var adminUrl = cleanUrl(url).replace("/rest/services", "/rest/admin/services") + "/updateDefinition";
    requestOptions.params = __assign({ updateDefinition: {} }, requestOptions.params);
    if (requestOptions.updateDefinition) {
        requestOptions.params.updateDefinition = requestOptions.updateDefinition;
    }
    return request(adminUrl, requestOptions);
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
    content.typeKeywords = setDiscussableKeyword(content.typeKeywords, content.isDiscussable);
    // Map project object onto a default project Model
    const mapper = new PropertyMapper(getPropertyMap());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(content, cloneObject(DEFAULT_CONTENT_MODEL));
    // TODO: if we have resources disconnect them from the model for now.
    // if (model.resources) {
    //   resources = configureBaseResources(
    //     cloneObject(model.resources),
    //     EntityResourceMap
    //   );
    //   delete model.resources;
    // }
    // create the item
    model = await createModel(model, requestOptions);
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
    const item = await getItem(content.id, requestOptions);
    const model = { item };
    content.typeKeywords = setDiscussableKeyword(content.typeKeywords, content.isDiscussable);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(content, model);
    // NOTE: Product has asked that we display a _disabled_ downloads configuration for
    // certain types of entities, but not allow users to change any settings. The following
    // checks are in place to make sure we don't accidentally save configurations in
    // situations where we shouldn't
    const downloadFlow = getDownloadFlow(content);
    const updatedFormats = getProp(content, "extendedProps.downloads.formats");
    const isMainEntityExtractDisabled = isHostedFeatureServiceMainEntity(content) &&
        downloadFlow !== "createReplica";
    const wasDownloadsConfigurationDisplayed = shouldShowDownloadsConfiguration(content);
    if (wasDownloadsConfigurationDisplayed && // whether the downloads configuration was displayed
        downloadFlow && // whether the entity can be downloaded
        updatedFormats && // whether download format configuration is present
        !isMainEntityExtractDisabled) {
        const updatedDownloadsConfiguration = cloneObject(content.extendedProps.downloads);
        setProp("item.properties.downloads", updatedDownloadsConfiguration, modelToUpdate, true);
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
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // update enrichment values
    const enrichments = {};
    // NOTE: Due to platform limitations, The only way we can guarantee that a user can update the
    // service definition without performing a no-op update is if the user has edit rights to the
    // "main" item of the hosted feature service. Just like AGO, we don't allow users to update the
    // service if the current item is just a reference to a pre-existing service.
    if (isHostedFeatureServiceMainEntity(content)) {
        const currentDefinition = await getService(Object.assign(Object.assign({}, requestOptions), { url: content.url }));
        const currentServerExtractEnabled = hasServiceCapability(ServiceCapabilities.EXTRACT, currentDefinition);
        // To avoid over-updating the service, we only fire an update call if Extract has changed
        // TODO: Change the edit flow and entity schema to read from `extendedProps.serverExtractCapability`
        if (currentServerExtractEnabled !== content.serverExtractCapability) {
            const updatedDefinition = toggleServiceCapability(ServiceCapabilities.EXTRACT, currentDefinition);
            const updatedServiceCapabilities = {
                capabilities: updatedDefinition.capabilities,
            };
            await updateServiceDefinition(parseServiceUrl(content.url), {
                authentication: requestOptions.authentication,
                updateDefinition: updatedServiceCapabilities,
            });
            enrichments.server = updatedDefinition;
        }
        else {
            enrichments.server = currentDefinition;
        }
    }
    if (isDownloadSchedulingAvailable(requestOptions, content.access)) {
        // if schedule has "Force Update" checked and clicked save, initiate an update
        if (deepEqual(content._forceUpdate, [true])) {
            // [true]
            await forceUpdateContent(item.id, requestOptions);
        }
        delete content._forceUpdate;
        await maybeUpdateSchedule(content, requestOptions);
    }
    return modelToHubEditableContent(updatedModel, requestOptions, enrichments);
}
/**
 * @private
 * Remove a Hub Content
 * @param id
 * @param requestOptions
 */
async function deleteContent(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await removeItem(ro);
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
    const clonedEditor = cloneObject(editor);
    // Remove unneeded properties
    delete clonedEditor.downloadFormats;
    // Cast the editor to a content
    const content = cloneObject(clonedEditor);
    // Conditionally set the downloads configuration. We only want
    // to set the configuration if the entity is actually downloadable
    const downloadFlow = getDownloadFlow(content);
    if (downloadFlow && editor.downloadFormats) {
        const downloadConfiguration = getDownloadConfiguration(content);
        // Convert the download format display objects to the stored format
        const forStorage = editor.downloadFormats.map((format) => {
            const rest = __rest(format, ["label"]);
            return rest;
        });
        downloadConfiguration.formats = forStorage;
        setProp("extendedProps.downloads", downloadConfiguration, content, true);
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
    status: HubEntityStatus.notStarted,
    tags: [],
    typeKeywords: [HUB_PROJECT_ITEM_TYPE],
    view: {
        contacts: [],
        featuredContentIds: [],
        showMap: true,
        metricDisplays: [],
    },
    features: InitiativeDefaultFeatures,
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
        status: HubEntityStatus.notStarted,
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
        project.slug = constructSlug(project.name, project.orgUrlKey);
    }
    // Ensure slug is  unique
    await ensureUniqueEntitySlug(project, requestOptions);
    // add status to keywords
    project.typeKeywords = setEntityStatusKeyword(project.typeKeywords, project.status);
    project.typeKeywords = setDiscussableKeyword(project.typeKeywords, project.isDiscussable);
    // Map project object onto a default project Model
    const mapper = new PropertyMapper(getPropertyMap$1());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(project, cloneObject(DEFAULT_PROJECT_MODEL));
    // create the item
    model = await createModel(model, requestOptions);
    // map the model back into a IHubProject
    let newProject = mapper.storeToEntity(model, {});
    newProject = computeProps(model, newProject, requestOptions);
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
    let project = editorToEntity(editor, portal);
    // 4. handle configured metric:
    //   a. transform editor values into metric + displayConfig
    //   b. set metric and displayConfig on project
    if (_metric && Object.keys(_metric).length) {
        const metricId = _metric.metricId || createId(camelize(`${_metric.cardTitle}_`));
        const { metric, displayConfig } = editorToMetric(_metric, metricId, {
            metricName: _metric.cardTitle,
        });
        project = setMetricAndDisplay(project, metric, displayConfig);
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
    await ensureUniqueEntitySlug(project, requestOptions);
    // update the status keyword
    project.typeKeywords = setEntityStatusKeyword(project.typeKeywords, project.status);
    project.typeKeywords = setDiscussableKeyword(project.typeKeywords, project.isDiscussable);
    // get the backing item & data
    const model = await getModel(project.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap$1());
    // ----------------------------------------------------------------
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(project, model);
    // update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // now map back into a project and return that
    let updatedProject = mapper.storeToEntity(updatedModel, project);
    updatedProject = computeProps(model, updatedProject, requestOptions);
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
    await removeItem(ro);
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
    features: InitiativeTemplateDefaultFeatures,
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
        initiativeTemplate.slug = constructSlug(initiativeTemplate.name, initiativeTemplate.orgUrlKey);
    }
    // Ensure slug is unique
    await ensureUniqueEntitySlug(initiativeTemplate, requestOptions);
    initiativeTemplate.typeKeywords = setDiscussableKeyword(initiativeTemplate.typeKeywords, initiativeTemplate.isDiscussable);
    // Map initiative template object onto a default initiative template model
    const mapper = new PropertyMapper(getPropertyMap$2());
    // create model from object, using the default model as a starting point
    let model = mapper.entityToStore(initiativeTemplate, cloneObject(DEFAULT_INITIATIVE_TEMPLATE_MODEL));
    // create the item
    model = await createModel(model, requestOptions);
    // map the model back into a IHubInitiativeTemplate
    let newInitiativeTemplate = mapper.storeToEntity(model, {});
    newInitiativeTemplate = computeProps$1(model, newInitiativeTemplate, requestOptions);
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
    await ensureUniqueEntitySlug(initiativeTemplate, requestOptions);
    // set discussable keyword
    initiativeTemplate.typeKeywords = setDiscussableKeyword(initiativeTemplate.typeKeywords, initiativeTemplate.isDiscussable);
    // get the backing item & data
    const model = await getModel(initiativeTemplate.id, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap$2());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(initiativeTemplate, model);
    // update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // now map back into an initiative template and return that
    const updatedInitiativeTemplate = mapper.storeToEntity(updatedModel, initiativeTemplate);
    initiativeTemplate = computeProps$1(model, updatedInitiativeTemplate, requestOptions);
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
    await removeItem(ro);
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
    await ensureUniqueEntitySlug(template, requestOptions);
    // 2. Update relevant typeKeywords
    template.typeKeywords = setDiscussableKeyword(template.typeKeywords, template.isDiscussable);
    // 3. Fetch the backing model (item + data)
    const model = await getModel(template.id, requestOptions);
    // 4. Create a property mapper between the template
    // object and item model
    const mapper = new PropertyMapper(getPropertyMap$3());
    // 5. Create item model from updated template object, using
    // the existing model as a starting point
    const modelToUpdate = mapper.entityToStore(template, model);
    // 6. Update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // 7. Map the item back into an IHubTemplate
    const updatedTemplate = mapper.storeToEntity(updatedModel, template);
    // 8. Compute + set various properties on the IHubTemplate
    // that cannot be directly mapped from the item
    template = computeProps$2(model, updatedTemplate, requestOptions);
    return updatedTemplate;
}
/**
 * Convert an IHubTemplateEditor back into a IHubTemplate
 * @param editor
 * @param portal
 */
function editorToTemplate(editor, portal) {
    // 1. cast editor to IHubTemplate
    const template = cloneObject(editor);
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
    await removeItem(ro);
    return;
}

/**
 * Adds or removes MAP_SURVEY_TYPEKEYWORD type keyword and returns the updated list
 * @param {IGroup|IHubContent|IHubItemEntity} subject
 * @param {boolean} displayMap
 * @returns {string[]} updated list of type keywords
 */
function setDisplayMapKeyword(typeKeywords, displayMap) {
    const updatedTypeKeywords = (typeKeywords || []).filter((typeKeyword) => typeKeyword !== MAP_SURVEY_TYPEKEYWORD);
    if (displayMap) {
        updatedTypeKeywords.push(MAP_SURVEY_TYPEKEYWORD);
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
    survey.typeKeywords = setDiscussableKeyword(survey.typeKeywords, survey.isDiscussable);
    survey.typeKeywords = setDisplayMapKeyword(survey.typeKeywords, survey.displayMap);
    // get the backing item
    const item = await getItem(survey.id, requestOptions);
    const model = { item };
    model.formJSON = await getFormJson(item, requestOptions);
    // create the PropertyMapper
    const mapper = new PropertyMapper(getPropertyMap$4());
    // Note: Although we are fetching the model, and applying changes onto it,
    // we are not attempting to handle "concurrent edit" conflict resolution
    // but this is where we would apply that sort of logic
    const modelToUpdate = mapper.entityToStore(survey, model);
    // update the backing item
    const updatedModel = await updateModel(modelToUpdate, requestOptions);
    // now map back into a survey and return that
    let updatedSurvey = mapper.storeToEntity(updatedModel, survey);
    updatedSurvey = computeProps$3(model, updatedSurvey, requestOptions);
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
    await removeItem(ro);
    return;
}

export { DEFAULT_DISCUSSION as D, updateInitiativeTemplate as a, updateTemplate as b, updateContent as c, updateProject as d, DEFAULT_DISCUSSION_MODEL as e, deleteSurvey as f, deleteTemplate as g, deleteInitiativeTemplate as h, deleteContent as i, deleteProject as j, editorToContent as k, DEFAULT_PROJECT as l, editorToProject as m, createProject as n, DEFAULT_INITIATIVE_TEMPLATE as o, createInitiativeTemplate as p, editorToTemplate as q, createTemplate as r, createContent as s, setDisplayMapKeyword as t, updateSurvey as u, edit$1 as v, edit as w };
