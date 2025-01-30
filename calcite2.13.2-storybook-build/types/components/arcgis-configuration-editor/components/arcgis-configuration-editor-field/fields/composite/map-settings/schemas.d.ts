import { IConfigurationSchema, IUiSchema } from "@esri/hub-common";
import { IMapSettingsUiSchemaOpts } from "./resources";
export declare const MAP_SETTINGS_SCHEMA: IConfigurationSchema;
export declare const buildMapSettingsUiSchema: (opts?: IMapSettingsUiSchemaOpts) => IUiSchema;
