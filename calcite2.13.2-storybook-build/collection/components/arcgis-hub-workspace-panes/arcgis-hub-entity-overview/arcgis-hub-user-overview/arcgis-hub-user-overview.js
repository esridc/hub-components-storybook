import { Host, h } from '@stencil/core';
import { hubSearch } from '@esri/hub-common';
import intlManager from '../../../../utils/intl-manager';
import { ALIGNMENTS, CORNERS } from '../../../interfaces';
import { getGlobalContext } from '../../../../utils/state';
const HUB_BASIC_ENTITY_TYPES = [
  "Hub Site Application", "Hub Page"
];
const HUB_PREMUIM_ENTITY_TYPES = [
  "Hub Site Application", "Hub Page", "Hub Project", "Hub Initiative"
];
const HUB_ENTERPRISE_ENTITY_TYPES = [
  "Site Application", "Site Page"
];
export class ArcgisHubEntityOverview {
  constructor() {
    this.entity = undefined;
    this.isMobile = false;
    this.contentCount = undefined;
    this.groupCount = undefined;
    this._context = getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // execute the queries to get the counts for items and groups
    const contentResults = await hubSearch(this.allContentQuery, {
      requestOptions: this._context.hubRequestOptions,
      num: 1,
      httpMethod: 'POST',
    });
    this.contentCount = contentResults.total;
    const groupResults = await hubSearch(this.recentGroupsQuery, {
      requestOptions: this._context.hubRequestOptions,
      num: 1,
      httpMethod: 'POST',
    });
    this.groupCount = groupResults.total;
  }
  get entityTypes() {
    const license = this._context.hubLicense;
    switch (license) {
      case "hub-basic":
        return HUB_BASIC_ENTITY_TYPES;
      case 'hub-premium':
        return HUB_PREMUIM_ENTITY_TYPES;
      case 'enterprise-sites':
        return HUB_ENTERPRISE_ENTITY_TYPES;
      default:
        return HUB_BASIC_ENTITY_TYPES;
    }
  }
  get userEditGroupIds() {
    const groups = this._context.currentUser.groups || [];
    const userEditGroupIds = groups.filter(g => g.capabilities.includes('updateitemcontrol')).map(g => g.id);
    return userEditGroupIds; //.slice(0, 100);
  }
  get recentHubEntityQuery() {
    // Hub Entity Types, but in edit groups OR owned by user
    const qry = {
      targetEntity: 'item',
      filters: [
        {
          operation: 'AND',
          predicates: [
            {
              type: this.entityTypes,
            },
          ],
        },
        {
          operation: 'OR',
          predicates: [
            {
              owner: this._context.currentUser.username,
            },
            {
              group: this.userEditGroupIds,
            },
          ],
        }
      ],
    };
    return qry;
  }
  get allContentQuery() {
    // NOT Hub Entity Types, but in edit groups OR owned by user
    const qry = {
      targetEntity: 'item',
      filters: [
        {
          predicates: [
            {
              type: { not: "Code Attachment", }
            },
          ],
        },
        {
          operation: 'OR',
          predicates: [
            {
              owner: this._context.currentUser.username,
            },
            {
              group: this.userEditGroupIds,
            },
          ],
        }
      ],
    };
    return qry;
  }
  get recentContentQuery() {
    // NOT Hub Entity Types, but in edit groups OR owned by user
    const qry = {
      targetEntity: 'item',
      filters: [
        {
          predicates: [
            {
              type: { not: this.entityTypes, }
            },
          ],
        },
        {
          operation: 'OR',
          predicates: [
            {
              owner: this._context.currentUser.username,
            },
            {
              group: this.userEditGroupIds,
            },
          ],
        }
      ],
    };
    return qry;
  }
  get recentGroupsQuery() {
    return {
      targetEntity: "group",
      filters: [
        {
          predicates: [
            {
              searchUserAccess: "groupMember"
            }
          ],
        }
      ]
    };
  }
  get galleryProps() {
    return {
      baseUrl: this._context.hubHomeUrl,
      corners: CORNERS.round,
      galleryType: 'item',
      layout: 'table',
      limit: 10,
      linkTarget: 'siteRelative',
      mobileView: this.isMobile,
      showAddContent: true,
      sortField: 'modified',
      sortOrder: 'desc',
    };
  }
  get groupsGalleryProps() {
    const contentCountColumn = {
      header: this.intl.t('contentCount'),
      key: 'searchResult.contentCount',
      formatter: (val) => {
        return this.intl.formatNumber(val);
      },
      contentCellAlignment: ALIGNMENTS.end,
      headerCellAlignment: ALIGNMENTS.end
    };
    const tableColumns = ['thumbnail', 'title', 'managers', contentCountColumn, 'updated'];
    return Object.assign(Object.assign({}, this.galleryProps), { include: 'contentCount', tableColumns });
  }
  get addContentProps() {
    return {
      buttonText: this.intl.t('addContent'),
      config: {
        create: {
          targetEntity: 'item',
          types: ['Discussion', 'Event', 'Hub Project', 'Hub Initiative', 'Hub Page', 'Hub Site Application'],
          // types: this.entityTypes,
          workflow: 'create',
        }
      },
      allowGroupSelection: true
    };
  }
  render() {
    return (h(Host, { "data-element": "entity-overview" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("h1", { slot: "title" }, this.intl.t('overview')), h("div", null, h("div", { class: "section" }, h("div", { class: "section-header" }, h("h2", null, this.intl.t('hubContent.heading')), h("arcgis-hub-workspace-link", { pane: "content" }, this.intl.t('hubContent.link'))), h("arcgis-hub-gallery", Object.assign({}, this.galleryProps, { addContentProps: this.addContentProps, query: this.recentHubEntityQuery }))), h("div", { class: "section" }, h("div", { class: "section-header" }, h("h2", null, this.intl.t('content.heading')), h("arcgis-hub-workspace-link", { pane: "content" }, this.intl.t('content.link'))), h("arcgis-hub-gallery", Object.assign({}, this.galleryProps, { query: this.recentContentQuery, showAddContent: false }))), h("div", { class: "section" }, h("div", { class: "section-header" }, h("h2", null, this.intl.t('groups.heading')), h("arcgis-hub-workspace-link", { pane: "groups" }, this.intl.t('groups.link'))), h("arcgis-hub-gallery", Object.assign({}, this.groupsGalleryProps, { addContentProps: { buttonText: this.intl.t('addContent') }, limit: 5, query: this.recentGroupsQuery })))), h("div", { slot: "side-panel" }, h("arcgis-stat-card", { cardTitle: this.intl.t('content.stat'), value: `${this.intl.formatNumber(this.contentCount)}` }, h("arcgis-hub-workspace-link", { pane: "content", slot: "footer" }, this.intl.t('hubContent.link'))), h("arcgis-stat-card", { cardTitle: this.intl.t('groups.stat'), value: `${this.intl.formatNumber(this.groupCount)}` }, h("arcgis-hub-workspace-link", { pane: "groups", slot: "footer" }, this.intl.t('groups.link'))), h("arcgis-hub-resource-gallery", { headingText: this.intl.t('resources'), limit: 4, tags: ["userworkspace"] })))));
  }
  static get is() { return "arcgis-hub-user-overview"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-user-overview.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-user-overview.css"]
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
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "contentCount": {},
      "groupCount": {},
      "_context": {}
    };
  }
  static get elementRef() { return "element"; }
}
