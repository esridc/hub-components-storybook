import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';

/**
 * Shared metric rules for uiSchema
 */
/** Show if the type is set to static */
const SHOW_FOR_STATIC_RULE_ENTITY = {
    condition: {
        scope: "/properties/_metric/properties/type",
        schema: { const: "static" },
    },
    effect: UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_STATIC_AND_STRING_RULE_ENTITY = {
    condition: {
        schema: {
            type: "object",
            properties: {
                _metric: {
                    type: "object",
                    properties: {
                        type: { const: "static" },
                        valueType: { const: "string" },
                    },
                },
            },
        },
    },
    effect: UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_STATIC_AND_NUMBER_RULE_ENTITY = {
    condition: {
        schema: {
            type: "object",
            properties: {
                _metric: {
                    type: "object",
                    properties: {
                        type: { const: "static" },
                        valueType: { const: "number" },
                    },
                },
            },
        },
    },
    effect: UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_STATIC_AND_DATE_RULE_ENTITY = {
    condition: {
        schema: {
            type: "object",
            properties: {
                _metric: {
                    type: "object",
                    properties: {
                        type: { const: "static" },
                        valueType: { const: "date" },
                    },
                },
            },
        },
    },
    effect: UiSchemaRuleEffects.SHOW,
};
/** Show if the type is set to dynamic */
const SHOW_FOR_DYNAMIC_RULE_ENTITY = {
    condition: {
        scope: "/properties/_metric/properties/type",
        schema: { const: "dynamic" },
    },
    effect: UiSchemaRuleEffects.SHOW,
};

export { SHOW_FOR_STATIC_RULE_ENTITY as S, SHOW_FOR_STATIC_AND_STRING_RULE_ENTITY as a, SHOW_FOR_STATIC_AND_NUMBER_RULE_ENTITY as b, SHOW_FOR_STATIC_AND_DATE_RULE_ENTITY as c, SHOW_FOR_DYNAMIC_RULE_ENTITY as d };
