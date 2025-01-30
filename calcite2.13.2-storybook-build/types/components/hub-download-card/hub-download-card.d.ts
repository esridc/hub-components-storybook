import { EventEmitter as StencilEventEmitter } from "../../stencil-public-runtime";
import EventEmitter from 'eventemitter3';
import { UserSession } from '@esri/arcgis-rest-auth';
import { DownloadFormat, DownloadTarget, IDownloadMetadataResults, IPoller } from '@esri/hub-downloads';
interface IMetadata extends IDownloadMetadataResults {
  jobId?: string;
  exportCreated?: number;
  errors?: Array<Error>;
}
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead. This component will be removed once the new component is fully tested and ready for production.
 */
export declare class HubDownloadCard {
  loading: boolean;
  metadata: IMetadata;
  exportRequested: boolean;
  apiError: any;
  dateTimeFormatter: Intl.DateTimeFormat;
  intl: any;
  labels: any;
  contentLengthString: string;
  pollingEvent: EventEmitter;
  authentication: UserSession;
  poller: IPoller;
  /**
   * Host for download API.
   */
  host: string;
  /**
   * The dataset ID.
   */
  datasetId: string;
  /**
   * The file format for the download. Must be one of: `Shapefile`, `File Geodatabase`, `CSV`, `KML`, `GeoJson`, `Excel`, `Feature Collection`, `Scene Package`.
   */
  format: DownloadFormat;
  /**
   * Name/title for the download card.
   */
  name: string;
  /**
   * API target for download requests. Public/Opendata downloads target `hub` (default), private downloads target 'portal', and Enterprise downloads target `enterprise`.
   */
  target: DownloadTarget;
  /**
   * The well-known identifier of the coordinate system for the download data. Optional. For Hub API downloads, it must be either 4326 or the dataset's native coordinate system.
   */
  spatialRefId: string;
  /**
   * A SQL style attribute filter. Optional. Example: `color='red'`.
   */
  where: string;
  /**
   * A Geoservices envelope filter. Optional. Example: `{"xmin":-77.0036,"ymin":38.8879,"xmax":-76.98434,"ymax":38.90007,"spatialReference":{"wkid":4326}}`.
   */
  geometry: string;
  /**
   * A filename to assign to the download file. Only applies to private/Enterprise (Portal API) downloads. Optional.
   */
  filename: string;
  /**
   * Username of the currently logged in user. Only applies to private/Enterprise (Portal API) downloads.
   */
  username: string;
  /**
   * Valid token for the currently logged in user. Only applies to private/Enterprise (Portal API) downloads.
   */
  token: string;
  element: HTMLElement;
  hubTelemetry: StencilEventEmitter;
  hubDownloadCardSuccess: StencilEventEmitter;
  constructor();
  componentWillLoad(): Promise<void>;
  buildDownloadTelemetry({ isSuccess, isCached }?: {
    isSuccess?: boolean;
    isCached?: boolean;
  }): Record<string, string>;
  resetUndefinedProps(): void;
  setLocalization(): Promise<void>;
  setLabels(): void;
  setAuthentication(): void;
  setTranslations(): void;
  setContentLengthString(): void;
  watchHandler(): Promise<void>;
  disconnectedCallback(): Promise<void>;
  fetchMetadataAndSetState(): Promise<void>;
  getServiceParams(): {
    host: string;
    datasetId: string;
    format: "CSV" | "Shapefile" | "File Geodatabase" | "Feature Collection" | "Excel" | "KML" | "Scene Package" | "GeoJson";
    target: DownloadTarget;
    authentication: UserSession;
    spatialRefId: string;
  };
  poll(): void;
  download(): Promise<void | Window>;
  transferFile(url: any): void | Window;
  exportDataset(): Promise<void>;
  exportDatasetComplete(event: any): void | Window;
  exportDatasetError(event: any): void;
  exportPollingError(event: any): void;
  exportDatasetHandler(event: any): void;
  renderNotice(): any;
  exportInProgress(): boolean;
  downloadCached(): boolean;
  downloadUpToDate(): boolean;
  isFormatDownloadDisabled(): boolean;
  renderFileDescription(): HTMLElement[];
  exportDatasetKeyDown(event: KeyboardEvent): void;
  downloadKeyDown(event: KeyboardEvent): void;
  renderDownloadControl(): any;
  shouldUseDownloadButton(): boolean;
  shouldDisableDownload(): boolean;
  render(): any;
}
export {};
