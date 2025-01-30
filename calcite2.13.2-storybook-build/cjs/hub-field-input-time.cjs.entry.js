'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const TimePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleCalciteInputTimePickerChange');
  }
  handleCalciteInputTimePickerChange(evt) {
    const el = evt.target;
    // Since we are not passing seconds, we add them here
    // if there is only 1 `:` in the time string, we add `:00` to the end
    let time = el.value;
    if (time.split(':').length === 2) {
      time = `${time}:00`;
    }
    this.arcgisConfigurationEditorFieldInputChange.emit(time);
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (index.h("calcite-input-time-picker", { disabled: this.params.disabled, onCalciteInputTimePickerChange: this.handleCalciteInputTimePickerChange, overlayPositioning: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.overlayPositioning, placement: ((_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.placement) || 'auto', scale: this.params.scale, step: ((_f = (_e = this.params.uiSchema) === null || _e === void 0 ? void 0 : _e.options) === null || _f === void 0 ? void 0 : _f.step) || 60, value: this.params.value }));
  }
};

exports.hub_field_input_time = TimePicker;
