import { getStructuredLicense } from '@esri/hub-common';
import { h, Host } from '@stencil/core';
import { bind } from '../../utils/context';
import { composeLicenses, getLicenseDescription, isCustomLicense } from '../../utils/license-picker';
import ScopedStyles from './arcgis-hub-license-picker-modal-styles';
import intlManager from '../../utils/intl-manager';
export class ArcgisHubLicensePickerModal {
  /*           *
   *  Methods  *
   *           */
  constructor() {
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
    return (h(Host, { "data-element": "license-picker-modal" }, h("style", null, ScopedStyles), h("calcite-modal", { "aria-labelledby": "license-picker-modal", open: this.modalIsOpen }, h("h3", { class: "license-picker-modal-title", slot: "header" }, this.intl.t('title')), h("div", { slot: "content" }, h("calcite-tabs", { layout: "center", scale: "m" }, h("calcite-tab-nav", { slot: "title-group" }, h("calcite-tab-title", { selected: true }, this.intl.t('chooseTabTitle')), h("calcite-tab-title", null, this.intl.t('editTabTitle'))), h("calcite-tab", { selected: true }, h("calcite-label", { class: "choose-picker-label", for: "license-picker" }, this.intl.t('chooseTabPickerLabel')), h("calcite-notice", { kind: "warning", open: this.wasCustomLicense }, h("div", { slot: "title" }, this.intl.t('overwriteCustomLicenseTitle')), h("div", { slot: "link" }, this.intl.t('overwriteCustomLicenseLinkMessage', { a: (...chunks) => h("a", { href: "https://doc.arcgis.com/en/hub/content/add-and-manage-groups.htm#ESRI_SECTION1_879A381A9C8C42D59018947CB2509CB2" }, chunks)
    }))), h("calcite-list", { class: "license-picker" }, this.licenseChoices.map(choice => h("calcite-list-item", { description: getLicenseDescription(this.intl, choice.type), key: choice.type, label: choice.abbr, selected: choice.type === this.structuredLicense.type, value: choice.abbr }, h("calcite-action", { "aria-label": this.intl.t('licenseInfoButtonAriaLabel'), "aria-labelledby": choice.abbr, "data-url": choice.url, icon: "information", onClick: this.handleOpenLink, slot: "actions-end", text: "" }))))), h("calcite-tab", null, h("div", { class: "custom-editor" }, h("calcite-notice", { kind: "warning", open: this.wasStructuredLicense }, h("div", { slot: "title" }, this.intl.t('overwriteStructuredLicenseTitle')), h("div", { slot: "message" }, this.intl.t('overwriteStructuredLicenseMessage')), h("div", { slot: "link" }, this.intl.t('overwriteStructuredLicenseLinkMessage', { a: (...chunks) => h("a", { href: "https://doc.arcgis.com/en/hub/content/add-and-manage-groups.htm#ESRI_SECTION1_879A381A9C8C42D59018947CB2509CB2" }, chunks)
    }))), h("arcgis-hub-rich-text", { label: this.intl.t('editTabEditorLabel'), name: this.intl.t('editTabEditorLabel'), placeholder: this.intl.t('editTabEditorPlaceholder'), ref: this.setRichTextEditor, toolbar: "heading,|,bold,italic,link,|,undo,redo", value: this.licenseInfo }))))), h("calcite-button", { appearance: "outline", class: "cancel-button", onClick: this.handleCancel, slot: "secondary", width: "full" }, this.intl.t('cancelButton')), h("calcite-button", { appearance: "solid", class: "apply-button", onClick: this.handleApply, slot: "primary", width: "full" }, this.intl.t('applyButton')))));
  }
  static get is() { return "arcgis-hub-license-picker-modal"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-license-picker-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-license-picker-modal.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "modalIsOpen": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "modal-is-open",
        "reflect": false,
        "defaultValue": "false"
      },
      "licenseInfo": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
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
      },
      "wasCustomLicense": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "was-custom-license",
        "reflect": false
      },
      "wasStructuredLicense": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "was-structured-license",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubLicensePickerModalApply",
        "name": "arcgisHubLicensePickerModalApply",
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
      }, {
        "method": "arcgisHubLicensePickerModalCancel",
        "name": "arcgisHubLicensePickerModalCancel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "calciteListItemSelect",
        "method": "handleLicenseSelection",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubRichTextChange",
        "method": "handleTextChange",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
