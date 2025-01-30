import { IConfigurationSchema, IUiSchema } from "@esri/hub-common";
export declare const buildLocationSchema: (opts: {
  hasNoGeometries: boolean;
  locationNameRequired: boolean;
}) => IConfigurationSchema;
export declare const buildLocationUiSchema: (opts: {
  hasNoGeometries: boolean;
}) => IUiSchema;
