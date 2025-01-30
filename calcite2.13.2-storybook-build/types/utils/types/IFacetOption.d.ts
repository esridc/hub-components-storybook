import { IPredicate } from '@esri/hub-common';
/**
 * Facet Option shown in the UI as either a radio button or checkbox
 */
export interface IFacetOption {
  /**
   * Translated label for the option
   */
  label: string;
  /**
   * Unique key, used for query params and telemetry
   */
  key: string;
  /**
   * For aggregate based Facets, the count of entries in the index with this value
   */
  count?: number;
  /**
   * Is this option selected when the UI loads
   */
  selected: boolean;
  /**
   * Filters to be applied when this option is selected
   */
  predicates?: IPredicate[];
  /**
   * @private
   * Do not manually populate. This property is used for distinguishing internal state.
   * To understand the motivation / use case behind this property, see the following ADR:
   * https://confluencewikidev.esri.com/display/Hub/Allow+Passthrough+of+Values+to+Valid+Facet+Query+Params+in+the+New+Gallery+Search+Experience
   */
  _unrecognized?: boolean;
  /**
   * @private
   * Do not manually populate. This property is bound at runtime and is used to enrich telemetry events
   */
  _telemetryIndex?: number;
}
