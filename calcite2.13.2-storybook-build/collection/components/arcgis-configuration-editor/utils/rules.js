import { getProp, UiSchemaRuleEffects } from "@esri/hub-common";
import pointer from 'json-pointer';
import { getPropertyPathFromScope } from "./getPropertyFrom";
import { SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE } from "../resources";
import { isNil } from "../../../utils/is-nil";
import { instantiateValidator, validate } from "./validator";
/**
 * Iterates over a uiSchema's rule(s), evaluates them, and returns
 * an array of effects (e.g. DISABLE, SHOW, etc.)
 * @param rules
 * @param model
 * @returns
 */
export function evaluateUiSchemaRules(rules = [], model) {
  let result = [UiSchemaRuleEffects.SHOW];
  // only run rules if we have a schema to validate against
  if (model === null || model === void 0 ? void 0 : model.schema) {
    result = Array.isArray(rules)
      ? rules.map(rule => evaluateUiSchemaRule(rule, model))
      : [evaluateUiSchemaRule(rules, model)];
  }
  return result;
}
/**
 * Evaluates a given uiSchema rule based on the schema defined
 * in the rule and the field's current value. Returns the effect
 * that should be taken based on the evaluation
 */
export function evaluateUiSchemaRule(uiSchemaRule, model) {
  let ruleEffect = UiSchemaRuleEffects.SHOW;
  if (uiSchemaRule) {
    const ruleEvalutesTrue = uiSchemaRule.condition ? evaluateCondition(uiSchemaRule.condition, model) : evaluateConditions(uiSchemaRule.conditions, model);
    const evaluationInverses = {
      [UiSchemaRuleEffects.SHOW]: UiSchemaRuleEffects.HIDE,
      [UiSchemaRuleEffects.HIDE]: UiSchemaRuleEffects.SHOW,
      [UiSchemaRuleEffects.DISABLE]: UiSchemaRuleEffects.ENABLE,
      [UiSchemaRuleEffects.ENABLE]: UiSchemaRuleEffects.DISABLE,
      [UiSchemaRuleEffects.RESET]: UiSchemaRuleEffects.NONE
    };
    ruleEffect = ruleEvalutesTrue ? uiSchemaRule.effect : evaluationInverses[uiSchemaRule.effect];
  }
  return ruleEffect;
}
/**
 * Evaluates an array of rule conditions, returning whether the condition is
 * true with the given condition scope and schema
 */
export function evaluateConditions(conditions = [], model) {
  // if there are no conditions, someone set the rule up incorrectly and we want to return false
  let evaluation = false;
  if (conditions) {
    evaluation = conditions.every(condition => typeof condition === 'boolean' ? condition : evaluateCondition(condition, model));
  }
  return evaluation;
}
/**
 * Evaluates a schema condition, returning whether the condition
 * is true with the given condition scope and schema
 */
export function evaluateCondition(condition, model) {
  let evaluation = false;
  if (condition) {
    // single evaluation
    if (condition.scope) {
      const schema = pointer.get(model.schema, condition.scope);
      const propertyPath = getPropertyPathFromScope(condition.scope);
      const value = [
        getProp(model.values, propertyPath),
        schema.default,
        SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[schema.type]
      ].find(val => !isNil(val));
      const validator = instantiateValidator(condition.schema);
      evaluation = validate(validator, value).valid;
    }
    // multiple rules
    else {
      const properties = Object.keys(condition.schema.properties);
      const values = properties.reduce((acc, key) => {
        const scope = `/properties/${key}`;
        const schema = pointer.get(model.schema, scope);
        const value = [
          getProp(model.values, key),
          schema.default,
          SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[schema.type]
        ].find(val => !isNil(val));
        return Object.assign(Object.assign({}, acc), { [key]: value });
      }, {});
      const validator = instantiateValidator(condition.schema);
      evaluation = validate(validator, values).valid;
    }
  }
  return evaluation;
}
