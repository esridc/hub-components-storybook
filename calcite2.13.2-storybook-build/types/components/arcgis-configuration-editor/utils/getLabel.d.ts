import { TranslationFunc } from "../resources";
import { IUiSchemaElement } from "@esri/hub-common";
/**
 * function to return the translated value of uiSchema element.
 * If a translation function or labelKey are not provided, we fall
 * back to the provided label
 */
export declare const getLabel: (uiSchemaElement: IUiSchemaElement, t: TranslationFunc, propertyPath?: string) => string;
