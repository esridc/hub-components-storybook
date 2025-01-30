import { EntityType, IUiSchema } from "@esri/hub-common";
import { JSONSchema } from "../../../../../resources";
/** internal predicate interface - consumed by the config editor */
export interface _IPredicate {
  property: PredicateProperty;
  operator: PredicateOperator;
  value: any;
}
/**
 * valid item predicate properties
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 */
export declare const ITEM_PREDICATE_PROPERTIES: readonly ["type", "group"];
export declare type ItemPredicateProperty = typeof ITEM_PREDICATE_PROPERTIES[number];
/**
 * valid event predicate properties
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 */
export declare const EVENT_PREDICATE_PROPERTIES: readonly ["group", "occurrence"];
export declare type EventPredicateProperty = typeof EVENT_PREDICATE_PROPERTIES[number];
export declare type PredicateProperty = ItemPredicateProperty | EventPredicateProperty;
export declare type PredicateOperator = "isAny" | "isAll" | "isExactly" | "isNot" | "isBefore" | "isAfter" | "isBetween";
export interface IPropertyConfig {
  label: string;
  value: PredicateProperty;
  targetEntities: EntityType[];
}
export interface IOperatorConfig {
  label: string;
  value: PredicateOperator;
}
export interface IValuesConfig {
  schema: JSONSchema;
  uiSchema: IUiSchema | IUiSchema[];
  inCallback?: (val: any) => any;
  outCallback?: (val: any) => any;
}
export interface IPredicateConfig {
  property: IPropertyConfig;
  operators: IOperatorConfig[];
  values: IValuesConfig;
}
