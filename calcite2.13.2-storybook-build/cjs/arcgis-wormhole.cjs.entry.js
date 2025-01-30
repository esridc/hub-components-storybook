'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const arcgisWormholeCss = ":host{display:none}";

const ElementPortal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return index.h("slot", null);
  }
  get element() { return index.getElement(this); }
};
ElementPortal.style = arcgisWormholeCss;

exports.arcgis_wormhole = ElementPortal;
