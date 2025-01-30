import { HubEntityType, IArcGISContext, IHubSite } from '@esri/hub-common';
/**
 * Determine if an entity can be rendered in the context of a specific site.
 * In time, this will handle transitive inclusion, but for now it's a simple check against
 * the site's catalog.
 * @param entityId Identifier of the entity to check. This can not be a slug.
 * @param entityType The type of entity to check. e.g. "item", "group", "event"
 * @param site IHubSite object to check against
 * @param opts additional options.
 * @returns
 */
export declare const isAllowedOnSite: (entityId: string, hubEntityType: HubEntityType, site: IHubSite, opts: {
  context: IArcGISContext;
  path?: string;
}) => Promise<boolean>;
