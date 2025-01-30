import { HTMLCalcitePopoverElement } from '@esri/calcite-components/dist';
import { Appearance } from '@esri/calcite-components/dist/types/components/interfaces';
import { EventEmitter } from '../../stencil-public-runtime';
import { LayoutOptions } from '../../utils/types';
export declare class ArcgisHubLayoutButton {
  /**
   * Whether this button represents the current layout
   * @private
   */
  selected: boolean;
  /**
   * Passthrough to underlying button
   * @private
   */
  icon: string;
  /**
   * Layout option that the button represents
   * @private
   */
  layout: LayoutOptions;
  /**
   * Text for tooltip that appears on hover
   * @private
   */
  tooltip: string;
  popoverElement: HTMLCalcitePopoverElement;
  get _kind(): "brand" | "neutral";
  get _appearance(): Appearance;
  arcgisHubLayoutButtonSelect: EventEmitter<LayoutOptions>;
  constructor();
  setPopoverElement(el: HTMLCalcitePopoverElement): void;
  maybeOpenPopover(): void;
  maybeClosePopover(): void;
  selectLayout(): void;
  render(): any;
}
