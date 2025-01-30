import { a as cloneObject } from './util-3e6872d9.js';
import { a as bboxToString } from './extent-34a4ba2a.js';
import { t as titleize } from './titleize-fd193332.js';

/**
 * Add a path to the siteRelative links in the search results
 * @param path
 * @param response
 * @returns
 */
function addPathToResults(path, results) {
  if (path) {
    results = results.map((result) => {
      // Update the siteRelative link to include the path
      // add a path prop to links so downstream functions can use it
      result.links.siteRelative = `${result.links.siteRelative}?path=${path}`;
      result.links.path = path;
      return result;
    });
  }
  return results;
}
/**
 * Searches an array of IFacets and creates a new array of only IListFacets
 *
 * @param facets array of facets to search
 * @returns all list facets within the array
 */
function getListFacets(facets = []) {
  const listFacets = facets.filter(isListFacet);
  return listFacets;
}
/**
 * Returns whether or not a facet is of subtype IListFacet
 * @param facet
 */
function isListFacet(facet) {
  return facet.display === 'multi-select' || facet.display === 'single-select';
}
/**
 * Searches an array of IFacets and creates a new array of only IDateRangeFacets
 *
 * @param facets array of facets to search
 * @returns all date-range facets within the array
 */
function getDateRangeFacets(facets = []) {
  const dateRangeFacets = facets.filter(isDateRangeFacet);
  return dateRangeFacets;
}
/**
 * Returns whether or not a facet is of subtype IDateRangeFacet
 * @param facet
 */
function isDateRangeFacet(facet) {
  return facet.display === 'date-range';
}
/**
 * Searches an array of IFacets and creates a new array of only ITreeFacets
 *
 * @param facets array of facets to search
 * @returns all date-range facets within the array
 */
function getTreeFacets(facets = []) {
  const treeFacets = facets.filter(isTreeFacet);
  return treeFacets;
}
/**
 * Returns whether or not a facet is of subtype ITreeFacet
 * @param facet
 */
function isTreeFacet(facet) {
  return facet.display === 'tree';
}
/**
 * Searches an array of IFacets and creates a new array of only IOptionsBasedFacets
 * (i.e, single-select, multi-select, tree, etc.)
 *
 * @param facets array of facets to search
 * @returns all options-based facets within the array
 */
function getOptionsBasedFacets(facets = []) {
  const optionsBasedFacets = facets.filter(isOptionsBasedFacet);
  return optionsBasedFacets;
}
/**
 * Returns whether or not a facet is of subtype IOptionsBasedFacet
 * (i.e, single-select, multi-select, tree, etc.)
 *
 * @param facet
 */
function isOptionsBasedFacet(facet) {
  return isListFacet(facet) || isTreeFacet(facet);
}
/**
 * Searches an array of IFacets and creates a new array of only IMapFacets
 *
 * @param facets array of facets to search
 * @returns all map facets within the array
 */
function getMapFacets(facets = []) {
  const mapFacets = facets.filter(isMapFacet);
  return mapFacets;
}
/**
 * Filters facets based on the provided layout type.
 *
 * @param {IFacet[]} facets - An array of facets to be filtered.
 * @param {string} layout - The layout type.
 * @returns {IFacet[]} An array of filtered facets.
 */
function filterFacetsBasedOnLayout(facets, layout) {
  return layout === 'map' ? facets.filter(facet => !isMapFacet(facet)) : facets;
}
/**
 * Returns whether or not a facet is of subtype IMapFacet
 * @param facet
 */
function isMapFacet(facet) {
  return facet.display === 'map';
}
/**
 * Returns whether or not the facets array has any map facets
 * @param facets
 * @returns Whteher or not the provided array of facets contains a map facet
 */
function hasMapFacets(facets) {
  return Boolean(getMapFacets(facets).length);
}
/**
 * Determines whether a user-provided state object would nominally affect
 * the current gallery state if applied
 *
 * @param currentState serialized representation of the current gallery state
 * @param userInput serialized representation of the _intended_ gallery state
 * @returns Whether applying the user input would change the current state
 */
function willStateChange(currentState, userInput) {
  return Object.keys(userInput).some(key => 
  // The gallery's internal state object does not have null entries, but
  // a user-provided state object may. If the user-provided object has
  // a null entry, use != so null and undefined are considered equal
  userInput[key] === null
    ? userInput[key] != currentState[key]
    : userInput[key] !== currentState[key]);
}
/**
 * Apply a serialized gallery state to the current IGalleryState
 *
 * Typically used in a Gallery or Catalog component to
 * set the inital state, based on values deserialized
 * from a query string
 * @param state
 * @param serializedState
 * @returns
 */
