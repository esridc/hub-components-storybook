import { r as registerInstance, c as createEvent, h, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { A as Ajv } from './ajv-73f98cc1.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { c as convert3HexTo6Hex } from './colors-41539dda.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const CSS = {
  noColor: "no-color",
  swatch: "swatch",
  swatchProp: "--swatch-color"
};

const arcgisHubInputColorCss = ":host{display:block}#color-picker-toggle-button{--calcite-color-brand:var(--calcite-color-border-input);margin-left:-1px}.swatch{background-color:var(--swatch-color, transparent);width:1.25rem}.swatch.no-color{background-image:linear-gradient(45deg, #ededed 25%, #a6a6a6 25%, #a6a6a6 50%, #ededed 50%, #ededed 75%, #a6a6a6 75%, #a6a6a6 100%);background-size:15px 15px;outline:solid 1px #a6a6a6}";

const ArcgisHubInputColor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubInputColorChange = createEvent(this, "arcgisHubInputColorChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChanged"]
  }; }
};
ArcgisHubInputColor.style = arcgisHubInputColorCss;

export { ArcgisHubInputColor as arcgis_hub_input_color };
