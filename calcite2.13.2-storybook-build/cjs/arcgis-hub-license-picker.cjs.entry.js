'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const licensePicker = require('./license-picker-6c9d5743.js');
const intlManager = require('./intl-manager-f0103583.js');
const getStructuredLicense = require('./get-structured-license-4e9f994b.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubLicensePickerCss = ":host{display:block;--calcite-font-size--1:1rem;--calcite-font-size--2:1rem}.choose-button{margin-top:30px}";

const ArcgisHubLicensePicker = class {
  /*           *
   *  Methods  *
   *           */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubLicensePickerChange = index.createEvent(this, "arcgisHubLicensePickerChange", 7);
    this.licenseInfo = undefined;
    this.modalIsOpen = false;
    context.bind(this, 'handleApply', 'handleModalClose', 'handleModalOpen', 'handleOpenLink', 'handleRemove');
  }
  get structuredLicense() {
    return getStructuredLicense.getStructuredLicense(this.licenseInfo);
  }
  // * * Lifecycle * *
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  // * * Listeners * *
  // 'arcgis-hub-license-picker-modal' is not part of the shadow DOM; target 'body' instead
  handleApply(event) {
    const newLicenseInfo = event.detail;
    this.licenseInfo = newLicenseInfo;
    this.arcgisHubLicensePickerChange.emit(this.licenseInfo);
    this.handleModalClose();
  }
  // 'arcgis-hub-license-picker-modal' is not part of the shadow DOM; target 'body' instead
  handleModalClose() {
    this.modalIsOpen = false;
  }
  // TODO: How do we want to keep this page in sync when there are
  // multiple modals on the same page? Adding a listener here previously
  // caused a bug where opening the access level modal would open this modal as well.
  handleModalOpen() {
    this.modalIsOpen = true;
  }
  // * * General * *
  handleRemove() {
    if (confirm(this.intl.t('editorRemoveWarning'))) {
      this.licenseInfo = '';
      this.arcgisHubLicensePickerChange.emit(this.licenseInfo);
    }
  }
  handleOpenLink(event) {
    // Ends up "hiding" links from the DOM, mouse hovers, right clicks, etc. May be worth noting
    window.open(event.target.dataset.url);
  }
  // * * Render * *
  render() {
    const licenseDescription = licensePicker.getLicenseDescription(this.intl, this.structuredLicense.type);
    return (index.h(index.Host, { "data-element": "license-picker" }, index.h("arcgis-wormhole", null, index.h("arcgis-hub-license-picker-modal", { licenseInfo: this.licenseInfo, modalIsOpen: this.modalIsOpen, wasCustomLicense: licensePicker.isCustomLicense(this.structuredLicense.type), wasStructuredLicense: !licensePicker.isGenericLicense(this.structuredLicense.type) })), index.h("div", { class: "license-picker-container" }, index.h("div", { class: "license-picker-editor" }, index.h("calcite-label", { class: "active-license-label", for: "active-license" }, this.intl.t('editorLabel')), index.h("calcite-list", { class: "active-license" }, index.h("calcite-list-item", { description: licenseDescription, label: licenseDescription
        ? this.structuredLicense.abbr || this.intl.t('selectedLicenseLabelFallback')
        : this.intl.t('selectedLicenseLabelNoLicense'), nonInteractive: true, value: this.structuredLicense.type }, !!licenseDescription &&
      [
        (!!this.structuredLicense.url &&
          index.h("calcite-action", { "aria-label": this.intl.t('licenseInfoButtonAriaLabel'), "aria-labelledby": this.structuredLicense.abbr, "data-url": this.structuredLicense.url, icon: "information", key: "information", onClick: this.handleOpenLink, slot: "actions-end", text: "" })),
        (index.h("calcite-action", { icon: "trash", key: "trash", onClick: this.handleRemove, slot: "actions-end", text: "" }))
      ])), index.h("calcite-button", { appearance: "solid", class: "choose-button", onClick: this.handleModalOpen, type: "button" }, this.intl.t('chooseButton'))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubLicensePicker.style = arcgisHubLicensePickerCss;

exports.arcgis_hub_license_picker = ArcgisHubLicensePicker;
