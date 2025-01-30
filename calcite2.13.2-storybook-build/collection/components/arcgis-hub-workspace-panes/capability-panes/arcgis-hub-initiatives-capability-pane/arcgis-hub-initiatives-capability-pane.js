import { Host, h, } from '@stencil/core';
export class ArcgisHubInitiativesCapabilityPane {
  constructor() {
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "initiatives", entity: this.entity })));
  }
  static get is() { return "arcgis-hub-initiatives-capability-pane"; }
  static get encapsulation() { return "scoped"; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity & IWithInitiatives",
          "resolved": "IHubDiscussion & IWithInitiatives | IHubEvent & IWithInitiatives | IHubGroup & IWithInitiatives | IHubInitiative & IWithInitiatives | IHubPage & IWithInitiatives | IHubProject & IWithInitiatives | IHubSite & IWithInitiatives | IHubSurvey & IWithInitiatives | IHubTemplate & IWithInitiatives | IHubUser & IWithInitiatives",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IWithInitiatives": {
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
