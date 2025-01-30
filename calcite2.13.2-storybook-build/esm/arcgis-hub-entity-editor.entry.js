import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import { i as isNil } from './is-nil-03b9a6b5.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { a as getPointCount } from './map-d797b63c.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { n as deepEqual } from './get-form-json-1d4e3591.js';
import { E as EntityEditor } from './EntityEditor-1f0c9dcd.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { b as capitalize, a as cloneObject } from './util-3e6872d9.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getEditorSlug-78023e22.js';
import './unshare-item-from-groups-b09dcce3.js';
import './unshare-item-with-group-b4a3a08f.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './share-item-with-group-5711513b.js';
import './update-user-membership-261681cf.js';
import './share-item-to-groups-547b9cd0.js';
import './poll-77a94dfa.js';
import './search-211dee83.js';
import './sharedWith-3ad296b7.js';
import './checkPermission-6c5be250.js';
import './enrichEntity-a5bc0b4f.js';
import './access-7968589d.js';
import './getEditorConfig-a89f031d.js';
import './edit-237c0a70.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './utils-cde3af49.js';
import './fetchHubEntity-28d04ab4.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './HubGroup-9aed80ee.js';
import './Catalog-290f043e.js';
import './ArcGISContextManager-c977211a.js';
import './logger-f8667200.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';
import './getEntityMetrics-ad176d9d.js';
import './resolveMetric-7286227d.js';
import './getCardModelUrl-a5543776.js';
import './HubPage-e56c4fe7.js';
import './HubSite-374c57db.js';
import './deepContains-ff859c50.js';
import './parseContainmentPath-a32e8034.js';
import './updateVersionMetadata-068ede7c.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './unshareEventWithGroups-2bac7a58.js';
import './getEventGroups-a2ce236d.js';

const EDITOR_PROPERTY_PATHS = {
  LOCATION: "location",
  DESCRIPTION: "description",
  SUMMARY: "summary",
  TIMELINE: "view.timeline",
  ACTIONLINKS: "view.heroActions",
  FEATURED_CONTENT: "view.featuredContentIds",
  FEATURED_IMAGE: "view.featuredImage",
  STATUS: "status",
  MEMBERSHIP_ACCESS: "membershipAccess",
  CONTENT_CONTRIBUTION: "isViewOnly",
  FOLLOWERS_ACTION: "_followers.showFollowAction",
  FOLLOWERS_GROUP_ACCESS: "_followers.groupAccess",
  SHARE_TO: "_groups",
  ACCESS: "access",
  FORCE_UPDATE: "_forceUpdate",
  REHARVEST_SCHEDULE: "schedule"
};
const { LOCATION, DESCRIPTION, SUMMARY, TIMELINE, ACTIONLINKS, FEATURED_CONTENT, FEATURED_IMAGE, STATUS, MEMBERSHIP_ACCESS, CONTENT_CONTRIBUTION, FOLLOWERS_ACTION, FOLLOWERS_GROUP_ACCESS, SHARE_TO, ACCESS, FORCE_UPDATE, REHARVEST_SCHEDULE, } = EDITOR_PROPERTY_PATHS;
const TELEMETRY_FUNCTION_MAP = {
  [LOCATION]: getLocationTelemetry,
  [DESCRIPTION]: getDescriptionTelemetry,
  [SUMMARY]: getSummaryTelemetry,
  [TIMELINE]: getTimelineTelemetry,
  [ACTIONLINKS]: getActionLinkTelemetry,
  [FEATURED_CONTENT]: getFeaturedContentTelemetry,
  [FEATURED_IMAGE]: getFeaturedImageTelemetry,
  [STATUS]: getStatusTelemetry,
  [MEMBERSHIP_ACCESS]: getMembershipAccessTelemetry,
  [CONTENT_CONTRIBUTION]: getContentContributionTelemetry,
  [FOLLOWERS_ACTION]: getFollowersTabTelemetry,
  [FOLLOWERS_GROUP_ACCESS]: getFollowersGroupAccessTelemetry,
  [SHARE_TO]: getShareToTelemetry,
  [ACCESS]: getAccessTelemetry,
  [FORCE_UPDATE]: getForceUpdateTelemetry,
  [REHARVEST_SCHEDULE]: getUpdateScheduleTelemetry,
};
const itemDefaults = [LOCATION, DESCRIPTION, SUMMARY, SHARE_TO, ACCESS];
const TELEMETRY_TO_LOG = {
  default: itemDefaults,
  site: [...itemDefaults, FOLLOWERS_ACTION, FOLLOWERS_GROUP_ACCESS],
  project: [...itemDefaults, TIMELINE, FEATURED_CONTENT, FEATURED_IMAGE, STATUS, ACTIONLINKS],
  group: [SUMMARY, MEMBERSHIP_ACCESS, CONTENT_CONTRIBUTION],
  // we don't yet have a user entity, but this sets us up for when we do
  user: [],
  // initiative has all the ones itemDefaults has, create one here
  // in case we need to add more later
  initiative: [...itemDefaults],
  content: [...itemDefaults, FORCE_UPDATE, REHARVEST_SCHEDULE],
};
/**
 * For a default or entity-specific set of properties, the
 * following function compares the original value of the
 * property to the updated value on "save". If there's a
 * "diff", it delegates to a helper function to construct
 * the update telemetry event for that property. Ultimately,
 * this function returns an array of constructed telemetry
 * events which get emitted to the consuming application.
 *
 * For now, these functions are set up to be generic, meaning
 * that we offer the same set of telemetry events regardless
 * of the entity type. We can refactor this in the future if
 * necessary, but let's keep it simple for now and try to
 * make our telemetry consistent between types. Furthermore,
 * we should do our best to only log telemetry for common
 * IHubEntity properties that will apply to all types
 */
