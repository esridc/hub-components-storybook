import { Host, h } from '@stencil/core';
import { downloadFileFromUrl, downloadFileFromBlob, getTelemetryFormatName, getDownloadSuccessTelemetryDetails } from '../../utils/hub-downloads';
import { getGlobalContext } from '../../utils/state';
import { fetchDownloadFile, DownloadOperationStatus } from '@esri/hub-common';
import { constants } from '@esri/telemetry-dictionary-hub';
import intlManager from '../../utils/intl-manager';
import { buffer } from '@arcgis/core/geometry/geometryEngine';
/**
 * The <arcgis-hub-download-manager> component is responsible for handling download requests
 * via events from <arcgis-hub-download-list-item> components. It listens for download requests,
 * triggers the download operation, and downloads the final file to the browser.
 *
 * This component should be placed at the root of the application. This ensures that all download
 * requests will be handled accordingly.
 */
export class ArcgisHubDownloadManager {
  constructor() {
    /**
     * Stores the id hash of active download jobs, used
     * to prevent multiple requests for the same download
     */
    this.activeJobs = {};
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Listen for standardized download requests from <arcgis-hub-download-list-item> components
   */
  async handleDownloadRequest(event) {
    const { jobId, entity, format, layers, geometry, where, updateCache } = event.detail;
    if (this.activeJobs[jobId]) {
      console.warn('Job already in progress');
      return;
    }
    const progressCallback = (status, progress) => {
      this.arcgisHubDownloadUpdate.emit({ jobId, status, progress });
    };
    const start = new Date().valueOf();
    try {
      // TODO: Remove this workaround once createReplica fixes filtering by point geometries
      // If the geometry is a point, use a small generated extent around the point instead
      let filterGeometry = geometry;
      if ((filterGeometry === null || filterGeometry === void 0 ? void 0 : filterGeometry.type) === 'point') {
        const bufferPolygon = buffer(geometry, 1, 'feet');
        // Using the raw buffer polygon also causes createReplica to fail, so use the extent instead
        filterGeometry = bufferPolygon.extent;
      }
      const response = await fetchDownloadFile({
        entity,
        format,
        context: getGlobalContext(),
        layers,
        geometry: filterGeometry,
        where,
        progressCallback,
        updateCache,
      });
      // Log telemetry for successful download
      this.hubTelemetry.emit({
        category: constants.category.INTERACTION,
        action: constants.action.DOWNLOAD,
        label: getTelemetryFormatName(format),
        details: getDownloadSuccessTelemetryDetails(entity, !!response.cacheStatus),
        response: constants.response.SUCCESS,
        duration: new Date().valueOf() - start,
      });
      // Update download ui with completed status
      this.arcgisHubDownloadUpdate.emit({
        jobId,
        status: DownloadOperationStatus.COMPLETED,
        cacheStatus: response.cacheStatus,
      });
      response.type === 'blob'
        ? downloadFileFromBlob(response.blob, response.filename)
        : downloadFileFromUrl(response.href);
    }
    catch (error) {
      // Log telemetry for failed download
      this.hubTelemetry.emit({
        category: constants.category.INTERACTION,
        action: constants.action.DOWNLOAD,
        label: getTelemetryFormatName(format),
        response: `${constants.response.FAILURE} | ${error.message}`,
        duration: new Date().valueOf() - start,
      });
      // NOTE: Current product preference is always show a generic error message to the user.
      // Should that change, we can key into whether the error is an instance of ArcgisHubDownloadError
      // (i.e., a wellknown error) and show a customized error message to the user
      console.error(`Download failed: ${error.message}`);
      this.arcgisHubDownloadUpdate.emit({
        jobId,
        status: DownloadOperationStatus.FAILED,
        error: this.intl.t('defaultErrorMessage'),
      });
    }
    finally {
      delete this.activeJobs[jobId];
    }
  }
  render() {
    return (h(Host, { "data-element": "download-manager" }));
  }
  static get is() { return "arcgis-hub-download-manager"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get events() {
    return [{
        "method": "arcgisHubDownloadUpdate",
        "name": "arcgisHubDownloadUpdate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Standardized event emitted to update interested <arcgis-hub-download-list-item>\ncomponents with the status of a download operation."
        },
        "complexType": {
          "original": "IArcgisHubDownloadUpdateEvent",
          "resolved": "IArcgisHubDownloadUpdateEvent",
          "references": {
            "IArcgisHubDownloadUpdateEvent": {
              "location": "import",
              "path": "../../utils/hub-downloads"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubDownloadRequest",
        "method": "handleDownloadRequest",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
