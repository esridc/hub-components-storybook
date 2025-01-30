'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
const memoize = require('./memoize-1f967971.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const util = require('./util-38e73510.js');
const getWellKnownGroup = require('./getWellKnownGroup-f4de91c5.js');
const getEntityGroups = require('./getEntityGroups-94291c98.js');
const isUpdateGroup = require('./is-update-group-36bf5d24.js');
const unshareEntityWithGroups = require('./unshareEntityWithGroups-08f84f4d.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./generate-random-string-8807d629.js');
require('./store-2a385ca0.js');
require('./get-family-cafa88bb.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./getEventGroups-6c371c3e.js');
require('./events-7873340d.js');
require('./search-b00c4c79.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./sharedWith-ca14e4af.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./unshareEventWithGroups-609ca09c.js');
require('./poll-7962a495.js');
require('./share-item-to-groups-6bc2a4bc.js');
require('./share-item-with-group-6c27286f.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./get-user-5eecc1c4.js');
require('./update-user-membership-4af88c1c.js');
require('./unshare-item-from-groups-3f34f54a.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');

const arcgisHubEntityCollaboratorsCss = ":host{display:block;height:100%}arcgis-hub-group-list-manager{margin-top:1rem}arcgis-hub-gallery{margin-top:1rem}section{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}section:nth-of-type(2){margin-bottom:0px}section h1,section h2,section h3,section h4,section h5,section h6{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

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
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
const ArcgisHubEntityCollaborators = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.currentEditGroups = undefined;
    this.currentViewGroups = undefined;
    this.supportingTeams = undefined;
    context.bind(this, 'handleEditGroupUpdate', 'handleViewGroupUpdate', 'handleGalleryAction', 'handleGroupCreation', 'handleEditGroupCreation', 'handleViewGroupCreation', 'handleGroupCreationFailure');
  }
  async componentWillLoad() {
    // TODO: Prevent this component from render blocking
    await this.fetchExistingSharingGroups(this.entity, this._context);
    this.supportingTeams = getProp.getProp(this.entity, 'legacyTeams');
    await this.loadIntl();
  }
  async loadIntl() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return state.getGlobalContext(); }
  get type() {
    return getTypeFromEntity.getTypeFromEntity(this.entity) || 'content';
  }
  /** Group creation Privileges */
  get canCreateEditGroups() {
    return checkPermission.checkPermission('hub:group:create:edit', this._context, this.entity).access;
  }
  get canCreateViewGroups() {
    return checkPermission.checkPermission('hub:group:create:view', this._context, this.entity).access;
  }
  /** Group creation defaults */
  get defaultEditGroup() {
    const group = util.cloneObject(getWellKnownGroup.getWellKnownGroup('hubEditGroup', this._context));
    // Need to empty string the name otherwise it falls back to a default name
    group.name = '';
    return group;
  }
  get defaultViewGroup() {
    const group = util.cloneObject(getWellKnownGroup.getWellKnownGroup('hubViewGroup', this._context));
    // Need to empty string the name otherwise it falls back to a default name
    group.name = '';
    return group;
  }
  /**
   * Fetch for a list of groups that the entity has been shared with
   * The process is:
   * - get the list of groups(IGroups) that the entity has been shared with,
   * - separate those group IDs out into edit and view groups
   * - store lists in local state
   * @param entityId
   * @param context
   */
  async fetchExistingSharingGroups(entity, context) {
    const groupsSharedWith = await getEntityGroups.getEntityGroups(entity, context);
    this.currentEditGroups = groupsSharedWith.reduce((acc, group) => {
      isUpdateGroup.isUpdateGroup(group) && acc.push(group.id);
      return acc;
    }, []);
    this.currentViewGroups = groupsSharedWith.reduce((acc, group) => {
      !isUpdateGroup.isUpdateGroup(group) && acc.push(group.id);
      return acc;
    }, []);
  }
  /**
   * Triggered when the "Add" button is clicked within the group list manager,
   * fetch for the group object and share the entity with the groups.
   * If any existing sharing groups have been deselected,
   * we will unshare the entity from those groups
   */
  async handleEditGroupUpdate(evt) {
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.addEditGroups);
    removed && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.removeEditGroups);
    try {
      if (removed) {
        this.entity = await unshareEntityWithGroups.unshareEntityWithGroups(this.entity, removed, this._context);
      }
      if (added) {
        this.entity = await unshareEntityWithGroups.shareEntityWithGroups(this.entity, added, this._context);
      }
      this.currentEditGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.SUCCESS, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: false,
      });
    }
    catch (err) {
      state.showNotice({
        title: this.getStringWithFallback(`${this.type}.errorMessage`, this.intl.t('content.errorMessage')),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.FAILURE, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    finally {
      // when an error occurs during sharing, the picker modal checkboxes would incorrectly reflect all of the user's
      // previous selections, when in reality, the entity was shared to a subset of those group selections or possibly none
      // of them. refetching the groups here makes sure the picker modal's checkbox states are accurate with the groups
      // the entity is actually shared with
      this.fetchExistingSharingGroups(this.entity, this._context);
    }
  }
  async handleViewGroupUpdate(evt) {
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.addViewGroups);
    removed && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.removeViewGroups);
    try {
      if (removed) {
        this.entity = await unshareEntityWithGroups.unshareEntityWithGroups(this.entity, removed, this._context);
      }
      if (added) {
        this.entity = await unshareEntityWithGroups.shareEntityWithGroups(this.entity, added, this._context);
      }
      this.currentViewGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.SUCCESS, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: false,
      });
    }
    catch (err) {
      state.showNotice({
        title: this.getStringWithFallback(`${this.type}.errorMessage`, this.intl.t('content.errorMessage')),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.FAILURE, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    finally {
      // when an error occurs during sharing, the picker modal checkboxes would incorrectly reflect all of the user's
      // previous selections, when in reality, the entity was shared to a subset of those group selections or possibly none
      // of them. refetching the groups here makes sure the picker modal's checkbox states are accurate with the groups
      // the entity is actually shared with
      this.fetchExistingSharingGroups(this.entity, this._context);
    }
  }
  /**
   * Get facets for the group picker
   */
  get facets() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const idsOfUserAdminGroups = this._context.currentUser.groups
      .reduce((acc, group) => {
      group.userMembership.memberType === 'admin' && acc.push(group.id);
      return acc;
    }, []);
    const facet = {
      label: this.intl.t("groupPicker.facet.label"),
      key: 'from',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: this.intl.t("groupPicker.facet.myGroups"),
          key: this.intl.t("groupPicker.facet.myGroups"),
          selected: true,
          predicates: [
            {
              owner: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser.username
            }
          ]
        },
        // Groups in the user's org that the user is either
        // a member and the groups are set to be sharable by all members(isviewonly:false) OR
        // the user is an admin of the groups
        // sample query: (capabilities:"updateitemcontrol") AND ((orgid:"97KLIFOSt5CxbiRI" AND isviewonly:false) OR ((id:"152487f266ca411f8a8d9603a2817d61" OR id:"324ac262fc854903a7e23105174805ea" OR id:"3eb8fc91320d4c729bcad43a6f66bbd7" OR id:"4db2960aa6314793803a05604644e4ae" OR id:"59a434f18ccf433c849efcba58769f86" OR id:"5aba77c69b68494aab22c8076403502b" OR id:"df75e514659b4cdab6ce2a688e5a5f7d" OR id:"e3b46b05ce3a4bf496f8b2432ac393da" OR id:"fbd67bcab7424d449fe60fc0dde158e4")))
        {
          label: this.intl.t("groupPicker.facet.myOrganization"),
          key: this.intl.t("groupPicker.facet.myOrganization"),
          selected: false,
          predicates: [
            {
              orgid: (_c = (_b = this._context) === null || _b === void 0 ? void 0 : _b.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
              searchUserAccess: 'groupMember',
              searchUserName: this.entity.owner,
              isviewonly: false
            },
            {
              orgid: (_e = (_d = this._context) === null || _d === void 0 ? void 0 : _d.currentUser) === null || _e === void 0 ? void 0 : _e.orgId,
              id: idsOfUserAdminGroups
            }
          ]
        }
      ]
    };
    // If the user has a community org defined,
    // show "My Community" facet
    if ((_f = this._context) === null || _f === void 0 ? void 0 : _f.communityOrgId) {
      facet.options.push({
        label: this.intl.t("groupPicker.facet.myCommunity"),
        key: this.intl.t("groupPicker.facet.myCommunity"),
        selected: false,
        predicates: [
          {
            orgid: (_g = this._context) === null || _g === void 0 ? void 0 : _g.communityOrgId,
            searchUserAccess: 'groupMember',
            searchUserName: this.entity.owner,
            isviewonly: false
          },
          {
            orgid: (_h = this._context) === null || _h === void 0 ? void 0 : _h.communityOrgId,
            id: idsOfUserAdminGroups
          }
        ]
      });
    }
    return [facet];
  }
  get createNewGroupsLink() {
    var _a;
    return `${(_a = this._context) === null || _a === void 0 ? void 0 : _a.portalUrl}/home/groups.html`;
  }
  get orgOverviewLink() {
    var _a;
    return `${(_a = this._context) === null || _a === void 0 ? void 0 : _a.portalUrl}/home/organization.html?#overview`;
  }
  /**
  * for now we'll restrict un-sharing to the entity owner. In the future,
  * we will use the permissions system to make this determination.
  */
  get isEntityOwner() {
    var _a, _b;
    return this.entity.owner === ((_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.username);
  }
  get canShareToGroups() {
    return checkPermission.checkPermission('platform:portal:user:shareToGroup', this._context).access;
  }
  get canShareToEditGroups() {
    return this.canShareToGroups && this.isEntityOwner;
  }
  get canShareToViewGroups() {
    return this.canShareToGroups;
  }
  /** Returns the query for the supporting teams gallery */
  get supportingGroupsQuery() {
    return {
      targetEntity: 'group',
      filters: [
        {
          predicates: [
            {
              id: this.supportingTeams
            }
          ]
        }
      ]
    };
  }
  /** Returns the actions for the supporting teams gallery */
  get supportingTeamsActionLinks() {
    return [
      {
        action: 'unlinkTeam',
        label: this.intl.t('supportTeamsRemove'),
        icon: 'x-circle',
        showLabel: true
      }
    ];
  }
  /** Handles delegating the actions for the supporting teams gallery */
  handleGalleryAction(evt) {
    const { action, model } = evt.detail;
    if (action === 'unlinkTeam') {
      this.unlinkSupportingTeam(model);
    }
  }
  /**
   * Unlinks a supporting team from a site. This is
   * a legacy feature and will be removed in the future
   * which also explains why supporting teams are only shown for sites.
   */
  async unlinkSupportingTeam(model) {
    try {
      const entity = this.entity;
      entity.legacyTeams = this.supportingTeams.filter(id => id !== model.id);
      await HubInitiatives.updateSite(entity, this._context.hubRequestOptions);
      this.supportingTeams = entity.legacyTeams;
      state.showNotice({
        title: this.intl.t('supportingTeamsRemoveSuccess'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'success', label: this.intl.t('notice.label') })
      });
    }
    catch (err) {
      console.error(err);
      state.showNotice({
        title: this.intl.t('supportingTeamsRemoveError'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
    }
  }
  /**
   * Return a translation string, if the path provided does not lead to
   * a valid translation, use the fallback path instead
   */
  getStringWithFallback(path, fallbackPath) {
    return this.intl.t(path, undefined, { fallback: fallbackPath });
  }
  async handleEditGroupCreation(evt) {
    this.handleGroupCreation(evt, "edit");
  }
  async handleViewGroupCreation(evt) {
    this.handleGroupCreation(evt, "view");
  }
  async handleGroupCreation(evt, groupType) {
    var _a;
    // extract ID
    let details;
    const { id } = evt.detail;
    // try to share entity with group
    try {
      // update context so group count is updated for permissions
      await this._context.refreshUser();
      state.setGlobalContext(this._context);
      // share entity with group, polling occurs within shareEntityWithGroups stack now
      this.entity = await unshareEntityWithGroups.shareEntityWithGroups(this.entity, [id], this._context);
      // update state
      if (groupType === "edit") {
        this.currentEditGroups = [...this.currentEditGroups, id];
        details = index$1.dist.dictionary.category.content.action.update.label.groups.details.addEditGroups;
      }
      if (groupType === "view") {
        this.currentViewGroups = [...this.currentViewGroups, id];
        details = index$1.dist.dictionary.category.content.action.update.label.groups.details.addViewGroups;
      }
      // show success alert
      this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.SUCCESS, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
    }
    catch (err) {
      console.error(err);
      // show error alert
      state.showNotice({
        title: this.getStringWithFallback(`${this.type}.errorMessage`, this.intl.t('content.errorMessage')),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
    }
  }
  handleGroupCreationFailure(evt) {
    // Log error to console
    if (evt.detail && typeof evt.detail === 'string') {
      console.error(`Error creating group: ${evt.detail}`);
    }
    // Show error alert
    state.showNotice({
      title: this.intl.t('groupCreateError'),
      message: '',
      configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
    });
  }
  renderAddNewPeopleNotice() {
    return (index.h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, index.h("div", { slot: "title" }, this.intl.t('addNewPeopleNotice.title')), index.h("div", { slot: "message" }, this.intl.t('addNewPeopleNotice.message', {
      orgOverviewLink: (...str) => (index.h("arcgis-hub-workspace-link", { href: this.orgOverviewLink, iconEnd: 'launch', target: "_blank", telemetry: index$1.dist.dictionary.category.navigation.action.external.label.arcGisOnline.details.organization }, str))
    }))));
  }
  // Renders the supporting teams section
  // NOTE: This is supporting a legacy feature and will be removed in the future
  renderSupportingTeams() {
    const { supportingTeams, type } = this;
    // Only sites have the legacy supporting teams feature, we should only show this
    // if we have supporting teams and the entity is a site
    if (supportingTeams && supportingTeams.length && type === 'site') {
      return (index.h("section", null, index.h("h3", null, this.intl.t('supportingTeams')), index.h("div", null, this.intl.t('supportingTeamsDesc')), index.h("arcgis-hub-gallery", { cardActionLinks: this.supportingTeamsActionLinks, layout: 'list', limit: 100, linkTarget: "siteRelative", newTab: false, onArcgisHubGalleryAction: this.handleGalleryAction, query: this.supportingGroupsQuery, showEmptyState: false })));
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-collaborators" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, index.h("h1", { slot: "title" }, this.intl.t("collaborators")), index.h("div", null, index.h("div", { class: 'entity-collaborators__group-sharing-container' }, index.h("p", null, this.getStringWithFallback(`${this.type}.description`, this.intl.t('content.description'))), index.h("section", null, index.h("h3", null, this.intl.t('editGroupsTitle')), index.h("div", null, this.getStringWithFallback(`${this.type}.editGroupsDescription`, this.intl.t('content.editGroupsDescription'))), index.h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToEditGroups, allowRemove: this.isEntityOwner, class: "edit-groups-list-manager", groupIds: this.currentEditGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleEditGroupUpdate, pickerClassName: 'edit-groups-picker', pickerFacets: this.facets, pickerToggleLabel: this.intl.t("editGroupButtonText"), wellKnownPickerCatalog: "editGroups" }, this.canShareToEditGroups && index.h("arcgis-hub-new-content", { "button-appearance": "outline-fill", entityConfigs: [{
          key: 'group',
          editorType: "hub:group:create:edit",
          formLabel: this.intl.t('edit.formLabel'),
          description: this.intl.t('edit.description'),
          label: this.intl.t('edit.button'),
          disabled: !this.canCreateEditGroups,
          disabledTooltip: this.intl.t('groupCreateDisabledButtonTooltip'),
          defaults: Object.assign({}, this.defaultEditGroup)
        }], onArcgisHubNewContentError: this.handleGroupCreationFailure, onArcgisHubNewContentSuccess: this.handleEditGroupCreation, slot: "secondary-picker-button" }))), index.h("section", null, index.h("h3", null, this.intl.t('viewGroupsTitle')), index.h("div", null, this.getStringWithFallback(`${this.type}.viewGroupsDescription`, this.intl.t('content.viewGroupsDescription'))), index.h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToViewGroups, allowRemove: this.isEntityOwner, class: "view-groups-list-manager", groupIds: this.currentViewGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleViewGroupUpdate, pickerClassName: 'view-groups-picker', pickerFacets: this.facets, pickerToggleLabel: this.intl.t("viewGroupButtonText"), wellKnownPickerCatalog: "viewGroups" }, this.canShareToViewGroups && index.h("arcgis-hub-new-content", { "button-appearance": "outline-fill", entityConfigs: [{
          key: 'group',
          editorType: "hub:group:create:view",
          formLabel: this.intl.t('view.formLabel'),
          description: this.intl.t('view.description'),
          label: this.intl.t('view.button'),
          disabled: !this.canCreateViewGroups,
          disabledTooltip: this.intl.t('groupCreateDisabledButtonTooltip'),
          defaults: Object.assign({}, this.defaultViewGroup)
        }], onArcgisHubNewContentError: this.handleGroupCreationFailure, onArcgisHubNewContentSuccess: this.handleViewGroupCreation, slot: "secondary-picker-button" })))), this.renderSupportingTeams()), index.h("div", { slot: "side-panel" }, this.renderAddNewPeopleNotice()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('supportingTeams')
], ArcgisHubEntityCollaborators.prototype, "supportingGroupsQuery", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEntityCollaborators.prototype, "supportingTeamsActionLinks", null);
ArcgisHubEntityCollaborators.style = arcgisHubEntityCollaboratorsCss;

exports.arcgis_hub_entity_collaborators = ArcgisHubEntityCollaborators;
