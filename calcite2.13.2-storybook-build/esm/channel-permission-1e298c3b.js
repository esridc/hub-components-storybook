import { _ as __rest } from './tslib.es6-0e03e357.js';
import { R as Role, A as AclCategory, C as CANNOT_DISCUSS, e as AclSubCategory } from './utils-6bf1b713.js';

/**
 * Utility that returns reducer function that filters a user's groups
 * by membership type and produces an array of group id's
 *
 *
 * @export
 * @param {GroupMembership[]} membershipTypes
 * @return {*}  {((memo: string[], group: IGroup) => string[])}
 */
/**
 * Utility that checks if a user is a portal org admin, or an org_admin by a platform role
 *
 * @export
 * @param {IUser} user
 * @return {*}  {boolean}
 */
// NOTE: this is not the same as @esri/arcgis-rest-portal isOrgAdmin,
// which first resolves `user` from `IUserRequestOptions` to make this determination
// https://github.com/Esri/arcgis-rest-js/blob/7ab072184f89dcb35367518101ee4abeb5a9d112/packages/arcgis-rest-portal/src/sharing/helpers.ts#L45
function isOrgAdmin(user) {
    return user.role === "org_admin";
}
function isUserInOrg(user = {}, orgId) {
    return user.orgId === orgId;
}
function isOrgAdminInOrg(user, orgId) {
    return isOrgAdmin(user) && isUserInOrg(user, orgId);
}
function userHasPrivilege(user = {}, privilege) {
    var _a;
    return !!((_a = user.privileges) === null || _a === void 0 ? void 0 : _a.includes(privilege));
}
function userHasPrivileges(user = {}, privileges) {
    return privileges.every((privilege) => userHasPrivilege(user, privilege));
}

// TODO: V2 use IUpdateChannel as param type when hoisted to hub.js from service
function dtoToChannel(dto) {
    const { channelAclDefinition } = dto, rest = __rest(dto, ["channelAclDefinition"]);
    return Object.assign(Object.assign({}, rest), { channelAcl: channelAclDefinition });
}

var ChannelAction;
(function (ChannelAction) {
    ChannelAction["READ_POSTS"] = "readPosts";
    ChannelAction["WRITE_POSTS"] = "writePosts";
    ChannelAction["MODERATE_CHANNEL"] = "moderateChannel";
    ChannelAction["IS_MODERATOR"] = "isModerator";
    ChannelAction["IS_MANAGER"] = "isManager";
    ChannelAction["IS_OWNER"] = "isOwner";
})(ChannelAction || (ChannelAction = {}));
// See confluence for privs documentation: https://confluencewikidev.esri.com/pages/viewpage.action?pageId=153747776#Roles&Privileges-ApplicationtoChannels
const CHANNEL_ACTION_PRIVS = {
    // permissions
    UPDATE_OWNERS: [Role.OWNER],
    UPDATE_MANAGERS: [Role.OWNER, Role.MANAGE],
    UPDATE_MODERATORS: [Role.OWNER, Role.MANAGE],
    UPDATE_ORGS: [Role.OWNER, Role.MANAGE],
    UPDATE_GROUPS: [Role.OWNER, Role.MANAGE],
    UPDATE_USERS: [Role.OWNER, Role.MANAGE],
    UPDATE_AUTHENTICATED_USERS: [Role.OWNER, Role.MANAGE],
    UPDATE_ANONYMOUS_USERS: [Role.OWNER, Role.MANAGE],
    // settings
    UPDATE_POST_REPLIES: [Role.OWNER, Role.MANAGE, Role.MODERATE],
    UPDATE_POST_REACTIONS: [Role.OWNER, Role.MANAGE, Role.MODERATE],
    UPDATE_POST_AS_ANONYMOUS: [Role.OWNER, Role.MANAGE, Role.MODERATE],
    UPDATE_ALLOWED_REACTIONS: [Role.OWNER, Role.MANAGE, Role.MODERATE],
    UPDATE_DEFAULT_POST_STATUS: [Role.OWNER, Role.MANAGE, Role.MODERATE],
    UPDATE_BLOCKED_WORDS: [Role.OWNER, Role.MANAGE, Role.MODERATE],
    UPDATE_CHANNEL_NAME: [Role.OWNER, Role.MANAGE],
    UPDATE_SOFT_DELETE_SETTING: [Role.OWNER, Role.MANAGE],
};
/**
 * @internal
 * @hidden
 */
