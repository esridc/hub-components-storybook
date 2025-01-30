import { Quadrant, PopoverEventDetails } from './types';
export declare class ArcgisHubMapPopover {
  /**
   * Reference to host element
   */
  el: ArcgisHubMapPopover;
  /**
   * Optional target (string) for verifying recipient, allowing for multiple
   * popovers to be rendered on-screen.  If defined, only events with matching target
   * will be displayed
   */
  target?: string;
  /**
   * Sometimes we may want to have a popover without site themeing applied.
   * As we usually use the popover via a wormhole we need to do this.
   */
  unthemed?: boolean;
  /**
   * Absolute popover 'x' position in px
   */
  x: number;
  /**
   * Absolute popover 'y' position in px
   */
  y: number;
  /**
   * Quadrant position of geometry center
   */
  quadrant: Quadrant;
  /**
   * DOM content to render inside of popover
   */
  content: any;
  /**
   * Handles the event for a popover open request, opening the popup
   * at a best fit location in the view and rendering the content
   * @param event PopoverEventDetails
   */
  handlePopoverOpen(event: CustomEvent<PopoverEventDetails>): void;
  /**
   * Handles the event to clear any existing popover content
   * @param event
   */
  handlePopoverClear(event: CustomEvent<null>): void;
  /**
   * Computes styles object
   */
  get styles(): {
    [key: string]: string;
  };
  render(): any;
}
