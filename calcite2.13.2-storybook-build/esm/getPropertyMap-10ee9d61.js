import { P as PropertyMapper, m as mapStoreToEntity, a as mapEntityToStore } from './PropertyMapper-4eb0ac8f.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { b as EventStatus, f as EventAttendanceType, h as EventAccess } from './events-c59246f8.js';
import { H as HubEventAttendanceType, a as HubEventCapacityType } from './types-db540898.js';
import { c as computeLinks, b as getEventSlug, d as getEventThumbnail, g as getLocationFromEvent } from './registrations-431b9788.js';

/**
 * @private
 * Manage forward and backward property mappings to
 * streamline conversion between a Hub Event, and
 * the backing Store objects.
 */
class EventPropertyMapper extends PropertyMapper {
    /**
     * Map properties from a Store object, on to an Entity object.
     *
     * Used when constructing an Entity from a fetched Store object,
     * in which case the Entity should be an empty object (`{}`).
     *
     * Can also be used to apply changes to an Entity from a Store,
     * in which case an existing Entity can be passed in.
     * @param store
     * @param entity
     * @returns
     */
    storeToEntity(store, entity) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const obj = mapStoreToEntity(store, entity, this.mappings);
        obj.type = "Event";
        const access = store.access.toLowerCase();
        if (access === "private" &&
            (store.readGroups.length > 0 || store.editGroups.length > 0)) {
            obj.access = "shared";
        }
        else {
            obj.access = access;
        }
        obj.isCanceled = store.status === EventStatus.CANCELED;
        obj.isPlanned = store.status === EventStatus.PLANNED;
        obj.isRemoved = store.status === EventStatus.REMOVED;
        if (store.attendanceType.includes(EventAttendanceType.IN_PERSON) &&
            store.attendanceType.includes(EventAttendanceType.VIRTUAL)) {
            obj.attendanceType = HubEventAttendanceType.Both;
        }
        else if (store.attendanceType.includes(EventAttendanceType.IN_PERSON)) {
            obj.attendanceType = HubEventAttendanceType.InPerson;
        }
        else {
            obj.attendanceType = HubEventAttendanceType.Online;
        }
        obj.onlineCapacity = (_b = (_a = store.onlineMeeting) === null || _a === void 0 ? void 0 : _a.capacity) !== null && _b !== void 0 ? _b : null;
        obj.onlineCapacityType = ((_c = store.onlineMeeting) === null || _c === void 0 ? void 0 : _c.capacity) ? HubEventCapacityType.Fixed
            : HubEventCapacityType.Unlimited;
        obj.inPersonCapacity = (_d = store.inPersonCapacity) !== null && _d !== void 0 ? _d : null;
        obj.inPersonCapacityType = store.inPersonCapacity
            ? HubEventCapacityType.Fixed
            : HubEventCapacityType.Unlimited;
        obj.onlineDetails = (_f = (_e = store.onlineMeeting) === null || _e === void 0 ? void 0 : _e.details) !== null && _f !== void 0 ? _f : null;
        obj.onlineUrl = (_h = (_g = store.onlineMeeting) === null || _g === void 0 ? void 0 : _g.url) !== null && _h !== void 0 ? _h : null;
        obj.canChangeAccess = [
            store.permission.canSetAccessToPublic,
            store.permission.canSetAccessToOrg,
            store.permission.canSetAccessToPrivate,
        ].every(Boolean);
        obj.canChangeStatus = [
            store.permission.canSetStatusToCancelled,
            store.permission.canSetStatusToRemoved,
        ].some(Boolean);
        obj.referencedContentIds = store.associations.map(({ entityId }) => entityId);
        obj.referencedContentIdsByType = store.associations.map(({ entityId, entityType }) => ({ entityId, entityType }));
        // Handle Dates
        obj.createdDate = new Date(store.createdAt);
        obj.startDateTime = new Date(store.startDateTime);
        obj.endDateTime = new Date(store.endDateTime);
        obj.isPast = obj.endDateTime < new Date();
        obj.createdDateSource = "createdAt";
        obj.updatedDate = new Date(store.updatedAt);
        obj.updatedDateSource = "updatedAt";
        obj.links = computeLinks(store);
        obj.slug = getEventSlug(store);
        obj.thumbnailUrl = getEventThumbnail();
        obj.view = {
            showMap: !!store.location,
        };
        obj.location = getLocationFromEvent(store);
        return obj;
    }
    /**
     * Map properties from an entity object onto a model.
     *
     * Typically the model will already exist, and this
     * method is used to transfer changes to the model
     * prior to storage.
     * @param entity
     * @param store
     * @returns
     */
    entityToStore(entity, store) {
        // TODO: thumbnail & thumbnail url
        const clonedEntity = cloneObject(entity);
        const obj = mapEntityToStore(clonedEntity, store, this.mappings);
        const access = clonedEntity.access;
        if (access === "shared") {
            obj.access = EventAccess.PRIVATE;
        }
        else {
            obj.access = access.toUpperCase();
        }
        if (clonedEntity.isRemoved) {
            obj.status = EventStatus.REMOVED;
        }
        else if (clonedEntity.isCanceled) {
            obj.status = EventStatus.CANCELED;
        }
        else {
            obj.status = EventStatus.PLANNED;
        }
        if (clonedEntity.attendanceType === HubEventAttendanceType.Both) {
            obj.attendanceType = [
                EventAttendanceType.IN_PERSON,
                EventAttendanceType.VIRTUAL,
            ];
        }
        else if (clonedEntity.attendanceType === HubEventAttendanceType.InPerson) {
            obj.attendanceType = [EventAttendanceType.IN_PERSON];
        }
        else {
            obj.attendanceType = [EventAttendanceType.VIRTUAL];
        }
        if ([HubEventAttendanceType.Online, HubEventAttendanceType.Both].includes(clonedEntity.attendanceType)) {
            obj.onlineMeeting = {
                details: clonedEntity.onlineDetails,
                capacity: clonedEntity.onlineCapacityType === HubEventCapacityType.Fixed
                    ? clonedEntity.onlineCapacity
                    : null,
                url: clonedEntity.onlineUrl,
            };
        }
        if ([HubEventAttendanceType.InPerson, HubEventAttendanceType.Both].includes(clonedEntity.attendanceType)) {
            obj.inPersonCapacity =
                clonedEntity.inPersonCapacityType === HubEventCapacityType.Fixed
                    ? clonedEntity.inPersonCapacity
                    : null;
        }
        else {
            obj.inPersonCapacity = null;
        }
        // override startTime & endTime for all-day events
        if (clonedEntity.isAllDay) {
            clonedEntity.startTime = "00:00:00";
            clonedEntity.endTime = "23:59:59";
        }
        obj.location =
            clonedEntity.location && clonedEntity.location.type !== "none"
                ? {
                    type: clonedEntity.location.type,
                    spatialReference: clonedEntity.location.spatialReference,
                    extent: clonedEntity.location.extent,
                    geometries: clonedEntity.location.geometries,
                    placeName: clonedEntity.location.name,
                }
                : null;
        return obj;
    }
}

