import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getLabel } from './getLabel-a2b67324.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';

const imagePickerCss = ".image-wrapper{display:flex;flex-direction:column;align-items:flex-end}.image-wrapper img{width:100%}.image-wrapper calcite-button{height:2rem;padding-left:1rem}";

const ImagePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.remove.label.image);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ImagePicker.style = imagePickerCss;

export { ImagePicker as hub_field_input_image_picker };
