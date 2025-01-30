/**
 * returns the dot-delimited property path of a schema
 * element based on its uiSchema scope
 *
 * @param scope uiSchema property scope
 * @returns {string}
 */
export declare const getPropertyPathFromScope: (scope: string) => string;
/**
 * Utility to get scope from uiSchemaElement id.
 * Id should be formatted as propertyPath::rest-of-id
 * @param id
 * @returns
 */
export declare const getPropertyPathFromId: (id: string) => string;
/**
 * Get whitelist property from uiSchemaElement id.
 * Id should be formatted as propertyPath::rest-of-id
 * @param id
 * @returns
 */
export declare const getWhiteListPropertyFromId: (id: string) => string;
