'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const SLOTS = {
  title: 'title',
  subtitle: 'subtitle',
  primaryActions: 'primary-actions',
  sidePanel: 'side-panel',
  helpState: 'help-state',
  footer: 'footer',
  shellPanelEnd: 'shell-panel-end',
};

const arcgisHubWorkspacePaneCss = ":host{--arcgis-hub-workspace-pane-main-flex-basis:70%;--arcgis-hub-workspace-pane-main-flex-grow:1;--arcgis-hub-workspace-pane-max-width:75rem;position:relative;display:flex;height:100%;width:100%;flex-direction:column;justify-content:space-between;gap:2rem;overflow:auto}calcite-shell{background-color:transparent}.workspace-pane__header,.workspace-pane__primary-actions,.workspace-pane__help-state,.workspace-pane__footer{display:contents}.workspace-pane__header{display:flex;flex-direction:column;gap:0.5rem}.workspace-pane__header ::slotted([slot='title']){margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.workspace-pane__header ::slotted([slot='subtitle']){margin:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-normal)}.workspace-pane__primary-actions ::slotted([slot='primary-actions']){display:flex;gap:0.5rem}.workspace-pane__help-state ::slotted([slot='help-state']){max-width:60%;margin-left:auto;margin-right:auto}.workspace-pane__content{display:flex;flex:1 1 0%;gap:3rem}.workspace-pane__content ::slotted(:not([slot])),.workspace-pane__content ::slotted([slot='side-panel']){display:flex;flex-direction:column;gap:2rem}.workspace-pane__content ::slotted(:not([slot])){flex-basis:var(--arcgis-hub-workspace-pane-main-flex-basis);flex-grow:var(--arcgis-hub-workspace-pane-main-flex-grow);flex-shrink:0}.workspace-pane__content ::slotted([slot='side-panel']){flex-basis:calc(100% - var(--arcgis-hub-workspace-pane-main-flex-basis))}.workspace-pane__body{max-width:var(--arcgis-hub-workspace-pane-max-width);box-sizing:border-box;display:flex;width:100%;flex:1 1 0%;flex-direction:column;gap:2rem;align-self:center;padding-left:2.5rem;padding-right:2.5rem;padding-top:2rem;padding-bottom:2rem}.workspace-pane__footer ::slotted([slot='footer']){background-color:var(--calcite-color-background);padding-left:2.5rem;padding-right:2.5rem;padding-top:2rem;padding-bottom:2rem}.workspace-pane__footer--sticky ::slotted([slot='footer']){border-top:1px solid var(--calcite-color-foreground-3);position:sticky;left:0px;bottom:0px;z-index:10;padding-top:1rem;padding-bottom:1rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.mobile .workspace-pane__body{gap:0.5rem;padding-left:1.5rem;padding-right:1.5rem;padding-top:1rem;padding-bottom:1rem}.mobile .workspace-pane__content{flex-direction:column-reverse;gap:1.5rem}.mobile .workspace-pane__footer--sticky ::slotted([slot='footer']){padding-top:0.25rem;padding-bottom:0.25rem}";

const ArcgisHubWorkspacepane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspacePaneInitialized = index.createEvent(this, "arcgisHubWorkspacePaneInitialized", 7);
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
      ? index.h("arcgis-skeleton-loader", { active: true, headingRows: headingRows, rows: rows, showFooter: showFooter, showHeading: showHeading, showThumbnail: showThumbnail })
      : null;
  }
  renderHeader() {
    if (this.showHeader) {
      return (index.h("header", { class: "workspace-pane__header", role: "none" }, index.h("slot", { name: SLOTS.title }), index.h("slot", { name: SLOTS.subtitle })));
    }
  }
  renderPrimaryActions() {
    return (index.h("div", { class: "workspace-pane__primary-actions" }, index.h("slot", { name: SLOTS.primaryActions })));
  }
  renderHelpState() {
    return (index.h("div", { class: 'workspace-pane__help-state' }, index.h("slot", { name: SLOTS.helpState })));
  }
  renderContent() {
    return (index.h("div", { class: "workspace-pane__content" }, index.h("slot", null), index.h("slot", { name: SLOTS.sidePanel })));
  }
  renderFooter() {
    return (index.h("div", { class: {
        'workspace-pane__footer': true,
        'workspace-pane__footer--sticky': this.stickyFooter,
      } }, index.h("slot", { name: SLOTS.footer })));
  }
  renderSkeleton() {
    return this.skeletonLoader;
  }
  renderShellPanelEnd() {
    // when shell-panel-end content is provided, put it in the
    // calcite-shell's `panel-end` slot"
    return index.h("slot", { name: SLOTS.shellPanelEnd, slot: "panel-end" });
  }
  render() {
    return (index.h(index.Host, { "data-element": "workspace-pane" }, index.h("calcite-shell", null, index.h("calcite-panel", { class: { mobile: this.isMobile } }, index.h("div", { class: "workspace-pane__body" }, this.renderHeader(), this.renderPrimaryActions(), this.skeletonLoader
      ? this.renderSkeleton()
      : index.h(index.Fragment, null, this.renderHelpState(), this.renderContent())), this.renderFooter()), this.renderShellPanelEnd())));
  }
};
ArcgisHubWorkspacepane.style = arcgisHubWorkspacePaneCss;

exports.arcgis_hub_workspace_pane = ArcgisHubWorkspacepane;
