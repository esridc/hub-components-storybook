import { s as sha256 } from './sha256-bf3e0364.js';
import { c as createCommonjsModule, a as commonjsGlobal } from './_commonjsHelpers-11ca3be1.js';
import { t as transformDimensions, g as getElementPath, a as getResponse } from './_internal-96d77ae4.js';

function shouldDisableTracking(options = {}) {
    const { disabled, portal, requireConsent, userPrivacySettings } = options;
    if (!!requireConsent) {
        if (!(userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.accepted)) {
            // consent is required but not provided
            return true;
        }
        else {
            // consent is required and provided
            // if the user has turned off all tracking, then we disable tracking
            if ((userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.functional) === false &&
                (userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.performance) === false &&
                (userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.targeting) === false) {
                return true;
            }
        }
    }
    // if user has turned off all tracking, then we disable tracking
    if (
    // if accepted were false, it would mean that the user didn't actually deny these, just that they have not made a selection
    // so we only pay attention to functional, performance, and targeting if accepted is true
    (userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.accepted) === true &&
        (userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.functional) === false &&
        (userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.performance) === false &&
        (userPrivacySettings === null || userPrivacySettings === void 0 ? void 0 : userPrivacySettings.targeting) === false) {
        return true;
    }
    if (disabled || (portal === null || portal === void 0 ? void 0 : portal.eueiEnabled) === false) {
        return true;
    }
    if (!portal ||
        hasEueiEnabledAndIsMemberOfOrg(portal) ||
        isRegisteredUserWithoutOrgInUSA(portal) ||
        isAnonymousUserInUSA(portal)) {
        return false;
    }
    return true;
}
function hasEueiEnabledAndIsMemberOfOrg(portal) {
    return portal.eueiEnabled && portal.user && portal.user.orgId === portal.id;
}
function isRegisteredUserWithoutOrgInUSA(portal) {
    return portal.user && !portal.user.orgId && portal.ipCntryCode === 'US';
}
function isAnonymousUserInUSA(portal) {
    return !portal.user && portal.ipCntryCode === 'US';
}

const storage$1 = {
    storage: {},
    memory: true,
    get(key) {
        let stored;
        try {
            stored =
                (window.localStorage && window.localStorage.getItem(key)) ||
                    this.storage[key];
        }
        catch (e) {
            stored = this.storage[key];
        }
        if (stored) {
            try {
                return JSON.parse(stored);
            }
            catch (e) {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    },
    set(key, value) {
        // handle Safari private mode (setItem is not allowed)
        const valueToString = JSON.stringify(value);
        try {
            window.localStorage.setItem(key, valueToString);
        }
        catch (e) {
            if (!this.memory) {
                console.error('setting local storage failed, falling back to in-memory storage');
                this.memory = true;
            }
            this.storage[key] = value;
        }
    },
    delete(key) {
        try {
            window.localStorage.removeItem(key);
        }
        catch (e) {
            if (!this.memory) {
                console.error('setting local storage failed, falling back to in-memory storage');
                this.memory = true;
            }
            delete this.storage[key];
        }
    },
};

/**
 * Given privacy settings, list of configured trackers, and the portal, return the trackers
 * which we can initialize.
 *
 * @param privacySettings - The privacy settings object.
 * @param config - Minimal site configuration object - likely needs to be constructed based on the app
 * @param portal - The portal object (optional, but should be passed in if the user is authenticated).
 * @returns An array of WellKnownTrackers representing the trackers to initialize.
 */
function getTrackersToInitialize(privacySettings, config, portal) {
    const trackersToInitialize = [];
    // Given privacy settings, list of configured trackers, and the portal, return the trackers which we can initialize.
    // Does the org allow tracking?
    // If no portal is passed in, we assume this to be true.
    let orgOptsIntoTracking = true;
    // if a portal is passed in and eueiEnabled is false, the org has opted out of all tracking.
    if (portal && portal.eueiEnabled === false) {
        orgOptsIntoTracking = false;
    }
    // compute some states so logic is simpler to read
    const consentNotRequired = !config.requireConsent;
    const consentGiven = privacySettings.accepted;
    const consentNotGiven = !privacySettings.accepted;
    // If the org has explicitly opted out of tracking, we don't initialize any trackers.
    // This may change in the future with "functional" tracking, but we don't have that yet.
    if (orgOptsIntoTracking) {
        // tracker rules
        const rules = {
            amazon: {
                required: ['performance'],
            },
            'adobe-analytics': {
                required: ['targeting'],
            },
            googleAnalytics: {
                required: ['targeting'],
            },
            siteimprove: {
                required: ['targeting'],
            },
        };
        // iterate the keys of the rules object
        Object.keys(rules).forEach((tracker) => {
            const rule = rules[tracker];
            if (config.configuredTrackers.includes(tracker)) {
                const requirementsMet = rule.required.reduce((acc, req) => {
                    return acc && privacySettings[req];
                }, true);
                // if consent is given, all requirements must be met in order to initialize the tracker
                if (consentGiven && requirementsMet) {
                    trackersToInitialize.push(tracker);
                }
                // if consent is not required, and the user has not given consent, we can initialize the tracker
                // basically this is "tracking by default"
                if (consentNotRequired && consentNotGiven) {
                    trackersToInitialize.push(tracker);
                }
            }
        });
    }
    return trackersToInitialize;
}

const INTERNAL_ORGS = [
    'esri.com',
    'esriuk.com',
    'esri.de',
    'esri.ca',
    'esrifrance.fr',
    'esri.nl',
    'esri-portugal.pt',
    'esribulgaria.com',
    'esri.fi',
    'esri.kr',
    'esrimalaysia.com.my',
    'esri.es',
    'esriaustralia.com.au',
    'esri-southafrica.com',
    'esri.cl',
    'esrichina.com.cn',
    'esri.co',
    'esriturkey.com.tr',
    'geodata.no',
    'esriitalia.it',
    'esri.pl',
];
/**
 * Telemetry class
 * Main entrypoint for the telemetry library
 */
class Telemetry {
    constructor(options) {
        var _a, _b, _c;
        this.trackers = [];
        this.options = options;
        this.debug = options.debug;
        this.suppressDisabledWarnings = options.suppressDisabledWarnings;
        this.logger = options.logger || console;
        // if passed privacy settings, use them
        if (options.userPrivacySettings) {
            this._userPrivacySettings = options.userPrivacySettings;
        }
        // if consent is required, but no privacy settings are passed, create them
        // this basically defaults to no tracking
        if (options.requireConsent && !options.userPrivacySettings) {
            this._userPrivacySettings = {
                accepted: false,
                performance: false,
                targeting: false,
                functional: false,
                id: generateGUID$1(),
                timestamp: Date.now(),
            };
            options.userPrivacySettings = this._userPrivacySettings;
        }
        // Check if tracking should be wholesale disabled
        this.disabled = shouldDisableTracking(options);
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Telemetry Disabled');
        }
        const user = ((_a = options.portal) === null || _a === void 0 ? void 0 : _a.user) || options.user;
        if (user) {
            this.setUser(user, (_c = (_b = options.portal) === null || _b === void 0 ? void 0 : _b.subscriptionInfo) === null || _c === void 0 ? void 0 : _c.type);
        }
        if (!this.disabled) {
            this.initializeTrackers();
        }
    }
    shouldInitializeTrackers(userSettings, requireConsent, trackerNames) {
        const userHasNotGivenOrDeniedConsent = !requireConsent && !(userSettings === null || userSettings === void 0 ? void 0 : userSettings.accepted);
        const userHasAcceptedAllTrackers = trackerNames.every((name) => userSettings === null || userSettings === void 0 ? void 0 : userSettings[name]);
        return userHasNotGivenOrDeniedConsent || userHasAcceptedAllTrackers;
    }
    filterTrackers(trackerNames) {
        return this.options.plugins.filter((tracker) => trackerNames.includes(tracker.name));
    }
    initializeTrackers() {
        const userSettings = this._userPrivacySettings;
        const requireConsent = this.options.requireConsent;
        this.trackers = [];
        if (this.options.plugins) {
            if (userSettings) {
                if (this.shouldInitializeTrackers(userSettings, requireConsent, [
                    'performance',
                ])) {
                    this.trackers.push(...this.filterTrackers(['amazon']));
                }
                if (this.shouldInitializeTrackers(userSettings, requireConsent, [
                    'performance',
                    'targeting',
                    'functional',
                ])) {
                    this.trackers.push(...this.filterTrackers([
                        'adobe-analytics',
                        'googleAnalytics',
                        'siteimprove',
                    ]));
                }
            }
            else {
                // enable all trackers
                this.trackers.push(...this.options.plugins);
            }
        }
        if (!this.trackers.length) {
            // Just log that no trackers are configured
            // this is likely due to the user privacy settings
            this.logger.info('No trackers configured');
        }
    }
    getScriptTags() {
        return this.trackers
            .map((tracker) => {
            return tracker.getScriptTags && tracker.getScriptTags();
        })
            .join('');
    }
    async init() {
        const promises = this.trackers.map((tracker) => {
            return tracker.init();
        });
        await Promise.all(promises);
    }
    setUser(user = {}, orgType = 'Public') {
        user = typeof user === 'string' ? { username: user } : user;
        this.user = user;
        this.user.accountType = orgType;
        let internalDomain;
        if (user.email && user.email.split) {
            const domain = user.email.split('@')[1];
            internalDomain =
                INTERNAL_ORGS.filter((org) => {
                    return domain === org;
                }).length > 0;
        }
        if (internalDomain ||
            ['In House', 'Demo and Marketing'].indexOf(orgType) > -1) {
            this.user.internalUser = true;
        }
    }
    /**
     * Allow clients to update the user privacy settings
     * after the telemetry instance has been created.
     * Host app is responsible for persisting the settings
     * into localStorage or cookies, depending on their requirements
     */
    async updateUserPrivacySettings(newSettings) {
        const { accepted, performance, targeting, functional } = this._userPrivacySettings;
        // decide if the new settings are more restrictive than the previous ones
        // if so we need to return `{reload: true}` so that the page can be reloaded
        // to ensure that the trackers are re-initialized
        const reload = 
        // this first case says, if they just accepted tracking and consent is not required (meaning we are currently tracking) but denied any of the categories
        (newSettings.accepted &&
            !accepted &&
            !this.options.requireConsent &&
            (!newSettings.performance ||
                !newSettings.targeting ||
                !newSettings.functional)) ||
            (!newSettings.performance && performance) ||
            (!newSettings.targeting && targeting) ||
            (!newSettings.functional && functional);
        // hold into it
        this._userPrivacySettings = newSettings;
        // we need to re-initialize the trackers based on the new settings
        if (!reload) {
            // if the new settings are more permissive than the old
            // we know that at least some trackers are enabled,
            // thus telemetry as a whole is not disabled
            this.disabled = false;
            // re-initialize the trackers
            this.initializeTrackers();
            // and initialize them because it is possible they have not been
            await this.init();
        }
        return { reload };
    }
    logPageView(page, event = {}, options = {}) {
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Page view was not logged because telemetry is disabled.');
            return false;
        }
        const enabledTrackers = this.trackers.filter(({ disabled, hasError }) => !disabled && !hasError);
        if (!enabledTrackers.length) {
            this.logger.info('Page view was not logged because no enabled telemetry-plugins are registered.');
            return false;
        }
        const attributes = this.preProcess(event, options);
        if (this.debug) {
            this.logger.info('Tracking page view', JSON.stringify(attributes));
        }
        const promises = enabledTrackers.map((tracker) => {
            return tracker.logPageView(page, attributes);
        });
        Promise.all(promises).then();
        return true;
    }
    logEvent(event, options = {}) {
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Event was not logged because telemetry is disabled.');
            return false;
        }
        const enabledTrackers = this.trackers.filter(({ disabled, hasError }) => !disabled && !hasError);
        if (!enabledTrackers.length) {
            this.logger.info('Event was not logged because no enabled telemetry-plugins are registered.');
            return false;
        }
        const eventAttributes = this.preProcess(event, options);
        if (this.debug) {
            this.logger.info('Tracking event', JSON.stringify(eventAttributes));
        }
        const promises = enabledTrackers.map((tracker) => {
            return tracker.logEvent(eventAttributes);
        });
        Promise.all(promises).then();
        return true;
    }
    logError(event = {}) {
        event = Object.assign({ eventType: 'error' }, event);
        this.logEvent(event);
    }
    startWorkflow(name, attributes = {}) {
        const workflow = {
            name,
            start: Date.now(),
            steps: [],
            workflowId: Math.floor((1 + Math.random()) * 0x100000000000).toString(16),
        };
        this.saveWorkflow(workflow);
        const workflowObj = Object.assign({ name, step: 'start' }, attributes);
        this.logWorkflow(workflowObj);
        return workflow;
    }
    stepWorkflow(name, step, attributes = {}) {
        //TODO: check if the check for attributes being a string is useful or can be removed
        const details = typeof attributes === 'string' ? attributes : attributes.details;
        const workflowObj = Object.assign({ name, step, details }, attributes);
        this.logWorkflow(workflowObj);
    }
    endWorkflow(name, attributes = {}) {
        const workflowObj = Object.assign({ name, step: 'finish' }, attributes);
        this.logWorkflow(workflowObj);
    }
    cancelWorkflow(name, attributes = {}) {
        const workflowObj = Object.assign({ name, step: 'cancel' }, attributes);
        this.logWorkflow(workflowObj);
    }
    getWorkflow(name) {
        const workflow = storage$1.get(`TELEMETRY-WORKFLOW:${name}`);
        // do not let old workflows be returned
        if (workflow) {
            const workflowAge = Date.now() - workflow.start;
            const timeout = 30 * 60 * 1000;
            if (workflowAge < timeout) {
                return workflow;
            }
            else {
                this.deleteWorkflow(workflow);
            }
        }
    }
    saveWorkflow(workflow) {
        storage$1.set(`TELEMETRY-WORKFLOW:${workflow.name}`, workflow);
    }
    deleteWorkflow(workflow) {
        storage$1.delete(`TELEMETRY-WORKFLOW:${workflow.name}`);
    }
    logWorkflow(options = {}) {
        /*
        const workflow = {
          name: 'add layer to map',
          step: 'start',
          details: 'some details about the step'
        }
        */
        options = this.preProcess(options);
        let workflow = this.getWorkflow(options.name);
        if (!workflow) {
            this.startWorkflow(options.name);
            workflow = this.getWorkflow(options.name);
        }
        workflow.steps.push(options.step);
        workflow.duration = (Date.now() - workflow.start) / 1000;
        if (['cancel', 'finish'].indexOf(options.step) > -1) {
            this.deleteWorkflow(workflow);
        }
        else {
            this.saveWorkflow(workflow);
        }
        const track = Object.assign(options, {
            eventType: 'workflow',
            category: options.name,
            action: options.step,
            label: options.details,
            duration: workflow.duration,
            workflowId: workflow.workflowId,
        });
        this.logEvent(track);
    }
    preProcess(event = {}, options = {}) {
        let userMetadata = {};
        if (this.user) {
            userMetadata = {
                user: generateSha(this.user.username),
                org: generateSha(this.user.orgId),
                lastLogin: this.user.lastLogin,
                userSince: this.user.created,
                internalUser: this.user.internalUser || false,
                accountType: this.user.accountType,
            };
        }
        return Object.entries(Object.assign(Object.assign({}, event), userMetadata)).reduce(makeEventPayload(options.omitComplexData, this.logger), {});
    }
    /**
     * Disable all configured trackers. This does not deterministically unload
     * the trackers from the page, but it does prevent events from
     * this library from being sent to them. Thus, if you need to ensure
     * that all instantiated trackers are fully disabled, you should reload
     * the application (thus, the `reload` property on the return value from `updateUserPrivacySettings`)
     */
    disable() {
        this.disabled = true;
        this.trackers.forEach((tracker) => {
            var _a;
            if (!tracker.hasError) {
                tracker.disabled = true;
                (_a = tracker.disable) === null || _a === void 0 ? void 0 : _a.call(tracker);
            }
        });
    }
    /**
     * Disable a tracker. This does not deterministically unload
     * the tracker from the page, but it does prevent events from
     * this library from being sent to it. Thus, if you need to ensure
     * that an instantiated tracker is fully disabled, you should reload
     * the application (thus, the `reload` property on the return value from `updateUserPrivacySettings`)
     * @param trackerName
     */
    disableTracker(trackerName) {
        var _a;
        const tracker = this.trackers.find(({ name }) => name === trackerName);
        if (tracker && !tracker.hasError) {
            tracker.disabled = true;
            (_a = tracker.disable) === null || _a === void 0 ? void 0 : _a.call(tracker);
        }
    }
    /**
     * Enable a specific tracker
     * @param trackerName
     */
    enableTracker(trackerName) {
        var _a;
        const tracker = this.trackers.find(({ name }) => name === trackerName);
        if (tracker && !tracker.hasError) {
            tracker.disabled = false;
            (_a = tracker.enable) === null || _a === void 0 ? void 0 : _a.call(tracker);
        }
    }
}
/**
 * Generate a hash of a string - used to anonymize username and orgid
 * @param value
 * @returns
 */
function generateSha(value) {
    if (!value)
        return;
    // TODO: decide if we can salt the value and if that will cause issues with
    // how the data is used.
    return sha256.sha256(value);
}
function makeEventPayload(omitComplexData, logger) {
    return function (acc, [key, val]) {
        if (isPrimitive(val)) {
            acc[key] = val;
        }
        else if (!omitComplexData) {
            logger.warn(`You are trying to log a non-primitive value, ${key}:${JSON.stringify(val)}. This will get logged as [object Object]`);
            acc[key] = val;
        }
        return acc;
    };
}
function isPrimitive(val) {
    const primitives = ['string', 'number', 'boolean', 'undefined'];
    return (primitives.includes(typeof val) ||
        (val && typeof val.valueOf() === 'string'));
}
// /**
//  * Get the privacy settings from local storage or use the default values
//  * @returns
//  */
// function getPrivacySettings(win?: Window): IPrivacySettings {
//   // Default settings, which is the same as if they rejected all tracking
//   let settings: IPrivacySettings = {
//     accepted: false,
//     performance: false,
//     targeting: false,
//     functional: false,
//     id: generateGUID(),
//     timestamp: Date.now(),
//   };
//   if (win?.localStorage) {
//     // try to get the privacy settings from local storage
//     const storedSettings = win.localStorage.getItem('esri_privacy_settings');
//     if (storedSettings) {
//       settings = JSON.parse(storedSettings);
//     } else {
//       // store the default settings in local storage
//       win.localStorage.setItem(
//         'esri_privacy_settings',
//         JSON.stringify(settings),
//       );
//     }
//   }
//   return settings;
// }
// Created by github copilot
function generateGUID$1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const COGNITO_KEY = 'TELEMETRY_COGNITO_CREDENTIALS';
function getCredentials(IdentityPoolId, options = {}) {
    const fipsSubdomainSuffix = options.fips === true ? '-fips' : '';
    const COGNITO_URL = `https://cognito-identity${fipsSubdomainSuffix}.us-east-1.amazonaws.com/`;
    let cached = storage$1.get(COGNITO_KEY);
    if (cached && Date.now() / 1000 < cached.Expiration)
        return Promise.resolve(cached);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityService.GetId',
        },
        body: JSON.stringify({ IdentityPoolId }),
    };
    return fetch(COGNITO_URL, fetchOptions)
        .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then((response) => {
        const { IdentityId } = response;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-amz-json-1.1',
                'X-Amz-Target': 'AWSCognitoIdentityService.GetCredentialsForIdentity',
            },
            body: JSON.stringify({ IdentityId }),
        };
        return fetch(COGNITO_URL, options);
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(({ Credentials }) => {
        storage$1.set(COGNITO_KEY, Credentials);
        return Credentials;
    });
}

function formatTelemetryAttributes({ telemetryData, dimensionLookup = {}, excludeKeys = [], }) {
    return Object.keys(telemetryData)
        .filter((key) => {
        return !excludeKeys.includes(key);
    })
        .map((key) => {
        if (dimensionLookup[key]) {
            return {
                key: getCustomDimensionKey(dimensionLookup, key),
                value: telemetryData[key],
            };
        }
        return {
            key,
            value: getValue(telemetryData, key),
        };
    })
        .reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {});
}
function getValue(data, key) {
    if (key === 'json') {
        return data[key] ? JSON.stringify(data[key]) : 'null';
    }
    return data[key] === undefined ? 'null' : data[key].toString();
}
function getCustomDimensionKey(lookup, key) {
    return `dimension${lookup[key]}`;
}

const METRICS = ['size', 'duration', 'position', 'number', 'count'];
function formatTelemetryMetrics(telemetryData, metricLookup = {}) {
    return Object.keys(telemetryData)
        .filter((key) => {
        return metricLookup[key] || METRICS.includes(key);
    })
        .map((key) => {
        if (metricLookup[key]) {
            return {
                key: getCustomMetricKey(metricLookup, key),
                value: telemetryData[key],
            };
        }
        return {
            key,
            value: telemetryData[key],
        };
    })
        .reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {});
}
function getCustomMetricKey(lookup, key) {
    return `metric${lookup[key]}`;
}

