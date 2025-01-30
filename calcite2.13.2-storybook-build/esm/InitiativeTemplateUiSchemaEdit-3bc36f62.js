import { g as getThumbnailUiSchemaElement } from './getThumbnailUiSchemaElement-16a6f577.js';
import { b as UiSchemaMessageTypes } from './types-1fca2e83.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import { g as getEntityThumbnailUrl } from './getEntityThumbnailUrl-d6b416fe.js';
import { g as getSlugSchemaElement } from './getSlugSchemaElement-1d860a64.js';
import './get-cdn-asset-url-b2059dc3.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
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

const getRecommendedTemplatesCatalog = (user, i18nScope) => {
    const catalogNames = ["myContent", "organization"];
    const catalogs = catalogNames.map((name) => {
        const opts = { user };
        const catalog = getWellKnownCatalog("initiativeTemplate.fields.recommendedTemplates", name, "item", opts);
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
                                    type: UiSchemaMessageTypes.error,
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
                    getSlugSchemaElement(i18nScope),
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
                    ...getThumbnailUiSchemaElement(i18nScope, options.thumbnail, getEntityThumbnailUrl(options), "initiativeTemplate", context.requestOptions),
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

export { buildUiSchema };
