import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { C as ContentPaneTabs, g as getEntityCatalogGroupIds } from './getEntityCatalogGroupIds-e68c9867.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './HubInitiatives-4f4e24ce.js';
import './util-3e6872d9.js';
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
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';

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
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.selectedPrimaryTab = ContentPaneTabs.CATALOG;
    this.footerSlotElement = undefined;
    this.isDirty = false;
    this.attemptedClick = undefined;
    bind(this, 'handlePrimaryTabSelect', 'handlePrimaryTabKeyDown', 'setFooterSlotElement', 'openCatalogConfigTab', 'handleEntityChange', 'handleDirtyStateModalClosed', 'renderCatalogTab', 'renderCatalogConfigTab', 'renderCollectionsTab', 'renderFeedsTab', 'renderCatalogConfigSidePanel', 'renderCatalogSidePanel');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get tabConfigurations() {
    // NOTE: Make sure to add any new render functions to the list in `this.bind(...)`,
    // otherwise the render functions won't have access to the correct `this` context.
    const result = [
      {
        title: this.intl.t('tabs.catalog'),
        key: ContentPaneTabs.CATALOG,
        contentRender: this.renderCatalogTab,
        sidePanelRender: this.renderCatalogSidePanel,
      },
      {
        title: this.intl.t('tabs.catalogConfig'),
        key: ContentPaneTabs.CATALOG_CONFIG,
        contentRender: this.renderCatalogConfigTab,
        sidePanelRender: this.renderCatalogConfigSidePanel,
      },
      {
        title: this.intl.t('tabs.collections'),
        key: ContentPaneTabs.COLLECTIONS,
        contentRender: this.renderCollectionsTab,
        needsFooter: true
      },
    ];
    if (checkPermission('hub:site:workspace:feeds', getGlobalContext(), this.entity).access) {
      result.push({
        title: this.intl.t('tabs.feeds'),
        key: ContentPaneTabs.FEEDS,
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
      case ContentPaneTabs.CATALOG_CONFIG:
        this.openCatalogConfigTab();
        break;
      default:
        this.selectedPrimaryTab = event.detail;
    }
  }
  openCatalogConfigTab() {
    const context = getGlobalContext();
    // send telemetry using new dictionary options
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
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
    this.selectedPrimaryTab = ContentPaneTabs.CATALOG_CONFIG;
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
    const isCatalogValid = !!getProp(this.entity, 'catalog.scopes.item');
    return isCatalogValid &&
      h("arcgis-hub-entity-content-catalog", { entity: this.entity, isMobile: this.isMobile });
  }
  renderCatalogSidePanel() {
    const i18nScope = 'sidePanels.catalog.catalogNotice';
    const groupLength = getEntityCatalogGroupIds(this.entity).length === 0;
    if (groupLength) {
      return (h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`)), h("calcite-link", { onClick: this.openCatalogConfigTab, slot: "link" }, this.intl.t(`${i18nScope}.link`))));
    }
  }
  renderCatalogConfigTab() {
    const isCatalogValid = !!getProp(this.entity, 'catalog.scopes.item');
    return isCatalogValid &&
      h("arcgis-hub-entity-content-catalog-config", { entity: this.entity });
  }
  renderCatalogConfigSidePanel() {
    const i18nScope = 'sidePanels.catalogConfig.configureCatalogNotice';
    return (h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`)), h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/content-basics.htm", iconEnd: "launch", slot: "link" }, this.intl.t(`${i18nScope}.link`))));
  }
  renderCollectionsTab() {
    const hasCollections = !!getProp(this.entity, 'catalog.collections.length');
    return hasCollections &&
      h("arcgis-hub-entity-content-collections", { entity: this.entity, footerSlotRef: this.footerSlotElement });
  }
  renderFeedsTab() {
    return (h("arcgis-hub-entity-content-feeds", {
      // NOTE: At this point, only sites have feeds and this tab is only shown if the entity is a site
      entity: this.entity, footerSlotRef: this.footerSlotElement
    }));
  }
  renderTabs() {
    const tabConfigurations = this.tabConfigurations;
    return h("calcite-tabs", null, h("calcite-tab-nav", { slot: "title-group" }, tabConfigurations.map(config => h("calcite-tab-title", { "data-test": "entity-content-tab", key: config.key, onClick: this.handlePrimaryTabSelect, onKeyDown: this.handlePrimaryTabKeyDown, selected: this.selectedPrimaryTab === config.key, tab: config.key }, config.title))), tabConfigurations.map(config => h("calcite-tab", { class: "content-tab-container", key: config.key, selected: this.selectedPrimaryTab === config.key, tab: config.key }, this.selectedPrimaryTab === config.key && config.contentRender())));
  }
  renderSidePanel() {
    const renderFn = this.currentTabConfiguration.sidePanelRender;
    // NOTE: we need the `key` here to ensure the side panel is re-rendered
    // correctly when the tab changes. See b/10501 and b/10514 for more details.
    return renderFn && h("div", { key: "side-panel-container", slot: "side-panel" }, renderFn());
  }
  renderFooter() {
    if (this.currentTabConfiguration.needsFooter) {
      // NOTE: we need the `key` here to ensure the footer is re-rendered
      // correctly when the tab changes. See b/10501 and b/10514 for more details.
      return (h("div", { class: "footer-container", key: "footer-container", ref: this.setFooterSlotElement, slot: "footer" }));
    }
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  renderDirtyStateModal() {
    return this.shouldShowDirtyStateModal
      ? h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  render() {
    return (h(Host, { "data-element": "entity-content" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, "sticky-footer": true }, h("h1", { slot: "title" }, this.intl.t('content')), this.renderTabs(), this.renderSidePanel(), this.renderFooter()), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('selectedPrimaryTab')
], ArcgisHubEntityContent.prototype, "currentTabConfiguration", null);
ArcgisHubEntityContent.style = arcgisHubEntityContentCss;

export { ArcgisHubEntityContent as arcgis_hub_entity_content };
