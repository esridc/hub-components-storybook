import Ajv from "ajv";
import { AJV_FORMATS } from "./formats";
import { AJV_KEYWORDS } from "./keywords";
import addFormats from "ajv-formats";
/**
 * Instantiate a JSON schema validator for a provided schema. The returned
 * validator can then be used to validate data against the schema.
 */
export function instantiateValidator(schema) {
  const ajv = _buildValidatorInstance();
  return ajv.compile(schema);
}
export function _buildValidatorInstance() {
  const withFormats = (ajv, [formatName, formatDefinition]) => ajv.addFormat(formatName, formatDefinition);
  // instantiate ajv with formats
  const ajv = Object.entries(AJV_FORMATS)
    .reduce(withFormats, _instantiateAjvWithFormats());
  // add custom keywords
  AJV_KEYWORDS.forEach(keyword => ajv.addKeyword(keyword));
  return ajv;
}
/**
 * Builds base validator instance
 * @returns
 */
export function _instantiateAjvWithFormats() {
  const instance = new Ajv({ allErrors: true, $data: true });
  addFormats(instance);
  return instance;
}
/**
 * Synchronous version of the validate function.
 *
 * We use this on rules and required property evaluation, as long as they are not using async validators/formats.
 * @param validator
 * @param values
 * @returns
 */
export function validate(validator, values) {
  let valid = false;
  let errors = [];
  try {
    valid = !!validator(values);
    errors = validator.errors || [];
  }
  catch (e) {
    errors = e.errors;
  }
  return { valid, errors };
}
/**
 * Async version of the validate function
 *
 * A universal validate function that utilizes try/catch to determine if a schema passes.
 * Should only be used if the schema has async validators/formats and those errors are relevant. Otherwise, use the synchronous version.
 * @param validator
 * @param values
 * @returns
 */
export async function validateAsync(validator, values) {
  let valid = false;
  let errors = [];
  try {
    valid = !!await validator(values);
    errors = validator.errors || [];
  }
  catch (e) {
    errors = e.errors;
  }
  return { valid, errors };
}
