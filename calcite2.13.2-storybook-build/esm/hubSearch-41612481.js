import { _ as __rest } from './tslib.es6-9c17e83a.js';
import { H as HubError } from './HubError-e26c5610.js';
import { u as unique, a as cloneObject } from './util-3e6872d9.js';
import { g as expandApi, p as parseInclude, h as getUserThumbnailUrl, i as expandPredicate, s as serializeQueryForPortal, j as getNextFunction, k as getGroupThumbnailUrl, l as getPropertyMap, m as convertHubGroupToGroup, n as getKilobyteSizeOfQuery, o as isNilOrEmptyString, q as itemToSearchResult, r as getTopLevelPredicate, t as portalSearchItems } from './HubInitiatives-4f4e24ce.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { m as mergeObjects } from './merge-objects-5b123ab3.js';
import { s as searchGroupUsers, g as getGroup } from './get-850c466d.js';
import { f as fetchOrg } from './fetch-org-8e578c0d.js';
import { O as OperationStack, c as createOperationPipeline, g as getEnrichmentErrors } from './_enrichments-8641475c.js';
import { g as getPortalBaseFromOrgUrl } from './getPortalBaseFromOrgUrl-ad7df86a.js';
import { f as failSafe } from './fail-safe-cd1a5a2a.js';
import { g as getSelf } from './get-portal-5e0a1617.js';
import { g as getPortalUrl$1 } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';
import { g as getUser } from './get-user-f035bd36.js';
import { m as mapBy } from './map-by-a2234e13.js';
import { g as getPortalUrl } from './get-portal-url-cc8a77b9.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { a as searchGroupContent, s as searchGroups } from './search-211dee83.js';
import { P as PropertyMapper } from './PropertyMapper-4eb0ac8f.js';
import { g as getRelativeWorkspaceUrl } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { c as getHubRelativeUrl } from './compose-d5b83ab7.js';
import { i as isDiscussable, s as setDiscussableKeyword, c as channelToSearchResult } from './utils-6bf1b713.js';
import { g as genericSearch } from './search-c7a57aa9.js';
import { R as RemoteServerError } from './request-3e386aeb.js';
import { s as searchChannels } from './channels-2574fd6e.js';
import { E as EventSort, a as EventSortOrder, b as EventStatus, c as getEvents, R as RegistrationSort, d as RegistrationRole, e as RegistrationStatus, f as EventAttendanceType } from './events-c59246f8.js';
import { g as getLocationFromEvent, c as computeLinks$1, a as getRegistrations } from './registrations-431b9788.js';
import { i as isUpdateGroup } from './is-update-group-7b9eb0ea.js';
import { c as createGroup, p as protectGroup, r as removeGroup } from './remove-2e7122d1.js';
import { u as updateGroup } from './update-26e2fbc1.js';

/**
 * ```js
 * import { searchUsers } from "@esri/arcgis-rest-portal";
 * //
 * searchUsers({ q: 'tommy', authentication })
 *   .then(response) // response.total => 355
 * ```
 * Search a portal for users.
 *
 * @param search - A RequestOptions object to pass through to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchUsers(search) {
    return genericSearch(search, "user");
}
/**
 * ```js
 * import { searchCommunityUsers } from "@esri/arcgis-rest-portal";
 * //
 * searchCommunityUsers({ q: 'tommy', authentication })
 *   .then(response) // response.total => 355
 * ```
 * Search all portals for users.
 *
 * @param search - A RequestOptions object to pass through to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchCommunityUsers$1(search) {
    return genericSearch(search, "communityUser");
}

/**
 * Pick a set of properties from an object onto a new object
 * Undefined properties are not copied
 */
function pickProps(obj, props) {
    return mergeObjects(obj, {}, props);
}

/**
 * Return the URL of the group's page in the Portal Home application
 * @param groupId The group's ID
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @returns URL to the groups's url, defaults to `https://www.arcgis.com/home/group.html?id={group.id}`
 */
function getGroupHomeUrl(groupId, portalUrlOrObject) {
    const portalUrl = getPortalUrl(portalUrlOrObject);
    return `${portalUrl}/home/group.html?id=${groupId}`;
}

/**
 * Return the URL of the user's page in the Portal Home application
 * @param username The username
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @returns URL to the user's profile, defaults to `https://www.arcgis.com/home/user.html?user={username}`
 */
function getUserHomeUrl(username, portalUrlOrObject) {
    const portalUrl = getPortalUrl(portalUrlOrObject);
    return `${portalUrl}/home/user.html?user=${username}`;
}

/**
 * @private
 * Determines whether the OGC API can be targeted with the given search parameters
 * @param targetEntity target entity of the query
 * @param options search options
 */
function shouldUseOgcApi(targetEntity, options) {
    const { site, requestOptions: { isPortal }, } = options;
    if (isPortal)
        return false;
    if (targetEntity === "discussionPost")
        return true;
    return targetEntity === "item" && !!site;
}

/**
 * @private
 * Returns information about the current environment's OGC API
 *
 * @param options IHubRequestOptions to derive OGC API info from
 * @returns an IApiDefinition with needed info to target the OGC API
 */
function getOgcApiDefinition(targetEntity, options) {
    const umbrellaDomain = new URL(options.requestOptions.hubApiUrl).hostname;
    return targetEntity === "discussionPost"
        ? {
            type: "arcgis-hub",
            url: `https://${umbrellaDomain}/api/search/v2`,
        }
        : {
            type: "arcgis-hub",
            url: `https://${umbrellaDomain}/api/search/v1`,
        };
}

/**
 * @private
 * Determines if the Discussions API can be targeted with the given
 * search parameters
 * @param targetEntity
 * @param options
 * @returns boolean
 */
function shouldUseDiscussionsApi(targetEntity, options) {
    const { requestOptions: { isPortal }, } = options;
    return targetEntity === "channel" && !isPortal;
}

function getDiscussionsApiDefinition() {
    // Currently, url is null because this is handled internally by the
    // discussions request method called by searchChannels, which relies on
    // the URL defined in the request options.hubApiUrl
    return {
        type: "arcgis-hub",
        url: null,
    };
}

/**
 * @private
 * Determines if the Events API can be targeted with the given
 * search parameters
 * @param targetEntity
 * @param options
 * @returns boolean
 */
function shouldUseEventsApi(targetEntity, options) {
    const { requestOptions: { isPortal }, } = options;
    return ["event", "eventAttendee"].includes(targetEntity) && !isPortal;
}

/**
 * @private
 * Determines Which API should be hit for the given search parameters.
 * Hierarchy:
 * - Target options.api if available
 * - Target the environment-level OGC API if current parameters allow
 * - Target the Portal API based off options.requestOptions.portal
 * @param targetEntity target entity of the query
 * @param options search options
 * @returns an API Definition object describing what should be targeted
 */
function getApi(targetEntity, options) {
    const { api, requestOptions: { portal }, } = options;
    let result;
    if (api) {
        result = expandApi(api);
    }
    else if (shouldUseDiscussionsApi(targetEntity, options)) {
        result = getDiscussionsApiDefinition();
    }
    else if (shouldUseEventsApi(targetEntity, options)) {
        // Currently, url is null because this is handled internally by the
        // events request method called by getEvents, which relies on
        // the URL defined in the request options.hubApiUrl
        result = { type: "arcgis-hub", url: null };
    }
    else if (shouldUseOgcApi(targetEntity, options)) {
        result = getOgcApiDefinition(targetEntity, options);
    }
    else {
        result = { type: "arcgis", url: portal };
    }
    return result;
}

/**
 * Fetch the Org for a User and enriches it.
 * @param input
 * @returns
 */
const enrichUserOrg = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichUserOrg");
    // if no orgId, then we can't fetch it so just return null
    if (!data.user.orgId) {
        stack.finish(opId);
        return Promise.resolve({
            data: Object.assign(Object.assign({}, data), {
                org: null,
            }),
            stack,
            requestOptions,
        });
    }
    else {
        const options = Object.assign(Object.assign({}, requestOptions), { 
            // In order to get the correct response, we must pass options.portal
            // as a base portal url (e.g., www.arcgis.com, qaext.arcgis.com, etc)
            // **not** an org portal (i.e. org.maps.arcgis.com).
            portal: `${getPortalBaseFromOrgUrl(requestOptions.portal)}/sharing/rest` });
        // TODO: Add Caching
        return fetchOrg(data.user.orgId, options)
            .then((results) => {
            stack.finish(opId);
            return {
                data: Object.assign(Object.assign({}, data), {
                    org: results,
                }),
                stack,
                requestOptions,
            };
        })
            .catch((error) => handleEnrichmentError$1(error, input, opId));
    }
};
/**
 * Simple cache for user org's. This does not expire
 * but that seems reasonable as Org props rarely change
 */
// This works find at run-time, but it's a problem in tests
// where we are validating calls. Will work with Randy to
// create something that's more robust
// const orgCache: Record<string, any> = {};
// add the error to the content.errors,
// log current stack operation as finished with an error
// and return output that can be piped into the next operation
const handleEnrichmentError$1 = (error, input, opId) => {
    const { data, stack, requestOptions } = input;
    stack.finish(opId, { error });
    return {
        data: Object.assign(Object.assign({}, data), { errors: getEnrichmentErrors(error, data.errors) }),
        stack,
        requestOptions,
    };
};
/**
 * Available enrichments for Groups
 */
const groupEnrichementOperations = {
    org: enrichUserOrg,
};
/**
 * Fetch enrichments for Users
 * @param group
 * @param enrichments
 * @param requestOptions
 * @returns
 */
