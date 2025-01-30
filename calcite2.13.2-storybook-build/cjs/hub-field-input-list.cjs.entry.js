'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const resources = require('./resources-16262e22.js');
const isNil = require('./is-nil-e28a2884.js');
const util = require('./util-38e73510.js');
const mergeObjects = require('./merge-objects-b31af1a3.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const setProp = require('./set-prop-3de2437f.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./deep-set-49b373be.js');

/**
 * Returns the default schema for editing a list item.
 * @param options
 * @returns
 */
const getDefaultEditSchema = (options) => {
  const { maxLabelLength } = options;
  const labelOptions = {};
  if (maxLabelLength) {
    labelOptions.maxLength = maxLabelLength;
  }
  return {
    type: "object",
    required: ["label"],
    properties: {
      label: Object.assign({ type: "string" }, labelOptions),
    }
  };
};
/**
 * Returns the default uiSchema for editing a list item.
 * @param options
 * @returns
 */
const getDefaultEditUiSchema = (options) => {
  const { maxLabelLength, intl } = options;
  return {
    type: "Layout",
    elements: [
      {
        labelKey: "itemEditModal.fields.label.label",
        scope: "/properties/label",
        type: "Control",
        options: {
          messages: [
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              labelKey: "itemEditModal.fields.label.requiredMessage",
            },
            {
              type: "ERROR",
              keyword: "maxLength",
              icon: true,
              labelKey: intl.t("itemEditModal.fields.label.maxLengthMessage", { maxLength: maxLabelLength }),
            }
          ]
        }
      },
    ]
  };
};

const listCss = "calcite-list{background-color:var(--calcite-color-foreground-1)}calcite-button{margin-top:1rem}";