function applyGalleryState(state, serializedState) {
  const updated = cloneObject(state);
  // Apply default query
  if (serializedState.term) {
    updated.term = serializedState.term;
  }
  else if (serializedState.term === null) {
    // Null indicates the absence of a query.
    // Set to empty string for easier management.
    updated.term = '';
  }
  // Apply Sort State
  updated.sort = applySortState(updated.sort, serializedState.sort);
  // Look for state props for the facets and apply them
  updated.facets = updated.facets.map(facet => {
    // see if there is a value for this facet on the state
    if (serializedState[facet.key]) {
      const facetState = {};
      facetState[facet.key] = serializedState[facet.key];
      return applyFacetState(facet, facetState);
    }
    else {
      // Ensure all options are not selected because
      // no value for the facet was included in the state
      return resetFacet(facet);
    }
  });
  updated.layout = serializedState.layout || updated.layout;
  return updated;
}
/**
 * Resets a facet to its default (valueless) state
 * @param facet facet to reset
 * @returns a resetted copy of the facet
 */
function resetFacet(facet) {
  let resetted = cloneObject(facet);
  switch (facet.display) {
    case 'single-select':
    case 'multi-select':
    case 'tree':
      resetted = resetOptionsBasedFacet(facet);
      break;
    case 'date-range':
      resetted = resetDateRangeFacet(facet);
      break;
    case 'map':
      resetted = resetMapFacet(facet);
      break;
  }
  return resetted;
}
/**
 * unchecks all the options of a options-based facet
 * @param facet list facet to reset
 * @returns a resetted copy of the facet
 */
function resetOptionsBasedFacet(facet) {
  const resetted = cloneObject(facet);
  resetted.options.forEach(opt => {
    opt.selected = false;
  });
  if (resetted.display === 'single-select' && resetted.options.length) {
    resetted.options[0].selected = true;
  }
  return resetted;
}
/**
 * clears the date values of a date-range facet
 * @param facet date-range facet to reset
 * @returns a resetted copy of the facet
 */
function resetDateRangeFacet(facet) {
  const resetted = cloneObject(facet);
  resetted.value = { from: null, to: null };
  return resetted;
}
/**
 * clears the geometry of a map facet
 * @param facet map facet to reset
 * @returns a resetted copy of the facet
 */
function resetMapFacet(facet) {
  const resetted = cloneObject(facet);
  resetted.value = null;
  return resetted;
}
/**
 * Serialize the current state of the gallery into a hash that
 * can be converted into a query string
 * @param state
 * @returns
 */
function serializeGalleryState(state) {
  var _a;
  const serializedState = {};
  if (state.term) {
    serializedState.term = state.term;
  }
  if ((_a = state.sort) === null || _a === void 0 ? void 0 : _a.attribute) {
    serializedState.sort = serializeSortState(state.sort);
  }
  if (state.layout) {
    serializedState.layout = state.layout;
  }
  const facetState = (state.facets || []).reduce((s, facet) => {
    return Object.assign(Object.assign({}, s), serializeFacetState(facet));
  }, {});
  return Object.assign(Object.assign({}, serializedState), facetState);
}
/**
 * TODO: Move to hub.js (and maybe make more generic to objects in general)
 *
 * Converts a serialized gallery state object into a query string.
 * Returns empty string if the object is empty.
 *
 * @param serializedState
 * @returns query string
 */
function convertToQueryString(serializedState) {
  const queryString = Object.entries(serializedState)
    .filter(([key]) => key !== 'isInitialization')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return queryString && `?${queryString}`;
}
/**
 * Apply the sortState to SortOptions
 *
 * @param sortOptions
 * @param sortState
 * @returns
 */
function applySortState(sortOptions, sortState) {
  const updated = cloneObject(sortOptions);
  if (sortState) {
    const [label, attribute, order] = sortState.split('|');
    updated.label = label;
    updated.attribute = attribute;
    updated.order = order;
  }
  else if (sortState === null) {
    updated.attribute = null;
    updated.order = null;
  }
  return updated;
}
/**
 * Apply FacetState to a Facet
 * @param facet
 * @param state
 * @returns
 */
function applyFacetState(facet, state) {
  let updated = cloneObject(facet);
  switch (facet.display) {
    case 'single-select':
    case 'multi-select':
      updated = applyListFacetState(facet, state);
      break;
    case 'tree':
      updated = applyTreeFacetState(facet, state);
      break;
    case 'date-range':
      updated = applyDateRangeFacetState(facet, state);
      break;
    case 'map':
      updated = applyMapFacetState(facet, state);
      break;
  }
  return updated;
}
/**
 * Apply the Facet State onto a list facet (i.e., single-select, multi-select)
 *
 * @private
 * @param facet
 * @param state
 * @returns
 */
