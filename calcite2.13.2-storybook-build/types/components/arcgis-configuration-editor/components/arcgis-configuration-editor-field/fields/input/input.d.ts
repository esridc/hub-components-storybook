import { EventEmitter, VNode } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
import { CalciteInputCustomEvent } from '@esri/calcite-components';
import { ComponentIntl } from "../../../../../../utils/stencil-intl";
declare const INPUT_FIELD_TYPES: readonly ["color", "date", "datetime-local", "email", "file", "image", "month", "number", "password", "search", "tel", "text", "textarea", "time", "url", "week"];
export declare type InputFieldTypes = (typeof INPUT_FIELD_TYPES)[number];
export declare class Input {
  element: HTMLElement;
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string | number>;
  intl: ComponentIntl;
  inputElement: HTMLCalciteInputElement | HTMLCalciteTextAreaElement;
  setInputElement: (element: HTMLCalciteInputElement | HTMLCalciteTextAreaElement) => void;
  /** the last value entered by the user */
  currentValue: string | number;
  componentWillLoad(): Promise<void>;
  /**
   * Returns the type of the input field
   */
  get type(): InputFieldTypes;
  /**
   * Returns the value in string form to render in the input
   */
  get _valueToRender(): string;
  watchValue(params: IRenderParams): void;
  private setCurrentValue;
  /**
   * Handles the on change event and parses to a number if necessary
   * @param evt
   */
  handleCalciteInputInput(evt: CalciteInputCustomEvent<void>): void;
  /**
   * Debounced event emitter for input change
   * Emits the current value of the input field
   */
  emitInputChange(): void;
  /**
   * BEGIN INPUT COUNTER RELATED LOGIC
   *
   * NOTE: the following is input counter related stuff that can go away when calcite-input or calcite-input-text support character counter
   * this is sorta convoluted but it is because we want the visual counter to update immediately
   * but we want to debounce the assistive text so it gets announced properly
   */
  currentLength: number;
  assistiveText: string;
  get counterString(): string;
  updateAssistiveText(): void;
  /**
   * Renders a character counter for the input field
   * @returns
   */
  _renderCounter(): VNode;
  /** END INPUT COUNTER RELATED LOGIC */
  /**
   * Renders a text area calcite field
   * @returns
   */
  renderTextArea(): any;
  /**
   * Renders the normal text input calcite field
   * @returns
   */
  renderTextInput(): any;
  /**
   * Delegates to the correct input field renderer based on the type of the field
   * @returns
   */
  renderInputField(): any;
  render(): any;
}
export {};
