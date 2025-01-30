'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const ColorPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleArcgisHubInputColorChange');
  }
  handleArcgisHubInputColorChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
  }
  render() {
    var _a, _b;
    const schema = this.params.schema;
    return (index.h("arcgis-hub-input-color", { disabled: this.params.disabled, label: schema.title, onArcgisHubInputColorChange: this.handleArcgisHubInputColorChange, savedColors: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.savedColors, value: this.params.value }));
  }
};

exports.hub_field_input_color = ColorPicker;
