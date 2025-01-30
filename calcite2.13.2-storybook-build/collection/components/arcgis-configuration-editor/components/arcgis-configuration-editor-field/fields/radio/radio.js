/* eslint-disable react/jsx-key */
import { h, Host } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import { getLabelForEnum } from '../../utils/getLabelForEnum';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { evaluateUiSchemaRules } from '../../../../utils/rules';
import { UiSchemaRuleEffects } from '@esri/hub-common';
export class Radio {
  constructor() {
    this.params = undefined;
    this.styles = undefined;
    bind(this, 'handleCalciteRadioButtonGroupChange');
  }
  handleCalciteRadioButtonGroupChange(evt) {
    const el = evt.target;
    const index = el.getAttribute('data-option-index');
    this.arcgisConfigurationEditorFieldInputChange.emit(this.params.schema.enum[index]);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: el.value }));
  }
  renderOptions({ schema, uiSchema, value: selectedValue, t }) {
    const enumValues = schema.enum || [];
    return (enumValues.map((value, index) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      /**
       * for enum labels and descriptions, you can either provide
       * (in the uiSchema) an array of pre-translated strings OR
       * configure an i18nScope which will be used to translate
       * the enum labels/descriptions at runtime.
       * In both cases, if a label is not provided, we fall back to
       * displaying the enum value
       */
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index]) || value
        : getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const description = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.descriptions)
        ? (_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.descriptions[index]
        : getLabelForEnum(uiSchema, value, t, { path: 'description', fallback: "" });
      const icon = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.icons) && ((_f = uiSchema.options) === null || _f === void 0 ? void 0 : _f.icons[index]);
      const tooltip = (_h = (_g = uiSchema.options) === null || _g === void 0 ? void 0 : _g.tooltips) === null || _h === void 0 ? void 0 : _h[index];
      // handle rules
      const rules = ((_j = uiSchema.options) === null || _j === void 0 ? void 0 : _j.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], this.params.model);
      const isDisabled = Boolean((_l = (_k = uiSchema.options) === null || _k === void 0 ? void 0 : _k.disabled) === null || _l === void 0 ? void 0 : _l[index]) || ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
      return !ruleEffects.includes(UiSchemaRuleEffects.HIDE) && (h("calcite-label", { key: value, layout: "inline", scale: this.params.scale }, h("calcite-radio-button", { checked: value === selectedValue, "data-option-index": index, disabled: this.params.disabled || isDisabled, id: `radio-${value}`, onCalciteRadioButtonChange: this.handleCalciteRadioButtonGroupChange, scale: this.params.scale, value: value }), tooltip && (h("calcite-tooltip", { placement: tooltip.placement, referenceElement: `radio-${value}` }, tooltip.text)), (description || icon) ? (h("calcite-block", { class: "config-editor-radio__block", description: description, heading: label }, icon && h("calcite-icon", { icon: icon, scale: "s", slot: "icon-start" })))
        : label));
    }));
  }
  render() {
    return (h(Host, { style: this.styles }, h("fieldset", null, h("legend", { "aria-label": this.params.label }), h("calcite-radio-button-group", { disabled: this.params.disabled, layout: "vertical", name: this.params.schema.title, scale: this.params.scale }, this.renderOptions(this.params)))));
  }
  static get is() { return "hub-field-input-radio"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["radio.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["radio.css"]
    };
  }
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
      },
      "styles": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IStyleParams",
          "resolved": "IStyleParams",
          "references": {
            "IStyleParams": {
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
          "original": "any",
          "resolved": "any",
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
  static get elementRef() { return "element"; }
}
;
