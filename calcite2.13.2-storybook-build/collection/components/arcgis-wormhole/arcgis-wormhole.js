import { h } from '@stencil/core';
/**
 * @slot default - Content provided will be transported to the root of the body.
 */
export class ElementPortal {
  constructor() {
    this.zIndex = '100001';
    this.styles = {};
    this.target = document.body;
    this.elAttributes = {};
    this.includeWormholeElement = true;
  }
  componentWillLoad() {
    // if we are including the wormhole wrapper element, create it and
    // append the wrapper to the target element
    if (this.includeWormholeElement) {
      // create a div element to wrap the transported elements
      const { zIndex, styles } = this;
      this.wormholeElement = document.createElement('div');
      Object.assign(this.wormholeElement.style, Object.assign(Object.assign({ position: 'absolute' }, styles), { zIndex }));
      // we need to use setProperty for css custom properties
      Object.entries(styles).forEach(([key, value]) => {
        if (key.startsWith('--')) {
          this.wormholeElement.style.setProperty(key, `${value}`);
        }
      });
      // set the attributes on the wormhole element
      Object.entries(this.elAttributes).map(([attribute, value]) => this.wormholeElement.setAttribute(attribute, value));
      // append the wormhole element to the target element
      this.target.append(this.wormholeElement);
    }
  }
  moveChildren() {
    // immediately moving the children can result in unintended side-effects if the children
    // are web components because it causes their disconnectedCallback lifecycle hook to fire
    // before their componentDidLoad lifecycle hook completes. Wrapping in a promise that implements
    // a timeout of 0 allows the current tick of the event loop to complete. Simply wrapping in a promise
    // does not appear to be sufficient.
    return new Promise(resolve => {
      setTimeout(() => {
        this.transportedElements = this.element.children;
        const fragment = document.createDocumentFragment();
        Array.from(this.transportedElements).forEach(item => fragment.appendChild(item));
        // if we are using the div wrapper, we append the fragment to the wormhole element
        // otherwise we append it directly to the target element
        if (this.includeWormholeElement) {
          this.wormholeElement.append(fragment);
        }
        else {
          this.target.append(fragment);
        }
        resolve();
      }, 0);
    });
  }
  async componentDidLoad() {
    await this.moveChildren();
  }
  disconnectedCallback() {
    // remove the slotted content that we moved to the wormhole element
    // Note: this is not absolutely necessary since we are about to remove the wormhole element too
    if (this.transportedElements) {
      Array.from(this.transportedElements).forEach(item => item.remove());
    }
    // remove the wormhole element
    if (this.wormholeElement) {
      this.wormholeElement.remove();
    }
    // if we are not including the div wrapper, we need to remove the children from the target element
    // we lose the reference to the transported elements because we do it outside of the div wrapper
    // and so we delete the last child of the target element instead
    // note that this is not a perfect solution because it will remove the last child of the target element
    // which could be something else that was added to the target element after the wormhole was created
    // so the user should be aware of this limitation
    if (!this.includeWormholeElement && this.target && this.target.lastElementChild) {
      this.target.lastElementChild.remove();
    }
  }
  render() {
    return h("slot", null);
  }
  static get is() { return "arcgis-wormhole"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-wormhole.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-wormhole.css"]
    };
  }
  static get properties() {
    return {
      "zIndex": {
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
              "name": "memberof",
              "text": "ElementPortal"
            }],
          "text": "The z-index to set on the wormhole element"
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "'100001'"
      },
      "styles": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, string | number>",
          "resolved": "{ [x: string]: string | number; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Additional CSS style object to set on the wormhole element"
        },
        "defaultValue": "{}"
      },
      "target": {
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
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The element into which you wish to move the provided\nchild elements. By default we move them to the top\nof the DOM in the document body"
        },
        "defaultValue": "document.body"
      },
      "elAttributes": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, string>",
          "resolved": "{ [x: string]: string; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Attributes to add to the element"
        },
        "defaultValue": "{}"
      },
      "includeWormholeElement": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "when false, does not include the wormhole element wrapper\nand instead appends the children directly to the target element"
        },
        "attribute": "include-wormhole-element",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get elementRef() { return "element"; }
}
