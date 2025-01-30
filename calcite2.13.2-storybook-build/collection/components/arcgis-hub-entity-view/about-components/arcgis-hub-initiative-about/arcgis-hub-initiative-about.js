import { getAssociatedEntitiesQuery, hubSearch } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { getGlobalContext } from '../../../../utils/state';
import intlManager from '../../../../utils/intl-manager';
import { FEATURED_ASSOCIATED_PROJECTS_MAX } from './resources';
import { bind } from '../../../../utils/context';
import { ViewTabs } from '../../types';
export class ArcgisHubInitiativeAbout {
  constructor() {
    this.handleTabChange = (evt) => {
      this.arcgisHubEntityAboutTabChange.emit(evt);
    };
    this.entity = undefined;
    this.path = "";
    this._associatedProjectsCount = 0;
    bind(this, 'handleTabChange');
  }
  async init() {
    // 1. build the query to fetch the initiative's associated projects
    this._associatedProjectsQuery = this.initiative && await getAssociatedEntitiesQuery(this.initiative, "project", this._context);
    // 2. fetch the initiative's associated projects to get the total count -
    // we use this to conditionally render the "Associated Projects" section
    // and overflow pattern when there are > 4 associated projects
    if (this._associatedProjectsQuery) {
      const { total } = await hubSearch(this._associatedProjectsQuery, { requestOptions: this._context.hubRequestOptions });
      this._associatedProjectsCount = total;
    }
  }
  get initiative() {
    return this.entity;
  }
  /** global context: contextual portal & auth information */
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  /**
   * Renders associated projects of the initiative
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all projects
   */
  renderAssociatedProjects() {
    return (h("div", { class: "initiative-about__projects" }, h("h2", null, this.intl.t('project')), h("arcgis-hub-gallery", { layout: 'grid', limit: FEATURED_ASSOCIATED_PROJECTS_MAX, "link-target": "siteRelative", path: this.path, query: this._associatedProjectsQuery, showAdditionalInfo: false, sortField: "modified", sortOrder: 'desc' }), h("calcite-button", { appearance: "outline", "data-scroll": "scroll", "data-tab": ViewTabs.Projects, onClick: this.handleTabChange, round: true }, this.intl.t("exploreAllProjects"))));
  }
  render() {
    return (h(Host, { "data-element": "initiative-about" }, h("arcgis-hub-entity-about", { entity: this.entity }, h("div", { slot: "main" }, this._associatedProjectsCount > 0 && this.renderAssociatedProjects()))));
  }
  static get is() { return "arcgis-hub-initiative-about"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-initiative-about.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-initiative-about.css"]
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
          "text": "ArcGIS Hub initiative entity"
        }
      },
      "path": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Content Hierarchy Path that will be passed onto the gallery component\nso links are constructed with the correct path"
        },
        "attribute": "path",
        "reflect": false,
        "defaultValue": "\"\""
      }
    };
  }
  static get states() {
    return {
      "_associatedProjectsCount": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubEntityAboutTabChange",
        "name": "arcgisHubEntityAboutTabChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when a button or other element is interacted with to change tabs."
        },
        "complexType": {
          "original": "CalciteTabTitleCustomEvent<void>",
          "resolved": "CalciteTabTitleCustomEvent<void>",
          "references": {
            "CalciteTabTitleCustomEvent": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "init"
      }];
  }
}
