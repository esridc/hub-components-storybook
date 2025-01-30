import { IConfigurationSchema, IUiSchema } from '@esri/hub-common';
export declare const buildSiteUrlEditorSchema: (opts?: {
  orgUrlKey?: string;
  envSuffix?: string;
}) => IConfigurationSchema;
export declare const buildSiteUrlEditorUiSchema: (opts?: {
  orgUrlKey?: string;
}) => IUiSchema;