function createEventLog({ event = {}, dimensionLookup = {}, metricLookup = {}, }) {
    var _a, _b;
    const { pathname: eventPathname, eventType = 'other' } = event;
    const metrics = formatTelemetryMetrics(event, metricLookup);
    const eventAttributes = formatTelemetryAttributes({
        telemetryData: Object.assign({ eventType }, event),
        dimensionLookup,
        excludeKeys: [
            'workflow',
            'pathname',
            ...Object.keys(metrics),
            ...Object.keys(metricLookup),
        ],
    });
    const telemetryPayload = Object.assign(Object.assign({ name: eventType }, eventAttributes), metrics);
    // Set browser properties if available
    if (typeof document !== 'undefined' && document.referrer) {
        telemetryPayload.referrer = document.referrer;
    }
    if (typeof window !== 'undefined' && !telemetryPayload.hostname) {
        telemetryPayload.hostname = (_a = window.location) === null || _a === void 0 ? void 0 : _a.hostname;
    }
    telemetryPayload.path =
        typeof window !== 'undefined' && window.location.pathname
            ? (_b = window.location) === null || _b === void 0 ? void 0 : _b.pathname
            : eventPathname;
    return telemetryPayload;
}

function createPageViewLog({ page, previousPage = {}, options = {}, dimensionLookup = {}, metricLookup = {}, }) {
    const metrics = formatTelemetryMetrics(options, metricLookup);
    const attributes = formatTelemetryAttributes({
        telemetryData: options,
        dimensionLookup,
        excludeKeys: [
            'workflow',
            ...Object.keys(metrics),
            ...Object.keys(metricLookup),
        ],
    });
    const { referrer, title } = document || {};
    const { hostname, pathname } = window && window.location ? window.location : {};
    return Object.assign(Object.assign({ name: 'pageView', referrer,
        hostname, path: page || pathname, pageUrl: page || pathname, pageName: title, previousPageUrl: previousPage.pageUrl, previousPageName: previousPage.pageName }, attributes), metrics);
}

var dlv_umd = createCommonjsModule(function (module, exports) {
!function(t,n){module.exports=function(t,n,e,i,o){for(n=n.split?n.split("."):n,i=0;i<n.length;i++)t=t?t[n[i]]:o;return t===o?e:t};}();
//# sourceMappingURL=dlv.umd.js.map
});

