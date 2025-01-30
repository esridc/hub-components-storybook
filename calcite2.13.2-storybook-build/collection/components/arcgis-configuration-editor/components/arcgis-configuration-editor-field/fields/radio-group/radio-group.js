import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import { getLabelForEnum } from '../../utils/getLabelForEnum';
import { evaluateUiSchemaRules } from '../../../../utils/rules';
import { UiSchemaRuleEffects } from '@esri/hub-common';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class RadioGroup {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteSegmentedControlChange');
  }
  handleCalciteSegmentedControlChange(evt) {
    this.arcgisConfigurationEditorFieldInputChange.emit(evt.target.value);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: evt.target.value }));
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index) => {
      var _a, _b, _c, _d, _e;
      /**
       * for enum labels, you can either provide (in the uiSchema)
       * an array of pre-translated strings OR configure an i18nScope
       * which will be used to translate the enum labels at runtime.
       * In both cases, if a label is not provided, we fall back to
       * displaying the enum value
       */
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index]) || value
        : getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const icon = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.icons) && ((_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.icons[index]);
      // handle rules
      const rules = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], this.params.model);
      return !ruleEffects.includes(UiSchemaRuleEffects.HIDE) && (h("calcite-segmented-control-item", { checked: value === selectedValue, "data-option-index": index, iconStart: icon, key: value, value: value }, label));
    }));
  }
  render() {
    var _a;
    return (h("calcite-segmented-control", { disabled: this.params.disabled, layout: "horizontal", name: this.params.schema.title, onCalciteSegmentedControlChange: this.handleCalciteSegmentedControlChange, scale: this.params.scale, width: (_a = this.params.uiSchema.options) === null || _a === void 0 ? void 0 : _a.width }, this.renderOptions(this.params)));
  }
  static get is() { return "hub-field-input-radio-group"; }
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
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
}
;
