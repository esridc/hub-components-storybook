import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
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
import './get-family-543fac52.js';
import './get-prop-ec5be510.js';

// Get the catalogs for the entity gallery picker
function getCatalogs(user) {
    const catalogNames = ["myContent", "organization"];
    return catalogNames.map((name) => {
        const opts = {
            user,
            collectionNames: ["site"],
        };
        const catalog = getWellKnownCatalog("selectContent.facets", name, "item", opts);
        return catalog;
    });
}
const buildUiSchema = (i18nScope, config, context) => {
    return {
        type: "Layout",
        elements: [
            {
                labelKey: "selectContent.title",
                scope: "/properties/entityId",
                type: "Control",
                options: {
                    control: "hub-field-input-gallery-picker",
                    targetEntity: "item",
                    catalogs: getCatalogs(context.currentUser),
                    facets: [
                        {
                            label: "{{selectContent.facets.sharing:translate}}",
                            key: "access",
                            display: "multi-select",
                            field: "access",
                            options: [],
                            operation: "OR",
                        },
                    ],
                },
            },
            {
                type: "Section",
                labelKey: "callToAction.title",
                rule: HIDE_FOR_NO_ENTITY_ID,
                options: {
                    helperText: {
                        labelKey: "callToAction.helperText",
                    },
                },
                elements: [
                    {
                        scope: "/properties/callToActionText",
                        type: "Control",
                        options: {
                            type: "textarea",
                            rows: 4,
                        },
                    },
                    {
                        labelKey: "callToAction.alignment",
                        scope: "/properties/callToActionAlign",
                        type: "Control",
                        options: {
                            control: "hub-field-input-alignment",
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: "followButton.title",
                options: {
                    helperText: {
                        labelKey: "followButton.helperText",
                    },
                },
                rule: HIDE_FOR_NO_ENTITY_ID,
                elements: [
                    {
                        labelKey: "followButton.buttonText",
                        scope: "/properties/buttonText",
                        type: "Control",
                        options: {
                            control: "hub-field-input-input",
                        },
                    },
                    {
                        labelKey: "followButton.unfollowButtonText",
                        scope: "/properties/unfollowButtonText",
                        type: "Control",
                        options: {
                            control: "hub-field-input-input",
                        },
                    },
                    {
                        labelKey: "followButton.alignment",
                        scope: "/properties/buttonAlign",
                        type: "Control",
                        options: {
                            control: "hub-field-input-alignment",
                        },
                    },
                    {
                        labelKey: "followButton.buttonStyle",
                        scope: "/properties/buttonStyle",
                        type: "Control",
                        options: {
                            control: "hub-field-input-select",
                            labels: [
                                "{{followButton.solid:translate}}",
                                "{{followButton.outline:translate}}",
                            ],
                        },
                    },
                ],
            },
        ],
    };
};
const HIDE_FOR_NO_ENTITY_ID = {
    effect: UiSchemaRuleEffects.HIDE,
    condition: {
        scope: "/properties/entityId",
        schema: { const: [] },
    },
};

export { buildUiSchema };