/**
 * @private
 * Returns an Array of IPropertyMap objects
 * that define the projection of properties from an IEvent to an IHubEvent
 * @returns an IPropertyMap array
 */
function getPropertyMap() {
    const commonPropNames = [
        "orgId",
        "description",
        "id",
        "tags",
        "categories",
        "timeZone",
        "summary",
        "notifyAttendees",
        "allowRegistration",
        "startDate",
        "startTime",
        "endDate",
        "endTime",
    ];
    return commonPropNames.reduce((acc, propName) => [...acc, { entityKey: propName, storeKey: propName }], [
        { entityKey: "isAllDay", storeKey: "allDay" },
        { entityKey: "name", storeKey: "title" },
        { entityKey: "owner", storeKey: "creator.username" },
        { entityKey: "canEdit", storeKey: "permission.canEdit" },
        { entityKey: "canDelete", storeKey: "permission.canDelete" },
        {
            entityKey: "canChangeAccessOrg",
            storeKey: "permission.canSetAccessToOrg",
        },
        {
            entityKey: "canChangeAccessPrivate",
            storeKey: "permission.canSetAccessToPrivate",
        },
        {
            entityKey: "canChangeAccessPublic",
            storeKey: "permission.canSetAccessToPublic",
        },
        {
            entityKey: "canChangeStatusCancelled",
            storeKey: "permission.canSetStatusToCancelled",
        },
        {
            entityKey: "canChangeStatusRemoved",
            storeKey: "permission.canSetStatusToRemoved",
        },
        {
            entityKey: "readGroupIds",
            storeKey: "readGroups",
        },
        {
            entityKey: "editGroupIds",
            storeKey: "editGroups",
        },
        {
            entityKey: "inPersonRegistrationCount",
            storeKey: "registrationCount.inPerson",
        },
        {
            entityKey: "onlineRegistrationCount",
            storeKey: "registrationCount.virtual",
        },
    ]);
}

export { EventPropertyMapper as E, getPropertyMap as g };
