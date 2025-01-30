import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const ArcgisHubWorkspaceDirtyStateModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceDirtyStateModalClosed = createEvent(this, "arcgisHubWorkspaceDirtyStateModalClosed", 7);
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return this.isLeavingPane ? h("arcgis-hub-workspace-link", { href: this.href, onClick: this.handleConfirmDirtyStateModal, pane: this.pane, slot: "primary" }, h("calcite-button", { appearance: "solid", round: true }, this.intl.t('discardChanges')))
      : h("calcite-button", { appearance: "solid", onClick: this.handleConfirmDirtyStateModal, round: true, slot: "primary" }, this.intl.t('discardChanges'));
  }
  render() {
    return (h(Host, { "data-element": "workspace-dirty-state-modal", unthemed: true }, h("calcite-modal", { "close-button-disabled": true, onCalciteModalClose: this.handleCloseDirtyStateModal, open: this.isOpen, scale: "s", width: "s" }, h("div", { slot: "header" }, this.intl.t('unsavedChanges.title')), h("div", { slot: "content" }, this.intl.t(this.isLeavingPane ? 'unsavedChanges.leavingPageMessage' : 'unsavedChanges.openingShareModalMessage')), h("calcite-button", { appearance: "transparent", kind: "neutral", onClick: this.handleCloseDirtyStateModal, round: true, slot: "secondary" }, this.intl.t('cancel')), this.renderPrimaryButton())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { ArcgisHubWorkspaceDirtyStateModal as arcgis_hub_workspace_dirty_state_modal };
