import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisMultiPageModalCss = ":host{display:block}.page-container{display:flex;height:100%;flex-direction:column;justify-content:space-between}.page-counter{margin-top:1rem;text-align:center;color:var(--calcite-color-text-3);font-size:var(--calcite-font-size--1)}";

const ArcgisMultiPageModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisMultiPageModalClose = createEvent(this, "arcgisMultiPageModalClose", 7);
    /**
     * Flag used to keep track of whether the modal was closed via the 'okay' button
     * or the 'x' button
     */
    this.isAcceptButtonClicked = false;
    this.open = false;
    this.pages = [];
    this.index = undefined;
    bind(this, 'showPreviousPage', 'showNextPage', 'handleAccept', 'handleModalClose');
  }
  /**
   * As closing the modal does not remove this component from the DOM, we cannot leverage
   * the typical lifecycle hooks to re-initialize the component (i.e., grab the slotted
   * child components, start from the first page, etc.)
   *
   * To mitigate the issue, we re-initialize the component whenever `open` is toggled to `true`
   */
  handleOpenChanged(isNowOpen, wasPreviouslyOpen) {
    !wasPreviouslyOpen && isNowOpen && this.initializeModal();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  connectedCallback() {
    this.open && this.initializeModal();
  }
  initializeModal() {
    this.pages = Array.from(this.el.querySelectorAll('arcgis-modal-page'));
    this.index = 0;
    this.setVisiblePage();
  }
  setVisiblePage() {
    this.pages.forEach((page, i) => (page.visible = i === this.index));
  }
  showNextPage() {
    this.index++;
    this.setVisiblePage();
  }
  showPreviousPage() {
    this.index--;
    this.setVisiblePage();
  }
  handleAccept() {
    this.isAcceptButtonClicked = true;
    // Setting this to false is the only way to programatically close
    // the modal and force a `calciteModalClose` event to fire
    this.open = false;
  }
  /**
   * Runs when the underlying modal is closed in any manner
   * @param event a calciteModalClose event
   */
  handleModalClose(event) {
    event.preventDefault();
    const detail = this.isAcceptButtonClicked ? 'Accepted' : 'Exited';
    this.isAcceptButtonClicked = false;
    // Modal is already closed, set `open=false` to prevent incongruencies
    this.open = false;
    this.arcgisMultiPageModalClose.emit(detail);
  }
  renderSecondaryButton() {
    if (this.index > 0) {
      return h("calcite-button", { appearance: "outline", onClick: this.showPreviousPage, slot: "secondary", width: "full" }, this.intl.t('previousButton'));
    }
  }
  renderPrimaryButton() {
    return this.index === this.pages.length - 1
      ? h("calcite-button", { onClick: this.handleAccept, slot: "primary", width: "full" }, " ", this.intl.t('acceptButton'), " ")
      : h("calcite-button", { onClick: this.showNextPage, slot: "primary", width: "full" }, " ", this.intl.t('nextButton'), " ");
  }
  render() {
    return (h(Host, { "data-element": "multi-page-modal" }, h("calcite-modal", { "disable-outside-close": true, onCalciteModalClose: this.handleModalClose, open: this.open }, h("div", { slot: "header" }, h("slot", { name: "header" })), h("div", { class: "page-container", slot: "content" }, h("slot", null), h("div", { class: "page-counter" }, this.intl.t('pageCounter', { currentPage: this.index + 1, numPages: this.pages.length }))), this.renderSecondaryButton(), this.renderPrimaryButton())));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChanged"]
  }; }
};
ArcgisMultiPageModal.style = arcgisMultiPageModalCss;

export { ArcgisMultiPageModal as arcgis_multi_page_modal };
