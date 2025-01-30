'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');

const ArcgisHubInitiativeProjectsView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.init();
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  async init() {
    // build the query to fetch the initiative's associated projects
    this._associatedProjectsQuery = this.entity && await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(this.entity, "project", this._context);
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
    return (index.h(index.Host, { "data-element": "initiative-projects" }, index.h("div", { class: "initiative-projects-main" }, index.h("arcgis-hub-gallery", { facets: this.associatedProjectsFacets, layout: "grid", "link-target": "siteRelative", query: this._associatedProjectsQuery, showFacets: true, showLayoutSwitcher: true, showResultsCount: true, showSearch: true, showSort: true }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.arcgis_hub_initiative_projects_view = ArcgisHubInitiativeProjectsView;
