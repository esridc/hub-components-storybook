'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const extent = require('./extent-715f7c8d.js');
const state = require('./state-6637df8c.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./get-prop-4bd8fc1a.js');
require('./request-67da3c71.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');

/**
 * Return the facets for the Initiative associations gallery
 * (on the Initiatives tab)
 * @param intl - component intl
 * @returns {IFacet[]}
 */
const getAssociatedInitiativesFacets = (intl) => {
  return [
    {
      label: intl.t('facets.location.label'),
      tooltip: intl.t('facets.location.tooltip'),
      key: 'bbox',
      display: 'map',
      field: 'bbox',
      value: null,
      extent: extent.bBoxToExtent([[-180, -90], [180, 90]])
    },
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
      label: intl.t("facets.tags"),
      key: 'tags',
      field: 'tags',
      operation: 'OR',
      display: 'multi-select',
      options: []
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
};

const ArcgisHubProjectInitiativesView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
    this.isMobile = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    return this.init();
  }
  async init() {
    // build the query to fetch the initiative's associated projects
    this._associatedInitiativesQuery = this.entity && await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(this.entity, "initiative", this._context);
  }
  /** global context: contextual portal & auth information */
  get _context() {
    return state.getGlobalContext();
  }
  render() {
    return (index.h(index.Host, { "data-element": "project-initiatives" }, index.h("div", { class: "projects-initiatives-main" }, this._associatedInitiativesQuery && index.h("arcgis-hub-gallery", { facets: getAssociatedInitiativesFacets(this.intl), layout: "grid", linkTarget: "siteRelative", mobileView: this.isMobile, query: this._associatedInitiativesQuery, showFacets: true, showLayoutSwitcher: true, showResultsCount: true, showSearch: true, showSort: true }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.arcgis_hub_project_initiatives_view = ArcgisHubProjectInitiativesView;
