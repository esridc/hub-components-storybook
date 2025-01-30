import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';

const DatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, 'handleCalciteInputDatePickerChange');
  }
  handleCalciteInputDatePickerChange(evt) {
    const el = evt.target;
    this.arcgisConfigurationEditorFieldInputChange.emit(el.value);
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (h("calcite-input-date-picker", { disabled: this.params.disabled, layout: ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.layout) || 'horizontal', min: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.min, onCalciteInputDatePickerChange: this.handleCalciteInputDatePickerChange, overlayPositioning: (_f = (_e = this.params.uiSchema) === null || _e === void 0 ? void 0 : _e.options) === null || _f === void 0 ? void 0 : _f.overlayPositioning, scale: this.params.scale, value: this.params.value }));
  }
};

export { DatePicker as hub_field_input_date };
