'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const fetchContent = require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./util-38e73510.js');
require('./get-with-default-d1b1754d.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./append-custom-params-0f5d0fe2.js');
require('./OperationError-902f34ae.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./is-guid-b5c2b74c.js');
require('./request-79b61e92.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');

const arcgisHubMetadataListCss = ":host{display:block;border:thin solid #DDD;margin:0.5rem 0}tr:nth-child(even){background-color:#f3f3f3}th,td{padding:0.8rem 1rem}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}td.loading{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite}tbody tr.active-row{font-weight:bold;color:#009879}";

const ArcgisHubMetadataList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Is the component still loading data
     */
    this.isLoading = true;
    this.entityId = null;
    this.metadata = [];
    this.entity = {};
  }
  metadataUpdated(newValue) {
    console.log("ArcGISHubMetadataList: metadata", newValue);
    if (newValue) {
      this.metadata = JSON.parse(newValue);
    }
  }
  entityIdUpdated(newValue) {
    if (newValue) {
      this.fetchEntity(newValue);
    }
  }
  // Utility function for deep addressing an object
  // 'a.b.etc'.split('.').reduce(index, obj)
  lookup(elementDefinition, object) {
    const value = getProp.getProp(object, elementDefinition.element);
    let displayValue = value;
    // Check for null vs falsey b/c false could be a legit value
    if (value !== null) {
      switch (elementDefinition.format) {
        case "datetime": {
          // TODO: This should be a locale based format
          displayValue = new Date(value).toISOString();
          break;
        }
        case "array": {
          // ensure it's actually an array
          if (Array.isArray(value)) {
            displayValue = value.join(", ");
          }
          break;
        }
      }
    }
    return displayValue;
  }
  async fetchEntity(newId) {
    // TODO request additional elements based on configured metadata or lazy-load
    // When asking only for metadata and org, FetchContent makes a request to v3 api for something that 404s?
    // this.entity = await fetchContent( newId, {enrichments: ['metadata', 'org'] } );
    this.entity = await fetchContent.fetchContent(newId);
    this.isLoading = false;
    console.log('ArcGISHubMetadataList: fetchEntity', [
      this.entity['title'],
      this.entity.title,
      this.metadata,
      this.entity,
    ]);
  }
  componentWillLoad() {
    this.fetchEntity(this.entityId);
  }
  render() {
    return (index.h(index.Host, { "data-element": "metadata-list" }, index.h("slot", null), index.h("table", null, this.metadata.map(metadataElement => index.h("tr", { key: metadataElement.label }, index.h("td", null, metadataElement.label), index.h("td", null, this.isLoading ? "Lame Loading State 🤮..." : this.lookup(metadataElement, this.entity)))))));
  }
  static get watchers() { return {
    "metadata": ["metadataUpdated"],
    "entityId": ["entityIdUpdated"]
  }; }
};
ArcgisHubMetadataList.style = arcgisHubMetadataListCss;

exports.arcgis_hub_metadata_list = ArcgisHubMetadataList;
