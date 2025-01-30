import { EventEmitter } from '../../../../stencil-public-runtime';
import { HTMLCalciteInputElement, HTMLCalcitePanelElement, HTMLCalciteOptionGroupElement, HTMLCalciteSelectElement } from '@esri/calcite-components/dist';
import { Status } from '@esri/calcite-components/dist/types/components/interfaces';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { MeasurementSystem, MeasurementUnit, BufferDetails } from './types';
export declare class ArcgisHubMapWidgetDrawBuffer {
  /**
   * Reference to host element
   */
  el: HTMLArcgisHubMapWidgetDrawBufferElement;
  /**
   * Visibility of element
   */
  visible: boolean;
  /**
   * Unit of measurement
   */
  unit: MeasurementUnit;
  /**
   * Buffer distance
   */
  distance: number;
  /**
   * Distance input status
   */
  status: Status;
  /**
   * calcite-select element reference
   */
  selectEl: HTMLCalciteSelectElement;
  /**
   * calcite-input element reference
   */
  inputEl: HTMLCalciteInputElement;
  /**
   * calcite-panel element reference
   */
  panelEl: HTMLCalcitePanelElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Emitted when buffer values change
   */
  arcgisHubMapWidgetDrawBufferChanged: EventEmitter<BufferDetails>;
  /**
   * Emitted when buffer is reset
   */
  arcgisHubMapWigetDrawBufferReset: EventEmitter<void>;
  /**
   * Emitted when buffer panel is closed
   */
  arcgisHubMapWidgetDrawBufferPanelClosed: EventEmitter<void>;
  /**
   * Emitted when panel visibility changes; for closing other active panels
   */
  arcgisHubWidgetPanelToggled: EventEmitter<boolean>;
  constructor();
  /**
   * componentWillLoad lifecycle method
   */
  componentWillLoad(): Promise<void>;
  /**
   * Listen for unit or distance changes, validate and emit values
   */
  handleUnitDistanceChanged(): void;
  /**
   * Listen for calcite-select change and update unit and system state
   */
  handleCalciteSelectChange(): void;
  /**
   * Listen for calcite-input change and update distance state
   */
  handleCalciteInputInput(): void;
  /**
   * Listen for calcite-panel dismissed changes
   */
  handleCalcitePanelDismissedChange(): void;
  /**
   * Handle changes to visible prop
   */
  handleVisibleChange(): void;
  forceReset(): Promise<void>;
  /**
   * Reset distance
   */
  reset(): void;
  /**
   * Validate input distance
   */
  validateDistance(): void;
  /**
   * Handles distance input keyUp event, since
   * calcite-input envent's are not fired when value is cleared
   */
  handleInputKeyUp(): void;
  /**
   * Sets calcite-select ref to this.selectEl
   * @param selectEl
   */
  handleSetSelectRef(selectEl: HTMLCalciteSelectElement): void;
  /**
   * Sets calcite-input ref to this.inputEl
   * @param inputEl
   */
  handleSetInputRef(inputEl: HTMLCalciteInputElement): void;
  /**
   * Set calcite-panel ref to this.panelEl
   * @param panelEl
   */
  handleSetPanelRef(panelEl: HTMLCalcitePanelElement): void;
  /**
   * Get the default system of measurement based on locale
   */
  get defaultSystemOfMesasurement(): MeasurementSystem;
  /**
   * Get the default unit of measurement based on locale
   */
  get defaultUnitOfMeasurement(): MeasurementUnit;
  /**
   * Returns true if form can be reset to default values
   */
  get canReset(): boolean;
  /**
   * Validation status (as boolean) of distance input
   * used for validation message
   */
  get distanceIsInvalid(): boolean;
  /**
   * Imperial or Metric unit options
   */
  renderOptionsGroup(system: MeasurementSystem, units: MeasurementUnit[]): HTMLCalciteOptionGroupElement;
  render(): any;
}