function fetchUserEnrichments(user, enrichments, requestOptions) {
    // create a pipeline of enrichment operations
    const operations = enrichments.reduce((ops, enrichment) => {
        const operation = groupEnrichementOperations[enrichment];
        // only include the enrichments that we know how to fetch
        operation && ops.push(operation);
        return ops;
    }, []);
    const pipeline = createOperationPipeline(operations);
    // execute pipeline and return the item and enrichments
    return pipeline({
        data: { user },
        stack: new OperationStack(),
        requestOptions,
    }).then((output) => {
        // TODO: send telemetry so we have info on what enrichments are requested and possible errors
        return output.data;
    });
}

/**
 * Given a model and a user, sets various computed properties that can't be directly mapped.
 * @param model
 * @param user
 * @param context
 * @returns
 */
async function computeProps$1(model, user, context) {
    var _a, _b, _c;
    // 1. compute any props for user settings
    user.settings = context.userHubSettings;
    // 2. compute any props for user's org settings
    // TODO: only fetch this if the user has necessary privs (org admin)
    const fsGetSignInSettings = failSafe(getPortalSignInSettings, {});
    const signinSettings = await fsGetSignInSettings(context);
    const fsGetSelf = failSafe(getSelf, {});
    const _portalself = await fsGetSelf(context.requestOptions);
    user.hubOrgSettings = {
        showInformationalBanner: !!((_c = (_b = (_a = _portalself.portalProperties) === null || _a === void 0 ? void 0 : _a.hub) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.informationalBanner),
        enableTermsAndConditions: !!signinSettings.termsAndConditions,
        termsAndConditions: signinSettings.termsAndConditions,
        enableSignupText: !!signinSettings.signupText,
        signupText: signinSettings.signupText,
    };
    return user;
}
/**
 * Fetches the portal's signin settings by making a request to the
 * ${portalUrl}/portals/self/signinSettings endpoint.
 *
 * Returns a promise that resolves with the signin settings object.
 *
 * @param context
 */
function getPortalSignInSettings(context) {
    const url = `${getPortalUrl$1(context.requestOptions)}/portals/self/signinSettings`;
    const requestOpts = Object.assign(Object.assign({}, context.requestOptions), { httpMethod: "GET" });
    return request(url, requestOpts);
}

/**
 * Converts a IUser object into an IHubUser.
 *
 * @param user
 * @returns IHubUser
 */
const convertUserToHubUser = (user) => {
    // A private user will not have a description prop at all
    // thus we set it to undefined to differentiate from a empty description which would be null
    const description = user.hasOwnProperty("description")
        ? user.description
        : undefined;
    return {
        access: user.access,
        id: user.username,
        name: user.fullName,
        description,
        summary: description,
        createdDate: new Date(user.created),
        createdDateSource: "user.created",
        orgId: user.orgId,
        owner: user.username,
        updatedDate: new Date(user.modified),
        updatedDateSource: "user.modified",
        tags: user.tags,
        thumbnail: user.thumbnail,
        type: "User",
        typeKeywords: [],
        links: {
            // TODO: implement these
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: null,
        },
    };
};
/**
 * Enriches an IUser object search result.
 * @param user
 * @param includes
 * @param requestOptions
 * @returns
 */
async function enrichUserSearchResult(user, include, requestOptions) {
    var _a;
    // Create the basic structure
    const hubUser = convertUserToHubUser(user);
    const result = Object.assign(Object.assign({}, hubUser), { family: "people", rawResult: user });
    // Group Memberships need these additional properties
    if (user.memberType) {
        result.memberType = user.memberType;
        result.isGroupOwner = user.isGroupOwner;
    }
    // Parse the includes into a valid set of enrichments
    const specs = include.filter(unique).map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    // Ignoring the else, because we currently have defaults, but want the guards
    // so if we remove that in the future, we don't call the fn
    /* istanbul ignore else */
    if (enrichments.length) {
        enriched = await fetchUserEnrichments(user, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    const token = (_a = requestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token;
    // only construct thumbnail url if we have a thumbnail value
    // ui layer can decide how to handle a null thumbnail
    if (user.thumbnail) {
        result.links.thumbnail = getUserThumbnailUrl(requestOptions.portal, user, token);
    }
    result.links.self = getUserHomeUrl(result.id, requestOptions);
    result.links.siteRelative = `/people/${result.id}`;
    return result;
}
/**
 * Fetches a hub user by username
 * @param username - hub username. can also be "self"
 * @param context
 * @returns
 */
const fetchHubUser = async (username, context) => {
    let user;
    // grab the user
    user =
        username === "self"
            ? context.currentUser
            : await getUser(Object.assign(Object.assign({}, context.hubRequestOptions), { username }));
    // convert to a hubUser
    let hubUser = convertUserToHubUser(user);
    hubUser = await computeProps$1(user, hubUser, context);
    return hubUser;
};

/**
 * Search for members of a group.
 * The groupId is specified via a `group` predicate.
 * Any `term` predicate will be re-mapped to `name`.
 *
 * The backing API is very limited in what
 * it returns so this method executes the search and then tries to fetch
 * the user object directly. This is a bit slower but provides a more
 * information. Even in this case, private users may not be returned, and
 * so we have a default user that is returned in those cases.
 *
 * @param query
 * @param options
 * @returns
 */
async function portalSearchGroupMembers(query, options) {
    // Requires that the query have a filter with a group predicate
    let groupId;
    query.filters.forEach((filter) => {
        filter.predicates.forEach((predicate) => {
            const prop = getProp(predicate, "group");
            if (Array.isArray(prop)) {
                // get first entry from array
                groupId = prop[0];
            }
            else if (typeof prop === "string") {
                // get the value as a string
                groupId = prop;
            }
            else if (typeof prop === "object") {
                // get the value from the object
                // get first entry from any or all array
                groupId = getProp(prop, "any[0]") || getProp(prop, "all[0]");
            }
        });
    });
    if (!groupId) {
        throw new HubError("portalSearchGroupMembers", "Group Id required. Please pass as a predicate in the query.");
    }
    // Expand the individual predicates in each filter
    query.filters = query.filters.map((filter) => {
        // only `name`, `memberType` and `joined` are supported
        const validPredicateKeys = ["name", "memberType", "joined"];
        filter.predicates = filter.predicates
            .map((p) => {
            // convert `term` to `name`
            if (p.term) {
                p.name = p.term;
                delete p.term;
            }
            return p;
        })
            // remove any keys that aren't supported
            .map((p) => {
            return pickProps(p, validPredicateKeys);
        })
            // remove any empty predicates
            .filter((p) => {
            return Object.entries(p).length > 0;
        })
            // expand the remaining predicates
            .map(expandPredicate);
        return filter;
    });
    // Serialize the all the groups for portal
    const so = serializeQueryForPortal(query);
    // Array of properties we want to copy from IHubSearchOptions to the ISearchOptions
    const props = [
        "num",
        "sortField",
        "sortOrder",
        "include",
        "start",
    ];
    // copy the props over
    props.forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
            so[prop] = options[prop];
        }
    });
    so.groupId = groupId;
    so.requestOptions = options.requestOptions;
    // Execute search
    return searchGroupMembers(so);
}
/**
 * @private
 * Portal Search Implementation for Group Members
 * @param options
 */
async function searchGroupMembers(searchOptions) {
    // searchGroupUsers needs requestOptions spread into it's options
    const opts = Object.assign(Object.assign({}, searchOptions), searchOptions.requestOptions);
    const resp = await searchGroupUsers(searchOptions.groupId, opts);
    // create mappable fn that will close
    // over the includes and requestOptions
    const fn = (member) => {
        return memberToSearchResult(Object.assign(Object.assign({}, member), { isGroupOwner: resp.owner.username === member.username }), searchOptions.include, searchOptions.requestOptions);
    };
    // map over results
    const results = await Promise.all(resp.users.map(fn));
    return {
        total: resp.total,
        results,
        hasNext: resp.nextStart > -1,
        next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchGroupMembers),
    };
}
/**
 * Convert an Group Member to a IHubSearchResult
 * Fetches the backing user and uses that to populate the  user object
 * If no user is found, the object is very sparse
 * @param item
 * @param include
 * @param requestOptions
 * @returns
 */
async function memberToSearchResult(member, include = [], requestOptions) {
    // cross org requests may fail for non-public users
    // so we have a default user that has minimal information
    const user = {
        username: member.username,
        memberType: member.memberType || "member",
        access: "private",
        fullName: null,
        firstName: null,
        lastName: null,
        description: null,
        orgId: null,
        groups: [],
        tags: [],
        thumbnail: null,
        created: null,
        modified: null,
        isGroupOwner: member.isGroupOwner,
    };
    const fsGetUser = failSafe(getUser, user);
    const fetchedUser = await fsGetUser({
        username: member.username,
        authentication: requestOptions.authentication,
        portal: requestOptions.portal,
    });
    // Map props from the fetched user, onto the user
    // this is done because the api returns a sparse IGroupMember under some conditions
    // and we'd rather have the default user with keys present than a structure
    // with missing keys
    Object.keys(user).forEach((key) => {
        if (fetchedUser.hasOwnProperty(key) && fetchedUser[key] !== "") {
            setProp(key, fetchedUser[key], user);
        }
    });
    return enrichUserSearchResult(user, ["org.name as OrgName", ...include], requestOptions);
}

/**
 * Fetch the count of items shared to the group.
 * This is done by searching for content in the group
 * and using the returned `total` value
 * @param input
 * @returns
 */
