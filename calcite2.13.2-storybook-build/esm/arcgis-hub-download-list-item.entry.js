import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { c as calculateDownloadJobId, g as getTelemetryFormatName } from './hub-downloads-ee00c028.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { S as ServiceDownloadFormat, D as DownloadOperationStatus } from './types-303cd4d6.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './hostedServiceUtils-f22b023b.js';
import './index-edff2d62.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';

const arcgisHubDownloadListItemCss = ":host{display:block}.download-option-card{display:flex;flex-direction:column;gap:0.75rem;border-width:1px;border-style:solid;padding:1rem}.download-option-card-header{display:flex;flex-direction:row;align-items:center;gap:0.5rem}.download-option-card-title{font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.download-button-text{font-size:var(--calcite-font-size-1);line-height:1.5rem}.error-accordion-item{margin-top:0.75rem}.error-accordion-item-heading{--calcite-ui-icon-color:var(--calcite-color-status-danger)}.error-accordion-item-content{margin-bottom:0px}.cache-accordion-item{margin-top:0.75rem}.cache-accordion-item-heading{margin-top:1rem;margin-bottom:0.25rem;font-weight:var(--calcite-font-weight-bold)}.cache-accordion-item-content{margin-bottom:0.5rem}";

const ArcgisHubDownloadListItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDownloadRequest = createEvent(this, "arcgisHubDownloadRequest", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.format = undefined;
    this.layerIds = [];
    this.geometry = undefined;
    this.where = undefined;
    this.url = undefined;
    this.headerLabel = undefined;
    this.buttonLabel = undefined;
    this.buttonIconStart = 'downloadTo';
    this.buttonIconEnd = null;
    this.loading = undefined;
    this.progress = 0;
    this.status = null;
    this.error = undefined;
    this.cacheStatus = null;
    this.showGenerateNewModal = false;
    bind(this, 'handleDownloadButtonClick', 'handleErrorAccordionChange', 'handleStaticUrlClick', 'openGenerateNewModal', 'handleCloseGenerateNewModal', 'handleConfirmNewDownload', 'handleCancelNewDownload');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * One-stop shop for defining the labels and icons for each supported download format.
   */
  get formatDisplayConfigs() {
    return {
      // Image Service Formats
      [ServiceDownloadFormat.BIP]: { intlKey: 'formats.bip', icon: 'image' },
      [ServiceDownloadFormat.BMP]: { intlKey: 'formats.bmp', icon: 'image' },
      [ServiceDownloadFormat.BSQ]: { intlKey: 'formats.bsq', icon: 'image' },
      [ServiceDownloadFormat.GIF]: { intlKey: 'formats.gif', icon: 'image' },
      [ServiceDownloadFormat.JPG]: { intlKey: 'formats.jpg', icon: 'image' },
      [ServiceDownloadFormat.JPG_PNG]: { intlKey: 'formats.jpgPng', icon: 'image' },
      [ServiceDownloadFormat.LERC]: { intlKey: 'formats.lerc', icon: 'image' },
      [ServiceDownloadFormat.PNG]: { intlKey: 'formats.png', icon: 'image' },
      [ServiceDownloadFormat.PNG8]: { intlKey: 'formats.png8', icon: 'image' },
      [ServiceDownloadFormat.PNG24]: { intlKey: 'formats.png24', icon: 'image' },
      [ServiceDownloadFormat.PNG32]: { intlKey: 'formats.png32', icon: 'image' },
      [ServiceDownloadFormat.TIFF]: { intlKey: 'formats.tiff', icon: 'image' },
      // Map & Feature Service Formats
      [ServiceDownloadFormat.CSV]: { intlKey: 'formats.csv', icon: 'file-csv' },
      [ServiceDownloadFormat.EXCEL]: { intlKey: 'formats.excel', icon: 'file-excel' },
      [ServiceDownloadFormat.FEATURE_COLLECTION]: { intlKey: 'formats.featureCollection', icon: 'files' },
      [ServiceDownloadFormat.FILE_GDB]: { intlKey: 'formats.fgdb', icon: 'file-data' },
      [ServiceDownloadFormat.GEOJSON]: { intlKey: 'formats.geojson', icon: 'file-code' },
      [ServiceDownloadFormat.GEO_PACKAGE]: { intlKey: 'formats.geoPackage', icon: 'package' },
      [ServiceDownloadFormat.JSON]: { intlKey: 'formats.json', icon: 'file-code' },
      [ServiceDownloadFormat.KML]: { intlKey: 'formats.kml', icon: 'file-kml' },
      [ServiceDownloadFormat.SHAPEFILE]: { intlKey: 'formats.shapefile', icon: 'file-zip' },
      [ServiceDownloadFormat.SQLITE]: { intlKey: 'formats.sqlite', icon: 'file-sqlite' }
    };
  }
  get _headerLabel() {
    var _a;
    const intlKey = (_a = this.formatDisplayConfigs[this.format]) === null || _a === void 0 ? void 0 : _a.intlKey;
    return this.headerLabel
      || (intlKey && this.intl.t(intlKey))
      || this.format;
  }
  get headerIcon() {
    var _a;
    return ((_a = this.formatDisplayConfigs[this.format]) === null || _a === void 0 ? void 0 : _a.icon) || 'file';
  }
  get _buttonLabel() {
    const buttonLabelMap = {
      [DownloadOperationStatus.PENDING]: this.intl.t('buttonText.pending'),
      [DownloadOperationStatus.PROCESSING]: this.intl.t('buttonText.processing'),
      [DownloadOperationStatus.CONVERTING]: this.intl.t('buttonText.converting'),
      [DownloadOperationStatus.COMPLETED]: this.intl.t('buttonText.completed'),
      [DownloadOperationStatus.FAILED]: this.intl.t('buttonText.failed')
    };
    const defaultLabel = this.buttonLabel || this.intl.t('buttonText.download');
    const text = this.status in buttonLabelMap
      ? buttonLabelMap[this.status]
      : defaultLabel;
    return this.progress ? `${this.progress}% ${text}` : text;
  }
  get _buttonIconStart() {
    const buttonIconMap = {
      [DownloadOperationStatus.PENDING]: null,
      [DownloadOperationStatus.PROCESSING]: null,
      [DownloadOperationStatus.CONVERTING]: null,
      [DownloadOperationStatus.COMPLETED]: 'check',
      [DownloadOperationStatus.FAILED]: 'exclamationMarkTriangle'
    };
    const defaultIcon = this.loading ? null : this.buttonIconStart;
    return this.status in buttonIconMap
      ? buttonIconMap[this.status]
      : defaultIcon;
  }
  async setJobId(updateCache) {
    this.jobId = await calculateDownloadJobId({
      itemId: this.entity.id,
      format: this.format,
      layers: this.layerIds,
      geometry: this.geometry,
      where: this.where,
      updateCache,
    });
  }
  handleDownloadButtonClick() {
    this.hubTelemetry.emit({
      category: dist.constants.category.INTERACTION,
      action: dist.constants.action.DOWNLOAD,
      label: getTelemetryFormatName(this.format),
    });
    this.initiateDownload();
  }
  async initiateDownload(updateCache) {
    this.error = null;
    this.cacheStatus = null;
    this.loading = true;
    await this.setJobId(updateCache);
    this.arcgisHubDownloadRequest.emit({
      jobId: this.jobId,
      entity: this.entity,
      format: this.format,
      layers: this.layerIds,
      geometry: this.geometry,
      where: this.where,
      updateCache
    });
  }
  /**
   * Listens for standardized update events from the <arcgis-hub-download-manager> component.
   * If the event's jobId matches, update the component's state accordingly.
   */
  handleDownloadUpdate(event) {
    if (event.detail.jobId === this.jobId) {
      const { status, progress, error, cacheStatus } = event.detail;
      this.status = status;
      this.progress = progress;
      this.error = error;
      this.cacheStatus = cacheStatus;
      if (status === DownloadOperationStatus.COMPLETED || status === DownloadOperationStatus.FAILED) {
        this.loading = false;
        this.progress = 0;
        // Remove the status message after a few seconds and default back to the original button text.
        // This was a request from design to avoid the status message lingering after the download had completed / failed.
        setTimeout(() => { this.status = null; }, 3000);
      }
    }
  }
  openGenerateNewModal() {
    this.showGenerateNewModal = true;
    this.hubTelemetry.emit(Object.assign({}, dist.dictionary
      .category.interaction
      .action.open
      .label.modal
      .details.generateDownload));
  }
  handleCloseGenerateNewModal() {
    // Just in case the user closes the modal via the X button / clicking outside of it
    this.showGenerateNewModal = false;
    this.hubTelemetry.emit(Object.assign({}, dist.dictionary
      .category.interaction
      .action.close
      .label.modal
      .details.generateDownload));
  }
  handleCancelNewDownload() {
    this.showGenerateNewModal = false;
  }
  handleConfirmNewDownload() {
    this.showGenerateNewModal = false;
    this.initiateDownload(true);
    this.hubTelemetry.emit({
      category: dist.constants.category.INTERACTION,
      action: dist.constants.action.DOWNLOAD,
      label: getTelemetryFormatName(this.format),
      details: dist.constants.details.GENERATE,
    });
  }
  renderDownloadButton() {
    // The button will have different props depending on whether it
    // should point to a static link or initiate a download request
    const additionalButtonProps = !!this.url
      ? {
        href: this.url,
        rel: "noopener noreferrer",
        target: "_blank",
        onClick: this.handleStaticUrlClick
      }
      : {
        loading: this.loading,
        onClick: this.handleDownloadButtonClick
      };
    return h("div", { class: "button-container" }, !!this.progress && h("calcite-progress", { type: "determinate", value: this.progress / 100 }), h("calcite-button", Object.assign({ appearance: "outline", "icon-end": this.buttonIconEnd, "icon-start": this._buttonIconStart, scale: "l", width: "full" }, additionalButtonProps), h("div", { class: "download-button-text" }, " ", this._buttonLabel)));
  }
  handleStaticUrlClick() {
    this.hubTelemetry.emit({
      category: dist.constants.category.INTERACTION,
      action: dist.constants.action.DOWNLOAD,
      label: this._headerLabel,
    });
  }
  renderError() {
    return (!!this.error &&
      h("calcite-accordion", { appearance: "transparent", class: "error-accordion-item", "icon-type": "chevron",
        // NOTE: we should really stop using the internal calcite event here
        onCalciteInternalAccordionChange: this.handleErrorAccordionChange }, h("calcite-accordion-item", { class: "error-accordion-item-heading", heading: this.intl.t('errors.errorHeading'), "icon-start": "exclamation-mark-triangle" }, h("p", { class: "error-accordion-item-content" }, this.error))));
  }
  handleErrorAccordionChange(e) {
    this.hubTelemetry.emit(!e.detail.requestedAccordionItem.expanded
      ? Object.assign({}, dist.dictionary.category.interaction.action.open.label.accordion.details.downloadErrorMessage) : Object.assign({}, dist.dictionary.category.interaction.action.close.label.accordion.details.downloadErrorMessage));
  }
  renderCacheOutOfDate() {
    const outOfDateStatuses = ['ready_unknown', 'stale'];
    const showCacheOutOfDateAccordion = outOfDateStatuses.includes(this.cacheStatus);
    return (showCacheOutOfDateAccordion &&
      // TODO: Convert this back to calcite-accordion once we figure out the lazy-loading issue
      // that only seems to affect the accordion component on Safari
      h("div", null, h("div", { class: "cache-accordion-item-heading" }, this.intl.t('cacheStatusAccordion.heading')), h("div", { class: "cache-accordion-item-content" }, this.intl.t('cacheStatusAccordion.content')), h("calcite-button", { appearance: "outline", "icon-start": "arrow-up-down", onClick: this.openGenerateNewModal, scale: "l" }, this.intl.t('cacheStatusAccordion.button'))));
  }
  renderGenerateNewModal() {
    return (h("arcgis-wormhole", null, h("calcite-dialog", { heading: this.intl.t('generateNewModal.heading'), modal: true, onCalciteDialogClose: this.handleCloseGenerateNewModal, open: this.showGenerateNewModal, "width-scale": "s" }, h("div", null, this.intl.t('generateNewModal.content')), h("calcite-button", { appearance: "outline", onClick: this.handleCancelNewDownload, round: true, slot: "footer-end" }, this.intl.t('generateNewModal.cancelButton')), h("calcite-button", { onClick: this.handleConfirmNewDownload, round: true, slot: "footer-end" }, this.intl.t('generateNewModal.confirmButton')))));
  }
  renderDownloadOptionCard() {
    return (h(Fragment, null, h("div", { class: "download-option-card" }, h("div", { class: "download-option-card-header" }, this.headerIcon && h("calcite-icon", { icon: this.headerIcon }), h("div", { class: "download-option-card-title" }, this._headerLabel)), this.renderDownloadButton(), this.renderError(), this.renderCacheOutOfDate()), this.renderGenerateNewModal()));
  }
  render() {
    return (h(Host, { "data-element": "download-list-item" }, this.renderDownloadOptionCard()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubDownloadListItem.style = arcgisHubDownloadListItemCss;

export { ArcgisHubDownloadListItem as arcgis_hub_download_list_item };
