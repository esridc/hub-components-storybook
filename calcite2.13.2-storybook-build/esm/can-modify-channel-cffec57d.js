import { i as isOrgAdmin, a as isOrgAdminInOrg, C as ChannelPermission } from './channel-permission-1e298c3b.js';
import { a as SharingAccess } from './utils-6bf1b713.js';

const AGO_ADMIN_GROUP_ROLES = Object.freeze(["owner", "admin"]);
/**
 * Utility to determine if User has privileges to modify a channel by legacy channel permissions
 * @param channel
 * @param user
 * @returns {boolean}
 * @internal
 * @hidden
 */
function isAuthorizedToModifyChannelByLegacyPermissions(user = {}, channel) {
    const { username, groups: userGroups = [] } = user;
    const { access, groups: channelGroups = [], orgs: channelOrgs = [], creator: channelCreator, } = channel;
    // ensure authenticated
    if (!username) {
        return false;
    }
    if (username === channelCreator) {
        return true;
    }
    if (access === SharingAccess.PRIVATE) {
        return isAuthorizedToModifyChannelByLegacyGroup(channelGroups, userGroups);
    }
    // public or org access
    return (isAuthorizedToModifyChannelByLegacyGroup(channelGroups, userGroups) ||
        isLegacyChannelOrgAdmin(channelOrgs, user));
}
/**
 * Ensure the user is an owner/admin of one of the channel groups
 */
function isAuthorizedToModifyChannelByLegacyGroup(channelGroups, userGroups) {
    return channelGroups.some((channelGroupId) => {
        return userGroups.some((group) => {
            const { id: userGroupId, userMembership: { memberType: userMemberType }, } = group;
            return (channelGroupId === userGroupId &&
                AGO_ADMIN_GROUP_ROLES.includes(userMemberType));
        });
    });
}
function isLegacyChannelOrgAdmin(channelOrgs, user) {
    return isOrgAdmin(user) && channelOrgs.includes(user.orgId);
}

/**
 * Utility to determine if User has privileges to modify a channel
 * @deprecated use `canEditChannel` or `canDeleteChannel` instead
 * @param channel
 * @param user
 * @returns {boolean}
 */
function canModifyChannel(channel, user = {}) {
    if (isOrgAdminInOrg(user, channel.orgId)) {
        return true;
    }
    if (channel.channelAcl) {
        const channelPermission = new ChannelPermission(channel);
        return channelPermission.canModerateChannel(user);
    }
    return isAuthorizedToModifyChannelByLegacyPermissions(user, channel);
}

export { canModifyChannel as c };
