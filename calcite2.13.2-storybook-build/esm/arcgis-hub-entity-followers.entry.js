import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { s as setGlobalContext, g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { b as bind } from './context-7d8f7366.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { H as HubGroup } from './HubGroup-9aed80ee.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './deep-set-67281c6f.js';
import './edit-237c0a70.js';
import './tslib.es6-9c17e83a.js';
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
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './getEditorConfig-a89f031d.js';
import './enrichEntity-a5bc0b4f.js';

const arcgisHubEntityFollowersCss = ":host{display:block;height:100%}arcgis-hub-workspace-pane{--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}.entity-followers__tab{display:flex;flex-direction:column;gap:2rem}calcite-tabs{height:-moz-fit-content;height:fit-content;width:100%;gap:0px}";

/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
var FollowersPaneTabs;
(function (FollowersPaneTabs) {
  FollowersPaneTabs["FOLLOWERS"] = "Followers";
  FollowersPaneTabs["SETTINGS"] = "Followers Settings";
})(FollowersPaneTabs || (FollowersPaneTabs = {}));
const ArcgisHubEntityFollowers = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.handleTabActivated = (evt) => {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      const target = evt.target;
      if (this.isDirty) {
        this.attemptedClick = { tab: target.tab, clickEvent: evt };
        return;
      }
      else {
        this.activeTab = evt.target.tab;
        this.hubTelemetry.emit({
          category: 'Navigation',
          action: 'Manage',
          label: this.activeTab
        });
      }
    };
    /** handle new follower group creation */
    this.handleFollowersGroupCreation = async (evt) => {
      const group = evt.detail;
      const _entity = cloneObject(this.entity);
      try {
        // 1. refresh the user on context so the user's groups
        // include the new followers group
        await this._context.refreshUser();
        setGlobalContext(this._context);
        // 2. add the followers group id to the entity and persist
        // on the backing item
        this.workspacePaneEl.toggleLoading(true, {
          headingRows: 1,
          rows: 3,
          showHeading: true
        });
        setProp("followersGroupId", group.id, _entity);
        await updateHubEntity(this.entityType, _entity, this._context);
        // 3. emit a save event. This is re-emitted from the core
        // arcgis-hub-workspace component, and notifies the
        // consuming route to re-fetch the underlying entity.
        // The updated entity gets passed back down and triggers
        // a re-render
        this.arcgisHubWorkspaceEntityChange.emit({ entity: _entity, isDirty: false });
      }
      catch (error) {
        console.error(`There was an error creating a followers group: ${error}`);
        this.arcgisHubWorkspaceEntityChange.emit({ entity: _entity, isDirty: true });
      }
      finally {
        this.workspacePaneEl.toggleLoading(false);
      }
    };
    this.entity = undefined;
    this.isMobile = false;
    this.activeTab = FollowersPaneTabs.FOLLOWERS;
    this.followersCount = undefined;
    this.newFollowersCount = undefined;
    this.footerSlotEl = undefined;
    this.isUserPickerOpen = false;
    this.groupMembersSelected = [];
    this.isDirty = false;
    this.attemptedClick = undefined;
    bind(this, 'handleEditorChanged', 'handleEditorSaved', 'handleTabActivated', 'handleFollowersGroupCreation', 'handlePrimaryTabKeyDown', 'handleDirtyStateModalClosed');
  }
  /**
   * Async work to fetch the full followers group
   * (for facet purposes) and follower group stats. This
   * is called when the component loads and any time the
   * underlying entity is updated
   */
  async init() {
    await this.fetchFollowersGroup();
  }
  async componentWillLoad() {
    await this.loadTranslations();
    if (this.followersGroupId) {
      this.init();
    }
  }
  /**
 * Loads translations
 */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  /**
   * checks whether the current user is a member
   * of the followers group
   */
  get isMember() {
    return checkPermission("hub:site:workspace:followers:member", this._context, this.entity).access;
  }
  /**
   * Checks whether the current user can:
   * 1. create groups (portal:user:createGroup)
   * 2. has < the org limit # of groups
   * 3. can add external members to the group (portal:user:addExternalMembersToGroup)
   */
  get canCreateFollowersGroup() {
    return checkPermission("hub:site:workspace:followers:create", this._context, this.entity).access;
  }
  get followersGroupId() {
    return getProp(this.entity, "followersGroupId");
  }
  get tabConfigurations() {
    return [
      {
        title: this.intl.t('tabs.followers'),
        key: FollowersPaneTabs.FOLLOWERS,
        permissions: ["hub:site:workspace:followers:member"],
        content: this.renderFollowersTab()
      },
      {
        title: this.intl.t('tabs.settings'),
        key: FollowersPaneTabs.SETTINGS,
        permissions: ["hub:site:workspace:followers:manager"],
        content: this.renderSettingsTab()
      }
    ].filter(tab => {
      return tab.permissions.every(permission => checkPermission(permission, this._context, this.entity).access);
    });
  }
  /**
   * fetch the full followers group - this is needed to
   * construct the picker facets
   */
  async fetchFollowersGroup() {
    this.followersGroup = (await HubGroup.fetch(this.followersGroupId, this._context)).toJson();
  }
  handlePrimaryTabKeyDown(evt) {
    switch (evt.key) {
      case ' ':
      case 'Enter':
        this.handleTabActivated(evt);
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
      this.activeTab = this.attemptedClick.tab;
      // close the dirty state modal
      this.attemptedClick = null;
    }
  }
  renderTabs() {
    return (h("calcite-tabs", null, h("calcite-tab-nav", { slot: "title-group" }, this.tabConfigurations.map(config => h("calcite-tab-title", { key: config.key, onClick: this.handleTabActivated, onKeyDown: this.handlePrimaryTabKeyDown, selected: this.activeTab === config.key, tab: config.key }, config.title))), this.tabConfigurations.map(config => h("calcite-tab", { class: "content-tab-container", key: config.key, selected: this.activeTab === config.key, tab: config.key }, config.content))));
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  renderDirtyStateModal() {
    return this.shouldShowDirtyStateModal
      ? h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  handleEntityChange(event) {
    this.isDirty = event.detail.isDirty;
  }
  renderFollowersTab() {
    return (h("div", { class: "entity-followers__tab" }, h("arcgis-hub-group-members-manager", { groupId: this.followersGroupId, isMobile: this.isMobile, showGalleryFacets: false })));
  }
  handleEditorChanged(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true,
    });
  }
  handleEditorSaved(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.entity,
      isDirty: !event.detail.isSuccess,
    });
  }
  renderSettingsTab() {
    return (h("arcgis-hub-entity-editor", { editorType: `hub:${this.entityType}:followers`, entity: this.entity, footerSlotRef: this.footerSlotEl, include: ["followersGroup.access AS _followers.groupAccess"], onArcgisHubEntityEditorChange: this.handleEditorChanged, onArcgisHubEntityEditorSaved: this.handleEditorSaved, variant: CONFIGURATION_VARIANTS.workspace }));
  }
  /**
   * If a followers group does NOT exist, we
   * render an empty state prompting the user
   * (when allowed) to create a followers group
   */
  renderEmptyState() {
    return (h("arcgis-hub-help-state", { icon: "walking", message: this.intl.t('emptyState.message'), slot: "help-state" }, this.canCreateFollowersGroup && h("arcgis-hub-new-content", { "button-appearance": "outline-fill", entityConfigs: [{
          key: 'group',
          editorType: "hub:group:create:followers",
          label: this.intl.t('emptyState.action'),
          description: this.intl.t('createFollowersGroup.formDescription'),
          defaults: {
            name: `${this.entity.name} ${this.intl.t("followers")}`,
            summary: this.intl.t("createFollowersGroup.defaultSummary"),
            access: "public",
            isViewOnly: true,
            autoJoin: true
          }
        }], onArcgisHubNewContentSuccess: this.handleFollowersGroupCreation, slot: "actions" })));
  }
  /**
   * If a followers group exists, but the current
   * user is not a member of the group, we render
   * a restricted access state
   */
  renderRestrictedAccessState() {
    return (h("arcgis-hub-help-state", { icon: "walking", message: this.intl.t('restrictedAccessState.message'), slot: "help-state" }));
  }
  render() {
    return (h(Host, { "data-element": "entity-followers" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, ref: (el) => { this.workspacePaneEl = el; }, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('followers')), this.followersGroupId
      ? this.isMember ? this.renderTabs() : this.renderRestrictedAccessState()
      : this.renderEmptyState(), this.activeTab === FollowersPaneTabs.SETTINGS &&
      h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" })), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubEntityFollowers.style = arcgisHubEntityFollowersCss;

export { ArcgisHubEntityFollowers as arcgis_hub_entity_followers };
