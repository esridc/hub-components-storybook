'use strict';

const getPortalUrl = require('./get-portal-url-68b1f527.js');

function getEnvironmentFromPortalUrl(portalUrl) {
    // default to enterprise because we don't know the patterns for that
    // other than it's _not_ arcgis.com
    let env = "enterprise";
    // if we're on arcgis.com, we can assume prod...
    if (portalUrl.includes("arcgis.com")) {
        env = "production";
    }
    // unless we're on a subdomain which suggest we might be in a dev or qa environment
    if (portalUrl.includes("qaext.arcgis.com") ||
        portalUrl.includes("mapsqa.arcgis.com")) {
        env = "qaext";
    }
    if (portalUrl.includes("devext.arcgis.com") ||
        portalUrl.includes("mapsdev.arcgis.com")) {
        env = "devext";
    }
    return env;
}

/**
 * ```js
 * import { getPortalApiUrl } from "@esri/hub-common";
 * // from a portal base URL
 * let portalApiUrl = getPortalApiUrl("https://org.maps.arcgis.com"); // https://org.maps.arcgis.com/sharing/rest
 * // from an enterprise portal self response (IPortal)
 * let portalSelf = { isPortal: true, portalHostname: "server.example.org" };
 * portalApiUrl = getPortalApiUrl(portalSelf); // https://server.example.org/sharing/rest
 * // from an online portal self response (IPortal)
 * portalSelf = { isPortal: false, urlKey: "org", customBaseUrl: "maps.arcgis.com" };
 * portalApiUrl = getPortalApiUrl(portalSelf); // https://org.maps.arcgis.com/sharing/rest
 * // from hub request options (IHubRequestOptions) with a portal self (IPortal)
 * let requestOptions = { isPortal: false, portalSelf };
 * portalApiUrl = getPortalApiUrl(requestOptions); // https://org.maps.arcgis.com/sharing/rest
 * // from request options (IRequestOptions) with a portal (string)
 * requestOptions = { portal: "https://org.maps.arcgis.com/sharing/rest" };
 * portalApiUrl = getPortalApiUrl(requestOptions); // https://org.maps.arcgis.com/sharing/rest
 * ```
 * Derive a portal's API URL from the portal's base URL, a portal object, or request options
 * @param urlOrObject a portal base URL, a portal object, or request options containing either of those
 * @returns The portal API URL, defaults to `https://www.arcgis.com/sharing/rest`
 */
function getPortalApiUrl(urlOrObject) {
    return `${getPortalUrl.getPortalUrl(urlOrObject)}/sharing/rest`;
}

exports.getEnvironmentFromPortalUrl = getEnvironmentFromPortalUrl;
exports.getPortalApiUrl = getPortalApiUrl;
