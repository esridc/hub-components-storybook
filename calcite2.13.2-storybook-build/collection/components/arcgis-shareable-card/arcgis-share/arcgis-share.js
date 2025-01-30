import { h, Host } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { version } from "../../../../package.json";
import { getCardState, getLinkAndScriptTags, getSnippetByVal, getSnippetByRef } from '../../../utils/shareable-utils';
import { createId } from '@esri/hub-common';
export class ArcgisShare {
  /**
   * Hooks
   */
  constructor() {
    this.origin = undefined;
    this.pathname = undefined;
    this.search = undefined;
    this.hash = undefined;
    this.shareable = false;
    this.shareableByValue = false;
    this.shareableByReference = false;
    this.referenceElement = undefined;
    this.domId = undefined;
    this.snippetByVal = undefined;
    this.snippetByRef = undefined;
    this.domId = createId();
  }
  get linkUrl() {
    // start with the current url
    // (the end result is that if we were passed none of the params we are looking for, the generated url will be the current url)
    let result = new URL(location.href);
    const { origin, pathname, search, hash } = this;
    if (origin) {
      result = new URL(origin);
    }
    if (pathname) {
      // if we were passed a pathname, set that on our result
      result.pathname = pathname;
      // i think we should set search to '' in this case too but i could be talked out of that
      result.search = '';
    }
    if (search) {
      // if we were passed search, set that on our result
      result.search = search;
    }
    // set the hash to whatever was passed or set it to ''
    result.hash = hash !== null && hash !== void 0 ? hash : '';
    return result.href;
  }
  async getCardState() {
    const referenceElement = this.referenceElement;
    return referenceElement.getState ? (await referenceElement.getState()) : getCardState(this.referenceElement);
  }
  getSnippetByVal(state) {
    if (this.referenceElement && this.shareableByValue) {
      // the domId/id stuff - in order for the embedded snippet to be shareable via url, it needs to have an id so we just give it a random one
      const { domId: id, referenceElement } = this;
      const linkAndScript = getLinkAndScriptTags(version);
      const snippet = getSnippetByVal(referenceElement, Object.assign(Object.assign({}, state), { id }));
      return `${linkAndScript}\n${snippet}`;
    }
  }
  getSnippetByRef() {
    const { referenceElement } = this;
    if (referenceElement && this.shareableByReference) {
      const linkAndScript = getLinkAndScriptTags(version);
      const snippet = getSnippetByRef(referenceElement);
      return `${linkAndScript}\n${snippet}>`;
    }
  }
  async updateSnippets() {
    const { referenceElement } = this;
    if (referenceElement) {
      if (this.shareableByReference || this.shareableByValue) {
        await customElements.whenDefined(referenceElement.tagName.toLowerCase());
        const cardState = await this.getCardState();
        this.snippetByVal = this.getSnippetByVal(cardState);
        this.snippetByRef = this.getSnippetByRef();
      }
    }
  }
  ;
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentWillRender() {
    /*
      NOTE: if doing it in componentWillRender is not sufficient, we can implement a mutation observer on the reference element - something like:
      const observer = new MutationObserver(mutations => {
        mutations.forEach(_ => {
          this.updateSnippets();
        });
      });
      observer.observe(this.referenceElement, {
        attributes: true
      });
    }
    */
    this.updateSnippets();
  }
  onCopyButtonClicked(event) {
    event.stopPropagation();
    const telemetry = Object.assign(Object.assign({}, dictionary.category.interaction.action.share.label.link), { details: event.detail });
    this.hubTelemetry.emit(telemetry);
  }
  render() {
    return h(Host, { "data-element": "share" }, this.shareable && h("arcgis-copyable-input", { label: this.intl.t('copyLinkLabel'), readonly: true, type: "text", value: this.linkUrl }), this.shareableByValue && h("arcgis-copyable-input", { label: this.intl.t('copySnippetByValLabel'), readonly: true, type: "textarea", value: this.snippetByVal }), this.shareableByReference && h("arcgis-copyable-input", { label: this.intl.t('copySnippetByRefLabel'), readonly: true, type: "textarea", value: this.snippetByRef }));
  }
  static get is() { return "arcgis-share"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-share.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-share.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "origin": {
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
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "The origin of the shareable link (optional)"
        },
        "attribute": "origin",
        "reflect": false
      },
      "pathname": {
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
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "The pathname of the shareable link (optional)"
        },
        "attribute": "pathname",
        "reflect": false
      },
      "search": {
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
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "The query string of the shareable link (optional)"
        },
        "attribute": "search",
        "reflect": false
      },
      "hash": {
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
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "The url hash of the shareable link (optional)"
        },
        "attribute": "hash",
        "reflect": false
      },
      "shareable": {
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
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "Indicates whether the card is shareable via link"
        },
        "attribute": "shareable",
        "reflect": false,
        "defaultValue": "false"
      },
      "shareableByValue": {
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
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "Indicates whether the card is shareable via embed"
        },
        "attribute": "shareable-by-value",
        "reflect": false,
        "defaultValue": "false"
      },
      "shareableByReference": {
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
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "Indicates whether the card is shareable via embed by reference"
        },
        "attribute": "shareable-by-reference",
        "reflect": false,
        "defaultValue": "false"
      },
      "referenceElement": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement",
          "resolved": "HTMLElement",
          "references": {
            "HTMLElement": {
              "location": "global"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{HTMLElement}"
            }, {
              "name": "memberof",
              "text": "ArcgisShare"
            }],
          "text": "The element to to be shared"
        }
      }
    };
  }
  static get states() {
    return {
      "domId": {},
      "snippetByVal": {},
      "snippetByRef": {}
    };
  }
  static get events() {
    return [{
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubCopyButtonClicked",
        "method": "onCopyButtonClicked",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
