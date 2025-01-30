import { CalciteInputCustomEvent } from '@esri/calcite-components';
import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @internal
 * This component is intended for use in the various -gallery components
 */
export declare class ArcgisHubSearchInput {
  constructor();
  /**
   * Value of the search input. As the text changes
   * the `value` is kept in sync.
   */
  value: any;
  /**
   * Placeholder message
   * Consumers should pass in translated string
   */
  placeholder: string;
  /**
   * Button Text
   * Consumers should pass in translated string
   */
  text: string;
  /**
   * Scale of the component
   */
  scale: any;
  /**
   * When the search is submitted, this event is raised
   */
  inputChange: EventEmitter<string>;
  /**
   * This event fires each time a new value is typed and committed
   * Which means it fires
   * - when the user presses enter
   * - when the user tabs out of the input
   * - when the clear button is clicked
   * - when the action button is clicked
   */
  handleInputChange(): void;
  /**
   * Keep the internal value syncronized with the calcite-input
   *
   * @param ev
   */
  handleInput(ev: CalciteInputCustomEvent<void>): void;
  render(): any;
}
