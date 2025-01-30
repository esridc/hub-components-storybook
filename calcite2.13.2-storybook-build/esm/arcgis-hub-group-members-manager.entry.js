import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { b as bind } from './context-7d8f7366.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { H as HubGroup } from './HubGroup-9aed80ee.js';
import { r as removeGroupUsers, u as updateUserMemberships } from './update-user-membership-261681cf.js';
import { a as addGroupMembers } from './addGroupMembers-7d588ca7.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
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
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
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
import './getEditorConfig-a89f031d.js';
import './_deep-map-values-53f8dbd1.js';
import './enrichEntity-a5bc0b4f.js';

function getMemberGalleryFacets(intl) {
  return [
    {
      label: intl.t("facets.role.label"),
      key: 'access',
      display: 'single-select',
      field: 'access',
      options: [
        {
          label: intl.t("facets.role.all"),
          key: "all",
          selected: true,
          predicates: [],
        },
        {
          label: intl.t("facets.role.manager"),
          key: "admin",
          selected: false,
          predicates: [{
              memberType: "admin",
            }],
        },
        {
          label: intl.t("facets.role.member"),
          key: "member",
          selected: false,
          predicates: [{
              memberType: "member",
            }],
        }
      ],
      operation: 'OR',
    },
    {
      label: intl.t("facets.dateJoined.label"),
      key: 'joined',
      display: 'date-range',
      state: 'open',
      field: 'joined',
      max: new Date(),
    },
  ];
}

const pickerCatalogDefinition = {
  schemaVersion: 1,
  scopes: {
    communityUser: {
      targetEntity: 'communityUser',
      filters: [
        {
          predicates: [{ q: "*" }]
        }
      ]
    },
  },
  collections: [
    {
      key: 'user',
      label: 'Users',
      scope: {
        targetEntity: 'communityUser',
        filters: [
          {
            predicates: [{ q: "*" }]
          }
        ]
      },
      targetEntity: 'communityUser',
    }
  ]
};
function getUserPickerFacets(group, context, intl, i18nScope = "") {
  var _a, _b;
  // Get trusted orgs that aren't the current user's org or the community org
  const trustedOrgIds = context.trustedOrgIds && (context === null || context === void 0 ? void 0 : context.trustedOrgIds.filter(orgId => {
    var _a;
    return orgId !== ((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.orgId) && orgId !== (context === null || context === void 0 ? void 0 : context.communityOrgId);
  }));
  // Add My org facet
  const facet = {
    label: "From",
    key: 'from',
    display: 'single-select',
    operation: 'AND',
    options: [
      {
        label: intl.t(`${i18nScope}addMembers.modal.org`),
        key: 'org',
        selected: true,
        predicates: [
          {
            orgid: (_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.orgId
          },
          {
            group: {
              not: group === null || group === void 0 ? void 0 : group.id
            }
          }
        ]
      }
    ]
  };
  // Add My community facet if the group does not have a membership access of organization
  // AND there is a community org id
  if ((group === null || group === void 0 ? void 0 : group.membershipAccess) && (group === null || group === void 0 ? void 0 : group.membershipAccess) !== 'organization'
    && (context === null || context === void 0 ? void 0 : context.communityOrgId)) {
    facet.options.push({
      label: intl.t(`${i18nScope}addMembers.modal.community`),
      key: 'community',
      selected: false,
      predicates: [
        {
          orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
          searchUserAccess: 'includeTrustedOrgs'
        },
        {
          group: {
            not: group === null || group === void 0 ? void 0 : group.id
          }
        }
      ]
    });
  }
  // Add a My partners facet if the group does not have a membership access of organization
  // AND there are trusted orgs
  // AND the user has 'portal:admin:assignToGroups' AND 'portal:user:invitePartneredCollaborationMembers' OR 'portal:user:addExternalMembersToGroup'
  if ((group === null || group === void 0 ? void 0 : group.membershipAccess) && (group === null || group === void 0 ? void 0 : group.membershipAccess) !== 'organization'
    && (trustedOrgIds === null || trustedOrgIds === void 0 ? void 0 : trustedOrgIds.length) > 0
    && checkPermission('platform:portal:admin:assignToGroups', context).access
    && (checkPermission('platform:portal:user:invitePartneredCollaborationMembers', context).access || checkPermission('platform:portal:user:addExternalMembersToGroup', context).access)) {
    facet.options.push({
      label: intl.t(`${i18nScope}addMembers.modal.partner`),
      key: 'partners',
      selected: false,
      predicates: [
        {
          orgid: trustedOrgIds,
          searchUserAccess: 'includeTrustedOrgs'
        },
        {
          group: {
            not: group === null || group === void 0 ? void 0 : group.id
          }
        }
      ]
    });
  }
  // Add a World facet if the group has a membership access of anyone
  // and it is not a shared update group
  if ((group === null || group === void 0 ? void 0 : group.membershipAccess) && (group === null || group === void 0 ? void 0 : group.membershipAccess) === 'anyone'
    && !(group === null || group === void 0 ? void 0 : group.isSharedUpdate)) {
    facet.options.push({
      label: intl.t(`${i18nScope}addMembers.modal.world`),
      key: 'world',
      selected: false,
      predicates: [
        {
          // This generates a query that looks like: (orgid: [0 TO \\{])
          // Which means "Only show users in orgs, do not show public users"
          // It is platform crazy sauce.
          orgid: { type: 'range', from: "0", to: "\\{" }
        },
        {
          orgid: {
            not: [(_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.orgId, context === null || context === void 0 ? void 0 : context.communityOrgId]
          }
        },
        {
          group: {
            not: group === null || group === void 0 ? void 0 : group.id
          }
        }
      ]
    });
  }
  return [facet];
}

const arcgisHubGroupMembersManagerCss = ":host{display:block;height:100%}.group-members-manager{display:flex;flex-direction:column;gap:2rem}.entity-group-members__stats{display:flex;width:100%;gap:1rem}.entity-group-members__stats arcgis-stat-card{width:50%}arcgis-ref-tooltip{width:-moz-fit-content;width:fit-content}";

const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
const ArcgisHubGroupMembersManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
      const telemetryProps = this.buildTelemetryProps(dist.dictionary.category.groups.action.leave.label.members.details.remove, response.notRemoved.length, selection.length);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.leave.label.members.details.remove), { response: 'Failure', count: selection.length }));
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Failed', count: successesAndFailures.failures.length }));
        // Telemetry for successes if there were any
        if (successesAndFailures.successes.length) {
          this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Success', count: successesAndFailures.successes.length }));
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Success', count: selection.length }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Failed', count: selection.length }));
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.join.label.members.details.add), { response: 'Failure', count: response.notAdded.length }));
      }
      if (response.added.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.join.label.members.details.add), { response: 'Success', count: response.added.length }));
      }
      if (response.notInvited.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.join.label.members.details.invite), { response: 'Failure', count: response.notInvited.length }));
      }
      if (response.invited.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.join.label.members.details.invite), { response: 'Success', count: response.invited.length }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.groups.action.join.label.members.details.add), { response: 'Failure', count: communityUser.length }));
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
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
};
ArcgisHubGroupMembersManager.style = arcgisHubGroupMembersManagerCss;

export { ArcgisHubGroupMembersManager as arcgis_hub_group_members_manager };
