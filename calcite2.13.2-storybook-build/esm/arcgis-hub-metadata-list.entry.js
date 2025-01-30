import { r as registerInstance, h, H as Host } from './index-57f71b44.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { f as fetchContent } from './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './util-3e6872d9.js';
import './get-with-default-b819d95d.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './append-custom-params-4bd856e5.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './request-3e386aeb.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';

const arcgisHubMetadataListCss = ":host{display:block;border:thin solid #DDD;margin:0.5rem 0}tr:nth-child(even){background-color:#f3f3f3}th,td{padding:0.8rem 1rem}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}td.loading{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite}tbody tr.active-row{font-weight:bold;color:#009879}";

const ArcgisHubMetadataList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    const value = getProp(object, elementDefinition.element);
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
    this.entity = await fetchContent(newId);
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
    return (h(Host, { "data-element": "metadata-list" }, h("slot", null), h("table", null, this.metadata.map(metadataElement => h("tr", { key: metadataElement.label }, h("td", null, metadataElement.label), h("td", null, this.isLoading ? "Lame Loading State 🤮..." : this.lookup(metadataElement, this.entity)))))));
  }
  static get watchers() { return {
    "metadata": ["metadataUpdated"],
    "entityId": ["entityIdUpdated"]
  }; }
};
ArcgisHubMetadataList.style = arcgisHubMetadataListCss;

export { ArcgisHubMetadataList as arcgis_hub_metadata_list };
