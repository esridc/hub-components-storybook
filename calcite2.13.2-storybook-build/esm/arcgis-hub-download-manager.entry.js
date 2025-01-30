import { r as registerInstance, c as createEvent, h, a as getElement, H as Host } from './index-57f71b44.js';
import { g as getTelemetryFormatName, a as getDownloadSuccessTelemetryDetails, d as downloadFileFromBlob, b as downloadFileFromUrl } from './hub-downloads-ee00c028.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { buffer } from '@arcgis/core/geometry/geometryEngine.js';
import { f as fetchDownloadFile } from './fetchDownloadFile-83809572.js';
import { D as DownloadOperationStatus } from './types-303cd4d6.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './hostedServiceUtils-f22b023b.js';
import './index-edff2d62.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './store-0a6cb79f.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './getDownloadFlow-6c6d04d5.js';
import './types-2eaa1a18.js';
import './getDownloadFormats-3dc2a95d.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './utils-cde3af49.js';

const ArcgisHubDownloadManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDownloadUpdate = createEvent(this, "arcgisHubDownloadUpdate", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
        category: dist.constants.category.INTERACTION,
        action: dist.constants.action.DOWNLOAD,
        label: getTelemetryFormatName(format),
        details: getDownloadSuccessTelemetryDetails(entity, !!response.cacheStatus),
        response: dist.constants.response.SUCCESS,
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
        category: dist.constants.category.INTERACTION,
        action: dist.constants.action.DOWNLOAD,
        label: getTelemetryFormatName(format),
        response: `${dist.constants.response.FAILURE} | ${error.message}`,
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { ArcgisHubDownloadManager as arcgis_hub_download_manager };
