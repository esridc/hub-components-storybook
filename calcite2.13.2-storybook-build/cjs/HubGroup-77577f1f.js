'use strict';

const hubSearch = require('./hubSearch-79d30702.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const util = require('./util-38e73510.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
const HubError = require('./HubError-44e07249.js');
const update = require('./update-7b2b2d9d.js');
const request = require('./request-67da3c71.js');
const enrichEntity = require('./enrichEntity-1632b924.js');
const checkPermission = require('./checkPermission-11ab5992.js');

/**
 * Upload a file to be used as the thumbnail for a group
 * @param id
 * @param file
 * @param filename
 * @param requestOptions
 */
async function setGroupThumbnail(id, file, filename, requestOptions, owner) {
    const opts = Object.assign({ group: {
            id,
        }, owner, params: {
            thumbnail: file,
            fileName: filename,
        }, filename }, requestOptions);
    try {
        const response = await update.updateGroup(opts);
        if (!response.success) {
            throw new HubError.HubError("Set Group Thumbnail", "Unknown error setting thumbnail.");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            throw new HubError.HubError("Set Group Thumbnail", err.message, err);
        }
        else {
            throw new HubError.HubError("Set Group Thumbnail", "Unknown error setting thumbnail.");
        }
    }
}

/**
 * Delete a group's thumbnail
 * @param id
 * @param owner
 * @param requestOptions
 * @returns
 */
async function deleteGroupThumbnail(id, requestOptions) {
    const { portal } = requestOptions;
    const urlPath = `${portal}/community/groups/${id}/deleteThumbnail`;
    return request.request(urlPath, requestOptions);
}

/**
 * Hub Group Class
 */
class HubGroup {
    constructor(group, context) {
        this.isDestroyed = false;
        this.thumbnailCache = null;
        this.entity = group;
        this.context = context;
    }
    /**
     * Whether the user can edit the group,
     * only the owner or admins of the group can
     */
    get canEdit() {
        return ((this.entity.memberType &&
            (this.entity.memberType === "owner" ||
                this.entity.memberType === "admin")) ||
            this.entity.owner === this.context.currentUser.username);
    }
    /**
     * Whether the user can delete the group
     * only the owner or admins of the group can
     */
    get canDelete() {
        return this.canEdit;
    }
    /**
     * Whether the group is protected, if so, it can't be deleted
     */
    get isProtected() {
        return this.entity.protected;
    }
    /**
     * Create an instance from an IHubGroup object
     * @param json - JSON object to create a HubGroup from
     * @param context - ArcGIS context
     * @returns
     */
    static fromJson(json, context) {
        // merge what we have with the default values
        const pojo = this.applyDefaults(json);
        return new HubGroup(pojo, context);
    }
    /**
     * Create a new HubGroup, returning a HubGroup instance.
     * Note: This does not persist the Group into the backing store
     * @param partialGroup
     * @param context
     * @returns
     */
    static async create(partialGroup, context, save = false) {
        const pojo = this.applyDefaults(partialGroup);
        // return an instance of HubGroup
        const instance = HubGroup.fromJson(pojo, context);
        if (save) {
            await instance.save();
        }
        return instance;
    }
    /**
     * Fetch a Group from the backing store and return a HubGroup instance.
     * @param identifier - Identifier of the group to load
     * @param context
     * @returns
     */
    static async fetch(identifier, context) {
        try {
            const group = await hubSearch.fetchHubGroup(identifier, context.hubRequestOptions);
            // create an instance of HubGroup from the group
            return HubGroup.fromJson(group, context);
        }
        catch (ex) {
            if (ex.message ===
                "COM_0003: Group does not exist or is inaccessible.") {
                throw new Error(`Group not found.`);
            }
            else {
                throw ex;
            }
        }
    }
    static applyDefaults(partialGroup) {
        // extend the partial over the defaults
        return Object.assign(Object.assign({}, hubSearch.DEFAULT_GROUP), partialGroup);
    }
    /**
     * Return the backing entity as an object literal
     */
    toJson() {
        if (this.isDestroyed) {
            throw new Error("HubGroup is already destroyed.");
        }
        return util.cloneObject(this.entity);
    }
    /**
     * Apply a new state to the instance
     * @param changes
     */
    update(changes) {
        if (this.isDestroyed) {
            throw new Error("HubGroup is already destroyed.");
        }
        // merge partial onto existing entity
        this.entity = Object.assign(Object.assign({}, this.entity), changes);
    }
    /**
     * Save the HubGroup to the backing store
     * @returns
     */
    async save() {
        if (this.isDestroyed) {
            throw new Error("HubGroup is already destroyed.");
        }
        if (this.entity.id) {
            // update it
            this.entity = await hubSearch.updateHubGroup(this.entity, this.context.userRequestOptions);
        }
        else {
            // create it
            this.entity = await hubSearch.createHubGroup(this.entity, this.context.userRequestOptions);
        }
        return;
    }
    /**
     * Delete the HubGroup from the store
     * set a flag to indicate that it is destroyed
     * @returns
     */
    async delete() {
        if (this.isDestroyed) {
            throw new Error("HubGroup is already destroyed.");
        }
        this.isDestroyed = true;
        // Delegate to module fn
        await hubSearch.deleteHubGroup(this.entity.id, this.context.userRequestOptions);
    }
    /**
     * Check if current user has a specific permission, accounting for
     * both system and entity level policies
     * @param permission
     * @returns
     */
    checkPermission(permission) {
        return checkPermission.checkPermission(permission, this.context, this.entity);
    }
    /**
     * Get all policies related to a specific permission
     * @param permission
     * @returns
     */
    getPermissionPolicies(permission) {
        const permissions = this.entity.permissions;
        return permissions.filter((p) => p.permission === permission);
    }
    /**
     * Add a policy to the entity
     * @param policy
     */
    addPermissionPolicy(policy) {
        this.entity.permissions = enrichEntity.addPermissionPolicy(this.entity.permissions, policy);
    }
    /**
     * Remove a policy from the entity
     * @param permission
     * @param id
     */
    removePermissionPolicy(permission, id) {
        this.entity.permissions = enrichEntity.removePermissionPolicy(this.entity.permissions, permission, id);
    }
    /*
     * Get the editor config for the HubGroup entity.
     * @param i18nScope translation scope to be interpolated into the uiSchema
     * @param type editor type - corresonds to the returned uiSchema
     * @param options optional hash of dynamic uiSchema element options
     */
    async getEditorConfig(i18nScope, type) {
        // delegate to the schema subsystem
        return getEditorConfig.getEditorConfig(i18nScope, type, this.entity, this.context);
    }
    /**
     * Return the group as an editor object
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
     * Load the group from the editor object
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
        if (this.thumbnailCache) {
            if (this.thumbnailCache.clear) {
                await deleteGroupThumbnail(this.entity.id, this.context.userRequestOptions);
            }
            else {
                await setGroupThumbnail(this.entity.id, this.thumbnailCache.file, this.thumbnailCache.filename, this.context.userRequestOptions, this.entity.owner);
                // Note: updating the thumbnail alone does not update the modified date of the group
                // thus we can just set props on the entity w/o re-fetching
                this.entity.thumbnail = `thumbnail/${this.thumbnailCache.filename}`;
                // Cover the Hub Group to an IGoup
                const group = HubInitiatives.convertHubGroupToGroup(this.entity);
                this.entity.thumbnailUrl = HubInitiatives.getGroupThumbnailUrl(this.context.userRequestOptions.portal, group);
                // clear the thumbnail cache
                this.thumbnailCache = null;
            }
        }
        // convert back to an entity. Apply any reverse transforms used in
        // of the toEditor method
        const entity = util.cloneObject(editor);
        // save or create group
        this.entity = entity;
        await this.save();
        return this.entity;
    }
}

exports.HubGroup = HubGroup;
