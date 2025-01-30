import { Logger, atob, btoa, convertModelToSite, fetchOrg, getSiteById, lookupDomain } from "@esri/hub-common";
import { getGlobalContext } from "../state";
import { _getOrgKey } from "./_internal";
const LOCAL_STORAGE_KEY = '__DOMAIN';
/**
 * serialize a domain and save it in local storage
 * @param domain omit this to clear any previously stored value
 */
export const storeDomain = (domain) => {
  if (domain) {
    const serialized = JSON.stringify(domain);
    const encoded = serialized && btoa(serialized);
    localStorage.setItem(LOCAL_STORAGE_KEY, encoded);
  }
  else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};
/**
 * retrieve site domain info from local storage
 * @returns domain
 */
export const retrieveDomain = () => {
  const encoded = localStorage.getItem(LOCAL_STORAGE_KEY);
  const decoded = encoded && atob(encoded);
  return decoded
    ? JSON.parse(decoded)
    : undefined;
};
/**
 * fetch domain by hostname
 * @param hostname
 * @returns
 */
export const fetchDomain = (hostname, context = getGlobalContext()) => {
  return lookupDomain(hostname, 
  /* istanbul ignore next - context will likely be defined and it's ok if not */
  context === null || context === void 0 ? void 0 : context.hubRequestOptions);
};
/**
 * get the hostname from the window
 * @param win
 */
export const getHostname = (
/* istanbul ignore next */
win = window) => {
  // in order to use this in opendata-ui we'll need
  // to support overriding this via query param
  return win.location.hostname;
};
/**
 * Heuristic to determine if the hostname is hub-home-ish
 */
export const isHubHomeishHostname = (hostname, hubRootDomain) => {
  return hostname.indexOf(hubRootDomain) > -1;
};
/**
 * fetch the domain info from the org given a hostname
 * @param hostname
 * @param portalBaseUrl
 * @param context
 * @returns
 */
export const fetchOrgDomainInfo = async (baseDomainInfo, context = getGlobalContext()) => {
  const orgKey = _getOrgKey(baseDomainInfo);
  // fetch the org info
  const portalInfo = await fetchOrg(orgKey, 
  /* istanbul ignore next - context will likely be defined and it's ok if not */
  context === null || context === void 0 ? void 0 : context.hubRequestOptions);
  const { id: orgId, name: orgTitle } = portalInfo;
  // decorate the domain info with the org info
  return Object.assign(Object.assign({}, baseDomainInfo), {
    // NOTE: we ensure downcased hostname and orgKey here
    orgKey,
    orgId,
    orgTitle, siteTitle: orgTitle
  });
};
export const updateDefaultHubHomeSiteModel = (siteModel, domain, win = window) => {
  const item = Object.assign({}, siteModel.item);
  const data = Object.assign({}, siteModel.data);
  // -------------------------------------------
  // Customize the site for the Organization
  // -------------------------------------------
  // Previously we did this via interpolation, but it seems that
  // the template items are occasionally edited and get values
  // hard-coded into them. Thus we are writing directly into the
  // layout and catalog
  // Catalog: Hub Home Catalog is _always_ just the orgId of the Hub Home org
  const { orgId, siteTitle } = domain;
  data.catalog = { orgId };
  // Hub Home also needs the orgName stomped into a number of locations
  try {
    data.values.title = siteTitle;
    data.values.layout.header.component.settings.title = siteTitle;
    data.values.layout.sections[0].rows[0].cards[0].component.settings.orgName = siteTitle;
    item.url = win.location.origin;
  }
  catch (ex) {
    // eslint-disable-next-line no-console
    Logger.error(`Error injecting values into HubHome Site Model. This is likely because the model has changed. Site Model Id: ${siteModel.item.id}`);
  }
  return { item, data };
};
/**
 * fetch the default hub home site for the environment
 * and update it with the domain info
 *
 * @param domain
 * @param context
 * @returns
 */
export const fetchDefaultHubHomeSite = async (domain, context = getGlobalContext()) => {
  const { siteId, orgKey } = domain;
  /* istanbul ignore next - context will likely be defined and it's ok if not */
  const ro = context === null || context === void 0 ? void 0 : context.hubRequestOptions;
  const siteModel = siteId && ro && await getSiteById(siteId, ro);
  if (!siteModel) {
    return undefined;
  }
  const updatedModel = updateDefaultHubHomeSiteModel(siteModel, domain);
  const hubSite = convertModelToSite(updatedModel, context.hubRequestOptions);
  // instantiate instance and attach as .currentSite
  // TODO: work out what schema migrations are needed. This is minimal for now
  /* istanbul ignore else */
  if (!hubSite.orgUrlKey) {
    hubSite.orgUrlKey = orgKey;
  }
  return hubSite;
};
