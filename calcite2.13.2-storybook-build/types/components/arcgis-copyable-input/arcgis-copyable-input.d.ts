import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
import { CalciteInputCustomEvent } from '@esri/calcite-components';
/**
 * @slot label - A slot that overwrites the label area which can be used to add buttons, icons, etc. The label is overwritten in order to allow for styling changes.
 */
export declare class ArcgisCopyableInput {
  element: HTMLElement;
  type: 'text' | 'textarea';
  /**
   * Label for the input element. Also sets it's aria-label.
   */
  label: string;
  /**
   * Placeholder for the input element.
   */
  placeholder: string;
  /**
  * Button text for the copy button element.
  */
  buttonText: string;
  /**
   * Value of the input element.
   */
  value: string;
  /**
   * Marks the input element as read-only. Copy button remains active.
   */
  readonly: boolean;
  /**
   * Disables both the input element and the copy button
   */
  disabled: boolean;
  /**
   * Emits the current value of the input when the copy button is clicked
   */
  arcgisHubCopyButtonClicked: EventEmitter<string>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  handleCalciteInputInput(event: CalciteInputCustomEvent<void>): void;
  onCopyButtonClick(): void;
  renderCopyButton(buttonText: string, icon?: string, slot?: string): HTMLElement;
  render(): any;
}
