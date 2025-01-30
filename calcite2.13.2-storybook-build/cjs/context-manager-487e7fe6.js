'use strict';

const request = require('./request-67da3c71.js');
const encoding = require('./encoding-211adb23.js');
const ArcGISContextManager = require('./ArcGISContextManager-c5cc74e9.js');
const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const UserSession = require('./UserSession-f8bc10c8.js');
const logger = require('./logger-5db3d659.js');

// Parse any permission flags or service flags from the uri, and remove them
function parseFlags(href) {
  const result = {
    replaceState: false,
    uri: href,
    featureFlags: {},
    serviceStatus: {
      portal: "online",
      discussions: "online",
      events: "online",
      metrics: "online",
      notifications: "online",
      "hub-search": "online",
      domains: "online",
      "hub-downloads": "online"
    }
  };
  const baseUrl = href.split('?')[0];
  const params = href.split('?')[1];
  if (params) {
    // use strings vs browser specific apis so we can move this to hub.js
    // also - this seems more reliable - which is odd
    const sp = params.split('&');
    let passThruParams = [];
    // iterate them, looking for entries, which we then parse into a hash
    for (const p of sp) {
      const param = p.split('=')[0];
      const prop = decodeURIComponent(p.split('=')[1]);
      let handled = false;
      if (['pe', 'pd'].includes(param)) {
        const value = param === 'pe';
        result.featureFlags[prop] = value;
        handled = true;
        result.replaceState = false;
      }
      if (['sol', 'sna'].includes(param)) {
        // This is appended to `service-` in hub.js
        // so we don't send the full PolicyResponse string
        const status = param === 'sol' ? 'offline' : 'not-available';
        result.serviceStatus[prop] = status;
        handled = true;
        result.replaceState = false;
      }
      if (!handled) {
        passThruParams = [...passThruParams, p];
      }
    }
    // Compute the uri without the query params
    // eslint-disable-next-line unicorn/prefer-ternary
    if (passThruParams.length) {
      result.uri = `${baseUrl}?${passThruParams.join('&')}`;
    }
    else {
      result.uri = baseUrl;
    }
  }
  return result;
}

// TODO: move this to hub.js and add tests there
// it could then be used in torii-provider-arcgis
/**
 * copy of exchangeToken() from @esri/arcgis-rest-auth
 * that exposes the whole response instead of just the token
 *
 * @param token
 * @param clientId
 * @param portal
 * @returns
 */
/* istanbul ignore next */
const exchangeToken = (token, clientId, portal = "https://www.arcgis.com/sharing/rest") => {
  const url = `${portal}/oauth2/exchangeToken`;
  const ro = {
    method: "POST",
    params: {
      f: "json",
      client_id: clientId,
      token,
    },
  };
  // make the request and return the token
  return request.request(url, ro); //.then((response) => response.token);
};

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const LOCAL_STORAGE_KEY = '__CONTEXT_MANAGER';
/**
 * serialize a context manager and save it in local storage
 * @param contextManager omit this to clear any previously stored value
 */
const storeContextManager = (contextManager) => {
  if (contextManager === null || contextManager === void 0 ? void 0 : contextManager.serialize) {
    localStorage.setItem(LOCAL_STORAGE_KEY, contextManager.serialize());
  }
  else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};
function retrieveContextManager(portalUrl) {
  const { featureFlags, serviceStatus } = parseFlags(window.location.href);
  const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (serialized) {
    let deserialized = JSON.parse(encoding.base64ToUnicode(serialized));
    deserialized = Object.assign(Object.assign({}, deserialized), { featureFlags, serviceStatus });
    // NOTE: we need to re-serialize the context manager and call deserialize instead of just calling create with the deserialized object
    // because we need some stuff to happen that deserialize does (ie deserializing the usersession)
    const _serialized = encoding.unicodeToBase64(JSON.stringify(deserialized));
    return ArcGISContextManager.ArcGISContextManager.deserialize(_serialized);
  }
  else if (portalUrl) {
    return ArcGISContextManager.ArcGISContextManager.create({ portalUrl });
  }
  else {
    return Promise.resolve();
  }
}
/**
 * temporary wrapper for ArcGISContextManager.create()
 * b/c that blows up in hub-workspaces dev, see:
 * signIn() in packages/hub-workspaces/src/utils/auth.ts
 * @private
 * @param options
 * @returns context manager
 */
// istanbul ignore next - this is a temporary wrapper
const createContextManager = (options) => {
  return ArcGISContextManager.ArcGISContextManager.create(options);
};
const initContextManager = async (options) => {
  // should we check if authentication was passed in
  // before trying to initialize from the platform cookie?
  const { portalUrl, clientId, redirectUri } = options, additionalOptions = __rest(options, ["portalUrl", "clientId", "redirectUri"]);
  let contextManager;
  if (clientId && redirectUri) {
    // try to initialize from the platform cookie
    // NOTE: this logic was extracted from torii-provider-arcgis
    // which has additional logic web tier auth that is not implemented here
    // Also, it does not check for the existence of the platform cookie
    // before calling platformSelf, so we don't do that here either
    try {
      // first get the username and platform token
      const portalApiUrl = getPortalApiUrl.getPortalApiUrl(portalUrl);
      // NOTE: is this the right clientId for enterprise too?
      // it is hardcoded in torii-provider-arcgis
      const platformClientId = 'arcgisonline';
      const { username, token: platformToken } = await ArcGISContextManager.platformSelf(platformClientId, redirectUri, portalApiUrl);
      // should we be using the portalUrl that's returned by platformSelf from this point on?
      // ex: https://qa-bas-p-hub.mapsqa.arcgis.com/sharing/rest
      // call exchangeToken to swap to the passed in clientId
      const { token, expires_in } = await exchangeToken(platformToken, clientId, portalApiUrl);
      // create a UserSession from the response
      const currentTimestamp = new Date().getTime();
      const tokenExpiresTimestamp = currentTimestamp + expires_in * 1000;
      const tokenExpires = new Date(tokenExpiresTimestamp);
      const authentication = new UserSession.UserSession({
        clientId,
        portal: portalApiUrl,
        token,
        tokenExpires,
        username,
      });
      // initialize the context manager with the session
      contextManager = await createContextManager(Object.assign({ portalUrl,
        authentication }, additionalOptions));
      // store the context manager in local storage
      storeContextManager(contextManager);
    }
    catch (err) {
      logger.Logger.warn('Failed to initialize context manager from platform cookie', err);
    }
  }
  // if no luck w/ the platform cookie, either retrieve from local storage
  // or return an unauthorized context manager from the portal url
  return contextManager || retrieveContextManager(portalUrl);
};
const getResourceConfigs = (isPortal) => {
  let resourceConfigs = [{ app: 'hubforarcgis', clientId: 'hubforarcgis' }, { app: 'arcgisonline', clientId: 'arcgisonline' }];
  if (isPortal) {
    // For Portal, we we use the arcgisonline clientId to store "Hub Wide" settings
    // we do this because `hubforarcgis` is not a valid client id in portal.
    // Have a question in to Phillip Heede to see if there is an "enterprise sites" specific clientId
    resourceConfigs = [{ app: 'hubforarcgis', clientId: 'arcgisonline' }, { app: 'arcgisonline', clientId: 'arcgisonline' }];
  }
  return resourceConfigs;
};

exports.createContextManager = createContextManager;
exports.getResourceConfigs = getResourceConfigs;
exports.initContextManager = initContextManager;
exports.parseFlags = parseFlags;
exports.retrieveContextManager = retrieveContextManager;
exports.storeContextManager = storeContextManager;
