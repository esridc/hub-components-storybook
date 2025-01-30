import { cloneObject, deleteProp, deepFilter } from "@esri/hub-common";
import { isFieldEmpty } from "./isFieldEmpty";
import { mergeDeep } from "../../../utils/object";
import pointer from 'json-pointer';
import { validate, validateAsync } from "./validator";
/**
 * Filters out form values that are empty for required fields.
 * This allows the field to be validated correctly
 */
export function removeEmptyValues(values) {
  return deepFilter(values, (value) => !isFieldEmpty(value));
}
/**
 * Parses an errors array from AJV to get any required properties. Returns an array of properties that are required.
 * @param errors ErrorObject[]
 * @returns string[] of required properties
 */
export function getRequiredFromErrors(errors) {
  if (!errors) {
    return [];
  }
  ;
  return errors.reduce((acc, error) => {
    let propertyPath;
    // if a required error
    if (error.keyword === 'required' && error.params) {
      const params = error.params;
      propertyPath = params === null || params === void 0 ? void 0 : params.missingProperty;
      // if we have the path to the property, grab the path from the instancePath
      if (error.instancePath && error.instancePath.length) {
        propertyPath = `${error.instancePath.slice(1).split("/").join(".")}.${propertyPath}`;
      }
    }
    ;
    if (propertyPath) {
      acc.push(propertyPath);
    }
    return acc;
  }, []);
}
/**
 * Gets the properties that are always required for a given schema.
 * This is done by creating an empty values object that mirrors the schema structure, and then validating it.
 * @param schema - schema to validate against
 * @param validator - validator function
 * @param conditionallyRequiredProperties - map of properties that are conditionally required
 * @returns
 */
export async function getAlwaysRequiredProperties(schema, validator, conditionallyRequiredProperties) {
  const emptyValues = createEmptyValues(schema);
  const validateFunc = schema.$async ? validateAsync : validate;
  const { valid, errors } = await validateFunc(validator, emptyValues) || { valid: false, errors: [] };
  const emptyValuesResult = { valid, errors };
  const required = getRequiredFromErrors(emptyValuesResult.errors);
  // get the properties that are conditionally required
  const allConditionallyRequiredProperties = conditionallyRequiredProperties.get("allConditionallyRequiredProperties");
  // filter out any properties that are in our potential list, as those are conditional requireds and are caused from an else clause
  const alwaysRequired = required.filter((prop) => !allConditionallyRequiredProperties.has(prop));
  return alwaysRequired;
}
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
export async function getCurrentlyRequiredProperties(schema, values, validator, alwaysRequired, conditionallyRequired, oldCurrentlyRequired, changedProperty) {
  /**
   * Two cases when calling this function
   *
   * Case 1: Initializing the currentlyRequiredArray when starting, so we need to check every potentially required prop
   * in this case, we are using the conditionallyRequiredProps located with the key["allConditionallyRequiredProperties"]
   * Case 2: A property has changed, so we only need to check the potentially required props that could be affected by the change
   * in this case, we are using the conditionallyRequiredProps located with the key[changedProperty]
   */
  // determine if we are looking at all props or just at the props from the changed property
  const key = changedProperty ? changedProperty : "allConditionallyRequiredProperties";
  // if we are looking at a subset, then we are pushing/popping -- otherwise, we are just setting
  const currentlyRequiredProperties = changedProperty ? oldCurrentlyRequired : new Set();
  // if we're initializing, add always required -- otherwise, they're already there
  !changedProperty && alwaysRequired.forEach((prop) => currentlyRequiredProperties.add(prop));
  // Set of properties to look at
  const conditionallyRequiredProperties = conditionallyRequired.get(key) || new Set();
  // make a clone of the values object
  // we also merge with the empty schema so that we have the correct structure -- otherwise, we'll miss nested errors
  const emptyValues = createEmptyValues(schema);
  const valuesClone = cloneObject(values);
  const emptyWithValues = mergeDeep(emptyValues, valuesClone);
  // for each potentially required
  for (const prop of conditionallyRequiredProperties) {
    // clone our values object with schema structure
    const clone = cloneObject(emptyWithValues);
    // delete the prop from the clone
    deleteProp(clone, prop);
    // validate the clone
    const validateFunc = schema.$async ? validateAsync : validate;
    const result = await validateFunc(validator, clone);
    // check to see if we have an error for property
    const hasError = getRequiredFromErrors(result.errors).includes(prop);
    // if error, add it to currently required
    if (hasError) {
      currentlyRequiredProperties.add(prop);
    }
    else if (changedProperty) {
      // if no error, and we are looking at a subset, then we need to remove it from currently required
      currentlyRequiredProperties.delete(prop);
    }
  }
  ;
  return currentlyRequiredProperties;
}
/**
 * Parses the schema to see if there are any required properties in the "then" or the "else" of the allOf conditional.
 * @param schema
 */