const parseTelemetryEvents = (originalValues, updatedValues, type) => {
  const properties = TELEMETRY_TO_LOG[type] || TELEMETRY_TO_LOG.default;
  return properties.reduce((acc, property) => {
    const originalValue = getProp(originalValues, property);
    const updatedValue = getProp(updatedValues, property);
    const isUpdated = hasDiff(originalValue, updatedValue);
    if (isUpdated) {
      const telemetry = TELEMETRY_FUNCTION_MAP[property](updatedValue, type);
      Array.isArray(telemetry) ? acc.push(...telemetry) : acc.push(telemetry);
    }
    return acc;
  }, []);
};
/**
 * This function determines if there's a diff between two values.
 * We stringify the values before comparison in order to compare
 * values of type "object". This may be a naive deep comparison
 * approach but we'll move forward with this as a first pass
 */
const hasDiff = (originalValue, updatedValue) => {
  return typeof originalValue === 'object'
    ? JSON.stringify(originalValue) !== JSON.stringify(updatedValue)
    : originalValue !== updatedValue;
};
/**
 * If an entity's custom location changes, we emit telemetry events with:
 * 1. the geometry type (polygon, line, point)
 * 2. the total number of points/features persisted - for storage,
 * purposes the location picker has a default max # of points set to
 * 60 and a max # of features set to 10. We want to keep track of how
 * many points/features users are actually drawing so we can adjust
 * these limits accordingly
 */
function getLocationTelemetry(location) {
  var _a, _b, _c;
  let telemetry = [];
  if (location.type === 'custom') {
    const geometryType = (_b = (_a = location.geometries) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type;
    const telemetryDetails = {
      point: { features: 'featuresPoints', points: 'pointsPoints' },
      polyline: { features: 'featuresLines', points: 'pointsLines' },
      polygon: { features: 'featuresPolygons', points: 'pointsPolygons' }
    }[geometryType] || { features: 'featuresPoints', points: 'pointsPoints' };
    telemetry = [
      Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.location.details[telemetryDetails.features]), { count: (_c = location.geometries) === null || _c === void 0 ? void 0 : _c.length }),
      Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.location.details[telemetryDetails.points]), { count: getPointCount(location) })
    ];
  }
  return telemetry;
}
/**
 * If an entity's description changes, we log the description
 * length - this gives us a sense of if the field is being
 * used, and if so, the average description length
 */
