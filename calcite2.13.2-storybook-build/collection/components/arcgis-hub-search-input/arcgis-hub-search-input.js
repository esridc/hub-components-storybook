import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
/**
 * @internal
 * This component is intended for use in the various -gallery components
 */
export class ArcgisHubSearchInput {
  constructor() {
    this.value = undefined;
    this.placeholder = "Enter search term...";
    this.text = "Search";
    this.scale = undefined;
    bind(this, 'handleInput', 'handleInputChange');
  }
  /**
   * This event fires each time a new value is typed and committed
   * Which means it fires
   * - when the user presses enter
   * - when the user tabs out of the input
   * - when the clear button is clicked
   * - when the action button is clicked
   */
  handleInputChange() {
    this.inputChange.emit(this.value);
  }
  /**
   * Keep the internal value syncronized with the calcite-input
   *
   * @param ev
   */
  handleInput(ev) {
    this.value = ev.target.value;
  }
  render() {
    return (h(Host, null, h("calcite-input", { clearable: true, onCalciteInputChange: this.handleInputChange, onCalciteInputInput: this.handleInput, placeholder: this.placeholder, scale: this.scale, value: this.value }, h("calcite-button", { scale: this.scale, slot: "action" }, this.text))));
  }
  static get is() { return "arcgis-hub-search-input"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-search-input.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-search-input.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value of the search input. As the text changes\nthe `value` is kept in sync."
        },
        "attribute": "value",
        "reflect": true
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
          "text": "Placeholder message\nConsumers should pass in translated string"
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "\"Enter search term...\""
      },
      "text": {
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
          "text": "Button Text\nConsumers should pass in translated string"
        },
        "attribute": "text",
        "reflect": false,
        "defaultValue": "\"Search\""
      },
      "scale": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Scale of the component"
        },
        "attribute": "scale",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "inputChange",
        "name": "hubSearchInputChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "When the search is submitted, this event is raised"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
