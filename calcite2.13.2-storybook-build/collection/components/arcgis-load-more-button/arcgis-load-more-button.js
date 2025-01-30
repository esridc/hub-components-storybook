import { h, Host } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { bind } from '../../utils/context';
import { buttonColorToKind } from '../../utils/calcite';
/** @internal */
export class ArcgisLoadMoreButton {
  constructor() {
    this.nextStart = undefined;
    this.color = "neutral";
    this.appearance = "transparent";
    this.scale = "l";
    this.width = "full";
    this.round = true;
    this.loading = false;
    bind(this, 'handleLoadMore');
  }
  get hasMoreResults() {
    const { nextStart } = this;
    return nextStart !== -1;
  }
  get disabled() {
    const { loading, hasMoreResults } = this;
    return loading || !hasMoreResults;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  handleLoadMore() {
    const { nextStart } = this;
    this.arcgisLoadMoreChange.emit(nextStart);
  }
  render() {
    const { loading, handleLoadMore, round, scale, width, intl, hasMoreResults, disabled, color, appearance } = this;
    const text = intl.t('loadMore');
    return (h(Host, null, hasMoreResults &&
      h("calcite-button", { appearance: appearance, disabled: disabled || loading, kind: buttonColorToKind(color), label: text, loading: loading, onClick: handleLoadMore, round: round, scale: scale, width: width }, text)));
  }
  static get is() { return "arcgis-load-more-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-load-more-button.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-load-more-button.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "nextStart": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{number}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": "The next start value"
        },
        "attribute": "next-start",
        "reflect": true
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonColor",
          "resolved": "\"blue\" | \"inverse\" | \"neutral\" | \"red\"",
          "references": {
            "ButtonColor": {
              "location": "import",
              "path": "../../utils/calcite"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{ButtonColor}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": "The calcite-button color\nTODO: deprecate this and replace w/ kind"
        },
        "attribute": "color",
        "reflect": true,
        "defaultValue": "\"neutral\""
      },
      "appearance": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Appearance",
          "resolved": "\"outline\" | \"outline-fill\" | \"solid\" | \"transparent\"",
          "references": {
            "Appearance": {
              "location": "import",
              "path": "./interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Appearance}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": "The calcite-button appearance"
        },
        "attribute": "appearance",
        "reflect": true,
        "defaultValue": "\"transparent\""
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
              "path": "./interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Scale}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": "The calcite-button scale"
        },
        "attribute": "scale",
        "reflect": true,
        "defaultValue": "\"l\""
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Width",
          "resolved": "\"auto\" | \"full\" | \"half\"",
          "references": {
            "Width": {
              "location": "import",
              "path": "./interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{Width}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": "The calcite-button width"
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "\"full\""
      },
      "round": {
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
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": "The calcite-button applied round style"
        },
        "attribute": "round",
        "reflect": true,
        "defaultValue": "true"
      },
      "loading": {
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
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "ArcgisLoadMoreButton"
            }],
          "text": ""
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisLoadMoreChange",
        "name": "arcgisLoadMoreChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
