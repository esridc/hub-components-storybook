'use strict';

const getRelativeWorkspaceUrl = require('./getRelativeWorkspaceUrl-6dfbafa1.js');
const compose = require('./compose-9b4311c9.js');
const slugify = require('./slugify-826af07b.js');
const events = require('./events-7873340d.js');

/**
 * Builds a slug for the given IEvent record.
 * @param event An IEvent record
 * @returns the slug for the given IEvent record
 */
function getEventSlug(event) {
    return ([slugify.slugify(event.title), event.id]
        .join("-")
        // remove double hyphens
        .split("-")
        .filter(Boolean)
        .join("-"));
}

function getEventThumbnail() {
    return "https://hubcdn.arcgis.com/opendata-ui/assets/ember-arcgis-opendata-components/assets/images/placeholders/event.png";
}

/**
 * Compute the links that get appended to a Hub Event
 * search result and entity
 *
 * @param item
 * @param requestOptions
 */
function computeLinks(event) {
    const siteRelative = compose.getHubRelativeUrl("event", getEventSlug(event));
    return {
        self: siteRelative,
        siteRelative,
        siteRelativeEntityType: compose.getHubRelativeUrl("event"),
        workspaceRelative: getRelativeWorkspaceUrl.getRelativeWorkspaceUrl("Event", event.id),
        thumbnail: getEventThumbnail(),
    };
}

function getLocationFromEvent(event) {
    return event.location
        ? {
            type: event.location.type,
            spatialReference: event.location.spatialReference,
            extent: event.location.extent,
            geometries: event.location.geometries,
            name: event.location.placeName,
        }
        : { type: "none" };
}

/**
 * create an event registration
 *
 * @param {ICreateRegistrationParams} options
 * @return {Promise<IRegistration>}
 */
async function createRegistration(options) {
    options.token = await events.authenticateRequest(options);
    return events.createRegistration(options.data, options);
}
/**
 * get registrations
 *
 * @param {IGetRegistrationsParams} options
 * @return {Promise<IPagedRegistrationResponse>}
 */
async function getRegistrations(options) {
    options.token = await events.authenticateRequest(options);
    return events.getRegistrations(options.data, options);
}
/**
 * delete a registration
 *
 * @param {IDeleteRegistrationParams} options
 * @return {Promise<IRegistration>}
 */
async function deleteRegistration(options) {
    options.token = await events.authenticateRequest(options);
    return events.deleteRegistration(options.registrationId, options);
}

exports.computeLinks = computeLinks;
exports.createRegistration = createRegistration;
exports.deleteRegistration = deleteRegistration;
exports.getEventSlug = getEventSlug;
exports.getEventThumbnail = getEventThumbnail;
exports.getLocationFromEvent = getLocationFromEvent;
exports.getRegistrations = getRegistrations;
