import { getProp, getScopeGroupPredicate } from "@esri/hub-common";
/**
 * Gets the group ids that form the basis of an Entity's item catalog definition
 * @param entity A workspace entity (content, site, initiative, etc.)
 * @returns A list of groupIds
 */
export function getEntityCatalogGroupIds(entity) {
  let result = [];
  const itemScope = getProp(entity, 'catalog.scopes.item');
  const groupPredicate = itemScope && getScopeGroupPredicate(itemScope);
  if (groupPredicate) {
    const { group: groupClause } = groupPredicate;
    result = Array.isArray(groupClause) ? groupClause : [groupClause];
  }
  return result;
}
