/**
 * returns the configuration for a given operator
 *
 * NOTE: we will continue to add more operators here
 * as we extend the predicate builder field
 *
 * @param {PredicateOprator} operator predicate operator
 * @param {PredicateProperty} labelScope optional i18n scope to override the default operator label
 */
export const getOperatorConfig = (operator, labelScope) => {
  return {
    isAny: {
      value: "isAny",
      label: `{{operatorConfigs.isAny.${labelScope || "default"}:translate}}`
    },
    isAll: {
      value: "isAll",
      label: `{{operatorConfigs.isAll.${labelScope || "default"}:translate}}`
    },
    isExactly: {
      value: "isExactly",
      label: `{{operatorConfigs.isExactly.${labelScope || "default"}:translate}}`
    },
    isNot: {
      value: "isNot",
      label: `{{operatorConfigs.isNot.${labelScope || "default"}:translate}}`
    },
  }[operator];
};
