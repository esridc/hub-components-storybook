import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
export class ArcgisHubEntityGroupMembers {
  constructor() {
    this.entity = undefined;
  }
  async componentWillLoad() {
    await this.loadTranslations();
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (h(Host, { "data-element": "group-entity-members" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t("title")), h("arcgis-hub-group-members-manager", { groupId: this.entity.id }))));
  }
  static get is() { return "arcgis-hub-entity-group-members"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-group-members.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-group-members.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
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
  static get elementRef() { return "element"; }
}
