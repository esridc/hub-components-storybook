'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const hubDownloadNoticeCss = "div{font-size:var(--calcite-font-size--1);line-height:1rem}calcite-notice{margin-bottom:0.5rem}calcite-loader{margin-right:0.5rem}calcite-loader[active]{display:inline-block}";

const HubDownloadNotice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.fileStatus = undefined;
    this.exportRequested = false;
    this.apiError = undefined;
    this.cannotExport = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      return (index.h("calcite-notice", { open: false }));
    }
    const message = this.shouldShowMessage() ? index.h("div", { slot: "message" }, this.getNoticeMessage()) : null;
    return (index.h("calcite-notice", { dir: "ltr", kind: this._getNoticeKind(), open: true, scale: "m", width: "full" }, index.h("div", { slot: "title" }, index.h("calcite-loader", { hidden: !this.exportInProgress(), inline: true, label: this.getNoticeMessage() }), this.getNoticeTitle()), message));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
HubDownloadNotice.style = hubDownloadNoticeCss;

exports.hub_download_notice = HubDownloadNotice;
