import { IOperatorConfig, PredicateOperator, PredicateProperty } from "../types";
/**
 * returns the configuration for a given operator
 *
 * NOTE: we will continue to add more operators here
 * as we extend the predicate builder field
 *
 * @param {PredicateOprator} operator predicate operator
 * @param {PredicateProperty} labelScope optional i18n scope to override the default operator label
 */
export declare const getOperatorConfig: (operator: PredicateOperator, labelScope?: PredicateProperty) => IOperatorConfig;
