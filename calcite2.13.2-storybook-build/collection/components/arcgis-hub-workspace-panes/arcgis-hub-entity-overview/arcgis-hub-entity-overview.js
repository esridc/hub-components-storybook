import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
/**
 * The following is the DEFAULT entity overview pane component
 *
 * Note: having a single overview pane component (arcgis-hub-entity-overview)
 * is the end goal; however, it is not the most pragmatic first-pass
 * approach since there will be variation in what we render for different
 * entity types. A single pane component will require some sort of "Layout Player"
 * component that dynamically renders a layout given a JSON configuration.
 * This is still only conceptual and likely a ways off from being implemented.
 *
 * In the meantime, however, we will support workspaces rendering type-specific
 * overview pane components (e.g. arcgis-hub-project-overview, etc.) comprised
 * of reusable sub-components. In order to scaffold this for your entity type:
 *
 * 1. create a type-specific overview pane component (arcgis-hub-<type>-overview)
 * within this directory
 * 2. configure your entity's overview link definition to reference this component
 */
export class ArcgisHubEntityOverview {
  constructor() {
    this.entity = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  renderMetadata() {
    return (h("div", null, h("h3", null, this.intl.t("metadata.details")), h("arcgis-hub-entity-metadata", { entity: this.entity, exclude: ['access'] })));
  }
  render() {
    return (h(Host, { "data-element": "entity-overview" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t('overview')), h("div", null, "A PLACEHOLDER FOR THE MAIN CONTENT"), h("div", { slot: "side-panel" }, this.renderMetadata()))));
  }
  static get is() { return "arcgis-hub-entity-overview"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-overview.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-overview.css"]
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
