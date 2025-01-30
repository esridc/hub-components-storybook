import { h, Host } from "@stencil/core";
import { bind } from "../../../utils/context";
import intlManager from "../../../utils/intl-manager";
/** @internal **/
export class ArcgisHubImageUploadEditStep {
  constructor() {
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
    bind(this, 'handleWheel', 'handleDragStart', 'handleDrag', 'handleDragEnd', 'handleImageLoaded', 'handleZoomInput', 'handleZoomInput', 'getImageEl', 'getImageContainerEl');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
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
    return (h(Host, { onWheel: this.handleWheel }, h("calcite-loader", { class: "edit-step__loader", hidden: !this.isLoading, label: "" }), h("div", { class: `edit-step__crop-thumb-container ${this.isLoading ? "edit-step__crop-thumb-container--hidden" : ""}`, style: this.thumbContainerStyle }, h("div", { class: "edit-step__translucent-container", onMouseDown: this.handleDragStart, onMouseMove: this.handleDrag, onMouseOut: this.handleDragEnd, onMouseUp: this.handleDragEnd, onTouchEnd: this.handleDragEnd, onTouchMove: this.handleDrag, onTouchStart: this.handleDragStart, style: this.translucentContainerStyle }, h("div", { class: "edit-step__transparent-container", onKeyDown: this.handleImageKeydown, ref: this.getImageContainerEl, style: this.transparentContainerStyle,
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex: 0 }, h("img", { alt: "", class: `edit-step__preview-image ${this.loadingImage ? "edit-step__preview-image--loading" : ""}`, onLoad: this.handleImageLoaded, ref: this.getImageEl, src: this.previewSrc, style: this.previewStyle })))), h("calcite-label", { class: `edit-step__zoom-control ${this.isLoading ? "edit-step__zoom-control--hidden" : ""}`, "disable-spacing": true }, this.intl.t('zoom'), h("calcite-slider", { "aria-label": this.intl.t('zoom'), max: 100, min: 0, onCalciteSliderInput: this.handleZoomInput, scale: "l", value: +this.zoomValue }), h("div", { class: "edit-step__zoom-control-label" }, h("div", { class: "edit-step__zoom-control-icon-s" }, h("calcite-icon", { icon: "image", scale: "s" })), h("div", { class: "edit-step__zoom-control-label-spacer" }), h("div", { class: "edit-step__zoom-control-icon-l" }, h("calcite-icon", { icon: "image", scale: "l" }))))));
  }
  static get is() { return "arcgis-hub-image-upload-edit-step"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-image-upload-edit-step.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-image-upload-edit-step.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": ""
        },
        "attribute": "aspect-ratio",
        "reflect": false
      },
      "previewSrc": {
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
          "text": ""
        },
        "attribute": "preview-src",
        "reflect": false
      },
      "loadingImage": {
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
        "attribute": "loading-image",
        "reflect": false,
        "defaultValue": "false"
      },
      "editingExisting": {
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
        "attribute": "editing-existing",
        "reflect": false,
        "defaultValue": "false"
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
          "text": ""
        },
        "attribute": "zoom-to-fit",
        "reflect": false,
        "defaultValue": "false"
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
          "text": ""
        },
        "attribute": "height",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "imageProperties": {},
      "dragging": {},
      "previousPosition": {},
      "previewStyle": {},
      "zoomValue": {},
      "initiallySettingZoom": {},
      "firstImagePropertiesChange": {},
      "isLoading": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisImageUploadEditStepImageChanged",
        "name": "arcgisImageUploadEditStepImageChanged",
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
      }];
  }
  static get methods() {
    return {
      "getDrawParameters": {
        "complexType": {
          "signature": "() => Promise<any>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "imageProperties",
        "methodName": "handleImagePropertiesChange"
      }];
  }
}
