import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
export declare class DatePicker {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleCalciteInputDatePickerChange(evt: CustomEvent<void>): void;
  render(): any;
}
