import { IConfigurationSchema, IUiSchema } from "@esri/hub-common";
/**
 * Returns the default schema for editing a list item.
 * @param options
 * @returns
 */
export declare const getDefaultEditSchema: (options: Record<string, any>) => IConfigurationSchema;
/**
 * Returns the default uiSchema for editing a list item.
 * @param options
 * @returns
 */
export declare const getDefaultEditUiSchema: (options: Record<string, any>) => IUiSchema;
export declare const EDIT_UI_SCHEMA: IUiSchema;
