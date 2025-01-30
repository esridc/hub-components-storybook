'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const hubDownloads = require('./hub-downloads-509b67d0.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const intlManager = require('./intl-manager-f0103583.js');
const geometryEngine = require('@arcgis/core/geometry/geometryEngine.js');
const fetchDownloadFile = require('./fetchDownloadFile-a4e4466c.js');
const types = require('./types-2810dd27.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./hostedServiceUtils-236344a8.js');
require('./index-ef80ab27.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./store-2a385ca0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./getDownloadFlow-94a34207.js');
require('./types-097b54b1.js');
require('./getDownloadFormats-a9f297e8.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./utils-5a74b66e.js');

const ArcgisHubDownloadManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubDownloadUpdate = index.createEvent(this, "arcgisHubDownloadUpdate", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Stores the id hash of active download jobs, used
     * to prevent multiple requests for the same download
     */
    this.activeJobs = {};
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
        const bufferPolygon = geometryEngine.buffer(geometry, 1, 'feet');
        // Using the raw buffer polygon also causes createReplica to fail, so use the extent instead
        filterGeometry = bufferPolygon.extent;
      }
      const response = await fetchDownloadFile.fetchDownloadFile({
        entity,
        format,
        context: state.getGlobalContext(),
        layers,
        geometry: filterGeometry,
        where,
        progressCallback,
        updateCache,
      });
      // Log telemetry for successful download
      this.hubTelemetry.emit({
        category: index$1.dist.constants.category.INTERACTION,
        action: index$1.dist.constants.action.DOWNLOAD,
        label: hubDownloads.getTelemetryFormatName(format),
        details: hubDownloads.getDownloadSuccessTelemetryDetails(entity, !!response.cacheStatus),
        response: index$1.dist.constants.response.SUCCESS,
        duration: new Date().valueOf() - start,
      });
      // Update download ui with completed status
      this.arcgisHubDownloadUpdate.emit({
        jobId,
        status: types.DownloadOperationStatus.COMPLETED,
        cacheStatus: response.cacheStatus,
      });
      response.type === 'blob'
        ? hubDownloads.downloadFileFromBlob(response.blob, response.filename)
        : hubDownloads.downloadFileFromUrl(response.href);
    }
    catch (error) {
      // Log telemetry for failed download
      this.hubTelemetry.emit({
        category: index$1.dist.constants.category.INTERACTION,
        action: index$1.dist.constants.action.DOWNLOAD,
        label: hubDownloads.getTelemetryFormatName(format),
        response: `${index$1.dist.constants.response.FAILURE} | ${error.message}`,
        duration: new Date().valueOf() - start,
      });
      // NOTE: Current product preference is always show a generic error message to the user.
      // Should that change, we can key into whether the error is an instance of ArcgisHubDownloadError
      // (i.e., a wellknown error) and show a customized error message to the user
      console.error(`Download failed: ${error.message}`);
      this.arcgisHubDownloadUpdate.emit({
        jobId,
        status: types.DownloadOperationStatus.FAILED,
        error: this.intl.t('defaultErrorMessage'),
      });
    }
    finally {
      delete this.activeJobs[jobId];
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "download-manager" }));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.arcgis_hub_download_manager = ArcgisHubDownloadManager;
