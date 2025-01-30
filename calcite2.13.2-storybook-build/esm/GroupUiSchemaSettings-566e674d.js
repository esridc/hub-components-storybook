import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
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

export { buildUiSchema };
