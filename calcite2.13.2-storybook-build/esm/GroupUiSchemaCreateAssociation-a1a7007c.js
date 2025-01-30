import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { g as getWellKnownGroup } from './getWellKnownGroup-af6e6a2a.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
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
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';

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
                            effect: UiSchemaRuleEffects.DISABLE,
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
                                    effect: UiSchemaRuleEffects.HIDE,
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
                                        !checkPermission("platform:portal:user:addExternalMembersToGroup", context).access,
                                        !checkPermission("platform:portal:user:addExternalMembersToGroup", context).access,
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
    return Object.assign({}, getWellKnownGroup("hubAssociationsGroup", context));
};

export { buildDefaults, buildUiSchema };
