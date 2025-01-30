import { S as SitesPermissionPolicies, P as ProjectPermissionPolicies, I as InitiativePermissionPolicies, a as PagePermissionPolicies, T as TemplatePermissionPolicies, b as SitePermissions, c as ProjectPermissions, d as InitiativePermissions, e as PagePermissions, f as TemplatePermissions } from './TemplateBusinessRules-0e35d61b.js';
import { I as InitiativeTemplatePermissionPolicies, a as InitiativeTemplatePermissions } from './InitiativeTemplateBusinessRules-e78cc3ef.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { m as mapBy } from './map-by-a2234e13.js';

/**
 * Discussion Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const DiscussionPermissions = [
    "hub:discussion",
    "hub:discussion:create",
    "hub:discussion:delete",
    "hub:discussion:edit",
    "hub:discussion:view",
    "hub:discussion:owner",
    "hub:discussion:canChangeAccess",
    "hub:discussion:workspace:overview",
    "hub:discussion:workspace:dashboard",
    "hub:discussion:workspace:details",
    "hub:discussion:workspace:settings",
    "hub:discussion:workspace:collaborators",
    "hub:discussion:workspace:discussion",
    "hub:discussion:workspace:metrics",
    "hub:discussion:manage",
    "temp:hub:discussion:create",
];
/**
 * Discussion permission policies
 * @private
 */
