import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';

const Multiselect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, 'handleHubMultiselectChange');
  }
  handleHubMultiselectChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.detail.values);
  }
  render() {
    const values = this.params.value || [];
    return (h("hub-multiselect", { disabled: this.params.disabled, label: this.params.schema.title, onHubMultiselectChange: this.handleHubMultiselectChange, scale: this.params.scale, values: values }));
  }
};

export { Multiselect as hub_field_input_multiselect };
