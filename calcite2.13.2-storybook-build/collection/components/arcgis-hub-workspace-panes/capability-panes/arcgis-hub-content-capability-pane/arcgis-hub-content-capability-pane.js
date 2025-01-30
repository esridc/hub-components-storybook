import { Host, h, } from '@stencil/core';
export class ArcgisHubEventsCapabilityPane {
  constructor() {
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "content", entity: this.entity })));
  }
  static get is() { return "arcgis-hub-content-capability-pane"; }
  static get encapsulation() { return "scoped"; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity & IWithContent",
          "resolved": "IHubDiscussion & IWithContent | IHubEvent & IWithContent | IHubGroup & IWithContent | IHubInitiative & IWithContent | IHubPage & IWithContent | IHubProject & IWithContent | IHubSite & IWithContent | IHubSurvey & IWithContent | IHubTemplate & IWithContent | IHubUser & IWithContent",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IWithContent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
}
