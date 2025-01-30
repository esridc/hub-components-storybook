import { g as getProp } from './get-prop-ec5be510.js';

/**
 * Remove protocol if present
 * @param {string} hostname Hostname
 */
function stripProtocol(hostname) {
    hostname = hostname.toLowerCase();
    if (hostname.includes("//")) {
        hostname = hostname.split("//")[1];
    }
    return hostname;
}

/**
 * Extract the domain service from the request options
 * @param {string} hubApiUrl
 * @private
 */
function _getDomainServiceUrl(hubApiUrl) {
    const base = hubApiUrl || "https://hub.arcgis.com";
    return `${base}/api/v3/domains`;
}

/**
 * Construct the auth header from a hub request options
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _getAuthHeader(hubRequestOptions) {
    const result = {};
    const token = getProp(hubRequestOptions, "authentication.token");
    if (token) {
        result.Authorization = token;
    }
    return result;
}

/**
 * Check if a domain entry exists. Different from lookupDomain
 * in that this will return true/false, where as lookupDomain will
 * return the domain entry or throw. However, lookupDomain can work
 * with ArcGIS Enterprise.
 * Will throw if used in Portal.
 * @param {string} hostname Domain entry to check for
 * @param {IHubRequestOptions} hubRequestOptions
 */
function domainExists(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`domainExists is not available in ArcGIS Enterprise.`);
    }
    hostname = stripProtocol(hostname);
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${hostname}`;
    const headers = _getAuthHeader(hubRequestOptions);
    return fetch(url, { method: "GET", headers, mode: "cors" }).then((response) => response.status !== 404);
}

export { _getAuthHeader as _, _getDomainServiceUrl as a, domainExists as d, stripProtocol as s };