function getDescriptionTelemetry(description) {
  return Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.description), { count: description === null || description === void 0 ? void 0 : description.length });
}
/**
 * If an entity's summary changes, we log the summary
 * length - this gives us a sense of if the field is being
 * used, and if so, the average summary length
 */
function getSummaryTelemetry(summary, type) {
  const category = type === "group" ? "groups" : "content";
  return Object.assign(Object.assign({}, dist.dictionary.category[category].action.update.label.summary), { count: summary === null || summary === void 0 ? void 0 : summary.length });
}
/**
 * If an entity's timeline changes, we log the number of
 * configured timeline stages - this gives us a sense of
 * how timelines are being used
 */
function getTimelineTelemetry(timeline) {
  var _a;
  return Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.timeline.details.steps), { count: (_a = timeline === null || timeline === void 0 ? void 0 : timeline.stages) === null || _a === void 0 ? void 0 : _a.length });
}
/**
 * If an entity's featured content changes, we log the number of
 * configured featured content items - This gives us a sense of
 * if/how featured content is being used, and if we should increase
 * the limit
 */
function getFeaturedContentTelemetry(featuredContentIds) {
  return Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.featuredContent), { count: featuredContentIds === null || featuredContentIds === void 0 ? void 0 : featuredContentIds.length });
}
/**
 * If an entity's featured image changes, we log its presence.
 * This gives us a sense of if this field is being used
 */
function getFeaturedImageTelemetry(featuredImage) {
  const telemetryDetails = (featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.base64) ? 'complete' : 'empty';
  return dist.dictionary.category.content.action.update.label.image.details[telemetryDetails];
}
/**
 * Note: status is currently project-specific (e.g. not a common
 * IHubEntity property)
 *
 * If an projct's status changes, we log it to get a sense of
 * if this field is being used
 */
function getStatusTelemetry(status) {
  return Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.status), { details: status });
}
/**
 * Note: membership access is only relevant to groups
 *
 * If an group's membership access changes, we log
 * what it changes to
 */
function getMembershipAccessTelemetry(membershipAccess) {
  return Object.assign(Object.assign({}, dist.dictionary.category.groups.action.update.label.membershipAccess), { details: membershipAccess });
}
/**
 * If the isViewOnly property changes on a group, we
 * effectively log who can contribute content to the group
 */
function getContentContributionTelemetry(isViewOnly) {
  return Object.assign({}, dist.dictionary.category.groups.action.update.label.contentContribution.details[isViewOnly ? "managers" : "all"]);
}
/**
 * If the followers tab is toggled on for an entity, we
 * log whether it was enabled or disabled
 */
function getFollowersTabTelemetry(isEnabled) {
  return Object.assign({}, dist.dictionary.category.content.action.update.label.followTab.details[isEnabled ? "on" : "off"]);
}
/**
 * If the followers group access is changed, we
 * log the updated group access level
 */
function getFollowersGroupAccessTelemetry(access) {
  return Object.assign({}, dist.dictionary.category.groups.action.update.label.access.details[access]);
}
function getShareToTelemetry(groups) {
  return Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.groups), { count: groups === null || groups === void 0 ? void 0 : groups.length });
}
function getAccessTelemetry(access) {
  return Object.assign({}, dist.dictionary.category.content.action.update.label.access.details[access]);
}
function getActionLinkTelemetry(heroActions) {
  return Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.callToAction), { count: heroActions === null || heroActions === void 0 ? void 0 : heroActions.length });
}
// TODO: Remove this function once we have a real implementation for the
// force update button, and then add the telemetry for that implementation
function getForceUpdateTelemetry(_forceUpdate) {
  return deepEqual(_forceUpdate, [true])
    ? Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.schedule.details.forceUpdate), { response: "Success" }) : {};
}
function getUpdateScheduleTelemetry(schedule) {
  let telemetry = {};
  if (schedule === null || schedule === void 0 ? void 0 : schedule.mode) {
    telemetry = (schedule.mode === "scheduled")
      ? Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.schedule.details[schedule.cadence]), { response: "Success" }) : Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.schedule.details[schedule.mode]), { response: "Success" });
  }
  return telemetry;
}

