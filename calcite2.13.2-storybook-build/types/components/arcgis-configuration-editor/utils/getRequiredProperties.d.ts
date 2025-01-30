import { IConfigurationSchema, IConfigurationValues } from "@esri/hub-common";
import { AsyncValidateFunction, ErrorObject, ValidateFunction } from "ajv";
/**
 * Filters out form values that are empty for required fields.
 * This allows the field to be validated correctly
 */
export declare function removeEmptyValues(values: IConfigurationValues): IConfigurationValues;
/**
 * Parses an errors array from AJV to get any required properties. Returns an array of properties that are required.
 * @param errors ErrorObject[]
 * @returns string[] of required properties
 */
export declare function getRequiredFromErrors(errors: ErrorObject[]): string[];
/**
 * Gets the properties that are always required for a given schema.
 * This is done by creating an empty values object that mirrors the schema structure, and then validating it.
 * @param schema - schema to validate against
 * @param validator - validator function
 * @param conditionallyRequiredProperties - map of properties that are conditionally required
 * @returns
 */
export declare function getAlwaysRequiredProperties(schema: IConfigurationSchema, validator: AsyncValidateFunction | ValidateFunction, conditionallyRequiredProperties: Map<string, Set<string>>): Promise<string[]>;
/**
 * Gets the currently required properties for a given schema and set of values.
 * This is done by cloning the values object, deleting the property, and then validating the object.
 * @param schema - schema to validate against
 * @param values - values to validate
 * @param validator - validator function
 * @param alwaysRequired - array of properties that are always required
 * @param conditionallyRequired - map of properties that are conditionally required
 * @param oldCurrentlyRequired - set of properties that are currently required
 * @param changedProperty - single property that has changed, if any
 * @returns
 */
export declare function getCurrentlyRequiredProperties(schema: IConfigurationSchema, values: IConfigurationValues, validator: AsyncValidateFunction | ValidateFunction, alwaysRequired: string[], conditionallyRequired: Map<string, Set<string>>, oldCurrentlyRequired: Set<string>, changedProperty?: string): Promise<Set<string>>;
/**
 * Parses the schema to see if there are any required properties in the "then" or the "else" of the allOf conditional.
 * @param schema
 */
export declare function getConditionallyRequiredProperties(schema: IConfigurationSchema): Map<string, Set<string>>;
/**
 * Recursively traverses the schema and creates an empty object of empty objects.
 * Will create an empty object if a property type is object AND the property has properties within it.
 * @param schema
 * @param values
 * @returns Empty object of empty objects that matches schema structure
 */
export declare function createEmptyValues(schema: IConfigurationSchema, values?: IConfigurationValues): IConfigurationValues;
