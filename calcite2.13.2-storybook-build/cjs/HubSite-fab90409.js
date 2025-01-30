'use strict';

const Catalog = require('./Catalog-acebae88.js');
const getEditorSlug = require('./getEditorSlug-eeb95a05.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
const enrichEntity = require('./enrichEntity-1632b924.js');
const TemplateBusinessRules = require('./TemplateBusinessRules-5564c964.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const deepContains = require('./deepContains-7989f3f1.js');
const util = require('./util-38e73510.js');
const PropertyMapper = require('./PropertyMapper-785e5c9f.js');
const updateVersionMetadata = require('./updateVersionMetadata-3ded56b8.js');
const compose = require('./compose-9b4311c9.js');
const mergeObjects = require('./merge-objects-b31af1a3.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const objectToJsonBlob = require('./object-to-json-blob-5c0a267d.js');
const themes = require('./themes-d539965a.js');
const update = require('./update-b8977041.js');
const setProp = require('./set-prop-3de2437f.js');
const utils = require('./utils-7f390376.js');

/**
 * Default values of a IHubSite
 */
const DEFAULT_SITE = {
    name: "",
    tags: [],
    typeKeywords: ["Hub Site", "hubSite"],
    catalog: { schemaVersion: 0 },
    permissions: [],
    schemaVersion: 1,
    features: TemplateBusinessRules.SiteDefaultFeatures,
};

/**
 * Gets the include list for the model type
 * @param model
 * @returns
 */
function getIncludeListFromItemType(model) {
    let includeList;
    if (compose.isSiteType(model.item.type, model.item.typeKeywords)) {
        includeList = TemplateBusinessRules.SiteVersionIncludeList;
    }
    else if (compose.isPageType(model.item.type, model.item.typeKeywords)) {
        includeList = TemplateBusinessRules.PageVersionIncludeList;
    }
    else {
        throw TypeError("Entity type does not support versioning");
    }
    return includeList;
}

/**
 * Returns the version data (ie the part of the model that gets versioned) from the model
 * @param model
 * @param includeList
 * @private
 */
function getVersionData(model, includeList) {
    return mergeObjects.mergeObjects(model, {}, includeList);
}

/**
 * Creates and returns a new version of the entity
 * @param entity
 * @param requestOptions
 * @returns
 */
async function createVersion(model, requestOptions, options) {
    const includeList = getIncludeListFromItemType(model);
    // TODO: in the future, we could make the data a separate resource file and reference it here with jsonref or something: { data: "#resources/data.json" }
    const data = getVersionData(model, includeList);
    const name = options === null || options === void 0 ? void 0 : options.name;
    const description = options === null || options === void 0 ? void 0 : options.description;
    const parent = options === null || options === void 0 ? void 0 : options.parentId;
    const id = util.createId();
    const prefix = updateVersionMetadata.getPrefix(id);
    const now = Date.now();
    const version = {
        created: now,
        creator: getProp.getProp(requestOptions, "authentication.username"),
        data,
        description,
        id,
        name,
        parent,
        path: `${prefix}/${updateVersionMetadata.VERSION_RESOURCE_NAME}`,
        updated: now,
    };
    const versionBlob = objectToJsonBlob.objectToJsonBlob(version);
    const properties = mergeObjects.mergeObjects(version, {}, updateVersionMetadata.VERSION_RESOURCE_PROPERTIES);
    await themes.addItemResource(Object.assign(Object.assign({}, requestOptions), { id: getProp.getProp(model, "item.id"), name: updateVersionMetadata.VERSION_RESOURCE_NAME, owner: getProp.getProp(model, "item.owner"), params: { properties }, prefix, resource: versionBlob }));
    version.size = versionBlob.size;
    return version;
}

/**
 * Applies the versioned data to the model
 * @param model
 * @param version
 * @param includeList
 * @returns
 */
function applyVersion(model, version, includeList) {
    if (!includeList) {
        includeList = getIncludeListFromItemType(model);
    }
    return mergeObjects.mergeObjects(version.data, util.cloneObject(model), includeList);
}
/**
 * Checks if the upstream version is newer than the passed in version
 * @param itemId
 * @param version
 * @param requestOptions
 * @returns
 */
async function checkForStaleVersion(itemId, version, requestOptions) {
    const upstream = await updateVersionMetadata.getVersion(itemId, version.id, requestOptions);
    const isStale = upstream.updated > version.updated;
    return {
        isStale,
        updated: upstream.updated,
    };
}

/**
 * Custom error to be thrown when attempting to save a stale version
 * @class StaleVersionError
 * @extends {Error}
 */
class StaleVersionError extends Error {
    constructor(id, updated) {
        super(`Version ${id} is stale. Use force to overwrite.`);
        this.updated = updated;
        this.name = "StaleVersionError";
    }
}
/**
 * Updates the specified version with with the state of the supplied model
 * throws an exception if the version is stale and force is not true
 * @param model
 * @param version
 * @param requestOptions
 * @param force
 * @returns
 */
async function updateVersion(model, version, requestOptions, force) {
    // we expect the model to contain the changes that we want to apply to the version
    // but we also need the versionResource so we can preserve the created and creator props
    if (!force) {
        const isStaleResponse = await checkForStaleVersion(model.item.id, version, requestOptions);
        if (isStaleResponse.isStale) {
            throw new StaleVersionError(version.id, isStaleResponse.updated);
        }
    }
    const includeList = getIncludeListFromItemType(model);
    version.data = getVersionData(model, includeList);
    const prefix = updateVersionMetadata.getPrefix(version.id);
    version.updated = Date.now();
    const versionBlob = objectToJsonBlob.objectToJsonBlob(version);
    const properties = mergeObjects.mergeObjects(version, {}, updateVersionMetadata.VERSION_RESOURCE_PROPERTIES);
    await update.updateItemResource(Object.assign(Object.assign({}, requestOptions), { id: getProp.getProp(model, "item.id"), name: updateVersionMetadata.VERSION_RESOURCE_NAME, owner: getProp.getProp(model, "item.owner"), params: { properties }, prefix, resource: versionBlob }));
    return version;
}

/**
 * Hub Site Class
 * NOTE: This is a minimal implementation. Create operations are not supported at this time
 */
class HubSite extends getEditorSlug.HubItemEntity {
    /**
     * Private constructor so we don't have `new` all over the place. Allows for
     * more flexibility in how we create the HubSiteManager over time.
     * @param context
     */
    constructor(site, context) {
        super(site, context);
        this._catalogCache = {};
        this._catalog = Catalog.Catalog.fromJson(site.catalog, this.context);
    }
    /**
     * Catalog instance for this site. Note: Do not hold direct references to this object; always access it from the site.
     * @returns
     */
    get catalog() {
        return this._catalog;
    }
    /**
     * Create an instance from an IHubSite object
     * @param json - JSON object to create a HubSite from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubSite(pojo, context);
    }
    /**
     *
     * NOT IMPLEMENTED YET: Create a new HubSite, returning a HubSite instance.
     * By default, this does not save the site to the backing store.
     * @param partialSite
     * @param context
     * @returns
     */
    static async create(partialSite, context, save = false) {
        const pojo = this.applyDefaults(partialSite, context);
        // return an instance of HubProject
        const instance = HubSite.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a Site from the backing store and return a HubSite instance.
     * @param identifier - Identifier of the site to load
     * @param context
     * @returns
     */
    static async fetch(identifier, context) {
        // fetch the site by id or slug
        try {
            const site = await HubInitiatives.fetchSite(identifier, context.hubRequestOptions);
            // create an instance of HubSite from the site
            return HubSite.fromJson(site, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Site not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    static applyDefaults(partialSite, context) {
        var _a;
        // ensure we have the orgUrlKey
        if (!partialSite.orgUrlKey) {
            partialSite.orgUrlKey = (_a = context.portal) === null || _a === void 0 ? void 0 : _a.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, DEFAULT_SITE), partialSite);
        pojo.type = context.isPortal
            ? HubInitiatives.ENTERPRISE_SITE_ITEM_TYPE
            : HubInitiatives.HUB_SITE_ITEM_TYPE;
        return pojo;
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubSite is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
        // update internal instances
        if (changes.catalog) {
            this._catalog = Catalog.Catalog.fromJson(this.entity.catalog, this.context);
        }
    }
    /**
     * Save the HubSite to the backing store.
     * Currently Sites are stored as Items in Portal
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubSite is already destroyed.");
        }
        // get the catalog, and permission configs
        this.entity.catalog = this._catalog.toJson();
        if (this.entity.id) {
            // update it
            this.entity = await HubInitiatives.updateSite(this.entity, this.context.hubRequestOptions);
        }
        else {
            // create it
            this.entity = await HubInitiatives.createSite(this.entity, this.context.hubRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Delete the HubSite from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubSite is already destroyed.");
        }
        this.isDestroyed = true;
        // Delegate to module fn
        await HubInitiatives.deleteSite(this.entity.id, this.context.hubRequestOptions);
    }
    /**
     * Check if a particular entity is contained is this HubSite.
     *
     * By default, this checks the Site catalog for the entity, by executing a search.
     *
     * Transitive containment is supported by passing in an array of `IDeepCatalogInfo`
     * objects, in the order of the containment hierarchy.
     *
     * Scenario:
     * - Site `00a`'s Catalog contains Initiative `00b`.
     * - Initiative `00b`'s Catalog contains Site `00c`.
     * - Site `00c`'s catalog contains Dataset `00d`.
     *
     * Check if Dataset `00d` can be displayed in Site `00a`, pass in the following
     * ```js
     * [
     *  {id: '00c', entityType:"item"}, // site
     *  {id: '00b', entityType:"item"}, // initiative
     * ]
     * ```
     * The site catalog and id will be added in automatically.
     *
     * If you already have the `IHubCatalog` for the site or initiative, you can
     * pass that in as well, and it will save a request.
     *
     * This function will also build a cache of the catalogs so subsequent calls
     * will be faster.
     * @param identifier
     * @param hierarchy
     * @returns
     */
    async contains(identifier, hierarchy = []) {
        // Apply any cached catalogs
        hierarchy.forEach((entry) => {
            if (this._catalogCache[entry.id]) {
                entry.catalog = this._catalogCache[entry.id];
            }
        });
        // Add the site and it's catalog into the hierarchy as the last entry
        const hierarchyWithSiteCatalog = [
            ...hierarchy,
            ...[
                {
                    id: this.id,
                    hubEntityType: "site",
                    catalog: this._catalog.toJson(),
                },
            ],
        ];
        // delegate to fn
        const response = await deepContains.deepContains(identifier, "content", // NOTE: this is hardcoded for now!
        hierarchyWithSiteCatalog, this.context);
        // cache the catalogs
        Object.keys(response.catalogInfo).forEach((key) => {
            // don't cache the site's catalog
            if (key !== this.id) {
                this._catalogCache[key] = response.catalogInfo[key].catalog;
            }
        });
        return response;
    }
    //#region IWithVersioningBehavior
    /*
      NOTE: we will be further fleshing this out in the near future
        we will want to make it easier to apply a version to a site and work with it
        at a minimum, we will probably want something like this:
        async applyVersion(versionOrIdentifier: string | IVersion) {
          const version = typeof versionOrIdentifier === "string" ? await this.getVersion(versionOrIdentifier) : versionOrIdentifier;
          const mapper = new PropertyMapper<IHubSite>(getPropertyMap());
          const model = mapper.objectToModel(this.entity, {} as IModel);
          const versionedModel = applyVersion(model, version);
          const versionedEntity = mapper.modelToObject(versionedModel, this.entity);
          return this.update(versionedEntity);
        }
    */
    /**
     * Gets all the versions of the site
     * @returns
     */
    async searchVersions() {
        return updateVersionMetadata.searchVersions(this.entity.id, this.context.userRequestOptions);
    }
    /**
     * Gets the specified version of the site
     * @param versionId
     * @returns
     */
    async getVersion(versionId) {
        return updateVersionMetadata.getVersion(this.entity.id, versionId, this.context.userRequestOptions);
    }
    /**
     * Creates a new version of the site
     * @param options
     * @returns
     */
    async createVersion(options) {
        const mapper = new PropertyMapper.PropertyMapper(HubInitiatives.getPropertyMap$3());
        const model = mapper.entityToStore(this.entity, {});
        return createVersion(model, this.context.userRequestOptions, options);
    }
    /**
     * Updates the specified version of the site
     * @param version
     * @returns
     */
    async updateVersion(version) {
        const mapper = new PropertyMapper.PropertyMapper(HubInitiatives.getPropertyMap$3());
        const model = mapper.entityToStore(this.entity, {});
        return updateVersion(model, version, this.context.userRequestOptions);
    }
    /**
     * Updates the specified version's metadata
     * @param version
     * @returns
     */
    async updateVersionMetadata(version) {
        return updateVersionMetadata.updateVersionMetadata(this.entity.id, version, this.entity.owner, this.context.userRequestOptions);
    }
    /**
     * Deletes the specified version of the entity
     * @returns
     */
    async deleteVersion(versionId) {
        return updateVersionMetadata.deleteVersion(this.entity.id, versionId, this.entity.owner, this.context.userRequestOptions);
    }
    //#endregion IWithVersioningBehavior
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
        setProp.setProp("_followers.showFollowAction", this.entity.features["hub:site:feature:follow"], editor);
        editor._slug = getEditorSlug.getEditorSlug(this.entity);
        const followersGroup = await this.getFollowersGroup();
        setProp.setProp("_followers.isDiscussable", utils.isDiscussable(followersGroup), editor);
        editor._discussions = this.entity.features["hub:site:feature:discussions"];
        // used by the site URL composite field
        if (!editor._urlInfo) {
            const { url, subdomain, defaultHostname } = editor;
            editor._urlInfo = {
                url,
                subdomain,
                defaultHostname,
            };
        }
        return editor;
    }
    /**
     * Load the project from the editor object
     * @param editor
     * @returns
     */
    async fromEditor(editor) {
        // 1. Perform any pre-save operations e.g. storing
        // image resources on the item, setting access, etc.
        var _a, _b, _c;
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
        // set whether or not the followers group is discussable
        if ((_a = editor._followers) === null || _a === void 0 ? void 0 : _a.isDiscussable) {
            await this.setFollowersGroupIsDiscussable(editor._followers.isDiscussable);
        }
        // set the followers group access
        if ((_b = editor._followers) === null || _b === void 0 ? void 0 : _b.groupAccess) {
            await this.setFollowersGroupAccess(editor._followers.groupAccess);
        }
        // 2. Convert editor values back to an entity e.g. apply
        // any reverse transforms used in the toEditor method
        const entity = HubInitiatives.editorToEntity(editor, this.context.portal);
        entity.features = Object.assign(Object.assign({}, entity.features), { "hub:site:feature:follow": (_c = editor._followers) === null || _c === void 0 ? void 0 : _c.showFollowAction, "hub:site:feature:discussions": editor._discussions });
        // site URL info
        const { url, subdomain, defaultHostname } = editor._urlInfo;
        entity.url = url;
        entity.subdomain = subdomain;
        entity.defaultHostname = defaultHostname;
        // 3. create or update the in-memory entity and save
        this.entity = entity;
        await this.save();
        return this.entity;
    }
}

exports.HubSite = HubSite;
exports.applyVersion = applyVersion;
exports.checkForStaleVersion = checkForStaleVersion;
exports.createVersion = createVersion;
exports.updateVersion = updateVersion;
