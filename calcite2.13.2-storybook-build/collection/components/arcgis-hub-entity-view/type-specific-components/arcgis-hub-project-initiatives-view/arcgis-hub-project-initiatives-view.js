import { h, Host } from "@stencil/core";
import intlManager from "../../../../utils/intl-manager";
import { getAssociatedEntitiesQuery } from '@esri/hub-common';
import { getAssociatedInitiativesFacets } from './resources';
import { getGlobalContext } from '../../../../utils/state';
export class ArcgisHubProjectInitiativesView {
  constructor() {
    this.entity = undefined;
    this.isMobile = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    return this.init();
  }
  async init() {
    // build the query to fetch the initiative's associated projects
    this._associatedInitiativesQuery = this.entity && await getAssociatedEntitiesQuery(this.entity, "initiative", this._context);
  }
  /** global context: contextual portal & auth information */
  get _context() {
    return getGlobalContext();
  }
  render() {
    return (h(Host, { "data-element": "project-initiatives" }, h("div", { class: "projects-initiatives-main" }, this._associatedInitiativesQuery && h("arcgis-hub-gallery", { facets: getAssociatedInitiativesFacets(this.intl), layout: "grid", linkTarget: "siteRelative", mobileView: this.isMobile, query: this._associatedInitiativesQuery, showFacets: true, showLayoutSwitcher: true, showResultsCount: true, showSearch: true, showSort: true }))));
  }
  static get is() { return "arcgis-hub-project-initiatives-view"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubProject",
          "resolved": "IHubProject",
          "references": {
            "IHubProject": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "ArcGIS Hub entity"
        }
      },
      "isMobile": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether or not we are viewing in mobile"
        },
        "attribute": "is-mobile",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "element"; }
}
