import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { i as isUrl } from './item-urls-c68824e6.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './logger-f8667200.js';
import './get-prop-ec5be510.js';

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
    registerInstance(this, hostRef);
    this.arcgisImageUrlSave = createEvent(this, "arcgisImageUrlSave", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "imgSrc": ["handleImgSrcUpdated"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubImageUrl.prototype, "_handleImgSrcUpdated", null);
ArcgisHubImageUrl.style = arcgisHubImageUrlCss;

export { ArcgisHubImageUrl as arcgis_hub_image_url };
