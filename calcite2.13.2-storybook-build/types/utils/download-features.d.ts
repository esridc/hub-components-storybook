import { IAuthenticationManager, IRequestOptions } from '@esri/arcgis-rest-request';
import { IFeatureServiceDefinition, ISpatialReference } from '@esri/arcgis-rest-types';
import { EventEmitter } from '../stencil-public-runtime';
import { IArcGISContext } from '@esri/hub-common';
export interface IServerDefinition extends IFeatureServiceDefinition {
  supportedExportFormats?: string;
  url?: string;
}
export interface ILayerOptions {
  id: number;
  where?: string;
}
export declare type GeometryType = 'point' | 'multipoint' | 'polyline' | 'polygon' | 'extent';
export interface IGeometry {
  type: GeometryType;
  spatialReference: number | ISpatialReference;
  [key: string]: any;
}
export interface ILayerQueries {
  [layerId: number]: {
    queryOption: 'all' | 'useFilter';
    where?: string;
  };
}
export declare const FILE_FORMATS: readonly ["csv", "shapefile", "geojson", "filegdb", "featureCollection", "excel", "geoPackage", "sqlite", "json"];
export declare type FileFormat = typeof FILE_FORMATS[number];
export declare type EsriGeometryType = 'esriGeometryPoint' | 'esriGeometryMultipoint' | 'esriGeometryPolyline' | 'esriGeometryPolygon' | 'esriGeometryEnvelope';
export interface ICreateReplicaOptions {
  layers: string;
  dataFormat?: FileFormat;
  layerQueries?: ILayerQueries;
  geometry?: IGeometry;
  geometryType?: EsriGeometryType;
  inSR?: number | ISpatialReference;
  returnAttachments: boolean;
  returnAttachmentsDataByUrl: boolean;
  async: boolean;
  syncModel: 'none';
  targetType: 'client';
  syncDirection: 'bidirectional';
  attachmentsSyncDirection: 'bidirectional';
}
export declare type CreateReplicaStatus = 'Pending' | 'ProvisioningReplica' | 'InProgress' | 'ExportingData' | 'Completed' | 'Failed';
export interface ICreateReplicaStatusChangePayload {
  status: CreateReplicaStatus;
  recordCount: number;
}
export declare class CreateReplicaOptionsBuilder {
  private readonly _createReplicaOptions;
  constructor();
  layers(layers: string): CreateReplicaOptionsBuilder;
  dataFormat(dataFormat: FileFormat): CreateReplicaOptionsBuilder;
  geometry(geometry: IGeometry): CreateReplicaOptionsBuilder;
  layerQueries(layerQueries: ILayerQueries): CreateReplicaOptionsBuilder;
  build(): ICreateReplicaOptions;
}
export interface IGetDownloadUrlOptions extends IRequestOptions {
  serviceUrl: string;
  createReplicaOptions: ICreateReplicaOptions;
  statusChangeEvent: EventEmitter<ICreateReplicaStatusChangePayload>;
  pollTime?: number;
}
export declare function getDownloadUrlFromService(opts: IGetDownloadUrlOptions): Promise<string>;
export declare function getTotalRecordCount(serviceUrl: string, options: ICreateReplicaOptions, authentication: IAuthenticationManager): Promise<number>;
interface IStoreCreateReplicaErrorOptions {
  itemId: string;
  layers: string;
  jobId: string;
  format: string;
}
export declare function storeCreateReplicaError(hubUrl: string, opts: IStoreCreateReplicaErrorOptions): Promise<void>;
export declare const shouldRecordDownloadErrors: (appContext: IArcGISContext) => boolean;
export interface ITryAuthenticatedGetResponse {
  authRequired: boolean;
  response: any;
}
/**
 * Determines whether the specified url requires authentication and makes a get request.
 *
 * This function is particularly useful when interacting with feature
 * services, since there isn't another programmatic way to determine
 * whether a feature service is public or private
 *
 * @param url
 * @param requestOptions Pass-through to request(). Must include authentication.
 *
 * @returns {ITryAuthenticatedGetResponse}
 */
export declare function tryAuthenticatedGet(url: string, requestOptions: IRequestOptions): Promise<ITryAuthenticatedGetResponse>;
export declare const isString: (x: any) => boolean;
export declare const isNumberArray: (x: any) => boolean;
export declare const isILayerOptionsArray: (x: any) => boolean;
export declare const isAGORateLimitError: (error: any) => boolean;
export declare const fileFormatToDisplayName: (format: FileFormat) => string;
export {};
