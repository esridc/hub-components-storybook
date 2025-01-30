import { EntityType, HubEntityType } from "@esri/hub-common";
/**
 * Convert a HubEntityType to an EntityType
 * Exists in hub-common as an internal function
 * @param type
 * @returns
 */
export declare function getEntityTypeFromHubEntityType(type: HubEntityType): EntityType;
/**
 * Convert a type (e.g 'Event', 'Hub Site Application') to a
 * HubEntityType (e.g. 'event', 'site')
 * @param type
 * @returns
 */
export declare function getHubEntityTypeFromType(type: string): HubEntityType;
