import { r as registerInstance, h, H as Host } from './index-57f71b44.js';

const ArcgisHubInitiativesCapabilityPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "initiatives", entity: this.entity })));
  }
};

export { ArcgisHubInitiativesCapabilityPane as arcgis_hub_initiatives_capability_pane };
