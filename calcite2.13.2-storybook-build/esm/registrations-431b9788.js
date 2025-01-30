import { g as getRelativeWorkspaceUrl } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { c as getHubRelativeUrl } from './compose-d5b83ab7.js';
import { s as slugify } from './slugify-e3e67bac.js';
import { i as createRegistration$1, j as authenticateRequest, k as deleteRegistration$1, l as getRegistrations$1 } from './events-c59246f8.js';

/**
 * Builds a slug for the given IEvent record.
 * @param event An IEvent record
 * @returns the slug for the given IEvent record
 */
function getEventSlug(event) {
    return ([slugify(event.title), event.id]
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
    const siteRelative = getHubRelativeUrl("event", getEventSlug(event));
    return {
        self: siteRelative,
        siteRelative,
        siteRelativeEntityType: getHubRelativeUrl("event"),
        workspaceRelative: getRelativeWorkspaceUrl("Event", event.id),
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
    options.token = await authenticateRequest(options);
    return createRegistration$1(options.data, options);
}
/**
 * get registrations
 *
 * @param {IGetRegistrationsParams} options
 * @return {Promise<IPagedRegistrationResponse>}
 */
async function getRegistrations(options) {
    options.token = await authenticateRequest(options);
    return getRegistrations$1(options.data, options);
}
/**
 * delete a registration
 *
 * @param {IDeleteRegistrationParams} options
 * @return {Promise<IRegistration>}
 */
async function deleteRegistration(options) {
    options.token = await authenticateRequest(options);
    return deleteRegistration$1(options.registrationId, options);
}

export { getRegistrations as a, getEventSlug as b, computeLinks as c, getEventThumbnail as d, createRegistration as e, deleteRegistration as f, getLocationFromEvent as g };
