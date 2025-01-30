'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');

const Switch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    context.bind(this, 'handleCalciteSwitchChange');
  }
  handleCalciteSwitchChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.checked);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action[evt.target.checked ? "select" : "deselect"]), { label: this.params.telemetryLabel }));
  }
  render() {
    var _a;
    return (index.h("calcite-switch", { checked: this.params.value, disabled: this.params.disabled, label: this.params.schema.title, onCalciteSwitchChange: this.handleCalciteSwitchChange, scale: ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || this.params.scale }));
  }
};

exports.hub_field_input_switch = Switch;
