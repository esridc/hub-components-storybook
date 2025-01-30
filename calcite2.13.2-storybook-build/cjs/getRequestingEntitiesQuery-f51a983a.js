'use strict';

const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getTypeWithKeywordQuery = require('./getTypeWithKeywordQuery-b54b0107.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const get = require('./get-0368c931.js');

/**
 * builds a query that will return entities that are
 * "referenced" but NOT "included"
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param isParent - whether the provided Hub entity is the parent in the association relationship
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getReferencesDoesNotIncludeQuery = async (entity, associationType, isParent, context) => {
    if (isParent) {
        /**
         * 1. build query that returns child entities WITH a
         * typeKeyword reference to the parent
         */
        const parentType = getTypeFromEntity.getTypeFromEntity(entity);
        const referencedQuery = getTypeWithKeywordQuery.getTypeWithKeywordQuery(getAssociatedEntitiesQuery.getTypesFromEntityType(associationType), `ref|${parentType}|${entity.id}`);
        /**
         * 2. grab the parent's association query and negate
         * the group predicate
         */
        const notIncludedQuery = HubInitiatives.negateGroupPredicates(getProp.getProp(entity, "associations.rules.query"));
        /** 3. combine queries - will remove null/undefined entries */
        return getTypeWithKeywordQuery.combineQueries([referencedQuery, notIncludedQuery]);
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
        const parentIdsThatIncludeChild = getAssociatedEntitiesQuery.getIdsFromAssociationGroups(groupsChildIsSharedWith, associationType);
        /**
         * 3. iterate over the child's typeKeywords and grab the parent
         * ids it references (typeKeyword = <associationType>|<id>)
         */
        const parentIdsChildReferences = getAssociatedEntitiesQuery.getIdsFromKeywords(entity, associationType);
        /**
         * 4. filter the parent ids down to those that the child
         * references but that the parent does NOT include
         */
        const parentIds = parentIdsChildReferences.filter((id) => !parentIdsThatIncludeChild.includes(id));
        /** 5. return a query for the filtered parent ids */
        const type = getAssociatedEntitiesQuery.getTypesFromEntityType(associationType);
        return parentIds.length ? getAssociatedEntitiesQuery.getTypeByIdsQuery(type, parentIds) : null;
    }
};

/**
 * @private
 * Construct an IQuery to fetch a set of items by type(s)
 * withOUT a specified typeKeyword. Note: if an array of
 * types is provided, they must be the same underlying target
 * entity type.
 *
 * @param itemType - The type(s) of item to fetch
 * @param keyword - The typeKeyword to filter by
 * @returns
 */
function getTypeWithoutKeywordQuery(itemType, keyword) {
    const targetEntity = typeof itemType === "string"
        ? getTypeWithKeywordQuery.getEntityTypeFromType(itemType)
        : getTypeWithKeywordQuery.getEntityTypeFromType(itemType[0]);
    return {
        targetEntity,
        filters: [
            {
                operation: "AND",
                predicates: [
                    {
                        type: itemType,
                        typekeywords: { not: [keyword] },
                    },
                ],
            },
        ],
    };
}

/**
 * builds a query that will return entities that are
 * "included" but NOT "referenced"
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param isParent - whether the provided Hub entity is the parent in the association relationship
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getIncludesDoesNotReferenceQuery = async (entity, associationType, isParent, context) => {
    if (isParent) {
        /**
         * 1. build query that returns child entities WITHOUT a
         * typeKeyword reference to the parent
         */
        const parentType = getTypeFromEntity.getTypeFromEntity(entity);
        const referencedQuery = getTypeWithoutKeywordQuery(getAssociatedEntitiesQuery.getTypesFromEntityType(associationType), `ref|${parentType}|${entity.id}`);
        /** 2. grab the parent entity's association query */
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
        const parentIdsThatIncludeChild = getAssociatedEntitiesQuery.getIdsFromAssociationGroups(groupsChildIsSharedWith, associationType);
        /**
         * 3. iterate over the child's typeKeywords and grab the parent
         * ids it references (typeKeyword = <associationType>|<id>)
         */
        const parentIdsChildReferences = getAssociatedEntitiesQuery.getIdsFromKeywords(entity, associationType);
        /**
         * 4. filter the parent ids down to those that include the
         * child, but that the child does NOT reference
         */
        const parentIds = parentIdsThatIncludeChild.filter((id) => !parentIdsChildReferences.includes(id));
        /** 5. return a query for the filtered parent ids */
        const type = getAssociatedEntitiesQuery.getTypesFromEntityType(associationType);
        return parentIds.length ? getAssociatedEntitiesQuery.getTypeByIdsQuery(type, parentIds) : null;
    }
};

/**
 * Pending entities represent "outgoing" requests that are
 * awaiting "approval". They imply a one-way "connection"
 * between parent/child.
 *
 * From the parent's perspective:
 * parent: "includes" the child in its association query
 * child: does NOT "reference" the parent via a typeKeyword
 *
 * From the child's perspective:
 * parent: does NOT "include" the child in its association query
 * child: "references" the parent via a typeKeyword of the
 * form ref|<parentType>|<parentID>
 *
 * The following returns a query to view an entity's outgoing
 * requests for association with another entity type
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getPendingEntitiesQuery = async (entity, associationType, context) => {
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getPendingEntitiesQuery: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociatedEntitiesQuery.getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    const query = isParent
        ? await getIncludesDoesNotReferenceQuery(entity, associationType, isParent, context)
        : await getReferencesDoesNotIncludeQuery(entity, associationType, isParent, context);
    return query;
};

/**
 * Requesting entities represent "incoming" requests that are
 * awaiting "approval". They imply a one-way "connection"
 * between parent/child.
 *
 * From the parent's perspective:
 * parent: does NOT "include" the child in its association query
 * child: "references" the parent via a typeKeyword of the
 * form ref|<parentType>|<parentID>
 *
 * From the child's perspective:
 * parent: "includes" the child in its association query
 * child: does NOT "reference" the parent via a typeKeyword
 *
 * The following returns a query to view an entity's incoming
 * requests for association with another entity type
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getRequestingEntitiesQuery = async (entity, associationType, context) => {
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getRequestingEntitiesQuery: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociatedEntitiesQuery.getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    const query = isParent
        ? await getReferencesDoesNotIncludeQuery(entity, associationType, isParent, context)
        : await getIncludesDoesNotReferenceQuery(entity, associationType, isParent, context);
    return query;
};

exports.getPendingEntitiesQuery = getPendingEntitiesQuery;
exports.getRequestingEntitiesQuery = getRequestingEntitiesQuery;
