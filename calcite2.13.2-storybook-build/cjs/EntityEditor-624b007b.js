'use strict';

const getEditorSlug = require('./getEditorSlug-eeb95a05.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
const util = require('./util-38e73510.js');
const edit = require('./edit-3df37e35.js');
const enrichEntity = require('./enrichEntity-1632b924.js');
const shouldShowDownloadsConfiguration = require('./shouldShowDownloadsConfiguration-62f7f280.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getDownloadConfiguration = require('./getDownloadConfiguration-1ed2582d.js');
const utils = require('./utils-5a74b66e.js');
const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const HubGroup = require('./HubGroup-77577f1f.js');
const Catalog = require('./Catalog-acebae88.js');
const getEntityMetrics = require('./getEntityMetrics-b6d0cdfa.js');
const resolveMetric = require('./resolveMetric-47df0783.js');
const compose = require('./compose-9b4311c9.js');
const getCardModelUrl = require('./getCardModelUrl-df1328a2.js');
const getFamily = require('./get-family-cafa88bb.js');
const themes = require('./themes-d539965a.js');
const HubError = require('./HubError-44e07249.js');
const remove = require('./remove-921f5dc7.js');
const tslib_es6 = require('./tslib.es6-b6cfa7d7.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const get = require('./get-52661c13.js');
const HubPage = require('./HubPage-0395747a.js');
const HubSite = require('./HubSite-fab90409.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const fetch = require('./fetch-1292fb6b.js');
const defaults = require('./defaults-abee9bee.js');
const unshareEventWithGroups = require('./unshareEventWithGroups-609ca09c.js');
const events = require('./events-7873340d.js');
const getEventGroups = require('./getEventGroups-6c371c3e.js');
const request = require('./request-67da3c71.js');
const TemplateBusinessRules = require('./TemplateBusinessRules-5564c964.js');

/**
 * Removes a resource associated with an item
 *
 * @export
 * @param {string} id item id
 * @param {string} name resource name
 * @param {string} owner item owner
 * @param {IUserRequestOptions} ro request options
 * @return {*}  {Promise<{
 *   success: boolean;
 * }>}
 */
async function removeResource(id, name, owner, ro) {
    try {
        // Remove item resource
        const response = await remove.removeItemResource(Object.assign({ id, resource: name, owner }, ro));
        // if err throw
        if (!response.success) {
            throw new HubError.HubError("Remove Item Resource", "Unknown error removing resource.");
        }
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new HubError.HubError("Remove Item Resource", err.message, err);
        }
        else {
            throw new HubError.HubError("Remove Item Resource", "Unknown error removing resource.");
        }
    }
}

/**
 * Hub Discussion Class
 */
class HubDiscussion extends getEditorSlug.HubItemEntity {
    /**
     * Create an instance from an IHubDiscussion object
     * @param json JSON object to create a HubDiscussion from
     * @param context ArcGIS context
     * @returns a HubDiscussion
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubDiscussion(pojo, context);
    }
    /**
     * Create a new HubDiscussion, returning a HubDiscussion instance.
     * Note: This does not persist the Discussion into the backing store
     * @param partialDiscussion a partial IHubDiscussion
     * @param context ArcGIS context
     * @returns promise that resolves a HubDiscussion
     */
    static async create(partialDiscussion, context, save = false) {
        const pojo = this.applyDefaults(partialDiscussion, context);
        // return an instance of HubDiscussion
        const instance = HubDiscussion.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a Discussion from the backing store and return a HubDiscussion instance.
     * @param identifier slug or item id
     * @param context ArcGIS context
     * @returns promise that resolves a HubDiscussion
     */
    static async fetch(identifier, context) {
        try {
            const entity = await fetchHubEntity.fetchDiscussion(identifier, context.hubRequestOptions);
            // create an instance of HubDiscussion from the entity
            return HubDiscussion.fromJson(entity, context);
        }
        catch (ex) {
            throw ex.message ===
                "CONT_0001: Item does not exist or is inaccessible."
                ? new Error("Discussion not found.")
                : ex;
        }
    }
    static applyDefaults(partialDiscussion, context) {
        // ensure we have the orgUrlKey
        if (!partialDiscussion.orgUrlKey) {
            partialDiscussion.orgUrlKey = context.portal.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, edit.DEFAULT_DISCUSSION), partialDiscussion);
        return pojo;
    }
    /**
     * Apply a new state to the instance
     * @param changes A partial IHubDiscussion
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubDiscussion is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubDiscussion is already destroyed.");
        }
        if (this.entity.id) {
            const { updateDiscussion } = await Promise.resolve().then(function () { return require('./edit-fd85c003.js'); });
            // update it
            this.entity = await updateDiscussion(this.entity, this.context.hubRequestOptions);
        }
        else {
            const { createDiscussion } = await Promise.resolve().then(function () { return require('./edit-fd85c003.js'); });
            // create it
            this.entity = await createDiscussion(this.entity, this.context.hubRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Delete the HubDiscussion from the store
     * set a flag to indicate that it is destroyed
     * @returns a promise
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubDiscussion is already destroyed.");
        }
        const { deleteDiscussion } = await Promise.resolve().then(function () { return require('./edit-fd85c003.js'); });
        this.isDestroyed = true;
        // Delegate to module fn
        await deleteDiscussion(this.entity.id, this.context.hubRequestOptions);
    }
    /*
     * Get the editor config for the HubDiscussion entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresonds to the returned uiSchema
     * @param options optional hash of dynamic uiSchema element options
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the project as an editor object
     * @param editorContext
     * @returns
     */
    async toEditor(editorContext = {}, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. Apply transforms to relevant entity values so they
        // can be consumed by the editor
        editor._slug = getEditorSlug.getEditorSlug(this.entity);
        return editor;
    }
    /**
     * Load the project from the editor object
     * @param editor
     * @returns
     */
    async fromEditor(editor) {
        // TODO: move this into a util
        // Setting the thumbnailCache will ensure that
        // the thumbnail is updated on next save
        if (editor._thumbnail) {
            if (editor._thumbnail.blob) {
                this.thumbnailCache = {
                    file: editor._thumbnail.blob,
                    filename: editor._thumbnail.fileName,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        delete editor._thumbnail;
        // Save, which will also create new content if new
        this.entity = HubInitiatives.editorToEntity(editor, this.context.portal);
        await this.save();
        return this.entity;
    }
}

/**
 * @private
 * Returns configuration objects for each download format that should be displayed
 * in the editing experience of a content entity. This function should not be used
 * to calculate the download formats that should be present on the live UI.
 * @param entity entity to get download format configurations for
 * @returns download format configurations to display
 */
function getDownloadConfigurationDisplayFormats(entity) {
    const configuration = getDownloadConfiguration.getDownloadConfiguration(entity);
    const flowType = configuration.flowType;
    let formats = configuration.formats;
    // For feature or map services that don't meet the criteria to be downloaded (i.e., no flowType)
    // Product wants to show paging formats as a preview of what _could_ be downloaded should
    // the criteria be met.
    if (!flowType && ["Feature Service", "Map Service"].includes(entity.type)) {
        const pagingFormats = getDownloadConfiguration.getPagingJobFormats().map((f) => {
            return {
                key: f.format,
                hidden: false,
            };
        });
        // TODO: Should we just show paging formats as a preview or include additional resources?
        formats = pagingFormats;
    }
    // For main entities of a hosted feature service with extract disabled, we want to display
    // the list of createReplica formats as a preview of what _could_ be downloaded should
    // the extract capability be enabled
    if (hostedServiceUtils.isHostedFeatureServiceMainEntity(entity) &&
        flowType !== "createReplica") {
        const createReplicaFormats = getDownloadConfiguration.getCreateReplicaFormats(entity).map((f) => {
            return {
                key: f.format,
                hidden: false,
            };
        });
        formats = createReplicaFormats;
    }
    const additionalResources = getProp.getProp(entity, "extendedProps.additionalResources") || [];
    return formats.map((f) => utils.isAdditionalResourceConfiguration(f)
        ? toAdditionalResourceConfigurationDisplay(f, additionalResources)
        : toDownloadFormatConfigurationDisplay(f));
}
// Converts a download format configuration storage object to a display object
// (i.e., adds appropriate labels, etc.)
function toDownloadFormatConfigurationDisplay(config) {
    return Object.assign({ label: `{{shared.fields.download.format.${config.key}:translate}}` }, config);
}
// Converts an additional resource configuration storage object to a display object
// (i.e., adds appropriate labels, etc.)
function toAdditionalResourceConfigurationDisplay(config, additionalResources) {
    const resourceIndex = utils.getAdditionalResourceIndex(config);
    const { name, isDataSource } = additionalResources[resourceIndex];
    let label;
    // Prefer the name of the additional resource if it exists
    if (name) {
        label = `{{shared.fields.download.additionalResource|resourceName=${encodeURIComponent(name)}:translate}}`;
        // If the additional resource is the data source...
    }
    else if (isDataSource) {
        label = "{{shared.fields.download.dataSourceResource:translate}}";
        // If the additional resource has no name...
    }
    else {
        label = "{{shared.fields.download.noTitleResource:translate}}";
    }
    return Object.assign({ label }, config);
}

class HubContent extends getEditorSlug.HubItemEntity {
    constructor(content, context) {
        super(content, context);
    }
    /**
     * Create an instance from an IHubEditableContent object
     * @param json - JSON object to create a HubContent from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // TODO: merge what we have with the default values
        // const pojo = this.applyDefaults(json, context);
        const pojo = json;
        return new HubContent(pojo, context);
    }
    /**
     * Save the HubContent to the backing store. Currently Projects are stored as Items in Portal
     * @returns
     */
    async save() {
        this._checkDestroyed();
        const { createContent, updateContent } = await Promise.resolve().then(function () { return require('./edit-3df37e35.js'); }).then(function (n) { return n.edit; });
        if (this.entity.id) {
            // update it
            this.entity = await updateContent(this.entity, this.context.userRequestOptions);
        }
        else {
            // create it
            this.entity = await createContent(this.entity, this.context.userRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        this._checkDestroyed();
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    /**
     * Delete the HubContent from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        this._checkDestroyed();
        this.isDestroyed = true;
        const { deleteContent } = await Promise.resolve().then(function () { return require('./edit-3df37e35.js'); }).then(function (n) { return n.edit; });
        // Delegate to module fn
        await deleteContent(this.entity.id, this.context.userRequestOptions);
    }
    /*
     * Get the editor config for the HubProject entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresonds to the returned uiSchema
     * @param options optional hash of dynamic uiSchema element options
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the project as an editor object
     * @param editorContext
     * @returns
     */
    async toEditor(editorContext = {}, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. Apply transforms to relevant entity values so they
        // can be consumed by the editor
        if (shouldShowDownloadsConfiguration.shouldShowDownloadsConfiguration(this.entity)) {
            editor.downloadFormats = getDownloadConfigurationDisplayFormats(this.entity);
        }
        return editor;
    }
    /**
     * Load the project from the editor object
     * @param editor
     * @returns
     */
    async fromEditor(editor) {
        var _a;
        const isCreate = !editor.id;
        // Setting the thumbnailCache will ensure that
        // the thumbnail is updated on next save
        if (editor._thumbnail) {
            if (editor._thumbnail.blob) {
                this.thumbnailCache = {
                    file: editor._thumbnail.blob,
                    filename: editor._thumbnail.fileName,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        delete editor._thumbnail;
        // convert back to an entity. Apply any reverse transforms used in
        // of the toEditor method
        const entity = edit.editorToContent(editor);
        // copy the location extent up one level
        entity.extent = (_a = editor.location) === null || _a === void 0 ? void 0 : _a.extent;
        // create it if it does not yet exist...
        if (isCreate) {
            throw new Error("Cannot create content using the Editor.");
        }
        else {
            // ...otherwise, update the in-memory entity and save it
            this.entity = entity;
            await this.save();
        }
        return this.entity;
    }
    // TODO: move this to HubItemEntity
    _checkDestroyed() {
        if (this.isDestroyed) {
            throw new Error("HubContent is already destroyed.");
        }
    }
}

/**
 * Convert a project entity into a card view model that can
 * be consumed by the suite of hub gallery components
 *
 * @param project project entity
 * @param context auth & portal information
 * @param opts view model options
 */
const projectToCardModel = (project, context, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromEntity(project, context, target, baseUrl);
    return Object.assign(Object.assign(Object.assign({}, getSharedProjectCardModel(project, locale)), { actionLinks,
        titleUrl }), (project.thumbnailUrl && { thumbnailUrl: project.thumbnailUrl }));
};
/**
 * Convert a project hub search result into a card view model that
 * can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub project search result
 * @param opts view model options
 */
const projectResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedProjectCardModel(searchResult, locale)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
/**
 * Given a project entity OR hub serach result, construct the
 * project's shared card view model properties
 *
 * @param entityOrSearchResult project entity or hub search result
 * @param locale internationalization locale
 */
const getSharedProjectCardModel = (entityOrSearchResult, locale) => {
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
 * Util to convert a metric into editor values consumable by the configuration editor
 * @param metric - IMetric metric
 * @param displayConfig - display configuration for the metric
 * @returns
 */
function metricToEditor(metric, displayConfig) {
    const { allowExpressionSet, expressionSet, fieldType, itemId, statistic } = displayConfig, config = tslib_es6.__rest(displayConfig, ["allowExpressionSet", "expressionSet", "fieldType", "itemId", "statistic"]);
    let editor = Object.assign({}, config);
    if (metric && metric.source) {
        const metricType = metric.source.type || "";
        switch (metricType) {
            case "service-query":
                editor = Object.assign(Object.assign({ type: "dynamic", dynamicMetric: Object.assign(Object.assign({}, metric.source), { itemId,
                        expressionSet,
                        allowExpressionSet,
                        fieldType, sourceLink: displayConfig.sourceLink, sourceTitle: displayConfig.sourceTitle }) }, editor), { sourceLink: undefined, sourceTitle: undefined });
                break;
            case "static-value":
                editor = Object.assign({ type: "static", value: metric.source.value, valueType: metric.source.valueType }, editor);
                break;
        }
    }
    return editor;
}

/**
 * Hub Project Class
 */
class HubProject extends getEditorSlug.HubItemEntity {
    /**
     * Private constructor so we don't have `new` all over the place. Allows for
     * more flexibility in how we create the HubProjectManager over time.
     * @param context
     */
    constructor(project, context) {
        super(project, context);
        this._catalog = Catalog.Catalog.fromJson(project.catalog, this.context);
    }
    /**
     * Catalog instance for this project. Note: Do not hold direct references to this object; always access it from the project.
     * @returns
     */
    get catalog() {
        return this._catalog;
    }
    /**
     * Create an instance from an IHubProject object
     * @param json - JSON object to create a HubProject from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubProject(pojo, context);
    }
    /**
     * Create a new HubProject, returning a HubProject instance.
     * Note: This does not persist the Project into the backing store
     * @param partialProject
     * @param context
     * @returns
     */
    static async create(partialProject, context, save = false) {
        const pojo = this.applyDefaults(partialProject, context);
        // return an instance of HubProject
        const instance = HubProject.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a Project from the backing store and return a HubProject instance.
     * @param identifier - Identifier of the project to load
     * @param context
     * @returns
     */
    static async fetch(identifier, context) {
        // fetch the project by id or slug
        try {
            const project = await HubInitiatives.fetchProject(identifier, context.requestOptions);
            // create an instance of HubProject from the project
            return HubProject.fromJson(project, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Project not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    /**
     * Given a partial project, apply defaults to it to ensure that a baseline of properties are set
     * @param partialProject
     * @param context
     * @returns
     */
    static applyDefaults(partialProject, context) {
        // ensure we have the orgUrlKey
        if (!partialProject.orgUrlKey) {
            partialProject.orgUrlKey = context.portal.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, edit.DEFAULT_PROJECT), partialProject);
        return pojo;
    }
    /**
     * Convert the project entity into a card view model that can
     * be consumed by the suite of hub gallery components
     *
     * @param opts view model options
     */
    convertToCardModel(opts) {
        return projectToCardModel(this.entity, this.context, opts);
    }
    /*
     * Get a specific editor config for the HubProject entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresponds to the returned uiSchema
     * @param options optional hash of dynamic uiSchema element options
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the project as an editor object
     * @param editorContext
     * @returns
     */
    async toEditor(editorContext = {}, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. editor._groups handling
        editor._groups = [];
        // 3. handle metrics
        const metrics = getEntityMetrics.getEntityMetrics(this.entity);
        const metric = metrics.find((m) => m.id === editorContext.metricId);
        const displays = getWithDefault.getWithDefault(this.entity, "view.metricDisplays", []);
        const displayConfig = displays.find((display) => display.metricId === editorContext.metricId) || {};
        editor._metric = metricToEditor(metric, displayConfig);
        // 4. slug life
        editor._slug = getEditorSlug.getEditorSlug(this.entity);
        return editor;
    }
    /**
     * Load the project from the editor object
     * @param editor
     * @returns
     */
    async fromEditor(editor, editorContext) {
        // 1. extract the ephemeral props we graft onto the editor
        // note: they will be deleted in the editorToProject function
        const thumbnail = editor._thumbnail;
        const featuredImage = editor.view.featuredImage;
        const autoShareGroups = editor._groups || [];
        // 2. convert the editor values back to a project entity
        const entity = edit.editorToProject(editor, this.context.portal);
        // 3. set the thumbnailCache to ensure that
        // the thumbnail is updated on the next save
        if (thumbnail) {
            if (thumbnail.blob) {
                this.thumbnailCache = {
                    file: thumbnail.blob,
                    filename: thumbnail.fileName,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        // 4. upsert or remove the configured featured image
        if (featuredImage) {
            let featuredImageUrl = null;
            if (featuredImage.blob) {
                featuredImageUrl = await themes.upsertResource(entity.id, entity.owner, featuredImage.blob, "featuredImage.png", this.context.userRequestOptions);
            }
            else if (await themes.doesResourceExist(entity.id, "featuredImage.png", this.context.userRequestOptions)) {
                await removeResource(entity.id, "featuredImage.png", entity.owner, this.context.userRequestOptions);
            }
            entity.view = Object.assign(Object.assign({}, entity.view), { featuredImageUrl });
        }
        // 5. save or create the entity
        this.entity = entity;
        await this.save();
        // 6. share the entity with the configured groups
        const isCreate = !editor.id;
        if (isCreate) {
            await this.setAccess(editor.access);
            if (autoShareGroups.length) {
                await Promise.all(autoShareGroups.map((id) => {
                    return this.shareWithGroup(id);
                }));
            }
        }
        return this.entity;
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubProject is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
        // update internal instances
        if (changes.catalog) {
            this._catalog = Catalog.Catalog.fromJson(this.entity.catalog, this.context);
        }
    }
    /**
     * Save the HubProject to the backing store. Currently Projects are stored as Items in Portal
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubProject is already destroyed.");
        }
        // get the catalog, and permission configs
        this.entity.catalog = this._catalog.toJson();
        if (this.entity.id) {
            // update it
            this.entity = await edit.updateProject(this.entity, this.context.userRequestOptions);
        }
        else {
            // create it
            this.entity = await edit.createProject(this.entity, this.context.userRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Delete the HubProject from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubProject is already destroyed.");
        }
        this.isDestroyed = true;
        const { deleteProject } = await Promise.resolve().then(function () { return require('./edit-3df37e35.js'); }).then(function (n) { return n.edit$1; });
        // Delegate to module fn
        await deleteProject(this.entity.id, this.context.userRequestOptions);
    }
    /**
     * Resolve a single metric for this metric
     * @param metricId
     * @returns
     */
    resolveMetric(metricId) {
        const metrics = getEntityMetrics.getEntityMetrics(this.entity);
        const metric = metrics.find((m) => m.id === metricId);
        // TODO: add caching
        if (metric) {
            return resolveMetric.resolveMetric(metric, this.context);
        }
        else {
            throw new Error(`Metric ${metricId} not found.`);
        }
    }
}

/**
 * Convert an initiative entity in a card view model
 * that can be consumed by the suite of hub gallery components
 *
 * @param initiative initiative entity
 * @param context auth & portal information
 * @param opts view model options
 */
const initiativeToCardModel = (initiative, context, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromEntity(initiative, context, target, baseUrl);
    return Object.assign(Object.assign(Object.assign({}, getSharedInitiativeCardModel(initiative, locale)), { actionLinks,
        titleUrl }), (initiative.thumbnailUrl && { thumbnailUrl: initiative.thumbnailUrl }));
};
/**
 * Conver an initiative search result into a card view model
 * that can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub initiative search result
 * @param opts view model options
 */
const initiativeResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedInitiativeCardModel(searchResult, locale)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
/**
 * Given an initiative entiy OR hub search result, construct the
 * initiative's shared card view model properties
 *
 * @param entityOrSearchResult intiative entity or hub search result
 * @param locale internationalization locale
 */
const getSharedInitiativeCardModel = (entityOrSearchResult, locale) => {
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
 * Hub Initiative Class
 */
class HubInitiative extends getEditorSlug.HubItemEntity {
    /**
     * Private constructor so we don't have `new` all over the place. Allows for
     * more flexibility in how we create the HubInitiativeManager over time.
     * @param context
     */
    constructor(entity, context) {
        super(entity, context);
        this._catalog = Catalog.Catalog.fromJson(entity.catalog, this.context);
    }
    /**
     * Catalog instance for this Initiative. Note: Do not hold direct references to this object; always access it from the Initiative.
     * @returns Catalog
     */
    get catalog() {
        return this._catalog;
    }
    /**
     * Create an instance from an IHubInitiative object
     * @param json - JSON object to create a HubInitiative from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubInitiative(pojo, context);
    }
    /**
     * Create a new HubInitiative, returning a HubInitiative instance.
     * Note: This does not persist the Initiative into the backing store
     * @param partialInitiative
     * @param context
     * @returns
     */
    static async create(partialInitiative, context, save = false) {
        const pojo = this.applyDefaults(partialInitiative, context);
        // return an instance of HubInitiative
        const instance = HubInitiative.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch an Initiative from the backing store and return a HubInitiative instance.
     * @param identifier - slug or item id
     * @param context
     * @returns
     */
    static async fetch(identifier, context) {
        // fetch by id or slug
        try {
            const entity = await HubInitiatives.fetchInitiative(identifier, context.requestOptions);
            // create an instance of HubInitiative from the entity
            return HubInitiative.fromJson(entity, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Initiative not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    static applyDefaults(partialInitiative, context) {
        // ensure we have the orgUrlKey
        if (!partialInitiative.orgUrlKey) {
            partialInitiative.orgUrlKey = context.portal.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, HubInitiatives.DEFAULT_INITIATIVE), partialInitiative);
        return pojo;
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubInitiative is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
        // update internal instances
        if (changes.catalog) {
            this._catalog = Catalog.Catalog.fromJson(this.entity.catalog, this.context);
        }
    }
    /**
     * Save the HubInitiative to the backing store.
     * Currently Initiatives are stored as Items in Portal
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubInitiative is already destroyed.");
        }
        // get the catalog, and permission configs
        this.entity.catalog = this._catalog.toJson();
        if (this.entity.id) {
            // update it
            this.entity = await HubInitiatives.updateInitiative(this.entity, this.context.userRequestOptions);
        }
        else {
            // create it
            this.entity = await HubInitiatives.createInitiative(this.entity, this.context.userRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Delete the HubInitiative from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubInitiative is already destroyed.");
        }
        this.isDestroyed = true;
        // Delegate to module fn
        await HubInitiatives.deleteInitiative(this.entity.id, this.context.userRequestOptions);
    }
    /**
     * Resolve a single metric for this metric
     * @param metricId
     * @returns
     */
    resolveMetric(metricId) {
        const metrics = getEntityMetrics.getEntityMetrics(this.entity);
        const metric = metrics.find((m) => m.id === metricId);
        // TODO: Add caching
        if (metric) {
            return resolveMetric.resolveMetric(metric, this.context);
        }
        else {
            throw new Error(`Metric ${metricId} not found.`);
        }
    }
    /**
     * Convert the initiative entity into a card view model that
     * can be consumed by the suite of hub gallery components
     *
     * @param opts view model options
     */
    convertToCardModel(opts) {
        return initiativeToCardModel(this.entity, this.context, opts);
    }
    /*
     * Get a specifc editor config for the HubInitiative entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresonds to the returned uiSchema
     * @param options optional hash of dynamic uiSchema element options
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the initiative as an editor object
     * @param editorContext
     * @returns
     */
    async toEditor(editorContext = {}, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. handle metrics
        const metrics = getEntityMetrics.getEntityMetrics(this.entity);
        const metric = metrics.find((m) => m.id === editorContext.metricId);
        const displays = getWithDefault.getWithDefault(this.entity, "view.metricDisplays", []);
        const displayConfig = displays.find((display) => display.metricId === editorContext.metricId) || {};
        editor._metric = metricToEditor(metric, displayConfig);
        // 3. handle association group
        const assocGroupId = getProp.getProp(this.entity, "associations.groupId");
        if (assocGroupId) {
            const associationGroup = await get.getGroup(assocGroupId, this.context.requestOptions);
            const hubAssociationGroup = hubSearch.convertGroupToHubGroup(associationGroup, this.context.userRequestOptions);
            const _associations = {
                groupAccess: hubAssociationGroup.access,
                membershipAccess: hubAssociationGroup.membershipAccess,
            };
            editor._associations = _associations;
        }
        // 4. slug life
        editor._slug = getEditorSlug.getEditorSlug(this.entity);
        return editor;
    }
    /**
     * Load the initiative from the editor object
     * @param editor
     * @returns
     */
    async fromEditor(editor) {
        // 1. extract the ephemeral props we graft onto the editor
        // note: they will be deleted in the editorToInitiative function
        const thumbnail = editor._thumbnail;
        const featuredImage = editor.view.featuredImage;
        const autoShareGroups = editor._groups || [];
        // 2. convert the editor values back to a initiative entity
        let entity = await HubInitiatives.editorToInitiative(editor, this.context);
        // 3. If the entity hasn't been created then we need to do that before we can
        // create a featured image, if one has been provided.
        if (!entity.id && featuredImage) {
            // update this.entity so that the save method will work
            this.entity = entity;
            // save the entity to get an id / create it
            await this.save();
            // update the local entity let so that the featured image call can pick up the id
            entity = this.entity;
        }
        // 4. set the thumbnailCache to ensure that
        // the thumbnail is updated on the next save
        if (thumbnail) {
            if (thumbnail.blob) {
                this.thumbnailCache = {
                    file: thumbnail.blob,
                    filename: thumbnail.fileName,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        // 5. upsert or remove the configured featured image
        if (featuredImage) {
            let featuredImageUrl = null;
            if (featuredImage.blob) {
                featuredImageUrl = await themes.upsertResource(entity.id, entity.owner, featuredImage.blob, "featuredImage.png", this.context.userRequestOptions);
            }
            else if (await themes.doesResourceExist(entity.id, "featuredImage.png", this.context.userRequestOptions)) {
                await removeResource(entity.id, "featuredImage.png", entity.owner, this.context.userRequestOptions);
            }
            entity.view = Object.assign(Object.assign({}, entity.view), { featuredImageUrl });
        }
        // 6. save or create the entity
        this.entity = entity;
        await this.save();
        // 7. share the entity with the configured groups
        const isCreate = !editor.id;
        if (isCreate) {
            await this.setAccess(editor.access);
            if (autoShareGroups.length) {
                await Promise.all(autoShareGroups.map((id) => {
                    return this.shareWithGroup(id);
                }));
            }
        }
        return this.entity;
    }
}

/**
 * Convert an initiative template entity into a card view model that can
 * be consumed by the suite of hub gallery components
 *
 * @param initiativeTemplate initiative template entity
 * @param context auth & portal information
 * @param opts view model options
 * @returns
 */
const initiativeTemplateToCardModel = (initiativeTemplate, context, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromEntity(initiativeTemplate, context, target, baseUrl);
    return Object.assign(Object.assign(Object.assign({}, getSharedInitiativeTemplateCardModel(initiativeTemplate, locale)), { actionLinks,
        titleUrl }), (initiativeTemplate.thumbnailUrl && {
        thumbnailUrl: initiativeTemplate.thumbnailUrl,
    }));
};
/**
 * Convert an initiative template hub search result into a card view model that
 * can be consumed by the suite of hub gallery components
 *
 * @param searchResult hub initiative template search result
 * @param opts view model options
 */
const initiativeTemplateResultToCardModel = (searchResult, opts) => {
    const { actionLinks = [], baseUrl = "", locale = "en-US", target = "self", } = opts || {};
    const titleUrl = getCardModelUrl.getCardModelUrlFromResult(searchResult, target, baseUrl);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSharedInitiativeTemplateCardModel(searchResult, locale)), { actionLinks }), (!isNaN(searchResult.index) && { index: searchResult.index })), { titleUrl }), (searchResult.links.thumbnail && {
        thumbnailUrl: searchResult.links.thumbnail,
    }));
};
const getSharedInitiativeTemplateCardModel = (entityOrSearchResult, locale) => {
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
 * Hub Initiative Template Class
 */
class HubInitiativeTemplate extends getEditorSlug.HubItemEntity {
    constructor(initiativeTemplate, context) {
        super(initiativeTemplate, context);
        this._catalog = Catalog.Catalog.fromJson(initiativeTemplate.catalog, this.context);
    }
    get catalog() {
        return this._catalog;
    }
    /**
     * Create an instance from an IHubInitiativeTemplate object
     * @param json - JSON object to create a HubInitiativeTemplate from
     * @param context - ArcGIS context
     * @returns - instance of HubInitiativeTemplate
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubInitiativeTemplate(pojo, context);
    }
    /**
     * Create a new HubInitiativeTemplate, returning a HubInitiativeTemplate instance.
     * Note: This does not persist the HubInitiativeTemplate into the backing store
     * @param partialInitiativeTemplate
     * @param context
     * @param save
     * @returns
     */
    static async create(partialInitiativeTemplate, context, save = false) {
        const pojo = this.applyDefaults(partialInitiativeTemplate, context);
        // return an instance of HubInitiativeTemplate
        const instance = HubInitiativeTemplate.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a HubInitiativeTemplate from the backing store and return a HubInitiativeTemplate instance.
     * @param identifier - Identifier of the initiative template to load
     * @param context
     */
    static async fetch(identifier, context) {
        // fetch the initiative template by id or slug
        try {
            const initiativeTemplate = await fetchHubEntity.fetchInitiativeTemplate(identifier, context.requestOptions);
            // create an instance of HubInitiativeTemplate from the initiative template
            return HubInitiativeTemplate.fromJson(initiativeTemplate, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Initiative Template not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    /**
     * Given a partial initiative template, apply defaults to it to ensure that a baseline of properties are set
     * @param partialInitiativeTemplate
     * @param context
     * @returns
     */
    static applyDefaults(partialInitiativeTemplate, context) {
        // ensure we have the orgUrlKey
        if (!partialInitiativeTemplate.orgUrlKey) {
            partialInitiativeTemplate.orgUrlKey = context.portal.urlKey;
        }
        const pojo = Object.assign(Object.assign({}, edit.DEFAULT_INITIATIVE_TEMPLATE), partialInitiativeTemplate);
        return pojo;
    }
    /**
     * Convert the project entity into a card view model that can
     * be consumed by the suite of hub gallery components
     * @param opts - view model options
     * @returns
     */
    convertToCardModel(opts) {
        return initiativeTemplateToCardModel(this.entity, this.context, opts);
    }
    /**
     * Get the editor config for the HubInitiativeTemplate entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type -- corresponds to the returned uiSchema
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the initiative template as an editor object
     * @param editorContext
     */
    async toEditor(editorContext = {}, include = []) {
        // cast the entity to its editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // slug life
        editor._slug = getEditorSlug.getEditorSlug(this.entity);
        // for now, just return
        return editor;
    }
    /**
     * Load the initiative template from the editor object
     * @param editor
     */
    async fromEditor(editor) {
        // Setting the thumbnailCache will ensure that the thumbnail is updated on next save
        if (editor._thumbnail) {
            if (editor._thumbnail.blob) {
                this.thumbnailCache = {
                    file: editor._thumbnail.blob,
                    filename: editor._thumbnail.filename,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        delete editor._thumbnail;
        const entity = HubInitiatives.editorToEntity(editor, this.context.portal);
        // save, which will also create an entity if we don't have an id for it
        this.entity = entity;
        await this.save();
        return this.entity;
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubInitiativeTemplate is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
        // update internal instances
        if (changes.catalog) {
            this._catalog = Catalog.Catalog.fromJson(this.entity.catalog, this.context);
        }
    }
    /**
     * Save the HubInitiativeTemplate to the backing store.
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubInitiativeTemplate is already destroyed.");
        }
        // get the catalog and permission configs
        this.entity.catalog = this._catalog.toJson();
        if (this.entity.id) {
            // update it
            this.entity = await edit.updateInitiativeTemplate(this.entity, this.context.userRequestOptions);
        }
        else {
            // create it
            this.entity = await edit.createInitiativeTemplate(this.entity, this.context.userRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
    }
    /**
     * Delete the HubInitiativeTemplate from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubInitiativeTemplate is already destroyed.");
        }
        this.isDestroyed = true;
        await edit.deleteInitiativeTemplate(this.entity.id, this.context.userRequestOptions);
    }
}

/** Default values for a new IHubSurvey */
const DEFAULT_SURVEY = {
    schemaVersion: 1,
    catalog: { schemaVersion: 0 },
    name: "",
    tags: [],
    typeKeywords: [],
};

/**
 * Hub Survey Class
 */
class HubSurvey extends getEditorSlug.HubItemEntity {
    /**
     * Create an instance from a HubSurvey object
     * @param json - JSON object to create a HubSurvey from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubSurvey(pojo, context);
    }
    /**
     * Fetch a Survey from the backing store and return a HubSurvey instance.
     * @param identifier - Identifier of the survey to load
     * @param context
     * @returns
     */
    static async fetch(identifier, context) {
        // fetch the survey by id
        try {
            const survey = await fetchHubEntity.fetchSurvey(identifier, context.userRequestOptions);
            // create an instance of HubSurvey from the survey
            return HubSurvey.fromJson(survey, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Survey not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    static applyDefaults(partialSurvey, context) {
        // ensure we have the orgUrlKey
        if (!partialSurvey.orgUrlKey) {
            partialSurvey.orgUrlKey = context.portal.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, DEFAULT_SURVEY), partialSurvey);
        return pojo;
    }
    /**
     * Apply a new state to the instance
     * @param changes A partial IHubSurvey
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubSurvey is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    /**
     * Save the class instance
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubSurvey is already destroyed.");
        }
        if (this.entity.id) {
            // update it
            this.entity = await edit.updateSurvey(this.entity, this.context.userRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Delete the HubSurvey object from the store
     * set a flag to indicate that it is destroyed
     * @returns a promise
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubSurvey is already destroyed.");
        }
        this.isDestroyed = true;
        // Delegate to module fn
        await edit.deleteSurvey(this.entity.id, this.context.userRequestOptions);
    }
    /*
     * Get the editor config for the HubSurvey entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresonds to the returned uiSchema
     */
    getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the Survey object as an editor object
     * @param editorContext
     * @param include
     * @returns
     */
    async toEditor(editorContext, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. Apply transforms to relevant entity values so they
        // can be consumed by the editor
        return editor;
    }
    /**
     * Load the Survey object from the editor object
     * @param editor
     * @param editorContext
     * @returns IHubSurvey
     */
    async fromEditor(editor, editorContext) {
        var _a;
        // Setting the thumbnailCache will ensure that
        // the thumbnail is updated on next save
        if (editor._thumbnail) {
            if (editor._thumbnail.blob) {
                this.thumbnailCache = {
                    file: editor._thumbnail.blob,
                    filename: editor._thumbnail.fileName,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        delete editor._thumbnail;
        // convert back to an entity. Apply any reverse transforms used in
        // of the toEditor method
        const entity = util.cloneObject(editor);
        // copy the location extent up one level
        entity.extent = (_a = editor.location) === null || _a === void 0 ? void 0 : _a.extent;
        // Save, which will also create new content if new
        this.entity = entity;
        await this.save();
        return this.entity;
    }
}

/**
 * Defines the properties of a Hub Event object
 * @internal
 */
class HubEvent extends getEditorSlug.HubItemEntity {
    /**
     * Create an instance from a HubEvent object
     * @param json - JSON object to create a HubEvent from
     * @param context - ArcGIS context
     * @returns HubEvent
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubEvent(pojo, context);
    }
    /**
     * Fetch an Event from the API and return a HubEvent instance.
     * @param identifier slug or item id
     * @param context ArcGIS context
     * @returns Promise<HubEvent>
     */
    static async fetch(identifier, context) {
        try {
            const entity = await fetch.fetchEvent(identifier, context.hubRequestOptions);
            // create an instance of HubEvent from the entity
            return HubEvent.fromJson(entity, context);
        }
        catch (ex) {
            throw new Error("Event not found.");
        }
    }
    static applyDefaults(partialEvent, context) {
        var _a;
        // ensure we have the orgUrlKey
        if (!partialEvent.orgUrlKey) {
            partialEvent.orgUrlKey = (_a = context.portal) === null || _a === void 0 ? void 0 : _a.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, defaults.buildDefaultEventEntity()), partialEvent);
        return pojo;
    }
    /**
     * Apply a new state to the instance
     * @param changes A partial IHubEvent
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubEvent is already destroyed.");
        }
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    /**
     * Creates or saves the Event.
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubEvent is already destroyed.");
        }
        if (this.entity.id) {
            const { updateHubEvent } = await Promise.resolve().then(function () { return require('./edit-2b7ccc3f.js'); });
            this.entity = await updateHubEvent(this.entity, this.context.hubRequestOptions);
        }
        else {
            const { createHubEvent } = await Promise.resolve().then(function () { return require('./edit-2b7ccc3f.js'); });
            this.entity = await createHubEvent(this.entity, this.context.hubRequestOptions);
        }
        // not calling `afterSave` intentionally, doesn't apply to events
    }
    /**
     * Deletes the Event
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubEvent is already destroyed.");
        }
        const { deleteHubEvent } = await Promise.resolve().then(function () { return require('./edit-2b7ccc3f.js'); });
        await deleteHubEvent(this.entity.id, this.context.hubRequestOptions);
        this.isDestroyed = true;
    }
    /**
     * Share the Entity with the specified group id
     * @param groupId The ID of the group to share the Event to
     */
    async shareWithGroup(groupId) {
        if (!this.context.currentUser) {
            throw new HubError.HubError("Share Event With Group", "Cannot share event with group when no user is logged in.");
        }
        this.entity = (await unshareEventWithGroups.shareEventWithGroups([groupId], this.entity, this.context));
    }
    /**
     * Share the Entity with the specified group ids
     * @param groupIds The IDs of the groups to share the Event to
     */
    async shareWithGroups(groupIds) {
        this.entity = (await unshareEventWithGroups.shareEventWithGroups(groupIds, this.entity, this.context));
    }
    /**
     * Unshare the Event with the specified group id
     * @param groupId The ID of the group to unshar ethe Event with
     */
    async unshareWithGroup(groupId) {
        this.entity = (await unshareEventWithGroups.unshareEventWithGroups([groupId], this.entity, this.context));
    }
    /**
     * Unshare the Event with the specified group ids
     * @param groupIds The IDs of the groups to unshare the Event with
     */
    async unshareWithGroups(groupIds) {
        this.entity = (await unshareEventWithGroups.unshareEventWithGroups(groupIds, this.entity, this.context));
    }
    /**
     * Sets the access level of the event
     * @param access The access level to set the Event to
     */
    async setAccess(access) {
        await events.updateEvent(Object.assign({ eventId: this.entity.id, data: {
                access: access.toUpperCase(),
            } }, this.context.hubRequestOptions));
        this.entity.access = access;
    }
    /**
     * Return a list of groups the Entity is shared to.
     */
    async sharedWith() {
        return getEventGroups.getEventGroups(this.entity.id, this.context);
    }
    /*
     * Get the editor config for the HubEvent entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresonds to the returned uiSchema
     * @returns Promise<IEditorConfig>
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the HubEvent object as an editor object
     * @param editorContext
     * @param include
     * @returns Promise<IHubEventEditor>
     */
    async toEditor(editorContext = {}, include = []) {
        const editor = util.cloneObject(this.entity);
        return editor;
    }
    /**
     * Load the HubEvent object from the editor object
     * @param editor
     * @param editorContext
     * @returns Promise<IHubEvent>
     */
    async fromEditor(editor) {
        const entity = util.cloneObject(editor);
        this.entity = entity;
        await this.save();
        return this.entity;
    }
}

/**
 * NOTE: this file provides default values for new
 * Hub Template creation; however, we have no immediate
 * plans to allow template creation from the context of
 * our application. Scaffolding these defaults for
 * potential future implementation
 */
const HUB_TEMPLATE_ITEM_TYPE = "Solution";
/** Default values for a new IHubTemplate */
const DEFAULT_TEMPLATE = {
    schemaVersion: 1,
    catalog: { schemaVersion: 0 },
    name: "",
    tags: [],
    typeKeywords: [HUB_TEMPLATE_ITEM_TYPE],
    view: {},
    permissions: [],
    features: TemplateBusinessRules.TemplateDefaultFeatures,
};

/**
 * Hub Template Class - this class encapsulates the standard
 * operations for a "Solution" item despite the Hub team not
 * "owning" this item type. Our primary goal is to allow
 * editing of the item's meta information, manage sharing, etc.
 */
class HubTemplate extends getEditorSlug.HubItemEntity {
    /**
     * Private constructor to allow for future
     * template-specific logic
     * @param template
     * @param context
     */
    constructor(template, context) {
        super(template, context);
    }
    /**
     * Create an HubTemplate instance from an IHubTemplate object
     * @param json - JSON object to create a HubTemplate from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubTemplate(pojo, context);
    }
    /**
     * Create a new HubTemplate, returning a HubTemplate instance.
     * This does not automatically persist the Template into
     * the backing store unless save is set to true
     *
     * NOTE: we have no immediate plans to allow template creation
     * from the context of the Hub application, but scaffolding this
     * method for potential future implementation. The underlying
     * createTemplate function will throw an error if attempted.
     * @param partialTemplate
     * @param context
     * @param save
     */
    static async create(partialTemplate, context, save = false) {
        const pojo = this.applyDefaults(partialTemplate, context);
        const instance = HubTemplate.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a HubTemplate from the backing store and return
     * a HubTemplate instance
     * @param identifier
     * @param context
     */
    static async fetch(identifier, context) {
        try {
            const initiativeTemplate = await HubInitiatives.fetchTemplate(identifier, context.requestOptions);
            return HubTemplate.fromJson(initiativeTemplate, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Template ${identifier} not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    /**
     * Given a partial Template, apply defaults to
     * it to ensure that a baseline of properties are set
     * @param partialTemplate
     * @param context
     */
    static applyDefaults(partialTemplate, context) {
        // ensure we have the orgUrlKey
        if (!partialTemplate.orgUrlKey) {
            partialTemplate.orgUrlKey = context.portal.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, DEFAULT_TEMPLATE), partialTemplate);
        return pojo;
    }
    /*
     * Get a specific editor config for the HubTemplate entity.
     * @param i18nScope
     * @param type
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Transform template entity into an editor object
     * @param editorContext
     */
    async toEditor(editorContext = {}, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. Apply transforms to relevant entity values so they
        // can be consumed by the editor
        return editor;
    }
    /**
     * Transform editor values into a template entity
     * @param editor
     */
    async fromEditor(editor) {
        // Setting the thumbnailCache will ensure that the
        // thumbnail is updated on the next save
        if (editor._thumbnail) {
            if (editor._thumbnail.blob) {
                this.thumbnailCache = {
                    file: editor._thumbnail.blob,
                    filename: editor._thumbnail.filename,
                    clear: false,
                };
            }
            else {
                this.thumbnailCache = {
                    clear: true,
                };
            }
        }
        delete editor._thumbnail;
        const entity = edit.editorToTemplate(editor, this.context.portal);
        // save, which will also create
        this.entity = entity;
        await this.save();
        return this.entity;
    }
    /**
     * Update the instance's internal entity state
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubTemplate is already destroyed.");
        }
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    /** Save the HubTemplate to the backing store */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubTemplate is already destroyed.");
        }
        // 1. create or update. Note: the underlying createTemplate
        // function will throw an error because we don't currently
        // allow for template creation from the context of Hub
        this.entity = this.entity.id
            ? await edit.updateTemplate(this.entity, this.context.userRequestOptions)
            : await edit.createTemplate();
        // 2. call the after save hook on HubItemEntity superclass
        await super.afterSave();
    }
    /**
     * Delete the Hub Template's backing item and set a flag
     * indicating it's been destroyed
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubTemplate is already destroyed.");
        }
        this.isDestroyed = true;
        await edit.deleteTemplate(this.entity.id, this.context.userRequestOptions);
    }
}

/**
 * Default user properties
 *
 * TODO: add default user properties as we need them
 */
const DEFAULT_USER = {};

/**
 * Function to update a user's community org settings. Expects the user to be an org admin in the current community org.
 * @param settings
 */
async function updateCommunityOrgSettings(settings, context) {
    // check that user is authed
    if (!context.currentUser) {
        throw new Error("User is not authenticated");
    }
    // check that user is in community org and is org admin
    if (!context.isCommunityOrg || !context.isOrgAdmin) {
        throw new Error("User is not an org admin in the current community org");
    }
    // grab settings
    const { termsAndConditions, signupText } = settings;
    // build the url
    const urlPath = "/sharing/rest/portals/self/setSigninSettings?f=json";
    const url = `${context.portalUrl}${urlPath}`;
    // if we do not have values for one of the fields, we want to clear it
    const clearEmptyFields = !signupText || !termsAndConditions;
    // send the request to update
    return request.request(url, {
        httpMethod: "POST",
        params: {
            termsAndConditions,
            signupText,
            clearEmptyFields,
            token: context.hubRequestOptions.authentication.token,
        },
    });
}

/**
 * Function to update a user's org settings. Expects the user to be an org admin in the current org.
 * Currently only updates whether to show the informational banner.
 * @param settings
 */
async function updatePortalOrgSettings(settings, context) {
    // check that user is authed
    if (!context.currentUser) {
        throw new Error("User is not authenticated");
    }
    // check that user is org admin
    if (!context.isOrgAdmin) {
        throw new Error("User is not an org admin in the current org");
    }
    // grab and clone portalProperties
    const portalProperties = util.cloneObject(context.portal.portalProperties);
    // grab settings
    const { showInformationalBanner } = settings;
    // update infoBanner value in portalProperties
    portalProperties.hub.settings.informationalBanner = showInformationalBanner;
    // build the url
    const urlPath = `/sharing/rest/portals/self/update?f=json`;
    const url = `${context.portalUrl}${urlPath}`;
    // send the request to update
    return request.request(url, {
        httpMethod: "POST",
        params: {
            portalProperties: JSON.stringify(portalProperties),
            token: context.hubRequestOptions.authentication.token,
        },
    });
}

class HubUser {
    constructor(user, context) {
        this.isDestroyed = false;
        this.entity = user;
        this.context = context;
    }
    /**
     * Create an instance from a IHubUser object
     * @param json - JSON object to create a HubProject from
     * @param context - ArcGIS context
     * @returns HubUser
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json);
        return new HubUser(pojo, context);
    }
    /**
     * Given a partial user object, apply defaults to it to ensure that a baseline of properties are set
     * @param partialUser
     * @returns IHubUser
     */
    static applyDefaults(partialUser) {
        return Object.assign(Object.assign({}, DEFAULT_USER), partialUser);
    }
    /**
     * Method that returns the entity as a JSON object
     * We have this on the EntityItem class, but we don't implement that here
     * @returns IHubUser
     */
    toJson() {
        return util.cloneObject(this.entity);
    }
    /**
     * Save the HubUser to the backing store.
     *
     * Note that Hub does not currently support the creation of users,
     * so this function should only be used for updating users.
     *
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubUser is already destroyed.");
        }
        // 1. update user hub settings
        await this.context.updateUserHubSettings(this.entity.settings);
        // 2. update portal signin settings
        // we are in community org, user is org admin, and we have org settings to send
        if (this.context.isCommunityOrg &&
            this.context.isOrgAdmin &&
            this.entity.hubOrgSettings) {
            const { hubOrgSettings } = this.entity;
            // only send values if we have settings enabled
            // else we send an empty string to reset
            const newCommunityOrgSettings = {
                signupText: hubOrgSettings.enableSignupText && hubOrgSettings.signupText
                    ? hubOrgSettings.signupText
                    : "",
                termsAndConditions: hubOrgSettings.enableTermsAndConditions &&
                    hubOrgSettings.termsAndConditions
                    ? hubOrgSettings.termsAndConditions
                    : "",
            };
            // make the request to update the settings
            await updateCommunityOrgSettings(newCommunityOrgSettings, this.context);
        }
        // 3. update portal settings
        // User is org admin, we have org settings to send, and we have a banner to show
        if (this.context.isOrgAdmin &&
            this.entity.hubOrgSettings &&
            this.entity.hubOrgSettings.hasOwnProperty("showInformationalBanner")) {
            // update the portal settings
            await updatePortalOrgSettings(this.entity.hubOrgSettings, this.context);
        }
        return;
    }
    /**
     * Delete the HubUser from the store
     * set a flag to indicate that it is destroyed
     *
     * Note that Hub does not currently support the deletion of users,
     * so this function should not be used as of now.
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubUser is already destroyed.");
        }
        // TODO: implement delete here when we want this functionality
        this.isDestroyed = true;
    }
    /**
     * Get the editor config for the HubUser entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresponds to the returned uiSchema
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Transforms entity values into editor values
     * @param editorContext
     * @param include
     */
    async toEditor(editorContext = {}, include = []) {
        // 1. optionally enrich entity and cast to editor
        const editor = include.length
            ? (await enrichEntity.enrichEntity(util.cloneObject(this.entity), include, this.context.hubRequestOptions))
            : util.cloneObject(this.entity);
        // 2. Apply transforms to relevant entity values
        // so they can be consumed by editor
        return editor;
    }
    /**
     * Transforms editor values into entity values
     * @param editor
     */
    async fromEditor(editor) {
        const entity = util.cloneObject(editor);
        // save user
        this.entity = entity;
        await this.save();
        return this.entity;
    }
}

class EntityEditor {
    constructor(instance) {
        this.instance = instance;
    }
    static fromEntity(entity, context) {
        const entityType = getTypeFromEntity.getTypeFromEntity(entity);
        // Create the instance and cast to EntityEditor
        let editor;
        if (entityType === "project") {
            editor = HubProject.fromJson(entity, context);
        }
        if (entityType === "initiative") {
            editor = HubInitiative.fromJson(entity, context);
        }
        if (entityType === "content") {
            editor = HubContent.fromJson(entity, context);
        }
        if (entityType === "site") {
            editor = HubSite.HubSite.fromJson(entity, context);
        }
        if (entityType === "page") {
            editor = HubPage.HubPage.fromJson(entity, context);
        }
        if (entityType === "discussion") {
            editor = HubDiscussion.fromJson(entity, context);
        }
        if (entityType === "template") {
            editor = HubTemplate.fromJson(entity, context);
        }
        if (entityType === "survey") {
            editor = HubSurvey.fromJson(entity, context);
        }
        if (entityType === "event") {
            editor = HubEvent.fromJson(entity, context);
        }
        if (entityType === "group") {
            editor = HubGroup.HubGroup.fromJson(entity, context);
        }
        if (entityType === "initiativeTemplate") {
            editor = HubInitiativeTemplate.fromJson(entity, context);
        }
        if (entityType === "user") {
            editor = HubUser.fromJson(entity, context);
        }
        if (editor) {
            return new EntityEditor(editor);
        }
        else {
            throw new Error(`Unsupported entity type: ${entity.type}`);
        }
    }
    async getConfig(i18nScope, type) {
        return this.instance.getEditorConfig(i18nScope, type);
    }
    toEditor(editorContext = {}, include = []) {
        // This is ugly but it's the only way to get the type to be correct
        return this.instance.toEditor(editorContext, include);
    }
    async save(editor, editorContext) {
        return this.instance.fromEditor(editor, editorContext);
    }
}

exports.EntityEditor = EntityEditor;
exports.HubContent = HubContent;
exports.HubDiscussion = HubDiscussion;
exports.HubEvent = HubEvent;
exports.HubInitiative = HubInitiative;
exports.HubInitiativeTemplate = HubInitiativeTemplate;
exports.HubProject = HubProject;
exports.HubSurvey = HubSurvey;
exports.HubTemplate = HubTemplate;
exports.initiativeResultToCardModel = initiativeResultToCardModel;
exports.initiativeTemplateResultToCardModel = initiativeTemplateResultToCardModel;
exports.initiativeTemplateToCardModel = initiativeTemplateToCardModel;
exports.initiativeToCardModel = initiativeToCardModel;
exports.projectResultToCardModel = projectResultToCardModel;
exports.projectToCardModel = projectToCardModel;
exports.removeResource = removeResource;
