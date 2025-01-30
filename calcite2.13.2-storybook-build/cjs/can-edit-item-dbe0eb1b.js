'use strict';

const compose = require('./compose-9b4311c9.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const isUpdateGroup = require('./is-update-group-36bf5d24.js');

/**
 * Checks for fundamental privilege required by all access checks
 * @param {IUser} user
 * @returns {boolean}
 */
function hasBasePriv(user) {
    const { privileges = [] } = user;
    return compose.includes(privileges, "portal:user:createItem");
}

/**
 * Checks if user has access to edit an item in Hub
 * @param {IItem} item
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditItem(item, user) {
    let res = false;
    const itemControls = ["admin", "update"];
    const { itemControl, owner, orgId: itemOrgId } = item;
    const { roleId, role, username, groups: userGroups, orgId: userOrgId } = user;
    const hasItemControl = compose.includes(itemControls, itemControl);
    const isOwner = !!owner && owner === username;
    const isOrgItem = !!itemOrgId && itemOrgId === userOrgId;
    const isItemOrgAdmin = !!isOrgItem && !roleId && role === "org_admin";
    const hasPlatformControl = hasItemControl || isOwner || isItemOrgAdmin;
    const hasPriv = hasBasePriv(user);
    if (hasPriv && hasPlatformControl) {
        res = true;
    }
    else if (hasPriv) {
        const itemGroups = [
            ...(getProp.getProp(item, "groupIds") || []),
            getProp.getProp(item, "properties.collaborationGroupId")
        ];
        const isGroupEditable = (group) => isUpdateGroup.isUpdateGroup(group) && compose.includes(itemGroups, group.id);
        res = userGroups.some(isGroupEditable);
    }
    return res;
}

exports.canEditItem = canEditItem;
exports.hasBasePriv = hasBasePriv;
