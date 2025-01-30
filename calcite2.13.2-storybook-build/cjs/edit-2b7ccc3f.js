'use strict';

const getPropertyMap = require('./getPropertyMap-030ec7b2.js');
const defaults = require('./defaults-abee9bee.js');
const events = require('./events-7873340d.js');
const search = require('./search-2db68ef4.js');
const registrations = require('./registrations-a6dd52b7.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./types-751ad3a9.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./slugify-826af07b.js');

async function buildEventAssociations(referencedContentIdsByType, referencedContentIds, hubRequestOptions) {
    // filter out content that was removed
    const associations = referencedContentIdsByType.filter(({ entityId }) => referencedContentIds.includes(entityId));
    // get content ids being added
    const added = referencedContentIds.filter((referencedContentId) => !associations.find(({ entityId }) => entityId === referencedContentId));
    if (added.length) {
        // fetch the content being added
        const { results } = await search.searchItems({
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
    const event = Object.assign(Object.assign({}, defaults.buildDefaultEventEntity()), partialEvent);
    // single-day events are created from new-menu, i.e. no endDate field provided
    // so set endDate to startDate
    event.endDate = event.startDate;
    // TODO: how to handle events being discussable vs non-discussable
    const mapper = new getPropertyMap.EventPropertyMapper(getPropertyMap.getPropertyMap());
    let model = mapper.entityToStore(event, defaults.buildDefaultEventRecord());
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
    model = await events.createEvent(Object.assign({ data }, requestOptions));
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
    const eventUpdates = Object.assign(Object.assign({}, defaults.buildDefaultEventEntity()), partialEvent);
    // TODO: how to handle events being discussable vs non-discussable
    const mapper = new getPropertyMap.EventPropertyMapper(getPropertyMap.getPropertyMap());
    let model = mapper.entityToStore(eventUpdates, defaults.buildDefaultEventRecord());
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
    model = await events.updateEvent(Object.assign({ eventId: model.id, data }, requestOptions));
    return mapper.storeToEntity(model, {});
}
async function deleteHubEvent(id, requestOptions) {
    // TODO: update `status` of event to `"removed"` when requestOptions.params.parementDelete is `true`
    // instead of permanently deleting the event when we officially support recycle bin behavior
    await events.deleteEvent(Object.assign({ eventId: id }, requestOptions));
}
/**
 * @private
 * Create an Event registration
 * @param data
 * @param requestOptions
 * @returns Promise<void>
 */
function createHubEventRegistration(data, requestOptions) {
    return registrations.createRegistration(Object.assign({ data }, requestOptions));
}
/**
 * @private
 * Remove an Event Attendee
 * @param id event attendee id
 * @param requestOptions
 * @returns Promise<void>
 */
async function deleteHubEventRegistration(id, requestOptions) {
    await registrations.deleteRegistration(Object.assign({ registrationId: id }, requestOptions));
}

exports.createHubEvent = createHubEvent;
exports.createHubEventRegistration = createHubEventRegistration;
exports.deleteHubEvent = deleteHubEvent;
exports.deleteHubEventRegistration = deleteHubEventRegistration;
exports.updateHubEvent = updateHubEvent;
