'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const getWithDefault = require('./get-with-default-d1b1754d.js');
const fetchContent = require('./fetchContent-963f3885.js');
require('./get-prop-4bd8fc1a.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./util-38e73510.js');
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

const arcgisHubDatasetFieldListCss = ":host{display:block;border:thin solid #DDD;margin:0.5rem 0}tr:nth-child(even){background-color:#f3f3f3}th,td{padding:0.8rem 1rem}tbody tr.active-row{font-weight:bold;color:#009879}";

const ArcgisHubDatasetFieldList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    const fieldArray = getWithDefault.getWithDefault(dataset, 'metadata.metadata.eainfo.detailed.attr', []);
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
    const fieldArray = getWithDefault.getWithDefault(dataset, 'layer.fields', []);
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
    this.entity = await fetchContent.fetchContent(newId);
    this.fields = this.getFields(this.entity);
    console.log('ArcGISHubMetadataList: fetchEntity', [
      this.entity.title,
      this.entity,
      (_a = this.entity.metadata) === null || _a === void 0 ? void 0 : _a.metadata.eainfo.detailed.attr
    ]);
  }
  render() {
    return (index.h(index.Host, { "data-element": "dataset-field-list" }, index.h("slot", null), index.h("table", null, index.h("thead", null, index.h("td", null, "Field Name"), index.h("td", null, "Field Label"), index.h("td", null, "Source"), index.h("td", null, "Format")), this.fields.map(field => index.h("tr", { key: field.name }, index.h("td", null, field.name), index.h("td", null, field.label), index.h("td", null, field.source), index.h("td", null, field.format))))));
  }
  static get watchers() { return {
    "entityId": ["entityIdUpdated"]
  }; }
};
ArcgisHubDatasetFieldList.style = arcgisHubDatasetFieldListCss;

exports.arcgis_hub_dataset_field_list = ArcgisHubDatasetFieldList;
