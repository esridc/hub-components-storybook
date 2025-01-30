import { h, Host } from "@stencil/core";
import { bind } from "../../utils/context";
import intlManager from "../../utils/intl-manager";
import { addCreateItemTypes, FileExtension, ItemType, extentToBBox } from "@esri/hub-common";
import { validateAddedFile } from "./utils/validate-added-file";
/**
 * Maps type from the file (mime type) to a human readable type and extension.
 */
const mimeTypes = {
  'image/png': ItemType.Image,
  'image/jpeg': ItemType.Image,
  'image/tiff': ItemType.Image,
  'image/tif': ItemType.Image,
  'text/csv': ItemType.CSV,
  'application/pdf': ItemType.PDF,
  'application/geo+json': ItemType.GeoJson,
  'application/vnd.ms-excel': ItemType["Microsoft Excel"],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ItemType["Microsoft Excel"],
  'application/msword': ItemType["Microsoft Word"],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ItemType["Microsoft Word"],
  'application/vnd.ms-powerpoint': ItemType["Microsoft Powerpoint"],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ItemType["Microsoft Powerpoint"]
};
const dateFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
export class ArcgisHubFileSelect {
  constructor() {
    this.componentType = 'content';
    this.maxSize = 200;
    this.owner = undefined;
    this.defaultExtent = undefined;
    this.allowedFileTypes = undefined;
    this.portalName = undefined;
    this.errorMessage = undefined;
    this.files = undefined;
    this.isDragging = undefined;
    bind(this, 'handleDragOver', 'handleDragLeave', 'handleDrop', 'setInputEl', 'onInputChange', 'buttonRef', 'onButtonClick');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  /**
   * Watches files State && validates selected file/files.
   * On success selected file is emitted
   * On failure error state.
   *
   * @memberof ArcgisHubFileSelect
   */
  validateFiles() {
    const { files, allowedFileTypes } = this;
    const maxSize = this.maxSize * 1000 * 1000;
    // If a file was selected...
    if (files) {
      // Validate file
      const { success, errorMessage } = validateAddedFile(files, maxSize, allowedFileTypes);
      // If successfully validated
      if (success) {
        // Reset error message
        this.errorMessage = undefined;
        // Choose file
        const file = files[0];
        // Create item for use in createItem call
        const mergedFileItem = {
          owner: this.owner,
          extent: extentToBBox(this.defaultExtent),
          spatialReference: this.defaultExtent.spatialReference,
          source: this.portalName,
          publishedDate: this.intl.formatDate(new Date(), dateFormatOptions),
          access: 'private',
          title: this.trimExtension(file.name),
          type: mimeTypes[file.type],
          modified: file.lastModified,
          file
        };
        // Emit item.
        this.arcgisHubFileSelected.emit(mergedFileItem);
      }
      else {
        this.errorMessage = errorMessage;
      }
    }
  }
  /**
   * Removes extension from filename.
   */
  trimExtension(filename) {
    const spl = filename.split('.');
    // Filename may have more than one '.' in it.
    return spl.splice(0, spl.length - 1).join('.');
  }
  // Focus Main input
  async focusMainInput() {
    this.mainInputRef.focus();
  }
  // Clear selected file.
  async clearSelectedFile() {
    this.files = undefined;
  }
  /**
   * Takes passed in allowedFileTypes and returns a list of all possible extensions, made unique.
   * allowedFileTypes can have an array of human readable File Types And/OR an array of extensions
   * To compile this into one list the below is needed.
   *
   * @readonly
   * @type {string[]}
   * @memberof ArcgisHubFileSelect
   */
  get fileExtensionsFromAllowedFileTypes() {
    var _a, _b;
    const { allowedFileTypes } = this;
    // Start out with an empty array.
    let list = [];
    // If we passed in file types via allowedFileTypes then use those...
    if ((_a = allowedFileTypes === null || allowedFileTypes === void 0 ? void 0 : allowedFileTypes.extensions) === null || _a === void 0 ? void 0 : _a.length) {
      list = [...list, ...this.allowedFileTypes.extensions];
    }
    // Types could have also been passed in. In which case we should add the exts matched to them.
    // If types were passed in instead we'll need to look up them from addCreateItemTypes.
    if ((_b = allowedFileTypes === null || allowedFileTypes === void 0 ? void 0 : allowedFileTypes.types) === null || _b === void 0 ? void 0 : _b.length) {
      // Iterate over all types
      list = allowedFileTypes.types.reduce((exts, type) => {
        // If it exists on addCreateItemTypes
        return (addCreateItemTypes[type] && addCreateItemTypes[type].fileExt)
          // add the possible file extensions
          ? [...exts, ...addCreateItemTypes[type].fileExt]
          : exts;
      }, list);
    }
    // Numerous types may have overlapping extensions, so we create a new Set to get unique exts.
    list = [...new Set(list)];
    // Return list.
    return list;
  }
  // Is there a file selected AND no error?
  get isFileSelected() {
    return this.files && !this.errorMessage;
  }
  // Handles drag over event.
  handleDragOver(e) {
    if (e.dataTransfer.types.includes('Files') && !this.isFileSelected) {
      e.preventDefault();
      this.isDragging = true;
      this.arcgisHubDragOver.emit(this.isDragging);
    }
    return false;
  }
  handleDragLeave() {
    this.isDragging = false;
  }
  // Handles drop of drag event.
  handleDrop(e) {
    e.preventDefault();
    this.isDragging = false;
    this.files = e.dataTransfer.files;
  }
  // Handles the selection of file from clicking browse button
  onInputChange(e) {
    this.files = Object.assign({}, e.target.files);
  }
  // Input element ref
  setInputEl(el) {
    this.inputElement = el;
  }
  // Get list of file types for the input element accept attr.
  get inputAcceptList() {
    let list = this.fileExtensionsFromAllowedFileTypes;
    // If nothing was passed in via allowedFileTypes then we should grab the defaults from FileExtension
    if (!list.length) {
      list = Object.keys(FileExtension);
    }
    // Combine all together in a comma separated list
    return `.${list.join(', .')}`;
  }
  onButtonClick() {
    var _a;
    if (this.isFileSelected) {
      this.clearSelectedFile();
    }
    else {
      (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.click();
    }
  }
  buttonRef(el) {
    this.mainInputRef = el;
  }
  get buttonIntl() {
    const { isFileSelected, componentType } = this;
    let button = 'contentButton';
    if (isFileSelected) {
      button = 'clearButton';
    }
    else if (componentType === 'image') {
      button = 'imageButton';
    }
    return button;
  }
  // Handle heading intl because of the variety of options...
  get headingIntl() {
    const { componentType, errorMessage, files } = this;
    // If there's an error return error heading
    let heading = 'contentHeading';
    if (errorMessage) {
      heading = 'errorHeading';
    }
    else if (files && !errorMessage) {
      // Otherwise if files have been selected, but no error then we want the selected heading
      heading = 'selectedHeading';
    }
    else if (componentType === 'image') {
      heading = 'imageHeading';
    }
    return heading;
  }
  // Render details block.
  renderDetails() {
    // Destructure the things from this.
    const { errorMessage, files, isFileSelected, maxSize, fileExtensionsFromAllowedFileTypes, intl } = this;
    let fileTypes;
    // Determine if we should show link or not
    const showLink = !fileExtensionsFromAllowedFileTypes.length || fileExtensionsFromAllowedFileTypes.length > 15;
    // Which intl string should be used: error, just the max size part as we are showing a link, or max size && file types
    let bodyText = 'maxSizeAndSupportedTypes';
    if (errorMessage) {
      bodyText = errorMessage;
    }
    else if (showLink) {
      bodyText = 'maxSize';
    }
    // If we aren't showing a link or the error message we want a list of the file types.
    if (!showLink || errorMessage) {
      fileTypes = fileExtensionsFromAllowedFileTypes.join(', ');
    }
    // Get the strings
    let text = intl.t(bodyText, { maxSize, fileTypes });
    if (errorMessage) {
      text = intl.t(bodyText);
    }
    else if (isFileSelected) {
      text = files[0].name;
    }
    else if (showLink) {
      text = intl.t(bodyText, { maxSize });
    }
    // Return the DOM
    let dom = (h("p", null, text));
    if (showLink && !errorMessage) {
      // TODO: Link below doesn't exist, but will go to docs re supported file extensions in the future. Put it in
      // here when we get the url.
      dom = (h("p", null, text, h("a", { href: "" }, intl.t('linkText'))));
    }
    return dom;
  }
  render() {
    return (h(Host, { class: {
        ["file-select-zone"]: true,
        dragging: this.isDragging,
        error: !!this.errorMessage,
        success: this.isFileSelected
      }, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, onDrop: this.handleDrop }, h("calcite-icon", { "aria-hidden": "true", icon: `${this.isFileSelected ? "check-circle" : "upload"}`, scale: "l" }), h("header", null, this.intl.t(this.headingIntl)), this.renderDetails(), h("input", { accept: this.inputAcceptList, onChange: this.onInputChange, ref: this.setInputEl, tabIndex: -1, type: "file" }), h("calcite-button", { appearance: "outline", onClick: this.onButtonClick, ref: this.buttonRef }, this.intl.t(this.buttonIntl)), h("slot", null)));
  }
  static get is() { return "arcgis-hub-file-select"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-file-select.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-file-select.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "componentType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'content' | 'image'",
          "resolved": "\"content\" | \"image\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{('content' | 'image')}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileSelect"
            }],
          "text": "Should the drag-n-drop zone be configured to show Image or Content specific strings."
        },
        "attribute": "component-type",
        "reflect": false,
        "defaultValue": "'content'"
      },
      "maxSize": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcgisHubFileSelect"
            }],
          "text": "Max allowed size of a selected file in MB"
        },
        "attribute": "max-size",
        "reflect": false,
        "defaultValue": "200"
      },
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
      "allowedFileTypes": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IAllowedFileTypes",
          "resolved": "IAllowedFileTypes",
          "references": {
            "IAllowedFileTypes": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{AllowedFileTypes}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileSelect"
            }],
          "text": "What file types or extensions are allowed?"
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
      "errorMessage": {},
      "files": {},
      "isDragging": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFileSelected",
        "name": "arcgisHubFileSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
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
        "method": "arcgisHubDragOver",
        "name": "arcgisHubDragOver",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "focusMainInput": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "clearSelectedFile": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
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
        "propName": "files",
        "methodName": "validateFiles"
      }];
  }
}
