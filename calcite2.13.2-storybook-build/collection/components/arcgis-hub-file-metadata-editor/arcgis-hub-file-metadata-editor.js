import { cloneObject } from "@esri/hub-common";
import { h } from "@stencil/core";
import intlManager from "../../utils/intl-manager";
import { SCHEMA, UI_SCHEMA } from './schema';
import { bind } from '../../utils/context';
export class ArcgisHubFileMetadataEditor {
  constructor() {
    this._schema = cloneObject(SCHEMA);
    this._uiSchema = cloneObject(UI_SCHEMA);
    this.values = {};
    bind(this, 'translationFunc');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  handleValuesChanged() {
    // clone values to avoid mutation
    this.internalValues = cloneObject(this.values);
  }
  /**
   * Emit an event with the updated item metadata values when a field in
   * the arcgis-configuration-editor is changed
   * @param event
   */
  handleEditorChangeEvent(event) {
    event.stopPropagation();
    this.arcgisHubFileMetadataEditorChange.emit(event.detail);
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return (h("div", null, h("arcgis-configuration-editor", { schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.internalValues })));
  }
  static get is() { return "arcgis-hub-file-metadata-editor"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IConfigurationValues}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubFileMetadataEditor"
            }],
          "text": "The values for the arcgis-configuration-editor (title, snippet, tags)"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFileMetadataEditorChange",
        "name": "arcgisHubFileMetadataEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "values",
        "methodName": "handleValuesChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisConfigurationEditorChange",
        "method": "handleEditorChangeEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
