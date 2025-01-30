import { r as registerInstance, h, H as Host } from './index-57f71b44.js';
import { g as getWithDefault } from './get-with-default-b819d95d.js';
import { f as fetchContent } from './fetchContent-dbc662af.js';
import './get-prop-ec5be510.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './util-3e6872d9.js';
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

const arcgisHubDatasetFieldListCss = ":host{display:block;border:thin solid #DDD;margin:0.5rem 0}tr:nth-child(even){background-color:#f3f3f3}th,td{padding:0.8rem 1rem}tbody tr.active-row{font-weight:bold;color:#009879}";

const ArcgisHubDatasetFieldList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entityId = null;
    this.entity = {};
    this.sort = null;
    this.fields = [];
    this.useLayers = false;
  }
  componentWillLoad() {
    if (this.entityId) {
      this.fetchEntity(this.entityId);
    }
  }
  entityIdUpdated(newValue) {
    if (newValue) {
      this.fetchEntity(newValue);
    }
  }
  /**
   *
   [{
      atprecis: 38
      attalias: "TBOX_W"
      attrdef: "Tree box width"
      attrdefs: "District of Columbia, Department of Transportation, Urban Forestry Administration"
      attrlabl: "TBOX_W"
      attrtype: "Double"
      attscale: 8
      attwidth: 8
   }]
   * @param dataset
   */
  getMetadataAttributes(dataset) {
    const fieldArray = getWithDefault(dataset, 'metadata.metadata.eainfo.detailed.attr', []);
    return fieldArray.map(field => {
      return {
        label: field.attrdef,
        name: field.attrlabl,
        source: field.attrdefs,
        format: field.attrtype,
      };
    });
  }
  /**
   *
   [{
      alias: "OBJECTID"
      domain: null
      name: "OBJECTID"
      type: "esriFieldTypeOID"
      }]
   * @param dataset
   */
  getLayerAttributes(dataset) {
    const fieldArray = getWithDefault(dataset, 'layer.fields', []);
    return fieldArray.map(field => {
      return {
        label: field.alias,
        name: field.name,
        source: "layer",
        format: field.type,
      };
    });
  }
  getFields(dataset) {
    let fields;
    if (!this.useLayers) {
      fields = this.getMetadataAttributes(dataset);
    }
    if (!fields || fields.length === 0) {
      fields = this.getLayerAttributes(dataset);
    }
    // TODO move to observe change on sort
    if (!!this.sort) {
      const [sortField, _sortOrder] = this.sort.split(" ");
      fields = fields.sort((a, b) => {
        console.log("compare: ", [a[sortField], b[sortField]]);
        return a[sortField] < b[sortField] ? -1 : 1;
      });
      console.log("Sort", [sortField, _sortOrder, fields]);
    }
    return fields;
  }
  async fetchEntity(newId) {
    var _a;
    // TODO: call fetchContent with additional metadata, or lazy load metadata?
    this.entity = await fetchContent(newId);
    this.fields = this.getFields(this.entity);
    console.log('ArcGISHubMetadataList: fetchEntity', [
      this.entity.title,
      this.entity,
      (_a = this.entity.metadata) === null || _a === void 0 ? void 0 : _a.metadata.eainfo.detailed.attr
    ]);
  }
  render() {
    return (h(Host, { "data-element": "dataset-field-list" }, h("slot", null), h("table", null, h("thead", null, h("td", null, "Field Name"), h("td", null, "Field Label"), h("td", null, "Source"), h("td", null, "Format")), this.fields.map(field => h("tr", { key: field.name }, h("td", null, field.name), h("td", null, field.label), h("td", null, field.source), h("td", null, field.format))))));
  }
  static get watchers() { return {
    "entityId": ["entityIdUpdated"]
  }; }
};
ArcgisHubDatasetFieldList.style = arcgisHubDatasetFieldListCss;

export { ArcgisHubDatasetFieldList as arcgis_hub_dataset_field_list };
