import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bBoxToExtent } from './extent-34a4ba2a.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { d as getAssociatedEntitiesQuery } from './getAssociatedEntitiesQuery-a2536649.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';
import './request-fa80ae40.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';

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
      extent: bBoxToExtent([[-180, -90], [180, 90]])
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
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { ArcgisHubProjectInitiativesView as arcgis_hub_project_initiatives_view };
