import { i as isBBox, b as bBoxToExtent } from './extent-34a4ba2a.js';
export { g as getExtentSymbol } from './map-d797b63c.js';
import { g as getWorkspaceLinks } from './getWorkspaceLinks-2d25d26d.js';
export { g as getWorkspaceLinks } from './getWorkspaceLinks-2d25d26d.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { L as Logger } from './logger-f8667200.js';
import { W as WORKSPACE_PANES } from './types-dca4cb90.js';
export { P as PANE_ICONS, W as WORKSPACE_PANES } from './types-dca4cb90.js';
import { g as getEntityTypeFromHubEntityType } from './type-converters-c5f8a126.js';
export { c as createFacetsFromAggregations, g as getEntityTypeFromHubEntityType, a as getHubEntityTypeFromType } from './type-converters-c5f8a126.js';
export { l as loadArcGisCss, s as setArcGisCssOptions } from './arcgis-1e3a04cd.js';
export { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
export { t as transformEditorValuesToMetricAndCardConfig } from './metrics-31a6916b.js';
export { g as getIconForFieldType } from './feature-service-308c7df6.js';
export { m as migrateSummaryStatCardSettings } from './stat-card-4599cc9c.js';
import { a as cloneObject, c as createId } from './util-3e6872d9.js';
export { d as downloadRemoteFile } from './download-list-38d6b571.js';
export { g as getThemeColors } from './colors-41539dda.js';
export { A as ALLOWED_PROTOCOLS, S as SVG_TAGS, h as hubSafeAttrValue, o as onlyLinks, d as sanitizeHeadContent, c as sanitizeHtml, a as sanitizeMarkdown, b as sanitizePreviewMarkdown, e as sanitizeUrl, s as stripHtml, v as validateHtml } from './hubSanitizer-45ca9e6e.js';
export { c as createContextManager, g as getResourceConfigs, i as initContextManager, p as parseFlags, r as retrieveContextManager, s as storeContextManager } from './context-manager-f969db95.js';
import { g as getGlobalContext } from './state-31a09db0.js';
export { U as URL_STATE_SEPARATOR, h as connectContext, a as getCurrentSite, g as getGlobalContext, c as getNotices, j as getPreconfiguredNotice, k as getPreconfiguredNotices, f as getUrlState, i as initializeUrlState, r as removeNotice, b as setCurrentSite, s as setGlobalContext, e as setUrlState, d as showNotice, v as validUrlStateParams } from './state-31a09db0.js';
import { a as abab } from './index-0a8fd06b.js';
import { l as lookupDomain, g as getSiteById } from './themes-e08327b4.js';
import { f as fetchOrg } from './fetch-org-8e578c0d.js';
import { c as convertModelToSite } from './HubInitiatives-4f4e24ce.js';
export { f as getAbsoluteEntityViewUrl, h as getAbsoluteEntityWorkspaceUrl, g as getEntityLayoutUrl, i as getEntityTypeViewUrl, a as getEntityWorkspaceUrl, c as getOverviewUrl, b as getProfileUrl, e as getRelativeEntityViewUrl, m as getSignOutUrl, l as getSiteHomeUrl, d as getWorkspaceHomeUrl, j as injectPort, k as isExternalLink, n as parseHubUrl, p as parseLogLevel, r as redirectToExternalUrl } from './urls-0e36649d.js';
export { d as dismissNotice, r as resetNotice, s as shouldShowNotice } from './resetNotice-b6ee6eb8.js';
export { e as expandExtentByFactor, g as getExtentArea } from './extent-67c6eb57.js';
export { S as SCREEN_SIZE } from './screen-4768262d.js';
export { c as addCommonDimensions, b as initTelemetry, i as isEueiDisabled, a as isHubAnalyticsEnabled, m as matchesTelemetry } from './index-39849f62.js';
export { f as fetchComponentLocaleStrings, b as fetchLanguageDirection, g as getLocaleInfo, a as getLocaleInfoFromLocale, l as localeParseFloat } from './index-213c70d0.js';
import { i as isOpenDataGroup, d as deepCatalogContains } from './deepCatalogContains-727e43de.js';
import { C as Catalog } from './Catalog-290f043e.js';
import { g as getEventGroups } from './getEventGroups-a2ce236d.js';
import { g as getItemGroups } from './get-f0caeb52.js';
export { R as RTLLocales, S as SupportedLocales, a as SupportedLocalesForFormats } from './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';
import './request-fa80ae40.js';
import './getWorkspaceLinkDefinitions-6ee1781a.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './get-family-543fac52.js';
import '@arcgis/core/config.js';
import './interpolate-d39d6151.js';
import './is-nil-03b9a6b5.js';
import './resources-3b88c839.js';
import './fetchHubEntity-28d04ab4.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './get-form-json-1d4e3591.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './helpers-8c7e5e31.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './is-guid-982831aa.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './tslib.es6-7023f322.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './index-edff2d62.js';
import './append-custom-params-4bd856e5.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './HubError-e26c5610.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './fail-safe-cd1a5a2a.js';
import './get-portal-5e0a1617.js';
import './search-211dee83.js';
import './search-c7a57aa9.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './slugify-e3e67bac.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './update-26e2fbc1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './index-55cb25f7.js';
import './_commonjsHelpers-11ca3be1.js';
import './encoding-1c5014ff.js';
import './ArcGISContextManager-c977211a.js';
import './UserSession-2c05f7b6.js';
import './store-0a6cb79f.js';
import './index-57f71b44.js';
import './index-dd3f99ac.js';
import './domain-exists-4fd7dc09.js';
import './generate-random-string-1436d9e6.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './object-to-json-blob-583ae5c3.js';
import './delete-prop-bd13d424.js';
import './types-2eaa1a18.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './remove-7361a90a.js';
import './Metrics-9cb7a1fc.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './sha256-bf3e0364.js';
import './_internal-96d77ae4.js';
import './deepContains-ff859c50.js';
import './parseContainmentPath-a32e8034.js';

// I don't know why, but standardx is flagging these interfaces as unused
const getItemExtent = (item) => {
  const extent = item.extent;
  return isBBox(extent)
    ? Object.assign(Object.assign({}, bBoxToExtent(extent)), { type: 'extent' })
    : undefined;
};
/**
 * Given a content generate an array of sources to use with arcgis-boundary-picker-ui
 * @param content
 * @returns
 */
const getContentBoundarySources = (content) => {
  var _a;
  const item = content === null || content === void 0 ? void 0 : content.item;
  const selectedSource = (_a = item === null || item === void 0 ? void 0 : item.properties) === null || _a === void 0 ? void 0 : _a.boundary;
  // NOTE: we are relying on the default labels
  const _sources = [
    {
      value: 'none',
      selected: selectedSource === 'none'
    }
  ];
  if (item) {
    const geometry = getItemExtent(item);
    const graphic = geometry && {
      geometry
      // NOTE: we're relying on the default symbol
    };
    _sources.push({
      value: 'item',
      graphic,
      selected: selectedSource === 'item'
    });
  }
  return _sources;
};

/**
 * Returns the default workspace pane for a given entity or entity type.
 * Should pass entityOptions, which should have either entity or entityType.
 * @param _context
 * @param entityOptions
 * @returns
 */
async function getDefaultWorkspacePane(entity, _context) {
  const DEFAULT_PANES_BY_TYPE = {
    user: 'overview'
  };
  // get entity type
  const entityType = getTypeFromEntity(entity);
  // default pane based on entity type
  let defaultPane = DEFAULT_PANES_BY_TYPE[entityType] || 'details';
  // if we have a specific entity, look at its links to set the default pane
  if (entity && _context) {
    const links = await getWorkspaceLinks(entity, _context);
    if (!links.length) {
      Logger.warn('No workspace links found for entity', entity, _context);
      return defaultPane;
    }
    const link = links.find(({ pane }) => pane === defaultPane) || links[0];
    defaultPane = link.pane;
  }
  return defaultPane;
}

// TODO: use this in opendata-ui
const isValidEntityType = (entity) => {
  const validEntities = [
    'site',
    'project',
    'initiative',
    'page',
    'discussion',
    'content',
    'org',
    'initiativeTemplate',
    'survey',
  ];
  return !!entity && validEntities.includes(entity);
};

const isValidPane = (pane) => !!pane && WORKSPACE_PANES.includes(pane);

/**
 * Apply the follow card migration to the card
 * config that's passed in
 * @param config config to apply the migration to
 * @param entity entity that the card is following
 * @returns migrated card config
 */
function applyFollowCardMigrations(config = {}, entity) {
  const c = migrateFollowCardConfigV1(config, entity);
  // future migrations could be added here, e.g.
  // c = migrateFollowCardConfigV2(config, entity);
  return c;
}
/**
 * Migrate the card to V1
 */
function migrateFollowCardConfigV1(config = {}, entity) {
  let c = cloneObject(config);
  let entityId;
  let entityType;
  // Existing Follow initiative card (w/o schemaVersion)
  if (!c.schemaVersion) {
    // card following the site's parent initiative,
    // we use the the site info as entity info
    if (isFollowingParentInitiative(config, entity)) {
      entityId = entity.id;
      entityType = 'site';
    }
    else {
      // card following an external initiative,
      // we use the same initiative info as entity info
      entityId = config.initiativeId;
      entityType = 'initiative';
    }
    c = {
      // initiativeId is a prop that exists in the old
      // follow initiative card schema. Since we can't
      // remove props from card schema, we are overwriting
      // its value here so the post processing function
      // can walk through the site object and delete all
      // the props with a 'delete-this-property' value
      initiativeId: 'delete-this-property',
      entityId,
      entityType,
      callToActionText: config.callToActionText,
      callToActionAlign: migrateAlignment(config.callToActionAlign),
      buttonText: config.buttonText,
      unfollowButtonText: config.unfollowButtonText,
      buttonAlign: migrateAlignment(config.buttonAlign),
      buttonStyle: migrateButtonStyle(config.buttonStyle),
      cardId: config.cardId || createId(),
      schemaVersion: 1
    };
  }
  // for new sites we can't get the site id off the
  // initiative during activation as the site is not
  // created yet, so in the case where the card's
  // 'schemaVersion' is 0 AND the card config entity
  // type is 'site' we leverage the existing migration
  // to set the appropriate entity id of the site
  // and remove the initiativeId prop time
  if (config.schemaVersion === 0) {
    c.schemaVersion = 1;
    c.entityType = 'site';
    c.entityId = entity.id;
    delete c.initiativeId;
  }
  // for new and migrated follow cards (with schemaVersion),
  // return the same config.
  return c;
}
function migrateAlignment(align) {
  if (align === 'left') {
    return 'start';
  }
  if (align === 'right') {
    return 'end';
  }
  return 'center';
}
function migrateButtonStyle(style) {
  if (style === 'outline') {
    return 'outline-fill';
  }
  return style;
}
function isFollowingParentInitiative(config, entity) {
  return config.initiativeId === entity.properties.parentInitiativeId;
}

/**
 * get orgKey or derive from hostname
 * and ensure it is lowercased
 * @param domain
 * @returns
 */
const _getOrgKey = (domain) => {
  var _a, _b;
  return (_b = (domain.orgKey || ((_a = domain.hostname) === null || _a === void 0 ? void 0 : _a.split('.')[0]))) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase();
};

const LOCAL_STORAGE_KEY = '__DOMAIN';
/**
 * serialize a domain and save it in local storage
 * @param domain omit this to clear any previously stored value
 */
const storeDomain = (domain) => {
  if (domain) {
    const serialized = JSON.stringify(domain);
    const encoded = serialized && abab.btoa(serialized);
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
const retrieveDomain = () => {
  const encoded = localStorage.getItem(LOCAL_STORAGE_KEY);
  const decoded = encoded && abab.atob(encoded);
  return decoded
    ? JSON.parse(decoded)
    : undefined;
};
/**
 * fetch domain by hostname
 * @param hostname
 * @returns
 */
const fetchDomain = (hostname, context = getGlobalContext()) => {
  return lookupDomain(hostname, 
  /* istanbul ignore next - context will likely be defined and it's ok if not */
  context === null || context === void 0 ? void 0 : context.hubRequestOptions);
};
/**
 * get the hostname from the window
 * @param win
 */
const getHostname = (
/* istanbul ignore next */
win = window) => {
  // in order to use this in opendata-ui we'll need
  // to support overriding this via query param
  return win.location.hostname;
};
/**
 * Heuristic to determine if the hostname is hub-home-ish
 */
const isHubHomeishHostname = (hostname, hubRootDomain) => {
  return hostname.indexOf(hubRootDomain) > -1;
};
/**
 * fetch the domain info from the org given a hostname
 * @param hostname
 * @param portalBaseUrl
 * @param context
 * @returns
 */
const fetchOrgDomainInfo = async (baseDomainInfo, context = getGlobalContext()) => {
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
    orgTitle, siteTitle: orgTitle });
};
const updateDefaultHubHomeSiteModel = (siteModel, domain, win = window) => {
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
const fetchDefaultHubHomeSite = async (domain, context = getGlobalContext()) => {
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

const environmentIds = {
  dev: {
    esriTemplateOrgIds: ['VLx4vrvwONglS8iz'],
    alphaOrgs: ['LjjARY1mkhxulWPq', 'q2ikdtW0bkt5EgtQ', 'yHYVvboBBOdmcKci', '0NqqyC4CsJL19Fld'],
    betaOrgs: ['LjjARY1mkhxulWPq', 'WUQfmD5lsOhcAT0g'],
    hubHomeItemId: '2292b4f949c649b980fc6d3c4e768697',
    templateItems: {
      experience: '2b76e16a42d84466b5b2c37eb2a56914'
    }
  },
  qa: {
    esriTemplateOrgIds: ['97KLIFOSt5CxbiRI', 'i7gAfcdQl7MlSCjA'],
    alphaOrgs: ['97KLIFOSt5CxbiRI', 'MiFBHFxEZWumnKCx', '8HRYeOqprj872mxP', 'Xj56SBi2udA78cC9', '76I6Tq3eOJRBzqnC', 'uFEMdY4VMonzH8sG'],
    betaOrgs: ['97KLIFOSt5CxbiRI', 'MiFBHFxEZWumnKCx', 'nt4jSaTcGSE6onvN'],
    hubHomeItemId: '5e427004a807413597330485cd763172',
    templateItems: {
      experience: '465e45c70c53403099b0982d2858b171'
    }
  },
  prod: {
    esriTemplateOrgIds: ['TWfU0bgvgUkCgHLa', 'P3ePLMYs2RVChkJx'],
    alphaOrgs: [
      // 'gGHDlz6USftL5Pau', usfs - removed 2/27/2024
      'CrA5hYOKgL3Vwan8',
      'zj227gjeSqEyG4HF',
      'vIu5NCxQFilhVymO',
      'bkrWlSKcjUDFDtgw' // dcdev
    ],
    betaOrgs: [
      'bkrWlSKcjUDFDtgw',
      // 'OwiQO3QpAXsZqKvZ', // andrew (stauffer) - removed 2/27/2024
      'BBpPn9wZu2D6eTNY' // cityx
    ],
    hubHomeItemId: '715727e65c4c47c4b670838ff46c2645',
    templateItems: {
      experience: 'b17105db52af4a4498b23250be7e5789'
    }
  }
};
// TODO: use this in opendata-ui/config/shared/shared.js
/**
 * Get the well known item and group ids for a given environment
 * @param envName
 * @returns well known item and group ids for the given environment
 */
const getEnvironmentIds = (envName) => {
  return environmentIds[envName];
};
// should the following be hoisted to hub.js?
/**
 * Get the suffix to append to subdomains for a given environment urls
 * @param envName
 * @returns the suffix to append to subdomains for the given environment urls
 * @example '' for prod (hub.arcgis.com), 'qa' for qa (hubqa.arcgis.com), 'dev' for dev (hubdev.arcgis.com)
 */
const getEnvSuffix = (envName) => {
  return envName === 'prod' ? '' : envName;
};
/**
 * Get the ArcGIS Online subdomain for a given environment
 * @param envName
 * @returns the ArcGIS Online subdomain for the given environment
 * @example www, qaext, or devext
 */
const getAgoEnvSubdomain = (envName) => {
  const suffix = getEnvSuffix(envName);
  return suffix ? `${suffix}ext` : 'www';
};

/**
 * @internal
 * Fetch the groups that an item or event is shared with
 * @param itemId
 * @param entityType
 * @param context
 * @returns
 */
async function sharedWith(itemId, entityType, context) {
  let groups = [];
  if (entityType === 'event') {
    groups = await getEventGroups(itemId, context);
  }
  else {
    const response = await getItemGroups(itemId, context.requestOptions);
    // simplify the response to a single array
    groups = [...response.admin, ...response.member, ...response.other];
  }
  return groups;
}
/**
 * Determine if an entity can be rendered in the context of a specific site.
 * In time, this will handle transitive inclusion, but for now it's a simple check against
 * the site's catalog.
 * @param entityId Identifier of the entity to check. This can not be a slug.
 * @param entityType The type of entity to check. e.g. "item", "group", "event"
 * @param site IHubSite object to check against
 * @param opts additional options.
 * @returns
 */
const isAllowedOnSite = async (entityId, hubEntityType, site, opts) => {
  // If this is umbrella, we only allow entities that are in an Open Data group...
  // get the EntityType from the HubEntityType
  const entityType = getEntityTypeFromHubEntityType(hubEntityType);
  if (site.isUmbrella) {
    // We only show items on Umbrella
    if (['item', 'event'].includes(entityType)) {
      try {
        // for umbrella we only allow entities that are in an Open Data group
        const groups = await sharedWith(entityId, entityType, opts.context);
        return groups.some(isOpenDataGroup);
      }
      catch (e) {
        // if we can't fetch groups, do not allow
        Logger.warn(e);
        return false;
      }
    }
    else {
      return false;
    }
  }
  else {
    const path = opts.path || ''; // ensure it's not null/undefined
    if (path) {
      const resp = await deepCatalogContains(entityId, hubEntityType, path, opts.context, site.catalog);
      return resp.isContained;
    }
    else {
      // No path, so we can just check the site catalog
      // Create a Catalog from the site
      const catalog = Catalog.fromJson(site.catalog, opts.context);
      // check if the entity is in the catalog
      return (await catalog.contains(entityId, { entityType })).isContained;
    }
    // When implementing https://devtopia.esri.com/dc/hub/issues/11176 this is where we will handle
    // the opts.path, and transitive containment.
  }
};

/**
 * Determine if the link is being opened from within the site
 * or is a new tab / window opened from the same site.
 * This will return false if it's a fresh load (e.g. a bookmark or manual URL entry).
 * OR if it's a link from another site (e.g. Google search result).
 * @param {*} transitionFrom - object indicating that this is an internal transition vs a fresh load
 * @param {*} win - window object
 * @returns
 */
const isLinkingFromSite = (transitionFrom, win = window) => {
  // If transitionFrom is defined, this is an internal transition, so we trust it.
  // Otherwise, we check if the referrer is the current location's hostname meaning this
  // was opened in a new tab or window from the same site, which we trust.
  return transitionFrom ? true : !!(win.document.referrer && win.document.referrer.match(win.location.hostname));
};

export { applyFollowCardMigrations, fetchDefaultHubHomeSite, fetchDomain, fetchOrgDomainInfo, getAgoEnvSubdomain, getContentBoundarySources, getDefaultWorkspacePane, getEnvSuffix, getEnvironmentIds, getHostname, isAllowedOnSite, isHubHomeishHostname, isLinkingFromSite, isValidEntityType, isValidPane, retrieveDomain, storeDomain, updateDefaultHubHomeSiteModel };
