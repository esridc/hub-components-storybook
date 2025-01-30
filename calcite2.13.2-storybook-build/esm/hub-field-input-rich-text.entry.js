import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';

const RichText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, "handleArcgisHubInputRichTextChange");
  }
  handleArcgisHubInputRichTextChange(evt) {
    const val = evt.target.value;
    this.arcgisConfigurationEditorFieldInputChange.emit(val);
  }
  render() {
    var _a, _b, _c, _d;
    const schema = this.params.schema;
    return (h("arcgis-hub-rich-text", { disabled: this.params.disabled, label: schema.title, onArcgisHubRichTextChange: this.handleArcgisHubInputRichTextChange, rows: ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.rows) || 5, toolbar: (_d = (_c = this.params.uiSchema) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.toolbar, value: this.params.value }));
  }
};

export { RichText as hub_field_input_rich_text };
