'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const getEntityCatalogGroupIds = require('./getEntityCatalogGroupIds-bed10ce2.js');
const index$1 = require('./index-6f16fe65.js');
const state = require('./state-6637df8c.js');
const memoize = require('./memoize-1f967971.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./HubInitiatives-25ecf40a.js');
require('./util-38e73510.js');
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
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');

const arcgisHubEntityContentCss = ".sc-arcgis-hub-entity-content-h{display:block;height:100%}.content-tab-container.sc-arcgis-hub-entity-content{overflow:hidden}[slot=\"title\"].sc-arcgis-hub-entity-content{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}calcite-tabs.sc-arcgis-hub-entity-content{display:block;width:100%}calcite-tab.sc-arcgis-hub-entity-content{padding:0px;padding-left:0.25rem;padding-right:0.25rem}calcite-notice.sc-arcgis-hub-entity-content [slot=\"title\"].sc-arcgis-hub-entity-content{font-size:var(--calcite-font-size-0);line-height:1.25rem}.footer-container.sc-arcgis-hub-entity-content{display:flex;height:2rem;align-items:center;justify-content:flex-end}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubEntityContent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.selectedPrimaryTab = getEntityCatalogGroupIds.ContentPaneTabs.CATALOG;
    this.footerSlotElement = undefined;
    this.isDirty = false;
    this.attemptedClick = undefined;
    context.bind(this, 'handlePrimaryTabSelect', 'handlePrimaryTabKeyDown', 'setFooterSlotElement', 'openCatalogConfigTab', 'handleEntityChange', 'handleDirtyStateModalClosed', 'renderCatalogTab', 'renderCatalogConfigTab', 'renderCollectionsTab', 'renderFeedsTab', 'renderCatalogConfigSidePanel', 'renderCatalogSidePanel');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get tabConfigurations() {
    // NOTE: Make sure to add any new render functions to the list in `this.bind(...)`,
    // otherwise the render functions won't have access to the correct `this` context.
    const result = [
      {
        title: this.intl.t('tabs.catalog'),
        key: getEntityCatalogGroupIds.ContentPaneTabs.CATALOG,
        contentRender: this.renderCatalogTab,
        sidePanelRender: this.renderCatalogSidePanel,
      },
      {
        title: this.intl.t('tabs.catalogConfig'),
        key: getEntityCatalogGroupIds.ContentPaneTabs.CATALOG_CONFIG,
        contentRender: this.renderCatalogConfigTab,
        sidePanelRender: this.renderCatalogConfigSidePanel,
      },
      {
        title: this.intl.t('tabs.collections'),
        key: getEntityCatalogGroupIds.ContentPaneTabs.COLLECTIONS,
        contentRender: this.renderCollectionsTab,
        needsFooter: true
      },
    ];
    if (checkPermission.checkPermission('hub:site:workspace:feeds', state.getGlobalContext(), this.entity).access) {
      result.push({
        title: this.intl.t('tabs.feeds'),
        key: getEntityCatalogGroupIds.ContentPaneTabs.FEEDS,
        contentRender: this.renderFeedsTab,
        needsFooter: true
      });
    }
    return result;
  }
  get currentTabConfiguration() {
    return this.tabConfigurations.find(tab => tab.key === this.selectedPrimaryTab);
  }
  /**
   * Child tabs will emit this event when they want to change the primary tab
   *
   * ex: when a user clicks a link that isn't necessarily a tab, but should change the tab
   */
  handleTabChangeRequest(event) {
    switch (event.detail) {
      case getEntityCatalogGroupIds.ContentPaneTabs.CATALOG_CONFIG:
        this.openCatalogConfigTab();
        break;
      default:
        this.selectedPrimaryTab = event.detail;
    }
  }
  openCatalogConfigTab() {
    const context = state.getGlobalContext();
    // send telemetry using new dictionary options
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.navigation
      .action.manage
      .label.catalogConfiguration
      .details.configureEmptyCatalog), {
      // TODO: from Caleb -- I don't know that we'll be able to get the "contentOrgId" within workspaces.
      // The context.communityOrgId is actually a different value entirely. We used to have a wrapper
      // in ember that would stab the contentOrgId onto all telemetry events. It may need to be ported
      // over to workspaces in a follow-on PR by platform.
      contentOrgId: context.communityOrgId
    }));
    // send user to Catalog Configuration tab
    this.selectedPrimaryTab = getEntityCatalogGroupIds.ContentPaneTabs.CATALOG_CONFIG;
  }
  handlePrimaryTabSelect(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    if (this.isDirty) {
      this.attemptedClick = { tab: evt.target.tab, clickEvent: evt };
      return;
    }
    else {
      this.selectedPrimaryTab = evt.target.tab;
      this.hubTelemetry.emit({
        category: 'Navigation',
        action: 'Manage',
        label: this.selectedPrimaryTab
      });
    }
  }
  handlePrimaryTabKeyDown(evt) {
    switch (evt.key) {
      case ' ':
      case 'Enter':
        this.handlePrimaryTabSelect(evt);
        return;
    }
  }
  handleDirtyStateModalClosed(event) {
    // true === they clicked cancel
    // false === they clicked okay
    if (event.detail) {
      this.attemptedClick = null;
    }
    else {
      // user is OK w/ navigating away and losing changes
      // clear the dirty state
      this.isDirty = false;
      // change the tab
      this.selectedPrimaryTab = this.attemptedClick.tab;
      // close the dirty state modal
      this.attemptedClick = null;
    }
  }
  handleEntityChange(event) {
    this.isDirty = event.detail.isDirty;
  }
  setFooterSlotElement(el) {
    this.footerSlotElement = el;
  }
  renderCatalogTab() {
    const isCatalogValid = !!getProp.getProp(this.entity, 'catalog.scopes.item');
    return isCatalogValid &&
      index.h("arcgis-hub-entity-content-catalog", { entity: this.entity, isMobile: this.isMobile });
  }
  renderCatalogSidePanel() {
    const i18nScope = 'sidePanels.catalog.catalogNotice';
    const groupLength = getEntityCatalogGroupIds.getEntityCatalogGroupIds(this.entity).length === 0;
    if (groupLength) {
      return (index.h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, index.h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), index.h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`)), index.h("calcite-link", { onClick: this.openCatalogConfigTab, slot: "link" }, this.intl.t(`${i18nScope}.link`))));
    }
  }
  renderCatalogConfigTab() {
    const isCatalogValid = !!getProp.getProp(this.entity, 'catalog.scopes.item');
    return isCatalogValid &&
      index.h("arcgis-hub-entity-content-catalog-config", { entity: this.entity });
  }
  renderCatalogConfigSidePanel() {
    const i18nScope = 'sidePanels.catalogConfig.configureCatalogNotice';
    return (index.h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, index.h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), index.h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`)), index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/content-basics.htm", iconEnd: "launch", slot: "link" }, this.intl.t(`${i18nScope}.link`))));
  }
  renderCollectionsTab() {
    const hasCollections = !!getProp.getProp(this.entity, 'catalog.collections.length');
    return hasCollections &&
      index.h("arcgis-hub-entity-content-collections", { entity: this.entity, footerSlotRef: this.footerSlotElement });
  }
  renderFeedsTab() {
    return (index.h("arcgis-hub-entity-content-feeds", {
      // NOTE: At this point, only sites have feeds and this tab is only shown if the entity is a site
      entity: this.entity, footerSlotRef: this.footerSlotElement
    }));
  }
  renderTabs() {
    const tabConfigurations = this.tabConfigurations;
    return index.h("calcite-tabs", null, index.h("calcite-tab-nav", { slot: "title-group" }, tabConfigurations.map(config => index.h("calcite-tab-title", { "data-test": "entity-content-tab", key: config.key, onClick: this.handlePrimaryTabSelect, onKeyDown: this.handlePrimaryTabKeyDown, selected: this.selectedPrimaryTab === config.key, tab: config.key }, config.title))), tabConfigurations.map(config => index.h("calcite-tab", { class: "content-tab-container", key: config.key, selected: this.selectedPrimaryTab === config.key, tab: config.key }, this.selectedPrimaryTab === config.key && config.contentRender())));
  }
  renderSidePanel() {
    const renderFn = this.currentTabConfiguration.sidePanelRender;
    // NOTE: we need the `key` here to ensure the side panel is re-rendered
    // correctly when the tab changes. See b/10501 and b/10514 for more details.
    return renderFn && index.h("div", { key: "side-panel-container", slot: "side-panel" }, renderFn());
  }
  renderFooter() {
    if (this.currentTabConfiguration.needsFooter) {
      // NOTE: we need the `key` here to ensure the footer is re-rendered
      // correctly when the tab changes. See b/10501 and b/10514 for more details.
      return (index.h("div", { class: "footer-container", key: "footer-container", ref: this.setFooterSlotElement, slot: "footer" }));
    }
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  renderDirtyStateModal() {
    return this.shouldShowDirtyStateModal
      ? index.h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-content" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, index.h("h1", { slot: "title" }, this.intl.t('content')), this.renderTabs(), this.renderSidePanel(), this.renderFooter()), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('selectedPrimaryTab')
], ArcgisHubEntityContent.prototype, "currentTabConfiguration", null);
ArcgisHubEntityContent.style = arcgisHubEntityContentCss;

exports.arcgis_hub_entity_content = ArcgisHubEntityContent;
