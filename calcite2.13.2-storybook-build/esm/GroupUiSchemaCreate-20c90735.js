import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { g as getWellKnownGroup } from './getWellKnownGroup-af6e6a2a.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';

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
                                    effect: UiSchemaRuleEffects.NONE,
                                },
                                {
                                    effect: UiSchemaRuleEffects.ENABLE,
                                    conditions: [
                                        checkPermission("platform:portal:user:shareGroupToOrg", context).access,
                                    ],
                                },
                                {
                                    effect: UiSchemaRuleEffects.ENABLE,
                                    conditions: [
                                        checkPermission("platform:portal:user:shareGroupToPublic", context).access,
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
                            effect: UiSchemaRuleEffects.ENABLE,
                            conditions: [
                                checkPermission("platform:portal:admin:createUpdateCapableGroup", context).access,
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
                                effect: UiSchemaRuleEffects.ENABLE,
                                conditions: [
                                    checkPermission("platform:portal:admin:createLeavingDisallowedGroup", context).access,
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
                                effect: UiSchemaRuleEffects.ENABLE,
                                conditions: [
                                    {
                                        scope: "/properties/access",
                                        schema: { const: "public" },
                                    },
                                    checkPermission("platform:opendata:user:designateGroup", context).access,
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/access",
                                        schema: { not: { const: "public" } },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.SHOW,
                                conditions: [
                                    // should only exist if user's org has portal.portalProperties.opendata.enabled: true
                                    !!getProp(context, "portal.portalProperties.openData.enabled"),
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
                                        effect: UiSchemaRuleEffects.NONE,
                                    },
                                ],
                                [
                                    {
                                        effect: UiSchemaRuleEffects.DISABLE,
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
                                        effect: UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/leavingDisallowed",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                    {
                                        effect: UiSchemaRuleEffects.DISABLE,
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
                                effect: UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/leavingDisallowed",
                                        schema: { const: true },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.RESET,
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
                                        effect: UiSchemaRuleEffects.NONE,
                                    },
                                ],
                                [
                                    {
                                        effect: UiSchemaRuleEffects.DISABLE,
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
                                        effect: UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/access",
                                                schema: { const: "private" },
                                            },
                                        ],
                                    },
                                    {
                                        effect: UiSchemaRuleEffects.DISABLE,
                                        conditions: [
                                            {
                                                scope: "/properties/leavingDisallowed",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                    {
                                        effect: UiSchemaRuleEffects.DISABLE,
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
                                effect: UiSchemaRuleEffects.RESET,
                                conditions: [
                                    {
                                        scope: "/properties/access",
                                        schema: { const: "private" },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.RESET,
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
                                effect: UiSchemaRuleEffects.RESET,
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
    return Object.assign(Object.assign({}, getWellKnownGroup("hubGroup", context)), options);
};

export { buildDefaults, buildUiSchema };
