import { EventEmitter } from '../../stencil-public-runtime';
import { IArcgisHubDownloadRequestEvent, IArcgisHubDownloadUpdateEvent } from '../../utils/hub-downloads';
import { ComponentIntl } from '../../utils/stencil-intl';
/**
 * The <arcgis-hub-download-manager> component is responsible for handling download requests
 * via events from <arcgis-hub-download-list-item> components. It listens for download requests,
 * triggers the download operation, and downloads the final file to the browser.
 *
 * This component should be placed at the root of the application. This ensures that all download
 * requests will be handled accordingly.
 */
export declare class ArcgisHubDownloadManager {
  element: HTMLArcgisHubDownloadManagerElement;
  /**
   * Stores the id hash of active download jobs, used
   * to prevent multiple requests for the same download
   */
  activeJobs: Record<string, boolean>;
  intl: ComponentIntl;
  /**
   * Standardized event emitted to update interested <arcgis-hub-download-list-item>
   * components with the status of a download operation.
   */
  arcgisHubDownloadUpdate: EventEmitter<IArcgisHubDownloadUpdateEvent>;
  hubTelemetry: EventEmitter<any>;
  componentWillLoad(): Promise<void>;
  /**
   * Listen for standardized download requests from <arcgis-hub-download-list-item> components
   */
  handleDownloadRequest(event: CustomEvent<IArcgisHubDownloadRequestEvent>): Promise<void>;
  render(): any;
}
