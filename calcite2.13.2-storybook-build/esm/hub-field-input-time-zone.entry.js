import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';

const TimeZonePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, 'handleCalciteInputTimeZonePickerChange');
  }
  handleCalciteInputTimeZonePickerChange(evt) {
    const el = evt.target;
    this.arcgisConfigurationEditorFieldInputChange.emit(el.value);
  }
  render() {
    var _a, _b;
    return (h("calcite-input-time-zone", { disabled: this.params.disabled, mode: "name", onCalciteInputTimeZoneChange: this.handleCalciteInputTimeZonePickerChange, overlayPositioning: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.overlayPositioning, scale: this.params.scale, value: this.params.value }));
  }
};

export { TimeZonePicker as hub_field_input_time_zone };