var e="undefined",o$3="object",g$2=function(){},b$4="any",m$3="*",j="__";"undefined"!=typeof process?process:{};var $$1="undefined"!=typeof document;"undefined"!=typeof Deno&&void 0!==Deno.core;$$1&&"nodejs"===window.name||"undefined"!=typeof navigator&&void 0!==navigator.userAgent&&(navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom"));function M$1(n,t){return t.charAt(0)[n]()+t.slice(1)}var U$1=M$1.bind(null,"toUpperCase"),H$1=M$1.bind(null,"toLowerCase");function J$2(n){return Y$1(n)?U$1("null"):"object"==typeof n?yn(n):Object.prototype.toString.call(n).slice(8,-1)}function R$1(n,t){void 0===t&&(t=!0);var e=J$2(n);return t?H$1(e):e}function V$1(n,t){return typeof t===n}var W$1=V$1.bind(null,"function"),q$1=V$1.bind(null,"string"),I$2=V$1.bind(null,"undefined");var Q$1=V$1.bind(null,"boolean");V$1.bind(null,"symbol");function Y$1(n){return null===n}function nn(n){return "number"===R$1(n)&&!isNaN(n)}function rn(n){return "array"===R$1(n)}function on(n){if(!un(n))return !1;for(var t=n;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(n)===t}function un(n){return n&&("object"==typeof n||null!==n)}function yn(n){return W$1(n.constructor)?n.constructor.name:null}function hn(n){return n instanceof Error||q$1(n.message)&&n.constructor&&nn(n.constructor.stackTraceLimit)}function On(n,t){if("object"!=typeof t||Y$1(t))return !1;if(t instanceof n)return !0;var e=R$1(new n(""));if(hn(t))for(;t;){if(R$1(t)===e)return !0;t=Object.getPrototypeOf(t);}return !1}On.bind(null,TypeError);On.bind(null,SyntaxError);function $n(n,t){var e=n instanceof Element||n instanceof HTMLDocument;return e&&t?Tn(n,t):e}function Tn(n,t){return void 0===t&&(t=""),n&&n.nodeName===t.toUpperCase()}function _n(n){var t=[].slice.call(arguments,1);return function(){return n.apply(void 0,[].slice.call(arguments).concat(t))}}_n($n,"form");_n($n,"button");_n($n,"input");_n($n,"select");function Hn(n){return n?rn(n)?n:[n]:[]}

function n$3(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function o$2(){if($$1){var r=navigator,t=r.languages;return r.userLanguage||(t&&t.length?t[0]:r.language)}}function a$6(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}}function s(r){return function(e){for(var r,t=Object.create(null),o=/([^&=]+)=?([^&]*)/g;r=o.exec(e);){var a=n$3(r[1]),i=n$3(r[2]);"[]"===a.substring(a.length-2)?(t[a=a.substring(0,a.length-2)]||(t[a]=[])).push(i):t[a]=""===i||i;}for(var u in t){var c=u.split("[");c.length>1&&(m$2(t,c.map(function(e){return e.replace(/[?[\]\\ ]/g,"")}),t[u]),delete t[u]);}return t}(function(r){if(r){var t=r.match(/\?(.*)/);return t&&t[1]?t[1].split("#")[0]:""}return $$1&&window.location.search.substring(1)}(r))}function m$2(e,r,t){for(var n=r.length-1,o=0;o<n;++o){var a=r[o];if("__proto__"===a||"constructor"===a)break;a in e||(e[a]={}),e=e[a];}e[r[n]]=t;}function y$2(){for(var e="",r=0,t=4294967295*Math.random()|0;r++<36;){var n="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[r-1],o=15&t;e+="-"==n||"4"==n?n:("x"==n?o:3&o|8).toString(16),t=r%8==0?4294967295*Math.random()|0:t>>4;}return e}

var l$2="global",o$1=j+"global"+j,n$2=typeof self===o$3&&self.self===self&&self||typeof global===o$3&&global.global===global&&global||void 0;function a$5(t){return n$2[o$1][t]}function f$2(t,e){return n$2[o$1][t]=e}function i$3(t){delete n$2[o$1][t];}function u$3(t,e,r){var l;try{if(b$3(t)){var o=window[t];l=o[e].bind(o);}}catch(t){}return l||r}n$2[o$1]||(n$2[o$1]={});var c$6={};function b$3(t){if(typeof c$6[t]!==e)return c$6[t];try{var e$1=window[t];e$1.setItem(e,e),e$1.removeItem(e);}catch(e){return c$6[t]=!1}return c$6[t]=!0}

function v$1(){return v$1=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);}return e},v$1.apply(this,arguments)}var y$1="function",b$2="undefined",I$1="@@redux/"+Math.random().toString(36),w=/* #__PURE__ */function(){return typeof Symbol===y$1&&Symbol.observable||"@@observable"}(),E$1=" != "+y$1;function P(e,n,t){var r;if(typeof n===y$1&&typeof t===b$2&&(t=n,n=void 0),typeof t!==b$2){if(typeof t!==y$1)throw new Error("enhancer"+E$1);return t(P)(e,n)}if(typeof e!==y$1)throw new Error("reducer"+E$1);var i=e,a=n,o=[],u=o,c=!1;function s(){u===o&&(u=o.slice());}function f(){return a}function d(e){if(typeof e!==y$1)throw new Error("Listener"+E$1);var n=!0;return s(),u.push(e),function(){if(n){n=!1,s();var t=u.indexOf(e);u.splice(t,1);}}}function p(e){if(!on(e))throw new Error("Act != obj");if(typeof e.type===b$2)throw new Error("ActType "+b$2);if(c)throw new Error("Dispatch in reducer");try{c=!0,a=i(a,e);}finally{c=!1;}for(var n=o=u,t=0;t<n.length;t++)(0, n[t])();return e}return p({type:"@@redux/INIT"}),(r={dispatch:p,subscribe:d,getState:f,replaceReducer:function(e){if(typeof e!==y$1)throw new Error("next reducer"+E$1);i=e,p({type:"@@redux/INIT"});}})[w]=function(){var e,n=d;return (e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Observer != obj");function t(){e.next&&e.next(f());}return t(),{unsubscribe:n(t)}}})[w]=function(){return this},e},r}function S$1(e,n){var t=n&&n.type;return "action "+(t&&t.toString()||"?")+"reducer "+e+" returns "+b$2}function N$1(){var e=[].slice.call(arguments);return 0===e.length?function(e){return e}:1===e.length?e[0]:e.reduce(function(e,n){return function(){return e(n.apply(void 0,[].slice.call(arguments)))}})}function O$1(){var e=arguments;return function(n){return function(t,r,i){var a,o=n(t,r,i),u=o.dispatch,c={getState:o.getState,dispatch:function(e){return u(e)}};return a=[].slice.call(e).map(function(e){return e(c)}),v$1({},o,{dispatch:u=N$1.apply(void 0,a)(o.dispatch)})}}}var A$1=j+"anon_id",_$1=j+"user_id",x$2=j+"user_traits",k$1="userId",T="anonymousId",z=["bootstrap","params","campaign","initializeStart","initialize","initializeEnd","ready","resetStart","reset","resetEnd","pageStart","page","pageEnd","pageAborted","trackStart","track","trackEnd","trackAborted","identifyStart","identify","identifyEnd","identifyAborted","userIdChanged","registerPlugins","enablePlugin","disablePlugin","online","offline","setItemStart","setItem","setItemEnd","setItemAborted","removeItemStart","removeItem","removeItemEnd","removeItemAborted"],M=["name","EVENTS","config","loaded"],q=z.reduce(function(e,n){return e[n]=n,e},{registerPluginType:function(e){return "registerPlugin:"+e},pluginReadyType:function(e){return "ready:"+e}}),U=/^utm_/,V=/^an_prop_/,L$1=/^an_trait_/;function C$1(e){var n=e.storage.setItem;return function(t){return function(r){return function(i){if(i.type===q.bootstrap){var a=i.params,o=i.user,u=i.persistedUser,c=i.initialUser,s=u.userId===o.userId;u.anonymousId!==o.anonymousId&&n(A$1,o.anonymousId),s||n(_$1,o.userId),c.traits&&n(x$2,v$1({},s&&u.traits?u.traits:{},c.traits));var l=Object.keys(i.params);if(l.length){var f=a.an_uid,d=a.an_event,p=l.reduce(function(e,n){if(n.match(U)||n.match(/^(d|g)clid/)){var t=n.replace(U,"");e.campaign["campaign"===t?"name":t]=a[n];}return n.match(V)&&(e.props[n.replace(V,"")]=a[n]),n.match(L$1)&&(e.traits[n.replace(L$1,"")]=a[n]),e},{campaign:{},props:{},traits:{}});t.dispatch(v$1({type:q.params,raw:a},p,f?{userId:f}:{})),f&&setTimeout(function(){return e.identify(f,p.traits)},0),d&&setTimeout(function(){return e.track(d,p.props)},0),Object.keys(p.campaign).length&&t.dispatch({type:q.campaign,campaign:p.campaign});}}return r(i)}}}}function R(e){return function(n,t){if(void 0===n&&(n={}),void 0===t&&(t={}),t.type===q.setItemEnd){if(t.key===A$1)return v$1({},n,{anonymousId:t.value});if(t.key===_$1)return v$1({},n,{userId:t.value})}switch(t.type){case q.identify:return Object.assign({},n,{userId:t.userId,traits:v$1({},n.traits,t.traits)});case q.reset:return [_$1,A$1,x$2].forEach(function(n){e.removeItem(n);}),Object.assign({},n,{userId:null,anonymousId:null,traits:{}});default:return n}}}function $(e){return {userId:e.getItem(_$1),anonymousId:e.getItem(A$1),traits:e.getItem(x$2)}}var D=function(e){return j+"TEMP"+j+e};function B(n){var t=n.storage,r=t.setItem,i=t.removeItem,a=t.getItem;return function(n){return function(t){return function(u){var c=u.userId,s=u.traits,l=u.options;if(u.type===q.reset&&([_$1,x$2,A$1].forEach(function(e){i(e);}),[k$1,T,"traits"].forEach(function(e){i$3(D(e));})),u.type===q.identify){a(A$1)||r(A$1,y$2());var f=a(_$1),d=a(x$2)||{};f&&f!==c&&n.dispatch({type:q.userIdChanged,old:{userId:f,traits:d},new:{userId:c,traits:s},options:l}),c&&r(_$1,c),s&&r(x$2,v$1({},d,s));}return t(u)}}}}var X={};function J$1(e,n){X[e]&&W$1(X[e])&&(X[e](n),delete X[e]);}function W(e,n,t){return new Promise(function(r,i){return n()?r(e):t<1?i(v$1({},e,{queue:!0})):new Promise(function(e){return setTimeout(e,10)}).then(function(a){return W(e,n,t-10).then(r,i)})})}function H(e,n,t){var r=n(),i=e.getState(),a=i.plugins,o=i.queue,u=i.user;if(!i.context.offline&&o&&o.actions&&o.actions.length){var c=o.actions.reduce(function(e,n,t){return a[n.plugin].loaded?(e.process.push(n),e.processIndex.push(t)):(e.requeue.push(n),e.requeueIndex.push(t)),e},{processIndex:[],process:[],requeue:[],requeueIndex:[]});if(c.processIndex&&c.processIndex.length){c.processIndex.forEach(function(n){var i=o.actions[n],c=i.plugin,s=i.payload.type,l=r[c][s];if(l&&W$1(l)){var f=function(e,n){return void 0===e&&(e={}),void 0===n&&(n={}),[k$1,T].reduce(function(t,r){return e.hasOwnProperty(r)&&n[r]&&n[r]!==e[r]&&(t[r]=n[r]),t},e)}(i.payload,u);l({payload:f,config:a[c].config,instance:t});var p=s+":"+c;e.dispatch(v$1({},f,{type:p,_:{called:p,from:"queueDrain"}}));}});var s=o.actions.filter(function(e,n){return !~c.processIndex.indexOf(n)});o.actions=s;}}}var F$1=function(e){var n=e.data,t=e.action,r=e.instance,i=e.state,a=e.allPlugins,o=e.allMatches,u=e.store,c=e.EVENTS;try{var s=i.plugins,f=i.context,p=t.type,m=p.match(G$1),g=n.exact.map(function(e){return e.pluginName});m&&(g=o.during.map(function(e){return e.pluginName}));var h=function(e,n){return function(t,r,i){var a=r.config,o=r.name,u=o+"."+t.type;i&&(u=i.event);var c=t.type.match(G$1)?function(e,n,t,r,i){return function(a,o){var u=r?r.name:e,c=o&&ie(o)?o:t;if(r&&(!(c=o&&ie(o)?o:[e]).includes(e)||1!==c.length))throw new Error("Method "+n+" can only abort "+e+" plugin. "+JSON.stringify(c)+" input valid");return v$1({},i,{abort:{reason:a,plugins:c,caller:n,_:u}})}}(o,u,n,i,t):function(e,n){return function(){throw new Error(e.type+" action not cancellable. Remove abort in "+n)}}(t,u);return {payload:ue(t),instance:e,config:a||{},abort:c}}}(r,g),y=n.exact.reduce(function(e,n){var t=n.pluginName,r=n.methodName,i=!1;return r.match(/^initialize/)||r.match(/^reset/)||(i=!s[t].loaded),f.offline&&r.match(/^(page|track|identify)/)&&(i=!0),e[""+t]=i,e},{});return Promise.resolve(n.exact.reduce(function(e,i,o){try{var u=i.pluginName;return Promise.resolve(e).then(function(e){function i(){return Promise.resolve(e)}var o=function(){if(n.namespaced&&n.namespaced[u])return Promise.resolve(n.namespaced[u].reduce(function(e,n,t){try{return Promise.resolve(e).then(function(e){return n.method&&W$1(n.method)?(function(e,n){var t=oe(e);if(t&&t.name===n){var r=oe(t.method);throw new Error([n+" plugin is calling method "+e,"Plugins cant call self","Use "+t.method+" "+(r?"or "+r.method:"")+" in "+n+" plugin insteadof "+e].join("\n"))}}(n.methodName,n.pluginName),Promise.resolve(n.method({payload:e,instance:r,abort:(t=e,i=u,o=n.pluginName,function(e,n){return v$1({},t,{abort:{reason:e,plugins:n||[i],caller:p,from:o||i}})}),config:Z(n.pluginName,s,a),plugins:s})).then(function(n){var t=on(n)?n:{};return Promise.resolve(v$1({},e,t))})):e;var t,i,o;})}catch(e){return Promise.reject(e)}},Promise.resolve(t))).then(function(n){e[u]=n;});e[u]=t;}();return o&&o.then?o.then(i):i()})}catch(e){return Promise.reject(e)}},Promise.resolve({}))).then(function(e){return Promise.resolve(n.exact.reduce(function(t,i,o){try{var c=n.exact.length===o+1,f=i.pluginName,d=a[f];return Promise.resolve(t).then(function(n){var t=e[f]?e[f]:{};if(m&&(t=n),te(t,f))return Y({data:t,method:p,instance:r,pluginName:f,store:u}),Promise.resolve(n);if(te(n,f))return c&&Y({data:n,method:p,instance:r,store:u}),Promise.resolve(n);if(y.hasOwnProperty(f)&&!0===y[f])return u.dispatch({type:"queue",plugin:f,payload:t,_:{called:"queue",from:"queueMechanism"}}),Promise.resolve(n);var i=h(e[f],a[f]);return Promise.resolve(d[p]({abort:i.abort,payload:t,instance:r,config:Z(f,s,a),plugins:s})).then(function(i){var a=on(i)?i:{},o=v$1({},n,a),c=e[f];if(te(c,f))Y({data:c,method:p,instance:r,pluginName:f,store:u});else {var s=p+":"+f;(s.match(/:/g)||[]).length<2&&!p.match(K)&&!p.match(Q)&&r.dispatch(v$1({},m?o:t,{type:s,_:{called:s,from:"submethod"}}));}return Promise.resolve(o)})})}catch(e){return Promise.reject(e)}},Promise.resolve(t))).then(function(e){if(!(p.match(G$1)||p.match(/^registerPlugin/)||p.match(Q)||p.match(K)||p.match(/^params/)||p.match(/^userIdChanged/))){if(c.plugins.includes(p),e._&&e._.originalAction===p)return e;var t=v$1({},e,{_:{originalAction:e.type,called:e.type,from:"engineEnd"}});re(e,n.exact.length)&&!p.match(/End$/)&&(t=v$1({},t,{type:e.type+"Aborted"})),u.dispatch(t);}return e})})}catch(e){return Promise.reject(e)}},G$1=/Start$/,K=/^bootstrap/,Q=/^ready/;function Y(e){var n=e.pluginName,t=e.method+"Aborted"+(n?":"+n:"");e.store.dispatch(v$1({},e.data,{type:t,_:{called:t,from:"abort"}}));}function Z(e,n,t){var r=n[e]||t[e];return r&&r.config?r.config:{}}function ee(e,n){return n.reduce(function(n,t){return t[e]?n.concat({methodName:e,pluginName:t.name,method:t[e]}):n},[])}function ne(e,n){var t=e.replace(G$1,""),r=n?":"+n:"";return [""+e+r,""+t+r,t+"End"+r]}function te(e,n){var t=e.abort;return !!t&&(!0===t||ae(t,n)||t&&ae(t.plugins,n))}function re(e,n){var t=e.abort;if(!t)return !1;if(!0===t||q$1(t))return !0;var r=t.plugins;return ie(t)&&t.length===n||ie(r)&&r.length===n}function ie(e){return Array.isArray(e)}function ae(e,n){return !(!e||!ie(e))&&e.includes(n)}function oe(e){var n=e.match(/(.*):(.*)/);return !!n&&{method:n[1],name:n[2]}}function ue(e){return Object.keys(e).reduce(function(n,t){return "type"===t||(n[t]=on(e[t])?Object.assign({},e[t]):e[t]),n},{})}function ce(e,n,t){var r={};return function(i){return function(a){return function(o){try{var u,c=function(e){return u?e:a(f)},s=o.type,l=o.plugins,f=o;if(o.abort)return Promise.resolve(a(o));if(s===q.enablePlugin&&i.dispatch({type:q.initializeStart,plugins:l,disabled:[],fromEnable:!0,meta:o.meta}),s===q.disablePlugin&&setTimeout(function(){return J$1(o.meta.rid,{payload:o})},0),s===q.initializeEnd){var m=n(),g=Object.keys(m),h=g.filter(function(e){return l.includes(e)}).map(function(e){return m[e]}),y=[],b=[],I=o.disabled,w=h.map(function(e){var n=e.loaded,t=e.name,a=e.config;return W(e,function(){return n({config:a})},1e4).then(function(n){return r[t]||(i.dispatch({type:q.pluginReadyType(t),name:t,events:Object.keys(e).filter(function(e){return !M.includes(e)})}),r[t]=!0),y=y.concat(t),e}).catch(function(e){if(e instanceof Error)throw new Error(e);return b=b.concat(e.name),e})});Promise.all(w).then(function(e){var n={plugins:y,failed:b,disabled:I};setTimeout(function(){g.length===w.length+I.length&&i.dispatch(v$1({},{type:q.ready},n));},0);});}var E=function(){if(s!==q.bootstrap)return /^ready:([^:]*)$/.test(s)&&setTimeout(function(){return H(i,n,e)},0),Promise.resolve(function(e,n,t,r,i){try{var a=W$1(n)?n():n,o=e.type,u=o.replace(G$1,"");if(e._&&e._.called)return Promise.resolve(e);var c=t.getState(),s=(m=a,void 0===(g=c.plugins)&&(g={}),void 0===(h=e.options)&&(h={}),Object.keys(m).filter(function(e){var n=h.plugins||{};return Q$1(n[e])?n[e]:!1!==n.all&&(!g[e]||!1!==g[e].enabled)}).map(function(e){return m[e]}));o===q.initializeStart&&e.fromEnable&&(s=Object.keys(c.plugins).filter(function(n){var t=c.plugins[n];return e.plugins.includes(n)&&!t.initialized}).map(function(e){return a[e]}));var l=s.map(function(e){return e.name}),f=function(e,n,t){var r=ne(e).map(function(e){return ee(e,n)});return n.reduce(function(t,r){var i=r.name,a=ne(e,i).map(function(e){return ee(e,n)}),o=a[0],u=a[1],c=a[2];return o.length&&(t.beforeNS[i]=o),u.length&&(t.duringNS[i]=u),c.length&&(t.afterNS[i]=c),t},{before:r[0],beforeNS:{},during:r[1],duringNS:{},after:r[2],afterNS:{}})}(o,s);return Promise.resolve(F$1({action:e,data:{exact:f.before,namespaced:f.beforeNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){function n(){var n=function(){if(o.match(G$1))return Promise.resolve(F$1({action:v$1({},s,{type:u+"End"}),data:{exact:f.after,namespaced:f.afterNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){e.meta&&e.meta.hasCallback&&J$1(e.meta.rid,{payload:e});})}();return n&&n.then?n.then(function(){return e}):e}if(re(e,l.length))return e;var s,d=function(){if(o!==u)return Promise.resolve(F$1({action:v$1({},e,{type:u}),data:{exact:f.during,namespaced:f.duringNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){s=e;});s=e;}();return d&&d.then?d.then(n):n()})}catch(e){return Promise.reject(e)}var m,g,h;}(o,n,e,i,t)).then(function(e){return u=1,a(e)})}();return Promise.resolve(E&&E.then?E.then(c):c(E))}catch(e){return Promise.reject(e)}}}}}function se(e){return function(n){return function(n){return function(t){var r=t.type,i=t.key,a=t.value,o=t.options;if(r===q.setItem||r===q.removeItem){if(t.abort)return n(t);r===q.setItem?e.setItem(i,a,o):e.removeItem(i,o);}return n(t)}}}}var le=function(){var e=this;this.before=[],this.after=[],this.addMiddleware=function(n,t){e[t]=e[t].concat(n);},this.removeMiddleware=function(n,t){var r=e[t].findIndex(function(e){return e===n});-1!==r&&(e[t]=[].concat(e[t].slice(0,r),e[t].slice(r+1)));},this.dynamicMiddlewares=function(n){return function(t){return function(r){return function(i){var a={getState:t.getState,dispatch:function(e){return t.dispatch(e)}},o=e[n].map(function(e){return e(a)});return N$1.apply(void 0,o)(r)(i)}}}};};function fe(e){return function(n,t){void 0===n&&(n={});var r={};if("initialize:aborted"===t.type)return n;if(/^registerPlugin:([^:]*)$/.test(t.type)){var i=de(t.type,"registerPlugin"),a=e()[i];if(!a||!i)return n;var o=t.enabled,u=a.config;return r[i]={enabled:o,initialized:!!o&&Boolean(!a.initialize),loaded:!!o&&Boolean(a.loaded({config:u})),config:u},v$1({},n,r)}if(/^initialize:([^:]*)$/.test(t.type)){var c=de(t.type,q.initialize),s=e()[c];return s&&c?(r[c]=v$1({},n[c],{initialized:!0,loaded:Boolean(s.loaded({config:s.config}))}),v$1({},n,r)):n}if(/^ready:([^:]*)$/.test(t.type))return r[t.name]=v$1({},n[t.name],{loaded:!0}),v$1({},n,r);switch(t.type){case q.disablePlugin:return v$1({},n,pe(t.plugins,!1,n));case q.enablePlugin:return v$1({},n,pe(t.plugins,!0,n));default:return n}}}function de(e,n){return e.substring(n.length+1,e.length)}function pe(e,n,t){return e.reduce(function(e,r){return e[r]=v$1({},t[r],{enabled:n}),e},t)}function me(e){try{return JSON.parse(JSON.stringify(e))}catch(e){}return e}var ge={last:{},history:[]};function he(e,n){void 0===e&&(e=ge);var t=n.options,r=n.meta;if(n.type===q.track){var i=me(v$1({event:n.event,properties:n.properties},Object.keys(t).length&&{options:t},{meta:r}));return v$1({},e,{last:i,history:e.history.concat(i)})}return e}var ve={actions:[]};function ye(e,n){void 0===e&&(e=ve);var t=n.payload;switch(n.type){case"queue":var r;return r=t&&t.type&&t.type===q.identify?[n].concat(e.actions):e.actions.concat(n),v$1({},e,{actions:r});case"dequeue":return [];default:return e}}var be=/#.*$/;function Ie(e){var n=/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/g.exec(e);return "/"+(n&&n[3]?n[3].split("?")[0].replace(be,""):"")}var we,Ee,Pe,Se,Ne=function(e){if(void 0===e&&(e={}),!$$1)return e;var n=document,t=n.title,r=n.referrer,i=window,a=i.location,o=i.innerWidth,u=i.innerHeight,c=a.hash,s=a.search,l=function(e){var n=function(){if($$1)for(var e,n=document.getElementsByTagName("link"),t=0;e=n[t];t++)if("canonical"===e.getAttribute("rel"))return e.getAttribute("href")}();return n?n.match(/\?/)?n:n+e:window.location.href.replace(be,"")}(s),f={title:t,url:l,path:Ie(l),hash:c,search:s,width:o,height:u};return r&&""!==r&&(f.referrer=r),v$1({},f,e)},Oe={last:{},history:[]};function Ae(e,n){void 0===e&&(e=Oe);var t=n.options;if(n.type===q.page){var r=me(v$1({properties:n.properties,meta:n.meta},Object.keys(t).length&&{options:t}));return v$1({},e,{last:r,history:e.history.concat(r)})}return e}we=function(){if(!$$1)return !1;var e=navigator.appVersion;return ~e.indexOf("Win")?"Windows":~e.indexOf("Mac")?"MacOS":~e.indexOf("X11")?"UNIX":~e.indexOf("Linux")?"Linux":"Unknown OS"}(),Ee=$$1?document.referrer:null,Pe=o$2(),Se=a$6();var _e={initialized:!1,sessionId:y$2(),app:null,version:null,debug:!1,offline:!!$$1&&!navigator.onLine,os:{name:we},userAgent:$$1?navigator.userAgent:"node",library:{name:"analytics",version:"0.12.5"},timezone:Se,locale:Pe,campaign:{},referrer:Ee};function xe(e,n){void 0===e&&(e=_e);var t=e.initialized,r=n.campaign;switch(n.type){case q.campaign:return v$1({},e,{campaign:r});case q.offline:return v$1({},e,{offline:!0});case q.online:return v$1({},e,{offline:!1});default:return t?e:v$1({},_e,e,{initialized:!0})}}var je=["plugins","reducers","storage"];function ke(e,n,t){if($$1){var r=window[(t?"add":"remove")+"EventListener"];e.split(" ").forEach(function(e){r(e,n);});}}function Te(e){var n=ke.bind(null,"online offline",function(n){return Promise.resolve(!navigator.onLine).then(e)});return n(!0),function(e){return n(!1)}}function ze(){return f$2("analytics",[]),function(e){return function(n,t,r){var i=e(n,t,r),a=i.dispatch;return Object.assign(i,{dispatch:function(e){return n$2[o$1].analytics.push(e.action||e),a(e)}})}}}function Me(e){return function(){return N$1(N$1.apply(null,arguments),ze())}}function qe(e){return e?rn(e)?e:[e]:[]}function Ue(n,t,r){void 0===n&&(n={});var i,a,o=y$2();return t&&(X[o]=(i=t,a=function(e){for(var n,t=e||Array.prototype.slice.call(arguments),r=0;r<t.length;r++)if(W$1(t[r])){n=t[r];break}return n}(r),function(e){a&&a(e),i(e);})),v$1({},n,{rid:o,ts:(new Date).getTime()},t?{hasCallback:!0}:{})}function Ve(n){void 0===n&&(n={});var t=n.reducers||{},c=n.initialUser||{},s$1=(n.plugins||[]).reduce(function(e,n){if(W$1(n))return e.middlewares=e.middlewares.concat(n),e;if(n.NAMESPACE&&(n.name=n.NAMESPACE),!n.name)throw new Error("https://lytics.dev/errors/1");n.config||(n.config={});var t=n.EVENTS?Object.keys(n.EVENTS).map(function(e){return n.EVENTS[e]}):[];e.pluginEnabled[n.name]=!(!1===n.enabled||!1===n.config.enabled),delete n.enabled,n.methods&&(e.methods[n.name]=Object.keys(n.methods).reduce(function(e,t){var r;return e[t]=(r=n.methods[t],function(){for(var e=Array.prototype.slice.call(arguments),n=new Array(r.length),t=0;t<e.length;t++)n[t]=e[t];return n[n.length]=Q,r.apply({instance:Q},n)}),e},{}),delete n.methods);var r=Object.keys(n).concat(t),i=new Set(e.events.concat(r));if(e.events=Array.from(i),e.pluginsArray=e.pluginsArray.concat(n),e.plugins[n.name])throw new Error(n.name+"AlreadyLoaded");return e.plugins[n.name]=n,e.plugins[n.name].loaded||(e.plugins[n.name].loaded=function(){return !0}),e},{plugins:{},pluginEnabled:{},methods:{},pluginsArray:[],middlewares:[],events:[]}),f=n.storage?n.storage:{getItem:a$5,setItem:f$2,removeItem:i$3},p=function(e){return function(n,t,r){return t.getState("user")[n]||(r&&on(r)&&r[n]?r[n]:$(e)[n]||a$5(D(n))||null)}}(f),h=s$1.plugins,w=s$1.events.filter(function(e){return !M.includes(e)}).sort(),E=new Set(w.concat(z).filter(function(e){return !M.includes(e)})),_=Array.from(E).sort(),x=function(){return h},j=new le,U=j.addMiddleware,V=j.removeMiddleware,L=j.dynamicMiddlewares,X=function(){throw new Error("Abort disabled inListener")},J=s(),W=$(f),F=v$1({},W,c,J.an_uid?{userId:J.an_uid}:{},J.an_aid?{anonymousId:J.an_aid}:{});F.anonymousId||(F.anonymousId=y$2());var G=v$1({enable:function(e,n){return new Promise(function(t){ue.dispatch({type:q.enablePlugin,plugins:qe(e),_:{originalAction:q.enablePlugin}},t,[n]);})},disable:function(e,n){return new Promise(function(t){ue.dispatch({type:q.disablePlugin,plugins:qe(e),_:{originalAction:q.disablePlugin}},t,[n]);})}},s$1.methods),K=!1,Q={identify:function(e,n,t,r){try{var i=q$1(e)?e:null,a=on(e)?e:n,o=t||{},c=Q.user();f$2(D(k$1),i);var s=i||a.userId||p(k$1,Q,a);return Promise.resolve(new Promise(function(e){ue.dispatch(v$1({type:q.identifyStart,userId:s,traits:a||{},options:o,anonymousId:c.anonymousId},c.id&&c.id!==i&&{previousId:c.id}),e,[n,t,r]);}))}catch(e){return Promise.reject(e)}},track:function(e,n,t,r){try{var i=on(e)?e.event:e;if(!i||!q$1(i))throw new Error("EventMissing");var a=on(e)?e:n||{},o=on(t)?t:{};return Promise.resolve(new Promise(function(e){ue.dispatch({type:q.trackStart,event:i,properties:a,options:o,userId:p(k$1,Q,n),anonymousId:p(T,Q,n)},e,[n,t,r]);}))}catch(e){return Promise.reject(e)}},page:function(e,n,t){try{var r=on(e)?e:{},i=on(n)?n:{};return Promise.resolve(new Promise(function(a){ue.dispatch({type:q.pageStart,properties:Ne(r),options:i,userId:p(k$1,Q,r),anonymousId:p(T,Q,r)},a,[e,n,t]);}))}catch(e){return Promise.reject(e)}},user:function(e){if(e===k$1||"id"===e)return p(k$1,Q);if(e===T||"anonId"===e)return p(T,Q);var n=Q.getState("user");return e?dlv_umd(n,e):n},reset:function(e){return new Promise(function(n){ue.dispatch({type:q.resetStart},n,e);})},ready:function(e){return K&&e({plugins:G,instance:Q}),Q.on(q.ready,function(n){e(n),K=!0;})},on:function(e,n){if(!e||!W$1(n))return !1;if(e===q.bootstrap)throw new Error(".on disabled for "+e);var t=/Start$|Start:/;if("*"===e){var r=function(e){return function(e){return function(r){return r.type.match(t)&&n({payload:r,instance:Q,plugins:h}),e(r)}}},i=function(e){return function(e){return function(r){return r.type.match(t)||n({payload:r,instance:Q,plugins:h}),e(r)}}};return U(r,Le),U(i,Ce),function(){V(r,Le),V(i,Ce);}}var a=e.match(t)?Le:Ce,o=function(t){return function(t){return function(r){return r.type===e&&n({payload:r,instance:Q,plugins:h,abort:X}),t(r)}}};return U(o,a),function(){return V(o,a)}},once:function(e,n){if(!e||!W$1(n))return !1;if(e===q.bootstrap)throw new Error(".once disabled for "+e);var t=Q.on(e,function(e){n({payload:e.payload,instance:Q,plugins:h,abort:X}),t();});return t},getState:function(e){var n=ue.getState();return e?dlv_umd(n,e):Object.assign({},n)},dispatch:function(e){var n=q$1(e)?{type:e}:e;if(z.includes(n.type))throw new Error("reserved action "+n.type);var t=v$1({},n,{_:v$1({originalAction:n.type},e._||{})});ue.dispatch(t);},enablePlugin:G.enable,disablePlugin:G.disable,plugins:G,storage:{getItem:f.getItem,setItem:function(e,n,t){ue.dispatch({type:q.setItemStart,key:e,value:n,options:t});},removeItem:function(e,n){ue.dispatch({type:q.removeItemStart,key:e,options:n});}},setAnonymousId:function(e,n){Q.storage.setItem(A$1,e,n);},events:{core:z,plugins:w}},Y=s$1.middlewares.concat([function(e){return function(e){return function(n){return n.meta||(n.meta=Ue()),e(n)}}},L(Le),ce(Q,x,{all:_,plugins:w}),se(f),C$1(Q),B(Q),L(Ce)]),Z={context:xe,user:R(f),page:Ae,track:he,plugins:fe(x),queue:ye},ee=N$1,ne=N$1;if($$1&&n.debug){var te=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;te&&(ee=te({trace:!0,traceLimit:25})),ne=function(){return 0===arguments.length?ze():on(typeof arguments[0])?Me():Me().apply(null,arguments)};}var re,ie=function(e){return Object.keys(e).reduce(function(n,t){return je.includes(t)||(n[t]=e[t]),n},{})}(n),ae=s$1.pluginsArray.reduce(function(e,n){var t=n.name,r=n.config,i=n.loaded,a=s$1.pluginEnabled[t];return e[t]={enabled:a,initialized:!!a&&Boolean(!n.initialize),loaded:Boolean(i({config:r})),config:r},e},{}),oe={context:ie,user:F,plugins:ae},ue=P(function(e){for(var n=Object.keys(e),t={},r=0;r<n.length;r++){var i=n[r];typeof e[i]===y$1&&(t[i]=e[i]);}var a,o=Object.keys(t);try{!function(e){Object.keys(e).forEach(function(n){var t=e[n];if(typeof t(void 0,{type:"@@redux/INIT"})===b$2||typeof t(void 0,{type:I$1})===b$2)throw new Error("reducer "+n+" "+b$2)});}(t);}catch(e){a=e;}return function(e,n){if(void 0===e&&(e={}),a)throw a;for(var r=!1,i={},u=0;u<o.length;u++){var c=o[u],s=e[c],l=(0, t[c])(s,n);if(typeof l===b$2){var f=S$1(c,n);throw new Error(f)}i[c]=l,r=r||l!==s;}return r?i:e}}(v$1({},Z,t)),oe,ne(ee(O$1.apply(void 0,Y))));ue.dispatch=(re=ue.dispatch,function(e,n,t){var r=v$1({},e,{meta:Ue(e.meta,n,qe(t))});return re.apply(null,[r])});var de=Object.keys(h);ue.dispatch({type:q.bootstrap,plugins:de,config:ie,params:J,user:F,initialUser:c,persistedUser:W});var pe=de.filter(function(e){return s$1.pluginEnabled[e]}),me=de.filter(function(e){return !s$1.pluginEnabled[e]});return ue.dispatch({type:q.registerPlugins,plugins:de,enabled:s$1.pluginEnabled}),s$1.pluginsArray.map(function(e,n){var t=e.bootstrap,r=e.config,i=e.name;t&&W$1(t)&&t({instance:Q,config:r,payload:e}),ue.dispatch({type:q.registerPluginType(i),name:i,enabled:s$1.pluginEnabled[i],plugin:e}),s$1.pluginsArray.length===n+1&&ue.dispatch({type:q.initializeStart,plugins:pe,disabled:me});}),Te(function(e){ue.dispatch({type:e?q.offline:q.online});}),function(e,n,t){setInterval(function(){return H(e,n,t)},3e3);}(ue,x,Q),Q}var Le="before",Ce="after";

var t$1="cookie",i$2=a$4(),r$2=d$3,c$5=d$3;function u$2(o){return i$2?d$3(o,"",-1):i$3(o)}function a$4(){if(void 0!==i$2)return i$2;var e="cookiecookie";try{d$3(e,e),i$2=-1!==document.cookie.indexOf(e),u$2(e);}catch(e){i$2=!1;}return i$2}function d$3(e,t,r,c,u,a){if("undefined"!=typeof window){var d=arguments.length>1;return !1===i$2&&(d?f$2(e,t):a$5(e)),d?document.cookie=e+"="+encodeURIComponent(t)+(r?"; expires="+new Date(+new Date+1e3*r).toUTCString()+(c?"; path="+c:"")+(u?"; domain="+u:"")+(a?"; secure":""):""):decodeURIComponent((("; "+document.cookie).split("; "+e+"=")[1]||"").split(";")[0])}}

var r$1="localStorage",g$1=b$3.bind(null,"localStorage"),c$4=u$3("localStorage","getItem",a$5),m$1=u$3("localStorage","setItem",f$2),S=u$3("localStorage","removeItem",i$3);

var a$3="sessionStorage",i$1=b$3.bind(null,"sessionStorage"),g=u$3("sessionStorage","getItem",a$5),n$1=u$3("sessionStorage","setItem",f$2);u$3("sessionStorage","removeItem",i$3);

function I(t){var o=t;try{if("true"===(o=JSON.parse(t)))return !0;if("false"===o)return !1;if(on(o))return o;parseFloat(o)===o&&(o=parseFloat(o));}catch(t){}if(null!==o&&""!==o)return o}var k=g$1(),O=i$1(),x$1=a$4();function C(o,e){if(o){var r=A(e),a=!N(r),i=d$2(r)?I(localStorage.getItem(o)):void 0;if(a&&!I$2(i))return i;var n=h(r)?I(r$2(o)):void 0;if(a&&n)return n;var l=E(r)?I(sessionStorage.getItem(o)):void 0;if(a&&l)return l;var u=a$5(o);return a?u:{localStorage:i,sessionStorage:l,cookie:n,global:u}}}function L(r,a,l){if(r&&!I$2(a)){var u={},g=A(l),m=JSON.stringify(a),S=!N(g);return d$2(g)&&(u[r$1]=F(r$1,a,I(localStorage.getItem(r))),localStorage.setItem(r,m),S)?u[r$1]:h(g)&&(u[t$1]=F(t$1,a,I(r$2(r))),c$5(r,m),S)?u[t$1]:E(g)&&(u[a$3]=F(a$3,a,I(sessionStorage.getItem(r))),sessionStorage.setItem(r,m),S)?u[a$3]:(u[l$2]=F(l$2,a,a$5(r)),f$2(r,a),S?u[l$2]:u)}}function b$1(t,e){if(t){var a=A(e),s=C(t,m$3),n={};return !I$2(s.localStorage)&&d$2(a)&&(localStorage.removeItem(t),n[r$1]=s.localStorage),!I$2(s.cookie)&&h(a)&&(u$2(t),n[t$1]=s.cookie),!I$2(s.sessionStorage)&&E(a)&&(sessionStorage.removeItem(t),n[a$3]=s.sessionStorage),!I$2(s.global)&&G(a,l$2)&&(i$3(t),n[l$2]=s.global),n}}function A(t){return t?q$1(t)?t:t.storage:b$4}function d$2(t){return k&&G(t,r$1)}function h(t){return x$1&&G(t,t$1)}function E(t){return O&&G(t,a$3)}function N(t){return t===m$3||"all"===t}function G(t,o){return t===b$4||t===o||N(t)}function F(t,o,e){return {location:t,current:o,previous:e}}var J={setItem:L,getItem:C,removeItem:b$1};

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function analyticsLib() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSettings = {
    storage: J
  };
  return Ve(_objectSpread2$1(_objectSpread2$1({}, defaultSettings), opts));
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var objectSpread2 = _objectSpread2;

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

var n=function(){};function t(t,e){var r,u,i,a=(e=e||{}).initial||[],l=e.max||Infinity,o=e.interval||1e4,c=e.onEmpty||n,f=e.onPause||n;function s(n){clearInterval(r);var e=a.splice(0,l);return e.length&&t(e,a),a.length?n?s():h():(i=!1,c(a))}function h(){i=!0,r=setInterval(s,o);}return a.length&&h(),{flush:function(n){s(n);},resume:s,push:function(n){return (u=a.push(n))>=l&&!e.throttle&&s(),i||h(),u},size:function(){return a.length},pause:function(n){n&&s(),clearInterval(r),i=!1,f(a);}}}

var u$1=["id","createdAt","created"];function c$3(e){var r=e?new Date(e):new Date;return [r.toISOString(),r.getTime()]}function d$1(){var r=c$3(),i=r[0],n=r[1];return {id:y$2(),created:n,createdAt:i}}function l$1(e,n){for(var t={session:[g,n$1],page:[a$5,f$2]}[e],s=t[0],c=t[1],l=d$1(),v=!1,p={},m=0;m<u$1.length;m++){var g$1=u$1[m],_="__"+e+"__session__"+g$1,b=s(_);v=n||!b;var x=b&&!n?b:c(_,l[g$1]),y="created"!==g$1?x:Number(x);p[g$1]=y;}return f$1(p,v)}function f$1(e,r){var i=Date.now();return e.elapsed=i-e.created,e.expires&&(e.remaining=Math.abs(e.expires-i)),e.isNew=r,e}function v(e,r){void 0===e&&(e=30);var i=r$2("__session"),t=i?JSON.parse(i):p(e);return r?t:f$1(t,!i)}function p(e,r,i){void 0===e&&(e=30);var n=i?v(e,!0):d$1(),s=60*e,a=n.created;if(i){var o=c$3(),u=o[0],l=o[1];n.modified=l,n.modifiedAt=u,a=l;}var p=c$3(a+1e3*s),m=p[0];return n.expires=p[1],n.expiresAt=m,r&&(n=Object.assign(n,r)),c$5("__session",JSON.stringify(n),s),f$1(n,!i)}var m=function(e,r){return void 0===e&&(e=30),p(e||1,r,!0)},_=l$1.bind(null,"session"),b=l$1.bind(null,"session",!0),x=l$1.bind(null,"page"),y=l$1.bind(null,"page",!0);

var c$2="undefined"!=typeof window;function a$2(t){return "string"==typeof t}function d(t){return "boolean"==typeof t}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;

var aws4fetch_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  factory(exports) ;
}(commonjsGlobal, (function (exports) {
  /**
   * @license MIT <https://opensource.org/licenses/MIT>
   * @copyright Michael Hart 2018
   */
  const encoder = new TextEncoder();
  const HOST_SERVICES = {
    appstream2: 'appstream',
    cloudhsmv2: 'cloudhsm',
    email: 'ses',
    marketplace: 'aws-marketplace',
    mobile: 'AWSMobileHubService',
    pinpoint: 'mobiletargeting',
    queue: 'sqs',
    'git-codecommit': 'codecommit',
    'mturk-requester-sandbox': 'mturk-requester',
    'personalize-runtime': 'personalize',
  };
  const UNSIGNABLE_HEADERS = [
    'authorization',
    'content-type',
    'content-length',
    'user-agent',
    'presigned-expires',
    'expect',
    'x-amzn-trace-id',
    'range',
    'connection',
  ];
  class AwsClient {
    constructor({ accessKeyId, secretAccessKey, sessionToken, service, region, cache, retries, initRetryMs }) {
      if (accessKeyId == null) throw new TypeError('accessKeyId is a required option')
      if (secretAccessKey == null) throw new TypeError('secretAccessKey is a required option')
      this.accessKeyId = accessKeyId;
      this.secretAccessKey = secretAccessKey;
      this.sessionToken = sessionToken;
      this.service = service;
      this.region = region;
      this.cache = cache || new Map();
      this.retries = retries != null ? retries : 10;
      this.initRetryMs = initRetryMs || 50;
    }
    async sign(input, init) {
      if (input instanceof Request) {
        const { method, url, headers, body } = input;
        init = Object.assign({ method, url, headers }, init);
        if (init.body == null && headers.has('Content-Type')) {
          init.body = body != null && headers.has('X-Amz-Content-Sha256') ? body : await input.clone().arrayBuffer();
        }
        input = url;
      }
      const signer = new AwsV4Signer(Object.assign({ url: input }, init, this, init && init.aws));
      const signed = Object.assign({}, init, await signer.sign());
      delete signed.aws;
      return new Request(signed.url.toString(), signed)
    }
    async fetch(input, init) {
      for (let i = 0; i <= this.retries; i++) {
        const fetched = fetch(await this.sign(input, init));
        if (i === this.retries) {
          return fetched
        }
        const res = await fetched;
        if (res.status < 500 && res.status !== 429) {
          return res
        }
        await new Promise(resolve => setTimeout(resolve, Math.random() * this.initRetryMs * Math.pow(2, i)));
      }
      throw new Error('An unknown error occurred, ensure retries is not negative')
    }
  }
  class AwsV4Signer {
    constructor({ method, url, headers, body, accessKeyId, secretAccessKey, sessionToken, service, region, cache, datetime, signQuery, appendSessionToken, allHeaders, singleEncode }) {
      if (url == null) throw new TypeError('url is a required option')
      if (accessKeyId == null) throw new TypeError('accessKeyId is a required option')
      if (secretAccessKey == null) throw new TypeError('secretAccessKey is a required option')
      this.method = method || (body ? 'POST' : 'GET');
      this.url = new URL(url);
      this.headers = new Headers(headers || {});
      this.body = body;
      this.accessKeyId = accessKeyId;
      this.secretAccessKey = secretAccessKey;
      this.sessionToken = sessionToken;
      let guessedService, guessedRegion;
      if (!service || !region) {
  [guessedService, guessedRegion] = guessServiceRegion(this.url, this.headers);
      }
      this.service = service || guessedService || '';
      this.region = region || guessedRegion || 'us-east-1';
      this.cache = cache || new Map();
      this.datetime = datetime || new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
      this.signQuery = signQuery;
      this.appendSessionToken = appendSessionToken || this.service === 'iotdevicegateway';
      this.headers.delete('Host');
      const params = this.signQuery ? this.url.searchParams : this.headers;
      if (this.service === 's3' && !this.headers.has('X-Amz-Content-Sha256')) {
        this.headers.set('X-Amz-Content-Sha256', 'UNSIGNED-PAYLOAD');
      }
      params.set('X-Amz-Date', this.datetime);
      if (this.sessionToken && !this.appendSessionToken) {
        params.set('X-Amz-Security-Token', this.sessionToken);
      }
      this.signableHeaders = ['host', ...this.headers.keys()]
        .filter(header => allHeaders || !UNSIGNABLE_HEADERS.includes(header))
        .sort();
      this.signedHeaders = this.signableHeaders.join(';');
      this.canonicalHeaders = this.signableHeaders
        .map(header => header + ':' + (header === 'host' ? this.url.host : (this.headers.get(header) || '').replace(/\s+/g, ' ')))
        .join('\n');
      this.credentialString = [this.datetime.slice(0, 8), this.region, this.service, 'aws4_request'].join('/');
      if (this.signQuery) {
        if (this.service === 's3' && !params.has('X-Amz-Expires')) {
          params.set('X-Amz-Expires', '86400');
        }
        params.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
        params.set('X-Amz-Credential', this.accessKeyId + '/' + this.credentialString);
        params.set('X-Amz-SignedHeaders', this.signedHeaders);
      }
      if (this.service === 's3') {
        try {
          this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, ' '));
        } catch (e) {
          this.encodedPath = this.url.pathname;
        }
      } else {
        this.encodedPath = this.url.pathname.replace(/\/+/g, '/');
      }
      if (!singleEncode) {
        this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, '/');
      }
      this.encodedPath = encodeRfc3986(this.encodedPath);
      const seenKeys = new Set();
      this.encodedSearch = [...this.url.searchParams]
        .filter(([k]) => {
          if (!k) return false
          if (this.service === 's3') {
            if (seenKeys.has(k)) return false
            seenKeys.add(k);
          }
          return true
        })
        .map(pair => pair.map(p => encodeRfc3986(encodeURIComponent(p))))
        .sort(([k1, v1], [k2, v2]) => k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0)
        .map(pair => pair.join('='))
        .join('&');
    }
    async sign() {
      if (this.signQuery) {
        this.url.searchParams.set('X-Amz-Signature', await this.signature());
        if (this.sessionToken && this.appendSessionToken) {
          this.url.searchParams.set('X-Amz-Security-Token', this.sessionToken);
        }
      } else {
        this.headers.set('Authorization', await this.authHeader());
      }
      return {
        method: this.method,
        url: this.url,
        headers: this.headers,
        body: this.body,
      }
    }
    async authHeader() {
      return [
        'AWS4-HMAC-SHA256 Credential=' + this.accessKeyId + '/' + this.credentialString,
        'SignedHeaders=' + this.signedHeaders,
        'Signature=' + (await this.signature()),
      ].join(', ')
    }
    async signature() {
      const date = this.datetime.slice(0, 8);
      const cacheKey = [this.secretAccessKey, date, this.region, this.service].join();
      let kCredentials = this.cache.get(cacheKey);
      if (!kCredentials) {
        const kDate = await hmac('AWS4' + this.secretAccessKey, date);
        const kRegion = await hmac(kDate, this.region);
        const kService = await hmac(kRegion, this.service);
        kCredentials = await hmac(kService, 'aws4_request');
        this.cache.set(cacheKey, kCredentials);
      }
      return buf2hex(await hmac(kCredentials, await this.stringToSign()))
    }
    async stringToSign() {
      return [
        'AWS4-HMAC-SHA256',
        this.datetime,
        this.credentialString,
        buf2hex(await hash(await this.canonicalString())),
      ].join('\n')
    }
    async canonicalString() {
      return [
        this.method.toUpperCase(),
        this.encodedPath,
        this.encodedSearch,
        this.canonicalHeaders + '\n',
        this.signedHeaders,
        await this.hexBodyHash(),
      ].join('\n')
    }
    async hexBodyHash() {
      let hashHeader = this.headers.get('X-Amz-Content-Sha256');
      if (hashHeader == null) {
        if (this.body && typeof this.body !== 'string' && !('byteLength' in this.body)) {
          throw new Error('body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header')
        }
        hashHeader = buf2hex(await hash(this.body || ''));
      }
      return hashHeader
    }
  }
  async function hmac(key, string) {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      typeof key === 'string' ? encoder.encode(key) : key,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign'],
    );
    return crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(string))
  }
  async function hash(content) {
    return crypto.subtle.digest('SHA-256', typeof content === 'string' ? encoder.encode(content) : content)
  }
  function buf2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('0' + x.toString(16)).slice(-2)).join('')
  }
  function encodeRfc3986(urlEncodedStr) {
    return urlEncodedStr.replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())
  }
  function guessServiceRegion(url, headers) {
    const { hostname, pathname } = url;
    const match = hostname.replace('dualstack.', '').match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);
    let [service, region] = (match || ['', '']).slice(1, 3);
    if (region === 'us-gov') {
      region = 'us-gov-west-1';
    } else if (region === 's3' || region === 's3-accelerate') {
      region = 'us-east-1';
      service = 's3';
    } else if (service === 'iot') {
      if (hostname.startsWith('iot.')) {
        service = 'execute-api';
      } else if (hostname.startsWith('data.jobs.iot.')) {
        service = 'iot-jobs-data';
      } else {
        service = pathname === '/mqtt' ? 'iotdevicegateway' : 'iotdata';
      }
    } else if (service === 'autoscaling') {
      const targetPrefix = (headers.get('X-Amz-Target') || '').split('.')[0];
      if (targetPrefix === 'AnyScaleFrontendService') {
        service = 'application-autoscaling';
      } else if (targetPrefix === 'AnyScaleScalingPlannerFrontendService') {
        service = 'autoscaling-plans';
      }
    } else if (region == null && service.startsWith('s3-')) {
      region = service.slice(3).replace(/^fips-|^external-1/, '');
      service = 's3';
    } else if (service.endsWith('-fips')) {
      service = service.slice(0, -5);
    } else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) {
  [service, region] = [region, service];
    }
    return [HOST_SERVICES[service] || service, region]
  }

  exports.AwsClient = AwsClient;
  exports.AwsV4Signer = AwsV4Signer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
});