class ChannelPermission {
    constructor(channel) {
        this.ALLOWED_GROUP_MEMBER_TYPES = ["owner", "admin", "member"];
        if (channel.channelAcl === undefined) {
            throw new Error("channel.channelAcl is required for ChannelPermission checks");
        }
        this.existingChannel = channel;
        this.isChannelAclEmpty = channel.channelAcl.length === 0;
        this.permissionsByCategory = {};
        this.channelCreator = channel.creator;
        this.channelOrgId = channel.orgId;
        channel.channelAcl.forEach((permission) => {
            var _c;
            const { category } = permission;
            ((_c = this.permissionsByCategory[category]) === null || _c === void 0 ? void 0 : _c.push(permission)) ||
                (this.permissionsByCategory[category] = [permission]);
        });
    }
    canPostToChannel(user) {
        if (this.canAnyUser(ChannelAction.WRITE_POSTS)) {
            return true;
        }
        if (this.isUserUnAuthenticated(user)) {
            return false;
        }
        return (this.canAnyAuthenticatedUser(ChannelAction.WRITE_POSTS) ||
            this.canSomeUser(ChannelAction.WRITE_POSTS, user) ||
            this.canSomeUserGroup(ChannelAction.WRITE_POSTS, user) ||
            this.canSomeUserOrg(ChannelAction.WRITE_POSTS, user));
    }
    canCreateChannel(user) {
        if (this.isUserUnAuthenticated(user) || this.isChannelAclEmpty) {
            return false;
        }
        return (this.userCanAddAnonymousToAcl(user) &&
            this.userCanAddUnauthenticatedToAcl(user) &&
            this.userCanAddAllGroupsToAcl(user) &&
            this.userCanAddAllOrgsToAcl(user) &&
            this.userCanAddUsersToAcl(user));
    }
    canModerateChannel(user) {
        if (this.isUserUnAuthenticated(user)) {
            return false;
        }
        return (user.username === this.channelCreator ||
            this.canSomeUser(ChannelAction.MODERATE_CHANNEL, user) ||
            this.canSomeUserGroup(ChannelAction.MODERATE_CHANNEL, user) ||
            this.canSomeUserOrg(ChannelAction.MODERATE_CHANNEL, user));
    }
    canReadChannel(user) {
        if (this.canAnyUser(ChannelAction.READ_POSTS)) {
            return true;
        }
        if (this.isUserUnAuthenticated(user)) {
            return false;
        }
        return (this.canAnyAuthenticatedUser(ChannelAction.READ_POSTS) ||
            this.canSomeUser(ChannelAction.READ_POSTS, user) ||
            this.canSomeUserGroup(ChannelAction.READ_POSTS, user) ||
            this.canSomeUserOrg(ChannelAction.READ_POSTS, user));
    }
    canUpdateProperties(user, updateData = {}) {
        if (Object.keys(updateData).length === 0) {
            return true;
        }
        const userRole = this.determineUserRole(user);
        const updates = dtoToChannel(updateData);
        if (
        // settings
        (this.isChanged(updates.allowReply, this.existingChannel.allowReply) &&
            !CHANNEL_ACTION_PRIVS.UPDATE_POST_REPLIES.includes(userRole)) ||
            (this.isChanged(updates.allowReaction, this.existingChannel.allowReaction) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_POST_REACTIONS.includes(userRole)) ||
            (this.isChanged(updates.allowAsAnonymous, this.existingChannel.allowAsAnonymous) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_POST_AS_ANONYMOUS.includes(userRole)) ||
            (this.isStringArrayChanged(updates.allowedReactions, this.existingChannel.allowedReactions) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_ALLOWED_REACTIONS.includes(userRole)) ||
            (this.isChanged(updates.defaultPostStatus, this.existingChannel.defaultPostStatus) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_DEFAULT_POST_STATUS.includes(userRole)) ||
            (this.isStringArrayChanged(updates.blockWords, this.existingChannel.blockWords) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_BLOCKED_WORDS.includes(userRole)) ||
            (this.isChanged(updates.name, this.existingChannel.name) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_CHANNEL_NAME.includes(userRole)) ||
            (this.isChanged(updates.softDelete, this.existingChannel.softDelete) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_SOFT_DELETE_SETTING.includes(userRole)) ||
            // permissions
            (this.isRoleChanged(Role.OWNER, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_OWNERS.includes(userRole)) ||
            (this.isRoleChanged(Role.MANAGE, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_MANAGERS.includes(userRole)) ||
            (this.isRoleChanged(Role.MODERATE, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_MODERATORS.includes(userRole)) ||
            (this.isCategoryChanged(AclCategory.ORG, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_ORGS.includes(userRole)) ||
            (this.isCategoryChanged(AclCategory.GROUP, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_GROUPS.includes(userRole)) ||
            (this.isCategoryChanged(AclCategory.USER, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_USERS.includes(userRole)) ||
            (this.isCategoryChanged(AclCategory.AUTHENTICATED_USER, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_AUTHENTICATED_USERS.includes(userRole)) ||
            (this.isCategoryChanged(AclCategory.ANONYMOUS_USER, updates.channelAcl) &&
                !CHANNEL_ACTION_PRIVS.UPDATE_ANONYMOUS_USERS.includes(userRole))) {
            return false;
        }
        return true;
    }
    isChanged(updateValue, existingValue) {
        return updateValue !== undefined && updateValue !== existingValue;
    }
    isStringArrayChanged(_a, _b) {
        const a = _a !== null && _a !== void 0 ? _a : [];
        const b = _b !== null && _b !== void 0 ? _b : [];
        return (a.filter((x) => !b.includes(x)).length !== 0 ||
            b.filter((x) => !a.includes(x)).length !== 0);
    }
    isRoleChanged(role, aclUpdates) {
        if (!aclUpdates) {
            return false;
        }
        // ex: ['org_admin_1111_owner', 'group_admin_222_owner', 'user_undefined_333_owner]
        const existing = this.existingChannel.channelAcl
            .filter((acl) => acl.role === role)
            .map((acl) => `${acl.category}_${acl.subCategory}_${acl.key}_${role}`);
        const changed = aclUpdates
            .filter((acl) => acl.role === role)
            .map((acl) => `${acl.category}_${acl.subCategory}_${acl.key}_${role}`);
        return this.isStringArrayChanged(existing, changed);
    }
    isCategoryChanged(category, aclUpdates) {
        var _c;
        if (!aclUpdates) {
            return false;
        }
        // ex: ['org_admin_111_OWNER', 'org_member_111_readWrite', 'group_member_2222_read']
        const existing = ((_c = this.permissionsByCategory[category]) !== null && _c !== void 0 ? _c : []).map((acl) => `${category}_${acl.subCategory}_${acl.key}_${acl.role}`);
        const changed = aclUpdates
            .filter((acl) => acl.category === category)
            .map((acl) => `${category}_${acl.subCategory}_${acl.key}_${acl.role}`);
        return this.isStringArrayChanged(existing, changed);
    }
    canAnyUser(action) {
        var _c;
        const anonymousUserRole = (_c = this.permissionsByCategory[AclCategory.ANONYMOUS_USER]) === null || _c === void 0 ? void 0 : _c[0].role;
        return channelActionLookup(action).includes(anonymousUserRole);
    }
    canAnyAuthenticatedUser(action) {
        var _c;
        const role = (_c = this.permissionsByCategory[AclCategory.AUTHENTICATED_USER]) === null || _c === void 0 ? void 0 : _c[0].role;
        return channelActionLookup(action).includes(role);
    }
    canSomeUser(action, user) {
        var _c;
        const userPermissions = (_c = this.permissionsByCategory[AclCategory.USER]) !== null && _c !== void 0 ? _c : [];
        const username = user.username;
        return userPermissions.some((permission) => {
            const { role, key } = permission;
            return key === username && channelActionLookup(action).includes(role);
        });
    }
    canSomeUserGroup(action, user) {
        var _c;
        const groupAccessControls = (_c = this.permissionsByCategory[AclCategory.GROUP]) !== null && _c !== void 0 ? _c : [];
        const userGroupsById = this.mapUserGroupsById(user.groups);
        return groupAccessControls.some((permission) => {
            const group = userGroupsById[permission.key];
            if (action === ChannelAction.READ_POSTS) {
                if (!group) {
                    return false;
                }
            }
            else {
                if (!group || !isGroupDiscussable(group)) {
                    return false;
                }
            }
            return (doesPermissionAllowGroupMemberType(permission, group) &&
                channelActionLookup(action).includes(permission.role));
        });
    }
    canSomeUserOrg(action, user) {
        var _c;
        const orgPermissions = (_c = this.permissionsByCategory[AclCategory.ORG]) !== null && _c !== void 0 ? _c : [];
        return orgPermissions.some((permission) => {
            if (permission.key !== user.orgId) {
                return false;
            }
            return (doesPermissionAllowOrgRole(permission, user) &&
                channelActionLookup(action).includes(permission.role));
        });
    }
    userCanAddAnonymousToAcl(user) {
        if (!this.permissionsByCategory[AclCategory.ANONYMOUS_USER]) {
            return true;
        }
        return (isOrgAdmin(user) ||
            userHasPrivilege(user, "portal:admin:shareToPublic") ||
            userHasPrivilege(user, "portal:user:shareToPublic"));
    }
    userCanAddUnauthenticatedToAcl(user) {
        if (!this.permissionsByCategory[AclCategory.AUTHENTICATED_USER]) {
            return true;
        }
        return (isOrgAdmin(user) ||
            userHasPrivilege(user, "portal:admin:shareToPublic") ||
            userHasPrivilege(user, "portal:user:shareToPublic"));
    }
    userCanAddAllGroupsToAcl(user) {
        const groupPermissions = this.permissionsByCategory[AclCategory.GROUP];
        const userGroupsById = this.mapUserGroupsById(user.groups);
        if (!groupPermissions) {
            return true;
        }
        return groupPermissions.every((permission) => {
            const userGroup = userGroupsById[permission.key];
            return (userGroup &&
                this.isMemberTypeAuthorized(userGroup) &&
                isGroupDiscussable(userGroup));
        });
    }
    userCanAddAllOrgsToAcl(user) {
        const orgPermissions = this.permissionsByCategory[AclCategory.ORG];
        if (!orgPermissions) {
            return true;
        }
        return ((isOrgAdmin(user) ||
            userHasPrivilege(user, "portal:admin:shareToOrg") ||
            userHasPrivilege(user, "portal:user:shareToOrg")) &&
            this.isEveryPermissionForUserOrg(user.orgId, orgPermissions));
    }
    isEveryPermissionForUserOrg(userOrgId, orgPermissions) {
        return orgPermissions.every((permission) => {
            const { key: orgId } = permission;
            return userOrgId === orgId;
        });
    }
    // for now user permissions are disabled on channel create
    // since users are not notified and cannot opt out
    userCanAddUsersToAcl(user) {
        const userPermissions = this.permissionsByCategory[AclCategory.USER];
        return !userPermissions;
    }
    isUserUnAuthenticated(user) {
        return user.username === null || user.username === undefined;
    }
    mapUserGroupsById(groups) {
        return groups.reduce((accum, userGroup) => {
            accum[userGroup.id] = userGroup;
            return accum;
        }, {});
    }
    isMemberTypeAuthorized(userGroup) {
        const { userMembership: { memberType }, } = userGroup;
        return this.ALLOWED_GROUP_MEMBER_TYPES.includes(memberType);
    }
    determineUserRole(user) {
        if (this.isOwner(user)) {
            return Role.OWNER;
        }
        else if (this.isManager(user)) {
            return Role.MANAGE;
        }
        else if (this.isModerator(user)) {
            return Role.MODERATE;
        }
        else {
            return Role.READ;
        }
    }
    isOwner(user) {
        return (this.canSomeUser(ChannelAction.IS_OWNER, user) ||
            this.canSomeUserGroup(ChannelAction.IS_OWNER, user) ||
            this.canSomeUserOrg(ChannelAction.IS_OWNER, user));
    }
    isManager(user) {
        return (this.canSomeUser(ChannelAction.IS_MANAGER, user) ||
            this.canSomeUserGroup(ChannelAction.IS_MANAGER, user) ||
            this.canSomeUserOrg(ChannelAction.IS_MANAGER, user));
    }
    isModerator(user) {
        return (this.canSomeUser(ChannelAction.IS_MODERATOR, user) ||
            this.canSomeUserGroup(ChannelAction.IS_MODERATOR, user) ||
            this.canSomeUserOrg(ChannelAction.IS_MODERATOR, user));
    }
}
function isGroupDiscussable(userGroup) {
    const { typeKeywords = [] } = userGroup;
    return !typeKeywords.includes(CANNOT_DISCUSS);
}
function doesPermissionAllowGroupMemberType(permission, group) {
    if (permission.category !== AclCategory.GROUP ||
        group.userMembership.memberType === "none") {
        return false;
    }
    return (
    // group owners and admins can do anything permissioned with SubCategory "member"
    group.userMembership.memberType === "owner" ||
        group.userMembership.memberType === "admin" ||
        permission.subCategory === AclSubCategory.MEMBER);
}
function doesPermissionAllowOrgRole(permission, user) {
    return (permission.category === AclCategory.ORG &&
        (permission.subCategory === AclSubCategory.MEMBER ||
            (permission.subCategory === AclSubCategory.ADMIN && isOrgAdmin(user))));
}
function channelActionLookup(action) {
    if (action === ChannelAction.WRITE_POSTS) {
        return [Role.WRITE, Role.READWRITE, Role.MODERATE, Role.MANAGE, Role.OWNER];
    }
    if (action === ChannelAction.MODERATE_CHANNEL) {
        return [Role.MODERATE, Role.MANAGE, Role.OWNER];
    }
    if (action === ChannelAction.IS_MODERATOR) {
        return [Role.MODERATE];
    }
    if (action === ChannelAction.IS_MANAGER) {
        return [Role.MANAGE];
    }
    if (action === ChannelAction.IS_OWNER) {
        return [Role.OWNER];
    }
    // default to read action
    return [Role.READ, Role.READWRITE, Role.MODERATE, Role.MANAGE, Role.OWNER];
}

export { ChannelPermission as C, isOrgAdminInOrg as a, isUserInOrg as b, isOrgAdmin as i, userHasPrivileges as u };
