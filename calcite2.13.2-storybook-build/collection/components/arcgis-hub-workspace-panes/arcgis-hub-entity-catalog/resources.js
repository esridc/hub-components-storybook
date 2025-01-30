import { cloneObject, getKilobyteSizeOfQuery, serializeQueryForPortal, expandPortalQuery, addDefaultItemSearchPredicates } from "@esri/hub-common";
/** The query size at which we display a warning in the UI, but allow the user to continue editing */
export const QUERY_SIZE_WARNING_LIMIT = 8;
/** The absolute largest we allow a query size to be  */
export const QUERY_SIZE_MAXIMUM_LIMIT = 9;
// TODO: update as we add more target entities that we support in the catalog builder
const PORTAL_API_ENTITY_TYPES = ["item"];
const HUB_API_ENTITY_TYPES = ["event"];
export const TARGET_ENTITY_TYPES = [...PORTAL_API_ENTITY_TYPES, ...HUB_API_ENTITY_TYPES];
/**
 * Enum for the different panels in the catalog building experience
 *
 * Details - where the definition of the catalog is set
 * Appearance - where the displayConfigs of the catalog and collections are set
 */
export var CatalogPanels;
(function (CatalogPanels) {
  CatalogPanels["Details"] = "details";
  CatalogPanels["Appearance"] = "appearance";
})(CatalogPanels || (CatalogPanels = {}));
/**
 * Returns the size of a collection scope in kilobytes, making sure to combine the collection scope's filters
 * with the catalog scope's filters
 * @param collectionScope
 * @param catalogScope
 * @returns
 */
export const getCollectionScopeSize = (collectionScope, catalogScope) => {
  const scope = cloneObject(collectionScope);
  // combine filters if we have a catalog scope
  if (catalogScope && catalogScope.filters) {
    scope.filters = [...collectionScope.filters, ...catalogScope.filters];
  }
  return getScopeSize(scope);
};
/**
 * Returns the size of a scope in kilobytes
 * @param scope
 * @returns
 */
export const getScopeSize = (scope = {}) => {
  const targetEntity = scope.targetEntity;
  let size = 0;
  // portal-backed entities (items)
  if (PORTAL_API_ENTITY_TYPES.includes(targetEntity) && scope && scope.filters) {
    // add the defaults
    const queryWithDefaults = addDefaultItemSearchPredicates(scope);
    // expand the query
    const expandedQuery = expandPortalQuery(queryWithDefaults);
    // serialize the query into a string
    const serializedQuery = serializeQueryForPortal(expandedQuery).q;
    // save the size
    size = getKilobyteSizeOfQuery(serializedQuery);
  }
  // hub-backed entities (events)
  else if (HUB_API_ENTITY_TYPES.includes(targetEntity) && scope) {
    // for now, we just stringify the JSON -- the limits for our api are so so much larger
    size = getKilobyteSizeOfQuery(JSON.stringify(scope));
  }
  return size;
};
/**
 * Initializes the record of query sizes for each query
 * For catalog scopes, we store query sizes as targetEntity: size in kb
 * For collections, we store query sizes as collectionKey: size in kb
 *
 * Note: collection query sizes are stored taking the catalog query size into account as the scopes are joined before querying
 * @param catalog
 * @returns
 */
export const initializeQuerySizes = (catalog) => {
  const querySizes = {};
  // get the catalog's scopes
  const scopes = catalog === null || catalog === void 0 ? void 0 : catalog.scopes;
  // 1. for each target entity, if it has a scope, we set the key: query size in kilobytes
  if (scopes) {
    Object.values(scopes).forEach((scope) => {
      // get the scope's size in kilobytes and map it to the target entity
      querySizes[scope.targetEntity] = getScopeSize(scope);
    });
  }
  // 2. for each collection, if it has a scope, we set the key: query size in kilobytes
  const collections = (catalog === null || catalog === void 0 ? void 0 : catalog.collections) || [];
  if (collections.length) {
    // for each collection, calculate the size of the collection's scope
    collections.forEach((collection) => {
      // get the string's size in kilobytes and store by collection key
      const targetEntityScope = scopes ? scopes[collection.targetEntity] : {};
      querySizes[collection.key] = getCollectionScopeSize(collection.scope, targetEntityScope);
    });
  }
  ;
  return querySizes;
};
/**
 * Updates the query sizes record for a specific target entity
 * with the size of the target entity's scope and its collections' scopes
 * @param querySizes
 * @param collections
 * @param targetEntity
 * @param catalogScope
 * @returns
 */
export const updateTargetEntityQuerySizes = (querySizes, collections, targetEntity, catalogScope) => {
  const currentQuerySizes = cloneObject(querySizes);
  // 1. update the catalog query size
  currentQuerySizes[targetEntity] = getScopeSize(catalogScope);
  // 2. update the collection query sizes
  collections === null || collections === void 0 ? void 0 : collections.forEach((collection) => {
    if (collection.targetEntity === targetEntity) {
      currentQuerySizes[collection.key] = getCollectionScopeSize(collection.scope, catalogScope);
    }
  });
  return currentQuerySizes;
};
/**
 * Removes the query sizes for a list of keys
 * @param querySizes
 * @param keys
 * @returns
 */
export const removeQuerySizes = (querySizes, keys) => {
  const currentQuerySizes = cloneObject(querySizes);
  keys.forEach((key) => {
    delete currentQuerySizes[key];
  });
  return currentQuerySizes;
};