const enrichGroupContentCount = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichGroupContentCount");
    // w/o the : any here, I get a compile error about
    // .authentication being incompatible w/ UserSession
    const options = Object.assign({ groupId: data.group.id, num: 1 }, requestOptions);
    return searchGroupContent(options)
        .then((results) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), { contentCount: results.total }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
/**
 * Create a summary of the Group membership by searching for members,
 * limiting to three for a sample, and using the `total`.
 * @param input
 * @returns
 */
const enrichGroupMembershipSummary = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichGroupMembershipSummary");
    // w/o the `: any` here, I get a compile error about
    // .authentication being incompatible w/ UserSession
    const options = Object.assign({ num: 3 }, requestOptions);
    return searchGroupUsers(data.group.id, options)
        .then((results) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), {
                membershipSummary: { total: results.total, users: results.users },
            }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
/**
 * Get the requesting user's membership in the target group, as well
 * as the membership access requirements for the target group
 * @param input
 * @returns
 */
const enrichGroupUserMembership = (input) => {
    const { data, stack, requestOptions } = input;
    const opId = stack.start("enrichGroupUserMembership");
    return getGroup(data.group.id, requestOptions)
        .then((result) => {
        stack.finish(opId);
        return {
            data: Object.assign(Object.assign({}, data), {
                membershipAccess: result.membershipAccess,
                userMembership: getProp(result, "userMembership.memberType"),
            }),
            stack,
            requestOptions,
        };
    })
        .catch((error) => handleEnrichmentError(error, input, opId));
};
// add the error to the content.errors,
// log current stack operation as finished with an error
// and return output that can be piped into the next operation
const handleEnrichmentError = (error, input, opId) => {
    const { data, stack, requestOptions } = input;
    stack.finish(opId, { error });
    return {
        data: Object.assign(Object.assign({}, data), { errors: getEnrichmentErrors(error, data.errors) }),
        stack,
        requestOptions,
    };
};
/**
 * Available enrichments for Groups
 */
const groupEnrichmentOperations = {
    membershipSummary: enrichGroupMembershipSummary,
    contentCount: enrichGroupContentCount,
    userMembership: enrichGroupUserMembership,
};
/**
 * Fetch enrichments for Groups
 * @param group
 * @param enrichments
 * @param requestOptions
 * @returns
 */
function fetchGroupEnrichments(group, enrichments, requestOptions) {
    // create a pipeline of enrichment operations
    const operations = enrichments.reduce((ops, enrichment) => {
        const operation = groupEnrichmentOperations[enrichment];
        // only include the enrichments that we know how to fetch
        operation && ops.push(operation);
        return ops;
    }, []);
    const pipeline = createOperationPipeline(operations);
    // execute pipeline and return the item and enrichments
    return pipeline({
        data: { group },
        stack: new OperationStack(),
        requestOptions,
    }).then((output) => {
        // TODO: send telemetry so we have info on what enrichments are requested and possible errors
        return output.data;
    });
}

/**
 * Default values of a IHubGroup
 */
const DEFAULT_GROUP = {
    name: "",
    access: "private",
    permissions: [],
    typeKeywords: [],
};

/**
 * Compute the links that get appended to a Hub Group
 * search result and entity
 *
 * @param group
 * @param requestOptions
 */
function computeLinks(group, requestOptions) {
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    return {
        self: getGroupHomeUrl(group.id, requestOptions),
        siteRelative: `/groups/${group.id}`,
        siteRelativeEntityType: getHubRelativeUrl("Group"),
        workspaceRelative: getRelativeWorkspaceUrl("Group", group.id),
        thumbnail: getGroupThumbnailUrl(requestOptions.portal, group, token),
    };
}

/**
 * Given a model and a group, set various computed properties that can't be directly mapped
 * @private
 * @param group
 * @param hubGroup
 * @param requestOptions
 * @returns
 */
function computeProps(group, hubGroup, requestOptions) {
    var _a, _b, _c;
    let token;
    if (requestOptions.authentication) {
        const session = requestOptions.authentication;
        token = session.token;
    }
    // thumbnail url
    hubGroup.thumbnailUrl = getGroupThumbnailUrl(requestOptions.portal, group, token);
    // Handle Dates
    hubGroup.createdDate = new Date(group.created);
    hubGroup.createdDateSource = "group.created";
    hubGroup.updatedDate = new Date(group.modified);
    hubGroup.updatedDateSource = "group.modified";
    hubGroup.type = "Group";
    hubGroup.isDiscussable = isDiscussable(group);
    // This tells us on if the group is an edit/view group.
    // If it has the `updateitemcontrol` capability, it is an edit group
    hubGroup.isSharedUpdate = (group.capabilities || []).includes("updateitemcontrol");
    hubGroup.memberType = (_a = group.userMembership) === null || _a === void 0 ? void 0 : _a.memberType;
    hubGroup.membershipAccess = "anyone";
    if (group.membershipAccess === "org") {
        hubGroup.membershipAccess = "organization";
    }
    if (group.membershipAccess === "collaboration") {
        hubGroup.membershipAccess = "collaborators";
    }
    hubGroup.canEdit =
        ((_b = group.userMembership) === null || _b === void 0 ? void 0 : _b.memberType) === "owner" ||
            ((_c = group.userMembership) === null || _c === void 0 ? void 0 : _c.memberType) === "admin";
    hubGroup.canDelete = hubGroup.canEdit;
    hubGroup.links = computeLinks(group, requestOptions);
    // cast b/c this takes a partial but returns a full group
    return hubGroup;
}

/**
 * Convert an IGroup to a Hub Group
 * @param group
 * @param requestOptions
 */
function convertGroupToHubGroup(group, requestOptions) {
    const mapper = new PropertyMapper(getPropertyMap());
    const hubGroup = mapper.storeToEntity(group, {});
    return computeProps(group, hubGroup, requestOptions);
}

/**
 * @private
 * Given a title, construct a group title that is unique
 * in the user's org.
 *
 * Ex: Given a title of "Medical Team", if a group with that
 * title exists, this fn will add a number on the end, and
 * increment until an available group title is found - i.e.
 * "Medical Team 3"
 *
 * @param {String} title Group Title to ensure is unique
 * @param {IUserRequestOptions} requestOptions
 * @param {Number} step Number to increment. Defaults to 0
 */
async function getUniqueGroupTitle(title, requestOptions, step = 0) {
    let combinedName = title;
    if (step) {
        combinedName = `${title} ${step}`;
    }
    return doesGroupExist(combinedName, requestOptions)
        .then((result) => {
        if (result) {
            step++;
            return getUniqueGroupTitle(title, requestOptions, step);
        }
        else {
            return combinedName;
        }
    })
        .catch((err) => {
        throw Error(`Error in getUniqueGroupTitle: ${err}`);
    });
}
/**
 * checks whether a group with the specified title
 * exists in the user's org
 *
 * @param {String} title Group Title
 * @param {IUserRequestOptions} requestOptions
 */
async function doesGroupExist(title, requestOptions) {
    const query = {
        targetEntity: "group",
        filters: [{ predicates: [{ title }] }],
    };
    try {
        const { results } = await hubSearch(query, { requestOptions });
        return results.length > 0;
    }
    catch (error) {
        throw Error(`Error in getUniqueGroupTitle > doesGroupExist: ${error}`);
    }
}

/**
 * Enrich a generic search result
 * @param group
 * @param includes
 * @param requestOptions
 * @returns
 */
async function enrichGroupSearchResult(group, include, requestOptions) {
    // Create the basic structure
    const result = {
        access: group.access,
        id: group.id,
        type: "Group",
        name: group.title,
        owner: group.owner,
        summary: group.snippet || group.description,
        createdDate: new Date(group.created),
        createdDateSource: "group.created",
        updatedDate: new Date(group.modified),
        updatedDateSource: "group.modified",
        family: "team",
        links: {
            self: "not-implemented",
            siteRelative: "not-implemented",
            thumbnail: "not-implemented",
        },
        rawResult: group,
    };
    // Informal Enrichments - basically adding type-specific props
    // derived directly from the entity
    result.isSharedUpdate = (group.capabilities || []).includes("updateitemcontrol");
    result.membershipAccess = group.membershipAccess;
    result.isOpenData = !!group.isOpenData;
    // default includes
    const DEFAULTS = [];
    // merge includes
    include = [...DEFAULTS, ...include].filter(unique);
    // Parse the includes into a valid set of enrichments
    const specs = include.map(parseInclude);
    // Extract out the low-level enrichments needed
    const enrichments = mapBy("enrichment", specs).filter(unique);
    // fetch the enrichments
    let enriched = {};
    if (enrichments.length) {
        enriched = await fetchGroupEnrichments(group, enrichments, requestOptions);
    }
    // map the enriched props onto the result
    specs.forEach((spec) => {
        result[spec.prop] = getProp(enriched, spec.path);
    });
    // Handle links
    result.links = computeLinks(group, requestOptions);
    return result;
}
/**
 * Create a new Hub Group
 * we are creating an IGroup with the createGroup call
 * so we need to convert the Hub Group to IGroup first
 * then convert it back to Hub Group and return it
 * @param partialGroup
 * @param requestOptions
 */