const SimpleList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Merges the new values of a list item with the existing list items.
     * @param listItemValues
     * @returns
     */
    this.mergeUpdatedItems = (listItemValues) => {
      let updatedItems = util.cloneObject(this._items);
      const itemIndex = updatedItems.findIndex(i => i.key === this._editingItemKey);
      // NOTE: this syntax might only allow scopeWrapperProps at top level of item....would need to be
      // adjusted to allow scopeWrapperProps that are deeper than top level if needed in the future.
      const values = this._scopeWrapperProp && !this._editProp ? listItemValues[this._scopeWrapperProp] : listItemValues;
      // 1. Remove case
      // if we received undefined or null values, we treat this as a remove action
      // thus we can allow removing from the edit experience
      // and so we remove this item from the list
      if (isNil.isNil(values)) {
        updatedItems = updatedItems.filter(item => item.key !== this._editingItemKey);
        this.closeEditingExperience();
      }
      // 2. Add new case
      // we couldn't find the item in the list, so we are adding it to the list instead
      else if (itemIndex === -1) {
        updatedItems.push(values);
        this._editingItemKey = values.key;
      }
      // 3. Edit case
      // if we have values, then we actually apply the changes and merge the item into the updated list
      else {
        if (this._scopeWrapperProp && !this._editProp) {
          mergeObjects.mergeObjects(values, updatedItems[itemIndex], Object.keys(listItemValues[this._scopeWrapperProp]));
        }
        else if (this._editProp) {
          mergeObjects.mergeObjects(values, updatedItems[itemIndex], [this._editProp]);
        }
        else {
          updatedItems[itemIndex] = values;
        }
      }
      return updatedItems;
    };
    /**
     * Closes the edit experience.
     */
    this.closeEditingExperience = (evt) => {
      if (evt) {
        evt.stopPropagation();
      }
      this.showEditExperience = false;
      this._editingItemKey = '';
    };
    /**
     * Renders a button that will let you add an item -- currently opens the edit schema with no values
     * @returns
     */
    this.renderAddItemButton = () => {
      return (index.h("calcite-button", { appearance: "outline", disabled: this._isDisabled, onClick: this.handleItemEdit, round: true }, this._addItemLabel));
    };
    this.params = undefined;
    this.showEditExperience = false;
    this._editingItemKey = '';
    context.bind(this, 'handleListReorder', 'toggleItemVisibility', 'handleItemEdit', 'handleEditApplied', 'handleItemRemove', 'renderListItem', 'translationFunction');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Used to translate strings in the editing experience.
   */
  translationFunction(key) {
    return this.intl.t(key);
  }
  /**
   * Returns the values hash to be used in the edit modal.
   * If the field has a custom edit prop, it will return an object with that prop as the key.
   */
  get _editValues() {
    // 1. grab the item we are editing from our list of items
    const itemToEdit = this._items.find(c => c.key === this._editingItemKey);
    // 2. if the values we want to edit are nested somewhere on the item, grab them
    const editValues = this._editProp ? getProp.getProp(itemToEdit, this._editProp) : itemToEdit;
    // 3. if we want to wrap our values in a different key so that it aligns with the schema/if we are leveraging the edit prop, we do so
    const valuesObject = (this._scopeWrapperProp) ? { [this._scopeWrapperProp]: editValues } : editValues;
    return valuesObject || {};
  }
  /**
   * The label of the item being edited.
   */
  get _editLabel() {
    const itemToEdit = this._items.find(c => c.key === this._editingItemKey);
    return (itemToEdit === null || itemToEdit === void 0 ? void 0 : itemToEdit.label) || getWithDefault.getWithDefault(this.params, 'uiSchema.options.defaultEditLabel', '');
  }
  /**
   * The label for the add item button, if rendered. Defaults to "Add item".
   */
  get _addItemLabel() {
    return getWithDefault.getWithDefault(this.params, 'uiSchema.options.addItemLabel', this.intl.t("addItem"));
  }
  /**
   * The prop to use for editing the list item, if any was passed in.
   */
  get _editProp() {
    return getProp.getProp(this.params, "uiSchema.options.editProp");
  }
  /**
   * Optional scope prop to wrap the values in. This is so that the list edit schema
   * can leverage composite fields without needing to wrap them on the actual item.
   *
   * This defaults to the editProp if passed in.
   */
  get _scopeWrapperProp() {
    return getProp.getProp(this.params, "uiSchema.options.scopeWrapperProp") || getProp.getProp(this.params, "uiSchema.options.editProp");
  }
  /**
   * The edit mode for the list field.
   */
  get _editMode() {
    return getProp.getProp(this.params, "uiSchema.options.editMode") || resources.ListEditModeTypes.MODAL;
  }
  /**
   * The icon to use for the edit action.
   */
  get _editActionIcon() {
    return {
      [resources.ListEditModeTypes.FLOW]: 'chevron-right',
      [resources.ListEditModeTypes.MODAL]: 'pencil'
    }[this._editMode] || 'pencil';
  }
  /**
   * The target element for the flow experience.
   * This returns a reference to a calcite-flow element elsewhere in the DOM
   * by calling the flowTarget callback provided in the uiSchema.
   * and should be used if the list editing experience is the 3rd stage or later in the flow.
   */
  get _flowTarget() {
    let flowTarget;
    // grab the callback from the uiSchema
    const flowTargetCallback = getProp.getProp(this.params, "uiSchema.options.calciteFlowRefCallback");
    // if the callback exists, call it to get the flow target
    if (flowTargetCallback) {
      flowTarget = flowTargetCallback();
    }
    return flowTarget;
  }
  /**
   * Determines if the list field is disabled.
   */
  get _isDisabled() {
    var _a;
    return !!((_a = this.params) === null || _a === void 0 ? void 0 : _a.disabled);
  }
  /**
   * Determines if the list items can be hidden.
   */
  get _allowHide() {
    return !this._isDisabled && !!getProp.getProp(this.params, 'uiSchema.options.allowHide');
  }
  /**
   * An optional prop to use to give a different path for where the hidden value should be stored.
   * This is useful if the list item has a hidden prop that is not at the top level, or is at the top level
   * but the rest of the list item values are stored within an editProp or scopeWrapperProp.
   */
  get _hiddenEditProp() {
    return getProp.getProp(this.params, 'uiSchema.options.hiddenEditProp');
  }
  /**
   * Determines if the list items can be reordered.
   */
  get _allowReorder() {
    return !this._isDisabled && !!getProp.getProp(this.params, 'uiSchema.options.allowReorder');
  }
  /**
   * Determines if the list items can be edited.
   */
  get _allowEdit() {
    return !this._isDisabled && !!getProp.getProp(this.params, 'uiSchema.options.allowEdit');
  }
  /**
   * Determines if the list items can be removed.
   */
  get _allowRemove() {
    return !this._isDisabled && !!getProp.getProp(this.params, 'uiSchema.options.allowRemove');
  }
  /**
   * Determines if new list items can be added
   */
  get _allowAdd() {
    return !this._isDisabled && !!getProp.getProp(this.params, 'uiSchema.options.allowAdd');
  }
  /**
   * The telemetry event to fire when adding an item, if any
   */
  get _addItemTelemetry() {
    return getProp.getProp(this.params, 'uiSchema.options.addItemTelemetry');
  }
  /**
   * The list items to be rendered.
   */
  get _items() {
    var _a;
    return ((_a = this.params) === null || _a === void 0 ? void 0 : _a.value) || [];
  }
  /**
   * The edit schema for each list item.
   * This can be the default schema or a custom schema passed in via the uiSchema.
   */
  get _editSchema() {
    return getProp.getProp(this.params, "uiSchema.options.editSchema") || getDefaultEditSchema({ maxLabelLength: getProp.getProp(this.params, 'uiSchema.options.maxLabelLength') });
  }
  /**
   * The edit uiSchema for each list item.
   * This can be the default uiSchema or a custom uiSchema passed in via the uiSchema.
   */
  get _editUiSchema() {
    return getProp.getProp(this.params, "uiSchema.options.editUiSchema") || getDefaultEditUiSchema({ maxLabelLength: getProp.getProp(this.params, 'uiSchema.options.maxLabelLength'), intl: this.intl });
  }
  /**
   * Determines if, for a given list item, the item is hidden.
   *
   * If the list field has an edit prop, it will check item[this._hidden].hidden.
   * Otherwise, it will check the hidden prop directly on the top-level of the item.
   * @param item
   * @returns
   */
  _isItemHidden(item) {
    let isHidden = item.hidden;
    if (this._hiddenEditProp) {
      const itemToEdit = this._items.find(c => c.key === item.key);
      const editValues = getProp.getProp(itemToEdit, this._hiddenEditProp) || {};
      isHidden = editValues.hidden;
    }
    return isHidden;
  }
  /**
   * Handles the reorder list event and emits the list with the new order.
   * @param event
   */
  handleListReorder(event) {
    const { newIndex, oldIndex } = event.detail;
    // create new list with reordered items
    const reorderedItems = util.cloneObject(this._items);
    const [toMove] = reorderedItems.splice(oldIndex, 1);
    reorderedItems.splice(newIndex, 0, toMove);
    this.arcgisConfigurationEditorFieldInputChange.emit(reorderedItems);
  }
  /**
   * Toggles the selected items visibility, changing the .hidden value.
   * @param event
   */
  toggleItemVisibility(event) {
    event.stopPropagation();
    const key = event.target.dataset.key;
    const updatedItems = util.cloneObject(this._items);
    const itemToToggle = updatedItems.find(item => item.key === key);
    // if we have an hiddenEdit prop for where to store the hidden value, we set the hidden value onto that prop
    if (this._hiddenEditProp) {
      setProp.setProp(`${this._hiddenEditProp}.hidden`, !getProp.getProp(itemToToggle, `${this._hiddenEditProp}.hidden`), itemToToggle);
    }
    // else we set it at top level
    else {
      itemToToggle.hidden = !itemToToggle.hidden;
    }
    this.arcgisConfigurationEditorFieldInputChange.emit(updatedItems);
  }
  /**
   * Handles removing an item from the list.
   * @param event
   */
  handleItemRemove(event) {
    const key = event.target.dataset.key;
    const updatedItems = util.cloneObject(this._items).filter(item => item.key !== key);
    this.arcgisConfigurationEditorFieldInputChange.emit(updatedItems);
  }
  /**
   * Saves the currently edited item's key in state
   * and opens the editing experience.
   *
   * If there is no key, we are adding a new item.
   * @param event
   */
  handleItemEdit(event) {
    var _a, _b;
    const key = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.key;
    this._editingItemKey = key;
    this.showEditExperience = true;
    // if no key, fire telemetry if we have it
    if (!key && this._addItemTelemetry) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, this._addItemTelemetry), { count: this._items.length }));
    }
  }
  /**
   * Handles editor changes and applies the changes to the list items.
   *
   * Note that for the modal experience, these changes are only applied when the editor clicks save.
   * For the flow experience, these changes are applied immediately.
   * @param event
   */
  handleEditApplied(event) {
    var _a;
    event.preventDefault();
    // merge the updated items with the existing items -- in case we are receiving from a composite field,
    // we have to check event.details.values
    const updatedItems = this.mergeUpdatedItems(((_a = event.detail) === null || _a === void 0 ? void 0 : _a.values) || event.detail);
    // emit the updated items
    this.arcgisConfigurationEditorFieldInputChange.emit(updatedItems);
    // if we are in modal mode, close the edit experience
    if (this._editMode === resources.ListEditModeTypes.MODAL) {
      this.closeEditingExperience();
    }
  }
  /**
   * Renders the edit experience with the configuration form in a modal.
   * @returns
   */
  renderItemEditModal() {
    return index.h("arcgis-wormhole", null, index.h("arcgis-configuration-form", { isOpen: this.showEditExperience, layout: "modal", messageOverrides: { save: this.intl.t('itemEditModal.apply') }, onArcgisConfigurationFormModalClosed: this.closeEditingExperience, onArcgisConfigurationFormSaved: this.handleEditApplied, scale: this.params.scale, schema: this._editSchema, t: this.translationFunction, uiSchema: this._editUiSchema, values: this._editValues, variant: getProp.getProp(this.params, "uiSchema.options.variant") }, this.showEditExperience && index.h("div", { slot: "header" }, this.intl.t('editItem', { itemLabel: this._editLabel }))));
  }
  /**
   * Renders the configuration editor editing experience for an item.
   * This is done inline with the configuration editor, so changes can be made directly to the item.
   * @returns
   */
  renderItemEditInline() {
    return index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditApplied, schema: this._editSchema, t: this.translationFunction, uiSchema: this._editUiSchema, values: this._editValues, variant: getProp.getProp(this.params, "uiSchema.options.variant") });
  }
  /**
   * Renders a single calcite-list-item.
   * @param item
   * @returns
   */
  renderListItem(item) {
    return index.h("calcite-list-item", { closable: this._allowRemove, "data-key": item.key, description: item.description, disabled: this._isDisabled, key: item.key, label: item.label, onCalciteListItemClose: this.handleItemRemove, onClick: this.handleItemEdit, selected: this._allowHide && !this._isItemHidden(item) }, this._allowHide && (index.h("calcite-action", { "data-key": item.key, icon: this._isItemHidden(item) ? 'view-hide' : 'view-visible', onClick: this.toggleItemVisibility, scale: this.params.scale, slot: "actions-start", text: this.intl.t(this._isItemHidden(item) ? 'showItem' : 'hideItem', { itemLabel: item.label }) })), this._allowEdit && (index.h("calcite-action", { "data-key": item.key, icon: this._editActionIcon, onClick: this.handleItemEdit, scale: this.params.scale, slot: "actions-end", text: this.intl.t('editItem', { itemLabel: item.label }) })));
  }
  /**
   * Renders the calcite-list component.
   * @returns
   */
  renderList() {
    return (index.h("calcite-list", { dragEnabled: this._allowReorder, onCalciteListOrderChange: this.handleListReorder, scale: this.params.scale }, this._items.map(this.renderListItem), this._allowAdd && this.renderAddItemButton()));
  }
  /**
   * This renders the flow experience for editing list items,
   * but it is wormholed to a target element in the DOM. This is useful for
   * when a calcite-flow is not the direct parent of the list field, i.e. the list item editing
   * experience would be the 3rd depth level or greater in the flow.
   * @returns
   */
  renderWormholedEditFlowList() {
    return (index.h(index.Fragment, null, index.h("calcite-flow-item", null, this.renderList()), (this.showEditExperience && this._flowTarget) &&
      index.h("arcgis-wormhole", { includeWormholeElement: false, target: this._flowTarget }, index.h("calcite-flow-item", { description: this._editLabel, heading: getProp.getProp(this.params, "uiSchema.options.flowTitle"), onCalciteFlowItemBack: this.closeEditingExperience }, this.renderItemEditInline()))));
  }
  /**
   * Renders the list with the edit flow experience.
   * This renders a calcite-flow with the list and the edit experience,
   * so the editing experience is the top-level in the flow experience.
   * @returns
   */
  renderEditFlowList() {
    return (index.h("calcite-flow", null, index.h("calcite-flow-item", null, this.renderList()), this.showEditExperience &&
      index.h("calcite-flow-item", { heading: this._editLabel, onCalciteFlowItemBack: this.closeEditingExperience }, this.renderItemEditInline())));
  }
  /**
   * Renders the list with the edit modal experience.
   * @returns
   */
  renderEditModalList() {
    return index.h(index.Fragment, null, this.renderItemEditModal(), this.renderList());
  }
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
  renderListField() {
    switch (this._editMode) {
      case resources.ListEditModeTypes.FLOW:
        return this._flowTarget ? this.renderWormholedEditFlowList() : this.renderEditFlowList();
      case resources.ListEditModeTypes.MODAL:
        return this.renderEditModalList();
      default:
        return this.renderEditModalList();
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "list-field" }, this.renderListField()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
SimpleList.style = listCss;

exports.hub_field_input_list = SimpleList;
