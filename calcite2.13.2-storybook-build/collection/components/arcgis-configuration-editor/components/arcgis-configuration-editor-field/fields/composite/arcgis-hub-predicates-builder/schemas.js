import { getPredicateConfig } from "./utils/getPredicateConfig";
import { getPropertyConfig } from "./utils/getPropertyConfig";
import { UiSchemaRuleEffects } from "@esri/hub-common";
export const buildPredicateBuilderSchema = async (opts) => {
  const { properties, predicates, targetEntity, context, intl } = opts;
  const predicate = predicates[0];
  const property = properties.length === 1 ? properties[0] : predicate === null || predicate === void 0 ? void 0 : predicate.property;
  let operatorEnum = [];
  let valueSchema;
  if (property) {
    const config = await getPredicateConfig(property, targetEntity, context, intl);
    operatorEnum = config.operators.map(operator => {
      return operator.value;
    });
    valueSchema = config.values.schema;
  }
  return {
    type: "object",
    required: ["property", "operator", "value"],
    properties: Object.assign({ property: Object.assign({ type: "string", enum: properties }, (properties.length >= 1 && { default: properties[0] })), operator: Object.assign(Object.assign({ type: "string" }, (operatorEnum.length && { enum: operatorEnum })), (operatorEnum.length >= 1 && { default: operatorEnum[0] })) }, (valueSchema && { value: valueSchema }))
  };
};
export const buildPredicateBuilderUiSchema = async (opts) => {
  var _a;
  const { properties, predicates, targetEntity, context, intl } = opts;
  const predicate = predicates[0];
  const property = properties.length === 1 ? properties[0] : predicate === null || predicate === void 0 ? void 0 : predicate.property;
  let config;
  let operatorEnum = [];
  let operator;
  if (property) {
    config = await getPredicateConfig(property, targetEntity, context, intl);
    operatorEnum = config.operators.map(operator => {
      return operator.value;
    });
    operator = operatorEnum.length >= 1 ? operatorEnum[0] : predicate === null || predicate === void 0 ? void 0 : predicate.operator;
  }
  ;
  let valueUiSchema = [];
  if (property && operator) {
    valueUiSchema = Array.isArray((_a = config === null || config === void 0 ? void 0 : config.values) === null || _a === void 0 ? void 0 : _a.uiSchema)
      ? config.values.uiSchema
      : [config.values.uiSchema];
  }
  return {
    type: "Layout",
    elements: [
      {
        type: "Control",
        scope: "/properties/property",
        label: "{{property.label:translate}}",
        options: {
          control: "hub-field-input-combobox",
          selectionMode: "single",
          readOnly: properties.length === 1,
          clearDisabled: true,
          items: properties.map(property => {
            var _a;
            return {
              value: property,
              label: (_a = getPropertyConfig(property)) === null || _a === void 0 ? void 0 : _a.label
            };
          }),
          messages: [
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              label: "{{property.requiredError:translate}}"
            }
          ],
        }
      },
      {
        type: "Control",
        scope: "/properties/operator",
        label: "{{operator.label:translate}}",
        options: {
          control: "hub-field-input-combobox",
          selectionMode: "single",
          readOnly: operatorEnum.length === 1,
          clearDisabled: true,
          items: config === null || config === void 0 ? void 0 : config.operators,
          messages: [
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              label: "{{operator.requiredError:translate}}"
            }
          ],
        },
        rules: [
          {
            effect: UiSchemaRuleEffects.SHOW,
            conditions: [
              {
                scope: "/properties/property",
                schema: { not: { const: "" } }
              }
            ]
          }
        ]
      },
      ...valueUiSchema
    ].filter(Boolean)
  };
};
