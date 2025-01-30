import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import { i as isAssociationSupported, a as getAssociationHierarchy, b as getTypesFromEntityType, c as getTypeByIdsQuery, g as getIdsFromKeywords, d as getAssociatedEntitiesQuery } from './getAssociatedEntitiesQuery-a2536649.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { u as unshareItemWithGroup } from './unshare-item-with-group-b4a3a08f.js';
import { a as getWellKnownCatalog, d as dotifyString, g as getWellknownCollection, b as buildCatalog } from './wellKnownCatalog-7e9f7f53.js';
import { a as getEntityTypeFromType, c as combineQueries } from './getTypeWithKeywordQuery-9f583e1b.js';
import { g as getRequestingEntitiesQuery, a as getPendingEntitiesQuery } from './getRequestingEntitiesQuery-e8399fe2.js';
import { O as negateGroupPredicates } from './HubInitiatives-4f4e24ce.js';
import { s as shareItemWithGroup } from './share-item-with-group-5711513b.js';

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
    const entityType = getTypeFromEntity(entity);
    const isSupported = isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`breakAssociation: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    if (isParent) {
        const associationGroupId = getProp(entity, "associations.groupId");
        const { owner } = await fetchHubEntity(associationType, id, context);
        try {
            await unshareItemWithGroup({
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
        await updateHubEntity(entityType, entity, context);
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
        ? getEntityTypeFromType(itemType)
        : getEntityTypeFromType(itemType[0]);
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
    const entityType = getTypeFromEntity(entity);
    const isSupported = isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getAvailableToRequestEntitiesQuery: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    if (isParent) {
        /** 1. build query that returns child entities */
        const childType = getTypesFromEntityType(associationType);
        const childTypeQuery = getTypeByIdsQuery(childType, []);
        /**
         * 2. grab the parent's association query and negate
         * the group predicate
         */
        const notIncludedQuery = negateGroupPredicates(getProp(entity, "associations.rules.query"));
        /** 3. combine queries - will remove null/undefined entries */
        query = combineQueries([notIncludedQuery, childTypeQuery]);
    }
    else {
        /**
         * 1. iterate over the child's typeKeywords and grab the parent
         * ids it references (typeKeyword = <associationType>|<id>)
         */
        const ids = getIdsFromKeywords(entity, associationType);
        /**
         * 2. build query that returns parent entities NOT
         * "referenced" by the child
         */
        const type = getTypesFromEntityType(associationType);
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
    const entityType = getTypeFromEntity(entity);
    const isSupported = isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getWellKnownAssociationsCatalog: Association between ${entityType} and ${associationType} is not supported.`);
    }
    i18nScope = dotifyString(i18nScope);
    const targetEntity = getEntityTypeFromType(entity.type);
    /** 1. build a collection based on the provided associationType */
    const collections = [
        getWellknownCollection(i18nScope, targetEntity, associationType),
    ];
    /** 2. build a query based on the provided catalogName */
    let query;
    switch (catalogName) {
        case "associated":
            query = await getAssociatedEntitiesQuery(entity, associationType, context);
            break;
        case "pending":
            query = await getPendingEntitiesQuery(entity, associationType, context);
            break;
        case "requesting":
            query = await getRequestingEntitiesQuery(entity, associationType, context);
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
    catalog = buildCatalog(i18nScope, catalogName, filters, collections, targetEntity);
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
    const entityType = getTypeFromEntity(entity);
    const isSupported = isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getAvailableToRequestAssociationCatalogs: Association between ${entityType} and ${associationType} is not supported.`);
    }
    i18nScope = dotifyString(i18nScope);
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
        return getWellKnownCatalog(i18nScope, name, "item", options);
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
    const entityType = getTypeFromEntity(entity);
    const isSupported = isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`requestAssociation: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    if (isParent) {
        const associationGroupId = getProp(entity, "associations.groupId");
        const { owner } = await fetchHubEntity(associationType, id, context);
        try {
            await shareItemWithGroup({
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
        await updateHubEntity(entityType, entity, context);
    }
};

export { getAvailableToRequestAssociationCatalogs as a, breakAssociation as b, getAvailableToRequestEntitiesQuery as c, getWellKnownAssociationsCatalog as g, requestAssociation as r };
