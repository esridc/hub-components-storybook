import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import { getLabelForEnum } from '../../utils/getLabelForEnum';
import { evaluateUiSchemaRules } from '../../../../utils/rules';
import { UiSchemaRuleEffects } from '@esri/hub-common';
export class Select {
  constructor() {
    this.params = undefined;
    bind(this, 'handleCalciteSelectChange');
  }
  handleCalciteSelectChange(evt) {
    const element = evt.target;
    const index = element.selectedOption.getAttribute('data-option-index');
    this.arcgisConfigurationEditorFieldInputChange.emit(this.params.schema.enum[index]);
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index) => {
      var _a, _b, _c;
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
      // handle rules
      const rules = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], this.params.model);
      const isDisabled = ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
      return !ruleEffects.includes(UiSchemaRuleEffects.HIDE) && (h("calcite-option", { "data-option-index": index, disabled: isDisabled, key: value, selected: value === selectedValue, value: value }, label));
    }));
  }
  render() {
    var _a, _b;
    return (h("calcite-select", { disabled: this.params.disabled || ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.disabled), label: this.params.schema.title, onCalciteSelectChange: this.handleCalciteSelectChange, scale: this.params.scale }, this.renderOptions(this.params)));
  }
  static get is() { return "hub-field-input-select"; }
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
