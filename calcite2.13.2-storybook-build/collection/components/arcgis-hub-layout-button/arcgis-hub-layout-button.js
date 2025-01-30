import { h, Host } from '@stencil/core';
import { bind } from '../../utils/context';
export class ArcgisHubLayoutButton {
  constructor() {
    this.selected = undefined;
    this.icon = undefined;
    this.layout = undefined;
    this.tooltip = undefined;
    bind(this, 'selectLayout', 'setPopoverElement', 'maybeOpenPopover', 'maybeClosePopover');
  }
  get _kind() {
    return this.selected ? 'neutral' : 'brand';
  }
  get _appearance() {
    return this.selected ? 'solid' : 'transparent';
  }
  setPopoverElement(el) {
    this.popoverElement = el;
  }
  maybeOpenPopover() {
    this.tooltip && (this.popoverElement.open = true);
  }
  maybeClosePopover() {
    this.tooltip && (this.popoverElement.open = false);
  }
  selectLayout() {
    this.arcgisHubLayoutButtonSelect.emit(this.layout);
  }
  render() {
    return h(Host, { onMouseEnter: this.maybeOpenPopover, onMouseLeave: this.maybeClosePopover }, h("calcite-button", { appearance: this._appearance, "aria-current": this.selected, id: "toggle-button", kind: this._kind, label: this.tooltip || this.layout, onClick: this.selectLayout, scale: "l" }, h("calcite-icon", { icon: this.icon })), this.tooltip &&
      h("calcite-popover", { label: this.tooltip, placement: "bottom-end", ref: this.setPopoverElement, referenceElement: "toggle-button" }, h("div", { class: "popover-content" }, this.tooltip)));
  }
  static get is() { return "arcgis-hub-layout-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-layout-button.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-layout-button.css"]
    };
  }
  static get properties() {
    return {
      "selected": {
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
          "tags": [{
              "name": "private",
              "text": undefined
            }],
          "text": "Whether this button represents the current layout"
        },
        "attribute": "selected",
        "reflect": false
      },
      "icon": {
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
          "tags": [{
              "name": "private",
              "text": undefined
            }],
          "text": "Passthrough to underlying button"
        },
        "attribute": "icon",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LayoutOptions",
          "resolved": "\"calendar\" | \"compact\" | \"grid\" | \"grid-filled\" | \"list\" | \"map\" | \"table\"",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "private",
              "text": undefined
            }],
          "text": "Layout option that the button represents"
        },
        "attribute": "layout",
        "reflect": true
      },
      "tooltip": {
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
          "tags": [{
              "name": "private",
              "text": undefined
            }],
          "text": "Text for tooltip that appears on hover"
        },
        "attribute": "tooltip",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubLayoutButtonSelect",
        "name": "arcgisHubLayoutButtonSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "LayoutOptions",
          "resolved": "\"calendar\" | \"compact\" | \"grid\" | \"grid-filled\" | \"list\" | \"map\" | \"table\"",
          "references": {
            "LayoutOptions": {
              "location": "import",
              "path": "../../utils/types"
            }
          }
        }
      }];
  }
}
