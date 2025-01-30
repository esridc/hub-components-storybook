var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { checkPermission, getProp } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { bind } from '../../../utils/context';
import { ContentPaneTabs } from './types';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getEntityCatalogGroupIds } from '../../../utils/workspace/getEntityCatalogGroupIds';
import { getGlobalContext } from '../../../utils/state';
import Memoize from '../../../decorators/memoize';
// ============================================================================
// NOTE: DO NOT USE THIS COMPONENT WITH ANYTHING OTHER THAN A SITE
// This component takes into account the not-completely migrated
// Site Catalog, and will not work with other entities which have fully
// developed Catalogs.
// ============================================================================
export class ArcgisHubEntityContent {
  constructor() {
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
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
  static get is() { return "arcgis-hub-entity-content"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-content.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-content.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntityWithCatalog",
          "resolved": "IHubDiscussion & IWithCatalog | IHubEvent & IWithCatalog | IHubGroup & IWithCatalog | IHubInitiative & IWithCatalog | IHubPage & IWithCatalog | IHubProject & IWithCatalog | IHubSite & IWithCatalog | IHubSurvey & IWithCatalog | IHubTemplate & IWithCatalog | IHubUser & IWithCatalog",
          "references": {
            "HubEntityWithCatalog": {
              "location": "import",
              "path": "./types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "isMobile": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "selectedPrimaryTab": {},
      "footerSlotElement": {},
      "isDirty": {},
      "attemptedClick": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubEntityContentTabChangeRequest",
        "method": "handleTabChangeRequest",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceDirtyStateModalClosed",
        "method": "handleDirtyStateModalClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubWorkspaceEntityChange",
        "method": "handleEntityChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize('selectedPrimaryTab')
], ArcgisHubEntityContent.prototype, "currentTabConfiguration", null);
