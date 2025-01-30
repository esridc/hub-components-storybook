'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const getLabel = require('./getLabel-c21bfe7f.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');

const imagePickerCss = ".image-wrapper{display:flex;flex-direction:column;align-items:flex-end}.image-wrapper img{width:100%}.image-wrapper calcite-button{height:2rem;padding-left:1rem}";

const ImagePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    this.styles = undefined;
    this.imgSrc = undefined;
    this.isEditing = false;
    context.bind(this, 'clearSrc', 'handleArcgisInputImageUploadSave');
  }
  get sizeDescription() {
    return getLabel.getLabel(this.params.uiSchema, this.params.t, 'options.sizeDescription');
  }
  async componentWillLoad() {
    var _a;
    const uiSchema = (_a = this.params.uiSchema) !== null && _a !== void 0 ? _a : { options: null };
    const { options } = uiSchema;
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.remove.label.image);
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
      button = index.h("calcite-button", { appearance: "outline", label: this.intl.t('set'), onClick: this.clearSrc, round: true }, this.intl.t('set'));
    }
    else if (this.defaultImg && this.defaultImg !== this.imgSrc) {
      button = (index.h("calcite-dropdown", null, index.h("calcite-button", { appearance: "transparent", "icon-end": "caret-down", slot: "trigger" }, this.intl.t('remove')), index.h("calcite-dropdown-group", null, index.h("calcite-dropdown-item", { "data-value": "reset" }, this.intl.t('reset')), index.h("calcite-dropdown-item", { "data-value": "upload" }, this.intl.t('upload')))));
    }
    else {
      button = index.h("calcite-button", { appearance: "outline", iconStart: "trash", label: this.intl.t('delete'), onClick: this.clearSrc });
    }
    return button;
  }
  render() {
    var _a;
    const uiOptions = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options;
    return (index.h(index.Host, { "data-element": "image-picker-field", style: this.styles }, !this.isEditing && this.imgSrc ?
      index.h("div", { class: "image-wrapper" }, index.h("img", { alt: "", src: this.imgSrc, style: { aspectRatio: uiOptions.aspectRatio } }), this.renderButton())
      : index.h("arcgis-hub-image-upload", { aspectRatio: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.aspectRatio, fillBackground: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.fillBackground, height: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.height, inline: true, maxHeight: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.maxHeight, maxWidth: uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.maxWidth, onArcgisImageUploadSave: this.handleArcgisInputImageUploadSave, sizeDescription: this.sizeDescription })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ImagePicker.style = imagePickerCss;

exports.hub_field_input_image_picker = ImagePicker;
