import { cloneObject } from "@esri/hub-common";
import { isTreeFacet, removeCountLabel } from "./gallery-utils";
import { createTree, getChildren, getTreeOptionLabel, isTreeSelected } from "./option-tree-utils";
import { getLocaleInfo } from "./localization";
/**
 * Traverses each facet and calculates the filter chip models based on current facet values
 *
 * @param facets array of facets to compute chips from
 * @returns a flat array of all active chips
 */
export const getActiveChips = (facets) => {
  return facets.reduce((allChips, facet) => {
    let facetChips = [];
    switch (facet.display) {
      case 'single-select':
        facetChips = getSingleSelectFacetChips(facet);
        break;
      case 'multi-select':
        facetChips = getMultiSelectFacetChips(facet);
        break;
      case 'tree':
        facetChips = getTreeFacetChips(facet);
        break;
      case 'date-range':
        facetChips = getDateRangeFacetChips(facet);
        break;
    }
    return [...allChips, ...facetChips];
  }, []);
};
/**
 * Returns a filter chip for the selected option IFF the option represents
 * an "unrecognized" (i.e., unmatched user provided) option. See the documentation
 * for IFacetOption._unrecognized for more information
 *
 * TODO: determine whether we should always show filter chips for single-select facets
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
export const getSingleSelectFacetChips = (facet) => {
  return facet.options
    .filter(o => o.selected && o._unrecognized)
    .map(opt => {
    return {
      key: facet.key,
      label: facet.label,
      optionKey: opt.key,
      optionLabel: opt.label
    };
  });
};
/**
 * Returns filter chips based on the facet's currently selected options
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
export const getMultiSelectFacetChips = (facet) => {
  return facet.options
    .filter(o => o.selected)
    .map(opt => {
    const optionLabel = removeCountLabel(opt.label);
    return {
      key: facet.key,
      label: facet.label,
      optionKey: opt.key,
      optionLabel
    };
  });
};
/**
 * Returns filtered chips for a tree facet based on selected options.
 * The following rules determine whether an option is turned into a chip:
 * - If a parent category and all its subcategories are selected, ONLY return a chip for the parent category
 * - If the subcategory represents an "unrecognized" (i.e., unmatched user provided) option, return a solo chip
 * for that subcategory (See the documentation for IFacetOption._unrecognized for more info)
 * - Else, return a chip for each selected category
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
export const getTreeFacetChips = (facet) => {
  const recognizedOptions = facet.options.filter(option => !option._unrecognized);
  const tree = createTree(recognizedOptions);
  // The tree root is just an entry point. We don't want to include it in chip calculations
  const normalChips = getChildren(tree).map(child => getSubtreeChips(facet, child)).flat();
  const unrecognizedUserAppliedOptions = facet.options.filter(option => option.selected && option._unrecognized);
  const unrecognizedUserAppliedChips = unrecognizedUserAppliedOptions.map(option => ({
    key: facet.key,
    label: facet.label,
    optionKey: option.key,
    optionLabel: option.label
  }));
  return [...unrecognizedUserAppliedChips, ...normalChips];
};
/**
 * Recursive helper that gets all chips for a sub tree. See `getTreeFacetChips` for an
 * explanation of the business logic
 *
 * NOTE: this helper expects that all nodes of the sub tree have a corresponding `option` attached
 *
 * @param facet
 * @param tree current subtree
 * @returns all chips for the current subtree
 */
export function getSubtreeChips(facet, tree) {
  let result = [];
  tree.option.selected && result.push({
    key: facet.key,
    label: facet.label,
    optionKey: tree.option.key,
    optionLabel: removeCountLabel(tree.option.label)
  });
  if (!isTreeSelected(tree)) {
    getChildren(tree).forEach(child => {
      const childChips = getSubtreeChips(facet, child);
      result = result.concat(childChips);
    });
  }
  return result;
}
/**
 * Returns filter chips based on the date range's selected dates.
 * Returns an empty array if either `from` or `to` are undefined/null.
 *
 * @param facet
 * @returns an array of facet chips containing the date range
 */
