import { a as includes } from './compose-d5b83ab7.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { i as isUpdateGroup } from './is-update-group-7b9eb0ea.js';

/**
 * Checks for fundamental privilege required by all access checks
 * @param {IUser} user
 * @returns {boolean}
 */
function hasBasePriv(user) {
    const { privileges = [] } = user;
    return includes(privileges, "portal:user:createItem");
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
    const hasItemControl = includes(itemControls, itemControl);
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
            ...(getProp(item, "groupIds") || []),
            getProp(item, "properties.collaborationGroupId")
        ];
        const isGroupEditable = (group) => isUpdateGroup(group) && includes(itemGroups, group.id);
        res = userGroups.some(isGroupEditable);
    }
    return res;
}

export { canEditItem as c, hasBasePriv as h };
