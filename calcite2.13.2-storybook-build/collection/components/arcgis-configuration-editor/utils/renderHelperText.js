import { h } from "@stencil/core";
import { getLabel } from "./index";
/**
 * Renders the helper text for a given uiSchemaElement
 * @param uiSchemaElement
 * @param t
 * @returns
 */
export function renderHelperText(uiSchemaElement, t) {
  const helperText = getLabel(uiSchemaElement, t, 'options.helperText');
  return h("calcite-input-message", { class: "helper-text" }, " ", h("div", { innerHTML: helperText }), " ");
}