function i(r){return function(e,o,i,f){var a=i||g$2;if(!$$1)return a;var v=f||!1,c=u(o),p=u(e,!0),d=[];if(!p.length)throw new Error("noElements");if(!c.length)throw new Error("noEvent");return function n(r){var t=r?"addEventListener":"removeEventListener";r&&(d=[]);for(var e=0;e<p.length;e++){var o=p[e];d[e]=r?l(a,v):d[e]||a;for(var i=0;i<c.length;i++)o[t]?o[t](c[i],d[e],v):o["on"+c[i]]=r?d[e]:null;}return n.bind(null,!r)}(r)}}function u(n,r){if(q$1(n))return r?u(document.querySelectorAll(n)):n.split(" ").map(function(n){return n.trim()});if(NodeList.prototype.isPrototypeOf(n)){for(var t=[],i=n.length>>>0;i--;)t[i]=n[i];return t}return Hn(n)}function l(n,r){return r&&r.once?f(n):n}function f(n,r){var t;return function(){return n&&(t=n.apply(r||this,arguments),n=null),t}}var a$1=i("Event");function c$1(t,e){return $$1&&W$1(window[t])?(o=window[t],i=e,void 0===(u=window)&&(u=null),W$1(o)?function(){o.apply(u,arguments),i.apply(u,arguments);}:i):window[t]=e;var o,i,u;}c$1.bind(null,"onerror");c$1.bind(null,"onload");

var isServer = typeof window === 'undefined';
var HIDDEN = 'hidden';
/**
 * Fire a callback on tab visibility changes
 * @param  {function} callback - function to run on visibility change
 * @return {function} detach onTabChange listener
 */

function onTabChange(callback) {
  if (isServer) return false;
  var prop = getHiddenProp();
  var event = "".concat(prop.replace(/[H|h]idden/, ''), "visibilitychange");

  var handler = function handler() {
    return callback(Boolean(document[prop]));
  };

  var attachFunc = function attachFunc() {
    return document.addEventListener(event, handler);
  };

  attachFunc();
  return function () {
    document.removeEventListener(event, handler);
    return attachFunc;
  };
}

function getHiddenProp() {
  var prefixes = ['webkit', 'moz', 'ms', 'o']; // if 'hidden' is natively supported just return it

  if (isServer || HIDDEN in document) return HIDDEN; // otherwise loop over all the known prefixes until we find one

  return prefixes.reduce(function (acc, curr) {
    var prop = curr + 'Hidden';
    if (!acc && prop in document) return prop;
    return acc;
  }, null);
}

var o=["mousemove","mousedown","touchmove","touchstart","touchend","keydown"];function r(e,r){void 0===r&&(r={});var u=function(t,n){var e=this,o=!1;return function(r){o||(t.call(e,r),o=!0,setTimeout(function(){return o=!1},n));}}(e,r.throttle||1e4),i=[];function a(){var e=onTabChange(function(t){t||u({type:"tabVisible"});});return i=[e].concat(o.map(function(n){return a$1(document,n,u)})).concat(a$1(window,"load",u)).concat(a$1(window,"scroll",u,{capture:!0,passive:!0})),c}function c(){i.map(function(t){return t()});}return a(),function(){return c(),a}}function a(t){var n,e,o=t.onIdle,u=t.onWakeUp,i=t.onHeartbeat,a=t.timeout,f=void 0===a?1e4:a,l=t.throttle,s=void 0===l?2e3:l,d=!1,v=!1,p=new Date,m=function(){return clearTimeout(n)};function w(t){m(),i&&!d&&i(c(p),t),u&&d&&(d=!1,u(c(e),t),p=new Date),n=setTimeout(function(){d=!0,o&&(e=new Date,o(c(p),t));},f);}var h=r(w,{throttle:s});return {disable:function(){v=!0,d=!1,m();var t=h();return function(){return v=!1,p=new Date,w({type:"load"}),t()}},getStatus:function(){return {isIdle:d,isDisabled:v,active:d?0:c(p,v),idle:d?c(e,v):0}}}}function c(t,n){return n?0:Math.round((new Date-t)/1e3)}

var OBJ_TYPE = 'object';
var STR_TYPE = 'string';
var UNKNOWN = '?';
var NAME = 'name';
var VERSION = 'version';
var EMPTY = '';
var FUNC_TYPE = 'function';
var UNDEF_TYPE = 'undefined';
var BLACKBERRY = 'BlackBerry',
    CHROME = 'Chrome',
    FIREFOX = 'Firefox';
