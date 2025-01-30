import { getGroupPredicate, getProp } from "@esri/hub-common";
/**
 * DEPRECATED
 * Given an entity and a capability, return the array of groups used in the capabilitie's catalog
 * If the capability is not defined, an empty array is returned.
 * If the capability is defined,  but not enabled, an empty array is returned.
 * @param entity
 * @param capability
 */
export function getEntityCapabilityGroups(entity, capability) {
  // default is an empty array
  let groups = [];
  let config = null;
  // get the entity property
  const entityProp = getCapabilityProperty(capability);
  config = entity[entityProp];
  // TEMPORARY: until we transition to .content.catalog, we need to fall back to .catalog
  if (!config && capability === 'content' && getProp(entity, 'catalog')) {
    // construct a config object using the .catalog
    config = { enabled: true, catalog: getProp(entity, 'catalog') };
  }
  // See if we have a catalog...
  if (config && config.enabled) {
    const catalog = config.catalog;
    // get the entity type for the capability - this is used to get the correct scopt
    const entityType = getEntityTypeForCapability(capability);
    // get the scope
    const scope = catalog.scopes[entityType];
    // now get the groups from the Query
    const predicate = getGroupPredicate(scope) || { group: [] };
    // get the groups
    groups = predicate.group.any || predicate.group;
  }
  return groups;
}
/**
 * DEPRECATED
 * @internal
 * Return the property name for the capability.
 * @param capability
 * @returns
 */
function getCapabilityProperty(capability) {
  let prop = capability;
  // TEMP: until we swap the existing .pages into something else, we will use .pagescapability
  if (capability === 'pages') {
    prop = 'pagescapability';
  }
  return prop;
}
/**
 * DEPRECATED
 * Given a capability, return the entity type used for the queries in the Catalog
 * @param capability
 * @returns
 */
export function getEntityTypeForCapability(capability) {
  let type = "item";
  switch (capability) {
    case 'events':
      type = "event";
      break;
  }
  return type;
}
// DEPRECATED
export function getHubEntityTypeForCapability(capability) {
  switch (capability) {
    case 'content':
      return 'content';
    case 'discussions':
      return 'discussion';
    case 'events':
      return 'event';
    case 'initiatives':
      return 'initiative';
    case 'pages':
      return 'page';
    case 'projects':
      return 'project';
  }
}
