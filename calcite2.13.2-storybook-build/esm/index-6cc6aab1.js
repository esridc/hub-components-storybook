import { a as _getDomainServiceUrl, s as stripProtocol } from './domain-exists-4fd7dc09.js';
export { d as domainExists } from './domain-exists-4fd7dc09.js';
import { a as includes, n as normalizeItemType, g as getHubApiUrl } from './compose-d5b83ab7.js';
import { r as request } from './request-fa80ae40.js';
import { a as cloneObject, w as without, g as maybePush, c as createId } from './util-3e6872d9.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { f as fetchHubTranslation, g as getHubProduct, a as getSubscriptionType, b as getCulture, c as convertToWellKnownLocale, d as getModelFromOptions, w as withoutByProp, e as failSafeUpdate, u as unprotectModel, s as serializeModel, h as ensureUniqueString, i as uploadResourcesFromUrl, p as propifyString, n as normalizeSolutionTemplateItem, r as replaceItemId, j as getItemAssets, k as addSolutionResourceUrlToAssets, l as buildDraft, _ as _unprotectAndRemoveGroup, m as _unprotectAndRemoveItem, o as getDomainsForSite, q as interpolateItemId, t as getSurveyModels } from './get-survey-models-e6e1fa81.js';
export { l as buildDraft, o as getDomainsForSite, v as isDomainForLegacySite, x as isDomainUsedElsewhere, y as isValidDomain, z as updateDomain } from './get-survey-models-e6e1fa81.js';
import { h as getModel, g as getSiteById, p as addItemResource, w as migrateBadBasemap, x as migrateWebMappingApplicationSites, S as SITE_SCHEMA_VERSION, _ as _ensureTelemetry, y as _migrateFeedConfig, z as _migrateEventListCardConfigs, A as _migrateTelemetryConfig, o as removeDomainsBySiteId, r as removeDomain, i as addDomain, n as addSiteDomains, k as ensureUniqueDomainName, m as getOrgDefaultTheme, B as upgradeSiteSchema } from './themes-e08327b4.js';
export { D as DEFAULT_THEME, i as addDomain, C as domainExistsPortal, k as ensureUniqueDomainName, g as getSiteById, F as getUniqueDomainName, E as getUniqueDomainNamePortal, l as lookupDomain, r as removeDomain, B as upgradeSiteSchema } from './themes-e08327b4.js';
import { g as getPortalApiUrl } from './get-portal-api-url-8aa1582b.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import { f as failSafe } from './fail-safe-cd1a5a2a.js';
import { u as unshareItemFromGroups } from './unshare-item-from-groups-b09dcce3.js';
import { d as deepSet } from './deep-set-67281c6f.js';
import { a as updateItem } from './update-6a7d5697.js';
import { m as mapBy } from './map-by-a2234e13.js';
import { s as slugify } from './slugify-e3e67bac.js';
import { s as shareItemToGroups } from './share-item-to-groups-547b9cd0.js';
import { m as mergeObjects } from './merge-objects-5b123ab3.js';
import { c as createItem } from './create-de41f6f6.js';
import { p as protectItem } from './protect-e98e6111.js';
import { s as shareItemWithGroup } from './share-item-with-group-5711513b.js';
import { i as isGuid } from './is-guid-982831aa.js';
import { b as getItemResources, e as getItemResource, a as getItem, c as getItemData } from './get-f0caeb52.js';
import { i as interpolate } from './interpolate-d39d6151.js';
import { u as updateGroup } from './update-26e2fbc1.js';
import { s as searchGroups } from './search-211dee83.js';
import { c as createGroup, p as protectGroup } from './remove-2e7122d1.js';
import { b as batch } from './batch-eaeeb888.js';
import { g as getUser } from './get-user-f035bd36.js';
import { L as Logger } from './logger-f8667200.js';
import { g as getPortalUrl } from './get-portal-url-cc8a77b9.js';
import { r as removeItem, a as removeItemResource } from './remove-7361a90a.js';
import { o as objectToJsonBlob } from './object-to-json-blob-583ae5c3.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './clean-url-dff2b6ee.js';
import './_deep-map-values-53f8dbd1.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './append-custom-params-4bd856e5.js';
import './generate-random-string-1436d9e6.js';
import './slugs-7ec67036.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './tslib.es6-7023f322.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './unshare-item-with-group-b4a3a08f.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './poll-77a94dfa.js';
import './update-user-membership-261681cf.js';

/**
 * Hash of the team group templates.
 * This hash is used to determin what teams can be created in what products
 * based on what privs and stored in what properties
 * We define the various groups via json structures. The .config hash controls
 * the i18n, as well as the portal vs ago, and basic vs premium definition.
 * This allows us to add/remove/edit groups by simply modifying this hash
 * instead of spreading complex construction logic all over the application
 */
