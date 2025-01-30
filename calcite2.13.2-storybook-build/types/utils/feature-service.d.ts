import { HubEntity, IArcGISContext } from "@esri/hub-common";
import { IField } from "@esri/arcgis-rest-feature-layer";
import { FieldType } from '@esri/arcgis-rest-types';
/**
 * Fetches the feature service url of an item from its itemId.
 */
export declare function getFeatureServiceAsEntity(itemId: string, context: IArcGISContext): Promise<HubEntity>;
export declare function getFeatureService(url: string, context: IArcGISContext): Promise<any>;
/**
 * Fetches the fields of a layer given the base feature service url and the layer id.
 * @param url Feature service url
 * @param layerId Layer id of the feature service targeted
 * @param context
 * @returns Array of IField
 */
export declare function getFieldsFromLayer(url: string, context: IArcGISContext, layerId: string): Promise<IField[]>;
/**
 * Converts a field type into its respective icon string to display.
 */
export declare function getIconForFieldType(type: string): string;
export declare const NUMERIC_FIELD_TYPES: FieldType[];
