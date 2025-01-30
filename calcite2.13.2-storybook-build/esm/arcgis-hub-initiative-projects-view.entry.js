import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { d as getAssociatedEntitiesQuery } from './getAssociatedEntitiesQuery-a2536649.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';

const ArcgisHubInitiativeProjectsView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { ArcgisHubInitiativeProjectsView as arcgis_hub_initiative_projects_view };
