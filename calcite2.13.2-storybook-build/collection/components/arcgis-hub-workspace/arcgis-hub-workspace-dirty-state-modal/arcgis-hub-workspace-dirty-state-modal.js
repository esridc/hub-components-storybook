import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
/**
 * the arcgis-hub-workspace-dirty-state-modal component should be used
 * to render a warning to users who are trying to navigate away from a
 * "dirty" state in their workspace. Users are given the option to either
 * cancel or proceed.
 */
export class ArcgisHubWorkspaceDirtyStateModal {
  constructor() {
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
  static get is() { return "arcgis-hub-workspace-dirty-state-modal"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "isOpen": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "indicates whether the modal is open"
        },
        "attribute": "is-open",
        "reflect": true
      },
      "pane": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WorkspacePane",
          "resolved": "\"catalog\" | \"catalog-content\" | \"catalog-events\" | \"collaborators\" | \"content\" | \"dashboard\" | \"details\" | \"discussion\" | \"events\" | \"followers\" | \"groups\" | \"initiatives\" | \"members\" | \"metrics\" | \"metrics-coming-soon\" | \"overview\" | \"participation\" | \"projects\" | \"registrants\" | \"settings\"",
          "references": {
            "WorkspacePane": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a user chooses to proceed (despite the dirty state),\nthis is the workspace pane we will navigate them to\n\nNote: only one of \"pane\" or \"href\" needs to be provided.\nIf both are provided, pane will take priority"
        },
        "attribute": "pane",
        "reflect": true
      },
      "href": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a user chooses to proceed (despite the dirty state),\nthis is the URL we will navigate them to. Thi can be\nprovided as an absolute or relative path.\n\nNote: only one of \"pane\" or \"href\" needs to be provided.\nIf both are provided, pane will take priority"
        },
        "attribute": "href",
        "reflect": true
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceDirtyStateModalClosed",
        "name": "arcgisHubWorkspaceDirtyStateModalClosed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
