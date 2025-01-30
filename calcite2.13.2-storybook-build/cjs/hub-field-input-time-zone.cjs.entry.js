'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const TimeZonePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleCalciteInputTimeZonePickerChange');
  }
  handleCalciteInputTimeZonePickerChange(evt) {
    const el = evt.target;
    this.arcgisConfigurationEditorFieldInputChange.emit(el.value);
  }
  render() {
    var _a, _b;
    return (index.h("calcite-input-time-zone", { disabled: this.params.disabled, mode: "name", onCalciteInputTimeZoneChange: this.handleCalciteInputTimeZonePickerChange, overlayPositioning: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.overlayPositioning, scale: this.params.scale, value: this.params.value }));
  }
};

exports.hub_field_input_time_zone = TimeZonePicker;
