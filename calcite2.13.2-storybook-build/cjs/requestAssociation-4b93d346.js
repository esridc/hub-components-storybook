'use strict';

const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const unshareItemWithGroup = require('./unshare-item-with-group-05dbcf93.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const getTypeWithKeywordQuery = require('./getTypeWithKeywordQuery-b54b0107.js');
const getRequestingEntitiesQuery = require('./getRequestingEntitiesQuery-f51a983a.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const shareItemWithGroup = require('./share-item-with-group-6c27286f.js');

/**
 * when a child decides it wants to "disconnect" itself from
 * an existing association, the child removes the typeKeyword
 * (ref|<type>|<id>) that "references" the parent
 *
 * @param typeKeywords - the child entity's typeKeywords
 * @param type - the parent entity's type
 * @param id - the parent entity's id
 * @returns {string[]}
 */
function removeAssociationKeyword(typeKeywords, type, id) {
    const associationKeyword = `ref|${type}|${id}`;
    const filteredKeywords = typeKeywords.filter((keyword) => keyword !== associationKeyword);
    return filteredKeywords;
}

/**
 * When an entity decides it wants to "disconnect" itself
 * from an existing association, half of the association
 * "connection" is broken.
 *
 * from the parent's perspective: the parent removes
 * the child from its association group
 *
 * From the child's perspective: the child removes
 * the parent reference (ref|<parentType>|<parentID>)
 * from its typeKeywords
 *
 * @param entity - entity initiating the disconnection
 * @param type - type of the entity the initiating entity wants to disconnect from
 * @param id - id of the entity the initiating entity wants to disconnect from
 * @param context - contextual portal and auth information
 */
const breakAssociation = async (entity, associationType, id, context) => {
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`breakAssociation: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociatedEntitiesQuery.getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    if (isParent) {
        const associationGroupId = getProp.getProp(entity, "associations.groupId");
        const { owner } = await fetchHubEntity.fetchHubEntity(associationType, id, context);
        try {
            await unshareItemWithGroup.unshareItemWithGroup({
                id,
                groupId: associationGroupId,
                authentication: context.session,
                owner,
            });
        }
        catch (error) {
            throw new Error(`breakAssociation: there was an error unsharing ${id} from ${associationGroupId}: ${error}`);
        }
    }
    else {
        entity.typeKeywords = removeAssociationKeyword(entity.typeKeywords, associationType, id);
        await updateHubEntity.updateHubEntity(entityType, entity, context);
    }
};

/**
 * @private
 * Construct an IQuery to fetch the inverse of a specified set
 * of item id(s) by type(s). Note: if an array of types is provided,
 * they must be the same underlying target entity type.
 *
 * @param itemType - a single item type or an array of item types
 * @param ids - an array of ids
 * @returns {IQuery}
 */
function getTypeByNotIdsQuery(itemType, ids) {
    const targetEntity = typeof itemType === "string"
        ? getTypeWithKeywordQuery.getEntityTypeFromType(itemType)
        : getTypeWithKeywordQuery.getEntityTypeFromType(itemType[0]);
    const qry = {
        targetEntity,
        filters: [
            Object.assign(Object.assign({}, (ids.length && { operation: "AND" })), { predicates: [
                    Object.assign({ type: itemType }, (ids.length && { id: { not: ids } })),
                ] }),
        ],
    };
    return qry;
}

/**
 * An entity can send an "outgoing" request to associate
 * itself with another entity. The following query returns
 * a set of entities that the requesting entity can still
 * request:
 *
 * from a parent perspective: returns a set of children
 * that are NOT "included" in the parent's association group
 *
 * from a child perspective: returns a set of parents that
 * the child does not "reference" with via a typeKeyword of
 * the form ref|<parentType>|<parentID>
 *
 * @param entity - entity requesting association
 * @param associationType - type of entity the requesting entity wants to associate with
 * @param context - contextual auth and portal information
 * @returns {IQuery}
 */
const getAvailableToRequestEntitiesQuery = (entity, associationType) => {
    let query;
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getAvailableToRequestEntitiesQuery: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociatedEntitiesQuery.getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    if (isParent) {
        /** 1. build query that returns child entities */
        const childType = getAssociatedEntitiesQuery.getTypesFromEntityType(associationType);
        const childTypeQuery = getAssociatedEntitiesQuery.getTypeByIdsQuery(childType, []);
        /**
         * 2. grab the parent's association query and negate
         * the group predicate
         */
        const notIncludedQuery = HubInitiatives.negateGroupPredicates(getProp.getProp(entity, "associations.rules.query"));
        /** 3. combine queries - will remove null/undefined entries */
        query = getTypeWithKeywordQuery.combineQueries([notIncludedQuery, childTypeQuery]);
    }
    else {
        /**
         * 1. iterate over the child's typeKeywords and grab the parent
         * ids it references (typeKeyword = <associationType>|<id>)
         */
        const ids = getAssociatedEntitiesQuery.getIdsFromKeywords(entity, associationType);
        /**
         * 2. build query that returns parent entities NOT
         * "referenced" by the child
         */
        const type = getAssociatedEntitiesQuery.getTypesFromEntityType(associationType);
        query = getTypeByNotIdsQuery(type, ids);
    }
    return query;
};

/**
 * There are two primary UI workflows when we consider associations:
 * 1. Viewing associations
 * 2. Forming associations
 *
 * Because associations involve a 2-way agreement between parent
 * and child, when viewing associations, there are 3 gallery states
 * that can be viewed: "associated", "pending", and "requesting"
 * entities. Additionally, when forming associations, we need a
 * picker experience filtered to entities that can still be
 * requested for association.
 *
 * These define the "well-known" association catalogs that this
 * util can return. In turn, these can be passed into the catalog
 * and/or gallery-picker components to render the appropriate
 * UI experience.
 *
 * @param i18nScope - translation scope to be interpolated into the catalog
 * @param catalogName - name of the well-known catalog requested
 * @param entity - primary entity the catalog is being built for
 * @param associationType - type of entity the primary entity wants to view associations for
 * @param context - contextual auth and portal information
 * @returns {IHubCatalog}
 */
async function getWellKnownAssociationsCatalog(i18nScope, catalogName, entity, associationType, context) {
    let catalog;
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getWellKnownAssociationsCatalog: Association between ${entityType} and ${associationType} is not supported.`);
    }
    i18nScope = wellKnownCatalog.dotifyString(i18nScope);
    const targetEntity = getTypeWithKeywordQuery.getEntityTypeFromType(entity.type);
    /** 1. build a collection based on the provided associationType */
    const collections = [
        wellKnownCatalog.getWellknownCollection(i18nScope, targetEntity, associationType),
    ];
    /** 2. build a query based on the provided catalogName */
    let query;
    switch (catalogName) {
        case "associated":
            query = await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(entity, associationType, context);
            break;
        case "pending":
            query = await getRequestingEntitiesQuery.getPendingEntitiesQuery(entity, associationType, context);
            break;
        case "requesting":
            query = await getRequestingEntitiesQuery.getRequestingEntitiesQuery(entity, associationType, context);
            break;
        case "availableToRequest":
            query = getAvailableToRequestEntitiesQuery(entity, associationType);
            break;
    }
    /** 3. build the well-known catalog */
    // if query filters are undefined (e.g. query = null), we assume
    // an empty state, and we need to construct a default query
    // filter that will return no results
    const filters = (query === null || query === void 0 ? void 0 : query.filters) ? query.filters
        : [{ predicates: [{ type: ["Code Attachment"] }] }];
    catalog = wellKnownCatalog.buildCatalog(i18nScope, catalogName, filters, collections, targetEntity);
    return catalog;
}
/**
 * Specific util for building well-known (My content, Favorites,
 * Organization, and World) association catalogs to populate
 * a gallery picker experience for requesting association.
 *
 * In addition to the normal filters that define these well-known
 * catalogs, we also need to further filter the results to only
 * include entities that can still be requested for association.
 *
 * @param i18nScope - translation scope to be interpolated into the catalog
 * @param entity - primary entity the catalog is being built for
 * @param associationType - type of entity the primary entity wants to view associations for
 * @param context - contextual auth and portal information
 * @param catalogs - optional list of well-known catalogs to include
 * @returns {IHubCatalog[]}
 */
