'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const arcgisHubWorkspaceMissingPaneCss = ":host{display:block}";

const ArcgisHubWorkspaceMissingpane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.pane = undefined;
  }
  render() {
    return (index.h(index.Host, { "data-element": "workspace-missing-pane" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this.pane), index.h("h3", { slot: "subtitle" }, "Requested pane \"", this.pane, "\" does not have an associated component."))));
  }
};
ArcgisHubWorkspaceMissingpane.style = arcgisHubWorkspaceMissingPaneCss;

exports.arcgis_hub_workspace_missing_pane = ArcgisHubWorkspaceMissingpane;
