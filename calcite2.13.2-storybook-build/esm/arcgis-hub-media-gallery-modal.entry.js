import { r as registerInstance, c as createEvent, h, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubMediaGalleryModalCss = ".sc-arcgis-hub-media-gallery-modal-h{display:block}calcite-modal.sc-arcgis-hub-media-gallery-modal:not([open]){visibility:hidden}";

const ArcgisHubMediaGalleryModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubMediaGalleryModalClosed = createEvent(this, "arcgisHubMediaGalleryModalClosed", 7);
    this.itemId = undefined;
    this.layout = 'grid';
    this.isOpen = undefined;
    bind(this, 'onCalciteModalClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  onCalciteModalClose() {
    this.arcgisHubMediaGalleryModalClosed.emit();
  }
  renderModalContent() {
    return h("arcgis-hub-media-gallery", { "item-id": this.itemId, layout: this.layout, selectable: true });
  }
  render() {
    return (h("arcgis-wormhole", null, h("calcite-modal", { "data-element": "modal", onCalciteModalClose: this.onCalciteModalClose, open: this.isOpen, scale: "m", width: "l" }, h("div", { slot: "header" }, this.intl.t('header')), h("div", { slot: "content" }, this.isOpen && this.renderModalContent()), h("calcite-button", { appearance: "outline", onClick: this.onCalciteModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('cancel')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubMediaGalleryModal.style = arcgisHubMediaGalleryModalCss;

export { ArcgisHubMediaGalleryModal as arcgis_hub_media_gallery_modal };
