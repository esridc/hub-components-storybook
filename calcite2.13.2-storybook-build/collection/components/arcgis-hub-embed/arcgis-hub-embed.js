import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import { maybeAddEmbeddedAuth } from './utils/maybeAddEmbeddedAuth';
export class ArcgisHubEmbed {
  constructor() {
    this.src = undefined;
    this.iframeTitle = undefined;
    this.height = 150;
    this.isScrollable = false;
    this.autoplay = false;
    this.camera = false;
    this.clipboardRead = false;
    this.clipboardWrite = false;
    this.displayCapture = false;
    this.fullscreen = false;
    this.geolocation = false;
    this.microphone = false;
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * Builds a custom allow string for the iframe
   */
  get _allow() {
    const allowList = [];
    /**
     * In the future, there could be more than one origin for some or all directives,
     * specified by the user.
     * In this case, we could pass the origins down to this component for each directive
     * as a list, and then apply them here
     *  */
    try {
      const srcOrigin = new URL(this.src).origin;
      this.autoplay && allowList.push(`autoplay ${srcOrigin};`);
      this.camera && allowList.push(`camera ${srcOrigin};`);
      this.clipboardRead && allowList.push(`clipboard-read ${srcOrigin};`);
      this.clipboardWrite && allowList.push(`clipboard-write ${srcOrigin};`);
      this.displayCapture && allowList.push(`display-capture ${srcOrigin};`);
      this.fullscreen && allowList.push(`fullscreen ${srcOrigin};`);
      this.geolocation && allowList.push(`geolocation ${srcOrigin};`);
      this.microphone && allowList.push(`microphone ${srcOrigin};`);
    }
    catch (error) {
      console.warn(error);
    }
    return allowList.join(' ');
  }
  get _iframeSrc() {
    let iframeSrc = this.src;
    // if no src is given or if there is an error loading the src, mark src as undefined
    if (!this.src) {
      iframeSrc = undefined;
    }
    // try to make a url out of src; if not, then invalid for sure
    try {
      new URL(this.src).origin;
    }
    catch (error) {
      iframeSrc = undefined;
    }
    return iframeSrc;
  }
  get embeddedAuthSrc() {
    var _a, _b;
    return maybeAddEmbeddedAuth(this._iframeSrc, (_a = this._context) === null || _a === void 0 ? void 0 : _a.portalUrl, window.location.origin, (_b = this._context) === null || _b === void 0 ? void 0 : _b.session);
  }
  // if no src is given, do not render iframe
  renderIframe() {
    return this.src && h("iframe", { allow: this._allow, class: {
        'scrollable': this.isScrollable,
      }, "data-src": this.embeddedAuthSrc, height: this.height, src: this.embeddedAuthSrc, title: this.iframeTitle });
  }
  render() {
    return (h(Host, { "data-element": "embed" }, this.renderIframe()));
  }
  static get is() { return "arcgis-hub-embed"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-embed.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-embed.css"]
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
          "text": "The source content for the iframe w/o authentication"
        },
        "attribute": "src",
        "reflect": false
      },
      "iframeTitle": {
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
          "text": "Title for the iframe. This is necessary for a11y purposes. Include a description of what the iframe is."
        },
        "attribute": "iframe-title",
        "reflect": false
      },
      "height": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The height of the iframe in pixels."
        },
        "attribute": "height",
        "reflect": false,
        "defaultValue": "150"
      },
      "isScrollable": {
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
          "text": "Property to determine if the iframe should be scrollable"
        },
        "attribute": "is-scrollable",
        "reflect": false,
        "defaultValue": "false"
      },
      "autoplay": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can autoplay media that is requested."
        },
        "attribute": "autoplay",
        "reflect": false,
        "defaultValue": "false"
      },
      "camera": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can use video input devices."
        },
        "attribute": "camera",
        "reflect": false,
        "defaultValue": "false"
      },
      "clipboardRead": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can read from the clipboard."
        },
        "attribute": "clipboard-read",
        "reflect": false,
        "defaultValue": "false"
      },
      "clipboardWrite": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can write to the clipboard."
        },
        "attribute": "clipboard-write",
        "reflect": false,
        "defaultValue": "false"
      },
      "displayCapture": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can use getDisplayMedia() method to capture screen contents."
        },
        "attribute": "display-capture",
        "reflect": false,
        "defaultValue": "false"
      },
      "fullscreen": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can request to be fullscreen."
        },
        "attribute": "fullscreen",
        "reflect": false,
        "defaultValue": "false"
      },
      "geolocation": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can use the geolocation interface to get information like current position."
        },
        "attribute": "geolocation",
        "reflect": false,
        "defaultValue": "false"
      },
      "microphone": {
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
          "text": "Property for allow attribute on the iframe. Determines if the iframe can request to use audio input devices."
        },
        "attribute": "microphone",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
}
