import { IEmbedUiSchemaOpts } from "./resources";
import { EmbedKind, IConfigurationSchema, IUiSchema } from "@esri/hub-common";
export declare const EMBED_PROPERTY_MAP: Record<EmbedKind, string[]>;
export declare const embedProperties: string[];
export declare const buildEmbedSchema: () => IConfigurationSchema;
export declare const buildEmbedUiSchema: (opts: IEmbedUiSchemaOpts) => IUiSchema;
