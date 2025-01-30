import { h } from "@stencil/core";
import intlManager from '../../utils/intl-manager';
/**
 * DEPRECATED: This component (and 'hub-download-card') will be removed once
 * 'arcgis-hub-download-list' is tested and ready for production use.
 */
export class HubDownloadNotice {
  constructor() {
    this.fileStatus = undefined;
    this.exportRequested = false;
    this.apiError = undefined;
    this.cannotExport = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setLabels();
    this.resetUndefinedProps();
  }
  resetUndefinedProps() {
    // Storybook knobs will set some of these to "undefined"
    ['fileStatus', 'exportRequested', 'apiError'].forEach(prop => {
      this[prop] = this[prop] === 'undefined' ? undefined : this[prop];
    });
  }
  async setLocalization() {
    this.setLabels();
  }
  setLabels() {
    this.labels = {
      titleFileGeneration: this.intl.t('titleFileGeneration'),
      titleDatasetNotFound: this.intl.t('titleDatasetNotFound'),
      titleApiError: this.intl.t('titleApiError'),
      titleFormatDisabled: this.intl.t('titleFormatDisabled'),
      titleFileGenerationFailed: this.intl.t('titleFileGenerationFailed'),
      messageCreatingFile: this.intl.t('messageCreatingFile'),
      messageUpdatingFile: this.intl.t('messageUpdatingFile'),
      messageFailedStaleAvailable: this.intl.t('messageFailedStaleAvailable'),
      messageFileNeedsGenerating: this.intl.t('messageFileNeedsGenerating'),
      messageFormatDisabled: this.intl.t('messageFormatDisabled'),
    };
  }
  getNoticeTitle() {
    if (this.fileStatus === 'disabled') {
      return this.labels.titleFormatDisabled;
    }
    if (this.exportInProgress()) {
      return this.labels.titleFileGeneration;
    }
    if (this.apiError === '404') {
      return this.labels.titleDatasetNotFound;
    }
    if (this.apiError) {
      return this.labels.titleApiError;
    }
    if (this.requestedExportHasFailed()) {
      return this.labels.titleFileGenerationFailed;
    }
  }
  getNoticeMessage() {
    if (this.fileStatus === 'disabled') {
      return this.labels.messageFormatDisabled;
    }
    if (this.fileStatus === 'creating') {
      return this.labels.messageCreatingFile;
    }
    if (this.fileStatus === 'updating') {
      return this.labels.messageUpdatingFile;
    }
    if (this.downloadCached() && this.requestedExportHasFailed()) {
      return this.labels.messageFailedStaleAvailable;
    }
    if (this.fileStatus === 'ready_unknown') {
      return this.labels.messageFileNeedsGenerating;
    }
    if (this.fileStatus === 'locked' || this.fileStatus === 'stale_locked') {
      return this.labels.messageDataSourceLocked;
    }
    if (this.downloadCached()) {
      return this.labels.messageFileNeedsGenerating;
    }
    return this.labels.messageFileNeedsGenerating;
  }
  shouldShowMessage() {
    return !this.apiError && !this.exportFailed() && !this.requestedExportIsReady();
  }
  _getNoticeKind() {
    if (this.requestedExportHasFailed() || this.apiError) {
      return 'danger';
    }
    return 'warning';
  }
  exportFailed() {
    return this.fileStatus === 'error' || this.fileStatus === 'error_creating' || this.fileStatus === 'error_updating';
  }
  exportInProgress() {
    return this.fileStatus === 'creating' || this.fileStatus === 'updating';
  }
  requestedExportIsReady() {
    return this.exportRequested && this.downloadUpToDate();
  }
  requestedExportHasFailed() {
    const { exportRequested, fileStatus } = this;
    return exportRequested && (fileStatus === 'error' || fileStatus === 'error_updating' || fileStatus === 'error_creating');
  }
  downloadCached() {
    return ['ready', 'ready_unknown', 'stale', 'updating', 'error_updating'].includes(this.fileStatus);
  }
  downloadUpToDate() {
    return this.fileStatus === 'ready';
  }
  shouldHide() {
    return this.downloadUpToDate()
      || this.cannotExport // just hide the notice because the user can't do anything
      || (this.exportFailed() && !this.exportRequested);
  }
  render() {
    if (this.shouldHide()) {
      return (h("calcite-notice", { open: false }));
    }
    const message = this.shouldShowMessage() ? h("div", { slot: "message" }, this.getNoticeMessage()) : null;
    return (h("calcite-notice", { dir: "ltr", kind: this._getNoticeKind(), open: true, scale: "m", width: "full" }, h("div", { slot: "title" }, h("calcite-loader", { hidden: !this.exportInProgress(), inline: true, label: this.getNoticeMessage() }), this.getNoticeTitle()), message));
  }
  static get is() { return "hub-download-notice"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["./hub-download-notice.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["hub-download-notice.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "fileStatus": {
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
          "text": "Status of the download file. May be: `ready`, `not_ready`, `stale`, `creating`, `updating`, `error_creating`, `error_updating`."
        },
        "attribute": "file-status",
        "reflect": false
      },
      "exportRequested": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Flag indicating if the user has triggered an export"
        },
        "attribute": "export-requested",
        "reflect": false,
        "defaultValue": "false"
      },
      "apiError": {
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
          "text": "An error from API (rather than an error with the dataset export itself)."
        },
        "attribute": "api-error",
        "reflect": false
      },
      "cannotExport": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Current user is unable to request exports"
        },
        "attribute": "cannot-export",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "element"; }
}