export const getDateRangeFacetChips = (facet) => {
  var _a, _b;
  if (!((_a = facet.value) === null || _a === void 0 ? void 0 : _a.from) || !((_b = facet.value) === null || _b === void 0 ? void 0 : _b.to)) {
    return [];
  }
  const localeInfo = getLocaleInfo();
  const from = new Date(facet.value.from).toLocaleDateString(localeInfo.locale);
  const to = new Date(facet.value.to).toLocaleDateString(localeInfo.locale);
  // does not include label due to it overflowing the chip
  // also, the optionLabel handles RTL and LTR in the browser by formatting the string there
  return [
    {
      key: facet.key,
      optionKey: facet.key,
      optionLabel: `${from} - ${to}`
    }
  ];
};
/**
 * Creates a copy of the facet and deselects options / values that correspond to the chip.
 * Also returns the keys of dismissed options
 *
 * @param facet
 * @param chip option to deselect
 * @returns a modified and cloned facet
 */
export const dismissFacetChip = (facet, chip) => {
  let response;
  switch (facet.display) {
    case 'single-select':
      response = dismissSingleSelectChip(facet, chip);
      break;
    case 'multi-select':
      response = dismissMultiSelectChip(facet, chip);
      break;
    case 'tree':
      response = dismissTreeChip(facet, chip);
      break;
    case 'date-range':
      response = dismissDateRangeChip(facet, chip);
      break;
  }
  return response;
};
/**
 * De-selects the facet option corresponding to the provided filter chip
 * and returns the keys of dismissed options.
 *
 * NOTE: Since filter chips should only appear for single-select facets when
 * an "unrecognized" (i.e., unmatched user provided) option is selected, we don't want
 * the facet to be in an invalid "no options selected" state when the filter
 * chip is dismissed. As such, we select the first non-unrecognized option.
 *
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
export const dismissSingleSelectChip = (facet, chip) => {
  const updated = cloneObject(facet);
  const targetOption = updated.options.find(opt => opt.key === chip.optionKey && opt._unrecognized);
  targetOption.selected = false;
  const newlySelectedOption = updated.options.find(opt => !opt._unrecognized);
  newlySelectedOption.selected = true;
  return {
    updatedFacet: updated,
    dismissedKeys: [chip.optionKey]
  };
};
/**
 * De-selects the facet option corresponding to the provided filter chip
 * and returns the keys of dismissed options
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
export const dismissMultiSelectChip = (facet, chip) => {
  const updated = cloneObject(facet);
  updated.options.forEach((option) => {
    if (option.key === chip.optionKey) {
      option.selected = false;
    }
  });
  return {
    updatedFacet: updated,
    dismissedKeys: [chip.optionKey]
  };
};
/**
 * De-selects facet options corresponding to the provided filter chip and returns the keys of dismissed options
 * The following rules determine which options will be de-selected with the chip:
 * - If the chip corresponds to a "unrecognized" (i.e., unmatched user provided) option, ONLY deselect that option
 * - If the chip corresponds to a parent category AND all subcategories are selected,
 * de-select the parent category and all subcategories (NOTE: "unrecognized" subcategories remain untouched)
 * - Else if the chip corresponds to a parent category but not all subcategories are
 * selected, ONLY deselect the parent category
 * - Else deselect the subcategory
 *
 * @param facet
 * @param chip reference option for the de-selection process
 * @returns the cloned, modified facet
 */
export const dismissTreeChip = (facet, chip) => {
  const updatedFacet = cloneObject(facet);
  const option = updatedFacet.options.find(opt => opt.key === chip.optionKey);
  let optionChildren = [];
  let allChildrenSelected = false;
  if (!option._unrecognized) {
    optionChildren = updatedFacet.options.filter(opt => {
      return !opt._unrecognized &&
        opt.key !== chip.optionKey &&
        opt.key.includes(chip.optionKey);
    });
    allChildrenSelected = !!optionChildren.length && optionChildren.every(child => child.selected);
  }
  const dismissedKeys = [];
  // Unselect parent option
  option.selected = false;
  dismissedKeys.push(option.key);
  // If all children were previously selected, unselect them
  if (allChildrenSelected) {
    optionChildren.forEach(child => {
      child.selected = false;
      dismissedKeys.push(child.key);
    });
  }
  return { updatedFacet, dismissedKeys };
};
/**
 * Dismisses date range chip and sets values to null.
 *
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
export const dismissDateRangeChip = (facet, chip) => {
  const updated = cloneObject(facet);
  updated.value.from = null;
  updated.value.to = null;
  return {
    updatedFacet: updated,
    dismissedKeys: [chip.optionKey]
  };
};
export const formatDismissedKeys = (facet, keys) => {
  const formatted = isTreeFacet(facet) ? keys.map(getTreeOptionLabel) : keys;
  return formatted.join(', ');
};
