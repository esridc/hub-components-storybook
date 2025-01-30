import { Host, h, Fragment } from '@stencil/core';
import { SLOTS } from './resources';
/**
 * the arcgis-hub-workspace-pane component is a presentational "shell"
 * component which simply exposes several slots for pane content. Its
 * purpose is to provide a consistent layout for workspace panes
 *
 * @slot - default slot for adding custom content to appear in the "main" column of the workspace pane.
 * @slot help-state - slot for adding an arcgis-hub-help-state. Using this slot will ensure consistent styling
 * @slot title - A slot for adding a header title. This content will be positioned at the top of the component.
 * @slot subtitle - A slot for adding a header subtitle.  This content will be positioned below the title.
 * @slot primary-actions - A slot for adding action buttons. This content will be positioned below the header.
 * @slot side-pane - A slot for adding custom content to appear in the "side" column of the workspace pane.
 * @slot shell-panel-end - A slot for adding a calcite-shell-panel to the end of the calcite-shell. This is useful for adding additional configuration panels.
 * @slot footer - A slot for adding footer content. This content will be positioned at the bottom of the component and can be made "sticky" by passing in the stickyFooter prop.
 */
export class ArcgisHubWorkspacepane {
  constructor() {
    this.stickyFooter = false;
    this.showHeader = true;
    this.isMobile = false;
    this.skeletonLoader = null;
  }
  componentDidRender() {
    // emit an event to signal that the component has been initialized
    // we use this in the workspace component to know when we can focus the pane
    // i (jupe) actually think this should not be necessary and we should be able to just do it in componentDidRender of the workspace component
    // but that happens too soon
    this.arcgisHubWorkspacePaneInitialized.emit();
  }
  /**
   * This is a public method that consuming components can
   * call to toggle a loading state in the workspace pane
   *
   * @param isLoading whether the loading state should render
   * @param opts skeleton loader options
   */
  async toggleLoading(isLoading, opts) {
    const { headingRows, rows, showFooter, showHeading, showThumbnail } = opts || {};
    this.skeletonLoader = isLoading
      ? h("arcgis-skeleton-loader", { active: true, headingRows: headingRows, rows: rows, showFooter: showFooter, showHeading: showHeading, showThumbnail: showThumbnail })
      : null;
  }
  renderHeader() {
    if (this.showHeader) {
      return (h("header", { class: "workspace-pane__header", role: "none" }, h("slot", { name: SLOTS.title }), h("slot", { name: SLOTS.subtitle })));
    }
  }
  renderPrimaryActions() {
    return (h("div", { class: "workspace-pane__primary-actions" }, h("slot", { name: SLOTS.primaryActions })));
  }
  renderHelpState() {
    return (h("div", { class: 'workspace-pane__help-state' }, h("slot", { name: SLOTS.helpState })));
  }
  renderContent() {
    return (h("div", { class: "workspace-pane__content" }, h("slot", null), h("slot", { name: SLOTS.sidePanel })));
  }
  renderFooter() {
    return (h("div", { class: {
        'workspace-pane__footer': true,
        'workspace-pane__footer--sticky': this.stickyFooter,
      } }, h("slot", { name: SLOTS.footer })));
  }
  renderSkeleton() {
    return this.skeletonLoader;
  }
  renderShellPanelEnd() {
    // when shell-panel-end content is provided, put it in the
    // calcite-shell's `panel-end` slot"
    return h("slot", { name: SLOTS.shellPanelEnd, slot: "panel-end" });
  }
  render() {
    return (h(Host, { "data-element": "workspace-pane" }, h("calcite-shell", null, h("calcite-panel", { class: { mobile: this.isMobile } }, h("div", { class: "workspace-pane__body" }, this.renderHeader(), this.renderPrimaryActions(), this.skeletonLoader
      ? this.renderSkeleton()
      : h(Fragment, null, this.renderHelpState(), this.renderContent())), this.renderFooter()), this.renderShellPanelEnd())));
  }
  static get is() { return "arcgis-hub-workspace-pane"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-workspace-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-workspace-pane.css"]
    };
  }
  static get properties() {
    return {
      "stickyFooter": {
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
          "text": ""
        },
        "attribute": "sticky-footer",
        "reflect": true,
        "defaultValue": "false"
      },
      "showHeader": {
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
          "text": ""
        },
        "attribute": "show-header",
        "reflect": true,
        "defaultValue": "true"
      },
      "isMobile": {
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
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "skeletonLoader": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspacePaneInitialized",
        "name": "arcgisHubWorkspacePaneInitialized",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "toggleLoading": {
        "complexType": {
          "signature": "(isLoading: boolean, opts?: { headingRows?: number; rows?: number; showFooter?: boolean; showHeading?: boolean; showThumbnail?: boolean; }) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "isLoading whether the loading state should render"
                }],
              "text": "whether the loading state should render"
            }, {
              "tags": [{
                  "name": "param",
                  "text": "opts skeleton loader options"
                }],
              "text": "skeleton loader options"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "This is a public method that consuming components can\ncall to toggle a loading state in the workspace pane",
          "tags": [{
              "name": "param",
              "text": "isLoading whether the loading state should render"
            }, {
              "name": "param",
              "text": "opts skeleton loader options"
            }]
        }
      }
    };
  }
}
