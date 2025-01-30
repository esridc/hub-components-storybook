import { h } from '@stencil/core';
import { CSS } from "./resources";
import { bind } from '../../utils/context';
import Ajv from 'ajv';
import intlManager from '../../utils/intl-manager';
import { convert3HexTo6Hex } from '../../utils/colors';
/*
  NOTE: Down the line, this may be able to be replaced with calcite-components
  see:
    - https://github.com/Esri/calcite-components/issues/1934
    - https://github.com/Esri/calcite-components/issues/1616
*/
export class ArcgisHubInputColor {
  constructor() {
    this.storageId = "saved-colors";
    this.value = undefined;
    this.disabled = false;
    this.required = false;
    this.showSavedColor = true;
    this.label = undefined;
    this.placeholder = undefined;
    this.savedColors = [];
    this.status = 'idle';
    this._colorPickerColor = undefined;
    bind(this, 'handleColorPickerChange', 'handleInputInput', 'setColorPickerEl');
  }
  /**
   * Property watchers
   */
  handleValueChanged(value) {
    this.setColor(value);
  }
  /**
   * Event handling
   */
  handleColorPickerChange(event) {
    var _a;
    event.stopPropagation();
    const newColor = (_a = this.colorPickerEl.value) !== null && _a !== void 0 ? _a : '';
    if (newColor === this.value) {
      return;
    }
    const validationResult = this.setColor(newColor);
    this.emitChangeEvent(newColor, validationResult);
  }
  handleInputInput(event) {
    var _a;
    event.stopPropagation();
    const newColor = (_a = event.target.value) !== null && _a !== void 0 ? _a : '';
    const validationResult = this.setColor(newColor);
    this.emitChangeEvent(newColor, validationResult);
  }
  /**
   * Hooks
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    localStorage.setItem(`calcite-color-${this.storageId}`, JSON.stringify(this.savedColors));
    const ajv = new Ajv({ allErrors: true });
    const regexp = this.required
      ? /^#(?:[0-9a-fA-F]{6})$/ // required regex
      : /^$|^#(?:[0-9a-fA-F]{6})$/; // not required regex also matches empty string
    ajv.addFormat('hex-color', regexp);
    const schema = {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          format: 'hex-color'
        }
      }
    };
    this.validator = ajv.compile(schema);
    // checks if color is a valid 3 digit hex
    const color = /^#(?:[0-9a-fA-F]{3})$/.test(this.value) ? convert3HexTo6Hex(this.value) : this.value;
    this.setColor(color);
  }
  /**
   * Functions
   */
  validate(color = '') {
    const valid = this.validator({ color });
    return valid ? { valid } : { valid, errors: this.validator.errors };
  }
  emitChangeEvent(value, validationResult) {
    if (this.disabled) {
      return;
    }
    const { valid } = validationResult;
    const detail = { valid };
    if (valid) {
      detail.value = value;
    }
    this.arcgisHubInputColorChange.emit(detail);
  }
  setColor(color) {
    const validationResult = this.validate(color);
    const { valid } = validationResult;
    this.value = color;
    if (valid) {
      // we only set the swatch and the colorpicker color if it is valid
      this.element.style.setProperty(CSS.swatchProp, color);
      this._colorPickerColor = color;
    }
    this.status = valid ? 'valid' : 'invalid';
    return validationResult;
  }
  setColorPickerEl(el) {
    this.colorPickerEl = el;
  }
  render() {
    return (h("calcite-popover-manager", { "auto-close": true }, h("calcite-input", { disabled: this.disabled, label: this.label, onCalciteInputInput: this.handleInputInput, placeholder: this.placeholder, status: this.status, value: this.value }, h("calcite-button", { appearance: "outline", disabled: this.disabled, id: "color-picker-toggle-button", label: this.intl.t('colorPickerToggleButtonLabel'), slot: "action" }, h("div", { class: {
        [CSS.swatch]: true,
        [CSS.noColor]: !this.value
      } }, "\u00A0"))), h("calcite-popover", { autoClose: true, label: this.intl.t('popoverLabel'), placement: "auto", pointerDisabled: true, referenceElement: "color-picker-toggle-button" }, h("calcite-color-picker", { clearable: !this.required, format: "hex", onCalciteColorPickerChange: this.handleColorPickerChange, ref: this.setColorPickerEl, savedDisabled: !this.showSavedColor, scale: "m", storageId: this.storageId, value: this._colorPickerColor }))));
  }
  static get is() { return "arcgis-hub-input-color"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-input-color.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-input-color.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The color"
        },
        "attribute": "value",
        "reflect": true
      },
      "disabled": {
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
          "text": "A boolean value indicating whether the control is disabled"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
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
          "text": "A boolean value indicating whether the control should consider empty values valid"
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      },
      "showSavedColor": {
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
          "text": "A boolean value indicating whether to disable the saved colors section"
        },
        "attribute": "show-saved-color",
        "reflect": false,
        "defaultValue": "true"
      },
      "label": {
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
        "attribute": "label",
        "reflect": false
      },
      "placeholder": {
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
        "attribute": "placeholder",
        "reflect": false
      },
      "savedColors": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "status": {},
      "_colorPickerColor": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubInputColorChange",
        "name": "arcgisHubInputColorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This custom event is emitted when the color is changed."
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "local"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "handleValueChanged"
      }];
  }
}
