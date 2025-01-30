import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const ArcgisHubProjectsCapabilityPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "projects", entity: this.entity })));
  }
};

export { ArcgisHubProjectsCapabilityPane as arcgis_hub_projects_capability_pane };
