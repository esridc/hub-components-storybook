import { getProp, deepEqual } from "@esri/hub-common";
import { getPointCount } from "../../../utils/map";
import { dictionary } from "@esri/telemetry-dictionary-hub";
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
export const parseTelemetryEvents = (originalValues, updatedValues, type) => {
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
export const hasDiff = (originalValue, updatedValue) => {
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
export function getLocationTelemetry(location) {
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
      Object.assign(Object.assign({}, dictionary.category.content.action.update.label.location.details[telemetryDetails.features]), { count: (_c = location.geometries) === null || _c === void 0 ? void 0 : _c.length }),
      Object.assign(Object.assign({}, dictionary.category.content.action.update.label.location.details[telemetryDetails.points]), { count: getPointCount(location) })
    ];
  }
  return telemetry;
}
;
/**
 * If an entity's description changes, we log the description
 * length - this gives us a sense of if the field is being
 * used, and if so, the average description length
 */
export function getDescriptionTelemetry(description) {
  return Object.assign(Object.assign({}, dictionary.category.content.action.update.label.description), { count: description === null || description === void 0 ? void 0 : description.length });
}
;
/**
 * If an entity's summary changes, we log the summary
 * length - this gives us a sense of if the field is being
 * used, and if so, the average summary length
 */
export function getSummaryTelemetry(summary, type) {
  const category = type === "group" ? "groups" : "content";
  return Object.assign(Object.assign({}, dictionary.category[category].action.update.label.summary), { count: summary === null || summary === void 0 ? void 0 : summary.length });
}
/**
 * If an entity's timeline changes, we log the number of
 * configured timeline stages - this gives us a sense of
 * how timelines are being used
 */
export function getTimelineTelemetry(timeline) {
  var _a;
  return Object.assign(Object.assign({}, dictionary.category.content.action.update.label.timeline.details.steps), { count: (_a = timeline === null || timeline === void 0 ? void 0 : timeline.stages) === null || _a === void 0 ? void 0 : _a.length });
}
/**
 * If an entity's featured content changes, we log the number of
 * configured featured content items - This gives us a sense of
 * if/how featured content is being used, and if we should increase
 * the limit
 */
export function getFeaturedContentTelemetry(featuredContentIds) {
  return Object.assign(Object.assign({}, dictionary.category.content.action.update.label.featuredContent), { count: featuredContentIds === null || featuredContentIds === void 0 ? void 0 : featuredContentIds.length });
}
/**
 * If an entity's featured image changes, we log its presence.
 * This gives us a sense of if this field is being used
 */
export function getFeaturedImageTelemetry(featuredImage) {
  const telemetryDetails = (featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.base64) ? 'complete' : 'empty';
  return dictionary.category.content.action.update.label.image.details[telemetryDetails];
}
/**
 * Note: status is currently project-specific (e.g. not a common
 * IHubEntity property)
 *
 * If an projct's status changes, we log it to get a sense of
 * if this field is being used
 */
export function getStatusTelemetry(status) {
  return Object.assign(Object.assign({}, dictionary.category.content.action.update.label.status), { details: status });
}
/**
 * Note: membership access is only relevant to groups
 *
 * If an group's membership access changes, we log
 * what it changes to
 */
export function getMembershipAccessTelemetry(membershipAccess) {
  return Object.assign(Object.assign({}, dictionary.category.groups.action.update.label.membershipAccess), { details: membershipAccess });
}
/**
 * If the isViewOnly property changes on a group, we
 * effectively log who can contribute content to the group
 */
export function getContentContributionTelemetry(isViewOnly) {
  return Object.assign({}, dictionary.category.groups.action.update.label.contentContribution.details[isViewOnly ? "managers" : "all"]);
}
/**
 * If the followers tab is toggled on for an entity, we
 * log whether it was enabled or disabled
 */
export function getFollowersTabTelemetry(isEnabled) {
  return Object.assign({}, dictionary.category.content.action.update.label.followTab.details[isEnabled ? "on" : "off"]);
}
/**
 * If the followers group access is changed, we
 * log the updated group access level
 */
export function getFollowersGroupAccessTelemetry(access) {
  return Object.assign({}, dictionary.category.groups.action.update.label.access.details[access]);
}
export function getShareToTelemetry(groups) {
  return Object.assign(Object.assign({}, dictionary.category.content.action.update.label.groups), { count: groups === null || groups === void 0 ? void 0 : groups.length });
}
;
export function getAccessTelemetry(access) {
  return Object.assign({}, dictionary.category.content.action.update.label.access.details[access]);
}
;
export function getActionLinkTelemetry(heroActions) {
  return Object.assign(Object.assign({}, dictionary.category.content.action.update.label.callToAction), { count: heroActions === null || heroActions === void 0 ? void 0 : heroActions.length });
}
// TODO: Remove this function once we have a real implementation for the
// force update button, and then add the telemetry for that implementation
export function getForceUpdateTelemetry(_forceUpdate) {
  return deepEqual(_forceUpdate, [true])
    ? Object.assign(Object.assign({}, dictionary.category.content.action.update.label.schedule.details.forceUpdate), { response: "Success" }) : {};
}
export function getUpdateScheduleTelemetry(schedule) {
  let telemetry = {};
  if (schedule === null || schedule === void 0 ? void 0 : schedule.mode) {
    telemetry = (schedule.mode === "scheduled")
      ? Object.assign(Object.assign({}, dictionary.category.content.action.update.label.schedule.details[schedule.cadence]), { response: "Success" }) : Object.assign(Object.assign({}, dictionary.category.content.action.update.label.schedule.details[schedule.mode]), { response: "Success" });
  }
  return telemetry;
}
