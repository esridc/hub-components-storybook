import { ComponentIntl } from '../../utils/stencil-intl';
/**
 * DEPRECATED: This component (and 'hub-download-card') will be removed once
 * 'arcgis-hub-download-list' is tested and ready for production use.
 */
export declare class HubDownloadNotice {
  labels: any;
  intl: ComponentIntl;
  /**
   * Status of the download file. May be: `ready`, `not_ready`, `stale`, `creating`, `updating`, `error_creating`, `error_updating`.
   */
  fileStatus: string;
  /**
   * Flag indicating if the user has triggered an export
   */
  exportRequested: boolean;
  /**
   * An error from API (rather than an error with the dataset export itself).
   */
  apiError: string;
  /**
   * Current user is unable to request exports
   */
  cannotExport: boolean;
  element: HTMLElement;
  componentWillLoad(): Promise<void>;
  resetUndefinedProps(): void;
  setLocalization(): Promise<void>;
  setLabels(): void;
  getNoticeTitle(): any;
  getNoticeMessage(): any;
  shouldShowMessage(): boolean;
  private _getNoticeKind;
  exportFailed(): boolean;
  exportInProgress(): boolean;
  requestedExportIsReady(): boolean;
  requestedExportHasFailed(): boolean;
  downloadCached(): boolean;
  downloadUpToDate(): boolean;
  shouldHide(): boolean;
  render(): any;
}