function applyListFacetState(facet, state) {
  const updated = cloneObject(facet);
  const stateEntry = state[facet.key];
  let selectedKeys = [];
  if (stateEntry) {
    // If single select, assume the entire state entry is a single key
    selectedKeys = (facet.display === 'single-select'
      ? [stateEntry]
      : stateEntry.split(',')).map(key => decodeURIComponent(key));
    // To account for special characters causing issues when we try to deserialize,
    // facet keys are URI Encoded, so we use decodeURIComponent before attempting to
    // apply state.  This will also work if keys are not provided as URI encoded strings,
    // given they do not contain any special characters.
  }
  updated.options.forEach(opt => opt.selected = false);
  selectedKeys.forEach(selectedKey => {
    const matchedOption = updated.options.find(opt => opt.key === selectedKey);
    matchedOption
      ? matchedOption.selected = true
      // If no matching option exists, we still want to display a filter chip for the value
      // and actually apply the filter to the search. To accomplish this, we create and select
      // an "unrecognized" pseudo option (see docs for IFacetOption._unrecognized for more info / background)
      : updated.options.push({
        label: selectedKey,
        key: selectedKey,
        selected: true,
        _unrecognized: true,
        predicates: [{ [facet.key]: selectedKey }]
      });
  });
  updated.options = updated.options.map(o => {
    o.selected = selectedKeys.includes(o.key);
    return o;
  });
  return updated;
}
/**
 * Apply the Facet State onto a tree facet
 *
 * @private
 * @param facet
 * @param state
 * @returns
 */
function applyTreeFacetState(facet, state) {
  const updated = cloneObject(facet);
  const stateEntry = state[facet.key];
  // New gallery experiences refer to a category by a fully qualified path (e.g., `/categories/parent/child`).
  // However, legacy code often refers to a category by the last segment of a path (e.g., `child`).
  // To maintain backwards compatibility, we assume the keys selected are partial keys that refer to
  // the end of a path
  const selectedPartialKeys = (stateEntry
    ? stateEntry.split(',')
    : []).map(key => decodeURIComponent(key));
  // To account for special characters causing issues when we try to deserialize,
  // facet keys are URI Encoded, so we use decodeURIComponent before attempting to
  // apply state.
  // As legacy code did not differenciate between nested categories that ended
  // in the same value, mark _all_ matching categories as selected.
  //
  // Example:
  // partialKey is 'transportation'
  // options are '/categories/planning/transportation' and '/categories/city/transportation'
  // As a result, _both_ options would be selected
  updated.options.forEach(option => option.selected = false);
  selectedPartialKeys.forEach(partialKey => {
    const matchingOptions = updated.options.filter(option => option.key.endsWith(partialKey));
    if (matchingOptions.length) {
      matchingOptions.forEach(option => option.selected = true);
    }
    else {
      // If no matching option exists, we still want to display a filter chip for the value
      // and actually apply the filter to the search. To accomplish this, we create and select
      // an "unrecognized" pseudo option (see docs for IFacetOption._unrecognized for more info / background)
      const segments = partialKey.split('/');
      updated.options.push({
        label: segments[segments.length - 1],
        key: partialKey,
        selected: true,
        _unrecognized: true,
        predicates: [{ [facet.key]: partialKey }]
      });
    }
  });
  return updated;
}
/**
 * Serialize options-based facet (i.e. multi-select, tree, etc.) into IFacetState
 *
 * @private
 * @param facet
 * @returns
 */
