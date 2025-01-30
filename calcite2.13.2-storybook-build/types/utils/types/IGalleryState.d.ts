import { ISortOption } from '@esri/hub-common';
import { IFacet } from './IFacet';
import { LayoutOptions } from './ILayoutButtonOptions';
/**
 * Serialization of the state of a gallery into a hash that can be
 * converted into url parameters
 */
export declare type ISerializedGalleryState = {
  term?: string;
  sort?: string;
  layout?: LayoutOptions;
  isInitialization?: boolean;
} & {
  [key: string]: string;
};
/**
 * Internal state of the Gallery
 * combines all the core properties into a single structure
 * that we can then serialize for use in url params etc
 */
export interface IGalleryState {
  term: string;
  sort: ISortOption;
  facets: IFacet[];
  layout: LayoutOptions;
}
/**
 *
 */
export interface IFacetState {
  [key: string]: string;
}
