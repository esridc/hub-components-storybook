import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
import { CalciteComboboxCustomEvent, CalciteComboboxItemCustomEvent } from '@esri/calcite-components';
import { ComponentIntl } from '../../../../../../utils/stencil-intl';
import { IUiSchemaComboboxItem } from '@esri/hub-common';
import { ComboboxSelectionMode } from './types';
/**
 * The Combobox component renders a list of items in a calcite combobox
 * as calcite combobox items. Users have the option to allow entries of custom values
 * with the allowCustomValues option. They may also specify the selection mode of the combobox
 * with the selectionMode option(single, multiple or ancestors).
 * The Combobox works for both pre-defined/static and dynamic options.
 * For pre-defined/static option, an enum is provided in the schema,
 * all items in uiSchema.options.items will be rendered in the combobox.
 * For dynamic option, an enum is not provided in the schema,
 * items in uiSchema.options.items that are not defined in schema.items will be ignored.
 * NOTE, if an enum is provided in the schema, allowCustomValues will also be ignored.
 */
export declare class Combobox {
  element: HTMLElement;
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string | string[]>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Easy flag for whether or not the combobox is in single select mode
   */
  get _isSingleSelect(): boolean;
  /**
   * The selection mode of the combobox
   */
  get _selectionMode(): ComboboxSelectionMode;
  /**
  * The items to render in the combobox
  */
  get _items(): IUiSchemaComboboxItem[];
  /**
   * Get the enum  from the schema, which can dictate which items are actually rendered
   */
  get _schemaEnum(): string[];
  /**
   * Fires each time a selection is changed in the combobox
   * @param evt
   */
  handleCalciteComboboxChange(evt: CalciteComboboxCustomEvent<void>): void;
  /**
   * Fires each time an item is selected or deselected in the combobox.
   * This event will propogate up to then call calciteComboboxChange event.
   * @param evt
   */
  handleCalciteComboboxItemChange: (evt: CalciteComboboxItemCustomEvent<void>) => void;
  /**
   * Render the combobox items. If an enum is provided in the schema,
   * only render items in the uiSchema that match those items in the enum.
   * If no item is provided in the uiSchema, render the items
   * in the enum in the schema.
   */
  renderComboboxItems(): HTMLElement;
  render(): any;
}
