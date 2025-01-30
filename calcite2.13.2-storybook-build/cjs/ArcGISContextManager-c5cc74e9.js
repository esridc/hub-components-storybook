'use strict';

const util = require('./util-38e73510.js');
const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const failSafe = require('./fail-safe-33c35b7f.js');
const request = require('./request-67da3c71.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getPortalUrl = require('./get-portal-url-68b1f527.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const getUser = require('./get-user-5eecc1c4.js');
const getPortalBaseFromOrgUrl = require('./getPortalBaseFromOrgUrl-393e8178.js');
const logger = require('./logger-5db3d659.js');
const encoding = require('./encoding-211adb23.js');
const UserSession = require('./UserSession-f8bc10c8.js');
const getPortal = require('./get-portal-6ca924c2.js');

// Helper used to verify object size before storing resource
function getObjectSize(object) {
    // javascript stores strings in unicode, so 2 bytes per char
    const bytes = JSON.stringify(object).length * 2;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    return {
        bytes,
        kilobytes,
        megabytes,
    };
}

// These Types and Functions can land in rest-js
/**
 * @private
 * Set a User-App-Resource
 * By default this will fetch and merge with an existing resource.
 * Passing `true` as the last parameter,
 * @param resource
 * @param username
 * @param portalUrl
 * @param token
 * @param replace
 * @returns
 */
async function setUserResource(resource, username, portalUrl, token, replace = false) {
    // Ensure we are below 5MB max size
    if (getObjectSize(resource.data).megabytes > 4.95) {
        throw new Error(`User Resource is too large to store. Please ensure it is less than 5MB in size`);
    }
    let payload = resource.data;
    if (!replace) {
        const fsGetResource = failSafe.failSafe(getUserResource, {});
        const currentResource = await fsGetResource(username, resource.key, portalUrl, token);
        // extend current object witn updated object
        payload = Object.assign(Object.assign({}, currentResource), resource.data);
    }
    const ro = {
        portal: portalUrl,
        httpMethod: "POST",
        params: {
            text: JSON.stringify(payload),
            access: resource.access,
            key: resource.key,
            token,
        },
    };
    // TODO Experiment w/ how we can make this call w/o creating a UserSession with the token
    return request.request(`${portalUrl}/sharing/rest/community/users/${username}/addResource`, ro);
}
/**
 * @private
 * Gets a user app resource
 * If the resource does not exist, this will throw. This can be wrapped in `failSafe`
 * configured to return an empty object.
 * @param username
 * @param key
 * @param portalUrl
 * @param token
 * @returns
 */
function getUserResource(username, key, portalUrl, token) {
    const ro = {
        portal: portalUrl,
    };
    return request.request(`${portalUrl}/sharing/rest/community/users/${username}/resources/${key}?token=${token}`, ro);
}

const USER_SITE_SETTINGS_APP = "self";
const USER_SITE_SETTINGS_KEY = "hub-site-settings.json";

const USER_HUB_SETTINGS_APP = "hubforarcgis";
const USER_HUB_SETTINGS_KEY = "hub-settings.json";

/**
 * Apply migrations for Site Settings
 * @param settings
 * @returns
 */
function applySiteSettingsMigrations(settings) {
    // const currentSchema = 1;
    return util.cloneObject(settings);
}
/**
 * Apply migrations for Hub Settings
 * @param settings
 * @returns
 */
function applyHubSettingsMigrations(settings) {
    // const currentSchema = 1;
    return util.cloneObject(settings);
}

/**
 * @private
 * Fetch the User Hub Settings and apply migrations
 * Caller is responsible for ensuring the passed token
 * is assoicated with the `hubforarcgis` client id
 * @param username
 * @param portalUrl
 * @param token
 * @returns
 */
async function fetchAndMigrateUserHubSettings(username, portalUrl, token) {
    // create failsafe function that returns a default Hub Settings object
    const fsGetResource = failSafe.failSafe(getUserResource, getDefaultUserHubSettings(username));
    // fetch the user's Hub Settings
    const settings = await fsGetResource(username, USER_HUB_SETTINGS_KEY, portalUrl, token);
    // apply any migrations and return the result
    return applyHubSettingsMigrations(settings);
}
/**
 * Get a default Hub Settings object for a user
 * This will be run through migrations, so it's ok if it's not the latest version
 * @param username
 * @returns
 */
function getDefaultUserHubSettings(username) {
    return {
        schemaVersion: 1,
        username,
        updated: new Date().getTime(),
        preview: {
            workspace: false,
        },
    };
}

/**
 * Store User settings in the Site App's cache
 * @param settings
 * @param context
 * @param replace
 * @returns
 */
async function updateUserSiteSettings(settings, context, replace = false) {
    const token = context.tokenFor(USER_SITE_SETTINGS_APP);
    if (token) {
        // always stamp in the updated and username properties
        settings.updated = new Date().getTime();
        settings.username = context.currentUser.username;
        const resource = {
            key: USER_SITE_SETTINGS_KEY,
            data: settings,
            access: "userappprivate",
        };
        return setUserResource(resource, context.currentUser.username, context.portalUrl, token, replace);
    }
    else {
        throw new Error(`No user-app-resource token available to store Site Settings`);
    }
}
/**
 * Fetch the user's settings for the current Site
 * @param context
 * @returns
 */
async function fetchUserSiteSettings(context) {
    const token = context.tokenFor(USER_SITE_SETTINGS_APP);
    if (token) {
        const settings = (await getUserResource(context.currentUser.username, USER_SITE_SETTINGS_KEY, context.portalUrl, token));
        // run though schema upgrades
        return applySiteSettingsMigrations(settings);
    }
    else {
        return Promise.resolve(null);
    }
}
/**
 * Store the current user's Hub settings as a User App Resource
 * @param settings
 * @param context
 * @param replace
 * @returns
 */
async function updateUserHubSettings(settings, context, replace = false) {
    const token = context.tokenFor(USER_HUB_SETTINGS_APP);
    if (token) {
        // always stamp in the updated and username properties
        settings.updated = new Date().getTime();
        settings.username = context.currentUser.username;
        const resource = {
            key: USER_HUB_SETTINGS_KEY,
            data: settings,
            access: "userappprivate",
        };
        return setUserResource(resource, context.currentUser.username, context.portalUrl, token, replace);
    }
    else {
        throw new Error(`No user-app-resource token available to store Site Settings`);
    }
}
/**
 * Fetch the current user's settings for ArcGIS Hub
 * Will return null if the hubforarcgis token is not available
 * @param context
 * @returns
 */
async function fetchUserHubSettings(context) {
    const token = context.tokenFor(USER_HUB_SETTINGS_APP);
    if (token) {
        return await fetchAndMigrateUserHubSettings(context.currentUser.username, context.portalUrl, token);
    }
    else {
        return Promise.resolve(null);
    }
}

/**
 * Cross-walk from a portalUrl to the corresponding Hub API Url
 *
 * If the passed url is not recognized, then this will return `undefined`
 * @param portalUrl
 * @returns
 */
function getHubApiFromPortalUrl(portalUrl) {
    let result;
    if (portalUrl.match(/(qaext|\.mapsqa)\.arcgis.com/)) {
        result = "https://hubqa.arcgis.com";
    }
    else if (portalUrl.match(/(devext|\.mapsdevext)\.arcgis.com/)) {
        result = "https://hubdev.arcgis.com";
    }
    else if (portalUrl.match(/(www|\.maps)\.arcgis.com/)) {
        result = "https://hub.arcgis.com";
    }
    return result;
}

/**
 * Construct a the full url to a portal thumbnail
 *
 * - If the portal has a thumbnail, construct the full url
 * - If the portal is not public, append on the token
 * @param portal
 * @param token
 * @returns
 */
function getOrgThumbnailUrl(portal, token) {
    let thumbnailUrl = null;
    if (portal === null || portal === void 0 ? void 0 : portal.thumbnail) {
        const portalUrl = getPortalUrl.getPortalUrl(portal);
        thumbnailUrl = `${portalUrl}/sharing/rest/portals/${portal.id}/resources/${portal.thumbnail}`;
        if (token && portal.access !== "public") {
            thumbnailUrl = `${thumbnailUrl}?token=${token}`;
        }
    }
    return thumbnailUrl;
}

/**
 * Generic function to fetch org limits
 * @param orgId
 * @param limitsType
 * @param limitName
 * @param options
 * @returns
 */
function fetchOrgLimits(orgId, limitsType, limitName, options) {
    const portal = options.authentication.portal;
    const url = `${portal}/portals/${orgId}/limits?limitsType=${limitsType}&limitName=${limitName}&f=json`;
    return request.request(url, options);
}
/**
 * Fetch the maximum number of groups a user can create in an org
 * @param orgId
 * @param options
 * @returns
 */
function fetchMaxNumUserGroupsLimit(orgId, options) {
    return fetchOrgLimits(orgId, "Groups", "MaxNumUserGroups", options)
        .then((response) => {
        return response.limitValue;
    })
        .catch((_) => {
        // it's possible that the org doesn't have this property set, and
        // the api will return a 500 error. So we just return the default value
        return 512;
    });
}

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Request app-specific token, passing in the token for the current app.
 *
 * This call returns a token after performing the same checks made by validateAppAccess.
 * It returns an app-specific token of the signed-in user only if the user has access
 * to the app and the encrypted platform cookie is valid.
 *
 * A scenario where an app would use this is if it is iframed into another platform app
 * and receives credentials via postMessage. Those credentials contain a token that is
 * specific to the host app, so the embedded app would use `exchangeToken` to get one
 * that is specific to itself.
 *
 * Note: This is only usable by Esri applications hosted on *arcgis.com, *esri.com or within
 * an ArcGIS Enterprise installation. Custom applications can not use this.
 *
 * @param token
 * @param clientId application
 * @param portal
 */
function exchangeToken(token, clientId, portal) {
    if (portal === void 0) { portal = "https://www.arcgis.com/sharing/rest"; }
    var url = portal + "/oauth2/exchangeToken";
    var ro = {
        method: "POST",
        params: {
            f: "json",
            client_id: clientId,
            token: token,
        },
    };
    // make the request and return the token
    return request.request(url, ro).then(function (response) { return response.token; });
}
/**
 * Request a token for a specific application using the esri_aopc encrypted cookie
 *
 * When a client app boots up, it will know its clientId and the redirectUri for use
 * in the normal /oauth/authorize pop-out oAuth flow.
 *
 * If the app sees an `esri_aopc` cookie (only set if the app is hosted on *.arcgis.com),
 * it can call the /oauth2/platformSelf end-point passing in the clientId and redirectUri
 * in headers, and it will receive back an app-specific token, assuming the user has
 * access to the app.
 *
 * Since there are scenarios where an app can boot using credentials/token from localstorage
 * but those credentials are not for the same user as the esri_aopc cookie, it is recommended that
 * an app check the returned username against any existing identity they may have loaded.
 *
 * Note: This is only usable by Esri applications hosted on *arcgis.com, *esri.com or within
 * an ArcGIS Enterprise installation. Custom applications can not use this.
 *
 * ```js
 * // convert the encrypted platform cookie into a UserSession
 * import { platformSelf, UserSession } from '@esri/arcgis-rest-auth';
 *
 * const portal = 'https://www.arcgis.com/sharing/rest';
 * const clientId = 'YOURAPPCLIENTID';
 *
 * // exchange esri_aopc cookie
 * return platformSelf(clientId, 'https://your-app-redirect-uri', portal)
 * .then((response) => {
 *  const currentTimestamp = new Date().getTime();
 *  const tokenExpiresTimestamp = currentTimestamp + (response.expires_in * 1000);
 *  // Construct the session and return it
 *  return new UserSession({
 *    portal,
 *    clientId,
 *    username: response.username,
 *    token: response.token,
 *    tokenExpires: new Date(tokenExpiresTimestamp),
 *    ssl: true
 *  });
 * })
 *
 * ```
 *
 *
 * @param clientId
 * @param redirectUri
 * @param portal
 */
function platformSelf(clientId, redirectUri, portal) {
    if (portal === void 0) { portal = "https://www.arcgis.com/sharing/rest"; }
    // TEMPORARY: the f=json should not be needed, but currently is
    var url = portal + "/oauth2/platformSelf?f=json";
    var ro = {
        method: "POST",
        headers: {
            "X-Esri-Auth-Client-Id": clientId,
            "X-Esri-Auth-Redirect-Uri": redirectUri,
        },
        // Note: request has logic to include the cookie
        // for platformSelf calls w/ the X-Esri-Auth-Client-Id header
        params: {
            f: "json",
        },
    };
    // make the request and return the token
    return request.request(url, ro);
}

/**
 * Add an entry to the history. This handles the limits per type,
 * and ensures that the most recent entry is at the top of the list.
 * This function does not persist the history, it only updates the object.
 * @param entry
 * @param history
 * @returns
 */
function addHistoryEntry(entry, history) {
    // Define limits to how many of each type of history we store
    const limits = {
        sites: 10,
        entities: 50,
    };
    // Anything other than "site" is considered an "entity" for history purposes
    // When we disply the list of history, we use the underlying type to determine the icon and route
    const type = entry.type === "site" ? "sites" : "entities";
    // get a clone of the existing entries
    let entries = util.cloneObject(history.entries);
    // split into two arrays, one for the type and one for everything else
    const siteEntries = entries.filter((e) => e.type === "site");
    const otherEntries = entries.filter((e) => e.type !== "site");
    // Depending on the type, choose the list to work with
    if (entry.type === "site") {
        entries = siteEntries;
    }
    else {
        entries = otherEntries;
    }
    // If there is an existing entry, remove it
    entries = entries.filter((e) => e.id !== entry.id);
    // if the count of the type is below the limit, add the new entry to the start of the array
    if (entries.length < limits[type]) {
        entries.unshift(entry);
    }
    else {
        // otherwise, remove the last entry and add the new entry to the start of the array
        entries.pop();
        entries.unshift(entry);
    }
    // merge up the arrays and sort by visited date
    // depending on tne type, we may need to merge the arrays in a different order
    if (entry.type === "site") {
        history.entries = [...entries, ...otherEntries];
    }
    else {
        history.entries = [...siteEntries, ...entries];
    }
    // return the updated history
    return history;
}
/**
 * Remove a specific entry from the user's history
 * @param entry
 * @returns
 */
function removeHistoryEntry(entry, history) {
    // remove the entry from the history
    const updated = util.cloneObject(history);
    updated.entries = updated.entries.filter((e) => e.id !== entry.id);
    return updated;
}

/**
 * Hash of Hub API end points so updates
 * are centralized
 */
const hubApiEndpoints = {
    domains: "/api/v3/domains",
    search: "/api/v3/datasets",
    discussions: "/api/discussions/v1",
    ogcRecords: "/api/search/v1",
};
/**
 * Per-environment Group Ids that contain documents/links to
 * Hub Resources (help docs, blog posts etc)
 */
const HUB_RESOURE_GROUPS = {
    qaext: [
        "da45c26e67764c79840928cd8d05561a",
    ],
    devext: [],
    production: ["e3db35f7de63451f8243415445694761"],
    enterprise: [],
    "enterprise-k8s": [],
};
/**
 * Abstraction that holds a `UserSession`, along with
 * getters to streamline access to various platform
 * urls, and common constructs like `IRequestOptions`,
 * `IUserRequestOptions` etc.
 *
 * Instances are intended to be immutable, but this is not directly enforced.
 *
 * In most circumstances, this class should be created by
 * the ArcGISContextManager class.
 */
class ArcGISContext {
    /**
     * Create a new instance of `ArcGISContext`.
     *
     * @param opts
     */
    constructor(opts) {
        this._portalUrl = "https://www.arcgis.com";
        this._featureFlags = {};
        this._userResourceTokens = [];
        this.id = opts.id;
        this._portalUrl = opts.portalUrl;
        this._hubUrl = opts.hubUrl;
        this._serviceStatus = opts.serviceStatus;
        if (opts.authentication) {
            this._authentication = opts.authentication;
        }
        if (opts.portalSelf) {
            this._portalSelf = opts.portalSelf;
        }
        if (opts.currentUser) {
            this._currentUser = opts.currentUser;
        }
        if (opts.properties) {
            this._properties = opts.properties;
        }
        if (opts.trustedOrgIds) {
            this._trustedOrgIds = opts.trustedOrgIds;
        }
        if (opts.trustedOrgs) {
            this._trustedOrgs = opts.trustedOrgs;
        }
        this._featureFlags = opts.featureFlags || {};
        this._userResourceTokens = opts.userResourceTokens || [];
        this._userHubSettings = opts.userHubSettings || {
            schemaVersion: 1,
        };
    }
    /**
     * Return the UserSession if authenticated
     */
    get session() {
        return this._authentication;
    }
    /**
     * Return boolean indicating if authenticatio is present
     */
    get isAuthenticated() {
        return !!this._authentication;
    }
    /**
     * Return hash of feature flags passed into constructor.
     * Default is empty object.
     */
    get featureFlags() {
        return this._featureFlags;
    }
    /**
     * Is the users org in the alpha orgs list?
     * Alpha orgs are passed in via properties.alphaOrgs
     */
    get isAlphaOrg() {
        var _a, _b;
        let result = false;
        const orgs = ((_a = this._properties) === null || _a === void 0 ? void 0 : _a.alphaOrgs) || [];
        const orgId = (_b = this._portalSelf) === null || _b === void 0 ? void 0 : _b.id;
        if (orgs.length && orgId) {
            result = orgs.includes(orgId);
        }
        return result;
    }
    /**
     * Is the users org in the beta orgs list?
     * Beta orgs are passed in via properties.betaOrgs
     */
    get isBetaOrg() {
        var _a, _b;
        let result = false;
        const orgs = ((_a = this._properties) === null || _a === void 0 ? void 0 : _a.betaOrgs) || [];
        const orgId = (_b = this._portalSelf) === null || _b === void 0 ? void 0 : _b.id;
        if (orgs.length && orgId) {
            result = orgs.includes(orgId);
        }
        return result;
    }
    /**
     * Return the HubEnvironment of the current context
     */
    get environment() {
        return getPortalApiUrl.getEnvironmentFromPortalUrl(this._portalUrl);
    }
    /**
     * Return `IUserRequestOptions`, which is used for REST-JS
     * functions which require authentication information.
     *
     * If context is not authenticated, this function will throw
     */
    get userRequestOptions() {
        if (this.isAuthenticated) {
            return {
                authentication: this._authentication,
                portal: this.sharingApiUrl,
            };
        }
    }
    /**
     * Return `IRequestOptions`, which is used by REST-JS functions
     * which *may* use authentication information if provided.
     *
     * If context is not authenticated, this function just returns
     * the `portal` property, which informs REST-JS what Sharing API
     * instance to use (i.e. AGO, Enterprise etc)
     */
    get requestOptions() {
        let ro = {
            portal: this.sharingApiUrl,
        };
        if (this.isAuthenticated) {
            ro = {
                authentication: this._authentication,
                portal: this.sharingApiUrl,
            };
        }
        return ro;
    }
    /**
     * Return a `IHubRequestOptions` object
     */
    get hubRequestOptions() {
        // We may add more logic around what is returned in some corner cases
        return {
            authentication: this.session,
            isPortal: this.isPortal,
            portalSelf: this.portal,
            hubApiUrl: this.hubUrl,
            portal: this.sharingApiUrl,
        };
    }
    /**
     * Return the portal url i.e. https://www.arcgis.com
     *
     * If authenticated @ ArcGIS Online, it will return
     * the https://org.env.arcgis.com
     *
     * If authenticated @ ArcGIS Enterprise, it will return
     * https://{portalHostname}/{webadaptor}
     */
    get portalUrl() {
        if (this.isAuthenticated) {
            if (this.isPortal || !this._portalSelf.urlKey) {
                return `https://${this._portalSelf.portalHostname}`;
            }
            else {
                return `https://${this._portalSelf.urlKey}.${this._portalSelf.customBaseUrl}`;
            }
        }
        else {
            return this._portalUrl;
        }
    }
    /**
     * Returns the current user's hub-home url. If not authenticated,
     * returns the Hub Url. If portal, returns undefined
     */
    get hubHomeUrl() {
        if (this.isPortal) {
            return undefined;
        }
        else {
            if (this.isAuthenticated) {
                const hubHostname = this._hubUrl.replace("https://", "");
                return `https://${this._portalSelf.urlKey}.${hubHostname}`;
            }
            else {
                return this._hubUrl;
            }
        }
    }
    /**
     * Returns the current user's Hub License
     */
    get hubLicense() {
        if (this.isPortal) {
            return "enterprise-sites";
        }
        else {
            if (this.hubEnabled) {
                return "hub-premium";
            }
            else {
                return "hub-basic";
            }
        }
    }
    /**
     * Returns the current hub service status information
     */
    get serviceStatus() {
        return this._serviceStatus;
    }
    /**
     * Returns the url to the sharing api composed from portalUrl
     * i.e. https://myorg.maps.arcgis.com/sharing/rest
     */
    get sharingApiUrl() {
        return `${this.portalUrl}/sharing/rest`;
    }
    /**
     * Returns the Hub url, based on the portalUrl
     *
     * For ArcGIS Enterprise this will return `undefined`
     */
    get hubUrl() {
        return this._hubUrl;
    }
    /**
     * Returns boolean indicating if the backing system
     * is ArcGIS Enterprise (formerly ArcGIS Portal) or not
     */
    get isPortal() {
        return this._portalSelf
            ? this._portalSelf.isPortal
            : this._portalUrl.indexOf("arcgis.com") === -1;
    }
    /**
     * Returns the discussions API URL
     */
    get discussionsServiceUrl() {
        if (this._hubUrl) {
            return `${this._hubUrl}${hubApiEndpoints.discussions}`;
        }
    }
    /**
     * Returns the Hub Search API URL
     */
    get hubSearchServiceUrl() {
        if (this._hubUrl) {
            return `${this._hubUrl}${hubApiEndpoints.search}`;
        }
    }
    /**
     * Returns Hub Domain Service URL
     */
    get domainServiceUrl() {
        if (this._hubUrl) {
            return `${this._hubUrl}${hubApiEndpoints.domains}`;
        }
    }
    /**
     * Returns Hub OGCAPI Service URL
     */
    get ogcApiUrl() {
        if (this._hubUrl) {
            // NOTE: In the future, we will be able to use _hubUrl directly
            // but for now, we swap "hub" to "opendata" in _hubUrl so we end
            // up with urls like https://opendataqa.arcgis.com/api/search/v1
            const opendataUrl = this._hubUrl.replace("hub", "opendata");
            return `${opendataUrl}${hubApiEndpoints.ogcRecords}`;
        }
    }
    /**
     * Returns the Events configuration object from portal/self
     *
     * `{serviceId: '3ef..', publicViewId: 'bc3...'}`
     */
    get eventsConfig() {
        if (this._portalSelf) {
            return getProp.getProp(this._portalSelf, "portalProperties.hub.settings.events");
        }
    }
    /**
     * Returns boolean indicating if the current user
     * belongs to an organization that has licensed
     * ArcGIS Hub
     */
    get hubEnabled() {
        return getWithDefault.getWithDefault(this._portalSelf, "portalProperties.hub.enabled", false);
    }
    /**
     * Return the Hub Community Org Id, if defined
     */
    get communityOrgId() {
        if (this._portalSelf) {
            return getProp.getProp(this._portalSelf, "portalProperties.hub.settings.communityOrg.orgId");
        }
    }
    /**
     * If we are in a community org with an associated e-org
     * Return the Hub Enterprise Org Id, if defined
     */
    get enterpriseOrgId() {
        if (this._portalSelf) {
            return getProp.getProp(this._portalSelf, "portalProperties.hub.settings.enterpriseOrg.orgId");
        }
    }
    /**
     * Returns the Hub Community Org Hostname, if defined
     *
     * i.e. c-org.maps.arcgis.com
     */
    get communityOrgHostname() {
        if (this._portalSelf) {
            return getProp.getProp(this._portalSelf, "portalProperties.hub.settings.communityOrg.portalHostname");
        }
    }
    /**
     * Returns the Hub Community Org url
     *
     * i.e. https://c-org.maps.arcgis.com
     */
    get communityOrgUrl() {
        if (this.communityOrgHostname) {
            return `https://${this.communityOrgHostname}`;
        }
    }
    /**
     * Returns the hash of helper services from portal self
     */
    get helperServices() {
        if (this._portalSelf) {
            return this._portalSelf.helperServices;
        }
    }
    /**
     * Returns the current user as IUser
     */
    get currentUser() {
        return this._currentUser;
    }
    /**
     * Returns the portal object as IPortal
     */
    get portal() {
        return this._portalSelf;
    }
    /**
     * Return the properties hash that was passed in.
     * Useful for app-specific context such as the active
     * Site for ArcGIS Hub
     */
    get properties() {
        return this._properties;
    }
    /**
     * Returns the array of Trusted Org Ids
     */
    get trustedOrgIds() {
        return this._trustedOrgIds;
    }
    /**
     * Returns the array of Trusted Orgs
     */
    get trustedOrgs() {
        return this._trustedOrgs;
    }
    /**
     * Returns whether the current user's org type is a community org
     */
    get isCommunityOrg() {
        let result = false;
        if (this._portalSelf) {
            const orgType = getProp.getProp(this._portalSelf, "portalProperties.hub.settings.orgType");
            result = orgType === "community";
        }
        return result;
    }
    /**
     * Returns whether the current user is an org admin and not in a custom role.
     */
    get isOrgAdmin() {
        const { _currentUser } = this;
        let result = false;
        if (_currentUser) {
            result = _currentUser.role === "org_admin" && !_currentUser.roleId;
        }
        return result;
    }
    /**
     * Return the whole array of user resource tokens
     */
    get userResourceTokens() {
        return this._userResourceTokens;
    }
    /**
     * Return the user hub settings.
     * Updates must be done via `contextManager.updateUserHubSettings`
     */
    get userHubSettings() {
        return this._userHubSettings;
    }
    get orgThumbnailUrl() {
        var _a;
        return getOrgThumbnailUrl(this.portal, (_a = this.session) === null || _a === void 0 ? void 0 : _a.token);
    }
    /**
     * Return the survey123 url
     */
    get survey123Url() {
        var _a;
        const suffixes = {
            qaext: "qa",
            devext: "dev",
        };
        const suffix = (_a = suffixes[this.environment]) !== null && _a !== void 0 ? _a : "";
        return `https://survey123${suffix}.arcgis.com`;
    }
    /**
     * Return a token for a specific app
     * @param app
     * @returns
     */
    tokenFor(app) {
        const entry = this._userResourceTokens.find((e) => e.app === app);
        if (entry) {
            return entry.token;
        }
    }
    /**
     * Re-fetch the current user, including their groups
     * @returns
     */
    refreshUser() {
        const opts = {
            authentication: this.session,
            portal: this.sharingApiUrl,
            username: this.session.username,
        };
        return getUser.getUser(opts).then((user) => {
            this._currentUser = user;
        });
    }
    /**
     * Return the user's history
     * @returns
     */
    get history() {
        return this._userHubSettings.history || { entries: [] };
    }
    /**
     * Return an array of GroupIds, per-environment, that contain
     * Hub Resources (linkable documents etc) that are tagged to appear
     * in different areas of the appliation.
     */
    get resourceGroupIDs() {
        return HUB_RESOURE_GROUPS[this.environment];
    }
    /**
     * Check specific permission for the current user, and optionally an entity
     * @param permission
     * @param entity
     * @returns
     */
    checkPermission(permission, entity) {
        return checkPermission.checkPermission(permission, this, entity);
    }
    /**
     * Add an entry to the user's history
     * @param entry
     * @param win
     * @returns
     */
    async addToHistory(entry) {
        // No-op if not authenticated
        if (!this.isAuthenticated) {
            return;
        }
        // No-op if the user doesn't have the permission
        const chk = this.checkPermission("hub:feature:history");
        if (!chk.access) {
            return;
        }
        // add the entry to the history
        const updated = addHistoryEntry(entry, this.history);
        // The getter reads from this, so just re-assign
        this._userHubSettings.history = updated;
        // update the user-app-resource
        return this.updateUserHubSettings(this._userHubSettings);
        // --------------------------------------------------------------------
        // Turns out that integrating this with LocalStorage will involve
        // a lot of syncronization as auth'd user moves between sites
        // which may have different history states in localStorage
        // So let's start with just tracking the history
        // in workspaces and see how that goes.
        // --------------------------------------------------------------------
    }
    /**
     * Clear the entire history
     * @returns
     */
    async clearHistory() {
        // No-op if not authenticated
        if (!this.isAuthenticated) {
            return;
        }
        // No-op if the user doesn't have the permission
        const chk = this.checkPermission("hub:feature:history");
        if (!chk.access) {
            return;
        }
        // create a new history object
        const history = {
            entries: [],
        };
        // assign into the user-app-resource
        this._userHubSettings.history = history;
        // update the user-app-resource
        return this.updateUserHubSettings(this._userHubSettings);
    }
    /**
     * Remove a specific entry from the user's history
     * @param entry
     * @returns
     */
    async removeFromHistory(entry) {
        // No-op if not authenticated
        if (!this.isAuthenticated) {
            return;
        }
        // No-op if the user doesn't have the permission
        const chk = this.checkPermission("hub:feature:history");
        if (!chk.access) {
            return;
        }
        // remove the entry from the history
        const updated = removeHistoryEntry(entry, this.history);
        this._userHubSettings.history = updated;
        // update the user-app-resource
        return this.updateUserHubSettings(this._userHubSettings);
    }
    /**
     * Update the user's hub settings
     *
     * Possible issue here is that we're not updating the contextManager
     * so the contextManager will be out of sync with this instance of
     * ArcGISContext. Unclear if this will be an actual problem.
     * @param settings
     */
    async updateUserHubSettings(settings) {
        if (!this._authentication) {
            throw new Error("Cannot update user hub settings without an authenticated user");
        }
        // update the user-app-resource
        await updateUserHubSettings(settings, this);
        // update the context
        this._userHubSettings = settings;
        // update the feature flags
        Object.keys(getWithDefault.getWithDefault(settings, "preview", {})).forEach((key) => {
            // only set the flag if it's true, otherwise delete the flag so we revert to default behavior
            if (getProp.getProp(settings, `preview.${key}`)) {
                this._featureFlags[`hub:feature:${key}`] = true;
            }
            else {
                delete this._featureFlags[`hub:feature:${key}`];
            }
        });
    }
}

/**
 * Properties that we can always serialize/deserialize regardless of authentication status
 */
const CONTEXT_SERIALIZABLE_PROPS = [
    "portalUrl",
    "serviceStatus",
    "featureFlags",
    "properties",
    "resourceConfigs",
    "trustedOrgIds",
    "trustedOrgs",
];
/**
 * Properties that we only serialize/deserialize if the user is authenticated
 */
const CONTEXT_AUTHD_SERIALIZABLE_PROPS = ["resourceTokens", "portal", "currentUser"];
/**
 * The manager exposes context (`IArcGISContext`), which combines a `UserSession` with
 * the `portal/self` and `user/self` responses to provide a central lookup for platform
 * information, api urls, and other useful properties for developers such as IRequestOptions
 * IUserRequestOptions, IHubRequestOptions etc.
 *
 * The context is exposed on gthe `.context` property, and as the authentication changes
 * the `.context` is re-created. This is done to allow web frameworks to watch for
 * changes on that single property, instead of having to leverage observers or events
 * for change detection.
 *
 * Please see the [ArcGISContext Guide](/hub.js/guides/context) for additional information.
 *
 */
class ArcGISContextManager {
    /**
     * Private constructor. Use `ArcGISContextManager.create(...)` to
     * instantiate an instance
     * @param opts
     */
    constructor(opts) {
        this._portalUrl = "https://www.arcgis.com";
        this._properties = {};
        this._logLevel = logger.Level.error;
        this._featureFlags = {};
        this._trustedOrgIds = [];
        this._trustedOrgs = [];
        this._resourceConfigs = [];
        this._userResourceTokens = [];
        // Having a unique id makes debugging easier
        this.id = new Date().getTime();
        if (opts.logLevel) {
            this._logLevel = opts.logLevel;
        }
        logger.Logger.setLogLevel(this._logLevel);
        logger.Logger.debug(`ArcGISContextManager:ctor: Creating ${this.id}`);
        if (opts.properties) {
            this._properties = opts.properties;
        }
        // Default to the Alpha orgs defined in Hub.js unless
        // other values are passed in
        if (!this._properties.alphaOrgs) {
            this._properties.alphaOrgs = [...ALPHA_ORGS];
        }
        if (opts.authentication) {
            this._authentication = opts.authentication;
            this._portalUrl = this._authentication.portal.replace("/sharing/rest", "");
            this._hubUrl = getHubApiFromPortalUrl(this._portalUrl);
        }
        else if (opts.portalUrl) {
            this._portalUrl = opts.portalUrl;
            this._hubUrl = getHubApiFromPortalUrl(this._portalUrl);
        }
        else {
            this._hubUrl = getHubApiFromPortalUrl(this._portalUrl);
        }
        if (opts.portal) {
            this._portal = util.cloneObject(opts.portal);
        }
        if (opts.currentUser) {
            this._currentUser = util.cloneObject(opts.currentUser);
        }
        if (opts.serviceStatus) {
            this._serviceStatus = opts.serviceStatus;
        }
        if (opts.featureFlags) {
            this._featureFlags = util.cloneObject(opts.featureFlags);
        }
        if (opts.trustedOrgIds) {
            this._trustedOrgIds = util.cloneObject(opts.trustedOrgIds);
        }
        if (opts.trustedOrgs) {
            this._trustedOrgs = util.cloneObject(opts.trustedOrgs);
        }
        if (opts.resourceConfigs) {
            this._resourceConfigs = util.cloneObject(opts.resourceConfigs);
        }
        if (opts.resourceTokens) {
            this._userResourceTokens = util.cloneObject(opts.resourceTokens);
        }
    }
    /**
     * Used to create a new instance of the ArcGISContext class.
     *
     * ```js
     * const ctxMgr = await ArcGISContextManager.create();
     * ```
     *
     * @param opts
     * @returns
     */
    static async create(opts = {}) {
        const ctx = new ArcGISContextManager(opts);
        await ctx.initialize();
        return ctx;
    }
    /**
     * Create a new instance of the ArcGISContextManager from a serialized
     * string. This is useful when you want to store the context in a
     * browser's local storage or server side session.
     * @param serializedContext
     * @returns
     */
    static async deserialize(serializedContext) {
        // decode the string
        const decoded = encoding.base64ToUnicode(serializedContext);
        const state = JSON.parse(decoded);
        // create opts and populate from state
        let opts = {};
        //
        // iterate the serialized props
        CONTEXT_SERIALIZABLE_PROPS.forEach((prop) => {
            opts = util.maybeAdd(prop, getProp.getProp(state, prop), opts);
        });
        // check if there is a session and if it's still valid
        if (state.session) {
            const userSession = UserSession.UserSession.deserialize(state.session);
            if (userSession.tokenExpires.getTime() > Date.now()) {
                CONTEXT_AUTHD_SERIALIZABLE_PROPS.forEach((prop) => {
                    opts = util.maybeAdd(prop, getProp.getProp(state, prop), opts);
                });
                // CRTITICAL: This must be done after the maybeAdd calls above
                // as those return clones of the opts object, and cloneObject
                // does not support cloning a UserSession
                opts.authentication = userSession;
            }
        }
        return ArcGISContextManager.create(opts);
    }
    /**
     * Serialize the context into a string that can be stored
     * and re-hydrated
     * @returns
     */
    serialize() {
        let state = {};
        // iterate the serializable props...
        CONTEXT_SERIALIZABLE_PROPS.forEach((prop) => {
            state = util.maybeAdd(prop, getProp.getProp(this, `_${prop}`), state);
        });
        // If user is authenticated, serialize the session and other auth related props
        if (this._authentication) {
            state.session = this._authentication.serialize();
            CONTEXT_AUTHD_SERIALIZABLE_PROPS.forEach((prop) => {
                state = util.maybeAdd(prop, getProp.getProp(this, `_${prop}`), state);
            });
        }
        return encoding.unicodeToBase64(JSON.stringify(state));
    }
    /**
     * Set the Authentication (UserSession) for the context.
     * This should be called when a user signs into a running
     * application.
     * @param auth
     */
    async setAuthentication(auth) {
        this._authentication = auth;
        this._portalUrl = auth.portal.replace("/sharing/rest", "");
        await this.initialize();
    }
    /**
     * Set the properties hash and re-create the context
     * @param properties
     */
    setProperties(properties) {
        this._properties = properties;
        this._context = new ArcGISContext(this.contextOpts);
    }
    /**
     * Clear the Authentication (UserSession). This should be
     * called when a user signs out of an application, but
     * the application continues running
     */
    clearAuthentication() {
        // Reset the portalUrl from the org url to the base url
        // for ArcGIS Enterprise, we just leave the _portalUrl as-is
        if (!this._context.isPortal) {
            this._portalUrl = getPortalBaseFromOrgUrl.getPortalBaseFromOrgUrl(this._portalUrl);
        }
        // Clear the auth related props
        this._authentication = null;
        this._portal = null;
        this._currentUser = null;
        this._userResourceTokens = [];
        // re-create the context
        this._context = new ArcGISContext(this.contextOpts);
    }
    /**
     * Return a reference to the current state.
     * When `.setAuthentication()` or `.clearAuthenentication()` are
     * called, the state will be re-created. This is done so frameworks
     * like React or Ember can detect changes.
     */
    get context() {
        return this._context;
    }
    /**
     * Update the User's Hub Settings
     * Stores in the user-app-resource associated with the `hubforarcgis` clientId
     * and updates the context
     * @param settings
     */
    async updateUserHubSettings(settings) {
        if (!this._authentication) {
            throw new Error("Cannot update user hub settings without an authenticated user");
        }
        // update the user-app-resource
        await updateUserHubSettings(settings, this.context);
        // update the context
        this._userHubSettings = settings;
        // update the feature flags
        Object.keys(getWithDefault.getWithDefault(settings, "preview", {})).forEach((key) => {
            // only set the flag if it's true, otherwise delete the flag so we revert to default behavior
            if (getProp.getProp(settings, `preview.${key}`)) {
                this._featureFlags[`hub:feature:${key}`] = true;
            }
            else {
                delete this._featureFlags[`hub:feature:${key}`];
            }
        });
        this._context = new ArcGISContext(this.contextOpts);
    }
    /**
     * If we have a UserSession, fetch other resources to populate the context
     */
    async initialize() {
        // setup array to hold promises and one to track promise index
        const promises = [];
        const promiseKeys = [];
        // We always want service status if it's not passed in
        if (!this._serviceStatus) {
            promises.push(getServiceStatus(this._portalUrl));
            promiseKeys.push("serviceStatus");
        }
        // Other info is only relevant if we have authentication
        // and we only want to fetch the info, if it was not passed in
        if (this._authentication) {
            const token = await this._authentication.getToken(this._authentication.portal);
            if (!this._portal) {
                promises.push(getSelfWithLimits(this._authentication));
                promiseKeys.push("portal");
            }
            if (this._portal && !this._portal.limits) {
                promises.push(getPortalLimits(this._portal.id, this._authentication));
                promiseKeys.push("portalLimits");
            }
            if (!this._currentUser) {
                const username = this._authentication.username;
                promises.push(getUser.getUser({ username, authentication: this._authentication }));
                promiseKeys.push("user");
            }
            if (!this._trustedOrgs.length) {
                promises.push(getTrustedOrgs(this._portalUrl, this._authentication));
                promiseKeys.push("trustedOrgs");
            }
            // if we don't have the tokens but we have resource configs, fetch them
            if (!this._userResourceTokens.length && this._resourceConfigs.length) {
                promises.push(getUserResourceTokens(this._resourceConfigs, token, this._portalUrl + "/sharing/rest"));
                promiseKeys.push("tokens");
            }
            // always add "self" to resourceTokens, associated with the app's clientId
            this._userResourceTokens.push({
                app: "self",
                token,
                clientId: this._authentication.clientId || "self",
            });
        }
        // Await promises
        let results;
        try {
            results = await Promise.all(promises);
        }
        catch (ex) {
            const msg = `ArcGISContextManager failed while initializing for "${this._authentication.username}" using ${this._authentication.portal}.`;
            logger.Logger.error(msg);
            // tslint:disable-next-line:no-console
            console.error(msg);
            throw ex;
        }
        // iterate the keys, assigning values into private fields
        promiseKeys.forEach((key, idx) => {
            const result = results[idx];
            switch (key) {
                case "portal":
                    this._portal = result;
                    break;
                case "portalLimits":
                    this._portal.limits = result;
                    break;
                case "user":
                    this._currentUser = result;
                    break;
                case "trustedOrgs":
                    this._trustedOrgs = result;
                    this._trustedOrgIds = getTrustedOrgIds(this._trustedOrgs);
                    break;
                case "tokens":
                    this._userResourceTokens = [
                        ...this._userResourceTokens,
                        ...result,
                    ];
                    break;
                case "serviceStatus":
                    this._serviceStatus = result;
                    break;
            }
        });
        // if we are auth'd and have a hubforarcgis token,
        // fetch the users IUserHubSettings extract out the
        // preview properties and cross-walk to permissions
        const hubAppToken = this._userResourceTokens.find((e) => e.app === "hubforarcgis");
        if (this._authentication && hubAppToken) {
            this._userHubSettings = await fetchAndMigrateUserHubSettings(this._authentication.username, this._portalUrl, hubAppToken.token);
            // Check for preview settings and walk the into feature flags
            Object.keys(getWithDefault.getWithDefault(this._userHubSettings, "preview", {})).forEach((key) => {
                // only set the flag if it's true, otherwise we can override
                // feature flag query params
                if (getProp.getProp(this._userHubSettings, `preview.${key}`)) {
                    this._featureFlags[`hub:feature:${key}`] = true;
                }
            });
        }
        logger.Logger.debug(`ArcGISContextManager-${this.id}: updating context`);
        // update the context
        this._context = new ArcGISContext(this.contextOpts);
    }
    /**
     * Getter to streamline the creation of updated Context instances
     */
    get contextOpts() {
        // Prop names for the IArcGISContextOptions interface do not match
        // up exactly with the prop names on the serialized context so we have to define
        // separate arrays here
        const anonProps = ["hubUrl", ...CONTEXT_SERIALIZABLE_PROPS];
        const authdProps = ["currentUser", "userResourceTokens", "userHubSettings"];
        let contextOpts = {
            id: this.id,
            portalUrl: this._portalUrl,
        };
        // iterate the anon props...
        anonProps.forEach((prop) => {
            contextOpts = util.maybeAdd(prop, getProp.getProp(this, `_${prop}`), contextOpts);
        });
        // If user is authenticated, we can add other props
        if (this._authentication) {
            authdProps.forEach((prop) => {
                contextOpts = util.maybeAdd(prop, getProp.getProp(this, `_${prop}`), contextOpts);
            });
            // CRTITICAL: .authentication must be attached after the maybeAdd calls above
            // as those return clones of the opts object, and cloneObject
            // does not support cloning a UserSession
            contextOpts.authentication = this._authentication;
        }
        // Handle some special cases where the prop names don't map cleanly
        // and would require a breaking change to fix
        contextOpts.portalSelf = this._portal;
        return contextOpts;
    }
}
/**
 * @internal
 * Fetch the service status for the given portalUrl
 * @param portalUrl
 * @returns
 */
function getServiceStatus(portalUrl) {
    let status = HUB_SERVICE_STATUS;
    const isPortal = portalUrl.indexOf("arcgis.com") === -1;
    // When we move to fetching the system status from the API
    // we can use
    // const hubApiUrl = getHubApiFromPortalUrl(portalUrl);
    if (isPortal) {
        status = ENTERPRISE_SITES_SERVICE_STATUS;
    }
    return Promise.resolve(status);
}
/**
 * @internal
 * Get trusted orgs w/ a failSafe to return an empty array
 */
async function getTrustedOrgs(_portalUrl, _authentication) {
    const failSafeTrustedOrgs = failSafe.failSafe(request.request, { trustedOrgs: [] });
    const trustedOrgs = await failSafeTrustedOrgs(`${_portalUrl}/sharing/rest/portals/self/trustedOrgs?f=json`, {
        params: {
            token: _authentication.token,
        },
    });
    return trustedOrgs.trustedOrgs;
}
/**
 * @internal
 * Extract trustedOrg ids from trustedOrgs response
 */
function getTrustedOrgIds(trustedOrgs) {
    return trustedOrgs.map((org) => org.to.orgId);
}
/**
 * @internal
 * Get the portal and its limits.
 * Note: we are only fetching a set of limits,
 * but we can add additional limits as needed
 *
 * @param authentication
 * @returns {IPortal}
 */
async function getSelfWithLimits(authentication) {
    const portal = await getPortal.getSelf({ authentication });
    const limits = await getPortalLimits(portal.id, authentication);
    portal.limits = limits;
    return portal;
}
/**
 * @internal
 * Get a set of limits for the given org.
 * Note: we can add additional limits as needed
 *
 * @param orgId
 * @param authentication
 */
async function getPortalLimits(orgId, authentication) {
    // TODO: add additional limits as needed
    const limitsToFetch = [{ type: "Groups", name: "MaxNumUserGroups", fallback: 512 }];
    const limits = await Promise.all(limitsToFetch.map(async (limit) => {
        try {
            const resolvedLimit = await fetchOrgLimits(orgId, limit.type, limit.name, {
                authentication,
                portal: authentication.portal,
            });
            return resolvedLimit;
        }
        catch (error) {
            return {
                type: limit.type,
                name: limit.name,
                limitValue: limit.fallback,
            };
        }
    }));
    return limits.reduce((acc, limit) => {
        acc[limit.name] = limit.limitValue;
        return acc;
    }, {});
}
/**
 * @internal
 * Get a set of tokens for the given configs
 * @param configs
 * @param currentToken
 * @param portalUrl
 * @returns
 */
async function getUserResourceTokens(configs, currentToken, portalUrl) {
    // failSafe exchangeToken so we don't have to catch
    const failSafeExchange = failSafe.failSafe(exchangeToken, null);
    const promises = configs.map((cfg) => {
        return failSafeExchange(currentToken, cfg.clientId, portalUrl).then((token) => {
            if (token) {
                return Object.assign(Object.assign({}, cfg), { token });
            }
        });
    });
    const results = await Promise.all(promises);
    // remove any null entries so downstream code doesn't have to check
    return results.filter((e) => !!e);
}
const HUB_SERVICE_STATUS = {
    portal: "online",
    discussions: "online",
    events: "online",
    metrics: "online",
    notifications: "online",
    "hub-search": "online",
    domains: "online",
    "hub-downloads": "online",
};
const ENTERPRISE_SITES_SERVICE_STATUS = {
    portal: "online",
    discussions: "not-available",
    events: "not-available",
    metrics: "not-available",
    notifications: "not-available",
    "hub-search": "not-available",
    domains: "not-available",
    "hub-downloads": "not-available",
};
const DEV_ALPHA_ORGS = [
    "LjjARY1mkhxulWPq",
    "q2ikdtW0bkt5EgtQ",
    "yHYVvboBBOdmcKci",
];
const QA_ALPHA_ORGS = [
    "97KLIFOSt5CxbiRI",
    "MiFBHFxEZWumnKCx",
    "8HRYeOqprj872mxP",
    "Xj56SBi2udA78cC9",
    "uFEMdY4VMonzH8sG",
];
const PROD_ALPHA_ORGS = [
    // "gGHDlz6USftL5Pau",
    "CrA5hYOKgL3Vwan8",
    "zj227gjeSqEyG4HF",
    "bkrWlSKcjUDFDtgw",
    "vIu5NCxQFilhVymO",
];
const ALPHA_ORGS = [
    ...PROD_ALPHA_ORGS,
    ...QA_ALPHA_ORGS,
    ...DEV_ALPHA_ORGS,
];

exports.ALPHA_ORGS = ALPHA_ORGS;
exports.ArcGISContext = ArcGISContext;
exports.ArcGISContextManager = ArcGISContextManager;
exports.addHistoryEntry = addHistoryEntry;
exports.fetchMaxNumUserGroupsLimit = fetchMaxNumUserGroupsLimit;
exports.fetchOrgLimits = fetchOrgLimits;
exports.fetchUserHubSettings = fetchUserHubSettings;
exports.fetchUserSiteSettings = fetchUserSiteSettings;
exports.getHubApiFromPortalUrl = getHubApiFromPortalUrl;
exports.getObjectSize = getObjectSize;
exports.getOrgThumbnailUrl = getOrgThumbnailUrl;
exports.platformSelf = platformSelf;
exports.removeHistoryEntry = removeHistoryEntry;
exports.updateUserHubSettings = updateUserHubSettings;
exports.updateUserSiteSettings = updateUserSiteSettings;
