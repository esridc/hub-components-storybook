'use strict';

const HubError = require('./HubError-44e07249.js');
const themes = require('./themes-d539965a.js');
const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const unshareItemFromGroups = require('./unshare-item-from-groups-3f34f54a.js');
const shareItemToGroups = require('./share-item-to-groups-6bc2a4bc.js');
const request = require('./request-67da3c71.js');
const update = require('./update-b8977041.js');
const util = require('./util-38e73510.js');
const sharedWith = require('./sharedWith-ca14e4af.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const enrichEntity = require('./enrichEntity-1632b924.js');
const access = require('./access-049994c9.js');
const get = require('./get-52661c13.js');
const update$1 = require('./update-7b2b2d9d.js');
const utils = require('./utils-7f390376.js');
const compose = require('./compose-9b4311c9.js');
const remove = require('./remove-921f5dc7.js');

/**
 * Upload a file to be used as the thumbnail for an item
 * @param id
 * @param file
 * @param filename
 * @param requestOptions
 */
async function setItemThumbnail(id, file, filename, requestOptions, owner) {
    const opts = Object.assign({ item: {
            id,
        }, owner, params: {
            thumbnail: file,
            fileName: filename,
        }, filename }, requestOptions);
    try {
        const response = await update.updateItem(opts);
        if (!response.success) {
            throw new HubError.HubError("Set Project Thumbnail", "Unknown error setting thumbnail.");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            throw new HubError.HubError("Set Project Thumbnail", err.message, err);
        }
        else {
            throw new HubError.HubError("Set Project Thumbnail", "Unknown error setting thumbnail.");
        }
    }
}

/**
 * Given an item, and owner, add a image resource to the item and returns its url
 * @param id
 * @param owner
 * @param file
 * @param filename
 * @param ro
 * @param prefix
 * @returns
 */
async function uploadImageResource(id, owner, file, filename, ro, prefix = "") {
    try {
        // Add item resource
        const response = await themes.addItemResource(Object.assign({ id,
            owner, resource: file, name: filename, prefix }, ro));
        // if err throw
        if (!response.success) {
            throw new HubError.HubError("Set Item Featured Image", "Unknown error setting featured image.");
        }
        // return url
        const portalRestUrl = getPortalApiUrl.getPortalApiUrl(ro.portal);
        if (prefix) {
            prefix = `${prefix}/`;
        }
        return `${portalRestUrl}/content/items/${id}/resources/${prefix}${filename}`;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new HubError.HubError("Set Item Featured Image", err.message, err);
        }
        else {
            throw new HubError.HubError("Set Item Featured Image", "Unknown error setting featured image.");
        }
    }
}

/**
 * Delete an item's thumbnail
 * @param id
 * @param owner
 * @param requestOptions
 * @returns
 */
async function deleteItemThumbnail(id, owner, requestOptions) {
    const { portal } = requestOptions;
    const urlPath = `${portal}/content/users/${owner}/items/${id}/deleteThumbnail`;
    return request.request(urlPath, requestOptions);
}

const FEATURED_IMAGE_FILENAME = "featuredImage.png";
/**
 * Base class for all Hub Entities backed by items
 */