const DiscussionPermissionPolicies = [
    {
        permission: "hub:discussion",
        services: ["discussions"],
    },
    {
        permission: "hub:discussion:create",
        dependencies: ["hub:discussion"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
        licenses: ["hub-premium"],
    },
    {
        permission: "hub:discussion:view",
        dependencies: ["hub:discussion"],
        authenticated: false,
        licenses: ["hub-basic", "hub-premium"],
    },
    {
        permission: "hub:discussion:edit",
        authenticated: true,
        dependencies: ["hub:discussion"],
        entityEdit: true,
        licenses: ["hub-premium"],
    },
    {
        permission: "hub:discussion:delete",
        authenticated: true,
        dependencies: ["hub:discussion"],
        entityDelete: true,
        licenses: ["hub-premium"],
    },
    {
        permission: "hub:discussion:owner",
        dependencies: ["hub:discussion"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:discussion:canChangeAccess",
        dependencies: ["hub:discussion"],
        authenticated: true,
        assertions: [
            {
                property: "context:currentUser.privileges",
                type: "contains-some",
                value: [
                    "portal:admin:shareToPublic",
                    "portal:admin:shareToOrg",
                    "portal:user:shareToPublic",
                    "portal:user:shareToOrg",
                ],
            },
            {
                property: "entity:itemControl",
                type: "eq",
                value: "admin",
            },
        ],
    },
    {
        permission: "hub:discussion:workspace:overview",
        dependencies: ["hub:discussion:view"],
    },
    {
        permission: "hub:discussion:workspace:dashboard",
        dependencies: ["hub:discussion:view"],
    },
    {
        permission: "hub:discussion:workspace:details",
        dependencies: ["hub:discussion:edit"],
    },
    {
        permission: "hub:discussion:workspace:settings",
        dependencies: ["hub:discussion:edit"],
    },
    {
        permission: "hub:discussion:workspace:collaborators",
        dependencies: ["hub:discussion:edit"],
    },
    {
        permission: "hub:discussion:workspace:discussion",
        dependencies: ["hub:discussion:edit"],
    },
    {
        permission: "hub:discussion:workspace:metrics",
        dependencies: ["hub:discussion:edit"],
    },
    {
        permission: "hub:discussion:manage",
        dependencies: ["hub:discussion:edit"],
    },
];

/**
 * Default features for a Content item. Intentionally empty to prevent overriding and adding features
 */
/**
 * Content Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const ContentPermissions = [
    "hub:content:create",
    "hub:content:delete",
    "hub:content:edit",
    "hub:content:view",
    "hub:content:canChangeAccess",
    "hub:content:workspace",
    "hub:content:workspace:overview",
    "hub:content:workspace:dashboard",
    "hub:content:workspace:details",
    "hub:content:workspace:discussion",
    "hub:content:workspace:settings",
    "hub:content:workspace:settings:schedule",
    "hub:content:workspace:collaborators",
    "hub:content:manage",
    "hub:content:canRecordDownloadErrors",
    "hub:content:downloads:displayErrors",
    "hub:content:document:create",
];
/**
 * Content permission policies
 * No need to specify license for permissions that are available to all licenses
 * @private
 */
const ContentPermissionPolicies = [
    {
        permission: "hub:content",
        services: ["portal"],
    },
    {
        permission: "hub:content:create",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "hub:content:view",
        services: ["portal"],
        authenticated: false,
    },
    {
        permission: "hub:content:edit",
        authenticated: true,
        services: ["portal"],
        entityEdit: true,
    },
    {
        permission: "hub:content:delete",
        authenticated: true,
        services: ["portal"],
        entityDelete: true,
    },
    {
        permission: "hub:content:canChangeAccess",
        dependencies: ["hub:content"],
        authenticated: true,
        assertions: [
            {
                property: "context:currentUser.privileges",
                type: "contains-some",
                value: [
                    "portal:admin:shareToPublic",
                    "portal:admin:shareToOrg",
                    "portal:user:shareToPublic",
                    "portal:user:shareToOrg",
                ],
            },
            {
                property: "entity:itemControl",
                type: "eq",
                value: "admin",
            },
        ],
    },
    {
        permission: "hub:content:workspace",
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:content:workspace:overview",
        availability: ["alpha"],
        dependencies: ["hub:content:workspace", "hub:content:view"],
    },
    {
        permission: "hub:content:workspace:dashboard",
        dependencies: ["hub:content:workspace", "hub:content:view"],
    },
    {
        permission: "hub:content:workspace:details",
        dependencies: ["hub:content:workspace", "hub:content:edit"],
    },
    {
        permission: "hub:content:workspace:discussion",
        dependencies: ["hub:content:workspace", "hub:content:edit"],
    },
    {
        permission: "hub:content:workspace:settings",
        dependencies: ["hub:content:workspace", "hub:content:edit"],
    },
    {
        permission: "hub:content:workspace:settings:schedule",
        dependencies: ["hub:content:workspace:settings"],
        environments: ["devext", "qaext", "production"],
        services: ["hub-downloads"],
    },
    {
        permission: "hub:content:workspace:collaborators",
        dependencies: ["hub:content:workspace", "hub:content:edit"],
    },
    {
        permission: "hub:content:manage",
        dependencies: ["hub:content:edit"],
    },
    {
        permission: "hub:content:canRecordDownloadErrors",
        environments: ["qaext", "devext"],
    },
    {
        permission: "hub:content:downloads:displayErrors",
        availability: ["alpha"],
        environments: ["qaext", "devext"],
    },
    // Specific permission for creating documents
    {
        permission: "hub:content:document:create",
        dependencies: ["hub:content:create"],
    },
];

/**
 * Group Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const GroupPermissions = [
    "hub:group",
    "hub:group:create",
    "hub:group:create:view",
    "hub:group:create:edit",
    "hub:group:delete",
    "hub:group:edit",
    "hub:group:view",
    "hub:group:owner",
    "hub:group:canChangeAccess",
    "hub:group:canAssignMembers",
    "hub:group:workspace",
    "hub:group:workspace:overview",
    "hub:group:workspace:dashboard",
    "hub:group:workspace:details",
    "hub:group:workspace:discussion",
    "hub:group:workspace:settings",
    "hub:group:workspace:collaborators",
    "hub:group:workspace:content",
    "hub:group:workspace:members",
    "hub:group:shareContent",
    "hub:group:manage",
];
/**
 * Group permission policies
 * @private
 */
const GroupPermissionPolicies = [
    {
        permission: "hub:group",
        services: ["portal"],
    },
    // general permission to create a group
    {
        permission: "hub:group:create",
        dependencies: ["hub:group"],
        authenticated: true,
        privileges: ["portal:user:createGroup"],
        assertions: [
            {
                property: "context:currentUser.groups",
                type: "length-lt",
                value: "context:portal.limits.MaxNumUserGroups",
            },
        ],
    },
    // permission to create a view group
    {
        permission: "hub:group:create:view",
        dependencies: ["hub:group:create"],
    },
    // permission to create an edit group
    {
        permission: "hub:group:create:edit",
        dependencies: ["hub:group:create"],
        privileges: ["portal:admin:createUpdateCapableGroup"],
    },
    {
        permission: "hub:group:view",
        dependencies: ["hub:group"],
    },
    // permission to update a group's metadata
    {
        permission: "hub:group:edit",
        dependencies: ["hub:group"],
        authenticated: true,
        assertions: [
            // if the user is not a group admin, they must
            // have the portal:admin:updateGroups privilege
            {
                conditions: [
                    {
                        property: "context:currentUser",
                        type: "is-not-group-admin",
                        value: "entity:id",
                    },
                ],
                property: "context:currentUser.privileges",
                type: "contains",
                value: ["portal:admin:updateGroups"],
            },
            // if the user does not have the portal:admin:updateGroups
            // privilege, they must be a group admin
            {
                conditions: [
                    {
                        property: "context:currentUser.privileges",
                        type: "without",
                        value: ["portal:admin:updateGroups"],
                    },
                ],
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:id",
            },
        ],
    },
    // permission to delete a group
    {
        permission: "hub:group:delete",
        dependencies: ["hub:group"],
        authenticated: true,
        assertions: [
            // if the user is not a group admin (owner or manager),
            // they must have the portal:admin:deleteGroups priv
            {
                conditions: [
                    {
                        property: "context:currentUser",
                        type: "is-not-group-admin",
                        value: "entity:id",
                    },
                ],
                property: "context:currentUser.privileges",
                type: "contains",
                value: ["portal:admin:deleteGroups"],
            },
            // if the user does not have the portal:admin:deleteGroups
            // priv, they must be the group admin (owner or manager)
            {
                conditions: [
                    {
                        property: "context:currentUser.privileges",
                        type: "without",
                        value: ["portal:admin:deleteGroups"],
                    },
                ],
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:id",
            },
        ],
    },
    // permission to manage a group (via workspace)
    // note: pane actions are further gated individually
    {
        permission: "hub:group:manage",
        assertions: [
            // if the user is not a group admin,
            // they must have one of the necessary
            // privileges
            {
                conditions: [
                    {
                        property: "context:currentUser",
                        type: "is-not-group-admin",
                        value: "entity:id",
                    },
                ],
                property: "context:currentUser.privileges",
                type: "contains-some",
                value: [
                    "portal:admin:updateGroups",
                    "portal:admin:deleteGroups",
                    "portal:admin:assignToGroups",
                    "portal:admin:shareToGroup",
                ],
            },
            // if the user does not have one of the
            // necessary privileges, they must be a
            // group admin
            {
                conditions: [
                    {
                        property: "context:currentUser.privileges",
                        type: "without",
                        value: [
                            "portal:admin:updateGroups",
                            "portal:admin:deleteGroups",
                            "portal:admin:assignToGroups",
                            "portal:admin:shareToGroup",
                        ],
                    },
                ],
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:id",
            },
        ],
    },
    {
        permission: "hub:group:owner",
        dependencies: ["hub:group"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:group:canChangeAccess",
        dependencies: ["hub:group:edit"],
    },
    // permission to add/remove group members,
    // and update member role
    {
        permission: "hub:group:canAssignMembers",
        dependencies: ["hub:group"],
        authenticated: true,
        assertions: [
            // if the user is not a group admin, they must
            // have the portal:admin:assignToGroups privilege
            {
                conditions: [
                    {
                        property: "context:currentUser",
                        type: "is-not-group-admin",
                        value: "entity:id",
                    },
                ],
                property: "context:currentUser.privileges",
                type: "contains",
                value: ["portal:admin:assignToGroups"],
            },
            // if the user does not have the portal:admin:assignToGroups
            // privilege, they must be a group admin
            {
                conditions: [
                    {
                        property: "context:currentUser.privileges",
                        type: "without",
                        value: ["portal:admin:assignToGroups"],
                    },
                ],
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:id",
            },
        ],
    },
    {
        permission: "hub:group:workspace",
        dependencies: ["hub:feature:workspace", "hub:group:manage"],
    },
    {
        permission: "hub:group:workspace:overview",
        availability: ["alpha"],
        dependencies: ["hub:group:workspace"],
    },
    {
        permission: "hub:group:workspace:details",
        dependencies: ["hub:group:workspace"],
    },
    {
        permission: "hub:group:workspace:discussion",
        dependencies: ["hub:group:workspace"],
    },
    {
        permission: "hub:group:workspace:settings",
        dependencies: ["hub:group:workspace"],
    },
    {
        permission: "hub:group:workspace:content",
        dependencies: ["hub:group:workspace"],
    },
    {
        permission: "hub:group:workspace:members",
        dependencies: ["hub:group:workspace"],
    },
    // permission to check if you can add/remove content from groups
    {
        permission: "hub:group:shareContent",
        dependencies: ["hub:group"],
        authenticated: true,
        privileges: ["portal:user:shareToGroup"],
        assertions: [
            // If user is not a group member (owner, manager, or member),
            // they must have the portal:admin:shareToGroup privilege
            {
                conditions: [
                    {
                        property: "context:currentUser",
                        type: "is-not-group-member",
                        value: "entity:id",
                    },
                ],
                property: "context:currentUser.privileges",
                type: "contains",
                value: ["portal:admin:shareToGroup"],
            },
            // If the group is not view only, any group member
            // can share content
            {
                conditions: [
                    {
                        property: "entity:isViewOnly",
                        type: "eq",
                        value: false,
                    },
                    {
                        property: "context:currentUser.privileges",
                        type: "without",
                        value: ["portal:admin:shareToGroup"],
                    },
                ],
                property: "context:currentUser",
                type: "is-group-member",
                value: "entity:id",
            },
            // if the group is view only, only group admins can
            // share content
            {
                conditions: [
                    {
                        property: "entity:isViewOnly",
                        type: "eq",
                        value: true,
                    },
                    {
                        property: "context:currentUser.privileges",
                        type: "without",
                        value: ["portal:admin:shareToGroup"],
                    },
                ],
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:id",
            },
        ],
    },
];

/**
 * All the permission policies for the Hub
 */
const PlatformPermissions = [
    "platform:features:user:edit",
    "platform:features:user:fullEdit",
    "platform:features:user:manageVersions",
    "platform:marketplace:admin:manage",
    "platform:marketplace:admin:purchase",
    "platform:marketplace:admin:startTrial",
    "platform:opendata:user:designateGroup",
    "platform:opendata:user:openDataAdmin",
    "platform:portal:admin:assignToGroups",
    "platform:portal:admin:categorizeItems",
    "platform:portal:admin:changeUserRoles",
    "platform:portal:admin:createGPWebhook",
    "platform:portal:admin:createUpdateCapableGroup",
    "platform:portal:admin:createLeavingDisallowedGroup",
    "platform:portal:admin:deleteGroups",
    "platform:portal:admin:deleteItems",
    "platform:portal:admin:deleteUsers",
    "platform:portal:admin:disableUsers",
    "platform:portal:admin:inviteUsers",
    "platform:portal:admin:manageCollaborations",
    "platform:portal:admin:manageCredits",
    "platform:portal:admin:manageEnterpriseGroups",
    "platform:portal:admin:manageLicenses",
    "platform:portal:admin:manageRoles",
    "platform:portal:admin:manageSecurity",
    "platform:portal:admin:manageServers",
    "platform:portal:admin:manageUtilityServices",
    "platform:portal:admin:manageWebhooks",
    "platform:portal:admin:manageWebsite",
    "platform:portal:admin:reassignGroups",
    "platform:portal:admin:reassignItems",
    "platform:portal:admin:reassignUsers",
    "platform:portal:admin:shareToGroup",
    "platform:portal:admin:shareToOrg",
    "platform:portal:admin:shareToPublic",
    "platform:portal:admin:updateGroups",
    "platform:portal:admin:updateItemCategorySchema",
    "platform:portal:admin:updateItems",
    "platform:portal:admin:updateMemberCategorySchema",
    "platform:portal:admin:updateUsers",
    "platform:portal:admin:viewGroups",
    "platform:portal:admin:viewItems",
    "platform:portal:admin:viewUsers",
    "platform:portal:publisher:bulkPublishFromDataStores",
    "platform:portal:publisher:createDataPipelines",
    "platform:portal:publisher:createFeatureWebhook",
    "platform:portal:publisher:publishBigDataAnalytics",
    "platform:portal:publisher:publishDynamicImagery",
    "platform:portal:publisher:publishFeatures",
    "platform:portal:publisher:publishFeeds",
    "platform:portal:publisher:publishKnowledgeGraph",
    "platform:portal:publisher:publishRealTimeAnalytics",
    "platform:portal:publisher:publishScenes",
    "platform:portal:publisher:publishServerGPServices",
    "platform:portal:publisher:publishServerServices",
    "platform:portal:publisher:publishTiledImagery",
    "platform:portal:publisher:publishTiles",
    "platform:portal:publisher:registerDataStores",
    "platform:portal:user:addExternalMembersToGroup",
    "platform:portal:user:categorizeItems",
    "platform:portal:user:createGroup",
    "platform:portal:user:createItem",
    "platform:portal:user:invitePartneredCollaborationMembers",
    "platform:portal:user:joinGroup",
    "platform:portal:user:joinNonOrgGroup",
    "platform:portal:user:reassignItems",
    "platform:portal:user:receiveItems",
    "platform:portal:user:runWebTool",
    "platform:portal:user:shareGroupToOrg",
    "platform:portal:user:shareGroupToPublic",
    "platform:portal:user:shareToGroup",
    "platform:portal:user:shareToOrg",
    "platform:portal:user:shareToPublic",
    "platform:portal:user:viewHostedFeatureServices",
    "platform:portal:user:viewHostedTileServices",
    "platform:portal:user:viewOrgGroups",
    "platform:portal:user:viewOrgItems",
    "platform:portal:user:viewOrgUsers",
    "platform:portal:user:viewTracks",
    "platform:premium:publisher:createAdvancedNotebooks",
    "platform:premium:publisher:createNotebooks",
    "platform:premium:publisher:geoanalytics",
    "platform:premium:publisher:rasteranalysis",
    "platform:premium:publisher:scheduleNotebooks",
    "platform:premium:user:demographics",
    "platform:premium:user:elevation",
    "platform:premium:user:featurereport",
    "platform:premium:user:geocode:stored",
    "platform:premium:user:geocode:temporary",
    "platform:premium:user:geocode",
    "platform:premium:user:geoenrichment",
    "platform:premium:user:networkanalysis:closestfacility",
    "platform:premium:user:networkanalysis:locationallocation",
    "platform:premium:user:networkanalysis:optimizedrouting",
    "platform:premium:user:networkanalysis:origindestinationcostmatrix",
    "platform:premium:user:networkanalysis:routing",
    "platform:premium:user:networkanalysis:servicearea",
    "platform:premium:user:networkanalysis:vehiclerouting",
    "platform:premium:user:networkanalysis",
    "platform:premium:user:places",
    "platform:premium:user:spatialanalysis",
];
/**
 * Platform Permission policies which delegate to Platform Privileges
 */
const PlatformPermissionPolicies = [
    {
        permission: "platform:features:user:edit",
        services: ["portal"],
        authenticated: true,
        privileges: ["features:user:edit"],
    },
    {
        permission: "platform:features:user:fullEdit",
        services: ["portal"],
        authenticated: true,
        privileges: ["features:user:fullEdit"],
    },
    {
        permission: "platform:features:user:manageVersions",
        services: ["portal"],
        authenticated: true,
        privileges: ["features:user:manageVersions"],
    },
    {
        permission: "platform:marketplace:admin:manage",
        services: ["portal"],
        authenticated: true,
        privileges: ["marketplace:admin:manage"],
    },
    {
        permission: "platform:marketplace:admin:purchase",
        services: ["portal"],
        authenticated: true,
        privileges: ["marketplace:admin:purchase"],
    },
    {
        permission: "platform:marketplace:admin:startTrial",
        services: ["portal"],
        authenticated: true,
        privileges: ["marketplace:admin:startTrial"],
    },
    {
        permission: "platform:opendata:user:designateGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["opendata:user:designateGroup"],
    },
    {
        permission: "platform:opendata:user:openDataAdmin",
        services: ["portal"],
        authenticated: true,
        privileges: ["opendata:user:openDataAdmin"],
    },
    {
        permission: "platform:portal:admin:assignToGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:assignToGroups"],
    },
    {
        permission: "platform:portal:admin:categorizeItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:categorizeItems"],
    },
    {
        permission: "platform:portal:admin:changeUserRoles",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:changeUserRoles"],
    },
    {
        permission: "platform:portal:admin:createGPWebhook",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:createGPWebhook"],
    },
    {
        permission: "platform:portal:admin:createUpdateCapableGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:createUpdateCapableGroup"],
    },
    {
        permission: "platform:portal:admin:createLeavingDisallowedGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:createLeavingDisallowedGroup"],
    },
    {
        permission: "platform:portal:admin:deleteGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:deleteGroups"],
    },
    {
        permission: "platform:portal:admin:deleteItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:deleteItems"],
    },
    {
        permission: "platform:portal:admin:deleteUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:deleteUsers"],
    },
    {
        permission: "platform:portal:admin:disableUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:disableUsers"],
    },
    {
        permission: "platform:portal:admin:inviteUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:inviteUsers"],
    },
    {
        permission: "platform:portal:admin:manageCollaborations",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageCollaborations"],
    },
    {
        permission: "platform:portal:admin:manageCredits",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageCredits"],
    },
    {
        permission: "platform:portal:admin:manageEnterpriseGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageEnterpriseGroups"],
    },
    {
        permission: "platform:portal:admin:manageLicenses",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageLicenses"],
    },
    {
        permission: "platform:portal:admin:manageRoles",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageRoles"],
    },
    {
        permission: "platform:portal:admin:manageSecurity",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageSecurity"],
    },
    {
        permission: "platform:portal:admin:manageServers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageServers"],
    },
    {
        permission: "platform:portal:admin:manageUtilityServices",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageUtilityServices"],
    },
    {
        permission: "platform:portal:admin:manageWebhooks",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageWebhooks"],
    },
    {
        permission: "platform:portal:admin:manageWebsite",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:manageWebsite"],
    },
    {
        permission: "platform:portal:admin:reassignGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:reassignGroups"],
    },
    {
        permission: "platform:portal:admin:reassignItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:reassignItems"],
    },
    {
        permission: "platform:portal:admin:reassignUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:reassignUsers"],
    },
    {
        permission: "platform:portal:admin:shareToGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:shareToGroup"],
    },
    {
        permission: "platform:portal:admin:shareToOrg",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:shareToOrg"],
    },
    {
        permission: "platform:portal:admin:shareToPublic",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:shareToPublic"],
    },
    {
        permission: "platform:portal:admin:updateGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:updateGroups"],
    },
    {
        permission: "platform:portal:admin:updateItemCategorySchema",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:updateItemCategorySchema"],
    },
    {
        permission: "platform:portal:admin:updateItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:updateItems"],
    },
    {
        permission: "platform:portal:admin:updateMemberCategorySchema",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:updateMemberCategorySchema"],
    },
    {
        permission: "platform:portal:admin:updateUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:updateUsers"],
    },
    {
        permission: "platform:portal:admin:viewGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:viewGroups"],
    },
    {
        permission: "platform:portal:admin:viewItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:viewItems"],
    },
    {
        permission: "platform:portal:admin:viewUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:admin:viewUsers"],
    },
    {
        permission: "platform:portal:publisher:bulkPublishFromDataStores",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:bulkPublishFromDataStores"],
    },
    {
        permission: "platform:portal:publisher:createDataPipelines",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:createDataPipelines"],
    },
    {
        permission: "platform:portal:publisher:createFeatureWebhook",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:createFeatureWebhook"],
    },
    {
        permission: "platform:portal:publisher:publishBigDataAnalytics",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishBigDataAnalytics"],
    },
    {
        permission: "platform:portal:publisher:publishDynamicImagery",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishDynamicImagery"],
    },
    {
        permission: "platform:portal:publisher:publishFeatures",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishFeatures"],
    },
    {
        permission: "platform:portal:publisher:publishFeeds",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishFeeds"],
    },
    {
        permission: "platform:portal:publisher:publishKnowledgeGraph",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishKnowledgeGraph"],
    },
    {
        permission: "platform:portal:publisher:publishRealTimeAnalytics",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishRealTimeAnalytics"],
    },
    {
        permission: "platform:portal:publisher:publishScenes",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishScenes"],
    },
    {
        permission: "platform:portal:publisher:publishServerGPServices",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishServerGPServices"],
    },
    {
        permission: "platform:portal:publisher:publishServerServices",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishServerServices"],
    },
    {
        permission: "platform:portal:publisher:publishTiledImagery",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishTiledImagery"],
    },
    {
        permission: "platform:portal:publisher:publishTiles",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:publishTiles"],
    },
    {
        permission: "platform:portal:publisher:registerDataStores",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:publisher:registerDataStores"],
    },
    {
        permission: "platform:portal:user:addExternalMembersToGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:addExternalMembersToGroup"],
    },
    {
        permission: "platform:portal:user:categorizeItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:categorizeItems"],
    },
    {
        permission: "platform:portal:user:createGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:createGroup"],
    },
    {
        permission: "platform:portal:user:createItem",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "platform:portal:user:invitePartneredCollaborationMembers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:invitePartneredCollaborationMembers"],
    },
    {
        permission: "platform:portal:user:joinGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:joinGroup"],
    },
    {
        permission: "platform:portal:user:joinNonOrgGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:joinNonOrgGroup"],
    },
    {
        permission: "platform:portal:user:reassignItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:reassignItems"],
    },
    {
        permission: "platform:portal:user:receiveItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:receiveItems"],
    },
    {
        permission: "platform:portal:user:runWebTool",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:runWebTool"],
    },
    {
        permission: "platform:portal:user:shareGroupToOrg",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:shareGroupToOrg"],
    },
    {
        permission: "platform:portal:user:shareGroupToPublic",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:shareGroupToPublic"],
    },
    {
        permission: "platform:portal:user:shareToGroup",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:shareToGroup"],
    },
    {
        permission: "platform:portal:user:shareToOrg",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:shareToOrg"],
    },
    {
        permission: "platform:portal:user:shareToPublic",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:shareToPublic"],
    },
    {
        permission: "platform:portal:user:viewHostedFeatureServices",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:viewHostedFeatureServices"],
    },
    {
        permission: "platform:portal:user:viewHostedTileServices",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:viewHostedTileServices"],
    },
    {
        permission: "platform:portal:user:viewOrgGroups",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:viewOrgGroups"],
    },
    {
        permission: "platform:portal:user:viewOrgItems",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:viewOrgItems"],
    },
    {
        permission: "platform:portal:user:viewOrgUsers",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:viewOrgUsers"],
    },
    {
        permission: "platform:portal:user:viewTracks",
        services: ["portal"],
        authenticated: true,
        privileges: ["portal:user:viewTracks"],
    },
    {
        permission: "platform:premium:publisher:createAdvancedNotebooks",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:publisher:createAdvancedNotebooks"],
    },
    {
        permission: "platform:premium:publisher:createNotebooks",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:publisher:createNotebooks"],
    },
    {
        permission: "platform:premium:publisher:geoanalytics",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:publisher:geoanalytics"],
    },
    {
        permission: "platform:premium:publisher:rasteranalysis",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:publisher:rasteranalysis"],
    },
    {
        permission: "platform:premium:publisher:scheduleNotebooks",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:publisher:scheduleNotebooks"],
    },
    {
        permission: "platform:premium:user:demographics",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:demographics"],
    },
    {
        permission: "platform:premium:user:elevation",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:elevation"],
    },
    {
        permission: "platform:premium:user:featurereport",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:featurereport"],
    },
    {
        permission: "platform:premium:user:geocode:stored",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:geocode:stored"],
    },
    {
        permission: "platform:premium:user:geocode:temporary",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:geocode:temporary"],
    },
    {
        permission: "platform:premium:user:geocode",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:geocode"],
    },
    {
        permission: "platform:premium:user:geoenrichment",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:geoenrichment"],
    },
    {
        permission: "platform:premium:user:networkanalysis:closestfacility",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:closestfacility"],
    },
    {
        permission: "platform:premium:user:networkanalysis:locationallocation",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:locationallocation"],
    },
    {
        permission: "platform:premium:user:networkanalysis:optimizedrouting",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:optimizedrouting"],
    },
    {
        permission: "platform:premium:user:networkanalysis:origindestinationcostmatrix",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:origindestinationcostmatrix"],
    },
    {
        permission: "platform:premium:user:networkanalysis:routing",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:routing"],
    },
    {
        permission: "platform:premium:user:networkanalysis:servicearea",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:servicearea"],
    },
    {
        permission: "platform:premium:user:networkanalysis:vehiclerouting",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis:vehiclerouting"],
    },
    {
        permission: "platform:premium:user:networkanalysis",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:networkanalysis"],
    },
    {
        permission: "platform:premium:user:places",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:places"],
    },
    {
        permission: "platform:premium:user:spatialanalysis",
        services: ["portal"],
        authenticated: true,
        privileges: ["premium:user:spatialanalysis"],
    },
];

