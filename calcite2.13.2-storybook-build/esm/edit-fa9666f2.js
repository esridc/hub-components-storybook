import { E as EventPropertyMapper, g as getPropertyMap } from './getPropertyMap-10ee9d61.js';
import { b as buildDefaultEventEntity, a as buildDefaultEventRecord } from './defaults-1f93a79e.js';
import { u as updateEvent, m as deleteEvent, n as createEvent } from './events-c59246f8.js';
import { s as searchItems } from './search-c7a57aa9.js';
import { e as createRegistration, f as deleteRegistration } from './registrations-431b9788.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './types-db540898.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './slugify-e3e67bac.js';

async function buildEventAssociations(referencedContentIdsByType, referencedContentIds, hubRequestOptions) {
    // filter out content that was removed
    const associations = referencedContentIdsByType.filter(({ entityId }) => referencedContentIds.includes(entityId));
    // get content ids being added
    const added = referencedContentIds.filter((referencedContentId) => !associations.find(({ entityId }) => entityId === referencedContentId));
    if (added.length) {
        // fetch the content being added
        const { results } = await searchItems({
            q: added.map((id) => `id:${id}`).join(" OR "),
            num: added.length,
            authentication: hubRequestOptions.authentication,
        });
        // map content to ICreateEventAssociation structures
        const addedAssociations = results.map(({ id, type }) => ({
            entityId: id,
            entityType: type,
        }));
        associations.push(...addedAssociations);
    }
    return associations;
}

/**
 * @private
 * Create a new Hub Event item
 *
 * Minimal properties are name and orgUrlKey
 *
 * @param partialEvent a partial event
 * @param requestOptions user request options
 * @returns promise that resolves an IHubEvent
 */
async function createHubEvent(partialEvent, requestOptions) {
    const event = Object.assign(Object.assign({}, buildDefaultEventEntity()), partialEvent);
    // single-day events are created from new-menu, i.e. no endDate field provided
    // so set endDate to startDate
    event.endDate = event.startDate;
    // TODO: how to handle events being discussable vs non-discussable
    const mapper = new EventPropertyMapper(getPropertyMap());
    let model = mapper.entityToStore(event, buildDefaultEventRecord());
    const associations = await buildEventAssociations(partialEvent.referencedContentIdsByType, partialEvent.referencedContentIds, requestOptions);
    const data = {
        access: model.access,
        allDay: model.allDay,
        allowRegistration: model.allowRegistration,
        associations,
        attendanceType: model.attendanceType,
        categories: model.categories,
        description: model.description,
        editGroups: model.editGroups,
        endDate: model.endDate,
        endTime: model.endTime,
        inPersonCapacity: model.inPersonCapacity,
        notifyAttendees: model.notifyAttendees,
        onlineMeeting: model.onlineMeeting,
        readGroups: model.readGroups,
        startDate: model.startDate,
        startTime: model.startTime,
        summary: model.summary,
        tags: model.tags,
        timeZone: model.timeZone,
        title: model.title,
        location: model.location,
    };
    model = await createEvent(Object.assign({ data }, requestOptions));
    return mapper.storeToEntity(model, {});
}
/**
 * @private
 * Update a Hub Event
 * @param event the event to update
 * @param requestOptions user request options
 * @returns promise that resolves a IHubEvent
 */
async function updateHubEvent(partialEvent, requestOptions) {
    var _a, _b;
    const eventUpdates = Object.assign(Object.assign({}, buildDefaultEventEntity()), partialEvent);
    // TODO: how to handle events being discussable vs non-discussable
    const mapper = new EventPropertyMapper(getPropertyMap());
    let model = mapper.entityToStore(eventUpdates, buildDefaultEventRecord());
    const associations = await buildEventAssociations(partialEvent.referencedContentIdsByType, partialEvent.referencedContentIds, requestOptions);
    const data = {
        access: model.access,
        allDay: model.allDay,
        allowRegistration: model.allowRegistration,
        associations,
        attendanceType: model.attendanceType,
        categories: model.categories,
        description: ((_a = model.description) === null || _a === void 0 ? void 0 : _a.trim()) || null,
        editGroups: model.editGroups,
        endDate: model.endDate,
        endTime: model.endTime,
        inPersonCapacity: model.inPersonCapacity,
        notifyAttendees: model.notifyAttendees,
        onlineMeeting: model.onlineMeeting,
        readGroups: model.readGroups,
        startDate: model.startDate,
        startTime: model.startTime,
        status: model.status,
        summary: ((_b = model.summary) === null || _b === void 0 ? void 0 : _b.trim()) || null,
        tags: model.tags,
        timeZone: model.timeZone,
        title: model.title,
        location: model.location,
    };
    model = await updateEvent(Object.assign({ eventId: model.id, data }, requestOptions));
    return mapper.storeToEntity(model, {});
}
async function deleteHubEvent(id, requestOptions) {
    // TODO: update `status` of event to `"removed"` when requestOptions.params.parementDelete is `true`
    // instead of permanently deleting the event when we officially support recycle bin behavior
    await deleteEvent(Object.assign({ eventId: id }, requestOptions));
}
/**
 * @private
 * Create an Event registration
 * @param data
 * @param requestOptions
 * @returns Promise<void>
 */
function createHubEventRegistration(data, requestOptions) {
    return createRegistration(Object.assign({ data }, requestOptions));
}
/**
 * @private
 * Remove an Event Attendee
 * @param id event attendee id
 * @param requestOptions
 * @returns Promise<void>
 */
async function deleteHubEventRegistration(id, requestOptions) {
    await deleteRegistration(Object.assign({ registrationId: id }, requestOptions));
}

export { createHubEvent, createHubEventRegistration, deleteHubEvent, deleteHubEventRegistration, updateHubEvent };
