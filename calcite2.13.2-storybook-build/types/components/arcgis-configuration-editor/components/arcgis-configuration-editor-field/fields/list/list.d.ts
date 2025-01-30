import { EventEmitter, VNode } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
import { IConfigurationSchema, IConfigurationValues, IUiSchema } from '@esri/hub-common';
import { ListDragDetail } from '@esri/calcite-components';
import { ComponentIntl } from '../../../../../../utils/stencil-intl';
import { IListItem, ListEditModeTypes } from './resources';
/**
 * A list field that allows for reordering, hiding, editing, and removing list items.
 * Can be used as a standalone field or be consumed as part of a composite field
 */
export declare class SimpleList {
  element: HTMLElement;
  /**
   * Parameters passed from the editor.
   */
  params: IRenderParams;
  /**
   * Determines if the edit experience is open.
   */
  showEditExperience: boolean;
  /**
   * The key of the item being edited
   */
  _editingItemKey: string;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<IListItem[]>;
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Used to translate strings in the editing experience.
   */
  translationFunction(key: string): string;
  /**
   * Returns the values hash to be used in the edit modal.
   * If the field has a custom edit prop, it will return an object with that prop as the key.
   */
  get _editValues(): IConfigurationValues;
  /**
   * The label of the item being edited.
   */
  get _editLabel(): string;
  /**
   * The label for the add item button, if rendered. Defaults to "Add item".
   */
  get _addItemLabel(): string;
  /**
   * The prop to use for editing the list item, if any was passed in.
   */
  get _editProp(): string;
  /**
   * Optional scope prop to wrap the values in. This is so that the list edit schema
   * can leverage composite fields without needing to wrap them on the actual item.
   *
   * This defaults to the editProp if passed in.
   */
  get _scopeWrapperProp(): string;
  /**
   * The edit mode for the list field.
   */
  get _editMode(): ListEditModeTypes;
  /**
   * The icon to use for the edit action.
   */
  get _editActionIcon(): string;
  /**
   * The target element for the flow experience.
   * This returns a reference to a calcite-flow element elsewhere in the DOM
   * by calling the flowTarget callback provided in the uiSchema.
   * and should be used if the list editing experience is the 3rd stage or later in the flow.
   */
  get _flowTarget(): HTMLCalciteFlowElement;
  /**
   * Determines if the list field is disabled.
   */
  get _isDisabled(): boolean;
  /**
   * Determines if the list items can be hidden.
   */
  get _allowHide(): boolean;
  /**
   * An optional prop to use to give a different path for where the hidden value should be stored.
   * This is useful if the list item has a hidden prop that is not at the top level, or is at the top level
   * but the rest of the list item values are stored within an editProp or scopeWrapperProp.
   */
  get _hiddenEditProp(): string;
  /**
   * Determines if the list items can be reordered.
   */
  get _allowReorder(): boolean;
  /**
   * Determines if the list items can be edited.
   */
  get _allowEdit(): boolean;
  /**
   * Determines if the list items can be removed.
   */
  get _allowRemove(): boolean;
  /**
   * Determines if new list items can be added
   */
  get _allowAdd(): boolean;
  /**
   * The telemetry event to fire when adding an item, if any
   */
  get _addItemTelemetry(): any;
  /**
   * The list items to be rendered.
   */
  get _items(): IListItem[];
  /**
   * The edit schema for each list item.
   * This can be the default schema or a custom schema passed in via the uiSchema.
   */
  get _editSchema(): IConfigurationSchema;
  /**
   * The edit uiSchema for each list item.
   * This can be the default uiSchema or a custom uiSchema passed in via the uiSchema.
   */
  get _editUiSchema(): IUiSchema;
  /**
   * Determines if, for a given list item, the item is hidden.
   *
   * If the list field has an edit prop, it will check item[this._hidden].hidden.
   * Otherwise, it will check the hidden prop directly on the top-level of the item.
   * @param item
   * @returns
   */
  _isItemHidden(item: IListItem): boolean;
  /**
   * Handles the reorder list event and emits the list with the new order.
   * @param event
   */
  handleListReorder(event: CustomEvent<ListDragDetail>): void;
  /**
   * Toggles the selected items visibility, changing the .hidden value.
   * @param event
   */
  toggleItemVisibility(event: CustomEvent): void;
  /**
   * Handles removing an item from the list.
   * @param event
   */
  handleItemRemove(event: CustomEvent): void;
  /**
   * Saves the currently edited item's key in state
   * and opens the editing experience.
   *
   * If there is no key, we are adding a new item.
   * @param event
   */
  handleItemEdit(event: CustomEvent): void;
  /**
   * Merges the new values of a list item with the existing list items.
   * @param listItemValues
   * @returns
   */
  mergeUpdatedItems: (listItemValues: IListItem) => IListItem[];
  /**
   * Handles editor changes and applies the changes to the list items.
   *
   * Note that for the modal experience, these changes are only applied when the editor clicks save.
   * For the flow experience, these changes are applied immediately.
   * @param event
   */
  handleEditApplied(event: CustomEvent): void;
  /**
   * Closes the edit experience.
   */
  closeEditingExperience: (evt?: CustomEvent<MouseEvent>) => void;
  /**
   * Renders a button that will let you add an item -- currently opens the edit schema with no values
   * @returns
   */
  renderAddItemButton: () => HTMLCalciteButtonElement;
  /**
   * Renders the edit experience with the configuration form in a modal.
   * @returns
   */
  renderItemEditModal(): VNode;
  /**
   * Renders the configuration editor editing experience for an item.
   * This is done inline with the configuration editor, so changes can be made directly to the item.
   * @returns
   */
  renderItemEditInline(): VNode;
  /**
   * Renders a single calcite-list-item.
   * @param item
   * @returns
   */
  renderListItem(item: IListItem): VNode;
  /**
   * Renders the calcite-list component.
   * @returns
   */
  renderList(): VNode;
  /**
   * This renders the flow experience for editing list items,
   * but it is wormholed to a target element in the DOM. This is useful for
   * when a calcite-flow is not the direct parent of the list field, i.e. the list item editing
   * experience would be the 3rd depth level or greater in the flow.
   * @returns
   */
  renderWormholedEditFlowList(): VNode;
  /**
   * Renders the list with the edit flow experience.
   * This renders a calcite-flow with the list and the edit experience,
   * so the editing experience is the top-level in the flow experience.
   * @returns
   */
  renderEditFlowList(): VNode;
  /**
   * Renders the list with the edit modal experience.
   * @returns
   */
  renderEditModalList(): VNode;
  /**
   * Determines which list rendering method to use based on the edit mode.
   * If the edit mode is modal, the list will be rendered with the edit modal.
   *
   * If the edit mode is flow and a target to a calcite-flow in the DOM is provided,
   * the list will be rendered with the edit flow experience wormholed to the target.
   *
   * If the edit mode is flow and no target is provided, the list will be rendered with the edit flow experience.
   *
   * @returns
   */
  renderListField(): VNode;
  render(): any;
}
