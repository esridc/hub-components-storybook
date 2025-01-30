import { IItem, IExtent } from '@esri/arcgis-rest-types';
import { IHubContent, IHubRequestOptions } from '@esri/hub-common';
export interface IBoundaryPickerSource {
  /** A unique value */
  value: string;
  /** The text that appears in the pick list */
  label?: string;
  /** ArcGIS JavaScript API graphic object will be shown on the map when this source is selected */
  graphic?: any;
  /** Whether or not this source is selected initially */
  selected?: boolean;
}
export declare const getItemExtent: (item: IItem) => IExtent;
/**
 * Given a content generate an array of sources to use with arcgis-boundary-picker-ui
 * @param content
 * @returns
 */
export declare const getContentBoundarySources: (content?: IHubContent) => IBoundaryPickerSource[];
/**
 * Update a content's boundary
 *
 * @param item
 * @param boundary
 * @param requestOptions
 * @returns
 */
export declare const updateContentBoundary: (content: IHubContent, source: IBoundaryPickerSource, requestOptions: IHubRequestOptions) => Promise<IHubContent>;
