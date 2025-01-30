'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
const isNil = require('./is-nil-e28a2884.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
const index = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const index$2 = require('./index-f4a4c954.js');
const map = require('./map-610ee1fc.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getFormJson = require('./get-form-json-e6831b20.js');
const EntityEditor = require('./EntityEditor-624b007b.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const util = require('./util-38e73510.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getEditorSlug-eeb95a05.js');
require('./unshare-item-from-groups-3f34f54a.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./share-item-with-group-6c27286f.js');
require('./update-user-membership-4af88c1c.js');
require('./share-item-to-groups-6bc2a4bc.js');
require('./poll-7962a495.js');
require('./search-b00c4c79.js');
require('./sharedWith-ca14e4af.js');
require('./checkPermission-11ab5992.js');
require('./enrichEntity-1632b924.js');
require('./access-049994c9.js');
require('./getEditorConfig-1d006950.js');
require('./edit-3df37e35.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./utils-5a74b66e.js');
require('./fetchHubEntity-88467d55.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./HubGroup-77577f1f.js');
require('./Catalog-acebae88.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./logger-5db3d659.js');
require('./encoding-211adb23.js');
require('./index-058372c1.js');
require('./getEntityMetrics-b6d0cdfa.js');
require('./resolveMetric-47df0783.js');
require('./getCardModelUrl-df1328a2.js');
require('./HubPage-0395747a.js');
require('./HubSite-fab90409.js');
require('./deepContains-7989f3f1.js');
require('./parseContainmentPath-aaf496c0.js');
require('./updateVersionMetadata-3ded56b8.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./unshareEventWithGroups-609ca09c.js');
require('./getEventGroups-6c371c3e.js');

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
    const originalValue = getProp.getProp(originalValues, property);
    const updatedValue = getProp.getProp(updatedValues, property);
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
      Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.location.details[telemetryDetails.features]), { count: (_c = location.geometries) === null || _c === void 0 ? void 0 : _c.length }),
      Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.location.details[telemetryDetails.points]), { count: map.getPointCount(location) })
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
  return Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.description), { count: description === null || description === void 0 ? void 0 : description.length });
}
/**
 * If an entity's summary changes, we log the summary
 * length - this gives us a sense of if the field is being
 * used, and if so, the average summary length
 */
function getSummaryTelemetry(summary, type) {
  const category = type === "group" ? "groups" : "content";
  return Object.assign(Object.assign({}, index.dist.dictionary.category[category].action.update.label.summary), { count: summary === null || summary === void 0 ? void 0 : summary.length });
}
/**
 * If an entity's timeline changes, we log the number of
 * configured timeline stages - this gives us a sense of
 * how timelines are being used
 */
function getTimelineTelemetry(timeline) {
  var _a;
  return Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.timeline.details.steps), { count: (_a = timeline === null || timeline === void 0 ? void 0 : timeline.stages) === null || _a === void 0 ? void 0 : _a.length });
}
/**
 * If an entity's featured content changes, we log the number of
 * configured featured content items - This gives us a sense of
 * if/how featured content is being used, and if we should increase
 * the limit
 */
function getFeaturedContentTelemetry(featuredContentIds) {
  return Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.featuredContent), { count: featuredContentIds === null || featuredContentIds === void 0 ? void 0 : featuredContentIds.length });
}
/**
 * If an entity's featured image changes, we log its presence.
 * This gives us a sense of if this field is being used
 */
function getFeaturedImageTelemetry(featuredImage) {
  const telemetryDetails = (featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.base64) ? 'complete' : 'empty';
  return index.dist.dictionary.category.content.action.update.label.image.details[telemetryDetails];
}
/**
 * Note: status is currently project-specific (e.g. not a common
 * IHubEntity property)
 *
 * If an projct's status changes, we log it to get a sense of
 * if this field is being used
 */
function getStatusTelemetry(status) {
  return Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.status), { details: status });
}
/**
 * Note: membership access is only relevant to groups
 *
 * If an group's membership access changes, we log
 * what it changes to
 */
function getMembershipAccessTelemetry(membershipAccess) {
  return Object.assign(Object.assign({}, index.dist.dictionary.category.groups.action.update.label.membershipAccess), { details: membershipAccess });
}
/**
 * If the isViewOnly property changes on a group, we
 * effectively log who can contribute content to the group
 */
function getContentContributionTelemetry(isViewOnly) {
  return Object.assign({}, index.dist.dictionary.category.groups.action.update.label.contentContribution.details[isViewOnly ? "managers" : "all"]);
}
/**
 * If the followers tab is toggled on for an entity, we
 * log whether it was enabled or disabled
 */
function getFollowersTabTelemetry(isEnabled) {
  return Object.assign({}, index.dist.dictionary.category.content.action.update.label.followTab.details[isEnabled ? "on" : "off"]);
}
/**
 * If the followers group access is changed, we
 * log the updated group access level
 */
