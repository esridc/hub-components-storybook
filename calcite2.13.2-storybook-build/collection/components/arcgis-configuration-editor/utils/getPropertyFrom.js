import pointer from 'json-pointer';
/**
 * returns the dot-delimited property path of a schema
 * element based on its uiSchema scope
 *
 * @param scope uiSchema property scope
 * @returns {string}
 */
export const getPropertyPathFromScope = (scope) => {
  const result = scope && pointer.parse(scope)
    .filter((scopeEl, idx, ary) => {
    /**
     * 1. we want to rip out "properties"
     * 2. we want to rip out "items" unless it is preceded by
     * "properties" (which indicates it is really a property).
     * This is so we can use json-schemas with arrays of objects
     * like scope: "/properties/disclaimer/items/0/properties/text";
     */
    const notProperties = scopeEl !== 'properties';
    const notItems = scopeEl !== 'items' || ary[idx - 1] === 'properties';
    return notProperties && notItems;
  })
    .join('.');
  return result;
};
/**
 * Utility to get scope from uiSchemaElement id.
 * Id should be formatted as propertyPath::rest-of-id
 * @param id
 * @returns
 */
export const getPropertyPathFromId = (id) => {
  return id === null || id === void 0 ? void 0 : id.split("::")[0];
};
/**
 * Get whitelist property from uiSchemaElement id.
 * Id should be formatted as propertyPath::rest-of-id
 * @param id
 * @returns
 */
export const getWhiteListPropertyFromId = (id) => {
  const propertyPath = getPropertyPathFromId(id);
  return propertyPath === null || propertyPath === void 0 ? void 0 : propertyPath.split(".")[0];
};
