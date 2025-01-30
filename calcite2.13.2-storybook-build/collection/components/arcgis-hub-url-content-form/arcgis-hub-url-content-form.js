var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { extentToBBox, validateUrl } from "@esri/hub-common";
import { h, Host } from "@stencil/core";
import { bind } from "../../utils/context";
import intlManager from "../../utils/intl-manager";
import Debounce from "../../decorators/debounce";
const dateFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
export class ArcgisHubUrlContentForm {
  constructor() {
    // Types, intl and type mapping.
    this.types = [
      // since Doc Link is the default we need to set it to active in the dropdown
      { intl: 'doclink', type: 'Document Link', active: true },
      { intl: 'csv', type: 'CSV' },
      { intl: 'shp', type: 'Shapefile' },
      { intl: 'geojson', type: 'GeoJson' },
      { intl: 'featureservice', type: 'Feature Service' },
      { intl: 'xls', type: 'Microsoft Excel' },
      { intl: 'pdf', type: 'PDF' },
      { intl: 'png', type: 'Image' },
      { intl: 'jpg', type: 'Image' }
    ];
    this.owner = undefined;
    this.defaultExtent = undefined;
    this.portalName = undefined;
    this.selectedTypeText = undefined;
    this.errorString = undefined;
    this.showTypePicker = false;
    this.validatedUrlItem = undefined;
    this.mergedUrlItem = undefined;
    bind(this, 'setDropdownEl', 'setInputEl', 'handleOnInput', 'handleOnKeyDown');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  validateDebounced() {
    this.validateUrl();
  }
  /**
   * Listen to the calciteDropdownSelect event, gets the selected type,
   * sets the type on the validatedUrlItem, and then emits out the validatedUrl item.
   */
  handleItemTypeSelection() {
    const selectedItem = this.dropdownEl.selectedItems[0];
    if (selectedItem) {
      const selectedValue = selectedItem.dataset.value;
      // Update dom text with the title attr (it will already be translated)
      this.selectedTypeText = selectedItem.getAttribute('title');
      // If there's already a validatedUrlItem object...
      if (this.validatedUrlItem) {
        // Update the type on it to this new type.
        this.validatedUrlItem.type = selectedValue;
        // also add it to mergedUrlItem
        this.mergedUrlItem.type = selectedValue;
        // Emit out the object.
        this.arcgisHubItemTypeSelected.emit(this.mergedUrlItem);
      }
    }
  }
  /**
   * Handles url validation.
   * Gets the url from the inputEl element, if a URL is present
   * then it does validation, determines if the type picker should be shown,
   * and emits the urlValidatedItem.
   */
  async validateUrl() {
    // Get the input element value.
    const url = this.inputEl.value;
    if (url) {
      // Run validation.
      const validationResult = await validateUrl(url);
      // assign it to state
      this.validatedUrlItem = validationResult;
      // create merged item
      const extent = validationResult.item.extent || this.defaultExtent;
      const mergedUrlItem = Object.assign({ owner: this.owner, extent: extentToBBox(extent), spatialReference: extent.spatialReference, source: this.portalName, publishedDate: this.intl.formatDate(new Date(), dateFormatOptions), access: 'private' }, validationResult.item);
      // If the extent is in the wrong format from validateUrl then fix it.
      if (typeof mergedUrlItem.extent === 'object') {
        const mergedExtentObj = mergedUrlItem.extent;
        mergedUrlItem.extent = extentToBBox(mergedExtentObj);
      }
      // update state
      this.mergedUrlItem = mergedUrlItem;
      // If there is no type then show type picker && set
      // default type to Web Link.
      if (!validationResult.type) {
        // Show type picker.
        this.showTypePicker = true;
        // set default type to Document Link
        this.validatedUrlItem.type = 'Document Link';
        this.mergedUrlItem.type = 'Document Link';
        // Make sure we know what type is selected.
        this.selectedTypeText = this.intl.t('doclink');
      }
      // Emit out event.
      this.arcgisHubUrlValidated.emit(this.mergedUrlItem);
    }
    else {
      // if there's no url then reset validatedUrlItem to return the UI
      // to default state. Needed if swapping between urls.
      this.validatedUrlItem = undefined;
    }
  }
  handleOnInput() {
    this.validateDebounced();
  }
  handleOnKeyDown(e) {
    if (e.key === "Enter") {
      this.validateDebounced();
    }
  }
  setDropdownEl(el) {
    this.dropdownEl = el;
  }
  setInputEl(el) {
    this.inputEl = el;
  }
  renderSubText() {
    const { intl, showTypePicker, validatedUrlItem } = this;
    // Set initial default state
    let dom = (h("span", null, intl.t('subText')));
    // Check if validation has been done && if there was an error.
    if (validatedUrlItem && validatedUrlItem.error) {
      dom = (h("span", null, h("calcite-icon", { class: "error", icon: "x-octagon", scale: "s" }), intl.t(validatedUrlItem.error)));
      // Otherwise if things passed and we need to show the type picker
    }
    else if (validatedUrlItem && validatedUrlItem.pass && showTypePicker) {
      dom = (h("span", null, h("calcite-icon", { class: validatedUrlItem.type ? "success" : "error", icon: validatedUrlItem.type ? "check-circle" : "x-octagon", scale: "s" }), validatedUrlItem.type && this.intl.t('recognizedType'), h("calcite-dropdown", { placement: "top", ref: this.setDropdownEl }, h("calcite-button", { appearance: "transparent", "icon-end": "caret-down", slot: "trigger" }, this.selectedTypeText || this.intl.t('fileTypeSelector')), h("calcite-dropdown-group", { "selection-mode": "single" }, this.types.map(type => h("calcite-dropdown-item", { "data-value": type.type, key: type.type, selected: type.active, title: this.intl.t(type.intl) }, this.intl.t(type.intl)))))));
      // Otherwise if it passed and we don't need to display type.
    }
    else if (validatedUrlItem && validatedUrlItem.pass) {
      const type = validatedUrlItem.type.toLowerCase().split(' ').join('');
      dom = (h("span", null, h("calcite-icon", { class: "success", icon: "check-circle", scale: "s" }), this.intl.t(type)));
    }
    return dom;
  }
  render() {
    return (h(Host, null, h("header", null, this.intl.t('heading')), h("calcite-input", { onInput: this.handleOnInput, onKeyDown: this.handleOnKeyDown, ref: this.setInputEl }), this.renderSubText()));
  }
  static get is() { return "arcgis-hub-url-content-form"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-url-content-form.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-url-content-form.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "owner": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDataSourceSelector"
            }],
          "text": "Current users name IE the owner of the to be created item."
        },
        "attribute": "owner",
        "reflect": false
      },
      "defaultExtent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IExtent",
          "resolved": "IExtent",
          "references": {
            "IExtent": {
              "location": "import",
              "path": "@esri/arcgis-rest-feature-layer"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IExtent}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDataSourceSelector"
            }],
          "text": "Default extenxt which comes from the portal object"
        }
      },
      "portalName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubDataSourceSelector"
            }],
          "text": "Portals name."
        },
        "attribute": "portal-name",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "selectedTypeText": {},
      "errorString": {},
      "showTypePicker": {},
      "validatedUrlItem": {},
      "mergedUrlItem": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubUrlValidated",
        "name": "arcgisHubUrlValidated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{EventEmitter<IValidatedUrlItem>}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubUrlContentForm"
            }],
          "text": "Event which is emitted when the url is validated."
        },
        "complexType": {
          "original": "IItemAdd",
          "resolved": "IItemAdd",
          "references": {
            "IItemAdd": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        }
      }, {
        "method": "arcgisHubItemTypeSelected",
        "name": "arcgisHubItemTypeSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{EventEmitter<IValidatedUrlItem>}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubUrlContentForm"
            }],
          "text": "Event which is emitted when type is manually selected."
        },
        "complexType": {
          "original": "IItemAdd",
          "resolved": "IItemAdd",
          "references": {
            "IItemAdd": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get listeners() {
    return [{
        "name": "calciteDropdownSelect",
        "method": "handleItemTypeSelection",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Debounce({ timeout: 300 })
], ArcgisHubUrlContentForm.prototype, "validateDebounced", null);
