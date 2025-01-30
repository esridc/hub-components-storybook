import { h } from "@stencil/core";
import { getLabel } from "./index";
/**
 * Renders the "*indicates required field" helper text for a given uiSchema element.
 * Can also render a custom required helper text if provided in the uiSchema.
 * @param uiSchema
 * @param t
 * @param intl
 * @returns
 */
export function renderRequiredHelperText(uiSchema, t, intl) {
  const helperText = getLabel(uiSchema, t, 'options.requiredHelperText') || intl.t("defaultRequiredHelperText");
  return h("calcite-input-message", { class: "helper-text" }, " ", h("div", { innerHTML: helperText }), " ");
}
/**
 * Determines if the current section should render required helper text
 * This is automated by checking if the current section has any required fields and is configured to render required helper text
 * The check for required fields in the section can be overriden by providing a custom requiredHelperText in the uiSchema.
 * @param model
 * @param uiSchema
 * @returns
 */
export function shouldRenderRequiredHelperText(model, uiSchema) {
  var _a, _b, _c;
  const requiredFields = model === null || model === void 0 ? void 0 : model.required;
  const sectionFields = (_a = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.options) === null || _a === void 0 ? void 0 : _a.sectionScopes;
  const hasRequiredFields = sectionFields === null || sectionFields === void 0 ? void 0 : sectionFields.some((field) => requiredFields === null || requiredFields === void 0 ? void 0 : requiredFields.has(field));
  return (!!hasRequiredFields && !!((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.requiredHelperText)) || typeof ((_c = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.options) === null || _c === void 0 ? void 0 : _c.requiredHelperText) == "object";
}
