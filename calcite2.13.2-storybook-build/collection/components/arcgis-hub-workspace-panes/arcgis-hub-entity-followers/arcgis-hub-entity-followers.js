import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { getGlobalContext, setGlobalContext } from '../../../utils';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import { bind } from '../../../utils/context';
import { checkPermission, cloneObject, getTypeFromEntity, HubGroup, updateHubEntity, setProp, getProp } from '@esri/hub-common';
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
export class ArcgisHubEntityFollowers {
  constructor() {
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
  static get is() { return "arcgis-hub-entity-followers"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-followers.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-followers.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "arcgis hub entity"
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
      "activeTab": {},
      "followersCount": {},
      "newFollowersCount": {},
      "footerSlotEl": {},
      "isUserPickerOpen": {},
      "groupMembersSelected": {},
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
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "init"
      }];
  }
  static get listeners() {
    return [{
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
