import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getLicenseDescription, i as isCustomLicense, a as isGenericLicense } from './license-picker-34255c37.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getStructuredLicense } from './get-structured-license-33306790.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubLicensePickerCss = ":host{display:block;--calcite-font-size--1:1rem;--calcite-font-size--2:1rem}.choose-button{margin-top:30px}";

const ArcgisHubLicensePicker = class {
  /*           *
   *  Methods  *
   *           */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubLicensePickerChange = createEvent(this, "arcgisHubLicensePickerChange", 7);
    this.licenseInfo = undefined;
    this.modalIsOpen = false;
    bind(this, 'handleApply', 'handleModalClose', 'handleModalOpen', 'handleOpenLink', 'handleRemove');
  }
  get structuredLicense() {
    return getStructuredLicense(this.licenseInfo);
  }
  // * * Lifecycle * *
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    const licenseDescription = getLicenseDescription(this.intl, this.structuredLicense.type);
    return (h(Host, { "data-element": "license-picker" }, h("arcgis-wormhole", null, h("arcgis-hub-license-picker-modal", { licenseInfo: this.licenseInfo, modalIsOpen: this.modalIsOpen, wasCustomLicense: isCustomLicense(this.structuredLicense.type), wasStructuredLicense: !isGenericLicense(this.structuredLicense.type) })), h("div", { class: "license-picker-container" }, h("div", { class: "license-picker-editor" }, h("calcite-label", { class: "active-license-label", for: "active-license" }, this.intl.t('editorLabel')), h("calcite-list", { class: "active-license" }, h("calcite-list-item", { description: licenseDescription, label: licenseDescription
        ? this.structuredLicense.abbr || this.intl.t('selectedLicenseLabelFallback')
        : this.intl.t('selectedLicenseLabelNoLicense'), nonInteractive: true, value: this.structuredLicense.type }, !!licenseDescription &&
      [
        (!!this.structuredLicense.url &&
          h("calcite-action", { "aria-label": this.intl.t('licenseInfoButtonAriaLabel'), "aria-labelledby": this.structuredLicense.abbr, "data-url": this.structuredLicense.url, icon: "information", key: "information", onClick: this.handleOpenLink, slot: "actions-end", text: "" })),
        (h("calcite-action", { icon: "trash", key: "trash", onClick: this.handleRemove, slot: "actions-end", text: "" }))
      ])), h("calcite-button", { appearance: "solid", class: "choose-button", onClick: this.handleModalOpen, type: "button" }, this.intl.t('chooseButton'))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubLicensePicker.style = arcgisHubLicensePickerCss;

export { ArcgisHubLicensePicker as arcgis_hub_license_picker };
