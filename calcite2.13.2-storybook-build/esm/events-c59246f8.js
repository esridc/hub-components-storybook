/**
 * return a token created using options.authentication or set on options.token
 *
 * @export
 * @param {IEventsRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest(options) {
    const { token, authentication } = options;
    if (authentication) {
        return authentication.getToken(authentication.portal);
    }
    return Promise.resolve(token);
}

async function customClient(orvalParams, customParams) {
    const { url, method, data } = orvalParams;
    const { mode, cache, credentials } = customParams;
    const { headers, params } = combineParams(orvalParams, customParams);
    const baseUrl = removeTrailingSlash(customParams.hubApiUrl);
    const requestUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
    const requestOptions = {
        headers,
        method,
        cache,
        credentials,
        mode,
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
    const res = await fetch(requestUrl, requestOptions);
    const { statusText, status } = res;
    if (res.ok) {
        return res.json();
    }
    const error = await res.json();
    throw new RemoteServerError(statusText, requestUrl, status, JSON.stringify(error.message));
}
function removeTrailingSlash(hubApiUrl = "https://hub.arcgis.com") {
    return hubApiUrl.replace(/\/$/, "");
}
function combineParams(orvalParams, options) {
    const headers = new Headers(Object.assign(Object.assign({}, orvalParams.headers), options.headers));
    if (options.token) {
        headers.set("Authorization", options.token);
    }
    const params = Object.assign(Object.assign({}, orvalParams.params), options.params);
    return { headers, params };
}
class RemoteServerError extends Error {
    constructor(message, url, status, error) {
        super(message);
        this.status = status;
        this.url = url;
        this.error = error;
    }
}

var RegistrationSort;
(function (RegistrationSort) {
    RegistrationSort["createdAt"] = "createdAt";
    RegistrationSort["updatedAt"] = "updatedAt";
    RegistrationSort["firstName"] = "firstName";
    RegistrationSort["lastName"] = "lastName";
    RegistrationSort["username"] = "username";
})(RegistrationSort || (RegistrationSort = {}));
var EventSortOrder;
(function (EventSortOrder) {
    EventSortOrder["asc"] = "asc";
    EventSortOrder["desc"] = "desc";
})(EventSortOrder || (EventSortOrder = {}));
var EventSort;
(function (EventSort) {
    EventSort["title"] = "title";
    EventSort["startDateTime"] = "startDateTime";
    EventSort["createdAt"] = "createdAt";
    EventSort["updatedAt"] = "updatedAt";
})(EventSort || (EventSort = {}));
var RegistrationStatus;
(function (RegistrationStatus) {
    RegistrationStatus["PENDING"] = "PENDING";
    RegistrationStatus["ACCEPTED"] = "ACCEPTED";
    RegistrationStatus["DECLINED"] = "DECLINED";
    RegistrationStatus["BLOCKED"] = "BLOCKED";
})(RegistrationStatus || (RegistrationStatus = {}));
var RegistrationRole;
(function (RegistrationRole) {
    RegistrationRole["OWNER"] = "OWNER";
    RegistrationRole["ORGANIZER"] = "ORGANIZER";
    RegistrationRole["ATTENDEE"] = "ATTENDEE";
})(RegistrationRole || (RegistrationRole = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus["PLANNED"] = "PLANNED";
    EventStatus["CANCELED"] = "CANCELED";
    EventStatus["REMOVED"] = "REMOVED";
})(EventStatus || (EventStatus = {}));
var EventLocationType;
(function (EventLocationType) {
    EventLocationType["none"] = "none";
    EventLocationType["custom"] = "custom";
    EventLocationType["org"] = "org";
    EventLocationType["item"] = "item";
})(EventLocationType || (EventLocationType = {}));
var EventAttendanceType;
(function (EventAttendanceType) {
    EventAttendanceType["VIRTUAL"] = "VIRTUAL";
    EventAttendanceType["IN_PERSON"] = "IN_PERSON";
})(EventAttendanceType || (EventAttendanceType = {}));
var EventAssociationEntityType;
(function (EventAssociationEntityType) {
    EventAssociationEntityType["Hub_Site_Application"] = "Hub Site Application";
    EventAssociationEntityType["Hub_Initiative"] = "Hub Initiative";
    EventAssociationEntityType["Hub_Project"] = "Hub Project";
})(EventAssociationEntityType || (EventAssociationEntityType = {}));
var EventAccess;
(function (EventAccess) {
    EventAccess["PRIVATE"] = "PRIVATE";
    EventAccess["ORG"] = "ORG";
    EventAccess["PUBLIC"] = "PUBLIC";
})(EventAccess || (EventAccess = {}));
const createEvent$1 = (iCreateEvent, options) => {
    return customClient({
        url: `/api/events/v1/events`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iCreateEvent,
    }, options);
};
const getEvents$1 = (params, options) => {
    return customClient({ url: `/api/events/v1/events`, method: "GET", params }, options);
};
const getEvent$1 = (id, options) => {
    return customClient({ url: `/api/events/v1/events/${id}`, method: "GET" }, options);
};
const updateEvent$1 = (id, iUpdateEvent, options) => {
    return customClient({
        url: `/api/events/v1/events/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: iUpdateEvent,
    }, options);
};
const deleteEvent$1 = (id, options) => {
    return customClient({ url: `/api/events/v1/events/${id}`, method: "DELETE" }, options);
};
const createRegistration = (iCreateRegistration, options) => {
    return customClient({
        url: `/api/events/v1/registrations`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: iCreateRegistration,
    }, options);
};
const getRegistrations = (params, options) => {
    return customClient({ url: `/api/events/v1/registrations`, method: "GET", params }, options);
};
const deleteRegistration = (id, options) => {
    return customClient({ url: `/api/events/v1/registrations/${id}`, method: "DELETE" }, options);
};

/**
 * create an event
 *
 * @param {ICreateEventParams} options
 * @return {Promise<IEvent>}
 */
async function createEvent(options) {
    options.token = await authenticateRequest(options);
    return createEvent$1(options.data, options);
}
/**
 * get events
 *
 * @param {IGetEventsParams} options
 * @return {Promise<IPagedEventResponse>}
 */
async function getEvents(options) {
    options.token = await authenticateRequest(options);
    return getEvents$1(options.data, options);
}
/**
 * get an event
 *
 * @param {IGetEventParams} options
 * @return {Promise<IEvent>}
 */
async function getEvent(options) {
    options.token = await authenticateRequest(options);
    return getEvent$1(options.eventId, options);
}
/**
 * update an event
 *
 * @param {IUpdateEventParams} options
 * @return {Promise<IEvent>}
 */
async function updateEvent(options) {
    options.token = await authenticateRequest(options);
    return updateEvent$1(options.eventId, options.data, options);
}
/**
 * delete an event
 *
 * @param {IDeleteEventParams} options
 * @return {Promise<IEvent>}
 */
async function deleteEvent(options) {
    options.token = await authenticateRequest(options);
    return deleteEvent$1(options.eventId, options);
}

export { EventSort as E, RegistrationSort as R, EventSortOrder as a, EventStatus as b, getEvents as c, RegistrationRole as d, RegistrationStatus as e, EventAttendanceType as f, getEvent as g, EventAccess as h, createRegistration as i, authenticateRequest as j, deleteRegistration as k, getRegistrations as l, deleteEvent as m, createEvent as n, updateEvent as u };