const WELLKNOWNTEAMS = [
    {
        config: {
            groupType: "Hub Collaboration Group",
            type: "core",
            availableIn: ["premium"],
            propertyName: "collaborationGroupId",
            requiredPrivs: ["portal:admin:createUpdateCapableGroup"],
            titleI18n: "collaborationTitle",
            descriptionI18n: "collaborationDesc",
            snippetI18n: "collaborationSnippet",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "collaboration",
                },
            ],
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        _edit_privacy: "on",
        _edit_contributors: "on",
        tags: [
            "Hub Group",
            "Hub Initiative Group",
            "Hub Site Group",
            "Hub Core Team Group",
            "Hub Team Group",
        ],
    },
    {
        config: {
            groupType: "Hub Collaboration Group",
            type: "core",
            availableIn: ["basic"],
            propertyName: "collaborationGroupId",
            requiredPrivs: ["portal:admin:createUpdateCapableGroup"],
            titleI18n: "collaborationTitleBasic",
            descriptionI18n: "collaborationDescBasic",
            snippetI18n: "collaborationSnippetBasic",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "collaboration",
                },
            ],
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        _edit_privacy: "on",
        _edit_contributors: "on",
        tags: [
            "Hub Group",
            "Hub Site Group",
            "Hub Core Team Group",
            "Hub Team Group",
        ],
    },
    {
        config: {
            groupType: "Portal Collaboration Group",
            type: "core",
            availableIn: ["portal"],
            propertyName: "collaborationGroupId",
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:admin:createUpdateCapableGroup",
            ],
            titleI18n: "collaborationTitlePortal",
            descriptionI18n: "collaborationDescPortal",
            snippetI18n: "collaborationSnippetPortal",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        _edit_privacy: "on",
        _edit_contributors: "on",
        tags: ["Sites Group", "Sites Core Team Group"],
    },
    {
        config: {
            groupType: "Hub Content Group",
            type: "content",
            availableIn: ["premium"],
            propertyName: "contentGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "contentTitle",
            descriptionI18n: "contentDesc",
            snippetI18n: "contentSnippet",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "",
                },
            ],
        },
        access: "public",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        membershipAccess: "org",
        tags: [
            "Hub Group",
            "Hub Content Group",
            "Hub Site Group",
            "Hub Initiative Group",
        ],
    },
    {
        config: {
            groupType: "Hub Content Group",
            type: "content",
            availableIn: ["basic"],
            propertyName: "contentGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "contentTitleBasic",
            descriptionI18n: "contentDescBasic",
            snippetI18n: "contentSnippetBasic",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "",
                },
            ],
        },
        access: "public",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        membershipAccess: "org",
        tags: ["Hub Group", "Hub Content Group", "Hub Site Group"],
    },
    {
        config: {
            groupType: "Portal Content Group",
            type: "content",
            availableIn: ["portal"],
            propertyName: "contentGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "contentTitle",
            descriptionI18n: "contentDescPortal",
            snippetI18n: "contentSnippetPortal",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        tags: ["Sites Group", "Sites Content Group"],
    },
    {
        // this is only ever created in AGO, so we don't have a second entry for followers
        config: {
            groupType: "Hub Followers Group",
            type: "followers",
            availableIn: ["premium"],
            propertyName: "followersGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "followersTitle",
            descriptionI18n: "followersDesc",
            snippetI18n: "followersSnippet",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "",
                },
            ],
        },
        access: "public",
        autoJoin: true,
        isInvitationOnly: false,
        isViewOnly: true,
        notificationsEnabled: true,
        sortField: "title",
        sortOrder: "asc",
        membershipAccess: "org",
        tags: [
            "Hub Group",
            "Hub Initiative Followers Group",
            "Hub Initiative Group",
        ],
    },
    {
        config: {
            groupType: "Generic AGO Site Team",
            type: "team",
            availableIn: ["basic"],
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "teamTitle",
            descriptionI18n: "teamDesc",
            snippetI18n: "teamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        tags: ["Site Team Group"],
    },
    {
        config: {
            groupType: "Generic AGO Initiative Team",
            type: "team",
            availableIn: ["premium"],
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:user:addExternalMembersToGroup",
            ],
            titleI18n: "teamTitle",
            descriptionI18n: "teamDesc",
            snippetI18n: "teamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        membershipAccess: "",
        tags: ["Hub Team Group"],
    },
    {
        config: {
            groupType: "Generic AGO Edit Supporting Team",
            type: "edit",
            availableIn: ["premium"],
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:user:addExternalMembersToGroup",
            ],
            titleI18n: "teamTitle",
            descriptionI18n: "editTeamDesc",
            snippetI18n: "editTeamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        tags: ["Hub Team Group"],
        typekeyword: ["Hub Team", "Hub Edit Supporting Team"],
    },
    {
        config: {
            groupType: "Generic Portal Edit Supporting Team",
            type: "edit",
            availableIn: ["portal"],
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "teamTitle",
            descriptionI18n: "editTeamDesc",
            snippetI18n: "editTeamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        tags: ["Site Team Group"],
        typekeyword: ["Site Team", "Site Edit Supporting Team"],
    },
    {
        config: {
            groupType: "Generic Portal Team",
            type: "team",
            availableIn: ["portal"],
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "teamTitle",
            descriptionI18n: "teamDesc",
            snippetI18n: "teamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        tags: ["Site Team Group"],
    },
    {
        config: {
            groupType: "Generic Event Team",
            type: "event",
            availableIn: ["premium"],
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:user:addExternalMembersToGroup",
            ],
            titleI18n: "eventTeamTitle",
            descriptionI18n: "eventTeamDesc",
            snippetI18n: "eventTeamSnippet",
        },
        access: "public",
        autoJoin: true,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "title",
        sortOrder: "asc",
        membershipAccess: "",
        tags: ["Hub Group", "Hub Event Group", "Hub Initiative Group"],
    },
];

/**
 * Does a user have all the privileges in the passed in array
 * @param {current user from session} user
 * @param {array} privileges
 */
function hasAllPrivileges(user, privileges) {
    let result = false;
    // ensure we were passed an array...
    if (Array.isArray(privileges)) {
        result = privileges.every(priv => user.privileges.indexOf(priv) > -1);
    }
    return result;
}

/**
 * Hash of orgs with custom max group limits
 */
const limitsHash = {
    default: 512,
    mJaJSax0KPHoCNB6: 700,
    q5DTBtIqgaEcBe1j: 700,
    z6hI6KRjKHvhNO0r: 700,
    Xj56SBi2udA78cC9: 700,
    "7ldwmV3MFwjrElY8": 700,
};
/**
 * Return the max number of groups a user can be part of
 * @param orgId
 * @returns
 */
function getOrgGroupLimit(orgId) {
    return limitsHash[orgId] || limitsHash.default;
}

/**
 * Predicate for filtering group templates based on product
 * and user privs required.
 * Param order is optimized for partial application
 * @param {object} user
 * @param {string} product basic, premium, portal
 * @param {object} template Team (group) template
 */
function canUserCreateTeamInProduct(user, product, template) {
    let result = false;
    const userGroupLimit = getOrgGroupLimit(user.orgId) - 5;
    const userGroups = getProp(user, "groups") || [];
    // can this be created in the current environment?
    if (userGroups.length <= userGroupLimit &&
        includes(template.config.availableIn, product)) {
        // and user has required privs...
        result = hasAllPrivileges(user, template.config.requiredPrivs);
    }
    return result;
}

const ALLOWED_SUBSCRIPTION_TYPES = [
    "Demo & Marketing",
    "Demo and Marketing",
    "Organizational Plan",
    "Community",
    "In House",
    "ConnectED",
    "ELA",
    "Education Site License",
    "Education",
    "HUP Online",
];
/**
 * TODO: If/when AGO implements this logic or runs a script on their end we can remove
 * this logic, or simply return passed in user.
 * Returns a cloned copy of the user object with updated privileges
 * based on whether or not the user has a subscription type not in the
 * allowed list
 * @param {object} user
 * @param {string} subscriptionInfoType
 * @returns
 */
function removeInvalidPrivs(user, subscriptionInfoType) {
    // Clone User
    const clonedUser = cloneObject(user);
    // Get allowed list of sub types
    const allowedSubscriptionTypes = ALLOWED_SUBSCRIPTION_TYPES;
    // If portal self has a sub type OTHER than one of the allowed ones...
    if (!includes(allowedSubscriptionTypes, subscriptionInfoType)) {
        clonedUser.privileges = without(clonedUser.privileges, "portal:user:addExternalMembersToGroup");
    }
    return clonedUser;
}

/**
 * Updates template based upon new privPropValues property
 * In the templates config hash.
 * This allows us to conditionally change out parts of the template
 * @param {object} user
 * @param {object} template
 * @returns {object} Returns updated template
 */
function applyPrivPropValuesToTemplate(user, template) {
    const templateCopy = cloneObject(template);
    // Only two templates actually have this in config atm, so we want to be safe.
    const ppv = getWithDefault(template, "config.privPropValues", []);
    // iterate over privPropValues
    ppv.forEach((entry) => {
        // entry === each privPropValue obj { priv, prop, value}
        // If user privileges includes the privilege in privPropValue...
        if (includes(user.privileges, entry.priv)) {
            // update the group template with appropriate prop / value changes
            templateCopy[entry.prop] = entry.value; // for example updating the membershipAccess
        }
    });
    return templateCopy;
}

// TODO: Remove portalApiVersion at next breaking change
/**
 * Return array of group templates that the current user has licensing
 * and privs to create in the current environment (AGO vs Portal)
 * @param {object} user
 * @param {string} environment
 * @param {string} portalApiVersion
 * @param {string} subscriptionInfoType
 */
function getUserCreatableTeams(user, environment, subscriptionInfoType = "") {
    const teams = WELLKNOWNTEAMS;
    // Online is not properly respecting addExternalMembersToGroup for
    // certain subscription types known ones so far: Trial, personal use, developer, and evaluation
    const updatedUser = removeInvalidPrivs(user, subscriptionInfoType);
    // Update templates and remove the ones that aren't applicable.
    return cloneObject(teams).reduce((acc, teamTmpl) => {
        // Update template based on privPropValue
        const copyTemplate = applyPrivPropValuesToTemplate(updatedUser, teamTmpl);
        // If the user can create the team....
        if (canUserCreateTeamInProduct(updatedUser, environment, copyTemplate)) {
            // Add the team to the accumulator
            acc.push(copyTemplate);
        }
        return acc;
    }, []);
}

/**
 * Inject the translations into the Group object template
 * @param {object} template Json Template for the Group
 * @param {string} title Group Title
 * @param {object} translation Translation json
 * @private
 */
function _translateTeamTemplate(template, title, translation) {
    // the team template has the i18n keys in a configuration hash
    // we iterate those properties...
    ["titleI18n", "descriptionI18n", "snippetI18n"].forEach(key => {
        // get the actual i18n key from the template itself
        const i18nKey = template.config[key];
        // compute the target property name by removing the I18n
        const targetProp = key.replace("I18n", "");
        // get the translation out of the translation file we fetched
        const val = getProp(translation, `addons.services.teams.groups.${i18nKey}`);
        // interpolate the title name into the translation string
        template[targetProp] = val.replace(/{title}/g, title);
    });
    return template;
}

/**
 * Does a group with the specified title exist in the users org?
 * @param {String} title Group Title
 * @param {IHubRequestOptions} hubRequestOptions
 */
function doesGroupExist(title, hubRequestOptions) {
    const orgId = hubRequestOptions.portalSelf.id;
    const searchOpts = {
        q: `(title:"${title}" accountid:${orgId})`,
        authentication: hubRequestOptions.authentication
    };
    return searchGroups(searchOpts)
        .then(searchResponse => searchResponse.results.length > 0)
        .catch(err => {
        throw Error(`Error in team-utils::doesGroupExist ${err}`);
    });
}

/**
 * Given a title, construct a group title that is unique
 * in the user's org.
 * Given a title of "Medical Team", if a group with that title exists
 * this fn will add a number on the end, and increment until
 * an available group title is found - i.e. "Medical Team 3"
 * @param {String} title Group Title to ensure if unique
 * @param {IHubRequestOptions} hubRequestOptions
 * @param {Number} step Number to increment. Defaults to 0
 */
function getUniqueGroupTitle(title, hubRequestOptions, step = 0) {
    let combinedName = title;
    if (step) {
        combinedName = `${title} ${step}`;
    }
    return doesGroupExist(combinedName, hubRequestOptions)
        .then(result => {
        if (result) {
            step++;
            return getUniqueGroupTitle(title, hubRequestOptions, step);
        }
        else {
            return combinedName;
        }
    })
        .catch(err => {
        throw Error(`Error in team-utils::getUniqueGroupTitle ${err}`);
    });
}

/**
 * Portal Priviledges required to set group access to specific levels
 */
const GROUP_ACCESS_PRIVS = {
    public: ["portal:user:createGroup", "portal:user:shareGroupToPublic"],
    org: ["portal:user:createGroup", "portal:user:shareGroupToOrg"],
    private: ["portal:user:createGroup"]
};

/**
 * Returns the allowed group access based on a user's privileges
 * and org level settings
 * @param requestedAccess public || org || private
 * @param user User object w/ privileges array
 * @param portal optional
 */
function getAllowedGroupAccess(requestedAccess, user, portal) {
    // portal-wide flag takes presidence, and is not sync'd with privs
    const portalWideCanSharePublic = getProp(portal, "canSharePublic") || false;
    // compute what access level the current user can create the group with
    const canCreatePublic = portalWideCanSharePublic &&
        hasAllPrivileges(user, GROUP_ACCESS_PRIVS.public);
    const canCreateOrg = hasAllPrivileges(user, GROUP_ACCESS_PRIVS.org);
    // default to the requested access...
    let result = requestedAccess;
    // if they requested public, but can't make public...
    if (requestedAccess === "public" && !canCreatePublic) {
        // step down to org...
        result = "org";
        // but if they can't do that...
        if (!canCreateOrg) {
            // then do private
            result = "private";
        }
    }
    else {
        // if the requsted access was not public, it's either org or private
        // and if they can't create do org...
        if (requestedAccess === "org" && !canCreateOrg) {
            // must be private
            result = "private";
        }
    }
    return result;
}

/**
 * Create a team group. Will ensure the team name is unique in the users org
 * and return the group, with appropriate `.userMembership` attached.
 * @param {Object} user Current User
 * @param {Object} group Group to create
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _createTeamGroup(user, group, hubRequestOptions) {
    group.access = getAllowedGroupAccess(group.access, user, hubRequestOptions.portalSelf);
    return getUniqueGroupTitle(group.title, hubRequestOptions)
        .then(uniqueTitle => {
        group.title = uniqueTitle;
        return createGroup({
            group: group,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(createResponse => {
        group.id = createResponse.group.id;
        return protectGroup({
            id: group.id,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(() => {
        group.userMembership = {
            username: user.username,
            memberType: "owner",
            applications: 0
        };
        return group;
    })
        .catch(ex => {
        throw Error(`Error in team-utils::_createTeamGroup ${ex}`);
    });
}

/**
 * Internal: Actually create the team groups
 * @param {String} title Title for the Team group
 * @param {Array} groupTemplates Array of group definitions to create the groups
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _createTeamGroups(title, groupTemplates, translations, hubRequestOptions) {
    // now translate the templates...
    const translatedTemplates = groupTemplates.map(tmpl => {
        return _translateTeamTemplate(tmpl, title, translations);
    });
    // now we actually create the groups... obvs async...
    return Promise.all(translatedTemplates.map(grpTmpl => {
        return _createTeamGroup(hubRequestOptions.portalSelf.user, grpTmpl, hubRequestOptions);
    }))
        .then(groups => {
        // hoist out the id's into a structure that has the groupnameProperty: id
        const props = groups.reduce((acc, grp) => {
            // assign to the property, if one is specified
            if (grp.config.propertyName) {
                acc[grp.config.propertyName] = grp.id;
            }
            return acc;
        }, {});
        // remove config node
        groups.forEach(g => delete g.config);
        // construct the return the hash...
        // props: the props which can be spread into the item.properties hash..
        // groups: the array of groups that were created
        return {
            props,
            groups: groups
        };
    })
        .catch(ex => {
        throw Error(`Error in team-utils::_createTeamGroups ${ex}`);
    });
}

/**
 * Create all the groups (aka Teams) required for a Site or Initiative
 * The group names are derived from the Site/Initiative title. Group names
 * must be unique on create, so if necessary we will increment the names
 * after translation. If you need to ADD a Team to an existing Site/Initiative,
 * use the teams-service::addTeams function
 * @param {ICreateHubTeamsOptions} createHubTeamsOptions
 */
function createHubTeams(opts) {
    const { title, types, hubRequestOptions } = opts;
    const product = getHubProduct(hubRequestOptions.portalSelf);
    // get all the groups that this user can create in this environment
    // and filter just the team types requested
    const subscriptionType = getSubscriptionType(hubRequestOptions.portalSelf);
    const teamsToCreate = getUserCreatableTeams(hubRequestOptions.portalSelf.user, product, subscriptionType).filter((g) => {
        return types.indexOf(g.config.type) > -1;
    });
    // get the culture out of the
    const culture = getCulture(hubRequestOptions);
    const locale = convertToWellKnownLocale(culture);
    // Fire that off
    return fetchHubTranslation(locale, hubRequestOptions.portalSelf)
        .then((translations) => {
        // create the team groups
        return _createTeamGroups(title, teamsToCreate, translations, hubRequestOptions);
    })
        .catch((ex) => {
        throw Error(`Error in team-utils::createHubTeams ${ex}`);
    });
}

/**
 * This is the list of page model properties
 * that are included in a page's draft
 */
const PAGE_DRAFT_INCLUDE_LIST = ["data.values.layout"];

/**
 * This is the list of site model properties
 * that are included in a site's draft
 */
const SITE_DRAFT_INCLUDE_LIST = [
    "item.properties.schemaVersion",
    "data.values.layout",
    "data.values.theme",
    "data.values.headerCss",
    "data.values.headerSass",
    "data.values.footerSass",
    "data.values.footerCss",
];

const UNPUBLISHED_CHANGES_KW = "state:hasUnpublishedChanges";

/**
 * Determines whether an item is a site item or not
 * @param item - the item
 */
function isSite(item) {
    return normalizeItemType(item) === "Hub Site Application";
}

/**
 * Remove a Site from the Page's list of sites it is connected to
 * @param {String} siteId Id of the site to unlink from the page
 * @param {Object} pageModel Page Model
 */
function removeSiteFromPage(siteId, pageModel) {
    // look for the site in the page hash...
    return getWithDefault(pageModel, "data.values.sites", []).filter((e) => {
        return e.id !== siteId;
    });
}

/**
 * Unlink a Page from a Site and vice-versa
 * This is a super tolerant function. It can be passed ids, models or a mix.
 * It will handle either the site or the page items being missing
 * It will handle cases where the current user lacks update privs to either item or rights
 * to change the sharing. Of course in those cases we clearly can't make the changes, and
 * this function will resolve as though they were made, usually the UI tier will have
 * ensured that the current user has write access to at least one of the main entities
 * @param {IUnlinkRequestOptions} unlinkRequestOptions {siteModel || siteId, pageModel || pageId, authorization...}
 */
function unlinkSiteAndPage(unlinkRequestOptions) {
    let unshareGroups = [];
    const promises = [];
    let pageModel;
    let siteModel;
    const requestOptions = {
        authentication: unlinkRequestOptions.authentication
    };
    // get the models from the options...
    return Promise.all([
        getModelFromOptions("page", unlinkRequestOptions),
        getModelFromOptions("site", unlinkRequestOptions)
    ])
        .then(models => {
        [pageModel, siteModel] = models;
        // Handle the site
        if (!siteModel.isMissing) {
            const pages = getWithDefault(siteModel, "data.values.pages", []);
            // remove the page from the pages array on the model
            siteModel.data.values.pages = withoutByProp("id", pageModel.item.id, pages);
            // collect the groups we'll unshare the page from
            unshareGroups = maybePush(getProp(siteModel, "item.properties.collaborationGroupId"), unshareGroups);
            unshareGroups = maybePush(getProp(siteModel, "item.properties.contentGroupId"), unshareGroups);
            // update the site, but failSafe so we don't have to do any checking if the current user can update it
            promises.push(failSafeUpdate(siteModel, requestOptions));
        }
        // Handle the page
        if (!pageModel.isMissing) {
            const sites = getWithDefault(pageModel, "data.values.sites", []);
            // remove site from sites array on the model
            pageModel.data.values.sites = withoutByProp("id", siteModel.item.id, sites);
            promises.push(failSafeUpdate(pageModel, requestOptions));
            // now about the groups
            const failSafeUnshare = failSafe(unshareItemFromGroups);
            promises.push(failSafeUnshare(pageModel.item.id, unshareGroups, requestOptions));
        }
        return Promise.all(promises);
    })
        .then(() => {
        // return the updated models
        return {
            pageModel,
            siteModel
        };
    });
}

/**
 * Remove a Page Item. This deletes the item.
 * @param {Object | String} idOrModel Model object or Item Id
 * @param {IRequestOptions} requestOptions
 */
function removePage(idOrModel, requestOptions) {
    let modelPromise = Promise.resolve(idOrModel);
    if (typeof idOrModel === "string") {
        modelPromise = getModel(idOrModel, requestOptions);
    }
    let pageModel;
    // fire it to get the model...
    return modelPromise
        .then((model) => {
        pageModel = model;
        // get the id's of the sites this page is linked to...
        const linkedSites = mapBy("id", getWithDefault(pageModel, "data.values.sites", []));
        // we need to unlink the page from all sites. However, these calls *could* fail
        // if the current user lacks rights to save the site item, so we just make sure these
        // always resolve. In the Ember service code, we used `allSettled` but that's RSVP special sauce
        const failSafeUnlink = failSafe(unlinkSiteAndPage);
        return Promise.all(linkedSites.map((siteId) => {
            const opts = Object.assign({
                pageModel,
                siteId,
            }, requestOptions);
            return failSafeUnlink(opts);
        }));
    })
        .then(() => {
        return unprotectModel(pageModel, requestOptions);
    })
        .then(() => {
        const opts = Object.assign({ id: pageModel.item.id }, requestOptions);
        return removeItem(opts);
    });
}

/**
 * Update a Page item
 * @param {Object} model Page Model
 * @param {IUpdatePageOptions} updateSiteOptions
 *
 * This function supports the equivalent of a PATCH REST operation
 * It will fetch the current item from ago, and then apply
 * a subset of property changes to the model if a patchList is included.
 * The patchList can include any property paths on the item.
 * If the list is empty, then the entire page model is overwritten.
 * TODO: Add calls to remove unused image resources
 */
function updatePage(model, updateSiteOptions) {
    const patchList = Array.isArray(updateSiteOptions.allowList)
        ? updateSiteOptions.allowList
        : [];
    // store info about last update and who did it
    model.data.values.updatedAt = new Date().toISOString();
    model.data.values.updatedBy = updateSiteOptions.authentication.username;
    // nuke out the url property just for good measure
    model.item.url = "";
    let prms = Promise.resolve(model);
    if (patchList.length) {
        prms = getModel(getProp(model, "item.id"), updateSiteOptions);
    }
    return prms.then(modelFromAGO => {
        if (patchList.length) {
            // "patch" operation
            model = mergeObjects(model, modelFromAGO, patchList);
        }
        // update it
        const opts = Object.assign({ item: serializeModel(model) }, updateSiteOptions);
        opts.params = { clearEmptyFields: true };
        return updateItem(opts);
    });
}

/**
 * Get the correct url used to edit the page
 * @param item the page item
 * @param isPortal from appSettings.isPortal
 * @param siteUrl the url of the parent site
 */
function getPageEditUrl(item, isPortal, siteUrl) {
    let prefix = "";
    if (isPortal) {
        prefix = siteUrl;
    }
    return `${prefix}/edit?pageId=${item.id}`;
}

function getPaths(componentName) {
    switch (componentName) {
        case "webmap-card":
            return ["component.settings.webmap"];
        case "survey-card":
            return ["component.settings.surveyId"];
        case "app-card":
            return ["component.settings.itemId"];
        case "summary-statistic-card":
            return ["component.settings.itemId"];
        case "items/gallery-card":
            return ["component.settings.ids"];
        default:
            return [];
    }
}
/**
 * Find all the paths dependencies for the given card
 *
 * @param {ICard} card
 */
function getCardDependencies(card) {
    const componentName = getProp(card, "component.name");
    const paths = getPaths(componentName);
    return paths.reduce(collectAndFlattenPropertyValues(card), []);
}
function collectAndFlattenPropertyValues(card) {
    return (acc, path) => {
        const propertyValue = getProp(card, path);
        if (!propertyValue) {
            return acc;
        }
        if (Array.isArray(propertyValue)) {
            return acc.concat(propertyValue);
        }
        else {
            return acc.concat([propertyValue]);
        }
    };
}

/**
 * Find all the cards for the given row
 *
 * @param {IRow} row
 */
function getRowDependencies(row) {
    return row.cards.reduce((deps, card) => {
        const cardDeps = getCardDependencies(card);
        if (cardDeps.length) {
            deps = deps.concat(cardDeps);
        }
        return deps;
    }, []);
}

/**
 * Find all the row and card dependencies for the given section
 *
 * @param {ISection} section
 */
function getSectionDependencies(section) {
    return section.rows.reduce((deps, row) => {
        return deps.concat(getRowDependencies(row));
    }, []);
}

/**
 * Find all the section/row/card dependencies for the given layout
 *
 * @param {ILayout} layout
 */
function getLayoutDependencies(layout) {
    return layout.sections.reduce((deps, section) => {
        return deps.concat(getSectionDependencies(section));
    }, []);
}

/**
 * Return a list of items this page depends on
 */
function getPageDependencies(model) {
    const layout = getWithDefault(model, "data.values.layout", {});
    return getLayoutDependencies(layout);
}

/**
 * The item type depends if the app is running
 * in ArcGIS Enterprise vs AGO
 * @param {boolean} isPortal Is this running in Enterprise?
 */
function getPageItemType(isPortal) {
    let type = "Hub Page";
    if (isPortal) {
        type = "Site Page";
    }
    return type;
}

const PAGE_TYPE_KEYWORD = "hubPage";

/**
 * Given a Page Model, ensure that it has all the requires properties set correctly
 * and return a new object
 * @param {Object} pageModel Page Model object
 * @param {Object} options {username, isPortal}
 */
function ensureRequiredPageProperties(pageModel, options) {
    // clone
    const result = cloneObject(pageModel);
    result.item.owner = options.username;
    result.item.access = "private";
    if (!result.data.values) {
        result.data.values = {};
    }
    result.data.values.updatedAt = new Date().toISOString();
    result.data.values.updatedBy = options.username;
    if (!result.data.values.sites) {
        result.data.values.sites = [];
    }
    // NOTE: until we have hub-home, we are setting the page url to ''
    if (result.item.url) {
        result.item.url = "";
    }
    result.item.type = getPageItemType(options.isPortal);
    // ensure it has the typeKeyword
    if (result.item.typeKeywords.indexOf(PAGE_TYPE_KEYWORD) === -1) {
        result.item.typeKeywords.push(PAGE_TYPE_KEYWORD);
    }
    return result;
}

const PAGE_TEMPLATE_KEYWORD = "hubPageTemplate";

/**
 * Link a Page and a Site, or vice-versa
 * This is a super tolerant function. It can be passed id's, models or a mix.
 * It will handle either the site or the page items being missing
 * It will handle cases where the current user lacks update privs to either item or rights
 * to change the sharing. Of course in those cases we clearly can't make the changes, and
 * this function will resolve as though they were made, usually the UI tier will have
 * ensured that the current user has write access to at least one of the main entities
 * @param {ILinkPageAndSiteRequestOptions} linkRequestOptions {siteModel || siteId, pageModel || pageId, authorization }
 */
function linkSiteAndPage(linkRequestOptions) {
    let shareGroups = [];
    const promises = [];
    let pageModel;
    let siteModel;
    const requestOptions = { authentication: linkRequestOptions.authentication };
    // get the models from the options...
    return Promise.all([
        getModelFromOptions("page", linkRequestOptions),
        getModelFromOptions("site", linkRequestOptions),
    ])
        .then((models) => {
        // Should we handle either item being inaccessible?
        [pageModel, siteModel] = models;
        if (!siteModel.isMissing && !pageModel.isMissing) {
            // ensure we actually got a page and site
            if (!isSite(siteModel.item) ||
                !includes(["Hub Page", "Site Page"], pageModel.item.type)) {
                return Promise.resolve([]);
            }
            // if we got a both...
            // Link the Site into the Page...
            const siteEntry = {
                id: siteModel.item.id,
                title: siteModel.item.title,
            };
            if (!getProp(pageModel, "data.values.sites")) {
                deepSet(pageModel, "data.values.sites", []);
            }
            const sites = getProp(pageModel, "data.values.sites");
            const hasSiteAlready = includes(sites.map((p) => p.id), siteEntry.id);
            if (!hasSiteAlready) {
                pageModel.data.values.sites.push(siteEntry);
                const opts = Object.assign({ item: serializeModel(pageModel) }, requestOptions);
                // Not failsafe - could reject
                promises.push(updateItem(opts));
            }
            // Link the Page into the Site
            const pageEntry = {
                id: pageModel.item.id,
                title: pageModel.item.title,
            };
            if (!getProp(siteModel, "data.values.pages")) {
                deepSet(siteModel, "data.values.pages", []);
            }
            const pages = getProp(siteModel, "data.values.pages");
            const hasPageAlready = includes(pages.map((p) => p.id), pageEntry.id);
            if (!hasPageAlready) {
                const slugs = mapBy("slug", pages);
                // use the passed in slug, or generate a unique slug and add to the page entry...
                pageEntry.slug =
                    linkRequestOptions.pageSlug ||
                        ensureUniqueString(slugs, slugify(pageEntry.title));
                // push entry into pages array...
                siteModel.data.values.pages.push(pageEntry);
                // update the site item...
                const opts = Object.assign({ item: serializeModel(siteModel) }, requestOptions);
                // Not failsafe - could reject
                promises.push(updateItem(opts));
            }
            // Now we need to handle sharing of the Page to the site Collab & Content groups
            // The share functions handle pre-flights so we don't need to be concerned if the page is
            // somehow already shared to the group.
            shareGroups = maybePush(getProp(siteModel, "item.properties.collaborationGroupId"), shareGroups);
            shareGroups = maybePush(getProp(siteModel, "item.properties.contentGroupId"), shareGroups);
            // NOTE: Since sharing is limited to the owner || admin we failSafe the calls, and hope for the best.
            const failSafeShare = failSafe(shareItemToGroups);
            promises.push(failSafeShare(pageEntry.id, shareGroups, requestOptions));
            // return all the promises...
            return Promise.all(promises);
        }
        else {
            let msg = `The Page item (${pageModel.item.id}) is inaccessible.`;
            if (siteModel.isMissing) {
                if (pageModel.isMissing) {
                    msg = `Both the Page item (${pageModel.item.id}) and the Site item (${siteModel.item.id}) are inaccssible`;
                }
                else {
                    msg = `The Site item (${siteModel.item.id}) is inaccessible.`;
                }
            }
            throw new Error(`Linking Failed: ${msg}`);
        }
    })
        .then(() => {
        // Downside of optionally pusing entries into a promise array, is that you don't really know
        // what is in what index, so we really can't use the return values...
        return {
            pageModel,
            siteModel,
        };
    })
        .catch((err) => {
        throw Error(`Error occured linking site ${siteModel.item.id} with ${pageModel.item.id}: ${err}`);
    });
}

/**
 * Given a Page model, create the item, protect it, share it, connect it to the site
 * and upload any resources.
 * @param {Object} model Page model to be created as an Item
 * @param {Object} options object containing shareTo, and space for future additions
 * @param {IHubRequestOptions} hubRequestOptions IRequestOptions object, with isPortal
 */
function createPage(model, options, hubRequestOptions) {
    // ensure we got authentication
    if (!hubRequestOptions.authentication) {
        throw new Error(`createPage must be passed hubRequestOptions.authentication`);
    }
    // ensure props
    const newPage = ensureRequiredPageProperties(model, {
        username: hubRequestOptions.authentication.username,
        isPortal: hubRequestOptions.isPortal
    });
    // convert to a flat object w. .data --> .text as a json string
    const serializedModel = serializeModel(newPage);
    // create the item
    return createItem({
        item: serializedModel,
        owner: newPage.item.owner,
        authentication: hubRequestOptions.authentication
    })
        .then(createResponse => {
        // hold onto the Id so we can return a complete model
        newPage.item.id = createResponse.id;
        // protect it
        return protectItem({
            id: newPage.item.id,
            owner: newPage.item.owner,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(protectReponse => {
        // share to any groups
        let sharingPromises = [];
        if (Array.isArray(options.shareTo) && options.shareTo.length) {
            // map over the array sharing the item to all groups
            sharingPromises = options.shareTo.map((groupInfo) => {
                return shareItemWithGroup({
                    id: newPage.item.id,
                    groupId: groupInfo.id,
                    authentication: hubRequestOptions.authentication,
                    confirmItemControl: groupInfo.confirmItemControl || false
                });
            });
            newPage.item.access = "shared";
        }
        return Promise.all(sharingPromises);
    })
        .then(response => {
        // link page to sites
        const sites = getWithDefault(newPage, "data.values.sites", []);
        const requestOptions = {
            authentication: hubRequestOptions.authentication
        };
        return Promise.all(sites.map((entry) => {
            const opts = Object.assign({
                siteId: entry.id,
                pageModel: newPage
            }, requestOptions);
            return linkSiteAndPage(opts);
        }));
    })
        .then(siteLinkingResponse => {
        // upload resources
        const assets = getWithDefault(options, "assets", []);
        return uploadResourcesFromUrl(newPage, assets, hubRequestOptions);
    })
        .then(() => newPage)
        .catch(err => {
        throw Error(`createPage: Error creating page: ${err}`);
    });
}

/**
 * Traverse the layout graph, locating any cards that may have image resources
 * returning an array containing the resource information.
 * @param {Object} layout the layout to extract image cropIds from
 * @private
 */
function _getImageCropIdsFromLayout(layout) {
    const imgAssets = [];
    const headerLogo = getProp(layout, "header.component.settings.logo");
    if (headerLogo && headerLogo.cropId) {
        imgAssets.push(headerLogo);
    }
    const sections = getProp(layout, "sections") || [];
    return sections
        .reduce(collectSectionAssets, imgAssets)
        .filter(hasCropId)
        .map(extractCropId);
}
function collectSectionAssets(assets, section) {
    const sectionAssets = section.rows
        .reduce(collectCards, [])
        .filter(isImageOrJumbotronCard)
        .map(extractSettingsProperty);
    // retain crop info if section has an image background
    if (getProp(section, "style.background.cropSrc")) {
        sectionAssets.unshift(section.style.background);
    }
    return assets.concat(sectionAssets);
}
function collectCards(acc, row) {
    return acc.concat(row.cards);
}
function isImageOrJumbotronCard(card) {
    return ["image-card", "jumbotron-card"].indexOf(card.component.name) > -1;
}
function extractSettingsProperty(card) {
    return card.component.settings;
}
function hasCropId(entry) {
    return !!entry.cropId;
}
function extractCropId(entry) {
    return entry.cropId;
}

const converters = {
    "event-list-card": convertEventListCard,
    "follow-initiative-card": convertFollowCard,
    "items/gallery-card": convertItemGalleryCard,
    "image-card": convertImageCard,
    "jumbotron-card": convertImageCard
};
/**
 * Convert a card to a templatized version of itself
 * @param {ICard} card the card to templatize
 */
function convertCard(card) {
    const clone = cloneObject(card);
    const converter = converters[clone.component.name];
    if (converter) {
        return converter(clone);
    }
    return {
        card: clone,
        assets: []
    };
}
function convertEventListCard(card) {
    card.component.settings.initiativeIds = ["{{initiative.item.id}}"];
    return { card, assets: [] };
}
function convertFollowCard(card) {
    card.component.settings.initiativeId = "{{initiative.item.id}}";
    return { card, assets: [] };
}
function convertImageCard(card) {
    const result = {
        card,
        assets: []
    };
    if (getProp(card, "component.settings.fileSrc")) {
        result.assets.push(card.component.settings.fileSrc);
    }
    if (getProp(card, "component.settings.cropSrc")) {
        result.assets.push(card.component.settings.cropSrc);
    }
    return result;
}
function convertItemGalleryCard(card) {
    const settings = card.component.settings;
    const version = getProp(settings, "version");
    if (getProp(settings, "groups") && version < 4) {
        settings.groups = [
            {
                title: "{{solution.title}}",
                id: "{{teams.contentGroupId}}"
            }
        ];
    }
    if (getProp(settings, "query.groups")) {
        if (version >= 4) {
            settings.query.groups = ["{{teams.contentGroupId}}"];
        }
        else {
            settings.query.groups = [
                {
                    title: "{{solution.title}}",
                    id: "{{teams.contentGroupId}}"
                }
            ];
        }
    }
    if (getProp(settings, "query.orgId")) {
        settings.query.orgId = "{{organization.id}}";
    }
    if (getProp(settings, "orgId")) {
        settings.orgId = "{{organization.id}}";
    }
    if (settings.siteId) {
        settings.siteId = "{{appid}}";
    }
    return { card, assets: [] };
}

/**
 * Convert a row, collecting assets along the way...
 * @param {IRow} row the row to templatize
 */
function convertRow(row) {
    // if the section has a background image, and it has a url, we should
    // add that to the asset hash so it can be downloaded and added to the template item
    // and also cook some unique asset name so we can inject a placeholder
    return row.cards.reduce(convertToTemplatizedCard, { assets: [], cards: [] });
}
function convertToTemplatizedCard(acc, card) {
    const result = convertCard(card);
    acc.assets = acc.assets.concat(result.assets);
    acc.cards.push(result.card);
    return acc;
}

/**
 * Extract the fileSrc and cropSrc assets from settings.
 *
 * @param {ISettings} settings
 */
function extractAssets(settings) {
    const assets = [];
    if (settings.fileSrc) {
        assets.push(settings.fileSrc);
    }
    if (settings.cropSrc) {
        assets.push(settings.cropSrc);
    }
    return assets;
}

/**
 * Convert a section, collecting assets along the way...
 * @param {ISection} section the section to templatize
 */
function convertSection(section) {
    // if the section has a background image, and it has a url, we should
    // add that to the asset hash so it can be downloaded and added to the template item
    // and also cook some unique asset name so we can inject a placeholder
    const { rows, assets } = section.rows.reduce(toTemplatizedRows, {
        assets: [],
        rows: []
    });
    const result = {
        section: cloneObject(section),
        assets
    };
    result.section.rows = rows;
    if (sectionHasBackgroundFile(section)) {
        result.assets.push(...extractAssets(section.style.background));
    }
    return result;
}
function toTemplatizedRows(acc, row) {
    const { assets, cards } = convertRow(row);
    acc.assets.push(...assets);
    acc.rows.push({ cards });
    return acc;
}
function sectionHasBackgroundFile(clonedSection) {
    return getProp(clonedSection, "style.background.fileSrc");
}

/**
 * Convert a layout to a templatized version of itself
 * @param {ILayout} layout the layout to templatize
 */
function convertLayoutToTemplate(layout) {
    if (!layout) {
        return null;
    }
    // walk the sections, rows, cards... then call to fn's to convert specific cards...
    const converted = layout.sections.reduce((acc, section) => {
        const _result = convertSection(section);
        acc.assets = acc.assets.concat(_result.assets);
        acc.sections.push(_result.section);
        return acc;
    }, { assets: [], sections: [] });
    // assemble the response
    const result = {
        assets: converted.assets,
        layout: {
            sections: converted.sections
        }
    };
    if (layout.header) {
        result.layout.header = cloneObject(layout.header);
    }
    if (layout.footer) {
        result.layout.footer = cloneObject(layout.footer);
    }
    return result;
}

/**
 * THIS UTIL IS NO LONGER IN USE BUT MAY BE IN THE FUTURE - TATE
 */
/**
 * Removes any image "crop" versions that are no longer
 * used in the site layout.
 * TODO: Move to a module that is shared with Pages and then
 * also wire into the Page update cycle.
 * @param {String} id Id of the site or page item
 * @param {Object} layout Layout
 * @param {IHubRequestOptions} hubRequestOptions
 */
function removeUnusedResources(id, layout, hubRequestOptions) {
    const layoutImageCropIds = _getImageCropIdsFromLayout(layout);
    return getItemResources(id, hubRequestOptions).then(response => {
        const itemResourcesOnAGO = (response.resources || []).map(extractResourceProperty);
        const imageItemResourcesOnAGO = itemResourcesOnAGO.filter(resourceStartsWithImageSource);
        // getItemResources mutates the options, adding a params hash
        delete hubRequestOptions.params;
        const itemResourcesToRemove = getUnusedItemCrops(layoutImageCropIds, imageItemResourcesOnAGO);
        return removeUnusedResourcesFromAGO(id, itemResourcesToRemove, hubRequestOptions.authentication);
    });
}
function extractResourceProperty(entry) {
    return entry.resource;
}
function getUnusedItemCrops(layoutImageCropIds, itemImageResources) {
    if (!layoutContainsImageCards(layoutImageCropIds)) {
        // if there aren't any image cards in saved layout, delete all crops
        return itemImageResources;
    }
    // otherwise find crops for image cards that do not contain a current cropId
    return itemImageResources.filter(isNotACurrentImageCropId(layoutImageCropIds));
}
function layoutContainsImageCards(layoutImageCropIds) {
    return layoutImageCropIds.length > 0;
}
function resourceStartsWithImageSource(agoResource) {
    return agoResource.indexOf("hub-image-card-crop-") === 0;
}
function isNotACurrentImageCropId(imageCropIds) {
    const cropRegex = new RegExp(`-crop-(${imageCropIds.join("|")}).png$`);
    return (resource) => !resource.match(cropRegex);
}
function removeUnusedResourcesFromAGO(id, unusedCrops, authentication) {
    // failSafe these calls b/c this is not critical
    const failSaveRemoveItemResources = failSafe(removeItemResource, {
        success: true
    });
    return Promise.all(unusedCrops.map((resource) => failSaveRemoveItemResources({
        id,
        resource,
        authentication
    })));
}

/**
 * Return a list of items this site depends on
 */
function getSiteDependencies(model) {
    const pages = getProp(model, "data.values.pages") || [];
    const pageIds = pages.map((p) => p.id);
    const layout = getProp(model, "data.values.layout") || {};
    const layoutDepIds = getLayoutDependencies(layout);
    return layoutDepIds.concat(pageIds);
}

const DRAFT_RESOURCE_REGEX = /^draft-(\d+).json$/;

/**
 * Given a Page Model, return a template object
 * @param {Object} model The Page item model to convert into a template
 * @param {IHubRequestOptions} hubRequestOptions IRequestOptions object, with isPortal, and portalSelf
 */
function convertPageToTemplate(model, hubRequestOptions) {
    const tmpl = cloneObject(model);
    // set things we always want...
    tmpl.type = getPageItemType(hubRequestOptions.isPortal);
    tmpl.key = `${propifyString(model.item.title)}_${createId("i")}`;
    tmpl.itemId = model.item.id;
    // now pass the item off to be normalized
    tmpl.item = normalizeSolutionTemplateItem(tmpl.item);
    tmpl.data.values.sites = [];
    ["source", "updatedAt", "updatedBy", "folderId", "slug"].forEach((p) => {
        delete tmpl.data.values[p];
    });
    // convert the layout...
    const layoutConversion = convertLayoutToTemplate(tmpl.data.values.layout);
    // the conversion can return an array of assets to convert, but for now, we are not using that...
    tmpl.data.values.layout = layoutConversion.layout;
    tmpl.dependencies = getSiteDependencies(model);
    // convert any internal references in /data to the item's id into `{{appId}}`
    tmpl.data = replaceItemId(tmpl.data, tmpl.itemId);
    if (!tmpl.item.properties) {
        tmpl.item.properties = {};
    }
    return getItemAssets(model.item, hubRequestOptions).then((assets) => {
        // Because we don't want to include the draft resource when clone a page
        // we are filtering out assets that are not 'draft-{timestamp}.json'
        tmpl.assets = assets.filter((asset) => asset.name.search(DRAFT_RESOURCE_REGEX) === -1);
        return tmpl;
    });
}

/**
 * Given a template, settings and transformation hashes, construct the new Page model.
 * Altough this is async, it does not persist the page
 * @param {Object} template Json Template of the Page
 * @param {Object} settings Hash of values to use in the interpolation
 * @param {Object} transforms Hash of transrormation functions available during interpolation
 * @param {IHubRequestOptions} requestOptions
 */
function createPageModelFromTemplate(template, settings, transforms, hubRequestOptions) {
    // add url to the assets, ref'ing the original location
    template.assets = addSolutionResourceUrlToAssets(template, hubRequestOptions);
    // request options is not currently used, but it *may* be needed, and this fn is part
    //  of an interface needed for Solution Generation and SOME item type will need
    // to make xhrs in this process
    const pageModel = interpolate(template, settings, transforms);
    if (!pageModel.item.properties) {
        pageModel.item.properties = {};
    }
    // Debatable if this should be in the template, but since it's
    // an important part of the relationship system we manually assign it
    const parentInitiativeId = getProp(settings, "initiative.id");
    if (parentInitiativeId) {
        deepSet(pageModel, "item.properties.parentInitiativeId", parentInitiativeId);
    }
    // put the slug into the hash so we can use it in following templates
    deepSet(pageModel, "data.values.slug", slugify(pageModel.item.title));
    // do any other work here...
    return Promise.resolve(pageModel);
}

/**
 * To account for complexities in the Solution generation process
 * we need to ensure that the site is linked to the Page before
 * we throw this all through the unlink/delete process
 * @param {Object} siteModel Site Model
 * @param {Objet} pageModel Page Model
 */
function ensurePageHasSiteEntry(siteModel, pageModel) {
    const siteId = siteModel.item.id;
    const parentInitiativeId = getProp(siteModel, "item.properties.parentInitiativeId");
    // swap initiativeId to siteId
    // for a period of time, this happened during Solution generation
    if (parentInitiativeId) {
        const currentSites = getProp(pageModel, "data.values.sites");
        const initiativeEntry = currentSites.find((e) => {
            return e.id === parentInitiativeId;
        });
        if (initiativeEntry) {
            initiativeEntry.id = siteId;
        }
    }
    // ensure that we have an entry for the site
    // during solution generation, we can't inject the
    // site id into the page because the page is created
    // before the site item. We need this present so that
    // the unlinkSiteFromPage functions will be able to update
    // the upstream site
    const sites = getProp(pageModel, "data.values.sites");
    const siteEntry = sites.find((e) => {
        return e.id === siteId;
    });
    if (!siteEntry) {
        pageModel.data.values.sites.push({
            id: siteId,
            title: "Current Site to ensure clean removal"
        });
    }
    return pageModel;
}

/**
 * Determines whether an item is a page item or not
 * @param item - the item
 */
function isPage(item) {
    return normalizeItemType(item) === "Hub Page";
}

/**
 * Returns the right include list for the item type.
 * @param siteOrPageModel - the site or page model
 * @private
 */
function _includeListFromItemType(siteOrPageItem) {
    let includeList;
    if (isSite(siteOrPageItem)) {
        includeList = SITE_DRAFT_INCLUDE_LIST;
    }
    else if (isPage(siteOrPageItem)) {
        includeList = PAGE_DRAFT_INCLUDE_LIST;
    }
    else {
        throw TypeError("@esri/hub-sites: drafts only belong to a site or a page item model");
    }
    return includeList;
}

/**
 * Returns true if site or page model has unpublished changes
 * @param siteOrPageModel
 */
function hasUnpublishedChanges(siteOrPageModel) {
    return includes(siteOrPageModel.item.typeKeywords, UNPUBLISHED_CHANGES_KW);
}

/**
 * Returns a copy of the model marked as having unpublished changes
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function markPublished(siteOrPageModel) {
    const model = cloneObject(siteOrPageModel);
    model.item.typeKeywords = model.item.typeKeywords.filter(kw => kw !== UNPUBLISHED_CHANGES_KW);
    return model;
}

/**
 * Returns a copy of the model marked as having unpublished changes
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function markUnpublished(siteOrPageModel) {
    const model = cloneObject(siteOrPageModel);
    if (!includes(model.item.typeKeywords, UNPUBLISHED_CHANGES_KW)) {
        model.item.typeKeywords.push(UNPUBLISHED_CHANGES_KW);
    }
    return model;
}

const SITE_UI_VERSION = "2.4";

/**
 * Return the Portal subdomain typekeyword
 * @param {string} subdomain Portal Subdomain
 * @private
 */
function _getPortalDomainTypeKeyword(subdomain) {
    return `hubsubdomain|${subdomain}`.toLowerCase();
}

/**
 * Ensure that an entry for the specified subdomain exists in the
 * typeKeyword array. Will also remove any other domain entries,
 * @param {String} subdomain Subdomain name
 * @param {Array} typeKeywords Array of typekeywords
 * @private
 */
function _ensurePortalDomainKeyword(subdomain, typeKeywords = []) {
    // if the current entry is in the keywords array, just return it
    const expectedKeyword = _getPortalDomainTypeKeyword(subdomain);
    if (includes(typeKeywords, expectedKeyword)) {
        return typeKeywords;
    }
    else {
        return typeKeywords.reduce((acc, kw) => {
            if (!/^hubsubdomain/.test(kw)) {
                acc.push(kw);
            }
            return acc;
        }, [expectedKeyword]);
    }
}

/**
 * Update an existing site item
 * This function supports the equivalent of a PATCH REST operation
 * It will fetch the current item from ago, and then apply
 * a subset of property changes to the model if a allowList is included.
 * The allowList can include any property paths on the item.
 * If the list is empty, then the entire site model is overwritten.
 * @param {Object} model Site Model to update
 * @param {IUpdateSiteOptions} updateSiteOptions
 */
function updateSite(model, updateSiteOptions) {
    const allowList = updateSiteOptions.allowList || [];
    const { updateVersions = true } = updateSiteOptions;
    // apply any on-save site upgrades here...
    deepSet(model, "data.values.uiVersion", SITE_UI_VERSION);
    deepSet(model, "data.values.updatedAt", new Date().toISOString());
    deepSet(model, "data.values.updatedBy", updateSiteOptions.authentication.username);
    // we only add these in if an allowList was passed in
    if (allowList.length) {
        allowList.push("data.values.updatedAt");
        allowList.push("data.values.updatedBy");
        if (updateVersions) {
            allowList.push("data.values.uiVersion");
            // any save needs to be able to update the schema version
            // which will have been bumped if a schema migration
            // occured during the load cycle
            allowList.push("item.properties.schemaVersion");
        }
    }
    // PORTAL-ENV: no domain service so we encode the subdomain in a typeKeyword
    if (updateSiteOptions.isPortal) {
        model.item.typeKeywords = _ensurePortalDomainKeyword(getProp(model, "data.values.subdomain"), model.item.typeKeywords);
        // see above comment why ths is gated...
        if (allowList.length) {
            allowList.push("item.typeKeywords");
        }
    }
    // Actually start the update process...
    let agoModelPromise;
    // if we have a allowList, refetch the site to check for changes...
    if (allowList.length) {
        agoModelPromise = getSiteById(model.item.id, updateSiteOptions);
    }
    else {
        // if we dont have a allowList, just resolve with the model we have
        agoModelPromise = Promise.resolve(model);
    }
    // Kick things off...
    return agoModelPromise
        .then((agoModel) => {
        if (allowList.length) {
            // merge the props in the allow list into the model from AGO
            model = mergeObjects(model, agoModel, allowList);
        }
        // send the update to ago
        return updateItem({
            item: serializeModel(model),
            authentication: updateSiteOptions.authentication,
            params: { clearEmptyFields: true },
        });
    })
        .catch((err) => {
        throw Error(`updateSite: Error updating site: ${err}`);
    });
}

/**
 * Saves the published status of a site or page model
 * leaving everything else on the model alone.
 *
 * @param siteOrPageModel
 * @param requestOptions
 */
function savePublishedStatus(siteOrPageModel, requestOptions) {
    const allowList = ["item.typeKeywords"]; // only want to save typeKeywords
    const { item } = siteOrPageModel;
    let prms;
    if (isSite(item)) {
        // when saving a draft site, we need to prevent the schemaVersion
        // from being updated. otherwise, if the user does not publish the draft,
        // functionality potentially will be broken for all users because the item
        // reflects the most recent schemaVersion without any of the actual schema
        // changes
        const isUnpublished = hasUnpublishedChanges(siteOrPageModel);
        prms = updateSite(siteOrPageModel, Object.assign(Object.assign({}, requestOptions), { allowList, updateVersions: !isUnpublished }));
    }
    else if (isPage(item)) {
        prms = updatePage(siteOrPageModel, Object.assign(Object.assign({}, requestOptions), { allowList }));
    }
    else {
        throw TypeError("@esri/hub-sites: only page or site models have a published state");
    }
    return prms;
}

/**
 * Gets the name of the resource for the current draft.
 * NOTE: There _should_ only be one, but sometimes it gets messed up.
 * @param siteOrPageId
 * @param hubRequestOptions
 * @private
 */
function _getDraftResourceNames(siteOrPageId, hubRequestOptions) {
    return getItemResources(siteOrPageId, {
        portal: hubRequestOptions.portal,
        authentication: hubRequestOptions.authentication
    }).then(response => {
        // search through the resources to find the draft
        const draftResourceNames = response.resources
            .map(({ resource: name }) => name)
            .filter((name) => name.search(DRAFT_RESOURCE_REGEX) !== -1);
        return draftResourceNames;
    });
}

/**
 * Given an item id, removes the current draft resource if exists
 * @param {*} siteOrPageId
 * @param {*} hubRequestOptions
 */
function deleteDraft(siteOrPageModel, hubRequestOptions) {
    const { item: { id, owner } } = siteOrPageModel;
    return _getDraftResourceNames(id, hubRequestOptions).then(draftResourceNames => Promise.all(draftResourceNames.map(resourceName => removeItemResource({
        id,
        owner,
        resource: resourceName,
        portal: hubRequestOptions.portal,
        authentication: hubRequestOptions.authentication
    }))));
}

/**
 * Given a site or page model, saves a draft
 *
 * NOTE - replaces current draft if exists
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function saveDraft(siteOrPageModel, hubRequestOptions) {
    const includeList = _includeListFromItemType(siteOrPageModel.item);
    const draft = buildDraft(siteOrPageModel, includeList);
    const draftBlob = objectToJsonBlob(draft);
    const draftName = `draft-${Date.now()}.json`;
    const itemId = getProp(siteOrPageModel, "item.id");
    return deleteDraft(siteOrPageModel, hubRequestOptions)
        .then((_) => addItemResource({
        id: itemId,
        owner: getProp(siteOrPageModel, "item.owner"),
        resource: draftBlob,
        name: draftName,
        private: false,
        portal: hubRequestOptions.portal,
        authentication: hubRequestOptions.authentication,
    }))
        .then((_) => draft);
}

/**
 *
 * @param draftName
 */
function getDraftDate(draftName) {
    const parsed = DRAFT_RESOURCE_REGEX.exec(draftName);
    let ret;
    try {
        ret = new Date(parseInt(parsed[1], 10));
    }
    catch (_a) {
        ret = null;
    }
    return ret;
}

/**
 * Gets the name of the most recent resource for the current draft.
 * NOTE: There _should_ only be one, but sometimes it gets messed up.
 * @param siteOrPageId
 * @param hubRequestOptions
 * @private
 */
function _getMostRecentDraftName(siteOrPageId, hubRequestOptions) {
    return _getDraftResourceNames(siteOrPageId, hubRequestOptions).then(draftNames => {
        if (!draftNames.length)
            return null;
        const dates = draftNames.map(name => [name, getDraftDate(name)]);
        dates.sort(([_, dateA], [__, dateB]) => {
            if (dateB > dateA) {
                return 1;
            }
            else if (dateA > dateB) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return dates[0][0];
    });
}

const schemaVersionPath = "item.properties.schemaVersion";
const initialDraftVersion = 1.3;
/**
 * Applies the schema upgrades
 * @param draft IDraft
 */
function upgradeDraftSchema(draft) {
    if (getProp(draft, "item.properties.schemaVersion") === undefined) {
        deepSet(draft, schemaVersionPath, initialDraftVersion);
    }
    // Migrations that should always be applied
    draft = migrateBadBasemap(draft);
    draft = migrateWebMappingApplicationSites(draft);
    if (getProp(draft, "item.properties.schemaVersion") === SITE_SCHEMA_VERSION) {
        return draft;
    }
    else {
        let migrated = draft;
        // apply site schema upgrade functions in order...
        // don't have do do them all since drafts only got released
        // at version 1.3
        migrated = _ensureTelemetry(draft);
        migrated = _migrateFeedConfig(draft);
        migrated = _migrateEventListCardConfigs(draft);
        migrated = _migrateTelemetryConfig(draft);
        return migrated;
    }
}

function isSiteDraft(draft) {
    // Maybe a better way to do this, but can't use item type
    // because we have Web Mapping Application sites in the wild
    // and typeKeywords don't exist on drafts.
    //
    // We could always request the site item and check it as part of
    // this but I'd rather not since that's an extra XHR and this is a
    // pretty robust schema check.
    return (getProp(draft, "data.values.capabilities") !== undefined &&
        getProp(draft, "data.values.theme") !== undefined);
}
/**
 * Fetches the draft for a site or page if exists.
 * @param {*} siteOrPageId
 * @param {*} hubRequestOptions
 */
function fetchDraft(siteOrPageId, hubRequestOptions) {
    return _getMostRecentDraftName(siteOrPageId, hubRequestOptions)
        .then(draftResourceName => {
        let ret = null;
        if (draftResourceName) {
            ret = getItemResource(siteOrPageId, {
                fileName: draftResourceName,
                readAs: "json",
                authentication: hubRequestOptions.authentication,
                portal: hubRequestOptions.portal
            });
        }
        return ret;
    })
        .then((draft) => {
        if (draft && isSiteDraft(draft)) {
            draft = upgradeDraftSchema(draft);
        }
        return draft;
    });
}

/**
 * Applies a draft resource to an item model
 * @param {*} siteOrPageModel
 * @param {*} draft
 */
function applyDraft(siteOrPageModel, draft) {
    if (!draft)
        return siteOrPageModel;
    const includeList = _includeListFromItemType(siteOrPageModel.item);
    return mergeObjects(draft, cloneObject(siteOrPageModel), includeList);
}

/**
 * This function fetches and applies the draft
 * to the site or page if the draft is available.
 *
 * It returns a completely new object with the draft applied
 * if there is one, otherwise it just returns the site or
 * page model argument.
 *
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function fetchAndApplyDraft(siteOrPageModel, hubRequestOptions) {
    return fetchDraft(getProp(siteOrPageModel, "item.id"), hubRequestOptions).then(draft => applyDraft(siteOrPageModel, draft));
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Get the domains associated with a Hub Site.
 * @param siteId - Identifier of the Hub Site
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the domains associated with the site.
 */
function getDomains(siteId, requestOptions) {
    const url = _getDomainServiceUrl(getHubApiUrl(requestOptions));
    const options = Object.assign({ params: { siteId }, httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * Get the domain associated with a Hub Site. Since a site may have a
 * custom domain, in addition to a default domain, we will return the
 * custom domain over the default domain.
 *
 * @param siteId - Identifier of the Hub Site
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the domains associated with the site.
 */
function getDomain(siteId, requestOptions) {
    return getDomains(siteId, requestOptions).then((response) => {
        if (response.length > 1) {
            // ok - in this case, it's likely that we have a default domain and a custom domain...
            // we want the one that's custom... i.e. does not contain arcgis.com
            const customEntry = response.reduce((acc, entry) => {
                if (!entry.hostname.includes("arcgis.com")) {
                    acc = entry;
                }
                return acc;
            }, null);
            if (customEntry) {
                // return the custom domain
                return customEntry.hostname;
            }
            else {
                // just pick the first one
                return response[0].hostname;
            }
        }
        else {
            // there is only 1, so return it
            return response[0].hostname;
        }
    });
}

/**
 * Remove the well-known team groups
 * Underlying calls are failsafe so this will never throw
 * but the groups may not be deleted
 * @param {Object} siteModel Site Model
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _removeSiteGroups(siteModel, requestOptions) {
    const teamsToDelete = [
        "collaborationGroupId",
        "contentGroupId",
        "followersGroupId"
    ].reduce((acc, prop) => {
        return maybePush(getProp(siteModel, `item.properties.${prop}`), acc);
    }, []);
    const promises = teamsToDelete.map(id => {
        const opts = Object.assign({ id }, requestOptions);
        return _unprotectAndRemoveGroup(opts);
    });
    return Promise.all(promises);
}

/**
 * Remove the parent initiative item, if it exists
 * Failsafe
 * @param {Object} siteModel Site Model
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _removeParentInitiative(siteModel, requestOptions) {
    const parentInitiativeId = getProp(siteModel, "item.properties.parentInitiativeId");
    if (parentInitiativeId) {
        const opts = Object.assign({ id: parentInitiativeId, owner: siteModel.item.owner }, requestOptions);
        return _unprotectAndRemoveItem(opts);
    }
    else {
        return Promise.resolve();
    }
}

/**
 * Remove a Site from the Hub Index system
 * @param {Object} siteModel Site Model
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _removeSiteFromIndex(siteModel, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve();
    }
    else {
        const url = `${getHubApiUrl(hubRequestOptions)}/api/v3/${siteModel.item.id}`;
        const opts = {
            method: "DELETE",
            mode: "cors",
            headers: {
                Authorization: hubRequestOptions.authentication.token,
            },
        };
        return fetch(url, opts)
            .then((raw) => raw.json())
            .then((_) => {
            // TODO: Should we do anything here?
            return { success: true };
        })
            .catch((err) => {
            throw Error(`_removeSiteFromIndex: Error removing site from index: ${err}`);
        });
    }
}

/**
 * Remove the domain entries for a site
 * @param {string} siteId Item Id of the site to remove the domain entries for
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _removeSiteDomains(siteId, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve([]);
    }
    return removeDomainsBySiteId(siteId, hubRequestOptions).then((response) => response);
}

/**
 * We have updated aspects of the site templating logic, and now we need to
 * ensure that the groupId properties in the item template have :optional
 * if they are defined. This function simply does that.
 * @param {Object} itemTemplate template for the item part of the site
 * @private
 */
function _ensureOptionalGroupsTemplating(itemTemplate) {
    const props = ["collaborationGroupId", "contentGroupId", "followersGroupId"];
    const tmpl = cloneObject(itemTemplate);
    props.forEach(prop => {
        const val = getProp(tmpl, `properties.${prop}`);
        if (val) {
            if (val.match(/^\{\{.*\}\}$/)) {
                if (!val.match(/:optional\}\}$/g)) {
                    // replace it
                    tmpl.properties[prop] = val.replace("}}", ":optional}}");
                }
            }
            else {
                delete tmpl.properties[prop];
            }
        }
    });
    return tmpl;
}

/**
 * The item type depends if the app is running
 * in ArcGIS Enterprise vs AGO
 * @param {boolean} isPortal Is this running in Enterprise?
 */
function getSiteItemType(isPortal) {
    let type = "Hub Site Application";
    if (isPortal) {
        type = "Site Application";
    }
    return type;
}

/**
 * Enture that the site model has the correct type and tags
 * Mutates the Model
 * @param {Object} model Site Model
 * @param {Object} currentUser Current User
 * @param {Boolean} isPortal Is this running in ArcGIS Enterprise
 * @private
 */
function _ensureTypeAndTags(model, isPortal) {
    model = cloneObject(model);
    model.item.type = getSiteItemType(isPortal);
    // ensure typekeywords array
    if (!Array.isArray(model.item.typeKeywords)) {
        model.item.typeKeywords = [];
    }
    if (!includes(model.item.typeKeywords, "hubSite")) {
        model.item.typeKeywords.push("hubSite");
    }
    return model;
}

/**
 * Get the correct url used to edit the site
 * @param item the site item
 */
function getSiteEditUrl(item) {
    return `${item.url}/edit`;
}

/**
 * Update the list of valid uris associated with the Site item
 * @param {Object} site Site Model
 * @param {Array} uris Array of valid uris for the site
 * @param {IHubRequestOptions} hubRequestOptions
 */
function updateSiteApplicationUris(site, uris, hubRequestOptions) {
    if (hubRequestOptions.isPortal)
        return Promise.resolve({});
    // Domain service handles updating the app redirect uris for sites
    // First, get the domain records associated with the site
    return getDomainsForSite(site.item.id, hubRequestOptions).then((domainInfos) => {
        // get all domains that are no longer associated with the site
        const domainsToRemove = domainInfos.filter((domain) => !includes(uris, domain.hostname));
        // get all new domains that are now associated with the site
        const hostnames = domainInfos.map((domain) => domain.hostname);
        const domainsToAdd = uris.filter((uri) => !includes(hostnames, uri));
        // finally, kick all the promises
        const domainPromises = [];
        domainsToRemove.forEach((domain) => domainPromises.push(removeDomain(domain.id, hubRequestOptions)));
        domainsToAdd.forEach((uri) => domainPromises.push(addDomain({
            orgKey: hubRequestOptions.portalSelf.urlKey,
            orgId: hubRequestOptions.portalSelf.id,
            orgTitle: hubRequestOptions.portalSelf.name,
            hostname: uri,
            siteId: site.item.id,
            siteTitle: site.item.title,
            clientKey: site.data.values.clientId,
            sslOnly: domainInfos[0] ? !!domainInfos[0].sslOnly : true,
        }, hubRequestOptions)));
        return Promise.all(domainPromises);
    });
}

/**
 * Update the redirect uri's that are valid for an existing app that's registered
 * for oAuth.
 * @param {string} clientId Client Id of the existing app to be updated
 * @param {Array} redirectUris Array of valid redirect uris for the app
 * @param {IRequestOptions} requestOptions
 */
function updateAppRedirectUris(clientId, redirectUris, requestOptions) {
    const url = `${getPortalApiUrl(requestOptions)}/oauth2/apps/${clientId}/update`;
    const options = {
        method: "POST",
        authentication: requestOptions.authentication,
        params: {
            client_id: clientId,
            redirect_uris: JSON.stringify(redirectUris)
        }
    };
    return request(url, options);
}

/**
 * Given a site, update all the linked page items and remove their
 * references to the site
 * @param {Object} siteModel Site Model
 * @param {IRequestOptions} requestOptions
 */
function unlinkPagesFromSite(siteModel, requestOptions) {
    const linkedPages = mapBy("id", getWithDefault(siteModel, "data.values.pages", []));
    // we need to unlink the site from all it's pages. However, these calls *could* fail
    // if the current user lacks rights to save the site/page item, so we just make sure these
    // always resolve. In the Ember service code, we used `allSettled` but that's RSVP special sauce
    const failSafeUnlink = failSafe(unlinkSiteAndPage);
    return Promise.all(linkedPages.map((pageId) => {
        const opts = Object.assign({
            siteModel,
            pageId
        }, requestOptions);
        return failSafeUnlink(opts);
    }));
}

/**
 * Ensure that the item template has `:optional` on the item.properties.* team
 * properties. Does not mutate the passed in object - returns a clone.
 * @param {Object} itemTemplate Item Template to work with
 */
function ensureOptionalGroupsTemplating(itemTemplate) {
    const props = ["collaborationGroupId", "contentGroupId", "followersGroupId"];
    const tmpl = cloneObject(itemTemplate);
    props.forEach(prop => {
        const val = getProp(tmpl, `properties.${prop}`);
        if (val) {
            if (val.match(/^\{\{.*\}\}$/)) {
                if (!val.match(/:optional\}\}$/g)) {
                    // replace it
                    tmpl.properties[prop] = val.replace("}}", ":optional}}");
                }
            }
            else {
                delete tmpl.properties[prop];
            }
        }
    });
    return tmpl;
}

/**
 * Remove a Site Item
 * * Unlinks all pages
 * * removes all groups
 * * deletes any parent initiatve
 * * removes site from hub index,
 * * removes all domains associated with the site
 * * removes the site item
 *
 * @param {string || Object} idOrModel Id of the site or a site model
 * @param {IHubUserRequestOptions} hubRequestOptions
 */
function removeSite(idOrModel, hubRequestOptions) {
    let modelPromise;
    if (typeof idOrModel === "string") {
        modelPromise = getModel(idOrModel, hubRequestOptions);
    }
    else {
        modelPromise = Promise.resolve(idOrModel);
    }
    let siteModel;
    return modelPromise
        .then((model) => {
        siteModel = model;
        return unlinkPagesFromSite(siteModel, hubRequestOptions);
    })
        .then(() => {
        // remove the groups
        return _removeSiteGroups(siteModel, hubRequestOptions);
    })
        .then(() => {
        // remove the parent initiative if that's a thing
        return _removeParentInitiative(siteModel, hubRequestOptions);
    })
        .then(() => {
        // remove the domains associated with the site item
        return _removeSiteDomains(siteModel.item.id, hubRequestOptions);
    })
        .then(() => {
        // remove the site from the Hub index
        // failSafe because this is not critical
        return failSafe(_removeSiteFromIndex, { success: true })(siteModel, hubRequestOptions);
    })
        .then(() => {
        const opts = Object.assign({ id: siteModel.item.id, owner: siteModel.item.owner }, hubRequestOptions);
        return _unprotectAndRemoveItem(opts);
    })
        .catch((err) => {
        throw Error(`removeSite: Error removing site: ${err}`);
    });
}

/**
 * Enture that the site model has all the required properties
 * and force them to be bumped to all the current values.
 * Returns a clone of the model
 * @param {Object} model Site Model
 * @param {Object} currentUser Current User
 * @param {Boolean} isPortal Is this running in ArcGIS Enterprise
 */
function ensureRequiredSiteProperties(model, username, isPortal = false) {
    model = cloneObject(model);
    model.item.owner = username;
    model.item.access = "private";
    // ensure typekeywords array
    if (!Array.isArray(model.item.typeKeywords)) {
        model.item.typeKeywords = [];
    }
    model.data.values.updatedAt = new Date().toISOString();
    model.data.values.updatedBy = username;
    if (isPortal) {
        model.item.typeKeywords.push(_getPortalDomainTypeKeyword(model.data.values.subdomain));
    }
    // Handle item url - if it's set...
    if (!model.item.url) {
        const hostname = getProp(model, "data.values.customHostname") ||
            getProp(model, "data.values.defaultHostname");
        // unless a custom hostname was passed in AND the site item's url is falsey
        // (which currently should be impossible) we want the protocol of the item url
        // to be https.
        let protocol = "https";
        if (model.data.values.customHostname) {
            protocol = "http";
        }
        model.item.url = `${protocol}://${hostname}`;
    }
    // Ensure pages is an array...
    if (!Array.isArray(getProp(model, "data.values.pages"))) {
        deepSet(model, "data.values.pages", []);
    }
    deepSet(model, "data.values.uiVersion", SITE_UI_VERSION);
    // ensure the type and tags...
    model = _ensureTypeAndTags(model, isPortal);
    // ensure the capabilities...
    const defaultCaps = [
        "api_explorer",
        "pages",
        "my_data",
        "social_logins",
        "json_chart_card",
        "document_iframes",
        "items_view",
        "app_page",
        "underlinedLinks",
        "globalNav",
    ];
    const caps = (model.data.values.capabilities || []).reduce((acc, capability) => acc.includes(capability) ? acc : [...acc, capability], defaultCaps);
    if (!isPortal && !caps.includes("socialSharing")) {
        caps.push("socialSharing");
    }
    deepSet(model, "data.values.capabilities", caps);
    if (!getProp(model, "data.telemetry")) {
        deepSet(model, "data.telemetry", {});
    }
    // return the clone
    return model;
}

/**
 * Save an IModel. Generic function that will be used across all
 * type-specific save functions
 *
 * @export
 * @param {IModel} "model" object (i.e. `{item:{...}, data:{...}}`)
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IModel>}
 */
function saveModel(model, requestOptions) {
    const clone = cloneObject(model);
    const opts = createRequestOptions(clone, requestOptions);
    return createItem(opts).then((response) => {
        clone.item.id = response.id;
        return clone;
    });
}
/**
 * Centralize the serialization of an IModel into an object
 * that we can send to the Item methods
 *
 * @param {IModel} model
 * @param {IRequestOptions} requestOptions
 * @returns {*}
 */
function createRequestOptions(model, requestOptions) {
    // construct an object to send to the API
    const item = cloneObject(model.item);
    item.data = cloneObject(model.data);
    // create the options...
    const opts = Object.assign({ item }, requestOptions);
    return opts;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Save an Initiative model. If the model does not have an item.id
 * we will create a new item. Otherwise we update the existing item.
 * Returns the same model instance, with the item.id assigned;
 *
 * @export
 * @param {IInitiativeModel} model
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IInitiativeModel>}
 */
function addInitiative(model, requestOptions) {
    // delegate to model to do the save...
    return saveModel(model, requestOptions);
}

const DEFAULT_INITIATIVE_TEMPLATE = {
    item: {
        title: "{{solution.title}}",
        snippet: "{{solution.snippet}}",
        description: "{{solution.snippet}}",
        type: "Hub Initiative",
        typeKeywords: ["Hub", "hubInitiative"],
        tags: [],
        extent: "{{organization.defaultExtentBBox}}",
        culture: "{{user.culture}}",
        properties: {},
        url: "",
    },
    data: {
        assets: [],
        indicators: [],
        recommendedTemplates: [],
    },
};

/**
 * Get the translated default initiative template
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getDefaultInitiativeTemplate(hubRequestOptions) {
    const culture = getCulture(hubRequestOptions);
    const locale = convertToWellKnownLocale(culture);
    return fetchHubTranslation(locale, hubRequestOptions.portalSelf).then(translation => {
        // now we can get the embedded initiative template
        const tmpl = cloneObject(DEFAULT_INITIATIVE_TEMPLATE);
        // pluck values off the translation, and inject into the tmpl
        tmpl.item.description = getProp(translation, "addons.services.templates.customInitiative.item.description");
        tmpl.item.snippet = getProp(translation, "addons.services.templates.customInitiative.item.snippet");
        tmpl.item.culture = locale;
        // TODO: HANDLE RESOURCES!
        return tmpl;
    });
}

// TODO: the initiative will be in the site hash OR we pass it in
/**
 * Given a Site Template, do what we can to return an initiative template
 * In Hub, we expect the system to populate tmpl.properties.initiativeTemplate
 * In other apps, this may not be present, so we use the default template
 * (fetched from the Hub app)
 * @param {object} siteTemplate Site Template
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getInitiativeTemplate(siteTemplate, hubRequestOptions) {
    let tmplPromise;
    const template = getProp(siteTemplate, "properties.initiativeTemplate");
    if (template) {
        tmplPromise = Promise.resolve(template);
    }
    else {
        // return the default template
        tmplPromise = getDefaultInitiativeTemplate(hubRequestOptions);
    }
    return tmplPromise;
}

/**
 * Update the Site associated with an Initiative by setting the
 * `item.properties.siteId` to a new value
 *
 * Used during createSite(...) and any time we need to
 * connect a different Site to an Initiative
 *
 * @param initiativeItemId string | IItem | IModel
 * @param siteId string
 * @param hubRequestOptions IHubRequestOptions
 */
function updateInitiativeSiteId(maybeModel, siteId, hubRequestOptions) {
    // assume it's an IItem
    let itemPromise = Promise.resolve(maybeModel);
    // if we got a string, treat it as an id
    if (typeof maybeModel === "string") {
        if (!isGuid(maybeModel)) {
            return Promise.reject(new Error("updateInitiativeSiteId was passed a string that is not a GUID."));
        }
        else {
            itemPromise = getItem(maybeModel, {
                authentication: hubRequestOptions.authentication
            });
        }
    }
    else {
        // if it's an IModel it will have `.item.id` defined
        if (getProp(maybeModel, "item.id")) {
            const m = maybeModel;
            itemPromise = Promise.resolve(m.item);
        }
    }
    // kick off the promise that will return an IItem
    return itemPromise.then((item) => {
        // oddly, IItem does not have .properties even as an optional O_o
        // regardless, ensure .properties exists
        if (!item.properties) {
            item.properties = {};
        }
        // set the siteId
        item.properties.siteId = siteId;
        // and... update the item
        return updateItem({
            item,
            authentication: hubRequestOptions.authentication
        });
    });
}

/**
 * Create a New Site
 * Creates and protects the site item
 * Uploads any assets/thumbnails passed in via options.assets array
 * If not portal..,
 * - register the site as an application, w/ needed redirect uris
 * - register the domains with the Hub Domain Service
 * @param {Object} model Site Model to create
 * @param {Object} options options hash. Key prop is assets
 * @param {IHubRequestOptions} hubRequestOptions
 */
function createSite(model, options, hubRequestOptions) {
    // ensure properties
    model = ensureRequiredSiteProperties(model, hubRequestOptions.authentication.username, hubRequestOptions.isPortal);
    // create the item
    return createItem({
        item: serializeModel(model),
        owner: model.item.owner,
        authentication: hubRequestOptions.authentication,
    })
        .then((createResponse) => {
        // hold onto the Id so we can return a complete model
        model.item.id = createResponse.id;
        // protect it
        return protectItem({
            id: model.item.id,
            owner: model.item.owner,
            authentication: hubRequestOptions.authentication,
        });
    })
        .then((protectResponse) => {
        // get the clientId out of the addSiteDomains call
        return addSiteDomains(model, hubRequestOptions);
    })
        .then((domainResponses) => {
        // client id will be the same for all domain resonses so we can just grab the first one
        model.data.values.clientId = domainResponses[0].clientKey;
        // If we have a dcat section, hoist it out as it may contain complex adlib
        // templates that are needed at run-time
        // If we have data.values.dcatConfig, yank it off b/c that may have adlib template stuff in it
        const dcatConfig = cloneObject(model.data.values.dcatConfig);
        delete model.data.values.dcatConfig;
        // with the id of the actual item
        model = interpolateItemId(model);
        // re-attach if we got anything...
        if (dcatConfig) {
            model.data.values.dcatConfig = dcatConfig;
        }
        return updateItem({
            item: serializeModel(model),
            authentication: hubRequestOptions.authentication,
        });
    })
        .then((updateResponse) => {
        // upload resources from url
        return uploadResourcesFromUrl(model, options.assets || [], hubRequestOptions);
    })
        .then((uploadResponses) => {
        // default to a success response
        let sharePrms = Promise.resolve({ success: true });
        // share it to the collab team if that got created
        const collabGroupId = getProp(model, "item.properties.collaborationGroupId");
        if (collabGroupId) {
            sharePrms = shareItemWithGroup({
                id: model.item.id,
                groupId: collabGroupId,
                authentication: hubRequestOptions.authentication,
                confirmItemControl: true,
            });
        }
        return sharePrms;
    })
        .then((resp) => {
        // if we created an initiative, ensure we inject the site Id into it
        const initiativeItemId = getProp(model, "item.properties.parentInitiativeId");
        if (initiativeItemId) {
            // get the item and update it
            return updateInitiativeSiteId(initiativeItemId, model.item.id, hubRequestOptions);
        }
        else {
            return Promise.resolve(true);
        }
    })
        .then((resp) => {
        return model;
    })
        .catch((err) => {
        throw Error(`site-utils::createSite - Error creating site ${JSON.stringify(err)}`);
    });
}

/**
 * Return the correct route for the portal hosted site
 * @param {String} subdomain Subdomain for the site
 * @param {Object} portal Portal Self
 */
function getPortalSiteHostname(subdomain, portal) {
    let port;
    if (portal.allSSL) {
        port = portal.httpsPort !== 443 ? `:${portal.httpsPort}` : "";
    }
    else {
        port = portal.httpPort !== 80 ? `:${portal.httpPort}` : "";
    }
    // portalHostname will include the /<adaptor>
    // i.e. `dev0016196.esri.com/portal`, but since we may need to inject a port
    // we split things apart, and then recombine
    const parts = portal.portalHostname.split("/");
    const host = parts[0];
    let adaptor = "/"; // if there is no /<adaptor> then / should be valid
    if (parts[1]) {
        adaptor = `/${parts[1]}/`;
    }
    // construct the url
    return `${host}${port}${adaptor}apps/sites/#/${subdomain}`;
    // Note: in *most* cases the result would be the same as the line below
    // but there are some scenarios where we need to do the construction
    // so we can't simply use portalHostname
    // return `${portal.portalHostname}/apps/sites/#/${subdomain}`
}

/**
 * Construct the site url for a Portal Site item
 * @param {String} subdomain Subdomain for the site
 * @param {Object} portal Portal Self
 */
function getPortalSiteUrl(subdomain, portal) {
    let protocol = "http:";
    if (portal.allSSL) {
        protocol = "https:";
    }
    const siteRoute = getPortalSiteHostname(subdomain, portal);
    return `${protocol}//${siteRoute}`;
}

/**
 * Given a Site Template, locate the initiative template
 * then adlib it and create the initiative item
 * @param {object} siteTemplate Site Template
 * @param {object} settings adlib interpolation hash
 * @param {object} transforms adlib transforms hash
 * @param {IHubRequestOptions}} hubRequestOptions
 * @private
 */
function _createSiteInitiative(siteTemplate, settings, transforms, hubRequestOptions) {
    const cache = {};
    return getInitiativeTemplate(siteTemplate, hubRequestOptions)
        .then((initiativeTemplate) => {
        // set the url that will be in the site
        initiativeTemplate.item.url = settings.solution.url;
        initiativeTemplate.item.title = settings.solution.title;
        initiativeTemplate.item.owner = hubRequestOptions.authentication.username;
        initiativeTemplate.item.typeKeywords = without(initiativeTemplate.item.typeKeywords, "Hub Initiative Template");
        initiativeTemplate.item.type = "Hub Initiative";
        // set the teams...
        Object.assign(initiativeTemplate.item.properties, settings.teams);
        // adlib to pick up anything else...
        const initiativeModel = interpolate(initiativeTemplate, settings, transforms);
        // and save it
        return addInitiative(initiativeModel, hubRequestOptions);
    })
        .then((model) => {
        // hold in cache
        cache.model = model;
        // default to a success response
        let sharePrms = Promise.resolve({ success: true });
        // share it to the collab team if that got created
        const collabGroupId = getProp(settings, "teams.collaborationGroupId");
        if (collabGroupId) {
            sharePrms = shareItemWithGroup({
                id: model.item.id,
                groupId: collabGroupId,
                authentication: hubRequestOptions.authentication,
                confirmItemControl: true
            });
        }
        return sharePrms;
    })
        .then((_) => {
        return cache.model;
    })
        .catch((ex) => {
        throw Error(`site-utils::_createSiteInitiative Error ${ex}`);
    });
}

/**
 * Update the tags on the teams after the initiative is created
 * Specifically:
 * - add  `hubInitiativeFollowers|<initiaiveId> to the followers group
 * @param {object} initiativeModel Initiative Model
 * @param {object} teams hash of teams
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _updateTeamTags(initiativeModel, teams, hubRequestOptions) {
    let prms = Promise.resolve({ success: true });
    // we have a followers group
    // TODO: COVER THIS WITH TESTS (spying wasnt working)
    /* istanbul ignore if */
    if (getProp(teams, "props.followersGroupId")) {
        // get the followers group out of the teams.groups array
        const followersGroup = teams.groups.find((g) => g.id === teams.props.followersGroupId);
        // now we want to add a tag
        followersGroup.tags.push(`hubInitiativeFollowers|${initiativeModel.item.id}`);
        // now we want to fire off an update
        prms = updateGroup({
            group: followersGroup,
            authentication: hubRequestOptions.authentication
        });
    }
    return prms;
}

/**
 * Wrapper for @esri/hub-common's `interpolate()`
 *
 * Some properties on siteTemplate are nested adlib templates that
 * need to be interpolated at runtime, not template activation time.
 * As such, this wrapper ensures that adlib does not process those
 * properties.
 *
 * Currently ignored properties include:
 * - `data.values.dcatConfig` (legacy DCAT-US 1.1 config with index value paths)
 * - `data.feeds (Home to all feed configs with v3 api value paths)
 *
 * @param siteTemplate
 * @param settings
 * @param transforms
 */
function interpolateSite(siteTemplate, settings, transforms) {
    const template = cloneObject(siteTemplate);
    // Save nested adlib templates
    const legacyDcatUS11Config = cloneObject(template.data.values.dcatConfig);
    const feedConfigs = cloneObject(template.data.feeds);
    // Remove nested adlib templates from the main template so they will not be processed
    delete template.data.values.dcatConfig;
    delete template.data.feeds;
    const siteModel = interpolate(template, settings, transforms);
    // Attach nested templates onto the interpolated site
    if (legacyDcatUS11Config) {
        siteModel.data.values.dcatConfig = legacyDcatUS11Config;
    }
    if (feedConfigs) {
        siteModel.data.feeds = feedConfigs;
    }
    return siteModel;
}

/**
 * Convert a Site Template into a Site Model
 * This will create Hub Teams and an Initiative, depending on licensing
 * and privs.
 *
 * The subdomain for the site will be constructed from the `settings.solution.title`
 * unless that contains unicode chars. In that case the initial subdomain will be `site`
 * and `ensureUniqueDomainName` will increment it as necessary (i.e. site-1, site-2 etc)
 *
 * This returns the Model that still needs to be saved!
 * @param {object} template Site Template
 * @param {object} settings Adlib interpolation hash
 * @param {object} transforms hash of transform functions
 * @param {IHubRequestOptions} hubRequestOptions
 */
function createSiteModelFromTemplate(template, settings, transforms, hubRequestOptions) {
    // add url to the assets, ref'ing the original location
    template.assets = addSolutionResourceUrlToAssets(template, hubRequestOptions);
    // We may have templates which lack .properties so let's ensure that exists
    if (!template.item.properties) {
        template.item.properties = {};
    }
    // Kill props we don't want to roll forward if they happen to exist in the template
    [
        "customHostname",
        "externalUrl",
        "contentGroupId",
        "followersGroupId",
        "collaborationGroupId",
        "parentInitiativeId",
    ].forEach((prop) => {
        delete template.data.values[prop];
    });
    getHubProduct(hubRequestOptions.portalSelf);
    let title = getProp(settings, "solution.title") || "New Site";
    // handle issue with titles that are just numbers
    if (typeof title === "number") {
        title = title.toString();
        deepSet(settings, "solution.title", title);
    }
    // TODO: Eventually we'd like Enums
    const teamsToCreate = ["core", "content", "followers"];
    return createHubTeams({
        title,
        types: teamsToCreate,
        hubRequestOptions,
    })
        .then((teams) => {
        // fold teams into the settings hash - used mainly for cards
        settings.teams = cloneObject(teams.props);
        // directly set the teams into the template item as this ensures
        // the team props are always set vs relying on adlib vars to exist
        Object.assign(template.item.properties, teams.props);
        if (getProp(teams, "props.contentGroupId")) {
            deepSet(template, "data.catalog.groups", [teams.props.contentGroupId]);
        }
        // sites need unique domains names
        // We derive this from the title, unless the title has unicode chars
        // in which case we use `site`, and the `ensureUniqueDomainName` function
        // will increment that as needed - i.e. `site-23`
        let domainTitle = title;
        if (hasUnicodeChars(domainTitle)) {
            domainTitle = "site";
        }
        return ensureUniqueDomainName(slugify(domainTitle), hubRequestOptions);
    })
        .then((uniqueSubdomain) => {
        const portal = hubRequestOptions.portalSelf;
        // TODO: Revisit this if/when we do more site templates which we want to maintain their theme
        settings.solution.theme = getOrgDefaultTheme(portal);
        // set site-specific settings properties...
        settings.solution.subdomain = uniqueSubdomain;
        // setup the url properties
        if (hubRequestOptions.isPortal) {
            settings.solution.defaultHostname = getPortalSiteHostname(uniqueSubdomain, portal);
            settings.solution.url = getPortalSiteUrl(uniqueSubdomain, portal);
        }
        else {
            const base = stripProtocol(getHubApiUrl(hubRequestOptions));
            settings.solution.defaultHostname = `${uniqueSubdomain}-${portal.urlKey}.${base}`;
            settings.solution.url = `https://${uniqueSubdomain}-${portal.urlKey}.${base}`;
        }
    })
        .then((_) => {
        const siteModel = interpolateSite(template, settings, transforms);
        // Special logic for the site title
        // if the title is a string, containing only numbers, then the interpolation will set it as
        // a number, which causes some problems... in that case, we stomp it in as a string...
        if (typeof siteModel.item.title === "number") {
            siteModel.item.title = getProp(settings, "solution.title");
            siteModel.data.values.title = getProp(settings, "solution.title");
        }
        return siteModel;
    })
        .catch((ex) => {
        throw Error(`site-utils::createSiteModelFromTemplate Error ${ex}`);
    });
}
/**
 * From Stackoverflow
 * https://stackoverflow.com/questions/147824/how-to-find-whether-a-particular-string-has-unicode-characters-esp-double-byte
 * This is the highest performance solution, combining three approaches
 */
const unicodeCharRegex = /[^\u0000-\u00ff]/;
function hasUnicodeChars(value) {
    if (value.charCodeAt(0) > 255)
        return true;
    return unicodeCharRegex.test(value);
}

/**
 * Convert an existing site into the Solution template format
 * @param {Object} model Site Model
 * @param {IHubRequestOptions} hubRequestOptions
 */
function convertSiteToTemplate(model, hubRequestOptions) {
    // clone it...
    const tmpl = cloneObject(model);
    // Ensure some properties are set correctly
    tmpl.type = getSiteItemType(hubRequestOptions.isPortal);
    tmpl.key = `${propifyString(model.item.title)}_${createId("i")}`;
    tmpl.itemId = model.item.id;
    // now pass the item off to be normalized
    tmpl.item = normalizeSolutionTemplateItem(tmpl.item);
    // remove the url as it will be set when it's created
    delete tmpl.item.url;
    // Note: We do not template in the various team groups
    // When a site is created from a template, those properties
    // will be injected as needed
    tmpl.item.properties = {
        schemaVersion: SITE_SCHEMA_VERSION,
        children: [],
    };
    // inject interpolation propertues where we need them
    tmpl.item.title = "{{solution.title}}";
    tmpl.data.values.subdomain = "{{solution.subdomain}}";
    tmpl.data.values.defaultHostname = "{{solution.defaultHostname}}";
    tmpl.data.values.title = "{{solution.title}}";
    tmpl.data.values.subdomain = "{{solution.subdomain}}";
    tmpl.data.values.defaultHostname = "{{solution.defaultHostname}}";
    delete tmpl.data.catalog;
    // teams are set explicitly vs being interpolated
    delete tmpl.data.values.collaborationGroupId;
    // some props need to be reset to empty strings
    ["updatedAt", "updatedBy", "clientId", "siteId"].forEach((p) => {
        tmpl.data.values[p] = "";
    });
    // others we should just delete
    [
        "customHostname",
        "externalUrl",
        "contentGroupId",
        "followersGroupId",
        "groups",
    ].forEach((p) => {
        delete tmpl.data.values[p];
    });
    // update the default extent...
    if (getProp(tmpl, "data.values.defaultExtent")) {
        tmpl.data.values.defaultExtent = "{{organization.defaultExtent}}";
    }
    if (getProp(tmpl, "data.values.map.basemaps.primary.extent")) {
        tmpl.data.values.map.basemaps.primary.extent =
            "{{organization.defaultExtent}}";
    }
    // convert the layout...
    const layoutConversion = convertLayoutToTemplate(tmpl.data.values.layout);
    tmpl.data.values.layout = layoutConversion.layout;
    // convert any internal references in /data to the item's id into `{{appId}}`
    tmpl.data = replaceItemId(tmpl.data, tmpl.itemId);
    tmpl.dependencies = getSiteDependencies(model);
    return getItemAssets(model.item, hubRequestOptions).then((assets) => {
        // Because we don't want to include the draft resource when clone a site
        // we are filtering out assets that are not 'draft-{timestamp}.json'
        tmpl.assets = assets.filter((asset) => asset.name.search(DRAFT_RESOURCE_REGEX) === -1);
        return tmpl;
    });
}

/**
 * Fetch the data for a site item by Id.
 * No schema upgrades are applied.
 * @param {String} id Item Id of the site
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _getSiteDataById(id, hubRequestOptions) {
    // Note: this was migrated to ensure consistentcy but it should not be used
    return getItemData(id, hubRequestOptions).then(data => {
        if (data.values.groupId && !data.values.collaborationGroupId) {
            // some 2.0 sites were created with a groupId instead of a collaborationGroupId and then were migrated
            data.values.collaborationGroupId = data.values.groupId;
            delete data.values.groupId;
        }
        return data;
    });
}

/**
 * Return a hash of settings for the groups, including the itemControl flag
 * Both, one or neither of these groups may exist
 * @param {object} siteModel Site Model
 * @private
 */
function _getSecondPassSharingOptions(siteModel) {
    return [
        { prop: "item.properties.contentGroupId", itemControl: false },
        { prop: "item.properties.collaborationGroupId", itemControl: true }
    ].reduce((acc, entry) => {
        const groupId = getProp(siteModel, entry.prop);
        if (groupId) {
            acc.push({
                id: groupId,
                confirmItemControl: entry.itemControl
            });
        }
        return acc;
    }, []);
}

function _getIneligibleModelIds(siteModel, models, hubRequestOptions) {
    const fetchSurveyModels = (model) => getSurveyModels(model.item, hubRequestOptions).then(({ form, featureService, fieldworker, stakeholder }) => [form, featureService, fieldworker, stakeholder].filter(Boolean));
    const inEligibleModelCollectionPromises = models.reduce((acc, model) => model.item.type === "Form" ? [...acc, fetchSurveyModels(model)] : acc, [Promise.resolve([siteModel])]);
    return Promise.all(inEligibleModelCollectionPromises).then((ineligibleModelCollections) => ineligibleModelCollections.reduce((acc, ineligibleModelCollection) => [
        ...acc,
        ...ineligibleModelCollection,
    ], []));
}
function _getSharingEligibleModels(siteModel, models, hubRequestOptions) {
    return _getIneligibleModelIds(siteModel, models, hubRequestOptions).then((ineligibleModels) => models.reduce((acc, model) => ineligibleModels.find(({ item: { id } }) => model.item.id === id)
        ? acc
        : [...acc, model], []));
}

/**
 * **DEPRECATED: Use shareItemsToSiteGroups() instead**
 * this is only needed in order to support solutions.js < v1.4.1
 * and we currently use v1.1.5 in opendata-ui
 * @private
 */
/* istanbul ignore next - deprecated */
function _shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions) {
    /* tslint:disable no-console */
    console.info(`DEPRECATED: _shareItemsToSiteGroups will be removed at the next breaking version. Use shareItemsToSiteGroups instead.`);
    return shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions);
}
/**
 * Share all the other models to the Site's content and collaboration groups, if
 * those groups were created for the site (depends on user's privs)
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 * @exported
 */
function shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions) {
    // Create Fail-safe version of share b/c this is not critical
    const failSafeShare = failSafe(shareItemWithGroup, { success: true });
    const groupsToShareTo = _getSecondPassSharingOptions(siteModel);
    // share all items in the solution to the groups, excluding the the site, form
    // and any form feature services
    return _getSharingEligibleModels(siteModel, solutionModels, hubRequestOptions).then((eligibleModels) => Promise.all(eligibleModels.reduce((acc, m) => {
        const itemSharePromises = groupsToShareTo.map((g) => {
            const opts = {
                id: m.item.id,
                groupId: g.id,
                confirmItemControl: g.confirmItemControl,
                authentication: hubRequestOptions.authentication,
            };
            return failSafeShare(opts);
        });
        return acc.concat(itemSharePromises);
    }, [])));
}

/**
 * Post process the Page models, interpolating various values which would
 * not have existed when the Page item itself was created
 * @param {object} siteModel Site Model
 * @param {object} pageModel Page Model
 * @private
 */
function _secondPassAdlibPages(siteModel, pageModel) {
    // construct a hash of teams that were created and attached to the site
    const teams = [
        "collaborationGroupId",
        "followersGroupId",
        "contentGroupId"
    ].reduce((acc, prop) => {
        const teamId = getProp(siteModel, `item.properties.${prop}`);
        if (teamId) {
            acc[prop] = teamId;
        }
        return acc;
    }, {});
    const settings = {
        teams,
        siteId: getProp(siteModel, "item.id"),
        siteUrl: getProp(siteModel, "item.url"),
        initiative: {
            item: { id: getProp(siteModel, "item.properties.parentInitiativeId") }
        }
    };
    // weld in the site itself so it can be used for some interpolations
    settings[siteModel.key] = siteModel;
    return interpolate(pageModel, settings);
}

/**
 * Locate any Page items that were created in the Solution, and link them back to the Site
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _updatePages(siteModel, solutionModels, hubRequestOptions) {
    // 2) for any page item, check if it has the site in it's pages array and if not add it
    const pageModels = solutionModels.filter(m => {
        return m.item.type.indexOf("Page") > -1;
    });
    // Create Fail-safe version of update b/c this is not critical
    const failSafeUpdate = failSafe(updateItem, { success: true });
    // check each one of these and see if the siteModel.item.id is in it's data.value.sites array
    // if not, add and update the item
    const siteEntry = {
        id: siteModel.item.id,
        title: siteModel.item.title
    };
    // iterate the pages
    return Promise.all(pageModels.map(m => {
        m.data.values.sites.push(siteEntry);
        m = _secondPassAdlibPages(siteModel, m);
        return failSafeUpdate({
            item: serializeModel(m),
            authentication: hubRequestOptions.authentication
        });
    }));
}

/**
 * Handle the Solution "Second Pass" for Site
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 */
function siteSecondPass(siteModel, solutionModels, hubRequestOptions) {
    let secondPassPromises = [];
    // get all the items that are not the site
    secondPassPromises = secondPassPromises.concat(shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions));
    // link the pages
    secondPassPromises = secondPassPromises.concat(_updatePages(siteModel, solutionModels, hubRequestOptions));
    return Promise.all(secondPassPromises);
}

/**
 * Get the data for a site item. Used by the UI to back-fill
 * a site model's `.data`, usually after we already have the item
 * as a result of a search.
 * Schema upgrades are applied.
 * @param {Object} item Site Item object
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getDataForSiteItem(item, hubRequestOptions) {
    return getItemData(item.id, hubRequestOptions).then((data) => {
        return upgradeSiteSchema({
            item,
            data,
        });
    });
}

// TODO: once the Hub API User Search is complete, integrate
// it in this function for AGO users, and fallback to the
// current implementation for enterprise users
/**
 * Fetches and returns members given a list of usernames
 *
 * NOTE: AGO's user search endpoint is only available to
 * authenticated users; however, since unauthenticated users
 * should still be able to access public profiles, we support
 * fetching members for both unauthenticated/authenticated
 * users in this function
 *
 * @param {string[]} usernames List of usernames to search for
 * @param {object} requestOptions IHubRequestOptions
 */
function getMembers(usernames, requestOptions) {
    return requestOptions.authentication
        ? authenticatedGetMembers(usernames, requestOptions)
        : unauthenticatedGetMembers(usernames, requestOptions);
}
/**
 * groups the provided usernames in chunks of 100 and creates query
 * strings to batch fetch those members from AGO's user search
 * (/community/users) endpoint. AGO will only return the subset of
 * members which the current user has access to.
 *
 * @param {Array} usernames List of usernames to search for
 * @param {object} requestOptions IHubRequestOptions
 */
function authenticatedGetMembers(usernames, requestOptions) {
    const urlPath = `${getPortalUrl(requestOptions)}/sharing/rest/community/users`;
    const chunkSize = 100;
    const chunkedUsernames = [];
    for (let i = 0; i < usernames.length; i += chunkSize) {
        chunkedUsernames.push(usernames.slice(i, i + chunkSize));
    }
    const chunkedOptions = chunkedUsernames.map((chunk) => {
        const filter = chunk
            .map((username) => `username:"${username}"`)
            .join(" OR ");
        return {
            urlPath,
            requestOptions: Object.assign({ params: { filter, num: chunk.length } }, requestOptions),
        };
    });
    return batch(chunkedOptions, batchMemberRequest).then((batchedMembers) => {
        return batchedMembers.reduce((flat, toFlatten) => {
            return flat.concat(toFlatten);
        }, []);
    });
}
/**
 * fetch members individually from AGO's /community/users/{username}
 * endpoint. This endpoint, unlike the users search endpoint which
 * only returns the subset of members that the current user has acces
 * to, will only limit the information returned for each member
 * (i.e. firstname, lastname and fullname will be empty strings if
 * an unauthenticated user tries to access a non-public profile).
 *
 * @param {Array} usernames List of usernames to search for
 * @param {object} requestOptions IHubRequestOptions
 */
function unauthenticatedGetMembers(usernames, requestOptions) {
    return Promise.all(usernames.map((username) => {
        return getUser(Object.assign({ username }, requestOptions))
            .then((response) => {
            // if the firstname, lastname, and fullname are empty strings, assume that the
            // user is not accessible (i.e. not a public profile) and should not be returned
            // to the unauthenticated user
            if (response.firstName || response.lastName || response.fullName) {
                return response;
            }
        })
            .catch((e) => {
            Logger.error(`Error fetching user, ${username}, from AGO user endpoint, ${e}`);
            return null;
        });
    })).then((members) => members.filter(Boolean));
}
/**
 * callback function to batch the requests to the user search endpoint
 * if >100 usernames are supplied. This is necessary because the
 * endpoint sets the maximum number of results to be included in the
 * result set response to 100
 *
 * @param options IBatchMemberRequestOptions
 */
function batchMemberRequest(options) {
    return request(options.urlPath, options.requestOptions)
        .then((response) => response.results)
        .catch((e) => {
        Logger.error(`Error fetching members from AGO user search endpoint: ${e}`);
        return [];
    });
}

export { PAGE_DRAFT_INCLUDE_LIST, PAGE_TEMPLATE_KEYWORD, PAGE_TYPE_KEYWORD, SITE_DRAFT_INCLUDE_LIST, UNPUBLISHED_CHANGES_KW, _createSiteInitiative, _ensureOptionalGroupsTemplating, _ensurePortalDomainKeyword, _ensureTypeAndTags, _getDraftResourceNames, _getImageCropIdsFromLayout, _getMostRecentDraftName, _getPortalDomainTypeKeyword, _getSecondPassSharingOptions, _getSiteDataById, _includeListFromItemType, _removeParentInitiative, _removeSiteDomains, _removeSiteFromIndex, _removeSiteGroups, _secondPassAdlibPages, _shareItemsToSiteGroups, _updatePages, _updateTeamTags, applyDraft, convertCard, convertLayoutToTemplate, convertPageToTemplate, convertRow, convertSection, convertSiteToTemplate, createPage, createPageModelFromTemplate, createSite, createSiteModelFromTemplate, deleteDraft, ensureOptionalGroupsTemplating, ensurePageHasSiteEntry, ensureRequiredPageProperties, ensureRequiredSiteProperties, extractAssets, fetchAndApplyDraft, fetchDraft, getCardDependencies, getDataForSiteItem, getDomain, getDomains, getDraftDate, getLayoutDependencies, getMembers, getPageDependencies, getPageEditUrl, getPageItemType, getPortalSiteHostname, getPortalSiteUrl, getRowDependencies, getSectionDependencies, getSiteDependencies, getSiteEditUrl, getSiteItemType, hasUnpublishedChanges, interpolateSite, isPage, isSite, linkSiteAndPage, markPublished, markUnpublished, removePage, removeSite, removeSiteFromPage, removeUnusedResources, saveDraft, savePublishedStatus, shareItemsToSiteGroups, siteSecondPass, unlinkPagesFromSite, unlinkSiteAndPage, updateAppRedirectUris, updatePage, updateSite, updateSiteApplicationUris, upgradeDraftSchema };
