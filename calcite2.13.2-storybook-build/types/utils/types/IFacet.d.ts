/// <reference types="arcgis-js-api" />
import type Extent from '@arcgis/core/geometry/Extent';
import { BBox, EntityType, IDateRange } from '@esri/hub-common';
import { IFacetOption } from './IFacetOption';
export declare type IFacet = IListFacet | IDateRangeFacet | ITreeFacet | IMapFacet;
/**
 * Abstract interface that houses shared properties across facet types
 * and contains the discriminator property for type checking
 */
interface IBaseFacet {
  /**
   * Display type for this facet. Serves as the discriminator property for type checking.
   * Note: Add an option here if you need to create a new facet display type
   */
  display: 'map' | 'single-select' | 'multi-select' | 'date-range' | 'histogram' | 'tree';
  /**
   * Translated label for the facet
   */
  label: string;
  /**
   * Unique key, used for query params and telemetry
   */
  key: string;
  /**
   * State of the Facet
   */
  state?: 'open' | 'closed';
  /**
   * When present, a tooltip trigger icon is placed next to the facet
   * title and the tooltip will be populated with the provided string
   */
  tooltip?: string;
  /**
   * A list of valid entity types that this facet can be applied to
   */
  validTargetEntities?: EntityType[];
}
/**
 * Defines common interface for facets based on flat options lists,
 * both static and dynamic
 */
export interface IOptionsBasedFacet extends IBaseFacet {
  display: 'single-select' | 'multi-select' | 'tree';
  operation?: 'OR' | 'AND';
  options?: IFacetOption[];
  field?: string;
  aggLimit?: number;
}
/**
 * Definition of a List facet, including both static and dynamic options
 *
 * If a `field` is specified, the Facet will be "dynamic" in that
 * it will request aggregations for the field and use the returned
 * values to create the FacetOptions.
 *
 * `Facet` contains an array of `FacetOptions`. When selected
 * in the UI, an `IFilter` is constructed using the `Facet.operation`
 * and the `predicates` are from the selected `FacetOptions`.
 */
export interface IListFacet extends IOptionsBasedFacet {
  /**
   * Designates this facet to display as one of the list variations
   */
  display: 'single-select' | 'multi-select';
  /**
   * Individual options for this Facet
   */
  options?: IFacetOption[];
  /**
   * Max size of the initial page of options
   */
  pageSize?: number;
  /**
   * Operation is passed into the FilterGroup that is constructed
   * when the Facet is serialized.
   * Implementations should default to "OR" if not specified
   */
  operation?: 'OR' | 'AND';
  /**
   * Number of facet options to show by default. Only applies to `multi-select`, and defaults to all.
   */
  optionLimit?: number;
  /**
   * field to generate the facet from
   */
  field?: string;
  /**
   * limit of aggregates returned. Max 200
   */
  aggLimit?: number;
  /**
   * Specifies how to order the facet options. Only applies to `multi-select`, and defaults to count.
   * - count: orders by `option.count` in descending order of frequency
   * - label: orders by `option.label` in ascending alphabetical order
   */
  orderBy?: 'count' | 'label';
}
/**
 * Definition of a Tree facet, including both static and dynamic options
 *
 * Like `IListFacet`, `ITreeFacet contains an array of `FacetOptions`.
 * When selected in the UI, an `IFilter` is constructed using the `operation`
 * from the facet and the `predicates` from the selected `FacetOptions`.
 *
 * If a `field` is specified, the Facet will be "dynamic" in that
 * it will request aggregations for the field and use the returned
 * values to create the FacetOptions.
 *
 * For ease of data manipulation, we require that all options have a key that
 * expresses the full path hierarchy of the option. For an example, see the
 * following tree:
 *
 * Parent
 * |__ Child-1
 * |__ Child-2
 *
 * To express this tree in an ITreeFacet, we'd need 3 `IFacetOption` elements:
 * - key: '/Parent'
 * - key: '/Parent/Child-1'
 * - key: '/Parent/Child-2
 */
export interface ITreeFacet extends IOptionsBasedFacet {
  /**
   * Designates this facet to display as a tree
   */
  display: 'tree';
  /**
   * Individual options for this Facet. Option keys must reflect the full
   * path hierarchy (e.g., `key: '/categories/cars/nissan')
   */
  options?: IFacetOption[];
  /**
   * Operation is passed into the FilterGroup that is constructed
   * when the Facet is serialized.
   * Implementations should default to "OR" if not specified
   */
  operation?: 'OR' | 'AND';
  /**
   * field to generate the facet from (e.g. `categories`)
   */
  field?: string;
  /**
   * limit of aggregates returned. Max 200
   */
  aggLimit?: number;
}
export interface IDateRangeFacet extends IBaseFacet {
  /**
   * Designates this facet to display as a date-range
   */
  display: 'date-range';
  /**
   * field to filter against
   */
  field: string;
  /**
   * date range for the facet to display
   */
  value?: IDateRange<string>;
  /**
   * max value of the date range
   */
  max?: Date | number | string;
}
export interface IMapFacet extends IBaseFacet {
  /**
   * Designates this facet to display as a map
   */
  display: 'map';
  /**
   * field to filter against
   */
  field: string;
  /**
   * Bounding box that should be applied for filtering (null if no spatial filter should be applied)
   * This value is updated as users change the selected bbox on the map. Note that the coordinates will
   * always be in WGS-84 (4326)
   *
   * If provided on initialization, the map facet will zoom the bbox into view.
   */
  value: BBox;
  /**
   * If no `value` is provided, this property will be used to set the map's initial extent. It can be in any spatial projection.
   *
   * This property _will not_ be updated as users change the selected bbox on the map.
   *
   * Note: This property is a POJO that we pass into the __esri.Extent constructor for instantiation. However, as the `ExtentProperties`
   * interface actually used for the constructor is private, we've typed this property as `Partial<Extent>`
   */
  extent?: Partial<Extent>;
}
export {};
