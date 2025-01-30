'use strict';

/**
 * Default features for a Initiative. These are the features that can be enabled / disabled by the entity owner
 */
const InitiativeDefaultFeatures = {
    "hub:initiative:events": false,
    "hub:initiative:content": true,
    "hub:initiative:discussions": false,
};
/**
 * Initiative Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const InitiativePermissions = [
    "hub:initiative",
    "hub:initiative:create",
    "hub:initiative:delete",
    "hub:initiative:edit",
    "hub:initiative:view",
    "hub:initiative:owner",
    "hub:initiative:canChangeAccess",
    "hub:initiative:events",
    "hub:initiative:content",
    "hub:initiative:discussions",
    "hub:initiative:workspace",
    "hub:initiative:workspace:overview",
    "hub:initiative:workspace:dashboard",
    "hub:initiative:workspace:details",
    "hub:initiative:workspace:metrics",
    "hub:initiative:workspace:projects",
    "hub:initiative:workspace:projects:member",
    "hub:initiative:workspace:projects:manager",
    "hub:initiative:workspace:settings",
    "hub:initiative:workspace:collaborators",
    "hub:initiative:workspace:content",
    "hub:initiative:workspace:events",
    "hub:initiative:workspace:metrics",
    "hub:initiative:workspace:catalogs",
    "hub:initiative:workspace:catalog",
    "hub:initiative:workspace:associationGroup:create",
    "hub:initiative:manage",
];
/**
 * Initiative permission policies
 * @private
 */
