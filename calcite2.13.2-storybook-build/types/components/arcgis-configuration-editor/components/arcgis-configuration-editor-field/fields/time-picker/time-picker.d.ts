import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
/**
 * Time (hours and minutes) Picker
 * Expects `params.valye: string` of a time string (e.g. "12:00" or "22:14:00")
 */
export declare class TimePicker {
  constructor();
  params: IRenderParams;
  /**
   * Payload will be a time string (e.g. "2:00:00" or "22:14:00")
   */
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleCalciteInputTimePickerChange(evt: CustomEvent<void>): void;
  render(): any;
}
