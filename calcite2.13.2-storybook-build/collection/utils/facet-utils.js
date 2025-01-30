/**
 * Create Facets from Aggregations
 *
 * @param aggregations
 * @param operation
 * @returns
 */
export function createFacetsFromAggregations(aggregations, operation = 'OR') {
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
