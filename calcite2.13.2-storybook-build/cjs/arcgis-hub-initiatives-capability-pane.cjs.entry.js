'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const ArcgisHubInitiativesCapabilityPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (index.h(index.Host, null, index.h("arcgis-hub-entity-capability-pane", { capability: "initiatives", entity: this.entity })));
  }
};

exports.arcgis_hub_initiatives_capability_pane = ArcgisHubInitiativesCapabilityPane;
