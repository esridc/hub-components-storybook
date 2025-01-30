import { g as getProp } from './get-prop-ec5be510.js';
import { a as cloneObject } from './util-3e6872d9.js';

/**
 * Get the metrics from an entity applying some pre-processing
 * and adding source info.
 * @param entity
 * @returns
 */
function getEntityMetrics(entity) {
    // Create the source info that will attach into each metric
    const sourceInfo = {
        id: entity.id,
        name: entity.name,
        type: entity.type,
    };
    const entityMetrics = entity.metrics || [];
    const metrics = entityMetrics.map((metric) => {
        // assign the source info to the metric
        metric.entityInfo = Object.assign({}, sourceInfo);
        // at this point the source references should have been resolved
        // so we can cast the source to a MetricSource
        const source = metric.source;
        // If the metric is an item query and the catalog key is defined
        // get the scope from the specified collection in the catalog.
        if (source.type === "item-query" && source.collectionKey) {
            const key = source.collectionKey;
            const query = getProp(entity.catalog, `collections[findBy(key,'${key}')].scope`);
            if (query) {
                source.scope = cloneObject(query);
            }
        }
        // reassign the source with updates
        metric.source = source;
        return metric;
    });
    return metrics;
}

export { getEntityMetrics as g };
