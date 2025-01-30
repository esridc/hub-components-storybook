import { h, Host } from "@stencil/core";
import { bind } from "../../../../../../utils/context";
import { getLabel } from "../../../../utils";
import intlManager from "../../../../../../utils/intl-manager";
import { dictionary } from "@esri/telemetry-dictionary-hub";
export class ImagePicker {
  constructor() {
    this.params = undefined;
    this.styles = undefined;
    this.imgSrc = undefined;
    this.isEditing = false;
    bind(this, 'clearSrc', 'handleArcgisInputImageUploadSave');
  }
  get sizeDescription() {
    return getLabel(this.params.uiSchema, this.params.t, 'options.sizeDescription');
  }
  async componentWillLoad() {
    var _a;
    const uiSchema = (_a = this.params.uiSchema) !== null && _a !== void 0 ? _a : { options: null };
    const { options } = uiSchema;
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (options === null || options === void 0 ? void 0 : options.defaultImgUrl) {
      this.defaultImg = options === null || options === void 0 ? void 0 : options.defaultImgUrl;
    }
    if (options === null || options === void 0 ? void 0 : options.imgSrc) {
      this.imgSrc = options === null || options === void 0 ? void 0 : options.imgSrc;
    }
    else if (options === null || options === void 0 ? void 0 : options.defaultImgUrl) {
      this.imgSrc = options === null || options === void 0 ? void 0 : options.defaultImgUrl;
    }
  }
  handleArcgisInputImageUploadSave(evt) {
    this.isEditing = true;
    this.imgSrc = evt.detail.base64;
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.detail);
  }
  clearSrc() {
    this.isEditing = false;
    if (this.imgSrc === this.defaultImg) {
      this.imgSrc = undefined;
    }
    else {
      this.imgSrc = undefined;
      this.arcgisConfigurationEditorFieldInputChange.emit({
        blob: undefined,
        base64: undefined,
        fileName: undefined,
        format: undefined,
      });
      this.hubTelemetry.emit(dictionary.category.interaction.action.remove.label.image);
    }
  }
  onCalciteItemDropdownSelect(evt) {
    var _a, _b;
    const option = (_b = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.value;
    this.clearSrc();
    if (option === "reset") {
      this.imgSrc = this.defaultImg;
    }
  }
  renderButton() {
    let button;
    if (this.defaultImg && this.defaultImg === this.imgSrc) {
      button = h("calcite-button", { appearance: "outline", label: this.intl.t('set'), onClick: this.clearSrc, round: true }, this.intl.t('set'));
    }
    else if (this.defaultImg && this.defaultImg !== this.imgSrc) {
      button = (h("calcite-dropdown", null, h("calcite-button", { appearance: "transparent", "icon-end": "caret-down", slot: "trigger" }, this.intl.t('remove')), h("calcite-dropdown-group", null, h("calcite-dropdown-item", { "data-value": "reset" }, this.intl.t('reset')), h("calcite-dropdown-item", { "data-value": "upload" }, this.intl.t('upload')))));
    }
    else {
      button = h("calcite-button", { appearance: "outline", iconStart: "trash", label: this.intl.t('delete'), onClick: this.clearSrc });
    }
    return button;
  }
  render() {
    var _a;
    const uiOptions = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options;
    return (h(Host, { "data-element": "image-picker-field", style: this.styles }, !this.isEditing && this.imgSrc ?
      h("div", { class: "image-wrapper" }, h("img", { alt: "", src: this.imgSrc, style: { aspectRatio: uiOptions.aspectRatio } }), this.renderButton())
      : h("arcgis-hub-image-upload", { aspectRatio: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.aspectRatio, fillBackground: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.fillBackground, height: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.height, inline: true, maxHeight: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.maxHeight, maxWidth: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.maxWidth, onArcgisImageUploadSave: this.handleArcgisInputImageUploadSave, sizeDescription: this.sizeDescription })));
  }
  static get is() { return "hub-field-input-image-picker"; }
  static get originalStyleUrls() {
    return {
      "$": ["image-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["image-picker.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IRenderParams",
          "resolved": "IRenderParams",
          "references": {
            "IRenderParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "styles": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IStyleParams",
          "resolved": "IStyleParams",
          "references": {
            "IStyleParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "imgSrc": {},
      "isEditing": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorFieldInputChange",
        "name": "arcgisConfigurationEditorFieldInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ImageUploadSavePayload",
          "resolved": "ImageUploadSavePayload",
          "references": {
            "ImageUploadSavePayload": {
              "location": "import",
              "path": "../../../../../arcgis-hub-image-upload/types"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "calciteDropdownItemSelect",
        "method": "onCalciteItemDropdownSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
