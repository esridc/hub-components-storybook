import { Host, h, } from '@stencil/core';
export class ArcgisHubPagesCapabilityPane {
  constructor() {
    this.entity = undefined;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-entity-capability-pane", { capability: "pages", entity: this.entity })));
  }
  static get is() { return "arcgis-hub-pages-capability-pane"; }
  static get encapsulation() { return "scoped"; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity & IWithPages",
          "resolved": "IHubDiscussion & IWithPages | IHubEvent & IWithPages | IHubGroup & IWithPages | IHubInitiative & IWithPages | IHubPage & IWithPages | IHubProject & IWithPages | IHubSite & IWithPages | IHubSurvey & IWithPages | IHubTemplate & IWithPages | IHubUser & IWithPages",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IWithPages": {
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
