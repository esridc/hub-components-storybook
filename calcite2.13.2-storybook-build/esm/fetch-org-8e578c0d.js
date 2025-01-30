import { g as getProp } from './get-prop-ec5be510.js';
import { g as getPortalBaseFromOrgUrl } from './getPortalBaseFromOrgUrl-ad7df86a.js';
import { a as getPortal } from './get-portal-5e0a1617.js';

/**
 * Fetches the portal for a given org.
 *
 * @param orgId
 * @param options request options
 * @returns
 */
function fetchOrg(orgId, options) {
    const orgPortalUrl = getProp(options, "portal") ||
        getProp(options, "authentication.portal") ||
        "www.arcgis.com";
    // In order to get the correct response, we must pass options.portal
    // as a base portal url (e.g., www.arcgis.com, qaext.arcgis.com, etc)
    // **not** an org portal (i.e. org.maps.arcgis.com).
    const basePortalUrl = `${getPortalBaseFromOrgUrl(orgPortalUrl)}/sharing/rest`;
    return getPortal(orgId, Object.assign(Object.assign({}, options), { portal: basePortalUrl }));
}

export { fetchOrg as f };
