import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { V as ViewTabs } from './types-cd0b60e2.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { M as MetricVisibility } from './Metrics-9cb7a1fc.js';
import { g as getAssociationStats } from './getAssociationStats-39b08e03.js';
import { g as getReferencedEntityIds } from './getReferencedEntityIds-265ddcf1.js';
import { W as WELL_KNOWN_FACET_TYPES } from './facets-1177471f.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { d as getAssociatedEntitiesQuery } from './getAssociatedEntitiesQuery-a2536649.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { R as ResizeObserverManager } from './resize-observer-dc6e269e.js';
import { b as capitalize } from './util-3e6872d9.js';
import './get-family-543fac52.js';
import './getRequestingEntitiesQuery-e8399fe2.js';
import './get-prop-ec5be510.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
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
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
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
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
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
import './store-0a6cb79f.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';

/** type-specific about view components */
const ABOUT_VIEWS = [
  {
    name: 'about',
    entities: ['event'],
    component: 'arcgis-hub-event-about',
  },
  {
    name: 'about',
    entities: ['project'],
    component: 'arcgis-hub-project-about',
  },
  {
    name: 'about',
    entities: ['initiative'],
    component: 'arcgis-hub-initiative-about',
  }
];
/** type-specific hero components */
const HERO_VIEWS = [
  {
    name: 'hero',
    entities: ['event'],
    component: 'arcgis-hub-event-hero'
  },
  {
    name: 'hero',
    entities: ['initiative'],
    component: 'arcgis-hub-initiative-hero'
  }
];
/** type-specific view components */
const getTypeSpecificViewConfigs = async (entity, context) => {
  var _a, _b;
  const type = getTypeFromEntity(entity);
  const configs = [
    {
      name: 'content',
      entities: ['group'],
      i18nLabel: 'tabs.content',
      component: 'arcgis-hub-entity-group-content',
    },
    {
      name: 'members',
      entities: ['group'],
      i18nLabel: 'tabs.members',
      component: 'arcgis-hub-entity-group-members',
    }
  ];
  // entity metrics view
  const metricDisplays = ((_b = (_a = entity === null || entity === void 0 ? void 0 : entity.view) === null || _a === void 0 ? void 0 : _a.metricDisplays) === null || _b === void 0 ? void 0 : _b.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== MetricVisibility.hidden)) || [];
  configs.push({
    name: 'metrics',
    entities: ['project', 'initiative'],
    i18nLabel: 'tabs.metrics',
    component: 'arcgis-hub-entity-metrics-view',
    isVisible: [!!metricDisplays.length]
  });
  // initiative's associated projects view
  if (type === 'initiative') {
    // check if there are any associated entities
    const { associated } = await getAssociationStats(entity, "project", context);
    configs.push({
      name: 'projects',
      entities: ['initiative'],
      isVisible: ['hub:project:associations', !!associated],
      i18nLabel: 'tabs.projects',
      component: 'arcgis-hub-initiative-projects-view',
    });
  }
  // project's associated initiatives view
  if (type === 'project') {
    // check if there are any referenced entities
    const haveReferencedEntities = getReferencedEntityIds(entity).length > 0;
    // if there are then we need to check if there are any associated entities
    const { associated } = haveReferencedEntities && await getAssociationStats(entity, "initiative", context);
    configs.push({
      name: 'initiatives',
      entities: ['project'],
      isVisible: ['hub:project:associations', !!associated],
      i18nLabel: 'tabs.initiatives',
      component: 'arcgis-hub-project-initiatives-view',
    });
  }
  return configs;
};

/**
 * Get a list of the views that should be displayed for a given entity
 * @param entity
 * @param context
 * @returns
 */
async function getViews(entity, context, options) {
  // Note: When we allow for customizable views, this function will pull that information from the entity
  // from the entity and return the appropriate information.
  const views = [];
  // add the catalog view
  const catalog = entity.catalog;
  // If there is a catalog, and it is not empty, add the catalog view
  if (!!catalog && !isCatalogEmpty(catalog)) {
    views.push({
      name: "content",
      i18nLabel: 'tabs.content',
      component: 'arcgis-hub-catalog',
      props: {
        catalogs: [catalog],
        facets: [...WELL_KNOWN_FACET_TYPES],
        layout: 'grid',
        layoutOptions: ['grid', 'list', 'table', 'map', 'compact'],
        showAddContent: true,
        showLayoutSwitcher: true,
        showSearch: true,
        showThumbnail: true,
        path: options.path,
        linkTarget: 'siteRelative',
      }
    });
  }
  const typeSpecificViews = (await getTypeSpecificViews(entity, context)).map((def) => {
    return {
      name: def.name,
      icon: def.icon,
      i18nLabel: def.i18nLabel,
      component: def.component
    };
  });
  // add the type specific views
  return [...views, ...typeSpecificViews];
}
/**
 * Get the type specific views for a given entity
 * @param entity
 * @param context
 * @returns
 */
