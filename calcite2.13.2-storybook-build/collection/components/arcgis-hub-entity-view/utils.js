import { checkPermission, getAssociatedEntitiesQuery, getTypeFromEntity, hubSearch } from "@esri/hub-common";
import { getTypeSpecificViewConfigs } from "./config";
import { WELL_KNOWN_FACET_TYPES } from "../arcgis-hub-gallery/utils/facets";
/**
 * Get a list of the views that should be displayed for a given entity
 * @param entity
 * @param context
 * @returns
 */
export async function getViews(entity, context, options) {
  // Note: When we allow for customizable views, this function will pull that information from the entity
  // from the entity and return the appropriate information.
  const views = [];
  // add the catalog view
  const catalog = entity.catalog;
  // If there is a catalog, and it is not empty, add the catalog view
  if (!!catalog && !isCatalogEmpty(catalog)) {
    views.push({
      name: "content",
      i18nLabel: 'tabs.content',
      component: 'arcgis-hub-catalog',
      props: {
        catalogs: [catalog],
        facets: [...WELL_KNOWN_FACET_TYPES],
        layout: 'grid',
        layoutOptions: ['grid', 'list', 'table', 'map', 'compact'],
        showAddContent: true,
        showLayoutSwitcher: true,
        showSearch: true,
        showThumbnail: true,
        path: options.path,
        linkTarget: 'siteRelative',
      }
    });
  }
  const typeSpecificViews = (await getTypeSpecificViews(entity, context)).map((def) => {
    return {
      name: def.name,
      icon: def.icon,
      i18nLabel: def.i18nLabel,
      component: def.component
    };
  });
  // add the type specific views
  return [...views, ...typeSpecificViews];
}
/**
 * Get the type specific views for a given entity
 * @param entity
 * @param context
 * @returns
 */
async function getTypeSpecificViews(entity, context) {
  const entityType = getTypeFromEntity(entity);
  const typeSpecificViewConfigs = await getTypeSpecificViewConfigs(entity, context);
  return typeSpecificViewConfigs
    .filter((def) => def.entities.includes(entityType))
    .filter(def => {
    return def.isVisible
      ? def.isVisible.every(condition => {
        if (typeof condition === "boolean") {
          return condition;
        }
        return checkPermission(condition, context, entity).access;
      })
      : true;
  });
}
/**
 * Check if a catalog is empty
 * @param catalog
 * @returns
 */
export function isCatalogEmpty(catalog) {
  var _a;
  const hasCollections = ((_a = catalog === null || catalog === void 0 ? void 0 : catalog.collections) === null || _a === void 0 ? void 0 : _a.length) > 0;
  const hasScope = Object.values((catalog === null || catalog === void 0 ? void 0 : catalog.scopes) || {}).some((scope) => {
    var _a;
    return ((_a = scope === null || scope === void 0 ? void 0 : scope.filters) === null || _a === void 0 ? void 0 : _a.length) > 0;
  });
  return !(hasCollections || hasScope);
}
// fetch the counts for the associated initiatives, projects, and content
export const fetchAssociatedEntitiesCount = async (entity, associationType, context) => {
  var _a, _b, _c, _d;
  let result = null;
  try {
    if (['initiatives', 'projects'].includes(associationType)) {
      // 1. build the query to fetch the entity's associated entities
      const query = await getAssociatedEntitiesQuery(entity, associationType.replace(/s$/, ''), context);
      // 2. fetch the entity's associated entities to get the total count to display on the tab
      if (query) {
        const searchOptions = { requestOptions: context.hubRequestOptions };
        const { total } = await hubSearch(query, searchOptions);
        result = total;
      }
    }
    else if (associationType === 'content') {
      // fetch the entity's configured catalog to get the total count to display on the tab
      const catalog = entity.catalog;
      if ((_a = catalog === null || catalog === void 0 ? void 0 : catalog.scopes) === null || _a === void 0 ? void 0 : _a.item) {
        result = await hubSearch(catalog.scopes.item, { requestOptions: context.hubRequestOptions }).then(({ total }) => total);
      }
    }
    else if (associationType === 'metrics' && !!((_b = entity.view) === null || _b === void 0 ? void 0 : _b.metricDisplays)) {
      // metrics we can pull from the entity view and filter out hidden ones
      result = ((_d = (_c = entity.view.metricDisplays) === null || _c === void 0 ? void 0 : _c.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== 'hidden')) === null || _d === void 0 ? void 0 : _d.length) || null;
    }
  }
  catch (error) {
    // swallow it
  }
  return result;
};
