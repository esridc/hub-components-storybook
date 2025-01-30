import { h } from '@stencil/core';
import { bind } from '../../../../../../utils/context';
import { getLabelForEnum } from '../../utils/getLabelForEnum';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { evaluateUiSchemaRules } from '../../../../utils/rules';
import { UiSchemaRuleEffects } from '@esri/hub-common';
export class TileSelect {
  constructor() {
    this.params = undefined;
    this.styles = undefined;
    this.selectedValues = undefined;
    bind(this, 'handleCalciteTileSelect');
  }
  get isCheckbox() {
    var _a, _b;
    return ((_b = (_a = this.params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.type) === 'checkbox';
  }
  get schemaEnum() {
    var _a;
    let schemaEnum;
    if (this.isCheckbox) {
      schemaEnum = (_a = this.params.schema.items) === null || _a === void 0 ? void 0 : _a.enum;
    }
    else if (this.params.schema.enum) {
      schemaEnum = this.params.schema.enum;
    }
    else if (!this.params.schema.enum && this.params.schema.type === 'boolean') {
      schemaEnum = [false, true];
    }
    return schemaEnum || [];
  }
  componentWillLoad() {
    if (this.isCheckbox) {
      // initialize selected values state
      this.selectedValues = this.schemaEnum.map(value => { var _a, _b; return { value, selected: ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.includes(value)) || false }; });
    }
  }
  handleCalciteTileSelect(evt) {
    const el = evt.target;
    const index = el.getAttribute('data-option-index');
    const value = this.schemaEnum[index];
    let items; // if radio mode, a string; if checkbox mode, an array
    /**
     * We want to emit a string/boolean when we are in radio mode, but an array of
     * strings/booleans when we are in checkbox mode. For JSON schema validation
     * purposes, we need to keep the format consistent, so, if we are in checkbox mode, we
     * always convert selection to an array.
     */
    if (this.isCheckbox) {
      const selected = !el.hasAttribute('selected'); // catches before checkbox communicates to tile-select, so opposite
      // add to our state
      if (selected) {
        this.selectedValues[index].selected = true;
      }
      // remove from our state
      else {
        this.selectedValues[index].selected = false;
      }
      items = this.selectedValues.reduce((acc, el) => {
        el.selected && acc.push(el.value);
        return acc;
      }, []);
    }
    else {
      items = value;
    }
    this.arcgisConfigurationEditorFieldInputChange.emit(items);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.select), { label: this.params.telemetryLabel, details: Array.isArray(items) ? items.join(',') : items }));
  }
  renderOptions({ uiSchema, value: selectedValue, model, t }) {
    return (this.schemaEnum.map((value, index) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      const label = ((_a = uiSchema.options) === null || _a === void 0 ? void 0 : _a.labels)
        ? ((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.labels[index]) || value
        : getLabelForEnum(uiSchema, value, t, { path: 'label', fallback: value });
      const icon = ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.icons) && ((_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.icons[index]);
      const description = ((_e = uiSchema.options) === null || _e === void 0 ? void 0 : _e.descriptions)
        ? (_f = uiSchema.options) === null || _f === void 0 ? void 0 : _f.descriptions[index]
        : getLabelForEnum(uiSchema, value, t, { path: 'description', fallback: "" });
      // handle rules
      const rules = ((_g = uiSchema.options) === null || _g === void 0 ? void 0 : _g.rules) || [];
      const ruleEffects = evaluateUiSchemaRules(rules[index], model);
      const isDisabled = Boolean((_j = (_h = uiSchema.options) === null || _h === void 0 ? void 0 : _h.disabled) === null || _j === void 0 ? void 0 : _j[index]) || ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
      if (!ruleEffects.includes(UiSchemaRuleEffects.HIDE)) {
        return h("calcite-tile", { "data-option-index": index, description: description, disabled: isDisabled, heading: label, icon: icon, "input-alignment": "end", "input-enabled": true, key: value, onCalciteTileSelect: this.handleCalciteTileSelect, scale: (_k = this.params) === null || _k === void 0 ? void 0 : _k.scale, selected: this.isCheckbox ? selectedValue.includes(value) : value === selectedValue });
      }
    }));
  }
  render() {
    var _a, _b, _c, _d;
    const layout = ((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.layout) || "vertical";
    const selectionMode = this.isCheckbox ? 'multiple' : 'single-persist';
    return (h("calcite-tile-group", { disabled: this.params.disabled, label: this.params.label, layout: layout, scale: (_d = this.params) === null || _d === void 0 ? void 0 : _d.scale, selectionMode: selectionMode, style: this.styles }, this.renderOptions(this.params)));
  }
  static get is() { return "hub-field-input-tile-select"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["tile-select.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["tile-select.css"]
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
  static get states() {
    return {
      "selectedValues": {}
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
          "original": "string | string[]",
          "resolved": "string | string[]",
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
