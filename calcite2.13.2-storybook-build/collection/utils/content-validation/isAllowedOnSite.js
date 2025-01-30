import { getItemGroups } from '@esri/arcgis-rest-portal';
import { Catalog, Logger, deepCatalogContains, isOpenDataGroup } from '@esri/hub-common';
// Once getEventGroups is exported, we can import it here and remove the throw below
import { getEventGroups } from '@esri/hub-common';
import { getEntityTypeFromHubEntityType } from '../type-converters';
/**
 * @internal
 * Fetch the groups that an item or event is shared with
 * @param itemId
 * @param entityType
 * @param context
 * @returns
 */
async function sharedWith(itemId, entityType, context) {
  let groups = [];
  if (entityType === 'event') {
    groups = await getEventGroups(itemId, context);
  }
  else {
    const response = await getItemGroups(itemId, context.requestOptions);
    // simplify the response to a single array
    groups = [...response.admin, ...response.member, ...response.other];
  }
  return groups;
}
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
export const isAllowedOnSite = async (entityId, hubEntityType, site, opts) => {
  // If this is umbrella, we only allow entities that are in an Open Data group...
  // get the EntityType from the HubEntityType
  const entityType = getEntityTypeFromHubEntityType(hubEntityType);
  if (site.isUmbrella) {
    // We only show items on Umbrella
    if (['item', 'event'].includes(entityType)) {
      try {
        // for umbrella we only allow entities that are in an Open Data group
        const groups = await sharedWith(entityId, entityType, opts.context);
        return groups.some(isOpenDataGroup);
      }
      catch (e) {
        // if we can't fetch groups, do not allow
        Logger.warn(e);
        return false;
      }
    }
    else {
      return false;
    }
  }
  else {
    const path = opts.path || ''; // ensure it's not null/undefined
    if (path) {
      const resp = await deepCatalogContains(entityId, hubEntityType, path, opts.context, site.catalog);
      return resp.isContained;
    }
    else {
      // No path, so we can just check the site catalog
      // Create a Catalog from the site
      const catalog = Catalog.fromJson(site.catalog, opts.context);
      // check if the entity is in the catalog
      return (await catalog.contains(entityId, { entityType })).isContained;
    }
    // When implementing https://devtopia.esri.com/dc/hub/issues/11176 this is where we will handle
    // the opts.path, and transitive containment.
  }
};