export function getConditionallyRequiredProperties(schema) {
  /** helper function to push properties into the map correctly */
  const pushPropertiesToMap = (prop, required) => {
    if (!requiredProperties.has(prop)) {
      requiredProperties.set(prop, new Set());
    }
    // add each element in required array to set
    required.forEach((req) => requiredProperties.get(prop).add(req));
  };
  const allOf = schema.allOf;
  const requiredProperties = new Map();
  requiredProperties.set("allConditionallyRequiredProperties", new Set());
  // f we have things to look at in the allOf
  if (allOf) {
    allOf.forEach((item) => {
      let resolved = item;
      // if we have a ref, we need to resolve it
      if (item.$ref) {
        // take # off of the front so we have a valid pointer
        const ref = item.$ref.slice(1);
        resolved = pointer.get(schema, ref);
      }
      const ifProp = resolved.if;
      const then = resolved.then;
      const elseProp = resolved.else;
      let ifProperties;
      let thenProperties;
      let elseProperties;
      // parse if for properties mentioned in condition
      if (ifProp) {
        ifProperties = _parseClause(ifProp, true);
      }
      // parse then for required properties
      if (then) {
        thenProperties = _parseClause(then);
      }
      // parse else for required properties
      if (elseProp) {
        elseProperties = _parseClause(elseProp);
      }
      // if then required properties, add them
      if (then && thenProperties && ifProperties) {
        ifProperties.map((prop) => {
          pushPropertiesToMap(prop, thenProperties);
        });
        // add to allConditionallyRequiredProperties
        pushPropertiesToMap("allConditionallyRequiredProperties", thenProperties);
      }
      // if else required properties, add them
      if (elseProp && elseProperties && ifProperties) {
        ifProperties.map((prop) => {
          pushPropertiesToMap(prop, elseProperties);
        });
        // add to allConditionallyRequiredProperties
        pushPropertiesToMap("allConditionallyRequiredProperties", elseProperties);
      }
    });
  }
  // TODO: add the anyOf, and oneOf
  return requiredProperties;
}
/**
 * Recursively traverses the schema and creates an empty object of empty objects.
 * Will create an empty object if a property type is object AND the property has properties within it.
 * @param schema
 * @param values
 * @returns Empty object of empty objects that matches schema structure
 */
export function createEmptyValues(schema, values = {}) {
  const properties = schema.properties;
  if (properties) {
    // for all entries in our properties
    return Object.entries(properties).reduce((acc, [key, value]) => {
      // if the property is an object and has properties inside of it
      if (value["type"] == "object" && Object.keys(value).includes("properties")) {
        // recursively call function on the nested object
        const maybe = createEmptyValues(value, values);
        if (maybe) {
          acc[key] = maybe;
        }
      }
      return acc;
    }, {});
  }
  return values;
}
function _parseClause(clause, isIfClause = false) {
  const clauseProperties = [];
  _parseClauseProperties(clause, clauseProperties, "", isIfClause);
  // get rid of any duplicates
  return [...new Set(clauseProperties)];
}
/**
  * Recursively parse the if clause.
   * ifClause could look like
   *
   * {
   *  "properties": {
   *  "prop": { "const": "value"}
   *   }
   * }
   *
   * in this case, we want "prop".
   *
   * ifClause could also look like
   *
   * { "properties": {"_metric": { "properties": { "prop": { "const": "value" }}}}}
   * where _metric could be anything, and it could be repeatedly nested.
   *
   * In this case, we want "_metric.prop".
   *
   * Finally, ifClause could look like
   *
   * { "properties": { "prop": { "const": "value" }}, "required": ["prop1"]}
   *
   * in this case, we'd want "prop" AND "prop1".
   *
   */
function _parseClauseProperties(clause, clauseProperties, currentPrefix, isIfClause = false) {
  const properties = clause.properties;
  const required = clause.required;
  if (required) {
    clauseProperties.push(...required.map((prop) => `${currentPrefix}${prop}`));
  }
  if (properties) {
    Object.entries(properties).forEach(([key, value]) => {
      // if has properties
      if (value["properties"] || value["required"]) {
        const newPrefix = `${currentPrefix}${key}.`;
        _parseClauseProperties(value, clauseProperties, newPrefix, isIfClause);
      }
      // we've hit a condition, but only add if we want from the if clauses
      else {
        isIfClause && clauseProperties.push(`${currentPrefix}${key}`);
      }
    });
  }
}