const InitiativePermissionPolicies = [
    {
        permission: "hub:initiative",
        services: ["portal"],
        licenses: ["hub-premium"],
    },
    {
        permission: "hub:initiative:create",
        dependencies: ["hub:initiative"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "hub:initiative:view",
        services: ["portal"],
        authenticated: false,
        licenses: ["hub-premium", "hub-basic"],
    },
    {
        permission: "hub:initiative:owner",
        dependencies: ["hub:initiative"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:initiative:edit",
        services: ["portal"],
        authenticated: true,
        entityEdit: true,
        licenses: ["hub-premium", "hub-basic"],
    },
    {
        permission: "hub:initiative:delete",
        dependencies: ["hub:initiative"],
        authenticated: true,
        entityDelete: true,
    },
    {
        permission: "hub:initiative:canChangeAccess",
        dependencies: ["hub:initiative"],
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
        permission: "hub:initiative:events",
        dependencies: ["hub:initiative:view"],
    },
    {
        permission: "hub:initiative:content",
        dependencies: ["hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:discussions",
        dependencies: ["hub:initiative:view"],
    },
    {
        permission: "hub:initiative:workspace",
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:initiative:workspace:overview",
        dependencies: ["hub:initiative:workspace", "hub:initiative:view"],
    },
    {
        permission: "hub:initiative:workspace:dashboard",
        dependencies: ["hub:initiative:workspace", "hub:initiative:view"],
    },
    {
        permission: "hub:initiative:workspace:details",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:workspace:metrics",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:workspace:projects",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:workspace:projects:member",
        dependencies: ["hub:initiative:workspace:projects"],
        assertions: [
            {
                property: "context:currentUser",
                type: "is-group-member",
                value: "entity:associations.groupId",
            },
        ],
    },
    {
        permission: "hub:initiative:workspace:projects:manager",
        dependencies: ["hub:initiative:workspace:projects"],
        assertions: [
            {
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:associations.groupId",
            },
        ],
    },
    {
        permission: "hub:initiative:workspace:settings",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:workspace:collaborators",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:workspace:content",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
        availability: ["alpha"],
    },
    {
        permission: "hub:initiative:workspace:events",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
        availability: ["alpha"],
    },
    {
        permission: "hub:initiative:workspace:metrics",
        dependencies: ["hub:initiative:workspace", "hub:initiative:edit"],
    },
    {
        permission: "hub:initiative:workspace:catalogs",
        dependencies: [
            "hub:initiative:workspace",
            "hub:feature:catalogs",
            "hub:initiative:edit",
        ],
    },
    {
        permission: "hub:initiative:workspace:catalog",
        dependencies: [
            "hub:initiative:workspace",
            "hub:feature:catalogs",
            "hub:initiative:edit",
        ],
    },
    {
        permission: "hub:initiative:manage",
        dependencies: ["hub:initiative:edit"],
    },
    // permission to create an association group
    {
        permission: "hub:initiative:workspace:associationGroup:create",
        dependencies: ["hub:initiative:workspace:projects", "hub:group:create"],
    },
];

/**
 * Default features for a Project. These are the features that can be enabled / disabled by the entity owner
 */
const ProjectDefaultFeatures = {
    "hub:project:events": false,
    "hub:project:content": true,
    "hub:project:discussions": false,
};
/**
 * Project Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const ProjectPermissions = [
    "hub:project",
    "hub:project:create",
    "hub:project:delete",
    "hub:project:edit",
    "hub:project:view",
    "hub:project:owner",
    "hub:project:canChangeAccess",
    "hub:project:events",
    "hub:project:content",
    "hub:project:discussions",
    "hub:project:associations",
    "hub:project:workspace",
    "hub:project:workspace:overview",
    "hub:project:workspace:dashboard",
    "hub:project:workspace:details",
    "hub:project:workspace:initiatives",
    "hub:project:workspace:settings",
    "hub:project:workspace:collaborators",
    "hub:project:workspace:content",
    "hub:project:workspace:events",
    "hub:project:workspace:metrics",
    "hub:project:workspace:catalogs",
    "hub:project:workspace:catalog",
    "hub:project:manage",
];
/**
 * Project permission policies
 * @private
 */
const ProjectPermissionPolicies = [
    {
        permission: "hub:project",
        services: ["portal"],
        licenses: ["hub-premium"],
    },
    {
        permission: "hub:project:create",
        authenticated: true,
        dependencies: ["hub:project"],
        privileges: ["portal:user:createItem"],
    },
    {
        // Anyone can view a project
        permission: "hub:project:view",
        services: ["portal"],
    },
    {
        permission: "hub:project:edit",
        services: ["portal"],
        authenticated: true,
        entityEdit: true,
        licenses: ["hub-premium", "hub-basic"],
    },
    {
        permission: "hub:project:delete",
        dependencies: ["hub:project"],
        authenticated: true,
        entityDelete: true,
    },
    {
        permission: "hub:project:owner",
        dependencies: ["hub:project"],
        authenticated: true,
        entityOwner: true,
    },
    {
        permission: "hub:project:canChangeAccess",
        dependencies: ["hub:project"],
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
        permission: "hub:project:events",
        dependencies: ["hub:project:view"],
        entityConfigurable: true,
    },
    {
        permission: "hub:project:content",
        dependencies: ["hub:project:edit"],
    },
    {
        permission: "hub:project:discussions",
        dependencies: ["hub:project:view"],
    },
    {
        permission: "hub:project:associations",
        dependencies: ["hub:project:view"],
    },
    {
        permission: "hub:project:workspace",
    },
    {
        permission: "hub:project:workspace:overview",
        dependencies: ["hub:project:workspace", "hub:project:view"],
    },
    {
        permission: "hub:project:workspace:dashboard",
        dependencies: ["hub:project:workspace", "hub:project:view"],
    },
    {
        permission: "hub:project:workspace:details",
        dependencies: ["hub:project:workspace", "hub:project:edit"],
    },
    {
        permission: "hub:project:workspace:initiatives",
        dependencies: [
            "hub:project:workspace",
            "hub:project:associations",
            "hub:project:edit",
        ],
    },
    {
        permission: "hub:project:workspace:settings",
        dependencies: ["hub:project:workspace", "hub:project:edit"],
    },
    {
        permission: "hub:project:workspace:collaborators",
        dependencies: ["hub:project:workspace", "hub:project:edit"],
    },
    {
        permission: "hub:project:workspace:content",
        dependencies: ["hub:project:workspace", "hub:project:edit"],
        availability: ["alpha"],
        environments: ["qaext"],
    },
    {
        permission: "hub:project:workspace:events",
        dependencies: ["hub:project:workspace", "hub:project:edit"],
        availability: ["alpha"],
        environments: ["qaext"],
    },
    {
        permission: "hub:project:workspace:metrics",
        dependencies: ["hub:project:workspace", "hub:project:edit"],
    },
    {
        permission: "hub:project:workspace:catalogs",
        dependencies: [
            "hub:project:workspace",
            "hub:feature:catalogs",
            "hub:project:edit",
        ],
    },
    {
        permission: "hub:project:workspace:catalog",
        dependencies: [
            "hub:project:workspace",
            "hub:feature:catalogs",
            "hub:project:edit",
        ],
    },
    {
        permission: "hub:project:manage",
        dependencies: ["hub:project:edit"],
    },
];

/**
 * Default features for a Site. These are the features that can be enabled / disabled by the entity owner
 */
const SiteDefaultFeatures = {
    "hub:site:events": false,
    "hub:site:content": true,
    "hub:site:discussions": false,
    "hub:site:feature:follow": true,
    "hub:site:feature:discussions": true,
};
/**
 * Site Permissions
 * This feeds into the Permissions type
 */
const SitePermissions = [
    "hub:site",
    "hub:site:create",
    "hub:site:delete",
    "hub:site:edit",
    "hub:site:view",
    "hub:site:owner",
    "hub:site:canChangeAccess",
    "hub:site:events",
    "hub:site:content",
    "hub:site:discussions",
    "hub:site:feature:follow",
    "hub:site:feature:discussions",
    "hub:site:workspace",
    "hub:site:workspace:overview",
    "hub:site:workspace:dashboard",
    "hub:site:workspace:details",
    "hub:site:workspace:settings",
    "hub:site:workspace:collaborators",
    "hub:site:workspace:content",
    "hub:site:workspace:metrics",
    "hub:site:workspace:followers",
    "hub:site:workspace:followers:member",
    "hub:site:workspace:followers:manager",
    "hub:site:workspace:followers:create",
    "hub:site:workspace:discussion",
    "hub:site:workspace:pages",
    "hub:site:workspace:events",
    "hub:site:workspace:projects",
    "hub:site:workspace:initiatives",
    "hub:site:manage",
    "hub:site:workspace:feeds",
];
/**
 * Site permission policies
 * @private
 */
const SitesPermissionPolicies = [
    {
        permission: "hub:site",
        services: ["portal"],
        licenses: ["hub-basic", "hub-premium", "enterprise-sites"],
    },
    {
        permission: "hub:site:create",
        dependencies: ["hub:site"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "hub:site:view",
        dependencies: ["hub:site"],
        authenticated: false,
    },
    {
        permission: "hub:site:delete",
        dependencies: ["hub:site"],
        authenticated: true,
        entityDelete: true,
    },
    {
        permission: "hub:site:edit",
        entityEdit: true,
        dependencies: ["hub:site"],
        authenticated: true,
    },
    {
        permission: "hub:site:canChangeAccess",
        dependencies: ["hub:site"],
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
        permission: "hub:site:events",
        dependencies: ["hub:site:view"],
    },
    {
        permission: "hub:site:content",
        dependencies: ["hub:site:edit"],
    },
    {
        permission: "hub:site:discussions",
        dependencies: ["hub:site:view"],
    },
    {
        permission: "hub:site:feature:discussions",
        dependencies: ["hub:site:view"],
        entityConfigurable: true,
    },
    {
        permission: "hub:site:feature:follow",
        dependencies: ["hub:site:view"],
        entityConfigurable: true,
    },
    {
        permission: "hub:site:workspace",
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:site:workspace:overview",
        availability: ["alpha"],
        dependencies: ["hub:site:workspace", "hub:site:view"],
    },
    {
        permission: "hub:site:workspace:dashboard",
        dependencies: ["hub:site:workspace", "hub:site:view"],
    },
    {
        permission: "hub:site:workspace:details",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:settings",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:collaborators",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:content",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:pages",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
        availability: ["alpha"],
    },
    {
        permission: "hub:site:workspace:events",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
        availability: ["alpha"],
    },
    {
        permission: "hub:site:workspace:metrics",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
        // Setting environments ensures this is not accessible to users who
        // opt into workspaces via feature flag for hub:feature:workspace
        // Stated another way, accessing this in PROD would require passing
        // ?pe=hub:site:workspace:metrics
        environments: ["devext", "qaext"],
    },
    {
        permission: "hub:site:workspace:followers",
        // TODO: refactor once we have an "upsell" UI to try to
        // get basic users to switch to premium for this feature
        licenses: ["hub-premium"],
        dependencies: ["hub:site:workspace", "hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:followers:member",
        dependencies: ["hub:site:workspace:followers"],
        assertions: [
            {
                property: "context:currentUser",
                type: "is-group-member",
                value: "entity:followersGroupId",
            },
        ],
    },
    {
        permission: "hub:site:workspace:followers:manager",
        dependencies: ["hub:site:workspace:followers"],
        assertions: [
            {
                property: "context:currentUser",
                type: "is-group-admin",
                value: "entity:followersGroupId",
            },
        ],
    },
    // permission to create a followers group
    {
        permission: "hub:site:workspace:followers:create",
        dependencies: ["hub:site:workspace:followers", "hub:group:create"],
        privileges: ["portal:user:addExternalMembersToGroup"],
    },
    {
        permission: "hub:site:workspace:discussion",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:projects",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
        availability: ["alpha"],
    },
    {
        permission: "hub:site:workspace:initiatives",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
        availability: ["alpha"],
    },
    {
        permission: "hub:site:manage",
        dependencies: ["hub:site:edit"],
    },
    {
        permission: "hub:site:workspace:feeds",
        dependencies: ["hub:site:workspace", "hub:site:edit"],
        environments: ["devext", "qaext", "production"],
    },
];
/**
 * Site versioning include list
 */
const SiteVersionIncludeList = [
    "data.values.layout",
    "data.values.theme",
    "data.values.headContent",
];

/**
 * Default features for a Project. These are the features that can be enabled / disabled by the entity owner
 */
const PageDefaultFeatures = {
// Intentally empty as this prevents overriding and adding features
};
/**
 * Page Permission Policies
 * These define the requirements any user must meet to perform related actions
 * @private
 */
const PagePermissions = [
    "hub:page",
    "hub:page:create",
    "hub:page:delete",
    "hub:page:edit",
    "hub:page:view",
    "hub:page:canChangeAccess",
    "hub:page:workspace",
    "hub:page:workspace:overview",
    "hub:page:workspace:dashboard",
    "hub:page:workspace:details",
    "hub:page:workspace:settings",
    "hub:page:workspace:collaborators",
    "hub:page:manage",
];
/**
 * Page permission policies
 * @private
 */
const PagePermissionPolicies = [
    {
        permission: "hub:page",
        services: ["portal"],
    },
    {
        permission: "hub:page:create",
        dependencies: ["hub:page"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "hub:page:view",
        dependencies: ["hub:page"],
    },
    {
        permission: "hub:page:edit",
        dependencies: ["hub:page"],
        authenticated: true,
        entityEdit: true,
    },
    {
        permission: "hub:page:delete",
        dependencies: ["hub:page"],
        authenticated: true,
        entityDelete: true,
    },
    {
        permission: "hub:page:canChangeAccess",
        dependencies: ["hub:page"],
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
        permission: "hub:page:workspace",
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:page:workspace:overview",
        availability: ["alpha"],
        dependencies: ["hub:page:workspace", "hub:page:view"],
    },
    {
        permission: "hub:page:workspace:dashboard",
        dependencies: ["hub:page:workspace", "hub:page:view"],
    },
    {
        permission: "hub:page:workspace:details",
        dependencies: ["hub:page:workspace", "hub:page:edit"],
    },
    {
        permission: "hub:page:workspace:collaborators",
        dependencies: ["hub:page:workspace", "hub:page:edit"],
    },
    {
        permission: "hub:page:workspace:settings",
        dependencies: ["hub:page:workspace", "hub:page:edit"],
    },
    {
        permission: "hub:page:manage",
        dependencies: ["hub:page:edit"],
    },
];
/**
 * Page versioning include list
 */
const PageVersionIncludeList = [
    "data.values.layout",
    "data.values.headContent",
];

/**
 * Default features for a Template. These are the features
 * that can be enabled / disabled by the entity owner
 */
const TemplateDefaultFeatures = {};
/**
 * @private
 * Template permissions: these define the requirements
 * any user must meet to perform related actions
 */
const TemplatePermissions = [
    "hub:template",
    "hub:template:create",
    "hub:template:delete",
    "hub:template:edit",
    "hub:template:manage",
    "hub:template:view",
    "hub:template:canChangeAccess",
    "hub:template:workspace",
    "hub:template:workspace:details",
    "hub:template:workspace:dashboard",
    "hub:template:workspace:collaborators",
    "hub:template:workspace:settings",
];
/**
 * @private
 * Template permission policies
 */
const TemplatePermissionPolicies = [
    {
        permission: "hub:template",
        services: ["portal"],
    },
    {
        permission: "hub:template:create",
        dependencies: ["hub:template"],
        authenticated: true,
        privileges: ["portal:user:createItem"],
    },
    {
        permission: "hub:template:delete",
        dependencies: ["hub:template"],
        authenticated: true,
        entityDelete: true,
    },
    {
        permission: "hub:template:view",
        dependencies: ["hub:template"],
    },
    {
        permission: "hub:template:edit",
        dependencies: ["hub:template"],
        authenticated: true,
        entityEdit: true,
    },
    {
        permission: "hub:template:manage",
        dependencies: ["hub:template:edit"],
    },
    {
        permission: "hub:template:canChangeAccess",
        dependencies: ["hub:template"],
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
        permission: "hub:template:workspace",
        dependencies: ["hub:feature:workspace"],
    },
    {
        permission: "hub:template:workspace:details",
        dependencies: ["hub:template:workspace", "hub:template:manage"],
    },
    {
        permission: "hub:template:workspace:dashboard",
        dependencies: ["hub:template:workspace", "hub:template:manage"],
    },
    {
        permission: "hub:template:workspace:collaborators",
        dependencies: ["hub:template:workspace", "hub:template:manage"],
    },
    {
        permission: "hub:template:workspace:settings",
        dependencies: ["hub:template:workspace", "hub:template:manage"],
    },
];

exports.InitiativeDefaultFeatures = InitiativeDefaultFeatures;
exports.InitiativePermissionPolicies = InitiativePermissionPolicies;
exports.InitiativePermissions = InitiativePermissions;
exports.PageDefaultFeatures = PageDefaultFeatures;
exports.PagePermissionPolicies = PagePermissionPolicies;
exports.PagePermissions = PagePermissions;
exports.PageVersionIncludeList = PageVersionIncludeList;
exports.ProjectDefaultFeatures = ProjectDefaultFeatures;
exports.ProjectPermissionPolicies = ProjectPermissionPolicies;
exports.ProjectPermissions = ProjectPermissions;
exports.SiteDefaultFeatures = SiteDefaultFeatures;
exports.SitePermissions = SitePermissions;
exports.SiteVersionIncludeList = SiteVersionIncludeList;
exports.SitesPermissionPolicies = SitesPermissionPolicies;
exports.TemplateDefaultFeatures = TemplateDefaultFeatures;
exports.TemplatePermissionPolicies = TemplatePermissionPolicies;
exports.TemplatePermissions = TemplatePermissions;
