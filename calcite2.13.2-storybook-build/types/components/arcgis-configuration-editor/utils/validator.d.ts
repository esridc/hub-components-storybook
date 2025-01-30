import { IConfigurationSchema, IConfigurationValues } from "@esri/hub-common";
import Ajv, { AsyncValidateFunction, ErrorObject, ValidateFunction } from "ajv";
/**
 * Instantiate a JSON schema validator for a provided schema. The returned
 * validator can then be used to validate data against the schema.
 */
export declare function instantiateValidator(schema: IConfigurationSchema): ValidateFunction | AsyncValidateFunction;
export declare function _buildValidatorInstance(): Ajv;
/**
 * Builds base validator instance
 * @returns
 */
export declare function _instantiateAjvWithFormats(): Ajv;
/**
 * Synchronous version of the validate function.
 *
 * We use this on rules and required property evaluation, as long as they are not using async validators/formats.
 * @param validator
 * @param values
 * @returns
 */
export declare function validate(validator: ValidateFunction, values: IConfigurationValues): {
  valid: boolean;
  errors: ErrorObject[];
};
/**
 * Async version of the validate function
 *
 * A universal validate function that utilizes try/catch to determine if a schema passes.
 * Should only be used if the schema has async validators/formats and those errors are relevant. Otherwise, use the synchronous version.
 * @param validator
 * @param values
 * @returns
 */
export declare function validateAsync(validator: ValidateFunction | AsyncValidateFunction, values: IConfigurationValues): Promise<{
  valid: boolean;
  errors: ErrorObject[];
}>;
