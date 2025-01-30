'use strict';

const types = require('./types-751ad3a9.js');

const TIME_VALIDATIONS_WHEN_NOT_ALL_DAY = {
    if: {
        properties: {
            isAllDay: { const: false },
        },
    },
    then: {
        required: ["startTime", "endTime"],
        properties: {
            endTime: {
                format: "timePickerTime",
                formatExclusiveMinimum: { $data: "1/startTime" },
            },
        },
    },
};
const URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID = {
    if: {
        properties: {
            attendanceType: {
                enum: [types.HubEventAttendanceType.Online, types.HubEventAttendanceType.Both],
            },
        },
    },
    then: {
        required: ["onlineUrl"],
        properties: {
            onlineUrl: {
                format: "url",
            },
        },
    },
};
const FIXED_ONLINE_ATTENDANCE_VALIDATIONS = {
    if: {
        properties: {
            onlineCapacityType: { const: types.HubEventCapacityType.Fixed },
            attendanceType: {
                enum: [types.HubEventAttendanceType.Online, types.HubEventAttendanceType.Both],
            },
        },
    },
    then: {
        required: ["onlineCapacity"],
        properties: {
            onlineCapacity: {
                minimum: 1,
            },
        },
    },
};
const FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS = {
    if: {
        properties: {
            inPersonCapacityType: { const: types.HubEventCapacityType.Fixed },
            attendanceType: {
                enum: [types.HubEventAttendanceType.InPerson, types.HubEventAttendanceType.Both],
            },
        },
    },
    then: {
        required: ["inPersonCapacity"],
        properties: {
            inPersonCapacity: {
                minimum: 1,
            },
        },
    },
};

exports.FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS = FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS;
exports.FIXED_ONLINE_ATTENDANCE_VALIDATIONS = FIXED_ONLINE_ATTENDANCE_VALIDATIONS;
exports.TIME_VALIDATIONS_WHEN_NOT_ALL_DAY = TIME_VALIDATIONS_WHEN_NOT_ALL_DAY;
exports.URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID = URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID;
