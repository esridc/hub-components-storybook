import { IItem } from '@esri/arcgis-rest-portal';
import { IArcGISContext } from '@esri/hub-common';
/**
 * This file contains utility functions for building URLs
 * to the viewer for different types of items except for
 * maps and scenes
 */
export declare function forceHttps(url: string): string;
/**
 * Build the URL to the viewer hosted on AGO or portal for this type of item
 * @param item
 * @param context
 */
export declare function buildItemViewerUrl(item: IItem, context: IArcGISContext): string;
/**
 * Whether the url is valid
 *
 * @param {string} url Url to validate
 * @return {*}  {boolean}
 */
export declare function isUrl(url: string): boolean;
