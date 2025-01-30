import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const arcgisHubWorkspaceMissingPaneCss = ":host{display:block}";

const ArcgisHubWorkspaceMissingpane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pane = undefined;
  }
  render() {
    return (h(Host, { "data-element": "workspace-missing-pane" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.pane), h("h3", { slot: "subtitle" }, "Requested pane \"", this.pane, "\" does not have an associated component."))));
  }
};
ArcgisHubWorkspaceMissingpane.style = arcgisHubWorkspaceMissingPaneCss;

export { ArcgisHubWorkspaceMissingpane as arcgis_hub_workspace_missing_pane };
