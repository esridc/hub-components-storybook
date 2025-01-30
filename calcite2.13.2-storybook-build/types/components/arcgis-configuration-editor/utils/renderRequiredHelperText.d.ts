import { TranslationFunc } from "../resources";
import { IChangeEventDetail, IUiSchemaElement } from "@esri/hub-common";
import { ComponentIntl } from "../../../utils/stencil-intl";
/**
 * Renders the "*indicates required field" helper text for a given uiSchema element.
 * Can also render a custom required helper text if provided in the uiSchema.
 * @param uiSchema
 * @param t
 * @param intl
 * @returns
 */
export declare function renderRequiredHelperText(uiSchema: IUiSchemaElement, t: TranslationFunc, intl: ComponentIntl): HTMLElement;
/**
 * Determines if the current section should render required helper text
 * This is automated by checking if the current section has any required fields and is configured to render required helper text
 * The check for required fields in the section can be overriden by providing a custom requiredHelperText in the uiSchema.
 * @param model
 * @param uiSchema
 * @returns
 */
export declare function shouldRenderRequiredHelperText(model: IChangeEventDetail, uiSchema: IUiSchemaElement): boolean;
