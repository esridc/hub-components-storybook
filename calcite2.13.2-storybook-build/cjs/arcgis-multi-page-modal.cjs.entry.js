'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisMultiPageModalCss = ":host{display:block}.page-container{display:flex;height:100%;flex-direction:column;justify-content:space-between}.page-counter{margin-top:1rem;text-align:center;color:var(--calcite-color-text-3);font-size:var(--calcite-font-size--1)}";

const ArcgisMultiPageModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisMultiPageModalClose = index.createEvent(this, "arcgisMultiPageModalClose", 7);
    /**
     * Flag used to keep track of whether the modal was closed via the 'okay' button
     * or the 'x' button
     */
    this.isAcceptButtonClicked = false;
    this.open = false;
    this.pages = [];
    this.index = undefined;
    context.bind(this, 'showPreviousPage', 'showNextPage', 'handleAccept', 'handleModalClose');
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
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
      return index.h("calcite-button", { appearance: "outline", onClick: this.showPreviousPage, slot: "secondary", width: "full" }, this.intl.t('previousButton'));
    }
  }
  renderPrimaryButton() {
    return this.index === this.pages.length - 1
      ? index.h("calcite-button", { onClick: this.handleAccept, slot: "primary", width: "full" }, " ", this.intl.t('acceptButton'), " ")
      : index.h("calcite-button", { onClick: this.showNextPage, slot: "primary", width: "full" }, " ", this.intl.t('nextButton'), " ");
  }
  render() {
    return (index.h(index.Host, { "data-element": "multi-page-modal" }, index.h("calcite-modal", { "disable-outside-close": true, onCalciteModalClose: this.handleModalClose, open: this.open }, index.h("div", { slot: "header" }, index.h("slot", { name: "header" })), index.h("div", { class: "page-container", slot: "content" }, index.h("slot", null), index.h("div", { class: "page-counter" }, this.intl.t('pageCounter', { currentPage: this.index + 1, numPages: this.pages.length }))), this.renderSecondaryButton(), this.renderPrimaryButton())));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChanged"]
  }; }
};
ArcgisMultiPageModal.style = arcgisMultiPageModalCss;

exports.arcgis_multi_page_modal = ArcgisMultiPageModal;
