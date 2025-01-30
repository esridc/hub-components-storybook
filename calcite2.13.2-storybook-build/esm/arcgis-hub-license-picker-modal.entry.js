import { r as registerInstance, c as createEvent, h, H as Host$1, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { c as composeLicenses, g as getLicenseDescription, i as isCustomLicense } from './license-picker-34255c37.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getStructuredLicense } from './get-structured-license-33306790.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

/* NOTE: Define styles here. See note in `arcgis-hub-license-picker-modal.render()` for more info. */
const Host = 'arcgis-hub-license-picker-modal';
const ScopedStyles = `
    ${Host} {
      --calcite-font-size--1: 1rem;
      --calcite-font-size--2: 1rem;
    }

    ${Host} calcite-modal [slot="content"] {
      height: 50vh;
    }

    ${Host} calcite-modal calcite-tabs {
      min-height: 100%
    }

    ${Host} calcite-modal calcite-tab {
      height: auto;
    }

    ${Host} calcite-modal .custom-editor {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    ${Host} calcite-modal arcgis-hub-rich-text {
      flex-grow: 1;
    }

    ${Host} calcite-modal .ck.ck-editor {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    ${Host} calcite-modal .ck.ck-editor__main {
      flex-grow: 1;
    }

    ${Host} calcite-modal .ck.ck-editor__editable {
      height: 100%;
      min-height: 12rem;
    }

    @media screen and (max-width: 816px) {
      ${Host} calcite-modal [slot="content"] {
        height: 100%;
      }
    }
  `;

const arcgisHubLicensePickerModalCss = "";

const ArcgisHubLicensePickerModal = class {
  /*           *
   *  Methods  *
   *           */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubLicensePickerModalApply = createEvent(this, "arcgisHubLicensePickerModalApply", 7);
    this.arcgisHubLicensePickerModalCancel = createEvent(this, "arcgisHubLicensePickerModalCancel", 7);
    // Must key on 'IStructuredLicense.abbr' for 'getStandardLicense()' to match
    this.licenseChoiceAbbrs = [
      'CC0',
      'CC BY',
      'CC BY-SA',
      'CC BY-ND',
      'CC BY-NC',
      'CC BY-NC-SA',
      'CC BY-NC-ND',
      'PDDL',
      'ODbL',
      'ODC BY'
    ];
    this.modalIsOpen = false;
    this.licenseInfo = undefined;
    this.wasCustomLicense = undefined;
    this.wasStructuredLicense = undefined;
    bind(this, 'handleApply', 'handleCancel', 'handleLicenseSelection', 'handleOpenLink', 'handleTextChange', 'setRichTextEditor');
  }
  get structuredLicense() {
    return getStructuredLicense(this.licenseInfo);
  }
  // * * Lifecycle * *
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.licenseChoices = composeLicenses(this.licenseChoiceAbbrs);
  }
  // * * Listeners * *
  handleLicenseSelection(event) {
    // get the selected option
    const selectedItem = event.target;
    // if no option is selected, return
    if (!selectedItem) {
      return;
    }
    // get the value of the selected option
    const selectedItemValue = selectedItem.value;
    // find the license object that matches the selected value
    const selectedLicense = this.licenseChoices.find(license => license.abbr === selectedItemValue);
    // set the licenseInfo to the selected license's abbreviation
    this.licenseInfo = selectedLicense.abbr || '';
  }
  // 'arcgis-hub-rich-text' is not part of the shadow DOM; target 'body' instead
  handleTextChange(event) {
    this.licenseInfo = event.target.value;
  }
  // * * General * *
  handleApply() {
    const overwritesCustomLicense = this.wasCustomLicense && !isCustomLicense(this.structuredLicense.type);
    if (overwritesCustomLicense) {
      if (!confirm(this.intl.t('overwriteWarning'))) {
        return;
      }
    }
    this.arcgisHubLicensePickerModalApply.emit(this.licenseInfo);
  }
  handleCancel() {
    this.arcgisHubLicensePickerModalCancel.emit();
  }
  handleOpenLink(event) {
    // Ends up "hiding" links from the DOM, mouse hovers, right clicks, etc. May be worth noting
    window.open(event.target.dataset.url);
  }
  setRichTextEditor(el) {
    this.richTextEditor = el;
  }
  // * * Render * *
  render() {
    return (h(Host$1, { "data-element": "license-picker-modal" }, h("style", null, ScopedStyles), h("calcite-modal", { "aria-labelledby": "license-picker-modal", open: this.modalIsOpen }, h("h3", { class: "license-picker-modal-title", slot: "header" }, this.intl.t('title')), h("div", { slot: "content" }, h("calcite-tabs", { layout: "center", scale: "m" }, h("calcite-tab-nav", { slot: "title-group" }, h("calcite-tab-title", { selected: true }, this.intl.t('chooseTabTitle')), h("calcite-tab-title", null, this.intl.t('editTabTitle'))), h("calcite-tab", { selected: true }, h("calcite-label", { class: "choose-picker-label", for: "license-picker" }, this.intl.t('chooseTabPickerLabel')), h("calcite-notice", { kind: "warning", open: this.wasCustomLicense }, h("div", { slot: "title" }, this.intl.t('overwriteCustomLicenseTitle')), h("div", { slot: "link" }, this.intl.t('overwriteCustomLicenseLinkMessage', { a: (...chunks) => h("a", { href: "https://doc.arcgis.com/en/hub/content/add-and-manage-groups.htm#ESRI_SECTION1_879A381A9C8C42D59018947CB2509CB2" }, chunks)
    }))), h("calcite-list", { class: "license-picker" }, this.licenseChoices.map(choice => h("calcite-list-item", { description: getLicenseDescription(this.intl, choice.type), key: choice.type, label: choice.abbr, selected: choice.type === this.structuredLicense.type, value: choice.abbr }, h("calcite-action", { "aria-label": this.intl.t('licenseInfoButtonAriaLabel'), "aria-labelledby": choice.abbr, "data-url": choice.url, icon: "information", onClick: this.handleOpenLink, slot: "actions-end", text: "" }))))), h("calcite-tab", null, h("div", { class: "custom-editor" }, h("calcite-notice", { kind: "warning", open: this.wasStructuredLicense }, h("div", { slot: "title" }, this.intl.t('overwriteStructuredLicenseTitle')), h("div", { slot: "message" }, this.intl.t('overwriteStructuredLicenseMessage')), h("div", { slot: "link" }, this.intl.t('overwriteStructuredLicenseLinkMessage', { a: (...chunks) => h("a", { href: "https://doc.arcgis.com/en/hub/content/add-and-manage-groups.htm#ESRI_SECTION1_879A381A9C8C42D59018947CB2509CB2" }, chunks)
    }))), h("arcgis-hub-rich-text", { label: this.intl.t('editTabEditorLabel'), name: this.intl.t('editTabEditorLabel'), placeholder: this.intl.t('editTabEditorPlaceholder'), ref: this.setRichTextEditor, toolbar: "heading,|,bold,italic,link,|,undo,redo", value: this.licenseInfo }))))), h("calcite-button", { appearance: "outline", class: "cancel-button", onClick: this.handleCancel, slot: "secondary", width: "full" }, this.intl.t('cancelButton')), h("calcite-button", { appearance: "solid", class: "apply-button", onClick: this.handleApply, slot: "primary", width: "full" }, this.intl.t('applyButton')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubLicensePickerModal.style = arcgisHubLicensePickerModalCss;

export { ArcgisHubLicensePickerModal as arcgis_hub_license_picker_modal };
