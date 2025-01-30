var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { isUrl } from '../arcgis-hub-embed-card/utils/item-urls';
import Debounce from '../../decorators/debounce';
export class ArcgisHubImageUrl {
  constructor() {
    this.handleCalciteInputInputOrChange = (evt) => {
      this.imgSrc = evt.target.value;
    };
    this.imgSrc = '';
    this.imgHeight = 300;
    this.imgWidth = 400;
    this.isValid = false;
    this.isValidated = false;
    this.isValidating = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // validate immediately, but we want the component to render as soon as possible, so intentionally not awaiting the call to validate here
    this.validate(this.imgSrc);
  }
  handleImgSrcUpdated(imgSrc, prevImgSrc) {
    this._handleImgSrcUpdated(imgSrc, prevImgSrc);
  }
  _handleImgSrcUpdated(imgSrc, prevImgSrc) {
    this.isValidated = imgSrc === prevImgSrc;
    this.validate(imgSrc);
  }
  async validate(imgSrc) {
    if (this.imgSrc) {
      this.isValidating = true;
      try {
        this.isValid = await this.verifyImageExists(imgSrc);
        this.arcgisImageUrlSave.emit(this.imgSrc);
      }
      finally {
        this.isValidating = false;
        this.isValidated = true;
      }
    }
  }
  async verifyImageExists(imgSrc) {
    return new Promise(resolve => {
      if (isUrl(imgSrc)) {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }
      else {
        resolve(false);
      }
    });
  }
  get isInvalidUrl() {
    return !!this.imgSrc && this.isValidated && !this.isValid;
  }
  get isValidUrl() {
    return !!this.imgSrc && this.isValidated && this.isValid;
  }
  render() {
    return (h(Host, null, h("calcite-label", null, this.intl.t('label'), h("calcite-input", { onCalciteInputChange: this.handleCalciteInputInputOrChange, onCalciteInputInput: this.handleCalciteInputInputOrChange, status: this.isInvalidUrl ? 'invalid' : 'valid', type: "url", value: this.imgSrc }), this.isInvalidUrl && (h("calcite-input-message", { icon: "x-octagon", status: "invalid" }, this.intl.t('error')))), this.isValidUrl &&
      h("img", { alt: this.intl.t('altText'), height: this.imgHeight, src: this.imgSrc, width: this.imgWidth })));
  }
  static get is() { return "arcgis-hub-image-url"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-image-url.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-image-url.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "imgSrc": {
        "type": "string",
        "mutable": true,
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
        "attribute": "img-src",
        "reflect": false,
        "defaultValue": "''"
      },
      "imgHeight": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "img-height",
        "reflect": false,
        "defaultValue": "300"
      },
      "imgWidth": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "img-width",
        "reflect": false,
        "defaultValue": "400"
      }
    };
  }
  static get states() {
    return {
      "isValid": {},
      "isValidated": {},
      "isValidating": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisImageUrlSave",
        "name": "arcgisImageUrlSave",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "imgSrc",
        "methodName": "handleImgSrcUpdated"
      }];
  }
}
__decorate([
  Debounce({ timeout: 250 })
], ArcgisHubImageUrl.prototype, "_handleImgSrcUpdated", null);
