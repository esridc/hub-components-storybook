'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const interfaces = require('./interfaces-fc0046ff.js');

const Alignment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldInputChange = index.createEvent(this, "arcgisConfigurationEditorFieldInputChange", 7);
    this.params = undefined;
    context.bind(this, 'handleCalciteSegmentedControlChange');
  }
  handleCalciteSegmentedControlChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
  }
  render() {
    return (index.h("calcite-segmented-control", { onCalciteSegmentedControlChange: this.handleCalciteSegmentedControlChange, scale: this.params.scale }, index.h("calcite-segmented-control-item", { checked: this.params.value === interfaces.ALIGNMENTS.start, value: interfaces.ALIGNMENTS.start }, index.h("calcite-icon", { icon: "left-align", scale: "s", "text-label": interfaces.ALIGNMENTS.start })), index.h("calcite-segmented-control-item", { checked: this.params.value === interfaces.ALIGNMENTS.center, value: interfaces.ALIGNMENTS.center }, index.h("calcite-icon", { icon: "center-align", scale: "s", "text-label": interfaces.ALIGNMENTS.center })), index.h("calcite-segmented-control-item", { checked: this.params.value === interfaces.ALIGNMENTS.end, value: interfaces.ALIGNMENTS.end }, index.h("calcite-icon", { icon: "right-align", scale: "s", "text-label": interfaces.ALIGNMENTS.end }))));
  }
};

exports.hub_field_input_alignment = Alignment;
