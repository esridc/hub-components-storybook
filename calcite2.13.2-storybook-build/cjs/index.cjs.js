'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const extent$1 = require('./extent-715f7c8d.js');
const map = require('./map-610ee1fc.js');
const getWorkspaceLinks = require('./getWorkspaceLinks-53129a7d.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const logger = require('./logger-5db3d659.js');
const types = require('./types-ff8f7df0.js');
const typeConverters = require('./type-converters-addaf67c.js');
const arcgis = require('./arcgis-492079b8.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
const metrics = require('./metrics-fa51a1d0.js');
const featureService = require('./feature-service-49ec8903.js');
const statCard = require('./stat-card-05c6ed95.js');
const util = require('./util-38e73510.js');
const downloadList = require('./download-list-00ce3845.js');
const colors = require('./colors-227b569c.js');
const hubSanitizer = require('./hubSanitizer-d5497b99.js');
const contextManager = require('./context-manager-487e7fe6.js');
const state = require('./state-6637df8c.js');
const index$2 = require('./index-058372c1.js');
const themes = require('./themes-d539965a.js');
const fetchOrg = require('./fetch-org-d214b65b.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const urls = require('./urls-2533c98f.js');
const resetNotice = require('./resetNotice-1e1fb605.js');
const extent = require('./extent-d08ca59a.js');
const screen = require('./screen-9b9fd440.js');
const index = require('./index-e124a54f.js');
const index$1 = require('./index-f4a4c954.js');
const deepCatalogContains = require('./deepCatalogContains-07573ead.js');
const Catalog = require('./Catalog-acebae88.js');
const getEventGroups = require('./getEventGroups-6c371c3e.js');
const get = require('./get-0368c931.js');
const interfaces = require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');
require('./request-67da3c71.js');
require('./getWorkspaceLinkDefinitions-aae57a67.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-family-cafa88bb.js');
require('@arcgis/core/config.js');
require('./interpolate-c1fe951a.js');
require('./is-nil-e28a2884.js');
require('./resources-e64df288.js');
require('./fetchHubEntity-88467d55.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./get-form-json-e6831b20.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./helpers-64227739.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./is-guid-b5c2b74c.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./OperationError-902f34ae.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./index-ef80ab27.js');
require('./append-custom-params-0f5d0fe2.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./HubError-44e07249.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./fail-safe-33c35b7f.js');
require('./get-portal-6ca924c2.js');
require('./search-b00c4c79.js');
require('./search-2db68ef4.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./slugify-826af07b.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./update-7b2b2d9d.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./index-77618030.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./encoding-211adb23.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./UserSession-f8bc10c8.js');
require('./store-2a385ca0.js');
require('./index-7c083111.js');
require('./index-6f16fe65.js');
require('./domain-exists-0c69176a.js');
require('./generate-random-string-8807d629.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./object-to-json-blob-5c0a267d.js');
require('./delete-prop-7826ae49.js');
require('./types-097b54b1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./remove-921f5dc7.js');
require('./Metrics-b8657153.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./sha256-07a9afb6.js');
require('./_internal-2383d905.js');
require('./deepContains-7989f3f1.js');
require('./parseContainmentPath-aaf496c0.js');

// I don't know why, but standardx is flagging these interfaces as unused
const getItemExtent = (item) => {
  const extent = item.extent;
  return extent$1.isBBox(extent)
    ? Object.assign(Object.assign({}, extent$1.bBoxToExtent(extent)), { type: 'extent' })
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
  const entityType = getTypeFromEntity.getTypeFromEntity(entity);
  // default pane based on entity type
  let defaultPane = DEFAULT_PANES_BY_TYPE[entityType] || 'details';
  // if we have a specific entity, look at its links to set the default pane
  if (entity && _context) {
    const links = await getWorkspaceLinks.getWorkspaceLinks(entity, _context);
    if (!links.length) {
      logger.Logger.warn('No workspace links found for entity', entity, _context);
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

const isValidPane = (pane) => !!pane && types.WORKSPACE_PANES.includes(pane);

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
  let c = util.cloneObject(config);
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
      cardId: config.cardId || util.createId(),
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
    const encoded = serialized && index$2.abab.btoa(serialized);
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
  const decoded = encoded && index$2.abab.atob(encoded);
  return decoded
    ? JSON.parse(decoded)
    : undefined;
};
/**
 * fetch domain by hostname
 * @param hostname
 * @returns
 */
const fetchDomain = (hostname, context = state.getGlobalContext()) => {
  return themes.lookupDomain(hostname, 
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
const fetchOrgDomainInfo = async (baseDomainInfo, context = state.getGlobalContext()) => {
  const orgKey = _getOrgKey(baseDomainInfo);
  // fetch the org info
  const portalInfo = await fetchOrg.fetchOrg(orgKey, 
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
    logger.Logger.error(`Error injecting values into HubHome Site Model. This is likely because the model has changed. Site Model Id: ${siteModel.item.id}`);
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
const fetchDefaultHubHomeSite = async (domain, context = state.getGlobalContext()) => {
  const { siteId, orgKey } = domain;
  /* istanbul ignore next - context will likely be defined and it's ok if not */
  const ro = context === null || context === void 0 ? void 0 : context.hubRequestOptions;
  const siteModel = siteId && ro && await themes.getSiteById(siteId, ro);
  if (!siteModel) {
    return undefined;
  }
  const updatedModel = updateDefaultHubHomeSiteModel(siteModel, domain);
  const hubSite = HubInitiatives.convertModelToSite(updatedModel, context.hubRequestOptions);
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
    groups = await getEventGroups.getEventGroups(itemId, context);
  }
  else {
    const response = await get.getItemGroups(itemId, context.requestOptions);
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
  const entityType = typeConverters.getEntityTypeFromHubEntityType(hubEntityType);
  if (site.isUmbrella) {
    // We only show items on Umbrella
    if (['item', 'event'].includes(entityType)) {
      try {
        // for umbrella we only allow entities that are in an Open Data group
        const groups = await sharedWith(entityId, entityType, opts.context);
        return groups.some(deepCatalogContains.isOpenDataGroup);
      }
      catch (e) {
        // if we can't fetch groups, do not allow
        logger.Logger.warn(e);
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
      const resp = await deepCatalogContains.deepCatalogContains(entityId, hubEntityType, path, opts.context, site.catalog);
      return resp.isContained;
    }
    else {
      // No path, so we can just check the site catalog
      // Create a Catalog from the site
      const catalog = Catalog.Catalog.fromJson(site.catalog, opts.context);
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

exports.getExtentSymbol = map.getExtentSymbol;
exports.getWorkspaceLinks = getWorkspaceLinks.getWorkspaceLinks;
Object.defineProperty(exports, 'PANE_ICONS', {
  enumerable: true,
  get: function () {
    return types.PANE_ICONS;
  }
});
exports.WORKSPACE_PANES = types.WORKSPACE_PANES;
exports.createFacetsFromAggregations = typeConverters.createFacetsFromAggregations;
exports.getEntityTypeFromHubEntityType = typeConverters.getEntityTypeFromHubEntityType;
exports.getHubEntityTypeFromType = typeConverters.getHubEntityTypeFromType;
exports.loadArcGisCss = arcgis.loadArcGisCss;
exports.setArcGisCssOptions = arcgis.setArcGisCssOptions;
exports.interpolateTranslations = interpolateTranslations.interpolateTranslations;
exports.transformEditorValuesToMetricAndCardConfig = metrics.transformEditorValuesToMetricAndCardConfig;
exports.getIconForFieldType = featureService.getIconForFieldType;
exports.migrateSummaryStatCardSettings = statCard.migrateSummaryStatCardSettings;
exports.downloadRemoteFile = downloadList.downloadRemoteFile;
exports.getThemeColors = colors.getThemeColors;
exports.ALLOWED_PROTOCOLS = hubSanitizer.ALLOWED_PROTOCOLS;
exports.SVG_TAGS = hubSanitizer.SVG_TAGS;
exports.hubSafeAttrValue = hubSanitizer.hubSafeAttrValue;
exports.onlyLinks = hubSanitizer.onlyLinks;
exports.sanitizeHeadContent = hubSanitizer.sanitizeHeadContent;
exports.sanitizeHtml = hubSanitizer.sanitizeHtml;
exports.sanitizeMarkdown = hubSanitizer.sanitizeMarkdown;
exports.sanitizePreviewMarkdown = hubSanitizer.sanitizePreviewMarkdown;
exports.sanitizeUrl = hubSanitizer.sanitizeUrl;
exports.stripHtml = hubSanitizer.stripHtml;
exports.validateHtml = hubSanitizer.validateHtml;
exports.createContextManager = contextManager.createContextManager;
exports.getResourceConfigs = contextManager.getResourceConfigs;
exports.initContextManager = contextManager.initContextManager;
exports.parseFlags = contextManager.parseFlags;
exports.retrieveContextManager = contextManager.retrieveContextManager;
exports.storeContextManager = contextManager.storeContextManager;
exports.URL_STATE_SEPARATOR = state.URL_STATE_SEPARATOR;
exports.connectContext = state.connectContext;
exports.getCurrentSite = state.getCurrentSite;
exports.getGlobalContext = state.getGlobalContext;
exports.getNotices = state.getNotices;
exports.getPreconfiguredNotice = state.getPreconfiguredNotice;
exports.getPreconfiguredNotices = state.getPreconfiguredNotices;
exports.getUrlState = state.getUrlState;
exports.initializeUrlState = state.initializeUrlState;
exports.removeNotice = state.removeNotice;
exports.setCurrentSite = state.setCurrentSite;
exports.setGlobalContext = state.setGlobalContext;
exports.setUrlState = state.setUrlState;
exports.showNotice = state.showNotice;
exports.validUrlStateParams = state.validUrlStateParams;
exports.getAbsoluteEntityViewUrl = urls.getAbsoluteEntityViewUrl;
exports.getAbsoluteEntityWorkspaceUrl = urls.getAbsoluteEntityWorkspaceUrl;
exports.getEntityLayoutUrl = urls.getEntityLayoutUrl;
exports.getEntityTypeViewUrl = urls.getEntityTypeViewUrl;
exports.getEntityWorkspaceUrl = urls.getEntityWorkspaceUrl;
exports.getOverviewUrl = urls.getOverviewUrl;
exports.getProfileUrl = urls.getProfileUrl;
exports.getRelativeEntityViewUrl = urls.getRelativeEntityViewUrl;
exports.getSignOutUrl = urls.getSignOutUrl;
exports.getSiteHomeUrl = urls.getSiteHomeUrl;
exports.getWorkspaceHomeUrl = urls.getWorkspaceHomeUrl;
exports.injectPort = urls.injectPort;
exports.isExternalLink = urls.isExternalLink;
exports.parseHubUrl = urls.parseHubUrl;
exports.parseLogLevel = urls.parseLogLevel;
exports.redirectToExternalUrl = urls.redirectToExternalUrl;
exports.dismissNotice = resetNotice.dismissNotice;
exports.resetNotice = resetNotice.resetNotice;
exports.shouldShowNotice = resetNotice.shouldShowNotice;
exports.expandExtentByFactor = extent.expandExtentByFactor;
exports.getExtentArea = extent.getExtentArea;
Object.defineProperty(exports, 'SCREEN_SIZE', {
  enumerable: true,
  get: function () {
    return screen.SCREEN_SIZE;
  }
});
exports.addCommonDimensions = index.addCommonDimensions;
exports.initTelemetry = index.initTelemetry;
exports.isEueiDisabled = index.isEueiDisabled;
exports.isHubAnalyticsEnabled = index.isHubAnalyticsEnabled;
exports.matchesTelemetry = index.matchesTelemetry;
exports.fetchComponentLocaleStrings = index$1.fetchComponentLocaleStrings;
exports.fetchLanguageDirection = index$1.fetchLanguageDirection;
exports.getLocaleInfo = index$1.getLocaleInfo;
exports.getLocaleInfoFromLocale = index$1.getLocaleInfoFromLocale;
exports.localeParseFloat = index$1.localeParseFloat;
exports.RTLLocales = interfaces.RTLLocales;
exports.SupportedLocales = interfaces.SupportedLocales;
exports.SupportedLocalesForFormats = interfaces.SupportedLocalesForFormats;
exports.applyFollowCardMigrations = applyFollowCardMigrations;
exports.fetchDefaultHubHomeSite = fetchDefaultHubHomeSite;
exports.fetchDomain = fetchDomain;
exports.fetchOrgDomainInfo = fetchOrgDomainInfo;
exports.getAgoEnvSubdomain = getAgoEnvSubdomain;
exports.getContentBoundarySources = getContentBoundarySources;
exports.getDefaultWorkspacePane = getDefaultWorkspacePane;
exports.getEnvSuffix = getEnvSuffix;
exports.getEnvironmentIds = getEnvironmentIds;
exports.getHostname = getHostname;
exports.isAllowedOnSite = isAllowedOnSite;
exports.isHubHomeishHostname = isHubHomeishHostname;
exports.isLinkingFromSite = isLinkingFromSite;
exports.isValidEntityType = isValidEntityType;
exports.isValidPane = isValidPane;
exports.retrieveDomain = retrieveDomain;
exports.storeDomain = storeDomain;
exports.updateDefaultHubHomeSiteModel = updateDefaultHubHomeSiteModel;
