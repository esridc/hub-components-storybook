import { fetchContent, getWithDefault } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
export class ArcgisHubDatasetFieldList {
  constructor() {
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
  static get is() { return "arcgis-hub-dataset-field-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-dataset-field-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-dataset-field-list.css"]
    };
  }
  static get properties() {
    return {
      "entityId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "entity-id",
        "reflect": true,
        "defaultValue": "null"
      },
      "entity": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "entity",
        "reflect": true,
        "defaultValue": "{}"
      },
      "sort": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "sort",
        "reflect": false,
        "defaultValue": "null"
      },
      "fields": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Array<IHubFieldDisplay>",
          "resolved": "IHubFieldDisplay[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "IHubFieldDisplay": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "useLayers": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "use-layers",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "entityId",
        "methodName": "entityIdUpdated"
      }];
  }
}
