/**
 * returns the configuration for a given predicate property
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 *
 * @param {PredicateProperty} property predicate property
 * @param {PredicateProperty} labelScope optional i18n scope to override the default property label
 */
export const getPropertyConfig = (property, labelScope) => {
  return {
    type: {
      value: "type",
      label: `{{propertyConfigs.type.${labelScope || "default"}:translate}}`,
      targetEntities: ["item"]
    },
    group: {
      value: "group",
      label: `{{propertyConfigs.group.${labelScope || "default"}:translate}}`,
      targetEntities: ["item", "event"]
    },
    occurrence: {
      value: "occurrence",
      label: `{{propertyConfigs.occurrence.${labelScope || "default"}:translate}}`,
      targetEntities: ["event"]
    }
  }[property];
};
