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
import { h, Fragment, Host } from "@stencil/core";
import { bind } from "../../utils/context";
import intlManager from "../../utils/intl-manager";
import { dictionary } from "@esri/telemetry-dictionary-hub";
import Debounce from "../../decorators/debounce";
var ACTIVE_STEP;
(function (ACTIVE_STEP) {
  ACTIVE_STEP["FILE"] = "file";
  ACTIVE_STEP["EDIT"] = "edit";
})(ACTIVE_STEP || (ACTIVE_STEP = {}));
export class ArcgisHubImageUpload {
  constructor() {
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
      this.hubTelemetry.emit(dictionary.category.interaction.action.add.label.image);
    };
    this.handleSaveClick = async () => {
      if (this.activeStep === ACTIVE_STEP.FILE) {
        return;
      }
      this.saving = true;
      const data = await this.getCanvasImage();
      this.arcgisImageUploadSave.emit(data);
      this.hubTelemetry.emit(dictionary.category.interaction.action.add.label.image);
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.add.label.image);
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
  static get is() { return "arcgis-hub-image-upload"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-image-upload.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-image-upload.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "modalTitle": {
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
          "tags": [],
          "text": "Title text for the modal header slot."
        },
        "attribute": "modal-title",
        "reflect": false
      },
      "sizeDescription": {
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
          "tags": [],
          "text": "Size description text ex: \"For best results, the image should be 300 x 300 pixels.\""
        },
        "attribute": "size-description",
        "reflect": false
      },
      "zoomToFit": {
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
          "text": "Flag to indicate whether or not to auto zoom to fit the image into the frame"
        },
        "attribute": "zoom-to-fit",
        "reflect": false,
        "defaultValue": "true"
      },
      "maxWidth": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum width for the scaled image output"
        },
        "attribute": "max-width",
        "reflect": false,
        "defaultValue": "300"
      },
      "maxHeight": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum height for the scaled image output"
        },
        "attribute": "max-height",
        "reflect": false,
        "defaultValue": "300"
      },
      "fillBackground": {
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
          "text": "Flag to indicate to auto fill background with the color #efefef"
        },
        "attribute": "fill-background",
        "reflect": false,
        "defaultValue": "false"
      },
      "active": {
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
          "text": "Flag to show/hide the calcite-modal"
        },
        "attribute": "active",
        "reflect": false
      },
      "height": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Desired height of the output image"
        },
        "attribute": "height",
        "reflect": false,
        "defaultValue": "window.innerWidth < 412 ? 200 : 300"
      },
      "aspectRatio": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Number to indicate the ratio of the output image width relative to the height"
        },
        "attribute": "aspect-ratio",
        "reflect": false,
        "defaultValue": "1"
      },
      "inline": {
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
        "attribute": "inline",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "previewSrc": {},
      "saving": {},
      "editExisting": {},
      "isModified": {},
      "activeStep": {},
      "hasError": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisImageUploadCancel",
        "name": "arcgisImageUploadCancel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisImageUploadError",
        "name": "arcgisImageUploadError",
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
        "method": "arcgisImageUploadSave",
        "name": "arcgisImageUploadSave",
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
              "path": "./types"
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
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "active",
        "methodName": "handleActiveChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisImageUploadFileStepFileChange",
        "method": "handleFileChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisImageUploadFileStepInvalidFile",
        "method": "handleInvalidFile",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisImageUploadEditStepImageChanged",
        "method": "handleImageChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Debounce({ timeout: 1000 })
], ArcgisHubImageUpload.prototype, "handleImageChange", null);
