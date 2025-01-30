import { r as registerInstance, c as createEvent, h } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { A as ALIGNMENTS } from './interfaces-0d0bef14.js';

const Alignment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    bind(this, 'handleCalciteSegmentedControlChange');
  }
  handleCalciteSegmentedControlChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
  }
  render() {
    return (h("calcite-segmented-control", { onCalciteSegmentedControlChange: this.handleCalciteSegmentedControlChange, scale: this.params.scale }, h("calcite-segmented-control-item", { checked: this.params.value === ALIGNMENTS.start, value: ALIGNMENTS.start }, h("calcite-icon", { icon: "left-align", scale: "s", "text-label": ALIGNMENTS.start })), h("calcite-segmented-control-item", { checked: this.params.value === ALIGNMENTS.center, value: ALIGNMENTS.center }, h("calcite-icon", { icon: "center-align", scale: "s", "text-label": ALIGNMENTS.center })), h("calcite-segmented-control-item", { checked: this.params.value === ALIGNMENTS.end, value: ALIGNMENTS.end }, h("calcite-icon", { icon: "right-align", scale: "s", "text-label": ALIGNMENTS.end }))));
  }
};

export { Alignment as hub_field_input_alignment };