const getAvailableToRequestAssociationCatalogs = (i18nScope, entity, associationType, context, catalogs) => {
    var _a;
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getAvailableToRequestAssociationCatalogs: Association between ${entityType} and ${associationType} is not supported.`);
    }
    i18nScope = wellKnownCatalog.dotifyString(i18nScope);
    const filters = (_a = getAvailableToRequestEntitiesQuery(entity, associationType)) === null || _a === void 0 ? void 0 : _a.filters;
    // Default catalogs to include
    const catalogNames = catalogs || [
        "myContent",
        "favorites",
        "organization",
        "world",
    ];
    return catalogNames
        .map((name) => {
        const options = {
            user: context.currentUser,
            filters,
            collectionNames: [associationType],
            context,
        };
        return wellKnownCatalog.getWellKnownCatalog(i18nScope, name, "item", options);
    })
        .filter(Boolean);
};

/**
 * when a child sends an "outgoing" request or accepts an
 * "incoming" request for association, the child "references"
 * the parent via a typeKeyword (ref|<type>|<id>)
 *
 * @param typeKeywords - the child entity's typeKeywords
 * @param type - the parent entity's type
 * @param id - the parent entity's id
 * @returns {string[]}
 */
function setAssociationKeyword(typeKeywords, type, id) {
    const keyword = `ref|${type}|${id}`;
    if (!typeKeywords.includes(keyword)) {
        typeKeywords = [...typeKeywords, keyword];
    }
    return typeKeywords;
}

/**
 * When an entity sends an "outgoing" association request
 * or accepts an "incoming" association request, half of
 * the association "connection" is made.
 *
 * from the parent's perspective: the parent "includes"
 * the child in its association group
 *
 * From the child's perspective: the child "references"
 * the parent via a typeKeyword of the form ref|<parentType>|<parentId>
 *
 * Note: we export this function under 2 names - requestAssociation
 * and acceptAssociation. These actions are functionally equivalent,
 * but we want to make the intent more clear to the consumer.
 *
 * @param entity - entity requesting association
 * @param type - type of the entity the requesting entity wants to associate with
 * @param id - id of the entity the requesting entity wants to associate with
 * @param context - contextual portal and auth information
 */
const requestAssociation = async (entity, associationType, id, context) => {
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`requestAssociation: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociatedEntitiesQuery.getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    if (isParent) {
        const associationGroupId = getProp.getProp(entity, "associations.groupId");
        const { owner } = await fetchHubEntity.fetchHubEntity(associationType, id, context);
        try {
            await shareItemWithGroup.shareItemWithGroup({
                id,
                owner,
                groupId: associationGroupId,
                authentication: context.session,
            });
        }
        catch (error) {
            throw new Error(`requestAssociation: there was an error sharing ${id} to ${associationGroupId}: ${error}`);
        }
    }
    else {
        entity.typeKeywords = setAssociationKeyword(entity.typeKeywords, associationType, id);
        await updateHubEntity.updateHubEntity(entityType, entity, context);
    }
};

exports.breakAssociation = breakAssociation;
exports.getAvailableToRequestAssociationCatalogs = getAvailableToRequestAssociationCatalogs;
exports.getAvailableToRequestEntitiesQuery = getAvailableToRequestEntitiesQuery;
exports.getWellKnownAssociationsCatalog = getWellKnownAssociationsCatalog;
exports.requestAssociation = requestAssociation;
