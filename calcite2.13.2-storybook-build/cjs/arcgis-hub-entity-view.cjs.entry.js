'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const types = require('./types-c1b201f8.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const Metrics = require('./Metrics-b8657153.js');
const getAssociationStats = require('./getAssociationStats-7c4b8543.js');
const getReferencedEntityIds = require('./getReferencedEntityIds-6e14c8eb.js');
const facets = require('./facets-a1219f8a.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getAssociatedEntitiesQuery = require('./getAssociatedEntitiesQuery-cd1656fc.js');
const hubSearch = require('./hubSearch-79d30702.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
const resizeObserver = require('./resize-observer-4169a5e0.js');
const util = require('./util-38e73510.js');
require('./get-family-cafa88bb.js');
require('./getRequestingEntitiesQuery-f51a983a.js');
require('./get-prop-4bd8fc1a.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
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
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
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
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
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
require('./store-2a385ca0.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');

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
  const type = getTypeFromEntity.getTypeFromEntity(entity);
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
  const metricDisplays = ((_b = (_a = entity === null || entity === void 0 ? void 0 : entity.view) === null || _a === void 0 ? void 0 : _a.metricDisplays) === null || _b === void 0 ? void 0 : _b.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== Metrics.MetricVisibility.hidden)) || [];
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
    const { associated } = await getAssociationStats.getAssociationStats(entity, "project", context);
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
    const haveReferencedEntities = getReferencedEntityIds.getReferencedEntityIds(entity).length > 0;
    // if there are then we need to check if there are any associated entities
    const { associated } = haveReferencedEntities && await getAssociationStats.getAssociationStats(entity, "initiative", context);
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
        facets: [...facets.WELL_KNOWN_FACET_TYPES],
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
  const entityType = getTypeFromEntity.getTypeFromEntity(entity);
  const typeSpecificViewConfigs = await getTypeSpecificViewConfigs(entity, context);
  return typeSpecificViewConfigs
    .filter((def) => def.entities.includes(entityType))
    .filter(def => {
    return def.isVisible
      ? def.isVisible.every(condition => {
        if (typeof condition === "boolean") {
          return condition;
        }
        return checkPermission.checkPermission(condition, context, entity).access;
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
      const query = await getAssociatedEntitiesQuery.getAssociatedEntitiesQuery(entity, associationType.replace(/s$/, ''), context);
      // 2. fetch the entity's associated entities to get the total count to display on the tab
      if (query) {
        const searchOptions = { requestOptions: context.hubRequestOptions };
        const { total } = await hubSearch.hubSearch(query, searchOptions);
        result = total;
      }
    }
    else if (associationType === 'content') {
      // fetch the entity's configured catalog to get the total count to display on the tab
      const catalog = entity.catalog;
      if ((_a = catalog === null || catalog === void 0 ? void 0 : catalog.scopes) === null || _a === void 0 ? void 0 : _a.item) {
        result = await hubSearch.hubSearch(catalog.scopes.item, { requestOptions: context.hubRequestOptions }).then(({ total }) => total);
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
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.view = types.ViewTabs.Overview;
    this.entity = undefined;
    this.path = "";
    this.isMobile = undefined;
    this.mode = 'default';
    this._hasAboutSlot = false;
    this._typeSpecificViews = [];
    context.bind(this, 'handleTabChange', 'handleResize');
  }
  get _context() { return state.getGlobalContext(); }
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
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  connectedCallback() {
    resizeObserver.ResizeObserverManager.addHandler(this.element, this.handleResize);
  }
  disconnectedCallback() {
    resizeObserver.ResizeObserverManager.unobserve(this.element);
  }
  async handleResize() {
    this.isMobile = this.element.clientWidth < 560;
  }
  async componentWillLoad() {
    this._hasAboutSlot = !!this.element.querySelector('[slot="about"]');
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    this.hubTelemetry.emit(Object.assign({ label: util.capitalize(dictTabName) }, (index$1.dist.dictionary.category.navigation.action.onPage.label[dictTabName] || index$1.dist.dictionary.category.navigation.action.onPage)));
  }
  renderViewName(view) {
    // return this.intl.t(view.i18nLabel);
    const i18nKey = (view.contentCount !== undefined) ? `${view.i18nLabel}WithCount` : view.i18nLabel;
    return this.intl.t(i18nKey, { count: view.contentCount });
  }
  renderViews() {
    if (this.hasViews) {
      return (index.h("calcite-tabs", { scale: "l" }, index.h("calcite-tab-nav", { slot: "title-group" }, this.views.map((view, idx) => (index.h("calcite-tab-title", { key: idx, name: view.name, onCalciteTabsActivate: this.handleTabChange, selected: this.view === view.name, tab: view.name }, this.renderViewName(view))))), this.views.map((vw, idx) => {
        var _a;
        const Comp = vw.component;
        return (index.h("calcite-tab", { key: idx, name: vw.name, tab: vw.name }, index.h(Comp, Object.assign({ entity: this.entity, isMobile: this.isMobile, path: (_a = vw.props) === null || _a === void 0 ? void 0 : _a.path }, vw.props))));
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
    return (index.h(HeroComp, Object.assign({ entity: this.entity }, props)));
  }
  render() {
    return (this.entity && index.h(index.Host, { "data-element": `entity-view-${this.view}` }, index.h("slot", { name: "breadcrumbs" }), this.renderHero(), index.h("slot", { name: "about", slot: this._hasAboutSlot ? "about" : "" }), this.renderViews(), index.h("slot", { name: "footer" })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubEntityView.style = arcgisHubEntityViewCss;

exports.arcgis_hub_entity_view = ArcgisHubEntityView;
