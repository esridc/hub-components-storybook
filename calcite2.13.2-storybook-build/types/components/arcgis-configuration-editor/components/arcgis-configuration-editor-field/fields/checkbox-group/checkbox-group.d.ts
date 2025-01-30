import { EventEmitter, VNode } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
/**
 * The `hub-field-input-checkbox-group` renders a collection of checkboxes. When any checkbox `checked` state changes, an `arcgisConfigurationEditorFieldInputChange` event is emitted with an array containing the values of all checkboxes that are currently checked.
 */
export declare class CheckboxGroup {
  /**
   * The render parameters for the component
   */
  params: IRenderParams;
  /**
   * Emitted when checkboxes' checked state changes
   */
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string[]>;
  /**
   * Emits `arcgisConfigurationEditorFieldInputChange` with the updated array of ticked checkbox values when
   * any checkbox ticked state changes
   * @param evt
   */
  handleCalciteCheckboxChange: (evt: CustomEvent<void>) => void;
  /**
   * Renders an Array of calcite-checkboxes wrapped, each wrapped in a calcite-label
   */
  renderCheckboxes(): VNode[];
  /**
   * Primary render method
   */
  render(): any;
}
