'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');

// Defines the key for each tab as well as the value
// to be emitted with navigation telemetry
exports.ContentPaneTabs = void 0;
(function (ContentPaneTabs) {
  ContentPaneTabs["CATALOG"] = "Catalog";
  ContentPaneTabs["CATALOG_CONFIG"] = "Catalog Configuration";
  ContentPaneTabs["COLLECTIONS"] = "Collections";
  ContentPaneTabs["FEEDS"] = "Feeds Configuration";
})(exports.ContentPaneTabs || (exports.ContentPaneTabs = {}));

/**
 * Gets the group ids that form the basis of an Entity's item catalog definition
 * @param entity A workspace entity (content, site, initiative, etc.)
 * @returns A list of groupIds
 */
function getEntityCatalogGroupIds(entity) {
  let result = [];
  const itemScope = getProp.getProp(entity, 'catalog.scopes.item');
  const groupPredicate = itemScope && HubInitiatives.getScopeGroupPredicate(itemScope);
  if (groupPredicate) {
    const { group: groupClause } = groupPredicate;
    result = Array.isArray(groupClause) ? groupClause : [groupClause];
  }
  return result;
}

exports.getEntityCatalogGroupIds = getEntityCatalogGroupIds;
