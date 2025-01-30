'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubMediaGalleryModalCss = ".sc-arcgis-hub-media-gallery-modal-h{display:block}calcite-modal.sc-arcgis-hub-media-gallery-modal:not([open]){visibility:hidden}";

const ArcgisHubMediaGalleryModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubMediaGalleryModalClosed = index.createEvent(this, "arcgisHubMediaGalleryModalClosed", 7);
    this.itemId = undefined;
    this.layout = 'grid';
    this.isOpen = undefined;
    context.bind(this, 'onCalciteModalClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  onCalciteModalClose() {
    this.arcgisHubMediaGalleryModalClosed.emit();
  }
  renderModalContent() {
    return index.h("arcgis-hub-media-gallery", { "item-id": this.itemId, layout: this.layout, selectable: true });
  }
  render() {
    return (index.h("arcgis-wormhole", null, index.h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.onCalciteModalClose, open: this.isOpen, scale: "m", width: "l" }, index.h("div", { slot: "header" }, this.intl.t('header')), index.h("div", { slot: "content" }, this.isOpen && this.renderModalContent()), index.h("calcite-button", { appearance: "outline", onClick: this.onCalciteModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('cancel')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubMediaGalleryModal.style = arcgisHubMediaGalleryModalCss;

exports.arcgis_hub_media_gallery_modal = ArcgisHubMediaGalleryModal;
