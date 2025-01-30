'use strict';

const getDefaultEventDatesAndTimes = require('./getDefaultEventDatesAndTimes-99ac0275.js');
const events = require('./events-7873340d.js');
const types = require('./types-751ad3a9.js');

/**
 * Builds a partial IHubEvent (entity) with default values
 */
function buildDefaultEventEntity() {
    const dates = getDefaultEventDatesAndTimes.getDefaultEventDatesAndTimes();
    return Object.assign(Object.assign({ access: "private", allowRegistration: true, attendanceType: types.HubEventAttendanceType.InPerson, categories: [], inPersonCapacity: null, inPersonCapacityType: types.HubEventCapacityType.Unlimited, isAllDay: false, isCanceled: false, isDiscussable: true, isPlanned: true, isRemoved: false, name: "", notifyAttendees: true, onlineCapacity: null, onlineCapacityType: types.HubEventCapacityType.Unlimited, onlineDetails: null, onlineUrl: null, referencedContentIds: [], referencedContentIdsByType: [], schemaVersion: 1, tags: [], readGroupIds: [], editGroupIds: [] }, dates), { view: {
            heroActions: [],
            showMap: false,
        }, location: {
            type: "none",
        }, catalogs: [] });
}
/**
 * Builds a partial IEvent (record) with default values
 */
function buildDefaultEventRecord() {
    const { startDateTime, endDateTime } = getDefaultEventDatesAndTimes.getDefaultEventDatesAndTimes();
    return {
        access: events.EventAccess.PRIVATE,
        allDay: false,
        allowRegistration: true,
        associations: [],
        attendanceType: [events.EventAttendanceType.IN_PERSON],
        categories: [],
        inPersonCapacity: null,
        editGroups: [],
        endDateTime: endDateTime.toISOString(),
        notifyAttendees: true,
        readGroups: [],
        startDateTime: startDateTime.toISOString(),
        status: events.EventStatus.PLANNED,
        tags: [],
        title: "",
        location: null,
    };
}

exports.buildDefaultEventEntity = buildDefaultEventEntity;
exports.buildDefaultEventRecord = buildDefaultEventRecord;
