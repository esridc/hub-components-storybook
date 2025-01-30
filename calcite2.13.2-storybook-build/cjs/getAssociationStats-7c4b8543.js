'use strict';

const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const getRequestingEntitiesQuery = require('./getRequestingEntitiesQuery-f51a983a.js');

/**
 * get Entity A's association stats with Entity B:
 *
 * 1. associated: the number of Entity B's that Entity A
 * is associated with
 *
 * 2. pending: the number of outgoing requests Entity A
 * has sent to Entity B
 *
 * 3. requesting: the number of incoming requests Entity A
 * has received from Entity B
 *
 * 4a. included: if Entity A is the parent, the number of
 * Entity B's it has included in its association group
 *
 * 4b. referenced: if Entity A is the child, the number of
 * Entity B's it has referenced (via typeKeyword)
 *
 * @param entity - Hub entity
 * @param associationType - entity type to query for
 * @param context - contextual auth and portal information
 * @returns
 */
const getAssociationStats = async (entity, associationType, context) => {
    let stats;
    const entityType = getTypeFromEntity.getTypeFromEntity(entity);
    const isSupported = getAssociatedEntitiesQuery.isAssociationSupported(entityType, associationType);
    if (!isSupported) {
        throw new Error(`getAssociationStats: Association between ${entityType} and ${associationType} is not supported.`);
    }
    const associationHierarchy = getAssociatedEntitiesQuery.getAssociationHierarchy(entityType);
    const isParent = associationHierarchy.children.includes(associationType);
    stats = Object.assign({ associated: 0, pending: 0, requesting: 0 }, (isParent ? { included: 0 } : { referenced: 0 }));
    try {
        const queries = await Promise.all([
            getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(entity, associationType, context),
            getRequestingEntitiesQuery.getPendingEntitiesQuery(entity, associationType, context),
            getRequestingEntitiesQuery.getRequestingEntitiesQuery(entity, associationType, context),
        ]);
        const [{ total: associated }, { total: pending }, { total: requesting }] = await Promise.all(queries.map(async (query) => {
            try {
                return await hubSearch.hubSearch(query, {
                    requestOptions: context.hubRequestOptions,
                });
            }
            catch (error) {
                return { total: 0 };
            }
        }));
        stats = Object.assign({ associated,
            pending,
            requesting }, (isParent
            ? { included: associated + pending }
            : { referenced: associated + pending }));
    }
    catch (error) {
        return stats;
    }
    return stats;
};

exports.getAssociationStats = getAssociationStats;
