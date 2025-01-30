import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CORNERS, A as ALIGNMENTS } from './interfaces-0d0bef14.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

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
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityOverview.style = arcgisHubUserOverviewCss;

export { ArcgisHubEntityOverview as arcgis_hub_user_overview };
