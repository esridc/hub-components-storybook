import { H as HubEventAttendanceType, a as HubEventCapacityType } from './types-db540898.js';

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
                enum: [HubEventAttendanceType.Online, HubEventAttendanceType.Both],
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
            onlineCapacityType: { const: HubEventCapacityType.Fixed },
            attendanceType: {
                enum: [HubEventAttendanceType.Online, HubEventAttendanceType.Both],
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
            inPersonCapacityType: { const: HubEventCapacityType.Fixed },
            attendanceType: {
                enum: [HubEventAttendanceType.InPerson, HubEventAttendanceType.Both],
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

export { FIXED_ONLINE_ATTENDANCE_VALIDATIONS as F, TIME_VALIDATIONS_WHEN_NOT_ALL_DAY as T, URL_VALIDATIONS_WHEN_ONLINE_OR_HYBRID as U, FIXED_IN_PERSON_ATTENDANCE_VALIDATIONS as a };
