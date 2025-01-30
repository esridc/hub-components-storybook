import { fetchContent, getProp } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
export class ArcgisHubMetadataList {
  constructor() {
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
  static get is() { return "arcgis-hub-metadata-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-metadata-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-metadata-list.css"]
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
      "metadata": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Array<MetadataDisplay>",
          "resolved": "MetadataDisplay[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "MetadataDisplay": {
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
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "metadata",
        "methodName": "metadataUpdated"
      }, {
        "propName": "entityId",
        "methodName": "entityIdUpdated"
      }];
  }
}
