import { HubEntity, HubEntityType, IArcGISContext, IHubSite } from "@esri/hub-common";
export declare type Workflow = 'existing' | 'create' | 'upload';
/**
 * Get the configuration for a gallery of "existing" content
 * @param _
 * @param options
 * @returns
 */
export declare function getContentGalleryConfig(_: IArcGISContext, options?: Record<string, any>): Record<string, any>;
/**
 * Get the configuration for a gallery of groups the user can choose to share to
 * @param context
 * @param options
 * @returns
 */
export declare function getGroupsGalleryConfig(context: IArcGISContext, options: Record<string, any>): Record<string, any>;
export declare function getIcon(entityType: HubEntityType): string;
interface IDefaultEntityValuesOptions {
  entity: HubEntity;
  site: IHubSite;
}
export declare function getDefaultEntityValues(entityType: HubEntityType, configurationValues: any, options: IDefaultEntityValuesOptions): Record<string, any>;
export {};
