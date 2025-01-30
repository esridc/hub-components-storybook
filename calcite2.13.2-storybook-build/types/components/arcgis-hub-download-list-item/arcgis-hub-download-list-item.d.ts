/// <reference types="arcgis-js-api" />
import { VNode, EventEmitter } from '../../stencil-public-runtime';
import { DownloadCacheStatus, DownloadOperationStatus, IHubEditableContent, ServiceDownloadFormat } from '@esri/hub-common';
import { IArcgisHubDownloadRequestEvent, IArcgisHubDownloadUpdateEvent } from '../../utils/hub-downloads';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubDownloadListItem {
  element: HTMLArcgisHubDownloadListItemElement;
  /**
   * The entity to download data from
   */
  entity: IHubEditableContent;
  /**
   * well-known format to download the data in
   */
  format: ServiceDownloadFormat;
  /**
   * list of layer ids that should be included in the download.
   */
  layerIds: number[];
  /**
   * Geometry to filter the download by.
   */
  geometry: __esri.Geometry;
  /**
   * Where clause to filter the download by.
   */
  where: string;
  /**
   * When provided, the download button will link to the
   * provided url instead of triggering a download request.
   */
  url: string;
  /**
   * Override for the header label.
   */
  headerLabel: string;
  /**
   * Override for the button label.
   */
  buttonLabel: string;
  /**
   * Icon to display at the start of the button.
   */
  buttonIconStart: string;
  /**
   * Icon to display at the end of the button.
   */
  buttonIconEnd: string;
  loading: boolean;
  /**
   * Progress of the download operation, represented as an integer between 0 and 100
   */
  progress: number;
  status: DownloadOperationStatus;
  error: string;
  cacheStatus: DownloadCacheStatus;
  showGenerateNewModal: boolean;
  /**
   * Standardized event to request a download operation from the <arcgis-hub-download-manager> component.
   */
  arcgisHubDownloadRequest: EventEmitter<IArcgisHubDownloadRequestEvent>;
  hubTelemetry: EventEmitter<any>;
  /**
   * Unique identifier for the download operation, generated from the entity and download options.
   * Used to track the progress of the download operation.
   */
  jobId: string;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * One-stop shop for defining the labels and icons for each supported download format.
   */
  get formatDisplayConfigs(): Record<ServiceDownloadFormat, {
    intlKey: string;
    icon?: string;
  }>;
  get _headerLabel(): string;
  get headerIcon(): string;
  get _buttonLabel(): string;
  get _buttonIconStart(): string;
  setJobId(updateCache?: boolean): Promise<void>;
  handleDownloadButtonClick(): void;
  initiateDownload(updateCache?: boolean): Promise<void>;
  /**
   * Listens for standardized update events from the <arcgis-hub-download-manager> component.
   * If the event's jobId matches, update the component's state accordingly.
   */
  handleDownloadUpdate(event: CustomEvent<IArcgisHubDownloadUpdateEvent>): void;
  openGenerateNewModal(): void;
  handleCloseGenerateNewModal(): void;
  handleCancelNewDownload(): void;
  handleConfirmNewDownload(): void;
  renderDownloadButton(): VNode;
  handleStaticUrlClick(): void;
  renderError(): VNode;
  handleErrorAccordionChange(e: CustomEvent): void;
  renderCacheOutOfDate(): VNode;
  renderGenerateNewModal(): VNode;
  renderDownloadOptionCard(): VNode;
  render(): any;
}
