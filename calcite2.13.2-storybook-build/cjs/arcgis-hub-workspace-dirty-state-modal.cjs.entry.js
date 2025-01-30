'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const ArcgisHubWorkspaceDirtyStateModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceDirtyStateModalClosed = index.createEvent(this, "arcgisHubWorkspaceDirtyStateModalClosed", 7);
    this.handleCloseDirtyStateModal = () => {
      this.arcgisHubWorkspaceDirtyStateModalClosed.emit(true);
    };
    this.handleConfirmDirtyStateModal = () => {
      this.arcgisHubWorkspaceDirtyStateModalClosed.emit(false);
    };
    this.isOpen = undefined;
    this.pane = undefined;
    this.href = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get isLeavingPane() {
    return this.href || this.pane;
  }
  /**
   * Either render a workspace link if we are navigating to a new pane or href
   * or render a calcite button if we are just closing the modal and staying on the same tab
   * @returns
   */
  renderPrimaryButton() {
    return this.isLeavingPane ? index.h("arcgis-hub-workspace-link", { href: this.href, onClick: this.handleConfirmDirtyStateModal, pane: this.pane, slot: "primary" }, index.h("calcite-button", { appearance: "solid", round: true }, this.intl.t('discardChanges')))
      : index.h("calcite-button", { appearance: "solid", onClick: this.handleConfirmDirtyStateModal, round: true, slot: "primary" }, this.intl.t('discardChanges'));
  }
  render() {
    return (index.h(index.Host, { "data-element": "workspace-dirty-state-modal", unthemed: true }, index.h("calcite-modal", { "close-button-disabled": true, onCalciteModalClose: this.handleCloseDirtyStateModal, open: this.isOpen, scale: "s", width: "s" }, index.h("div", { slot: "header" }, this.intl.t('unsavedChanges.title')), index.h("div", { slot: "content" }, this.intl.t(this.isLeavingPane ? 'unsavedChanges.leavingPageMessage' : 'unsavedChanges.openingShareModalMessage')), index.h("calcite-button", { appearance: "transparent", kind: "neutral", onClick: this.handleCloseDirtyStateModal, round: true, slot: "secondary" }, this.intl.t('cancel')), this.renderPrimaryButton())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.arcgis_hub_workspace_dirty_state_modal = ArcgisHubWorkspaceDirtyStateModal;
