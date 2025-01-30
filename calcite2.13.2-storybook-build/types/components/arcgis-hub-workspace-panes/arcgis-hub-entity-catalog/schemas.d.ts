import { IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { ICatalogBuilderUiSchemaOptions } from "./resources";
/**
 * The Schema for the catalog definition builder field
 */
export declare const catalogBuilderSchema: IConfigurationSchema;
/**
 * Builds and returns the uischema for the catalog definition builder field
 * @param options
 * @returns
 */
export declare const getCatalogBuilderUiSchema: (options: ICatalogBuilderUiSchemaOptions) => IUiSchema;
