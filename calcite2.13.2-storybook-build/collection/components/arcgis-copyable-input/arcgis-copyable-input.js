import { h, Host, Fragment } from '@stencil/core';
import { bind } from '../../utils/context';
import { copyStringToClipboard } from '../../utils/clipboard';
import intlManager from '../../utils/intl-manager';
/**
 * @slot label - A slot that overwrites the label area which can be used to add buttons, icons, etc. The label is overwritten in order to allow for styling changes.
 */
export class ArcgisCopyableInput {
  constructor() {
    this.type = 'text';
    this.label = undefined;
    this.placeholder = undefined;
    this.buttonText = undefined;
    this.value = undefined;
    this.readonly = false;
    this.disabled = false;
    bind(this, 'onCopyButtonClick', 'handleCalciteInputInput');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (this.type === "textarea") {
      this.buttonText = this.buttonText || this.intl.t('copyCode');
    }
  }
  handleCalciteInputInput(event) {
    this.value = event.target.value;
  }
  onCopyButtonClick() {
    this.arcgisHubCopyButtonClicked.emit(this.value);
    copyStringToClipboard(this.value);
  }
  renderCopyButton(buttonText, icon, slot) {
    return (h("calcite-button", { class: "copy-button", disabled: this.disabled, iconStart: icon, label: this.intl.t('copyButtonLabel'), onClick: this.onCopyButtonClick, slot: slot }, buttonText));
  }
  render() {
    const isTypeText = this.type === "text";
    return (h(Host, null, h("calcite-label", null, h("slot", { name: "label" }, this.label), isTypeText
      ? h("calcite-input", { disabled: this.disabled, onCalciteInputInput: this.handleCalciteInputInput, placeholder: this.placeholder, readOnly: this.readonly, type: this.type, value: this.value }, this.renderCopyButton(null, "copy-to-clipboard", "action"))
      : h(Fragment, null, h("calcite-input", { disabled: this.disabled, placeholder: this.placeholder, readOnly: this.readonly, scale: "l", type: this.type, value: this.value }), this.renderCopyButton(this.buttonText)))));
  }
  static get is() { return "arcgis-copyable-input"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-copyable-input.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-copyable-input.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'text' | 'textarea'",
          "resolved": "\"text\" | \"textarea\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'text'"
      },
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
          "text": "Label for the input element. Also sets it's aria-label."
        },
        "attribute": "label",
        "reflect": false
      },
      "placeholder": {
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
          "text": "Placeholder for the input element."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "buttonText": {
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
          "text": "Button text for the copy button element."
        },
        "attribute": "button-text",
        "reflect": false
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value of the input element."
        },
        "attribute": "value",
        "reflect": true
      },
      "readonly": {
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
          "text": "Marks the input element as read-only. Copy button remains active."
        },
        "attribute": "readonly",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Disables both the input element and the copy button"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubCopyButtonClicked",
        "name": "arcgisHubCopyButtonClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits the current value of the input when the copy button is clicked"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
