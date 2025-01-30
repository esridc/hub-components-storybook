'use strict';

const util = require('./util-38e73510.js');
const Catalog = require('./Catalog-acebae88.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');

/**
 * Retrieves the user's groups categorized by their membership type.
 *
 * @param user - The user object containing group information.
 * @returns An object categorizing the user's groups into `owner`, `admin`, and `member`.
 *
 * The function processes the user's groups and classifies them based on the membership type:
 * - `owner`: Groups where the user is an owner.
 * - `admin`: Groups where the user is an admin.
 * - `member`: Groups where the user is a member and the group is not view-only.
 *
 * Note: The `none` membership type is not considered as it is not expected to be present in the user's groups.
 */
function getUserGroupsByMembership(user) {
    const response = {
        owner: [],
        member: [],
        admin: [],
    };
    // get the user's groups
    const userGroups = user.groups || [];
    // loop through the groups and determine if the user is an admin or normal member
    // and add into the response
    userGroups.forEach((group) => {
        var _a, _b, _c;
        if (((_a = group.userMembership) === null || _a === void 0 ? void 0 : _a.memberType) === "owner") {
            response.owner.push(group.id);
        }
        if (((_b = group.userMembership) === null || _b === void 0 ? void 0 : _b.memberType) === "admin") {
            response.admin.push(group.id);
        }
        // If user is just a member and the group is not view only
        if (((_c = group.userMembership) === null || _c === void 0 ? void 0 : _c.memberType) === "member" && !group.isViewOnly) {
            response.member.push(group.id);
        }
        // there is a `none` option in the userMembership but
        // that would never be returned in the user's groups
        // so we don't need to check for it
    });
    return response;
}

/**
 * Given a query and a user, return an object with the set of groups
 * that are in the Query, and which the user is a member of, split by
 * membership type.
 * NOTE: This excludes viewOnly groups the user is just a member of.
 * @param query
 * @param user
 * @returns
 */
function getUserGroupsFromQuery(query, user) {
    let response = {
        owner: [],
        member: [],
        admin: [],
    };
    // collect up all the group predicates from the query's filters
    // NOTE: this only pulls the all and any predicates
    const groups = getPredicateValues("group", query);
    // get the user's groups by membership
    const allUserGroups = getUserGroupsByMembership(user);
    // if there are groups in the query, we subset the user's groups
    // based on the groups in the query
    if (groups.length) {
        const props = [
            "owner",
            "admin",
            "member",
        ];
        groups.forEach((groupId) => {
            // check each group type and add the group to the response if the user is a member
            props.forEach((prop) => {
                if (allUserGroups[prop].includes(groupId)) {
                    response[prop].push(groupId);
                }
            });
        });
    }
    else {
        response = allUserGroups;
    }
    return response;
}

/**
 * Return an IGroupsByMembership object that contains all the groups, from all the
 * collections/scopes in the catalog, which the current user is an owner/member/admin of.
 * @param catalog
 * @param context
 * @returns
 */
function getCatalogGroups(catalog, context) {
    // create the response object
    const response = {
        owner: [],
        member: [],
        admin: [],
    };
    // create the catalog
    const instance = Catalog.Catalog.fromJson(catalog, context);
    const collectionUserGroups = instance.collectionNames.map((name) => {
        // important that we use .getCollection as that merges in the scope from the catalog
        const collection = instance.getCollection(name);
        return getUserGroupsFromQuery(collection.scope, context.currentUser);
    });
    // get the scopes that do not have related collections
    const nakedScopeTargetEntities = Object.keys(catalog.scopes).reduce((acc, key) => {
        // check if there are colletions with this targetEntity
        const hasCollection = (catalog.collections || []).some((collection) => collection.targetEntity === key);
        // if not, add it to the list
        if (!hasCollection) {
            acc.push(key);
        }
        return acc;
    }, []);
    const scopeUserGroups = nakedScopeTargetEntities.map((targetEntity) => {
        const scopeQuery = instance.getScope(targetEntity);
        return getUserGroupsFromQuery(scopeQuery, context.currentUser);
    });
    // Merge the naked scopes into the response
    [...scopeUserGroups, ...collectionUserGroups].forEach((groups) => {
        response.owner = [...response.owner, ...groups.owner];
        response.member = [...response.member, ...groups.member];
        response.admin = [...response.admin, ...groups.admin];
    });
    // ensure only unique entries in each array
    response.owner = response.owner.filter(util.unique);
    response.member = response.member.filter(util.unique);
    response.admin = response.admin.filter(util.unique);
    return response;
}

/**
 * Get all the values for a predicate in a query
 * @param predicateProp The predicate property to get the values for
 * @param query The query to get the values from
 * @returns An array of all the values for the predicate
 */
function getPredicateValues(predicateProp, query, props = ["any", "all"]) {
    // ensure the query is expanded (meaning that the predicates are IMatchOptions)
    const expanded = HubInitiatives.expandPredicates(query);
    return (
    // iterate over the filters
    expanded.filters
        // get all the predicates from all the filters and flatten...
        .reduce((acc, filter) => [...acc, ...filter.predicates], [])
        // get the `.any` and `.all` values for the prop
        .reduce((acc, predicate) => {
        // iterate the props and add them to the accumulator
        props.forEach((prop) => {
            acc = [
                ...acc,
                ...getWithDefault.getWithDefault(predicate, `${predicateProp}.${prop}`, []),
            ];
        });
        return acc;
    }, [])
        // drop dupes
        .filter(util.unique));
}

exports.getCatalogGroups = getCatalogGroups;
exports.getPredicateValues = getPredicateValues;
exports.getUserGroupsByMembership = getUserGroupsByMembership;
exports.getUserGroupsFromQuery = getUserGroupsFromQuery;
