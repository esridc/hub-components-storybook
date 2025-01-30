import { a as ENTITY_NAME_SCHEMA, e as ENTITY_LOCATION_SCHEMA, b as ENTITY_SUMMARY_SCHEMA, f as ENTITY_TAGS_SCHEMA, g as ENTITY_CATEGORIES_SCHEMA } from './subschemas-4d56570e.js';
import { H as HubEventAttendanceType, a as HubEventCapacityType } from './types-db540898.js';
import { U as URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID, T as TIME_VALIDATIONS_WHEN_NOT_ALL_DAY, F as FIXED_ONLINE_ATTENDANCE_VALIDATIONS, a as FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS } from './validations-3d61466c.js';

/**
 * @private
 * Builds a schema for creating a new Event that enforces a startDate relative to the user's locale
 */
const buildSchema = () => {
    return {
        $async: true,
        required: ["name", "startDate", "endDate", "timeZone"],
        properties: {
            name: ENTITY_NAME_SCHEMA,
            description: {
                type: "string",
            },
            attendanceType: {
                type: "string",
                enum: [
                    HubEventAttendanceType.InPerson,
                    HubEventAttendanceType.Online,
                    HubEventAttendanceType.Both,
                ],
                default: HubEventAttendanceType.InPerson,
            },
            startDate: {
                type: "string",
                format: "date",
            },
            endDate: {
                type: "string",
                format: "date",
                formatMinimum: {
                    $data: "1/startDate",
                },
            },
            startTime: {
                type: "string",
            },
            endTime: {
                type: "string",
            },
            isAllDay: {
                type: "boolean",
                default: false,
            },
            timeZone: {
                type: "string",
            },
            inPersonCapacity: {
                type: "number",
            },
            inPersonCapacityType: {
                type: "string",
                enum: [HubEventCapacityType.Unlimited, HubEventCapacityType.Fixed],
                default: HubEventCapacityType.Unlimited,
            },
            location: Object.assign(Object.assign({}, ENTITY_LOCATION_SCHEMA), { allOf: [
                    {
                        if: {
                            properties: { type: { enum: ["custom", "org"] } },
                        },
                        then: {
                            required: ["name"],
                        },
                    },
                ] }),
            onlineUrl: {
                type: "string",
            },
            onlineDetails: {
                type: "string",
            },
            onlineCapacity: {
                type: "number",
            },
            onlineCapacityType: {
                type: "string",
                enum: [HubEventCapacityType.Unlimited, HubEventCapacityType.Fixed],
                default: HubEventCapacityType.Unlimited,
            },
            referencedContentIds: {
                type: "array",
                maxItems: 1,
                items: {
                    type: "string",
                },
                default: [],
            },
            summary: ENTITY_SUMMARY_SCHEMA,
            tags: ENTITY_TAGS_SCHEMA,
            categories: ENTITY_CATEGORIES_SCHEMA,
        },
        allOf: [
            URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID,
            TIME_VALIDATIONS_WHEN_NOT_ALL_DAY,
            FIXED_ONLINE_ATTENDANCE_VALIDATIONS,
            FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS,
        ],
    };
};

export { buildSchema };
