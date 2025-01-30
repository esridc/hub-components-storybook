'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const downloadFeatures = require('./download-features-060012cd.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const downloadList = require('./download-list-00ce3845.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const checkPermission = require('./checkPermission-11ab5992.js');
require('./request-67da3c71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');

const arcgisDownloadListCardCss = ":host{position:relative;display:block}.error-header-container{display:flex;flex-direction:row;align-items:center;gap:0.5rem}.error-header-icon{--calcite-ui-icon-color:var(--calcite-color-status-danger)}.error-header{font-weight:var(--calcite-font-weight-bold)}.error-accordion-item{margin-top:0.75rem}.error-accordion-item-heading{--calcite-ui-icon-color:var(--calcite-color-status-danger)}.error-accordion-item-content{margin-bottom:0px}";

const ArcgisDownloadListCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.fileFormat = undefined;
    this.filterGeometry = undefined;
    this.item = undefined;
    this.layers = undefined;
    this.server = undefined;
    this.showError = false;
    this.errorMessage = '';
    context.bind(this, 'handleCalciteNoticeClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get formatIcon() {
    return downloadList.getFormatIcon(this.fileFormat);
  }
  get _context() { return state.getGlobalContext(); }
  get canDisplayErrorMessage() {
    return checkPermission.checkPermission('hub:content:downloads:displayErrors', this._context).access;
  }
  handleCalciteNoticeClose() {
    var _a, _b, _c, _d;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.download), { label: downloadFeatures.fileFormatToDisplayName(this.fileFormat), details: 'dismiss limit reached', id: (_a = this.item) === null || _a === void 0 ? void 0 : _a.id, type: (_b = this.item) === null || _b === void 0 ? void 0 : _b.type, access: (_c = this.item) === null || _c === void 0 ? void 0 : _c.access, contentOrgId: (_d = this.item) === null || _d === void 0 ? void 0 : _d.orgId, response: 'Failure' }));
  }
  clearErrors() {
    this.showError = false;
  }
  handleArcgisDownloadError(event) {
    var _a, _b, _c, _d;
    const { error } = event.detail;
    this.showError = true;
    if (downloadFeatures.isAGORateLimitError(error)) {
      this.errorMessage = error.message;
    }
    else if (this.canDisplayErrorMessage) {
      // TODO: @caleb + @aaron -- Rework this after Caleb's hub.js PR lands to include error message as the title 
      // of the accordion and error details as the accordion item
      this.errorMessage = error.details ? error.details[0] : error.message;
    }
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.download), { label: downloadFeatures.fileFormatToDisplayName(this.fileFormat), details: error.message, id: (_a = this.item) === null || _a === void 0 ? void 0 : _a.id, type: (_b = this.item) === null || _b === void 0 ? void 0 : _b.type, access: (_c = this.item) === null || _c === void 0 ? void 0 : _c.access, contentOrgId: (_d = this.item) === null || _d === void 0 ? void 0 : _d.orgId, response: 'Failure' }));
  }
  handleCalciteInternalAccordionChange(e) {
    this.hubTelemetry.emit(!e.detail.requestedAccordionItem.expanded
      ? Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.accordion.details.downloadErrorMessage) : Object.assign({}, index$1.dist.dictionary.category.interaction.action.close.label.accordion.details.downloadErrorMessage));
  }
  renderErrorContent() {
    return this.canDisplayErrorMessage
      ? (index.h("calcite-accordion", { appearance: "transparent", class: "error-accordion-item", "icon-type": "caret" }, index.h("calcite-accordion-item", { class: "error-accordion-item-heading", description: "", heading: this.intl.t('errorHeader'), "icon-start": "exclamation-mark-triangle" }, index.h("p", { class: "error-accordion-item-content" }, this.errorMessage))))
      : (index.h("div", null, index.h("calcite-icon", { class: "error-header-icon", icon: "exclamation-mark-triangle" }), index.h("span", { class: "error-header" }, this.intl.t('errorHeader'))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "download-list-card" }, index.h("arcgis-download-list-card-ui", { icon: this.formatIcon }, index.h("div", { slot: "header" }, this.intl.t(this.fileFormat)), index.h("arcgis-download-features-button", { appearance: "outline", fileFormat: this.fileFormat, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, slot: "button", width: "full" }), this.showError &&
      index.h("div", { class: "error-header-container", slot: "errors" }, this.renderErrorContent()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisDownloadListCard.style = arcgisDownloadListCardCss;

exports.arcgis_download_list_card = ArcgisDownloadListCard;
