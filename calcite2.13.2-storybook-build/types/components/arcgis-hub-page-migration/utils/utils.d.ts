import { IArcGISContext, IHubCatalog } from "@esri/hub-common";
/**
 * Get the configuration for a gallery of groups the user can choose to share to
 * @param context
 * @param options
 * @returns
 */
export declare function getGroupsGalleryConfig(context: IArcGISContext, catalog: IHubCatalog, options: Record<string, any>): Record<string, any>;
