import { u as unshareEntityWithGroups, s as shareEntityWithGroups } from './unshareEntityWithGroups-78dcc7e1.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';

/**
 * Unshare a set of entities from a set of groups, returning a flat list of the results
 * NOTE: This is not used in the application, thus not returing an object optimized
 * for display in the UI
 * @param groups
 * @param entities
 * @param context
 * @returns
 */
async function unshareEntitiesToGroups(groups, entities, context) {
  const nested = await Promise.all(groups.map(async (g) => {
    // for each entity...
    return await Promise.all(entities.map(async (e) => {
      const result = { id: e.id, groupId: g.id, status: "success" };
      try {
        await unshareEntityWithGroups(e, [g.id], context);
      }
      catch (_ex) {
        result.status = "fail";
      }
      return result;
    }));
  }));
  const results = nested.flat();
  return results;
}
/**
 * Share a set of entities to a set of groups, returning a structured response
 * that can be used to display the results in the UI
 * @param groups
 * @param entities
 * @param context
 * @returns
 */
async function shareEntitiesToGroups(groups, entities, context) {
  const nested = await Promise.all(groups.map(async (g) => {
    // for each entity...
    return await Promise.all(entities.map(async (e) => {
      const result = { id: e.id, groupId: g.id, status: "success" };
      try {
        await shareEntityWithGroups(e, [g.id], context);
      }
      catch (_ex) {
        result.status = "fail";
      }
      return result;
    }));
  }));
  const results = nested.flat();
  const entityType = getTypeFromEntity(entities[0]);
  const targetEntity = ['group', 'event'].includes(entityType) ? entityType : "item";
  // determine if any have failed
  const overallStatus = results.some(r => r.status === "fail") ? "fail" : "success";
  const reciepts = groups.map(group => {
    const success = results.filter(r => r.groupId === group.id && r.status === "success").map(r => r.id);
    const fail = results.filter(r => r.groupId === group.id && r.status === "fail").map(r => r.id);
    return {
      group,
      targetEntity,
      success,
      successQuery: createQuery(targetEntity, success),
      fail,
      failQuery: createQuery(targetEntity, fail)
    };
  });
  // construct response
  const response = {
    overallStatus,
    groups,
    entities,
    results,
    receipts: reciepts
  };
  // TODO: decide if we create the resultMap or not
  return response;
}
/**
 * Simple helper that creates a query for a given targetEntity and set of ids
 * @param targetEntity
 * @param ids
 * @returns
 */
function createQuery(targetEntity, ids) {
  return {
    targetEntity,
    filters: [
      {
        predicates: [{
            id: ids
          }]
      }
    ]
  };
}

export { shareEntitiesToGroups as s, unshareEntitiesToGroups as u };
