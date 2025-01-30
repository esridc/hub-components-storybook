import { isComboboxItemSelected } from "@esri/hub-common";
import { getLabel } from "../arcgis-configuration-editor/utils";
import { h } from "@stencil/core";
export const CalciteComboboxItems = ({ items, values, selectionMode, translationFunc, onCalciteComboboxItemChange, }) => {
  // used for both the aria-label and the visibile heading
  const label = (child) => {
    return getLabel(child, translationFunc) || child.value;
  };
  return items.map((child) => {
    var _a;
    return (h("calcite-combobox-item", { heading: label(child), icon: child.icon, key: child.value, label: label(child), onCalciteComboboxItemChange: onCalciteComboboxItemChange, selected: isComboboxItemSelected(child, values, selectionMode),
      // textLabel is deprecated, but also required by calcite in v2.12.1
      textLabel: label(child), value: child.value }, !!((_a = child.children) === null || _a === void 0 ? void 0 : _a.length)
      && h(CalciteComboboxItems, { items: child.children, onCalciteComboboxItemChange: onCalciteComboboxItemChange, selectionMode: selectionMode, translationFunc: translationFunc, values: values })));
  });
};
