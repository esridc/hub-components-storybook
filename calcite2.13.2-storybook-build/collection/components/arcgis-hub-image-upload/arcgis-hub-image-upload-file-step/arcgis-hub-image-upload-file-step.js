import { h } from "@stencil/core";
import { bind } from "../../../utils/context";
import intlManager from "../../../utils/intl-manager";
/** @internal **/
export class ArcgisHubImageUploadFileStep {
  constructor() {
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
    bind(this, 'handleButtonClick', 'setFileInputEl', 'handleDragOver', 'handleDrop', 'handleFileInputChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
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
    return (h("div", { "aria-label": this.intl.t(this.headingIntl), class: "file-step", onDragEnter: this.handleDragOver, onDragOver: this.handleDragOver, onDrop: this.handleDrop }, h("div", { class: "file-step__upload-icon" }, h("calcite-icon", { icon: "upload" })), h("div", null, h("div", { "aria-label": this.intl.t(this.headingIntl), class: {
        ["file-step__drag-text"]: true,
        error: !!this.errorMessage,
      } }, this.intl.t(this.headingIntl)), (this.description) && (h("div", { "aria-label": this.description }, this.description)), h("calcite-button", { appearance: "outline", class: "file-step__browse-button", iconStart: "image", kind: "neutral", onClick: this.handleButtonClick, round: true, scale: "m" }, this.intl.t('browse')), h("input", { accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "file-step__file-input", onChange: this.handleFileInputChange, ref: this.setFileInputEl, type: "file" }))));
  }
  static get is() { return "arcgis-hub-image-upload-file-step"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-image-upload-file-step.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-image-upload-file-step.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": ""
        },
        "attribute": "size-description",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "errorMessage": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisImageUploadFileStepFileChange",
        "name": "arcgisImageUploadFileStepFileChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "FileChangePayload",
          "resolved": "FileChangePayload",
          "references": {
            "FileChangePayload": {
              "location": "import",
              "path": "../types"
            }
          }
        }
      }, {
        "method": "arcgisImageUploadFileStepInvalidFile",
        "name": "arcgisImageUploadFileStepInvalidFile",
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
  static get elementRef() { return "el"; }
}