async function createHubGroup(partialGroup, requestOptions) {
    // merge the incoming and default groups
    const hubGroup = Object.assign(Object.assign({}, DEFAULT_GROUP), partialGroup);
    // ensure the group has a unique title
    const uniqueTitle = await getUniqueGroupTitle(hubGroup.name, requestOptions);
    hubGroup.name = uniqueTitle;
    hubGroup.typeKeywords = setDiscussableKeyword(hubGroup.typeKeywords, hubGroup.isDiscussable);
    const group = convertHubGroupToGroup(hubGroup);
    const opts = {
        group,
        authentication: requestOptions.authentication,
    };
    const result = await createGroup(opts);
    // createGroup does not set a protection value based on the value of 'protected'
    // so we have to make an additional call to protectGroup to set protection
    if (group.protected) {
        result.group.protected = (await protectGroup({
            id: result.group.id,
            authentication: requestOptions.authentication,
        })).success;
    }
    return convertGroupToHubGroup(result.group, requestOptions);
}
/**
 * Get a Hub Group by id
 * we need to convert the IGroup we get to Hub Group
 * @param identifier
 * @param requestOptions
 */
async function fetchHubGroup(identifier, requestOptions) {
    const group = await getGroup(identifier, requestOptions);
    return convertGroupToHubGroup(group, requestOptions);
}
/**
 * @private
 * Update a Hub Group and return it
 * we need to convert the incoming Hub Group to IGroup
 * before sending it to the API
 * @param hubGroup
 * @param requestOptions
 */
async function updateHubGroup(hubGroup, requestOptions) {
    // TODO: fetch the upstream group and convert to a HubGroup so we can compare props
    hubGroup.typeKeywords = setDiscussableKeyword(hubGroup.typeKeywords, hubGroup.isDiscussable);
    const group = convertHubGroupToGroup(hubGroup);
    const opts = {
        group,
        authentication: requestOptions.authentication,
    };
    // if we have a field we are trying to clear
    // We need to send clearEmptyFields: true to the updateGroup call
    if (group._clearEmptyFields) {
        setProp("params.clearEmptyFields", true, opts);
    }
    await updateGroup(opts);
    return hubGroup;
}
/**
 * @private
 * Remove a Hub Group
 * @param id
 * @param requestOptions
 */
async function deleteHubGroup(id, requestOptions) {
    const ro = Object.assign(Object.assign({}, requestOptions), { id });
    await removeGroup(ro);
}

/**
 * @private
 * Portal Search Implementation for Groups
 * @param query
 * @param options
 * @returns
 */
async function portalSearchGroups(query, options) {
    if (!options.requestOptions) {
        throw new HubError("portalSearchGroups", "options.requestOptions is required.");
    }
    // Expand the individual predicates in each filter
    query.filters = query.filters.map((filter) => {
        filter.predicates = filter.predicates.map(expandPredicate);
        return filter;
    });
    // Serialize the all the groups for portal
    const so = serializeQueryForPortal(query);
    // Array of properties we want to copy from IHubSearchOptions to the ISearchOptions
    const props = [
        "num",
        "sortField",
        "sortOrder",
        "include",
        "start",
        "httpMethod",
        "requestOptions",
    ];
    // copy the props over
    props.forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
            so[prop] = options[prop];
        }
    });
    // If we don't have auth, ensure we have .portal
    if (options.requestOptions.authentication) {
        so.authentication = options.requestOptions.authentication;
    }
    else {
        so.portal = options.requestOptions.portal;
    }
    return searchPortal$1(so);
}
/**
 * Internal portal search, which then converts `IGroup`s to `IHubSearchResult`s
 * handling enrichments & includes along the way
 *
 * @param searchOptions
 * @returns
 */
async function searchPortal$1(searchOptions) {
    // Execute portal search
    const resp = await searchGroups(searchOptions);
    // create mappable fn that will close
    // over the includes and requestOptions
    const fn = (item) => {
        return groupToSearchResult(item, searchOptions.include, searchOptions.requestOptions);
    };
    // map over results
    const results = await Promise.all(resp.results.map(fn));
    // Group Search does not support aggregations
    // Construct the return
    return {
        total: resp.total,
        results,
        hasNext: resp.nextStart > -1,
        next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchPortal$1),
        executedQuerySize: getKilobyteSizeOfQuery(searchOptions.q),
    };
}
/**
 * Convert an Item to a IHubSearchResult
 * Fetches the includes and attaches them to the item
 * @param item
 * @param includes
 * @param requestOptions
 * @returns
 */
async function groupToSearchResult(group, includes = [], requestOptions) {
    // Delegate to HubGroups module
    // This layer of indirection is not necessary but
    // aligns with how the items search works and
    // allows for future specialization
    return enrichGroupSearchResult(group, includes, requestOptions);
}

function buildSearchOptions(query, options, operation) {
    // requestOptions is always required and user must be authd
    if (!options.requestOptions) {
        throw new HubError(operation, "requestOptions: IHubRequestOptions is required.");
    }
    if (!options.requestOptions.authentication) {
        throw new HubError(operation, "requestOptions must pass authentication.");
    }
    const clonedQuery = cloneObject(query);
    // Expand the individual predicates in each filter
    clonedQuery.filters = clonedQuery.filters.map((filter) => {
        filter.predicates = filter.predicates.map(expandPredicate);
        return filter;
    });
    // Serialize the all the groups for portal
    const so = serializeQueryForPortal(clonedQuery);
    // Array of properties we want to copy from IHubSearchOptions to the ISearchOptions
    const props = [
        "num",
        "sortField",
        "sortOrder",
        "include",
        "start",
        "requestOptions",
    ];
    // copy the props over
    props.forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
            so[prop] = options[prop];
        }
    });
    // Unlike Groups and Item, the Users api *requires* authentication
    // so we set it directly
    so.authentication = options.requestOptions.authentication;
    return so;
}
/**
 * @private
 *
 * Portal Search Implementation for Users within the currently authenticated user's organization.
 * Automatically adds "org.name as OrgName" enrichment
 *
 * DEPRECATED: This method will be deprecated in a future release, as it's not ideal to impose default enrichments in all
 * cases. When this method is depreated, all places that currently call `hubSearch` with a `targetEntity` of `user` will
 * need to be updated to use the `portalUser` `targetEntity` and explicitly pass `"org.name as OrgName"` in `inclues` to
 * preserve that enrichment, if needed. E.g.
 *
 * ```js
 * // before
 * await hubSearch(
 *   { targetEntity: "user", ... },
 *   { start: 1, ... },
 * );
 *
 * // after
 * await hubSearch(
 *   { targetEntity: "portalUser", ... },
 *   { start: 1, include: ["org.name as OrgName", ...], ... },
 * );
 * ```
 *
 * @param query An IQuery object representing the query to serialize
 * @param options An IHubSearchOptions of search options
 * @returns a promise that resolves an IHubSearchResponse<IHubSearchResult> of users results
 */
function searchPortalUsersLegacy(query, options) {
    const searchOptions = buildSearchOptions(query, options, "searchPortalUsersLegacy");
    // Execute search
    return searchPortal(Object.assign(Object.assign({}, searchOptions), { include: ["org.name as OrgName", ...(searchOptions.include || [])] }));
}
/**
 * @private
 *
 * Portal Search Implementation for Users within the currently authenticated user's organization.
 * No enrichments added by default.
 *
 * @param query An IQuery object representing the query to serialize
 * @param options An IHubSearchOptions of search options
 * @returns a promise that resolves an IHubSearchResponse<IHubSearchResult> of users results
 */
function searchPortalUsers(query, options) {
    const searchOptions = buildSearchOptions(query, options, "searchPortalUsers");
    // Execute search
    return searchPortal(searchOptions);
}
/**
 * @private
 *
 * Community Search Implementation for Users within in any organization.
 * No enrichments added by default.
 *
 * @param query An IQuery object representing the query to serialize
 * @param options An IHubSearchOptions of search options
 * @returns a promise that resolves an IHubSearchResponse<IHubSearchResult> of users results
 */
function searchCommunityUsers(query, options) {
    const searchOptions = buildSearchOptions(query, options, "searchCommunityUsers");
    // Execute search
    return searchCommunity(searchOptions);
}
/**
 * @private
 * @param searchOptions An IUserSearchOptions object
 * @param searchResponse A ISearchResult<IUser> object
 * @returns
 */
function mapUsersToSearchResults(searchOptions, searchResponse) {
    // create mappable fn that will close
    // over the includes and requestOptions
    const fn = (user) => userToSearchResult(user, searchOptions.include, searchOptions.requestOptions);
    return Promise.all(searchResponse.results.map(fn));
}
/**
 * Internal portal search, which then converts `IGroup`s to `IHubSearchResult`s
 * handling enrichments & includes along the way
 *
 * @param searchOptions
 * @returns a promise that resolves enriched internal portal user search results
 */
async function searchPortal(searchOptions) {
    // Execute portal search
    const resp = await searchUsers(searchOptions);
    // map over results
    const results = await mapUsersToSearchResults(searchOptions, resp);
    // Group Search does not support aggregations
    // Construct the return
    return {
        total: resp.total,
        results,
        hasNext: resp.nextStart > -1,
        next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchPortal),
        executedQuerySize: getKilobyteSizeOfQuery(searchOptions.q),
    };
}
/**
 * Community search, which then converts `IGroup`s to `IHubSearchResult`s
 * handling enrichments & includes along the way
 *
 * @param searchOptions
 * @returns a promise that resolves enriched community user search results
 */
async function searchCommunity(searchOptions) {
    // Execute portal search
    const resp = await searchCommunityUsers$1(searchOptions);
    // map over results
    const results = await mapUsersToSearchResults(searchOptions, resp);
    // Group Search does not support aggregations
    // Construct the return
    return {
        total: resp.total,
        results,
        hasNext: resp.nextStart > -1,
        next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchCommunity),
        executedQuerySize: getKilobyteSizeOfQuery(searchOptions.q),
    };
}
/**
 * Convert an Item to a IHubSearchResult
 * Fetches the includes and attaches them to the item
 * @param item
 * @param include
 * @param requestOptions
 * @returns
 */
