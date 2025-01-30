import { h, Host } from "@stencil/core";
import EventEmitter from 'eventemitter3';
import { UserSession } from '@esri/arcgis-rest-auth';
import { requestDownloadMetadata, requestDatasetExport, pollDownloadMetadata } from '@esri/hub-downloads';
import intlManager from '../../utils/intl-manager';
import { calculateSize } from '../../utils/size';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { bind } from '../../utils/context';
import { redirectToExternalUrl } from "../../utils";
const POLLING_INTERVAL = 5000;
const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
function userCanExport(target, username) {
  // TODO - if the user is authenticated, this function should verify the user's export privs
  return (target === 'hub' || !!username);
}
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead. This component will be removed once the new component is fully tested and ready for production.
 */
export class HubDownloadCard {
  constructor() {
    this.contentLengthString = null;
    this.poller = null;
    this.loading = undefined;
    this.metadata = undefined;
    this.exportRequested = false;
    this.apiError = undefined;
    this.host = undefined;
    this.datasetId = undefined;
    this.format = undefined;
    this.name = undefined;
    this.target = 'hub';
    this.spatialRefId = '4326';
    this.where = undefined;
    this.geometry = undefined;
    this.filename = undefined;
    this.username = undefined;
    this.token = undefined;
    bind(this, 'exportDatasetComplete', 'exportDatasetError', 'exportPollingError', 'download', 'downloadKeyDown', 'exportDataset', 'exportDatasetKeyDown');
  }
  async componentWillLoad() {
    this.resetUndefinedProps();
    await this.setLocalization();
    this.setAuthentication();
    await this.fetchMetadataAndSetState();
    this.setTranslations();
  }
  buildDownloadTelemetry({ isSuccess = true, isCached = true } = {}) {
    return Object.assign(Object.assign({}, isCached ? dictionary.category.interaction.action.download.details.cache : dictionary.category.interaction.action.download.details.export), { label: this.format, response: isSuccess ? telemetryConstants.response.SUCCESS : telemetryConstants.response.FAILURE });
  }
  resetUndefinedProps() {
    // Storybook knobs will set some of these to "undefined"
    ['spatialRefId', 'where', 'geometry', 'filename', 'target'].forEach(prop => {
      this[prop] = this[prop] === 'undefined' ? undefined : this[prop];
    });
    if (!this.spatialRefId) {
      this.spatialRefId = '4326';
    }
  }
  async setLocalization() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // TODO: replace this w/ this.intl.formatDate()
    this.dateTimeFormatter = new Intl.DateTimeFormat(this.intl.locale, dateFormatOptions);
    // NOTE: ordinarily we'd just use this.intl.t() inline
    // but this component was already built around a hash of labels
    this.setLabels();
  }
  setLabels() {
    const labelKeys = ['buttonDownload', 'fileCreated', 'fileSize', 'buttonOptions', 'menuRequest'];
    this.labels = labelKeys.reduce((accum, key) => {
      accum[key] = this.intl.t(key);
      return accum;
    }, {});
  }
  setAuthentication() {
    if (this.username && this.token) {
      this.authentication = new UserSession({
        username: this.username,
        portal: `${this.host}/sharing/rest`,
        token: this.token,
      });
      this.authentication.getToken = () => new Promise((resolve) => {
        resolve(this.token);
      });
    }
  }
  setTranslations() {
    this.setContentLengthString();
  }
  setContentLengthString() {
    const { metadata: { contentLength } = {} } = this;
    if (contentLength) {
      const fileSize = calculateSize(contentLength);
      this.contentLengthString = typeof fileSize === 'string'
        ? this.intl.t(fileSize.toLowerCase()) // 'n/a'
        : `${fileSize[0]} ${this.intl.t(fileSize[1].toLowerCase())}`;
    }
  }
  async watchHandler() {
    this.resetUndefinedProps();
    await this.fetchMetadataAndSetState();
  }
  async disconnectedCallback() {
    this.resetUndefinedProps();
    if (this.poller) {
      this.poller.disablePoll();
    }
  }
  async fetchMetadataAndSetState() {
    if (this.poller) {
      this.poller.disablePoll();
    }
    const params = this.getServiceParams();
    try {
      this.metadata = await requestDownloadMetadata(params);
      this.pollingEvent = new EventEmitter();
      if (this.exportInProgress()) {
        this.poll();
      }
    }
    catch (error) {
      this.apiError = error;
    }
  }
  getServiceParams() {
    const params = {
      host: this.host,
      datasetId: this.datasetId,
      format: this.format,
      target: this.target,
      authentication: this.authentication,
      spatialRefId: this.spatialRefId,
    };
    if (this.where) {
      params['where'] = this.where;
    }
    if (this.geometry) {
      params['geometry'] = this.geometry;
    }
    return params;
  }
  poll() {
    const params = this.getServiceParams();
    this.pollingEvent.on(`${this.metadata.downloadId}ExportComplete`, this.exportDatasetComplete);
    this.pollingEvent.on(`${this.metadata.downloadId}ExportError`, this.exportDatasetError);
    this.pollingEvent.on(`${this.metadata.downloadId}PollingError`, this.exportPollingError);
    this.poller = pollDownloadMetadata(Object.assign(Object.assign({}, params), { downloadId: this.metadata.downloadId, jobId: this.metadata.jobId, exportCreated: this.metadata.exportCreated, eventEmitter: this.pollingEvent, pollingInterval: POLLING_INTERVAL, existingFileDate: (new Date(this.metadata.lastModified || 0)).toISOString() }));
  }
  async download() {
    if (this.metadata && this.metadata.downloadUrl) {
      try {
        const file = this.transferFile(this.metadata.downloadUrl);
        this.hubTelemetry.emit(this.buildDownloadTelemetry());
        this.hubDownloadCardSuccess.emit();
        return file;
      }
      catch (error) {
        this.hubTelemetry.emit(this.buildDownloadTelemetry({ isSuccess: false }));
        throw error;
      }
    }
    // In certain file states, the "Download" button actually triggers an export
    return await this.exportDataset();
  }
  transferFile(url) {
    if (this.format === 'Feature Collection') {
      return window.open(url);
    }
    return redirectToExternalUrl(url);
  }
  async exportDataset() {
    this.exportRequested = true;
    this.metadata.status = this.downloadCached() ? 'updating' : 'creating';
    const params = Object.assign({ title: this.filename }, this.getServiceParams());
    try {
      const result = await requestDatasetExport(params);
      this.metadata = Object.assign(Object.assign({}, this.metadata), result);
      this.poll();
    }
    catch (error) {
      this.apiError = error;
      this.metadata.status = 'error';
      this.metadata.errors = [error];
    }
  }
  exportDatasetComplete(event) {
    this.exportDatasetHandler(event);
    this.hubTelemetry.emit(this.buildDownloadTelemetry({ isCached: false }));
    this.hubDownloadCardSuccess.emit();
    if (this.exportRequested) {
      const { downloadUrl } = this.metadata;
      if (downloadUrl) {
        return this.transferFile(downloadUrl);
      }
    }
  }
  exportDatasetError(event) {
    this.exportDatasetHandler(event);
    this.hubTelemetry.emit(this.buildDownloadTelemetry({ isSuccess: false, isCached: false }));
  }
  exportPollingError(event) {
    this.apiError = event.detail.error;
    this.exportDatasetHandler(event);
    this.hubTelemetry.emit(this.buildDownloadTelemetry({ isSuccess: false, isCached: false }));
  }
  exportDatasetHandler(event) {
    this.metadata = Object.assign(Object.assign({}, this.metadata), event.detail.metadata);
    this.pollingEvent.off(`${this.metadata.downloadId}ExportComplete`, this.exportDatasetComplete);
    this.pollingEvent.off(`${this.metadata.downloadId}ExportError`, this.exportDatasetError);
    this.pollingEvent.off(`${this.metadata.downloadId}PollingError`, this.exportDatasetError);
  }
  renderNotice() {
    const { metadata, apiError, exportRequested } = this;
    const { status } = metadata || {};
    // TEMPORARY - Overwrite lock logic that remains in Hub.js for private downloads
    let modifiedStatus = status;
    if (status === 'locked') {
      modifiedStatus = 'not_ready';
    }
    else if (status === 'stale_locked') {
      modifiedStatus = 'stale';
    }
    const error = apiError ? apiError.status || apiError.message : undefined;
    return h("hub-download-notice", { "api-error": error, "cannot-export": !userCanExport(this.target, this.username), "export-requested": exportRequested, "file-status": modifiedStatus });
  }
  exportInProgress() {
    const { metadata: { status } = {} } = this;
    return status === 'creating' || status === 'updating';
  }
  downloadCached() {
    const { metadata: { status } = {} } = this;
    return ['ready', 'ready_unknown', 'stale', 'stale_locked', 'updating', 'error_updating'].includes(status);
  }
  downloadUpToDate() {
    return this.metadata && this.metadata.status === 'ready';
  }
  isFormatDownloadDisabled() {
    return this.metadata && this.metadata.status === 'disabled';
  }
  renderFileDescription() {
    const fileDescription = [];
    const { metadata: { lastModified } = {} } = this;
    if (!this.downloadCached()) {
      return null;
    }
    if (lastModified) {
      if (this.intl.direction === 'rtl') {
        fileDescription.push(h("dt", null, this.dateTimeFormatter.format(new Date(lastModified))), h("dd", { class: "rtl" }, this.labels.fileCreated));
      }
      else {
        fileDescription.push(h("dt", { class: "ltr" }, this.labels.fileCreated), h("dd", null, this.dateTimeFormatter.format(new Date(lastModified))));
      }
    }
    if (this.contentLengthString) {
      if (this.intl.direction === 'rtl') {
        fileDescription.push(h("dt", null, this.contentLengthString), h("dd", { class: "rtl" }, this.labels.fileSize));
      }
      else {
        fileDescription.push(h("dt", { class: "ltr" }, this.labels.fileSize), h("dd", null, this.contentLengthString));
      }
    }
    return fileDescription;
  }
  // needed for accessibility
  exportDatasetKeyDown(event) {
    if (['Enter', ' '].includes(event.key)) {
      this.exportDataset();
    }
  }
  // needed for acessibility
  downloadKeyDown(event) {
    if (['Enter', ' '].includes(event.key)) {
      this.download();
    }
  }
  renderDownloadControl() {
    if (this.shouldUseDownloadButton()) {
      return h("calcite-button", { appearance: "solid", color: "blue", disabled: this.shouldDisableDownload(), "icon-position": "start", onClick: this.download, scale: "m", width: "full" }, this.labels.buttonDownload);
    }
    return (h("calcite-dropdown", { open: false, placement: "top", scale: "m", type: "click" }, h("calcite-button", { appearance: "solid", color: "blue", "icon-end": "caretUp", scale: "m", slot: "trigger" }, this.labels.buttonOptions), h("calcite-dropdown-group", { "selection-mode": "none" }, h("calcite-dropdown-item", { hidden: this.exportInProgress(), onClick: this.exportDataset, onKeyDown: this.exportDatasetKeyDown, role: "menuitem", "selection-mode": "none", tabindex: "0" }, h("span", null, this.labels.menuRequest)), h("calcite-dropdown-item", { onClick: this.download, onKeyDown: this.downloadKeyDown, role: "menuitem", "selection-mode": "none", tabindex: "0" }, h("span", null, this.intl.t('menuDownload', { createdDate: this.dateTimeFormatter.format(new Date(this.metadata.lastModified)) }))))));
  }
  shouldUseDownloadButton() {
    return this.downloadUpToDate()
      || !this.downloadCached()
      || this.isFormatDownloadDisabled()
      || !userCanExport(this.target, this.username);
  }
  shouldDisableDownload() {
    return this.isFormatDownloadDisabled() || (this.exportInProgress() && !this.downloadCached());
  }
  render() {
    return (h(Host, { "data-element": "download-card" }, h("calcite-card", { dir: this.intl.direction }, h("h3", { slot: "title" }, this.name), h("dl", { slot: "subtitle" }, this.renderFileDescription()), h("div", { slot: "footer-start" }, this.renderNotice(), this.renderDownloadControl()))));
  }
  static get is() { return "hub-download-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["./hub-download-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["hub-download-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "host": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Host for download API."
        },
        "attribute": "host",
        "reflect": false
      },
      "datasetId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The dataset ID."
        },
        "attribute": "dataset-id",
        "reflect": false
      },
      "format": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DownloadFormat",
          "resolved": "\"CSV\" | \"Excel\" | \"Feature Collection\" | \"File Geodatabase\" | \"GeoJson\" | \"KML\" | \"Scene Package\" | \"Shapefile\"",
          "references": {
            "DownloadFormat": {
              "location": "import",
              "path": "@esri/hub-downloads"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The file format for the download. Must be one of: `Shapefile`, `File Geodatabase`, `CSV`, `KML`, `GeoJson`, `Excel`, `Feature Collection`, `Scene Package`."
        },
        "attribute": "format",
        "reflect": false
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Name/title for the download card."
        },
        "attribute": "name",
        "reflect": false
      },
      "target": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DownloadTarget",
          "resolved": "\"enterprise\" | \"hub\" | \"portal\"",
          "references": {
            "DownloadTarget": {
              "location": "import",
              "path": "@esri/hub-downloads"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "API target for download requests. Public/Opendata downloads target `hub` (default), private downloads target 'portal', and Enterprise downloads target `enterprise`."
        },
        "attribute": "target",
        "reflect": false,
        "defaultValue": "'hub'"
      },
      "spatialRefId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The well-known identifier of the coordinate system for the download data. Optional. For Hub API downloads, it must be either 4326 or the dataset's native coordinate system."
        },
        "attribute": "spatial-ref-id",
        "reflect": false,
        "defaultValue": "'4326'"
      },
      "where": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A SQL style attribute filter. Optional. Example: `color='red'`."
        },
        "attribute": "where",
        "reflect": false
      },
      "geometry": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A Geoservices envelope filter. Optional. Example: `{\"xmin\":-77.0036,\"ymin\":38.8879,\"xmax\":-76.98434,\"ymax\":38.90007,\"spatialReference\":{\"wkid\":4326}}`."
        },
        "attribute": "geometry",
        "reflect": false
      },
      "filename": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A filename to assign to the download file. Only applies to private/Enterprise (Portal API) downloads. Optional."
        },
        "attribute": "filename",
        "reflect": false
      },
      "username": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Username of the currently logged in user. Only applies to private/Enterprise (Portal API) downloads."
        },
        "attribute": "username",
        "reflect": false
      },
      "token": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Valid token for the currently logged in user. Only applies to private/Enterprise (Portal API) downloads."
        },
        "attribute": "token",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "loading": {},
      "metadata": {},
      "exportRequested": {},
      "apiError": {}
    };
  }
  static get events() {
    return [{
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
      }, {
        "method": "hubDownloadCardSuccess",
        "name": "hubDownloadCardSuccess",
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
  static get watchers() {
    return [{
        "propName": "host",
        "methodName": "watchHandler"
      }, {
        "propName": "datasetId",
        "methodName": "watchHandler"
      }, {
        "propName": "format",
        "methodName": "watchHandler"
      }, {
        "propName": "spatialRefId",
        "methodName": "watchHandler"
      }, {
        "propName": "where",
        "methodName": "watchHandler"
      }, {
        "propName": "geometry",
        "methodName": "watchHandler"
      }, {
        "propName": "target",
        "methodName": "watchHandler"
      }, {
        "propName": "username",
        "methodName": "watchHandler"
      }, {
        "propName": "token",
        "methodName": "watchHandler"
      }];
  }
}