const arcgisHubEntityEditorCss = ".sc-arcgis-hub-entity-editor-h{display:block}";

const ArcgisHubEntityEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubEntityEditorChange = createEvent(this, "arcgisHubEntityEditorChange", 7);
    this.arcgisHubEntityEditorSaved = createEvent(this, "arcgisHubEntityEditorSaved", 7);
    this.arcgisHubEntityEditorInitialization = createEvent(this, "arcgisHubEntityEditorInitialization", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.editorContext = undefined;
    this.include = undefined;
    this.editorType = undefined;
    this.layout = "sticky";
    this.footerSlotRef = undefined;
    this.isOpen = undefined;
    this.variant = undefined;
    this.isDisabled = undefined;
    this.messageOverrides = undefined;
    this.scale = undefined;
    this.isLoading = false;
    this.isSaving = false;
    this.schema = undefined;
    this.uiSchema = undefined;
    this.values = undefined;
    bind(this, 'translationFunc', 'handleEntityEditorSave', 'handleEntityEditorChange', 'setConfigurationFormEl', 'handleConfigurationInitialized');
  }
  async componentWillLoad() {
    this.isLoading = true;
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
  * We execute these XHRs in componentDidLoad rather than componentWillLoad
  * so that render isn't blocked. We want the underlying configuration form
  * to render so that the loading state is visible to the consumer while
  * these values load
  */
  async componentDidLoad() {
    this.initializeForm();
  }
  async initializeForm() {
    try {
      // Create the EntityEditor instance
      const entity = this.isCreateForm
        ? this.getDefaultEntity(this.entityType)
        : this.entity;
      this.editor = EntityEditor.fromEntity(entity, this._context);
      const i18nScope = this.entityType;
      const config = await this.editor.getConfig(i18nScope, this.editorType);
      // interpolate translations
      this.schema = interpolateTranslations(this.intl, config.schema);
      this.uiSchema = interpolateTranslations(this.intl, config.uiSchema);
      // get the values from the editor
      const values = await this.editor.toEditor(this.editorContext, this.include);
      // interpolate value translations (if applicable)
      //
      // NOTE: be very careful when adding new entity types to this list. If an entity contains adlib interpolation
      // strings that are _not_ meant to be translated, the interpolation process may fail or cause unexpected results.
      //
      // Ex: Site entities often have "feed templates" attached to them. They configure the output of a site's
      // various feeds (DCAT, RSS, etc.). These feed templates contain adlib interpolation strings that should
      // _never_ be translated.
      const needsTranslatedValues = [
        'content', // download format configuration
      ];
      this.values = needsTranslatedValues.includes(this.entityType)
        ? interpolateTranslations(this.intl, values)
        : values;
      // if we have defaults, merge them with values
      if (config.defaults) {
        const defaults = interpolateTranslations(this.intl, config.defaults);
        // do defaults take precedence over values or vice versa, dependent on if we're creating
        this.values = this.isCreateForm ? mergeDeep(this.values, defaults) : mergeDeep(defaults, this.values);
      }
    }
    catch (error) {
      console.error(`Could not fetch the editor config:`, error);
    }
    finally {
      this.isLoading = false;
    }
  }
  get _messageOverrides() {
    return Object.assign(Object.assign({}, this.messageOverrides), (this.isCreateForm && { save: this.intl.t('create') }));
  }
  /**
   * stops propogation and fires new event to alert initialization
   *
   * @param event - listens for the arcgisConfigurationForm to be initialized
   */
  handleConfigurationInitialized(event) {
    event.stopPropagation();
    this.arcgisHubEntityEditorInitialization.emit(event.detail);
  }
  /**
   * If the entity changes, we need to re-initialize the form and it's fields
   * as a refresh with the latest information.
   */
  async handleEntityChanged() {
    this.initializeForm();
  }
  /**
   * For cases where we are creating a new entity, we need to create
   * the minimum entity object to pass to the editor.
   * @param entityType
   * @returns
   */
  getDefaultEntity(entityType) {
    let entity;
    switch (entityType) {
      case 'project':
        entity = { type: 'Hub Project' };
        break;
      case 'initiative':
        entity = { type: 'Hub Initiative' };
        break;
      case 'content':
        // This just needs to be a type that will resolve to content
        entity = { type: 'Web Map' };
        break;
      case 'page':
        entity = { type: 'Hub Page' };
        break;
      case 'site':
        entity = { type: 'Hub Site Application' };
        break;
      case 'discussion':
        entity = { type: 'Discussion' };
        break;
      case 'event':
        entity = { type: 'Event' };
        break;
      case 'group':
        entity = { type: 'Group' };
        break;
      default:
        // other things should be content
        entity = { type: 'Web Map' };
    }
    const defaults = this.entity || {};
    return Object.assign(Object.assign({}, defaults), entity);
  }
  /**
   * Contextual auth & portal information
   */
  get _context() {
    return getGlobalContext();
  }
  /**
   * Computes the entity type based on the entity (if defined).
   * When undefined (in the case of entity creation), we assume
   * the entity type can be determined from the editorType which
   * has the form "context:type:action", e.g. "hub:project:create"
   */
  get entityType() {
    return this.isCreateForm
      ? this.editorType.split(':')[1]
      : getTypeFromEntity(this.entity);
  }
  /**
   * Computes a contextual label to include in our telemetry
   * payload based on the editorType which has the form
   * "context:type:action:...", e.g. "hub:project:edit"
   */
  get telemetryLabel() {
    let label;
    const action = this.editorType.split(':')[2];
    // a hash for deriving default telemetry labels
    // based on the editor type
    const defaultMap = {
      edit: "Details",
      create: ""
    };
    // a hash for explicitly defining a telemetry label
    // for an editor type - For example:
    // "hub:group:create:followers": "Some custom label"
    const overrideMap = {
      "hub:group:create:followers": "Followers",
      "hub:group:create:association": "Association"
    };
    if (defaultMap.hasOwnProperty(action)) {
      label = defaultMap[action];
    }
    if (overrideMap.hasOwnProperty(this.editorType)) {
      label = overrideMap[this.editorType];
    }
    return isNil(label) ? capitalize(action) : label;
  }
  /**
   * If the entity id is undefined, we assume we're in an entity
   * "creation" experience
   */
  get isCreateForm() {
    return !getProp(this.entity, "id");
  }
  setConfigurationFormEl(el) {
    this.configurationFormEl = el;
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  /**
   * when editor values are saved, we log telemetry to give us insight
   * into the changes our users are making. We compare the original
   * editor values to the updated values and emit individual telemetry
   * events for each meaningful change. See the parseTelemetryEvents
   * util for more details on how we construct these telemetry events.
   *
   * we also log an event to indicate whether the save was a success/failure
   */
  emitSaveTelemetry(opts) {
    var _a, _b, _c, _d;
    let telemetryEvents = [];
    const { isSuccess, entity, originalValues, updatedValues } = opts;
    const category = ["user", "group"].includes(this.entityType)
      ? `${this.entityType}s`
      : "content";
    const action = this.isCreateForm ? 'create' : 'update';
    const createDimensions = entity.type === "Group"
      ? {
        // Note: contentId is not specific to items - it is used to
        // scope telemetry requests
        contentId: `portal:${entity.id}`,
        groupId: entity.id,
        groupType: this.editorType.split('hub:group:create:')[1]
          ? capitalize(this.editorType.split('hub:group:create:')[1])
          : entity.isSharedUpdate ? "Edit" : "View",
        groupAccess: entity.access,
        groupOrgId: (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.id
      }
      : {
        contentId: `portal:${entity.id}`,
        id: entity.id,
        type: entity.type,
        access: entity.access,
        contentOrgId: (_d = (_c = this._context) === null || _c === void 0 ? void 0 : _c.portal) === null || _d === void 0 ? void 0 : _d.id
      };
    if (isSuccess) {
      telemetryEvents = parseTelemetryEvents(originalValues, updatedValues, this.entityType);
      telemetryEvents.push(Object.assign(Object.assign({}, dist.dictionary.category[category].action[action]), (this.telemetryLabel && { label: this.telemetryLabel })));
      telemetryEvents = telemetryEvents.map(event => {
        if (this.isCreateForm) {
          event = mergeDeep(event, createDimensions);
        }
        return Object.assign(Object.assign({}, event), { response: dist.constants.response.SUCCESS });
      });
    }
    else {
      telemetryEvents = [Object.assign(Object.assign({}, dist.dictionary.category[category].action[action]), { response: dist.constants.response.FAILURE })];
    }
    telemetryEvents.forEach(event => this.hubTelemetry.emit(event));
  }
  handleEntityEditorChange(evt) {
    this.arcgisHubEntityEditorChange.emit(evt.detail);
  }
  async handleEntityEditorSave(evt) {
    const values = evt.detail;
    let entity = this.entity;
    try {
      this.isSaving = true;
      // save using the editor instance
      entity = await this.editor.save(cloneObject(values), this.editorContext);
      // render a success alert (calcite-alert in top right)
      this.layout !== 'modal' && showNotice({ title: this.intl.t('success'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this.intl.t('formAlert') } });
      // emit success telemetry and the updated entity to the consuming app
      this.emitSaveTelemetry({
        isSuccess: true,
        originalValues: this.values,
        updatedValues: values,
        entity
      });
      this.arcgisHubEntityEditorSaved.emit({ entity, isSuccess: true });
      // update our state's "values" with the updated editor values
      this.values = values;
    }
    catch (error) {
      console.error('Unable to save entity changes:', error);
      // render an error alert (calcite-alert in top right)
      this.layout !== 'modal' && showNotice({ title: this.intl.t('error'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'danger', label: this.intl.t('formAlert') } });
      // emit error telemetry and the original entity to the consuming app
      // entity needs to be passed in otherwise it errors out and doesn't emit out the saved event
      this.emitSaveTelemetry({ isSuccess: false, entity });
      this.arcgisHubEntityEditorSaved.emit({ entity, isSuccess: false, error });
    }
    finally {
      this.isSaving = false;
    }
  }
  get shouldShowForm() {
    var _a;
    return this.uiSchema
      // Schema has been computed, hide if no elements are present
      ? !!((_a = this.uiSchema.elements) === null || _a === void 0 ? void 0 : _a.length)
      // Schema is still being computed, show for loading state
      : true;
  }
  render() {
    return (h(Host, { "data-element": "entity-editor", unthemed: true }, this.shouldShowForm &&
      h("arcgis-configuration-form", { footerSlotRef: this.footerSlotRef, isCreateForm: this.isCreateForm, isDisabled: this.isDisabled, isLoading: this.isLoading, isOpen: this.isOpen, isSaving: this.isSaving, layout: this.layout, messageOverrides: this._messageOverrides, onArcgisConfigurationFormChanged: this.handleEntityEditorChange, onArcgisConfigurationFormInitialized: this.handleConfigurationInitialized, onArcgisConfigurationFormSaved: this.handleEntityEditorSave, ref: this.setConfigurationFormEl, scale: this.scale, schema: this.schema, t: this.translationFunc, uiSchema: this.uiSchema, values: this.values, variant: this.variant }, h("slot", { name: "header" }), h("slot", { name: "form-start" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["handleEntityChanged"]
  }; }
};
ArcgisHubEntityEditor.style = arcgisHubEntityEditorCss;

export { ArcgisHubEntityEditor as arcgis_hub_entity_editor };
