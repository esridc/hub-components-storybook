import { h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { SCHEMA } from "./schema";
import { cloneObject } from '@esri/hub-common';
export class ArcgisCountdownEditor {
  constructor() {
    this.values = {};
  }
  /**
   * emit an event with the updated countdown values
   * when a field in the arcgis-configuration-editor is
   * changed
   * @param event
   */
  handleEditorChangeEvent(event) {
    event.stopPropagation();
    this.arcgisCountdownEditorChange.emit(event.detail);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * json schema for the arcgis-countdown-editor
   * this gets parsed by the arcgis-configuration-editor
   * to determine what inputs to render
   */
  get schema() {
    const schema = cloneObject(SCHEMA);
    const getTitle = prop => this.intl.t(prop);
    // add a translated title to each prop
    Object.entries(schema.properties).forEach(([prop, propSchema]) => {
      propSchema.title = getTitle(prop);
    });
    return schema;
  }
  render() {
    return (h("arcgis-configuration-editor", { schema: this.schema, values: this.values }));
  }
  static get is() { return "arcgis-countdown-editor"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": true,
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
              "text": "ArcgisCountdownEditor"
            }],
          "text": "The dynamic countdown values"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisCountdownEditorChange",
        "name": "arcgisCountdownEditorChange",
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
