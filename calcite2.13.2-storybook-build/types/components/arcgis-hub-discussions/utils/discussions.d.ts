import { IChannel, IHubContent, IHubRequestOptions } from '@esri/hub-common';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IPost } from '@esri/hub-discussions';
import { Geometry, Feature, FeatureCollection, GeometryCollection } from 'geojson';
import { IRequestOptions } from '@esri/arcgis-rest-request';
/**
 * Max post and reply title length
 */
export declare const MAX_TITLE_LENGTH = 50;
/**
 * Max post and reply body length
 */
export declare const MAX_BODY_LENGTH = 512;
/**
 * Warning post and reply body lengh
 */
export declare const WARNING_BODY_LENGTH: number;
/**
 * An interface representing a component view configuration
 */
export interface IViewConfig {
  render(): HTMLElement | HTMLElement[];
  heading?: string;
  summary?: string;
  back?(): void;
}
/**
 * An interface representing a post's related feature details
 */
export interface IPostRelatedFeatureDetails {
  postId: string;
  objectId: string;
  feature: Feature;
}
export declare const fetchAndTransformFeature: (...args: any[]) => Promise<any>;
/**
 * Fetches related feature data
 * @param url
 * @param relatedFeatureIds
 * @returns a Feature array
 */
export declare function fetchRelatedFeatures(url: string, relatedFeatureIds: string[]): Promise<Feature[]>;
/**
 * Cache fetchContent call
 */
export declare const fetchContentFromCache: (...args: any[]) => Promise<IHubContent>;
/**
 * Converts IPost[] to GeoJSON Feature Collection
 * @param posts An array of IPost objects
 * @returns GeoJSON Feature Collection
 */
export declare function postsToFeatureCollection(posts: IPost[]): FeatureCollection;
/**
 * Pulls geometry from an IPost and returns array of geojson features
 * @param post An IPost object
 * @returns Array of GeoJSON Features
 */
export declare function postToFeatures(post: IPost): Feature[];
/**
 * Given an array of individual GeoJSON Features, will return geometry collection
 * if number of valid features with geometry > 1, else returns single geometry
 * @param features An array of GeoJSON features
 * @returns Geometry Collection or Geometry if only single valid feature
 */
export declare function featuresToGeometryCollection(features: Feature[]): Geometry | GeometryCollection;
/**
 * Create discussion URI given existing discussion URI and additional spatial identifiers
 * @param discussion The original discussion URI
 * @param layerId
 * @param featureId
 * @returns Discussions URI assocaited with an individual feature
 */
export declare function augmentDiscussionURIWithFeature(discussion: string, layerId: string, featureIds: string[]): string;
/**
 * If discussion is associated with a feature, it will return the ID of the first feature
 * @param discussion Discussion URI
 * @returns ID of first feature for discussion
 */
export declare function pluckDiscussionFeatureIds(discussion: string): string[];
/**
 * Determines the base URI for an item.  Example: hub://content/3ef_1?attribute=species -> hub://content/3ef
 * @param discussion Discussion URI
 * @returns the base URI
 */
export declare function getBaseDiscussionURI(discussion: string): string;
/**
 * Determines if IHubContent layer displayField id valid.  A valid displayField
 * should not be empty or identical the objectId field.
 * @param content IHubContent
 * @returns True if IHubContent layer has valid displayField
 */
export declare const hasValidDisplayField: (content: IHubContent) => boolean;
/**
 * Details interface for requesting specific on map discussion view
 */
export interface IActiveMapDiscussionDetails {
  channelId: string;
  postId?: string;
  parentId?: string;
  locationId?: string;
}
/**
 * Takes a Geometry object and returns the type as a simple string
 * @param Geometry
 * @returns string
 */
export declare function convertGeometryTypeToTelemetryString({ type }: {
  type: string;
}): string;
interface IUpdateDiscussableOptions<T extends IHubContent | IGroup> extends IRequestOptions {
  subject: T;
  discussable: boolean;
}
/**
 * Updates the discussability of a subject (IHubContent or IGroup)
 * TODO: hoist to Hub.js
 * @param options An IUpdateDiscussableOptions object
 * @returns Promise that resolves IHubContent or IGroup
 */
export declare function updateDiscussable<T extends IHubContent | IGroup>(options: IUpdateDiscussableOptions<T>): Promise<T>;
export declare type IPostType = 'post' | 'reply';
export interface IPostDrawCreateDetails {
  post: IPost;
  postType: IPostType;
}
export declare function determineChannelOwner(channel: IChannel, channelGroups: IGroup[]): string | null;
export declare function getChannelName(channel: IChannel, channelGroups: IGroup[], fallback: string): string;
/**
 * Layout options available on Discussion Boards
 */
export declare type DiscussionsBoardLayout = 'grid' | 'list' | 'map';
/**
 * View options available on Discussion Boards
 */
export declare type DiscussionBoardView = 'about' | 'explore';
interface IDownloadPostCSVOptions {
  entityTitle: string;
  discussion?: string;
  channels?: string[];
  requestOptions: IHubRequestOptions;
}
interface IDownloadPostCSVStats {
  duration: number;
  count: number;
  size: number;
}
export declare function downloadPostCSV({ entityTitle, discussion, channels, requestOptions }: IDownloadPostCSVOptions): Promise<IDownloadPostCSVStats>;
export {};
