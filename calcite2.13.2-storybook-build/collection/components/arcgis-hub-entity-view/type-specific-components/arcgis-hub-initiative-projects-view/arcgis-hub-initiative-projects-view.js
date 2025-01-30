import { getAssociatedEntitiesQuery } from "@esri/hub-common";
import { Host, h } from "@stencil/core";
import intlManager from "../../../../utils/intl-manager";
import { getGlobalContext } from "../../../../utils";
export class ArcgisHubInitiativeProjectsView {
  constructor() {
    this.entity = undefined;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.init();
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  async init() {
    // build the query to fetch the initiative's associated projects
    this._associatedProjectsQuery = this.entity && await getAssociatedEntitiesQuery(this.entity, "project", this._context);
  }
  /**
   * Return the facets for the Project associations gallery
   * (on the Projects tab)
   * @param intl - component intl
   * @returns {IFacet[]}
  */
  get associatedProjectsFacets() {
    const { intl } = this;
    return [
      {
        label: intl.t("facets.status"),
        key: 'status',
        operation: 'OR',
        display: 'multi-select',
        options: [
          {
            label: intl.t("status.notStarted"),
            key: 'notStarted',
            predicates: [{ typekeywords: 'status|notStarted' }],
            selected: false
          },
          {
            label: intl.t("status.inProgress"),
            key: 'inProgress',
            predicates: [{ typekeywords: 'status|inProgress' }],
            selected: false
          },
          {
            label: intl.t("status.onHold"),
            key: 'onHold',
            predicates: [{ typekeywords: 'status|onHold' }],
            selected: false
          },
          {
            label: intl.t("status.complete"),
            key: 'complete',
            predicates: [{ typekeywords: 'status|complete' }],
            selected: false
          }
        ]
      },
      {
        label: intl.t('facets.tags'),
        key: 'tags',
        display: 'multi-select',
        field: 'tags',
        options: [],
        operation: 'OR',
      },
      {
        label: intl.t('facets.categories'),
        key: 'categories',
        display: 'tree',
        field: 'categories',
        options: [],
        operation: 'OR',
      },
      {
        label: intl.t('facets.dateUpdated'),
        key: 'modified',
        display: 'date-range',
        field: 'modified',
        state: 'open',
        max: new Date(),
      },
    ];
  }
  render() {
    return (h(Host, { "data-element": "initiative-projects" }, h("div", { class: "initiative-projects-main" }, h("arcgis-hub-gallery", { facets: this.associatedProjectsFacets, layout: "grid", "link-target": "siteRelative", query: this._associatedProjectsQuery, showFacets: true, showLayoutSwitcher: true, showResultsCount: true, showSearch: true, showSort: true }))));
  }
  static get is() { return "arcgis-hub-initiative-projects-view"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubInitiative",
          "resolved": "IHubInitiative",
          "references": {
            "IHubInitiative": {
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
      }
    };
  }
  static get elementRef() { return "element"; }
}
