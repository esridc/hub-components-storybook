'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const hubMultiselectCss = "calcite-chip{margin:0.25rem;margin-bottom:0px;margin-left:0px}";

const HubMultiselect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubMultiselectChange = index.createEvent(this, "hubMultiselectChange", 7);
    this.label = undefined;
    this.values = undefined;
    this.disabled = false;
    this.scale = undefined;
    this.parsedValues = [];
  }
  /**
   * Property watchers
   */
  handleValuesChanged(values) {
    this.parsedValues = Array.isArray(values) ? values : values.split(',');
  }
  /**
   * Event handling
   */
  handleChipCloseEvent(event) {
    const optionValue = event.target.value;
    const index = this.parsedValues.findIndex((value) => value === optionValue);
    // update the reference
    this.parsedValues = [
      ...this.parsedValues.slice(0, index),
      ...this.parsedValues.slice(index + 1)
    ];
    this.hubMultiselectChange.emit({
      values: this.parsedValues.slice()
    });
  }
  handleKeyEvent(event) {
    const input = event.target;
    // only response when
    // * the Enter key is pressed
    // * the input box has a value
    // * the input box value is not duplicated with any selected value
    if (event.key === 'Enter' && input.value && !this.parsedValues.includes(input.value)) {
      const newValue = input.value;
      // update reference
      this.parsedValues = [
        ...this.parsedValues,
        newValue
      ];
      this.hubMultiselectChange.emit({
        values: this.parsedValues.slice()
      });
      input.value = '';
    }
  }
  /**
   * Hooks
   */
  componentWillLoad() {
    if (this.values) {
      this.handleValuesChanged(this.values);
    }
  }
  /**
   * Functions
   */
  render() {
    return (index.h("div", null, this.disabled
      ? null
      : index.h("calcite-input", { disabled: this.disabled, label: this.label, scale: this.scale }), this.parsedValues.map((value) => index.h("calcite-chip", { closable: !this.disabled, key: value, scale: this.scale, value: value }, value))));
  }
  static get watchers() { return {
    "values": ["handleValuesChanged"]
  }; }
};
HubMultiselect.style = hubMultiselectCss;

exports.hub_multiselect = HubMultiselect;
