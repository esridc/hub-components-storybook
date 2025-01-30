import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const inputCss = "calcite-text-area[status='invalid']{--calcite-color-border-input:var(--calcite-color-status-danger)}calcite-text-area[status='invalid']:focus{--calcite-ui-focus-color:var(--calcite-color-status-danger)}#character-counter>span{margin-inline-start:auto;margin-top:0.25rem}#sr-character-counter{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}";

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
const INPUT_FIELD_TYPES = ["color", "date", "datetime-local", "email", "file", "image", "month", "number", "password", "search", "tel", "text", "textarea", "time", "url", "week"];
const Input = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.setInputElement = (element) => {
      this.inputElement = element;
    };
    this.params = undefined;
    this.currentLength = 0;
    this.assistiveText = undefined;
    bind(this, 'handleCalciteInputInput', 'setInputElement');
  }
  async componentWillLoad() {
    var _a;
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.currentLength = (((_a = this.params) === null || _a === void 0 ? void 0 : _a.value) || '').toString().length;
    // keep track of the value so we can pass it down to the input
    this.setCurrentValue(this.params.value);
  }
  /**
   * Returns the type of the input field
   */
  get type() {
    var _a, _b;
    const formatToType = {
      ['date-time']: 'datetime-local',
      ['idn-email']: 'email'
    };
    let result = formatToType[this.params.schema.format]
      || this.params.schema.format
      || ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.type);
    if (!INPUT_FIELD_TYPES.includes(result)) {
      result = 'text';
    }
    return result;
  }
  /**
   * Returns the value in string form to render in the input
   */
  get _valueToRender() {
    return this.currentValue ? this.currentValue.toString() : '';
  }
  watchValue(params) {
    if (params.value != this.currentValue) {
      if (this.inputElement.matches(':not(:focus)')) {
        // only update currentValue if it is different AND the input is NOT focused
        // this is to prevent stepping on what the user has typed if the validation took a while
        // but still allow RESET rules and clearOnHidden to work
        this.setCurrentValue(params.value);
      }
    }
  }
  setCurrentValue(value) {
    let newValue = value;
    if (this.type === 'number') {
      // parse to a number
      newValue = parseFloat(`${newValue}`);
      // if can't parse, nullify
      if (isNaN(newValue)) {
        newValue = null;
      }
    }
    this.currentValue = newValue;
  }
  /**
   * Handles the on change event and parses to a number if necessary
   * @param evt
   */
  handleCalciteInputInput(evt) {
    const val = evt.target.value;
    this.setCurrentValue(val);
    // NOTE: this could be a getter but we need it to be State so we can Watch it
    this.currentLength = this.currentValue ? this.currentValue.toString().length : 0;
    this.emitInputChange();
  }
  /**
   * Debounced event emitter for input change
   * Emits the current value of the input field
   */
  emitInputChange() {
    this.arcgisConfigurationEditorFieldInputChange.emit(this.currentValue);
  }
  get counterString() {
    const charactersLeft = this.params.schema.maxLength - this.currentLength;
    return this.intl.t('characterCounter', { charactersLeft });
  }
  updateAssistiveText() {
    this.assistiveText = this.counterString;
  }
  /**
   * Renders a character counter for the input field
   * @returns
   */
  _renderCounter() {
    if (this.type === 'text' && this.params.schema.maxLength) {
      return h(Fragment, null, h("calcite-input-message", { id: "character-counter" }, h("span", null, this.counterString)), h("span", { id: "sr-character-counter", role: "status" }, this.assistiveText));
    }
  }
  /** END INPUT COUNTER RELATED LOGIC */
  /**
   * Renders a text area calcite field
   * @returns
   */
  renderTextArea() {
    var _a, _b;
    const schema = this.params.schema || {};
    const uiSchema = this.params.uiSchema || { options: {} };
    return h("calcite-text-area", { disabled: this.params.disabled, label: schema.title, maxLength: schema.maxLength, onCalciteTextAreaInput: this.handleCalciteInputInput, placeholder: (_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.placeholder, ref: this.setInputElement, required: this.params.required, resize: "vertical", rows: (_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.rows, scale: this.params.scale, status: this.params.status, value: this._valueToRender });
  }
  /**
   * Renders the normal text input calcite field
   * @returns
   */
  renderTextInput() {
    var _a, _b;
    const schema = this.params.schema || {};
    const uiSchema = this.params.uiSchema || { options: {} };
    return h("calcite-input", { disabled: this.params.disabled, label: schema.title, max: schema.maximum, maxLength: schema.maxLength, min: schema.minimum, onCalciteInputInput: this.handleCalciteInputInput, placeholder: (_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.placeholder, ref: this.setInputElement, required: this.params.required, scale: this.params.scale, status: this.params.status, "suffix-text": (_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.suffixText, type: this.type, value: this._valueToRender });
  }
  /**
   * Delegates to the correct input field renderer based on the type of the field
   * @returns
   */
  renderInputField() {
    switch (this.type) {
      case 'textarea':
        return this.renderTextArea();
      default:
        return this.renderTextInput();
    }
  }
  render() {
    return (h(Host, { "data-test-type": this.type }, this.renderInputField(), this._renderCounter()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "params": ["watchValue"],
    "currentLength": ["updateAssistiveText"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 250 })
], Input.prototype, "emitInputChange", null);
__decorate([
  DebounceDecoratorFactory({ timeout: 2000 })
], Input.prototype, "updateAssistiveText", null);
Input.style = inputCss;

export { Input as hub_field_input_input };