class HubItemEntity {
    constructor(entity, context) {
        this.isDestroyed = false;
        this.thumbnailCache = null;
        this.context = context;
        this.entity = entity;
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
        const permissions = this.entity.permissions || [];
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
    // Although we don't expose all the properties, we do expose a few for convenience
    /**
     * Return the entity id
     */
    get id() {
        return this.entity.id;
    }
    /**
     * Return the entity owner
     */
    get owner() {
        return this.entity.owner;
    }
    //#region IWithStoreBehavior
    /**
     * Return the backing entity as an object literal
     * @returns
     */
    toJson() {
        if (this.isDestroyed) {
            throw new Error("Entity is already destroyed.");
        }
        return util.cloneObject(this.entity);
    }
    /**
     * Can the current user edit the Entity?
     * In order to edit an item, the user must be the owner of the item
     * or be a member of a shared editing group, to which the item is shared.
     * @returns
     */
    get canEdit() {
        return this.entity.canEdit;
    }
    /**
     * Can the current user delete the Entity?
     * In order to delete an item, the user must be the owner of the item or a full org_admin
     * in the owner's organization.
     * @returns
     */
    get canDelete() {
        return this.entity.canDelete;
    }
    /**
     * The orgId of the Entity, if available
     * @returns the entity orgId, when available
     */
    get orgId() {
        return this.entity.orgId;
    }
    //#endregion IWithStoreBehavior
    //#region IWithSharingBehavior
    /**
     * Share the Entity with the specified group id
     * @param groupId
     */
    async shareWithGroup(groupId) {
        if (!this.context.currentUser) {
            throw new HubError.HubError("Share Item With Group", "Cannot share item with group when no user is logged in.");
        }
        await shareItemToGroups.shareItemToGroups(this.entity.id, [groupId], this.context.requestOptions, this.entity.owner);
    }
    /**
     * Share the Entity with the specified group ids
     * @param groupIds
     */
    async shareWithGroups(groupIds) {
        await shareItemToGroups.shareItemToGroups(this.entity.id, groupIds, this.context.requestOptions, this.entity.owner);
    }
    /**
     * Unshare the Entity with the specified group id
     * @param groupId
     */
    async unshareWithGroup(groupId) {
        await unshareItemFromGroups.unshareItemFromGroups(this.entity.id, [groupId], this.context.requestOptions, this.entity.owner);
    }
    /**
     * Unshare the Entity with the specified group ids
     * @param groupIds
     */
    async unshareWithGroups(groupIds) {
        await unshareItemFromGroups.unshareItemFromGroups(this.entity.id, groupIds, this.context.requestOptions, this.entity.owner);
    }
    /**
     * Set the access level of the backing item
     * @param access
     */
    async setAccess(access$1) {
        await access.setItemAccess({
            id: this.entity.id,
            access: access$1,
            owner: this.entity.owner,
            authentication: this.context.session,
        });
        // if this succeeded, update the entity
        this.entity.access = access$1;
    }
    /**
     * Returns the followers group
     */
    async getFollowersGroup() {
        let group;
        try {
            if (this.entity.followersGroupId) {
                group = await get.getGroup(this.entity.followersGroupId, this.context.userRequestOptions);
            }
        }
        catch (error) {
            group = null;
        }
        return group;
    }
    /**
     * Sets the access level of the followers group
     * @param access
     */
    async setFollowersGroupAccess(access) {
        await update$1.updateGroup({
            group: {
                id: this.entity.followersGroupId,
                access,
            },
            authentication: this.context.session,
        });
    }
    /**
     * Sets whether or not the followers group is discussable
     * @param isDiscussable
     */
    async setFollowersGroupIsDiscussable(isDiscussable) {
        const group = await this.getFollowersGroup();
        const typeKeywords = utils.setDiscussableKeyword(group.typeKeywords, isDiscussable);
        await update$1.updateGroup({
            group: {
                id: group.id,
                typeKeywords,
            },
            authentication: this.context.session,
        });
    }
    /**
     * Return a list of groups the Entity is shared to.
     * @returns
     */
    async sharedWith() {
        // delegate to a util that merges the three arrays returned from the api, into a single array
        return sharedWith.sharedWith(this.entity.id, this.context.requestOptions);
    }
    //#endregion
    /**
     * Hook that subclasses should call to invoke shared post-save behavior
     */
    async afterSave() {
        // Handle Thumbnails
        // check if there is a thumbnail in the cache
        // if we're not making changes to the thumbnail, this prop will not be defined
        if (this.thumbnailCache) {
            if (this.thumbnailCache.clear) {
                await deleteItemThumbnail(this.entity.id, this.entity.owner, this.context.userRequestOptions);
                this.thumbnailCache = null;
                this.entity.thumbnail = null;
                this.entity.thumbnailUrl = null;
            }
            else {
                // save the thumbnail
                await setItemThumbnail(this.entity.id, this.thumbnailCache.file, this.thumbnailCache.filename, this.context.userRequestOptions, this.entity.owner);
                // Note: updating the thumbnail alone does not update the modified date of the item
                // thus we can just set props on the entity w/o re-fetching
                this.entity.thumbnail = `thumbnail/${this.thumbnailCache.filename}`;
                this.entity.thumbnailUrl = this.getThumbnailUrl();
                // clear the thumbnail cache
                this.thumbnailCache = null;
            }
        }
    }
    //#region IWithThumbnailBehavior
    /**
     * Store thumbnail information to be sent with the next `.save()` call
     * @param file
     * @param filename
     */
    setThumbnail(file, filename) {
        // subclass is responsible for handling the implementation during the `.save()` call
        this.thumbnailCache = { file, filename };
    }
    /**
     * Clear the thumbnail from the item, if one exists. Persisted on next `.save()` call
     */
    clearThumbnail() {
        this.thumbnailCache = { clear: true };
    }
    /**
     * Return the full url to the thumbnail, optionally with a width parameter
     * @param width
     */
    getThumbnailUrl(width = 200) {
        const minimalItem = {
            id: this.entity.id,
            access: this.entity.access,
            thumbnail: this.entity.thumbnail,
        };
        const opts = {
            token: this.context.session.token,
            width,
        };
        return compose.getItemThumbnailUrl(minimalItem, this.context.requestOptions, opts);
    }
    //#endregion IWithThumbnailBehavior
    //#region IWithFeaturedImageBehavior
    /**
     * Set a featured image on the Entity, if one already exists it is cleared out before the new one is set
     * to keep the number of resources in control
     * @param file
     */
    async setFeaturedImage(file, clearExisting = false) {
        var _a;
        try {
            // If we have a featured image then clear it out.
            if (((_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.featuredImageUrl) || clearExisting) {
                await this.clearFeaturedImage();
            }
            // add the new featured image
            const featuredImageUrl = await uploadImageResource(this.entity.id, this.entity.owner, file, FEATURED_IMAGE_FILENAME, this.context.userRequestOptions);
            // If successful, update the entity
            this.entity.view = Object.assign(Object.assign({}, this.entity.view), { featuredImageUrl });
            // save the entity
            await this.save();
        }
        catch (err) {
            // If the featured image url has been cleared, but the resource hasn't
            // Been removed then we'll get the following error message.
            // In that case, we'll try again with clearExisting set to true.
            if (err instanceof Error &&
                err.message === "CONT_00942: Resource already present") {
                return this.setFeaturedImage(file, true);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Remove the featured image from the item
     */
    async clearFeaturedImage() {
        try {
            // remove the resource
            const response = await remove.removeItemResource(Object.assign({ id: this.entity.id, owner: this.entity.owner, resource: FEATURED_IMAGE_FILENAME }, this.context.userRequestOptions));
            // if not successful throw an error
            if (response && !response.success) {
                throw new HubError.HubError("Clear Item Featured Image", "Unknown error clearing featured image.");
            }
            // If successful, clear the featured image url
            this.entity.view.featuredImageUrl = null;
            // save the entity
            await this.save();
        }
        catch (err) {
            if (err instanceof Error) {
                throw new HubError.HubError("Clear Item Featured Image", err.message, err);
            }
            else {
                throw new HubError.HubError("Clear Item Featured Image", "Unknown error clearing featured image.");
            }
        }
    }
    //#endregion IWithFeaturedImageBehavior
    /**
     * Updates the isDiscussable property
     * @param isDiscussable whether to enable or disable discussions
     */
    updateIsDiscussable(isDiscussable) {
        const typeKeywords = utils.setDiscussableKeyword(this.entity.typeKeywords, isDiscussable);
        this.update({ typeKeywords, isDiscussable });
    }
}

/**
 * Get the user-editable portion of an entity's slug
 * @param entity
 * @returns
 */
const getEditorSlug = (entity) => {
    const { slug = "", orgUrlKey } = entity;
    return slug.replace(`${orgUrlKey}|`, "");
};

exports.HubItemEntity = HubItemEntity;
exports.deleteItemThumbnail = deleteItemThumbnail;
exports.getEditorSlug = getEditorSlug;
exports.setItemThumbnail = setItemThumbnail;
exports.uploadImageResource = uploadImageResource;
