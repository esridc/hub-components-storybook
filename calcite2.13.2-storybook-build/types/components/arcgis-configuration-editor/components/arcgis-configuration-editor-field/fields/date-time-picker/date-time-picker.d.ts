import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
export declare class DateTimePicker {
  constructor();
  params: IRenderParams;
  /**
   * Payload will be in the same format that was passed in ISO8601 string or timestamp number
   */
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string | number>;
  /**
   * @internal
   * ISO8601 date string YYYY-MM-DD
   */
  _date: string;
  /**
   * @internal
   * ISO8601 time string HH:MM, 12 or 24 hour format
   */
  _time: string;
  returnFormat: "isostring" | "timestamp";
  componentWillLoad(): void;
  /**
   * Get the formatted date string in the format YYYY-MM-DD.
   * @param date - The date object.
   * @returns The formatted date string.
   */
  getDateString(date: Date): string;
  /**
   * Given time and date strings, return a date object in the current timezone
   * @param dateString YYYY-MM-DD
   * @param timeString HH:MM
   * @returns
   */
  getLocalDate(dateString: string, timeString: string): Date;
  handleCalciteInputDateTimePickerChange(evt: CustomEvent<void>): void;
  render(): any;
}
