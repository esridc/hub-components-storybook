'use strict';

const subschemas = require('./subschemas-61a41e85.js');
const types = require('./types-751ad3a9.js');
const validations = require('./validations-121c30e3.js');

/**
 * @private
 * Builds a schema for creating a new Event that enforces a startDate relative to the user's locale
 */
const buildSchema = () => {
    return {
        $async: true,
        required: ["name", "startDate", "endDate", "timeZone"],
        properties: {
            name: subschemas.ENTITY_NAME_SCHEMA,
            description: {
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
                enum: [types.HubEventCapacityType.Unlimited, types.HubEventCapacityType.Fixed],
                default: types.HubEventCapacityType.Unlimited,
            },
            location: Object.assign(Object.assign({}, subschemas.ENTITY_LOCATION_SCHEMA), { allOf: [
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
                enum: [types.HubEventCapacityType.Unlimited, types.HubEventCapacityType.Fixed],
                default: types.HubEventCapacityType.Unlimited,
            },
            referencedContentIds: {
                type: "array",
                maxItems: 1,
                items: {
                    type: "string",
                },
                default: [],
            },
            summary: subschemas.ENTITY_SUMMARY_SCHEMA,
            tags: subschemas.ENTITY_TAGS_SCHEMA,
            categories: subschemas.ENTITY_CATEGORIES_SCHEMA,
        },
        allOf: [
            validations.URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID,
            validations.TIME_VALIDATIONS_WHEN_NOT_ALL_DAY,
            validations.FIXED_ONLINE_ATTENDANCE_VALIDATIONS,
            validations.FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS,
        ],
    };
};

exports.buildSchema = buildSchema;
