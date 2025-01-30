'use strict';

const checkPermission = require('./checkPermission-11ab5992.js');
const util = require('./util-38e73510.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const getPredicateValues = require('./getPredicateValues-091930af.js');
const getProp = require('./get-prop-4bd8fc1a.js');

/**
 * Given a type and context, return the workflows that are available to the user.
 * This checks the permissions for defined for the type, and if the user has the
 * permission, returns the workflows defined for the type.
 * @param type
 * @param context
 * @returns
 */
function getWorkflowForType(type, context) {
    // Default response is an empty array of workflows
    // meaning the user can not do anything with this type
    const response = {
        type,
        targetEntity: "item",
        workflows: [],
    };
    // If the type has a definition, we use those settings, but otherwise
    // we default to "existing"
    const definition = TypeWorkflowDefinitions.find((ct) => ct.type === type);
    // if we don't have a definition, we default to "existing"
    if (!definition) {
        // check of the user can share items
        if (checkPermission.checkPermission("platform:portal:user:shareToGroup", context).access) {
            response.workflows = ["existing"];
        }
    }
    else {
        // ensure the targetEntity is set
        response.targetEntity = definition.targetEntity;
        // otherwise we check the permission first...
        if (checkPermission.checkPermission(definition.permission, context).access) {
            response.workflows = definition.workflows;
        }
    }
    return response;
}
/**
 * Return a list of types to use as the "default" types a user could possibly
 * create / add (depending on permissions and group access).
 * This list is used when an IQuery does not have type predicates, which
 * we interpret as "all types", which is this list.
 * @param context
 * @returns
 */
function getDefaultCreateableTypes(context, limitTo = []) {
    // NOTE: AT prescribed the order: Discussion Board, Event, Project, Initiative, Group, Site Page | Hub Page, Site Application | Hub Site Application
    const prescribedOrder = [
        "Discussion",
        "Event",
        "Hub Project",
        "Hub Initiative",
        "Group",
        "Hub Page",
        "Site Page",
        "Hub Site Application",
        "Site Application",
    ];
    const itemCreateableTypes = ["Discussion", "Hub Project", "Hub Initiative"];
    // If the user has the hub:license:enterprise-sites permission
    // they are on Enterprise and the types are "site applications" and "site pages"
    if (checkPermission.checkPermission("hub:environment:enterprise", context).access) {
        itemCreateableTypes.push("Site Page");
        itemCreateableTypes.push("Site Application");
    }
    else {
        // Otherwise we infer they are running on AGO, and can
        // the types are "hub site applications" and "hub pages"
        itemCreateableTypes.push("Hub Page");
        itemCreateableTypes.push("Hub Site Application");
    }
    const eventCreateableTypes = ["Event"];
    const groupCreateableTypes = ["Group"];
    let response = [];
    if (limitTo.length) {
        if (limitTo.includes("item")) {
            response = itemCreateableTypes;
        }
        if (limitTo.includes("event")) {
            response = [...response, ...eventCreateableTypes];
        }
        if (limitTo.includes("group")) {
            response = [...response, ...groupCreateableTypes];
        }
    }
    else {
        response = [
            ...itemCreateableTypes,
            ...eventCreateableTypes,
            ...groupCreateableTypes,
        ];
    }
    response = response.sort((a, b) => {
        const aIdx = prescribedOrder.indexOf(a);
        const bIdx = prescribedOrder.indexOf(b);
        return aIdx - bIdx;
    });
    return response;
}
/**
 * @internal
 * Define the content types and their workflows
 * Note: This does not include non-item backed types like Event or Group
 * which are handled separately in getQueryContentConfig
 * Note: This is not exported from the package so changes are non-breaking
 * in terms of semver.
 */
const TypeWorkflowDefinitions = [
    {
        type: "Discussion",
        targetEntity: "item",
        permission: "hub:discussion:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Hub Project",
        targetEntity: "item",
        permission: "hub:project:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Hub Page",
        targetEntity: "item",
        permission: "hub:page:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Site Page",
        targetEntity: "item",
        permission: "hub:page:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Hub Initiative",
        targetEntity: "item",
        permission: "hub:initiative:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Hub Site Application",
        targetEntity: "item",
        permission: "hub:site:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Site Application",
        targetEntity: "item",
        permission: "hub:site:create",
        workflows: ["create", "existing"],
    },
    {
        type: "Group",
        targetEntity: "group",
        permission: "hub:group:create",
        workflows: ["create"],
    },
    {
        type: "Event",
        targetEntity: "event",
        permission: "hub:event:create",
        workflows: ["create", "existing"],
    },
    {
        // Documents will be uploadable / creatable by Hub
        // so this entry exists separate from the others
        // which will be created in AGO, and just ADDED
        // via Hub
        type: "$document",
        targetEntity: "item",
        permission: "hub:content:document:create",
        workflows: ["upload", "existing"],
    },
    // Anything that just has existing really just needs
    // to check if the user has the permission to share
    // which we can do with the platform permission vs having
    // to define a specific permission for each type
    {
        type: "$application",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
    {
        type: "$feedback",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
    {
        type: "$dashboard",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
    {
        type: "$dataset",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
    {
        type: "$experience",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
    {
        type: "$storymap",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
    {
        type: "$webmap",
        targetEntity: "item",
        permission: "platform:portal:user:shareToGroup",
        workflows: ["existing"],
    },
];

const EmptyAddContentWorkflowConfig = {
    create: null,
    upload: null,
    existing: null,
    state: "disabled",
};
/**
 * Get the add content configuration, given nothing, or a catalog or query.
 * Delegates to the appropriate function based on the type of the input.
 * @param context
 * @param catalogOrQuery
 * @returns
 */
function getAddContentConfig(context, catalogOrQuery) {
    if (catalogOrQuery) {
        if (getProp.getProp(catalogOrQuery, "targetEntity")) {
            return getAddContentConfigForQuery(catalogOrQuery, context);
        }
        else if (getProp.getProp(catalogOrQuery, "schemaVersion")) {
            return getAddContentConfigForCatalog(catalogOrQuery, context);
        }
        else {
            // Some other type of object was passed in, so just return an empty config
            const result = util.cloneObject(EmptyAddContentWorkflowConfig);
            result.reason = "invalid-object";
            return result;
        }
    }
    else {
        // nothing was passed in, so return the default config
        return getDefaultAddContentConfig(context);
    }
}
/**
 * Return the default add content config for the user
 * This will just have "create" entries for the types the user can create
 * @param context
 * @returns
 */
function getDefaultAddContentConfig(context) {
    var _a;
    const response = util.cloneObject(EmptyAddContentWorkflowConfig);
    // get the types the user can create
    const types = getDefaultCreateableTypes(context);
    const workflowTypes = types.map((type) => {
        return getWorkflowForType(type, context);
    });
    workflowTypes.forEach((wft) => {
        // Looked at DRYing this up but typescript complained so I left it
        if (wft.workflows.includes("create")) {
            if (!response.create) {
                response.create = {
                    targetEntity: wft.targetEntity,
                    workflow: "create",
                    types: [],
                };
            }
            response.create.types.push(wft.type);
        }
    });
    response.state = ((_a = response.create) === null || _a === void 0 ? void 0 : _a.types.length) ? "enabled" : "disabled";
    if (response.state === "disabled") {
        response.reason = "no-permission";
    }
    return response;
}
/**
 * Given a catalog, collect all the groups in all the predicates
 * which the user is an owner, admin, or member of; and return
 * the default createable types for the user.
 * @param catalog
 * @param context
 * @returns
 */
function getAddContentConfigForCatalog(catalog, context) {
    let response = util.cloneObject(EmptyAddContentWorkflowConfig);
    const userGroups = getPredicateValues.getCatalogGroups(catalog, context);
    if (!userGroups.owner.length &&
        !userGroups.admin.length &&
        !userGroups.member.length) {
        response.state = "disabled";
        response.reason = "not-in-groups";
        return response;
    }
    // We don't try to get the types from the catalog
    // we just use the default createable types
    response = getDefaultAddContentConfig(context);
    if (response.create) {
        response.create.groups = userGroups;
    }
    else {
        response.state = "disabled";
        response.reason = "no-permission";
    }
    return response;
}
/**
 * Get the config for a specific IQuery
 * Delegates based on targetEntity
 * @param query
 * @param context
 * @returns
 */
function getAddContentConfigForQuery(query, context) {
    if (query.targetEntity === "item") {
        return getAddContentConfigForItemQuery(query, context);
    }
    else if (query.targetEntity === "event") {
        return getAddContentConfigForEventQuery(query, context);
    }
    else if (query.targetEntity === "group") {
        return getAddContentConfigForGroupQuery(query, context);
    }
    else {
        const response = util.cloneObject(EmptyAddContentWorkflowConfig);
        response.state = "disabled";
        response.reason = "unsupported-target-entity";
        return response;
    }
}
function getAddContentConfigForGroupQuery(_query, context) {
    const response = util.cloneObject(EmptyAddContentWorkflowConfig);
    // groups can be created or added but the user needs permission
    const chk = checkPermission.checkPermission("hub:group:create", context);
    if (chk.access) {
        response.create = {
            targetEntity: "group",
            workflow: "create",
            types: ["Group"],
        };
        response.state = "enabled";
    }
    else {
        response.state = "disabled";
        response.reason = "no-permission";
        if (chk.response === "assertion-failed") {
            response.reason = "too-many-groups";
        }
    }
    return response;
}
/**
 * Specific logic for targetEntity="event"
 * @param query
 * @param userGroups
 * @param response
 * @param context
 * @returns
 */
function getAddContentConfigForEventQuery(query, context) {
    const response = util.cloneObject(EmptyAddContentWorkflowConfig);
    const userGroups = getPredicateValues.getUserGroupsFromQuery(query, context.currentUser);
    if (!userGroups.owner.length &&
        !userGroups.admin.length &&
        !userGroups.member.length) {
        response.state = "disabled";
        response.reason = "not-in-groups";
        return response;
    }
    // events can be created or added but the user needs permission
    if (checkPermission.checkPermission("hub:event:create", context).access) {
        response.create = {
            targetEntity: "event",
            workflow: "create",
            types: ["Event"],
            groups: userGroups,
        };
    }
    // Anyone can add an event (no permission check)
    response.existing = {
        targetEntity: "event",
        workflow: "existing",
        types: ["Event"],
        query: HubInitiatives.negateGroupPredicates(query),
        groups: userGroups,
    };
    response.state = "enabled";
    return response;
}
/**
 * Specific logic for targetEntity="item"
 * @param query
 * @param userGroups
 * @param response
 * @param context
 * @returns
 */
function getAddContentConfigForItemQuery(query, context) {
    const response = util.cloneObject(EmptyAddContentWorkflowConfig);
    // We need to return groups by membership so we can show the group sharing ux
    let userGroups = {
        owner: [],
        admin: [],
        member: [],
    };
    // If the query has groups, then we need to check that the user is a member of those groups
    const groups = getPredicateValues.getPredicateValues("group", query);
    if (groups.length) {
        userGroups = getPredicateValues.getUserGroupsFromQuery(query, context.currentUser);
        if (!userGroups.owner.length &&
            !userGroups.admin.length &&
            !userGroups.member.length) {
            response.state = "disabled";
            response.reason = "not-in-groups";
            return response;
        }
    }
    else {
        // we just need all the user's groups, as IGroupsByMembership object
        userGroups = getPredicateValues.getUserGroupsByMembership(context.currentUser);
    }
    // Get all the types from all the the predicates in all of the filters
    let queryTypes = getPredicateValues.getPredicateValues("type", query);
    // If there are no types we need to use the default creatable types
    if (!queryTypes.length) {
        queryTypes = getDefaultCreateableTypes(context, [query.targetEntity]);
    }
    const workflowTypes = queryTypes.map((type) => {
        return getWorkflowForType(type, context);
    });
    //
    const negatedGroupQuery = HubInitiatives.negateGroupPredicates(query);
    // now map over the workflowTypes and create the response object
    workflowTypes.forEach((wft) => {
        // Looked at DRYing this up but typescript complained so I left it
        if (wft.workflows.includes("create")) {
            if (!response.create) {
                response.create = {
                    targetEntity: wft.targetEntity,
                    workflow: "create",
                    types: [],
                    groups: userGroups,
                };
            }
            response.create.types.push(wft.type);
        }
        // Only show the add existing workflows if the query includes groups
        // otherwise the query is defined by other criteria that we likely can't
        // handle at this time (e.g. items owned by current user)
        if (wft.workflows.includes("existing") && groups.length) {
            if (!response.existing) {
                response.existing = {
                    targetEntity: wft.targetEntity,
                    workflow: "existing",
                    types: [],
                    groups: userGroups,
                    query: negatedGroupQuery,
                };
            }
            response.existing.types.push(wft.type);
        }
    });
    // Did we get any workflows the user can do?
    if (response.create || response.existing) {
        response.state = "enabled";
    }
    else {
        response.state = "disabled";
        response.reason = "no-permission";
    }
    return response;
}

exports.getAddContentConfig = getAddContentConfig;
