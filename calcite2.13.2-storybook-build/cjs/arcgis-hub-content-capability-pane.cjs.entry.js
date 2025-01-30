'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const ArcgisHubEventsCapabilityPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (index.h(index.Host, null, index.h("arcgis-hub-entity-capability-pane", { capability: "content", entity: this.entity })));
  }
};

exports.arcgis_hub_content_capability_pane = ArcgisHubEventsCapabilityPane;
