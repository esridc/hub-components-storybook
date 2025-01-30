'use strict';

const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
const getEditorSlug = require('./getEditorSlug-eeb95a05.js');
const util = require('./util-38e73510.js');
const enrichEntity = require('./enrichEntity-1632b924.js');

/*
  TODO:
  - when creating a site, we currently do some stuff we probably don't want to do anymore:
    - protect the item
    - allow for uploading assets - i think this is not used
    - sharing to the collaboration group if it exists
*/
/**
 * Hub Page Class
 * NOTE: This is a minimal implementation.
 */
class HubPage extends getEditorSlug.HubItemEntity {
    /**
     * Private constructor so we don't have `new` all over the place. Allows for
     * more flexibility in how we create the HubPageManager over time.
     * @param context
     */
    constructor(page, context) {
        super(page, context);
    }
    /**
     * Create an instance from an IHubPage object
     * @param json - JSON object to create a HubPage from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json, context);
        return new HubPage(pojo, context);
    }
    /**
     *
     * Create a new HubPage, returning a HubPage instance.
     * By default, this does not save the page to the backing store.
     * @param partialPage
     * @param context
     * @returns
     */
    static async create(partialPage, context, save = false) {
        const pojo = this.applyDefaults(partialPage, context);
        // return an instance of HubPage
        const instance = HubPage.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a Page from the backing store and return a HubPage instance.
     * @param identifier - Identifier of the page to load
     * @param context
     * @returns
     */
    static async fetch(identifier, context) {
        // fetch the page by id or slug
        try {
            const page = await HubInitiatives.fetchPage(identifier, context.hubRequestOptions);
            // create an instance of HubPage from the page
            return HubPage.fromJson(page, context);
        }
        catch (ex) {
            if (ex.message ===
                "CONT_0001: Item does not exist or is inaccessible.") {
                throw new Error(`Page not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    static applyDefaults(partialPage, context) {
        // ensure we have the orgUrlKey
        if (!partialPage.orgUrlKey) {
            partialPage.orgUrlKey = context.portal.urlKey;
        }
        // extend the partial over the defaults
        const pojo = Object.assign(Object.assign({}, HubInitiatives.DEFAULT_PAGE), partialPage);
        pojo.type = context.isPortal
            ? HubInitiatives.ENTERPRISE_PAGE_ITEM_TYPE
            : HubInitiatives.HUB_PAGE_ITEM_TYPE;
        return pojo;
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubPage is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    /**
     * Save the HubPage to the backing store.
     * Currently Pages are stored as Items in Portal
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubPage is already destroyed.");
        }
        if (this.entity.id) {
            // update it
            this.entity = await HubInitiatives.updatePage(this.entity, this.context.userRequestOptions);
        }
        else {
            // create it
            this.entity = await HubInitiatives.createPage(this.entity, this.context.userRequestOptions);
        }
        // call the after save hook on superclass
        await super.afterSave();
        return;
    }
    /**
     * Delete the HubPage from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubPage is already destroyed.");
        }
        this.isDestroyed = true;
        // Delegate to module fn
        await HubInitiatives.deletePage(this.entity.id, this.context.userRequestOptions);
    }
    /*
     * Get a specific editor config for the HubPage entity.
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
        const entity = HubInitiatives.editorToEntity(editor, this.context.portal);
        // create it if it does not yet exist...
        this.entity = entity;
        await this.save();
        return this.entity;
    }
}

exports.HubPage = HubPage;
