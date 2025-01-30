import { IDateRangeFacet, IFacet, IFacetOptionTree, IListFacet, ITreeFacet } from "./types";
export interface IFacetChip {
  key: string;
  label?: string;
  optionKey: string;
  optionLabel: string;
}
/**
 * Traverses each facet and calculates the filter chip models based on current facet values
 *
 * @param facets array of facets to compute chips from
 * @returns a flat array of all active chips
 */
export declare const getActiveChips: (facets: IFacet[]) => IFacetChip[];
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
export declare const getSingleSelectFacetChips: (facet: IListFacet) => IFacetChip[];
/**
 * Returns filter chips based on the facet's currently selected options
 *
 * @param facet
 * @returns an array of active chips for the facet
 */
export declare const getMultiSelectFacetChips: (facet: IListFacet) => IFacetChip[];
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
export declare const getTreeFacetChips: (facet: ITreeFacet) => IFacetChip[];
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
export declare function getSubtreeChips(facet: ITreeFacet, tree: IFacetOptionTree): IFacetChip[];
/**
 * Returns filter chips based on the date range's selected dates.
 * Returns an empty array if either `from` or `to` are undefined/null.
 *
 * @param facet
 * @returns an array of facet chips containing the date range
 */
export declare const getDateRangeFacetChips: (facet: IDateRangeFacet) => IFacetChip[];
export interface IDismissChipResponse {
  updatedFacet: IFacet;
  dismissedKeys?: string[];
}
/**
 * Creates a copy of the facet and deselects options / values that correspond to the chip.
 * Also returns the keys of dismissed options
 *
 * @param facet
 * @param chip option to deselect
 * @returns a modified and cloned facet
 */
export declare const dismissFacetChip: (facet: IFacet, chip: IFacetChip) => IDismissChipResponse;
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
export declare const dismissSingleSelectChip: (facet: IListFacet, chip: IFacetChip) => IDismissChipResponse;
/**
 * De-selects the facet option corresponding to the provided filter chip
 * and returns the keys of dismissed options
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
export declare const dismissMultiSelectChip: (facet: IListFacet, chip: IFacetChip) => IDismissChipResponse;
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
export declare const dismissTreeChip: (facet: ITreeFacet, chip: IFacetChip) => IDismissChipResponse;
/**
 * Dismisses date range chip and sets values to null.
 *
 * @param facet
 * @param chip option to de-select
 * @returns the cloned, modified facet
 */
export declare const dismissDateRangeChip: (facet: IDateRangeFacet, chip: IFacetChip) => IDismissChipResponse;
export declare const formatDismissedKeys: (facet: IFacet, keys: string[]) => string;
