import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
export class ArcgisHubMapWidgetContainer {
  constructor() {
    this.expandDisabled = undefined;
    this.viewPosition = 'top-right';
    this.view = undefined;
    this.scale = 'm';
    this.expanded = undefined;
    bind(this, 'toggleExpanded');
  }
  get position() {
    return this.viewPosition.includes('right')
      ? 'end'
      : 'start';
  }
  componentWillLoad() {
    const { view, el, viewPosition } = this;
    if (view && view.ui) {
      view.ui.add(el, viewPosition);
    }
  }
  disconnectedCallback() {
    const { view, el } = this;
    if (view && view.ui) {
      view.ui.remove(el);
    }
  }
  addWidgetToView(view, prevView) {
    if (view && view.ui && view !== prevView) {
      this.view.ui.add(this.el, this.viewPosition);
    }
  }
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  render() {
    const { expandDisabled, expanded, position, scale } = this;
    return (h(Host, null, this.view && (h("calcite-action-pad", { expandDisabled: expandDisabled, expanded: expanded, onCalciteActionPadToggle: this.toggleExpanded, position: position, scale: scale }, h("slot", null)))));
  }
  static get is() { return "arcgis-hub-map-widget-container"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-container.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-container.css"]
    };
  }
  static get properties() {
    return {
      "expandDisabled": {
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
          "text": ""
        },
        "attribute": "expand-disabled",
        "reflect": false
      },
      "viewPosition": {
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
          "text": ""
        },
        "attribute": "view-position",
        "reflect": false,
        "defaultValue": "'top-right'"
      },
      "view": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.View",
          "resolved": "View",
          "references": {
            "___esri": {
              "location": "global"
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
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
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
        "reflect": false,
        "defaultValue": "'m'"
      },
      "expanded": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "expanded",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "view",
        "methodName": "addWidgetToView"
      }];
  }
}
