import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';

const arcgisHubImageUploadCss = ".image-upload__title{margin-bottom:0px;font-size:var(--calcite-font-size-2);line-height:1.5rem}.image-upload__content{transition:all 200ms ease-in-out;border:1px solid var(--calcite-color-border-3);box-sizing:border-box;background-color:var(--calcite-color-background);padding-left:2rem;padding-right:2rem;padding-top:1rem;padding-bottom:1.5rem}.image-upload__content--with-map{min-height:400px}.image-upload__content--no-padding{padding:0px}.image-upload__canvas{left:-10000px;visibility:hidden;position:fixed}.or-container{margin-top:1rem;margin-bottom:1rem;text-align:center;font-weight:var(--calcite-font-weight-medium)}.or-container:before,.or-container:after{content:\"\";border-top:solid 1px var(--calcite-color-border-input);width:15%;height:1px;z-index:1;display:inline-block;vertical-align:middle}.or-wrapper{padding-left:0.5rem;padding-right:0.5rem}.image-upload__from-map-button{border:1px solid var(--calcite-color-foreground-3);background-color:var(--calcite-color-foreground-1);padding:1rem;text-align:center}.image-upload__from-map-button:hover{border:1px solid var(--calcite-color-brand)}.image-upload__from-map-title{display:inline-block}.from-map-title-wrapper{display:flex;align-items:center}.from-map-icon{margin-right:0.5rem}.image-upload__from-map-desc{margin:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem}.hide{display:none}.button-container{margin-top:0.5rem;display:flex;width:100%;flex-direction:row;justify-content:space-between;padding-top:1.25rem}.error{background-color:#FFF1EF;border-color:var(--calcite-color-status-danger)}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ACTIVE_STEP;
(function (ACTIVE_STEP) {
  ACTIVE_STEP["FILE"] = "file";
  ACTIVE_STEP["EDIT"] = "edit";
})(ACTIVE_STEP || (ACTIVE_STEP = {}));
const ArcgisHubImageUpload = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisImageUploadCancel = createEvent(this, "arcgisImageUploadCancel", 7);
    this.arcgisImageUploadError = createEvent(this, "arcgisImageUploadError", 7);
    this.arcgisImageUploadSave = createEvent(this, "arcgisImageUploadSave", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.imageFormat = "png";
    this.fileName = "";
    this.triggerErrorState = () => {
      this.hasError = true;
      setTimeout(() => {
        this.resetErrorState();
      }, 3000);
    };
    this.resetErrorState = () => {
      this.hasError = false;
    };
    this.handleCancel = () => {
      this.arcgisImageUploadCancel.emit();
    };
    this.handleChooseDiffClick = () => {
      this.activeStep = ACTIVE_STEP.FILE;
      this.previewSrc = "";
      this.editExisting = false;
      // Emit out an empty payload to clear the image
      this.arcgisImageUploadSave.emit({
        blob: undefined,
        base64: undefined,
        fileName: undefined,
        format: undefined,
      });
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.add.label.image);
    };
    this.handleSaveClick = async () => {
      if (this.activeStep === ACTIVE_STEP.FILE) {
        return;
      }
      this.saving = true;
      const data = await this.getCanvasImage();
      this.arcgisImageUploadSave.emit(data);
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.add.label.image);
      if (this.inline) {
        this.resetState();
      }
    };
    this.modalTitle = undefined;
    this.sizeDescription = undefined;
    this.zoomToFit = true;
    this.maxWidth = 300;
    this.maxHeight = 300;
    this.fillBackground = false;
    this.active = undefined;
    this.height = window.innerWidth < 412 ? 200 : 300;
    this.aspectRatio = 1;
    this.inline = false;
    this.previewSrc = undefined;
    this.saving = false;
    this.editExisting = false;
    this.isModified = false;
    this.activeStep = ACTIVE_STEP.FILE;
    this.hasError = false;
    bind(this, 'handleCancel', 'handleChooseDiffClick', 'handleSaveClick', 'getEditStepRef', 'getCanvasRef');
  }
  get _messageOverrides() {
    return {
      close: this.intl.t('close')
    };
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  handleFileChange(evt) {
    const { fileName, dataURL } = evt.detail;
    this.fileName = fileName;
    this.previewSrc = dataURL;
    this.activeStep = ACTIVE_STEP.EDIT;
    this.resetErrorState();
  }
  handleInvalidFile() {
    this.arcgisImageUploadError.emit("invalid file type.");
    this.triggerErrorState();
  }
  async handleImageChange() {
    this.isModified = true;
    if (this.activeStep === ACTIVE_STEP.FILE) {
      return;
    }
    // this.saving = true;
    const data = await this.getCanvasImage();
    this.arcgisImageUploadSave.emit(data);
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.add.label.image);
  }
  handleActiveChange() {
    if (!this.active) {
      this.resetState();
    }
  }
  resetState() {
    this.activeStep = ACTIVE_STEP.FILE;
    this.saving = false;
    this.isModified = false;
    this.previewSrc = "";
    this.editExisting = false;
    this.resetErrorState();
  }
  dataURIToBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], {
      type: mimeString
    });
    return blob;
  }
  drawImage({ selectionX, selectionY, selectionWidth, selectionHeight, canvasWidth, canvasHeight, minWidth, minHeight, drawDimensions }, scaleFactor, img, context) {
    this.canvasEl.width = canvasWidth < minWidth ? minWidth : canvasWidth * scaleFactor;
    this.canvasEl.height = canvasHeight < minHeight ? minHeight : canvasHeight * scaleFactor;
    if (this.maxWidth) {
      if (this.canvasEl.width > this.maxWidth) {
        this.canvasEl.width = this.maxWidth;
      }
    }
    if (this.maxHeight) {
      if (this.canvasEl.height > this.maxHeight) {
        this.canvasEl.height = this.maxHeight;
      }
    }
    const left = drawDimensions.left * this.canvasEl.width;
    const top = drawDimensions.top * this.canvasEl.height;
    const width = drawDimensions.width * this.canvasEl.width;
    const height = drawDimensions.height * this.canvasEl.height;
    if (this.fillBackground) {
      context.fillStyle = "#efefef";
      context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }
    context.drawImage(img, selectionX, selectionY, selectionWidth, selectionHeight, left, top, width, height);
    const base64 = this.canvasEl.toDataURL("image/png");
    const blob = this.dataURIToBlob(base64);
    return {
      base64,
      blob
    };
  }
  async getScaledImageData(img) {
    const context = this.canvasEl.getContext("2d");
    const drawParameters = await this.editStepEl.getDrawParameters();
    let results;
    function retry() {
      context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      return this.drawImage(drawParameters, 1600 / img.width, img, context);
    }
    try {
      results = this.drawImage(drawParameters, 1, img, context);
      if (results.blob.size > 10000000 || results.blob.size === 0) {
        results = retry();
      }
    }
    catch (e) {
      if (e.name !== "NS_ERROR_FAILURE") {
        this.arcgisImageUploadError.emit("unable to save the image provided.");
      }
      else {
        results = retry();
      }
    }
    return {
      blob: results === null || results === void 0 ? void 0 : results.blob,
      base64: results === null || results === void 0 ? void 0 : results.base64,
      format: this.imageFormat,
      fileName: this.fileName
    };
  }
  getCanvasImage() {
    return new Promise((resolve) => {
      const img = new Image();
      if (this.previewSrc.indexOf("arcgis.com") > -1) {
        img.crossOrigin = "Anonymous";
      }
      img.onload = () => {
        const properAspectRatio = Math.abs(this.aspectRatio - img.width / img.height) < 0.01;
        if (properAspectRatio && !this.isModified) {
          resolve({
            blob: this.dataURIToBlob(this.previewSrc),
            base64: this.previewSrc,
            format: this.imageFormat,
            fileName: this.fileName
          });
          return;
        }
        resolve(this.getScaledImageData(img));
      };
      img.src = this.previewSrc;
    });
  }
  getEditStepRef(el) {
    this.editStepEl = el;
  }
  getCanvasRef(el) {
    this.canvasEl = el;
  }
  // These buttons are only rendered when the component is inline
  renderInlineEditStateButtons() {
    if (this.activeStep === ACTIVE_STEP.EDIT) {
      return (h("div", { class: "button-container" }, h("calcite-button", { appearance: "transparent", disabled: this.saving, "icon-start": "chevron-left", onClick: this.handleChooseDiffClick, slot: "back", width: this.inline ? "auto" : "full" }, this.intl.t('chooseDiff'))));
    }
  }
  // These buttons are only rendered when the component is in a modal
  renderModalButtons() {
    const buttons = (h(Fragment, null, (this.activeStep === ACTIVE_STEP.EDIT) && (h("calcite-button", { appearance: "transparent", disabled: this.saving, "icon-start": "chevron-left", onClick: this.handleChooseDiffClick, slot: "back", width: "full" }, this.intl.t('chooseDiff'))), h("calcite-button", { appearance: "outline", class: {
        hide: this.inline
      }, disabled: this.saving, onClick: this.handleCancel, slot: "secondary", width: "full" }, this.intl.t('cancel')), h("calcite-button", { appearance: "solid", class: {
        hide: this.inline
      }, disabled: this.saving, loading: this.saving, onClick: this.handleSaveClick, slot: "primary", width: "full" }, this.intl.t('done'))));
    return buttons;
  }
  renderContent() {
    return (h(Fragment, null, this.modalTitle && h("h3", { "aria-label": this.modalTitle, class: "image-upload__title", id: "image-upload-modal-title", slot: "header" }, this.modalTitle), this.inline && this.renderInlineEditStateButtons(), h("div", { class: {
        ["image-upload__content"]: true,
        error: this.hasError
      }, slot: "content" }, this.activeStep === ACTIVE_STEP.FILE && (h("div", null, h("arcgis-hub-image-upload-file-step", { sizeDescription: this.sizeDescription }))), this.activeStep === ACTIVE_STEP.EDIT && (h("arcgis-hub-image-upload-edit-step", { aspectRatio: this.aspectRatio, height: this.height, previewSrc: this.previewSrc, ref: this.getEditStepRef, zoomToFit: this.zoomToFit })), this.activeStep === ACTIVE_STEP.EDIT && (h("canvas", { class: "image-upload__canvas", ref: this.getCanvasRef }))), !this.inline && this.renderModalButtons()));
  }
  render() {
    return (h(Host, { "data-element": "image-upload" }, this.inline ? (h(Fragment, null, this.renderContent())) :
      h("calcite-modal", { "aria-labelledby": "image-upload-modal-title", "aria-modal": "true", messageOverrides: this._messageOverrides, onCalciteModalClose: this.handleCancel, open: this.active, outsideCloseDisabled: true, role: "dialog", width: "m" }, this.renderContent())));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["handleActiveChange"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 1000 })
], ArcgisHubImageUpload.prototype, "handleImageChange", null);
ArcgisHubImageUpload.style = arcgisHubImageUploadCss;

export { ArcgisHubImageUpload as arcgis_hub_image_upload };
