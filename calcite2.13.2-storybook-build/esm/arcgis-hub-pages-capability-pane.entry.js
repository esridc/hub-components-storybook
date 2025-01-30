import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const ArcgisHubPagesCapabilityPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "pages", entity: this.entity })));
  }
};

export { ArcgisHubPagesCapabilityPane as arcgis_hub_pages_capability_pane };
