import { Host, h } from '@stencil/core';
import { IntersectionObserverManager } from '../../utils/intersection-observer';
import { bind } from '../../utils/context';
import { CORNERS } from '../interfaces';
export class ArcgisHubImage {
  constructor() {
    this.src = undefined;
    this.alt = undefined;
    this.fallback = undefined;
    this.lazy = false;
    this.corners = CORNERS.square;
    this.hasError = false;
    this.inViewport = false;
    bind(this, 'setImageEl', 'handleIntersection');
  }
  /**
   * Get the image url to render with, either fallback or original src
   */
  get _imageUrl() {
    let imageUrl = this.src;
    /**
     *  ways to make fallback image happen:
     * 1. src doesn't exist
     * 2. error happened
     *
     * Way to make empty string return:
     * 1. lazy loading AND is not in viewport
     */
    // no src given
    if (!this.src) {
      imageUrl = this.fallback;
    }
    // was an error in loading src image
    if (this.hasError) {
      imageUrl = this.fallback;
    }
    // lazy loading supported and element is off screen
    if (this.lazy && !this.inViewport) {
      imageUrl = undefined;
    }
    return imageUrl;
  }
  componentWillLoad() {
    if (this.lazy) {
      this.observe();
    }
  }
  disconnectedCallback() {
    if (this.lazy) {
      this.unobserve();
    }
  }
  observe() {
    IntersectionObserverManager.addHandler(this.element, this.handleIntersection);
  }
  unobserve() {
    IntersectionObserverManager.unobserve(this.element);
  }
  srcUpdated() {
    // clear any previous error
    this.hasError = false;
  }
  handleIntersection() {
    this.inViewport = true;
    this.unobserve();
  }
  /**
   * @param el - HTMLImageElement in the component
   * Creates a ref to the image to use with error
   */
  setImageEl(el) {
    this.imageEl = el;
  }
  /**
   * On render, check to see if image had error
   * If there was an error, then set state and remove listener.
   * Else add listener for errors
   */
  componentDidRender() {
    if (this.imageEl) {
      const onError = () => {
        this.hasError = true;
        this.imageEl.removeEventListener('error', onError);
      };
      this.imageEl.addEventListener('error', onError);
    }
  }
  /**
   * Renders the image
   * @returns Image tag
   */
  renderImage() {
    return this._imageUrl &&
      h("img", { alt: this.alt, class: {
          'rounded-corners': this.corners === CORNERS.round,
        }, ref: this.setImageEl, src: this._imageUrl });
  }
  render() {
    return h(Host, { "data-element": "image" }, this.renderImage());
  }
  static get is() { return "arcgis-hub-image"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-image.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-image.css"]
    };
  }
  static get properties() {
    return {
      "src": {
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
          "text": "The source of the image. Will be rendered first, and if it fails, will\nrevert to fallback if provided"
        },
        "attribute": "src",
        "reflect": false
      },
      "alt": {
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
          "text": "The alternate text for the image.\nUsed for accessibility reasons"
        },
        "attribute": "alt",
        "reflect": false
      },
      "fallback": {
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
          "text": "The fallback source for the image.\nOnly used if the src source doesn't render properly."
        },
        "attribute": "fallback",
        "reflect": false
      },
      "lazy": {
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
          "text": "If true, the image will support lazy loading\nand will only load the src when in the viewport"
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
      },
      "corners": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CORNERS",
          "resolved": "CORNERS.round | CORNERS.square",
          "references": {
            "CORNERS": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The style of the image's corners"
        },
        "attribute": "corners",
        "reflect": false,
        "defaultValue": "CORNERS.square"
      }
    };
  }
  static get states() {
    return {
      "hasError": {},
      "inViewport": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "src",
        "methodName": "srcUpdated"
      }];
  }
}
