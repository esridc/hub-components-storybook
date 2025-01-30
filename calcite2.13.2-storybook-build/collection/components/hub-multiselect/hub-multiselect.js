import { h } from '@stencil/core';
export class HubMultiselect {
  constructor() {
    this.label = undefined;
    this.values = undefined;
    this.disabled = false;
    this.scale = undefined;
    this.parsedValues = [];
  }
  /**
   * Property watchers
   */
  handleValuesChanged(values) {
    this.parsedValues = Array.isArray(values) ? values : values.split(',');
  }
  /**
   * Event handling
   */
  handleChipCloseEvent(event) {
    const optionValue = event.target.value;
    const index = this.parsedValues.findIndex((value) => value === optionValue);
    // update the reference
    this.parsedValues = [
      ...this.parsedValues.slice(0, index),
      ...this.parsedValues.slice(index + 1)
    ];
    this.hubMultiselectChange.emit({
      values: this.parsedValues.slice()
    });
  }
  handleKeyEvent(event) {
    const input = event.target;
    // only response when
    // * the Enter key is pressed
    // * the input box has a value
    // * the input box value is not duplicated with any selected value
    if (event.key === 'Enter' && input.value && !this.parsedValues.includes(input.value)) {
      const newValue = input.value;
      // update reference
      this.parsedValues = [
        ...this.parsedValues,
        newValue
      ];
      this.hubMultiselectChange.emit({
        values: this.parsedValues.slice()
      });
      input.value = '';
    }
  }
  /**
   * Hooks
   */
  componentWillLoad() {
    if (this.values) {
      this.handleValuesChanged(this.values);
    }
  }
  /**
   * Functions
   */
  render() {
    return (h("div", null, this.disabled
      ? null
      : h("calcite-input", { disabled: this.disabled, label: this.label, scale: this.scale }), this.parsedValues.map((value) => h("calcite-chip", { closable: !this.disabled, key: value, scale: this.scale, value: value }, value))));
  }
  static get is() { return "hub-multiselect"; }
  static get originalStyleUrls() {
    return {
      "$": ["hub-multiselect.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["hub-multiselect.css"]
    };
  }
  static get properties() {
    return {
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A label for the multiselect component"
        },
        "attribute": "label",
        "reflect": false
      },
      "values": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string[] | string",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An array of selected values."
        },
        "attribute": "values",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A boolean value indicating whether the multiselect is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "parsedValues": {}
    };
  }
  static get events() {
    return [{
        "method": "hubMultiselectChange",
        "name": "hubMultiselectChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This custom event is emitted when the selected values is changed."
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "local"
            }
          }
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "values",
        "methodName": "handleValuesChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteChipClose",
        "method": "handleChipCloseEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keyup",
        "method": "handleKeyEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
