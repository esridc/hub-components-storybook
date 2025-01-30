'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');

const Multiselect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleHubMultiselectChange');
  }
  handleHubMultiselectChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.detail.values);
  }
  render() {
    const values = this.params.value || [];
    return (index.h("hub-multiselect", { disabled: this.params.disabled, label: this.params.schema.title, onHubMultiselectChange: this.handleHubMultiselectChange, scale: this.params.scale, values: values }));
  }
};

exports.hub_field_input_multiselect = Multiselect;
