'use strict';

const types = require('./types-60347c5c.js');

/**
 * Shared metric rules for uiSchema
 */
/** Show if the type is set to static */
const SHOW_FOR_STATIC_RULE_ENTITY = {
    condition: {
        scope: "/properties/_metric/properties/type",
        schema: { const: "static" },
    },
    effect: types.UiSchemaRuleEffects.SHOW,
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
    effect: types.UiSchemaRuleEffects.SHOW,
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
    effect: types.UiSchemaRuleEffects.SHOW,
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
    effect: types.UiSchemaRuleEffects.SHOW,
};
/** Show if the type is set to dynamic */
const SHOW_FOR_DYNAMIC_RULE_ENTITY = {
    condition: {
        scope: "/properties/_metric/properties/type",
        schema: { const: "dynamic" },
    },
    effect: types.UiSchemaRuleEffects.SHOW,
};

exports.SHOW_FOR_DYNAMIC_RULE_ENTITY = SHOW_FOR_DYNAMIC_RULE_ENTITY;
exports.SHOW_FOR_STATIC_AND_DATE_RULE_ENTITY = SHOW_FOR_STATIC_AND_DATE_RULE_ENTITY;
exports.SHOW_FOR_STATIC_AND_NUMBER_RULE_ENTITY = SHOW_FOR_STATIC_AND_NUMBER_RULE_ENTITY;
exports.SHOW_FOR_STATIC_AND_STRING_RULE_ENTITY = SHOW_FOR_STATIC_AND_STRING_RULE_ENTITY;
exports.SHOW_FOR_STATIC_RULE_ENTITY = SHOW_FOR_STATIC_RULE_ENTITY;
