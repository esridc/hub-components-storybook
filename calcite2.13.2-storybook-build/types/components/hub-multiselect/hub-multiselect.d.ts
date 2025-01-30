import { Scale } from '@esri/calcite-components';
import { EventEmitter } from '../../stencil-public-runtime';
export interface IChangeEventDetail {
  values: string[];
}
export declare class HubMultiselect {
  /**
   * A label for the multiselect component
  */
  label: string;
  /**
   * An array of selected values.
   */
  values: string[] | string;
  /**
   * A boolean value indicating whether the multiselect is disabled.
   */
  disabled: boolean;
  scale: Scale;
  parsedValues: string[];
  /**
   * This custom event is emitted when the selected values is changed.
   */
  hubMultiselectChange: EventEmitter<IChangeEventDetail>;
  /**
   * Property watchers
   */
  handleValuesChanged(values: any): void;
  /**
   * Event handling
   */
  handleChipCloseEvent(event: any): void;
  handleKeyEvent(event: KeyboardEvent): void;
  /**
   * Hooks
   */
  componentWillLoad(): void;
  /**
   * Functions
   */
  render(): any;
}
