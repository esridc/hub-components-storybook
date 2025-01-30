'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const arcgisModalPageCss = ":host{display:none}:host([visible]){display:flex;flex-direction:column}::slotted([slot=page-title]){margin-top:1rem;margin-bottom:1rem;font-weight:var(--calcite-font-weight-medium);font-size:var(--calcite-font-size-0)}::slotted([slot=page-content]){font-size:var(--calcite-font-size--1)}";

const ArcgisModalPage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.visible = undefined;
  }
  render() {
    return (index.h(index.Host, { "data-element": "modal-page" }, index.h("slot", { name: "thumbnail" }), index.h("slot", { name: "page-title" }), index.h("slot", { name: "page-content" })));
  }
};
ArcgisModalPage.style = arcgisModalPageCss;

exports.arcgis_modal_page = ArcgisModalPage;
