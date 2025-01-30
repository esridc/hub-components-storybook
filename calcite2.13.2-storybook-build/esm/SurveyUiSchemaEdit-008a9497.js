import { g as getTagItems, f as fetchCategoriesUiSchemaElement } from './getTagItems-4324bb78.js';
import { g as getThumbnailUiSchemaElement } from './getThumbnailUiSchemaElement-16a6f577.js';
import './types-1fca2e83.js';
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
import './get-cdn-asset-url-b2059dc3.js';
import './get-portal-url-cc8a77b9.js';

/**
 * @private
 * constructs the complete edit uiSchema for Hub Survey.
 * This defines how the schema properties should be
 * rendered in the survey editing experience
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
                                    labelKey: `shared.fields.title.maxLengthError`,
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
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.searchDiscoverability.label`,
                elements: [
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
                        },
                    },
                    ...(await fetchCategoriesUiSchemaElement(i18nScope, context)),
                    ...getThumbnailUiSchemaElement(i18nScope, options.thumbnail, options.thumbnailUrl, "survey", context.requestOptions),
                ],
            },
        ],
    };
};

export { buildUiSchema };
