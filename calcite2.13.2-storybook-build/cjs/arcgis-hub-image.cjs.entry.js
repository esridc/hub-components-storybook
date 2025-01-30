'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intersectionObserver = require('./intersection-observer-622579f7.js');
const context = require('./context-0167a31e.js');
const interfaces = require('./interfaces-fc0046ff.js');

const arcgisHubImageCss = ":host{display:block;width:100%}:host(.group-thumbnail)>img{display:block;aspect-ratio:200 / 133;object-fit:cover}img{display:block;width:100%}.rounded-corners{border-radius:0.75rem}:host(.image-thumbnail)>img{height:16rem;width:100%;object-fit:cover}";

const ArcgisHubImage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.src = undefined;
    this.alt = undefined;
    this.fallback = undefined;
    this.lazy = false;
    this.corners = interfaces.CORNERS.square;
    this.hasError = false;
    this.inViewport = false;
    context.bind(this, 'setImageEl', 'handleIntersection');
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
    intersectionObserver.IntersectionObserverManager.addHandler(this.element, this.handleIntersection);
  }
  unobserve() {
    intersectionObserver.IntersectionObserverManager.unobserve(this.element);
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
      index.h("img", { alt: this.alt, class: {
          'rounded-corners': this.corners === interfaces.CORNERS.round,
        }, ref: this.setImageEl, src: this._imageUrl });
  }
  render() {
    return index.h(index.Host, { "data-element": "image" }, this.renderImage());
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "src": ["srcUpdated"]
  }; }
};
ArcgisHubImage.style = arcgisHubImageCss;

exports.arcgis_hub_image = ArcgisHubImage;
