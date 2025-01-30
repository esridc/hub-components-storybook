import { EntityType, HubCapability, HubEntity, IArcGISContext, IContentConfig, IHubCatalog } from "@esri/hub-common";
export interface IConfigOptions {
  capability: HubCapability;
  mode: 'editGroups' | 'contentCatalog';
  entity?: HubEntity;
}
export declare function getDefaultCapabilityConfig(options: IConfigOptions, context: IArcGISContext): Promise<IContentConfig>;
export declare function getDefaultCapabilityCatalog(options: IConfigOptions, context: IArcGISContext): Promise<IHubCatalog>;
/**
 * Given a capability, return the entity type used for the queries in the Catalog
 * @param capability
 * @returns
 */
export declare function getEntityTypeForCapability(capability: HubCapability): EntityType;