var windowsVersionMap = {
  'ME': '4.90',
  'NT 3.11': 'NT3.51',
  'NT 4.0': 'NT4.0',
  '2000': 'NT 5.0',
  'XP': ['NT 5.1', 'NT 5.2'],
  'Vista': 'NT 6.0',
  '7': 'NT 6.1',
  '8': 'NT 6.2',
  '8.1': 'NT 6.3',
  '10': ['NT 6.4', 'NT 10.0'],
  'RT': 'ARM'
};
var os = [[
/* Windows */
// Windows (iTunes)
/microsoft (windows) (vista|xp)/i], [NAME, VERSION], // Windows RT
[/(windows) nt 6\.2; (arm)/i, // Windows Phone                                       
/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [NAME, [VERSION, strMapper, windowsVersionMap]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]],
/* iOS/macOS */
// iOS
[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[VERSION, /_/g, '.'], [NAME, 'iOS']], // Mac OS
[/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[NAME, 'MacOS'], [VERSION, /_/g, '.']],
/*  Mobile OSes */
// Android-x86
[/droid ([\w\.]+)\b.+(android[- ]x86)/i], [VERSION, NAME], // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, // Blackberry
/(blackberry)\w*\/([\w\.]*)/i, // Tizen/KaiOS
/(tizen|kaios)[\/ ]([\w\.]+)/i, // Series 40
/\((series40);/i], [NAME, VERSION], // BlackBerry 10
[/\(bb(10);/i], [VERSION, [NAME, BLACKBERRY]], // Firefox OS
[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [VERSION, [NAME, FIREFOX + ' OS']], // WebOS
[/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [VERSION, [NAME, 'webOS']], // Google Chromecast
[/crkey\/([\d\.]+)/i], // Google Chromecast
[VERSION, [NAME, CHROME + 'cast']], // Chromium OS
[/(cros) [\w]+ ([\w\.]+\w)/i], [[NAME, 'Chromium OS'], VERSION], // Other
[// Mageia/VectorLinux
/(mageia|vectorlinux)[; ]/i, // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, // Hurd/Linux
/(hurd|linux) ?([\w\.]*)/i, // GNU
/(gnu) ?([\w\.]*)/i, // UNIX
/(unix) ?([\w\.]*)/i], [NAME, VERSION]];

function rgxMapper(ua, arrays) {
  var i = 0,
      j,
      k,
      p,
      q,
      matches,
      match; // loop through all regexes maps

  while (i < arrays.length && !matches) {
    var regex = arrays[i],
        // even sequence (0,2,4,..)
    props = arrays[i + 1]; // odd sequence (1,3,5,..)

    j = k = 0; // try matching uastring with regexes

    while (j < regex.length && !matches) {
      matches = regex[j++].exec(ua);

      if (!!matches) {
        for (p = 0; p < props.length; p++) {
          match = matches[++k];
          q = props[p]; // check if given property is actually array

          if (_typeof_1(q) === OBJ_TYPE && q.length > 0) {
            if (q.length == 2) {
              if (_typeof_1(q[1]) == FUNC_TYPE) {
                // assign modified match
                this[q[0]] = q[1].call(this, match);
              } else {
                // assign given value, ignore regex match
                this[q[0]] = q[1];
              }
            } else if (q.length == 3) {
              // check whether function or regex
              if (_typeof_1(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                // call function (usually string mapper)
                this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
              } else {
                // sanitize match using given regex
                this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
              }
            } else if (q.length == 4) {
              this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
            }
          } else {
            this[q] = match ? match : undefined;
          }
        }
      }
    }

    i += 2;
  }
}

function strMapper(str, map) {
  for (var i in map) {
    // check if current value is array
    if (_typeof_1(map[i]) === OBJ_TYPE && map[i].length > 0) {
      for (var j = 0; j < map[i].length; j++) {
        if (has(map[i][j], str)) {
          return i === UNKNOWN ? undefined : i;
        }
      }
    } else if (has(map[i], str)) {
      return i === UNKNOWN ? undefined : i;
    }
  }

  return str;
}

function has(str1, str2) {
  return _typeof_1(str1) === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
}

function lowerize(str) {
  return str.toLowerCase();
}

function getOS(ua) {
  var _ua = ua || ((typeof window === "undefined" ? "undefined" : _typeof_1(window)) !== UNDEF_TYPE && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);

  var _os = {};
  _os[NAME] = undefined;
  _os[VERSION] = undefined;
  rgxMapper.call(_os, _ua, os);
  return _os;
}

var BRAVE = 'Brave';
function browserClientInfo() {
  if (typeof window === 'undefined') {
    return {};
  }

  if (!window.navigator) {
    return {};
  }

  var _window$navigator = window.navigator,
      platform = _window$navigator.platform,
      product = _window$navigator.product,
      vendor = _window$navigator.vendor;

  var _browserType = browserType(window.navigator),
      type = _browserType.type,
      version = _browserType.version;

  var vender = type === BRAVE ? type : (vendor || '').split(' ')[0];
  return {
    platform: platform,
    os: getOS(),
    make: vender || product,
    // product always gecko
    model: type,
    version: version,
    name: [type, version].join('/'),
    language: getLanguage(),
    timezone: browserTimezone()
  };
}

function getLanguage() {
  var _window$navigator2 = window.navigator,
      language = _window$navigator2.language,
      browserLanguage = _window$navigator2.browserLanguage,
      languages = _window$navigator2.languages;
  return (language || browserLanguage || (languages || ['en_US'])[0]).toLowerCase().replace('-', '_');
}

function browserTimezone() {
  var tzMatch = /\(([A-Za-z\s].*)\)/.exec(new Date().toString());
  return tzMatch ? tzMatch[1] || '' : '';
}

function browserType(navigator) {
  var userAgent = navigator.userAgent;
  var operaMatch = /.+(Opera[\s[A-Z]*|OPR[\sA-Z]*)\/([0-9\.]+).*/i.exec(userAgent);

  if (operaMatch) {
    return {
      type: operaMatch[1],
      version: operaMatch[2]
    };
  }

  var ieMatch = /.+(Trident|Edge)\/([0-9\.]+).*/i.exec(userAgent);

  if (ieMatch) {
    return {
      type: ieMatch[1],
      version: ieMatch[2]
    };
  } // headless chrome


  var headless = /(headlesschrome)(?:\/([\w\.]+)| )/i.exec(userAgent);

  if (headless) {
    return {
      type: headless[1],
      version: headless[2]
    };
  }

  var chromeMatch = /.+(Chrome|Firefox|FxiOS)\/([0-9\.]+).*/i.exec(userAgent);

  if (chromeMatch) {
    var isBrave = navigator.brave && navigator.brave.isBrave || false;
    return {
      type: isBrave ? BRAVE : chromeMatch[1],
      version: chromeMatch[2]
    };
  }

  var safariMatch = /.+(Safari)\/([0-9\.]+).*/i.exec(userAgent);

  if (safariMatch) {
    return {
      type: safariMatch[1],
      version: safariMatch[2]
    };
  }

  var webkitMatch = /.+(AppleWebKit)\/([0-9\.]+).*/i.exec(userAgent);

  if (webkitMatch) {
    return {
      type: webkitMatch[1],
      version: webkitMatch[2]
    };
  }

  var anyMatch = /.*([A-Z]+)\/([0-9\.]+).*/i.exec(userAgent);
  var fallback = anyMatch || ['', 'NA', '0.0.0'];
  return {
    type: fallback[1],
    version: fallback[2]
  };
}

function getEventName(key) {
  var eventMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return eventMap[key] || key;
}

function prepareAttributes(_x) {
  return _prepareAttributes.apply(this, arguments);
}
/**
 * Prepares an object for inclusion in endpoint data or event data.
 *
 * @param {Object} metrics
 */

function _prepareAttributes() {
  _prepareAttributes = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(attributes) {
    var asArray,
        sanitized,
        name,
        value,
        prepValue,
        data,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            asArray = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            sanitized = {};
            _context.t0 = regenerator.keys(attributes);

          case 3:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 13;
              break;
            }

            name = _context.t1.value;
            value = Array.isArray(attributes[name]) ? attributes[name] : [attributes[name]];
            prepValue = asArray ? value : value[0]; // console.log(`name ${name}`, prepValue)

            _context.next = 9;
            return prepareData(prepValue, sanitizeAttribute);

          case 9:
            data = _context.sent;

            /* Remove any null/undefined values */
            if (!isNullOrUndef(data)) {
              sanitized[name] = data;
            }

            _context.next = 3;
            break;

          case 13:
            return _context.abrupt("return", sanitized);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _prepareAttributes.apply(this, arguments);
}

function prepareMetrics(_x2) {
  return _prepareMetrics.apply(this, arguments);
}
/**
 * Resolves an attribute or metric value and sanitize it.
 *
 * @param {mixed} value
 * @param {Function} sanitizeCallback
 */

function _prepareMetrics() {
  _prepareMetrics = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(metrics) {
    var sanitized, name;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sanitized = {};
            _context2.t0 = regenerator.keys(metrics);

          case 2:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 9;
              break;
            }

            name = _context2.t1.value;
            _context2.next = 6;
            return prepareData(metrics[name], sanitizeMetric);

          case 6:
            sanitized[name] = _context2.sent;
            _context2.next = 2;
            break;

          case 9:
            return _context2.abrupt("return", sanitized);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _prepareMetrics.apply(this, arguments);
}

function prepareData(_x3, _x4) {
  return _prepareData.apply(this, arguments);
}
/**
 * Ensure value is a string or array of strings.
 *
 * @param {mixed} value
 */


function _prepareData() {
  _prepareData = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(value, sanitizeCallback) {
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(typeof value === 'function')) {
              _context3.next = 4;
              break;
            }

            _context3.next = 3;
            return value();

          case 3:
            value = _context3.sent;

          case 4:
            return _context3.abrupt("return", sanitizeCallback(value));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _prepareData.apply(this, arguments);
}

function sanitizeAttribute(value) {
  // If null or undefined
  if (value == null) return;

  if (Array.isArray(value)) {
    return value.filter(notEmpty).map(function (val) {
      return val.toString();
    });
  } // @TODO guard against null here


  return isNullOrUndef(value) ? value : value.toString();
}
/**
 * Ensure value is a single float.
 *
 * @param {mixed} value
 */


function sanitizeMetric(value) {
  return parseFloat(Number(Array.isArray(value) ? value[0] : value));
}

function notEmpty(val) {
  return val !== null && typeof val !== 'undefined';
}

function isNullOrUndef(value) {
  return value == null;
}

/* The endpoint began a new session. */
var SESSION_START$1 = '_session.start';
/* The endpoint ended a session. */

var SESSION_STOP$2 = '_session.stop';
/* The pageview event */

var PAGE_VIEW = 'pageView';

function formatEvent(_x) {
  return _formatEvent.apply(this, arguments);
}

function _formatEvent() {
  _formatEvent = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(eventName) {
    var data,
        config,
        appTitle,
        appPackageName,
        appVersionCode,
        eventMapping,
        enrichEventAttributes,
        enrichEventMetrics,
        debug,
        logger,
        type,
        sessionData,
        sessionId,
        sessionStart,
        sessionStartUnix,
        pageSessionInfo,
        tabSessionData,
        eventAttribs,
        eventId,
        time,
        timeStamp,
        sessionDuration,
        defaultEventAttributes,
        extraAttributes,
        eventAttributes,
        userDefinedMetrics,
        defaultMetrics,
        extraMetrics,
        eventMetrics,
        preparedData,
        eventPayload,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            config = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            appTitle = config.appTitle, appPackageName = config.appPackageName, appVersionCode = config.appVersionCode, eventMapping = config.eventMapping, enrichEventAttributes = config.enrichEventAttributes, enrichEventMetrics = config.enrichEventMetrics, debug = config.debug;
            logger = debug ? console.log : function () {};
            type = getEventName(eventName, eventMapping);
            sessionData = v(); // @TODO refactor session grabber

            sessionId = data.sessionId || sessionData.id;
            sessionStart = data.sessionStart || sessionData.createdAt;
            sessionStartUnix = data.sessionStart ? new Date(data.sessionStart).getTime() : sessionData.created;
            logger('event sessionData    ', JSON.stringify(sessionData));

            if (c$2) {
              pageSessionInfo = x();
              tabSessionData = _();
              logger('event pageSessionInfo', JSON.stringify(pageSessionInfo));
              logger('event tabSessionData ', JSON.stringify(tabSessionData));
            }

            eventAttribs = data.attributes || {};
            eventId = data.eventId || y$2();
            time = data.time ? new Date(data.time) : new Date();
            timeStamp = time.toISOString();
            sessionDuration = time.getTime() - sessionStartUnix;
            defaultEventAttributes = objectSpread2({
              date: timeStamp,
              sessionId: sessionId
            }, !c$2 ? {} : {
              pageSession: pageSessionInfo.id
            });

            if (!enrichEventAttributes) {
              _context.next = 23;
              break;
            }

            _context.next = 20;
            return enrichEventAttributes();

          case 20:
            _context.t0 = _context.sent;
            _context.next = 24;
            break;

          case 23:
            _context.t0 = {};

          case 24:
            extraAttributes = _context.t0;

            /* Format attributes */
            eventAttributes = objectSpread2(objectSpread2(objectSpread2({}, defaultEventAttributes), extraAttributes), eventAttribs);
            /* Format metrics */
            // const elapsedSessionTime = elapsed + (time.getTime() - subSessionStart)

            userDefinedMetrics = data.metrics || {};
            defaultMetrics = {
              /* Time of session */
              sessionTime: sessionData.elapsed || sessionDuration,

              /* Date metrics */
              hour: time.getHours(),
              day: time.getDay() + 1,
              month: time.getMonth() + 1,
              year: time.getFullYear()
            };

            if (!enrichEventMetrics) {
              _context.next = 34;
              break;
            }

            _context.next = 31;
            return enrichEventMetrics();

          case 31:
            _context.t1 = _context.sent;
            _context.next = 35;
            break;

          case 34:
            _context.t1 = {};

          case 35:
            extraMetrics = _context.t1;
            eventMetrics = objectSpread2(objectSpread2(objectSpread2({}, defaultMetrics), extraMetrics), userDefinedMetrics);
            _context.next = 39;
            return prepareAttributes(eventAttributes);

          case 39:
            _context.t2 = _context.sent;
            _context.next = 42;
            return prepareMetrics(eventMetrics);

          case 42:
            _context.t3 = _context.sent;
            preparedData = {
              attributes: _context.t2,
              metrics: _context.t3
            };
            logger("".concat(eventId, ":").concat(type));
            logger('eventAttributes', preparedData.attributes);
            logger('eventMetrics', preparedData.metrics);

            if (c$2) {
              logger('clientInfo', browserClientInfo());
            } // const appVersionCodeString = getAppVersionCode(config)
            // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Pinpoint.html#putEvents-property


            eventPayload = defineProperty({}, eventId, objectSpread2(objectSpread2({
              /* The name of the event */
              EventType: type,

              /* The date and time, in ISO 8601 format, when the event occurred. */
              Timestamp: timeStamp,

              /* The package name of the app that's recording the event. */
              AppPackageName: appPackageName,

              /* The title of the app that's recording the event. */
              AppTitle: appTitle
            }, appVersionCode ? {
              AppVersionCode: appVersionCode
            } : {}), {}, {
              /* Event attributes - One or more custom attributes that are associated with the event. */
              Attributes: preparedData.attributes,

              /* The version of the SDK that's running on the client device. */
              // ClientSdkVersion: 'STRING_VALUE',

              /* The name of the SDK that's being used to record the event. */
              // SdkName: 'STRING_VALUE',

              /* Event metrics - One or more custom metrics that are associated with the event. */
              Metrics: preparedData.metrics,
              Session: {
                /* SessionId is required */
                Id: sessionId,

                /* StartTimestamp is required */
                StartTimestamp: sessionStart // ISOString

              }
            })); // Add session stop parameters.

            if (eventName === SESSION_STOP$2) {
              // eventPayload[eventId].Session.Duration = Date.now() - subSessionStart
              // console.log('Old DURATION', Date.now() - subSessionStart)
              eventPayload[eventId].Session.Duration = sessionDuration; // sessionData.elapsed was slightly off

              eventPayload[eventId].Session.StopTimestamp = timeStamp;
            }

            return _context.abrupt("return", eventPayload);

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _formatEvent.apply(this, arguments);
}

var ENDPOINT_KEY$1 = '__endpoint';
function getStorageKey(id) {
  return "".concat(ENDPOINT_KEY$1, ".").concat(id);
}

var ENDPOINT_KEY = '__endpoint';
var migrationRan = false;
function mergeEndpointData() {
  return _mergeEndpointData.apply(this, arguments);
}

function _mergeEndpointData() {
  _mergeEndpointData = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var endpoint,
        config,
        getUserId,
        getEndpointId,
        endpointMigration,
        context,
        sessionKey,
        pageKey,
        pageSessionInfo,
        pageSession,
        clientInfo,
        sessionData,
        id,
        deprecatedData,
        persistedEndpoint,
        appVersionString,
        demographicInfo,
        EndpointData,
        foundId,
        _foundId,
        hasPreviousSession,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            config = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            getUserId = config.getUserId, getEndpointId = config.getEndpointId, endpointMigration = config.endpointMigration;
            context = grabContext(config);
            sessionKey = context.sessionKey ? context.sessionKey() : 'sessions';
            pageKey = context.pageViewKey ? context.pageViewKey() : 'pageViews'; // const tabSessionInfo = getTabSession()

            if (c$2) {
              clientInfo = browserClientInfo();
              pageSessionInfo = x();
              pageSession = pageSessionInfo.id;
            }

            sessionData = v();
            _context.next = 10;
            return getEndpointId();

          case 10:
            id = _context.sent;

            // @TODO remove in next version
            if (!migrationRan) {
              migrationRan = true; // Backwards compatible endpoint info

              deprecatedData = c$4(ENDPOINT_KEY); // clear out old key value

              if (deprecatedData) {
                persistEndpoint(id, deprecatedData); // remove old key

                S(ENDPOINT_KEY);
              }
            }

            persistedEndpoint = getEndpoint$1(id); // const browserVersion = [clientInfo.model, clientInfo.version].join('/')

            appVersionString = getAppVersionCode(config);
            demographicInfo = getDemographicInfo(appVersionString, clientInfo); // console.log('demographicInfo', demographicInfo)

            EndpointData = {
              Attributes: {},
              Demographic: demographicInfo,
              Location: {
                /*
                City: 'STRING_VALUE',
                Country: 'STRING_VALUE',
                Latitude: 'NUMBER_VALUE',
                Longitude: 'NUMBER_VALUE',
                PostalCode: 'STRING_VALUE',
                Region: 'STRING_VALUE'
                */
              },
              Metrics: {// [`${sessionKey}Unix`]: sessionData.Unix
              }
              /** Indicates whether a user has opted out of receiving messages with one of the following values:
               * ALL - User has opted out of all messages.
               * NONE - Users has not opted out and receives all messages.
               */
              // OptOut: 'STRING_VALUE',

            };
            /* Add device attributes to endpoint */

            if (c$2) {
              if (clientInfo.device && clientInfo.device.vendor) {
                EndpointData.Attributes.DeviceMake = [clientInfo.device.vendor];
              }

              if (clientInfo.device && clientInfo.device.model) {
                EndpointData.Attributes.DeviceModel = [clientInfo.device.model];
              }

              if (clientInfo.device && clientInfo.device.type) {
                EndpointData.Attributes.DeviceType = [clientInfo.device.type];
              }
              /*
              if (endpoint.channelType && clientInfo.os.version) {
                EndpointData.ChannelType = endpoint.channelType
              }
              */

            }
            /* Merge new endpoint data with defaults. */


            endpoint = cjs.all([persistedEndpoint, EndpointData, endpoint], {
              arrayMerge: overwriteMerge // TODO maybe change array merge

            }); // Sync user ID if it's changed

            if (!(endpoint.User && endpoint.User.UserId)) {
              _context.next = 23;
              break;
            }

            _context.next = 21;
            return getUserId();

          case 21:
            foundId = _context.sent;

            if (endpoint.User.UserId !== foundId) {
              endpoint.User.UserId = foundId;
            }

          case 23:
            if (!(!endpoint.User || !endpoint.User.UserId)) {
              _context.next = 28;
              break;
            }

            _context.next = 26;
            return getUserId();

          case 26:
            _foundId = _context.sent;

            if (_foundId) {
              endpoint.User = endpoint.User || {};
              endpoint.User.UserId = _foundId;
            }

          case 28:
            if (!(endpoint.User && endpoint.User.UserAttributes)) {
              _context.next = 32;
              break;
            }

            _context.next = 31;
            return prepareAttributes(endpoint.User.UserAttributes, true);

          case 31:
            endpoint.User.UserAttributes = _context.sent;

          case 32:
            _context.next = 34;
            return prepareAttributes(endpoint.Attributes, true);

          case 34:
            endpoint.Attributes = _context.sent;
            _context.next = 37;
            return prepareMetrics(endpoint.Metrics);

          case 37:
            endpoint.Metrics = _context.sent;

            // console.log('endpoint.Metrics', endpoint.Metrics)

            /* Set initial session count */
            if (!endpoint.Metrics[sessionKey]) {
              endpoint.Metrics[sessionKey] = 1.0;
            }
            /* Set initial page view count */


            if (!endpoint.Metrics[pageKey]) {
              endpoint.Metrics[pageKey] = 1.0;
            }
            /* Custom data migration function */


            if (endpointMigration) {
              endpoint = endpointMigration(id, endpoint);
            }
            /* If this is first session, set values and return */


            hasPreviousSession = endpoint.Attributes.lastSession;

            if (hasPreviousSession) {
              _context.next = 47;
              break;
            }

            endpoint.Attributes.lastSessionDate = [sessionData.createdAt];
            endpoint.Attributes.lastSession = [sessionData.id]; // @TODO persist tab info
            // endpoint.Attributes.lastTabSession = [ tabSessionInfo.id ]

            if (pageSession) {
              endpoint.Attributes.lastPageSession = [pageSession];
            } // Store the endpoint data.
            // console.log('Set initital endpoint info')


            return _context.abrupt("return", persistEndpoint(id, endpoint));

          case 47:
            /* If current sessionId is different than lastSession */
            if (hasPreviousSession && hasPreviousSession[0] !== sessionData.id) {
              endpoint.Attributes.lastSessionDate = [sessionData.createdAt];
              endpoint.Attributes.lastSession = [sessionData.id];
              endpoint.Metrics[sessionKey] += 1.0; // console.log('Update lastSession info', sessionData.id)
            } // Increment pageViews.


            if (endpoint.Attributes && endpoint.Attributes.lastPageSession && Array.isArray(endpoint.Attributes.lastPageSession) && endpoint.Attributes.lastPageSession.length > 0 && endpoint.Attributes.lastPageSession[0] !== pageSession) {
              endpoint.Attributes.lastPageSession = [pageSession];
              endpoint.Metrics[pageKey] += 1.0; // console.log('Update lastPageSession info', pageSession)
            } // Store the endpoint data.


            return _context.abrupt("return", persistEndpoint(id, endpoint));

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _mergeEndpointData.apply(this, arguments);
}

function persistEndpoint(id, endpointData) {
  var endpointKey = getStorageKey(id);
  var data = a$2(endpointData) ? endpointData : JSON.stringify(endpointData);
  m$1(endpointKey, data);
  return endpointData;
}

function getEndpoint$1(id) {
  try {
    return JSON.parse(c$4(getStorageKey(id))) || {};
  } catch (error) {}

  return {};
}

function getDemographicInfo(appVersionString, clientInfo) {
  return c$2 ? getBrowserDemographicInfo(appVersionString, clientInfo) : getServerDemographicInfo(appVersionString);
}

function getServerDemographicInfo(appVersionString) {
  var demographicInfo = {
    AppVersion: appVersionString,
    Make: 'generic server',
    Platform: 'Node.js',
    PlatformVersion: process.version
  };
  return demographicInfo;
}

function getBrowserDemographicInfo(appVersionString, clientInfo) {
  var demographicInfo = {
    // AppTitle/0.0.0. Maps to application.version_name in kinesis stream
    AppVersion: appVersionString,

    /* The locale of the endpoint, in the following format: 
       the ISO 639-1 alpha-2 code, followed by an underscore (_), 
       followed by an ISO 3166-1 alpha-2 value. 
    */
    Locale: clientInfo.language,
    // Maker - Google/Mozilla/Apple
    Make: clientInfo.make,
    // Model - Safari/Chrome/Brave/Opera
    Model: clientInfo.model,
    // ModelVersion - 91.0.0
    ModelVersion: clientInfo.version,
    // Platform - os name
    Platform: clientInfo.os.name || clientInfo.platform // PlatformVersion: browserVersion,
    // Timezone: 'STRING_VALUE'

  };

  if (clientInfo.os && clientInfo.os.version) {
    demographicInfo.PlatformVersion = clientInfo.os.version;
  }

  return demographicInfo;
}

function getAppVersionCode(config) {
  var appName = config.appTitle || config.appPackageName || '';
  var appVersion = config.appVersionCode || '0.0.0';
  return appName ? "".concat(appName, "@").concat(appVersion) : appVersion;
}
/**
 * Array merge function for deepmerge.
 *
 * @param {Array} destinationArray
 * @param {Array} sourceArray
 */


function overwriteMerge(_destinationArray, sourceArray) {
  return sourceArray;
}

function grabContext(_ref) {
  var getContext = _ref.getContext;

  if (typeof getContext === 'function') {
    return getContext();
  }

  return getContext;
}

function createEventQueue(queue) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return /*#__PURE__*/function () {
    var _queueEvent = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(eventName) {
      var eventData,
          endpoint,
          flush,
          eventPayload,
          _args = arguments;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              eventData = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              endpoint = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              flush = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;

              if (d(eventData)) {
                eventData = {};
                flush = eventData;
              }

              if (d(endpoint)) {
                endpoint = {};
                flush = endpoint;
              }

              _context.next = 7;
              return formatEvent(eventName, eventData, config);

            case 7:
              eventPayload = _context.sent;

              if (!(Object.entries(endpoint).length || eventName === PAGE_VIEW)) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return mergeEndpointData(endpoint, config);

            case 11:
              endpoint = _context.sent;

            case 12:


              queue.push(eventPayload); // If config setting to send every event as it happens

              if (!flush) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", queue.flush());

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function queueEvent(_x) {
      return _queueEvent.apply(this, arguments);
    }

    return queueEvent;
  }();
}

var AWS;

var RETRYABLE_CODES = [429, 500];
var ACCEPTED_CODES = [202];
var BAD_REQUEST_CODE = 400;
function callAws(_x, _x2) {
  return _callAws.apply(this, arguments);
}

function _callAws() {
  _callAws = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(eventsRequest, config) {
    var pinpointRegion, pinpointAppId, lambdaArn, lambdaRegion, credentials, getCredentials, debug, auth, lambda_region, pinpoint_region, fips, LAMBDA_FN, PINPOINT_URL, endpointUrl, aws, data, payload, command, responses;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pinpointRegion = config.pinpointRegion, pinpointAppId = config.pinpointAppId, lambdaArn = config.lambdaArn, lambdaRegion = config.lambdaRegion, credentials = config.credentials, getCredentials = config.getCredentials, debug = config.debug;
            _context.next = 3;
            return getAuth(credentials, getCredentials);

          case 3:
            auth = _context.sent;

            if (debug) {
              console.log('pinpoint auth', auth);
            }

            lambda_region = lambdaRegion || pinpointRegion;
            pinpoint_region = pinpointRegion || lambdaRegion;
            fips = config.fips === true ? '-fips' : '';
            LAMBDA_FN = "https://lambda.".concat(lambda_region, ".amazonaws.com/2015-03-31/functions/").concat(lambdaArn, "/invocations");
            PINPOINT_URL = "https://pinpoint".concat(fips, ".").concat(pinpoint_region, ".amazonaws.com/v1/apps/").concat(pinpointAppId, "/events");
            endpointUrl = lambdaArn ? LAMBDA_FN : PINPOINT_URL;
            /* @TODO get beacon working with API gateway/lambda/pinpoint legacy endpoint
            function testBeacon() {
              return () => {
                sendBeaconRequest({
                  credentials: auth,
                  region: pinpoint_region,
                  pinpointAppId: pinpointAppId,
                  eventsRequest: eventsRequest,
                  // url: `https://pinpoint.${region}.amazonaws.com/v1/apps/${pinpointAppId}/events/legacy`;
                  url: LAMBDA_FN
                })
              }
            }
            window.testBeacon = testBeacon
            /**/

            payload = {
              body: JSON.stringify(eventsRequest)
            };

            aws = new aws4fetch_umd.AwsClient(auth);
            _context.next = 16;
            return aws.fetch(endpointUrl, payload).then(function (d) {
              return d.json();
            });

          case 16:
            data = _context.sent;
            _context.next = 24;
            break;

          case 19:
            aws = new AWS.PinpointClient({
              credentials: auth,
              region: pinpointRegion
            });
            command = new AWS.PutEventsCommand({
              ApplicationId: pinpointAppId,
              EventsRequest: eventsRequest
            });
            _context.next = 23;
            return aws.send(command);

          case 23:
            data = _context.sent;

          case 24:
            if (data && data.Results) {
              // Process api responses
              responses = Object.keys(data.Results).map(function (eventId) {
                return data.Results[eventId];
              });
              /* Message: "Session duration in milliseconds must be equal to the difference of start and stop timestamp"
              StatusCode: 400
              Session: {Id: "c024eae8-4978-4d2b-898d-31b89ddd62d3", StartTimestamp: "2021-05-25T06:09:30.632Z", Duration: 20008, StopTimestamp: "2021-05-25T06:09:50.641Z"}
              // new Date('2021-05-25T06:09:50.641Z').getTime() - new Date('2021-05-25T06:09:30.632Z').getTime() === 20009 */

              responses.forEach(function (resp) {
                var EndpointItemResponse = resp.EndpointItemResponse || {};
                var EventsItemResponse = resp.EventsItemResponse || {};

                if (Object.keys(EndpointItemResponse).length) {

                  if (ACCEPTED_CODES.includes(EndpointItemResponse.StatusCode)) ; else if (RETRYABLE_CODES.includes(EndpointItemResponse.StatusCode)) ; else {
                    // Try to handle error
                    handleEndpointUpdateBadRequest(EndpointItemResponse, Endpoint);
                  }
                }

                var events = Object.keys(EventsItemResponse);

                if (events.length) {

                  events.forEach(function (eventId) {// @TODO handle 400 errors
                    // console.log(`[req "${Endpoint.RequestId}"] Event id ${eventId}`, EventsItemResponse[eventId])
                  });
                }
              });
            }

            return _context.abrupt("return", data);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _callAws.apply(this, arguments);
}

function getAuth(_x3, _x4) {
  return _getAuth.apply(this, arguments);
}

function _getAuth() {
  _getAuth = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(credentials, getCredentials) {
    var creds, auth;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            creds = credentials;
            /* Use custom creds function */

            if (!(!Object.keys(creds).length && getCredentials)) {
              _context2.next = 11;
              break;
            }

            _context2.prev = 2;
            _context2.next = 5;
            return getCredentials();

          case 5:
            creds = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            throw new Error(_context2.t0);

          case 11:
            auth = {
              // Support amplify and raw client auth params
              accessKeyId: creds.accessKeyId || creds.AccessKeyId,
              secretAccessKey: creds.secretAccessKey || creds.SecretKey,
              sessionToken: creds.sessionToken || creds.SessionToken,
              retries: 5
            };
            return _context2.abrupt("return", auth);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));
  return _getAuth.apply(this, arguments);
}

function handleEndpointUpdateBadRequest(error, endpoint) {
  var StatusCode = error.StatusCode,
      Message = error.Message; // console.log('message', Message)

  if (StatusCode === BAD_REQUEST_CODE) {
    // 400
    if (Message.startsWith('Missing ChannelType')) {
      throw new Error('Missing ChannelType');
    }

    if (Message.startsWith('Exceeded maximum endpoint per user count')) {
      throw new Error('Exceeded maximum endpoint per user count');
    }
  }
}

var ALLOWED_CHANNELS = ['PUSH', 'GCM', 'APNS', 'APNS_SANDBOX', 'APNS_VOIP', 'APNS_VOIP_SANDBOX', 'ADM', 'SMS', 'VOICE', 'EMAIL', 'BAIDU', 'CUSTOM' // 'IN_APP' what is this?
];
var CHANNEL_TYPES = ALLOWED_CHANNELS.reduce(function (acc, curr) {
  acc[curr] = curr;
  return acc;
}, {});

var clientInfo = browserClientInfo();
var SESSION_START = SESSION_START$1,
    SESSION_STOP$1 = SESSION_STOP$2;
var EMAIL_REGEX = /.+\@.+\..+/;

function isEmail(string) {
  return EMAIL_REGEX.test(string);
}

function createPinpointSender() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getEndpointId = config.getEndpointId,
      debug = config.debug;
  return /*#__PURE__*/function () {
    var _pinpointPutEvent = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var eventsArray,
          endpointInfo,
          id,
          hasEndpoint,
          endpoint,
          channelType,
          events,
          eventsRequest,
          response,
          error,
          _args = arguments;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              eventsArray = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
              endpointInfo = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.next = 4;
              return getEndpointId();

            case 4:
              id = _context.sent;

              if (id) {
                _context.next = 8;
                break;
              }

              console.error('No endpoint id. check getEndpointId()');
              return _context.abrupt("return");

            case 8:
              hasEndpoint = _typeof_1(endpointInfo) === 'object' && Object.keys(endpointInfo).length;

              if (hasEndpoint) {
                _context.next = 13;
                break;
              }

              _context.t0 = getEndpoint(id);
              _context.next = 16;
              break;

            case 13:
              _context.next = 15;
              return mergeEndpointData(endpointInfo, config);

            case 15:
              _context.t0 = _context.sent;

            case 16:
              endpoint = _context.t0;
              channelType = endpoint.ChannelType; // If email is set, set email channel

              if (endpoint.Address && isEmail(endpoint.Address)) {
                channelType = CHANNEL_TYPES.EMAIL;
              }

              if (!channelType && endpoint.Address) {
                if (clientInfo.platform === 'android') {
                  channelType = channelType || CHANNEL_TYPES.GCM;
                } else {
                  channelType = channelType || CHANNEL_TYPES.APNS;
                }
              }

              if (debug) {
                console.log('Endpoint', endpoint);
                console.log('CHANNEL_TYPE', channelType);
              } // Build endpoint data.


              endpoint.RequestId = y$2();
              endpoint.ChannelType = channelType;

              if (endpoint.Address) {
                // https://amzn.to/3bYC5gp
                // Default OptOut is ALL
                // OptOut: 'NONE',
                endpoint.OptOut = endpoint.OptOut || 'NONE';
              } // const endpointId = endpointId.replace(`${COGNITO_REGION}:`, '' )
              // Build events request object.


              events = sortEvents(eventsArray);
              eventsRequest = formatPinpointBody(id, endpoint, events); // console.log('New eventsRequest', eventsRequest)

              _context.prev = 26;
              _context.next = 29;
              return callAws(eventsRequest, config);

            case 29:
              response = _context.sent;
              _context.next = 36;
              break;

            case 32:
              _context.prev = 32;
              _context.t1 = _context["catch"](26);
              console.log('Error calling AWS', _context.t1);
              error = _context.t1;

            case 36:
              return _context.abrupt("return", {
                endpoint: endpoint,
                response: response,
                error: error,
                events: eventsArray
              });

            case 37:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[26, 32]]);
    }));

    function pinpointPutEvent() {
      return _pinpointPutEvent.apply(this, arguments);
    }

    return pinpointPutEvent;
  }();
}

