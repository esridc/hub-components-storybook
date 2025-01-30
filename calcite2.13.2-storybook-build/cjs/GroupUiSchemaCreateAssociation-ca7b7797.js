'use strict';

const types = require('./types-60347c5c.js');
const getWellKnownGroup = require('./getWellKnownGroup-f4de91c5.js');
const checkPermission = require('./checkPermission-11ab5992.js');
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
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');

/**
 * @private
 * constructs the complete uiSchema for creating an association
 * group. This defines how the schema properties should be
 * rendered in the association group creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                options: { section: "stepper", scale: "l" },
                elements: [
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.details.label`,
                        options: {
                            section: "step",
                        },
                        elements: [
                            {
                                labelKey: `${i18nScope}.fields.name.label`,
                                scope: "/properties/name",
                                type: "Control",
                                options: {
                                    messages: [
                                        {
                                            type: "ERROR",
                                            keyword: "required",
                                            icon: true,
                                            labelKey: `${i18nScope}.fields.name.requiredError`,
                                        },
                                        {
                                            type: "ERROR",
                                            keyword: "maxLength",
                                            icon: true,
                                            labelKey: `${i18nScope}.fields.name.maxLengthError`,
                                        },
                                        {
                                            type: "ERROR",
                                            keyword: "format",
                                            icon: true,
                                            labelKey: `${i18nScope}.fields.name.entityTitleValidatorError`,
                                        },
                                    ],
                                },
                            },
                            {
                                labelKey: `${i18nScope}.fields.summary.label`,
                                scope: "/properties/summary",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-input",
                                    type: "textarea",
                                    rows: 4,
                                    messages: [
                                        {
                                            type: "ERROR",
                                            keyword: "maxLength",
                                            icon: true,
                                            labelKey: `${i18nScope}.fields.summary.maxLengthError`,
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.membershipAccess.label`,
                        options: {
                            section: "step",
                        },
                        rule: {
                            effect: types.UiSchemaRuleEffects.DISABLE,
                            condition: {
                                scope: "/properties/name",
                                schema: { const: "" },
                            },
                        },
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
                                        `{{${i18nScope}.fields.membershipAccess.createAssociation.any:translate}}`,
                                    ],
                                    disabled: [
                                        false,
                                        !checkPermission.checkPermission("platform:portal:user:addExternalMembersToGroup", context).access,
                                        !checkPermission.checkPermission("platform:portal:user:addExternalMembersToGroup", context).access,
                                    ],
                                },
                            },
                            {
                                labelKey: `${i18nScope}.fields.contributeContent.label`,
                                scope: "/properties/isViewOnly",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-radio",
                                    labels: [
                                        `{{${i18nScope}.fields.contributeContent.members.description:translate}}`,
                                        `{{${i18nScope}.fields.contributeContent.createAssociation.admins:translate}}`,
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
};
/**
 * @private
 * constructs the default values for creating an associations group.
 * This is used to pre-populate the form with specific default values
 * that are different from the normal Group Schema defaults.
 * @param i18nScope
 * @param options
 * @param context
 * @returns
 */
const buildDefaults = async (i18nScope, options, context) => {
    return Object.assign({}, getWellKnownGroup.getWellKnownGroup("hubAssociationsGroup", context));
};

exports.buildDefaults = buildDefaults;
exports.buildUiSchema = buildUiSchema;
