import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { f as fetchCategoriesUiSchemaElement, g as getTagItems } from './getTagItems-4324bb78.js';
import { g as getLocationExtent, a as getLocationOptions } from './getLocationOptions-cf27610b.js';
import { g as getThumbnailUiSchemaElement } from './getThumbnailUiSchemaElement-16a6f577.js';
import { g as getAuthedImageUrl } from './getAuthedImageUrl-2df43f94.js';
import { g as getSlugSchemaElement } from './getSlugSchemaElement-1d860a64.js';
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
import './request-fa80ae40.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './extent-34a4ba2a.js';
import './get-prop-ec5be510.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './get-cdn-asset-url-b2059dc3.js';
import './get-portal-url-cc8a77b9.js';
import './cacheBustUrl-082c34f5.js';

/**
 * @private
 * constructs the complete edit uiSchema for Hub Initiative.
 * This defines how the schema properties should be
 * rendered in the initiative editing experience
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
                    {
                        labelKey: `${i18nScope}.fields.featuredImage.label`,
                        scope: "/properties/view/properties/featuredImage",
                        type: "Control",
                        rule: {
                            effect: UiSchemaRuleEffects.HIDE,
                            condition: {
                                scope: "/properties/view/properties/hero",
                                schema: { const: "map" },
                            },
                        },
                        options: {
                            control: "hub-field-input-image-picker",
                            imgSrc: getAuthedImageUrl((_a = options.view) === null || _a === void 0 ? void 0 : _a.featuredImageUrl, context.requestOptions),
                            maxWidth: 727,
                            maxHeight: 484,
                            aspectRatio: 1.5,
                            sizeDescription: {
                                labelKey: `${i18nScope}.fields.featuredImage.sizeDescription`,
                            },
                            helperText: {
                                labelKey: `${i18nScope}.fields.featuredImage.helperText`,
                            },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.featuredImage.altText.label`,
                        scope: "/properties/view/properties/featuredImageAltText",
                        type: "Control",
                        rule: {
                            effect: UiSchemaRuleEffects.HIDE,
                            condition: {
                                scope: "/properties/view/properties/hero",
                                schema: { const: "map" },
                            },
                        },
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
                            extent: await getLocationExtent(options.location, context.hubRequestOptions),
                            options: await getLocationOptions(options.id, options.type, options.location, context.portal.name, context.hubRequestOptions),
                            noticeTitleElementAriaLevel: 3,
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.searchDiscoverability.label`,
                elements: [
                    getSlugSchemaElement(i18nScope),
                    ...(await fetchCategoriesUiSchemaElement(i18nScope, context)),
                    {
                        labelKey: `${i18nScope}.fields.tags.label`,
                        scope: "/properties/tags",
                        type: "Control",
                        options: {
                            control: "hub-field-input-combobox",
                            items: await getTagItems(options.tags, context.portal.id, context.hubRequestOptions),
                            allowCustomValues: true,
                            selectionMode: "multiple",
                            placeholderIcon: "label",
                            helperText: { labelKey: `${i18nScope}.fields.tags.helperText` },
                        },
                    },
                    ...getThumbnailUiSchemaElement(i18nScope, options.thumbnail, options.thumbnailUrl, "initiative", context.requestOptions),
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
        ],
    };
};

export { buildUiSchema };
