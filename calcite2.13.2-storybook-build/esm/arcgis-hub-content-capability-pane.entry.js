import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const ArcgisHubEventsCapabilityPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "content", entity: this.entity })));
  }
};

export { ArcgisHubEventsCapabilityPane as arcgis_hub_content_capability_pane };
