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
const resources = require('./resources-42021303.js');
const context = require('./context-0167a31e.js');
const util = require('./util-38e73510.js');
const setProp = require('./set-prop-3de2437f.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const HubGroup = require('./HubGroup-77577f1f.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./deep-set-49b373be.js');
require('./edit-3df37e35.js');
require('./tslib.es6-b6cfa7d7.js');
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
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./getEditorConfig-1d006950.js');
require('./enrichEntity-1632b924.js');

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
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
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
      const _entity = util.cloneObject(this.entity);
      try {
        // 1. refresh the user on context so the user's groups
        // include the new followers group
        await this._context.refreshUser();
        state.setGlobalContext(this._context);
        // 2. add the followers group id to the entity and persist
        // on the backing item
        this.workspacePaneEl.toggleLoading(true, {
          headingRows: 1,
          rows: 3,
          showHeading: true
        });
        setProp.setProp("followersGroupId", group.id, _entity);
        await updateHubEntity.updateHubEntity(this.entityType, _entity, this._context);
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
    context.bind(this, 'handleEditorChanged', 'handleEditorSaved', 'handleTabActivated', 'handleFollowersGroupCreation', 'handlePrimaryTabKeyDown', 'handleDirtyStateModalClosed');
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return state.getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  /**
   * checks whether the current user is a member
   * of the followers group
   */
  get isMember() {
    return checkPermission.checkPermission("hub:site:workspace:followers:member", this._context, this.entity).access;
  }
  /**
   * Checks whether the current user can:
   * 1. create groups (portal:user:createGroup)
   * 2. has < the org limit # of groups
   * 3. can add external members to the group (portal:user:addExternalMembersToGroup)
   */
  get canCreateFollowersGroup() {
    return checkPermission.checkPermission("hub:site:workspace:followers:create", this._context, this.entity).access;
  }
  get followersGroupId() {
    return getProp.getProp(this.entity, "followersGroupId");
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
      return tab.permissions.every(permission => checkPermission.checkPermission(permission, this._context, this.entity).access);
    });
  }
  /**
   * fetch the full followers group - this is needed to
   * construct the picker facets
   */
  async fetchFollowersGroup() {
    this.followersGroup = (await HubGroup.HubGroup.fetch(this.followersGroupId, this._context)).toJson();
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
    return (index.h("calcite-tabs", null, index.h("calcite-tab-nav", { slot: "title-group" }, this.tabConfigurations.map(config => index.h("calcite-tab-title", { key: config.key, onClick: this.handleTabActivated, onKeyDown: this.handlePrimaryTabKeyDown, selected: this.activeTab === config.key, tab: config.key }, config.title))), this.tabConfigurations.map(config => index.h("calcite-tab", { class: "content-tab-container", key: config.key, selected: this.activeTab === config.key, tab: config.key }, config.content))));
  }
  get shouldShowDirtyStateModal() {
    return !!this.attemptedClick;
  }
  renderDirtyStateModal() {
    return this.shouldShowDirtyStateModal
      ? index.h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  handleEntityChange(event) {
    this.isDirty = event.detail.isDirty;
  }
  renderFollowersTab() {
    return (index.h("div", { class: "entity-followers__tab" }, index.h("arcgis-hub-group-members-manager", { groupId: this.followersGroupId, isMobile: this.isMobile, showGalleryFacets: false })));
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
    return (index.h("arcgis-hub-entity-editor", { editorType: `hub:${this.entityType}:followers`, entity: this.entity, footerSlotRef: this.footerSlotEl, include: ["followersGroup.access AS _followers.groupAccess"], onArcgisHubEntityEditorChange: this.handleEditorChanged, onArcgisHubEntityEditorSaved: this.handleEditorSaved, variant: resources.CONFIGURATION_VARIANTS.workspace }));
  }
  /**
   * If a followers group does NOT exist, we
   * render an empty state prompting the user
   * (when allowed) to create a followers group
   */
  renderEmptyState() {
    return (index.h("arcgis-hub-help-state", { icon: "walking", message: this.intl.t('emptyState.message'), slot: "help-state" }, this.canCreateFollowersGroup && index.h("arcgis-hub-new-content", { "button-appearance": "outline-fill", entityConfigs: [{
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
    return (index.h("arcgis-hub-help-state", { icon: "walking", message: this.intl.t('restrictedAccessState.message'), slot: "help-state" }));
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-followers" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, ref: (el) => { this.workspacePaneEl = el; }, stickyFooter: true }, index.h("h1", { slot: "title" }, this.intl.t('followers')), this.followersGroupId
      ? this.isMember ? this.renderTabs() : this.renderRestrictedAccessState()
      : this.renderEmptyState(), this.activeTab === FollowersPaneTabs.SETTINGS &&
      index.h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" })), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
ArcgisHubEntityFollowers.style = arcgisHubEntityFollowersCss;

exports.arcgis_hub_entity_followers = ArcgisHubEntityFollowers;
