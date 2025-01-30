'use strict';

const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getTypeWithKeywordQuery = require('./getTypeWithKeywordQuery-b54b0107.js');
const get = require('./get-0368c931.js');

/**
 * return the item type(s) associated with a provided
 * Hub entity type. This is effectively the reverse of
 * getTypeFromEntity
 *
 * @param entityType - the hub entity type
 * @returns {string[]}
 */
const getTypesFromEntityType = (entityType) => {
    let type = [];
    switch (entityType) {
        case "site":
            type = ["Hub Site Application", "Site Application"];
            break;
        case "page":
            type = ["Hub Page", "Site Page"];
            break;
        case "project":
            type = ["Hub Project"];
            break;
        case "initiative":
            type = ["Hub Initiative"];
            break;
        case "discussion":
            type = ["Discussion"];
            break;
        case "template":
            type = ["Solution"];
            break;
        case "group":
            type = ["Group"];
            break;
        case "initiativeTemplate":
            type = ["Hub Initiative Template"];
            break;
    }
    return type;
};

const ProjectAssociationHierarchies = {
    children: [],
    parents: ["initiative"],
};

const InitiativeAssociationHierarchies = {
    children: ["project"],
    parents: [],
};

/**
 * associations are hierarchical in nature, e.g.
 * there is always a parent and a child involved
 * in the relationship.
 *
 * given an entity type, this util returns the
 * parent and children entity types that it can
 * associate with
 *
 * @param type - entity type
 * @returns {IHubAssociationHierarchy}
 */
const getAssociationHierarchy = (type) => {
    let hierarchy = {
        children: [],
        parents: [],
    };
    switch (type) {
        case "initiative":
            hierarchy = InitiativeAssociationHierarchies;
            break;
        case "project":
            hierarchy = ProjectAssociationHierarchies;
            break;
        // as we support more entity associations, we'll need to extend this
        default:
            throw new Error(`getAssociationHierarchy: Invalid type for associations: ${type}.`);
    }
    return hierarchy;
};

/**
 * given two entity types, this util returns
 * whether or not associations are supported
 * between the two
 *
 * @param type1 - first entity type
 * @param type2 - second entity type
 * @returns {boolean}
 */
