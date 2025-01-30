import { HubEntity, IArcGISContext } from "@esri/hub-common";
import { ITypeSpecificViewDefinition } from "./types";
/** type-specific about view components */
export declare const ABOUT_VIEWS: ITypeSpecificViewDefinition[];
/** type-specific hero components */
export declare const HERO_VIEWS: ITypeSpecificViewDefinition[];
/** type-specific view components */
export declare const getTypeSpecificViewConfigs: (entity: HubEntity, context: IArcGISContext) => Promise<ITypeSpecificViewDefinition[]>;
