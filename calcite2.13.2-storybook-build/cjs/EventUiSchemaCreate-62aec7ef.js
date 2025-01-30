'use strict';

const types = require('./types-60347c5c.js');
const getDefaultEventDatesAndTimes = require('./getDefaultEventDatesAndTimes-99ac0275.js');
const types$1 = require('./types-751ad3a9.js');
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
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');
require('./wellKnownCatalog-799c8326.js');
require('./get-family-cafa88bb.js');
require('./get-prop-4bd8fc1a.js');

/**
 * @private
 * constructs the complete create uiSchema for Hub Events.
 * This defines how the schema properties should be
 * rendered in the event creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    const minStartDate = getDefaultEventDatesAndTimes.getDatePickerDate(new Date(), options.timeZone);
    return {
        type: "Layout",
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
                labelKey: `${i18nScope}.fields.date.label`,
                scope: "/properties/startDate",
                type: "Control",
                options: {
                    control: "hub-field-input-date",
                    min: minStartDate,
                    messages: [
                        {
                            type: "ERROR",
                            keyword: "required",
                            icon: true,
                            labelKey: `${i18nScope}.fields.date.requiredError`,
                        },
                        {
                            type: "ERROR",
                            keyword: "formatMinimum",
                            icon: true,
                            labelKey: `${i18nScope}.fields.date.minDateError`,
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
                labelKey: `${i18nScope}.fields.attendanceType.label`,
                scope: "/properties/attendanceType",
                type: "Control",
                options: {
                    control: "hub-field-input-radio-group",
                    enum: { i18nScope: `${i18nScope}.fields.attendanceType` },
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
            buildReferencedContentSchema.buildReferencedContentSchema(i18nScope, context, `{{${i18nScope}.fields.referencedContent.label:translate}}`),
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
