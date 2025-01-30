import { HubEntityType, IHubLocation, IHubTimeline, HubActionLink, IHubSchedule } from "@esri/hub-common";
import { HubEntityEditor } from "../types";
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
export declare const parseTelemetryEvents: (originalValues: HubEntityEditor, updatedValues: HubEntityEditor, type: HubEntityType) => any[];
/**
 * This function determines if there's a diff between two values.
 * We stringify the values before comparison in order to compare
 * values of type "object". This may be a naive deep comparison
 * approach but we'll move forward with this as a first pass
 */
export declare const hasDiff: (originalValue: any, updatedValue: any) => boolean;
/**
 * If an entity's custom location changes, we emit telemetry events with:
 * 1. the geometry type (polygon, line, point)
 * 2. the total number of points/features persisted - for storage,
 * purposes the location picker has a default max # of points set to
 * 60 and a max # of features set to 10. We want to keep track of how
 * many points/features users are actually drawing so we can adjust
 * these limits accordingly
 */
export declare function getLocationTelemetry(location: IHubLocation): Record<string, any>;
/**
 * If an entity's description changes, we log the description
 * length - this gives us a sense of if the field is being
 * used, and if so, the average description length
 */
export declare function getDescriptionTelemetry(description: string): Record<string, any>;
/**
 * If an entity's summary changes, we log the summary
 * length - this gives us a sense of if the field is being
 * used, and if so, the average summary length
 */
export declare function getSummaryTelemetry(summary: string, type: HubEntityType): Record<string, any>;
/**
 * If an entity's timeline changes, we log the number of
 * configured timeline stages - this gives us a sense of
 * how timelines are being used
 */
export declare function getTimelineTelemetry(timeline: IHubTimeline): Record<string, any>;
/**
 * If an entity's featured content changes, we log the number of
 * configured featured content items - This gives us a sense of
 * if/how featured content is being used, and if we should increase
 * the limit
 */
export declare function getFeaturedContentTelemetry(featuredContentIds: string[]): Record<string, any>;
/**
 * If an entity's featured image changes, we log its presence.
 * This gives us a sense of if this field is being used
 */
export declare function getFeaturedImageTelemetry(featuredImage: any): Record<string, any>;
/**
 * Note: status is currently project-specific (e.g. not a common
 * IHubEntity property)
 *
 * If an projct's status changes, we log it to get a sense of
 * if this field is being used
 */
export declare function getStatusTelemetry(status: string): Record<string, any>;
/**
 * Note: membership access is only relevant to groups
 *
 * If an group's membership access changes, we log
 * what it changes to
 */
export declare function getMembershipAccessTelemetry(membershipAccess: string): Record<string, any>;
/**
 * If the isViewOnly property changes on a group, we
 * effectively log who can contribute content to the group
 */
export declare function getContentContributionTelemetry(isViewOnly: boolean): Record<string, any>;
/**
 * If the followers tab is toggled on for an entity, we
 * log whether it was enabled or disabled
 */
export declare function getFollowersTabTelemetry(isEnabled: boolean): Record<string, any>;
/**
 * If the followers group access is changed, we
 * log the updated group access level
 */
export declare function getFollowersGroupAccessTelemetry(access: string): Record<string, any>;
export declare function getShareToTelemetry(groups: string): Record<string, any>;
export declare function getAccessTelemetry(access: string): Record<string, any>;
export declare function getActionLinkTelemetry(heroActions: HubActionLink[]): Record<string, any>;
export declare function getForceUpdateTelemetry(_forceUpdate: Array<any>): Record<string, any>;
export declare function getUpdateScheduleTelemetry(schedule: IHubSchedule): Record<string, any>;