function getEndpoint(id) {
  try {
    return JSON.parse(c$4(getStorageKey(id))) || {};
  } catch (error) {}

  return {};
}

function sortEvents(events) {
  return events.sort(function (a, b) {
    var eventA = a.EventType;
    var eventB = b.EventType; // Send SESSION_START to front

    if (eventA == SESSION_START) return -1;
    if (eventB == SESSION_START) return 1; // Send SESSION_STOP to back

    if (eventA == SESSION_STOP$1) return 1;
    if (eventB == SESSION_STOP$1) return -1;
    return;
  }).reduce(function (acc, event) {
    return objectSpread2(objectSpread2({}, event), acc);
  }, {});
}

function formatPinpointBody(endpointId, endpoint, events) {
  return {
    BatchItem: defineProperty({}, endpointId, {
      Endpoint: endpoint,
      Events: events
    })
  };
}

var SESSION_STOP = SESSION_STOP$2;

function noOp() {
  return {};
}

function initialize() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // @TODO clean up
  var configuration = objectSpread2({
    getContext: config.getContext || noOp,
    credentials: config.credentials || {},
    getEndpointId: config.getEndpointId
  }, config);

  var logger = configuration.debug ? console.log : function () {}; // Create function that sends to pinpoint

  var pinpointPutEvent = createPinpointSender(configuration);
  var queue = t( /*#__PURE__*/function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(events, rest) {
      var response;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              events.forEach(function (event) {
                return logger('> Queue event', event);
              });
              _context.next = 3;
              return pinpointPutEvent(events, {});

            case 3:
              response = _context.sent;
              logger('> Queue response', response);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), {
    max: 10,
    // limit... event limit is 100 for pinpoint
    interval: config.flushInterval || 3000,
    // 3s
    throttle: true // Ensure only max is processed at interval
    // onPause: (queue) => {},
    // onEmpty: () => {}

  });
  /* Create instance of recordEvent queue */

  var queueEvent = createEventQueue(queue, configuration);
  /* Run initialize endpoint merge */

  mergeEndpointData({}, config); // Flush remaining events on page close

  var detachUnloadListener = onWindowUnload(queueEvent);

  function updateEndpoint(endpoint) {
    // console.log('Call update immediately')
    return pinpointPutEvent([], endpoint);
  } // Function to detach listeners


  return {
    updateEndpoint: updateEndpoint,
    recordEvent: queueEvent,
    disable: function disable() {
      detachUnloadListener();
    }
  };
}

function onWindowUnload(queueEvent) {
  if (!c$2) {
    return noOp;
  }

  var stopSessionHandler = stopSessionFactory(queueEvent);
  window.addEventListener('beforeunload', stopSessionHandler);
  return function () {
    return window.removeEventListener('beforeunload', stopSessionHandler);
  };
}

function stopSessionFactory(queueEvent) {
  // Flush remaining events
  return function () {
    queueEvent(SESSION_STOP, true);
  };
}
/* @TODO wire up beacon */

/* mints URL like
https://pinpoint.us-east-1.amazonaws.com/v1/apps/undefined/events/legacy?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MJCKUDEZ7LNOGEQ%2F20210603%2Fus-east-1%2Fmobiletargeting%2Faws4_request&X-Amz-Date=20210603T072400Z&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLWVhc3QtMSJHMEUCIDXqsRUHXcYO7evSAbFndvriZLwsjgWE1K589Ls2VsjwAiEAyrwV8L9j44pSMnoPTctYI824WVMXq7sl%2BGe%2FtesfoNIqmgYI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTk3MzE4NzE5NDUiDIahpd6Ez5lb38TwgCruBWM0LneAkgxPXtb%2B88hoXqpOyrLCWtuNiIBYyvpmfYTbOO%2Bw8JjmH9BVDcVdc2dyvzU4iFT4eX0tsRnJzKGzu6pdyYrGsj5H5vJgNw9muSKBXkEEv95OBTQHsC09kWayC4gNdeVbVzaSonwAtWln7VNT1SvdhT8UFCmm7xoBu1nYdwH49AF%2FHOC8PL69swK4pKzg3OQF5ioL%2B70%2FD1HHU51JD%2Bq5vNsupFZbgSqObopq52PM1FEs%2FlnsnbA8JdIe2IxZYKlz6Y6kL6evz3t5YlERTfI%2FG6jRAaTq0kl7OxQyCTqCb4JVfFFD%2BjVksFcOTyezgPhCcAsVqV0BPVZoeiv%2BysSlSjsiKKAUWHvH6GeUD5HtOT304%2F%2F2vT5I01tG0jHuAE%2BCvX5hm2xYN4VE9YFwFmHTFxBcNEKUjrflkmrnotOR5TTWW95VDm2MwUR1XEw8Ptuf4pr%2BLUXZ93UfiFG8edbupdCk71HNIfZeE85TNnh%2B1BDp0rVl9m15Jf2jf%2BlqddExqf82wnAe9MA8iPdIH%2Fqo7uyp75ev4Mjm90jlkBrL6LSk9g9dB9VFeDJing4J77pofuykVrZeTwpnEJQhUaqbU6Br1oVcogUtVfgSlh23Y9PjBx8%2BAfMC%2Ft0vhwnHSpb5NJGOcH6LWBUSpcBKaR7ZvZRWv4jVNKqT2jGPPAWUNbdueQgH1YT98X0jicmQm44u2to6MmINT0D8ZOG4qZc9PLu4wfI10toJMCg1QZ7BujIkPWgAMmOMtEsUri73CaID3tTpLhy6zzwrv%2B8NCOaKIMsFmsjC3IdJrOT15gcbV36sF682mBpvACWKzjnnPJo4NiwKsXk2kM%2FGa7kPF6R4VmtUfnJ2IIhxBaWVs4hxUJ82j1Dxp3DBJfBhEZUJb4ePRV07EJNC2iqTRQKgE8GpKSEJy838OkG2Md4i507iXwA8Q6j32OeaWY%2B%2F2oBorfgAIl8oKGMHhUyibX8M6rIvHKZnSENYaZaupTD4huKFBjqHAv9LIc9mjKVJ3BM0SzW8LDBc0jpMgccrAzgjGicP2iN%2FE%2B%2FauVMBHybr0dJQ7ixKOrp0QRxctEOmtv56FBF0md8T37xe7dwqt6mN94BnEOgZcz7k9uY9uXLS4nKan%2Fs7IFPzzduXlcdL4xbwLsdRcHrIaAyKiHzVI67jQlkr3dgW3ROQRRkJM4muccO29hopbtgfqamI3iTck2NDhCY%2B%2Bs8eZLtwmVV08A5DsdZqKcrePapltZO31e8ZSZEN6P3cnyPjTSuyvguPZWg1JAnFSBGAgMYmx7jmfcdULjb4L9KlJgcyTr5%2FQ2y8pUdi1wYTEMr%2FhhK%2FB2IjFOq78Uv8bj%2FtQmCbGMxN&X-Amz-SignedHeaders=host&X-Amz-Signature=a2304d65c0a894d736671a8b446a55f255e0745704c19ddd8951d265f39dcc7d
*/

/*
function sendBeaconRequest({ 
  credentials, 
  pinpointAppId, 
  region, 
  eventsRequest,
  url
}) {
	const accessInfo = {
		secret_key: credentials.secretAccessKey,
		access_key: credentials.accessKeyId,
		session_token: credentials.sessionToken,
	}
	const body = JSON.stringify(eventsRequest);
	const method = 'POST';

  // Pinpointt https://pinpoint.us-east-1.amazonaws.com/v1/apps/1111/events/legacy
	const request = {
		url,
		body,
		method,
	};

	const serviceInfo = { 
    region, 
    //service: 'mobiletargeting',
    service: 'lambda' 
  };

	const requestUrl = Signer.signUrl(
		request,
		accessInfo,
		serviceInfo,
		null
	);

	const success = navigator.sendBeacon(requestUrl, body);

	if (success) {
		return console.log('sendBeacon success');
	}
	return console.log('sendBeacon failure');
}
/**/

/* updateEndpoint usage:
updateEndpoint({
  "Address": 'test@gmail.com',
  "Attributes": { "lol": ['thing'], baz: 'bar' },
  "Demographic": {
    "AppVersion": string,
    "Locale": string,
    "Make": string,
    "Model": string,
    "ModelVersion": string,
    "Platform": string,
    "PlatformVersion": string,
    "Timezone": string
  },
  "Location": {
    "City": string,
    "Country": string,
    "Latitude": number,
    "Longitude": number,
    "PostalCode": string,
    "Region": string
  },
  "Metrics": { "key": 1 },
  "OptOut": 'NONE',
  "User": {
    "UserAttributes": { "key": 'baz', 'waht': ['chill'] },
    "UserId": 'user-123'
  }
})

// smaller example
updateEndpoint({
  "Address": 'jimbo@gmail.com',
  "Attributes": { "lol": ['thing'], baz: 'bar' },
  "Metrics": { "key": 1 },
  "OptOut": 'NONE',
  "User": {
    "UserAttributes": { "key": 'baz', 'waht': ['chill'] },
    "UserId": 'user-xyz'
  }
})
*/

function loadError() {
  throw new Error('Pinpoint not loaded');
}

function formatEventData(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    var value = obj[key];

    if (typeof value === 'number') {
      acc.metrics[key] = value;
    }

    if (typeof value === 'string' || typeof value === 'boolean') {
      acc.attributes[key] = value;
    }

    return acc;
  }, {
    attributes: {},
    metrics: {}
  });
}

function bootstrap(pluginApi) {
  var config = pluginApi.config,
      instance = pluginApi.instance;
  /* Load aws-pinpoint script after userId exists */

  if (config && config.disableAnonymousTraffic && !instance.user('userId')) {
    instance.once('identifyStart', function (_ref) {
      var plugins = _ref.plugins;
      var self = plugins['aws-pinpoint'];

      if (!self.loaded()) {
        instance.loadPlugin('aws-pinpoint');
      }
    });
  }
}