function serializeOptionsBasedFacetState(facet) {
  const state = {};
  // When serializing state, we use encodeURIComponent to allow for any special characters.
  // Note: at deserialization, we use decodeURIComponent for each key
  const selected = facet.options.filter(o => o.selected).map(o => encodeURIComponent(o.key));
  // If single select, only serialize first selected key
  const value = facet.display === 'single-select' ? selected[0] : selected.join(',');
  if (value) {
    state[facet.key] = value;
  }
  else {
    state[facet.key] = null;
  }
  return state;
}
function isValidDateRange(range) {
  const from = Date.parse(range.from);
  const to = Date.parse(range.to);
  // will return false if either are NaN
  return from < to;
}
function applyDateRangeFacetState(facet, state) {
  var _a;
  const updated = cloneObject(facet);
  const [from, to] = ((_a = state[facet.key]) === null || _a === void 0 ? void 0 : _a.split('|')) || [];
  const range = { from, to };
  if (isValidDateRange(range)) {
    updated.value = range;
  }
  return updated;
}
function serializeDateRangeFacetState(facet) {
  var _a, _b;
  const state = {};
  const startDate = (_a = facet.value) === null || _a === void 0 ? void 0 : _a.from;
  const endDate = (_b = facet.value) === null || _b === void 0 ? void 0 : _b.to;
  if (startDate && endDate) {
    state[facet.key] = `${startDate}|${endDate}`;
  }
  else {
    state[facet.key] = null;
  }
  return state;
}
// TODO: move to hub.js
function bboxFromString(value) {
  let result = null;
  const coordinates = value.split(',').map(Number);
  if (coordinates.length === 4 && coordinates.every(c => !isNaN(c))) {
    const [xmin, ymin, xmax, ymax] = coordinates;
    result = [[xmin, ymin], [xmax, ymax]];
  }
  return result;
}
function applyMapFacetState(facet, state) {
  const updated = cloneObject(facet);
  updated.value = bboxFromString(state[facet.key] || '');
  return updated;
}
function serializeMapFacetState(facet) {
  return {
    [facet.key]: facet.value && bboxToString(facet.value)
  };
}
/**
 * Serialize the state of the SortOption into a key/value pair
 *
 * Called from the Sort component
 * @param sort
 * @returns
 */
function serializeSortState(sort) {
  return `${sort.label}|${sort.attribute}|${sort.order}`;
}
/**
 * Serialize the state of a facet into a key/value pair
 *
 * Called from the various facet components
 * @param facet
 * @returns
 */
function serializeFacetState(facet) {
  let state = {};
  switch (facet.display) {
    case 'single-select':
    case 'multi-select':
    case 'tree':
      state = serializeOptionsBasedFacetState(facet);
      break;
    case 'date-range':
      state = serializeDateRangeFacetState(facet);
      break;
    case 'map':
      state = serializeMapFacetState(facet);
      break;
  }
  return state;
}
/**
 * Remove (:count) in a label, regardless of language direction
 */
function removeCountLabel(label) {
  return label
    .replace(/\(\d+\)/, '')
    .replace(`\u200E`, '') // special character for RTL languages
    .trim();
}
/**
 * Adds (:count) to a label while accounting for language direction
 */
function addCountToLabel(label, count, intl) {
  return count == null
    ? label
    : intl.direction === 'rtl'
      // If we don't append \u200E, (:count) will still appear AFTER the title
      // Looks like the browser doesn't like sentences starting with "(" in RTL
      ? `\u200E(${count}) ${label}`
      : `${label} (${count})`;
}
/**
 * Process the options for certain common dynamic facets. For example:
 *
 * - Some option labels are modified (titlecased, uppercased, translated, etc.)
 * - Some option keys / predicates are modified
 * - Missing options may be added (categories facet only)
 * - If available, options get (:count) added to the label (appended or prepended, depending on the language)
 * - etc.
 *
 * @param facet dynamic list facet (generated from aggregations)
 * @param intl the intl service for the component
 * @returns a copy of formatted options for the given facet
 */
function processCommonDynamicOptions(facet, intl) {
  let processedOptions = cloneObject(facet.options);
  switch (facet.field) {
    case 'type':
      processedOptions = processedOptions.map(opt => {
        // Without proper casing, the Portal API will do fuzzy matches on item types
        // E.g., `type:image` will return both `Image` and `Image Service` results,
        // while `type:Image` will only return `Image` results
        const allCapsTypes = ['csv', 'pdf', 'kml', 'wfs', 'wms'];
        const formattedKey = allCapsTypes.includes(opt.key) ? opt.key.toUpperCase() : titleize(opt.key);
        opt.label = formattedKey;
        opt.key = formattedKey;
        opt.predicates = [{ type: formattedKey }];
        return opt;
      });
      break;
    case 'access':
      processedOptions = processedOptions.map(opt => {
        const translationKey = opt.label.toLowerCase();
        opt.label = intl.t(`facets.access.${translationKey}`);
        return opt;
      });
      break;
    case 'categories':
      processedOptions = processCategoriesFacetOptions(processedOptions);
      break;
    case 'tags':
      processedOptions = processedOptions.map(opt => {
        opt.label = titleize(opt.label);
        return opt;
      });
      break;
    case 'license':
      processedOptions = processedOptions.map(opt => {
        opt.label = ['none', 'custom'].includes(opt.key)
          ? intl.t(`facets.license.${opt.key}`)
          : opt.label.replace(/-/g, " ");
        return opt;
      });
      break;
  }
  // Append or Prepend (:count) to the label
  processedOptions = processedOptions.map(opt => {
    opt.label = addCountToLabel(opt.label, opt.count, intl);
    return opt;
  });
  return processedOptions;
}
/**
 * The categories facet is an interesting beast. It is the only dynamic facet
 * with a relational tree structure, which causes significant headaches when
 * we try to reason with and display the options.
 *
 * This function attempts alleviate some of these issues by:
 * - Removing the count from the options, as the API calculated values may be incorrect (see TODO below)
 * - Removing invalid options (i.e., options that are not in the root `/categories` folder)
 * - Guaranteeing that there is an option for every node in the tree (adding pseudo-options if necessary)
 * - Calculating an easy-to-read label for each option
 *
 * @param existingOptions category options as returned from the API
 * @returns an expanded and formatted set of category options
 */
