'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const interfaces = require('./interfaces-fc0046ff.js');
const state = require('./state-6637df8c.js');
const hubSearch = require('./hubSearch-79d30702.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const arcgisHubUserOverviewCss = ":host{display:block;height:100%}div{flex-direction:column}div.section-header{display:flex;flex-direction:row;justify-content:space-between;align-items:baseline}arcgis-stat-card{height:auto}";

const HUB_BASIC_ENTITY_TYPES = [
  "Hub Site Application", "Hub Page"
];
const HUB_PREMUIM_ENTITY_TYPES = [
  "Hub Site Application", "Hub Page", "Hub Project", "Hub Initiative"
];
const HUB_ENTERPRISE_ENTITY_TYPES = [
  "Site Application", "Site Page"
];
const ArcgisHubEntityOverview = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
    this.isMobile = false;
    this.contentCount = undefined;
    this.groupCount = undefined;
    this._context = state.getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // execute the queries to get the counts for items and groups
    const contentResults = await hubSearch.hubSearch(this.allContentQuery, {
      requestOptions: this._context.hubRequestOptions,
      num: 1,
      httpMethod: 'POST',
    });
    this.contentCount = contentResults.total;
    const groupResults = await hubSearch.hubSearch(this.recentGroupsQuery, {
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
      corners: interfaces.CORNERS.round,
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
      contentCellAlignment: interfaces.ALIGNMENTS.end,
      headerCellAlignment: interfaces.ALIGNMENTS.end
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
    return (index.h(index.Host, { "data-element": "entity-overview" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, index.h("h1", { slot: "title" }, this.intl.t('overview')), index.h("div", null, index.h("div", { class: "section" }, index.h("div", { class: "section-header" }, index.h("h2", null, this.intl.t('hubContent.heading')), index.h("arcgis-hub-workspace-link", { pane: "content" }, this.intl.t('hubContent.link'))), index.h("arcgis-hub-gallery", Object.assign({}, this.galleryProps, { addContentProps: this.addContentProps, query: this.recentHubEntityQuery }))), index.h("div", { class: "section" }, index.h("div", { class: "section-header" }, index.h("h2", null, this.intl.t('content.heading')), index.h("arcgis-hub-workspace-link", { pane: "content" }, this.intl.t('content.link'))), index.h("arcgis-hub-gallery", Object.assign({}, this.galleryProps, { query: this.recentContentQuery, showAddContent: false }))), index.h("div", { class: "section" }, index.h("div", { class: "section-header" }, index.h("h2", null, this.intl.t('groups.heading')), index.h("arcgis-hub-workspace-link", { pane: "groups" }, this.intl.t('groups.link'))), index.h("arcgis-hub-gallery", Object.assign({}, this.groupsGalleryProps, { addContentProps: { buttonText: this.intl.t('addContent') }, limit: 5, query: this.recentGroupsQuery })))), index.h("div", { slot: "side-panel" }, index.h("arcgis-stat-card", { cardTitle: this.intl.t('content.stat'), value: `${this.intl.formatNumber(this.contentCount)}` }, index.h("arcgis-hub-workspace-link", { pane: "content", slot: "footer" }, this.intl.t('hubContent.link'))), index.h("arcgis-stat-card", { cardTitle: this.intl.t('groups.stat'), value: `${this.intl.formatNumber(this.groupCount)}` }, index.h("arcgis-hub-workspace-link", { pane: "groups", slot: "footer" }, this.intl.t('groups.link'))), index.h("arcgis-hub-resource-gallery", { headingText: this.intl.t('resources'), limit: 4, tags: ["userworkspace"] })))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityOverview.style = arcgisHubUserOverviewCss;

exports.arcgis_hub_user_overview = ArcgisHubEntityOverview;
