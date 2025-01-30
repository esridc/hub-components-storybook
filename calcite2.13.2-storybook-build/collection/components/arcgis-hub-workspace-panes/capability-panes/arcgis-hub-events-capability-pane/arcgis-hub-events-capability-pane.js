import { Host, h, } from '@stencil/core';
export class ArcgisHubEventsCapabilityPane {
  constructor() {
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "events", entity: this.entity })));
  }
  static get is() { return "arcgis-hub-events-capability-pane"; }
  static get encapsulation() { return "scoped"; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity & IWithEvents",
          "resolved": "IHubDiscussion & IWithEvents | IHubEvent & IWithEvents | IHubGroup & IWithEvents | IHubInitiative & IWithEvents | IHubPage & IWithEvents | IHubProject & IWithEvents | IHubSite & IWithEvents | IHubSurvey & IWithEvents | IHubTemplate & IWithEvents | IHubUser & IWithEvents",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IWithEvents": {
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
