import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
/**
 * IANA Time Zone Picker
 * Expects to receive `params.value: string` of a IANA time zone (e.g. "America/New_York")
 */
export declare class TimeZonePicker {
  constructor();
  params: IRenderParams;
  /**
   * Payload will be an IANA time zone string (e.g. "America/New_York")
   */
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleCalciteInputTimeZonePickerChange(evt: CustomEvent<void>): void;
  render(): any;
}
