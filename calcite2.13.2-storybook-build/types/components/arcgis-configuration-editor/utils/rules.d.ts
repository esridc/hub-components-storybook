import { IChangeEventDetail, IUiSchemaCondition, IUiSchemaRule, UiSchemaRuleEffects } from "@esri/hub-common";
/**
 * Iterates over a uiSchema's rule(s), evaluates them, and returns
 * an array of effects (e.g. DISABLE, SHOW, etc.)
 * @param rules
 * @param model
 * @returns
 */
export declare function evaluateUiSchemaRules(rules: IUiSchemaRule | IUiSchemaRule[], model: IChangeEventDetail): UiSchemaRuleEffects[];
/**
 * Evaluates a given uiSchema rule based on the schema defined
 * in the rule and the field's current value. Returns the effect
 * that should be taken based on the evaluation
 */
export declare function evaluateUiSchemaRule(uiSchemaRule: IUiSchemaRule, model: IChangeEventDetail): UiSchemaRuleEffects;
/**
 * Evaluates an array of rule conditions, returning whether the condition is
 * true with the given condition scope and schema
 */
export declare function evaluateConditions(conditions: (IUiSchemaCondition | boolean)[], model: IChangeEventDetail): boolean;
/**
 * Evaluates a schema condition, returning whether the condition
 * is true with the given condition scope and schema
 */
export declare function evaluateCondition(condition: IUiSchemaCondition, model: IChangeEventDetail): boolean;
