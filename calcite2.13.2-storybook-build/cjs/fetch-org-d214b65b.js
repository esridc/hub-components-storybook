'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');
const getPortalBaseFromOrgUrl = require('./getPortalBaseFromOrgUrl-393e8178.js');
const getPortal = require('./get-portal-6ca924c2.js');

/**
 * Fetches the portal for a given org.
 *
 * @param orgId
 * @param options request options
 * @returns
 */
function fetchOrg(orgId, options) {
    const orgPortalUrl = getProp.getProp(options, "portal") ||
        getProp.getProp(options, "authentication.portal") ||
        "www.arcgis.com";
    // In order to get the correct response, we must pass options.portal
    // as a base portal url (e.g., www.arcgis.com, qaext.arcgis.com, etc)
    // **not** an org portal (i.e. org.maps.arcgis.com).
    const basePortalUrl = `${getPortalBaseFromOrgUrl.getPortalBaseFromOrgUrl(orgPortalUrl)}/sharing/rest`;
    return getPortal.getPortal(orgId, Object.assign(Object.assign({}, options), { portal: basePortalUrl }));
}

exports.fetchOrg = fetchOrg;
