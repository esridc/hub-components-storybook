import { a as ENTITY_NAME_SCHEMA } from './subschemas-4d56570e.js';
import { g as getDefaultEventDatesAndTimes } from './getDefaultEventDatesAndTimes-4847a519.js';
import { H as HubEventAttendanceType } from './types-db540898.js';
import { U as URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID, T as TIME_VALIDATIONS_WHEN_NOT_ALL_DAY } from './validations-3d61466c.js';

const EventEditorTypes = [
    "hub:event:create",
    "hub:event:edit",
    "hub:event:registrants",
];
/**
 * @private
 * Builds a schema for creating a new Event that enforces a startDate relative to the user's locale
 */
const buildSchema = () => {
    const { startDate } = getDefaultEventDatesAndTimes();
    return {
        $async: true,
        required: ["name", "startDate", "endDate"],
        properties: {
            name: ENTITY_NAME_SCHEMA,
            startDate: {
                type: "string",
                format: "date",
                formatMinimum: startDate,
            },
            startTime: {
                type: "string",
            },
            endTime: {
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
            isAllDay: {
                type: "boolean",
                default: false,
            },
            onlineUrl: {
                type: "string",
            },
            referencedContentIds: {
                type: "array",
                maxItems: 1,
                items: {
                    type: "string",
                },
                default: [],
            },
        },
        allOf: [
            URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID,
            TIME_VALIDATIONS_WHEN_NOT_ALL_DAY,
        ],
    };
};

export { EventEditorTypes, buildSchema };
