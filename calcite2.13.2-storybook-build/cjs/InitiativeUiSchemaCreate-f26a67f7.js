'use strict';

const checkPermission = require('./checkPermission-11ab5992.js');
const types = require('./types-60347c5c.js');
const getLocationOptions = require('./getLocationOptions-323be3c8.js');
const getSharableGroupsComboBoxItems = require('./getSharableGroupsComboBoxItems-519e20a8.js');
const getAuthedImageUrl = require('./getAuthedImageUrl-67f66cb7.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');
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
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./cacheBustUrl-e8fc7455.js');

/**
 * @private
 * constructs the minimal create uiSchema for Hub Initiatives.
 * This defines how the schema properties should be rendered
 * in the initiative creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    var _a;
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
                                        labelKey: `${i18nScope}.fields.hero.label`,
                                        scope: "/properties/view/properties/hero",
                                        type: "Control",
                                        options: {
                                            control: "hub-field-input-tile-select",
                                            layout: "horizontal",
                                            helperText: {
                                                labelKey: `${i18nScope}.fields.hero.helperText`,
                                            },
                                            labels: [
                                                `{{${i18nScope}.fields.hero.map.label:translate}}`,
                                                `{{${i18nScope}.fields.hero.image.label:translate}}`,
                                            ],
                                            descriptions: [
                                                `{{${i18nScope}.fields.hero.map.description:translate}}`,
                                                `{{${i18nScope}.fields.hero.image.description:translate}}`,
                                            ],
                                            icons: ["map-pin", "image"],
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.hero.label`,
                        options: {
                            section: "step",
                        },
                        rules: [
                            {
                                effect: types.UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { const: "" },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { minLength: 251 },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.DISABLE,
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
                                rule: {
                                    effect: types.UiSchemaRuleEffects.HIDE,
                                    condition: {
                                        scope: "/properties/view/properties/hero",
                                        schema: { const: "image" },
                                    },
                                },
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
                                            extent: await getLocationOptions.getLocationExtent(options.location, context.hubRequestOptions),
                                            options: await getLocationOptions.getLocationOptions(options.id, options.type, options.location, context.portal.name, context.hubRequestOptions),
                                            noticeTitleElementAriaLevel: 3,
                                        },
                                    },
                                ],
                            },
                            {
                                type: "Section",
                                labelKey: `${i18nScope}.fields.featuredImage.label`,
                                options: {
                                    helperText: {
                                        labelKey: `${i18nScope}.fields.featuredImage.helperText`,
                                    },
                                },
                                rule: {
                                    effect: types.UiSchemaRuleEffects.HIDE,
                                    condition: {
                                        scope: "/properties/view/properties/hero",
                                        schema: { const: "map" },
                                    },
                                },
                                elements: [
                                    {
                                        scope: "/properties/view/properties/featuredImage",
                                        type: "Control",
                                        options: {
                                            control: "hub-field-input-image-picker",
                                            imgSrc: getAuthedImageUrl.getAuthedImageUrl((_a = options.view) === null || _a === void 0 ? void 0 : _a.featuredImageUrl, context.requestOptions),
                                            maxWidth: 727,
                                            maxHeight: 484,
                                            aspectRatio: 1.5,
                                            sizeDescription: {
                                                labelKey: `${i18nScope}.fields.featuredImage.sizeDescription`,
                                            },
                                        },
                                    },
                                    {
                                        labelKey: `${i18nScope}.fields.featuredImage.altText.label`,
                                        scope: "/properties/view/properties/featuredImageAltText",
                                        type: "Control",
                                        options: {
                                            helperText: {
                                                labelKey: `${i18nScope}.fields.featuredImage.altText.helperText`,
                                            },
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
                                effect: types.UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { const: "" },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.DISABLE,
                                conditions: [
                                    {
                                        scope: "/properties/name",
                                        schema: { minLength: 251 },
                                    },
                                ],
                            },
                            {
                                effect: types.UiSchemaRuleEffects.DISABLE,
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
                                    items: getSharableGroupsComboBoxItems.getSharableGroupsComboBoxItems(context.currentUser.groups),
                                    disabled: !checkPermission.checkPermission("platform:portal:user:shareToGroup", context),
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

exports.buildUiSchema = buildUiSchema;
