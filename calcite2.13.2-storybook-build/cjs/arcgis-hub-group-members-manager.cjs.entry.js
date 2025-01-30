'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const context = require('./context-0167a31e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const util = require('./util-38e73510.js');
const hubSearch = require('./hubSearch-79d30702.js');
const HubGroup = require('./HubGroup-77577f1f.js');
const updateUserMembership = require('./update-user-membership-4af88c1c.js');
const addGroupMembers = require('./addGroupMembers-9652622a.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
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
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
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
require('./getEditorConfig-1d006950.js');
require('./_deep-map-values-d489006b.js');
require('./enrichEntity-1632b924.js');

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
    && checkPermission.checkPermission('platform:portal:admin:assignToGroups', context).access
    && (checkPermission.checkPermission('platform:portal:user:invitePartneredCollaborationMembers', context).access || checkPermission.checkPermission('platform:portal:user:addExternalMembersToGroup', context).access)) {
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
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.groupId = undefined;
    this.showGalleryFacets = true;
    this.isMobile = false;
    this.membersCount = undefined;
    this.newMembersCount = undefined;
    this.isUserPickerOpen = false;
    this.group = undefined;
    this.groupMembersSelected = [];
    context.bind(this, 'handlePickerOpen', 'handlePickerClose', 'handlePickerSelectionUpdate', 'handleGalleryBulkAction', 'handleMemberSelection');
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
  }
  get _context() { return state.getGlobalContext(); }
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
    return checkPermission.checkPermission('hub:group:canAssignMembers', this._context, this.group).access;
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
    const newMembersQuery = util.cloneObject(this.query);
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
      hubSearch.hubSearch(this.query, { requestOptions: this._context.hubRequestOptions }),
      hubSearch.hubSearch(newMembersQuery, { requestOptions: this._context.hubRequestOptions })
    ]);
    this.membersCount = members.total;
    this.newMembersCount = newMembers.total;
  }
  async fetchGroup() {
    this.group = (await HubGroup.HubGroup.fetch(this.groupId, this._context)).toJson();
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
      const response = await updateUserMembership.removeGroupUsers(Object.assign({ id: this.groupId, users: selection }, this._context.userRequestOptions));
      // Refresh the gallery and clear the selection
      (_a = this.memberGallery) === null || _a === void 0 ? void 0 : _a.refresh();
      (_b = this.memberGallery) === null || _b === void 0 ? void 0 : _b.clearSelection();
      // update stats
      this.fetchStats();
      // trigger notification
      state.showNotice({
        title: response.notRemoved.length ? this.intl.t('removeUsers.error') : this.intl.t('removeUsers.success', { groupName: this.group.name }),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: response.notRemoved.length ? 'danger' : 'success', label: this.intl.t('notice.label') })
      });
      // Telemetry
      const telemetryProps = this.buildTelemetryProps(index$1.dist.dictionary.category.groups.action.leave.label.members.details.remove, response.notRemoved.length, selection.length);
      this.hubTelemetry.emit(telemetryProps);
    }
    catch (err) {
      console.error('Something went wrong removing users from the group', err);
      state.showNotice({
        title: this.intl.t('removeUsers.error'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      // Telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.leave.label.members.details.remove), { response: 'Failure', count: selection.length }));
    }
  }
  async changeRole(selection, role) {
    var _a, _b;
    // try to change the role of the users
    const telemPath = role === 'member' ? 'roleMember' : 'roleManager';
    try {
      const response = await updateUserMembership.updateUserMemberships(Object.assign({ id: this.groupId, users: selection, newMemberType: role }, this._context.userRequestOptions));
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
        state.showNotice({
          title: this.intl.t('changeRole.error'),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // Telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Failed', count: successesAndFailures.failures.length }));
        // Telemetry for successes if there were any
        if (successesAndFailures.successes.length) {
          this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Success', count: successesAndFailures.successes.length }));
        }
      }
      else {
        // trigger notification
        state.showNotice({
          title: this.intl.t('changeRole.success', { role: this.intl.t(`changeRole.${role}`).toLowerCase() }),
          message: '',
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'success', label: this.intl.t('notice.label') })
        });
        // Telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Success', count: selection.length }));
      }
    }
    catch (err) {
      console.error('Something went wrong changing the role of the users', err);
      state.showNotice({
        title: this.intl.t('changeRole.error'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      // Telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.update.label.users.details[telemPath]), { response: 'Failed', count: selection.length }));
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
      const response = await addGroupMembers.addGroupMembers(this.groupId, communityUser, this._context.userRequestOptions, checkPermission.checkPermission('platform:portal:admin:assignToGroups', this._context).access);
      // Trigger the alert
      let message = this.intl.t('addMembers.notifications.invited');
      if (response.added.length) {
        message = this.intl.t('addMembers.notifications.added');
      }
      if (response.notInvited.length) {
        message = this.intl.t('addMembers.notifications.notInvited');
      }
      state.showNotice({
        title: message,
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: response.notAdded.length && response.notInvited.length ? 'danger' : 'success', label: this.intl.t('notice.label') })
      });
      // Telemetry
      // We are explicitily sending telemetry for each response type
      // As we want that level of granularity in the dashboard
      if (response.notAdded.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.join.label.members.details.add), { response: 'Failure', count: response.notAdded.length }));
      }
      if (response.added.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.join.label.members.details.add), { response: 'Success', count: response.added.length }));
      }
      if (response.notInvited.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.join.label.members.details.invite), { response: 'Failure', count: response.notInvited.length }));
      }
      if (response.invited.length) {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.join.label.members.details.invite), { response: 'Success', count: response.invited.length }));
      }
      // update stats
      this.fetchStats();
    }
    catch (err) {
      console.error('Something went wrong adding users to the group', err);
      state.showNotice({
        title: this.intl.t('addMembers.notifications.notInvited'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      // Telemetry
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.groups.action.join.label.members.details.add), { response: 'Failure', count: communityUser.length }));
    }
  }
  renderStats() {
    return (index.h("div", { class: "entity-group-members__stats" }, index.h("arcgis-stat-card", { cardTitle: this.intl.t('stats.total.title'), key: "total", trailingText: this.intl.t('stats.total.trailingText'), value: this.membersCount && this.intl.formatNumber(this.membersCount) }), index.h("arcgis-stat-card", { cardTitle: this.intl.t('stats.new.title'), key: "new", trailingText: this.intl.t('stats.new.trailingText'), value: this.newMembersCount && this.intl.formatNumber(this.newMembersCount) })));
  }
  renderMembersGallery() {
    return index.h("arcgis-hub-gallery", { bulkActions: this.bulkActions, "data-test": "members-gallery", facets: getMemberGalleryFacets(this.intl), linkTarget: "siteRelative", mobileView: this.isMobile, onArcgisHubGalleryBulkAction: this.handleGalleryBulkAction, onArcgisHubGallerySelect: this.handleMemberSelection, query: this.query, ref: (el) => { this.memberGallery = el; }, selectionMode: this.canAssignMembers ? 'multiple' : 'none', "show-back-to-top-btn": true, "show-chips": true, "show-facets": this.showGalleryFacets, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, showLayoutSwitcher: !this.isMobile, sortField: 'username', sortOptions: ['username', 'joined', 'memberType'] });
  }
  renderUserPicker() {
    // If The user can edit the group, show the picker
    return index.h(index.Fragment, null, index.h("arcgis-ref-tooltip", { placement: "right", slot: "primary-actions", text: !this.canAssignMembers ? this.intl.t("addMembers.disabledTooltip") : "" }, index.h("calcite-button", { appearance: "solid", onClick: this.handlePickerOpen, round: true }, this.intl.t('addMembers.button'))), this.isUserPickerOpen &&
      index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("arcgis-hub-gallery-picker", { catalogs: [pickerCatalogDefinition], "data-test": "members-gallery-picker", facets: getUserPickerFacets(this.group, this._context, this.intl), linkTarget: "siteRelative", modalTitle: this.intl.t('addMembers.modal.title'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, open: this.isUserPickerOpen, showBadges: false, showSearch: true, showThumbnail: true, sortField: 'username', sortOptions: ['username', 'joined'] })));
  }
  render() {
    return (index.h(index.Host, { "data-element": "arcgis-hub-group-members-manager" }, index.h("div", { class: "group-members-manager" }, this.canAssignMembers && this.renderUserPicker(), this.renderStats(), this.renderMembersGallery())));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
};
ArcgisHubGroupMembersManager.style = arcgisHubGroupMembersManagerCss;

exports.arcgis_hub_group_members_manager = ArcgisHubGroupMembersManager;
