'use strict';

const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const types = require('./types-60347c5c.js');
const getTagItems = require('./getTagItems-b932a39d.js');
require('./get-family-cafa88bb.js');
require('./get-prop-4bd8fc1a.js');
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
require('./request-67da3c71.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');

async function buildUiSchema(i18nScope, options, context) {
    const categoriesUiSchema = await getTagItems.fetchCategoriesUiSchemaElement(`${i18nScope}.content`, context);
    categoriesUiSchema[0].rules = [
        {
            effect: types.UiSchemaRuleEffects.SHOW,
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
                                        effect: types.UiSchemaRuleEffects.SHOW,
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
                                    items: await getTagItems.getTagItems(options.tags, context.portal.id, context.hubRequestOptions),
                                    allowCustomValues: true,
                                    selectionMode: "multiple",
                                    placeholderIcon: "label",
                                },
                                rules: [
                                    {
                                        effect: types.UiSchemaRuleEffects.SHOW,
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
                                        wellKnownCatalog.getWellKnownCatalog(`${i18nScope}.content.entityIds`, "organization", "item", {
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
                                        effect: types.UiSchemaRuleEffects.SHOW,
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
                                        effect: types.UiSchemaRuleEffects.SHOW,
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

exports.buildUiSchema = buildUiSchema;
