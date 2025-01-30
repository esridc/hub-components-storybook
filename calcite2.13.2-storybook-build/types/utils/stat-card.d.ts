import { HubEntity } from "@esri/hub-common";
export declare const STAT_CARD_SCHEMA_VERSION = 1;
export declare function migrateSummaryStatCardSettings(settings: Record<string, any>, entity: HubEntity): Record<string, any>;
/**
 * Cretes the dynamic source link from the item
 * using the site relative link and the layerId if we have it.
 * @param linkBase
 * @param layerId
 * @returns
 */
export declare function createDynamicSourceLink(linkBase: string, layerId: string): string;
