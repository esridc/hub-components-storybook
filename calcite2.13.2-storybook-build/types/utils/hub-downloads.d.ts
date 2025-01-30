/// <reference types="arcgis-js-api" />
import { DownloadCacheStatus, DownloadOperationStatus, IHubEditableContent, ServiceDownloadFormat } from "@esri/hub-common";
/**
 * Standardized event emitted to request a download operation.
 */
export interface IArcgisHubDownloadRequestEvent {
  jobId: string;
  entity: IHubEditableContent;
  format: ServiceDownloadFormat;
  layers?: number[];
  geometry?: __esri.Geometry;
  where?: string;
  updateCache?: boolean;
}
/**
 * Standardized event emitted to update the status of a download operation.
 */
export interface IArcgisHubDownloadUpdateEvent {
  jobId: string;
  status: DownloadOperationStatus;
  cacheStatus?: DownloadCacheStatus;
  progress?: number;
  error?: string;
}
/**
 * Downloads a file from a static URL.
 * @param url URL to download file from
 */
export declare function downloadFileFromUrl(url: string): void;
/**
 * Downloads a blob to the browser.
 *
 * @param blob blob to download
 * @param filename name and extension of the file to download (e.g. "my-file.csv")
 */
export declare function downloadFileFromBlob(blob: Blob, filename: string): void;
/**
 * Options for generating a unique download job ID.
 */
export interface IGetDownloadJobIdOptions {
  itemId: string;
  format: ServiceDownloadFormat;
  layers?: number[];
  geometry?: __esri.Geometry;
  where?: string;
  updateCache?: boolean;
}
/**
 * Generates a unique identifier hash for a download job based on the provided options
 *
 * @param options Options to generate the job ID from
 * @returns a unique jobId
 */
export declare function calculateDownloadJobId(options: IGetDownloadJobIdOptions): Promise<string>;
/**
 * Translates a download format to a human-readable name for telemetry reporting.
 * @param format format of the download
 * @returns common name for the format in a telemetry report
 */
export declare function getTelemetryFormatName(format: ServiceDownloadFormat): string;
/**
 * Returns the telemetry details for a successful download operation.
 * @param entity entity that was downloaded
 * @param fromCache whether the download was served from the cache
 * @returns the correct telemetry details string
 */
export declare function getDownloadSuccessTelemetryDetails(entity: IHubEditableContent, fromCache?: boolean): string;