function userToSearchResult(user, include = [], requestOptions) {
    // Delegate to HubUsers module
    // This layer of indirection is not necessary but
    // aligns with how the items search works and
    // allows for future specialization
    return enrichUserSearchResult(user, include, requestOptions);
}

function formatOgcAggregationsResponse(response) {
    const aggregations = response.aggregations.aggregations.map((ogcAgg) => ({
        // What should it really be?
        mode: "terms",
        field: ogcAgg.field,
        values: ogcAgg.aggregations.map((a) => ({
            // Not confusing at all, right? Just some differences in terminology
            value: a.label,
            count: a.value,
        })),
    }));
    return {
        total: 0,
        results: [],
        hasNext: false,
        next: () => null,
        aggregations,
    };
}

function getFilterQueryParam(query) {
    return query.filters
        .map(formatFilterBlock)
        .filter(removeEmptyClauses)
        .join(" AND ");
}
function formatFilterBlock(filter) {
    const operation = filter.operation || "OR";
    const formatted = filter.predicates
        .map(formatPredicate)
        .filter(removeEmptyClauses)
        .join(` ${operation} `);
    return `(${formatted})`;
}
function formatPredicate(predicate) {
    const formatted = Object.entries(predicate)
        // Remove predicates that use `term` (handled in `getQQueryParam`),
        // `bbox` (handled in `getBboxQueryParam) or have undefined entries
        .filter(([field, value]) => field !== "term" && field !== "bbox" && !isNilOrEmptyString(value))
        // Create sections for each field
        .reduce((acc, [field, value]) => {
        let section;
        if (typeof value === "string" || typeof value === "boolean") {
            section = formatSimpleComparison(field, value);
        }
        else if (Array.isArray(value)) {
            section = formatMultiStringPredicate(field, value);
        }
        else if (isDateRange(value)) {
            section = formatDateRangePredicate(field, value);
        }
        else {
            section = formatComplexPredicate(field, value);
        }
        acc.push(section);
        return acc;
    }, [])
        // AND together all field requirements
        .join(" AND ");
    return `(${formatted})`;
}
function isDateRange(x) {
    return Number.isInteger(x.from) && Number.isInteger(x.to);
}
function formatDateRangePredicate(field, value) {
    return `${field} BETWEEN ${value.from} AND ${value.to}`;
}
function formatSimpleComparison(field, value) {
    const formattedValue = typeof value === "string" ? maybeAddSingleQuotes(value) : value;
    return `${field}=${formattedValue}`;
}
function formatMultiStringPredicate(field, values) {
    const wrappedValues = values.map(maybeAddSingleQuotes);
    return `${field} IN (${wrappedValues.join(", ")})`;
}
function formatComplexPredicate(field, value) {
    const anys = formatAnys(field, value.any);
    const alls = formatAlls(field, value.all);
    const nots = formatNots(field, value.not);
    return [anys, alls, nots].filter((subsection) => !!subsection).join(" AND ");
}
function formatAnys(field, value) {
    let result;
    if (Array.isArray(value)) {
        const wrappedValues = value.map(maybeAddSingleQuotes);
        result = `${field} IN (${wrappedValues.join(", ")})`;
    }
    else if (value) {
        result = formatSimpleComparison(field, value);
    }
    return result;
}
function formatAlls(field, value) {
    let result;
    if (Array.isArray(value)) {
        result = value
            .map((v) => formatSimpleComparison(field, v))
            .join(" AND ");
    }
    else if (value) {
        result = formatSimpleComparison(field, value);
    }
    return result;
}
function formatNots(field, value) {
    let result;
    if (value) {
        const valueAsArray = Array.isArray(value) ? value : [value];
        const wrappedValues = valueAsArray.map(maybeAddSingleQuotes);
        result = `${field} NOT IN (${wrappedValues.join(", ")})`;
    }
    return result;
}
function maybeAddSingleQuotes(value) {
    const whitespaceRegex = /\s/;
    return whitespaceRegex.test(value) ? `'${value}'` : value;
}
/**
 * Returns whether a clause is non-empty and should be included in the
 * final serialized string.
 *
 * Empty clauses appear when certain predicates are detected that are invalid
 * in the OGC API's ?filter string (i.e. `term`, `bbox`)
 *
 * @param clause stringified clause to inspect
 * @returns whether the clause should be included in the final serialization
 */
function removeEmptyClauses(clause) {
    return clause !== "()";
}

function getOgcAggregationQueryParams(query, options) {
    // TODO: use options.aggLimit once the OGC API supports it
    const aggregations = `terms(fields=(${options.aggFields.join()}))`;
    const filter = getFilterQueryParam(query);
    const token = getProp(options, "requestOptions.authentication.token");
    return {
        aggregations,
        filter,
        token,
    };
}

/**
 * @private
 *
 * Given a query, returns the correct OGC Collection URL to target.
 * If a collectionId is indicated, that collection is targeted. Else
 * the all collection is targeted.
 *
 * @param query the query the request is based on
 * @param options request options, including the base OGC api url
 * @returns the collection url
 */
function getOgcCollectionUrl(query, options) {
    const apiDefinition = options.api;
    // Discussion posts as a target entity will be searchable with one collection,
    // so simply use that for the URL
    if (query.targetEntity === "discussionPost") {
        return `${apiDefinition.url}/collections/discussion-post`;
    }
    const collectionId = query.collection || "all";
    return `${apiDefinition.url}/collections/${collectionId}`;
}

function getQueryString(queryParams) {
    const result = Object.entries(queryParams)
        .filter(([_key, value]) => !isNilOrEmptyString(value))
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
    return result && `?${result}`;
}

/**
 * Wrapper over fetch for performing common operations when executing a request to an OGC API, such as:
 * - Creating the query string
 * - URL encoding query string values
 * - Appending the ?target query param if needed
 * - Checking whether the response is ok
 * - Returning the .json() of the response body
 *
 * Note: the ?target query param is only appended if the target site (options.site) is _different_ from the
 * the site that will have its OGC API hit (url). This allows us to use the environment-level OGC API's url while
 * actually targeting a specific Hub Site's catalog. It's a powerful capability that significantly eases local development.
 *
 * Example: https://hubqa.arcgis.com/api/search/v1?target="my-actual-hub.hub.arcgis.com"
 *
 * We omit the ?target query when the site and url are the same because it would be redundant.
 *
 * Bad example: https://hubqa.arcgis.com/api/search/v1?target="hubqa.arcgis.com"
 * Good example: https://hubqa.arcgis.com/api/search/v1
 *
 * @param url the OGC API endpoint that should actually be hit
 * @param queryParams query params that should be serialized with the request (excluding `target`)
 * @param options options to customize the search, such as the site whose catalogs we're targeting
 * @returns the JSON response from the endpoint
 */
