import { Host, h, } from '@stencil/core';
export class ArcgisHubProjectsCapabilityPane {
  constructor() {
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "projects", entity: this.entity })));
  }
  static get is() { return "arcgis-hub-projects-capability-pane"; }
  static get encapsulation() { return "scoped"; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity & IWithProjects",
          "resolved": "IHubDiscussion & IWithProjects | IHubEvent & IWithProjects | IHubGroup & IWithProjects | IHubInitiative & IWithProjects | IHubPage & IWithProjects | IHubProject & IWithProjects | IHubSite & IWithProjects | IHubSurvey & IWithProjects | IHubTemplate & IWithProjects | IHubUser & IWithProjects",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IWithProjects": {
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
