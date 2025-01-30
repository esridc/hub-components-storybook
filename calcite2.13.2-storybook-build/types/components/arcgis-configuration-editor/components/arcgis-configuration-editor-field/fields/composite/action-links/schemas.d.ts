import { IConfigurationSchema, IUiSchema, IUiSchemaComboboxItem } from "@esri/hub-common";
import { ILinkUiSchemaOptions, _IActionLink } from "./types";
export declare const LINK_SCHEMA: IConfigurationSchema;
export declare const buildLinkUiSchema: (opts: ILinkUiSchemaOptions) => IUiSchema;
export declare const getSectionItems: (links: _IActionLink[]) => IUiSchemaComboboxItem[];
export declare const SECITON_SCHEMA: IConfigurationSchema;
export declare const SECTION_UI_SCHEMA: IUiSchema;
