import { g as getProp } from './get-prop-ec5be510.js';
import { N as getScopeGroupPredicate } from './HubInitiatives-4f4e24ce.js';

// Defines the key for each tab as well as the value
// to be emitted with navigation telemetry
var ContentPaneTabs;
(function (ContentPaneTabs) {
  ContentPaneTabs["CATALOG"] = "Catalog";
  ContentPaneTabs["CATALOG_CONFIG"] = "Catalog Configuration";
  ContentPaneTabs["COLLECTIONS"] = "Collections";
  ContentPaneTabs["FEEDS"] = "Feeds Configuration";
})(ContentPaneTabs || (ContentPaneTabs = {}));

/**
 * Gets the group ids that form the basis of an Entity's item catalog definition
 * @param entity A workspace entity (content, site, initiative, etc.)
 * @returns A list of groupIds
 */
function getEntityCatalogGroupIds(entity) {
  let result = [];
  const itemScope = getProp(entity, 'catalog.scopes.item');
  const groupPredicate = itemScope && getScopeGroupPredicate(itemScope);
  if (groupPredicate) {
    const { group: groupClause } = groupPredicate;
    result = Array.isArray(groupClause) ? groupClause : [groupClause];
  }
  return result;
}

export { ContentPaneTabs as C, getEntityCatalogGroupIds as g };
