'use strict';

const subschemas = require('./subschemas-61a41e85.js');
const getDefaultEventDatesAndTimes = require('./getDefaultEventDatesAndTimes-99ac0275.js');
const types = require('./types-751ad3a9.js');
const validations = require('./validations-121c30e3.js');

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
    const { startDate } = getDefaultEventDatesAndTimes.getDefaultEventDatesAndTimes();
    return {
        $async: true,
        required: ["name", "startDate", "endDate"],
        properties: {
            name: subschemas.ENTITY_NAME_SCHEMA,
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
                    types.HubEventAttendanceType.InPerson,
                    types.HubEventAttendanceType.Online,
                    types.HubEventAttendanceType.Both,
                ],
                default: types.HubEventAttendanceType.InPerson,
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
            validations.URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID,
            validations.TIME_VALIDATIONS_WHEN_NOT_ALL_DAY,
        ],
    };
};

exports.EventEditorTypes = EventEditorTypes;
exports.buildSchema = buildSchema;
