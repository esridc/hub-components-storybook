import { h, Host, Fragment } from "@stencil/core";
import intlManager from "../../utils/intl-manager";
import { addGroupMembers, checkPermission, cloneObject, HubGroup, hubSearch } from "@esri/hub-common";
import { getGlobalContext, showNotice } from "../../utils";
import { getMemberGalleryFacets } from "./utils/member-gallery";
import { removeGroupUsers, updateUserMemberships } from "@esri/arcgis-rest-portal";
import { dictionary } from "@esri/telemetry-dictionary-hub";
import { bind } from '../../utils/context';
import { getUserPickerFacets, pickerCatalogDefinition } from "./utils/gallery-picker";
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
export class ArcgisHubGroupMembersManager {
  constructor() {
    this.groupId = undefined;
    this.showGalleryFacets = true;
    this.isMobile = false;
    this.membersCount = undefined;
    this.newMembersCount = undefined;
    this.isUserPickerOpen = false;
    this.group = undefined;
    this.groupMembersSelected = [];
    bind(this, 'handlePickerOpen', 'handlePickerClose', 'handlePickerSelectionUpdate', 'handleGalleryBulkAction', 'handleMemberSelection');
  }
  async componentWillLoad() {
    await this.loadTranslations();
    await this.fetchGroup();
    this.fetchStats();
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  get _context() { return getGlobalContext(); }
  handlePickerOpen() {
    this.isUserPickerOpen = true;
  }
  handlePickerClose() {
    this.isUserPickerOpen = false;
  }
  /** query to fetch the group's members */
  get query() {
    return {
      targetEntity: 'groupMember',
      filters: [
        {
          predicates: [
            {
              group: this.groupId
            }
          ]
        }
      ]
    };
  }
  get canAssignMembers() {
    return checkPermission('hub:group:canAssignMembers', this._context, this.group).access;
  }
  /** Get bulk actions */
  get bulkActions() {
    const bulkActions = {
      actions: [],
    };
    // If we can edit the group...
    if (this.canAssignMembers) {
      // defines if user can make a role change on the group members selected -- Cannot on current user or group owner
      const disableRoleChange = this.groupMembersSelected.includes(this._context.currentUser.username) || this.groupMembersSelected.includes(this.group.owner);
      // Then we can remove members
      bulkActions.actions.push({
        name: 'removeUsers',
        icon: 'user-minus',
        text: this.intl.t('removeUsers.button'),
      });
      // And change member roles
      bulkActions.actions.push({
        text: this.intl.t('changeRole.button'),
        icon: 'user-key',
        disabled: disableRoleChange,
        tooltip: { text: disableRoleChange ? this.intl.t(`changeRole.tooltipText`) : "", label: this.intl.t(`changeRole.tooltipLabel`) },
        children: [
          {
            name: 'changeRole',
            args: {
              role: 'admin'
            },
            text: this.intl.t('changeRole.admin'),
            helperText: this.intl.t('changeRole.adminHelperText'),
          },
          {
            name: 'changeRole',
            args: {
              role: 'member'
            },
            text: this.intl.t('changeRole.member'),
            helperText: this.intl.t('changeRole.memberHelperText'),
          }
        ]
      });
    }
    return bulkActions;
  }
  /**
   * 1. Fetch all members of the group
   * 2. Fetch members of the group who have joined
   * in the last 30 days
   *
   * These counts will get rendered in stat cards
   * above the members gallery
   */
  async fetchStats() {
    const newMembersQuery = cloneObject(this.query);
    const today = new Date().getDate();
    /**
     * extend the base query to members who have
     * joined in the last 30 days
     */
    newMembersQuery.filters[0].predicates[0].joined = {
      type: 'date-range',
      from: (new Date(new Date().setDate(today - 30))).valueOf(),
      to: (new Date()).valueOf()
    };
    const [members, newMembers] = await Promise.all([
      hubSearch(this.query, { requestOptions: this._context.hubRequestOptions }),
      hubSearch(newMembersQuery, { requestOptions: this._context.hubRequestOptions })
    ]);
    this.membersCount = members.total;
    this.newMembersCount = newMembers.total;
  }
  async fetchGroup() {
    this.group = (await HubGroup.fetch(this.groupId, this._context)).toJson();
  }
  /** Build telemetry props for add/remove users */
  buildTelemetryProps(path, failures, successes) {
    return Object.assign(Object.assign({}, path), { response: failures ? 'Failure' : 'Success', count: failures ? failures : successes });
  }
  /**
   * Defines the selected ids/members/arcgis-hub-cards
   * @param event
   */
  handleMemberSelection(event) {
    event.stopPropagation();
    this.groupMembersSelected = event.detail.groupMember;
  }
  async handleGalleryBulkAction(event) {
    // Extract the action and selection from the event
    const { action, selection } = event.detail;
    switch (action.name) {
      // If we are removing users from the group...
      case 'removeUsers':
        this.removeUsersFromGroup(selection);
        break;
      case 'changeRole':
        this.changeRole(selection, action.args.role);
        break;
    }
  }
  async removeUsersFromGroup(selection) {
    var _a, _b;
    // try to remove the users from the group
    try {
      const response = await removeGroupUsers(Object.assign({ id: this.groupId, users: selection }, this._context.userRequestOptions));
      // Refresh the gallery and clear the selection
      (_a = this.memberGallery) === null || _a === void 0 ? void 0 : _a.refresh();
      (_b = this.memberGallery) === null || _b === void 0 ? void 0 : _b.clearSelection();
      // update stats
      this.fetchStats();
      // trigger notification
      showNotice({
        title: response.notRemoved.length ? this.intl.t('removeUsers.error') : this.intl.t('removeUsers.success', { groupName: this.group.name }),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: response.notRemoved.length ? 'danger' : 'success', label: this.intl.t('notice.label') })
      });
      // Telemetry
      const telemetryProps = this.buildTelemetryProps(dictionary.category.groups.action.leave.label.members.details.remove, response.notRemoved.length, selection.length);
      this.hubTelemetry.emit(telemetryProps);
    }
    catch (err) {
      console.error('Something went wrong removing users from the group', err);
      showNotice({
        title: this.intl.t('removeUsers.error'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      // Telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.leave.label.members.details.remove), { response: 'Failure', count: selection.length }));
    }
  }
  async changeRole(selection, role) {
    var _a, _b;
    // try to change the role of the users
    const telemPath = role === 'member' ? 'roleMember' : 'roleManager';
    try {
      const response = await updateUserMemberships(Object.assign({ id: this.groupId, users: selection, newMemberType: role }, this._context.userRequestOptions));
      // Determine if there were errors
      const successesAndFailures = response.results.reduce((acc, result) => {
        if (result.success) {
          acc.successes.push(result.username);
        }
        else {
          acc.failures.push(result.username);
        }
        return acc;
      }, { successes: [], failures: [] });
      // Refresh the gallery and clear the selection
      (_a = this.memberGallery) === null || _a === void 0 ? void 0 : _a.refresh();
      (_b = this.memberGallery) === null || _b === void 0 ? void 0 : _b.clearSelection();
      // if there were failures, trigger an alert/telem
      if (successesAndFailures.failures.length) {
        showNotice({
          title: this.intl.t('changeRole.error'),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // Telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Failed', count: successesAndFailures.failures.length }));
        // Telemetry for successes if there were any
        if (successesAndFailures.successes.length) {
          this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Success', count: successesAndFailures.successes.length }));
        }
      }
      else {
        // trigger notification
        showNotice({
          title: this.intl.t('changeRole.success', { role: this.intl.t(`changeRole.${role}`).toLowerCase() }),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'success', label: this.intl.t('notice.label') })
        });
        // Telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Success', count: selection.length }));
      }
    }
    catch (err) {
      console.error('Something went wrong changing the role of the users', err);
      showNotice({
        title: this.intl.t('changeRole.error'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      // Telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Failed', count: selection.length }));
    }
  }
  async handlePickerSelectionUpdate(event) {
    // Get updated selection from the picker
    const { communityUser } = event.detail;
    // We are try/catching just in case, though if it throws an error something _strange_ happened.
    // We are failSafing the actual calls so a failure should not happen.
    try {
      // Add/invite them. We don't need to remove users from the group because
      // the picker only shows users that are not already in the group
      const response = await addGroupMembers(this.groupId, communityUser, this._context.userRequestOptions, checkPermission('platform:portal:admin:assignToGroups', this._context).access);
      // Trigger the alert
      let message = this.intl.t('addMembers.notifications.invited');
      if (response.added.length) {
        message = this.intl.t('addMembers.notifications.added');
      }
      if (response.notInvited.length) {
        message = this.intl.t('addMembers.notifications.notInvited');
      }
      showNotice({
        title: message,
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: response.notAdded.length && response.notInvited.length ? 'danger' : 'success', label: this.intl.t('notice.label') })
      });
      // Telemetry
      // We are explicitily sending telemetry for each response type
      // As we want that level of granularity in the dashboard
      if (response.notAdded.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.join.label.members.details.add), { response: 'Failure', count: response.notAdded.length }));
      }
      if (response.added.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.join.label.members.details.add), { response: 'Success', count: response.added.length }));
      }
      if (response.notInvited.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.join.label.members.details.invite), { response: 'Failure', count: response.notInvited.length }));
      }
      if (response.invited.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.join.label.members.details.invite), { response: 'Success', count: response.invited.length }));
      }
      // update stats
      this.fetchStats();
    }
    catch (err) {
      console.error('Something went wrong adding users to the group', err);
      showNotice({
        title: this.intl.t('addMembers.notifications.notInvited'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      // Telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.groups.action.join.label.members.details.add), { response: 'Failure', count: communityUser.length }));
    }
  }
  renderStats() {
    return (h("div", { class: "entity-group-members__stats" }, h("arcgis-stat-card", { cardTitle: this.intl.t('stats.total.title'), key: "total", trailingText: this.intl.t('stats.total.trailingText'), value: this.membersCount && this.intl.formatNumber(this.membersCount) }), h("arcgis-stat-card", { cardTitle: this.intl.t('stats.new.title'), key: "new", trailingText: this.intl.t('stats.new.trailingText'), value: this.newMembersCount && this.intl.formatNumber(this.newMembersCount) })));
  }
  renderMembersGallery() {
    return h("arcgis-hub-gallery", { bulkActions: this.bulkActions, "data-test": "members-gallery", facets: getMemberGalleryFacets(this.intl), linkTarget: "siteRelative", mobileView: this.isMobile, onArcgisHubGalleryBulkAction: this.handleGalleryBulkAction, onArcgisHubGallerySelect: this.handleMemberSelection, query: this.query, ref: (el) => { this.memberGallery = el; }, selectionMode: this.canAssignMembers ? 'multiple' : 'none', "show-back-to-top-btn": true, "show-chips": true, "show-facets": this.showGalleryFacets, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, showLayoutSwitcher: !this.isMobile, sortField: 'username', sortOptions: ['username', 'joined', 'memberType'] });
  }
  renderUserPicker() {
    // If The user can edit the group, show the picker
    return h(Fragment, null, h("arcgis-ref-tooltip", { placement: "right", slot: "primary-actions", text: !this.canAssignMembers ? this.intl.t("addMembers.disabledTooltip") : "" }, h("calcite-button", { appearance: "solid", onClick: this.handlePickerOpen, round: true }, this.intl.t('addMembers.button'))), this.isUserPickerOpen &&
      h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: [pickerCatalogDefinition], "data-test": "members-gallery-picker", facets: getUserPickerFacets(this.group, this._context, this.intl), linkTarget: "siteRelative", modalTitle: this.intl.t('addMembers.modal.title'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, open: this.isUserPickerOpen, showBadges: false, showSearch: true, showThumbnail: true, sortField: 'username', sortOptions: ['username', 'joined'] })));
  }
  render() {
    return (h(Host, { "data-element": "arcgis-hub-group-members-manager" }, h("div", { class: "group-members-manager" }, this.canAssignMembers && this.renderUserPicker(), this.renderStats(), this.renderMembersGallery())));
  }
  static get is() { return "arcgis-hub-group-members-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-group-members-manager.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-group-members-manager.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "groupId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Group ID of the group we are managing members"
        },
        "attribute": "group-id",
        "reflect": false
      },
      "showGalleryFacets": {
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
          "text": "Should the group members gallery show facets or not"
        },
        "attribute": "show-gallery-facets",
        "reflect": false,
        "defaultValue": "true"
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
      "membersCount": {},
      "newMembersCount": {},
      "isUserPickerOpen": {},
      "group": {},
      "groupMembersSelected": {}
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
      }];
  }
  static get elementRef() { return "el"; }
}