// import { onScrollChange } from '@analytics/scroll-utils'
// @TODO turn on consent
// let hasAnonConsent = document.cookie.match(`__anon-consent=true`)
// let hasFullConsent = document.cookie.match(`__full-consent=true`)

var config = {
  /* Disable anonymous MTU */
  disableAnonymousTraffic: false,
  // Pinpoint service region
  pinpointRegion: 'us-east-1',
  // Custom event mapping
  eventMapping: {}
};
/**
 * AWS Pinpoint analytics integration
 * @link https://docs.aws.amazon.com/pinpoint/latest/developerguide/
 * @param {object} pluginConfig - Plugin settings
 * @param {string} pluginConfig.pinpointAppId - AWS Pinpoint app Id for client side tracking
 * @param {function} pluginConfig.getCredentials - Async function to get AWS Cognito creds
 * @param {string} [pluginConfig.pinpointRegion] - AWS Pinpoint region. Defaults to us-east-1
 * @param {string} [pluginConfig.appTitle] - The title of the app that's recording the event.
 * @param {string} [pluginConfig.appPackageName] - The name of the app package, such as com.example.my_app.
 * @param {string} [pluginConfig.appVersionCode] - The version number of the app, such as 3.2.0
 * @param {string} [pluginConfig.fips] - Use the AWS FIPS service endpoint for Pinpoint
 * @param {boolean} [pluginConfig.disableAnonymousTraffic] -  Disable anonymous events from firing
 * @return {object} Analytics plugin
 * @example
 *
 * awsPinpointPlugin({
 *   pinpointAppId: '938bebb1ae954e123133213160f2b3be4',
 *   getCredentials: () => Auth.currentCredentials(),
 * })
 */

function awsPinpointPlugin() {
  var pluginConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var recordEvent;
  var updateEndpoint;
  // let scrollDepthNow = 0

  /* Page-session (on route changes) */

  var hasPageFiredOnce = false;

  function stopSession() {
    var currentSessionData = v();

    if (pluginConfig.debug) {
      console.log('Stop session', currentSessionData);
    } // Fire session stop event.


    recordEvent(SESSION_STOP$2, true);
  } // window.stopSession = stopSession


  function startNewSession() {
    // Set new sessions.
    var newSession = p(30);

    if (pluginConfig.debug) {
      console.log('START SESSION', newSession);
    } // @TODO do we want this here?....
    // const pageSession = generatePageSession()

    /* Fire session start event. */


    recordEvent(SESSION_START$1);
  } // window.startSession = startNewSession

  /* return plugin */


  return {
    name: 'aws-pinpoint',
    config: objectSpread2(objectSpread2({}, config), pluginConfig),
    bootstrap: bootstrap,
    initialize: function initialize$1(_ref) {
      var config = _ref.config,
          instance = _ref.instance;
      var disableAnonymousTraffic = config.disableAnonymousTraffic,
          debug = config.debug;
      var logger = debug ? console.log : function () {};
      /* Disable pinpoint if user is not yet identified. */

      var state = instance.getState();
      var userDetails = state.user || {};
      var userId = userDetails.userId,
          anonymousId = userDetails.anonymousId;
      var context = state.context || {};
      var app = context.app,
          version = context.version,
          campaign = context.campaign;
      /* Initialize session info */

      var initPageSession = x();
      var initTabSession = _();
      var initSessionData = v();
      logger('initPageSession', initPageSession);
      logger('initTabSession', initTabSession);
      logger('initSessionData', initSessionData);
      /* If anonId has changed, refresh session details */

      if (initSessionData && initSessionData.anonId && initSessionData.anonId !== anonymousId) {
        logger('anonId different refresh session details'); // console.log('anonId', anonymousId)
        // console.log('initSessionData.anonId', initSessionData.anonId)

        /* Set new page session values */

        y();
        /* Set new tab session values */

        b();
        /* Set new session for new user */

        var newSessionForNewUser = p(30, {
          anonId: anonymousId,
          userId: userId
        });
        logger('newSessionForNewUser', newSessionForNewUser);
      }
      /* Disable for anonymous users */


      if (!userId && disableAnonymousTraffic) {
        return false;
      } // construct utm params


      var utmParams = Object.keys(campaign).reduce(function (acc, key) {
        acc["utm_".concat(key)] = campaign[key];
        return acc;
      }, {});
      /* Initialize pinpoint client */

      var pinpointClient = initialize(objectSpread2(objectSpread2({}, config), {}, {
        // The title of the app that's recording the event.
        appTitle: config.appTitle || app,
        // The package name of the app that's recording the event.
        appPackageName: config.appPackageName || app,
        // The version number of the app that's recording the event.
        appVersionCode: config.appVersionCode || version,
        // Custom event mapping
        eventMapping: config.eventMapping,
        // Get pinpoint endpoint ID
        getEndpointId: function getEndpointId() {
          return instance.user('anonymousId');
        },
        getUserId: function getUserId() {
          return instance.user('userId');
        },
        getContext: function getContext() {
          return {
            sessionKey: config.sessionKey,
            pageViewKey: config.pageViewKey,
            initialSession: initSessionData // scrollDepth: scrollDepthNow,
            // scrollDepthMax

          };
        },
        enrichEventAttributes: function enrichEventAttributes() {
          return objectSpread2({
            anonId: instance.user('anonymousId'),
            userId: instance.user('userId'),
            hash: window.location.hash,
            path: window.location.pathname,
            referrer: document.referrer,
            search: window.location.search,
            title: document.title,
            host: window.location.hostname,
            url: window.location.origin + window.location.pathname
          }, utmParams);
        },
        // Custom event mapping
        enrichUserAttributes: config.enrichUserAttributes,
        // Pass scroll into with all events
        enrichEventMetrics: function enrichEventMetrics() {
          return {};
          /* {
            scrollDepth: scrollDepthNow,
            scrollDepthMax
          }*/
        }
      }));

      recordEvent = pinpointClient.recordEvent;
      updateEndpoint = pinpointClient.updateEndpoint;

      if (initSessionData && initSessionData.isNew) {
        logger("Start brand new session because cookie not found");
        /* Start new session if its new */

        recordEvent(SESSION_START$1);
      }
      var THIRTY_MINUTES = 180e4; // 1800000ms

      var SESSION_LENGTH = THIRTY_MINUTES; // SESSION_LENGTH = 20000

      a({
        timeout: SESSION_LENGTH,
        throttle: 20000,
        onIdle: function onIdle(activeTime, event) {
          logger("Session idle. Active ".concat(activeTime, " seconds")); // Stop session

          stopSession();
        },
        onWakeUp: function onWakeUp(idleTime, event) {
          logger("Session wakeup. Idle ".concat(idleTime, " seconds")); // Reset session info

          startNewSession();
        },
        onHeartbeat: function onHeartbeat(timeActive, event) {
          logger('ping session', new Date());
          logger('total active time', timeActive);
          /* Extend current session by 30 minutes */

          var user = instance.user();
          m(30, {
            anonId: user.anonymousId,
            userId: user.userId
          });
        }
      });
      /* Old session handler
      tabListener = onTabChange((isHidden) => {
        console.log('isHidden', isHidden)
        if (isHidden) {
          stopSession()
        } else {
          console.log('Reset session!')
          startNewSession()
        }
      })*/

      /* Scroll tracking
      function pageScrolled(data) {
        const { trigger, direction, scrollMax, scrollMin, range } = data
        // Set current scroll values 
        scrollDepthNow = trigger
        scrollDepthMax = scrollMax
        // Record page scroll event 
        recordEvent('pageScrolled')
      }
      const detachScrollListener = onScrollChange({
        // 25: pageScrolled,
        50: pageScrolled,
        75: pageScrolled,
        90: pageScrolled
      })*/
    },
    page: function page(_ref2) {

      if (!recordEvent) {
        return loadError();
      } // Fire page view and update pageSessionInfo Id


      if (hasPageFiredOnce) {
        // Set new page session values
        y();
      }

      recordEvent(PAGE_VIEW);
      hasPageFiredOnce = true;
    },

    /* Track event & update endpoint details */
    track: function track(_ref3) {
      var payload = _ref3.payload,
          config = _ref3.config;

      if (!recordEvent) {
        return loadError();
      }

      if (config.disableAnonymousTraffic && !payload.userId) {
        return;
      }

      var data = formatEventData(payload.properties);
      recordEvent(payload.event, data);
    },

    /* Update endpoint details */
    identify: function identify(_ref4) {
      var payload = _ref4.payload;
      var userId = payload.userId,
          traits = payload.traits;

      if (!updateEndpoint) {
        return loadError();
      }

      var endpoint = {};
      var userInfo = {};

      if (userId) {
        userInfo.UserId = userId;
      }

      if (traits && Object.keys(traits).length) {
        userInfo.UserAttributes = traits;
      }

      if (Object.keys(userInfo).length) {
        endpoint.User = userInfo;
      } // Update endpoint in AWS pinpoint


      updateEndpoint(endpoint, true);
    },

    /* Reset user details */
    reset: function reset(_ref5) {
      var instance = _ref5.instance;
      var id = instance.user('anonymousId');
      var key = getStorageKey(id);
      storage.removeItem(key);
    },
    loaded: function loaded() {
      return !!recordEvent;
    }
  };
}

/* This module will shake out unused code + work in browser and node 🎉 */

var index = awsPinpointPlugin ;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Checks parameters to see if we should use FormData to send the request
 * @param params The object whose keys will be encoded.
 * @return A boolean indicating if FormData will be required.
 */
function requiresFormData(params) {
    return Object.keys(params).some(function (key) {
        var value = params[key];
        if (!value) {
            return false;
        }
        if (value && value.toParam) {
            value = value.toParam();
        }
        var type = value.constructor.name;
        switch (type) {
            case "Array":
                return false;
            case "Object":
                return false;
            case "Date":
                return false;
            case "Function":
                return false;
            case "Boolean":
                return false;
            case "String":
                return false;
            case "Number":
                return false;
            default:
                return true;
        }
    });
}
/**
 * Converts parameters to the proper representation to send to the ArcGIS REST API.
 * @param params The object whose keys will be encoded.
 * @return A new object with properly encoded values.
 */
