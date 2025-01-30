'use strict';

const getThumbnailUiSchemaElement = require('./getThumbnailUiSchemaElement-8f800867.js');
const types = require('./types-60347c5c.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const getEntityThumbnailUrl = require('./getEntityThumbnailUrl-4312f5ce.js');
const getSlugSchemaElement = require('./getSlugSchemaElement-112ec0d9.js');
require('./get-cdn-asset-url-2eb06652.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
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

const getRecommendedTemplatesCatalog = (user, i18nScope) => {
    const catalogNames = ["myContent", "organization"];
    const catalogs = catalogNames.map((name) => {
        const opts = { user };
        const catalog = wellKnownCatalog.getWellKnownCatalog("initiativeTemplate.fields.recommendedTemplates", name, "item", opts);
        // manually attach recommended templates collection
        catalog.collections = [getRecommendedTemplatesCollection(i18nScope)];
        return catalog;
    });
    return catalogs;
};
const getRecommendedTemplatesCollection = (i18nScope) => {
    return {
        targetEntity: "item",
        key: "recommendedTemplates",
        label: `${i18nScope}.fields.recommendedTemplates.collection.label`,
        scope: {
            targetEntity: "item",
            filters: [
                {
                    predicates: [
                        {
                            type: "Solution",
                        },
                    ],
                },
                {
                    predicates: [
                        {
                            typekeywords: ["hubSolutionTemplate"],
                        },
                        {
                            typekeywords: ["Template"],
                        },
                    ],
                    operation: "OR",
                },
            ],
        },
    };
};

/**
 * @private
 * constructs the complete edit uiSchema for Hub Initiative Templates.
 * This defines how the schema properties should be rendered
 * in the initiative template editing experience.
 *
 * @param i18nScope
 * @param entity
 * @param context
 * @returns
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
                        type: "Control",
                        scope: "/properties/name",
                        labelKey: `${i18nScope}.fields.name.label`,
                        options: {
                            messages: [
                                {
                                    type: types.UiSchemaMessageTypes.error,
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.name.requiredError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "maxLength",
                                    icon: true,
                                    labelKey: `shared.fields.name.maxLengthError`,
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
                    getSlugSchemaElement.getSlugSchemaElement(i18nScope),
                    {
                        type: "Control",
                        scope: "/properties/previewUrl",
                        labelKey: `${i18nScope}.fields.previewUrl.label`,
                        options: {
                            helperText: {
                                labelKey: `${i18nScope}.fields.previewUrl.helperText`,
                            },
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "format",
                                    icon: true,
                                    labelKey: `shared.errors.urlFormat`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "if",
                                    hidden: true,
                                },
                            ],
                        },
                    },
                    {
                        type: "Control",
                        scope: "/properties/summary",
                        labelKey: `${i18nScope}.fields.summary.label`,
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
                                    labelKey: `shared.fields.summary.maxLengthError`,
                                },
                            ],
                        },
                    },
                    {
                        type: "Control",
                        scope: "/properties/description",
                        labelKey: `${i18nScope}.fields.description.label`,
                        options: {
                            control: "hub-field-input-rich-text",
                            type: "textarea",
                            helperText: {
                                labelKey: `${i18nScope}.fields.description.helperText`,
                            },
                        },
                    },
                    ...getThumbnailUiSchemaElement.getThumbnailUiSchemaElement(i18nScope, options.thumbnail, getEntityThumbnailUrl.getEntityThumbnailUrl(options), "initiativeTemplate", context.requestOptions),
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.fields.recommendedTemplates.label`,
                elements: [
                    {
                        type: "Control",
                        scope: "/properties/recommendedTemplates",
                        options: {
                            control: "hub-field-input-gallery-picker",
                            targetEntity: "item",
                            catalogs: getRecommendedTemplatesCatalog(context.currentUser, i18nScope),
                            facets: [
                                {
                                    label: `{{${i18nScope}.fields.recommendedTemplates.facets.sharing:translate}}`,
                                    key: "access",
                                    field: "access",
                                    display: "multi-select",
                                    operation: "OR",
                                },
                            ],
                            canReorder: false,
                            linkTarget: "siteRelative",
                            pickerTitle: {
                                labelKey: `${i18nScope}.fields.recommendedTemplates.pickerTitle`,
                            },
                        },
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