async function getTypeSpecificViews(entity, context) {
  const entityType = getTypeFromEntity(entity);
  const typeSpecificViewConfigs = await getTypeSpecificViewConfigs(entity, context);
  return typeSpecificViewConfigs
    .filter((def) => def.entities.includes(entityType))
    .filter(def => {
    return def.isVisible
      ? def.isVisible.every(condition => {
        if (typeof condition === "boolean") {
          return condition;
        }
        return checkPermission(condition, context, entity).access;
      })
      : true;
  });
}
/**
 * Check if a catalog is empty
 * @param catalog
 * @returns
 */
function isCatalogEmpty(catalog) {
  var _a;
  const hasCollections = ((_a = catalog === null || catalog === void 0 ? void 0 : catalog.collections) === null || _a === void 0 ? void 0 : _a.length) > 0;
  const hasScope = Object.values((catalog === null || catalog === void 0 ? void 0 : catalog.scopes) || {}).some((scope) => {
    var _a;
    return ((_a = scope === null || scope === void 0 ? void 0 : scope.filters) === null || _a === void 0 ? void 0 : _a.length) > 0;
  });
  return !(hasCollections || hasScope);
}
// fetch the counts for the associated initiatives, projects, and content
const fetchAssociatedEntitiesCount = async (entity, associationType, context) => {
  var _a, _b, _c, _d;
  let result = null;
  try {
    if (['initiatives', 'projects'].includes(associationType)) {
      // 1. build the query to fetch the entity's associated entities
      const query = await getAssociatedEntitiesQuery(entity, associationType.replace(/s$/, ''), context);
      // 2. fetch the entity's associated entities to get the total count to display on the tab
      if (query) {
        const searchOptions = { requestOptions: context.hubRequestOptions };
        const { total } = await hubSearch(query, searchOptions);
        result = total;
      }
    }
    else if (associationType === 'content') {
      // fetch the entity's configured catalog to get the total count to display on the tab
      const catalog = entity.catalog;
      if ((_a = catalog === null || catalog === void 0 ? void 0 : catalog.scopes) === null || _a === void 0 ? void 0 : _a.item) {
        result = await hubSearch(catalog.scopes.item, { requestOptions: context.hubRequestOptions }).then(({ total }) => total);
      }
    }
    else if (associationType === 'metrics' && !!((_b = entity.view) === null || _b === void 0 ? void 0 : _b.metricDisplays)) {
      // metrics we can pull from the entity view and filter out hidden ones
      result = ((_d = (_c = entity.view.metricDisplays) === null || _c === void 0 ? void 0 : _c.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== 'hidden')) === null || _d === void 0 ? void 0 : _d.length) || null;
    }
  }
  catch (error) {
    // swallow it
  }
  return result;
};

/**
 * Helper function to determine if the user has requested reduced motion
 * @returns
 */
function isReducedMotion() {
  return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
}

const arcgisHubEntityViewCss = ".sc-arcgis-hub-entity-view-h{display:block}arcgis-hub-entity-capabilities.sc-arcgis-hub-entity-view{margin-top:1rem}h2.sc-arcgis-hub-entity-view{font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-hub-initiative-hero.sc-arcgis-hub-entity-view:has(~calcite-tabs.sc-arcgis-hub-entity-view calcite-tab-nav.sc-arcgis-hub-entity-view calcite-tab-title[selected].sc-arcgis-hub-entity-view:not([name='about'])){display:block;height:0px}@media only screen and (max-width: 768px){arcgis-hub-event-about.sc-arcgis-hub-entity-view{flex-direction:column;gap:0}}";

