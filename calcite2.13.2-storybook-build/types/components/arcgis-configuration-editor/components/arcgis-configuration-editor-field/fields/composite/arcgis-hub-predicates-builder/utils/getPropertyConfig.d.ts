import { IPropertyConfig, PredicateProperty } from "../types";
/**
 * returns the configuration for a given predicate property
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 *
 * @param {PredicateProperty} property predicate property
 * @param {PredicateProperty} labelScope optional i18n scope to override the default property label
 */
export declare const getPropertyConfig: (property: PredicateProperty, labelScope?: string) => IPropertyConfig;
