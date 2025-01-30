'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubImageUploadEditStepCss = ":host{position:relative;display:block;overflow:hidden;min-height:20.625rem}.edit-step__loader{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.edit-step__crop-thumb-container{position:relative;width:100%;overflow:hidden}.edit-step__crop-thumb-container--hidden{visibility:hidden}.edit-step__translucent-container{position:absolute;top:0px;overflow:hidden;left:50%;cursor:all-scroll;transform:translate(-50%)}.edit-step__translucent-container:after{position:absolute;top:0px;right:0px;bottom:0px;left:0px;box-sizing:border-box;height:100%;width:100%;content:\"\";opacity:0.9;border:1.875rem solid white}.edit-step__transparent-container{position:absolute;box-sizing:border-box;overflow-x:visible;outline:2px solid transparent;outline-offset:2px;background-color:var(--calcite-color-foreground-3);border:1px solid var(--calcite-color-border-1);margin-right:-50%;top:50%;left:50%;transform:translate(-50%, -50%)}.edit-step__preview-image{position:absolute;left:0px;top:0px;margin:0px;transform-origin:50% 50%}.edit-step__preview-image--loading{visibility:hidden}.edit-step__transparent-container:focus .edit-step__preview-image{box-shadow:0px 0px 6px 4px var(--calcite-color-brand)}.edit-step__zoom-control--hidden{visibility:hidden}.edit-step__zoom-control-label{display:flex;height:2rem}.edit-step__zoom-control-label-spacer{flex:1 1 0%}";

