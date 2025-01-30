'use strict';

/**
 * To be used with combobox items; determines if a given combobox item is selected
 * @param node the combo box item (to possible check)
 * @param values the selected values in the greater combobox options
 * @param selectionMode the selection mode of the combobox (this determines if children's selection status determines the parent's selection status)
 * @returns whether or not the combo box item is selected
 */
function isComboboxItemSelected(node, values, selectionMode) {
    var _a;
    let isSelected = values.includes(node.value);
    // we only check if children are selected if the selectionMode is "ancestors"
    if (selectionMode === "ancestors") {
        isSelected =
            isSelected || // if this node is selected
                (!!((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) &&
                    // or any of its children are selected
                    node.children.some((child) => isComboboxItemSelected(child, values, selectionMode)));
    }
    return isSelected;
}

exports.isComboboxItemSelected = isComboboxItemSelected;
