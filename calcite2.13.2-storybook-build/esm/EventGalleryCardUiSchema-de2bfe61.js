import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { f as fetchCategoriesUiSchemaElement, g as getTagItems } from './getTagItems-4324bb78.js';
import './get-family-543fac52.js';
import './get-prop-ec5be510.js';
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

async function buildUiSchema(i18nScope, options, context) {
    const categoriesUiSchema = await fetchCategoriesUiSchemaElement(`${i18nScope}.content`, context);
    categoriesUiSchema[0].rules = [
        {
            effect: UiSchemaRuleEffects.SHOW,
            conditions: [
                {
                    scope: "/properties/selectionMode",
                    schema: { const: "dynamic" },
                },
            ],
        },
    ];
    delete categoriesUiSchema[0].options.helperText;
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                options: {
                    section: "accordion",
                    selectionMode: "single",
                },
                elements: [
                    {
                        type: "Section",
                        label: `{{${i18nScope}.content.label:translate}}`,
                        options: {
                            section: "accordionItem",
                            expanded: true,
                        },
                        elements: [
                            {
                                scope: "/properties/selectionMode",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-radio-group",
                                    enum: {
                                        i18nScope: `${i18nScope}.content.selectionMode`,
                                    },
                                    width: "full",
                                },
                            },
                            {
                                label: `{{${i18nScope}.content.access.label:translate}}`,
                                scope: "/properties/access",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-tile-select",
                                    descriptions: [
                                        `{{${i18nScope}.content.access.private.description:translate}}`,
                                        `{{${i18nScope}.content.access.org.description:translate}}`,
                                        `{{${i18nScope}.content.access.public.description:translate}}`,
                                    ],
                                    icons: ["users", "organization", "globe"],
                                    labels: [
                                        `{{${i18nScope}.content.access.private.label:translate}}`,
                                        `{{${i18nScope}.content.access.org.label:translate}}`,
                                        `{{${i18nScope}.content.access.public.label:translate}}`,
                                    ],
                                    type: "checkbox",
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            {
                                                scope: "/properties/selectionMode",
                                                schema: { const: "dynamic" },
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: `{{${i18nScope}.content.tags.label:translate}}`,
                                scope: "/properties/tags",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-combobox",
                                    items: await getTagItems(options.tags, context.portal.id, context.hubRequestOptions),
                                    allowCustomValues: true,
                                    selectionMode: "multiple",
                                    placeholderIcon: "label",
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            {
                                                scope: "/properties/selectionMode",
                                                schema: { const: "dynamic" },
                                            },
                                        ],
                                    },
                                ],
                            },
                            ...categoriesUiSchema,
                            {
                                scope: "/properties/entityIds",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-gallery-picker",
                                    targetEntity: "item",
                                    catalogs: [
                                        getWellKnownCatalog(`${i18nScope}.content.entityIds`, "organization", "item", {
                                            user: context.currentUser,
                                            collectionNames: ["site", "initiative", "project"],
                                            filters: [],
                                            context,
                                        }),
                                    ],
                                    facets: [
                                        {
                                            label: "{{facets.from.label:translate}}",
                                            key: "from",
                                            display: "single-select",
                                            operation: "OR",
                                            options: [
                                                {
                                                    label: "{{facets.from.myContent.label:translate}}",
                                                    key: "myContent",
                                                    selected: true,
                                                    predicates: [
                                                        {
                                                            owner: context.currentUser.username,
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: "{{facets.from.myOrganization.label:translate}}",
                                                    key: "myOrganization",
                                                    selected: false,
                                                    predicates: [
                                                        {
                                                            orgId: context.currentUser.orgId,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: "{{facets.sharing.label:translate}}",
                                            key: "access",
                                            field: "access",
                                            display: "multi-select",
                                            operation: "OR",
                                        },
                                    ],
                                    width: "full",
                                    kind: "brand",
                                    appearance: "solid",
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            {
                                                scope: "/properties/selectionMode",
                                                schema: { const: "dynamic" },
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                scope: "/properties/eventIds",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-gallery-picker",
                                    targetEntity: "event",
                                    catalogs: [
                                        {
                                            schemaVersion: 1,
                                            title: "{{catalogs.event.label:translate}}",
                                            scopes: {
                                                event: {
                                                    targetEntity: "event",
                                                    filters: [
                                                        {
                                                            predicates: [
                                                                { orgid: context.currentUser.orgId },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                            collections: [
                                                {
                                                    key: "event",
                                                    label: "{{catalogs.event.collections.event.label:translate}}",
                                                    targetEntity: "event",
                                                    include: [],
                                                    scope: {
                                                        targetEntity: "event",
                                                        filters: [
                                                            {
                                                                predicates: [],
                                                            },
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                    facets: [
                                        {
                                            label: "{{facets.from.label:translate}}",
                                            key: "from",
                                            display: "single-select",
                                            operation: "OR",
                                            options: [
                                                {
                                                    label: "{{facets.from.myContent.label:translate}}",
                                                    key: "myContent",
                                                    selected: true,
                                                    predicates: [
                                                        {
                                                            owner: context.currentUser.id,
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: "{{facets.from.myOrganization.label:translate}}",
                                                    key: "myOrganization",
                                                    selected: false,
                                                    predicates: [
                                                        {
                                                            orgId: context.currentUser.orgId,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: "{{facets.sharing.label:translate}}",
                                            key: "access",
                                            display: "multi-select",
                                            operation: "OR",
                                            options: [
                                                {
                                                    label: "{{facets.sharing.public.label:translate}}",
                                                    key: "public",
                                                    selected: false,
                                                    predicates: [
                                                        {
                                                            access: "public",
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: "{{facets.sharing.private.label:translate}}",
                                                    key: "private",
                                                    selected: false,
                                                    predicates: [
                                                        {
                                                            access: "private",
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: "{{facets.sharing.organization.label:translate}}",
                                                    key: "org",
                                                    selected: false,
                                                    predicates: [
                                                        {
                                                            access: "org",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                    width: "full",
                                    kind: "brand",
                                    appearance: "solid",
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            {
                                                scope: "/properties/selectionMode",
                                                schema: { const: "manual" },
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "Slot",
                                options: {
                                    name: "add-content-slot",
                                },
                            },
                        ],
                    },
                    {
                        type: "Section",
                        label: `{{${i18nScope}.appearance.label:translate}}`,
                        options: {
                            section: "accordionItem",
                        },
                        elements: [
                            {
                                label: `{{${i18nScope}.appearance.titleHeading.label:translate}}`,
                                scope: "/properties/titleHeading",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-radio-group",
                                    enum: {
                                        i18nScope: `${i18nScope}.appearance.titleHeading`,
                                    },
                                    width: "full",
                                    tooltip: {
                                        label: `{{${i18nScope}.appearance.titleHeading.tooltip:translate}}`,
                                    },
                                },
                            },
                            {
                                label: `{{${i18nScope}.appearance.corners.label:translate}}`,
                                scope: "/properties/corners",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-select",
                                    enum: {
                                        i18nScope: `${i18nScope}.appearance.corners`,
                                    },
                                },
                            },
                            {
                                label: `{{${i18nScope}.appearance.shadow.label:translate}}`,
                                scope: "/properties/shadow",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-select",
                                    enum: {
                                        i18nScope: `${i18nScope}.appearance.shadow`,
                                    },
                                },
                            },
                            {
                                label: `{{${i18nScope}.appearance.showAdditionalInfo.label:translate}}`,
                                scope: "/properties/showAdditionalInfo",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-switch",
                                    layout: "inline-space-between",
                                },
                            },
                            {
                                label: `{{${i18nScope}.appearance.layout.label:translate}}`,
                                options: {
                                    control: "hub-field-input-select",
                                    enum: { i18nScope: `${i18nScope}.appearance.layout` },
                                },
                                scope: "/properties/layout",
                                type: "Control",
                            },
                        ],
                    },
                    {
                        type: "Section",
                        label: `{{${i18nScope}.options.label:translate}}`,
                        options: {
                            section: "accordionItem",
                        },
                        elements: [
                            {
                                label: `{{${i18nScope}.options.openIn.label:translate}}`,
                                scope: "/properties/openIn",
                                type: "Control",
                                options: {
                                    control: "hub-field-input-select",
                                    enum: {
                                        i18nScope: `${i18nScope}.options.openIn`,
                                    },
                                },
                            },
                            {
                                type: "Notice",
                                options: {
                                    notice: {
                                        configuration: {
                                            id: "open-in-notice",
                                            noticeType: "notice",
                                            closeable: false,
                                            kind: "brand",
                                            scale: "m",
                                        },
                                        title: `{{${i18nScope}.options.openIn.notice.title:translate}}`,
                                        body: `{{${i18nScope}.options.openIn.notice.body:translate}}`,
                                        autoShow: true,
                                        actions: [
                                            {
                                                label: `{{${i18nScope}.options.openIn.notice.link:translate}}`,
                                                ariaLabel: `{{${i18nScope}.options.openIn.notice.linkAriaLabel:translate}}`,
                                                icon: "launch",
                                                href: "https://www.w3.org/TR/WCAG20-TECHS/G200.html",
                                                target: "_blank",
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
}

export { buildUiSchema };
