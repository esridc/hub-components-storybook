import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteDropdownElement, HTMLCalciteInputDatePickerElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from '../../utils/stencil-intl';
import { PredefinedDateOption } from './utils';
export declare class ArcgisHubDateRangePicker {
  constructor();
  element: HTMLElement;
  calciteInputDatePickerEl: HTMLCalciteInputDatePickerElement;
  /**
   * The date range options to show in the dropdown
   *
   * @type {PredefinedDateOption[]}
   * @memberof ArcgisHubDateRangePicker
   */
  options: PredefinedDateOption[];
  /**
   * The layout of the date picker
   */
  layout: 'horizontal' | 'vertical';
  /**
   * The pre-defined or custom date range value
   *
   * @type {PredefinedDateOption | string[]}
   * @memberof ArcgisHubDateRangePicker
   */
  value: PredefinedDateOption | string[];
  /**
   * Earliest allowed date for custom date range picker
   *
   * @type {string}
   * @memberof ArcgisHubDateRangePicker
   */
  min: string;
  /**
   * Latest allowed date for custom date range picker
   *
   * @type {string}
   * @memberof ArcgisHubDateRangePicker
   */
  max: string;
  selectedValue: string;
  customStartDate: Date;
  customEndDate: Date;
  arcgisHubDateRangePickerSelect: EventEmitter;
  hubTelemetry: EventEmitter<Record<string, any>>;
  handleSelectedValueChange(): void;
  handleCalciteDropdownOpen(): void;
  handleCalciteDrodownSelect(): void;
  handleCalciteDatePickerRangeChange(): void;
  dropdownEl: HTMLCalciteDropdownElement;
  intl: ComponentIntl;
  setDropdownEl(el: HTMLCalciteDropdownElement): void;
  get isCustom(): boolean;
  get startDate(): Date;
  get endDate(): Date;
  private get _messageOverrides();
  componentWillLoad(): Promise<void>;
  handleCalciteInputDatePickerRef(inputDatePicker: HTMLCalciteInputDatePickerElement): void;
  get buttonText(): string;
  renderDropdown(): HTMLElement;
  render(): any;
}