const ArcgisHubEntityView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.view = ViewTabs.Overview;
    this.entity = undefined;
    this.path = "";
    this.isMobile = undefined;
    this.mode = 'default';
    this._hasAboutSlot = false;
    this._typeSpecificViews = [];
    bind(this, 'handleTabChange', 'handleResize');
  }
  get _context() { return getGlobalContext(); }
  async init() {
    if (!this.entity) {
      return;
    }
    // fetch the type-specific views
    this._typeSpecificViews = await getViews(this.entity, this._context, { path: this.path });
    // augment them with contentCount
    this._typeSpecificViews = await Promise.all(this._typeSpecificViews.map(async (view) => {
      const contentCount = await fetchAssociatedEntitiesCount(this.entity, view.name, this._context);
      return Object.assign(Object.assign({}, view), { contentCount });
    }));
  }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  connectedCallback() {
    ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  async handleResize() {
    this.isMobile = this.element.clientWidth < 560;
  }
  async componentWillLoad() {
    this._hasAboutSlot = !!this.element.querySelector('[slot="about"]');
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  /**
   * About component to display in the Overview tab,
   * either the default entity about or a type-specific about
   */
  get aboutComponent() {
    const entry = ABOUT_VIEWS.find(entry => entry.entities.includes(this.entityType));
    return entry ? entry.component : 'arcgis-hub-entity-about';
  }
  /**
   * Views are rendered in tabs and in the future will be user-configurable.
   * At this time we generate the view definitions based on the type but once
   * we enable configurablity, we will pull the configured views from the entity.
   */
  get views() {
    // 1. add the about view
    let views = [{
        name: 'about',
        i18nLabel: 'tabs.overview',
        component: this.aboutComponent,
        props: {
          path: this.path
        }
      }];
    // 3. add the type specific views
    views = [...views, ...this._typeSpecificViews];
    return views;
  }
  get hasViews() {
    return !!this.views.length;
  }
  /**
   * Hero component to display at the top of the view,
   * either the default entity hero or a type-specific hero
   */
  get heroComponent() {
    const entry = HERO_VIEWS.find(entry => entry.entities.includes(this.entityType));
    return entry ? entry.component : 'arcgis-hub-entity-hero';
  }
  /** This is needed for clicks from the about pane */
  handleTabChange(evt) {
    var _a;
    evt.stopPropagation();
    // We need to use evt.detail?.target from the listener because its an event that is emitting
    // an event. However we are also using this for onCalciteTabsActivate which uses evt.target
    const target = ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.target) || evt.target;
    const tab = target.tab || target.getAttribute('data-tab');
    const scroll = !!target.getAttribute('data-scroll');
    this.view = tab;
    if (scroll) {
      // Scroll back up to the top when switching
      this.element.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth' });
    }
    // This is a temporary measure as we don't know yet if we are sticking with overview or about.
    const dictTabName = tab === 'about' ? 'overview' : tab;
    this.hubTelemetry.emit(Object.assign({ label: capitalize(dictTabName) }, (dist.dictionary.category.navigation.action.onPage.label[dictTabName] || dist.dictionary.category.navigation.action.onPage)));
  }
  renderViewName(view) {
    // return this.intl.t(view.i18nLabel);
    const i18nKey = (view.contentCount !== undefined) ? `${view.i18nLabel}WithCount` : view.i18nLabel;
    return this.intl.t(i18nKey, { count: view.contentCount });
  }
  renderViews() {
    if (this.hasViews) {
      return (h("calcite-tabs", { scale: "l" }, h("calcite-tab-nav", { slot: "title-group" }, this.views.map((view, idx) => (h("calcite-tab-title", { key: idx, name: view.name, onCalciteTabsActivate: this.handleTabChange, selected: this.view === view.name, tab: view.name }, this.renderViewName(view))))), this.views.map((vw, idx) => {
        var _a;
        const Comp = vw.component;
        return (h("calcite-tab", { key: idx, name: vw.name, tab: vw.name }, h(Comp, Object.assign({ entity: this.entity, isMobile: this.isMobile, path: (_a = vw.props) === null || _a === void 0 ? void 0 : _a.path }, vw.props))));
      })));
    }
  }
  renderHero() {
    const HeroComp = this.heroComponent;
    const props = {
      showEdit: false
    };
    if (this.mode === 'inline') {
      props.showEdit = true;
    }
    return (h(HeroComp, Object.assign({ entity: this.entity }, props)));
  }
  render() {
    return (this.entity && h(Host, { "data-element": `entity-view-${this.view}` }, h("slot", { name: "breadcrumbs" }), this.renderHero(), h("slot", { name: "about", slot: this._hasAboutSlot ? "about" : "" }), this.renderViews(), h("slot", { name: "footer" })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubEntityView.style = arcgisHubEntityViewCss;

export { ArcgisHubEntityView as arcgis_hub_entity_view };
