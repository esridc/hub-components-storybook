'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const RichText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, "handleArcgisHubInputRichTextChange");
  }
  handleArcgisHubInputRichTextChange(evt) {
    const val = evt.target.value;
    this.arcgisConfigurationEditorFieldInputChange.emit(val);
  }
  render() {
    var _a, _b, _c, _d;
    const schema = this.params.schema;
    return (index.h("arcgis-hub-rich-text", { disabled: this.params.disabled, label: schema.title, onArcgisHubRichTextChange: this.handleArcgisHubInputRichTextChange, rows: ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.rows) || 5, toolbar: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.toolbar, value: this.params.value }));
  }
};

exports.hub_field_input_rich_text = RichText;
