'use strict';

const checkPermission = require('./checkPermission-11ab5992.js');

/**
 * Fetches a well known group template based on a name
 *
 * @param groupType String of the group type to get
 * @returns Group template
 */
function getWellKnownGroup(groupType, context) {
    const configs = {
        hubGroup: {
            access: "private",
            autoJoin: false,
            isSharedUpdate: false,
            isInvitationOnly: false,
            hiddenMembers: false,
            isViewOnly: false,
            leavingDisallowed: false,
            tags: ["Hub Group"],
            membershipAccess: "organization",
        },
        hubViewGroup: {
            access: "org",
            autoJoin: false,
            isSharedUpdate: false,
            isInvitationOnly: false,
            hiddenMembers: false,
            isViewOnly: false,
            leavingDisallowed: false,
            tags: ["Hub Group"],
            membershipAccess: checkPermission.checkPermission("platform:portal:user:addExternalMembersToGroup", context).access
                ? "anyone"
                : "organization",
        },
        hubEditGroup: {
            access: "org",
            autoJoin: false,
            isSharedUpdate: true,
            isInvitationOnly: false,
            hiddenMembers: false,
            isViewOnly: false,
            leavingDisallowed: false,
            tags: ["Hub Group"],
            membershipAccess: checkPermission.checkPermission("platform:portal:user:addExternalMembersToGroup", context).access
                ? "collaborators"
                : "organization",
        },
        hubFollowersGroup: {
            access: "public",
            autoJoin: true,
            isInvitationOnly: false,
            isViewOnly: true,
            leavingDisallowed: false,
        },
        hubAssociationsGroup: {
            access: "public",
            autoJoin: false,
            isInvitationOnly: false,
            isViewOnly: true,
            leavingDisallowed: false,
            membershipAccess: checkPermission.checkPermission("platform:portal:user:addExternalMembersToGroup", context).access
                ? "anyone"
                : "organization",
            protected: true,
        },
    };
    return configs[groupType];
}

exports.getWellKnownGroup = getWellKnownGroup;