function getFollowersGroupAccessTelemetry(access) {
  return Object.assign({}, index.dist.dictionary.category.groups.action.update.label.access.details[access]);
}
function getShareToTelemetry(groups) {
  return Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.groups), { count: groups === null || groups === void 0 ? void 0 : groups.length });
}
function getAccessTelemetry(access) {
  return Object.assign({}, index.dist.dictionary.category.content.action.update.label.access.details[access]);
}
function getActionLinkTelemetry(heroActions) {
  return Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.callToAction), { count: heroActions === null || heroActions === void 0 ? void 0 : heroActions.length });
}
// TODO: Remove this function once we have a real implementation for the
// force update button, and then add the telemetry for that implementation
function getForceUpdateTelemetry(_forceUpdate) {
  return getFormJson.deepEqual(_forceUpdate, [true])
    ? Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.schedule.details.forceUpdate), { response: "Success" }) : {};
}
function getUpdateScheduleTelemetry(schedule) {
  let telemetry = {};
  if (schedule === null || schedule === void 0 ? void 0 : schedule.mode) {
    telemetry = (schedule.mode === "scheduled")
      ? Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.schedule.details[schedule.cadence]), { response: "Success" }) : Object.assign(Object.assign({}, index.dist.dictionary.category.content.action.update.label.schedule.details[schedule.mode]), { response: "Success" });
  }
  return telemetry;
}

const arcgisHubEntityEditorCss = ".sc-arcgis-hub-entity-editor-h{display:block}";

const ArcgisHubEntityEditor = class {
  constructor(hostRef) {
    index$1.registerInstance(this, hostRef);
    this.arcgisHubEntityEditorChange = index$1.createEvent(this, "arcgisHubEntityEditorChange", 7);
    this.arcgisHubEntityEditorSaved = index$1.createEvent(this, "arcgisHubEntityEditorSaved", 7);
    this.arcgisHubEntityEditorInitialization = index$1.createEvent(this, "arcgisHubEntityEditorInitialization", 7);
    this.hubTelemetry = index$1.createEvent(this, "hubTelemetry", 7);
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
    context.bind(this, 'translationFunc', 'handleEntityEditorSave', 'handleEntityEditorChange', 'setConfigurationFormEl', 'handleConfigurationInitialized');
  }
  async componentWillLoad() {
    this.isLoading = true;
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      this.editor = EntityEditor.EntityEditor.fromEntity(entity, this._context);
      const i18nScope = this.entityType;
      const config = await this.editor.getConfig(i18nScope, this.editorType);
      // interpolate translations
      this.schema = interpolateTranslations.interpolateTranslations(this.intl, config.schema);
      this.uiSchema = interpolateTranslations.interpolateTranslations(this.intl, config.uiSchema);
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
        ? interpolateTranslations.interpolateTranslations(this.intl, values)
        : values;
      // if we have defaults, merge them with values
      if (config.defaults) {
        const defaults = interpolateTranslations.interpolateTranslations(this.intl, config.defaults);
        // do defaults take precedence over values or vice versa, dependent on if we're creating
        this.values = this.isCreateForm ? index$2.mergeDeep(this.values, defaults) : index$2.mergeDeep(defaults, this.values);
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
    return state.getGlobalContext();
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
      : getTypeFromEntity.getTypeFromEntity(this.entity);
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
    return isNil.isNil(label) ? util.capitalize(action) : label;
  }
  /**
   * If the entity id is undefined, we assume we're in an entity
   * "creation" experience
   */
  get isCreateForm() {
    return !getProp.getProp(this.entity, "id");
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
          ? util.capitalize(this.editorType.split('hub:group:create:')[1])
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
      telemetryEvents.push(Object.assign(Object.assign({}, index.dist.dictionary.category[category].action[action]), (this.telemetryLabel && { label: this.telemetryLabel })));
      telemetryEvents = telemetryEvents.map(event => {
        if (this.isCreateForm) {
          event = index$2.mergeDeep(event, createDimensions);
        }
        return Object.assign(Object.assign({}, event), { response: index.dist.constants.response.SUCCESS });
      });
    }
    else {
      telemetryEvents = [Object.assign(Object.assign({}, index.dist.dictionary.category[category].action[action]), { response: index.dist.constants.response.FAILURE })];
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
      entity = await this.editor.save(util.cloneObject(values), this.editorContext);
      // render a success alert (calcite-alert in top right)
      this.layout !== 'modal' && state.showNotice({ title: this.intl.t('success'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this.intl.t('formAlert') } });
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
      this.layout !== 'modal' && state.showNotice({ title: this.intl.t('error'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'danger', label: this.intl.t('formAlert') } });
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
    return (index$1.h(index$1.Host, { "data-element": "entity-editor", unthemed: true }, this.shouldShowForm &&
      index$1.h("arcgis-configuration-form", { footerSlotRef: this.footerSlotRef, isCreateForm: this.isCreateForm, isDisabled: this.isDisabled, isLoading: this.isLoading, isOpen: this.isOpen, isSaving: this.isSaving, layout: this.layout, messageOverrides: this._messageOverrides, onArcgisConfigurationFormChanged: this.handleEntityEditorChange, onArcgisConfigurationFormInitialized: this.handleConfigurationInitialized, onArcgisConfigurationFormSaved: this.handleEntityEditorSave, ref: this.setConfigurationFormEl, scale: this.scale, schema: this.schema, t: this.translationFunc, uiSchema: this.uiSchema, values: this.values, variant: this.variant }, index$1.h("slot", { name: "header" }), index$1.h("slot", { name: "form-start" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index$1.getElement(this); }
  static get watchers() { return {
    "entity": ["handleEntityChanged"]
  }; }
};
ArcgisHubEntityEditor.style = arcgisHubEntityEditorCss;

exports.arcgis_hub_entity_editor = ArcgisHubEntityEditor;
