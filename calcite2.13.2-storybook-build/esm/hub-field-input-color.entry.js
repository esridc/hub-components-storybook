import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';

const ColorPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, 'handleArcgisHubInputColorChange');
  }
  handleArcgisHubInputColorChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
  }
  render() {
    var _a, _b;
    const schema = this.params.schema;
    return (h("arcgis-hub-input-color", { disabled: this.params.disabled, label: schema.title, onArcgisHubInputColorChange: this.handleArcgisHubInputColorChange, savedColors: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.savedColors, value: this.params.value }));
  }
};

export { ColorPicker as hub_field_input_color };
