import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { f as fileFormatToDisplayName, a as isAGORateLimitError } from './download-features-e3ac76f6.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getFormatIcon } from './download-list-38d6b571.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import './request-fa80ae40.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';

const arcgisDownloadListCardCss = ":host{position:relative;display:block}.error-header-container{display:flex;flex-direction:row;align-items:center;gap:0.5rem}.error-header-icon{--calcite-ui-icon-color:var(--calcite-color-status-danger)}.error-header{font-weight:var(--calcite-font-weight-bold)}.error-accordion-item{margin-top:0.75rem}.error-accordion-item-heading{--calcite-ui-icon-color:var(--calcite-color-status-danger)}.error-accordion-item-content{margin-bottom:0px}";

const ArcgisDownloadListCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.fileFormat = undefined;
    this.filterGeometry = undefined;
    this.item = undefined;
    this.layers = undefined;
    this.server = undefined;
    this.showError = false;
    this.errorMessage = '';
    bind(this, 'handleCalciteNoticeClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get formatIcon() {
    return getFormatIcon(this.fileFormat);
  }
  get _context() { return getGlobalContext(); }
  get canDisplayErrorMessage() {
    return checkPermission('hub:content:downloads:displayErrors', this._context).access;
  }
  handleCalciteNoticeClose() {
    var _a, _b, _c, _d;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(this.fileFormat), details: 'dismiss limit reached', id: (_a = this.item) === null || _a === void 0 ? void 0 : _a.id, type: (_b = this.item) === null || _b === void 0 ? void 0 : _b.type, access: (_c = this.item) === null || _c === void 0 ? void 0 : _c.access, contentOrgId: (_d = this.item) === null || _d === void 0 ? void 0 : _d.orgId, response: 'Failure' }));
  }
  clearErrors() {
    this.showError = false;
  }
  handleArcgisDownloadError(event) {
    var _a, _b, _c, _d;
    const { error } = event.detail;
    this.showError = true;
    if (isAGORateLimitError(error)) {
      this.errorMessage = error.message;
    }
    else if (this.canDisplayErrorMessage) {
      // TODO: @caleb + @aaron -- Rework this after Caleb's hub.js PR lands to include error message as the title 
      // of the accordion and error details as the accordion item
      this.errorMessage = error.details ? error.details[0] : error.message;
    }
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(this.fileFormat), details: error.message, id: (_a = this.item) === null || _a === void 0 ? void 0 : _a.id, type: (_b = this.item) === null || _b === void 0 ? void 0 : _b.type, access: (_c = this.item) === null || _c === void 0 ? void 0 : _c.access, contentOrgId: (_d = this.item) === null || _d === void 0 ? void 0 : _d.orgId, response: 'Failure' }));
  }
  handleCalciteInternalAccordionChange(e) {
    this.hubTelemetry.emit(!e.detail.requestedAccordionItem.expanded
      ? Object.assign({}, dist.dictionary.category.interaction.action.open.label.accordion.details.downloadErrorMessage) : Object.assign({}, dist.dictionary.category.interaction.action.close.label.accordion.details.downloadErrorMessage));
  }
  renderErrorContent() {
    return this.canDisplayErrorMessage
      ? (h("calcite-accordion", { appearance: "transparent", class: "error-accordion-item", "icon-type": "caret" }, h("calcite-accordion-item", { class: "error-accordion-item-heading", description: "", heading: this.intl.t('errorHeader'), "icon-start": "exclamation-mark-triangle" }, h("p", { class: "error-accordion-item-content" }, this.errorMessage))))
      : (h("div", null, h("calcite-icon", { class: "error-header-icon", icon: "exclamation-mark-triangle" }), h("span", { class: "error-header" }, this.intl.t('errorHeader'))));
  }
  render() {
    return (h(Host, { "data-element": "download-list-card" }, h("arcgis-download-list-card-ui", { icon: this.formatIcon }, h("div", { slot: "header" }, this.intl.t(this.fileFormat)), h("arcgis-download-features-button", { appearance: "outline", fileFormat: this.fileFormat, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, slot: "button", width: "full" }), this.showError &&
      h("div", { class: "error-header-container", slot: "errors" }, this.renderErrorContent()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisDownloadListCard.style = arcgisDownloadListCardCss;

export { ArcgisDownloadListCard as arcgis_download_list_card };