/**
 * survey Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const SurveyPermissions = [
    "hub:survey",
    "hub:survey:create",
    "hub:survey:delete",
    "hub:survey:edit",
    "hub:survey:view",
    "hub:survey:owner",
    "hub:survey:canChangeAccess",
    "hub:survey:workspace",
    "hub:survey:workspace:dashboard",
    "hub:survey:workspace:details",
    "hub:survey:workspace:settings",
    "hub:survey:workspace:collaborators",
    "hub:survey:manage",
];
/**
 * Survey permission policies
 * @private
 */
const SurveyPermissionPolicies = [
    {
        permission: "hub:survey",
        services: ["portal"],
        licenses: ["hub-basic", "hub-premium"],
    },
    {
        permission: "hub:survey:view",
        dependencies: ["hub:survey"],
    },
    {
        permission: "hub:survey:create",
        authenticated: true,
        dependencies: ["hub:survey"],
        privileges: [
            "features:user:edit",
            "portal:publisher:publishFeatures",
            "portal:user:createItem",
            "portal:user:shareToGroup",
        ],
    },
    {
        permission: "hub:survey:edit",
        authenticated: true,
        dependencies: ["hub:survey"],
        entityEdit: true,
    },
    {
        permission: "hub:survey:delete",
        authenticated: true,
        dependencies: ["hub:survey"],
        entityDelete: true,
    },
    {
        permission: "hub:survey:owner",
        dependencies: ["hub:survey"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:survey:canChangeAccess",
        dependencies: ["hub:survey"],
        authenticated: true,
        assertions: [
            {
                property: "context:currentUser.privileges",
                type: "contains-some",
                value: [
                    "portal:admin:shareToPublic",
                    "portal:admin:shareToOrg",
                    "portal:user:shareToPublic",
                    "portal:user:shareToOrg",
                ],
            },
            {
                property: "entity:itemControl",
                type: "eq",
                value: "admin",
            },
        ],
    },
    {
        permission: "hub:survey:workspace",
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:survey:workspace:dashboard",
        dependencies: ["hub:survey:workspace", "hub:survey:view"],
    },
    {
        permission: "hub:survey:workspace:details",
        dependencies: ["hub:survey:workspace", "hub:survey:edit"],
    },
    {
        permission: "hub:survey:workspace:settings",
        dependencies: ["hub:survey:workspace", "hub:survey:edit"],
    },
    {
        permission: "hub:survey:workspace:collaborators",
        dependencies: ["hub:survey:workspace", "hub:survey:edit"],
    },
    {
        permission: "hub:survey:manage",
        dependencies: ["hub:survey:edit"],
    },
];

/**
 * @private
 * Event Permission Policies
 * These define the requirements any user must meet to perform related actions
 */
const EventPermissions = [
    "hub:event",
    "hub:event:create",
    "hub:event:edit",
    "hub:event:delete",
    "hub:event:view",
    "hub:event:owner",
    "hub:event:canChangeAccess",
    "hub:event:workspace",
    "hub:event:workspace:dashboard",
    "hub:event:workspace:details",
    "hub:event:workspace:settings",
    "hub:event:workspace:collaborators",
    "hub:event:workspace:manage",
    "hub:event:workspace:registrants",
    "hub:event:workspace:content",
    "hub:event:manage",
];
/**
 * @private
 * Event permission policies
 */
const EventPermissionPolicies = [
    {
        permission: "hub:event",
        services: ["events"],
        licenses: ["hub-premium"],
        // gating
        environments: ["devext", "qaext"],
        availability: ["alpha"],
    },
    {
        permission: "hub:event:create",
        dependencies: ["hub:event"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "hub:event:view",
        services: ["events"],
        licenses: ["hub-basic", "hub-premium"],
    },
    {
        permission: "hub:event:edit",
        authenticated: true,
        dependencies: ["hub:event"],
        entityEdit: true,
    },
    {
        permission: "hub:event:delete",
        authenticated: true,
        dependencies: ["hub:event"],
        entityDelete: true,
    },
    {
        permission: "hub:event:owner",
        dependencies: ["hub:event"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:event:canChangeAccess",
        dependencies: ["hub:event"],
        authenticated: true,
        assertions: [
            {
                property: "context:currentUser.privileges",
                type: "contains-some",
                value: [
                    "portal:admin:shareToPublic",
                    "portal:admin:shareToOrg",
                    "portal:user:shareToPublic",
                    "portal:user:shareToOrg",
                ],
            },
            {
                property: "entity:canChangeAccess",
                type: "eq",
                value: true,
            },
        ],
    },
    {
        permission: "hub:event:workspace",
    },
    {
        permission: "hub:event:workspace:dashboard",
        dependencies: ["hub:event:workspace", "hub:event:view"],
    },
    {
        permission: "hub:event:workspace:details",
        dependencies: ["hub:event:workspace", "hub:event:edit"],
    },
    {
        permission: "hub:event:workspace:settings",
        dependencies: ["hub:event:workspace", "hub:event:edit"],
    },
    {
        permission: "hub:event:workspace:collaborators",
        dependencies: ["hub:event:workspace", "hub:event:edit"],
    },
    {
        permission: "hub:event:workspace:registrants",
        dependencies: ["hub:event:workspace", "hub:event:edit"],
    },
    {
        permission: "hub:event:workspace:content",
        dependencies: ["hub:event:workspace", "hub:event:edit"],
    },
    {
        permission: "hub:event:manage",
        dependencies: ["hub:event:edit"],
    },
];

/**
 * User Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const UserPermissions = [
    "hub:user",
    "hub:user:view",
    "hub:user:edit",
    "hub:user:owner",
    "hub:user:workspace",
    "hub:user:workspace:overview",
    "hub:user:workspace:settings",
    "hub:user:workspace:content",
    "hub:user:workspace:groups",
    "hub:user:workspace:events",
    "hub:user:workspace:discussions",
    "hub:user:workspace:shared-with-me",
    "hub:user:manage",
];
/**
 * User permission policies
 * @private
 */
const UserPermissionPolicies = [
    {
        permission: "hub:user",
        services: ["portal"],
    },
    {
        permission: "hub:user:view",
        dependencies: ["hub:user"],
        authenticated: false,
    },
    {
        permission: "hub:user:owner",
        dependencies: ["hub:user"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:user:edit",
        // NOTE: most entities base this on entityEdit: true,
        // but for now at least we are requiring the user to be themselves
        dependencies: ["hub:user:owner"],
    },
    {
        permission: "hub:user:workspace",
        environments: ["qaext", "devext"],
        // seems like this should also depend on hub:user,
        // but other entities don't do that
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:user:workspace:overview",
        dependencies: ["hub:user:workspace"],
    },
    {
        permission: "hub:user:workspace:content",
        dependencies: ["hub:user:workspace", "hub:user:owner"],
    },
    {
        permission: "hub:user:workspace:groups",
        dependencies: ["hub:user:workspace", "hub:user:owner"],
    },
    {
        permission: "hub:user:workspace:events",
        services: ["events"],
        dependencies: ["hub:user:workspace", "hub:user:owner"],
    },
    {
        permission: "hub:user:workspace:discussions",
        availability: ["alpha"],
        services: ["discussions"],
        dependencies: ["hub:user:workspace", "hub:user:owner"],
    },
    {
        permission: "hub:user:workspace:settings",
        dependencies: ["hub:user:workspace", "hub:user:owner"],
    },
    {
        permission: "hub:user:manage",
        dependencies: ["hub:user:edit"],
    },
];

// Examples of possible Permission Policies
// const DiscussionPermissionPolicies: IPermissionPolicy[] = [
//   {
//     permission: "discussions:channel:create",
//     authenticated: true,
//     services: ["discussions"],
//     licenses: ["hub-basic", "hub-premium"],
//   },
//   {
//     permission: "discussions:channel:createprivate",
//     authenticated: true,
//     licenses: ["hub-basic", "hub-premium"],
//     assertions: [
//       {
//         property: "entity:group.typekeywords",
//         assertion: "without",
//         value: "cannotDiscuss",
//       },
//       {
//         property: "context:currentUser",
//         assertion: "is-group-admin",
//         value: "entity:group.id",
//       },
//     ],
//   },
//   {
//     permission: "discussions:channel:create",
//     services: ["discussions"],
//     authenticated: true,
//     licenses: ["hub-basic", "hub-premium"],
//     assertions: [
//       {
//         property: "entity:typeKeywords",
//         assertion: "without",
//         value: "cannotDiscuss",
//       },
//     ],
//   },
//   {
//     permission: "discussions:post:create",
//     services: ["discussions"],
//     authenticated: true,
//     licenses: ["hub-basic", "hub-premium"],
//     assertions: [
//       {
//         property: "entity:typeKeywords",
//         assertion: "without",
//         value: "cannotDiscuss",
//       },
//     ],
//   },
// ];
/**
 * Highlevel Permission definitions for the Hub System as a whole
 * Typically other permissions depend on these so a whole set of features
 * can be enabled / disabled by changing a single permission
 * MAKE SURE to add the permission string to the SystemPermissions array
 * in Permissions.ts
 */
const SystemPermissionPolicies = [
    {
        permission: "hub:feature:privacy",
        // alpha does not do what we want here, it says "grant if the _logged in user_ is in an alpha org"
        // but what we really want is "grant if the _current site_ is in an alpha org" which we can't do
        // availability: ["alpha"],
        // so the fallback is to deny this permission in all cases except when the feature flag is passed (?pe=hub:feature:privacy)
        // but we can't do that either
        // so we will just enable it only in devext since we don't use that env
        environments: ["devext"],
    },
    {
        permission: "hub:feature:workspace",
        availability: ["alpha"],
        environments: ["devext", "qaext", "production"],
    },
    {
        // Enables access to the user preferences section of the user profile
        // This will likely be removed when we swap the user profile to use workspace
        permission: "hub:feature:user:preferences",
        // gated to qa/dev for now, but will be accessible on PROD when
        // we pass `?pe=hub:feature:user:preferences` in the URL
        environments: ["devext", "qaext", "production"],
    },
    // These should only be used when needing to gate functionality that is not
    // connected to an entity, for example notices. These should NOT be used
    // in dependencies arrays.
    {
        permission: "hub:environment:qaext",
        environments: ["qaext"],
    },
    {
        permission: "hub:environment:devext",
        environments: ["devext"],
    },
    {
        permission: "hub:environment:production",
        environments: ["production"],
    },
    {
        permission: "hub:environment:enterprise",
        environments: ["enterprise"],
    },
    {
        // When enabled, the new follow card will be loaded
        // instead of the old follow initiative card.
        // To enable it, we need to pass the feature flag
        // (?pe=hub:card:follow) into the URL
        permission: "hub:card:follow",
        environments: ["qaext"],
        availability: ["flag"],
        licenses: ["hub-basic", "hub-premium"],
    },
    {
        // When enabled, the manage links will take the user the org home site
        permission: "hub:feature:workspace:user",
        // NOTE: qaext and devext might seem redundant, given that hub:feature:workspace is alpha
        // but we allow users to "opt-in" which overrides that
        environments: ["qaext", "devext"],
        dependencies: ["hub:feature:workspace"],
    },
    {
        // When enabled, the manage links will take the user the org home site
        permission: "hub:feature:workspace:org",
        availability: ["alpha"],
        environments: ["devext", "qaext"],
    },
    {
        // when enabled keyboard shortcuts will be available
        permission: "hub:feature:keyboardshortcuts",
        availability: ["alpha"],
        environments: ["devext", "qaext"],
    },
    {
        // Enables the history feature
        permission: "hub:feature:history",
        availability: ["alpha"],
        environments: ["devext", "qaext"],
    },
    {
        // Enables the new entity view to render on a view route
        // To enable it, we need to pass the feature flag
        // (?pe=hub:feature:newentityview) into the URL
        permission: "hub:feature:newentityview",
        environments: ["qaext"],
        availability: ["flag"],
    },
    {
        // Enables catalog configuration and viewing
        permission: "hub:feature:catalogs",
        environments: ["qaext"],
        availability: ["alpha"],
    },
    {
        // Enable inline-workspace for Entity Views
        // limited to devext alpha so we have to pass as a flag to enable
        permission: "hub:feature:inline-workspace",
        environments: ["devext"],
        availability: ["alpha"],
    },
    {
        // Enable site getting pages from it's catalog
        // instead of those linked in the site's data
        permission: "hub:feature:pagescatalog",
        environments: ["qaext"],
        availability: ["alpha"],
    },
    // NOTE: only use this permission if necessary. Use the licenses check on a permission to check license when able instead of a separate permission.
    // checks if using hub-premium
    {
        permission: "hub:license:hub-premium",
        licenses: ["hub-premium"],
    },
    // NOTE: only use this permission if necessary. Use the licenses check on a permission to check license when able instead of a separate permission.
    // checks if using hub-basic
    {
        permission: "hub:license:hub-basic",
        licenses: ["hub-basic"],
    },
    // NOTE: only use this permission if necessary. Use the licenses check on a permission to check license when able instead of a separate permission.
    // checks if using enterprise-sites
    {
        permission: "hub:license:enterprise-sites",
        licenses: ["enterprise-sites"],
    },
    // NOTE: only use this permission if necessary. Use the availability check on a permission to check availability when able instead of a separate permission.
    // checks if in alpha
    {
        permission: "hub:availability:alpha",
        availability: ["alpha"],
    },
    // NOTE: only use this permission if necessary. Use the availability check on a permission to check availability when able instead of a separate permission.
    // checks if in beta
    {
        permission: "hub:availability:beta",
        availability: ["beta"],
    },
    // NOTE: only use this permission if necessary. Use the availability check on a permission to check availability when able instead of a separate permission.
    // checks if in general
    {
        permission: "hub:availability:general",
        availability: ["general"],
    },
];
/**
 * All the permission policies for the Hub
 */
const HubPermissionsPolicies = [
    ...SitesPermissionPolicies,
    ...ProjectPermissionPolicies,
    ...InitiativePermissionPolicies,
    ...DiscussionPermissionPolicies,
    ...ContentPermissionPolicies,
    ...GroupPermissionPolicies,
    ...PagePermissionPolicies,
    ...TemplatePermissionPolicies,
    ...PlatformPermissionPolicies,
    ...InitiativeTemplatePermissionPolicies,
    ...SystemPermissionPolicies,
    ...SurveyPermissionPolicies,
    ...EventPermissionPolicies,
    ...UserPermissionPolicies,
];
/**
 * Get the policies defined for a specific permission
 * @param permission
 * @returns
 */
function getPermissionPolicy(permission) {
    return HubPermissionsPolicies.find((p) => p.permission === permission);
}

// TODO: Determine how to keep this in sycn with the PolicyResponse type
// Crappy tool https://jsbin.com/gojelov/edit?js,console,output
const policyResponseCodes = [
    { response: "granted", code: "PC100" },
    { response: "org-member", code: "PC101" },
    { response: "not-org-member", code: "PC102" },
    { response: "group-member", code: "PC103" },
    { response: "not-group-member", code: "PC104" },
    { response: "not-group-admin", code: "PC105" },
    { response: "is-user", code: "PC106" },
    { response: "not-owner", code: "PC107" },
    { response: "not-licensed", code: "PC108" },
    { response: "not-licensed-available", code: "PC109" },
    { response: "not-available", code: "PC110" },
    { response: "not-granted", code: "PC111" },
    { response: "no-edit-access", code: "PC112" },
    { response: "edit-access", code: "PC113" },
    { response: "invalid-permission", code: "PC114" },
    { response: "privilege-required", code: "PC115" },
    { response: "service-offline", code: "PC116" },
    { response: "service-maintenance", code: "PC117" },
    { response: "entity-required", code: "PC118" },
    { response: "not-authenticated", code: "PC119" },
    { response: "not-alpha-org", code: "PC120" },
    { response: "property-missing", code: "PC121" },
    { response: "property-not-array", code: "PC122" },
    { response: "array-contains-invalid-value", code: "PC123" },
    { response: "array-missing-required-value", code: "PC124" },
    { response: "property-mismatch", code: "PC125" },
    { response: "user-not-group-member", code: "PC126" },
    { response: "user-not-group-manager", code: "PC127" },
    { response: "user-not-group-owner", code: "PC128" },
    { response: "assertion-property-not-found", code: "PC129" },
    { response: "assertion-failed", code: "PC130" },
    { response: "assertion-requires-numeric-values", code: "PC131" },
    { response: "property-match", code: "PC132" },
    { response: "not-beta-org", code: "PC133" },
    { response: "not-in-environment", code: "PC134" },
    { response: "feature-disabled", code: "PC135" },
    { response: "feature-enabled", code: "PC136" },
    { response: "no-policy-exists", code: "PC137" },
    { response: "disabled-by-entity-flag", code: "PC137" },
    { response: "disabled-by-feature-flag", code: "PC137" },
];
/**
 * Get a code that can be used for i18n or other purposes, based on the PolicyResponse
 * @param response
 * @returns
 */
function getPolicyResponseCode(response) {
    const entry = policyResponseCodes.find((x) => x.response === response);
    return (entry === null || entry === void 0 ? void 0 : entry.code) || "PC000";
}

/**
 * Validate license policy
 * @param policy
 * @param response
 * @param context
 * @returns
 */
function checkLicense(policy, context, _entity) {
    var _a;
    const checks = [];
    // Only return a check if the policy is defined
    if ((_a = policy.licenses) === null || _a === void 0 ? void 0 : _a.length) {
        let result = "granted";
        if (!policy.licenses.includes(context.hubLicense)) {
            result = "not-available";
            // can we show an upgrade ux?
            if (policy.licenses[0] === "hub-premium" &&
                context.hubLicense === "hub-basic") {
                result = "not-licensed"; // implies it could be licensed
            }
        }
        const check = {
            name: `license in ${policy.licenses.join(", ")}`,
            value: context.hubLicense,
            code: getPolicyResponseCode(result),
            response: result,
        };
        checks.push(check);
    }
    return checks;
}

/**
 * Defines the values for Permissions
 * It's critical that the arrays defined in the modules use `as const`
 * otherwise Permission devolves into just a string type
 */
const SystemPermissions = [
    "hub:feature:privacy",
    "hub:feature:workspace",
    "hub:feature:user:preferences",
    "hub:card:follow",
    "hub:feature:workspace:user",
    "hub:feature:workspace:org",
    "hub:feature:keyboardshortcuts",
    "hub:feature:newentityview",
    "hub:feature:history",
    "hub:feature:catalogs",
    "hub:feature:inline-workspace",
    "hub:feature:pagescatalog",
    "hub:license:hub-premium",
    "hub:license:hub-basic",
    "hub:license:enterprise-sites",
    "hub:availability:alpha",
    "hub:availability:beta",
    "hub:availability:general",
    "hub:environment:qaext",
    "hub:environment:devext",
    "hub:environment:production",
    "hub:environment:enterprise",
];
const validPermissions = [
    ...SitePermissions,
    ...ProjectPermissions,
    ...InitiativePermissions,
    ...ContentPermissions,
    ...GroupPermissions,
    ...PagePermissions,
    ...PlatformPermissions,
    ...DiscussionPermissions,
    ...InitiativeTemplatePermissions,
    ...TemplatePermissions,
    ...SystemPermissions,
    ...SurveyPermissions,
    ...EventPermissions,
    ...UserPermissions,
];
/**
 * Validate a Permission
 * @param permission
 * @returns
 */
function isPermission(maybePermission) {
    return validPermissions.includes(maybePermission);
}

/**
 * Validate authentication policy
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkAuthentication(policy, context, _entity) {
    const checks = [];
    // Only return a check if the policy is defined
    if (policy.hasOwnProperty("authenticated")) {
        let response = "granted";
        if (policy.authenticated && !context.isAuthenticated) {
            response = "not-authenticated";
        }
        // create the check
        const check = {
            name: "authentication",
            value: `required: ${policy.authenticated}`,
            code: getPolicyResponseCode(response),
            response,
        };
        checks.push(check);
    }
    return checks;
}

/**
 * Validate entityOwner policy
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkOwner(policy, context, entity) {
    var _a;
    const checks = [];
    // Only return a check if the policy is defined
    if (policy.entityOwner) {
        let response = "granted";
        let name = "entity owner required";
        if (!context.isAuthenticated) {
            response = "not-authenticated";
        }
        else if (!entity) {
            // fail b/c no entity
            response = "entity-required";
        }
        else {
            name = `entity owner required: ${entity.owner}`;
            if (entity.owner !== context.currentUser.username) {
                response = "not-owner";
            }
        }
        // create the check
        const check = {
            name,
            value: `current user: ${(_a = context.currentUser) === null || _a === void 0 ? void 0 : _a.username}`,
            code: getPolicyResponseCode(response),
            response,
        };
        checks.push(check);
    }
    return checks;
}

/**
 * Validate entityEdit policy
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkEdit(policy, context, entity) {
    const checks = [];
    // Only return a check if the policy is defined
    if (policy.hasOwnProperty("entityEdit")) {
        let response = "granted";
        if (!entity) {
            // fail b/c no entity
            response = "entity-required";
        }
        else {
            if (policy.entityEdit && !entity.canEdit) {
                response = "no-edit-access";
            }
            else if (!policy.entityEdit && entity.canEdit) {
                response = "edit-access";
            }
        }
        // create the check
        const check = {
            name: "entity edit required",
            value: `entity.canEdit: ${getWithDefault(entity, "canEdit", false)}`,
            code: getPolicyResponseCode(response),
            response,
        };
        checks.push(check);
    }
    return checks;
}

/**
 * Validate entityDelete policy - delegates to the
 * entity's canDelete property
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkDelete(policy, context, entity) {
    const checks = [];
    if (policy.hasOwnProperty("entityDelete")) {
        let response = "granted";
        if (!entity) {
            // fail b/c no entity
            response = "entity-required";
        }
        else {
            if (policy.entityDelete && !entity.canDelete) {
                response = "no-delete-access";
            }
            else if (!policy.entityDelete && entity.canDelete) {
                response = "delete-access";
            }
        }
        // create the check
        const check = {
            name: "entity delete required",
            value: `entity.canDelete: ${getWithDefault(entity, "canDelete", false)}`,
            code: getPolicyResponseCode(response),
            response,
        };
        checks.push(check);
    }
    return checks;
}

/**
 * Validate privilege policy
 * @param policy
 * @param context
 * @param _entity
 * @returns
 */
function checkPrivileges(policy, context, _entity) {
    var _a;
    let checks = [];
    // Only return a check if the policy is defined
    if ((_a = policy.privileges) === null || _a === void 0 ? void 0 : _a.length) {
        checks = policy.privileges.map((privilege) => {
            let response = "granted";
            let value = "privilege present";
            if (!context.isAuthenticated) {
                response = "not-authenticated";
                value = "not authenticated";
            }
            else if (!context.currentUser.privileges.includes(privilege)) {
                response = "privilege-required";
                value = "privilege missing";
            }
            return {
                name: `privilege required: ${privilege}`,
                value,
                response,
                code: getPolicyResponseCode(response),
            };
        });
    }
    return checks;
}

/**
 * Validate user meets entity policy
 * @param policy
 * @param context
 * @returns
 */
function checkEntityPolicy(policy, context) {
    const user = context.currentUser || { groups: [] };
    const userGroups = user.groups || [];
    let response = "not-granted";
    const type = policy.collaborationType;
    const id = policy.collaborationId;
    if (type === "user") {
        if (id === user.username) {
            response = "granted";
        }
        else {
            response = "not-granted";
        }
    }
    if (type === "org") {
        if (id === user.orgId) {
            response = "granted";
        }
        else {
            response = "not-org-member";
        }
    }
    if (type === "group") {
        if (userGroups.find((g) => g.id === id)) {
            response = "granted";
        }
        else {
            response = "not-group-member";
        }
    }
    if (type === "group-admin") {
        const group = userGroups.find((g) => g.id === id);
        const memberType = getProp(group, "userMembership.memberType");
        if (["admin", "owner"].includes(memberType)) {
            response = "granted";
        }
        else {
            response = "not-group-admin";
        }
    }
    if (type === "authenticated") {
        if (context.isAuthenticated) {
            response = "granted";
        }
        else {
            response = "not-authenticated";
        }
    }
    if (type === "anonymous") {
        response = "granted";
    }
    const check = {
        name: "entity:policy",
        value: `${policy.collaborationType}:${policy.collaborationId}`,
        response,
        code: getPolicyResponseCode(response),
    };
    return check;
}

/**
 * Check a specific EntityAssertion
 * Exported purely for testing. Not exported from the package.
 * @param assertion
 * @param entity
 * @param context
 * @returns
 */
function checkAssertion(assertion, entity, context) {
    let response = "granted";
    // construct a hash to look up properties in
    const lookupHash = { entity, context };
    // get the property value
    const propertyLookup = parseProperty(assertion.property);
    const propValue = getProp(lookupHash, propertyLookup.path);
    // If prop is undefined, then the assertion fails
    if (propValue === undefined) {
        response = "assertion-property-not-found";
    }
    let val = assertion.value;
    if (typeof val === "string" && val.indexOf(":") > -1) {
        const valueLookup = parseProperty(assertion.value);
        val = getProp(lookupHash, valueLookup.path);
        if (val === undefined) {
            response = "assertion-property-not-found";
        }
    }
    // if we have the two values, we can make the assertion
    if (propValue !== undefined && val !== undefined) {
        // TODO: Should these fns return IPolicyCheck? or just the response?
        // TODO: Should these fns inspect the type internally? or switch case here?
        switch (assertion.type) {
            case "eq":
            case "neq":
                response = equalityAssertions(assertion, propValue, val);
                break;
            case "starts-with":
            case "ends-with":
            case "not-starts-with":
            case "not-ends-with":
                response = stringAssertions(assertion, propValue, val);
                break;
            case "contains":
            case "contains-some":
            case "without":
                response = arrayAssertions(assertion, propValue, val);
                break;
            case "included-in":
                response = includeAssertions(assertion, propValue, val);
                break;
            case "gt":
            case "lt":
                response = rangeAssertions(assertion, propValue, val);
                break;
            case "length-gt":
            case "length-lt":
                response = lengthAssertions(assertion, propValue, val);
                break;
            case "is-group-admin":
            case "is-not-group-admin":
            case "is-group-member":
            case "is-not-group-member":
            case "is-group-owner":
            case "is-not-group-owner":
                response = groupAssertions(assertion, propValue, val, context);
                break;
        }
    }
    const result = {
        name: `assertion: ${assertion.property} ${assertion.type} ${assertion.value}`,
        value: propValue,
        code: getPolicyResponseCode(response),
        response,
    };
    return result;
}
function groupAssertions(assertion, propValue, val, context) {
    let response = "granted";
    const userGroups = context.currentUser.groups || [];
    // Default the groups to all groups the user is a member of
    let groups = mapBy("id", userGroups);
    let failResponse = "user-not-group-member";
    if (assertion.type === "is-group-member") {
        failResponse = "user-not-group-member";
        // no need to filter - this is anyone who's a member
        groups = filterByMembershipType(userGroups, ["admin", "owner", "member"]);
    }
    if (assertion.type === "is-not-group-member") {
        failResponse = "user-is-group-member";
        groups = filterByMembershipType(userGroups, ["admin", "owner", "member"]);
    }
    if (assertion.type === "is-group-admin") {
        failResponse = "user-not-group-manager";
        groups = filterByMembershipType(userGroups, ["admin", "owner"]);
    }
    if (assertion.type === "is-not-group-admin") {
        failResponse = "user-is-group-manager";
        groups = filterByMembershipType(userGroups, ["admin", "owner"]);
    }
    if (assertion.type === "is-group-owner") {
        failResponse = "user-not-group-owner";
        groups = filterByMembershipType(userGroups, ["owner"]);
    }
    if (assertion.type === "is-not-group-owner") {
        failResponse = "user-is-group-owner";
        groups = filterByMembershipType(userGroups, ["owner"]);
    }
    // now, see if the val is in the groups array
    const isInverseAssertion = assertion.type.includes("not");
    if (isInverseAssertion ? groups.includes(val) : !groups.includes(val)) {
        // send a specific response
        response = failResponse;
    }
    return response;
}
function filterByMembershipType(groups, types) {
    return groups.reduce((acc, grp) => {
        if (types.includes(grp.userMembership.memberType)) {
            acc.push(grp.id);
        }
        return acc;
    }, []);
}
/**
 * Is the propValue included in the val array?
 * @param assertion
 * @param propValue
 * @param val
 * @returns
 */
function includeAssertions(assertion, propValue, val) {
    let response = "granted";
    if (!Array.isArray(val)) {
        response = "property-not-array";
    }
    else {
        const arrayVal = val;
        if (!arrayVal.includes(propValue)) {
            response = "array-missing-required-value";
        }
    }
    return response;
}
/**
 * Is the propValue "eq" or "neq" to the val?
 * @param assertion
 * @param propValue
 * @param val
 * @returns
 */
function equalityAssertions(assertion, propValue, val) {
    let response = "granted";
    if (assertion.type === "eq" && propValue !== val) {
        response = "assertion-failed";
    }
    else if (assertion.type === "neq" && propValue === val) {
        response = "assertion-failed";
    }
    return response;
}
/**
 * Does the propValue "starts-with" or "ends-with" the val?
 * @param assertion
 * @param propValue
 * @param val
 * @returns
 */
function stringAssertions(assertion, propValue, // what we found
val // what we're looking for
) {
    let response = "granted";
    if (assertion.type === "starts-with" && !propValue.startsWith(val)) {
        response = "assertion-failed";
    }
    else if (assertion.type === "not-starts-with" &&
        propValue.startsWith(val)) {
        response = "assertion-failed";
    }
    else if (assertion.type === "ends-with" && !propValue.endsWith(val)) {
        response = "assertion-failed";
    }
    else if (assertion.type === "not-ends-with" && propValue.endsWith(val)) {
        response = "assertion-failed";
    }
    return response;
}
/**
 * Is the propValue "gt" or "lt" to the val?
 * @param assertion
 * @param propValue
 * @param val
 * @returns
 */
function rangeAssertions(assertion, propValue, val) {
    let response = "granted";
    if (typeof propValue !== "number" || typeof val !== "number") {
        response = "assertion-requires-numeric-values";
    }
    if (assertion.type === "gt" && !(propValue > val)) {
        response = "assertion-failed";
    }
    else if (assertion.type === "lt" && !(propValue < val)) {
        response = "assertion-failed";
    }
    return response;
}
/**
 * Is the propValue length "gt" or "lt" to the val?
 * @param assertion
 * @param propValue
 * @param val
 * @returns
 */
function lengthAssertions(assertion, propValue, val) {
    let response = "granted";
    if (typeof propValue !== "string" && !Array.isArray(propValue)) {
        response = "property-has-no-length";
    }
    else if (typeof val !== "number") {
        response = "assertion-requires-numeric-values";
    }
    else {
        if (assertion.type === "length-gt" && !(propValue.length > val)) {
            response = "assertion-failed";
        }
        else if (assertion.type === "length-lt" && !(propValue.length < val)) {
            response = "assertion-failed";
        }
    }
    return response;
}
/**
 * Does the propValue array "contain" or "without" the val?
 * @param assertion
 * @param propValue
 * @param val
 * @returns
 */
function arrayAssertions(assertion, propValue, val) {
    let response = "granted";
    if (!Array.isArray(propValue)) {
        response = "property-not-array";
    }
    else {
        const arrayProp = propValue;
        if (assertion.type === "contains") {
            if (Array.isArray(val)) {
                const containsAll = val.every((v) => arrayProp.includes(v));
                if (!containsAll) {
                    response = "array-missing-required-value";
                }
            }
            else {
                const containsVal = arrayProp.includes(val);
                if (!containsVal) {
                    response = "array-missing-required-value";
                }
            }
        }
        if (assertion.type === "contains-some") {
            if (!Array.isArray(val)) {
                response = "assertion-requires-array-value";
            }
            else {
                const containsSome = val.some((v) => arrayProp.includes(v));
                if (!containsSome) {
                    response = "array-missing-required-value";
                }
            }
        }
        if (assertion.type === "without") {
            if (Array.isArray(val)) {
                const containsSome = val.some((v) => arrayProp.includes(v));
                if (containsSome) {
                    response = "array-contains-invalid-value";
                }
            }
            else {
                const containsVal = arrayProp.includes(val);
                if (containsVal) {
                    response = "array-contains-invalid-value";
                }
            }
        }
    }
    return response;
}
function parseProperty(property) {
    let root = "entity";
    let path = `entity.${property}`;
    if (property.indexOf(":") > -1) {
        root = property.split(":")[0];
        path = `${root}.${property.split(":")[1]}`;
    }
    return { root, path };
}

/**
 * Validate entityOwner policy
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkAssertions(policy, context, entity) {
    let checks = [];
    // Only return a check if the policy is defined
    if (policy.assertions) {
        // iterate over the assertions, creating a check for each entry
        checks = policy.assertions.reduce((acc, assertion) => {
            var _a;
            let shouldCheckAssertion = true;
            // if conditions, check them first
            if ((_a = assertion.conditions) === null || _a === void 0 ? void 0 : _a.length) {
                shouldCheckAssertion = assertion.conditions.every((condition) => checkAssertion(condition, entity, context).response === "granted");
            }
            // if we pass all conditions/there are no conditions, we evaluate the assertion
            // otherwise, the assertion is ignored
            if (shouldCheckAssertion) {
                const chk = checkAssertion(assertion, entity, context);
                acc = [...acc, chk];
            }
            return acc;
        }, []);
    }
    return checks;
}

/**
 * @internal
 * Check the parent policies for the given policy
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkParents(policy, context, entity) {
    var _a;
    let checks = [];
    if ((_a = policy.dependencies) === null || _a === void 0 ? void 0 : _a.length) {
        // map over the parents array of permissions and check each one
        checks = policy.dependencies.reduce((acc, parent) => {
            const result = checkPermission(parent, context, entity);
            acc = [...acc, ...result.checks];
            return acc;
        }, []);
    }
    return checks;
}

/**
 * @internal
 * Verify that the policy.environment requirement is met.
 *
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkEnvironment(policy, context, _entity) {
    const checks = [];
    if (policy.environments && policy.environments.length) {
        let result = "granted";
        if (!policy.environments.includes(context.environment)) {
            result = "not-in-environment";
        }
        const check = {
            name: `user in ${policy.environments.join(",")} org`,
            value: context.environment,
            code: getPolicyResponseCode(result),
            response: result,
        };
        checks.push(check);
    }
    return checks;
}

/**
 * @internal
 * Verify that the policy.availability requirement is met.
 * If a value is specified in the policy, the current context must be one of those values.
 * @param policy
 * @param context
 * @param entity
 * @returns
 */
function checkAvailability(policy, context, _entity) {
    let checks = [];
    if (policy.availability && policy.availability.length) {
        // Build array of the context's availability values
        // based on the isAlphaOrg and isBetaOrg properties
        const contextAvailability = [];
        if (context.isAlphaOrg) {
            contextAvailability.push("alpha");
        }
        if (context.isBetaOrg) {
            contextAvailability.push("beta");
        }
        // if we have no values in the array, then we push in "ga"
        if (!contextAvailability.length) {
            contextAvailability.push("general");
        }
        // reduce over the policy.availability array, adding a check for each
        // value that is not included in the contextAvailability array
        // the 'flag' is only used when we want to gate the feature behind
        // a feature flag, e.g. ?pe=hub:card:follow
        checks = policy.availability.reduce((acc, value) => {
            let result = "granted";
            if (!contextAvailability.includes(value)) {
                if (value === "flag") {
                    result = `feature-flag-required`;
                }
                else {
                    result = `not-${value}-org`;
                }
            }
            let name = `user in ${value} org`;
            if (value === "flag") {
                name = `with feature flag`;
            }
            const check = {
                name,
                value: contextAvailability.join(", "),
                code: getPolicyResponseCode(result),
                response: result,
            };
            acc.push(check);
            return acc;
        }, []);
    }
    return checks;
}

function checkServiceStatus(policy, context, _entity) {
    let checks = [];
    if (policy.services) {
        const services = context.serviceStatus;
        // we need each service to have a status of "online"
        // and if not, return status info
        checks = policy.services.map((service) => {
            let result = "granted";
            if (services[service] !== "online") {
                result = `service-${services[service]}`;
            }
            const check = {
                name: `service ${service} online`,
                value: `service is ${services[service]}`,
                code: getPolicyResponseCode(result),
                response: result,
            };
            return check;
        });
    }
    return checks;
}

/**
 * Check a permission against the system policies, and possibly an entity policy
 * Note: Calls that fail will automatically be logged to the console. Additional
 * context for the call can be passed via `.label` on the `entityOrOptions` argument.
 * @param permission
 * @param context
 * @param entityOrOptions
 * @returns
 */
function checkPermission(permission, context, entityOrOptions) {
    var _a, _b, _c;
    const entity = (entityOrOptions === null || entityOrOptions === void 0 ? void 0 : entityOrOptions.entity) || entityOrOptions;
    // Is this even a valid permission?
    if (!isPermission(permission)) {
        const invalidPermissionResponse = {
            policy: permission,
            access: false,
            response: "invalid-permission",
            code: getPolicyResponseCode("invalid-permission"),
            checks: [],
        };
        // logResponse(invalidPermissionResponse, label);
        return invalidPermissionResponse;
    }
    // Get the system policy for this permission
    const systemPolicy = getPermissionPolicy(permission);
    // handle null systemPolicy
    if (!systemPolicy) {
        const missingPolicyResponse = {
            policy: permission,
            access: false,
            response: "no-policy-exists",
            code: getPolicyResponseCode("no-policy-exists"),
            checks: [],
        };
        // logResponse(missingPolicyResponse, label);
        return missingPolicyResponse;
    }
    const flagging = {
        hasFlag: false,
        value: false,
        type: "none",
    };
    // Entity Feature Flags
    // aka how we disable "features" on a per-entity basis
    // Is this policy configurable by the entity?
    if (systemPolicy.entityConfigurable) {
        // Has the entity provided a flag value?
        if ((_a = entity === null || entity === void 0 ? void 0 : entity.features) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(permission)) {
            flagging.hasFlag = true;
            flagging.value = entity.features[permission];
            flagging.type = "entity";
        }
    }
    // Feature Flags
    // Passed in from the application when context is created,
    // these override entity flags, so they are checked after
    if ((_b = context.featureFlags) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(permission)) {
        flagging.hasFlag = true;
        flagging.value = context.featureFlags[permission];
        flagging.type = "feature";
    }
    // We also check the context.userHubSettings.preview array
    // which can also be used to enable features.
    if ((_c = context.userHubSettings) === null || _c === void 0 ? void 0 : _c.preview) {
        const preview = getWithDefault(context, "userHubSettings.preview", {});
        Object.keys(preview).forEach((key) => {
            // only set the flag if it's true, otherwise delete the flag so we revert to default behavior
            if (permission === `hub:feature:${key}` &&
                getProp(preview, key) === true) {
                flagging.hasFlag = true;
                flagging.value = true;
                flagging.type = "feature";
            }
        });
    }
    // in all cases, if flag exists and false, access is denied
    if (flagging.hasFlag && !flagging.value) {
        const respValue = `disabled-by-${flagging.type}-flag`;
        const disabledByFlagResponse = {
            policy: permission,
            access: false,
            response: respValue,
            code: getPolicyResponseCode(respValue),
            // checks are needed so the aggregations in checkParents function works
            checks: [
                {
                    response: respValue,
                    code: getPolicyResponseCode(respValue),
                    name: `Feature Flag: ${permission}`,
                },
            ],
        };
        // logResponse(disabledByFlagResponse, label);
        return disabledByFlagResponse;
    }
    // required checks - things feature flags can not override
    const requiredChecks = [
        checkParents,
        checkServiceStatus,
        checkAuthentication,
        checkPrivileges,
        checkOwner,
        checkEdit,
        checkDelete,
        checkLicense,
        checkAssertions,
    ];
    // checks that feature flags can override
    const overridableChecks = [
        checkAvailability,
        checkEnvironment,
    ];
    let checkFns = [];
    // If there is a "feature" flag, set to true, for the policy
    // we just run the required checks
    if (flagging.hasFlag && flagging.value && flagging.type === "feature") {
        checkFns = [...requiredChecks];
    }
    else {
        // otherwise we run all the checks
        checkFns = [...overridableChecks, ...requiredChecks];
    }
    // execute the checks
    const checks = checkFns.reduce((acc, fn) => {
        acc = [...acc, ...fn(systemPolicy, context, entity)];
        return acc;
    }, []);
    // Default to granted
    const response = {
        policy: permission,
        access: true,
        response: "granted",
        code: getPolicyResponseCode("granted"),
        checks: [],
    };
    // For system policies, all conditions must be met, so we can
    // iterate through the checks and set the response to the first failure
    // while still returning all the checks for observability
    checks.forEach((check) => {
        if (check.response !== "granted" && response.response === "granted") {
            response.response = check.response;
            response.code = check.code;
            response.access = false;
        }
    });
    response.checks = checks;
    // Entity policies are treated as "grants" so we only need to pass one
    if (entity) {
        const entityPolicies = getWithDefault(entity, "permissions", []);
        const entityPermissionPolicies = entityPolicies.filter((e) => e.permission === permission);
        // Entity Policies are "grants" in that only one needs to pass
        // but we still want each check returned so we can see why they
        // got access or got denied
        const entityChecks = entityPermissionPolicies.map((policy) => {
            return checkEntityPolicy(policy, context);
        });
        // Process them to see if any grant access
        const grantedCheck = entityChecks.find((e) => e.response === "granted");
        // If we did not find a check that grants access, AND we've passed
        // all the system checks, then we set the response to "not-granted"
        // and set the access to false
        if (entityChecks.length &&
            !grantedCheck &&
            response.response === "granted") {
            response.access = false;
            response.response = "not-granted";
        }
        // Merge in the entity checks...
        response.checks = [...response.checks, ...entityChecks];
    }
    // log response
    // logResponse(response, label);
    return response;
}
// function logResponse(response: IPermissionAccessResponse, label: string): void {
//   if (!response.access && logPermissions) {
//     // tslint:disable-next-line:no-console
//     console.info(
//       `checkPermission: ${label} ${response.policy} : ${response.response}`
//     );
//     // tslint:disable-next-line:no-console
//     console.dir(response);
//     // tslint:disable-next-line:no-console
//     console.info(`-----------------------------------------`);
//   }
// }

export { HubPermissionsPolicies as H, checkPermission as c, getPermissionPolicy as g, isPermission as i };
