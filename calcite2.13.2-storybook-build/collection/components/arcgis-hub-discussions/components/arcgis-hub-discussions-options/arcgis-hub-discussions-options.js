import { Host, h } from '@stencil/core';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
/** @internal */
export class ArcgisHubDiscussionsOptions {
  /**
   * Constructor function, pre-binds context
   */
  constructor() {
    this.disabled = false;
    this.variant = undefined;
    this.layout = 'horizontal';
    this.value = undefined;
    bind(this, 'handleTileChange');
  }
  /**
   * Component will load lifecycle method
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Handles changes to the calcite title selects
   * @param evt
   */
  handleTileChange(evt) {
    evt.stopPropagation();
    const target = evt.target;
    this.value = target.value;
    this.arcgisHubDiscussionsOptionsChange.emit(target.value);
  }
  /**
   * Discussability settings form config
   */
  get options() {
    return [
      {
        value: true,
        icon: 'speech-bubbles',
      },
      {
        value: false,
        icon: 'circle-disallowed',
      }
    ];
  }
  /**
   * Primary render method
   */
  render() {
    const { intl, options, variant, value, disabled, layout } = this;
    return (h(Host, { "data-element": "discussions-options" }, h("calcite-label", { scale: "l" }, intl.t(`${variant}.label`), h("calcite-tile-select-group", { layout: layout }, options.map(option => (h("calcite-tile-select", { checked: option.value === value, description: intl.t(`${variant}.${option.value}.description`), disabled: disabled, heading: intl.t(`${option.value}.heading`), icon: option.icon, "input-enabled": true, key: option.icon, name: "discussable", onCalciteTileSelectChange: this.handleTileChange, type: "radio", value: option.value, width: layout === 'vertical' ? 'full' : 'auto' })))))));
  }
  static get is() { return "arcgis-hub-discussions-options"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-options.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-options.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": "If the tile selects should be disabled"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DiscussionType",
          "resolved": "DiscussionType.BOARD | DiscussionType.CONTENT | DiscussionType.GROUP",
          "references": {
            "DiscussionType": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Text variant for content vs group"
        },
        "attribute": "variant",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TileSelectGroupLayout",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {
            "TileSelectGroupLayout": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/tile-select-group/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The layout of the tile select group"
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "'horizontal'"
      },
      "value": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The value of the control, derived from"
        },
        "attribute": "value",
        "reflect": true
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsOptionsChange",
        "name": "arcgisHubDiscussionsOptionsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the selected tile changes"
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
