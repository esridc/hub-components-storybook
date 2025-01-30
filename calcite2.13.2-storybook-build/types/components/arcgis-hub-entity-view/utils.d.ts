import { HubEntity, IArcGISContext, IHubCatalog } from "@esri/hub-common";
import { IViewDefinition } from "./types";
/**
 * Get a list of the views that should be displayed for a given entity
 * @param entity
 * @param context
 * @returns
 */
export declare function getViews(entity: HubEntity, context: IArcGISContext, options: any): Promise<IViewDefinition[]>;
/**
 * Check if a catalog is empty
 * @param catalog
 * @returns
 */
export declare function isCatalogEmpty(catalog: IHubCatalog): boolean;
export declare const fetchAssociatedEntitiesCount: (entity: HubEntity, associationType: string, context: IArcGISContext) => Promise<number>;
