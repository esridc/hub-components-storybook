import { EventEmitter } from "../../../../../../stencil-public-runtime";
import { IRenderParams } from "../resources";
import { ComponentIntl } from "../../../../../../utils/stencil-intl";
import { IChangeEventDetail, IHubSchedule, ISchedulerOption, SchedulerOptionType } from "@esri/hub-common";
export declare class Scheduler {
  element: HTMLElement;
  /**
   * The parameters for the field
   * @type {IRenderParams} - required
   *
   * - format: 'select' | 'single'
   * - options: ISchedulerOption[]
   *
   * See examples here: packages/hub-components/src/html/arcgis-configuration-editor/schemas/fields/scheduler.js
   */
  params: IRenderParams;
  /**
   * The value of the field
   */
  value: IHubSchedule;
  /**
   * Current behavior of this control is to reset the value to its base state when the field is disabled.
   * However, we need to keep track of the value before it was disabled so that we can reset it to that value
   * when the field is re-enabled.
   */
  _valueBeforeDisabled: IHubSchedule;
  /**
   * The options for the field
   */
  options: ISchedulerOption[];
  /**
   * Current behavior of this control is to reset the options to their base state when the field is disabled.
   * However, we need to keep track of the options before they were disabled so that we can reset them to that value
   * when the field is re-enabled.
   */
  _optionsBeforeDisabled: ISchedulerOption[];
  /**
   * Whether the component has been initialized; needed to prevent dirty state modal
   */
  isInitialized: boolean;
  /**
   * Emitted when the value of the field changes
   */
  arcgisConfigurationEditorFieldInputChange: EventEmitter<IHubSchedule>;
  arcgisConfigurationEditorChange: EventEmitter<IChangeEventDetail>;
  intl: ComponentIntl;
  /*********** GETTERS, SETTERS, AND VALIDATION ***********/
  /**
   * Returns whether the field has been statically disabled (via UI Schema
   * options) or dynamically disabled (via parent form validation)
   */
  get _disabled(): boolean;
  get checkedOption(): ISchedulerOption;
  get isValueValid(): boolean;
  get isHourValid(): boolean;
  get isDayValid(): boolean;
  get isDateValid(): boolean;
  get isValidMonth(): boolean;
  get isTimezoneValid(): boolean;
  isOptionAvailable(type: SchedulerOptionType): boolean;
  getOptionLabel(option: ISchedulerOption): string;
  componentWillLoad(): Promise<void>;
  setValueToBaseSchedule(): void;
  /*********** EVENT HANDLERS ***********/
  handleParamsChange(newParams: IRenderParams, oldParams: IRenderParams): void;
  handleArcgisHubInputSchedulerChange(): void;
  updateCheckedOptionSelectFormat(e: CustomEvent<any>): void;
  updateHour(e: CustomEvent<any>): void;
  updateTimezone(e: CustomEvent<any>): void;
  updateDayOrMonth(e: CustomEvent<any>): void;
  updateDateNumber(e: CustomEvent<any>): void;
  /*********** RENDER FUNCTIONS: INPUTS ***********/
  renderInvalidInputMessage(message: string): any;
  renderHourPicker(): any;
  renderDatePicker(): any;
  renderDayPicker(): any;
  renderMonthPicker(): any;
  renderTimezonePicker(): any;
  /*********** RENDER FUNCTIONS: EXPANDED SECTIONS ***********/
  renderDailyOptionSection(): any;
  renderWeeklyOptionSection(): any;
  renderMonthlyOptionSection(): any;
  renderYearlyOptionSection(): any;
  renderExpandedOptionSection(): any;
  /*********** RENDER FUNCTIONS: FORMATS ***********/
  renderSelectOption(option: ISchedulerOption): any;
  renderSelectFormat(): any;
  renderSingleFormat(): any;
  render(): any;
}
