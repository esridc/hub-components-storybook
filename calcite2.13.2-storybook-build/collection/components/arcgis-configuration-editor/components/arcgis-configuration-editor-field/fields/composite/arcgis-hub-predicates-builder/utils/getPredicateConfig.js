import { getGroupCatalogs } from "./gallery-pickers/getGroupCatalogs";
import { getGroupFacets } from "./gallery-pickers/getGroupFacets";
import { getOperatorConfig } from "./getOperatorConfig";
import { getPropertyConfig } from "./getPropertyConfig";
import { getTypePredicateItemsWithChildren } from "./predicate-utils/type-predicate";
/**
 * returns the full predicate configuration for a given
 * predicate property
 *
 * NOTE: we will continue to add more predicate configs
 * here as we extend the predicate builder field
 *
 * @param {PredicateProperty} property predicate property
 * @param {EntityType} targetEntity type of entity the predicate is targeting
 * @param {IArcGISContext} context contextual portal & auth information
 */
export const getPredicateConfig = async (property, targetEntity, context, intl) => {
  let config;
  switch (property) {
    case "type":
      config = {
        property: getPropertyConfig("type"),
        operators: [
          getOperatorConfig("isAny"),
          getOperatorConfig("isNot")
        ],
        values: {
          schema: {
            type: "array",
            items: {
              type: "string",
            }
          },
          uiSchema: {
            type: "Control",
            label: "{{valueConfigs.type.label:translate}}",
            scope: "/properties/value",
            options: {
              control: "hub-field-input-combobox",
              selectionMode: "multiple",
              allowCustomValues: false,
              items: getTypePredicateItemsWithChildren(targetEntity, intl),
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: "{{valueConfigs.type.requiredError:translate}}"
                }
              ],
            }
          }
        }
      };
      break;
    case "group":
      config = {
        property: getPropertyConfig("group"),
        // the events API does not currently support search via an
        // advanced query language, e.g. it does not yet have an
        // equivalent to AGO's q parameter. Without being able to
        // explicitly AND/OR conditions, we can only support a
        // subset of operands.
        operators: targetEntity === "event"
          ? [getOperatorConfig("isAny", "group")]
          : [getOperatorConfig("isAny", "group"), getOperatorConfig("isAll", "group"), getOperatorConfig("isNot", "group")],
        values: {
          schema: {
            type: "array",
            items: {
              type: "string"
            }
          },
          uiSchema: {
            label: "{{valueConfigs.group.label:translate}}",
            type: "Control",
            scope: "/properties/value",
            options: {
              control: "hub-field-input-gallery-picker",
              targetEntity: "group",
              catalogs: getGroupCatalogs(context, "shared.groupPicker"),
              facets: getGroupFacets(context, "shared.groupPicker"),
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: "{{valueConfigs.group.requiredError:translate}}"
                }
              ],
            }
          }
        }
      };
      break;
    case "occurrence":
      config = {
        property: getPropertyConfig("occurrence"),
        operators: [getOperatorConfig("isExactly", "occurrence")],
        values: {
          schema: {
            type: "string",
            enum: ["upcoming", "past", "inProgress"]
          },
          uiSchema: {
            type: "Control",
            label: "{{valueConfigs.occurrence.label:translate}}",
            scope: "/properties/value",
            options: {
              control: "hub-field-input-radio",
              labels: [
                "{{valueConfigs.occurrence.upcoming:translate}}",
                "{{valueConfigs.occurrence.past:translate}}",
                "{{valueConfigs.occurrence.inProgress:translate}}"
              ],
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: "{{valueConfigs.occurrence.requiredError:translate}}"
                }
              ],
            }
          },
        }
      };
      break;
  }
  if (!config) {
    throw new Error(`getPredicateConfig: no config found for property ${property}`);
  }
  else if (!config.property.targetEntities.includes(targetEntity)) {
    throw new Error(`getPredicateConfig: property ${property} is not valid for target entity ${targetEntity}`);
  }
  return config;
};
