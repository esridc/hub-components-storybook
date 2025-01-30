import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IFacet, TreeFacetChangePayload } from '../../utils/types';
import { DateRangeFacetChangePayload, FacetOptionChangePayload, MapFacetChangePayload } from '../../utils/state-utils';
import { ComponentIntl } from "../../utils/stencil-intl";
import { IFacetChip } from '../../utils/chip-utils';
export declare class ArcgisHubFacetList {
  element: HTMLElement;
  /**
   * Show/hide the filter chips
   */
  showChips: boolean;
  /**
   * Facets to render
   */
  facets: IFacet[];
  /**
   * Whether or not to emit telemetry
   */
  disableTelemetry: boolean;
  /**
   * Number of results the current search query returned
   */
  resultsCount: number;
  /**
   * Event that's fired when facets have changed
   */
  arcgisHubFacetListChange: EventEmitter<IFacet>;
  /**
   * Event that requests the facets to be reset
   */
  arcgisHubFacetListReset: EventEmitter;
  /**
   * Emits telemetry events
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Intl service
   */
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data: Record<string, any>): void;
  /**
   * Handles changes in the child facets
   * The events flow up from the child components, and this function applies
   * the changes to the facets, and updates the _chips array. Resulting changes
   * then flow back down to the Facets.
   * @param evt
   */
  onListFacetChange(evt: CustomEvent<FacetOptionChangePayload>): void;
  onTreeFacetChange(evt: CustomEvent<TreeFacetChangePayload>): void;
  onDateRangeFacetChange(event: CustomEvent<DateRangeFacetChangePayload>): void;
  onMapFacetChange(event: CustomEvent<MapFacetChangePayload>): void;
  /**
   * Handles the removal of a chip.
   * It resets the selected state of the corresponding facet option, and updates the
   * chips array.
   *
   * NOTE: after upgrading to calcite-components@1.0.4, the event payload stopped providing
   * ANY reference to the chip element that was dismissed. As a workaround, we attach this
   * function as a callback with pre-bound arguments.
   * @param chip
   */
  onChipClose(chip: IFacetChip): void;
  /**
   * Reset the facets to the original state
   */
  resetFacets(): void;
  /**
   * Get the chips to display, based on the facet state
   */
  get chips(): IFacetChip[];
  /**
   * Render the Facets
   * @returns
   */
  renderFacets(): VNode[];
  renderFacetComponent(facet: IFacet): VNode;
  renderFacetTooltip(facet: IFacet): VNode;
  /**
   * Render the Chips
   * @returns
   */
  renderChips(): VNode[];
  /**
   * Main render
   * @returns
   */
  render(): any;
}