function processCategoriesFacetOptions(existingOptions) {
  // TODO: remove this function once the OGC API returns the correct counts for categories
  const countlessOptions = removeCategoriesOptionCounts(existingOptions);
  const validOptions = getValidCategoriesOptions(countlessOptions);
  const additionalOptions = getAdditionalCategoriesOptions(validOptions);
  const result = formatCategoriesOptionLabels([...validOptions, ...additionalOptions]);
  // Sort result options by key (strictly for legibility)
  result.sort((a, b) => a.key.localeCompare(b.key));
  return result;
}
// Some customers use the Portal API to create categories outside the
// root `/categories` folder, which exposes a number of bugs. As a fix,
// we simply ignore any of these abnormal categories so that they do not
// display on the facet. See this ADR for more information:
// https://confluencewikidev.esri.com/pages/viewpage.action?pageId=263389456
function getValidCategoriesOptions(options) {
  // NOTE: The Portal API returns lowercase keys, but our index
  // uses titlecased keys, so we account for either scenario
  return options.filter(opt => opt.key.toLowerCase().startsWith('/categories'));
}
// Calculate any options that we need to have a complete tree
// Note: if there isn't an option for every node in the tree, the categories facet will not render
function getAdditionalCategoriesOptions(existingOptions) {
  const additionalOptions = [];
  const pathsChecked = {};
  existingOptions.forEach(opt => {
    // Split the path into segments and check if each segment is present in the options
    // NOTE: we omit the first `/` for ease of processing
    const pathSegments = opt.key.slice(1).split('/');
    pathSegments.reduce((pathSoFar, segment) => {
      const updatedPath = `${pathSoFar}/${segment}`;
      // If we haven't already checked this path, check if it exists in the options
      if (!pathsChecked[updatedPath]) {
        // Mark this path to avoid duplicate checks
        pathsChecked[updatedPath] = true;
        // Create a pseudo option if it doesn't exist.
        const match = existingOptions.find(o => o.key === updatedPath);
        if (!match) {
          // NOTE: We cannot calculate the count for pseudo options
          // on the client, so we leave it as undefined.
          additionalOptions.push({
            label: updatedPath,
            key: updatedPath,
            selected: false,
            predicates: [{ categories: updatedPath }]
          });
        }
      }
      return updatedPath;
    }, '');
  });
  return additionalOptions;
}
// TODO: remove this function once the OGC API returns the correct counts for categories
function removeCategoriesOptionCounts(options) {
  const result = cloneObject(options);
  result.forEach(opt => delete opt.count);
  return result;
}
function formatCategoriesOptionLabels(options) {
  const result = cloneObject(options);
  result.forEach(opt => {
    const pathSegments = opt.label.split('/');
    opt.label = titleize(pathSegments[pathSegments.length - 1]);
  });
  return result;
}
/**
 * Navigate to a relative or absolute url
 *
 * @param url url to navigate to
 * @param target href target
 */
function navigate(url, target = '_self') {
  if (url) {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = url;
    link.target = target;
    link.addEventListener('click', () => link.remove());
    link.click();
  }
}

export { addPathToResults as a, isTreeFacet as b, getTreeFacets as c, getDateRangeFacets as d, getMapFacets as e, isMapFacet as f, getListFacets as g, isOptionsBasedFacet as h, isValidDateRange as i, filterFacetsBasedOnLayout as j, applyGalleryState as k, getOptionsBasedFacets as l, convertToQueryString as m, navigate as n, resetFacet as o, processCommonDynamicOptions as p, hasMapFacets as q, removeCountLabel as r, serializeGalleryState as s, willStateChange as w };
