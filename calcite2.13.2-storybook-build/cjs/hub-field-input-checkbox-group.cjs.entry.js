'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const getLabelForEnum = require('./getLabelForEnum-380cfcf6.js');

const CheckboxGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    /**
     * Emits `arcgisConfigurationEditorFieldInputChange` with the updated array of ticked checkbox values when
     * any checkbox ticked state changes
     * @param evt
     */
    this.handleCalciteCheckboxChange = (evt) => {
      let value = this.params.value;
      const target = evt.target;
      value = target.checked
        ? [...value, target.value]
        : value.filter(val => val !== target.value);
      this.arcgisConfigurationEditorFieldInputChange.emit(value);
    };
    this.params = undefined;
  }
  /**
   * Renders an Array of calcite-checkboxes wrapped, each wrapped in a calcite-label
   */
  renderCheckboxes() {
    return this.params.schema.items.enum.map((val, idx) => {
      var _a, _b, _c, _d;
      const label = ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? (_b = this.params.uiSchema.options.labels[idx]) !== null && _b !== void 0 ? _b : val
        : getLabelForEnum.getLabelForEnum(this.params.uiSchema, val, this.params.t, { path: 'label', fallback: val });
      return (index.h("calcite-label", { key: val, layout: "inline", scale: this.params.scale }, index.h("calcite-checkbox", { checked: this.params.value.includes(val), disabled: this.params.disabled || ((_d = (_c = this.params.uiSchema.options) === null || _c === void 0 ? void 0 : _c.disabled) === null || _d === void 0 ? void 0 : _d[idx]), onCalciteCheckboxChange: this.handleCalciteCheckboxChange, scale: this.params.scale, value: val }), label));
    });
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, null, index.h("div", null, this.renderCheckboxes())));
  }
};

exports.hub_field_input_checkbox_group = CheckboxGroup;