function processParams(params) {
    var newParams = {};
    Object.keys(params).forEach(function (key) {
        var _a, _b;
        var param = params[key];
        if (param && param.toParam) {
            param = param.toParam();
        }
        if (!param &&
            param !== 0 &&
            typeof param !== "boolean" &&
            typeof param !== "string") {
            return;
        }
        var type = param.constructor.name;
        var value;
        // properly encodes objects, arrays and dates for arcgis.com and other services.
        // ported from https://github.com/Esri/esri-leaflet/blob/master/src/Request.js#L22-L30
        // also see https://github.com/Esri/arcgis-rest-js/issues/18:
        // null, undefined, function are excluded. If you want to send an empty key you need to send an empty string "".
        switch (type) {
            case "Array":
                // Based on the first element of the array, classify array as an array of arrays, an array of objects
                // to be stringified, or an array of non-objects to be comma-separated
                // eslint-disable-next-line no-case-declarations
                var firstElementType = (_b = (_a = param[0]) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name;
                value =
                    firstElementType === "Array" ? param : // pass thru array of arrays
                        firstElementType === "Object" ? JSON.stringify(param) : // stringify array of objects
                            param.join(","); // join other types of array elements
                break;
            case "Object":
                value = JSON.stringify(param);
                break;
            case "Date":
                value = param.valueOf();
                break;
            case "Function":
                value = null;
                break;
            case "Boolean":
                value = param + "";
                break;
            default:
                value = param;
                break;
        }
        if (value || value === 0 || typeof value === "string" || Array.isArray(value)) {
            newParams[key] = value;
        }
    });
    return newParams;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Encodes keys and parameters for use in a URL's query string.
 *
 * @param key Parameter's key
 * @param value Parameter's value
 * @returns Query string with key and value pairs separated by "&"
 */
function encodeParam(key, value) {
    // For array of arrays, repeat key=value for each element of containing array
    if (Array.isArray(value) && value[0] && Array.isArray(value[0])) {
        return value.map(function (arrayElem) { return encodeParam(key, arrayElem); }).join("&");
    }
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
}
/**
 * Encodes the passed object as a query string.
 *
 * @param params An object to be encoded.
 * @returns An encoded query string.
 */
function encodeQueryString(params) {
    var newParams = processParams(params);
    return Object.keys(newParams)
        .map(function (key) {
        return encodeParam(key, newParams[key]);
    })
        .join("&");
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Encodes parameters in a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object in browsers or in a [FormData](https://github.com/form-data/form-data) in Node.js
 *
 * @param params An object to be encoded.
 * @returns The complete [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
 */
function encodeFormData(params, forceFormData) {
    // see https://github.com/Esri/arcgis-rest-js/issues/499 for more info.
    var useFormData = requiresFormData(params) || forceFormData;
    var newParams = processParams(params);
    if (useFormData) {
        var formData_1 = new FormData();
        Object.keys(newParams).forEach(function (key) {
            if (typeof Blob !== "undefined" && newParams[key] instanceof Blob) {
                /* To name the Blob:
                 1. look to an alternate request parameter called 'fileName'
                 2. see if 'name' has been tacked onto the Blob manually
                 3. if all else fails, use the request parameter
                */
                var filename = newParams["fileName"] || newParams[key].name || key;
                formData_1.append(key, newParams[key], filename);
            }
            else {
                formData_1.append(key, newParams[key]);
            }
        });
        return formData_1;
    }
    else {
        return encodeQueryString(params);
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// TypeScript 2.1 no longer allows you to extend built in types. See https://github.com/Microsoft/TypeScript/issues/12790#issuecomment-265981442
// and https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
//
// This code is from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types.
var ArcGISRequestError = /** @class */ (function () {
    /**
     * Create a new `ArcGISRequestError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param response - The original response from the API that caused the error
     * @param url - The original url of the request
     * @param options - The original options and parameters of the request
     */
    function ArcGISRequestError(message, code, response, url, options) {
        message = message || "UNKNOWN_ERROR";
        code = code || "UNKNOWN_ERROR_CODE";
        this.name = "ArcGISRequestError";
        this.message =
            code === "UNKNOWN_ERROR_CODE" ? message : code + ": " + message;
        this.originalMessage = message;
        this.code = code;
        this.response = response;
        this.url = url;
        this.options = options;
    }
    return ArcGISRequestError;
}());
ArcGISRequestError.prototype = Object.create(Error.prototype);
ArcGISRequestError.prototype.constructor = ArcGISRequestError;

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var NODEJS_DEFAULT_REFERER_HEADER = "@esri/arcgis-rest-js";
var DEFAULT_ARCGIS_REQUEST_OPTIONS = {
    httpMethod: "POST",
    params: {
        f: "json",
    },
};
var ArcGISAuthError = /** @class */ (function (_super) {
    __extends(ArcGISAuthError, _super);
    /**
     * Create a new `ArcGISAuthError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param response - The original response from the API that caused the error
     * @param url - The original url of the request
     * @param options - The original options of the request
     */
    function ArcGISAuthError(message, code, response, url, options) {
        if (message === void 0) { message = "AUTHENTICATION_ERROR"; }
        if (code === void 0) { code = "AUTHENTICATION_ERROR_CODE"; }
        var _this = _super.call(this, message, code, response, url, options) || this;
        _this.name = "ArcGISAuthError";
        _this.message =
            code === "AUTHENTICATION_ERROR_CODE" ? message : code + ": " + message;
        return _this;
    }
    ArcGISAuthError.prototype.retry = function (getSession, retryLimit) {
        var _this = this;
        if (retryLimit === void 0) { retryLimit = 3; }
        var tries = 0;
        var retryRequest = function (resolve, reject) {
            getSession(_this.url, _this.options)
                .then(function (session) {
                var newOptions = __assign(__assign({}, _this.options), { authentication: session });
                tries = tries + 1;
                return request(_this.url, newOptions);
            })
                .then(function (response) {
                resolve(response);
            })
                .catch(function (e) {
                if (e.name === "ArcGISAuthError" && tries < retryLimit) {
                    retryRequest(resolve, reject);
                }
                else if (e.name === "ArcGISAuthError" && tries >= retryLimit) {
                    reject(_this);
                }
                else {
                    reject(e);
                }
            });
        };
        return new Promise(function (resolve, reject) {
            retryRequest(resolve, reject);
        });
    };
    return ArcGISAuthError;
}(ArcGISRequestError));
/**
 * Checks for errors in a JSON response from the ArcGIS REST API. If there are no errors, it will return the `data` passed in. If there is an error, it will throw an `ArcGISRequestError` or `ArcGISAuthError`.
 *
 * @param data The response JSON to check for errors.
 * @param url The url of the original request
 * @param params The parameters of the original request
 * @param options The options of the original request
 * @returns The data that was passed in the `data` parameter
 */
function checkForErrors(response, url, params, options, originalAuthError) {
    // this is an error message from billing.arcgis.com backend
    if (response.code >= 400) {
        var message = response.message, code = response.code;
        throw new ArcGISRequestError(message, code, response, url, options);
    }
    // error from ArcGIS Online or an ArcGIS Portal or server instance.
    if (response.error) {
        var _a = response.error, message = _a.message, code = _a.code, messageCode = _a.messageCode;
        var errorCode = messageCode || code || "UNKNOWN_ERROR_CODE";
        if (code === 498 ||
            code === 499 ||
            messageCode === "GWM_0003" ||
            (code === 400 && message === "Unable to generate token.")) {
            if (originalAuthError) {
                throw originalAuthError;
            }
            else {
                throw new ArcGISAuthError(message, errorCode, response, url, options);
            }
        }
        throw new ArcGISRequestError(message, errorCode, response, url, options);
    }
    // error from a status check
    if (response.status === "failed" || response.status === "failure") {
        var message = void 0;
        var code = "UNKNOWN_ERROR_CODE";
        try {
            message = JSON.parse(response.statusMessage).message;
            code = JSON.parse(response.statusMessage).code;
        }
        catch (e) {
            message = response.statusMessage || response.message;
        }
        throw new ArcGISRequestError(message, code, response, url, options);
    }
    return response;
}
/**
 * ```js
 * import { request } from '@esri/arcgis-rest-request';
 * //
 * request('https://www.arcgis.com/sharing/rest')
 *   .then(response) // response.currentVersion === 5.2
 * //
 * request('https://www.arcgis.com/sharing/rest', {
 *   httpMethod: "GET"
 * })
 * //
 * request('https://www.arcgis.com/sharing/rest/search', {
 *   params: { q: 'parks' }
 * })
 *   .then(response) // response.total => 78379
 * ```
 * Generic method for making HTTP requests to ArcGIS REST API endpoints.
 *
 * @param url - The URL of the ArcGIS REST API endpoint.
 * @param requestOptions - Options for the request, including parameters relevant to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function request(url, requestOptions) {
    if (requestOptions === void 0) { requestOptions = { params: { f: "json" } }; }
    var options = __assign(__assign(__assign({ httpMethod: "POST" }, DEFAULT_ARCGIS_REQUEST_OPTIONS), requestOptions), {
        params: __assign(__assign({}, DEFAULT_ARCGIS_REQUEST_OPTIONS.params), requestOptions.params),
        headers: __assign(__assign({}, DEFAULT_ARCGIS_REQUEST_OPTIONS.headers), requestOptions.headers),
    });
    var missingGlobals = [];
    var recommendedPackages = [];
    // don't check for a global fetch if a custom implementation was passed through
    if (!options.fetch && typeof fetch !== "undefined") {
        options.fetch = fetch.bind(Function("return this")());
    }
    else {
        missingGlobals.push("`fetch`");
        recommendedPackages.push("`node-fetch`");
    }
    if (typeof Promise === "undefined") {
        missingGlobals.push("`Promise`");
        recommendedPackages.push("`es6-promise`");
    }
    if (typeof FormData === "undefined") {
        missingGlobals.push("`FormData`");
        recommendedPackages.push("`isomorphic-form-data`");
    }
    if (!options.fetch ||
        typeof Promise === "undefined" ||
        typeof FormData === "undefined") {
        throw new Error("`arcgis-rest-request` requires a `fetch` implementation and global variables for `Promise` and `FormData` to be present in the global scope. You are missing " + missingGlobals.join(", ") + ". We recommend installing the " + recommendedPackages.join(", ") + " modules at the root of your application to add these to the global scope. See https://bit.ly/2KNwWaJ for more info.");
    }
    var httpMethod = options.httpMethod, authentication = options.authentication, rawResponse = options.rawResponse;
    var params = __assign({ f: "json" }, options.params);
    var originalAuthError = null;
    var fetchOptions = {
        method: httpMethod,
        /* ensures behavior mimics XMLHttpRequest.
        needed to support sending IWA cookies */
        credentials: options.credentials || "same-origin",
    };
    // the /oauth2/platformSelf route will add X-Esri-Auth-Client-Id header
    // and that request needs to send cookies cross domain
    // so we need to set the credentials to "include"
    if (options.headers &&
        options.headers["X-Esri-Auth-Client-Id"] &&
        url.indexOf("/oauth2/platformSelf") > -1) {
        fetchOptions.credentials = "include";
    }
    return (authentication
        ? authentication.getToken(url, { fetch: options.fetch }).catch(function (err) {
            /**
             * append original request url and requestOptions
             * to the error thrown by getToken()
             * to assist with retrying
             */
            err.url = url;
            err.options = options;
            /**
             * if an attempt is made to talk to an unfederated server
             * first try the request anonymously. if a 'token required'
             * error is thrown, throw the UNFEDERATED error then.
             */
            originalAuthError = err;
            return Promise.resolve("");
        })
        : Promise.resolve(""))
        .then(function (token) {
        if (token.length) {
            params.token = token;
        }
        if (authentication && authentication.getDomainCredentials) {
            fetchOptions.credentials = authentication.getDomainCredentials(url);
        }
        // Custom headers to add to request. IRequestOptions.headers with merge over requestHeaders.
        var requestHeaders = {};
        if (fetchOptions.method === "GET") {
            // Prevents token from being passed in query params when hideToken option is used.
            /* istanbul ignore if - window is always defined in a browser. Test case is covered by Jasmine in node test */
            if (params.token &&
                options.hideToken &&
                // Sharing API does not support preflight check required by modern browsers https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
                typeof window === "undefined") {
                requestHeaders["X-Esri-Authorization"] = "Bearer " + params.token;
                delete params.token;
            }
            // encode the parameters into the query string
            var queryParams = encodeQueryString(params);
            // dont append a '?' unless parameters are actually present
            var urlWithQueryString = queryParams === "" ? url : url + "?" + encodeQueryString(params);
            if (
            // This would exceed the maximum length for URLs specified by the consumer and requires POST
            (options.maxUrlLength &&
                urlWithQueryString.length > options.maxUrlLength) ||
                // Or if the customer requires the token to be hidden and it has not already been hidden in the header (for browsers)
                (params.token && options.hideToken)) {
                // the consumer specified a maximum length for URLs
                // and this would exceed it, so use post instead
                fetchOptions.method = "POST";
                // If the token was already added as a Auth header, add the token back to body with other params instead of header
                if (token.length && options.hideToken) {
                    params.token = token;
                    // Remove existing header that was added before url query length was checked
                    delete requestHeaders["X-Esri-Authorization"];
                }
            }
            else {
                // just use GET
                url = urlWithQueryString;
            }
        }
        /* updateResources currently requires FormData even when the input parameters dont warrant it.
    https://developers.arcgis.com/rest/users-groups-and-items/update-resources.htm
        see https://github.com/Esri/arcgis-rest-js/pull/500 for more info. */
        var forceFormData = new RegExp("/items/.+/updateResources").test(url);
        if (fetchOptions.method === "POST") {
            fetchOptions.body = encodeFormData(params, forceFormData);
        }
        // Mixin headers from request options
        fetchOptions.headers = __assign(__assign({}, requestHeaders), options.headers);
        /* istanbul ignore next - karma reports coverage on browser tests only */
        if (typeof window === "undefined" && !fetchOptions.headers.referer) {
            fetchOptions.headers.referer = NODEJS_DEFAULT_REFERER_HEADER;
        }
        /* istanbul ignore else blob responses are difficult to make cross platform we will just have to trust the isomorphic fetch will do its job */
        if (!requiresFormData(params) && !forceFormData) {
            fetchOptions.headers["Content-Type"] =
                "application/x-www-form-urlencoded";
        }
        return options.fetch(url, fetchOptions);
    })
        .then(function (response) {
        if (!response.ok) {
            // server responded w/ an actual error (404, 500, etc)
            var status_1 = response.status, statusText = response.statusText;
            throw new ArcGISRequestError(statusText, "HTTP " + status_1, response, url, options);
        }
        if (rawResponse) {
            return response;
        }
        switch (params.f) {
            case "json":
                return response.json();
            case "geojson":
                return response.json();
            case "html":
                return response.text();
            case "text":
                return response.text();
            /* istanbul ignore next blob responses are difficult to make cross platform we will just have to trust that isomorphic fetch will do its job */
            default:
                return response.blob();
        }
    })
        .then(function (data) {
        if ((params.f === "json" || params.f === "geojson") && !rawResponse) {
            var response = checkForErrors(data, url, params, options, originalAuthError);
            if (originalAuthError) {
                /* If the request was made to an unfederated service that
                didn't require authentication, add the base url and a dummy token
                to the list of trusted servers to avoid another federation check
                in the event of a repeat request */
                var truncatedUrl = url
                    .toLowerCase()
                    .split(/\/rest(\/admin)?\/services\//)[0];
                options.authentication.federatedServers[truncatedUrl] = {
                    token: [],
                    // default to 24 hours
                    expires: new Date(Date.now() + 86400 * 1000),
                };
                originalAuthError = null;
            }
            return response;
        }
        else {
            return data;
        }
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Helper method to ensure that user supplied urls don't include whitespace or a trailing slash.
 */
function cleanUrl(url) {
    // Guard so we don't try to trim something that's not a string
    if (typeof url !== "string") {
        return url;
    }
    // trim leading and trailing spaces, but not spaces inside the url
    url = url.trim();
    // remove the trailing slash to the url if one was included
    if (url[url.length - 1] === "/") {
        url = url.slice(0, -1);
    }
    return url;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Helper that returns the appropriate portal url for a given request. `requestOptions.portal` is given
 * precedence over `authentication.portal`. If neither `portal` nor `authentication` is present,
 * `www.arcgis.com/sharing/rest` is returned.
 *
 * @param requestOptions - Request options that may have authentication manager
 * @returns Portal url to be used in API requests
 */
function getPortalUrl(requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    // use portal in options if specified
    if (requestOptions.portal) {
        return cleanUrl(requestOptions.portal);
    }
    // if auth was passed, use that portal
    if (requestOptions.authentication) {
        // the portal url is already scrubbed in the auth package
        return requestOptions.authentication.portal;
    }
    // default to arcgis.com
    return "https://www.arcgis.com/sharing/rest";
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Serialize an item and its data into a json format accepted by the Portal API for create and update operations
 *
 * @param item Item to be serialized
 * @returns a formatted json object to be sent to Portal
 */
function serializeItem(item) {
    // create a clone so we're not messing with the original
    var clone = JSON.parse(JSON.stringify(item));
    // binary data needs POSTed as a `file`
    // JSON object literals should be passed as `text`.
    if (clone.data) {
        (typeof Blob !== "undefined" && item.data instanceof Blob) ||
            // Node.js doesn't implement Blob
            item.data.constructor.name === "ReadStream"
            ? (clone.file = item.data)
            : (clone.text = item.data);
        delete clone.data;
    }
    return clone;
}
/**
 * `requestOptions.owner` is given priority, `requestOptions.item.owner` will be checked next. If neither are present, `authentication.getUserName()` will be used instead.
 */
function determineOwner(requestOptions) {
    if (requestOptions.owner) {
        return Promise.resolve(requestOptions.owner);
    }
    else if (requestOptions.item && requestOptions.item.owner) {
        return Promise.resolve(requestOptions.item.owner);
    }
    else if (requestOptions.authentication &&
        requestOptions.authentication.getUsername) {
        return requestOptions.authentication.getUsername();
    }
    else {
        return Promise.reject(new Error("Could not determine the owner of this item. Pass the `owner`, `item.owner`, or `authentication` option."));
    }
}
/**
 * checks if the extent is a valid BBox (2 element array of coordinate pair arrays)
 * @param extent
 * @returns
 */
function isBBox(extent) {
    return (Array.isArray(extent) &&
        Array.isArray(extent[0]) &&
        Array.isArray(extent[1]));
}
/**
 * Given a Bbox, convert it to a string. Some api endpoints expect a string
 *
 * @param {BBox} extent
 * @return {*}  {string}
 */
function bboxToString(extent) {
    return extent.join(",");
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateItem } from "@esri/arcgis-rest-portal";
 * //
 * updateItem({
 *   item: {
 *     id: "3ef",
 *     description: "A three hour tour"
 *   },
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update an Item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that updates an item.
 */
function updateItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = requestOptions.folderId
            ? getPortalUrl(requestOptions) + "/content/users/" + owner + "/" + requestOptions.folderId + "/items/" + requestOptions.item.id + "/update"
            : getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.item.id + "/update";
        // serialize the item into something Portal will accept
        requestOptions.params = __assign$1(__assign$1({}, requestOptions.params), serializeItem(requestOptions.item));
        // convert extent, if present, into a string from bbox
        // processParams was previously doing this sort of work,
        // however now we need to let array of arrays through
        // Thus for extents we need to move this logic here
        if (requestOptions.params.extent && isBBox(requestOptions.params.extent)) {
            requestOptions.params.extent = bboxToString(requestOptions.params.extent);
        }
        /* istanbul ignore if */
        if (requestOptions.params.file &&
            requestOptions.params.file.constructor &&
            requestOptions.params.file.constructor.name === 'ReadStream') {
            // dataSize is not an official parameter for the ArcGIS REST API but is needed 
            // to encode the ReadStream with an appropriate length. This is to overcome 
            // the form-data library bug:
            // https://github.com/form-data/form-data/issues/508
            requestOptions.params.dataSize = requestOptions.dataSize;
        }
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```
 * import { getItem } from "@esri/arcgis-rest-portal";
 * //
 * getItem("ae7")
 *   .then(response);
 * // or
 * getItem("ae7", { authentication })
 *   .then(response)
 * ```
 * Get an item by id. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item.htm) for more information.
 *
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the data from the response.
 */
function getItem(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions);
    // default to a GET request
    var options = __assign$1({ httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * Get the fully qualified base URL to the REST end point for an item.
 * @param id Item Id
 * @param portalUrlOrRequestOptions a portal URL or request options
 * @returns URL to the item's REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{id}`
 */
var getItemBaseUrl = function (id, portalUrlOrRequestOptions) {
    var portalUrl = typeof portalUrlOrRequestOptions === "string"
        ? portalUrlOrRequestOptions
        : getPortalUrl(portalUrlOrRequestOptions);
    return portalUrl + "/content/items/" + id;
};

function buildAccessProperties(username, currentAccessProperties, accessChangeset) {
    return accessChangeset.reduce((accessProperties, accessChange) => {
        const { action, targetProperty } = accessChange;
        if (action === 'add') {
            accessProperties[targetProperty] = {
                updatedAt: new Date(),
                updatedBy: username,
            };
        }
        else if (action === 'remove') {
            delete accessProperties[targetProperty];
        }
        return accessProperties;
    }, currentAccessProperties);
}

async function setPortalItemAccessPermissions({ id, authentication, username, accessChangeset, }) {
    const { properties = {} } = await getItem(id, {
        authentication,
    });
    const _a = properties.telemetry, _b = _a === void 0 ? {} : _a, { arcgis: { access: currentAccessProperties = {} } = {} } = _b, additionalTelemetryProperties = __rest(_b, ["arcgis"]);
    const accessProperties = buildAccessProperties(username, currentAccessProperties, accessChangeset);
    return updateItem({
        item: {
            id,
            properties: Object.assign(Object.assign({}, properties), { telemetry: Object.assign(Object.assign({}, additionalTelemetryProperties), { arcgis: {
                        access: Object.assign({}, accessProperties),
                    } }) }),
        },
        authentication,
    });
}

async function getPortalItemAccessPermissions({ id, authentication, }) {
    const { properties: { telemetry: { arcgis: { access = {} } = {} } = {} }, } = await getItem(id, {
        authentication,
    });
    return { access };
}

/**
 * Amazon Telemetry
 * Supports Amazon Pinpoint
 */
class Amazon {
    constructor(options) {
        this.name = 'amazon';
        this.isInitialized = false;
        const { app = {}, fips, userPoolID } = options;
        this.analytics = analyticsLib({
            app: app.name,
            version: app.version,
            plugins: [
                index({
                    fips,
                    pinpointAppId: app.id,
                    getCredentials: () => {
                        return getCredentials(userPoolID, { fips });
                    },
                }),
            ],
        });
        Object.assign(this, options);
    }
    init() {
        // if already initialized, return
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        return Promise.resolve();
    }
    static async setAccessPermissions({ id, authentication, username, accessChangeset, }) {
        return setPortalItemAccessPermissions({
            id,
            authentication,
            username,
            accessChangeset,
        });
    }
    static async getAccessPermissions({ id, authentication, }) {
        return getPortalItemAccessPermissions({ id, authentication });
    }
    logPageView(page, options) {
        const telemetryPayload = createPageViewLog({
            page,
            previousPage: this.previousPage,
            options,
            dimensionLookup: this.dimensions,
            metricLookup: this.metrics,
        });
        const { pageUrl, pageName } = telemetryPayload;
        this.previousPage = { pageUrl, pageName };
        this.analytics.track('pageView', telemetryPayload);
    }
    logEvent(event = {}) {
        const telemetryPayload = createEventLog({
            event,
            dimensionLookup: this.dimensions,
            metricLookup: this.metrics,
        });
        const { name } = telemetryPayload;
        this.analytics.track(name, telemetryPayload);
    }
}

const PRIVACY_SETTINGS_STORAGE_KEY = 'ESRI_HUB_PRIVACY_SETTINGS';
/**
 * Compares two telemetry info objects to see if they match
 * @param a ITelemetryInfo - telemetry info A
 * @param b ITelemetryInfo  - telemetry info B
 * @returns boolean - true if they match, false if they don't
 */
const matchesTelemetry = (a, b) => {
  return a.action === b.action && a.category === b.category && a.label === b.label;
};
// should this be hoisted to Hub.js?
/**
 * generate a new GUID
 * @returns GUID
 */
function generateGUID() {
  // Created by github copilot
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/*
  NOTE: this will return:
    - false if we have no org info - the user is not logged in so we don't know anything about their org
    - false if we have org info and eueiEnabled is true
    - true if we have org info and eueiEnabled is false
*/
const isEueiDisabled = (orgInfo) => {
  const eueiEnabled = orgInfo === null || orgInfo === void 0 ? void 0 : orgInfo.eueiEnabled;
  return eueiEnabled === false;
};
/**
 * Get privacy settings from local storage or use defaults
 * @param eueiDisabled
 * @returns Hub privacy settings
 */
const getPrivacySettings = (eueiDisabled) => {
  // create a default for the privacy settings
  let privacySettings = {
    accepted: false,
    performance: false,
    targeting: false,
    functional: false,
    id: generateGUID(),
    // DO NOT ADD STATE
    // It will cause issues with other unit tests
    // and we can not be sure that appSettings.site is defined
    // state: this.telemetryHash,
    // instead, we will set it in updateUserPrivacySettings
    timestamp: Date.now(),
  };
  const rawPrivacySettings = window.localStorage.getItem(PRIVACY_SETTINGS_STORAGE_KEY);
  if (rawPrivacySettings) {
    try {
      privacySettings = JSON.parse(rawPrivacySettings);
      if (eueiDisabled) {
        privacySettings.functional = false;
        privacySettings.performance = false;
        privacySettings.targeting = false;
        window.localStorage.setItem(PRIVACY_SETTINGS_STORAGE_KEY, JSON.stringify(privacySettings));
      }
    }
    catch (e) {
      // if this fails, what's stored in localStoage is somehow mangled,
      // so we replace it with the default
      window.localStorage.setItem(PRIVACY_SETTINGS_STORAGE_KEY, JSON.stringify(privacySettings));
    }
  }
  else {
    // store the default into localStorage
    window.localStorage.setItem(PRIVACY_SETTINGS_STORAGE_KEY, JSON.stringify(privacySettings));
  }
  return privacySettings;
};
/**
 * Check if hub analytics is enabled for a site
 * @param site IHubSite
 * @returns boolean
*/
const isHubAnalyticsEnabled = (site) => {
  const { legacyCapabilities = [] } = site;
  return !legacyCapabilities.includes('disableActivityTracking');
};
// TODO: this should be used by telemetry._getTelemetryPrivacy(reset)
const initTelemetry = async (site, options) => {
  var _a;
  const { amazon, debug = false, disabled = false, orgInfo } = options;
  // read site's telemetry settings
  const { allowPrivacyConfig, blocking } = ((_a = site.telemetry) === null || _a === void 0 ? void 0 : _a.consentNotice) || {};
  // build a list of configured trackers
  const configuredTrackers = [];
  const hubAnalyticsEnabled = isHubAnalyticsEnabled(site);
  if (amazon && hubAnalyticsEnabled) {
    configuredTrackers.push('amazon');
  }
  // TODO: other trackers?
  // if (googleAnalytics && !!this.googleAnalyticsConfig && !this.googleAnalyticsConfig.disabled && this.googleAnalyticsConfig.measurementId) {
  //   configuredTrackers.push('googleAnalytics');
  // }
  // if (adobe && !!this.adobeConfig && !this.adobeConfig.disabled && this.adobeConfig.reportSuite && this.adobeConfig.trackingServer) {
  //   configuredTrackers.push('adobe-analytics');
  // }
  // if (!!this.siteimproveConfig && !this.siteimproveConfig.disabled && this.siteimproveConfig.code) {
  //   configuredTrackers.push('siteimprove');
  // }
  // set up site config to pass to getTrackersToInitialize
  const requireConsent = allowPrivacyConfig && blocking;
  const siteConfig = {
    requireConsent,
    configuredTrackers
  };
  const privacySettings = getPrivacySettings(isEueiDisabled(orgInfo));
  const trackersToInitialize = getTrackersToInitialize(privacySettings, siteConfig, orgInfo);
  //  map over getTrackersToInitialize and for each and instantiate the plugin
  // NOTE: should lazy-load each plugin
  const plugins = trackersToInitialize.map(tracker => {
    switch (tracker) {
      case 'amazon':
        return new Amazon(Object.assign(Object.assign({}, amazon), { disabled: !hubAnalyticsEnabled }));
      // TODO: other trackers?
      // case 'googleAnalytics':
      //   return new GoogleAnalytics({ ...googleAnalytics, measurementIds: [this.googleAnalyticsConfig.measurementId] });
      // case 'adobe-analytics':
      //   return new AdobeAnalytics({ ...adobe, ...this.adobeConfig });
      // case 'siteimprove':
      //   return new Siteimprove({ code: this.siteimproveConfig.code });
    }
  });
  // return a new initialized telemetry instance
  const telemetry = new Telemetry({
    plugins,
    disabled,
    requireConsent,
    userPrivacySettings: privacySettings,
    debug
  });
  await telemetry.init();
  return telemetry;
};
// TODO: hoist this to Hub.js or it's own util and use it in opendata-ui
/**
 * 1. STAFF - user’s orgId matches the site orgId
 * 2. COMMUNITY - user’s orgId matches the site’s community orgId
 * 3. COMPANION - user’s orgId is a companion orgId of the site’s orgId, but not a community user
 * 4. OTHER - user is authenticated, but doesn’t match the above
 * 5. ANONYMOUS - user is unauthenticated
 */
// function getUserType (currentUser?: any, orgInfo?: IPortal, communityOrgId?: string) {
const getUserType = (context, domain) => {
  var _a;
  const { currentUser, communityOrgId, portal } = context;
  // const { orgKey: siteOrgKey, orgId: siteOrgId } = getWithDefault(appSettings.site, 'domainInfo', {});
  const { orgKey: siteOrgKey, orgId: siteOrgId } = domain || {};
  // const siteOrgId = portal?.id
  // const siteOrgKey = portal.urlKey
  // const communityOrgId = get(appSettings, 'hubCommunity.orgId');
  // const companionOrganizations = getWithDefault(appSettings, 'portalInfo.subscriptionInfo.companionOrganizations', []);
  const companionOrganizations = ((_a = portal === null || portal === void 0 ? void 0 : portal.subscriptionInfo) === null || _a === void 0 ? void 0 : _a.companionOrganizations) || [];
  let userType = 'other';
  if (!currentUser) {
    userType = 'anonymous';
  }
  else if (currentUser.orgId === siteOrgId) {
    userType = 'staff';
  }
  else if (currentUser.orgId === communityOrgId) {
    userType = 'community';
  }
  else if (companionOrganizations.some((org) => org.organizationUrl.split('.').shift() === siteOrgKey)) {
    userType = 'companion';
  }
  return userType;
};
/**
 * function to append common dimensions onto a telemetry
 * event object
 * @param {Object} event telemetry event configuration
 * @param {EventTarget[]} options.composedPath composed path of the logged event
 * @param {Boolean} options.isSuccess indicates whether or not the logged event was a success or failure
 */
const addCommonDimensions = (event, options = {}) => {
  const { composedPath, context, domain, isSuccess, routeDimensions, site } = options;
  // NOTE: this currently only updates the groupType dimension
  const transformedDimensions = transformDimensions(event, site);
  const transformedRouteDimensions = transformDimensions(routeDimensions, site);
  event = Object.assign(Object.assign({}, transformedDimensions), transformedRouteDimensions);
  const response = getResponse(isSuccess);
  const element = composedPath && getElementPath(composedPath);
  event.userType = domain ? getUserType(context, domain) : '';
  event.organizationId = domain === null || domain === void 0 ? void 0 : domain.orgId;
  event.siteId = site === null || site === void 0 ? void 0 : site.id;
  event = Object.assign(Object.assign(Object.assign({}, event), (element && { element })), (response && { response }));
  return event;
};

export { isHubAnalyticsEnabled as a, initTelemetry as b, addCommonDimensions as c, isEueiDisabled as i, matchesTelemetry as m };
