import { Level } from '@esri/hub-common';
import { getTypeFromEntity, isSiteType } from '@esri/hub-common';
const isOnSite = (siteSelfUrl, win = window) => {
  return win.location.href.startsWith(siteSelfUrl);
};
const isOnHubHome = (hubHomeUrl, win = window) => {
  return win.location.href.startsWith(hubHomeUrl);
};
/**
 * Get link to layout editor for a given entity
 * @param entity
 * @returns
 */
export const getEntityLayoutUrl = (entity) => {
  // TODO: this logic needs to be updated to work on enterprise as well
  const { links = {}, type, typeKeywords } = entity;
  const { self, layoutRelative } = links;
  return (isSiteType(type, typeKeywords) && self && !isOnSite(self))
    // we're not currently at that site, so use absolute URL to layout editor
    ? `${self}${layoutRelative}`
    : layoutRelative;
};
export const getEntityWorkspaceUrl = (entity, context) => {
  // TODO: this logic needs to be updated to work on enterprise as well
  const { links = {} } = entity;
  const { workspaceRelative } = links;
  return (isOnHubHome(context.hubHomeUrl))
    // we're not currently at that site, so use absolute URL to workspace
    ? workspaceRelative
    : `${context.hubHomeUrl}${workspaceRelative}`;
};
export const getProfileUrl = (context) => {
  let result;
  if (!context) {
    return result;
  }
  if (context === null || context === void 0 ? void 0 : context.isPortal) {
    result = `${context.portalUrl}/home/user.html`;
  }
  else {
    const currentUser = context.currentUser;
    if (!currentUser) {
      return result;
    }
    // take the origin and make the path /people/username/profile
    const url = new URL(window.location.origin);
    url.pathname = `/people/${currentUser.username}/profile`;
    result = url.toString();
  }
  return result;
};
export const getOverviewUrl = (context) => {
  let url;
  if (!context) {
    return url;
  }
  if (context === null || context === void 0 ? void 0 : context.isPortal) {
    // in enterprise take the full url and update the hash to /home/overview
    url = new URL(window.location.href);
    url.hash = '/home/overview';
  }
  else {
    // take the hubHomeUrl and add /overview
    url = new URL(context.hubHomeUrl);
    url.pathname = '/overview';
  }
  return url.toString();
};
/**
 * Get the URL to the workspace home page
 * @param context
 * @returns
 */
export const getWorkspaceHomeUrl = (context) => {
  let url;
  if (!context) {
    return url;
  }
  if (context === null || context === void 0 ? void 0 : context.isPortal) {
    // TODO: update workspace home url for enterprise
    return undefined;
  }
  else {
    // take the hubHomeUrl and add /overview
    url = new URL(context.hubHomeUrl);
    url.pathname = '/workspace';
  }
  return url.toString();
};
export const getRelativeEntityViewUrl = (entity) => {
  var _a, _b;
  // TODO: relative urls do not work in enterprise due to the hash routing scheme.
  //  We'll eventually need to append the relative urls onto the full enterprise site url.
  const type = getTypeFromEntity(entity);
  const routeSegment = type === 'content' ? type : `${type}s`;
  let result = (type === "site"
    ? (_a = entity.links) === null || _a === void 0 ? void 0 : _a.self
    : (_b = entity.links) === null || _b === void 0 ? void 0 : _b.siteRelative) || `/${routeSegment}/${entity.id}`;
  if (type === 'survey') {
    result = `/feedback/${type}s/${entity.id}`;
  }
  if (type === 'user') {
    result = `/people/${entity.id}/profile/settings`;
  }
  return result;
};
/**
 * returns the absolute URL to the view for a given entity
 * @param entity
 * @param location
 * @returns
 */
export const getAbsoluteEntityViewUrl = (entity, location = window.location) => {
  const pathname = getRelativeEntityViewUrl(entity);
  const url = new URL(pathname, location.origin);
  return url.toString();
};
/**
 * Gets the route segment for a given entity
 * @param entityType
 * @returns
 */
