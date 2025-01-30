'use strict';

const types = require('./types-60347c5c.js');
const getTagItems = require('./getTagItems-b932a39d.js');
const types$1 = require('./types-751ad3a9.js');
const getLocationOptions = require('./getLocationOptions-323be3c8.js');
const buildReferencedContentSchema = require('./buildReferencedContentSchema-b4f6bb00.js');
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
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');
require('./request-67da3c71.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./extent-715f7c8d.js');
require('./get-prop-4bd8fc1a.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./wellKnownCatalog-799c8326.js');

/**
 * @private
 * constructs the complete edit uiSchema for Hub Events.
 * This defines how the schema properties should be
 * rendered in the event creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.eventInfo.label`,
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
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.dateTime.label`,
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.startDate.label`,
                        scope: "/properties/startDate",
                        type: "Control",
                        options: {
                            control: "hub-field-input-date",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.startDate.requiredError`,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.endDate.label`,
                        scope: "/properties/endDate",
                        type: "Control",
                        options: {
                            control: "hub-field-input-date",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.endDate.requiredError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "formatMinimum",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.endDate.minDateError`,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.allDay.label`,
                        type: "Control",
                        scope: "/properties/isAllDay",
                        options: {
                            control: "hub-field-input-switch",
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.startTime.label`,
                        scope: "/properties/startTime",
                        type: "Control",
                        rule: {
                            condition: {
                                scope: "/properties/isAllDay",
                                schema: { const: false },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-time",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.startTime.requiredError`,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.endTime.label`,
                        scope: "/properties/endTime",
                        type: "Control",
                        rule: {
                            condition: {
                                scope: "/properties/isAllDay",
                                schema: { const: false },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-time",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.endTime.requiredError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "formatExclusiveMinimum",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.endTime.minTimeError`,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.timeZone.label`,
                        scope: "/properties/timeZone",
                        type: "Control",
                        options: {
                            control: "hub-field-input-time-zone",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.timeZone.requiredError`,
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.location.label`,
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.attendanceType.label`,
                        scope: "/properties/attendanceType",
                        type: "Control",
                        options: {
                            control: "hub-field-input-radio-group",
                            enum: { i18nScope: `${i18nScope}.fields.attendanceType` },
                        },
                    },
                    {
                        scope: "/properties/location",
                        type: "Control",
                        labelKey: `${i18nScope}.fields.location.label`,
                        options: {
                            control: "hub-field-input-location-picker",
                            extent: await getLocationOptions.getLocationExtent(options.location, context.hubRequestOptions),
                            options: await getLocationOptions.getLocationOptions(options.id, options.type, options.location, context.portal.name, context.hubRequestOptions),
                            locationNameRequired: true,
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "if",
                                    hidden: true,
                                },
                            ],
                            noticeTitleElementAriaLevel: 3,
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.inPersonCapacityType.label`,
                        scope: "/properties/inPersonCapacityType",
                        type: "Control",
                        rule: {
                            condition: {
                                scope: "/properties/attendanceType",
                                schema: {
                                    enum: [
                                        types$1.HubEventAttendanceType.InPerson,
                                        types$1.HubEventAttendanceType.Both,
                                    ],
                                },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-radio-group",
                            enum: { i18nScope: `${i18nScope}.fields.inPersonCapacityType` },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.inPersonCapacity.label`,
                        scope: "/properties/inPersonCapacity",
                        type: "Control",
                        rule: {
                            condition: {
                                schema: {
                                    properties: {
                                        attendanceType: {
                                            enum: [
                                                types$1.HubEventAttendanceType.InPerson,
                                                types$1.HubEventAttendanceType.Both,
                                            ],
                                        },
                                        inPersonCapacityType: {
                                            const: types$1.HubEventCapacityType.Fixed,
                                        },
                                    },
                                },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-input",
                            type: "number",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.inPersonCapacity.requiredError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "minimum",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.inPersonCapacity.minimumError`,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.onlineUrl.label`,
                        scope: "/properties/onlineUrl",
                        type: "Control",
                        rule: {
                            condition: {
                                scope: "/properties/attendanceType",
                                schema: {
                                    enum: [
                                        types$1.HubEventAttendanceType.Online,
                                        types$1.HubEventAttendanceType.Both,
                                    ],
                                },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-input",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.onlineUrl.requiredError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "format",
                                    icon: true,
                                    labelKey: `shared.errors.urlFormat`,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.onlineDetails.label`,
                        scope: "/properties/onlineDetails",
                        type: "Control",
                        rule: {
                            condition: {
                                scope: "/properties/attendanceType",
                                schema: {
                                    enum: [
                                        types$1.HubEventAttendanceType.Online,
                                        types$1.HubEventAttendanceType.Both,
                                    ],
                                },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-rich-text",
                            type: "textarea",
                            helperText: {
                                labelKey: `${i18nScope}.fields.onlineDetails.helperText`,
                            },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.onlineCapacityType.label`,
                        scope: "/properties/onlineCapacityType",
                        type: "Control",
                        rule: {
                            condition: {
                                scope: "/properties/attendanceType",
                                schema: {
                                    enum: [
                                        types$1.HubEventAttendanceType.Online,
                                        types$1.HubEventAttendanceType.Both,
                                    ],
                                },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-radio-group",
                            enum: { i18nScope: `${i18nScope}.fields.onlineCapacityType` },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.onlineCapacity.label`,
                        scope: "/properties/onlineCapacity",
                        type: "Control",
                        rule: {
                            condition: {
                                schema: {
                                    properties: {
                                        attendanceType: {
                                            enum: [
                                                types$1.HubEventAttendanceType.Online,
                                                types$1.HubEventAttendanceType.Both,
                                            ],
                                        },
                                        onlineCapacityType: {
                                            const: types$1.HubEventCapacityType.Fixed,
                                        },
                                    },
                                },
                            },
                            effect: types.UiSchemaRuleEffects.SHOW,
                        },
                        options: {
                            control: "hub-field-input-input",
                            type: "number",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.onlineCapacity.requiredError`,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "minimum",
                                    icon: true,
                                    labelKey: `${i18nScope}.fields.onlineCapacity.minimumError`,
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.referencedContent.label`,
                elements: [buildReferencedContentSchema.buildReferencedContentSchema(i18nScope, context)],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.discoverability.label`,
                elements: [
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
                            helperText: {
                                labelKey: `${i18nScope}.fields.tags.helperText`,
                            },
                        },
                    },
                    ...(await getTagItems.fetchCategoriesUiSchemaElement(i18nScope, context)),
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
                                    labelKey: `shared.fields.summary.maxLengthError`,
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