async function ogcApiRequest(url, queryParams, options) {
    var _a;
    const updatedQueryParams = cloneObject(queryParams);
    const targetDomain = new URL(options.site).hostname;
    const urlDomain = new URL(url).hostname;
    if (targetDomain !== urlDomain) {
        updatedQueryParams.target = targetDomain;
    }
    const withQueryString = url + getQueryString(updatedQueryParams);
    // use fetch override if any
    const _fetch = ((_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.fetch) || fetch;
    const response = await _fetch(withQueryString, { method: "GET" });
    if (!response.ok) {
        throw new RemoteServerError(response.statusText, withQueryString, response.status);
    }
    return response.json();
}

async function searchOgcAggregations(query, options) {
    const url = `${getOgcCollectionUrl(query, options)}/aggregations`;
    const queryParams = getOgcAggregationQueryParams(query, options);
    const rawResponse = await ogcApiRequest(url, queryParams, options);
    return formatOgcAggregationsResponse(rawResponse);
}

function getNextOgcCallback(response, originalQuery, originalOptions) {
    const nextLink = response.links.find((l) => l.rel === "next");
    let callback = () => null;
    if (nextLink) {
        callback = () => {
            const nextUrl = new URL(nextLink.href);
            const start = +nextUrl.searchParams.get("startindex");
            const nextOptions = Object.assign(Object.assign({}, originalOptions), { start });
            return searchOgcItems(originalQuery, nextOptions);
        };
    }
    return callback;
}

async function ogcItemToSearchResult(ogcItem, includes, requestOptions) {
    // OGC Api stuffs the item wholesale in `.properties`
    // NOTE: the properties hash may also have some extraneous members such
    // as `license` and `source` if the OgcItem came from the index.
    const pseudoItem = ogcItem.properties;
    const result = await itemToSearchResult(pseudoItem, includes, requestOptions);
    // Expose extraneous members like `license` and `source`
    result.source = ogcItem.properties.source;
    result.license = ogcItem.properties.license;
    return result;
}

/**
 * This method is responsible for converting an OGC item whose properties
 * represent an IPost into an IHubSearchResult. Although some fields do not
 * apply, this is being done such that result of a discussion post search
 * can automatically be used in a gallery.
 * @param ogcItem
 * @returns IHubSearchResult
 */
async function ogcItemToDiscussionPostResult(ogcItem) {
    return {
        // Base IHubSearchResult properties
        id: ogcItem.id,
        name: ogcItem.properties.title,
        summary: ogcItem.properties.body,
        createdDate: new Date(ogcItem.properties.createdAt),
        createdDateSource: "properties.createdAt",
        updatedDate: new Date(ogcItem.properties.updatedAt),
        updatedDateSource: "properties.updatedAt",
        type: "post",
        owner: ogcItem.properties.creator,
        location: null,
        created: new Date(ogcItem.properties.createdAt),
        modified: new Date(ogcItem.properties.updatedAt),
        title: ogcItem.properties.title,
        rawResult: ogcItem,
        access: null,
        family: null,
    };
}

async function formatOgcItemsResponse(response, originalQuery, originalOptions) {
    if (originalQuery.targetEntity === "discussionPost") {
        return formatDiscussionPostTargetEntityResponse(response, originalQuery, originalOptions);
    }
    return formatItemTargetEntityResponse(response, originalQuery, originalOptions);
}
async function formatDiscussionPostTargetEntityResponse(response, originalQuery, originalOptions) {
    const formattedResults = await Promise.all(response.features.map((f) => ogcItemToDiscussionPostResult(f)));
    const next = getNextOgcCallback(response, originalQuery, originalOptions);
    const nextLink = response.links.find((l) => l.rel === "next");
    return {
        total: response.numberMatched,
        results: formattedResults,
        hasNext: !!nextLink,
        next,
    };
}
async function formatItemTargetEntityResponse(response, originalQuery, originalOptions) {
    const formattedResults = await Promise.all(response.features.map((f) => ogcItemToSearchResult(f, originalOptions.include, originalOptions.requestOptions)));
    const next = getNextOgcCallback(response, originalQuery, originalOptions);
    const nextLink = response.links.find((l) => l.rel === "next");
    return {
        total: response.numberMatched,
        results: formattedResults,
        hasNext: !!nextLink,
        next,
    };
}

/**
 * @private
 * Extracts the bbox value that the search should be filtered by.
 * Also validates that the bbox predicate is not combined in some
 * invalid way with other predicates.
 *
 * @param query query to extract the bbox predicate from
 * @returns the bbox value to filter by
 */
function getBboxQueryParam(query) {
    const bboxPredicate = getTopLevelPredicate("bbox", query.filters);
    return bboxPredicate === null || bboxPredicate === void 0 ? void 0 : bboxPredicate.bbox;
}

// TODO: the 'q' query param logic is only here because the
// OGC API currently has a bug where 'q' cannot be included
// in the 'filter' string. Once that bug is resolved, rip this
// logic out and let predicates with 'term' to be processed normally
function getQQueryParam(query) {
    const qPredicate = getTopLevelPredicate("term", query.filters);
    return qPredicate === null || qPredicate === void 0 ? void 0 : qPredicate.term;
}

/**
 * @private
 * Serializes the sort options provided from the request options
 * object into a string that the OGC API can understand
 *
 * @param options IHubSearchOptions that contain sorting information
 * @returns a serialized sort string
 */
function getSortByQueryParam(options) {
    const { sortField, sortOrder } = options;
    let result;
    if (sortField) {
        result =
            sortOrder === "desc"
                ? `-properties.${sortField}`
                : `properties.${sortField}`;
    }
    return result;
}

/**
 * @private
 * Derives a hash of query params that should be included with a request
 * to the /items endpoint of an OGC API collection
 *
 * @param query an IQuery to derive query params from
 * @param options an IHubSearchOptions object to derive query params from
 * @returns a hash of query params to be included in the request
 */
function getOgcItemQueryParams(query, options) {
    const filter = getFilterQueryParam(query);
    const token = getProp(options, "requestOptions.authentication.token");
    const limit = options.num;
    // API requires the param name be all lowercase
    const startindex = options.start;
    const q = getQQueryParam(query);
    const sortBy = getSortByQueryParam(options);
    const bbox = getBboxQueryParam(query);
    return {
        filter,
        token,
        limit,
        startindex,
        q,
        sortBy,
        bbox,
    };
}

async function searchOgcItems(query, options) {
    const url = `${getOgcCollectionUrl(query, options)}/items`;
    const queryParams = getOgcItemQueryParams(query, options);
    const rawResponse = await ogcApiRequest(url, queryParams, options);
    return formatOgcItemsResponse(rawResponse, query, options);
}

/**
 * @private
 * Execute item search against the Hub API
 * @param query
 * @param options
 * @returns
 */
async function hubSearchItems(query, options) {
    var _a;
    return ((_a = options.aggFields) === null || _a === void 0 ? void 0 : _a.length) ? searchOgcAggregations(query, options)
        : searchOgcItems(query, options);
}

/**
 * @private
 * Convert hubSearch IHubSearchOptions and IQuery interfaces to a
 * ISearchChannelsParams structure that is needed for the Discussions API
 * searchChannels(searchOptions: ISearchCHannelsParams) function
 * @param {IHubSearchOptions} options
 * @param {IQuery} query
 * @returns ISearchChannelParams
 */
const processSearchParams = (options, query) => {
    if (!options.requestOptions) {
        throw new HubError("hubSearchChannels", "options.requestOptions is required");
    }
    // Array of properties we want to copy over from IHubSeachOptions to ISearchChannels
    const paginationProps = {};
    const allowedPaginationProps = [
        "num",
        "start",
        "sortField",
        "sortOrder",
    ];
    // Map ISearchOptions key to ISearchChannels key
    const keyMappings = {
        sortField: "sortBy",
        term: "name",
    };
    // Map any values that originated from ISearchOptions
    // into a correct ISearchChannels value
    const mapValue = (key, value) => {
        let _value = value;
        if (key === "sortOrder") {
            _value = value === null || value === void 0 ? void 0 : value.toUpperCase();
        }
        else if (key === "sortBy") {
            _value = {
                created: "createdAt",
                modified: "updatedAt",
                title: null,
            }[value];
        }
        return _value;
    };
    allowedPaginationProps.forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
            const { [prop]: key = prop } = keyMappings;
            const _key = key;
            const value = mapValue(_key, options[prop]);
            if (key && value) {
                paginationProps[_key] = value;
            }
        }
    });
    // Acceptable fields to use as filters
    const filterProps = {};
    const allowedFilterProps = [
        "access",
        "groups",
        "name",
    ];
    // Find predicates that match acceptable filter fields
    query.filters.forEach((filter) => {
        filter.predicates.forEach((predicate) => {
            Object.keys(predicate).forEach((key) => {
                const { [key]: _key = key } = keyMappings;
                if (allowedFilterProps.includes(_key)) {
                    filterProps[_key] = [...(filterProps[_key] || []), predicate[key]];
                }
            });
        });
    });
    // Return as ISearchChannelsParams
    return Object.assign(Object.assign({}, options.requestOptions), { data: Object.assign(Object.assign({}, paginationProps), filterProps) });
};
/**
 * @private
 * Convert the Discussions API searchChannels response into an
 * IHubSearchResponse necessary for supporting hubSearch results
 * @param {IPagedResponse{IChannel}} channelsResponse
 * @param {IQuery} query
 * @param {IHubSearchOptions} options
 * @returns IHubSearchResponse<IHubSearchResult>
 */
const toHubSearchResults = async (channelsResponse, query, options) => {
    const { total, items, nextStart } = channelsResponse;
    // Convert IChannel to IHubSearchResult
    const itemsAndGroups = await Promise.all(items.map(async (channel) => {
        var _a;
        const groups = ((_a = options.include) === null || _a === void 0 ? void 0 : _a.includes("groups")) ? await Promise.all(channel.groups.map(async (groupId) => {
            let group;
            try {
                group = await getGroup(groupId, options.requestOptions);
            }
            catch (e) {
                group = null;
                /* tslint:disable-next-line: no-console */
                console.warn(`Cannot fetch group enhancement for id = ${groupId}`, e);
            }
            return group;
        }))
            : [];
        return { channel, groups };
    }));
    return {
        total,
        results: itemsAndGroups.map(({ channel, groups }) => channelToSearchResult(channel, groups)),
        hasNext: nextStart > -1,
        next: () => {
            return hubSearchChannels(query, Object.assign(Object.assign({}, options), { start: nextStart }));
        },
    };
};
/**
 * @private
 * Execute channel search against the Discussions API
 * @param query
 * @param options
 * @returns
 */
const hubSearchChannels = async (query, options) => {
    // Pull useful info out of query
    const searchOptions = processSearchParams(options, query);
    // Call to searchChannels
    const channelsResponse = await searchChannels(searchOptions);
    // Parse into <IHubSearchResponse<IHubSearchResult>>
    return toHubSearchResults(channelsResponse, query, options);
};

/**
 * Resolves an IHubSearchResult for the given IEvent record
 * @param event An IEvent record
 * @param options An IHubSearchOptions object
 * @returns a IHubSearchResult for the given IEvent record
 */
async function eventToSearchResult(event, options) {
    var _a;
    let ownerUser;
    if ((_a = options.include) === null || _a === void 0 ? void 0 : _a.includes("ownerUser")) {
        ownerUser = await getUser(Object.assign({ username: event.creator.username }, options.requestOptions));
    }
    const result = {
        access: event.access.toLowerCase(),
        id: event.id,
        location: getLocationFromEvent(event),
        type: "Event",
        name: event.title,
        owner: event.creator.username,
        ownerUser,
        summary: event.summary || event.description,
        createdDate: new Date(event.createdAt),
        createdDateSource: "event.createdAt",
        updatedDate: new Date(event.updatedAt),
        updatedDateSource: "event.updatedAt",
        family: "event",
        links: computeLinks$1(event),
        tags: event.tags,
        categories: event.categories,
        rawResult: event,
    };
    return result;
}

/**
 * Builds a Partial<GetEventsParams> for the given IHubSearchOptions
 * @param options An IHubSearchOptions object
 * @returns a Partial<GetEventsParams> for the given IHubSearchOptions
 */
