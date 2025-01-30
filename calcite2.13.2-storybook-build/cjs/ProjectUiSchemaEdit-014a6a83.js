'use strict';

const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const getLocationOptions = require('./getLocationOptions-323be3c8.js');
const getTagItems = require('./getTagItems-b932a39d.js');
const getThumbnailUiSchemaElement = require('./getThumbnailUiSchemaElement-8f800867.js');
const getAuthedImageUrl = require('./getAuthedImageUrl-67f66cb7.js');
const getSlugSchemaElement = require('./getSlugSchemaElement-112ec0d9.js');
require('./get-family-cafa88bb.js');
require('./get-prop-4bd8fc1a.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./getTypeFromEntity-9476954e.js');
require('./types-60347c5c.js');
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
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./get-cdn-asset-url-2eb06652.js');
require('./get-portal-url-68b1f527.js');
require('./cacheBustUrl-e8fc7455.js');

/**
 * Return a catalog structured for picking featured content.
 * @param user
 * @returns
 */
function getFeaturedContentCatalogs(user) {
    const catalogNames = [
        "myContent",
        "favorites",
        "organization",
        "world",
    ];
    const catalogs = catalogNames.map((name) => {
        const opts = { user };
        const catalog = wellKnownCatalog.getWellKnownCatalog("shared.fields.featuredContent", name, "item", opts);
        return catalog;
    });
    return catalogs;
}

/**
 * @private
 * constructs the complete edit uiSchema for Hub Projects.
 * This defines how the schema properties should be
 * rendered in the project editing experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    var _a;
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
                        labelKey: `${i18nScope}.fields.description.label`,
                        scope: "/properties/description",
                        type: "Control",
                        options: {
                            control: "hub-field-input-rich-text",
                            type: "textarea",
                            helperText: {
                                labelKey: `${i18nScope}.fields.description.helperText`,
                            },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.featuredImage.label`,
                        scope: "/properties/view/properties/featuredImage",
                        type: "Control",
                        options: {
                            control: "hub-field-input-image-picker",
                            imgSrc: getAuthedImageUrl.getAuthedImageUrl((_a = options.view) === null || _a === void 0 ? void 0 : _a.featuredImageUrl, context.requestOptions),
                            maxWidth: 727,
                            maxHeight: 484,
                            aspectRatio: 1.5,
                            helperText: {
                                labelKey: `${i18nScope}.fields.featuredImage.helperText`,
                            },
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
                            extent: await getLocationOptions.getLocationExtent(options.location, context.hubRequestOptions),
                            options: await getLocationOptions.getLocationOptions(options.id, options.type, options.location, context.portal.name, context.hubRequestOptions),
                            noticeTitleElementAriaLevel: 3,
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.searchDiscoverability.label`,
                elements: [
                    getSlugSchemaElement.getSlugSchemaElement(i18nScope),
                    {
                        labelKey: `${i18nScope}.fields.tags.label`,
                        scope: "/properties/tags",
                        type: "Control",
                        options: {
                            control: "hub-field-input-combobox",
                            items: await getTagItems.getTagItems(options.tags, context.portal.id, context.hubRequestOptions),
                            allowCustomValues: true,
                            selectionMode: "multiple",
                            placeholderIcon: "label",
                            helperText: { labelKey: `${i18nScope}.fields.tags.helperText` },
                        },
                    },
                    ...(await getTagItems.fetchCategoriesUiSchemaElement(i18nScope, context)),
                    ...getThumbnailUiSchemaElement.getThumbnailUiSchemaElement(i18nScope, options.thumbnail, options.thumbnailUrl, "project", context.requestOptions),
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.status.label`,
                elements: [
                    {
                        scope: "/properties/status",
                        type: "Control",
                        labelKey: `${i18nScope}.fields.status.label`,
                        options: {
                            control: "hub-field-input-select",
                            enum: {
                                i18nScope: `${i18nScope}.fields.status.enum`,
                            },
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.timeline.label`,
                elements: [
                    {
                        scope: "/properties/view/properties/timeline",
                        type: "Control",
                        options: {
                            control: "arcgis-hub-timeline-editor",
                            showTitleAndDescription: false,
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.featuredContent.label`,
                options: {
                    helperText: {
                        labelKey: `${i18nScope}.sections.featuredContent.helperText`,
                    },
                },
                elements: [
                    {
                        scope: "/properties/view/properties/featuredContentIds",
                        type: "Control",
                        options: {
                            control: "hub-field-input-gallery-picker",
                            targetEntity: "item",
                            catalogs: getFeaturedContentCatalogs(context.currentUser),
                            facets: [
                                {
                                    label: `{{${i18nScope}.fields.featuredContent.facets.type:translate}}`,
                                    key: "type",
                                    display: "multi-select",
                                    field: "type",
                                    options: [],
                                    operation: "OR",
                                    aggLimit: 100,
                                },
                                {
                                    label: `{{${i18nScope}.fields.featuredContent.facets.sharing:translate}}`,
                                    key: "access",
                                    display: "multi-select",
                                    field: "access",
                                    options: [],
                                    operation: "OR",
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.callToAction.label`,
                options: {
                    helperText: {
                        labelKey: `${i18nScope}.sections.callToAction.helperText`,
                    },
                },
                elements: [
                    {
                        scope: "/properties/view/properties/heroActions",
                        type: "Control",
                        options: {
                            control: "hub-composite-input-action-links",
                            type: "button",
                            catalogs: getFeaturedContentCatalogs(context.currentUser),
                            facets: [
                                {
                                    label: `{{${i18nScope}.fields.callToAction.facets.type:translate}}`,
                                    key: "type",
                                    display: "multi-select",
                                    field: "type",
                                    options: [],
                                    operation: "OR",
                                    aggLimit: 100,
                                },
                                {
                                    label: `{{${i18nScope}.fields.callToAction.facets.sharing:translate}}`,
                                    key: "access",
                                    display: "multi-select",
                                    field: "access",
                                    options: [],
                                    operation: "OR",
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.embeds.label`,
                options: {
                    headerTag: "h2",
                    helperText: { labelKey: `${i18nScope}.sections.embeds.helperText` },
                },
                elements: [
                    {
                        scope: "/properties/view/properties/embeds",
                        type: "Control",
                        options: {
                            control: "hub-composite-input-embeds",
                        },
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
