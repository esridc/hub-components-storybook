import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const arcgisModalPageCss = ":host{display:none}:host([visible]){display:flex;flex-direction:column}::slotted([slot=page-title]){margin-top:1rem;margin-bottom:1rem;font-weight:var(--calcite-font-weight-medium);font-size:var(--calcite-font-size-0)}::slotted([slot=page-content]){font-size:var(--calcite-font-size--1)}";

const ArcgisModalPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.visible = undefined;
  }
  render() {
    return (h(Host, { "data-element": "modal-page" }, h("slot", { name: "thumbnail" }), h("slot", { name: "page-title" }), h("slot", { name: "page-content" })));
  }
};
ArcgisModalPage.style = arcgisModalPageCss;

export { ArcgisModalPage as arcgis_modal_page };