const isAssociationSupported = (type1, type2) => {
    try {
        const hierarchy1 = getAssociationHierarchy(type1);
        const hierarchy2 = getAssociationHierarchy(type2);
        if (hierarchy1.children.includes(type2)) {
            return hierarchy2.parents.includes(type1);
        }
        else if (hierarchy1.parents.includes(type2)) {
            return hierarchy2.children.includes(type1);
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};

/**
 * @private
 * Construct an IQuery to fetch a specified set of item id(s)
 * by type(s). Note: if an array of types is provided, they
 * must be the same underlying target entity type.
 *
 * @param itemType - a single item type or an array of item types
 * @param ids - an array of ids
 * @returns {IQuery}
 */
function getTypeByIdsQuery(itemType, ids) {
    const targetEntity = typeof itemType === "string"
        ? getTypeWithKeywordQuery.getEntityTypeFromType(itemType)
        : getTypeWithKeywordQuery.getEntityTypeFromType(itemType[0]);
    const qry = {
        targetEntity,
        filters: [
            Object.assign(Object.assign({}, (ids.length && { operation: "AND" })), { predicates: [
                    Object.assign({ type: itemType }, (ids.length && { id: ids })),
                ] }),
        ],
    };
    return qry;
}

/**
 * given a hub entity, this util maps over its typeKeywords,
 * and for each, determines if it is an association typeKeyword
 * by checking whether it has the form ref|<associationType>|<id>.
 * If so, it extracts and returns the id which correspond to the
 * parent entity that this entity is associated with.
 *
 * @param entity - hub entity to extract ids from
 * @param associationType - entity type to extract ids for
 * @returns {string[]}
 */
const getIdsFromKeywords = (entity, associationType) => {
    return getProp.getProp(entity, "typeKeywords").reduce((ids, keyword) => {
        const refKey = associationType ? `ref|${associationType}|` : "ref|";
        if (keyword.startsWith(refKey)) {
            const id = keyword.split("|")[2];
            ids.push(id);
        }
        return ids;
    }, []);
};

/**
 * given an array of groups, this util maps over them,
 * and for each, determines if it's an association group
 * by checking if it has a typeKeyword of the form
 * <associationType>|<id>. If so, it extracts and returns
 * the id which corresponds to the parent entity that this
 * association group belongs to
 *
 * @param groups - array of groups
 * @param associationType - entity type to extract ids for
 * @returns {string[]}
 */
const getIdsFromAssociationGroups = (groups, associationType) => {
    return groups.reduce((ids, group) => {
        // 1. determine if the group is an association group
        const associationTypeKeyword = group.typeKeywords.find((keyword) => keyword.startsWith(`${associationType}|`));
        // 2. if so, store the parent id from the typeKeyword to return
        if (associationTypeKeyword) {
            const id = associationTypeKeyword.split("|")[1];
            ids.push(id);
        }
        return ids;
    }, []);
};

/**
 * builds a query that will return entities that are
 * "included" AND "referenced"
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param isParent - whether the provided Hub entity is the parent in the association relationship
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getIncludesAndReferencesQuery = async (entity, associationType, isParent, context) => {
    if (isParent) {
        /**
         * 0. exit early if the parent's association group
         * hasn't been created yet - there can be no associations
         */
        if (!getProp.getProp(entity, "associations")) {
            return null;
        }
        /**
         * 1. build query that returns child entities WITH a
         * typeKeyword reference to the parent
         */
        const parentType = getTypeFromEntity.getTypeFromEntity(entity);
        const referencedQuery = getTypeWithKeywordQuery.getTypeWithKeywordQuery(getTypesFromEntityType(associationType), `ref|${parentType}|${entity.id}`);
        /** 2. grab the parent's association query */
        const includedQuery = getProp.getProp(entity, "associations.rules.query");
        /** 3. combine queries - will remove null/undefined entries */
        return getTypeWithKeywordQuery.combineQueries([referencedQuery, includedQuery]);
    }
    else {
        /** 1. fetch the groups a child has been shared with */
        const { admin, member, other } = await get.getItemGroups(entity.id, context.requestOptions);
        const groupsChildIsSharedWith = [...admin, ...member, ...other];
        /**
         * 2. filter the child's groups down to association groups
         * (by checking if they have a typeKeyword of the form
         * <associationType>|<id>) and extract parent ids
         */
        const parentIdsThatIncludeChild = getIdsFromAssociationGroups(groupsChildIsSharedWith, associationType);
        /**
         * 3. iterate over the child's typeKeywords and grab the parent
         * ids it references (typeKeyword = <associationType>|<id>)
         */
        const parentIdsChildReferences = getIdsFromKeywords(entity, associationType);
        /**
         * 4. filter the parent ids down to those that include
         * the child AND that the child references
         */
        const parentIds = parentIdsThatIncludeChild.filter((id) => parentIdsChildReferences.includes(id));
        /** 5. return a query for the filtered parent ids */
        const type = getTypesFromEntityType(associationType);
        return parentIds.length ? getTypeByIdsQuery(type, parentIds) : null;
    }
};

/**
 * Associated entities are those which have mutually
 * "agreed" to be connected with one another. They
 * require a two-way "connection" between parent/child:
 *
 * parent: "includes" the child in its association query
 * child: "references" the parent via a typeKeyword of
 * the form ref|<parentType>|<parentID>
 *
 * The following returns a query to view an entity's
 * associations with another entity type
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getAssociatedEntitiesQuery = async (entity, associationType, context) => {
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getAssociatedEntitiesQuery: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    const query = await getIncludesAndReferencesQuery(entity, associationType, isParent, context);
    return query;
};

exports.getAssociatedEntitiesQuery = getAssociatedEntitiesQuery;
exports.getAssociationHierarchy = getAssociationHierarchy;
exports.getIdsFromAssociationGroups = getIdsFromAssociationGroups;
exports.getIdsFromKeywords = getIdsFromKeywords;
exports.getTypeByIdsQuery = getTypeByIdsQuery;
exports.getTypesFromEntityType = getTypesFromEntityType;
exports.isAssociationSupported = isAssociationSupported;
