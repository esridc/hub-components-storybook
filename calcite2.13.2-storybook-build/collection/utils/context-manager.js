var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { UserSession, platformSelf } from "@esri/arcgis-rest-auth";
import { ArcGISContextManager, Logger, base64ToUnicode, getPortalApiUrl, unicodeToBase64 } from '@esri/hub-common';
import { parseFlags } from './parse-flags';
import { exchangeToken } from './auth';
const LOCAL_STORAGE_KEY = '__CONTEXT_MANAGER';
/**
 * serialize a context manager and save it in local storage
 * @param contextManager omit this to clear any previously stored value
 */
export const storeContextManager = (contextManager) => {
  if (contextManager === null || contextManager === void 0 ? void 0 : contextManager.serialize) {
    localStorage.setItem(LOCAL_STORAGE_KEY, contextManager.serialize());
  }
  else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};
export function retrieveContextManager(portalUrl) {
  const { featureFlags, serviceStatus } = parseFlags(window.location.href);
  const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (serialized) {
    let deserialized = JSON.parse(base64ToUnicode(serialized));
    deserialized = Object.assign(Object.assign({}, deserialized), { featureFlags, serviceStatus });
    // NOTE: we need to re-serialize the context manager and call deserialize instead of just calling create with the deserialized object
    // because we need some stuff to happen that deserialize does (ie deserializing the usersession)
    const _serialized = unicodeToBase64(JSON.stringify(deserialized));
    return ArcGISContextManager.deserialize(_serialized);
  }
  else if (portalUrl) {
    return ArcGISContextManager.create({ portalUrl });
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
export const createContextManager = (options) => {
  return ArcGISContextManager.create(options);
};
export const initContextManager = async (options) => {
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
      const portalApiUrl = getPortalApiUrl(portalUrl);
      // NOTE: is this the right clientId for enterprise too?
      // it is hardcoded in torii-provider-arcgis
      const platformClientId = 'arcgisonline';
      const { username, token: platformToken } = await platformSelf(platformClientId, redirectUri, portalApiUrl);
      // should we be using the portalUrl that's returned by platformSelf from this point on?
      // ex: https://qa-bas-p-hub.mapsqa.arcgis.com/sharing/rest
      // call exchangeToken to swap to the passed in clientId
      const { token, expires_in } = await exchangeToken(platformToken, clientId, portalApiUrl);
      // create a UserSession from the response
      const currentTimestamp = new Date().getTime();
      const tokenExpiresTimestamp = currentTimestamp + expires_in * 1000;
      const tokenExpires = new Date(tokenExpiresTimestamp);
      const authentication = new UserSession({
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
      Logger.warn('Failed to initialize context manager from platform cookie', err);
    }
  }
  // if no luck w/ the platform cookie, either retrieve from local storage
  // or return an unauthorized context manager from the portal url
  return contextManager || retrieveContextManager(portalUrl);
};
export const getResourceConfigs = (isPortal) => {
  let resourceConfigs = [{ app: 'hubforarcgis', clientId: 'hubforarcgis' }, { app: 'arcgisonline', clientId: 'arcgisonline' }];
  if (isPortal) {
    // For Portal, we we use the arcgisonline clientId to store "Hub Wide" settings
    // we do this because `hubforarcgis` is not a valid client id in portal.
    // Have a question in to Phillip Heede to see if there is an "enterprise sites" specific clientId
    resourceConfigs = [{ app: 'hubforarcgis', clientId: 'arcgisonline' }, { app: 'arcgisonline', clientId: 'arcgisonline' }];
  }
  return resourceConfigs;
};