const ArcgisHubImageUploadEditStep = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisImageUploadEditStepImageChanged = index.createEvent(this, "arcgisImageUploadEditStepImageChanged", 7);
    this.handleWheel = (event) => {
      event.preventDefault();
      const imageScale = event.deltaY > 0 ? (this.imageProperties.scale * 1) / 1.1 : this.imageProperties.scale * 1.1;
      this.zoomValue = `${50 + Math.log(imageScale) / Math.log(1.1)}`;
      this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { scale: imageScale });
    };
    this.handleDragStart = () => {
      this.dragging = true;
    };
    this.handleDrag = (event) => {
      if (!this.dragging) {
        return;
      }
      const { touches } = event;
      let { clientX, clientY } = event;
      if (clientX === undefined || clientY === undefined) {
        // on touch devices, use the clientX and clientY properties inside touches array property
        if (!touches.length) {
          return;
        }
        clientX = touches[0].clientX;
        clientY = touches[0].clientY;
      }
      if (!this.previousPosition) {
        this.previousPosition = {
          top: clientY,
          left: clientX
        };
        return;
      }
      const { top, left } = this.previousPosition;
      const yDiff = clientY - top;
      const xDiff = clientX - left;
      this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { top: this.imageProperties.top + yDiff, left: this.imageProperties.left + xDiff });
      this.previousPosition = {
        top: top + yDiff,
        left: left + xDiff
      };
    };
    this.handleDragEnd = () => {
      this.dragging = false;
      this.previousPosition = undefined;
    };
    this.handleImageLoaded = () => {
      if (this.editingExisting) {
        this.loadingImage = false;
        this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { scale: this.height / this.imageEl.width, top: 0, left: 0, origin: { x: "0%", y: "0%" } });
        this.isLoading = false;
        return;
      }
      const longestDimension = this.aspectRatio > 1 ? this.height * this.aspectRatio : this.height;
      const { clientWidth, clientHeight } = this.imageEl;
      const longestSide = clientWidth > clientHeight ? clientWidth : clientHeight;
      const imageScale = longestDimension / longestSide;
      let updates = Object.assign({}, this.imageProperties);
      updates = Object.assign(Object.assign({}, updates), { top: this.height / 2 - clientHeight / 2, left: (this.height * this.aspectRatio) / 2 - clientWidth / 2, origin: { x: "50%", y: "50%" } });
      if (this.zoomToFit) {
        updates = Object.assign(Object.assign({}, updates), { scale: imageScale });
        this.initiallySettingZoom = true;
        this.zoomValue = `${50 + Math.log(imageScale) / Math.log(1.1)}`;
      }
      this.imageProperties = Object.assign({}, updates);
      this.isLoading = false;
    };
    this.handleZoomInput = (event) => {
      if (this.initiallySettingZoom) {
        this.initiallySettingZoom = false;
        return;
      }
      this.zoomValue = event.target.value;
      this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { scale: Math.pow(1.1, event.target.value - 50) });
    };
    this.handleImageKeydown = (event) => {
      const key = event.key;
      let modified = false;
      switch (key) {
        case "ArrowUp":
          this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { top: this.imageProperties.top - 1 });
          modified = true;
          break;
        case "ArrowDown":
          this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { top: this.imageProperties.top + 1 });
          modified = true;
          break;
        case "ArrowLeft":
          this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { left: this.imageProperties.left - 1 });
          modified = true;
          break;
        case "ArrowRight":
          this.imageProperties = Object.assign(Object.assign({}, this.imageProperties), { left: this.imageProperties.left + 1 });
          modified = true;
          break;
      }
      if (modified) {
        event.preventDefault();
      }
    };
    this.aspectRatio = undefined;
    this.previewSrc = undefined;
    this.loadingImage = false;
    this.editingExisting = false;
    this.zoomToFit = false;
    this.height = undefined;
    this.imageProperties = {
      scale: 1,
      top: 0,
      left: 0,
      origin: {
        x: "50%",
        y: "50%"
      }
    };
    this.dragging = false;
    this.previousPosition = undefined;
    this.previewStyle = undefined;
    this.zoomValue = "50";
    this.initiallySettingZoom = false;
    this.firstImagePropertiesChange = true;
    this.isLoading = true;
    context.bind(this, 'handleWheel', 'handleDragStart', 'handleDrag', 'handleDragEnd', 'handleImageLoaded', 'handleZoomInput', 'handleZoomInput', 'getImageEl', 'getImageContainerEl');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
    const padding = 60;
    const width = this.height * this.aspectRatio;
    const heightWithPaddingPx = `${this.height + padding}px`;
    this.thumbContainerStyle = {
      height: heightWithPaddingPx
    };
    this.translucentContainerStyle = {
      width: `${width + padding}px`,
      height: heightWithPaddingPx
    };
    this.transparentContainerStyle = {
      width: `${width}px`,
      height: `${this.height}px`
    };
    this.previewStyle = {
      transform: `scale(${this.imageProperties.scale})`,
      top: `${this.imageProperties.top}px`,
      left: `${this.imageProperties.left}px`,
      transformOrigin: `${this.imageProperties.origin.x} ${this.imageProperties.origin.y}`
    };
  }
  componentDidLoad() {
    this.imageContainerEl.focus();
  }
  getImageExtent() {
    const imageRect = this.imageEl.getBoundingClientRect();
    const containerRect = this.imageContainerEl.getBoundingClientRect();
    return {
      left: (containerRect.left - imageRect.left) / imageRect.width,
      right: (containerRect.right - imageRect.left) / imageRect.width,
      top: (containerRect.top - imageRect.top) / imageRect.height,
      bottom: (containerRect.bottom - imageRect.top) / imageRect.height
    };
  }
  getDrawDimensions() {
    const imageRect = this.imageEl.getBoundingClientRect();
    const selectedRect = this.imageContainerEl.getBoundingClientRect();
    const top = imageRect.top - selectedRect.top > 0 ? imageRect.top - selectedRect.top : 0;
    const left = imageRect.left - selectedRect.left > 0 ? imageRect.left - selectedRect.left : 0;
    const newImgLeft = imageRect.left < selectedRect.left ? selectedRect.left : imageRect.left;
    const newImgTop = imageRect.top < selectedRect.top ? selectedRect.top : imageRect.top;
    const newImgRight = imageRect.right > selectedRect.right ? selectedRect.right : imageRect.right;
    const newImgBottom = imageRect.bottom > selectedRect.bottom ? selectedRect.bottom : imageRect.bottom;
    return {
      left: left / selectedRect.width,
      top: top / selectedRect.height,
      width: (newImgRight - newImgLeft) / selectedRect.width,
      height: (newImgBottom - newImgTop) / selectedRect.height
    };
  }
  async getDrawParameters() {
    const minWidth = this.height * this.aspectRatio;
    const minHeight = this.height;
    const { left, right, top, bottom } = this.getImageExtent();
    const sourceExtent = {
      left: left < 0 ? 0 : left,
      top: top < 0 ? 0 : top,
      right: right > 1 ? 1 : right,
      bottom: bottom > 1 ? 1 : bottom
    };
    const drawDimensions = this.getDrawDimensions();
    const imageWidth = this.imageEl.clientWidth;
    const imageHeight = this.imageEl.clientHeight;
    const selectionX = sourceExtent.left * imageWidth;
    const selectionY = sourceExtent.top * imageHeight;
    const selectionWidth = sourceExtent.right * imageWidth - sourceExtent.left * imageWidth;
    const selectionHeight = sourceExtent.bottom * imageHeight - sourceExtent.top * imageHeight;
    const canvasWidth = right * imageWidth - left * imageWidth;
    const canvasHeight = bottom * imageHeight - top * imageHeight;
    return {
      selectionX,
      selectionY,
      selectionWidth,
      selectionHeight,
      canvasWidth,
      canvasHeight,
      minWidth,
      minHeight,
      drawDimensions
    };
  }
  handleImagePropertiesChange() {
    this.previewStyle = {
      transform: `scale(${this.imageProperties.scale})`,
      top: `${this.imageProperties.top}px`,
      left: `${this.imageProperties.left}px`,
      transformOrigin: `${this.imageProperties.origin.x} ${this.imageProperties.origin.y}`
    };
    if (this.firstImagePropertiesChange) {
      this.firstImagePropertiesChange = false;
      if (this.zoomToFit) {
        this.arcgisImageUploadEditStepImageChanged.emit();
      }
    }
    else {
      this.arcgisImageUploadEditStepImageChanged.emit();
    }
  }
  getImageContainerEl(el) {
    this.imageContainerEl = el;
  }
  getImageEl(el) {
    this.imageEl = el;
  }
  render() {
    return (index.h(index.Host, { onWheel: this.handleWheel }, index.h("calcite-loader", { class: "edit-step__loader", hidden: !this.isLoading, label: "" }), index.h("div", { class: `edit-step__crop-thumb-container ${this.isLoading ? "edit-step__crop-thumb-container--hidden" : ""}`, style: this.thumbContainerStyle }, index.h("div", { class: "edit-step__translucent-container", onMouseDown: this.handleDragStart, onMouseMove: this.handleDrag, onMouseOut: this.handleDragEnd, onMouseUp: this.handleDragEnd, onTouchEnd: this.handleDragEnd, onTouchMove: this.handleDrag, onTouchStart: this.handleDragStart, style: this.translucentContainerStyle }, index.h("div", { class: "edit-step__transparent-container", onKeyDown: this.handleImageKeydown, ref: this.getImageContainerEl, style: this.transparentContainerStyle,
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex: 0 }, index.h("img", { alt: "", class: `edit-step__preview-image ${this.loadingImage ? "edit-step__preview-image--loading" : ""}`, onLoad: this.handleImageLoaded, ref: this.getImageEl, src: this.previewSrc, style: this.previewStyle })))), index.h("calcite-label", { class: `edit-step__zoom-control ${this.isLoading ? "edit-step__zoom-control--hidden" : ""}`, "disable-spacing": true }, this.intl.t('zoom'), index.h("calcite-slider", { "aria-label": this.intl.t('zoom'), max: 100, min: 0, onCalciteSliderInput: this.handleZoomInput, scale: "l", value: +this.zoomValue }), index.h("div", { class: "edit-step__zoom-control-label" }, index.h("div", { class: "edit-step__zoom-control-icon-s" }, index.h("calcite-icon", { icon: "image", scale: "s" })), index.h("div", { class: "edit-step__zoom-control-label-spacer" }), index.h("div", { class: "edit-step__zoom-control-icon-l" }, index.h("calcite-icon", { icon: "image", scale: "l" }))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "imageProperties": ["handleImagePropertiesChange"]
  }; }
};
ArcgisHubImageUploadEditStep.style = arcgisHubImageUploadEditStepCss;

const arcgisHubImageUploadFileStepCss = ".file-step{text-align:center}.file-step__upload-icon{margin-bottom:0.5rem;margin-top:0.25rem;color:var(--calcite-color-text-3)}.file-step__upload-icon calcite-icon{width:4rem;height:4rem}.file-step__drag-text{margin-bottom:0.25rem;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium)}.file-step__browse-button{margin-top:1rem}.file-step__file-input{display:none}";

const ArcgisHubImageUploadFileStep = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisImageUploadFileStepFileChange = index.createEvent(this, "arcgisImageUploadFileStepFileChange", 7);
    this.arcgisImageUploadFileStepInvalidFile = index.createEvent(this, "arcgisImageUploadFileStepInvalidFile", 7);
    this.handleDragOver = (event) => {
      event.preventDefault();
    };
    this.handleDrop = (event) => {
      event.preventDefault();
      this.processFile(event.dataTransfer.files[0]);
    };
    this.handleFileInputChange = (event) => {
      this.processFile(event.target.files[0]);
    };
    // pass in translated error message
    this.triggerErrorState = (intlMessage) => {
      this.errorMessage = this.intl.t(intlMessage);
      setTimeout(() => {
        this.resetErrorState();
      }, 3000);
    };
    this.resetErrorState = () => {
      this.errorMessage = undefined;
    };
    this.sizeDescription = undefined;
    this.errorMessage = undefined;
    context.bind(this, 'handleButtonClick', 'setFileInputEl', 'handleDragOver', 'handleDrop', 'handleFileInputChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
  }
  // Handle heading intl
  get headingIntl() {
    const { errorMessage } = this;
    // If there's an error with invalid files
    let heading = 'dragDrop';
    if (errorMessage) {
      heading = 'errorHeading';
    }
    return heading;
  }
  get description() {
    const { errorMessage } = this;
    let description = this.sizeDescription;
    // if there's an error, set to already translated error message
    if (errorMessage) {
      description = this.errorMessage;
    }
    return description;
  }
  processFile(file) {
    if (!file) {
      return;
    }
    if (file) {
      if (!this.isValidFile(file)) {
        this.arcgisImageUploadFileStepInvalidFile.emit();
        this.triggerErrorState("unsupportedFileTypeError");
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        this.arcgisImageUploadFileStepFileChange.emit({
          dataURL: event.target.result,
          fileName: file.name || ""
        });
      };
      reader.readAsDataURL(file);
    }
  }
  isValidFile(file) {
    return (file === null || file === void 0 ? void 0 : file.name) && /\.(gif|jpg|jpeg|png)$/i.test(file.name);
  }
  handleButtonClick() {
    this.fileInput.click();
  }
  setFileInputEl(el) {
    this.fileInput = el;
  }
  render() {
    return (index.h("div", { "aria-label": this.intl.t(this.headingIntl), class: "file-step", onDragEnter: this.handleDragOver, onDragOver: this.handleDragOver, onDrop: this.handleDrop }, index.h("div", { class: "file-step__upload-icon" }, index.h("calcite-icon", { icon: "upload" })), index.h("div", null, index.h("div", { "aria-label": this.intl.t(this.headingIntl), class: {
        ["file-step__drag-text"]: true,
        error: !!this.errorMessage,
      } }, this.intl.t(this.headingIntl)), (this.description) && (index.h("div", { "aria-label": this.description }, this.description)), index.h("calcite-button", { appearance: "outline", class: "file-step__browse-button", iconStart: "image", kind: "neutral", onClick: this.handleButtonClick, round: true, scale: "m" }, this.intl.t('browse')), index.h("input", { accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "file-step__file-input", onChange: this.handleFileInputChange, ref: this.setFileInputEl, type: "file" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
};
ArcgisHubImageUploadFileStep.style = arcgisHubImageUploadFileStepCss;

exports.arcgis_hub_image_upload_edit_step = ArcgisHubImageUploadEditStep;
exports.arcgis_hub_image_upload_file_step = ArcgisHubImageUploadFileStep;
