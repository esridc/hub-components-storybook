import { IConfigurationValues } from "@esri/hub-common";
/**
 * Utility function to clear a value from the current configuration values object.
 * Acts differently depending on if the property is top-level or nested.
 * If setProp allows for setting a value to undefined, this function would not be needed and
 * could be replaced by setProp.
 * @param property
 * @param values
 */
export declare function clearValue(property: string, values: IConfigurationValues): void;
/**
 * Util to clear values from fields that have just been hidden according to the uiSchema whitelist.
 * Only clears values that have the clearOnHidden option enabled on the uiSchemaElement.
 * @param whiteList
 * @param previousWhiteList
 * @param clearOnHidden
 * @param values
 */
export declare function clearValuesFromHiddenFields(whiteList: string[], previousWhiteList: string[], clearOnHidden: string[], values: IConfigurationValues): void;
