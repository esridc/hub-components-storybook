'use strict';

/**
 * Create Facets from Aggregations
 *
 * @param aggregations
 * @param operation
 * @returns
 */
function createFacetsFromAggregations(aggregations, operation = 'OR') {
  // TODO: move into portalSearchItems
  const result = [];
  if (aggregations.length) {
    aggregations.forEach(entry => {
      // create a facet for each IHubAggregation entry
      const facet = {
        label: entry.field,
        key: entry.field,
        field: entry.field,
        display: 'multi-select',
      };
      // Create options for each value
      const options = [];
      // Some organizations have bypassed AGO and created empty string values 
      // that show up in aggregations (i.e., tags: ['']). As this is invalid,
      // remove those empty string values here
      const filterValues = entry.values.filter(fv => !!fv.value);
      filterValues.forEach(fv => {
        const predicate = {};
        // construct the filter based on the operation
        const matchKey = operation === 'OR' ? 'any' : 'all';
        const filterMatchOption = {};
        filterMatchOption[matchKey] = [fv.value];
        predicate[entry.field] = filterMatchOption;
        // construct the FacetOption
        const fo = {
          label: fv.value,
          key: fv.value,
          count: fv.count,
          selected: false,
          predicates: [predicate],
        };
        options.push(fo);
      });
      facet.options = options;
      result.push(facet);
    });
  }
  return result;
}

/**
 * Convert a HubEntityType to an EntityType
 * Exists in hub-common as an internal function
 * @param type
 * @returns
 */
function getEntityTypeFromHubEntityType(type) {
  // Default to item, as it's the most common
  let etype = "item";
  // Some are just downcased, so we can check them with an array
  if (["group", "event", "user", "channel"].includes(type.toLowerCase())) {
    etype = type.toLocaleLowerCase();
  }
  // Group Member is just weird
  if (type.toLowerCase() === "group member") {
    etype = "groupMember";
  }
  return etype;
}
/**
 * Convert a type (e.g 'Event', 'Hub Site Application') to a
 * HubEntityType (e.g. 'event', 'site')
 * @param type
 * @returns
 */
function getHubEntityTypeFromType(type) {
  let et = "content";
  switch (type) {
    case 'Event':
      et = 'event';
      break;
    case 'Discussion':
      et = 'discussion';
      break;
    case 'Group':
      et = 'group';
      break;
    case 'Hub Initiative':
      et = 'initiative';
      break;
    case 'Hub Project':
      et = 'project';
      break;
    case 'Hub Page':
      et = 'page';
      break;
    case 'Site Page':
      et = 'page';
      break;
    case 'Hub Site Application':
      et = 'site';
      break;
    case 'Site Application':
      et = 'site';
      break;
  }
  return et;
}

exports.createFacetsFromAggregations = createFacetsFromAggregations;
exports.getEntityTypeFromHubEntityType = getEntityTypeFromHubEntityType;
exports.getHubEntityTypeFromType = getHubEntityTypeFromType;