function processOptions(options) {
    const processedOptions = {};
    if (options.num > 0) {
        processedOptions.num = options.num.toString();
    }
    if (options.start > 1) {
        processedOptions.start = options.start.toString();
    }
    if (options.sortField === "modified") {
        processedOptions.sortBy = EventSort.updatedAt;
    }
    else if (options.sortField === "created") {
        processedOptions.sortBy = EventSort.createdAt;
    }
    else if (options.sortField === "title") {
        processedOptions.sortBy = EventSort.title;
    }
    else if (options.sortField === "startDate") {
        processedOptions.sortBy = EventSort.startDateTime;
    }
    processedOptions.sortOrder =
        options.sortOrder === "desc" ? EventSortOrder.desc : EventSortOrder.asc;
    return processedOptions;
}

const getPredicateValuesByKey = (filters, predicateKey) => {
    const toPredicateValuesByKey = (a1, filter) => filter.predicates.reduce((a2, predicate) => Object.entries(predicate).reduce((a3, [key, val]) => key === predicateKey
        ? [...a3, ...(Array.isArray(val) ? val : [val])]
        : a3, a2), a1);
    return filters.reduce(toPredicateValuesByKey, []);
};

const getOptionalPredicateStringsByKey = (filters, predicateKey) => {
    const predicateValues = getPredicateValuesByKey(filters, predicateKey);
    const str = predicateValues.filter(unique).join(",");
    if (str) {
        return str;
    }
};

/**
 * Builds a Partial<GetEventsParams> given an Array of IFilter objects
 * @param filters An Array of IFilter
 * @returns a Partial<GetEventsParams> for the given Array of IFilter objects
 */
async function processFilters(filters, requestOptions) {
    const processedFilters = {};
    const access = getOptionalPredicateStringsByKey(filters, "access");
    if (access === null || access === void 0 ? void 0 : access.length) {
        processedFilters.access = access;
    }
    const canEdit = getPredicateValuesByKey(filters, "canEdit");
    if (canEdit.length) {
        processedFilters.canEdit = canEdit[0].toString();
    }
    const entityIds = getOptionalPredicateStringsByKey(filters, "entityId");
    if (entityIds === null || entityIds === void 0 ? void 0 : entityIds.length) {
        processedFilters.entityIds = entityIds;
    }
    const entityTypes = getOptionalPredicateStringsByKey(filters, "entityType");
    if (entityTypes === null || entityTypes === void 0 ? void 0 : entityTypes.length) {
        processedFilters.entityTypes = entityTypes;
    }
    const eventIds = getOptionalPredicateStringsByKey(filters, "id");
    if (eventIds === null || eventIds === void 0 ? void 0 : eventIds.length) {
        processedFilters.eventIds = eventIds;
    }
    const term = getPredicateValuesByKey(filters, "term");
    if (term.length) {
        processedFilters.title = term[0];
    }
    const orgId = getPredicateValuesByKey(filters, "orgId");
    if (orgId.length) {
        processedFilters.orgId = orgId[0];
    }
    const categories = getOptionalPredicateStringsByKey(filters, "categories");
    if (categories === null || categories === void 0 ? void 0 : categories.length) {
        processedFilters.categories = categories;
    }
    const tags = getOptionalPredicateStringsByKey(filters, "tags");
    if (tags === null || tags === void 0 ? void 0 : tags.length) {
        processedFilters.tags = tags;
    }
    const groupIds = getOptionalPredicateStringsByKey(filters, "group");
    // if a group was provided, we prioritize that over individual readGroupId or editGroupId
    // filters to prevent collisions
    if (groupIds === null || groupIds === void 0 ? void 0 : groupIds.length) {
        // We are explicitly sending groupIds to sharedToGroups
        processedFilters.sharedToGroups = groupIds;
    }
    else {
        // individual readGroupId & editGroupId filters
        const readGroupIds = getOptionalPredicateStringsByKey(filters, "readGroupId");
        if (readGroupIds === null || readGroupIds === void 0 ? void 0 : readGroupIds.length) {
            processedFilters.readGroups = readGroupIds;
        }
        const editGroupIds = getOptionalPredicateStringsByKey(filters, "editGroupId");
        if (editGroupIds === null || editGroupIds === void 0 ? void 0 : editGroupIds.length) {
            processedFilters.editGroups = editGroupIds;
        }
    }
    // NOTE: previously notGroup was an inverse of group, but now they are subtly different
    // We do not yet have an inverse of sharedToGroups.
    const notGroupIds = getPredicateValuesByKey(filters, "notGroup");
    // if a notGroup was provided, we prioritize that over individual notReadGroupId or notEditGroupId
    // filters to prevent collisions
    if (notGroupIds.length) {
        const { results } = await searchGroups(Object.assign({ q: `id:(${notGroupIds.join(" OR ")})`, num: notGroupIds.length }, requestOptions));
        const { notReadGroupIds, notEditGroupIds } = results.reduce((acc, group) => {
            const key = isUpdateGroup(group)
                ? "notEditGroupIds"
                : "notReadGroupIds";
            return Object.assign(Object.assign({}, acc), { [key]: [...acc[key], group.id] });
        }, { notReadGroupIds: [], notEditGroupIds: [] });
        if (notReadGroupIds.length) {
            processedFilters.withoutReadGroups = notReadGroupIds.join(",");
        }
        if (notEditGroupIds.length) {
            processedFilters.withoutEditGroups = notEditGroupIds.join(",");
        }
    }
    else {
        // individual notReadGroupId & notEditGroupId filters
        const notReadGroupIds = getOptionalPredicateStringsByKey(filters, "notReadGroupId");
        if (notReadGroupIds === null || notReadGroupIds === void 0 ? void 0 : notReadGroupIds.length) {
            processedFilters.withoutReadGroups = notReadGroupIds;
        }
        const notEditGroupIds = getOptionalPredicateStringsByKey(filters, "notEditGroupId");
        if (notEditGroupIds === null || notEditGroupIds === void 0 ? void 0 : notEditGroupIds.length) {
            processedFilters.withoutEditGroups = notEditGroupIds;
        }
    }
    const attendanceType = getOptionalPredicateStringsByKey(filters, "attendanceType");
    if (attendanceType === null || attendanceType === void 0 ? void 0 : attendanceType.length) {
        processedFilters.attendanceTypes = attendanceType;
    }
    const createdByIds = getOptionalPredicateStringsByKey(filters, "owner");
    if (createdByIds === null || createdByIds === void 0 ? void 0 : createdByIds.length) {
        processedFilters.createdByIds = createdByIds;
    }
    const status = getOptionalPredicateStringsByKey(filters, "status");
    processedFilters.status = (status === null || status === void 0 ? void 0 : status.length) ? status
        : [EventStatus.PLANNED, EventStatus.CANCELED]
            .map((val) => val.toLowerCase())
            .join(",");
    const startDateRange = getPredicateValuesByKey(filters, "startDateRange");
    // if a startDateRange was provided, we prioritize that over individual startDateBefore or startDateAfter
    // filters to prevent collisions
    // We are explicitly checking if the to and from values are present
    // Because w/ Occurrence, we can have just to or from values
    if (startDateRange.length) {
        startDateRange[0].to &&
            (processedFilters.startDateTimeBefore = new Date(startDateRange[0].to).toISOString());
        startDateRange[0].from &&
            (processedFilters.startDateTimeAfter = new Date(startDateRange[0].from).toISOString());
    }
    else {
        // individual startDateBefore & startDateAfter filters
        const startDateBefore = getPredicateValuesByKey(filters, "startDateBefore");
        if (startDateBefore.length) {
            processedFilters.startDateTimeBefore = new Date(startDateBefore[0]).toISOString();
        }
        const startDateAfter = getPredicateValuesByKey(filters, "startDateAfter");
        if (startDateAfter.length) {
            processedFilters.startDateTimeAfter = new Date(startDateAfter[0]).toISOString();
        }
    }
    const endDateRange = getPredicateValuesByKey(filters, "endDateRange");
    // if a endDateRange was provided, we prioritize that over individual endDateBefore or endDateAfter
    // filters to prevent collisions
    // We are explicitly checking if the to and from values are present
    // Because w/ Occurrence, we can have just to or from values
    if (endDateRange.length) {
        endDateRange[0].to &&
            (processedFilters.endDateTimeBefore = new Date(endDateRange[0].to).toISOString());
        endDateRange[0].from &&
            (processedFilters.endDateTimeAfter = new Date(endDateRange[0].from).toISOString());
    }
    else {
        // individual endDateBefore & endDateAfter filters
        const endDateBefore = getPredicateValuesByKey(filters, "endDateBefore");
        if (endDateBefore.length) {
            processedFilters.endDateTimeBefore = new Date(endDateBefore[0]).toISOString();
        }
        const endDateAfter = getPredicateValuesByKey(filters, "endDateAfter");
        if (endDateAfter.length) {
            processedFilters.endDateTimeAfter = new Date(endDateAfter[0]).toISOString();
        }
    }
    // If there's an occurrence filter, we need to adjust the startDateTimeBefore, startDateTimeAfter
    // Depending on the occurrence.
    const occurrence = getPredicateValuesByKey(filters, "occurrence");
    if (occurrence.length) {
        occurrence.forEach((o) => {
            switch (o) {
                case "upcoming":
                    processedFilters.startDateTimeAfter = new Date().toISOString();
                    break;
                case "past":
                    processedFilters.endDateTimeBefore = new Date().toISOString();
                    break;
                case "inProgress":
                    processedFilters.startDateTimeBefore = new Date().toISOString();
                    processedFilters.endDateTimeAfter = new Date().toISOString();
                    break;
            }
        });
    }
    return processedFilters;
}

