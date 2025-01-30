import { getStructuredLicense } from '@esri/hub-common';
import { h, Host } from '@stencil/core';
import { bind } from '../../utils/context';
import { getLicenseDescription, isCustomLicense, isGenericLicense } from '../../utils/license-picker';
import intlManager from '../../utils/intl-manager';
export class ArcgisHubLicensePicker {
  /*           *
   *  Methods  *
   *           */
  constructor() {
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
  static get is() { return "arcgis-hub-license-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-license-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-license-picker.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "licenseInfo": {
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
          "text": ""
        },
        "attribute": "license-info",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "modalIsOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubLicensePickerChange",
        "name": "arcgisHubLicensePickerChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubLicensePickerModalApply",
        "method": "handleApply",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubLicensePickerModalCancel",
        "method": "handleModalClose",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "calciteModalClose",
        "method": "handleModalClose",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
