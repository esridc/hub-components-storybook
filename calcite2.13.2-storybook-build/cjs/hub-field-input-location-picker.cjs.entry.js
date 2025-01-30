'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const LocationPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleArcgisHubInputLocationPickerChange');
  }
  get options() {
    var _a, _b;
    const defaultOptions = [{ label: '', location: { type: 'none' } }];
    const uiSchemaOptions = ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.options) || defaultOptions;
    // We assume the parent (what is constructing these options for the location picker)
    // has handled the translation of label/descriptions.
    return uiSchemaOptions;
  }
  handleArcgisHubInputLocationPickerChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.detail);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return (index.h(index.Host, { "data-element": "location-picker-field" }, index.h("arcgis-hub-location-picker", { extent: (_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.extent, locationNameRequired: (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options.locationNameRequired, mapTools: (_e = (_d = this.params.uiSchema) === null || _d === void 0 ? void 0 : _d.options) === null || _e === void 0 ? void 0 : _e.mapTools, noticeTitleElementAriaLevel: (_g = (_f = this.params.uiSchema) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.noticeTitleElementAriaLevel, onArcgisHubLocationPickerUpdate: this.handleArcgisHubInputLocationPickerChange, options: this.options, resetDrawingToolsOnDisconnect: (_j = (_h = this.params.uiSchema) === null || _h === void 0 ? void 0 : _h.options) === null || _j === void 0 ? void 0 : _j.resetDrawingToolsOnDisconnect })));
  }
};

exports.hub_field_input_location_picker = LocationPicker;
