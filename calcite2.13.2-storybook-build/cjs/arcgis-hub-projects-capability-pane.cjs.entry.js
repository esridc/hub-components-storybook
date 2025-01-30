'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');

const ArcgisHubProjectsCapabilityPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  render() {
    return (index.h(index.Host, null, index.h("arcgis-hub-entity-capability-pane", { capability: "projects", entity: this.entity })));
  }
};

exports.arcgis_hub_projects_capability_pane = ArcgisHubProjectsCapabilityPane;
