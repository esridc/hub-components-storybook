import { g as getDefaultEventDatesAndTimes } from './getDefaultEventDatesAndTimes-4847a519.js';
import { h as EventAccess, f as EventAttendanceType, b as EventStatus } from './events-c59246f8.js';
import { H as HubEventAttendanceType, a as HubEventCapacityType } from './types-db540898.js';

/**
 * Builds a partial IHubEvent (entity) with default values
 */
function buildDefaultEventEntity() {
    const dates = getDefaultEventDatesAndTimes();
    return Object.assign(Object.assign({ access: "private", allowRegistration: true, attendanceType: HubEventAttendanceType.InPerson, categories: [], inPersonCapacity: null, inPersonCapacityType: HubEventCapacityType.Unlimited, isAllDay: false, isCanceled: false, isDiscussable: true, isPlanned: true, isRemoved: false, name: "", notifyAttendees: true, onlineCapacity: null, onlineCapacityType: HubEventCapacityType.Unlimited, onlineDetails: null, onlineUrl: null, referencedContentIds: [], referencedContentIdsByType: [], schemaVersion: 1, tags: [], readGroupIds: [], editGroupIds: [] }, dates), { view: {
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
    const { startDateTime, endDateTime } = getDefaultEventDatesAndTimes();
    return {
        access: EventAccess.PRIVATE,
        allDay: false,
        allowRegistration: true,
        associations: [],
        attendanceType: [EventAttendanceType.IN_PERSON],
        categories: [],
        inPersonCapacity: null,
        editGroups: [],
        endDateTime: endDateTime.toISOString(),
        notifyAttendees: true,
        readGroups: [],
        startDateTime: startDateTime.toISOString(),
        status: EventStatus.PLANNED,
        tags: [],
        title: "",
        location: null,
    };
}

export { buildDefaultEventRecord as a, buildDefaultEventEntity as b };
