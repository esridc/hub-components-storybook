'use strict';

const types = require('./types-60347c5c.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');

/**
 * @private
 * constructs the complete settings uiSchema for Hub Groups
 * This defines how the schema properties should be
 * rendered in the group settings experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.membershipAccess.label`,
                elements: [
                    {
                        // there are schema rules that use this so it must be present or they break, so we hide it when its value is false which is always the case for this uiSchema
                        scope: "/properties/isSharedUpdate",
                        type: "Control",
                        rule: {
                            effect: types.UiSchemaRuleEffects.HIDE,
                            condition: {
                                scope: "/properties/isSharedUpdate",
                                schema: { const: false },
                            },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.membershipAccess.label`,
                        scope: "/properties/membershipAccess",
                        type: "Control",
                        options: {
                            control: "hub-field-input-radio",
                            labels: [
                                `{{${i18nScope}.fields.membershipAccess.org.description:translate}}`,
                                `{{${i18nScope}.fields.membershipAccess.collab.description:translate}}`,
                                `{{${i18nScope}.fields.membershipAccess.any.description:translate}}`,
                            ],
                            // rules that pertain to the individual options
                            rules: [
                                [
                                    {
                                        effect: types.UiSchemaRuleEffects.NONE,
                                    },
                                ],
                                [
                                    {
                                        effect: types.UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/leavingDisallowed",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        effect: types.UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/leavingDisallowed",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                    {
                                        effect: types.UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/isSharedUpdate",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                        // rules that pertain to the control as a whole
                        rules: [
                            {
                                effect: types.UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/leavingDisallowed",
                                        schema: { const: true },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/isSharedUpdate",
                                        schema: { const: true },
                                    },
                                    {
                                        scope: "/properties/membershipAccess",
                                        schema: { const: "anyone" },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        labelKey: `${i18nScope}.fields.contributeContent.label`,
                        scope: "/properties/isViewOnly",
                        type: "Control",
                        options: {
                            control: "hub-field-input-radio",
                            labels: [
                                `{{${i18nScope}.fields.contributeContent.members.description:translate}}`,
                                `{{${i18nScope}.fields.contributeContent.admins.description:translate}}`,
                            ],
                        },
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
