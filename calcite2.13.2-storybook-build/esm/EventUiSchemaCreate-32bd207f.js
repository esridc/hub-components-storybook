import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { a as getDatePickerDate } from './getDefaultEventDatesAndTimes-4847a519.js';
import { H as HubEventAttendanceType } from './types-db540898.js';
import { b as buildReferencedContentSchema } from './buildReferencedContentSchema-f19ff807.js';
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
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './wellKnownCatalog-7e9f7f53.js';
import './get-family-543fac52.js';
import './get-prop-ec5be510.js';

/**
 * @private
 * constructs the complete create uiSchema for Hub Events.
 * This defines how the schema properties should be
 * rendered in the event creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    const minStartDate = getDatePickerDate(new Date(), options.timeZone);
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
                    effect: UiSchemaRuleEffects.SHOW,
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
                    effect: UiSchemaRuleEffects.SHOW,
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
                                HubEventAttendanceType.Online,
                                HubEventAttendanceType.Both,
                            ],
                        },
                    },
                    effect: UiSchemaRuleEffects.SHOW,
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
            buildReferencedContentSchema(i18nScope, context, `{{${i18nScope}.fields.referencedContent.label:translate}}`),
        ],
    };
};

export { buildUiSchema };
