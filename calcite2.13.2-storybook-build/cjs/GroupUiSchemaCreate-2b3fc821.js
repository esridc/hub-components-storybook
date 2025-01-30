'use strict';

const types = require('./types-60347c5c.js');
const getWellKnownGroup = require('./getWellKnownGroup-f4de91c5.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getProp = require('./get-prop-4bd8fc1a.js');
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
require('./map-by-a7a75788.js');

/**
 * @private
 * constructs the complete uiSchema for creating a view
 * group. This defines how the schema properties should be
 * rendered in the view group creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.basicInfo.label`,
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
                        labelKey: `${i18nScope}.fields.access.label`,
                        scope: "/properties/access",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            descriptions: [
                                `{{${i18nScope}.fields.access.private.description:translate}}`,
                                `{{${i18nScope}.fields.access.org.description:translate}}`,
                                `{{${i18nScope}.fields.access.public.description:translate}}`,
                            ],
                            icons: ["users", "organization", "globe"],
                            labels: [
                                `{{${i18nScope}.fields.access.private.label:translate}}`,
                                `{{${i18nScope}.fields.access.org.label:translate}}`,
                                `{{${i18nScope}.fields.access.public.label:translate}}`,
                            ],
                            rules: [
                                {
                                    effect: types.UiSchemaRuleEffects.NONE,
                                },
                                {
                                    effect: types.UiSchemaRuleEffects.ENABLE,
                                    conditions: [
                                        checkPermission.checkPermission("platform:portal:user:shareGroupToOrg", context).access,
                                    ],
                                },
                                {
                                    effect: types.UiSchemaRuleEffects.ENABLE,
                                    conditions: [
                                        checkPermission.checkPermission("platform:portal:user:shareGroupToPublic", context).access,
                                    ],
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.capabilities.label`,
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.isSharedUpdate.label`,
                        scope: "/properties/isSharedUpdate",
                        type: "Control",
                        options: {
                            control: "hub-field-input-switch",
                            helperText: {
                                labelKey: `${i18nScope}.fields.isSharedUpdate.helperText`,
                            },
                        },
                        rule: {
                            effect: types.UiSchemaRuleEffects.ENABLE,
                            conditions: [
                                checkPermission.checkPermission("platform:portal:admin:createUpdateCapableGroup", context).access,
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.isAdmin.label`,
                        scope: "/properties/leavingDisallowed",
                        type: "Control",
                        options: {
                            control: "hub-field-input-switch",
                            helperText: {
                                labelKey: `${i18nScope}.fields.isAdmin.helperText`,
                            },
                        },
                        rules: [
                            {
                                effect: types.UiSchemaRuleEffects.ENABLE,
                                conditions: [
                                    checkPermission.checkPermission("platform:portal:admin:createLeavingDisallowedGroup", context).access,
                                ],
                            },
                        ],
                    },
                    {
                        labelKey: `${i18nScope}.fields.isOpenData.label`,
                        scope: "/properties/isOpenData",
                        type: "Control",
                        options: {
                            control: "hub-field-input-switch",
                            helperText: {
                                labelKey: `${i18nScope}.fields.isOpenData.helperText`,
                            },
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "const",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.isOpenData.constError`,
                                },
                            ],
                        },
                        rules: [
                            {
                                effect: types.UiSchemaRuleEffects.ENABLE,
                                conditions: [
                                    {
                                        scope: "/properties/access",
                                        schema: { const: "public" },
                                    },
                                    checkPermission.checkPermission("platform:opendata:user:designateGroup", context).access,
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/access",
                                        schema: { not: { const: "public" } },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.SHOW,
                                conditions: [
                                    // should only exist if user's org has portal.portalProperties.opendata.enabled: true
                                    !!getProp.getProp(context, "portal.portalProperties.openData.enabled"),
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.membershipAccess.label`,
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.membershipAccess.label`,
                        scope: "/properties/membershipAccess",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            labels: [
                                `{{${i18nScope}.fields.membershipAccess.org.label:translate}}`,
                                `{{${i18nScope}.fields.membershipAccess.collab.label:translate}}`,
                                `{{${i18nScope}.fields.membershipAccess.any.label:translate}}`,
                            ],
                            descriptions: [
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
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "pattern",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.membershipAccess.patternError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "const",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.membershipAccess.constError`,
                                },
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
                        labelKey: `${i18nScope}.fields.join.label`,
                        scope: "/properties/_join",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            labels: [
                                `{{${i18nScope}.fields.join.invite.label:translate}}`,
                                `{{${i18nScope}.fields.join.request.label:translate}}`,
                                `{{${i18nScope}.fields.join.auto.label:translate}}`,
                            ],
                            descriptions: [
                                `{{${i18nScope}.fields.join.invite.description:translate}}`,
                                `{{${i18nScope}.fields.join.request.description:translate}}`,
                                `{{${i18nScope}.fields.join.auto.description:translate}}`,
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
                                                scope: "/properties/access",
                                                schema: { const: "private" },
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        effect: types.UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/access",
                                                schema: { const: "private" },
                                            },
                                        ],
                                    },
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
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "const",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.join.constError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "pattern",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.join.patternError`,
                                },
                            ],
                        },
                        // rules that pertain to the control as a whole
                        rules: [
                            {
                                effect: types.UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/access",
                                        schema: { const: "private" },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/leavingDisallowed",
                                        schema: { const: true },
                                    },
                                    {
                                        scope: "/properties/_join",
                                        schema: { const: "auto" },
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
                                        scope: "/properties/_join",
                                        schema: { const: "auto" },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        labelKey: `${i18nScope}.fields.hiddenMembers.label`,
                        scope: "/properties/hiddenMembers",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            labels: [
                                `{{${i18nScope}.fields.hiddenMembers.members.label:translate}}`,
                                `{{${i18nScope}.fields.hiddenMembers.admins.label:translate}}`,
                            ],
                            descriptions: [
                                `{{${i18nScope}.fields.hiddenMembers.members.description:translate}}`,
                                `{{${i18nScope}.fields.hiddenMembers.admins.description:translate}}`,
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.contributeContent.label`,
                        scope: "/properties/isViewOnly",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            labels: [
                                `{{${i18nScope}.fields.contributeContent.members.label:translate}}`,
                                `{{${i18nScope}.fields.contributeContent.admins.label:translate}}`,
                            ],
                            descriptions: [
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
/**
 * @private
 * constructs the default values for creating a view group.
 * This is used to pre-populate the form with specific default values
 * that are different from the normal Group Schema defaults.
 * @param i18nScope
 * @param options
 * @param context
 * @returns
 */
const buildDefaults = async (i18nScope, options, context) => {
    return Object.assign(Object.assign({}, getWellKnownGroup.getWellKnownGroup("hubGroup", context)), options);
};

exports.buildDefaults = buildDefaults;
exports.buildUiSchema = buildUiSchema;
