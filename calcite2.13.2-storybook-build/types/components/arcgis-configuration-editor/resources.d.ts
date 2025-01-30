import { JSONSchemaTypeName } from 'json-schema-typed';
import { ErrorObject } from 'ajv';
import { IConfigurationSchema, IConfigurationValues } from '@esri/hub-common';
export { JSONSchema, JSONSchemaTypeName } from 'json-schema-typed';
export declare type TranslationFunc = (key: any, values?: any, opts?: any) => string;
/**
 * mapping of schema types to default values. We need to use these defaults
 * when validating uiSchema rules and setting initial field values
 */
export declare const SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE: Record<JSONSchemaTypeName, any>;
export declare enum CONFIGURATION_VARIANTS {
  workspace = "variant-workspace",
  layoutEditor = "variant-layout-editor"
}
export interface IValidationResult {
  valid: boolean;
  errors?: ErrorObject[];
}
export interface IConfigurationModel {
  schema: IConfigurationSchema;
  values: IConfigurationValues;
  valid: boolean;
}
