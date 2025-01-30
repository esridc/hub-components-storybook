import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';

const Switch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.params = undefined;
    bind(this, 'handleCalciteSwitchChange');
  }
  handleCalciteSwitchChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.checked);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action[evt.target.checked ? "select" : "deselect"]), { label: this.params.telemetryLabel }));
  }
  render() {
    var _a;
    return (h("calcite-switch", { checked: this.params.value, disabled: this.params.disabled, label: this.params.schema.title, onCalciteSwitchChange: this.handleCalciteSwitchChange, scale: ((_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.scale) || this.params.scale }));
  }
};

export { Switch as hub_field_input_switch };
