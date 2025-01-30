'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const itemUrls = require('./item-urls-b819e820.js');
const debounce = require('./debounce-bd990e9f.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./logger-5db3d659.js');
require('./get-prop-4bd8fc1a.js');

const arcgisHubImageUrlCss = ":host{display:block}img{margin-top:1rem}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubImageUrl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisImageUrlSave = index.createEvent(this, "arcgisImageUrlSave", 7);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      if (itemUrls.isUrl(imgSrc)) {
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
    return (index.h(index.Host, null, index.h("calcite-label", null, this.intl.t('label'), index.h("calcite-input", { onCalciteInputChange: this.handleCalciteInputInputOrChange, onCalciteInputInput: this.handleCalciteInputInputOrChange, status: this.isInvalidUrl ? 'invalid' : 'valid', type: "url", value: this.imgSrc }), this.isInvalidUrl && (index.h("calcite-input-message", { icon: "x-octagon", status: "invalid" }, this.intl.t('error')))), this.isValidUrl &&
      index.h("img", { alt: this.intl.t('altText'), height: this.imgHeight, src: this.imgSrc, width: this.imgWidth })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "imgSrc": ["handleImgSrcUpdated"]
  }; }
};
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubImageUrl.prototype, "_handleImgSrcUpdated", null);
ArcgisHubImageUrl.style = arcgisHubImageUrlCss;

exports.arcgis_hub_image_url = ArcgisHubImageUrl;