/**
 * Searches for events against the Events 3 API using the given `query` and `options`.
 * Currently supported filters include:
 *   - access: 'public' | 'private' | 'org' | Array<'public' | 'org' | 'access'>;
 *   - canEdit: boolean
 *   - entityId: string | string[];
 *   - entityType: string | string[];
 *   - id: string | string[];
 *   - userId: string;
 *   - term: string;
 *   - categories: string | string[];
 *   - tags: string | string[];
 *   - group: string | string[];
 *   - notGroup: string | string[];
 *   - readGroupId: string | string[];
 *   - notReadGroupId: string | string[];
 *   - editGroupId: string | string[];
 *   - notEditGroupId: string | string[];
 *   - attendanceType: 'virtual' | 'in_person' | Array<'virtual' | 'in_person'>;
 *   - owner: string | string[];
 *   - status: 'planned' | 'canceled' | 'removed' | Array<'planned' | 'canceled' | 'removed'>;
 *   - startDateBefore: string | number;
 *   - startDateAfter: string | number;
 *   - startDateRange: IDateRange<string | number>;
 *   - endDateRange: IDateRange<string | number>;
 *   - endDateBefore: string | number;
 *   - endDateAfter: string | number;
 *   - orgId: string;
 * Currently supported sort fields include:
 *   - created
 *   - modified
 *   - title
 *   - startDate
 * @param query An IQuery object
 * @param options An IHubSearchOptions object
 * @returns a promise that resolves a <IHubSearchResponse<IHubSearchResult> object
 */
async function hubSearchEvents(query, options) {
    const processedFilters = await processFilters(query.filters, options.requestOptions);
    const processedOptions = processOptions(options);
    const data = Object.assign(Object.assign(Object.assign({}, processedFilters), processedOptions), { include: "creator,location" });
    const { items, nextStart, total } = await getEvents(Object.assign(Object.assign({}, options.requestOptions), { data }));
    const results = await Promise.all(items.map((event) => eventToSearchResult(event, options)));
    const hasNext = nextStart > -1;
    return {
        total,
        results,
        hasNext,
        next: () => {
            if (!hasNext) {
                throw new Error("No more hub events for the given query and options");
            }
            return hubSearchEvents(query, Object.assign(Object.assign({}, options), { start: nextStart }));
        },
    };
}

/**
 * Transforms a given event attendee into a IHubSearchResult
 * @param attendee
 * @returns
 */
async function eventAttendeeToSearchResult(attendee, options) {
    var _a;
    const [user, creator] = await Promise.all([
        getUser(Object.assign({ username: attendee.userId }, options.requestOptions)),
        getUser(Object.assign({ username: attendee.createdById }, options.requestOptions)),
    ]);
    return {
        id: attendee.id.toString(),
        access: user.access,
        name: user.fullName,
        createdDate: new Date(attendee.createdAt),
        createdDateSource: "attendee.createdAt",
        updatedDate: new Date(attendee.updatedAt),
        updatedDateSource: "attendee.updatedAt",
        type: "Event Attendee",
        family: "eventAttendee",
        owner: creator.username,
        rawResult: attendee,
        links: {
            self: getUserHomeUrl(user.username, options.requestOptions),
            siteRelative: `/people/${user.username}`,
            thumbnail: user.thumbnail
                ? getUserThumbnailUrl(options.requestOptions.portal, user, (_a = options.requestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token)
                : null,
        },
    };
}

function processAttendeeOptions(options) {
    const processedOptions = {};
    if (options.num > 0) {
        processedOptions.num = options.num.toString();
    }
    if (options.start > 1) {
        processedOptions.start = options.start.toString();
    }
    if (options.sortField === "modified") {
        processedOptions.sortBy = RegistrationSort.updatedAt;
    }
    else if (options.sortField === "created") {
        processedOptions.sortBy = RegistrationSort.createdAt;
    }
    else if (options.sortField === "username") {
        processedOptions.sortBy = RegistrationSort.username;
    }
    else if (options.sortField === "firstName") {
        processedOptions.sortBy = RegistrationSort.firstName;
    }
    else if (options.sortField === "lastName") {
        processedOptions.sortBy = RegistrationSort.lastName;
    }
    processedOptions.sortOrder =
        options.sortOrder === "desc" ? EventSortOrder.desc : EventSortOrder.asc;
    return processedOptions;
}

function processAttendeeFilters(query) {
    const processedFilters = {
        eventId: query.properties.eventId,
    };
    const useElseJoin = (value, defaults) => (value === null || value === void 0 ? void 0 : value.length) ? value : defaults.map((val) => val.toLowerCase()).join(",");
    const userId = getOptionalPredicateStringsByKey(query.filters, "userId");
    if (userId === null || userId === void 0 ? void 0 : userId.length) {
        processedFilters.userId = userId;
    }
    const term = getPredicateValuesByKey(query.filters, "term");
    if (term.length) {
        // TODO: remove ts-ignore once GetEventsParams supports filtering by username, firstName, lastName https://devtopia.esri.com/dc/hub/issues/10153
        // @ts-ignore
        processedFilters.name = term[0];
    }
    processedFilters.type = useElseJoin(getOptionalPredicateStringsByKey(query.filters, "attendanceType"), [EventAttendanceType.VIRTUAL, EventAttendanceType.IN_PERSON]);
    processedFilters.role = useElseJoin(getOptionalPredicateStringsByKey(query.filters, "role"), [
        RegistrationRole.OWNER,
        RegistrationRole.ORGANIZER,
        RegistrationRole.ATTENDEE,
    ]);
    processedFilters.status = useElseJoin(getOptionalPredicateStringsByKey(query.filters, "status"), [
        RegistrationStatus.PENDING,
        RegistrationStatus.ACCEPTED,
        RegistrationStatus.DECLINED,
        RegistrationStatus.BLOCKED,
    ]);
    const updatedDateRange = getPredicateValuesByKey(query.filters, "updatedDateRange");
    if (updatedDateRange.length) {
        processedFilters.updatedAtBefore = new Date(updatedDateRange[0].to).toISOString();
        processedFilters.updatedAtAfter = new Date(updatedDateRange[0].from).toISOString();
    }
    return processedFilters;
}

/**
 * @private
 * Execute event attendees search against the Events API
 * @param query
 * @param options
 * @returns
 */
async function hubSearchEventAttendees(query, options) {
    const processedFilters = processAttendeeFilters(query);
    const processedOptions = processAttendeeOptions(options);
    const data = Object.assign(Object.assign({}, processedFilters), processedOptions);
    const { items, nextStart, total } = await getRegistrations(Object.assign(Object.assign({}, options.requestOptions), { data }));
    const results = await Promise.all(items.map((eventAttendee) => eventAttendeeToSearchResult(eventAttendee, options)));
    const hasNext = nextStart > -1;
    return {
        total,
        results,
        hasNext,
        next: () => {
            if (!hasNext) {
                throw new Error("No more hub events for the given query and options");
            }
            return hubSearchEventAttendees(query, Object.assign(Object.assign({}, options), { start: nextStart }));
        },
    };
}

/**
 * Main entrypoint for searching via Hub
 *
 * Default's to search ArcGIS Portal but can delegate
 * to Hub API when it's available.
 * @param query
 * @param options
 * @returns
 */
async function hubSearch(query, options) {
    // Validate inputs
    if (!query) {
        throw new HubError("hubSearch", "Query is required.");
    }
    if (!Array.isArray(query.filters)) {
        throw new HubError("hubSearch", "Query must have a filters array.");
    }
    if (!query.filters.length && !query.collection) {
        throw new HubError("hubSearch", "Query must contain at least one Filter or a collection.");
    }
    if (!options.requestOptions) {
        throw new HubError("hubSearch", "requestOptions: IHubRequestOptions is required.");
    }
    // Ensure includes is an array
    if (!options.include) {
        options.include = [];
    }
    // Get the type of the first filterGroup
    const filterType = query.targetEntity;
    // NOTE: We want to clone the `options` object to do some expansion operations,
    // But if we clone `options.requestOptions`, the underlying `UserSession` will
    // lose some fundamental functions like `getToken`. As a workaround, we just
    // clone everything else on the `options` object.
    const { requestOptions } = options, remainder = __rest(options, ["requestOptions"]);
    const formattedOptions = cloneObject(remainder);
    formattedOptions.requestOptions = requestOptions;
    formattedOptions.api = getApi(filterType, formattedOptions);
    const fnHash = {
        arcgis: {
            item: portalSearchItems,
            group: portalSearchGroups,
            user: searchPortalUsersLegacy,
            portalUser: searchPortalUsers,
            communityUser: searchCommunityUsers,
            groupMember: portalSearchGroupMembers,
        },
        "arcgis-hub": {
            item: hubSearchItems,
            channel: hubSearchChannels,
            discussionPost: hubSearchItems,
            event: hubSearchEvents,
            eventAttendee: hubSearchEventAttendees,
        },
    };
    const fn = getProp(fnHash, `${formattedOptions.api.type}.${filterType}`);
    if (!fn) {
        throw new HubError(`hubSearch`, `Search via "${filterType}" filter against "${formattedOptions.api.type}" api is not implemented. Please ensure "targetEntity" is defined on the query.`);
    }
    return fn(cloneObject(query), formattedOptions);
}

export { DEFAULT_GROUP as D, fetchHubGroup as a, convertGroupToHubGroup as b, createHubGroup as c, deleteHubGroup as d, enrichGroupSearchResult as e, fetchHubUser as f, getUserHomeUrl as g, hubSearch as h, getGroupHomeUrl as i, convertUserToHubUser as j, enrichUserSearchResult as k, pickProps as p, updateHubGroup as u };
