import { EntityType, HubCapability, HubEntity, HubEntityType } from "@esri/hub-common";
/**
 * DEPRECATED
 * Given an entity and a capability, return the array of groups used in the capabilitie's catalog
 * If the capability is not defined, an empty array is returned.
 * If the capability is defined,  but not enabled, an empty array is returned.
 * @param entity
 * @param capability
 */
export declare function getEntityCapabilityGroups(entity: HubEntity, capability: HubCapability): string[];
/**
 * DEPRECATED
 * Given a capability, return the entity type used for the queries in the Catalog
 * @param capability
 * @returns
 */
export declare function getEntityTypeForCapability(capability: HubCapability): EntityType;
export declare function getHubEntityTypeForCapability(capability: HubCapability): HubEntityType;