const getEntityRouteSegment = (entityType) => {
  const isPluralized = entityType.slice(-1) === 's';
  return isPluralized || entityType === 'content'
    ? entityType
    : `${entityType}s`;
};
/**
 * Get a workspace url for an entity that is based at the given hostname
 * @param hostname
 * @param type
 * @param id
 * @param pane
 * @returns
 */
export const getAbsoluteEntityWorkspaceUrl = (hostname, type, id, pane) => {
  let path = '/workspace';
  const identifier = id ? id : 'self';
  if (type) {
    path = `${path}/${getEntityRouteSegment(type)}/${identifier}`;
  }
  if (pane) {
    path = `${path}/${pane}`;
  }
  const url = new URL(path, hostname);
  return url.toString();
};
/**
 * returns URL to the view that shows all entities of the same type
 * by stripping everything after the identifier
 *
 * @param entityUrl URL (relative or absolute) to an entity view
 * @param identifier entitiy identifier
 * @returns URL to the view that shows all entities of the same type
 */
export const getEntityTypeViewUrl = (entityUrl, identifier) => {
  const re = new RegExp(`${identifier}.*`);
  // probably should do something else if the identifier is not found
  return entityUrl.replace(re, '');
};
/**
 * Returns the level enumeration for the corresponding level name.
 * If level does not exist, defaults to Level.off
 */
export function parseLogLevel(levelString) {
  let logLevel = Level.off;
  const validLevels = ['all', 'error', 'warn', 'info', 'debug'];
  if (validLevels.includes(levelString)) {
    logLevel = Level[levelString];
  }
  return logLevel;
}
// NOTE: the following should be hoisted to Hub.js
/**
 * redirects to an external URL
 * using this makes it easier to mock in tests
 * @param url
 */
export const redirectToExternalUrl = (url) => {
  window.location.href = url;
};
export const injectPort = (url, port) => {
  const urlObj = new URL(url);
  urlObj.port = port;
  return urlObj.toString();
};
/**
 * Returns true if the href is an external link
 * @param href
 * @returns
 */
export const isExternalLink = (href) => {
  return !href.startsWith('/') && !href.startsWith(window.location.origin);
};
/**
 * Return the home url for a site. For ArcGIS Online, this is just the origin, for Enterprise it's the origin + the app path + the site hash.
 * @param href window.location.href
 * @param origin window.location.origin
 * @param context IArcGISContext
 * @returns
 */
export const getSiteHomeUrl = (href, origin, context) => {
  if (context === null || context === void 0 ? void 0 : context.isPortal) {
    // get the path from the href
    const path = href.replace(origin, '');
    // find the hash
    const hashIndex = path.indexOf('#');
    // we should now have something like `/adaptor/apps/sites/#/site-name/deep-path`
    // we want to return `/adaptor/apps/sites/#/site-name`
    const appPath = path.substring(0, hashIndex);
    let afterHash = path.substring(hashIndex, path.length).replace('#', '');
    if (afterHash.startsWith('/')) {
      // remove leading slash
      afterHash = afterHash.substring(1, afterHash.length);
    }
    const parts = afterHash.split('/');
    const site = parts[0];
    return `${origin}${appPath}#/${site}`;
  }
  else {
    // for non-portal sites, it's just the origin
    return `${origin}/`;
  }
};
/**
 * get the URL the portal's signout endpoint
 *
 * @param portalBaseUrl Portal base URL
 * @param redirectUrl URL to redirect to after signout
 * @param clientId App's client ID
 * @returns
 */
export const getSignOutUrl = (portalBaseUrl, redirectUrl, clientId = 'arcgisonline') => {
  const redirectUri = encodeURIComponent(redirectUrl);
  return `${portalBaseUrl}/sharing/rest/oauth2/signout?client_id=${clientId}&redirect_uri=${redirectUri}`;
};
/**
 * parse the base hostname and it's parts out of a hub url
 * @param url
 * @returns
 */
export const parseHubUrl = (url) => {
  const match = url.toLowerCase().match(/(hub|opendata)(\w*)\.arcgis\.com/);
  const [hubDomain, hubOrOd, envSuffix] = match || [];
  const isOpenData = hubOrOd && hubOrOd === 'opendata';
  return { hubDomain, isOpenData, envSuffix };
};
