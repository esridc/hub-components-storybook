'use strict';

const types = require('./types-60347c5c.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
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
require('./get-family-cafa88bb.js');
require('./get-prop-4bd8fc1a.js');

// Get the catalogs for the entity gallery picker
function getCatalogs(user) {
    const catalogNames = ["myContent", "organization"];
    return catalogNames.map((name) => {
        const opts = {
            user,
            collectionNames: ["site"],
        };
        const catalog = wellKnownCatalog.getWellKnownCatalog("selectContent.facets", name, "item", opts);
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
    effect: types.UiSchemaRuleEffects.HIDE,
    condition: {
        scope: "/properties/entityId",
        schema: { const: [] },
    },
};

exports.buildUiSchema = buildUiSchema;
