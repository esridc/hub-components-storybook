import { LogicalPlacement, OverlayPositioning } from '@esri/calcite-components/dist/types/utils/floating-ui';
/**
 * The arcgis-ref-tooltip is a thin wrapper around the
 * calcite-tooltip that programatically sets the referenceElement
 * of the tooltip to a div around the slotted content.
 *
 * The reason this is useful is because the calcite docs
 * recommend setting the referenceElement to an actual
 * HTMLElement (rather than an element ID) to prevent
 * needing to query the DOM. This component handles
 * setting this ref so that the consuming component
 * doesn't need to. This is especially useful when
 * mapping over an array of elements that each render
 * a tooltip.
 */
export declare class ArcgisRefTooltip {
  /**
   * Determines the type of positioning to use for
   * the overlaid content.
  */
  overlayPositioning: OverlayPositioning;
  /**
   * Determines where the component will be positioned
   * relative to the referenceElement.
   */
  placement: LogicalPlacement;
  /** text to render in the tooltip */
  text: string;
  tooltipRef: HTMLElement;
  render(): any;
}
