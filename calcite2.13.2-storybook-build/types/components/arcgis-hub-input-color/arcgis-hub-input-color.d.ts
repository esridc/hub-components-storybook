import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteColorPickerElement } from '@esri/calcite-components/dist';
import { Status } from '@esri/calcite-components/dist/types/components/interfaces';
import { ValidateFunction } from 'ajv';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CalciteInputCustomEvent } from '@esri/calcite-components';
export interface IChangeEventDetail {
  value?: string;
  valid: boolean;
}
export declare class ArcgisHubInputColor {
  element: HTMLElement;
  colorPickerEl: HTMLCalciteColorPickerElement;
  validator: ValidateFunction;
  intl: ComponentIntl;
  /**
   * The color
   */
  value: string;
  /**
   * A boolean value indicating whether the control is disabled
   */
  disabled: boolean;
  /**
   * A boolean value indicating whether the control should consider empty values valid
   */
  required: boolean;
  /**
   * A boolean value indicating whether to disable the saved colors section
   */
  showSavedColor: boolean;
  label: string;
  placeholder: string;
  savedColors: string[];
  status: Status;
  _colorPickerColor: string;
  storageId: string;
  /**
   * This custom event is emitted when the color is changed.
   */
  arcgisHubInputColorChange: EventEmitter<IChangeEventDetail>;
  constructor();
  /**
   * Property watchers
   */
  handleValueChanged(value: any): void;
  /**
   * Event handling
   */
  handleColorPickerChange(event: Event): void;
  handleInputInput(event: CalciteInputCustomEvent<void>): void;
  /**
   * Hooks
   */
  componentWillLoad(): Promise<void>;
  /**
   * Functions
   */
  validate(color?: string): {
    valid: true;
    errors?: undefined;
  } | {
    valid: boolean;
    errors: import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
  };
  emitChangeEvent(value: any, validationResult: any): void;
  setColor(color: any): {
    valid: true;
    errors?: undefined;
  } | {
    valid: boolean;
    errors: import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
  };
  setColorPickerEl(el: any): void;
  render(): any;
}
