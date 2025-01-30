import { IDateRange, IHubSearchResult } from '@esri/hub-common';
import { ComponentIntl } from './stencil-intl';
import { IDateRangeFacet, IFacet, IListFacet, IMapFacet, IOptionsBasedFacet, ITreeFacet } from './types/IFacet';
import { IFacetOption } from './types/IFacetOption';
import { IFacetState, IGalleryState, ISerializedGalleryState } from './types/IGalleryState';
/**
 * Add a path to the siteRelative links in the search results
 * @param path
 * @param response
 * @returns
 */
export declare function addPathToResults(path: string, results: IHubSearchResult[]): IHubSearchResult[];
/**
 * Searches an array of IFacets and creates a new array of only IListFacets
 *
 * @param facets array of facets to search
 * @returns all list facets within the array
 */
export declare function getListFacets(facets?: IFacet[]): IListFacet[];
/**
 * Returns whether or not a facet is of subtype IListFacet
 * @param facet
 */
export declare function isListFacet(facet: IFacet): boolean;
/**
 * Searches an array of IFacets and creates a new array of only IDateRangeFacets
 *
 * @param facets array of facets to search
 * @returns all date-range facets within the array
 */
export declare function getDateRangeFacets(facets?: IFacet[]): IDateRangeFacet[];
/**
 * Returns whether or not a facet is of subtype IDateRangeFacet
 * @param facet
 */
export declare function isDateRangeFacet(facet: IFacet): boolean;
/**
 * Searches an array of IFacets and creates a new array of only ITreeFacets
 *
 * @param facets array of facets to search
 * @returns all date-range facets within the array
 */
export declare function getTreeFacets(facets?: IFacet[]): ITreeFacet[];
/**
 * Returns whether or not a facet is of subtype ITreeFacet
 * @param facet
 */
export declare function isTreeFacet(facet: IFacet): boolean;
/**
 * Searches an array of IFacets and creates a new array of only IOptionsBasedFacets
 * (i.e, single-select, multi-select, tree, etc.)
 *
 * @param facets array of facets to search
 * @returns all options-based facets within the array
 */
export declare function getOptionsBasedFacets(facets?: IFacet[]): Array<IOptionsBasedFacet>;
/**
 * Returns whether or not a facet is of subtype IOptionsBasedFacet
 * (i.e, single-select, multi-select, tree, etc.)
 *
 * @param facet
 */
export declare function isOptionsBasedFacet(facet: IFacet): boolean;
/**
 * Searches an array of IFacets and creates a new array of only IMapFacets
 *
 * @param facets array of facets to search
 * @returns all map facets within the array
 */
export declare function getMapFacets(facets?: IFacet[]): IMapFacet[];
/**
 * Filters facets based on the provided layout type.
 *
 * @param {IFacet[]} facets - An array of facets to be filtered.
 * @param {string} layout - The layout type.
 * @returns {IFacet[]} An array of filtered facets.
 */
export declare function filterFacetsBasedOnLayout(facets: IFacet[], layout: string): IFacet[];
/**
 * Returns whether or not a facet is of subtype IMapFacet
 * @param facet
 */
export declare function isMapFacet(facet: IFacet): boolean;
/**
 * Returns whether or not the facets array has any map facets
 * @param facets
 * @returns Whteher or not the provided array of facets contains a map facet
 */
export declare function hasMapFacets(facets: IFacet[]): boolean;
/**
 * Determines whether a user-provided state object would nominally affect
 * the current gallery state if applied
 *
 * @param currentState serialized representation of the current gallery state
 * @param userInput serialized representation of the _intended_ gallery state
 * @returns Whether applying the user input would change the current state
 */
export declare function willStateChange(currentState: ISerializedGalleryState, userInput: ISerializedGalleryState): boolean;
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
export declare function applyGalleryState(state: IGalleryState, serializedState: ISerializedGalleryState): IGalleryState;
/**
 * Resets a facet to its default (valueless) state
 * @param facet facet to reset
 * @returns a resetted copy of the facet
 */
export declare function resetFacet(facet: IFacet): IFacet;
/**
 * unchecks all the options of a options-based facet
 * @param facet list facet to reset
 * @returns a resetted copy of the facet
 */
export declare function resetOptionsBasedFacet(facet: IOptionsBasedFacet): IOptionsBasedFacet;
/**
 * clears the date values of a date-range facet
 * @param facet date-range facet to reset
 * @returns a resetted copy of the facet
 */
export declare function resetDateRangeFacet(facet: IDateRangeFacet): IDateRangeFacet;
/**
 * clears the geometry of a map facet
 * @param facet map facet to reset
 * @returns a resetted copy of the facet
 */
export declare function resetMapFacet(facet: IMapFacet): IMapFacet;
/**
 * Serialize the current state of the gallery into a hash that
 * can be converted into a query string
 * @param state
 * @returns
 */
export declare function serializeGalleryState(state: IGalleryState): ISerializedGalleryState;
/**
 * TODO: Move to hub.js (and maybe make more generic to objects in general)
 *
 * Converts a serialized gallery state object into a query string.
 * Returns empty string if the object is empty.
 *
 * @param serializedState
 * @returns query string
 */
export declare function convertToQueryString(serializedState: ISerializedGalleryState): string;
/**
 * Apply the Facet State onto a list facet (i.e., single-select, multi-select)
 *
 * @private
 * @param facet
 * @param state
 * @returns
 */
export declare function applyListFacetState(facet: IListFacet, state: IFacetState): IFacet;
/**
 * Apply the Facet State onto a tree facet
 *
 * @private
 * @param facet
 * @param state
 * @returns
 */
export declare function applyTreeFacetState(facet: ITreeFacet, state: IFacetState): IFacet;
/**
 * Serialize options-based facet (i.e. multi-select, tree, etc.) into IFacetState
 *
 * @private
 * @param facet
 * @returns
 */
export declare function serializeOptionsBasedFacetState(facet: IOptionsBasedFacet): IFacetState;
export declare function isValidDateRange(range: IDateRange<string>): boolean;
/**
 * Remove (:count) in a label, regardless of language direction
 */
export declare function removeCountLabel(label: string): string;
/**
 * Adds (:count) to a label while accounting for language direction
 */
export declare function addCountToLabel(label: string, count: number, intl: ComponentIntl): string;
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
export declare function processCommonDynamicOptions(facet: IOptionsBasedFacet, intl: ComponentIntl): IFacetOption[];
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
export declare function processCategoriesFacetOptions(existingOptions: IFacetOption[]): IFacetOption[];
/**
 * Navigate to a relative or absolute url
 *
 * @param url url to navigate to
 * @param target href target
 */
export declare function navigate(url: string, target?: string): void;
