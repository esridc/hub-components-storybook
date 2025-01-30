import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import { ALIGNMENTS } from "../../../../../interfaces";
export class Alignment {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteSegmentedControlChange');
  }
  handleCalciteSegmentedControlChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
  }
  render() {
    return (h("calcite-segmented-control", { onCalciteSegmentedControlChange: this.handleCalciteSegmentedControlChange, scale: this.params.scale }, h("calcite-segmented-control-item", { checked: this.params.value === ALIGNMENTS.start, value: ALIGNMENTS.start }, h("calcite-icon", { icon: "left-align", scale: "s", "text-label": ALIGNMENTS.start })), h("calcite-segmented-control-item", { checked: this.params.value === ALIGNMENTS.center, value: ALIGNMENTS.center }, h("calcite-icon", { icon: "center-align", scale: "s", "text-label": ALIGNMENTS.center })), h("calcite-segmented-control-item", { checked: this.params.value === ALIGNMENTS.end, value: ALIGNMENTS.end }, h("calcite-icon", { icon: "right-align", scale: "s", "text-label": ALIGNMENTS.end }))));
  }
  static get is() { return "hub-field-input-alignment"; }
  static get properties() {
    return {
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IRenderParams",
          "resolved": "IRenderParams",
          "references": {
            "IRenderParams": {
              "location": "import",
              "path": "../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorFieldInputChange",
        "name": "arcgisConfigurationEditorFieldInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
;
