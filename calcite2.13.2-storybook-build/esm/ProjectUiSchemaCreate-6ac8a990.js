import { c as checkPermission } from './checkPermission-6c5be250.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { g as getLocationExtent, a as getLocationOptions } from './getLocationOptions-cf27610b.js';
import { g as getSharableGroupsComboBoxItems } from './getSharableGroupsComboBoxItems-17bd5ca5.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';
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
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';

/**
 * @private
 * constructs the minimal create uiSchema for Hub Projects.
 * This defines how the schema properties should be rendered
 * in the project creation experience
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
                                        labelKey: `${i18nScope}.fields.summary.label`,
                                        scope: "/properties/summary",
                                        type: "Control",
                                        options: {
                                            control: "hub-field-input-input",
                                            type: "textarea",
                                            rows: 4,
                                            helperText: {
                                                labelKey: `${i18nScope}.fields.summary.helperText`,
                                            },
                                            messages: [
                                                {
                                                    type: "ERROR",
                                                    keyword: "maxLength",
                                                    icon: true,
                                                    labelKey: `shared.fields.purpose.maxLengthError`,
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        labelKey: `${i18nScope}.fields.status.label`,
                                        scope: "/properties/status",
                                        type: "Control",
                                        options: {
                                            control: "hub-field-input-select",
                                            enum: {
                                                i18nScope: `${i18nScope}.fields.status.enum`,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.location.label`,
                        options: {
                            section: "step",
                        },
                        rules: [
                            {
                                effect: UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { const: "" },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { minLength: 251 },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.DISABLE,
                                condition: {
                                    scope: "/properties/summary",
                                    schema: { minLength: 2049 },
                                },
                            },
                        ],
                        elements: [
                            {
                                type: "Section",
                                labelKey: `${i18nScope}.sections.location.label`,
                                options: {
                                    helperText: {
                                        labelKey: `${i18nScope}.sections.location.helperText`,
                                    },
                                },
                                elements: [
                                    {
                                        scope: "/properties/location",
                                        type: "Control",
                                        options: {
                                            control: "hub-field-input-location-picker",
                                            extent: await getLocationExtent(options.location, context.hubRequestOptions),
                                            options: await getLocationOptions(options.id, options.type, options.location, context.portal.name, context.hubRequestOptions),
                                            noticeTitleElementAriaLevel: 3,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.sharing.label`,
                        options: {
                            section: "step",
                        },
                        rules: [
                            {
                                effect: UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { const: "" },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { minLength: 251 },
                                    },
                                ],
                            },
                            {
                                effect: UiSchemaRuleEffects.DISABLE,
                                condition: {
                                    scope: "/properties/summary",
                                    schema: { minLength: 2049 },
                                },
                            },
                        ],
                        elements: [
                            {
                                scope: "/properties/access",
                                type: "Control",
                                options: {
                                    control: "arcgis-hub-access-level-controls",
                                    orgName: context.portal.name,
                                    itemType: `{{${i18nScope}.fields.access.itemType:translate}}`,
                                },
                            },
                            {
                                labelKey: `${i18nScope}.fields.groups.label`,
                                scope: "/properties/_groups",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-combobox",
                                    items: getSharableGroupsComboBoxItems(context.currentUser.groups),
                                    disabled: !checkPermission("platform:portal:user:shareToGroup", context),
                                    allowCustomValues: false,
                                    selectionMode: "multiple",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
};

export { buildUiSchema };
